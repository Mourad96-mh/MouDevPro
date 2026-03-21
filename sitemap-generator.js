import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import path from "path";

const BASE = "https://www.moudevpro.com";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All routes with their hreflang alternates
const routes = [
  // ── Homepage (FR / EN / AR) ──────────────────────────────────────────────
  {
    url: "/",
    changefreq: "weekly",
    priority: 1.0,
    links: [
      { lang: "fr", url: `${BASE}/` },
      { lang: "en", url: `${BASE}/en/` },
      { lang: "ar", url: `${BASE}/ar/` },
      { lang: "x-default", url: `${BASE}/` },
    ],
  },
  {
    url: "/en/",
    changefreq: "weekly",
    priority: 0.8,
    links: [
      { lang: "fr", url: `${BASE}/` },
      { lang: "en", url: `${BASE}/en/` },
      { lang: "ar", url: `${BASE}/ar/` },
      { lang: "x-default", url: `${BASE}/` },
    ],
  },
  {
    url: "/ar/",
    changefreq: "weekly",
    priority: 0.8,
    links: [
      { lang: "fr", url: `${BASE}/` },
      { lang: "en", url: `${BASE}/en/` },
      { lang: "ar", url: `${BASE}/ar/` },
      { lang: "x-default", url: `${BASE}/` },
    ],
  },

  // ── City pages (old routes kept for Google Ads links) ────────────────────
  {
    url: "/agence-web-rabat/",
    changefreq: "weekly",
    priority: 0.8,
    links: [
      { lang: "fr", url: `${BASE}/agence-web-rabat/` },
      { lang: "en", url: `${BASE}/en/web-agency-rabat/` },
      { lang: "ar", url: `${BASE}/ar/agence-web-rabat/` },
      { lang: "x-default", url: `${BASE}/agence-web-rabat/` },
    ],
  },
  {
    url: "/en/web-agency-rabat/",
    changefreq: "weekly",
    priority: 0.6,
    links: [
      { lang: "fr", url: `${BASE}/agence-web-rabat/` },
      { lang: "en", url: `${BASE}/en/web-agency-rabat/` },
      { lang: "ar", url: `${BASE}/ar/agence-web-rabat/` },
      { lang: "x-default", url: `${BASE}/agence-web-rabat/` },
    ],
  },
  {
    url: "/ar/agence-web-rabat/",
    changefreq: "weekly",
    priority: 0.6,
    links: [
      { lang: "fr", url: `${BASE}/agence-web-rabat/` },
      { lang: "en", url: `${BASE}/en/web-agency-rabat/` },
      { lang: "ar", url: `${BASE}/ar/agence-web-rabat/` },
      { lang: "x-default", url: `${BASE}/agence-web-rabat/` },
    ],
  },
  {
    url: "/agence-web-marrakech/",
    changefreq: "weekly",
    priority: 0.8,
    links: [
      { lang: "fr", url: `${BASE}/agence-web-marrakech/` },
      { lang: "en", url: `${BASE}/en/web-agency-marrakech/` },
      { lang: "ar", url: `${BASE}/ar/agence-web-marrakech/` },
      { lang: "x-default", url: `${BASE}/agence-web-marrakech/` },
    ],
  },
  {
    url: "/en/web-agency-marrakech/",
    changefreq: "weekly",
    priority: 0.6,
    links: [
      { lang: "fr", url: `${BASE}/agence-web-marrakech/` },
      { lang: "en", url: `${BASE}/en/web-agency-marrakech/` },
      { lang: "ar", url: `${BASE}/ar/agence-web-marrakech/` },
      { lang: "x-default", url: `${BASE}/agence-web-marrakech/` },
    ],
  },
  {
    url: "/ar/agence-web-marrakech/",
    changefreq: "weekly",
    priority: 0.6,
    links: [
      { lang: "fr", url: `${BASE}/agence-web-marrakech/` },
      { lang: "en", url: `${BASE}/en/web-agency-marrakech/` },
      { lang: "ar", url: `${BASE}/ar/agence-web-marrakech/` },
      { lang: "x-default", url: `${BASE}/agence-web-marrakech/` },
    ],
  },

  // ── New standalone pages ─────────────────────────────────────────────────
  { url: "/casablanca/", changefreq: "weekly", priority: 1.0 },
  { url: "/rabat/",      changefreq: "weekly", priority: 0.9 },
  { url: "/marrakech/",  changefreq: "weekly", priority: 0.9 },
  { url: "/tarifs/",     changefreq: "monthly", priority: 0.9 },
  { url: "/ecommerce/",  changefreq: "monthly", priority: 0.8 },
  { url: "/services/",   changefreq: "monthly", priority: 0.8 },
  { url: "/contact/",    changefreq: "monthly", priority: 0.7 },
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
