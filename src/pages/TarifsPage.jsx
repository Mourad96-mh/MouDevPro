import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import TarifsSection from "../components/sections/TarifsSection";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";

const FAQ_ITEMS = [
  {
    q: "Quel est le prix d'un site web professionnel au Maroc ?",
    a: "Les tarifs démarrent à 2 000 DH pour un site vitrine professionnel et à 3 000 DH pour un site e-commerce. Le prix final dépend du nombre de pages, des fonctionnalités requises et des intégrations souhaitées. Je fournis un devis gratuit et détaillé sous 24h.",
  },
  {
    q: "Faut-il payer un acompte pour créer un site web ?",
    a: "Non. Chez MouDev, le paiement se fait uniquement après livraison et validation du site. Vous payez seulement quand vous êtes satisfait du résultat — zéro acompte imposé.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix d'un site vitrine ?",
    a: "Le prix d'un site vitrine chez MouDev inclut : design sur mesure, jusqu'à 10 pages, optimisation SEO technique, formulaire de contact, hébergement SSD, certificat SSL (HTTPS), nom de domaine pour 1 an, interface d'administration et formation de prise en main.",
  },
  {
    q: "Pourquoi les tarifs d'un freelance sont moins chers qu'une agence ?",
    a: "Un freelance n'a pas de bureau, d'équipe ni de frais de structure à répercuter sur ses clients. Vous bénéficiez du même niveau de qualité technique qu'une agence, à un prix compétitif — et vous parlez directement avec le développeur, sans intermédiaire.",
  },
  {
    q: "Peut-on avoir un site e-commerce professionnel à moins de 5 000 DH au Maroc ?",
    a: "Oui. Mon pack e-commerce démarre à 3 000 DH et inclut : boutique en ligne complète, catalogue produits illimité, paiement CMI/PayPal, gestion des stocks, interface admin et formation 2h. Livré en 5 jours maximum.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MouDevPro — Développeur Web Freelance",
  description:
    "Création de site web professionnel à Casablanca, Rabat et Marrakech. Freelance spécialisé en site vitrine, e-commerce et application web.",
  url: "https://www.moudevpro.com",
  telephone: "+212696964341",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Maarif",
    addressLocality: "Casablanca",
    addressCountry: "MA",
    postalCode: "20000",
  },
  areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
  priceRange: "DH 2000 - DH 30000",
};

const TarifsPage = () => {
  const { track, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => prev ? { ...prev, currentCity: null } : null);
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Prix Création Site Web Maroc | Tarifs Transparents &amp; Devis
          Gratuit | MouDEV
        </title>
        <meta
          name="description"
          content="Tarifs clairs pour la création de site web au Maroc. Site vitrine dès 2 000 DH, e-commerce dès 3 000 DH, application sur mesure. Développeur web freelance — devis gratuit en 24h."
        />
        <meta
          property="og:title"
          content="Prix Création Site Web Maroc | Tarifs & Devis Gratuit | MouDEV"
        />
        <meta
          property="og:description"
          content="Tarifs transparents pour la création de site web au Maroc. Site vitrine dès 2 000 DH. Devis gratuit en 24h."
        />
        <meta
          property="og:url"
          content="https://www.moudevpro.com/tarifs"
        />
        <link rel="canonical" href="https://www.moudevpro.com/tarifs" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/tarifs" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/tarifs" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="tarifs-hero">
        <div className="container tarifs-hero__inner">
          <h1 className="heading--primary center-text">
            Prix Création Site Web Maroc
          </h1>
          <p className="subheading center-text">
            Des tarifs transparents, sans surprise. Je vous livre votre site
            professionnel en 5 jours — paiement après livraison.
          </p>

        </div>
      </section>

      <TarifsSection />

      {/* Reassurance */}
      <section className="tarifs-reassurance container">
        <h2 className="secondary-heading center-text lg-mb">
          Pourquoi choisir un freelance plutôt qu'une agence ?
        </h2>
        <div className="tarifs-reasons">
          <div className="tarifs-reason">
            <span className="tarifs-reason__icon">💬</span>
            <h3 className="tertiary-heading">Contact direct</h3>
            <p>
              Vous parlez directement avec le développeur — pas de chef de
              projet, pas de commercial. Plus rapide, plus clair.
            </p>
          </div>
          <div className="tarifs-reason">
            <span className="tarifs-reason__icon">💰</span>
            <h3 className="tertiary-heading">Prix sans overhead d'agence</h3>
            <p>
              Pas de bureau, pas d'équipe à payer. Vous bénéficiez d'une
              qualité agence au prix d'un freelance.
            </p>
          </div>
          <div className="tarifs-reason">
            <span className="tarifs-reason__icon">🚀</span>
            <h3 className="tertiary-heading">Livraison rapide</h3>
            <p>
              Un site vitrine en 5 jours. Pas de réunions inutiles, pas
              de processus bureaucratique.
            </p>
          </div>
          <div className="tarifs-reason">
            <span className="tarifs-reason__icon">✅</span>
            <h3 className="tertiary-heading">Paiement après livraison</h3>
            <p>
              Vous payez seulement quand vous êtes satisfait du résultat. Zéro
              risque de votre côté.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="home container">
        <h2 className="secondary-heading center-text lg-mb">Questions fréquentes — Prix &amp; Tarifs</h2>
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
      <section className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">
            Vous avez un projet ? Parlons-en.
          </h2>
          <p className="subheading lg-mb">
            Devis gratuit et personnalisé sous 24h — prix site web Maroc
            transparent dès le premier échange.
          </p>
          <Link
            to={WA_URL}
            rel="noopener noreferrer"
            className="link"
            onClick={() => track(WA_URL)}
          >
            Demandez votre devis gratuit
          </Link>
        </div>
      </section>

      <Footer cityName="Casablanca" address="Quartier Maarif, Casablanca, 20000" />
    </>
  );
};

export default TarifsPage;
