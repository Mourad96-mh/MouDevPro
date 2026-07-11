/**
 * Google Ads conversion configuration — single source of truth.
 *
 * The base gtag snippet lives in index.html and must not be touched.
 * Two Google Ads actions, split by channel (both Primary):
 *   "Contact"              → devis-form submits (FORM_CONVERSION_LABEL)
 *   "Contact-from-moudev"  → WhatsApp/phone clicks (LEGACY_CLICK_LABEL)
 */

export const AW_ID = "AW-18032730547";

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
