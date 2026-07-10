/**
 * Google Ads conversion configuration — single source of truth.
 *
 * The base gtag snippet lives in index.html and must not be touched.
 * LEGACY label = the existing shared click conversion (WhatsApp/phone) —
 * it stays in code and gets demoted to Secondary in the Google Ads UI.
 */

export const AW_ID = "AW-18032730547";

// TODO(Mourad): create the "Lead Formulaire Devis" conversion action in
// Google Ads (Website → Submit lead form, value 200 MAD, count One,
// 90-day click-through window), paste its label here, then redeploy.
export const FORM_CONVERSION_LABEL = "";

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
