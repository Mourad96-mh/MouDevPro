import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiCheck, HiMiniPhone } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";

// Single source for the price shown in copy, FAQ and schema.
const MONTHLY_FEE = "1 000 DH";
const MIN_AD_BUDGET = "1 500 DH";

const PROBLEMS = [
  {
    title: "Des clics payés pour de mauvaises recherches",
    desc: "Sans mots-clés négatifs, votre annonce apparaît sur \"gratuit\", \"emploi\" ou \"formation\". Chaque clic est facturé, aucun ne devient client.",
  },
  {
    title: "Aucune mesure des contacts",
    desc: "Si les appels, clics WhatsApp et formulaires ne sont pas suivis, Google optimise pour des clics — pas pour des clients. Vous pilotez à l'aveugle.",
  },
  {
    title: "Une annonce qui ne correspond pas à la page",
    desc: "L'annonce promet une chose, la page d'arrivée en dit une autre. Google baisse votre Quality Score et vous payez chaque clic plus cher.",
  },
  {
    title: "Une campagne lancée puis oubliée",
    desc: "Google Ads n'est pas un réglage unique. Sans analyse régulière des recherches réelles et des enchères, le coût par contact monte mois après mois.",
  },
];

const FEATURES = [
  {
    icon: "🔎",
    title: "Recherche de mots-clés",
    desc: "Je sélectionne les recherches à forte intention d'achat dans votre secteur et votre ville — \"prix\", \"devis\", votre service + Casablanca — et j'écarte celles qui coûtent sans rapporter.",
  },
  {
    icon: "🎯",
    title: "Campagnes Search structurées",
    desc: "Un groupe d'annonces par service, des annonces rédigées pour chaque intention, un ciblage géographique précis et des extensions (appel, lieu, liens annexes).",
  },
  {
    icon: "📊",
    title: "Suivi des conversions",
    desc: "Appels, clics WhatsApp et formulaires remontés dans Google Ads et Google Analytics 4. Vous connaissez votre coût par contact, pas seulement votre coût par clic.",
  },
  {
    icon: "🚫",
    title: "Mots-clés négatifs",
    desc: "Une liste d'exclusions dès le lancement, enrichie chaque semaine à partir des recherches réelles qui ont déclenché vos annonces.",
  },
  {
    icon: "⚙️",
    title: "Optimisation continue",
    desc: "Enchères, annonces, horaires, appareils, zones : j'ajuste ce que disent les données, et je coupe ce qui ne rapporte pas.",
  },
  {
    icon: "📈",
    title: "Reporting clair",
    desc: "Un point chaque semaine sur WhatsApp et un rapport mensuel : budget dépensé, contacts obtenus, coût par contact, et les actions du mois suivant.",
  },
];

const STEPS = [
  {
    area: "Étape 1 — Audit gratuit",
    desc: "J'analyse votre activité, votre zone et votre compte Google Ads s'il existe déjà. Vous recevez un diagnostic écrit et une estimation du coût par clic dans votre secteur.",
  },
  {
    area: "Étape 2 — Stratégie",
    desc: "Mots-clés, structure des campagnes, budget recommandé et objectifs chiffrés. Vous validez avant toute dépense.",
  },
  {
    area: "Étape 3 — Suivi des conversions",
    desc: "Je configure la mesure des appels, des clics WhatsApp et des formulaires avant de lancer — pas de budget dépensé sans mesure fiable.",
  },
  {
    area: "Étape 4 — Lancement",
    desc: "Campagne mise en ligne sur un compte à votre nom. Les premiers clics arrivent généralement dans les 24 à 48 heures après l'approbation des annonces.",
  },
  {
    area: "Étape 5 — Optimisation chaque semaine",
    desc: "Analyse des recherches, ajout de mots-clés négatifs, ajustement des enchères et tests d'annonces. Un point hebdomadaire sur WhatsApp.",
  },
];

const COMPARISON = [
  ["Frais de gestion", "Souvent 2 500 à 5 000 DH/mois, ou 15 à 20 % du budget", `Dès ${MONTHLY_FEE}/mois, montant fixe`],
  ["Commission sur le budget", "Fréquente", "Aucune"],
  ["Interlocuteur", "Chef de projet, puis équipe", "Le consultant qui gère votre compte"],
  ["Propriété du compte", "Parfois au nom de l'agence", "Toujours à votre nom"],
  ["Engagement", "Souvent 6 à 12 mois", "Sans engagement"],
  ["Suivi", "Rapport mensuel", "Point hebdomadaire + rapport mensuel"],
];

const COMMITMENTS = [
  "Le compte Google Ads est créé à votre nom : il vous appartient, avec tout son historique.",
  "Aucune commission sur votre budget publicitaire, payé directement à Google.",
  "Sans engagement de durée : vous arrêtez quand vous voulez.",
  "Si Google Ads n'est pas rentable pour votre activité, je vous le dis avant de dépenser votre budget.",
  "Pas de budget augmenté sans données fiables : la mesure passe avant la croissance.",
];

const OTHER_SERVICES = [
  {
    icon: "🖥️",
    title: "Création de sites web",
    desc: "Sites vitrines, e-commerce et applications web rapides, pensés pour convertir — la base d'une campagne Google Ads rentable.",
    to: "/services#vitrine",
    label: "Création de site web au Maroc",
  },
  {
    icon: "🔍",
    title: "Référencement naturel (SEO)",
    desc: "Audit, optimisation technique, contenu et SEO local pour apparaître dans les résultats gratuits de Google sur la durée.",
    to: "/services#seo",
    label: "Référencement SEO au Maroc",
  },
  {
    icon: "🤖",
    title: "Automatisation par l'IA",
    desc: "Réponses automatiques, qualification des demandes, saisie et relances : j'automatise les tâches répétitives pour que vous gagniez du temps.",
    to: "/contact",
    label: "Demander un devis automatisation IA",
  },
];

const FAQ_ITEMS = [
  {
    q: "Combien coûte la gestion Google Ads à Casablanca ?",
    a: `Ma gestion Google Ads démarre à ${MONTHLY_FEE} par mois, en montant fixe. Le budget publicitaire est séparé : vous le payez directement à Google, sans aucune commission de ma part. Le tarif exact dépend du nombre de campagnes et vous est confirmé après l'audit gratuit.`,
  },
  {
    q: "Quel budget publicitaire prévoir au Maroc ?",
    a: `Je recommande au minimum ${MIN_AD_BUDGET} par mois, soit environ 50 DH par jour, pour obtenir assez de données et mesurer des résultats. Au Maroc, de nombreux mots-clés de services locaux coûtent entre 3 et 20 DH le clic. L'audit gratuit vous donne une estimation pour votre secteur.`,
  },
  {
    q: "En combien de temps voit-on des résultats ?",
    a: "Les premiers clics arrivent dans les 24 à 48 heures après l'approbation des annonces. Comptez ensuite 3 à 6 semaines d'optimisation pour stabiliser le coût par contact, le temps de collecter assez de données.",
  },
  {
    q: "Garantissez-vous un nombre de clients ?",
    a: "Non, et personne ne peut le garantir honnêtement : les résultats dépendent de votre offre, de votre secteur et de la concurrence. Je m'engage en revanche sur une mesure fiable, une optimisation chaque semaine et une transparence totale sur ce que rapporte chaque dirham.",
  },
  {
    q: "Google Ads ou SEO : par quoi commencer ?",
    a: "Google Ads apporte des contacts dès les premiers jours, le SEO construit une visibilité gratuite sur plusieurs mois. Pour une activité qui a besoin de clients rapidement, je recommande de démarrer avec Google Ads, puis de développer le SEO en parallèle.",
  },
  {
    q: "Google Ads fonctionne-t-il pour mon secteur ?",
    a: "Google Ads est efficace dès que vos clients cherchent votre service sur Google : santé, immobilier, services B2B, formation, tourisme, artisanat, e-commerce. L'audit gratuit vérifie le volume de recherche et le coût par clic dans votre secteur avant tout engagement.",
  },
  {
    q: "J'ai déjà un compte Google Ads. Pouvez-vous le reprendre ?",
    a: "Oui. Je commence par un audit de votre compte existant : structure, mots-clés, suivi des conversions, Quality Score. Vous recevez les corrections prioritaires, que vous décidiez ensuite de me confier la gestion ou non.",
  },
  {
    q: "Travaillez-vous en dehors de Casablanca ?",
    a: "Oui. Je suis basé à Casablanca et je gère des campagnes pour des entreprises de Rabat, Marrakech et tout le Maroc. Tout le suivi se fait à distance via WhatsApp et appel vidéo, au même tarif.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gestion Google Ads à Casablanca",
  description:
    "Gestion de campagnes Google Ads à Casablanca et au Maroc par un consultant freelance : mots-clés, annonces, suivi des conversions et optimisation hebdomadaire. Dès 1 000 DH/mois, sans commission sur le budget.",
  url: "https://www.moudevpro.com/google-ads",
  serviceType: ["Gestion Google Ads", "Publicité Google", "SEA", "Référencement payant"],
  areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
  provider: {
    "@type": "LocalBusiness",
    name: "MouDevPro",
    url: "https://www.moudevpro.com",
    telephone: "+212696964341",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quartier Maarif",
      addressLocality: "Casablanca",
      addressCountry: "MA",
      postalCode: "20000",
    },
  },
  offers: {
    "@type": "Offer",
    price: "1000",
    priceCurrency: "MAD",
    description: "Gestion mensuelle des campagnes Google Ads, sans engagement",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
    { "@type": "ListItem", position: 2, name: "Google Ads", item: "https://www.moudevpro.com/google-ads" },
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

const GoogleAdsPage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => prev ? { ...prev, currentCity: null } : null);
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Gestion Google Ads Casablanca dès 1 000 DH/mois | Consultant Freelance
        </title>
        <meta
          name="description"
          content="Gestion Google Ads à Casablanca dès 1 000 DH/mois : campagnes, suivi des appels et WhatsApp, optimisation chaque semaine. 0% commission. Audit gratuit 24h."
        />
        <meta
          property="og:title"
          content="Gestion Google Ads Casablanca dès 1 000 DH/mois | Consultant Freelance"
        />
        <meta
          property="og:description"
          content="Campagnes Google Ads gérées par un consultant freelance à Casablanca. Dès 1 000 DH/mois, sans commission ni engagement. Audit gratuit sous 24h."
        />
        <meta property="og:url" content="https://www.moudevpro.com/google-ads" />
        <meta property="og:image" content="https://www.moudevpro.com/og-default.jpg" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gestion Google Ads Casablanca | MouDEV" />
        <meta name="twitter:description" content="Campagnes Google Ads gérées par un consultant freelance. Dès 1 000 DH/mois, 0% commission. Audit gratuit sous 24h." />
        <meta name="twitter:image" content="https://www.moudevpro.com/og-default.jpg" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="gestion google ads casablanca, google ads casablanca, google ads maroc, agence google ads casablanca, consultant google ads maroc, prix google ads maroc, campagne google ads maroc, publicité google casablanca, freelance google ads maroc" />
        <link rel="canonical" href="https://www.moudevpro.com/google-ads" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/google-ads" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/google-ads" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Gestion Google Ads à Casablanca — Consultant Freelance
          </h1>
          <p className="subheading sl-mb">
            Je gère vos campagnes Google Ads à Casablanca et partout au Maroc
            pour transformer chaque dirham investi en appels, messages WhatsApp
            et demandes de devis. Gestion dès {MONTHLY_FEE}/mois, sans
            commission sur votre budget et sans engagement. Audit gratuit sous
            24h.
          </p>

          <div className="city-hero__actions">
            <Link
              className="link"
              to={WA_URL}
              onClick={() => track(WA_URL, "google-ads-hero")}
            >
              Demandez votre audit gratuit
            </Link>
            <a href="#tarifs" className="link link--outline">
              Voir le tarif
            </a>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/google-ads-hero.avif"
            loading="eager"
            fetchpriority="high"
            alt="Tableau de bord de performance des campagnes Google Ads — gestion Google Ads à Casablanca par MouDev"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Problem */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">
          Pourquoi tant de campagnes Google Ads ne rapportent rien
        </h2>
        <p className="text sl-mb">
          Google Ads est le moyen le plus rapide d'apparaître devant des clients
          qui cherchent déjà votre service à Casablanca. Mais la plupart des
          comptes que j'audite perdent une grande partie de leur budget pour
          quatre raisons :
        </p>
        <ul className="city-neighborhoods">
          {PROBLEMS.map((p, i) => (
            <li key={i} className="city-neighborhood-item">
              <strong>{p.title} :</strong> {p.desc}
            </li>
          ))}
        </ul>
        <p className="text">
          Ma gestion corrige ces quatre points dès le premier mois.
          <strong> Vous parlez directement avec la personne qui gère votre
          compte</strong> — pas d'intermédiaire, pas de compte confié à un
          junior.
        </p>
      </section>

      {/* Features */}
      <section id="services" className="ecommerce-features home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Ce que comprend ma gestion Google Ads
          </h2>
          <div className="ecommerce-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="ecommerce-feature-card">
                <span className="ecommerce-feature-icon">{f.icon}</span>
                <h3 className="tertiary-heading">{f.title}</h3>
                <p className="text">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section id="methode" className="home container">
        <h2 className="secondary-heading lg-mb">
          Ma méthode en 5 étapes
        </h2>
        <ul className="city-neighborhoods">
          {STEPS.map((s, i) => (
            <li key={i} className="city-neighborhood-item">
              <strong>{s.area} :</strong> {s.desc}
            </li>
          ))}
        </ul>
        <div className="city-hero__actions">
          <Link className="link" to={WA_URL} onClick={() => track(WA_URL, "google-ads-method")}>
            Obtenir un audit en 24h
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="city-tarifs-teaser home container">
        <h2 className="secondary-heading center-text lg-mb">
          Prix de la gestion Google Ads au Maroc
        </h2>
        <div className="ecommerce-pricing-card">
          <div className="ecommerce-pricing-header">
            <h3 className="tertiary-heading">Gestion Google Ads</h3>
            <p className="ecommerce-pricing-price">dès {MONTHLY_FEE}/mois</p>
            <p className="ecommerce-pricing-delivery">
              Montant fixe — sans commission, sans engagement
            </p>
          </div>
          <ul className="ecommerce-pricing-features">
            {[
              "Audit gratuit de votre activité ou de votre compte",
              "Compte Google Ads créé à votre nom",
              "Recherche de mots-clés et liste de mots-clés négatifs",
              "Campagnes Search ciblées sur votre ville",
              "Annonces rédigées et testées + extensions",
              "Suivi des appels, clics WhatsApp et formulaires",
              "Google Analytics 4 configuré",
              "Optimisation chaque semaine",
              "Point hebdomadaire sur WhatsApp",
              "Rapport mensuel : coût par contact et actions",
            ].map((f, i) => (
              <li key={i} className="tarif-card__feature">
                <HiCheck className="tarif-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="text center-text sl-mb">
            Budget publicitaire payé directement à Google — recommandé dès{" "}
            {MIN_AD_BUDGET}/mois.
          </p>
          <div className="tarif-card__cta">
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL, "google-ads-pricing")}
            >
              Lancer ma campagne Google Ads →
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparatif" className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Agence Google Ads ou consultant freelance ?
        </h2>
        <div className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>
                <th></th>
                <th>Agence classique</th>
                <th>Ma gestion Google Ads</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([label, agency, mine], i) => (
                <tr key={i}>
                  <td><strong>{label}</strong></td>
                  <td>{agency}</td>
                  <td>{mine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Commitments */}
      <section id="engagements" className="home container">
        <h2 className="secondary-heading lg-mb">
          Mes engagements
        </h2>
        <ul className="ecommerce-pricing-features">
          {COMMITMENTS.map((c, i) => (
            <li key={i} className="tarif-card__feature">
              <HiCheck className="tarif-check" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cities */}
      <section id="villes" className="home container">
        <h2 className="secondary-heading lg-mb">
          Google Ads à Casablanca, Rabat et Marrakech
        </h2>
        <ul className="city-neighborhoods">
          {[
            {
              area: "Google Ads à Casablanca",
              desc: "Le marché le plus concurrentiel du Maroc : PME, cliniques, immobilier, services B2B. Ciblage par quartier ou par rayon autour de votre adresse pour ne payer que les clics utiles.",
            },
            {
              area: "Google Ads à Rabat",
              desc: "Services professionnels, formation, santé : campagnes ciblées sur l'agglomération Rabat-Salé-Témara.",
            },
            {
              area: "Google Ads à Marrakech",
              desc: "Hôtels, riads, restaurants et activités touristiques : annonces en français et en anglais pour développer les réservations directes.",
            },
          ].map((c, i) => (
            <li key={i} className="city-neighborhood-item">
              <strong>{c.area} :</strong> {c.desc}
            </li>
          ))}
        </ul>
      </section>

      {/* Other services */}
      <section id="mes-services" className="ecommerce-features home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Mes autres services
          </h2>
          <div className="ecommerce-features-grid">
            {OTHER_SERVICES.map((s, i) => (
              <div key={i} className="ecommerce-feature-card">
                <span className="ecommerce-feature-icon">{s.icon}</span>
                <h3 className="tertiary-heading">{s.title}</h3>
                <p className="text sl-mb">{s.desc}</p>
                <Link to={s.to}>{s.label} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Questions fréquentes — Gestion Google Ads
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

      {/* Final CTA */}
      <section id="contact" className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">
            Vos prochains clients vous cherchent déjà sur Google
          </h2>
          <p className="subheading lg-mb">
            Audit gratuit de votre activité ou de votre compte Google Ads sous
            24h. Consultant freelance basé à Casablanca, disponible pour Rabat,
            Marrakech et tout le Maroc.
          </p>
          <div className="city-hero__actions" style={{ justifyContent: "center" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL, "google-ads-final")}
              style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
            >
              Demandez votre audit gratuit
            </Link>
            <a
              href="tel:+212696964341"
              className="hero__phone"
              style={{ color: "var(--gray-100)" }}
              onClick={() => trackPhone("google-ads-phone")}
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

export default GoogleAdsPage;
