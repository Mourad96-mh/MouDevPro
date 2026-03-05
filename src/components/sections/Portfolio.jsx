import { useTranslation } from "react-i18next";

const imgs = ["web-dev.avif", "web-dev-1.avif", "setup.avif", "home-dev-1.avif"];

const Portfolio = ({ cityName }) => {
  const { t } = useTranslation();
  const projects = t("portfolio.projects", { returnObjects: true, city: cityName });

  return (
    <section id="portfolio" className="portfolio container">
      <h2 className="secondary-heading center-text lg-mb">{t("portfolio.h2")}</h2>
      <div className="portfolio__grid">
        {projects.map((project, i) => (
          <article key={i} className="portfolio__card">
            <div className="portfolio__card-img">
              <img
                src={imgs[i]}
                alt={project.alt}
                loading="lazy"
                className="portfolio__img"
              />
            </div>
            <div className="portfolio__card-body">
              <span className="portfolio__tag">{project.tag}</span>
              <h3 className="portfolio__card-title">{project.title}</h3>
              <p className="portfolio__card-desc">{project.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
