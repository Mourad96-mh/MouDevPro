import { useTranslation } from "react-i18next";

const clients = [
  { name: "Clinique Esthétique", initial: "CE", color: "#4f46e5" },
  { name: "Boutique Mode", initial: "BM", color: "#0891b2" },
  { name: "Restaurant Zaytoune", initial: "RZ", color: "#16a34a" },
  { name: "Immobilier Casa", initial: "IC", color: "#d97706" },
  { name: "Transport Pro", initial: "TP", color: "#dc2626" },
  { name: "Services Express", initial: "SE", color: "#7c3aed" },
];

const ClientLogos = () => {
  const { t } = useTranslation();

  return (
    <section className="clients">
      <div className="clients__container container">
        <p className="clients__label">{t("clients.label")}</p>
        <div className="clients__grid">
          {clients.map((client, i) => (
            <div key={i} className="client__logo">
              <span
                className="client__initial"
                style={{ backgroundColor: client.color }}
              >
                {client.initial}
              </span>
              <span className="client__name">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
