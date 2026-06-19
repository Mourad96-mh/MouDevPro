# Data Insights — moudevpro.com

> Generated 2026-06-19 from real data: Google Ads search-term reports (3 ad groups) + Google
> Search Console "Performance on Search" export (last ~90 days, to 2026-06-19).
> Raw files live in `seo/research/data/`. This is the evidence base for `topical-map.md`.

---

## 0. TL;DR — the one thing to fix

**Your money pages get the impressions but not the rank.** `/casablanca` (690 impressions,
position 26.8), `/rabat` (676, pos 31.4) and `/marrakech` (435, pos 30.7) are seen by Google
for the right queries but sit on page 3 — so they convert ~nothing organically. Meanwhile your
**blog posts rank on page 1** (`/blog/prix-site-web-maroc-2026` pos 6.3, `site-web-hotel-riad-marrakech`
pos 7.0). And Ads proves the commercial intent is real and converts at **16.6%**.

The opportunity is not new keywords. It is **getting the existing city pages to rank** and
**pointing the page-1 blog authority at them via internal links**.

---

## 1. Google Ads — what actually converts

All-time, three ad groups (`creation-site-web-casablanca`, `creation-site-web-rabat`, `Ad group 1` = Marrakech).

| Metric | Value |
| --- | --- |
| Clicks | 730 |
| Impressions | 6,689 |
| Conversions | 121 |
| Cost | 6,039 MAD |
| **Conversion rate** | **16.6%** |
| **Cost / conversion** | **50 MAD** |

*(Figures from the three campaigns' "Total: Campaign" rows — the authoritative totals, which
include search terms below Google's individual-reporting threshold. Don't sum the per-term rows
plus the "Total:" rows or you double-count.)*

A 16.6% conversion rate on commercial search is excellent and confirms the offer + landing
flow work. The job is to feed that flow from organic too, where the click is free.

### Top converting search terms (paid)

| Conv. | Clicks | Conv. rate | Ad group | Search term |
| --- | --- | --- | --- | --- |
| 6.0 | 48 | 12% | Casablanca | site web |
| 3.0 | 6 | 50% | Casablanca | creation site web maroc |
| 2.0 | 3 | 67% | Casablanca | créer site web |
| 2.0 | 3 | 67% | Casablanca | comment creer un site |
| 2.0 | 2 | 100% | Rabat | **création site web temara** |
| 2.0 | 15 | 13% | Marrakech | site web |
| 1.5 | 6 | 25% | Casablanca | website builder |
| 1.0 | 3 | 33% | Casablanca | créer un site web |

Plus a long tail of e-commerce / "boutique en ligne" intent converting at 100% on low volume
(`créer ma boutique`, `comment creer un site e commerce`, `créer un store`, `yocan store`).

### Wasted spend (high clicks, zero conversions) — for the Ads side, not SEO

`agence création site web ... casablanca` (5 clicks, 45 MAD), `ecommerce website` (5 clicks),
`comment créer un site web` (7 clicks across groups), `creating landing pages`, `pen io website`.
Several are already in `ads-data/negative-keywords.md` territory — review there, not here.

---

## 2. Google Search Console — where you actually rank

### Pages: high impressions, buried position

| Page | Impressions | Clicks | CTR | Position |
| --- | --- | --- | --- | --- |
| `/` (home) | 1,470 | 50 | 3.4% | 16.5 |
| `/en` | 1,255 | 7 | 0.6% | 10.7 |
| `/casablanca` | 690 | 1 | 0.14% | **26.9** |
| `/rabat` | 676 | 2 | 0.3% | **31.4** |
| `/blog/prix-site-web-maroc-2026` | 465 | 2 | 0.43% | **6.3** |
| `/marrakech` | 435 | 1 | 0.23% | **30.7** |
| `/about` | 277 | 2 | 0.7% | 28.8 |
| `/blog/site-web-hotel-riad-marrakech` | 222 | 2 | 0.9% | **7.0** |
| `/blog/choisir-developpeur-web-freelance-maroc` | 218 | 0 | 0% | 24.8 |
| `/tarifs` | 203 | 1 | 0.5% | 10.0 |

**Pattern:** blog posts rank page-1 (6–7), city money-pages rank page-3 (27–31). The city
pages are the conversion targets but they are the weakest rankers. That inversion is the whole game.

### Queries: the ads-vs-organic gap

| Query | Ads (converts?) | Organic position | Organic impressions |
| --- | --- | --- | --- |
| `creation site web casablanca` | yes (group) | **3.4** | 55 |
| `creation site web rabat` | yes (group) | **30.2** | 148 |
| `creation site web maroc` | 3 conv, 50% CR | 1.0 | 1 (barely indexed for it) |
| `prix site web maroc` | intent | 11.5 | 16 |
| `site vitrine riad marrakech` | — | 3.4 | 33 |
| `developpeur web freelance maroc` | — | **43.3** | 54 |
| `site web pour riad` | — | 22.4 | 20 |
| `société de developpement web rabat` | — | 34.5 | 13 |

`creation site web rabat` is the clearest single opportunity: **148 impressions, position 30**.
You are being shown for it constantly and getting nothing. `developpeur web freelance maroc`
(54 impressions, position 43) is core positioning ranking nowhere.

---

## 3. Geography & device

- **Morocco** = 65 of 75 clicks (4,377 impressions, avg pos 22.8). The home market is the engine.
- **France** 259 impressions / pos 14.6, **USA 1,048 impressions / pos 8.7 but 0 clicks**,
  Canada 48 / pos 8.9. The international market pages (`/france`, `/usa`, `/canada`) already
  pick up impressions at decent positions but convert nothing — title/CTR problem, lower priority
  than fixing the MA city pages.
- **Mobile converts better organically**: 3.25% CTR vs 0.8% desktop. Mobile-first copy and CTA
  placement matter.

---

## 4. Competitors ranking above you (organic)

| Competitor | What they do | Their edge | Their weakness |
| --- | --- | --- | --- |
| rhillane.com `/creation-site-web-maroc/` | Agency, "Agence N°1 2026" | Long-form money page, strong on-page SEO, multi-keyword #1 | Agency overhead, no freelance/direct angle |
| creationsiteweb.ma | Thin Casablanca site | **Transparent pricing on-page** (vitrine 2790 DH, e-commerce 3990 DH, SEO 2500 DH), low price in `<title>` ("dès 1990 DH") | Thin content, PHP errors, "nous" agency voice, generic templates, no real city pages |

**Takeaway:** rhillane wins on content depth; creationsiteweb wins on price-in-title. You can
beat both — freelance/direct positioning (neither has it), transparent pricing (rhillane lacks it),
and real depth + multilingual (creationsiteweb lacks it). Pricing in the `<title>`/H1 is a cheap
CTR win you are currently missing.

---

## 5. What this means for the plan

1. **Don't chase new keywords. Rank the pages you already have.** The city pages are indexed and
   impression-rich; they just need on-page depth, internal links, and CTR work to climb from ~28 to top-10.
2. **Use the page-1 blog posts as authority donors.** `prix-site-web-maroc-2026` (pos 6) and
   `site-web-hotel-riad-marrakech` (pos 7) should link down into `/tarifs`, `/casablanca`, `/marrakech`
   with keyword-rich anchors.
3. **`creation site web rabat` is the fastest single win** — 148 impressions at position 30.
4. **Put price in titles/H1s** — creationsiteweb ranks partly on "dès 1990 DH" in the title; you
   have real transparent pricing and aren't surfacing it in metadata.
5. **`developpeur web freelance maroc`** (your core identity) ranks 43 — needs a dedicated, depth
   page or a much stronger home/about treatment.
