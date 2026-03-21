import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiCheck, HiXMark, HiMiniPhone } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import ServicesSection from "../components/sections/ServicesSection";
import TarifsSection from "../components/sections/TarifsSection";
import Portfolio from "../components/sections/Portfolio";
import FAQ from "../components/sections/FAQ";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";
import { cityConfig } from "../data/cityConfig";
import i18n from "../i18n";


const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "MouDevPro — Développeur Web Freelance Casablanca",
  description:
    "Création de site web professionnel à Casablanca. Développeur web freelance basé à Maarif — site vitrine, e-commerce, application sur mesure. Devis gratuit en 24h.",
  url: "https://www.moudevpro.com/casablanca",
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
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "30",
    bestRating: "5",
    worstRating: "1",
  },
};


const CasablancaPage = () => {
  const { track, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    i18n.changeLanguage("fr");
    setCityData({ ...cityConfig.casablanca.fr, currentLang: "fr", currentCity: "casablanca" });
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Création Site Web à Casablanca | Développeur Freelance Maroc | MouDEV
        </title>
        <meta
          name="description"
          content="Création site web à Casablanca par un développeur web freelance basé à Maarif. Site vitrine dès 2 000 DH, e-commerce, app sur mesure. Devis gratuit en 24h."
        />
        <meta
          property="og:title"
          content="Création Site Web Casablanca | Développeur Web Freelance | MouDEV"
        />
        <meta
          property="og:description"
          content="Développeur web freelance à Casablanca. Site vitrine dès 2 000 DH. Devis gratuit en 24h, livraison 5 jours."
        />
        <meta property="og:url" content="https://www.moudevpro.com/casablanca" />
        <link rel="canonical" href="https://www.moudevpro.com/casablanca" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/casablanca" />
        <link rel="alternate" hrefLang="en" href="https://www.moudevpro.com/en" />
        <link rel="alternate" hrefLang="ar" href="https://www.moudevpro.com/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/casablanca" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Création Site Web à Casablanca — Développeur Web Freelance
          </h1>
          <p className="subheading sl-mb">
            Je crée votre site web professionnel à Casablanca. Vous parlez
            directement avec le développeur — pas d'agence, pas
            d'intermédiaire. Qualité agence, prix freelance.
          </p>

          <div className="city-hero__actions">
            <Link
              className="link"
              to={WA_URL}
              onClick={() => track(WA_URL)}
            >
              Devis gratuit — Casablanca
            </Link>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/hero-img.avif"
            loading="eager"
            fetchpriority="high"
            alt="Développeur web freelance Casablanca — création site web professionnel MouDev"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Local context */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">
          Développeur web freelance à Casablanca — pourquoi me choisir ?
        </h2>
        <div className="city-context-grid">
          <div className="city-context-text">
            <p className="text sl-mb">
              Casablanca est la capitale économique du Maroc et le premier hub
              d'affaires du Maghreb. Chaque jour, des centaines de PME,
              startups et indépendants y cherchent un <strong>développeur web
              freelance à Casablanca</strong> pour créer ou refondre leur site
              internet. Je suis basé à Maarif et je connais le marché local.
            </p>
            <p className="text sl-mb">
              La <strong>création de site web à Casablanca</strong> est mon
              activité principale. Je travaille avec des boutiques du Maarif,
              des cabinets du Triangle d'Or, des restaurants d'Anfa et des
              startups de Sidi Maârouf — toujours en contact direct, sans
              intermédiaire.
            </p>
            <p className="text">
              Mes sites sont rapides, sécurisés et optimisés pour Google dès
              la livraison. Devis gratuit et personnalisé sous 24h.
            </p>
          </div>
          <div className="city-context-stats">
            <div className="city-stat">
              <span className="city-stat__num">30+</span>
              <span className="city-stat__label">Clients à Casablanca</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">2 000 DH</span>
              <span className="city-stat__label">Site vitrine dès</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">2–3 sem.</span>
              <span className="city-stat__label">Délai de livraison</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">100%</span>
              <span className="city-stat__label">Satisfaction client</span>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection cityName="Casablanca" />

      {/* Freelance vs Agence */}
      <section className="city-compare home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Freelance vs Agence web à Casablanca
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
                  ["SEO inclus", "Oui, toujours", "En option payante"],
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

      <TarifsSection cityName="Casablanca" />

      <Portfolio cityName="Casablanca" />
      <FAQ cityName="Casablanca" />

      {/* Final CTA */}
      <section id="contact" className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">
            Prêt à créer votre site web à Casablanca ?
          </h2>
          <p className="subheading lg-mb">
            Contactez-moi sur WhatsApp ou par téléphone — devis gratuit et
            personnalisé sous 24h. Développeur web freelance basé à Casablanca,
            disponible dès aujourd'hui.
          </p>
          <div className="city-hero__actions" style={{ justifyContent: "center" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
              style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
            >
              Devis gratuit — Casablanca
            </Link>
            <a
              href="tel:+212696964341"
              className="hero__phone"
              style={{ color: "var(--gray-100)" }}
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

export default CasablancaPage;
