import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiCheck, HiXMark, HiMiniPhone } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import TarifsSection from "../components/sections/TarifsSection";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";
import { cityConfig } from "../data/cityConfig";
import i18n from "../i18n";

const SERVICES = [
  {
    id: "hotel",
    title: "Site web hôtel Marrakech",
    titleEn: "Hotel Website Marrakech",
    price: "dès 4 990 DH",
    desc: "Votre hôtel mérite un site à la hauteur de votre établissement — galerie photos, système de réservation en ligne, intégration Booking.com, multilingue FR/EN/AR.",
    descEn: "Your hotel deserves a website that matches your property — photo gallery, online booking system, Booking.com integration, multilingual FR/EN/AR.",
    features: ["Réservation en ligne", "Galerie photos HD", "Multilingue FR/EN/AR", "Intégration Booking.com"],
  },
  {
    id: "riad",
    title: "Site web riad Marrakech",
    titleEn: "Riad Website Marrakech",
    price: "dès 4 990 DH",
    desc: "Un site qui capture l'âme de votre riad — design orientaliste sur mesure, réservation directe pour réduire les commissions OTA, galerie immersive et avis clients.",
    descEn: "A website that captures the soul of your riad — bespoke orientalist design, direct booking to reduce OTA commissions, immersive gallery and guest reviews.",
    features: ["Design sur mesure", "Réservation directe", "Multilingue FR/EN", "SEO tourism optimisé"],
  },
  {
    id: "restaurant",
    title: "Site web restaurant Marrakech",
    titleEn: "Restaurant Website Marrakech",
    price: "dès 2 000 DH",
    desc: "Site vitrine pour votre restaurant à Marrakech — menu interactif, galerie photos, réservation de table, carte Google intégrée et fiche Google My Business optimisée.",
    descEn: "Showcase website for your Marrakech restaurant — interactive menu, photo gallery, table reservation, embedded Google Maps and optimised Google Business profile.",
    features: ["Menu interactif", "Réservation de table", "Galerie photos", "Google My Business"],
  },
];

const FAQ_ITEMS = [
  {
    q: "Quel est le prix d'un site web pour un hôtel à Marrakech ?",
    a: "Un site web professionnel pour un hôtel ou un riad à Marrakech démarre à 4 990 DH. Ce prix inclut le design sur mesure, la galerie photos, la réservation en ligne et le site multilingue (FR/EN). Devis gratuit sous 24h.",
  },
  {
    q: "Pouvez-vous créer un site de réservation directe pour mon riad ?",
    a: "Oui. J'intègre des systèmes de réservation directe (Cloudbeds, Lodgify ou solution sur mesure) pour réduire vos commissions Booking.com et Airbnb. Vos clients réservent directement sur votre site, vous économisez 15 à 25% de commission.",
  },
  {
    q: "Mon site sera-t-il en anglais et en français ?",
    a: "Absolument. Je crée des sites multilingues français, anglais et arabe — indispensable pour les établissements touristiques de Marrakech qui accueillent une clientèle internationale. Le SEO est optimisé dans chaque langue.",
  },
  {
    q: "How much does a hotel website design cost in Marrakech?",
    a: "A professional hotel or riad website in Marrakech starts from 4,990 MAD. This includes custom design, photo gallery, online booking system, multilingual content (FR/EN/AR) and Google-optimised SEO. Free quote within 24h.",
  },
  {
    q: "Can you integrate my Marrakech riad with Booking.com or Airbnb?",
    a: "Yes. I can integrate your website with Booking.com, Airbnb and other OTAs for availability sync, while also setting up direct booking to reduce commission fees. Contact me for a free project assessment.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "MouDevPro — Développeur Web Freelance Marrakech",
  description:
    "Création de site web professionnel à Marrakech pour hôtels, riads et restaurants. Développeur web freelance — site vitrine, réservation en ligne, multilingue. Devis gratuit en 24h.",
  url: "https://www.moudevpro.com/marrakech",
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
    { "@type": "City", name: "Marrakech" },
    { "@type": "City", name: "Casablanca" },
    { "@type": "City", name: "Rabat" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "30",
    bestRating: "5",
    worstRating: "1",
  },
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

const MarrakechPage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    i18n.changeLanguage("fr");
    setCityData({ ...cityConfig.marrakech.fr, currentLang: "fr", currentCity: "marrakech" });
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>
          Création Site Web Marrakech | Hôtels, Riads, Restaurants | MouDEV
        </title>
        <meta
          name="description"
          content="Site web hôtel Marrakech, riad et restaurant. Développeur web freelance — réservation en ligne, multilingue FR/EN/AR, SEO tourisme. Devis gratuit en 24h."
        />
        <meta
          property="og:title"
          content="Hotel Website Marrakech | Riad & Restaurant Web Design | MouDEV"
        />
        <meta
          property="og:description"
          content="Professional hotel and riad website design in Marrakech. Online booking, multilingual FR/EN/AR, tourism SEO. Free quote in 24h."
        />
        <meta property="og:url" content="https://www.moudevpro.com/marrakech" />
        <link rel="canonical" href="https://www.moudevpro.com/marrakech" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/marrakech" />
        <link rel="alternate" hrefLang="en" href="https://www.moudevpro.com/marrakech" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="city-hero container">
        <div className="city-hero__content">
          <h1 className="heading--primary">
            Création Site Web Marrakech — Hôtels, Riads &amp; Restaurants
          </h1>
          {/* Bilingual subheading */}
          <p className="subheading sl-mb">
            Je crée des sites web professionnels pour les hôtels, riads et restaurants
            de Marrakech — réservation en ligne, multilingue FR/EN/AR, SEO tourisme.
            Réduisez vos commissions OTA, générez des réservations directes.
          </p>
          <p className="marrakech-en-subheading sl-mb">
            <em>
              Professional hotel website design in Marrakech — online booking system,
              multilingual FR/EN/AR, tourism SEO. Reduce OTA commissions, drive direct
              bookings.
            </em>
          </p>

          <div className="city-hero__actions">
            <Link
              className="link"
              to={WA_URL}
              onClick={() => track(WA_URL)}
            >
              Devis gratuit — Marrakech
            </Link>
            <a
              href="tel:+212696964341"
              className="hero__phone"
              onClick={trackPhone}
              aria-label="Call MouDev — Hotel website Marrakech"
            >
              <HiMiniPhone />
              <span>+212 696 964 341</span>
            </a>
          </div>
        </div>
        <div className="hero__img">
          <img
            src="/web-dev-1.avif"
            loading="eager"
            fetchpriority="high"
            alt="Hotel website design Marrakech — riad website Morocco MouDev"
            width="600"
            height="450"
          />
        </div>
      </section>

      {/* Local context */}
      <section className="city-context-section home container">
        <h2 className="secondary-heading lg-mb">
          Site web hôtel Marrakech — réduisez vos commissions, boostez vos réservations directes
        </h2>
        <div className="city-context-grid">
          <div className="city-context-text">
            <p className="text sl-mb">
              Marrakech accueille plus de 4 millions de touristes par an. Votre hôtel ou
              riad est visible sur Booking.com et Airbnb — mais chaque réservation vous
              coûte 15 à 25% de commission. Un{" "}
              <strong>site web professionnel pour votre hôtel à Marrakech</strong> avec
              un système de réservation directe vous permet de récupérer ces marges.
            </p>
            <p className="text sl-mb">
              Je crée des <strong>sites web pour hôtels, riads et restaurants à
              Marrakech</strong> — design immersif, galerie HD, réservation en ligne
              intégrée, multilingue français/anglais/arabe et SEO tourisme optimisé.
              Vos clients trouvent votre établissement sur Google et réservent
              directement.
            </p>
            <p className="text">
              <strong>Hotel website design Morocco:</strong> I build professional hotel
              and riad websites that rank on Google and drive direct bookings. Free
              quote within 24h.
            </p>
          </div>
          <div className="city-context-stats">
            <div className="city-stat">
              <span className="city-stat__num">4 990 DH</span>
              <span className="city-stat__label">Site hôtel dès</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">-25%</span>
              <span className="city-stat__label">Commissions OTA économisées</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">3 langues</span>
              <span className="city-stat__label">FR / EN / AR</span>
            </div>
            <div className="city-stat">
              <span className="city-stat__num">2–4 sem.</span>
              <span className="city-stat__label">Délai de livraison</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          Mes services web à Marrakech — Hotel Website Design Morocco
        </h2>
        <div className="casablanca-services">
          {SERVICES.map((s) => (
            <div key={s.id} className="casablanca-service-card">
              <h3 className="tertiary-heading">{s.title}</h3>
              <p className="marrakech-service-en-title">{s.titleEn}</p>
              <p className="casablanca-service-price">{s.price}</p>
              <p className="text sl-mb">{s.desc}</p>
              <p className="marrakech-service-en-desc text sl-mb">{s.descEn}</p>
              <ul className="casablanca-service-features">
                {s.features.map((f, i) => (
                  <li key={i}>
                    <HiCheck className="tarif-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="tarif-card__cta" style={{ marginTop: "2rem" }}>
                <Link
                  to={WA_URL}
                  rel="noopener noreferrer"
                  className="link"
                  onClick={() => track(WA_URL)}
                >
                  Demander un devis / Get a free quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* English section for international tourism operators */}
      <section className="marrakech-en-section home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Hotel Website Design Morocco — English Section
          </h2>
          <div className="marrakech-en-grid">
            <div className="marrakech-en-card">
              <h3 className="tertiary-heading">Why you need a direct booking website</h3>
              <p className="text sl-mb">
                Booking.com and Airbnb charge 15–25% commission on every reservation.
                A professional hotel website with a direct booking engine pays for
                itself within a few months. Stop giving away your margin to OTAs.
              </p>
              <p className="text">
                I build hotel websites that rank on Google for "hotel Marrakech",
                "riad Marrakech" and related English-language searches — targeting
                the international travelers who drive your highest-margin bookings.
              </p>
            </div>
            <div className="marrakech-en-card">
              <h3 className="tertiary-heading">What's included in your hotel website</h3>
              <ul className="marrakech-en-list">
                {[
                  "Custom design matching your property's style",
                  "Online booking system (direct reservations)",
                  "HD photo gallery & virtual tour",
                  "Multilingual content (French, English, Arabic)",
                  "Tourism SEO (Google rankings for hotel & riad keywords)",
                  "Booking.com & Airbnb availability sync",
                  "Google Maps & Google Business Profile integration",
                  "Mobile-first, fast-loading website",
                ].map((item, i) => (
                  <li key={i} className="marrakech-en-list__item">
                    <HiCheck className="tarif-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="center-text" style={{ marginTop: "3.2rem" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
            >
              Get a free quote — Hotel Website Marrakech
            </Link>
          </div>
        </div>
      </section>

      {/* Freelance vs Agence */}
      <section className="city-compare home">
        <div className="container">
          <h2 className="secondary-heading center-text lg-mb">
            Freelance vs Agence web à Marrakech
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
                  ["Délai", "2 à 4 semaines", "1 à 3 mois"],
                  ["Paiement", "Après livraison", "Acompte imposé"],
                  ["Multilingue", "FR/EN/AR inclus sur devis", "Supplément facturé"],
                  ["SEO tourisme", "Optimisé FR + EN", "Rarement inclus"],
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

      <TarifsSection cityName="Marrakech" />

      {/* FAQ */}
      <section id="faq" className="home container">
        <h2 className="secondary-heading center-text lg-mb">
          FAQ — Site web hôtel Marrakech / Riad website Morocco
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
            Prêt à booster vos réservations directes à Marrakech ?
          </h2>
          <p className="subheading lg-mb">
            Devis gratuit sous 24h — site web hôtel Marrakech, riad ou restaurant.
            Multilingue FR/EN/AR, réservation directe, SEO tourisme.{" "}
            <em>Free quote in 24h for your hotel website in Marrakech.</em>
          </p>
          <div className="city-hero__actions" style={{ justifyContent: "center" }}>
            <Link
              to={WA_URL}
              rel="noopener noreferrer"
              className="link"
              onClick={() => track(WA_URL)}
              style={{ background: "var(--gray-100)", color: "var(--scarletRed-500)", fontWeight: 700 }}
            >
              Devis gratuit — Marrakech
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

      <Footer
        cityName="Marrakech"
        address="Disponible à Marrakech — basé à Casablanca, Maroc"
      />
    </>
  );
};

export default MarrakechPage;
