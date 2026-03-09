import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePhoneArrowUpRight, HiBars3, HiXMark } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import CitySwitcher from "./CitySwitcher";
import useConversion from "../../hooks/useConversion";
import { useCityContext } from "../../context/CityContext";
import { cityConfig } from "../../data/cityConfig";

const CITIES = ["casablanca", "rabat", "marrakech"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { track, WA_URL } = useConversion();
  const { cityData } = useCityContext();

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.formules"), href: "#formules" },
    { label: t("nav.realisations"), href: "#portfolio" },
    { label: t("nav.faq"), href: "#faq" },
  ];

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
        <ul className="nav__list">
          {navLinks.map((link) => (
            <li key={link.href} className="nav__item">
              <a
                href={link.href}
                className="nav__link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

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
        <CitySwitcher />
        <LanguageSwitcher />
        <a
          href="#"
          onClick={() => track(WA_URL)}
          rel="noopener noreferrer"
          aria-label={t("nav.contactAria")}
          className="link"
        >
          <span className="icon">
            <HiOutlinePhoneArrowUpRight />
          </span>
          <span className="phone-num">+212 696 964 341</span>
        </a>
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
