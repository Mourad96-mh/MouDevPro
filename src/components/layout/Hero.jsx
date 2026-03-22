import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useConversion from "../../hooks/useConversion";

const Hero = ({ cityName }) => {
  const { t } = useTranslation();
  const { track, WA_URL } = useConversion();

  return (
    <div className="hero container">
      <div className="hero__content">
        <h1 className="heading--primary">
          {t("hero.h1", { city: cityName })}
        </h1>
        <p className="subheading sl-mb">{t("hero.subheading", { city: cityName })}</p>

        <Link
          className="link hero-link"
          to={WA_URL}
          onClick={() => track(WA_URL)}
        >
          {t("hero.cta")}
        </Link>
      </div>
      <div className="hero__img">
        <img
          src="/hero-img.avif"
          loading="eager"
          fetchpriority="high"
          alt={`Développeur web freelance MouDev à ${cityName} — création de site web professionnel au Maroc`}
          title={`Création site web ${cityName} — développeur web freelance MouDev`}
        />
      </div>
    </div>
  );
};

export default Hero;
