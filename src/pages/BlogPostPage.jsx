import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import NotFoundPage from "./NotFoundPage";
import { blogPosts } from "../data/blogPosts";
import useConversion from "../hooks/useConversion";

const ContentRenderer = ({ sections, track }) => {
  return sections.map((section, i) => {
    switch (section.type) {
      case "p":
        return (
          <p key={i} className="text blog-post__p">
            {section.parts
              ? section.parts.map((part, j) =>
                  typeof part === "string" ? (
                    part
                  ) : part.href ? (
                    <a key={j} href={part.href} target="_blank" rel="noopener noreferrer">
                      {part.text}
                    </a>
                  ) : (
                    <Link key={j} to={part.to}>
                      {part.text}
                    </Link>
                  )
                )
              : section.text}
          </p>
        );

      case "h2":
        return <h2 key={i} className="secondary-heading blog-post__h2">{section.text}</h2>;

      case "h3":
        return <h3 key={i} className="tertiary-heading blog-post__h3">{section.text}</h3>;

      case "ul":
        return (
          <ul key={i} className="blog-post__ul">
            {section.items.map((item, j) => (
              <li key={j} className="blog-post__li">{item}</li>
            ))}
          </ul>
        );

      case "callout":
        return (
          <div key={i} className="blog-callout">
            <p className="blog-callout__text">{section.text}</p>
          </div>
        );

      case "table":
        return (
          <div key={i} className="blog-table-wrap">
            <table className="blog-table">
              <thead>
                <tr>
                  {section.headers.map((h, j) => <th key={j}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, j) => (
                  <tr key={j}>
                    {row.map((cell, k) => <td key={k}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "cta":
        return (
          <div key={i} className="blog-cta">
            <Link to={section.to} className="link" onClick={section.to.startsWith("http") ? () => track(section.to) : undefined}>
              {section.text}
            </Link>
          </div>
        );

      default:
        return null;
    }
  });
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const { track } = useConversion();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFoundPage />;

  const isEn = post.lang === "en";
  const locale = isEn ? "en-US" : "fr-FR";
  const t = isEn
    ? {
        read: "read",
        by: "by",
        home: "Home",
        back: "← Back to blog",
        ctaH2: "Have a website project?",
        ctaText:
          "Freelance web developer based in Casablanca — I reply with a tailored quote within 24h. Payment after delivery.",
        quote: "Get a free quote →",
        prices: "See pricing",
      }
    : {
        read: "de lecture",
        by: "par",
        home: "Accueil",
        back: "← Retour au blog",
        ctaH2: "Vous avez un projet de site web ?",
        ctaText:
          "Développeur web freelance basé à Casablanca — je vous réponds avec un devis personnalisé sous 24h. Paiement après livraison.",
        quote: "Demander un devis gratuit →",
        prices: "Voir les tarifs",
      };
  const selfUrl = `https://www.moudevpro.com/blog/${post.slug}`;
  const altUrl = post.altSlug ? `https://www.moudevpro.com/blog/${post.altSlug}` : null;
  const xDefaultUrl = isEn ? altUrl || selfUrl : selfUrl;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `https://www.moudevpro.com${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.moudevpro.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "MouDevPro",
      url: "https://www.moudevpro.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.moudevpro.com/webdev-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.moudevpro.com/blog/${post.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.moudevpro.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.moudevpro.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.moudevpro.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <Helmet>
        <html lang={isEn ? "en" : "fr"} />
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`https://www.moudevpro.com/blog/${post.slug}`} />
        <meta property="og:image" content={`https://www.moudevpro.com${post.image}`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={isEn ? "en_US" : "fr_MA"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`https://www.moudevpro.com${post.image}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={selfUrl} />
        <link rel="alternate" hrefLang={isEn ? "en" : "fr"} href={selfUrl} />
        {altUrl && <link rel="alternate" hrefLang={post.altLang} href={altUrl} />}
        <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <article className="blog-post">
        <div className="container blog-post__container">

          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t.home}</Link>
            <span> / </span>
            <Link to="/blog">Blog</Link>
            <span> / </span>
            <span>{post.title}</span>
          </nav>

          <header className="blog-post__header">
            <div className="blog-post__meta">
              <time dateTime={post.datePublished}>
                {new Date(post.datePublished).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="blog-card__dot">·</span>
              <span>{post.readTime} {t.read}</span>
              <span className="blog-card__dot">·</span>
              <span>{t.by} {post.author}</span>
            </div>

            <h1 className="heading--primary blog-post__h1">{post.title}</h1>

            <img
              src={post.image}
              alt={post.imageAlt}
              className="blog-post__hero-img"
              loading="eager"
              fetchpriority="high"
              width="900"
              height="500"
            />
          </header>

          <div className="blog-post__content">
            <ContentRenderer sections={post.content} track={track} />
          </div>

          <div className="blog-post__footer">
            <div className="blog-post__cta-box">
              <h2 className="secondary-heading">{t.ctaH2}</h2>
              <p className="text">{t.ctaText}</p>
              <div className="blog-post__cta-actions">
                <Link to="/contact" className="link">{t.quote}</Link>
                <Link to="/tarifs" className="link link--outline">{t.prices}</Link>
              </div>
            </div>

            <div className="blog-post__back">
              <Link to="/blog" className="blog-back-link">{t.back}</Link>
            </div>
          </div>
        </div>
      </article>

      <Footer cityName="Casablanca" address="Quartier Maarif, Casablanca, 20000" />
    </>
  );
};

export default BlogPostPage;
