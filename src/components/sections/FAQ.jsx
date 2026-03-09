import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const FAQ = ({ cityName }) => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(null);

  const faqItems = t("faq.items", { returnObjects: true });
  const faqs = faqItems.map((item, i) => ({
    id: i + 1,
    question: t(`faq.items.${i}.q`, { city: cityName }),
    answer: t(`faq.items.${i}.a`, { city: cityName }),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <section id="faq" className="faq">
        <div className="faq__container">
          <h2 className="secondary-heading center-text lg-mb">{t("faq.h2")}</h2>
          <ul className="faq__list">
            {faqs.map((faq) => (
              <li key={faq.id} className="faq__item">
                <button
                  className="faq__question"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={openId === faq.id}
                >
                  <span>{faq.question}</span>
                  <span className={`faq__icon${openId === faq.id ? " open" : ""}`}>+</span>
                </button>
                {openId === faq.id && (
                  <p className="faq__answer">{faq.answer}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default FAQ;
