import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { captureAttribution, getVisitorRef } from "../../utils/attribution";

/**
 * Invisible component mounted once in AppLayout. On every navigation it
 * captures Google Ads click IDs / UTMs from the URL into the mdp_attr
 * cookie and makes sure the visitor ref exists. Effect-only so it never
 * runs during prerender HTML generation.
 */
const AttributionCapture = () => {
  const location = useLocation();

  useEffect(() => {
    captureAttribution();
    getVisitorRef();
  }, [location.search]);

  return null;
};

export default AttributionCapture;
