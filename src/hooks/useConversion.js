import { trackLead } from "../utils/trackLead";
import { getVisitorRef } from "../utils/attribution";

const WA_NUMBER = "212696964341";
const PHONE_TEL = "tel:+212696964341";

// The ref is baked into the wa.me href itself so the pre-filled message
// (with "Réf: MDP-XXXX") always matches what trackLead logs — the ref is
// how a WhatsApp conversation is matched back to its gclid in the Sheet.
// During prerendering (headless Chrome) the plain URL is used so no
// throwaway ref gets baked into the static HTML.
const buildWaUrl = () => {
  if (navigator.webdriver) return `https://wa.me/${WA_NUMBER}`;
  const msg = `Bonjour, je souhaite un devis pour mon projet (Réf: ${getVisitorRef()})`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
};

const useConversion = () => {
  const WA_URL = buildWaUrl();

  // For WhatsApp/CTA links
  // source is optional — all existing track(WA_URL) calls work unchanged
  const track = (url = WA_URL, source = "wa-cta") => {
    trackLead({ source }, "whatsapp");

    if (typeof window.fbq === "function") window.fbq("track", "Lead");
    if (typeof window.gtag_report_conversion === "function") {
      window.gtag_report_conversion(url);
    } else {
      window.location = url;
    }
  };

  // For tel: links — browser opens the dialer via href="tel:..."
  const trackPhone = (source = "phone-link") => {
    trackLead({ source }, "phone");

    if (typeof window.fbq === "function") window.fbq("track", "Lead");
    if (typeof window.gtag_report_conversion === "function") {
      window.gtag_report_conversion(PHONE_TEL);
    }
  };

  return { track, trackPhone, WA_URL };
};

export default useConversion;
