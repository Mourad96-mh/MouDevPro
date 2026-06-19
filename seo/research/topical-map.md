# Topical Map & Action Plan — moudevpro.com

> Generated 2026-06-19. Built on `data-insights.md` (real Ads + GSC data) and the existing
> `../SEO-ROADMAP.md` and root `../CLAUDE.md` positioning (freelance, not agency; FR primary +
> EN/AR; Casablanca / Rabat / Marrakech; lead-gen focus).
> Priority logic: rank pages that already get impressions before creating new ones.

---

## Wave 0 — Fix what's already ranking (this week, highest ROI)

These are existing pages with high impressions and bad positions. No new pages — just on-page work.

| # | Page | Now | Action | Target |
| --- | --- | --- | --- | --- |
| 0.1 | `/rabat` | pos 31, 676 impr | Rewrite intro for `création site web rabat` in title+H1+first 100 words; add local context (startups, NGOs, institutional); add Temara/Salé mentions (ads convert on "création site web temara") | top 10 |
| 0.2 | `/casablanca` | pos 27, 690 impr | Same on-page pass; lead with PME/e-commerce; surface price + "devis 24h" above fold | top 10 |
| 0.3 | `/marrakech` | pos 31, 435 impr | Strengthen hôtel/riad/restaurant angle + EN block (already ranks `/en/marrakech` pos 19) | top 10 |
| 0.4 | `/tarifs` | pos 10, 203 impr | Add price to `<title>` and H1 (beat creationsiteweb's "dès 1990 DH"); FAQ schema | top 5 |
| 0.5 | Home `/` | pos 16, 1,470 impr | Put pricing-from + "développeur freelance" in title/meta; tighten H1 to money keyword | top 10 |

**Internal-linking fix (do alongside):** point the two page-1 blog posts at the money pages.
- `/blog/prix-site-web-maroc-2026` (pos 6) → link to `/tarifs`, `/casablanca`, `/rabat` with keyword anchors
- `/blog/site-web-hotel-riad-marrakech` (pos 7) → link to `/marrakech`, `/en/marrakech`

---

## Wave 1 — Capture proven intent (next 2–3 weeks)

New/expanded pages backed by data showing the intent exists and converts.

| # | Page / asset | Why (evidence) | Primary keyword |
| --- | --- | --- | --- |
| 1.1 | `/developpeur-web-freelance-maroc` (or beef up Home/About) | Core identity ranks pos 43 with 54 impr; "freelance developpeur web" is an active Ads term | developpeur web freelance maroc |
| 1.2 | `/rabat/temara` or Temara section on `/rabat` | "création site web temara" converts 100% in Ads (2 conv) | création site web temara |
| 1.3 | Blog: "Créer un site web soi-même vs développeur" | "créer site web / créer un site / website builder / comment creer un site" all convert in Ads — capture the DIY-researcher and convert to done-for-you | créer un site web maroc |
| 1.4 | `/ecommerce` upgrade | "créer ma boutique", "créer un store", "comment creer un site e commerce" convert at 100% (low vol); page sits pos 18.7 | boutique en ligne maroc |
| 1.5 | Blog: "Combien coûte un site e-commerce au Maroc" | Pairs with `/ecommerce` + the page-1 `site-ecommerce-maroc-guide`; price intent | prix site e-commerce maroc |

---

## Wave 2 — Depth & moat (4–8 weeks)

| # | Page / asset | Rationale |
| --- | --- | --- |
| 2.1 | Service sub-pages: `/services/site-vitrine`, `/services/refonte`, `/services/application-web` | Match rhillane's content depth; internal-link hub |
| 2.2 | Casablanca neighbourhood / sector angles (PME, e-commerce) | Mirror the proven city-granularity play |
| 2.3 | AR money pages pass (`/ar`, `/ar/rabat`, `/ar/marrakech`) | You're the only structured AR competitor; `/ar/rabat` already pos 8.3 |
| 2.4 | International CTR fix: `/usa` (1,048 impr, pos 8.7, **0 clicks**), `/france`, `/canada` | Title/meta rewrite to earn the click; low effort, organic-only per CLAUDE.md §12 |
| 2.5 | Comparison/alternative posts vs rhillane, agencies | "qualité agence, prix freelance" angle |

---

## Page brief template (use for every draft)

```
URL slug:
Primary keyword (title + H1 + first 100 words):
Secondary keywords:
Target persona (CLAUDE.md §4):
Search intent:
Title (<60 chars, keyword + city, price if money page):
Meta description (150–160, keyword + "Devis gratuit 24h"):
H1 (primary keyword, natural):
Outline (H2/H3):
Internal links in (which pages link here):
Internal links out (where this page links, keyword anchors):
CTA (above fold + after each section, per CLAUDE.md §9):
Schema (LocalBusiness for city pages, ProfessionalService for intl, FAQ for tarifs):
```

---

## The production loop (same as last project)

1. **Plan** here in `seo/` (this map + a page brief).
2. **Draft** to `seo/content/drafts/<slug>.md`, following `content/context/style-guide.md` and `brand-voice.md`.
3. **Review** the draft (you) → move to `seo/content/published/<slug>.md`.
4. **Implement** in the React app: add the route/page in `src/pages/`, wire config in
   `src/data/cityConfig.js` / `marketConfig.js`, update `src/locales/*/translation.json`, and
   regenerate `sitemap-generator.js`. Follow the existing `CasablancaPage.jsx` / `CityPage.jsx` pattern.
5. **Re-check** in GSC after ~2–4 weeks; promote the next wave.

---

## Suggested first move

**Wave 0.1 — `/rabat`.** Biggest gap (148 impressions for `creation site web rabat` at position 30,
plus a 100%-converting "Temara" Ads signal), and it's a rewrite of an existing page rather than a
new build — fastest path to a measurable ranking climb.
