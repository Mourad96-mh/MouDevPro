import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";
import useInView from "../hooks/useInView";

const STACK = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "JavaScript", icon: "🟨" },
  { name: "Node.js", icon: "🟢" },
  { name: "WordPress", icon: "🔵" },
  { name: "WooCommerce", icon: "🛍️" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "MySQL / MongoDB", icon: "🗄️" },
  { name: "SEO technique", icon: "📈" },
  { name: "Google Ads", icon: "📣" },
];

const VALUES = [
  {
    icon: "💬",
    title: "Contact direct",
    desc: "Vous parlez directement avec le développeur. Pas de commercial, pas d'intermédiaire. Je réponds personnellement à chaque demande, souvent en moins d'une heure.",
  },
  {
    icon: "✅",
    title: "Paiement après livraison",
    desc: "Vous payez seulement quand vous êtes satisfait du résultat. Aucun acompte imposé, aucune surprise. Votre satisfaction avant tout.",
  },
  {
    icon: "🚀",
    title: "Délais tenus",
    desc: "Site vitrine livré en 5 jours, e-commerce en 7 jours. Je m'engage sur des délais réels et je les tiens — sans réunions inutiles.",
  },
  {
    icon: "🔍",
    title: "SEO dès le départ",
    desc: "Chaque site est optimisé pour Google dès la mise en ligne : balises, vitesse, structure sémantique. Votre site se positionne, pas seulement il s'affiche.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mourad — MouDevPro",
  jobTitle: "Développeur web freelance",
  description: "Développeur web freelance basé à Casablanca, Maroc. Plus de 4 ans d'expérience, 45+ projets livrés pour des PME, startups, hôtels et associations au Maroc. Spécialisé en React, Next.js, WordPress, WooCommerce et SEO.",
  url: "https://www.moudevpro.com/about",
  telephone: "+212696964341",
  email: "contact@moudevpro.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Maarif",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  knowsAbout: [
    "Création de site web",
    "Développement web freelance",
    "React",
    "Next.js",
    "WordPress",
    "WooCommerce",
    "SEO technique",
    "Google Ads",
    "Node.js",
    "Site vitrine",
    "Site e-commerce",
    "Application web sur mesure",
    "Référencement local Maroc",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Français" },
    { "@type": "Language", name: "Arabe" },
    { "@type": "Language", name: "Anglais" },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Développeur web freelance",
    occupationLocation: { "@type": "City", name: "Casablanca" },
    skills: "React, Next.js, WordPress, WooCommerce, Node.js, SEO, Google Ads",
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      currency: "MAD",
      percentile10: 2000,
      percentile90: 30000,
    },
  },
  worksFor: {
    "@type": "Organization",
    name: "MouDevPro",
    url: "https://www.moudevpro.com",
  },
  areaServed: [
    { "@type": "City", name: "Casablanca" },
    { "@type": "City", name: "Rabat" },
    { "@type": "City", name: "Marrakech" },
    { "@type": "Country", name: "Maroc" },
  ],
};

const AboutPage = () => {
  const { track, WA_URL } = useConversion();
  const { setCityData } = useCityContext();
  const [stackRef, stackInView] = useInView(0.1);
  const [valuesRef, valuesInView] = useInView(0.1);

  useEffect(() => {
    setCityData((prev) => (prev ? { ...prev, currentCity: null } : null));
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>À propos — Mourad, Développeur Web Freelance Maroc | MouDEV</title>
        <meta
          name="description"
          content="Développeur web freelance basé à Casablanca. 4+ ans d'expérience, 45+ projets livrés. React, Next.js, WordPress, SEO — devis gratuit en 24h."
        />
        <meta property="og:title" content="À propos — Mourad, Développeur Web Freelance Maroc | MouDEV" />
        <meta
          property="og:description"
          content="Développeur web freelance basé à Casablanca. 4+ ans d'expérience, 45+ projets livrés au Maroc."
        />
        <meta property="og:url" content="https://www.moudevpro.com/about" />
        <link rel="canonical" href="https://www.moudevpro.com/about" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <h1 className="heading--primary center-text">
            À propos de MouDEV
          </h1>
          <p className="subheading center-text">
            Développeur web freelance basé à Casablanca — je crée des sites web
            professionnels qui génèrent des résultats concrets pour les entreprises marocaines.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story container">
        <div className="about-story__grid">
          <div className="about-story__img">
            <img
              src="/web-dev-1.avif"
              alt="Mourad — développeur web freelance Casablanca, création site web Maroc"
              className="about-story__photo"
              loading="lazy"
            />
          </div>
          <div className="about-story__text">
            <h2 className="secondary-heading" style={{ marginBottom: "2.4rem" }}>
              Qui suis-je ?
            </h2>
            <p className="text sl-mb">
              Je m'appelle <strong>Mourad</strong>, développeur web freelance basé à{" "}
              <strong>Casablanca (Quartier Maarif)</strong>. Depuis plus de 4 ans, j'accompagne
              des PME, startups, boutiques, hôtels et associations partout au Maroc dans la
              création de leur présence en ligne.
            </p>
            <p className="text sl-mb">
              Mon approche est simple : <strong>vous parlez directement avec le développeur</strong>.
              Pas de commercial, pas de chef de projet, pas d'agence intermédiaire. Je gère votre
              projet de A à Z — de la conception jusqu'à la mise en ligne et au suivi SEO.
            </p>
            <p className="text sl-mb">
              J'ai livré plus de <strong>45 projets</strong> au Maroc — sites vitrine, e-commerces,
              applications web sur mesure, landing pages. Chaque projet est construit pour
              être rapide, sécurisé, responsive et bien positionné sur Google.
            </p>
            <p className="text">
              Disponible du lundi au samedi de 9h à 22h sur WhatsApp. Devis gratuit
              et personnalisé sous 24h. <strong>Paiement après livraison.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="about-stack" ref={stackRef}>
        <div className={`about-stack__inner container${stackInView ? " about-stack--visible" : ""}`}>
          <h2 className="secondary-heading center-text lg-mb">
            Technologies & compétences
          </h2>
          <div className="about-stack__grid">
            {STACK.map((tech, i) => (
              <div
                key={tech.name}
                className="about-stack__item"
                style={{ "--item-delay": `${i * 0.06}s` }}
              >
                <span className="about-stack__icon">{tech.icon}</span>
                <span className="about-stack__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values container" ref={valuesRef}>
        <h2 className="secondary-heading center-text lg-mb">
          Ma façon de travailler
        </h2>
        <div className={`about-values__grid${valuesInView ? " about-values--visible" : ""}`}>
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="about-value__card"
              style={{ "--value-delay": `${i * 0.1}s` }}
            >
              <span className="about-value__icon">{v.icon}</span>
              <h3 className="tertiary-heading" style={{ marginBottom: "1.2rem" }}>{v.title}</h3>
              <p className="text">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading" style={{ marginBottom: "1.6rem" }}>
            Un projet en tête ?
          </h2>
          <p className="subheading lg-mb">
            Contactez-moi sur WhatsApp — je vous réponds avec un devis gratuit et
            personnalisé sous 24h.
          </p>
          <Link
            to={WA_URL}
            rel="noopener noreferrer"
            className="link"
            onClick={() => track(WA_URL)}
            style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
          >
            Demandez votre devis gratuit
          </Link>
        </div>
      </section>

      <Footer cityName="Casablanca" address="Quartier Maarif, Casablanca, 20000" />
    </>
  );
};

export default AboutPage;
