/**
 * Google Ads conversion configuration — single source of truth.
 *
 * The base gtag snippet lives in index.html and must not be touched.
 * Two Google Ads web actions, split by channel:
 *   "Contact-from-moudev" → WhatsApp/phone clicks, fired by the
 *     gtag_report_conversion snippet in index.html (label abRzCJSdzKUcELPD1pZD).
 *   "Formulaire Devis"    → devis-form submits (FORM_CONVERSION_LABEL, below).
 *     Created 2026-11-07 (Submit lead form) to replace the removed
 *     "Submit lead form" action. Do NOT paste Google's gtag_report_conversion
 *     snippet for it into index.html: it would overwrite the WhatsApp one.
 * Qualified leads go to Ads via OCI upload ("Lead Qualifié (OCI)").
 */

export const AW_ID = "AW-18032730547";

// GA4 property moudevpro.com — configured alongside Ads in index.html.
export const GA4_ID = "G-P7F2509ZQF";

/**
 * GA4-only event for WhatsApp/phone clicks (method: "whatsapp" | "phone").
 * Kept separate from generate_lead so form leads stay distinguishable.
 * The CTA id goes in cta_source, never "source": GA4 reads source/medium/
 * campaign event params as a traffic-source override and was re-attributing
 * Paid Search sessions to "wa-cta / Unassigned".
 */
export function fireContactClick(method, source) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "contact_click", { send_to: GA4_ID, method, cta_source: source });
  }
}

// "Formulaire Devis" action (Submit lead form, created 2026-11-07).
const FORM_CONVERSION_LABEL = "5UVPCJqKjLQdELPD1pZD";

/** Fired on successful devis-form submit. */
export function fireFormConversion() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${AW_ID}/${FORM_CONVERSION_LABEL}`,
      value: 200,
      currency: "MAD",
    });
    window.gtag("event", "generate_lead", { currency: "MAD" });
  }
  if (typeof window.fbq === "function") window.fbq("track", "Lead");
}
