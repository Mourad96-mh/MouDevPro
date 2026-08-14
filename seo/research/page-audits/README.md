# Page-by-page GSC audit — 2026-08-13

One report per page in this folder. Property `https://www.moudevpro.com/`.

**Current window:** 2026-07-15 → 2026-08-11 (28 days)
**Comparison window:** 2026-06-17 → 2026-07-14 (previous 28 days)

| | Clicks | Impressions | CTR |
| --- | --- | --- | --- |
| Previous 28d | 35 | 4,136 | 0.85% |
| Current 28d | 31 | 8,522 | 0.36% |
| Change | **−11%** | **+106%** | **−58%** |

Impressions doubled while clicks fell. Almost all the impression growth is the English stats
article (3,431 impressions, 2 clicks) — a link-bait asset that is not meant to convert. Excluding
it, impressions still grew ~23% while clicks dropped.

## How to read these reports

Two data sources are used and they do not agree, on purpose:

- **Page totals** come from the `page` dimension and are complete.
- **Query tables** come from the `page` + `query` dimension, which Google filters — rare queries
  are withheld for anonymity. Across the site this covers 3,181 of 8,522 impressions (37%).

So a page's query table will usually sum to less than its total. That is expected, not data loss.
Where the gap matters for a conclusion, the individual report says so.

---

## Cross-cutting findings

### 1. Trailing-slash duplication is splitting five pages in two

Google is treating slashed and unslashed variants as separate URLs and reporting them separately:

| Logical page | Variants seen | Combined impressions |
| --- | --- | --- |
| `/en` | `/en/` 853 + `/en` 0 (196 previous window) | 853 |
| `/en/rabat` | `/en/rabat/` 146 + `/en/rabat` 0 (62 previous) | 146 |
| `/en/marrakech` | `/en/marrakech/` 145 + `/en/marrakech` 16 | 161 |
| `/ar` | `/ar/` 54 + `/ar` 0 (24 previous) | 54 |
| `/ar/marrakech` | `/ar/marrakech/` 5 + `/ar/marrakech` 2 | 7 |
| `/rabat` | `/rabat` 236 + `/rabat/` 1 | 237 |
| stats EN | `…-2026/` 3,431 + `…-2026` 139 | 3,570 |

**Fixed in `.htaccess` on 2026-08-13 — pending deploy.** The cause was not a missing redirect:
`mod_dir` was already 301ing `/rabat` → `/rabat/` because the prerender writes real directories,
while all 30 sitemap URLs, 24 canonicals and every Ads final URL declared the *unslashed* form.
Google was given contradictory signals and kept switching variants. The server was changed to
serve unslashed, matching what the site already declares — 0 source files touched. Full trace,
rationale and post-deploy verification commands in `_technical-trailing-slash.md`.

### 2. Keyword cannibalisation on the two most important terms

**`développeur web freelance maroc` — seven pages competing, best position 26.95:**

| Page | Impressions | Position |
| --- | --- | --- |
| `/blog/freelance-creation-site-web-maroc` | 22 | **26.95** |
| `/blog/choisir-developpeur-web-freelance-maroc` | 45 | 31.96 |
| `/developpeur-web-freelance-maroc` | 45 | 36.78 |
| `/about` | 7 | 39.14 |
| `/` | 34 | 44.47 |
| `/casablanca` | 13 | 51.62 |
| `/services` | 1 | 134 |

The page *named after the keyword* ranks third of its own siblings. No page consolidates enough
authority to break page 3.

**`création site web casablanca` — the dedicated city page does not rank at all:**

| Page | Impressions | Position |
| --- | --- | --- |
| `/` | 196 + 111 (unaccented) | **1.42 / 1.01** |
| `/blog/creation-site-web-casablanca` | 80 + 57 | 17.45 / 20.04 |
| `/casablanca` | — | absent |

The homepage owns the term at #1. `/casablanca` — the Google Ads landing page for this exact
keyword (root `CLAUDE.md` §11) — does not appear for it organically.

**Riad/Marrakech — the blog post beats the city pages by ~27 positions:**

| Query | Blog post | `/marrakech` | `/en/marrakech/` |
| --- | --- | --- | --- |
| web design riad marrakech english | **2.12** | 31.53 | — |
| site vitrine riad marrakech | **2.17** | 29.29 | — |
| riad website design morocco | **3.27** | 31.17 | — |
| morocco riad website builder | **6.24** | 30.80 | 43.90 |

**`développeur freelance casablanca` — `/about` outranks both money pages:**
`/about` 13.83 · `/casablanca` 24.40 · `/developpeur-web-freelance-maroc` 30.95

### 3. Ranked #1–3 and still earning zero clicks

Two pages hold top-3 positions and convert nothing:

- **`/` on `creation site web casablanca`** — 111 impressions at position **1.01**, zero clicks.
  With the accented variant: 307 impressions at ~1.2, 2 clicks, **0.65% CTR**.
- **`/blog/site-web-hotel-riad-marrakech`** — 114 impressions at positions 2.12–6.24, zero clicks,
  and this has held for two consecutive windows (148 impressions at 6.80 previously).

Expected CTR at position 1–2 is 25–35%. These are 25–50× gaps and the single largest source of
lost traffic on the site. Two different explanations are likely and they need different fixes —
see `homepage.md` and `blog-site-web-hotel-riad-marrakech.md`.

### 4. The homepage is losing ground

| | Clicks | Impressions | Position |
| --- | --- | --- | --- |
| Previous 28d | 19 | 1,729 | 12.05 |
| Current 28d | 10 | 1,737 | 14.20 |

**Clicks nearly halved on flat impressions**, with average position down 2.2. The homepage
generated 54% of all site clicks in the previous window and 32% now.

### 5. Junk queries are inflating homepage impressions

`internet` (148 impressions, position 6.74) and `web hosting` (66, position 10.52) are 214
impressions of commercially irrelevant traffic on the homepage — 17% of its query-level
impressions, guaranteed never to convert, and dragging both CTR and average position.

### 6. Three pages declined sharply

| Page | Position before → after | Impressions |
| --- | --- | --- |
| `/contact` | 6.06 → **36.68** | 36 → 34 |
| `/tarifs` | 8.61 → **19.85** | 74 → 26 |
| `/blog/prix-site-web-maroc-2026` | 8.12 → **13.78** | 69 → 9 |

All three are price/quote-intent pages — the highest commercial intent on the site. `/tarifs` and
the pricing blog post lost roughly two-thirds of their impressions.

---

## Index

### Money pages
- [homepage.md](homepage.md) — `/` · 1,737 impr · 10 clicks · pos 14.20
- [casablanca.md](casablanca.md) — `/casablanca` · 216 · 1 · pos 28.84
- [rabat.md](rabat.md) — `/rabat` · 236 · 3 · pos 28.40
- [marrakech.md](marrakech.md) — `/marrakech` · 118 · 0 · pos 26.89
- [tarifs.md](tarifs.md) — `/tarifs` · 26 · 0 · pos 19.85
- [ecommerce.md](ecommerce.md) — `/ecommerce` · 218 · 3 · pos 25.45
- [services.md](services.md) — `/services` · 19 · 0 · pos 59.21
- [contact.md](contact.md) — `/contact` · 34 · 0 · pos 36.68
- [about.md](about.md) — `/about` · 73 · 0 · pos 15.16
- [developpeur-web-freelance-maroc.md](developpeur-web-freelance-maroc.md) — 335 · 1 · pos 46.39

### International
- [france.md](france.md) — `/france` · 258 · 0 · pos 74.84 *(rewritten 2026-08-13)*
- [canada.md](canada.md) — `/canada` · 155 · 3 · pos 41.83
- [usa.md](usa.md) — `/usa` · 112 · 0 · pos 12.98

### English
- [en-casablanca.md](en-casablanca.md) — `/en/` · 853 · 2 · pos 28.71
- [en-rabat.md](en-rabat.md) — `/en/rabat/` · 146 · 0 · pos 30.85
- [en-marrakech.md](en-marrakech.md) — `/en/marrakech/` · 161 combined · 0 · pos 42.75

### Arabic
- [ar-casablanca.md](ar-casablanca.md) — `/ar/` · 54 · 0 · pos 28.39
- [ar-rabat.md](ar-rabat.md) — `/ar/rabat` · 54 · 0 · pos 9.50
- [ar-marrakech.md](ar-marrakech.md) — `/ar/marrakech` · 7 combined · 0

### Blog
- [blog-index.md](blog-index.md) — `/blog` · 7 · 0 · pos 9.86
- [blog-creation-site-web-casablanca.md](blog-creation-site-web-casablanca.md) — 246 · 0 · pos 18.56
- [blog-site-web-hotel-riad-marrakech.md](blog-site-web-hotel-riad-marrakech.md) — 135 · 0 · pos 6.98
- [blog-freelance-creation-site-web-maroc.md](blog-freelance-creation-site-web-maroc.md) — 117 · 1 · pos 23.30
- [blog-choisir-developpeur-web-freelance-maroc.md](blog-choisir-developpeur-web-freelance-maroc.md) — 95 · 0 · pos 28.92
- [blog-site-ecommerce-maroc-guide.md](blog-site-ecommerce-maroc-guide.md) — 96 · 2 · pos 10.74
- [blog-prix-site-web-maroc-2026.md](blog-prix-site-web-maroc-2026.md) — 9 · 0 · pos 13.78
- [blog-prix-site-ecommerce-maroc.md](blog-prix-site-ecommerce-maroc.md) — 56 · 1 · pos 10.20
- [blog-statistiques-web-maroc-2026.md](blog-statistiques-web-maroc-2026.md) — 150 · 2 · pos 5.29
- [blog-web-statistics-morocco-2026.md](blog-web-statistics-morocco-2026.md) — 3,570 combined · 2 · pos 6.06

### Technical
- [_technical-trailing-slash.md](_technical-trailing-slash.md) — URL duplication across 7 pages
- [_cannibalisation.md](_cannibalisation.md) — the three competing clusters, with a fix plan
