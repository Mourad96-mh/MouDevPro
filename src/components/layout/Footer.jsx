import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

const Footer = ({ cityName, address }) => {
  const { t } = useTranslation();
  const serviceLinks = t("footer.services.links", { returnObjects: true });

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__brand">
          <Logo />
          <p className="footer__tagline">{t("footer.tagline", { city: cityName })}</p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook MouDev" className="footer__social-link">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram MouDev" className="footer__social-link">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn MouDev" className="footer__social-link">
              <FaLinkedinIn />
            </a>
            <a
              href="https://wa.me/+212696964341"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp MouDev"
              className="footer__social-link"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">{t("footer.services.heading")}</h3>
          <ul className="footer__list">
            {serviceLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="footer__link">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">{t("footer.contact.heading")}</h3>
          <ul className="footer__contact-list">
            <li>
              <HiOutlinePhone className="footer__contact-icon" />
              <a href="tel:+212696964341" className="footer__link">+212 696 964 341</a>
            </li>
            <li>
              <HiOutlineEnvelope className="footer__contact-icon" />
              <a href="mailto:contact@moudevpro.com" className="footer__link">
                contact@moudevpro.com
              </a>
            </li>
            <li>
              <HiOutlineMapPin className="footer__contact-icon" />
              <span>{address}</span>
            </li>
            <li>
              <HiOutlineClock className="footer__contact-icon" />
              <span>{t("footer.contact.hours")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>
          &copy; 2026{" "}
          <span className="logo-mou">Mou</span>
          <span className="logo-dev">DEV</span>. {t("footer.copyright", { city: cityName })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
