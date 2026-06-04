import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCityContext } from "../../context/CityContext";
import { cityConfig } from "../../data/cityConfig";
const CITIES = ["casablanca", "rabat", "marrakech"];
const COUNTRIES = [
  { slug: "france", label: "France" },
  { slug: "canada", label: "Canada" },
  { slug: "usa", label: "USA" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const { cityData } = useCityContext();
  const { pathname } = useLocation();
  const blogActive = pathname.startsWith("/blog");
  const countryActive = COUNTRIES.some(({ slug }) => pathname === `/${slug}`);
  const currentLang = cityData?.currentLang || "fr";

  // Close the country dropdown when clicking outside it
  useEffect(() => {
    if (!countryOpen) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [countryOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setCountryOpen(false);
  };
  const cityLinks = CITIES.map((city) => {
    const { name, canonical } = cityConfig[city][currentLang];
    return {
      city,
      name,
      path: canonical.replace("https://www.moudevpro.com", "") || "/",
      active: cityData?.currentCity === city,
    };
  });

  return (
    <header className="header">
      <Logo />

      <nav className={`nav${menuOpen ? " nav--open" : ""}`}>
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
          <li className="nav__item">
            <Link
              to="/blog"
              className={`nav__link${blogActive ? " nav__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
          </li>

          <li className="nav__item nav__dropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`nav__link nav__dropdown-toggle${countryActive ? " nav__link--active" : ""}`}
              onClick={() => setCountryOpen((open) => !open)}
              aria-expanded={countryOpen}
              aria-haspopup="true"
            >
              International
              <HiChevronDown
                className={`nav__dropdown-caret${countryOpen ? " open" : ""}`}
              />
            </button>
            <ul className={`nav__dropdown-menu${countryOpen ? " open" : ""}`}>
              {COUNTRIES.map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    to={`/${slug}`}
                    className={`nav__dropdown-item${pathname === `/${slug}` ? " active" : ""}`}
                    onClick={closeMenus}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
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
