// Post-build prerender: snapshot each route's fully-rendered HTML to a static
// file so crawlers (and social/AI bots that don't run JS) get correct per-page
// <title>/meta/JSON-LD + body content. No app-code changes — this loads the real
// built SPA in headless Chrome and writes dist/<route>/index.html for each route.
//
// Vercel serves these static files directly; the SPA rewrite in vercel.json only
// kicks in for paths without a matching file. On load, the client bundle still
// boots and re-renders, so the page stays fully interactive.

import { preview } from "vite";
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import process from "node:process";
import { blogPosts } from "./src/data/blogPosts.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist");

// Mirrors the routes in src/App.jsx (excluding the "*" NotFound catch-all).
const staticRoutes = [
  "/",
  "/rabat",
  "/marrakech",
  "/en",
  "/en/rabat",
  "/en/marrakech",
  "/ar",
  "/ar/rabat",
  "/ar/marrakech",
  "/france",
  "/canada",
  "/usa",
  "/tarifs",
  "/casablanca",
  "/ecommerce",
  "/services",
  "/contact",
  "/about",
  "/blog",
];
const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);
const routes = [...staticRoutes, ...blogRoutes];

const server = await preview({ logLevel: "silent" });
const base = server.resolvedUrls.local[0].replace(/\/$/, "");

// --no-sandbox is required because CI/Vercel build containers run as root, where
// Chromium refuses to launch with the sandbox enabled. The other flags harden
// startup in low-resource/no-GPU container environments.
const browser = await puppeteer.launch({
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
  ],
});

// Hosts to block during prerender so analytics/ads scripts don't execute and
// inject runtime beacons (which would otherwise be baked into the static HTML
// and fire phantom hits on every page load). The <script> tags themselves stay
// in the output — only their network load is blocked here — so tracking works
// normally for real visitors.
const BLOCKED_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "analytics.google.com",
  "googleads.g.doubleclick.net",
  "doubleclick.net",
  "googlesyndication.com",
  "googleadservices.com",
];

let ok = 0;
for (const route of routes) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (BLOCKED_HOSTS.some((h) => url.includes(h))) req.abort();
    else req.continue();
  });
  try {
    await page.goto(base + route, { waitUntil: "networkidle2", timeout: 30000 });
    // Wait until React has rendered content into #root.
    await page
      .waitForFunction(
        () => {
          const r = document.getElementById("root");
          return r && r.children.length > 0;
        },
        { timeout: 15000 }
      )
      .catch(() => {});

    const html = await page.content();
    const outDir = route === "/" ? distDir : join(distDir, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "index.html"), html, "utf-8");
    ok += 1;
    console.log(`  ✓ ${route}  →  dist${route === "/" ? "" : route}/index.html`);
  } catch (err) {
    console.error(`  ✗ ${route}  —  ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
await server.httpServer.close();

console.log(`\n✅ Prerendered ${ok}/${routes.length} routes into dist/`);
if (ok !== routes.length) process.exit(1);
