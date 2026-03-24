import { trackLead } from "../utils/trackLead";

const WA_URL    = "https://wa.me/212696964341";
const PHONE_TEL = "tel:+212696964341";

const useConversion = () => {
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
