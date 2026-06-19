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
    a: "Oui. Mon pack e-commerce démarre à 3 000 DH et inclut : boutique en ligne complète, catalogue produits illimité, paiement CMI/PayPal, gestion des stocks, interface admin et formation 2h. Livré en 7 à 10 jours.",
  },
  {
    q: "Le prix d'un site web est-il différent à Casablanca, Rabat ou Marrakech ?",
    a: "Non, mes tarifs sont identiques à Casablanca, Rabat et Marrakech : site vitrine dès 2 000 DH et e-commerce dès 3 000 DH. Je travaille en remote dans tout le Maroc, sans frais de déplacement. Seul le besoin (hôtel, riad, restaurant, e-commerce, application) fait varier le devis — pas la ville.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: "https://www.moudevpro.com/tarifs" },
  ],
};

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
          Prix Site Web Maroc 2026 : dès 2 000 DH, Devis 24h | MouDEV
        </title>
        <meta
          name="description"
          content="Combien coûte un site web au Maroc ? Vitrine dès 2 000 DH, e-commerce dès 3 000 DH. Tarifs transparents, paiement après livraison. Devis gratuit en 24h."
        />
        <meta
          property="og:title"
          content="Prix Site Web Maroc 2026 : dès 2 000 DH, Devis 24h | MouDEV"
        />
        <meta
          property="og:description"
          content="Combien coûte un site web au Maroc ? Vitrine dès 2 000 DH, e-commerce dès 3 000 DH. Tarifs transparents, paiement après livraison. Devis gratuit en 24h."
        />
        <meta
          property="og:url"
          content="https://www.moudevpro.com/tarifs"
        />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prix Site Web Maroc 2026 : dès 2 000 DH, Devis 24h | MouDEV" />
        <meta name="twitter:description" content="Combien coûte un site web au Maroc ? Vitrine dès 2 000 DH, e-commerce dès 3 000 DH. Tarifs transparents, paiement après livraison. Devis gratuit en 24h." />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="prix site web maroc, tarif site web maroc, devis site web maroc, prix site vitrine maroc, prix site e-commerce maroc, coût création site web maroc, tarif développeur web maroc" />
        <link rel="canonical" href="https://www.moudevpro.com/tarifs" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/tarifs" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/tarifs" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="tarifs-hero">
        <div className="container tarifs-hero__inner">
          <h1 className="heading--primary center-text">
            Prix Création Site Web Maroc 2026 — dès 2 000 DH, Devis Gratuit 24h
          </h1>
          <p className="subheading center-text">
            Site vitrine dès <strong>2 000 DH</strong>, e-commerce dès{" "}
            <strong>3 000 DH</strong>. Paiement après livraison — zéro acompte.
            Livraison en 7 à 10 jours. <strong>Devis gratuit et transparent en
            24h</strong> — choisissez votre formule ci-dessous.
          </p>
        </div>
      </section>

      <TarifsSection />

      {/* Prix par ville */}
      <section className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Prix création site web à Casablanca, Rabat et Marrakech
        </h2>
        <p className="text center-text sl-mb">
          Mêmes tarifs transparents dans les trois villes — site vitrine dès
          2 000 DH, e-commerce dès 3 000 DH. Travail en remote, sans frais de
          déplacement. Choisissez votre ville pour un devis adapté à votre
          activité&nbsp;:
        </p>
        <div className="tarifs-cities-grid">
          <div className="tarifs-city-card">
            <h3 className="tertiary-heading sl-mb">Prix site web à Casablanca</h3>
            <p className="text">
              PME, e-commerce et startups du Maarif, d'Anfa et du Triangle d'Or.
              Site vitrine dès 2 000 DH, boutique en ligne dès 3 000 DH.
            </p>
            <Link className="tarifs-city-link" to="/casablanca">
              Création site web à Casablanca →
            </Link>
          </div>
          <div className="tarifs-city-card">
            <h3 className="tertiary-heading sl-mb">Prix site web à Rabat</h3>
            <p className="text">
              Startups, ONG, administrations et PME. Site institutionnel ou
              vitrine professionnel dès 2 000 DH, livraison en 7 à 10 jours.
            </p>
            <Link className="tarifs-city-link" to="/rabat">
              Création site web à Rabat →
            </Link>
          </div>
          <div className="tarifs-city-card">
            <h3 className="tertiary-heading sl-mb">Prix site web à Marrakech</h3>
            <p className="text">
              Hôtels, riads et restaurants. Site multilingue FR/EN/AR avec
              réservation en ligne directe, dès 2 000 DH.
            </p>
            <Link className="tarifs-city-link" to="/marrakech">
              Création site web à Marrakech →
            </Link>
          </div>
        </div>
        <p className="text center-text" style={{ marginTop: "2.4rem" }}>
          À lire aussi :{" "}
          <Link to="/blog/prix-site-web-maroc-2026">
            combien coûte un site web au Maroc en 2026
          </Link>{" "}
          — guide complet des prix.
        </p>
      </section>

      {/* Inclus dans chaque formule */}
      <section className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Ce qui est inclus dans chaque formule — sans frais cachés
        </h2>
        <div className="tarifs-includes-grid">
          <div className="tarifs-includes-col">
            <h3 className="tertiary-heading sl-mb">Toujours inclus</h3>
            <ul className="tarifs-includes-list">
              {[
                "Nom de domaine .ma ou .com — 1 an offert",
                "Hébergement SSD haute performance — 1 an offert",
                "Certificat SSL (HTTPS) — sécurité Google obligatoire",
                "Design responsive mobile, tablette, desktop",
                "Optimisation SEO technique — balises, vitesse, images",
                "Formulaire de contact + intégration WhatsApp",
                "Formation à la prise en main (1h incluse)",
                "Corrections post-livraison incluses (30 jours)",
                "Paiement après livraison — zéro acompte imposé",
              ].map((item, i) => (
                <li key={i} className="tarifs-includes-item">
                  <span className="tarifs-includes-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="tarifs-includes-col">
            <h3 className="tertiary-heading sl-mb">Calendrier de livraison</h3>
            <ol className="tarifs-timeline">
              {[
                { day: "Jour 1", label: "Brief & validation du devis", desc: "Échange WhatsApp de 30 min pour cadrer le projet, vos contenus et vos objectifs." },
                { day: "Jours 2–5", label: "Design & intégration", desc: "Je crée la maquette et intègre vos contenus. Vous validez avant la mise en ligne." },
                { day: "Jours 6–8", label: "Corrections & recette", desc: "Vous testez le site, je corrige. Itérations illimitées jusqu'à votre satisfaction." },
                { day: "Jours 9–10", label: "Mise en ligne & paiement", desc: "Le site est publié sur votre domaine. Vous payez seulement à ce stade." },
              ].map((step, i) => (
                <li key={i} className="tarifs-timeline-item">
                  <span className="tarifs-timeline-day">{step.day}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <p className="tarifs-timeline-desc">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

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
              Un site vitrine en 7 à 10 jours. Pas de réunions inutiles, pas
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
