import { useState } from "react";
import { useTranslation } from "react-i18next";
import useInView from "../../hooks/useInView";

const PROJECTS = [
  {
    tag: "Agritech & Export",
    title: "Moreco",
    desc: "Site multilingue (FR/EN/ES/NL) pour une société d'innovation agronomique : catalogue de produits à base de silicium biodisponible, ressources R&D, actualités et demande de devis en ligne.",
    alt: "Moreco — création site web multilingue société agronomique Maroc, catalogue produits et demande de devis",
    url: "https://moreco.ma/fr/",
    image: "/portfolio/moreco.webp",
  },
  {
    tag: "E-commerce Décoration",
    title: "Maison Déco",
    desc: "Boutique en ligne de mobilier d'art et tableaux faits main au Maroc : consoles, tables basses et tableaux en série limitée, commandes sur mesure et paiement à la livraison.",
    alt: "Maison Déco — création boutique e-commerce mobilier d'art et décoration Maroc, paiement à la livraison",
    url: "https://maisondeco.ma/",
    image: "/portfolio/maison-deco.webp",
  },
  {
    tag: "E-commerce Art",
    title: "Nuance Art",
    desc: "Boutique en ligne d'art traditionnel encadré à Casablanca : calligraphie arabe, zellige et enluminures, navigation par thème et format, ventes flash et livraison offerte partout au Maroc.",
    alt: "Nuance Art — création site e-commerce tableaux calligraphie et zellige encadrés Casablanca",
    url: "https://nuanceart.ma/",
    image: "/portfolio/nuance-art.webp",
  },
  {
    tag: "E-commerce Pâtisserie",
    title: "Sweettools",
    desc: "Boutique en ligne de matériel de pâtisserie et cake design au Maroc : catalogue par catégories, kits prêts à l'emploi, conseils et paiement à la livraison avec envoi en 24 à 48 h.",
    alt: "Sweettools — création boutique en ligne matériel pâtisserie et cake design Maroc",
    url: "https://www.sweettols.com/",
    image: "/portfolio/sweet-tools.webp",
  },
  {
    tag: "Immobilier",
    title: "Mecalus",
    desc: "Plateforme immobilière pour acheter, vendre et investir au Maroc. Recherche avancée de biens, fiches propriétés détaillées et gestion locative à Casablanca et Marrakech.",
    alt: "Mecalus — plateforme immobilière Maroc, création site web pour agence immobilière Casablanca et Marrakech",
    url: "https://www.mecalus.org/",
    image: "/portfolio/mecalus.webp",
  },
  {
    tag: "Sécurité & Surveillance",
    title: "Neutron Africa",
    desc: "Site professionnel pour une société spécialisée en systèmes de vidéosurveillance au Maroc et en Afrique : caméras IP, alarmes, équipements PoE et installation sur mesure.",
    alt: "Neutron Africa — création site web société vidéosurveillance et sécurité Maroc, caméras IP alarmes",
    url: "https://neutronafrica.ma/",
    image: "/portfolio/neutron-africa.webp",
  },
  {
    tag: "Santé",
    title: "Mobile Healthcare",
    desc: "Site institutionnel pour une organisation de santé mobile : présentation des programmes médicaux, zones d'intervention et services de soins à domicile.",
    alt: "Mobile Healthcare — création site web institutionnel organisation santé mobile, services médicaux Maroc",
    url: "https://www.mobile-healthcare.org/",
    image: "/portfolio/mobile-healthcare.webp",
  },
  {
    tag: "Portfolio",
    title: "MouDevPro",
    desc: "Mon propre site vitrine freelance, trilingue (FR/EN/AR), optimisé SEO pour les mots-clés locaux au Maroc, avec tracking Google Ads et Facebook Pixel.",
    alt: "MouDevPro — site vitrine développeur web freelance Maroc, création site web Casablanca Rabat Marrakech",
    url: "https://www.moudevpro.com/",
    image: "/portfolio/moudevpro.webp",
  },
  {
    tag: "Services Médicaux",
    title: "Smahri Ambulance",
    desc: "Site vitrine pour un service d'ambulance à Casablanca : prise de contact rapide, présentation des prestations médicales d'urgence et formulaire de devis en ligne.",
    alt: "Smahri Ambulance Casablanca — création site vitrine service ambulance urgences médicales Casablanca",
    url: "https://www.smahri-ambulance-casablanca.com/",
    image: "/portfolio/smahri-ambulance.webp",
  },
  {
    tag: "Application Web",
    title: "Earth-W",
    desc: "Application web moderne développée avec React et déployée sur Netlify. Interface dynamique et expérience utilisateur fluide.",
    alt: "Earth-W — création application web sur mesure React, développeur web freelance Maroc",
    url: "https://earth-w.netlify.app/",
    image: "/portfolio/earth-w.webp",
  },
  {
    tag: "Site Vitrine",
    title: "Mourad Website",
    desc: "Site vitrine personnel moderne développé avec React : présentation de services, portfolio et formulaire de contact. Design soigné et responsive.",
    alt: "Mourad Website — création site vitrine personnel React, développeur web freelance Maroc",
    url: "https://mourad-website.netlify.app/",
    image: "/portfolio/mourad-website.webp",
  },
  {
    tag: "E-commerce",
    title: "Ecommerce Mou",
    desc: "Boutique en ligne complète développée sur mesure : catalogue produits, panier d'achat et interface de commande. Solution e-commerce professionnelle.",
    alt: "Ecommerce Mou — création boutique en ligne e-commerce sur mesure, développeur web freelance Maroc",
    url: "https://ecommerce-mou.netlify.app/",
    image: "/portfolio/ecommerce-mou.webp",
  },
  {
    tag: "Santé & Dentaire",
    title: "AT Dental",
    desc: "Site vitrine pour une clinique dentaire au Maroc : présentation des soins, prise de rendez-vous en ligne et interface patient moderne et rassurante.",
    alt: "AT Dental — création site web clinique dentaire Maroc, site vitrine cabinet dentiste professionnel",
    url: "https://at-dental.com/",
    image: "/portfolio/at-dental.webp",
  },
  {
    tag: "Réseau & Artisanat",
    title: "Réseau Artizano",
    desc: "Plateforme de mise en relation entre artisans et particuliers : annuaires de professionnels, fiches métiers et système de devis en ligne.",
    alt: "Réseau Artizano — création plateforme web artisans, site mise en relation professionnels et particuliers",
    url: "https://reseauxartizano.com/",
    image: "/portfolio/reseau-artizano.webp",
  },
  {
    tag: "Animaux & Lifestyle",
    title: "Care My Dog",
    desc: "Site dédié aux propriétaires de chiens : conseils bien-être, guides soins et ressources pour prendre soin de son animal au quotidien.",
    alt: "Care My Dog — création site web animaux domestiques, blog soins chiens lifestyle pets",
    url: "https://care-my-dog.com/",
    image: "/portfolio/care-my-dog.webp",
  },
  {
    tag: "E-commerce Bébé",
    title: "Pour Bébés",
    desc: "Boutique en ligne spécialisée dans les vêtements et accessoires pour bébés au Maroc : catalogue produits, fiches articles détaillées et expérience d'achat fluide.",
    alt: "Pour Bébés — création boutique e-commerce vêtements accessoires bébé Maroc",
    url: "https://pourbebes.ma/",
    image: "/portfolio/pour-bebes.webp",
  },
  {
    tag: "Fintech & Paiement",
    title: "TPE Maroc",
    desc: "Site vitrine pour une société de solutions de paiement électronique au Maroc : présentation des terminaux TPE, services aux commerçants et formulaire de demande.",
    alt: "TPE Maroc — création site web fintech terminal paiement électronique Maroc, solutions commerçants",
    url: "https://tpe-maroc.com/",
    image: "/portfolio/tpe-maroc.webp",
  },
  {
    tag: "Conseil & Business",
    title: "Natis Développement",
    desc: "Site vitrine pour un cabinet de conseil en développement international France–Maroc : présentation des services d'implantation, d'investissement et d'accompagnement opérationnel des entreprises à Casablanca.",
    alt: "Natis Développement International — création site web cabinet conseil business France Maroc, implantation entreprise Casablanca",
    url: "https://abdessamadchafiki.com/",
    image: "/portfolio/natis-developpement.webp",
  },
  {
    tag: "Agriculture",
    title: "Agropharma Tchad",
    desc: "Site vitrine pour un fournisseur agricole au Tchad : catalogue de semences maraîchères, produits phytosanitaires, engrais et matériels agricoles, avec demande de devis en ligne.",
    alt: "Agropharma Tchad — création site web fournisseur agricole, catalogue semences et intrants agricoles Tchad",
    url: "https://agropharmatchad.com/",
    image: "/portfolio/agropharma-tchad.webp",
  },
  {
    tag: "Nettoyage & Services",
    title: "Sernecom",
    desc: "Site vitrine pour une société de nettoyage professionnel et laverie à Rabat, Salé, Témara et Skhirat : fin de chantier, vitres, hygiène 4D, laverie au kilo avec collecte et livraison.",
    alt: "Sernecom — création site web société nettoyage professionnel et laverie Rabat Salé Témara",
    url: "https://sernecom.com/",
    image: "/portfolio/sernecom.webp",
  },
  {
    tag: "Location de Voiture",
    title: "Ihssane Car",
    desc: "Site pour une agence de location de voiture à Témara, Rabat et aux aéroports : catalogue de véhicules, tarifs transparents et réservation par WhatsApp ou en ligne.",
    alt: "Ihssane Car — création site web agence location voiture Témara Rabat, réservation en ligne",
    url: "https://ihssanecar.com/",
    image: "/portfolio/ihssane-car.webp",
  },
  {
    tag: "Parapharmacie",
    title: "Para Lirana",
    desc: "Parapharmacie en ligne au Maroc : catalogue soins visage, capillaire, solaire, bébé et compléments alimentaires, commande sur WhatsApp et livraison partout au Maroc.",
    alt: "Para Lirana — création site e-commerce parapharmacie en ligne Maroc, boutique produits de soins",
    url: "https://paralirana.com/",
    image: "/portfolio/para-lirana.webp",
  },
];

const PortfolioCard = ({ project, index }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="portfolio__card" style={{ "--card-delay": `${index * 0.08}s` }}>
      <div className="portfolio__card-img">
        {imgFailed ? (
          <div className="portfolio__img-fallback">
            <span>{project.title}</span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            className="portfolio__img"
            width="600"
            height="400"
            onError={() => setImgFailed(true)}
          />
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio__overlay"
          tabIndex={-1}
          aria-hidden="true"
        >
          <span>Voir le projet →</span>
        </a>
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
  );
};

const Portfolio = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView(0.1);

  return (
    <section id="portfolio" className={`portfolio container${inView ? " portfolio--visible" : ""}`} ref={ref}>
      <h2 className="secondary-heading center-text lg-mb">{t("portfolio.h2")}</h2>
      <div className="portfolio__grid">
        {PROJECTS.map((project, i) => (
          <PortfolioCard key={project.url} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
