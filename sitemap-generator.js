import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { fileURLToPath } from "url";
import path from "path";

const BASE = "https://www.moudevpro.com";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Homepage + translations + market pages = one hreflang cluster.
const HOME_CLUSTER = [
  { lang: "fr", url: `${BASE}/` },
  { lang: "en", url: `${BASE}/en` },
  { lang: "ar", url: `${BASE}/ar` },
  { lang: "fr-FR", url: `${BASE}/france` },
  { lang: "fr-CA", url: `${BASE}/canada` },
  { lang: "en-US", url: `${BASE}/usa` },
  { lang: "x-default", url: `${BASE}/` },
];

// All routes with their hreflang alternates
const routes = [
  // ── Homepage cluster: / (FR), /en, /ar + market pages (regional variants) ─
  // Must match homeHreflangCluster in src/data/marketConfig.js exactly.
  { url: "/", changefreq: "weekly", priority: 1.0, links: HOME_CLUSTER },
  { url: "/en", changefreq: "weekly", priority: 0.8, links: HOME_CLUSTER },
  { url: "/ar", changefreq: "weekly", priority: 0.8, links: HOME_CLUSTER },

  // ── Casablanca (FR only — /en and /ar translate the homepage, not this page) ─
  {
    url: "/casablanca",
    changefreq: "weekly",
    priority: 1.0,
    links: [
      { lang: "fr", url: `${BASE}/casablanca` },
      { lang: "x-default", url: `${BASE}/casablanca` },
    ],
  },

  // ── Rabat (FR / EN / AR) ─────────────────────────────────────────────────
  {
    url: "/rabat",
    changefreq: "weekly",
    priority: 0.9,
    links: [
      { lang: "fr", url: `${BASE}/rabat` },
      { lang: "en", url: `${BASE}/en/rabat` },
      { lang: "ar", url: `${BASE}/ar/rabat` },
      { lang: "x-default", url: `${BASE}/rabat` },
    ],
  },
  {
    url: "/en/rabat",
    changefreq: "weekly",
    priority: 0.7,
    links: [
      { lang: "fr", url: `${BASE}/rabat` },
      { lang: "en", url: `${BASE}/en/rabat` },
      { lang: "ar", url: `${BASE}/ar/rabat` },
      { lang: "x-default", url: `${BASE}/rabat` },
    ],
  },
  {
    url: "/ar/rabat",
    changefreq: "weekly",
    priority: 0.7,
    links: [
      { lang: "fr", url: `${BASE}/rabat` },
      { lang: "en", url: `${BASE}/en/rabat` },
      { lang: "ar", url: `${BASE}/ar/rabat` },
      { lang: "x-default", url: `${BASE}/rabat` },
    ],
  },

  // ── Marrakech (FR / EN / AR) ─────────────────────────────────────────────
  {
    url: "/marrakech",
    changefreq: "weekly",
    priority: 0.9,
    links: [
      { lang: "fr", url: `${BASE}/marrakech` },
      { lang: "en", url: `${BASE}/en/marrakech` },
      { lang: "ar", url: `${BASE}/ar/marrakech` },
      { lang: "x-default", url: `${BASE}/marrakech` },
    ],
  },
  {
    url: "/en/marrakech",
    changefreq: "weekly",
    priority: 0.7,
    links: [
      { lang: "fr", url: `${BASE}/marrakech` },
      { lang: "en", url: `${BASE}/en/marrakech` },
      { lang: "ar", url: `${BASE}/ar/marrakech` },
      { lang: "x-default", url: `${BASE}/marrakech` },
    ],
  },
  {
    url: "/ar/marrakech",
    changefreq: "weekly",
    priority: 0.7,
    links: [
      { lang: "fr", url: `${BASE}/marrakech` },
      { lang: "en", url: `${BASE}/en/marrakech` },
      { lang: "ar", url: `${BASE}/ar/marrakech` },
      { lang: "x-default", url: `${BASE}/marrakech` },
    ],
  },

  // ── International market pages (organic SEO) ─────────────────────────────
  { url: "/france", changefreq: "monthly", priority: 0.8, links: HOME_CLUSTER },
  { url: "/canada", changefreq: "monthly", priority: 0.8, links: HOME_CLUSTER },
  { url: "/usa", changefreq: "monthly", priority: 0.8, links: HOME_CLUSTER },
  // Europe (EN, B2B nearshore) — standalone, outside the homepage cluster
  {
    url: "/europe",
    changefreq: "monthly",
    priority: 0.8,
    links: [
      { lang: "en", url: `${BASE}/europe` },
      { lang: "x-default", url: `${BASE}/europe` },
    ],
  },

  // ── Standalone pages ─────────────────────────────────────────────────────
  { url: "/developpeur-web-freelance-maroc", changefreq: "monthly", priority: 0.9 },
  { url: "/tarifs", changefreq: "monthly", priority: 0.9 },
  { url: "/ecommerce", changefreq: "monthly", priority: 0.8 },
  { url: "/google-ads", changefreq: "monthly", priority: 0.8 },
  { url: "/agents-ia", changefreq: "monthly", priority: 0.8 },
  { url: "/services", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.7 },
  { url: "/about", changefreq: "monthly", priority: 0.5 },

  // ── Blog ─────────────────────────────────────────────────────────────────
  { url: "/blog", changefreq: "weekly", priority: 0.8 },
  { url: "/blog/prix-site-web-maroc-2026", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/choisir-developpeur-web-freelance-maroc", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/site-web-hotel-riad-marrakech", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/freelance-creation-site-web-maroc", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/creation-site-web-casablanca", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/site-ecommerce-maroc-guide", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/creer-site-web-soi-meme-ou-developpeur", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/prix-site-ecommerce-maroc", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/statistiques-web-maroc-2026", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/web-statistics-morocco-2026", changefreq: "monthly", priority: 0.7 },
];

(async () => {
  const sitemapPath = path.join(__dirname, "dist", "sitemap.xml");
  const writeStream = createWriteStream(sitemapPath);
  const sitemap = new SitemapStream({ hostname: BASE });

  sitemap.pipe(writeStream);
  routes.forEach((route) => sitemap.write(route));
  sitemap.end();

  await streamToPromise(sitemap);

  console.log("✅ sitemap.xml generated at:", sitemapPath);
})();
