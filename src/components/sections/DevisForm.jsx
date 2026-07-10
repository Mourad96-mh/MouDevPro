import { useState } from "react";
import { trackLead } from "../../utils/trackLead";
import { fireFormConversion } from "../../utils/conversions";
import { getVisitorRef } from "../../utils/attribution";
import { buildWaLink } from "../../hooks/useConversion";

const PROJECT_TYPES = [
  { value: "vitrine", label: "Site vitrine" },
  { value: "ecommerce", label: "Site e-commerce" },
  { value: "autre", label: "Autre (application, refonte…)" },
];

const BUDGETS = [
  { value: "moins-5000", label: "Moins de 5 000 DH" },
  { value: "5000-15000", label: "5 000 – 15 000 DH" },
  { value: "15000-30000", label: "15 000 – 30 000 DH" },
  { value: "plus-30000", label: "Plus de 30 000 DH" },
  { value: "ne-sais-pas", label: "Je ne sais pas encore" },
];

const PHONE_RE = /^(?:0[5-7]\d{8}|(?:\+|00)212[5-7]\d{8})$/;

/**
 * Qualification-gated devis form — the primary Google Ads conversion.
 * Leads go to the Google Sheet via trackLead (type "form") with the visitor
 * ref + attribution; the conversion fires via fireFormConversion().
 *
 * `source` tags where the form was submitted from (contact page, homepage…).
 */
const DevisForm = ({ source = "devis-form" }) => {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    ville: "",
    typeProjet: "",
    budget: "",
    message: "",
    website: "", // honeypot — humans never see or fill it
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  const [waLink, setWaLink] = useState("");

  // The visitor's own WhatsApp carries the lead to Mourad — no bot, no API.
  // Everything they typed is pre-filled; they only tap "send".
  const buildLeadMessage = (visitorRef) => {
    const projet =
      PROJECT_TYPES.find((t) => t.value === form.typeProjet)?.label || "—";
    const budget = BUDGETS.find((b) => b.value === form.budget)?.label || "—";
    return [
      `Bonjour, je souhaite un devis (Réf: ${visitorRef})`,
      `Nom: ${form.nom.trim()}`,
      `Tél: ${form.telephone.replace(/[\s.-]/g, "")}`,
      form.ville.trim() ? `Ville: ${form.ville.trim()}` : "",
      `Projet: ${projet}`,
      `Budget: ${budget}`,
      form.message.trim() ? `Message: ${form.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (form.nom.trim().length < 2) {
      errs.nom = "Veuillez indiquer votre nom (2 caractères minimum).";
    }
    const phone = form.telephone.replace(/[\s.-]/g, "");
    if (!PHONE_RE.test(phone)) {
      errs.telephone =
        "Numéro invalide — format attendu : 06XXXXXXXX ou +2126XXXXXXXX.";
    }
    if (!PROJECT_TYPES.some((t) => t.value === form.typeProjet)) {
      errs.typeProjet = "Veuillez choisir un type de projet.";
    }
    if (!BUDGETS.some((b) => b.value === form.budget)) {
      errs.budget = "Veuillez choisir une fourchette de budget.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot filled → bot. Pretend success, log nothing, fire nothing.
    if (form.website) {
      const botRef = getVisitorRef();
      setRef(botRef);
      setWaLink(buildWaLink(`Bonjour, je souhaite un devis (Réf: ${botRef})`));
      setSubmitted(true);
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    trackLead(
      {
        source,
        name: form.nom.trim(),
        phone: form.telephone.replace(/[\s.-]/g, ""),
        city: form.ville.trim(),
        projectType: form.typeProjet,
        budget: form.budget,
        message: form.message.trim(),
      },
      "form"
    );
    fireFormConversion();

    const visitorRef = getVisitorRef();
    const link = buildWaLink(buildLeadMessage(visitorRef));
    setRef(visitorRef);
    setWaLink(link);

    // Open WhatsApp with the lead's details pre-filled — synchronously in
    // the click gesture so popup blockers allow it. The success screen
    // below keeps a button as fallback if the tab fails to open.
    window.open(link, "_blank", "noopener");

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="contact-success">
        <span className="contact-success__icon">✅</span>
        <h3 className="secondary-heading">Merci !</h3>
        <p className="text sl-mb">
          Votre demande est bien enregistrée — votre référence est{" "}
          <strong>{ref}</strong>. Je vous recontacte avec un devis
          personnalisé sous 24h.
        </p>
        <p className="text sl-mb">
          <strong>Dernière étape :</strong> WhatsApp s'est ouvert avec votre
          demande pré-remplie — appuyez sur « Envoyer » pour me la
          transmettre. Il ne s'est pas ouvert ?
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Envoyer ma demande sur WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__group">
          <label htmlFor={`${source}-nom`} className="contact-form__label">
            Nom complet *
          </label>
          <input
            type="text"
            id={`${source}-nom`}
            name="nom"
            required
            className="contact-form__input"
            placeholder="Mohammed Alami"
            value={form.nom}
            onChange={handleChange}
          />
          {errors.nom && <p className="contact-form__error">{errors.nom}</p>}
        </div>
        <div className="contact-form__group">
          <label htmlFor={`${source}-telephone`} className="contact-form__label">
            Téléphone / WhatsApp *
          </label>
          <input
            type="tel"
            id={`${source}-telephone`}
            name="telephone"
            required
            className="contact-form__input"
            placeholder="+212 6XX XXX XXX"
            value={form.telephone}
            onChange={handleChange}
          />
          {errors.telephone && (
            <p className="contact-form__error">{errors.telephone}</p>
          )}
        </div>
      </div>

      <div className="contact-form__group">
        <label htmlFor={`${source}-ville`} className="contact-form__label">
          Ville (optionnel)
        </label>
        <input
          type="text"
          id={`${source}-ville`}
          name="ville"
          className="contact-form__input"
          placeholder="Casablanca, Rabat, Marrakech…"
          value={form.ville}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__row">
        <div className="contact-form__group">
          <label htmlFor={`${source}-typeProjet`} className="contact-form__label">
            Type de projet *
          </label>
          <select
            id={`${source}-typeProjet`}
            name="typeProjet"
            required
            className="contact-form__input contact-form__select"
            value={form.typeProjet}
            onChange={handleChange}
          >
            <option value="">Sélectionnez…</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.typeProjet && (
            <p className="contact-form__error">{errors.typeProjet}</p>
          )}
        </div>
        <div className="contact-form__group">
          <label htmlFor={`${source}-budget`} className="contact-form__label">
            Budget estimé *
          </label>
          <select
            id={`${source}-budget`}
            name="budget"
            required
            className="contact-form__input contact-form__select"
            value={form.budget}
            onChange={handleChange}
          >
            <option value="">Sélectionnez…</option>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className="contact-form__error">{errors.budget}</p>
          )}
        </div>
      </div>

      <div className="contact-form__group">
        <label htmlFor={`${source}-message`} className="contact-form__label">
          Décrivez votre projet (optionnel)
        </label>
        <textarea
          id={`${source}-message`}
          name="message"
          rows={4}
          maxLength={1000}
          className="contact-form__input contact-form__textarea"
          placeholder="Parlez-moi de votre activité et de vos objectifs…"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      {/* Honeypot — hidden from humans, bots fill it */}
      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor={`${source}-website`}>Website</label>
        <input
          type="text"
          id={`${source}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="link contact-form__submit"
        disabled={loading}
      >
        {loading ? "Envoi en cours…" : "Recevoir mon devis gratuit en 24h"}
      </button>
    </form>
  );
};

export default DevisForm;
