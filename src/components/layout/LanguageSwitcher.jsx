import { Link } from "react-router-dom";
import { useCityContext } from "../../context/CityContext";

const LANG_LABELS = { fr: "FR", en: "EN", ar: "ع" };

const LanguageSwitcher = () => {
  const { cityData } = useCityContext();

  if (!cityData) return null;

  return (
    <div className="lang-switcher">
      {Object.entries(cityData.hreflang)
        .filter(([lang]) => lang !== "x-default")
        .map(([lang, url]) => (
          <Link
            key={lang}
            to={url.replace("https://www.moudevpro.com", "")}
            className={`lang-switcher__btn${cityData.currentLang === lang ? " active" : ""}`}
            aria-label={`Switch to ${lang}`}
          >
            {LANG_LABELS[lang]}
          </Link>
        ))}
    </div>
  );
};

export default LanguageSwitcher;
