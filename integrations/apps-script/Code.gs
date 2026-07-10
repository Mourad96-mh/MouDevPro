/**
 * MouDevPro — Lead log + Offline Conversion Import (OCI) export.
 *
 * Replaces the previous Apps Script bound to the leads spreadsheet.
 * - doPost: receives leads from the site (trackLead.js) and appends them
 *   to the "Leads" tab (created automatically with headers if missing).
 * - onEdit: stamps statusUpdatedAt whenever you edit the status column —
 *   OCI requires the conversion time to be AFTER the ad click time.
 * - doGet ?action=oci&token=...: downloads the Google Ads OCI CSV for
 *   qualified leads and marks them as uploaded.
 *
 * Deploy: Extensions → Apps Script → paste → Deploy → Manage deployments →
 * edit the EXISTING web app deployment → New version. (Editing the existing
 * deployment keeps the same /exec URL used by the site.)
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────
var CONFIG = {
  SHEET_NAME: "Leads",

  // Secret for the OCI export URL. Pick a long random string, e.g. from
  // https://www.uuidgenerator.net/ — then export with:
  //   <WEB_APP_URL>?action=oci&token=<ADMIN_TOKEN>
  ADMIN_TOKEN: "CHANGE-ME-LONG-RANDOM-STRING",

  // Must match the conversion action name created in Google Ads
  // (Import → Conversions from clicks → "Lead Qualifié (OCI)").
  CONVERSION_NAME: "Lead Qualifié (OCI)",

  // Conversion value (MAD) per status — tune freely.
  OCI_VALUES: {
    "qualified": 200,
    "devis-envoye": 500,
    "client": 3000,
  },

  TIMEZONE: "GMT+1",          // Africa/Casablanca
  TIMEZONE_HEADER: "+0100",   // OCI CSV Parameters line

  // Anti-spam: ignore a form lead if the same phone was logged < 60s ago.
  DUPLICATE_WINDOW_MS: 60 * 1000,

  // Notification on new leads. NOTIFY_ON:
  //   "form" → devis-form submits only (recommended — quiet)
  //   "all"  → also WhatsApp/phone taps (can be several per visitor)
  //   ""     → notifications off
  NOTIFY_ON: "form",

  // WhatsApp notification via CallMeBot (free personal-notification API).
  // Setup (2 min): https://www.callmebot.com/blog/free-api-whatsapp-messages/
  // — add their activation number to your contacts, send them the message
  // "I allow callmebot to send me messages", and paste the API key they
  // reply with below. Leave APIKEY empty to disable.
  WHATSAPP_PHONE: "+212696964341",
  WHATSAPP_APIKEY: "",

  // Optional email notification (leave empty to disable).
  NOTIFY_EMAIL: "",
};
// ─────────────────────────────────────────────────────────────────────────────

var HEADERS = [
  "timestamp", "ref", "type", "source",
  "name", "phone", "projectType", "budget", "message",
  "city", "service", "page_url",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "gclid", "wbraid", "gbraid",
  "status", "statusUpdatedAt", "conversionUploaded",
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  var firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell !== HEADERS[0]) {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function colIndex_(name) {
  return HEADERS.indexOf(name) + 1; // 1-based
}

// ─── Lead intake ─────────────────────────────────────────────────────────────

function doPost(e) {
  var out = ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return out; // ignore malformed posts (and manual editor runs) silently
  }

  var sheet = getSheet_();

  // Anti-spam: same phone within the duplicate window → drop silently.
  if (data.phone && isRecentDuplicate_(sheet, data.phone)) {
    return out;
  }

  var row = HEADERS.map(function (h) {
    switch (h) {
      case "status": return "new";
      case "statusUpdatedAt": return "";
      case "conversionUploaded": return false;
      default: return data[h] !== undefined ? String(data[h]) : "";
    }
  });
  sheet.appendRow(row);
  notifyNewLead_(data);
  return out;
}

/**
 * Manual test — run this from the editor (function dropdown → testNotify →
 * Run). Forces the permission consent screen if it was never granted, and
 * throws visibly if sending fails (unlike the silent try/catch in doPost).
 */
function testNotify() {
  sendWhatsApp_("✅ Test notification MouDevPro — le canal WhatsApp fonctionne.");
  Logger.log("WhatsApp test sent to " + CONFIG.WHATSAPP_PHONE);
}

function leadSummary_(data) {
  return "🔥 Nouveau lead " + (data.ref || "") +
    (data.city ? " (" + data.city + ")" : "") + "\n" +
    "Type: " + (data.type || "—") + "\n" +
    "Nom: " + (data.name || "—") + "\n" +
    "Tél: " + (data.phone || "—") + "\n" +
    "Projet: " + (data.projectType || "—") + "\n" +
    "Budget: " + (data.budget || "—") + "\n" +
    "Message: " + (data.message || "—") + "\n" +
    "Page: " + (data.page_url || "—") + "\n" +
    "gclid: " + (data.gclid ? "oui" : "non");
}

function sendWhatsApp_(text) {
  if (!CONFIG.WHATSAPP_APIKEY) return;
  var url = "https://api.callmebot.com/whatsapp.php" +
    "?phone=" + encodeURIComponent(CONFIG.WHATSAPP_PHONE) +
    "&apikey=" + encodeURIComponent(CONFIG.WHATSAPP_APIKEY) +
    "&text=" + encodeURIComponent(text);
  UrlFetchApp.fetch(url, { muteHttpExceptions: true });
}

function notifyNewLead_(data) {
  if (!CONFIG.NOTIFY_ON) return;
  if (CONFIG.NOTIFY_ON === "form" && data.type !== "form") return;

  var summary = leadSummary_(data);

  try {
    sendWhatsApp_(summary);
  } catch (err) {
    // Never let a notification failure block the lead from being logged.
  }

  if (CONFIG.NOTIFY_EMAIL) {
    try {
      MailApp.sendEmail({
        to: CONFIG.NOTIFY_EMAIL,
        subject: summary.split("\n")[0],
        body: summary,
      });
    } catch (err) {
      // best-effort
    }
  }
}

function isRecentDuplicate_(sheet, phone) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var start = Math.max(2, lastRow - 20); // only recent rows matter for a 60s window
  var values = sheet.getRange(start, 1, lastRow - start + 1, HEADERS.length).getValues();
  var now = Date.now();
  var tsCol = colIndex_("timestamp") - 1;
  var phoneCol = colIndex_("phone") - 1;
  var typeCol = colIndex_("type") - 1;
  return values.some(function (r) {
    if (r[typeCol] !== "form" || String(r[phoneCol]) !== String(phone)) return false;
    var t = new Date(r[tsCol]).getTime();
    return !isNaN(t) && now - t < CONFIG.DUPLICATE_WINDOW_MS;
  });
}

// ─── Status timestamp (simple trigger — fires on manual edits) ───────────────

function onEdit(e) {
  var sheet = e.range.getSheet();
  if (sheet.getName() !== CONFIG.SHEET_NAME) return;
  if (e.range.getColumn() !== colIndex_("status") || e.range.getRow() < 2) return;
  var stamp = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss");
  sheet.getRange(e.range.getRow(), colIndex_("statusUpdatedAt")).setValue(stamp);
}

// ─── OCI export ──────────────────────────────────────────────────────────────

function doGet(e) {
  // e is undefined when run manually from the editor (e.g. to authorize scopes)
  var params = (e && e.parameter) || {};
  if (params.action !== "oci") {
    return ContentService.createTextOutput("MouDevPro lead endpoint");
  }
  if (params.token !== CONFIG.ADMIN_TOKEN || CONFIG.ADMIN_TOKEN.indexOf("CHANGE-ME") === 0) {
    return ContentService.createTextOutput("Forbidden");
  }

  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  var lines = [
    "Parameters:TimeZone=" + CONFIG.TIMEZONE_HEADER,
    "Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency",
  ];
  var exportedRows = [];

  if (lastRow >= 2) {
    var values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    values.forEach(function (r, i) {
      var status = String(r[colIndex_("status") - 1]);
      var gclid = String(r[colIndex_("gclid") - 1]);
      var uploaded = r[colIndex_("conversionUploaded") - 1];
      var value = CONFIG.OCI_VALUES[status];

      if (!value || !gclid || uploaded === true || uploaded === "TRUE") return;

      // Conversion time must be after the click — use the status edit time,
      // never the original lead timestamp.
      var when = r[colIndex_("statusUpdatedAt") - 1];
      var whenStr = when
        ? Utilities.formatDate(new Date(when), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss")
        : Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss");

      lines.push([gclid, CONFIG.CONVERSION_NAME, whenStr, value, "MAD"].join(","));
      exportedRows.push(i + 2); // sheet row number
    });
  }

  // Flip conversionUploaded on everything we just exported.
  exportedRows.forEach(function (rowNum) {
    sheet.getRange(rowNum, colIndex_("conversionUploaded")).setValue(true);
  });

  var stamp = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyyMMdd-HHmm");
  return ContentService.createTextOutput(lines.join("\n"))
    .downloadAsFile("oci-export-" + stamp + ".csv");
}
