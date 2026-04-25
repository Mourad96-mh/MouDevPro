import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiMiniPhone } from "react-icons/hi2";

import Stats from "../components/sections/Stats";
import ClientLogos from "../components/sections/ClientLogos";
import ServicesSection from "../components/sections/ServicesSection";
import TarifsSection from "../components/sections/TarifsSection";
import Portfolio from "../components/sections/Portfolio";
import FAQ from "../components/sections/FAQ";
import Temoignes from "../components/sections/Temoignes";
import Footer from "../components/layout/Footer";

import { useCityContext } from "../context/CityContext";
import useConversion from "../hooks/useConversion";
import i18n from "../i18n";

const CITIES = [
  {
    slug: "casablanca",
    name: "Casablanca",
    flag: "🏙️",
    desc: "Capitale économique du Maroc. PME, startups, e-commerce, cabinets professionnels.",
    keyword: "création site web casablanca",
  },
  {
    slug: "rabat",
    name: "Rabat",
    flag: "🏛️",
    desc: "Capitale administrative. Startups, ONG, associations — sites multilingues FR/AR/EN.",
    keyword: "création site web rabat",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    flag: "🌿",
    desc: "Capitale touristique. Hôtels, riads, restaurants — réservation en ligne, multilingue.",
    keyword: "site web hôtel marrakech",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "MouDevPro — Développeur Web Freelance Maroc",
  description:
    "Création de site web professionnel à Casablanca, Rabat et Marrakech. Développeur web freelance — site vitrine, e-commerce, application web sur mesure. Devis gratuit en 24h.",
  url: "https://www.moudevpro.com",
  telephone: "+212696964341",
  image: "https://www.moudevpro.com/webdev-logo.png",
  priceRange: "DH 2000 - DH 30000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Maarif",
    addressLocality: "Casablanca",
    addressRegion: "Grand Casablanca",
    addressCountry: "MA",
    postalCode: "20000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.589886,
    longitude: -7.603869,
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
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Fatime Benjelloun" },
      datePublished: "2025-10-15",
      reviewBody: "C'est avec grand plaisir que je tiens à exprimer mon entière satisfaction envers les services de MouDev. Professionnel, réactif et à l'écoute depuis le premier jour.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Amine Bennani" },
      datePublished: "2025-11-20",
      reviewBody: "MouDev a réalisé un travail excellent pour mon site vitrine. Livré en 5 jours, optimisé pour le SEO et visuellement parfait. Je recommande vivement.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Ahmed Ali" },
      datePublished: "2025-12-05",
      reviewBody: "Après plusieurs mauvaises expériences avec des agences classiques, j'ai enfin trouvé un expert sérieux. MouDev a créé exactement le site que je voulais, avec un vrai suivi et des conseils professionnels.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Mohammed Ben Ali" },
      datePublished: "2026-01-10",
      reviewBody: "Excellent travail ! Ma boutique en ligne génère maintenant des ventes régulières grâce au site e-commerce réalisé par MouDev. Disponible et le support est au top.",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de développement web au Maroc",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Création de site vitrine",
          description: "Site web professionnel jusqu'à 5 pages, responsive, optimisé SEO, hébergement inclus. Livré en 5 jours.",
          areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
        },
        price: "2000",
        priceCurrency: "MAD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Création de site e-commerce",
          description: "Boutique en ligne complète avec catalogue produits, panier, paiement sécurisé et interface d'administration. Livré en 5 jours.",
          areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
        },
        price: "3000",
        priceCurrency: "MAD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Application web sur mesure",
          description: "Développement d'applications web personnalisées — React, Next.js, Node.js — selon vos besoins spécifiques.",
          areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Refonte de site web",
          description: "Modernisation de votre site existant : design, performance, SEO et mobile-first.",
          areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
        },
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MouDEV — Développeur Web Freelance Maroc",
  url: "https://www.moudevpro.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.moudevpro.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Développeur Web Freelance Maroc | Création Site Web Professionnel | MouDEV",
  url: "https://www.moudevpro.com/",
  dateModified: "2026-03-24",
  inLanguage: "fr-MA",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".city-hero__content .subheading", ".home__text", ".faq__answer"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
    ],
  },
};

const HomePage = () => {
  const { setCityData } = useCityContext();
  const { track, trackPhone, WA_URL } = useConversion();

  useEffect(() => {
    i18n.changeLanguage("fr");
    setCityData({
      currentLang: "fr",
      currentCity: null,
      name: "Maroc",
      hreflang: {
        fr: "https://www.moudevpro.com/",
        en: "https://www.moudevpro.com/en",
        ar: "https://www.moudevpro.com/ar",
      },
    });
  }, [setCityData]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>
          Développeur Web Freelance Maroc | Création Site Web Professionnel | MouDEV
        </title>
        <meta
          name="description"
          content="Développeur web freelance au Maroc — Casablanca, Rabat, Marrakech. Site vitrine dès 2 000 DH, e-commerce, app sur mesure. Devis gratuit en 24h."
        />
        <meta name="keywords" content="développeur web freelance maroc, freelance creation site web maroc, création site web maroc, site web maroc, prix site web maroc, web developer morocco, website design morocco, freelance développeur web" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.moudevpro.com/" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.moudevpro.com/en" />
        <link rel="alternate" hrefLang="ar" href="https://www.moudevpro.com/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MouDEV" />
        <meta
          property="og:title"
          content="Développeur Web Freelance Maroc | Création Site Web Professionnel | MouDEV"
        />
        <meta
          property="og:description"
          content="Développeur web freelance au Maroc — Casablanca, Rabat, Marrakech. Site vitrine dès 2 000 DH, e-commerce, app sur mesure. Devis gratuit en 24h."
        />
        <meta property="og:url" content="https://www.moudevpro.com/" />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Développeur Web Freelance au Maroc — Création de Site Web Professionnel
          </h1>
          <p className="subheading sl-mb">
            Je crée votre site web professionnel au Maroc.
            Vous parlez directement avec le développeur — pas d'agence, pas
            d'intermédiaire. Qualité agence, prix freelance.{" "}
            <strong>Devis gratuit en 24h.</strong>
          </p>
          <div className="city-hero__actions">
            <Link className="link" to={WA_URL} onClick={() => track(WA_URL)}>
              Demandez votre devis gratuit — Réponse en 24h
            </Link>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/hero-img.avif"
            loading="eager"
            fetchpriority="high"
            alt="Développeur web freelance Maroc — création site web professionnel MouDev Casablanca"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Business intro */}
      <section className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Développeur web freelance au Maroc — Casablanca, Rabat, Marrakech
        </h2>
        <div className="home__content">
          <div className="home__text">
            <p className="text sl-mb">
              Vous cherchez un <strong>développeur web freelance au Maroc</strong> pour
              la création de votre site internet professionnel ? Je conçois des sites
              vitrine, des e-commerces et des applications web sur mesure qui génèrent
              des leads et des ventes — à Casablanca, Rabat et Marrakech.
              Vous parlez directement avec le développeur.{" "}
              <strong>Devis gratuit en 24h.</strong>
            </p>
            <p className="text sl-mb">
              Basé à <strong>Casablanca (Maarif)</strong>, je travaille avec des PME,
              startups, boutiques, hôtels, riads et associations partout au Maroc — tout
              à distance via WhatsApp. Sites rapides, sécurisés, 100% responsive et
              optimisés pour Google dès la livraison. Paiement après livraison.
            </p>
            <p className="text sl-mb">
              <strong>Qualité agence, prix freelance</strong> — site vitrine dès 2 000 DH,
              e-commerce dès 3 000 DH. Livraison en 5 jours. Zéro intermédiaire,
              zéro acompte imposé.
            </p>
            <Link className="link hero-link" to={WA_URL} onClick={() => track(WA_URL)}>
              Obtenir un devis gratuit en 24h
            </Link>
          </div>
          <div className="home__img">
            <img
              src="/home-dev-1.avif"
              alt="Création site web Maroc — développeur web freelance MouDev"
              className="img"
              loading="lazy"
              width="600"
              height="400"
            />
          </div>
        </div>
      </section>

      {/* GEO / AEO credibility block — structured facts for AI citation */}
      <section className="geo-facts container" aria-label="MouDEV en résumé">
        <h2 className="secondary-heading center-text lg-mb">
          Développeur web freelance à Casablanca — Ce qu'il faut savoir
        </h2>
        <div className="geo-facts__grid">
          <article className="geo-fact__card">
            <strong className="geo-fact__stat">4+ ans</strong>
            <p className="geo-fact__label">d'expérience en création de sites web professionnels au Maroc — React, Next.js, WordPress, WooCommerce.</p>
          </article>
          <article className="geo-fact__card">
            <strong className="geo-fact__stat">45+ projets</strong>
            <p className="geo-fact__label">livrés à des PME, startups, hôtels, riads et associations à Casablanca, Rabat et Marrakech.</p>
          </article>
          <article className="geo-fact__card">
            <strong className="geo-fact__stat">5 jours</strong>
            <p className="geo-fact__label">délai de livraison pour un site vitrine professionnel complet — responsive, SEO inclus, hébergement inclus.</p>
          </article>
          <article className="geo-fact__card">
            <strong className="geo-fact__stat">dès 2 000 DH</strong>
            <p className="geo-fact__label">tarif transparent pour un site vitrine professionnel. Paiement après livraison, zéro acompte imposé.</p>
          </article>
          <article className="geo-fact__card">
            <strong className="geo-fact__stat">Contact direct</strong>
            <p className="geo-fact__label">Vous parlez directement avec le développeur sur WhatsApp — pas d'agence, pas d'intermédiaire. Réponse sous 1h.</p>
          </article>
          <article className="geo-fact__card">
            <strong className="geo-fact__stat">5/5 étoiles</strong>
            <p className="geo-fact__label">note de satisfaction client sur 30+ projets livrés. Qualité agence, prix freelance — partout au Maroc.</p>
          </article>
        </div>
      </section>

      <Stats />
      <ClientLogos />

      {/* Services — reusable component */}
      <ServicesSection cityName="Casablanca" />

      {/* Tarifs — reusable component */}
      <TarifsSection cityName="Casablanca" />

      {/* Why freelance */}
      <section className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Pourquoi choisir un freelance plutôt qu'une agence web ?
        </h2>
        <div className="home-freelance-grid">
          {[
            {
              icon: "💬",
              title: "Contact direct",
              desc: "Vous parlez directement avec le développeur — pas de commercial, pas de chef de projet. Réponses rapides sur WhatsApp.",
            },
            {
              icon: "💰",
              title: "Prix sans overhead",
              desc: "Site vitrine dès 2 000 DH. Vous payez la prestation, pas les charges d'une agence — économie de 30 à 60%.",
            },
            {
              icon: "🚀",
              title: "Livraison en 5 jours",
              desc: "Site vitrine ou e-commerce — livraison en 5 jours maximum. Délais tenus, sans réunions inutiles.",
            },
            {
              icon: "✅",
              title: "Paiement après livraison",
              desc: "Vous payez seulement quand vous êtes satisfait du résultat. Zéro risque — aucun acompte imposé.",
            },
          ].map((item, i) => (
            <div key={i} className="home-freelance-card">
              <span className="home-freelance-icon">{item.icon}</span>
              <h3 className="tertiary-heading">{item.title}</h3>
              <p className="text">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio — reusable component */}
      <Portfolio cityName="Casablanca" />

      {/* FAQ — reusable component */}
      <FAQ cityName="Casablanca" />

      <Temoignes />

      {/* City landing pages */}
      <section className="home-cities home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Je crée votre site web à Casablanca, Rabat et Marrakech
          </h2>
          <div className="home-cities-grid">
            {CITIES.map((city) => (
              <Link key={city.slug} to={`/${city.slug}`} className="home-city-card">
                <span className="home-city-flag">{city.flag}</span>
                <h3 className="tertiary-heading">{city.name}</h3>
                <p className="text sl-mb">{city.desc}</p>
                <span className="service-keyword">{city.keyword}</span>
                <span className="home-city-cta">Voir la page {city.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">
            Vous avez un projet de site web au Maroc ?
          </h2>
          <p className="subheading lg-mb">
            Contactez-moi sur WhatsApp ou par téléphone — devis gratuit et personnalisé
            sous 24h. Développeur web freelance basé à Casablanca, disponible pour Rabat
            et Marrakech.
          </p>
          <div className="city-hero__actions" style={{ justifyContent: "center" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
              style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
            >
              Demandez votre devis gratuit
            </Link>
            <a
              href="tel:+212696964341"
              className="hero__phone"
              style={{ color: "var(--gray-100)" }}
              onClick={trackPhone}
            >
              <HiMiniPhone />
              <span>+212 696 964 341</span>
            </a>
          </div>
        </div>
      </section>

      <Footer cityName="Casablanca" address="Quartier Maarif, Casablanca, 20000" />
    </>
  );
};

export default HomePage;
