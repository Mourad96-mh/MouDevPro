/**
 * trackLead — fires on every WhatsApp / phone / form conversion
 * 1. Reads UTM params + gclid from URL
 * 2. POSTs lead data to Google Sheets via Apps Script (fire-and-forget)
 * 3. Fires a Google Ads conversion event via gtag
 *
 * @param {object} context  — { source, city, service }
 * @param {'whatsapp'|'phone'|'form'} type
 */

// ─── CONFIG — replace before going live ──────────────────────────────────────
const ADS_CONVERSION_ID = "AW-17548598231";
const ADS_CONVERSION_LABEL = "XuDyCOb8kqMbENe36a9B";
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbykUAEtMiX2Z5ThudR8hXLs2HGKNyJiOF1xT9wFzncIVMRIDgvIRYN9c6bDUZ0861qoxA/exec";
// ─────────────────────────────────────────────────────────────────────────────

// Set to true while testing — shows a toast with the payload
const DEBUG = false;

function getUTMs() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    gclid: p.get("gclid") || "",
  };
}

function showDebugToast(payload, gtagFired) {
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
      <span style="color:${gtagFired ? "#86efac" : "#f87171"}">
        ${gtagFired ? "✓ gtag fired" : "✗ gtag not available"}
      </span>
      &nbsp;|&nbsp;
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
    source: context.source || "moudevpro-site",
    city: context.city || "",
    service: context.service || "",
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

  // 2. Fire Google Ads conversion
  const gtagFired = typeof window.gtag === "function";
  if (gtagFired) {
    window.gtag("event", "conversion", {
      send_to: `${ADS_CONVERSION_ID}/${ADS_CONVERSION_LABEL}`,
    });
  }

  // 3. Debug
  if (DEBUG) {
    console.group(
      "%c[trackLead]",
      "color:#22c55e;font-weight:bold",
      payload.type,
      "—",
      payload.source,
    );
    console.table(payload);
    console.log("gtag fired:", gtagFired);
    console.groupEnd();
    showDebugToast(payload, gtagFired);
  }
}
