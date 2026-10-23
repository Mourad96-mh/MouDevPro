/**
 * Google Ads conversion configuration — single source of truth.
 *
 * The base gtag snippet lives in index.html and must not be touched.
 * Two Google Ads actions, split by channel (both Primary):
 *   "Contact"              → devis-form submits (FORM_CONVERSION_LABEL)
 *   "Contact-from-moudev"  → WhatsApp/phone clicks (LEGACY_CLICK_LABEL)
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

// "Contact" action in Google Ads (Submit lead form) — devis-form submits only.
export const FORM_CONVERSION_LABEL = "Hlo6CP2wzc4cELPD1pZD";

// "Contact-from-moudev" action — WhatsApp + phone clicks (fired via the
// gtag_report_conversion snippet in index.html).
const LEGACY_CLICK_LABEL = "abRzCJSdzKUcELPD1pZD";

/**
 * Fired on successful devis-form submit. Uses the new form conversion when
 * its label is configured; until then it falls back to the legacy shared
 * label so no conversion is lost pre-configuration.
 */
export function fireFormConversion() {
  const label = FORM_CONVERSION_LABEL || LEGACY_CLICK_LABEL;
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${AW_ID}/${label}`,
      value: 200,
      currency: "MAD",
    });
    window.gtag("event", "generate_lead", { currency: "MAD" });
  }
  if (typeof window.fbq === "function") window.fbq("track", "Lead");
}
