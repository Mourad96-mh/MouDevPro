import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiMiniPhone, HiEnvelope, HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import Footer from "../components/layout/Footer";
import useConversion from "../hooks/useConversion";
import { useCityContext } from "../context/CityContext";

const PROJECT_TYPES = [
  "Site vitrine",
  "Site e-commerce",
  "Application web sur mesure",
  "Refonte de site existant",
  "Landing page",
  "Autre",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MouDevPro — Développeur Web Freelance",
  description:
    "Demandez votre devis gratuit pour la création de site web au Maroc. Réponse en 24h.",
  url: "https://www.moudevpro.com/contact",
  telephone: "+212696964341",
  email: "contact@moudevpro.com",
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
  const { track, WA_URL } = useConversion();
  const { setCityData } = useCityContext();

  useEffect(() => {
    setCityData((prev) => prev ? { ...prev, currentCity: null } : null);
  }, [setCityData]);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    ville: "",
    typeProjet: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Fire conversion events
    if (typeof window.fbq === "function") window.fbq("track", "Lead");
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: "AW-CONVERSION_ID/LABEL" });
    }
    // Simulate async (replace with real API call)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

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
            {submitted ? (
              <div className="contact-success">
                <span className="contact-success__icon">✅</span>
                <h2 className="secondary-heading">Message reçu !</h2>
                <p className="text sl-mb">
                  Merci pour votre demande. Je vous répondrai avec un devis
                  personnalisé sous 24h.
                </p>
                <p className="text sl-mb">
                  Pour une réponse encore plus rapide, contactez-moi
                  directement sur WhatsApp.
                </p>
                <Link
                  to={WA_URL}
                  rel="noopener noreferrer"
                  className="link"
                  onClick={() => track(WA_URL)}
                >
                  Écrire sur WhatsApp
                </Link>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="secondary-heading lg-mb">Votre projet</h2>

                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="nom" className="contact-form__label">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      className="contact-form__input"
                      placeholder="Mohammed Alami"
                      value={form.nom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="email" className="contact-form__label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="contact-form__input"
                      placeholder="vous@exemple.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="telephone" className="contact-form__label">
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      className="contact-form__input"
                      placeholder="+212 6XX XXX XXX"
                      value={form.telephone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="ville" className="contact-form__label">
                      Ville
                    </label>
                    <input
                      type="text"
                      id="ville"
                      name="ville"
                      className="contact-form__input"
                      placeholder="Casablanca, Rabat…"
                      value={form.ville}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="typeProjet" className="contact-form__label">
                    Type de projet *
                  </label>
                  <select
                    id="typeProjet"
                    name="typeProjet"
                    required
                    className="contact-form__input contact-form__select"
                    value={form.typeProjet}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez…</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="message" className="contact-form__label">
                    Décrivez votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="contact-form__input contact-form__textarea"
                    placeholder="Parlez-moi de votre activité, vos objectifs, votre budget approximatif…"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="link contact-form__submit"
                  disabled={loading}
                >
                  {loading ? "Envoi en cours…" : "Envoyer ma demande de devis"}
                </button>
              </form>
            )}
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
                <a href="tel:+212696964341" className="contact-info__link">
                  +212 696 964 341
                </a>
              </div>
            </div>

            <div className="contact-info__item">
              <HiEnvelope className="contact-info__icon" />
              <div>
                <p className="contact-info__label">Email</p>
                <a
                  href="mailto:contact@moudevpro.com"
                  className="contact-info__link"
                >
                  contact@moudevpro.com
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
