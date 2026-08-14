# SEO session report — 2026-08-13

> Scope: repo cleanup, Search Console connection, `/france` diagnosis and rewrite.
> Property: `https://www.moudevpro.com/` (URL-prefix — `sc-domain:` does not exist for this site).
> Data window: **2026-07-15 → 2026-08-11** (28 days, ending 2 days back because GSC is incomplete
> for the most recent ~48h). Raw exports: `data/gsc-*-2026-08-13.csv`, notes in
> `data/gsc-snapshot-2026-08-13.md`.

---

## 1. Search Console — connection and health

Connected via the `gsc` MCP server with `siteFullUser` permission. Data verified flowing:
search analytics, sitemap listing, and URL inspection all return live results.

**Property totals for the window: 31 clicks, 8,522 impressions.**

Indexing is healthy. The sitemap report claims `indexed: 0`, but that field is unreliable in the
API — URL inspection on `/` and `/blog/statistiques-web-maroc-2026` both return **PASS /
"Submitted and indexed"**, crawled mobile-first, canonicals matching, rich results detected.
`sitemap.xml` itself is clean: 30 URLs, 0 errors, last downloaded 2026-08-07.

### Devices

| Device | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Desktop | 23 | 7,258 | 0.32% | 16.23 |
| Mobile | 8 | 1,234 | 0.65% | 12.37 |
| Tablet | 0 | 30 | 0% | 37.10 |

Mobile converts at **2× desktop CTR on one-sixth the volume** — consistent with the international
long tail being desktop-heavy and local Moroccan intent traffic being mobile.

### Countries

Morocco 3,502 impressions / 23 clicks. **USA is the second-largest source at 2,829 impressions and
zero clicks** (position 8.30), followed by France 462 / 2 and Canada 151 / 1.

---

## 2. Findings

### 2.1 The Casablanca keyword is the biggest single opportunity

`création site web casablanca` — the primary money keyword in root `CLAUDE.md` §5.1:

| Page | Impressions | Clicks | CTR | Position |
| --- | --- | --- | --- | --- |
| `/` (homepage) | 196 | 2 | **1.02%** | **1.42** |
| `/blog/creation-site-web-casablanca` | 80 | 0 | 0% | 17.45 |

**The homepage ranks at position 1.42 and converts at 1%.** Expected CTR at position 1–2 is
25–35%. This is a 25× gap and by far the highest-value anomaly in the account.

> **Correction to an earlier reading in this session.** The blended query-level average is 4.83,
> which initially looked like "ranks ~5, weak title". The page-level split shows that is wrong:
> the homepage is effectively #1 and the average is dragged by the blog post at 17.45. The cause
> is therefore **not** ranking, and probably not the title either.

Most likely explanation is SERP crowding: a commercial local query in Morocco returns paid ads and
a local pack above the organic #1, so the organic result sits well below the fold. **Note that
`"création site web casablanca"` is an active Google Ads keyword (root `CLAUDE.md` §11).** If your
own ad sits above your own #1 organic result, you may be paying for clicks the organic listing
would earn for free. This is worth checking before touching any on-page element.

### 2.2 USA traffic is a link-bait asset working as designed

2,829 US impressions, zero clicks, almost entirely on `/blog/web-statistics-morocco-2026/`
(3,431 impressions, 2 clicks, position 6.06). That article exists to earn citations and backlinks,
not leads, so its 0.06% CTR is **not** a defect. Recorded here so nobody "fixes" it later.

It also means `/usa` itself (112 impressions, 0 clicks) is not what draws US traffic.

### 2.3 `/france` was matched to the wrong queries — now fixed

`/france` averaged position **74.8** vs `/canada` 41.8 and `/usa` 13.0.

| Query | Impressions | Position |
| --- | --- | --- |
| développement web sur mesure | 89 | 97.1 |
| développeurs sur mesure | 15 | 79.5 |
| développement web sur-mesure | 9 | 100.1 |
| développeur site e-commerce | 21 | 57.1 |
| développeur web france et budget indicatif | 15 | 77.5 |
| développeurs de sites web hors de france | 3 | **43.3** |
| développeur freelance france | 1 | **24.0** |

113 of 197 visible impressions (57%) were three spellings of one generic head term ranking 79–100.
On France-qualified and offshore-intent queries the same page already ranked **24–43** — in line
with `/canada`.

**Root cause is search behaviour, not page quality.** French users don't type "France" into
queries; they're in France, it's the default. So the page only surfaced on generic national head
terms contested by every French agency. Quebecers *do* add "canada"/"québec"/"montréal" to escape
France-dominated results, which is why `/canada` earns cheaper geo-qualified impressions.

### 2.4 Housekeeping

- A broken sitemap submission exists at `https://www.moudevpro.com/sitemapxml` (missing the dot),
  submitted 2026-05-15, reporting 1 error, still being re-fetched by Google.
- Homepage inspection lists `https://www.moudevpro.com/agence-web-marrakech/` as a referring URL —
  Google still follows that legacy path, which was returning the SPA 404.

---

## 3. What was fixed

Three commits on `feat/stats-article-backlinks`. Nothing pushed, nothing deployed.

### `f6809ba` — cleanup, dependency, redirects

| Removed | Reason |
| --- | --- |
| `.eslintrc.json` | Legacy config extending `react-app` (not installed); ESLint 9 reads only flat `eslint.config.js` |
| `vercel.json` | Vercel is not the deploy target — but it held 3 redirects `.htaccess` lacked (see below) |
| `public/_redirects` | Netlify-only, duplicated by the `.htaccess` SPA fallback |
| `public/desktop.ini` | OneDrive artifact; was being copied into `dist/` and uploaded to the server every deploy |
| `seo/content/published/.gitkeep` | Folder has tracked content |
| `eslint-plugin-react` dep | Nothing imports it; flat config loads only react-hooks and react-refresh |

Three legacy 301s ported from `vercel.json` into `public/.htaccess` — they had **never been live**,
since Vercel never runs for this site:

```apache
RewriteRule ^agence-web-marrakech/?$ /marrakech [R=301,L]
RewriteRule ^agence-web-rabat/?$ /rabat [R=301,L]
RewriteRule ^agence-web-tanger/?$ / [R=301,L]
```

Every image in `public/` and `public/portfolio/` was checked and is referenced from `src/` — no
orphans were removed.

### `e89bf88` — `/france` retarget + schema entity fix

- Dropped `développement web sur mesure` and variants from `keywords`; targeted externalisation,
  city-qualified (Paris/Lyon/Marseille) and budget-intent terms
- New title, H1, meta description, intro built on "hors de France"
- Three new optional config keys (`offshore`, `cities`, `budget`) + three FAQ entries
- `MarketPage.jsx` renders each block only when present — `/canada` and `/usa` verified
  structurally unchanged in the prerendered HTML
- Budget table reuses existing `.compare-table` markup from `CasablancaPage.jsx`; no new CSS
- Fixed the one genuine brand outlier: `ProfessionalService` schema said `MouDEV` where the other
  11 business-entity declarations and `CLAUDE.md` §7 say `MouDevPro`

Copy and rationale: `../content/published/france.md`.

### `4009cff` — GSC data

Four CSVs plus `data/gsc-snapshot-2026-08-13.md`. The undated CSVs in `data/` are an earlier export
and the evidence behind `data-insights.md`; they were deliberately **not** overwritten.

Verified throughout: `eslint .` exit 0, `npm run build` exit 0, 30/30 routes prerendered.

---

## 4. What remains

### Needs your hands (I can't do these)

- **Remove the broken `/sitemapxml` submission** in the GSC UI → Sitemaps → select row → "Remove
  sitemap". The MCP has no delete-sitemap tool.
- **Deploy.** `npm run build` + upload `dist/` to the LiteSpeed host. Until then the `.htaccess`
  redirects and the whole `/france` rewrite are inert.

### Open decisions (not mine to make)

- **Site name vs business name.** `WebSite.name`, `og:site_name`, `meta author` and ~20 meta title
  suffixes say `MouDEV`; the business entity says `MouDevPro` on a `moudevpro.com` domain. It is
  internally consistent as-is, so this is a branding call, not a bug. Unifying touches ~20 files.
- **Duplicated review markup.** The same two reviews (Amine Bennani, Ahmed Ali) with
  `aggregateRating` appear on the homepage and all three market pages. This is the pattern Google
  has been tightening on for self-serving review snippets. Untouched — it's a content/compliance
  judgment.
- **Branch.** These three commits sit on `feat/stats-article-backlinks`, which is about the stats
  article. Topic mismatch; nothing pushed yet, so they can still be moved.

### Known and deliberately not addressed

- **19 npm vulnerabilities** (3 low, 3 moderate, 13 high) reported during `npm uninstall`.
  Pre-existing, unrelated to this session's changes.
- **`/canada` and `/usa` not retargeted.** The offshore treatment may suit them, but the data does
  not yet justify it — `/canada` already earns geo-qualified impressions at position 20–24.
- **Uncommitted work left alone:** `Header.jsx`, `Portfolio.jsx`, `backlinks-log.csv`, two citation
  output files, four portfolio PNGs. These look like one coherent unit (the PNGs are what
  `Portfolio.jsx` now references).

---

## 5. Next steps, in priority order

1. **Investigate the Casablanca CTR gap** — highest value in the account. Position 1.42 at 1% CTR.
   Start by checking whether your own Google Ads listing sits above your organic #1 for
   `création site web casablanca`; if so you may be buying clicks you already rank for. Only then
   look at title/meta. *(Do not change the title without re-checking Ads QS alignment — root
   `CLAUDE.md` §5.4 and §10.)*
2. **Deploy** `dist/` — unlocks the legacy redirects and the `/france` rewrite in one upload.
3. **Remove the `/sitemapxml` submission** in the GSC UI.
4. **Re-measure `/france` around 2026-09-10** (~4 weeks post-deploy). Baseline: position 74.8,
   258 impressions, 0 clicks. **Judge on clicks, not average position** — shedding 113
   low-ranking impressions will make the average move erratically before it improves.
5. **Resolve `/blog/creation-site-web-casablanca` vs `/`** — both rank for the same keyword
   (1.42 and 17.45). Worth confirming the blog post is not diluting the homepage; if it is,
   internal linking should point the keyword at `/`.
6. **Wave 0.1 from `topical-map.md` (`/rabat` rewrite)** remains the standing priority and was not
   touched this session. `/rabat`: 236 impressions, 3 clicks, position 28.40 in this window.
