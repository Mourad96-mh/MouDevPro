import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useConversion from "../hooks/useConversion";

const NotFoundPage = () => {
  const { WA_URL } = useConversion();

  return (
    <>
      <Helmet>
        <title>Page introuvable | MouDEV</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section style={{ textAlign: "center", padding: "8rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="heading--primary" style={{ marginBottom: "2rem" }}>Page introuvable</h1>
        <p className="subheading" style={{ marginBottom: "3.2rem" }}>
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil ou demandez votre devis directement.
        </p>
        <div className="city-hero__actions" style={{ justifyContent: "center", flexWrap: "wrap", gap: "1.6rem" }}>
          <Link to="/" className="link">Retour à l'accueil</Link>
          <Link to={WA_URL} className="link" style={{ background: "transparent", border: "2px solid currentColor" }}>
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
