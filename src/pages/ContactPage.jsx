import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiMiniPhone, HiEnvelope, HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import DevisForm from "../components/sections/DevisForm";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MouDevPro — Développeur Web Freelance",
  description:
    "Demandez votre devis gratuit pour la création de site web au Maroc. Réponse en 24h.",
  url: "https://www.moudevpro.com/contact",
  telephone: "+212696964341",
  email: "creation-site@moudevpro.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Maarif",
    addressLocality: "Casablanca",
    addressCountry: "MA",
    postalCode: "20000",
  },
  areaServed: ["Casablanca", "Rabat", "Marrakech", "Maroc"],
};

const ContactPage = () => {
  const { track, trackPhone, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => prev ? { ...prev, currentCity: null } : null);
  }, [setCityData]);

  return (
    <>
      <Helmet>
        <title>Devis Gratuit Site Web Maroc | Réponse en 24h | MouDEV</title>
        <meta
          name="description"
          content="Demandez votre devis gratuit pour la création de votre site web au Maroc. Développeur web freelance à Casablanca — réponse personnalisée en 24h."
        />
        <meta
          property="og:title"
          content="Devis Gratuit Site Web Maroc | Réponse en 24h | MouDEV"
        />
        <meta
          property="og:description"
          content="Devis gratuit et personnalisé en 24h pour votre site web au Maroc. Développeur web freelance basé à Casablanca."
        />
        <meta property="og:url" content="https://www.moudevpro.com/contact" />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Devis Gratuit Site Web Maroc | Réponse en 24h | MouDEV" />
        <meta name="twitter:description" content="Devis gratuit et personnalisé en 24h pour votre site web au Maroc. Développeur web freelance basé à Casablanca." />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.moudevpro.com/contact" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/contact" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/contact" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="contact-hero">
        <div className="container contact-hero__inner">
          <h1 className="heading--primary center-text">
            Devis Gratuit Site Web Maroc — Réponse en 24h
          </h1>
          <p className="subheading center-text">
            Décrivez votre projet — je vous réponds avec un devis personnalisé
            sous 24h. Pas d'engagement, pas de frais cachés.
          </p>

        </div>
      </section>

      {/* Form + contact info */}
      <section className="contact-section container">
        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrapper">
            <h2 className="secondary-heading lg-mb">Votre projet</h2>
            <DevisForm source="contact-page" />
          </div>

          {/* Contact info */}
          <div className="contact-info">
            <h2 className="secondary-heading lg-mb">Autres façons de me contacter</h2>

            <div className="contact-info__item">
              <HiChatBubbleLeftEllipsis className="contact-info__icon" />
              <div>
                <p className="contact-info__label">WhatsApp — réponse rapide</p>
                <Link
                  to={WA_URL}
                  rel="noopener noreferrer"
                  className="contact-info__link"
                  onClick={() => track(WA_URL)}
                >
                  +212 696 964 341
                </Link>
              </div>
            </div>

            <div className="contact-info__item">
              <HiMiniPhone className="contact-info__icon" />
              <div>
                <p className="contact-info__label">Téléphone</p>
                <a
                  href="tel:+212696964341"
                  className="contact-info__link"
                  onClick={() => trackPhone()}
                >
                  +212 696 964 341
                </a>
              </div>
            </div>

            <div className="contact-info__item">
              <HiEnvelope className="contact-info__icon" />
              <div>
                <p className="contact-info__label">Email</p>
                <a
                  href="mailto:creation-site@moudevpro.com"
                  className="contact-info__link"
                >
                  creation-site@moudevpro.com
                </a>
              </div>
            </div>

            <div className="contact-info__hours">
              <p className="contact-info__label">Disponibilité</p>
              <p className="text">Lun – Sam : 9h00 – 22h00</p>
              <p className="text">Basé à Casablanca, Maarif</p>
            </div>

            <div className="contact-info__reassurance">
              <p className="text">
                <strong>Vous parlez directement avec le développeur.</strong>{" "}
                Pas de commercial, pas d'intermédiaire. Je réponds personnellement
                à chaque demande de devis sous 24h.
              </p>
            </div>

            <div className="contact-info__cities">
              <p className="contact-info__label">Je travaille à</p>
              <div className="contact-cities">
                <Link to="/casablanca" className="contact-city-link">Casablanca</Link>
                <Link to="/rabat" className="contact-city-link">Rabat</Link>
                <Link to="/marrakech" className="contact-city-link">Marrakech</Link>
                <span className="contact-city-link">Et partout au Maroc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer cityName="Casablanca" address="Quartier Maarif, Casablanca, 20000" />
    </>
  );
};

export default ContactPage;
