import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const IMAGES = ["/customer-1.webp", "/customer-2.webp", "/customer-3.avif", "/customer-4.webp"];

const Temoignes = () => {
  const { t } = useTranslation();
  const items = t("temoignes.items", { returnObjects: true });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="temoignes">
      <span
        className={`after ${step >= items.length - 1 ? "block" : ""}`}
        onClick={() => setStep((p) => Math.min(p + 1, items.length - 1))}
      >
        &rsaquo;
      </span>
      <div className="temoignes__container">
        <h2 className="secondary-heading lg-mb center-text">{t("temoignes.h2")}</h2>
        <div className="overview lg-mb">
          <div className="center-text sl-mb">
            <img src={IMAGES[step]} alt={`${items[step].name} — avis client développeur web freelance MouDev Maroc`} />
          </div>
          <p className="temoigne__description sl-mb">{items[step].text}</p>
          <h3 className="tertiary-heading center-text">{items[step].name}</h3>
        </div>
        <ul className="bullets">
          {items.map((_, i) => (
            <li
              key={i}
              className={`bullet__item ${step === i ? "active" : ""}`}
              onClick={() => setStep(i)}
            >
              &nbsp;
            </li>
          ))}
        </ul>
      </div>
      <span
        className={`before ${step <= 0 ? "block" : ""}`}
        onClick={() => setStep((p) => Math.max(p - 1, 0))}
      >
        &lsaquo;
      </span>
    </div>
  );
};

export default Temoignes;
