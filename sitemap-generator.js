import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { fileURLToPath } from "url";
import path from "path";

const BASE = "https://www.moudevpro.com";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All routes with their hreflang alternates
const routes = [
  // ── Homepage (FR only — national landing page) ───────────────────────────
  {
    url: "/",
    changefreq: "weekly",
    priority: 1.0,
    links: [
      { lang: "fr", url: `${BASE}/` },
      { lang: "x-default", url: `${BASE}/` },
    ],
  },

  // ── Casablanca (FR / EN / AR) ────────────────────────────────────────────
  {
    url: "/casablanca",
    changefreq: "weekly",
    priority: 1.0,
    links: [
      { lang: "fr", url: `${BASE}/casablanca` },
      { lang: "en", url: `${BASE}/en` },
      { lang: "ar", url: `${BASE}/ar` },
      { lang: "x-default", url: `${BASE}/casablanca` },
    ],
  },
  {
    url: "/en",
    changefreq: "weekly",
    priority: 0.8,
    links: [
      { lang: "fr", url: `${BASE}/casablanca` },
      { lang: "en", url: `${BASE}/en` },
      { lang: "ar", url: `${BASE}/ar` },
      { lang: "x-default", url: `${BASE}/casablanca` },
    ],
  },
  {
    url: "/ar",
    changefreq: "weekly",
    priority: 0.8,
    links: [
      { lang: "fr", url: `${BASE}/casablanca` },
      { lang: "en", url: `${BASE}/en` },
      { lang: "ar", url: `${BASE}/ar` },
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

  // ── Standalone pages ─────────────────────────────────────────────────────
  { url: "/tarifs", changefreq: "monthly", priority: 0.9 },
  { url: "/ecommerce", changefreq: "monthly", priority: 0.8 },
  { url: "/services", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.7 },
  { url: "/about", changefreq: "monthly", priority: 0.5 },
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
