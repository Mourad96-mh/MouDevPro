import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiCheck, HiMiniPhone } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";

const FEATURES = [
  {
    icon: "🛍️",
    title: "Catalogue produits illimité",
    desc: "Ajoutez autant de produits que vous voulez — fiches détaillées, photos multiples, variantes (taille, couleur), filtres et recherche avancée.",
  },
  {
    icon: "💳",
    title: "Paiement en ligne sécurisé",
    desc: "Intégration CMI (Maroc), PayPal, carte bancaire et virement. Votre client paie en toute confiance sur une page HTTPS certifiée.",
  },
  {
    icon: "📦",
    title: "Gestion des stocks & commandes",
    desc: "Suivez vos stocks en temps réel, gérez vos commandes, expédiez et relancez vos clients — tout depuis votre interface admin.",
  },
  {
    icon: "📱",
    title: "100% responsive & rapide",
    desc: "Votre boutique est optimisée pour les smartphones marocains. Chargement rapide, expérience fluide sur tous les appareils.",
  },
  {
    icon: "🔍",
    title: "SEO e-commerce optimisé",
    desc: "Balises produits structurées, URLs propres, schema.org Product, sitemap XML — votre boutique est indexée dès le premier jour.",
  },
  {
    icon: "🎓",
    title: "Formation admin incluse",
    desc: "Je vous forme à gérer votre boutique vous-même : ajouter des produits, traiter les commandes, gérer les promotions. 2h de formation incluses.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Combien coûte la création d'un site e-commerce au Maroc ?",
    a: "Mon site e-commerce professionnel démarre à 3 000 DH. Ce prix inclut le design sur mesure, le catalogue produits, le paiement en ligne (CMI/PayPal), la gestion des stocks, le SEO et la formation admin. Devis gratuit et personnalisé selon votre catalogue.",
  },
  {
    q: "En combien de temps ma boutique en ligne sera-t-elle livrée ?",
    a: "Un site e-commerce standard est livré en 5 jours maximum. Le délai dépend du nombre de produits, des intégrations requises et de la disponibilité de vos visuels. Je m'engage sur un délai précis dès le devis.",
  },
  {
    q: "Puis-je accepter des paiements en ligne depuis le Maroc ?",
    a: "Oui. J'intègre CMI (Centre Monétique Interbancaire), PayPal, carte bancaire et virement. Pour le CMI, vous devez avoir un compte bancaire professionnel au Maroc — je vous guide dans les démarches.",
  },
  {
    q: "Mon site e-commerce sera-t-il facile à gérer après livraison ?",
    a: "Absolument. Je livre une interface d'administration intuitive (WordPress/WooCommerce ou solution sur mesure) et j'inclus 2h de formation pour vous apprendre à gérer vos produits, commandes et promotions en autonomie.",
  },
  {
    q: "Quelle technologie utilisez-vous pour les sites e-commerce ?",
    a: "J'utilise principalement WooCommerce (sur WordPress) pour les boutiques classiques, et React + API sur mesure pour les projets plus complexes. Le choix dépend de votre catalogue, de vos besoins fonctionnels et de votre budget.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MouDevPro — Développeur Web Freelance",
  description:
    "Création de site e-commerce professionnel au Maroc. Boutique en ligne, paiement CMI, gestion des stocks, SEO inclus. Développeur freelance — devis gratuit en 24h.",
  url: "https://www.moudevpro.com/ecommerce",
  telephone: "+212696964341",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Maarif",
    addressLocality: "Casablanca",
    addressCountry: "MA",
    postalCode: "20000",
  },
  areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
  priceRange: "DH 3000 - DH 30000",
  serviceType: ["Site e-commerce", "Boutique en ligne", "WooCommerce", "E-commerce Maroc"],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
    { "@type": "ListItem", position: 2, name: "E-commerce", item: "https://www.moudevpro.com/ecommerce" },
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

const EcommercePage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => prev ? { ...prev, currentCity: null } : null);
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Site E-commerce Maroc | Boutique en Ligne Professionnelle | MouDEV
        </title>
        <meta
          name="description"
          content="Création site e-commerce au Maroc par un développeur freelance. Boutique en ligne professionnelle dès 3 000 DH — catalogue, paiement CMI, SEO inclus. Devis gratuit 24h."
        />
        <meta
          property="og:title"
          content="Site E-commerce Maroc | Boutique en Ligne | MouDEV"
        />
        <meta
          property="og:description"
          content="Boutique en ligne professionnelle au Maroc dès 3 000 DH. Paiement CMI, catalogue illimité, SEO inclus. Développeur freelance — devis gratuit en 24h."
        />
        <meta property="og:url" content="https://www.moudevpro.com/ecommerce" />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Site E-commerce Maroc | Boutique en Ligne | MouDEV" />
        <meta name="twitter:description" content="Boutique en ligne professionnelle au Maroc dès 3 000 DH. Paiement CMI, catalogue illimité, SEO inclus. Devis gratuit en 24h." />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="site e-commerce maroc, boutique en ligne casablanca, site e-commerce casablanca, création boutique en ligne maroc, woocommerce maroc, site e-commerce rabat, site e-commerce marrakech" />
        <link rel="canonical" href="https://www.moudevpro.com/ecommerce" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/ecommerce" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/ecommerce" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Site E-commerce Maroc — Boutique en Ligne Professionnelle
          </h1>
          <p className="subheading sl-mb">
            Je crée votre boutique en ligne professionnelle au Maroc. Vendez 24h/24,
            acceptez les paiements en ligne (CMI, PayPal), gérez vos stocks et
            développez votre chiffre d'affaires digital.
          </p>

          <div className="city-hero__actions">
            <Link
              className="link"
              to={WA_URL}
              onClick={() => track(WA_URL)}
            >
              Devis gratuit — E-commerce
            </Link>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/hero-img.avif"
            loading="eager"
            fetchpriority="high"
            alt="Création site e-commerce Maroc — boutique en ligne professionnelle MouDev"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Why e-commerce */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">
          Pourquoi créer une boutique en ligne au Maroc ?
        </h2>
        <div className="city-context-grid">
          <div className="city-context-text">
            <p className="text sl-mb">
              Le <strong>site e-commerce au Maroc</strong> est devenu incontournable.
              Avec plus de 20 millions d'internautes marocains et une adoption du
              paiement en ligne en pleine croissance, vendre sur internet n'est plus
              une option — c'est une nécessité pour rester compétitif.
            </p>
            <p className="text sl-mb">
              Je crée des <strong>boutiques en ligne professionnelles</strong> pour
              les commerçants de Casablanca, Rabat et Marrakech — intégration CMI,
              catalogue illimité, gestion des stocks et SEO inclus. Votre boutique
              visible sur Google dès le jour de la mise en ligne.
            </p>
            <p className="text">
              Vous parlez directement avec le développeur — pas d'agence, pas
              d'intermédiaire. Qualité professionnelle, prix freelance.
              <strong> Devis gratuit en 24h.</strong>
            </p>
          </div>
          <div className="city-context-stats">
            <div className="city-stat">
              <span className="city-stat__num">3 000 DH</span>
              <span className="city-stat__label">Boutique en ligne dès</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">3–5 sem.</span>
              <span className="city-stat__label">Délai de livraison</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">CMI</span>
              <span className="city-stat__label">Paiement en ligne</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">100%</span>
              <span className="city-stat__label">Mobile optimisé</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="services" className="ecommerce-features home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Tout ce qu'inclut votre site e-commerce
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

      {/* Pricing */}
      <section id="tarifs" className="city-tarifs-teaser home container">
        <h2 className="secondary-heading center-text lg-mb">
          Prix site e-commerce Maroc — tarif transparent
        </h2>
        <div className="ecommerce-pricing-card">
          <div className="ecommerce-pricing-header">
            <h3 className="tertiary-heading">Site E-commerce Professionnel</h3>
            <p className="ecommerce-pricing-price">dès 3 000 DH</p>
            <p className="ecommerce-pricing-delivery">Livraison en 5 jours</p>
          </div>
          <ul className="ecommerce-pricing-features">
            {[
              "Design sur mesure à votre image",
              "Catalogue produits illimité",
              "Panier et paiement en ligne (CMI, PayPal)",
              "Gestion des stocks et des commandes",
              "Gestion des promotions et codes promo",
              "SEO e-commerce complet (schema, sitemap, balises)",
              "100% responsive — mobile, tablette, desktop",
              "Interface admin intuitive",
              "Formation prise en main 2h incluse",
              "Hébergement + nom de domaine 1 an",
              "Certificat SSL (HTTPS)",
              "Support WhatsApp après livraison",
            ].map((f, i) => (
              <li key={i} className="tarif-card__feature">
                <HiCheck className="tarif-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="tarif-card__cta">
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
            >
              Demander un devis e-commerce
            </Link>
          </div>
        </div>
        <div className="center-text" style={{ marginTop: "2.4rem" }}>
          <Link to="/tarifs" className="link link--outline">
            Voir tous les tarifs →
          </Link>
        </div>
      </section>

      {/* Site vitrine cross-sell */}
      <section className="ecommerce-crosssell home container">
        <div className="ecommerce-crosssell-inner">
          <div>
            <h2 className="secondary-heading sl-mb">
              Vous avez besoin d'un site vitrine plutôt ?
            </h2>
            <p className="text">
              Si vous n'avez pas encore de ventes en ligne, un site vitrine
              professionnel dès 2 000 DH peut être le bon point de départ.
              Je vous aide à choisir la solution adaptée à vos objectifs.
            </p>
          </div>
          <Link to="/tarifs" className="link link--outline">
            Comparer les formules
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Questions fréquentes — Site e-commerce Maroc
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
            Prêt à lancer votre boutique en ligne ?
          </h2>
          <p className="subheading lg-mb">
            Devis gratuit et personnalisé sous 24h pour votre site e-commerce au Maroc.
            Développeur web freelance disponible à Casablanca, Rabat et Marrakech.
          </p>
          <div className="city-hero__actions" style={{ justifyContent: "center" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
              style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
            >
              Devis gratuit — E-commerce
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

export default EcommercePage;
