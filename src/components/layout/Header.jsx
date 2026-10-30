import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCityContext } from "../../context/CityContext";
import { cityConfig } from "../../data/cityConfig";
import useConversion from "../../hooks/useConversion";

const CITIES = ["casablanca", "rabat", "marrakech"];
const COUNTRIES = [
  { slug: "france", label: "France" },
  { slug: "canada", label: "Canada" },
  { slug: "usa", label: "USA" },
  { slug: "europe", label: "Europe (EN)" },
];
const SERVICES = [
  { path: "/services", key: "nav.vitrine" },
  { path: "/ecommerce", key: "nav.ecommerceLong" },
  { path: "/google-ads", key: "nav.googleAdsLong" },
  { path: "/developpeur-web-freelance-maroc", key: "nav.freelance" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Which dropdown is open: "cities" | "services" | null
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const { t } = useTranslation();
  const { cityData } = useCityContext();
  const { pathname } = useLocation();
  const { track, WA_URL } = useConversion();
  const currentLang = cityData?.currentLang || "fr";

  // Close an open dropdown when clicking outside the nav
  useEffect(() => {
    if (!openDropdown) return;
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openDropdown]);

  const closeMenus = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };
  const toggleDropdown = (name) =>
    setOpenDropdown((open) => (open === name ? null : name));

  const cityLinks = CITIES.map((city) => {
    const { name, canonical } = cityConfig[city][currentLang];
    return {
      city,
      name,
      path: canonical.replace("https://www.moudevpro.com", "") || "/",
      active: cityData?.currentCity === city,
    };
  });
  const citiesActive =
    cityLinks.some(({ active }) => active) ||
    COUNTRIES.some(({ slug }) => pathname === `/${slug}`);
  const servicesActive = SERVICES.some(({ path }) => pathname === path);

  // Plain nav links. Dropdown menus stay in the DOM (hidden with CSS) so the
  // city / service links remain crawlable in the prerendered HTML.
  const navLink = (to, label, active) => (
    <li className="nav__item">
      <Link
        to={to}
        className={`nav__link${active ? " nav__link--active" : ""}`}
        onClick={closeMenus}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <header className="header">
      <Logo />

      <nav className={`nav${menuOpen ? " nav--open" : ""}`} ref={navRef}>
        <ul className="nav__list">
          <li className="nav__item nav__dropdown">
            <button
              type="button"
              className={`nav__link nav__dropdown-toggle${citiesActive ? " nav__link--active" : ""}`}
              onClick={() => toggleDropdown("cities")}
              aria-expanded={openDropdown === "cities"}
              aria-haspopup="true"
            >
              {t("nav.cities")}
              <HiChevronDown
                className={`nav__dropdown-caret${openDropdown === "cities" ? " open" : ""}`}
              />
            </button>
            <ul className={`nav__dropdown-menu${openDropdown === "cities" ? " open" : ""}`}>
              {cityLinks.map(({ city, name, path, active }) => (
                <li key={city}>
                  <Link
                    to={path}
                    className={`nav__dropdown-item${active ? " active" : ""}`}
                    onClick={closeMenus}
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li className="nav__dropdown-label">{t("nav.international")}</li>
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

          <li className="nav__item nav__dropdown">
            <button
              type="button"
              className={`nav__link nav__dropdown-toggle${servicesActive ? " nav__link--active" : ""}`}
              onClick={() => toggleDropdown("services")}
              aria-expanded={openDropdown === "services"}
              aria-haspopup="true"
            >
              {t("nav.services")}
              <HiChevronDown
                className={`nav__dropdown-caret${openDropdown === "services" ? " open" : ""}`}
              />
            </button>
            <ul className={`nav__dropdown-menu${openDropdown === "services" ? " open" : ""}`}>
              {SERVICES.map(({ path, key }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`nav__dropdown-item${pathname === path ? " active" : ""}`}
                    onClick={closeMenus}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {navLink("/tarifs", t("nav.tarifs"), pathname === "/tarifs")}
          {navLink("/blog", t("nav.blog"), pathname.startsWith("/blog"))}
          {navLink("/about", t("nav.about"), pathname === "/about")}
          {navLink("/contact", t("nav.contact"), pathname === "/contact")}
        </ul>

        {/* Mobile only: languages live inside the menu instead of floating over the page */}
        <div className="nav__langs">
          <span className="nav__langs-label">{t("nav.languages")}</span>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="header__actions">
        <Link
          to={WA_URL}
          rel="noopener noreferrer"
          className="header__cta"
          onClick={() => {
            closeMenus();
            track(WA_URL, "header-cta");
          }}
        >
          <FaWhatsapp className="header__cta-icon" aria-hidden="true" />
          {t("nav.devis")}
        </Link>
        <div className="header__langs">
          <LanguageSwitcher />
        </div>
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
