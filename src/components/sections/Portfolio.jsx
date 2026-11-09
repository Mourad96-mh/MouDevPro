import { useState } from "react";
import { useTranslation } from "react-i18next";
import useInView from "../../hooks/useInView";

const PROJECTS = [
  {
    tag: "Agroalimentaire & Export",
    title: "Euravia",
    desc: "Site multilingue (FR/EN/NL) pour un exportateur de fruits et légumes frais et surgelés du Maroc vers l'Europe : catalogue par catégorie, fiches produits, panier de devis B2B et bureaux à Utrecht et Casablanca.",
    alt: "Euravia — création site web multilingue exportateur fruits et légumes Maroc Europe, catalogue et demande de devis B2B",
    url: "https://euraviafood.com/fr/",
    image: "/portfolio/euravia.webp",
  },
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
    tag: "Réseau & Artisanat",
    title: "Réseau Artizano",
    desc: "Plateforme de mise en relation entre artisans et particuliers : annuaires de professionnels, fiches métiers et système de devis en ligne.",
    alt: "Réseau Artizano — création plateforme web artisans, site mise en relation professionnels et particuliers",
    url: "https://reseauxartizano.com/",
    image: "/portfolio/reseau-artizano.webp",
  },
  {
    tag: "E-commerce Bébé",
    title: "Pour Bébés",
    desc: "Boutique en ligne spécialisée dans les vêtements et accessoires pour bébés au Maroc : catalogue produits, fiches articles détaillées et expérience d'achat fluide.",
    alt: "Pour Bébés — création boutique e-commerce vêtements accessoires bébé Maroc",
    url: "https://pourbebes.ma/",
    image: "/portfolio/pour-bebes.webp",
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
