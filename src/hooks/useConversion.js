const WA_URL = "https://wa.me/212696964341";

const useConversion = () => {
  const track = (url = WA_URL) => {
    // Facebook Pixel
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
    // Google Ads
    if (typeof window.gtag_report_conversion === "function") {
      window.gtag_report_conversion(url);
    } else {
      window.location = url;
    }
  };

  return { track, WA_URL };
};

export default useConversion;
