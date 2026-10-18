import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import CallLinks from "./CallLinks";
import AttributionCapture from "./AttributionCapture";

const AppLayout = () => {
  return (
    <>
      {/* Default lang for every route; EN/AR/market pages override it with their
          own htmlAttributes. Without it Helmet strips the template's lang="fr"
          from FR pages that don't set one. */}
      <Helmet htmlAttributes={{ lang: "fr", dir: "ltr" }}>
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="fr_MA" />
        <meta property="og:image" content="https://www.moudevpro.com/og-default.jpg" />
        <meta
          property="og:image:alt"
          content="MouDevPro — Développeur Web Freelance Casablanca Maroc"
        />
      </Helmet>
      <AttributionCapture />
      <Header />
      <CallLinks />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
