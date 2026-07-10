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

const FAQ_ITEMS = [
  {
    q: "Combien coûte un développeur web freelance au Maroc ?",
    a: "Mes tarifs sont fixes et transparents : site vitrine dès 2 000 DH, site e-commerce dès 3 000 DH, application web sur devis. Le devis est gratuit, détaillé ligne par ligne et envoyé sous 24h. Aucun frais caché, paiement après livraison.",
  },
  {
    q: "Pourquoi choisir un freelance plutôt qu'une agence web au Maroc ?",
    a: "Avec un freelance, vous parlez directement avec le développeur qui code votre site — pas de commercial ni de chef de projet intermédiaire. Résultat : un site livré en 7 à 10 jours au lieu de 1 à 3 mois, à un prix 3 à 5 fois inférieur, avec les mêmes technologies (React, WordPress, WooCommerce).",
  },
  {
    q: "Dans quelles villes intervenez-vous ?",
    a: "Je suis basé à Casablanca (Maarif) et je travaille avec des clients à Casablanca, Rabat, Marrakech et partout au Maroc — ainsi qu'à distance pour la France, le Canada et les USA. Tout le suivi se fait via WhatsApp, email et appels vidéo. Aucun frais de déplacement.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    a: "React et Next.js pour les applications web et les sites sur mesure, WordPress et WooCommerce pour les sites vitrine et boutiques en ligne. Je choisis la technologie adaptée à votre projet et votre budget — pas la plus chère.",
  },
  {
    q: "Comment être sûr du sérieux d'un freelance ?",
    a: "Trois garanties concrètes : un devis écrit avec prix fixe et délai garanti, un portfolio de 45+ projets livrés consultable en ligne, et le paiement après livraison — vous voyez le site fini avant de payer. Zéro acompte imposé, zéro risque.",
  },
  {
    q: "Le SEO est-il inclus dans vos prestations ?",
    a: "Oui. Chaque site livré est optimisé pour Google : balises title et meta, structure des titres, vitesse de chargement, images WebP, données structurées schema.org et responsive mobile. Votre site est indexable dès le premier jour.",
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Développeur Web Freelance Maroc",
      item: "https://www.moudevpro.com/developpeur-web-freelance-maroc",
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "MouDevPro — Développeur Web Freelance Maroc",
  description:
    "Développeur web freelance au Maroc — création de site vitrine, e-commerce et application web. Livraison 7 à 10 jours, paiement après livraison. Devis gratuit en 24h.",
  url: "https://www.moudevpro.com/developpeur-web-freelance-maroc",
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
    { "@type": "City", name: "Casablanca" },
    { "@type": "City", name: "Rabat" },
    { "@type": "City", name: "Marrakech" },
    { "@type": "Country", name: "Maroc" },
  ],
  serviceType: [
    "Création site web",
    "Site e-commerce",
    "Application web",
    "Refonte site web",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "30",
    bestRating: "5",
    worstRating: "1",
  },
};

const FreelancePage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => (prev ? { ...prev, currentCity: null } : null));
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Développeur Web Freelance Maroc | Sites dès 2 000 DH | MouDEV
        </title>
        <meta
          name="description"
          content="Développeur web freelance au Maroc — site vitrine dès 2 000 DH, e-commerce, application web. Livraison 7 à 10 jours, paiement après livraison. Devis gratuit 24h."
        />
        <meta
          property="og:title"
          content="Développeur Web Freelance Maroc | Sites dès 2 000 DH | MouDEV"
        />
        <meta
          property="og:description"
          content="Développeur web freelance au Maroc — site vitrine dès 2 000 DH, e-commerce, application web. Livraison 7 à 10 jours, paiement après livraison. Devis gratuit 24h."
        />
        <meta property="og:url" content="https://www.moudevpro.com/developpeur-web-freelance-maroc" />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Développeur Web Freelance Maroc | Sites dès 2 000 DH | MouDEV" />
        <meta name="twitter:description" content="Développeur web freelance au Maroc — site vitrine dès 2 000 DH, e-commerce, application web. Livraison 7 à 10 jours. Devis gratuit 24h." />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="développeur web freelance maroc, developpeur web freelance maroc, freelance développeur web, développeur web maroc, freelance web maroc, freelance web developer morocco" />
        <link rel="canonical" href="https://www.moudevpro.com/developpeur-web-freelance-maroc" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/developpeur-web-freelance-maroc" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/developpeur-web-freelance-maroc" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Développeur Web Freelance au Maroc — Sites dès 2 000 DH
          </h1>
          <p className="subheading sl-mb">
            Je suis Mourad, <strong>développeur web freelance au Maroc</strong>,
            basé à Casablanca. Je crée des sites vitrine, boutiques e-commerce et
            applications web pour des clients à Casablanca, Rabat et Marrakech —
            livrés en 7 à 10 jours, paiement après livraison. Vous parlez
            directement avec le développeur. Devis gratuit en 24h.
          </p>

          <div className="city-hero__actions">
            <Link className="link" to={WA_URL} onClick={() => track(WA_URL)}>
              Demandez votre devis gratuit
            </Link>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/home-dev-1.avif"
            loading="eager"
            fetchpriority="high"
            alt="Développeur web freelance Maroc — création site web professionnel MouDev"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Why a freelance */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">
          Pourquoi travailler avec un développeur web freelance au Maroc ?
        </h2>
        <div className="city-context-grid">
          <div className="city-context-text">
            <p className="text sl-mb">
              Un <strong>développeur web freelance</strong> vous apporte la même
              qualité technique qu'une agence — React, WordPress, WooCommerce —
              sans les frais de structure. Pas de commercial, pas de chef de
              projet, pas de loyer de bureau répercuté sur votre facture : vous
              payez le travail, pas l'organigramme.
            </p>
            <p className="text sl-mb">
              Concrètement, ça change trois choses : un{" "}
              <strong>prix 3 à 5 fois inférieur</strong> à une agence équivalente,
              une <strong>livraison en 7 à 10 jours</strong> au lieu de 1 à 3
              mois, et un interlocuteur unique — la personne qui répond à votre
              message WhatsApp est celle qui code votre site.
            </p>
            <p className="text">
              4 ans d'expérience, 45+ projets livrés à des PME, startups, hôtels,
              riads et associations partout au Maroc.{" "}
              <strong>Devis gratuit et transparent sous 24h.</strong>
            </p>
          </div>
          <div className="city-context-stats">
            <div className="city-stat">
              <span className="city-stat__num">2 000 DH</span>
              <span className="city-stat__label">Site vitrine dès</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">7-10 jours</span>
              <span className="city-stat__label">Délai de livraison</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">45+</span>
              <span className="city-stat__label">Projets livrés</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">0 DH</span>
              <span className="city-stat__label">Acompte imposé</span>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection cityName="Maroc" />

      {/* Freelance vs Agence */}
      <section id="freelance" className="city-compare home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Freelance vs Agence web au Maroc — la comparaison honnête
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
                  ["Délai", "7-10 jours", "1 à 3 mois"],
                  ["Paiement", "Après livraison", "Acompte imposé"],
                  ["Disponibilité", "WhatsApp 7j/7", "Horaires de bureau"],
                  ["Technologies", "React, WordPress, WooCommerce", "Les mêmes — plus cher"],
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

      {/* How it works */}
      <section className="home container">
        <h2 className="secondary-heading lg-mb">
          Comment se passe un projet avec un freelance ?
        </h2>
        <ul className="city-neighborhoods">
          {[
            {
              area: "Étape 1 — Devis gratuit sous 24h",
              desc: "Vous m'écrivez sur WhatsApp avec votre besoin. Je réponds avec un devis détaillé : prix fixe, délai garanti, tout est écrit.",
            },
            {
              area: "Étape 2 — Brief de 30 minutes",
              desc: "Un échange pour cadrer le projet : objectifs, couleurs, contenus, fonctionnalités. C'est la seule réunion du projet.",
            },
            {
              area: "Étape 3 — Design & développement",
              desc: "Je conçois la maquette, vous la validez, puis je développe le site complet — SEO, vitesse et mobile inclus.",
            },
            {
              area: "Étape 4 — Vos corrections",
              desc: "Vous testez le site sur vos appareils. Corrections illimitées jusqu'à validation — c'est votre site, pas le mien.",
            },
            {
              area: "Étape 5 — Mise en ligne, puis paiement",
              desc: "Le site part en ligne sur votre domaine. Vous payez à cette étape seulement — zéro acompte, zéro risque.",
            },
          ].map((s, i) => (
            <li key={i} className="city-neighborhood-item">
              <strong>{s.area} :</strong> {s.desc}
            </li>
          ))}
        </ul>
      </section>

      <TarifsSection cityName="Maroc" />

      <Portfolio cityName="Maroc" />

      {/* FAQ */}
      <section id="faq" className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Questions fréquentes — Développeur web freelance au Maroc
        </h2>
        <div className="city-faq">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="city-faq__item">
              <summary className="city-faq__question">{item.q}</summary>
              <p className="city-faq__answer">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="home container">
        <p className="text">
          <strong>Par ville :</strong> création de site web à{" "}
          <Link to="/casablanca">Casablanca</Link>,{" "}
          <Link to="/rabat">Rabat</Link> et{" "}
          <Link to="/marrakech">Marrakech</Link>. À lire aussi :{" "}
          <Link to="/blog/freelance-creation-site-web-maroc">
            freelance création site web au Maroc — avantages et tarifs
          </Link>{" "}
          et{" "}
          <Link to="/blog/choisir-developpeur-web-freelance-maroc">
            comment choisir un développeur web freelance
          </Link>
          .
        </p>
      </section>

      {/* Final CTA */}
      <section id="contact" className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">
            Un projet de site web au Maroc ?
          </h2>
          <p className="subheading lg-mb">
            Contactez-moi sur WhatsApp ou par téléphone — devis gratuit et
            personnalisé sous 24h. Développeur web freelance disponible à
            Casablanca, Rabat et Marrakech.
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
              onClick={() => trackPhone()}
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

export default FreelancePage;
