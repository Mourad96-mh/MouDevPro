import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { blogPosts } from "../data/blogPosts";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog MouDevPro — Conseils création site web au Maroc",
  description: "Conseils, tarifs et guides pour créer un site web professionnel au Maroc. Développeur web freelance basé à Casablanca.",
  url: "https://www.moudevpro.com/blog",
  publisher: {
    "@type": "Person",
    name: "Mourad",
    url: "https://www.moudevpro.com",
  },
};

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog — Conseils Création Site Web au Maroc | MouDEV</title>
        <meta
          name="description"
          content="Conseils, tarifs et guides pour créer un site web professionnel au Maroc. Tout ce qu'un entrepreneur marocain doit savoir avant de lancer son projet web."
        />
        <meta property="og:title" content="Blog — Conseils Création Site Web au Maroc | MouDEV" />
        <meta property="og:description" content="Conseils, tarifs et guides pour créer un site web professionnel au Maroc." />
        <meta property="og:url" content="https://www.moudevpro.com/blog" />
        <meta property="og:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog — Conseils Création Site Web au Maroc | MouDEV" />
        <meta name="twitter:description" content="Conseils, tarifs et guides pour créer un site web professionnel au Maroc." />
        <meta name="twitter:image" content="https://www.moudevpro.com/webdev-logo.png" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.moudevpro.com/blog" />
        <link rel="alternate" hrefLang="fr" href="https://www.moudevpro.com/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://www.moudevpro.com/blog" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="blog-hero">
        <div className="container blog-hero__inner">
          <h1 className="heading--primary center-text">
            Blog — Conseils création site web au Maroc
          </h1>
          <p className="subheading center-text">
            Tarifs, conseils et guides pratiques pour les entrepreneurs marocains qui veulent créer leur site web.
          </p>
        </div>
      </section>

      <section className="blog-list">
        <div className="container blog-list__inner">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card__img-wrap">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="blog-card__img"
                    loading="lazy"
                    width="600"
                    height="360"
                  />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <time dateTime={post.datePublished}>
                      {new Date(post.datePublished).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="blog-card__dot">·</span>
                    <span>{post.readTime} de lecture</span>
                  </div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__excerpt text">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="blog-card__link">
                    Lire l'article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tarifs-cta-section">
        <div className="container center-text">
          <h2 className="secondary-heading">Prêt à lancer votre projet web ?</h2>
          <p className="subheading lg-mb">
            Devis gratuit et personnalisé sous 24h — développeur web freelance basé à Casablanca.
          </p>
          <Link to="/contact" className="link">Demandez votre devis gratuit</Link>
        </div>
      </section>

      <Footer cityName="Casablanca" address="Quartier Maarif, Casablanca, 20000" />
    </>
  );
};

export default BlogPage;
