import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiMiniPhone } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";

const SERVICES = [
  {
    id: "vitrine",
    icon: "🖥️",
    title: "Création de site vitrine",
    desc: "Votre présence professionnelle en ligne : design sur mesure, jusqu'à 10 pages, formulaire de contact, SEO technique inclus. Livré en 5 jours, responsive sur tous les appareils.",
    price: "dès 2 000 DH",
    link: "/tarifs",
    linkLabel: "Voir les tarifs vitrine",
    keywords: ["Site vitrine Maroc", "Site professionnel", "Création site web"],
  },
  {
    id: "ecommerce",
    icon: "🛍️",
    title: "Site e-commerce & boutique en ligne",
    desc: "Vendez en ligne 24h/24 — catalogue produits illimité, paiement CMI/PayPal, gestion des stocks, commandes et promotions. Formation admin 2h incluse. Livré en 7 jours.",
    price: "dès 3 000 DH",
    link: "/ecommerce",
    linkLabel: "En savoir plus sur l'e-commerce",
    keywords: ["Site e-commerce Maroc", "Boutique en ligne Casablanca", "WooCommerce Maroc"],
  },
  {
    id: "sur-mesure",
    icon: "⚙️",
    title: "Application web sur mesure",
    desc: "Portail client, outil métier, plateforme SaaS, marketplace — je développe votre application web sur mesure avec React, Node.js ou WordPress selon vos besoins fonctionnels.",
    price: "Sur devis",
    link: "/contact",
    linkLabel: "Demander un devis",
    keywords: ["Application web Maroc", "Développement React", "Portail client sur mesure"],
  },
  {
    id: "refonte",
    icon: "🔄",
    title: "Refonte de site web",
    desc: "Votre site est lent, daté ou mal référencé ? Je refonds votre site existant : nouveau design, optimisation Core Web Vitals, migration sécurisée sans perte de référencement. Livraison en 2 à 4 semaines.",
    price: "dès 2 000 DH",
    link: "/contact",
    linkLabel: "Demander un diagnostic",
    keywords: ["Refonte site web Maroc", "Migration site web", "Optimisation site existant"],
  },
  {
    id: "seo",
    icon: "🔍",
    title: "Référencement naturel (SEO)",
    desc: "Positionnez votre site en première page de Google sur vos mots-clés locaux et nationaux. Audit SEO, optimisation technique, contenu, netlinking — une stratégie SEO adaptée à votre marché marocain.",
    price: "Sur devis",
    link: "/contact",
    linkLabel: "Demander un audit SEO",
    keywords: ["SEO Maroc", "Référencement Casablanca", "Optimisation Google Maroc"],
  },
  {
    id: "ads",
    icon: "📢",
    title: "Google Ads & publicité en ligne",
    desc: "Campagnes Google Ads pour générer des leads qualifiés rapidement. Je gère votre budget publicitaire avec précision : ciblage local (Casablanca, Rabat, Marrakech), optimisation du Quality Score et suivi des conversions.",
    price: "Sur devis",
    link: "/contact",
    linkLabel: "Demander un devis Ads",
    keywords: ["Google Ads Maroc", "Publicité en ligne Casablanca", "Campagnes Google"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MouDevPro — Développeur Web Freelance",
  description:
    "Services de création de site web au Maroc : site vitrine, e-commerce, application sur mesure, refonte, SEO, Google Ads. Développeur freelance basé à Casablanca.",
  url: "https://www.moudevpro.com/services",
  telephone: "+212696964341",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Maarif",
    addressLocality: "Casablanca",
    addressCountry: "MA",
    postalCode: "20000",
  },
  areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
  serviceType: [
    "Création site web",
    "Site e-commerce",
    "Application web",
    "Refonte site web",
    "SEO",
    "Google Ads",
  ],
};

const ServicesPage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => prev ? { ...prev, currentCity: null } : null);
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Services Web Freelance Maroc | Site Vitrine, E-commerce, Refonte | MouDEV
        </title>
        <meta
          name="description"
          content="Site vitrine Maroc, e-commerce, refonte site web, application sur mesure et SEO. Développeur web freelance — dès 2 000 DH, livraison 5 jours, devis gratuit 24h."
        />
        <meta
          property="og:title"
          content="Services Web Freelance Maroc | Vitrine, E-commerce, Application | MouDEV"
        />
        <meta
          property="og:description"
          content="Site vitrine, e-commerce, application sur mesure, refonte, SEO. Développeur web freelance au Maroc — devis gratuit en 24h."
        />
        <meta property="og:url" content="https://www.moudevpro.com/services" />
        <link rel="canonical" href="https://www.moudevpro.com/services" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/services" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/services" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="tarifs-hero">
        <div className="container tarifs-hero__inner">
          <h1 className="heading--primary center-text">
            Services Web au Maroc — Site Vitrine, E-commerce &amp; Refonte
          </h1>
          <p className="subheading center-text">
            Je crée votre présence digitale complète : site vitrine, boutique en ligne,
            application web sur mesure, refonte, SEO et Google Ads. Qualité agence,
            prix freelance.
          </p>

        </div>
      </section>

      {/* Services list */}
      <section id="services" className="services-list container">
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.id} className="service-card" id={s.id}>
              <div className="service-card__header">
                <span className="service-card__icon">{s.icon}</span>
                <div>
                  <h2 className="secondary-heading">{s.title}</h2>
                  <p className="service-card__price">{s.price}</p>
                </div>
              </div>
              <p className="text sl-mb">{s.desc}</p>
              <div className="service-card__keywords">
                {s.keywords.map((k) => (
                  <span key={k} className="service-keyword">{k}</span>
                ))}
              </div>
              <div className="service-card__actions">
                <Link
                  to={WA_URL}
                  rel="noopener noreferrer"
                  className="link"
                  onClick={() => track(WA_URL)}
                >
                  Demander un devis
                </Link>
                <Link to={s.link} className="service-card__more-link">
                  {s.linkLabel} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process summary */}
      <section className="services-process home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Mon processus de travail — simple et transparent
          </h2>
          <div className="services-process-steps">
            {[
              { num: "01", title: "Devis gratuit", desc: "Vous me décrivez votre projet. Je vous envoie un devis détaillé et personnalisé sous 24h — sans engagement." },
              { num: "02", title: "Conception & design", desc: "Je crée les maquettes visuelles de votre site. Vous validez chaque page avant le développement." },
              { num: "03", title: "Développement", desc: "Je développe votre site avec les technologies adaptées. Vous suivez l'avancement via WhatsApp." },
              { num: "04", title: "Livraison & formation", desc: "Je mets votre site en ligne, je vous forme à son administration et je vous accompagne après livraison." },
            ].map((step) => (
              <div key={step.num} className="services-process-step">
                <span className="services-step-num">{step.num}</span>
                <h3 className="tertiary-heading">{step.title}</h3>
                <p className="text">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="tarifs" className="city-tarifs-teaser home container">
        <h2 className="secondary-heading center-text lg-mb">
          Tarifs transparents — site vitrine maroc
        </h2>
        <div className="tarifs-teaser-grid">
          <div className="tarifs-teaser-card">
            <h3 className="tertiary-heading">Site Vitrine</h3>
            <p className="tarifs-teaser-price">dès 2 000 DH</p>
            <p>Livraison en 5 jours</p>
          </div>
          <div className="tarifs-teaser-card tarifs-teaser-card--highlight">
            <h3 className="tertiary-heading">E-commerce</h3>
            <p className="tarifs-teaser-price">dès 3 000 DH</p>
            <p>Livraison en 7 jours</p>
          </div>
          <div className="tarifs-teaser-card">
            <h3 className="tertiary-heading">Sur Mesure</h3>
            <p className="tarifs-teaser-price">Sur devis</p>
            <p>Délai selon le projet</p>
          </div>
        </div>
        <div className="center-text" style={{ marginTop: "3.2rem" }}>
          <Link to="/tarifs" className="link link--outline">
            Voir les tarifs détaillés →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">
            Vous avez un projet ? Parlons-en.
          </h2>
          <p className="subheading lg-mb">
            Devis gratuit et personnalisé sous 24h — site vitrine maroc, e-commerce,
            application web. Développeur freelance disponible à Casablanca, Rabat et Marrakech.
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

export default ServicesPage;
