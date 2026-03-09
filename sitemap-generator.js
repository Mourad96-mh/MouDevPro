import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import path from "path";

const BASE = "https://www.moudevpro.com";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All routes with their hreflang alternates
const routes = [
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
  {
    url: "/agence-web-rabat/",
    changefreq: "weekly",
    priority: 0.9,
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
    priority: 0.7,
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
    priority: 0.7,
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
    priority: 0.9,
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
    priority: 0.7,
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
    priority: 0.7,
    links: [
      { lang: "fr", url: `${BASE}/agence-web-marrakech/` },
      { lang: "en", url: `${BASE}/en/web-agency-marrakech/` },
      { lang: "ar", url: `${BASE}/ar/agence-web-marrakech/` },
      { lang: "x-default", url: `${BASE}/agence-web-marrakech/` },
    ],
  },
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
