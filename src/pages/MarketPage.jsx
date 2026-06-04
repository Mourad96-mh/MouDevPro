import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import Portfolio from "../components/sections/Portfolio";
import Temoignes from "../components/sections/Temoignes";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";
import { marketConfig } from "../data/marketConfig";
import i18n from "../i18n";

const LABELS = {
  fr: {
    whyTitle: "Pourquoi un développeur web freelance basé au Maroc ?",
    pricingTitle: (c) => `Tarifs création site web pour ${c}`,
    pricingSub:
      "Prix transparents, paiement après livraison. Choisissez votre formule ci-dessous.",
    priceFrom: (p) => `dès ${p}`,
    quote: "Devis gratuit",
    faqTitle: "Questions fréquentes",
    factsTitle: (c) => `Développeur web pour ${c} — l'essentiel à retenir`,
    ctaTitle: "Prêt à lancer votre site web ?",
    ctaSub: "Devis gratuit et personnalisé sous 24h — où que vous soyez.",
    ctaBtn: "Demandez votre devis gratuit",
    bridge: (
      <p className="text sl-mb">
        Je crée aussi des{" "}
        <Link to="/ecommerce" className="inline-link">boutiques en ligne et sites e-commerce</Link>,
        des{" "}
        <Link to="/services" className="inline-link">applications web sur mesure</Link>{" "}
        et des sites vitrine pour mes clients au Maroc. Consultez mes{" "}
        <Link to="/tarifs" className="inline-link">tarifs de création de site web</Link>,
        découvrez le{" "}
        <Link to="/" className="inline-link">développeur web freelance au Maroc</Link>{" "}
        derrière chaque projet, ou{" "}
        <Link to="/contact" className="inline-link">demandez votre devis gratuit en 24h</Link>.
      </p>
    ),
    plans: [
      {
        name: "Site Vitrine",
        priceKey: "vitrine",
        delivery: "Livraison en 7 à 10 jours",
        features: ["Design sur mesure", "Jusqu'à 10 pages", "100% responsive", "Optimisation SEO technique", "Hébergement + nom de domaine (1 an)", "Certificat SSL (HTTPS)", "Formation à la prise en main", "Support après livraison"],
        cta: "Demander ce pack",
      },
      {
        name: "Site E-commerce",
        priceKey: "ecommerce",
        highlight: true,
        delivery: "Livraison en 7 à 10 jours",
        features: ["Tout ce qui est inclus dans Site Vitrine", "Catalogue produits illimité", "Panier & paiement en ligne sécurisé", "Gestion des stocks & commandes", "SEO e-commerce optimisé", "Formation 2h incluse"],
        cta: "Demander ce pack",
      },
      {
        name: "Application Web Sur Mesure",
        price: "Sur devis",
        delivery: "Délai selon le projet",
        features: ["Analyse complète des besoins", "Architecture technique sur mesure", "Authentification & utilisateurs", "Tableau de bord administrateur", "API & intégrations tierces", "React, Node.js, WordPress — selon le besoin"],
        cta: "Obtenir un devis gratuit",
      },
    ],
  },
  en: {
    whyTitle: "Why a freelance web developer based in Morocco?",
    pricingTitle: (c) => `Website pricing for ${c}`,
    pricingSub:
      "Transparent prices, pay after delivery. Pick your plan below.",
    priceFrom: (p) => `from ${p}`,
    quote: "Free quote",
    faqTitle: "Frequently asked questions",
    factsTitle: (c) => `Web developer for the ${c} — key facts`,
    ctaTitle: "Ready to launch your website?",
    ctaSub: "Free, personalized quote within 24h — wherever you are.",
    ctaBtn: "Get your free quote",
    bridge: (
      <p className="text sl-mb">
        I also build{" "}
        <Link to="/ecommerce" className="inline-link">online stores and e-commerce websites</Link>,{" "}
        <Link to="/services" className="inline-link">custom web applications</Link>{" "}
        and business websites. Meet the{" "}
        <Link to="/en" className="inline-link">freelance web developer in Morocco</Link>{" "}
        behind every project, or{" "}
        <Link to="/contact" className="inline-link">request your free quote in 24h</Link>.
      </p>
    ),
    plans: [
      {
        name: "Business Website",
        priceKey: "vitrine",
        delivery: "Delivered in 7–10 days",
        features: ["Custom design", "Up to 10 pages", "100% responsive", "Technical SEO included", "Hosting + domain name (1 year)", "SSL certificate (HTTPS)", "Hands-on training", "Post-delivery support"],
        cta: "Request this pack",
      },
      {
        name: "E-commerce Website",
        priceKey: "ecommerce",
        highlight: true,
        delivery: "Delivered in 7–10 days",
        features: ["Everything in Business Website", "Unlimited product catalog", "Secure cart & online payment", "Stock & order management", "E-commerce SEO optimized", "2h training included"],
        cta: "Request this pack",
      },
      {
        name: "Custom Web Application",
        price: "On quote",
        delivery: "Timeline depends on scope",
        features: ["Full requirements analysis", "Custom technical architecture", "Authentication & users", "Admin dashboard", "APIs & third-party integrations", "React, Node.js, WordPress — as needed"],
        cta: "Get a free quote",
      },
    ],
  },
};

const MarketPage = ({ market }) => {
  const data = marketConfig[market];
  const L = LABELS[data.lang];
  const { track, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    i18n.changeLanguage(data.lang);
    // Market pages are single-language: clear city/hreflang so the language
    // switcher hides and no stale city data leaks in from a previous page.
    setCityData({ currentLang: data.lang, currentCity: null, hreflang: null });
  }, [data.lang, setCityData]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MouDEV — Développeur Web Freelance",
    description: data.metaDescription,
    url: data.canonical,
    telephone: "+212696964341",
    image: "https://www.moudevpro.com/webdev-logo.png",
    priceRange: `${data.price.vitrine} - ${data.price.ecommerce}`,
    currenciesAccepted: data.currencyCode,
    paymentAccepted: "Virement bancaire, Wise, PayPal",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    areaServed: { "@type": "Country", name: data.country },
    knowsLanguage: ["fr", "en", "ar"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "30",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Amine Bennani" },
        reviewBody:
          "Site livré en 7 à 10 jours, optimisé SEO et visuellement parfait. Contact direct avec le développeur, sans agence.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Ahmed Ali" },
        reviewBody:
          "Travail à distance impeccable, communication fluide et résultat exactement conforme à ma demande. Je recommande.",
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        priceCurrency: data.currencyCode,
        price: data.priceNumeric.vitrine,
        availability: "https://schema.org/InStock",
        itemOffered: { "@type": "Service", name: "Création site vitrine professionnel" },
      },
      {
        "@type": "Offer",
        priceCurrency: data.currencyCode,
        price: data.priceNumeric.ecommerce,
        availability: "https://schema.org/InStock",
        itemOffered: { "@type": "Service", name: "Création site e-commerce" },
      },
    ],
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.metaTitle,
    url: data.canonical,
    description: data.metaDescription,
    inLanguage: data.hreflang,
    isPartOf: { "@type": "WebSite", name: "MouDEV", url: "https://www.moudevpro.com/" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".city-hero__content .subheading", ".city-context-text", ".city-faq__answer"],
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MouDEV", item: "https://www.moudevpro.com/" },
      { "@type": "ListItem", position: 2, name: data.country, item: data.canonical },
    ],
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: data.lang, dir: data.dir }}>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <meta name="keywords" content={data.keywords} />
        <meta name="author" content="MouDEV" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={data.canonical} />
        <link rel="alternate" hrefLang={data.hreflang} href={data.canonical} />
        <link rel="alternate" hrefLang="x-default" href={data.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MouDEV" />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:url" content={data.canonical} />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={data.h1} />
        <meta property="og:locale" content={data.locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">{data.h1}</h1>
          <p className="subheading sl-mb">{data.heroSub}</p>
          <div className="city-hero__actions">
            <Link className="link" to={WA_URL} onClick={() => track(WA_URL)}>
              {L.quote} — {data.country}
            </Link>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/hero-img.avif"
            loading="eager"
            fetchpriority="high"
            alt={`${data.h1} — MouDEV`}
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Intro */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">{L.whyTitle}</h2>
        <div className="city-context-text">
          {data.intro.map((p, i) => (
            <p key={i} className="text sl-mb">{p}</p>
          ))}
          {L.bridge}
        </div>
      </section>

      {/* GEO / AEO credibility facts — structured for AI citation */}
      <section className="geo-facts container" aria-label="MouDEV en résumé">
        <h2 className="secondary-heading center-text lg-mb">
          {L.factsTitle(data.country)}
        </h2>
        <div className="geo-facts__grid">
          {data.facts.map(([stat, label], i) => (
            <article key={i} className="geo-fact__card">
              <strong className="geo-fact__stat">{stat}</strong>
              <p className="geo-fact__label">{label}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="tarifs-reassurance container">
        <div className="tarifs-reasons">
          {data.valueProps.map(([icon, title, desc], i) => (
            <div key={i} className="tarifs-reason">
              <span className="tarifs-reason__icon">{icon}</span>
              <h3 className="tertiary-heading">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="tarifs-section container">
        <h2 className="secondary-heading center-text lg-mb">
          {L.pricingTitle(data.country)}
        </h2>
        <p className="text center-text sl-mb">{L.pricingSub}</p>
        <div className="tarifs-grid">
          {L.plans.map((plan) => (
            <div
              key={plan.name}
              className={`tarif-card${plan.highlight ? " tarif-card--highlight" : ""}`}
            >
              {plan.highlight && (
                <div className="tarif-card__badge">★</div>
              )}
              <h3 className="tarif-card__name">{plan.name}</h3>
              <p className="tarif-card__price">
                {plan.priceKey ? L.priceFrom(data.price[plan.priceKey]) : plan.price}
              </p>
              <p className="tarif-card__delivery">{plan.delivery}</p>
              <ul className="tarif-card__features">
                {plan.features.map((f, i) => (
                  <li key={i} className="tarif-card__feature">
                    <HiCheck className="tarif-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="tarif-card__cta">
                <Link to={WA_URL} rel="noopener noreferrer" className="link" onClick={() => track(WA_URL)}>
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Portfolio cityName={data.country} />

      {/* FAQ */}
      <section id="faq" className="home container">
        <h2 className="secondary-heading center-text lg-mb">{L.faqTitle}</h2>
        <div className="city-faq">
          {data.faq.map(([q, a], i) => (
            <details key={i} className="city-faq__item">
              <summary className="city-faq__question">{q}</summary>
              <p className="city-faq__answer">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <Temoignes />

      {/* Final CTA */}
      <section id="contact" className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">{L.ctaTitle}</h2>
          <p className="subheading lg-mb">{L.ctaSub}</p>
          <Link to={WA_URL} rel="noopener noreferrer" className="link" onClick={() => track(WA_URL)}>
            {L.ctaBtn}
          </Link>
        </div>
      </section>

      <Footer cityName={data.country} address={`Remote depuis le Maroc — disponible pour ${data.country}`} />
    </>
  );
};

export default MarketPage;
