import { Link } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";
import useConversion from "../../hooks/useConversion";

const PLANS = [
  {
    id: "vitrine",
    name: "Site Vitrine",
    price: "dès 2 000 DH",
    delivery: "Livraison en 5 jours",
    highlight: false,
    features: [
      "Design sur mesure — identité de marque",
      "Jusqu'à 10 pages",
      "100% responsive (mobile, tablette, desktop)",
      "Optimisation SEO technique incluse",
      "Formulaire de contact",
      "Hébergement + nom de domaine (1 an)",
      "Certificat SSL (HTTPS)",
      "Interface d'administration",
      "Formation prise en main incluse",
      "Support WhatsApp après livraison",
    ],
    cta: "Demander ce pack",
  },
  {
    id: "ecommerce",
    name: "Site E-commerce",
    price: "dès 3 000 DH",
    delivery: "Livraison en 5 jours",
    highlight: true,
    features: [
      "Tout ce qui est inclus dans Site Vitrine",
      "Catalogue produits illimité",
      "Panier & paiement en ligne sécurisé",
      "Gestion des stocks & promotions",
      "Intégration CMI / PayPal / Virement",
      "Espace admin complet + formation 2h",
      "SEO e-commerce optimisé",
      "Fiches produits optimisées Google",
      "Suivi des commandes clients",
      "Support WhatsApp après livraison",
    ],
    cta: "Demander ce pack",
  },
  {
    id: "sur-mesure",
    name: "Application Web Sur Mesure",
    price: "Sur devis",
    delivery: "Délai selon le projet",
    highlight: false,
    features: [
      "Analyse complète des besoins",
      "Architecture technique sur mesure",
      "Authentification & gestion des utilisateurs",
      "Tableau de bord administrateur",
      "API & intégrations tierces",
      "Base de données sécurisée",
      "Déploiement cloud (Vercel, AWS, OVH…)",
      "React, Node.js, WordPress — selon le besoin",
      "Documentation technique fournie",
      "Maintenance mensuelle disponible",
    ],
    cta: "Obtenir un devis gratuit",
  },
];

const TarifsSection = ({ cityName }) => {
  const { track, WA_URL } = useConversion();
  const inCity = cityName && cityName !== "Maroc"
    ? ` à ${cityName}`
    : " au Maroc";

  return (
    <section id="tarifs" className="tarifs-section container">
      <h2 className="secondary-heading center-text lg-mb">
        Prix création site web{inCity} — tarifs transparents
      </h2>
      <div className="tarifs-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`tarif-card${plan.highlight ? " tarif-card--highlight" : ""}`}
          >
            {plan.highlight && (
              <div className="tarif-card__badge">Le plus populaire</div>
            )}
            <h3 className="tarif-card__name">{plan.name}</h3>
            <p className="tarif-card__price">{plan.price}</p>
            <p className="tarif-card__delivery">{plan.delivery}</p>
            <ul className="tarif-card__features">
              {plan.features.map((f, i) => (
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
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TarifsSection;
