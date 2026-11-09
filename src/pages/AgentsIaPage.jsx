import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiCheck, HiMiniPhone } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";

const PAGE_URL = "https://www.moudevpro.com/agents-ia";

const PROBLEMS = [
  {
    title: "Des demandes de devis qui attendent",
    desc: "Chaque demande arrive par email, WhatsApp ou formulaire, puis attend que quelqu'un la lise, vérifie les prix et rédige l'offre. Le client B2B qui attend 2 jours a déjà commandé ailleurs.",
  },
  {
    title: "Les mêmes questions, tous les jours",
    desc: "Disponibilité, délais, conditions de livraison, fiches techniques : votre équipe répond cent fois à des questions dont la réponse existe déjà dans vos documents.",
  },
  {
    title: "De la saisie manuelle partout",
    desc: "Commandes recopiées depuis un email, factures retapées dans un tableur, relances oubliées. Des heures perdues et des erreurs qui coûtent cher.",
  },
  {
    title: "Une prospection qui passe toujours après",
    desc: "Trouver de nouveaux acheteurs, les qualifier et leur écrire prend du temps — celui que vous n'avez jamais quand l'activité tourne.",
  },
];

const AGENTS = [
  {
    icon: "📄",
    title: "Agent devis et offres de prix",
    desc: "Il lit chaque demande entrante (email, formulaire, WhatsApp), identifie les produits, quantités et destination, applique votre grille tarifaire et prépare un devis prêt à valider. Vous relisez, vous envoyez.",
  },
  {
    icon: "💬",
    title: "Assistant client 24h/24",
    desc: "Un chatbot sur votre site ou WhatsApp, entraîné sur vos produits, vos conditions et vos documents. Il répond en français, anglais ou arabe, qualifie la demande et vous transmet les vrais prospects.",
  },
  {
    icon: "📥",
    title: "Traitement des emails et commandes",
    desc: "Tri automatique de la boîte de réception, extraction des commandes, bons de livraison et factures, mise à jour de votre tableur, CRM ou ERP, et relances automatiques des dossiers en attente.",
  },
  {
    icon: "🎯",
    title: "Agent de prospection B2B",
    desc: "Il recherche des acheteurs correspondant à votre cible (importateurs, distributeurs, revendeurs), les qualifie et rédige des messages personnalisés que vous validez avant envoi.",
  },
];

const USE_CASES = [
  {
    area: "Import-export et agroalimentaire",
    desc: "Demandes de prix multi-produits et multi-destinations, suivi des commandes, fiches produits et certifications envoyées automatiquement aux acheteurs en Europe ou en Afrique.",
  },
  {
    area: "Distribution et e-commerce",
    desc: "Questions sur le stock et la livraison traitées 24h/24, commandes WhatsApp transformées en commandes enregistrées, relances des paniers et des clients inactifs.",
  },
  {
    area: "Services et PME",
    desc: "Qualification des demandes entrantes, prise de rendez-vous, réponses aux questions fréquentes et préparation des propositions commerciales.",
  },
  {
    area: "Hôtels, riads et tourisme",
    desc: "Réponses multilingues aux demandes de réservation, informations pratiques et transmission des demandes de groupe à votre équipe.",
  },
];

const STEPS = [
  {
    area: "Étape 1 — Appel découverte gratuit",
    desc: "Vous me montrez comment les demandes, les commandes et les emails circulent aujourd'hui. J'identifie les tâches où un agent IA fait gagner le plus de temps.",
  },
  {
    area: "Étape 2 — Proposition chiffrée",
    desc: "Un document clair : ce que fait l'agent, les outils connectés, ce qui reste validé par un humain, le délai et le prix. Devis gratuit sous 24h.",
  },
  {
    area: "Étape 3 — Prototype sur vos vrais cas",
    desc: "Je construis une première version et la teste sur vos demandes réelles. Vous voyez les résultats avant la mise en production.",
  },
  {
    area: "Étape 4 — Mise en production",
    desc: "Connexion à vos outils (email, WhatsApp, Google Sheets, CRM, ERP, site web), formation de votre équipe et documentation.",
  },
  {
    area: "Étape 5 — Suivi et amélioration",
    desc: "Je surveille les réponses de l'agent, corrige les cas mal traités et l'améliore à partir de vos retours.",
  },
];

const COMMITMENTS = [
  "Vous parlez directement avec le développeur qui construit votre agent — pas d'intermédiaire.",
  "L'humain garde la main : devis, emails sortants et décisions sensibles sont validés par vous tant que vous le souhaitez.",
  "Vos données restent les vôtres : comptes et accès créés à votre nom, rien n'est revendu ni réutilisé.",
  "Si l'IA n'apporte pas de gain réel sur une tâche, je vous le dis avant de développer.",
  "Un prototype testé sur vos vrais cas avant tout déploiement.",
];

const OTHER_SERVICES = [
  {
    icon: "⚙️",
    title: "Application web sur mesure",
    desc: "Portail client, outil métier ou tableau de bord — souvent le complément idéal d'un agent IA.",
    to: "/services#sur-mesure",
    label: "Application web sur mesure au Maroc",
  },
  {
    icon: "🖥️",
    title: "Création de sites web",
    desc: "Sites vitrines et e-commerce rapides, prêts à accueillir un assistant IA dès la mise en ligne.",
    to: "/services#vitrine",
    label: "Création de site web au Maroc",
  },
  {
    icon: "📢",
    title: "Gestion Google Ads",
    desc: "Des demandes qualifiées dès les premiers jours — que votre agent IA traite ensuite en quelques minutes.",
    to: "/google-ads",
    label: "Gestion Google Ads à Casablanca",
  },
];

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce qu'un agent IA pour une entreprise ?",
    a: "Un agent IA est un programme qui comprend le langage naturel et agit dans vos outils : il lit un email ou un message WhatsApp, comprend la demande, consulte vos données (prix, stock, documents) et exécute une tâche — préparer un devis, répondre au client, enregistrer une commande. Contrairement à un simple chatbot, il est connecté à vos systèmes.",
  },
  {
    q: "Combien coûte la création d'un agent IA au Maroc ?",
    a: "Le prix dépend du nombre de tâches automatisées et des outils à connecter. Je vous envoie un devis gratuit et détaillé sous 24h après un appel découverte. Les coûts d'utilisation du modèle d'IA (quelques centaines de dirhams par mois pour la plupart des PME) sont payés directement au fournisseur, sans commission.",
  },
  {
    q: "En combien de temps mon agent IA est-il opérationnel ?",
    a: "Un premier agent ciblé (devis, support client ou tri des emails) est généralement prototypé en 1 à 2 semaines et mis en production en 2 à 4 semaines, selon les outils à connecter.",
  },
  {
    q: "L'agent IA peut-il se tromper ?",
    a: "Oui, comme un humain. C'est pourquoi je conçois des agents avec validation humaine sur les actions importantes (envoi de devis, prix, commandes) et je les teste sur vos vrais cas avant la mise en production. Vous relâchez le contrôle progressivement, quand les résultats sont fiables.",
  },
  {
    q: "Avec quels outils l'agent peut-il travailler ?",
    a: "Gmail ou Outlook, WhatsApp, votre site web, Google Sheets, Excel, la plupart des CRM et ERP disposant d'une API, ainsi que vos documents (catalogues PDF, grilles tarifaires, fiches techniques).",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Les accès sont créés à votre nom et limités au strict nécessaire. J'utilise des fournisseurs d'IA dont les offres professionnelles n'entraînent pas leurs modèles sur vos données, et rien n'est partagé avec des tiers.",
  },
  {
    q: "Travaillez-vous avec des entreprises hors du Maroc ?",
    a: "Oui. Je suis basé à Casablanca et je travaille à distance avec des entreprises au Maroc, en France, en Europe et au Canada — en français ou en anglais.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création d'agents IA pour entreprises au Maroc",
  description:
    "Création d'agents IA sur mesure pour entreprises par un développeur freelance basé à Casablanca : automatisation des devis, assistant client 24h/24, traitement des emails et commandes, prospection B2B.",
  url: PAGE_URL,
  serviceType: ["Agent IA", "Automatisation IA", "Chatbot IA", "Intelligence artificielle pour entreprise"],
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
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
    { "@type": "ListItem", position: 2, name: "Agents IA", item: PAGE_URL },
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

const AgentsIaPage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => prev ? { ...prev, currentCity: null } : null);
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>Création Agent IA pour Entreprise au Maroc | Développeur Freelance</title>
        <meta
          name="description"
          content="Création d'agents IA pour entreprises au Maroc : devis automatiques, assistant client 24h/24, emails et commandes traités, prospection B2B. Devis gratuit 24h."
        />
        <meta property="og:title" content="Création Agent IA pour Entreprise au Maroc | Développeur Freelance" />
        <meta
          property="og:description"
          content="Agents IA sur mesure pour automatiser devis, support client, emails et prospection. Développeur freelance à Casablanca, devis gratuit sous 24h."
        />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content="https://www.moudevpro.com/og-default.jpg" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Création Agent IA pour Entreprise au Maroc | MouDEV" />
        <meta name="twitter:description" content="Agents IA sur mesure : devis, support client, emails, prospection. Devis gratuit sous 24h." />
        <meta name="twitter:image" content="https://www.moudevpro.com/og-default.jpg" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="agent ia entreprise maroc, création agent ia, automatisation ia maroc, chatbot ia entreprise, agent ia casablanca, intelligence artificielle entreprise maroc, automatisation devis ia, chatbot whatsapp ia maroc" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="fr" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Création d'agents IA pour entreprises au Maroc
          </h1>
          <p className="subheading sl-mb">
            Je crée des <strong>agents IA sur mesure</strong> qui travaillent
            pour votre entreprise 24h/24 : devis préparés automatiquement,
            questions clients traitées sur WhatsApp et sur votre site, emails et
            commandes saisis sans intervention, prospection B2B accélérée.
            Développeur freelance basé à Casablanca — vous parlez directement
            avec celui qui construit votre agent. Devis gratuit sous 24h.
          </p>

          <div className="city-hero__actions">
            <Link
              className="link"
              to={WA_URL}
              onClick={() => track(WA_URL, "agents-ia-hero")}
            >
              Demandez votre devis gratuit
            </Link>
            <a href="#agents" className="link link--outline">
              Voir les agents IA
            </a>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/agents-ia-hero.svg"
            loading="eager"
            fetchpriority="high"
            alt="Schéma d'un agent IA pour entreprise : emails, WhatsApp et formulaires transformés automatiquement en devis, données CRM et réponses clients"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Problem */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">
          Ce que l'automatisation par l'IA change dans votre entreprise
        </h2>
        <p className="text sl-mb">
          Dans la plupart des PME, les mêmes tâches répétitives freinent les
          ventes. Un agent IA les prend en charge pour que votre équipe se
          concentre sur les clients :
        </p>
        <ul className="city-neighborhoods">
          {PROBLEMS.map((p, i) => (
            <li key={i} className="city-neighborhood-item">
              <strong>{p.title} :</strong> {p.desc}
            </li>
          ))}
        </ul>
      </section>

      {/* Agents */}
      <section id="agents" className="ecommerce-features home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Les agents IA que je crée pour les entreprises
          </h2>
          <div className="ecommerce-features-grid">
            {AGENTS.map((f, i) => (
              <div key={i} className="ecommerce-feature-card">
                <span className="ecommerce-feature-icon">{f.icon}</span>
                <h3 className="tertiary-heading">{f.title}</h3>
                <p className="text">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="city-hero__actions" style={{ justifyContent: "center", marginTop: "3.2rem" }}>
            <Link className="link" to={WA_URL} onClick={() => track(WA_URL, "agents-ia-agents")}>
              Obtenir un devis en 24h
            </Link>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="secteurs" className="home container">
        <h2 className="secondary-heading lg-mb">
          Agents IA par secteur d'activité
        </h2>
        <ul className="city-neighborhoods">
          {USE_CASES.map((c, i) => (
            <li key={i} className="city-neighborhood-item">
              <strong>{c.area} :</strong> {c.desc}
            </li>
          ))}
        </ul>
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
          <Link className="link" to={WA_URL} onClick={() => track(WA_URL, "agents-ia-method")}>
            Réserver mon appel découverte
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="city-tarifs-teaser home container">
        <h2 className="secondary-heading center-text lg-mb">
          Prix d'un agent IA pour entreprise
        </h2>
        <div className="ecommerce-pricing-card">
          <div className="ecommerce-pricing-header">
            <h3 className="tertiary-heading">Agent IA sur mesure</h3>
            <p className="ecommerce-pricing-price">Sur devis</p>
            <p className="ecommerce-pricing-delivery">
              Devis gratuit et détaillé sous 24h
            </p>
          </div>
          <ul className="ecommerce-pricing-features">
            {[
              "Appel découverte gratuit",
              "Analyse de vos tâches répétitives",
              "Agent conçu pour vos produits, prix et processus",
              "Connexion à vos outils (email, WhatsApp, Sheets, CRM, ERP)",
              "Validation humaine sur les actions sensibles",
              "Prototype testé sur vos vrais cas",
              "Réponses en français, anglais et arabe",
              "Formation de votre équipe et documentation",
              "Suivi et améliorations après la mise en production",
            ].map((f, i) => (
              <li key={i} className="tarif-card__feature">
                <HiCheck className="tarif-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="text center-text sl-mb">
            Coûts d'utilisation du modèle d'IA payés directement au fournisseur,
            sans commission.
          </p>
          <div className="tarif-card__cta">
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL, "agents-ia-pricing")}
            >
              Demander mon devis agent IA →
            </Link>
          </div>
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
          Questions fréquentes — Agents IA pour entreprises
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
            Quelle tâche voulez-vous ne plus jamais faire à la main ?
          </h2>
          <p className="subheading lg-mb">
            Décrivez-la-moi : je vous dis sous 24h si un agent IA peut la
            prendre en charge, en combien de temps et à quel prix. Développeur
            freelance basé à Casablanca, disponible pour Rabat, Marrakech et
            tout le Maroc.
          </p>
          <div className="city-hero__actions" style={{ justifyContent: "center" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL, "agents-ia-final")}
              style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
            >
              Demandez votre devis gratuit
            </Link>
            <a
              href="tel:+212696964341"
              className="hero__phone"
              style={{ color: "var(--gray-100)" }}
              onClick={() => trackPhone("agents-ia-phone")}
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

export default AgentsIaPage;
