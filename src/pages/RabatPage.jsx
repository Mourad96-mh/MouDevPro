import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiCheck, HiXMark, HiMiniPhone } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import ServicesSection from "../components/sections/ServicesSection";
import TarifsSection from "../components/sections/TarifsSection";
import Portfolio from "../components/sections/Portfolio";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";
import { cityConfig } from "../data/cityConfig";
import i18n from "../i18n";

const FAQ_ITEMS = [
  {
    q: "Quel est le prix d'un site web professionnel à Rabat ?",
    a: "La création d'un site web à Rabat démarre à 2 000 DH pour un site vitrine professionnel, et à 3 000 DH pour un site e-commerce. Le prix final dépend du nombre de pages et des fonctionnalités souhaitées. Je fournis un devis gratuit et détaillé sous 24h — sans engagement.",
  },
  {
    q: "Combien de temps faut-il pour créer un site web à Rabat ?",
    a: "Je livre un site vitrine ou un site e-commerce en 5 jours maximum. Pour les applications web sur mesure, le délai dépend de la complexité — je vous communique un planning précis dès le devis. Aucune réunion inutile, livraison rapide garantie.",
  },
  {
    q: "Intervenez-vous à Rabat ou uniquement à Casablanca ?",
    a: "J'interviens à Rabat, Casablanca et Marrakech. Tout le suivi se fait à distance via WhatsApp, email et appels vidéo — aucune contrainte géographique, aucun frais de déplacement. Que vous soyez à Hay Ryad, Agdal, Hassan ou au centre-ville de Rabat, je travaille avec vous directement.",
  },
  {
    q: "Créez-vous des sites web pour associations et ONG à Rabat ?",
    a: "Oui. Je crée des sites web institutionnels pour associations, ONG et organisations internationales basées à Rabat — design sobre et professionnel, multilingue FR/AR/EN, formulaires de contact, galerie de projets et pages de dons. Devis sur mesure selon votre structure et budget.",
  },
  {
    q: "Le SEO est-il inclus dans la création de site web à Rabat ?",
    a: "Oui, l'optimisation SEO technique est incluse dans chaque site livré : balises title et meta optimisées, structure H1/H2/H3, URLs propres, images WebP, site rapide et 100% responsive. Je propose également des prestations SEO locales pour positionner votre site sur les mots-clés 'création site web Rabat' et 'développeur web Rabat'.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};


const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
    { "@type": "ListItem", position: 2, name: "Rabat", item: "https://www.moudevpro.com/rabat" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "MouDevPro — Développeur Web Freelance Rabat",
  description:
    "Création de site web professionnel à Rabat. Développeur web freelance — site vitrine, e-commerce, site institutionnel. Startups, ONG, PME de Rabat. Devis gratuit en 24h.",
  url: "https://www.moudevpro.com/rabat",
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
  areaServed: [
    { "@type": "City", name: "Rabat" },
    { "@type": "City", name: "Casablanca" },
    { "@type": "City", name: "Marrakech" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "30",
    bestRating: "5",
    worstRating: "1",
  },
};


const RabatPage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    i18n.changeLanguage("fr");
    setCityData({ ...cityConfig.rabat.fr, currentLang: "fr", currentCity: "rabat" });
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Création Site Web à Rabat | Développeur Web Freelance Maroc | MouDEV
        </title>
        <meta
          name="description"
          content="Création site web à Rabat par un développeur web freelance. Site vitrine dès 2 000 DH, e-commerce, site institutionnel. Startups, ONG, PME. Devis gratuit en 24h."
        />
        <meta
          property="og:title"
          content="Création Site Web Rabat | Développeur Web Freelance | MouDEV"
        />
        <meta
          property="og:description"
          content="Développeur web freelance pour Rabat. Site vitrine dès 2 000 DH, e-commerce, institutionnel. Devis gratuit en 24h, livraison 5 jours."
        />
        <meta property="og:url" content="https://www.moudevpro.com/rabat" />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Création Site Web Rabat | Développeur Web Freelance | MouDEV" />
        <meta name="twitter:description" content="Développeur web freelance pour Rabat. Site vitrine dès 2 000 DH, e-commerce, institutionnel. Devis gratuit en 24h, livraison 5 jours." />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="création site web rabat, développeur web rabat, web developer rabat, site vitrine rabat, site e-commerce rabat, devis site web rabat, freelance web rabat" />
        <link rel="canonical" href="https://www.moudevpro.com/rabat" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/rabat" />
        <link rel="alternate" hrefLang="en" href="https://www.moudevpro.com/en/rabat" />
        <link rel="alternate" hrefLang="ar" href="https://www.moudevpro.com/ar/rabat" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/rabat" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Création Site Web à Rabat — Développeur Web Freelance
          </h1>
          <p className="subheading sl-mb">
            Je crée votre site web professionnel à Rabat — PME, startups, ONG,
            administrations. Vous parlez directement avec le développeur. Qualité agence,
            prix freelance. Devis gratuit en 24h.
          </p>

          <div className="city-hero__actions">
            <Link
              className="link"
              to={WA_URL}
              onClick={() => track(WA_URL)}
            >
              Devis gratuit — Rabat
            </Link>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/web-dev.avif"
            loading="eager"
            fetchpriority="high"
            alt="Développeur web freelance Rabat — création site web professionnel MouDev"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Local context */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">
          Développeur web freelance à Rabat — startups, ONG & PME
        </h2>
        <div className="city-context-grid">
          <div className="city-context-text">
            <p className="text sl-mb">
              Rabat est la capitale administrative du Maroc et un écosystème digital
              en pleine croissance. Rabat Technopolis, les startups du Smart City, les
              ONG internationales et les administrations publiques cherchent des{" "}
              <strong>développeurs web sérieux à Rabat</strong> pour leurs projets
              numériques.
            </p>
            <p className="text sl-mb">
              La <strong>création de site web à Rabat</strong> est l'un de mes marchés
              principaux. Je travaille avec des startups en early stage, des cabinets
              professionnels, des associations et des PME locales — toujours en contact
              direct, sans intermédiaire. Sites trilingues (FR/AR/EN) disponibles pour
              les organisations à vocation internationale.
            </p>
            <p className="text">
              Mes sites sont rapides, sécurisés et optimisés pour Google dès la
              livraison. <strong>Devis gratuit et personnalisé sous 24h.</strong>
            </p>
          </div>
          <div className="city-context-stats">
            <div className="city-stat">
              <span className="city-stat__num">2 000 DH</span>
              <span className="city-stat__label">Site vitrine dès</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">2–3 sem.</span>
              <span className="city-stat__label">Délai de livraison</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">FR/AR/EN</span>
              <span className="city-stat__label">Sites multilingues</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">100%</span>
              <span className="city-stat__label">Satisfaction client</span>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection cityName="Rabat" />

      {/* Freelance vs Agence */}
      <section className="city-compare home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Freelance vs Agence web à Rabat
          </h2>
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th className="compare-me">MouDEV — Freelance</th>
                  <th>Agence classique</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Contact", "Direct avec le développeur", "Commercial + chef de projet"],
                  ["Prix", "Dès 2 000 DH", "Dès 8 000 DH et plus"],
                  ["Délai", "5 jours", "1 à 3 mois"],
                  ["Paiement", "Après livraison", "Acompte imposé"],
                  ["Disponibilité", "WhatsApp 7j/7", "Horaires de bureau"],
                  ["Multilingue", "FR/AR/EN inclus sur devis", "Supplément facturé"],
                ].map(([critere, moi, agence], i) => (
                  <tr key={i}>
                    <td className="compare-critere">{critere}</td>
                    <td className="compare-me">
                      <HiCheck className="compare-check" /> {moi}
                    </td>
                    <td>
                      <HiXMark className="compare-cross" /> {agence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="center-text" style={{ marginTop: "3.2rem" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
            >
              Obtenir un devis en 24h
            </Link>
          </div>
        </div>
      </section>

      <TarifsSection cityName="Rabat" />

      <Portfolio cityName="Rabat" />

      {/* FAQ */}
      <section id="faq" className="home container">
        <h2 className="secondary-heading center-text lg-mb">Questions fréquentes — Création site web à Rabat</h2>
        <div className="city-faq">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="city-faq__item">
              <summary className="city-faq__question">{item.q}</summary>
              <p className="city-faq__answer">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">
            Prêt à créer votre site web à Rabat ?
          </h2>
          <p className="subheading lg-mb">
            Contactez-moi sur WhatsApp ou par téléphone — devis gratuit et personnalisé
            sous 24h. Développeur web freelance disponible pour Rabat, Casablanca et
            Marrakech.
          </p>
          <div className="city-hero__actions" style={{ justifyContent: "center" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
              style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
            >
              Devis gratuit — Rabat
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

      <Footer cityName="Rabat" address="Disponible à Rabat — basé à Casablanca, Maroc" />
    </>
  );
};

export default RabatPage;
