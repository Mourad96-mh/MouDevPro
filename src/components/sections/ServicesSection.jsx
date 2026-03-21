import { Link } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";
import useConversion from "../../hooks/useConversion";

const buildServices = (city) => [
  {
    id: "vitrine",
    title: `Site Vitrine ${city}`,
    price: "dès 2 000 DH",
    highlight: false,
    desc: `Site professionnel pour votre activité à ${city} — PME, cabinet, startup ou association. Design sur mesure, SEO local inclus, livré en 5 jours.`,
    features: [
      "Design sur mesure",
      "100% responsive",
      "SEO technique inclus",
      "Hébergement + SSL 1 an",
      "Formulaire de contact",
      "Support WhatsApp",
    ],
  },
  {
    id: "ecommerce",
    title: "Site E-commerce",
    price: "dès 3 000 DH",
    highlight: true,
    desc: `Vendez en ligne 24h/24 depuis ${city} — catalogue produits, paiement sécurisé CMI/PayPal, gestion des stocks et formation admin incluse.`,
    features: [
      "Catalogue produits illimité",
      "Paiement CMI / PayPal",
      "Gestion des stocks",
      "SEO e-commerce optimisé",
      "Formation admin 2h",
      "Support WhatsApp",
    ],
  },
  {
    id: "sur-mesure",
    title: "Application Sur Mesure",
    price: "Sur devis",
    highlight: false,
    desc: `Outil métier, portail client ou plateforme sur mesure — je développe votre application web avec React ou WordPress, déployée et documentée.`,
    features: [
      "Architecture sur mesure",
      "Authentification utilisateurs",
      "Tableau de bord admin",
      "API & intégrations",
      "React / Node.js / WordPress",
      "Déploiement cloud",
    ],
  },
];

const ServicesSection = ({ cityName = "Maroc", services }) => {
  const { track, WA_URL } = useConversion();
  const items = services || buildServices(cityName);
  const inCity = cityName === "Maroc" ? "au Maroc" : `à ${cityName}`;

  return (
    <section id="services" className="home container">
      <h2 className="secondary-heading center-text lg-mb">
        Mes services de création site web {inCity}
      </h2>
      <div className="casablanca-services">
        {items.map((s) => (
          <div
            key={s.id}
            className={`casablanca-service-card${s.highlight ? " casablanca-service-card--highlight" : ""}`}
          >
            {s.highlight && (
              <div className="home-pack__badge">Le plus populaire</div>
            )}
            <h3 className="tertiary-heading">{s.title}</h3>
            <p className="casablanca-service-price">{s.price}</p>
            <p className="text sl-mb">{s.desc}</p>
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
                Demander un devis
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="center-text" style={{ marginTop: "3.2rem" }}>
        <Link to="/tarifs" className="link link--outline">
          Voir les tarifs détaillés →
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
