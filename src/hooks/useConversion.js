const WA_URL = "https://wa.me/212696964341";
const PHONE_TEL = "tel:+212696964341";

const useConversion = () => {
  // For WhatsApp/CTA links — fires events and redirects if gtag not loaded
  const track = (url = WA_URL) => {
    if (typeof window.fbq === "function") window.fbq("track", "Lead");
    if (typeof window.gtag_report_conversion === "function") {
      window.gtag_report_conversion(url);
    } else {
      window.location = url;
    }
  };

  // For tel: links — fires events only, lets the browser handle the call natively
  const trackPhone = () => {
    if (typeof window.fbq === "function") window.fbq("track", "Lead");
    if (typeof window.gtag_report_conversion === "function") {
      window.gtag_report_conversion(PHONE_TEL);
    }
    // no redirect — browser opens the dialer via href="tel:..."
  };

  return { track, trackPhone, WA_URL };
};

export default useConversion;
