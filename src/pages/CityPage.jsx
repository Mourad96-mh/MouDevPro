import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  HiCheck,
  HiComputerDesktop,
  HiMiniArrowTrendingUp,
  HiMiniShoppingCart,
} from "react-icons/hi2";
import { VscCode } from "react-icons/vsc";

import Hero from "../components/layout/Hero";
import Stats from "../components/sections/Stats";
import ClientLogos from "../components/sections/ClientLogos";
import Portfolio from "../components/sections/Portfolio";
import FAQ from "../components/sections/FAQ";
import Temoignes from "../components/sections/Temoignes";
import Footer from "../components/layout/Footer";

import { cityConfig } from "../data/cityConfig";
import { useCityContext } from "../context/CityContext";
import useConversion from "../hooks/useConversion";
import i18n from "../i18n";

const PACK_KEYS = ["presence", "vitrine", "pro", "ecommerce"];

const CityPage = ({ city, lang }) => {
  const { t } = useTranslation();
  const { setCityData } = useCityContext();
  const { track, WA_URL } = useConversion();
  const data = cityConfig[city][lang];

  useEffect(() => {
    i18n.changeLanguage(lang);
    setCityData({ ...data, currentLang: lang, currentCity: city });
  }, [city, lang, data, setCityData]);

  const { name: cityName } = data;
  const isRtl = lang === "ar";
  const steps = t("process.steps", { returnObjects: true });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "MouDEV",
    url: data.canonical,
    description: data.metaDescription,
    telephone: "+212696964341",
    image: "https://www.moudevpro.com/webdev-logo.png",
    priceRange: "DH 2000 - DH 30000",
    currenciesAccepted: "MAD",
    paymentAccepted: "Cash, Virement bancaire",
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address,
      addressLocality: data.name,
      addressRegion: data.name,
      addressCountry: "MA",
      postalCode: city === "casablanca" ? "20000" : city === "rabat" ? "10000" : city === "marrakech" ? "40000" : "",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.geo.lat,
      longitude: data.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: "Casablanca" },
      { "@type": "City", name: "Rabat" },
      { "@type": "City", name: "Marrakech" },
      { "@type": "Country", name: "Maroc" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "30",
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "22:00",
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: t("services.web.title"), description: t("services.web.desc", { city: cityName }) } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: t("services.seo.title"), description: t("services.seo.desc", { city: cityName }) } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: t("services.ads.title"), description: t("services.ads.desc", { city: cityName }) } },
    ],
    knowsLanguage: ["fr", "ar", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+212696964341",
      contactType: "Customer Service",
      availableLanguage: ["French", "Arabic", "English"],
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
      ...(city !== "casablanca" ? [{ "@type": "ListItem", position: 2, name: `Création Site Web ${cityName}`, item: data.canonical }] : []),
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MouDEV",
    url: "https://www.moudevpro.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.moudevpro.com/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang, dir: isRtl ? "rtl" : "ltr" }}>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="MouDEV" />
        <meta name="keywords" content={`création site web ${cityName}, agence web ${cityName}, développeur web freelance ${cityName}, site vitrine ${cityName}, création de site internet ${cityName}, application web sur mesure, landing page, référencement SEO ${cityName}, MouDEV`} />
        <link rel="canonical" href={data.canonical} />
        {Object.entries(data.hreflang).map(([hl, href]) => (
          <link key={hl} rel="alternate" hreflang={hl} href={href} />
        ))}
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MouDEV" />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:url" content={data.canonical} />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={lang === "ar" ? "ar_MA" : lang === "en" ? "en_US" : "fr_MA"} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      </Helmet>

      <Hero cityName={cityName} />

      {/* Intro */}
      <section className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          {t("home.h2", { city: cityName })}
        </h2>
        <div className="home__content">
          <div className="home__text">
            <p className="text sl-mb">{t("home.p1", { city: cityName })}</p>
            <p className="text sl-mb">{t("home.p2", { city: cityName })}</p>
            <p className="text sl-mb">{t("home.p3", { city: cityName })}</p>
            <p className="text sl-mb city-context">{data.cityContext}</p>
            <Link
              className="link hero-link"
              to={WA_URL}
              onClick={() => track(WA_URL)}
            >
              {t("home.cta")}
            </Link>
          </div>
          <div className="home__img">
            <img
              src="/home-dev-1.avif"
              alt={`Création site web ${cityName} - MouDev`}
              className="img"
              title={`Création de site internet à ${cityName} avec SEO et Google Ads`}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Stats />
      <ClientLogos />

      {/* Packs */}
      <section id="formules" className="home container">
        <h2 className="secondary-heading center-text lg-mb">{t("packs.h2")}</h2>
        <div className="packs">
          {PACK_KEYS.map((key) => {
            const pack = t(`packs.${key}`, { returnObjects: true });
            return (
              <div className="pack" key={key}>
                <h3 className="tertiary-heading center-text">{pack.title}</h3>
                <ul className="pack-list lg-mb">
                  {pack.items.map((item, i) => (
                    <li className="pack-item" key={i}>
                      <span><HiCheck /></span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
                <div className="pack__cta">
                  <Link
                    to={WA_URL}
                    rel="noopener noreferrer"
                    className="link"
                    onClick={() => track(WA_URL)}
                  >
                    <span className="icon"><HiMiniShoppingCart /></span>
                    <span>{t("packs.cta")}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="home container">
        <h2 className="secondary-heading center-text lg-mb">{t("services.h2", { city: cityName })}</h2>
        <ul className="services__list">
          <li className="service__item">
            <span role="img"><VscCode className="service--icon" /></span>
            <h3 className="tertiary-heading sl-mb">{t("services.web.title")}</h3>
            <p>{t("services.web.desc")}</p>
          </li>
          <li className="service__item">
            <span role="img"><HiMiniArrowTrendingUp className="service--icon" /></span>
            <h3 className="tertiary-heading sl-mb">{t("services.seo.title")}</h3>
            <p>{t("services.seo.desc")}</p>
          </li>
          <li className="service__item">
            <span role="img"><HiComputerDesktop className="service--icon" /></span>
            <h3 className="tertiary-heading sl-mb">{t("services.ads.title")}</h3>
            <p>{t("services.ads.desc")}</p>
          </li>
        </ul>
      </section>

      {/* Process */}
      <section id="process" className="process">
        <div className="process__container container">
          <div className="center-text lg-mb">
            <h2 className="secondary-heading">{t("process.h2")}</h2>
            <p className="subheading">{t("process.subheading")}</p>
          </div>
          <ul className="process__list">
            {steps.map((step, i) => (
              <li className="process__item" key={i}>
                <div className="process__item-inner">
                  <div className="step lg-mb">
                    <span className="step--num">{i + 1}</span>
                  </div>
                  <h3 className="tertiary-heading sl-mb center-text">{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Portfolio cityName={cityName} />
      <FAQ cityName={cityName} />
      <Temoignes />
      <Footer cityName={cityName} address={data.address} />
    </>
  );
};

export default CityPage;
