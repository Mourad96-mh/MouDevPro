/**
 * trackLead — logs every WhatsApp / phone / form lead to Google Sheets.
 * 1. Reads attribution (gclid/wbraid/gbraid + UTMs) from the mdp_attr cookie
 *    (set by AttributionCapture on landing), falling back to the current URL
 * 2. Attaches the visitor ref (MDP-XXXX) so WhatsApp conversations can be
 *    matched back to their gclid for Offline Conversion Import
 * 3. POSTs lead data to Google Sheets via Apps Script (fire-and-forget)
 *
 * The Google Ads conversion is fired separately (gtag_report_conversion() for
 * clicks, fireFormConversion() for the devis form) so there is a single
 * conversion path per lead type — do NOT add a gtag conversion here or leads
 * will be double-counted.
 *
 * @param {object} context  — { source, city, service, name, phone,
 *                              projectType, budget, message }
 * @param {'whatsapp'|'phone'|'form'} type
 */
import { getAttribution, getVisitorRef } from "./attribution";

// ─── CONFIG — replace before going live ──────────────────────────────────────
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyaitSzgm3jQQ5uuudqeIoxCO6Pq5IXYopMGqbgyGMx1Dbewvoy_276q4RaIaOGvlcC/exec";
// ─────────────────────────────────────────────────────────────────────────────

// Set to true while testing — shows a toast with the payload
const DEBUG = false;

// Which city/market page the lead acted from, derived from the URL path.
// Explicit context.city (e.g. the form's Ville field) always wins over this.
function detectCityFromPath() {
  const path = window.location.pathname;
  for (const city of ["casablanca", "rabat", "marrakech", "france", "canada", "usa"]) {
    if (path.includes(city)) return city;
  }
  // /en and /ar (without a city suffix) are the Casablanca EN/AR pages
  if (/^\/(en|ar)\/?$/.test(path)) return "casablanca";
  return "";
}

function getUTMs() {
  // Stored attribution first (survives SPA navigation and return visits),
  // current URL as fallback for direct hits before the cookie existed.
  const attr = getAttribution();
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: attr.utm_source || p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: attr.utm_campaign || p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    gclid: attr.gclid || p.get("gclid") || "",
    wbraid: attr.wbraid || p.get("wbraid") || "",
    gbraid: attr.gbraid || p.get("gbraid") || "",
  };
}

function showDebugToast(payload) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position:fixed;bottom:80px;left:16px;z-index:99999;
    background:#1a1a2e;color:#fff;border-left:4px solid #22c55e;
    border-radius:8px;padding:12px 16px;max-width:340px;
    font-family:monospace;font-size:12px;line-height:1.6;
    box-shadow:0 8px 24px rgba(0,0,0,0.4);
  `;
  toast.innerHTML = `
    <div style="font-weight:700;font-size:13px;margin-bottom:6px;">
      🎯 trackLead — <span style="color:#86efac">${payload.type}</span>
    </div>
    <div><b>source:</b> ${payload.source}</div>
    <div><b>city:</b> ${payload.city || "—"}</div>
    <div><b>utm_source:</b> ${payload.utm_source || "—"}</div>
    <div><b>gclid:</b> ${payload.gclid || "—"}</div>
    <div style="margin-top:6px;padding-top:6px;border-top:1px solid #333">
      <span style="color:#86efac">✓ Sheet POST sent</span>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 6000);
}

export function trackLead(context = {}, type = "whatsapp") {
  const payload = {
    timestamp: new Date().toISOString(),
    type,
    ref: getVisitorRef(),
    source: context.source || "moudevpro-site",
    city: context.city || detectCityFromPath(),
    service: context.service || "",
    name: context.name || "",
    phone: context.phone || "",
    projectType: context.projectType || "",
    budget: context.budget || "",
    message: (context.message || "").slice(0, 1000),
    page_url: window.location.href,
    ...getUTMs(),
  };

  // 1. Post to Google Sheets (fire-and-forget, no-cors)
  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  // 2. Debug
  if (DEBUG) {
    console.group(
      "%c[trackLead]",
      "color:#22c55e;font-weight:bold",
      payload.type,
      "—",
      payload.source,
    );
    console.table(payload);
    console.groupEnd();
    showDebugToast(payload);
  }
}
