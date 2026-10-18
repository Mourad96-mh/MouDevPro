# SEO Audit — Status

**Project:** moudevpro.com  ·  **Type:** vitrine / local business (multi-city + international)  ·  **Stack:** React + Vite, Puppeteer prerender
**Build:** ✅ passing — 31 pages  ·  **Last updated:** 2026-10-18

## ▶ Overall: 🟡 SAFE FIXES APPLIED (not deployed) — decisions 9–11 pending
Safe fixes 1–8 done and verified on `dist/` (2026-10-18). Not uploaded yet. Decisions 9–11 and Ads item 12 still open.

## After safe fixes (Lighthouse 12, mobile, same setup)
| Page | Perf | A11y | Best Pr. | SEO | LCP | TBT | CLS | Page weight |
|------|:----:|:----:|:--------:|:---:|:---:|:---:|:---:|:-----------:|
| /           | 67 → **91** | 96 | 71 → 93 | 100 | 4.0 → 2.8 s | 680 → 160 ms | 0.054 → 0 | 2,736 → 788 KB |
| /casablanca | 53 → **84** | 87 → 92 | 75 → 96 | 100 | 5.3 → 3.7 s | 1,140 → 160 ms | 0.014 → 0 | 2,760 → 831 KB |
| /marrakech  | 62 → **74** | 87 → 92 | 75 → 96 | 100 | 4.2 → 4.2 s | 910 → 390 ms | 0.011 → 0 | 2,787 → 857 KB |

⚠️ Not a like-for-like TBT comparison: the "after" run is on localhost, where the new hostname guard skips the GA4/Ads `config`, so less third-party JS runs (~540 ms of main-thread before). Production TBT will sit higher than 160 ms. The byte, font, LCP and CLS gains don't depend on that.

Verified on all 32 HTML files: `<html lang>` present, exactly 1 `og:image` / `og:locale` / `robots` each, all `og:image` files exist (1200×630 JPG), no Google Fonts, no global hero preload, no noscript block; `404.html` = noindex; schema 0 errors; sitemap still 31 URLs.

## Phases
| # | Phase | Status | Result / note |
|---|-------|:------:|---------------|
| 0  | Build & inventory                     | ✅ | 31 pages, sitemap = 31 URLs, exact match |
| 1  | Per-page meta                         | ⚠️ | 1 title / 1 H1 / self-canonical everywhere, no duplicates. **No `<html lang>` on 13 FR pages.** 22/31 titles > 60c, 16 descriptions > 160c |
| 1b | On-page targeting & internal linking  | ⚠️ | All FR Ads keywords aligned. Misses: EN keywords routed to FR pages; "développeur web marrakech" not in title/H1. `<noscript>` block leads every page with homepage copy |
| 2  | Structured data (JSON-LD)             | ⚠️ | 87 blocks, **0 errors**. But no `@id`: 18 separate business entities, 7 names; EN/AR Rabat & Marrakech pages declare street + geo in those cities; no `logo`, no `sameAs` |
| 2c | GEO / LLM                             | ✅ | `llms.txt` ships; robots allows GPTBot, PerplexityBot, ClaudeBot, Google-Extended |
| 3  | Sitemap + robots                      | ✅ | OK. hreflang: `/` and `/casablanca` both claim to be FR of `/en` + `/ar` (non-reciprocal on `/`) |
| 4  | OG share image                        | ❌ | 2 `og:image` per page; first is a 360×360 logo; blog images are AVIF (WhatsApp/Facebook can't render) |
| 5  | Page weight / DOM size                | ✅ | Max 900 nodes (home), ≤ 20 KB gzip HTML. JS: one 623 KB chunk (173 KB gz) |
| 6  | Images                                | ⚠️ | Portfolio = PNG, ~1.7 MB savable as WebP. `setup.avif` 643 KB. 1 img without width/height on `/en`, `/ar` pages |
| 7  | Lighthouse                            | ⚠️ | Mobile perf 53–67 (see below). SEO 100 |
| 8  | Launch checklist + report             | ⚠️ | Live: `/google-ads` not uploaded (unknown to Google); unknown URLs return 200 (soft 404) |

Legend: ✅ done · ⚠️ done with issues · ❌ failing · 🟡 in progress · ⏳ pending · ➖ not applicable

## Scores (Lighthouse 12, mobile, `vite preview` — no gzip, so perf is under-reported by a few points)
| Page | Perf | A11y | Best Pr. | SEO | LCP | CLS | TBT |
|------|:----:|:----:|:--------:|:---:|:---:|:---:|:---:|
| /           | 67 | 96 | 71 | 100 | 4.0 s | 0.054 | 680 ms |
| /casablanca | 53 | 87 | 75 | 100 | 5.3 s | 0.014 | 1,140 ms |
| /marrakech  | 62 | 87 | 75 | 100 | 4.2 s | 0.011 | 910 ms |

Main causes: Google Fonts Rubik (8 weights) render-blocking ~760 ms; `/hero-img.avif` preloaded on **every** page (it is the homepage hero, so city pages preload the wrong image → `/casablanca` LCP image not prioritized, est. −1.7 s); portfolio PNGs; gtag (GA4 + Ads) ~540 ms main thread. A11y: `html-has-lang`, `.logo-mou` contrast, in-text links not distinguishable.

## Search Console (2026-09-17 → 10-15)
- `/casablanca`, `/en` indexed, review snippets detected. `/google-ads`: **URL is unknown to Google**.
- Quick wins (page 1, 0 clicks): "création site web maroc" pos 3.0 (81 impr.), "création site web" 5.0, "creation site web" 4.1, "web development" 5.3 → title/description CTR work on `/`.
- Striking distance: "développeur web freelance maroc" 12.7, "webmaster freelance maroc" 12.0, "développeur freelance casablanca" 12.4 (on `/developpeur-web-freelance-maroc`), "site e-commerce maroc" 17.1 on `/ecommerce`.

## Schema validation
`validate-schema.mjs`: 31 pages, 87 blocks, **0 errors**, 61 notices (missing `logo` ×29, FAQPage rich-result restriction ×18).

## Fix plan
**Safe — no Ads/title impact** — ✅ all done 2026-10-18
1. ✅ Default `lang="fr"` + `robots`/`og:locale`/`og:image` defaults in `AppLayout` Helmet (Helmet was stripping the template's `lang` from 13 FR pages).
2. ✅ Global `/hero-img.avif` preload removed (every hero `<img>` already has `fetchpriority="high"`).
3. ✅ `public/og-default.jpg` (1200×630 branded card) on all pages; `public/og/*.jpg` for blog posts. Generator: `scripts/make-og-images.cjs`.
4. ✅ Portfolio PNG → WebP, 2.0 MB → 0.25 MB. Converter: `scripts/portfolio-webp.cjs`.
5. ✅ noscript block removed.
6. ✅ Rubik self-hosted as a variable font (300–800, latin/latin-ext/arabic, `src/fonts.css`); latin face preloaded. Also fixes weights 600/800, which were synthesized before.
7. ✅ `dist/404.html` prerendered (noindex); `.htaccess` SPA fallback replaced by `ErrorDocument 404`.
8. ✅ GA4/Ads `config` only on `www.moudevpro.com`. **Plus a bug fix:** `gtag_report_conversion` now opens WhatsApp after 1 s even if the Ads callback never fires. Before, with gtag.js blocked (ad blockers), the WhatsApp button did nothing.

**Follow-up found while doing it:** several older portfolio screenshots were taken before the hero loaded and are mostly empty (Neutron Africa, AT Dental, TPE Maroc, Care My Dog). Worth reshooting.

**Needs a decision**
9. hreflang: is `/en` the English version of `/` or of `/casablanca`?
10. One business entity: shared `@id`, one name, address = Casablanca only; Rabat/Marrakech go in `areaServed`, not in `address`/`geo`.
11. Titles > 60c on Ads landing pages: only change after checking §5.4 alignment.

**Ads (read-only, report only)**
12. Final URLs for English keywords → `/en`, `/en/rabat`, `/en/marrakech` ("web developer casablanca/rabat/morocco", "website design …", "hotel website marrakech"). "prix site web casablanca" → `/tarifs`.

## Blockers / open items (not closeable in-repo)
- [ ] Upload the **whole** `dist/` (incl. `.htaccess`, `404.html`, `fonts/`, `og/`, `og-default.jpg`, `google-ads/`), then request indexing for `/google-ads` in GSC
- [ ] After upload, check: an unknown URL returns 404; `/fonts/rubik-latin.woff2` is served as `font/woff2`; a WhatsApp click still opens WhatsApp; GA4 Realtime still receives hits
- [ ] Re-share a page on WhatsApp/Facebook to refresh the cached preview (Facebook Sharing Debugger → "Scrape again")
- [ ] Confirm the 30 reviews / 5.0 in `aggregateRating` match the Google Business Profile
- [ ] Add GBP + LinkedIn URLs for `sameAs`

## Verdict
Audit complete; technically sound for crawling (SEO 100, 0 schema errors). Main gaps are performance (mobile 53–67), social sharing and entity consistency. Fixes not applied yet.
