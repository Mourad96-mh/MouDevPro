import { useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCityContext } from "../../context/CityContext";
import { cityConfig } from "../../data/cityConfig";
const CITIES = ["casablanca", "rabat", "marrakech"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { cityData } = useCityContext();
  const cityLinks = cityData
    ? CITIES.map((city) => {
        const { name, canonical } = cityConfig[city][cityData.currentLang];
        return {
          city,
          name,
          path: canonical.replace("https://www.moudevpro.com", "") || "/",
          active: cityData.currentCity === city,
        };
      })
    : [];

  return (
    <header className="header">
      <Logo />

      <nav className={`nav${menuOpen ? " nav--open" : ""}`}>
        {cityLinks.length > 0 && (
          <ul className="nav__list nav__cities">
            {cityLinks.map(({ city, name, path, active }) => (
              <li key={city} className="nav__item">
                <Link
                  to={path}
                  className={`nav__link${active ? " nav__link--active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="header__actions">
        <LanguageSwitcher />
        <button
          className="nav__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
        >
          {menuOpen ? <HiXMark /> : <HiBars3 />}
        </button>
      </div>
    </header>
  );
};

export default Header;
