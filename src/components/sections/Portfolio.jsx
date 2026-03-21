import { useTranslation } from "react-i18next";

const PROJECTS = [
  {
    tag: "Immobilier",
    title: "Mecalus",
    desc: "Plateforme immobilière pour acheter, vendre et investir au Maroc. Recherche avancée de biens, fiches propriétés détaillées et gestion locative à Casablanca et Marrakech.",
    alt: "Mecalus — plateforme immobilière Maroc, création site web pour agence immobilière Casablanca et Marrakech",
    url: "https://www.mecalus.org/",
  },
  {
    tag: "Sécurité & Surveillance",
    title: "Neutron Africa",
    desc: "Site professionnel pour une société spécialisée en systèmes de vidéosurveillance au Maroc et en Afrique : caméras IP, alarmes, équipements PoE et installation sur mesure.",
    alt: "Neutron Africa — création site web société vidéosurveillance et sécurité Maroc, caméras IP alarmes",
    url: "https://neutronafrica.ma/",
  },
  {
    tag: "Santé",
    title: "Mobile Healthcare",
    desc: "Site institutionnel pour une organisation de santé mobile : présentation des programmes médicaux, zones d'intervention et services de soins à domicile.",
    alt: "Mobile Healthcare — création site web institutionnel organisation santé mobile, services médicaux Maroc",
    url: "https://www.mobile-healthcare.org/",
  },
  {
    tag: "Portfolio",
    title: "MouDevPro",
    desc: "Mon propre site vitrine freelance, trilingue (FR/EN/AR), optimisé SEO pour les mots-clés locaux au Maroc, avec tracking Google Ads et Facebook Pixel.",
    alt: "MouDevPro — site vitrine développeur web freelance Maroc, création site web Casablanca Rabat Marrakech",
    url: "https://www.moudevpro.com/",
  },
  {
    tag: "Services Médicaux",
    title: "Smahri Ambulance",
    desc: "Site vitrine pour un service d'ambulance à Casablanca : prise de contact rapide, présentation des prestations médicales d'urgence et formulaire de devis en ligne.",
    alt: "Smahri Ambulance Casablanca — création site vitrine service ambulance urgences médicales Casablanca",
    url: "https://www.smahri-ambulance-casablanca.com/",
  },
  {
    tag: "Application Web",
    title: "Earth-W",
    desc: "Application web moderne développée avec React et déployée sur Netlify. Interface dynamique et expérience utilisateur fluide.",
    alt: "Earth-W — création application web sur mesure React, développeur web freelance Maroc",
    url: "https://earth-w.netlify.app/",
  },
];

const screenshotUrl = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="portfolio container">
      <h2 className="secondary-heading center-text lg-mb">{t("portfolio.h2")}</h2>
      <div className="portfolio__grid">
        {PROJECTS.map((project) => (
          <article key={project.url} className="portfolio__card">
            <div className="portfolio__card-img">
              <img
                src={screenshotUrl(project.url)}
                alt={project.alt}
                loading="lazy"
                className="portfolio__img"
                width="600"
                height="400"
              />
            </div>
            <div className="portfolio__card-body">
              <span className="portfolio__tag">{project.tag}</span>
              <h3 className="portfolio__card-title">{project.title}</h3>
              <p className="portfolio__card-desc">{project.desc}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio__explore-link"
              >
                Voir le projet →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
