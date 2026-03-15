import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiMiniPhone } from "react-icons/hi2";
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
        <div className="hero__badges sl-mb">
          <span className="hero__badge">✅ {t("hero.badge1")}</span>
          <span className="hero__badge">✅ {t("hero.badge2")}</span>
          <span className="hero__badge">✅ {t("hero.badge3", { city: cityName })}</span>
        </div>
        <Link
          className="link hero-link"
          to={WA_URL}
          onClick={() => track(WA_URL)}
        >
          {t("hero.cta")}
        </Link>
        <a
          href="tel:+212696964341"
          className="hero__phone"
          onClick={() => track(WA_URL)}
          aria-label="Appeler MouDev"
        >
          <HiMiniPhone />
          <span>{t("hero.phone")}</span>
        </a>
      </div>
      <div className="hero__img">
        <img
          src="hero-img.avif"
          loading="eager"
          fetchpriority="high"
          alt={`Agence web MouDev à ${cityName} — création de sites web et marketing digital au Maroc`}
          title={`Création site web ${cityName} : agence web MouDev`}
        />
      </div>
    </div>
  );
};

export default Hero;
