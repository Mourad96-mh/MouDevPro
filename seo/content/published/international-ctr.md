# Draft — International pages CTR fix (/france, /canada, /usa)

> Status: **draft, awaiting review**. Source: `research/topical-map.md` 2.4 + `data-insights.md` §3.
> Organic-only per CLAUDE.md §12 — **no** Ads geo change. All edits live in `src/data/marketConfig.js`
> (`metaTitle` + `metaDescription`); the renderer reuses metaTitle for og:/twitter: automatically.

## The evidence

| Page | Impressions | Clicks | Position | Diagnosis |
| --- | --- | --- | --- | --- |
| `/usa` | **1,048** | **0** | 8.7 | Ranks page 1, earns nothing — title/CTR problem |
| `/france` | 259 | low | 14.6 | Edge of page 2 |
| `/canada` | 48 | low | 8.9 | Page 1, tiny volume |

The pages already rank. The job is to **earn the click**: shorten titles under ~60 chars and
front-load a **price** + the offshore differentiator.

## Proposed rewrites

### /france
- **Title (old, 78c):** Développeur Web Freelance pour la France | Sites sur Mesure à Distance | MouDEV
- **Title (new, ~57c):** `Développeur Web Freelance France — Site dès 199 € | MouDEV`
- **Meta (new):** `Site web pro pour la France dès 199 €, e-commerce dès 299 €. Développeur freelance, même fuseau horaire (±1h), paiement après livraison. Devis gratuit 24h.`

### /canada
- **Title (old, 78c):** Développeur Web Freelance pour le Canada | Sites sur Mesure à Distance | MouDEV
- **Title (new, ~60c):** `Développeur Web Freelance Canada — Site dès 290 $ CA | MouDEV`
- **Meta (new):** `Site web pro pour le Canada dès 290 $ CA, e-commerce dès 430 $ CA. Développeur freelance en français, 100% à distance, paiement après livraison. Devis gratuit 24h.`

### /usa
- **Title (old, 75c):** Freelance Web Developer for US Businesses | Custom Websites, Remote | MouDEV
- **Title (new, ~55c):** `Freelance Web Developer USA — Websites from $219 | MouDEV`
- **Meta (new):** `Professional website for US businesses from $219, e-commerce from $329. Freelance developer, 100% remote, US-hours overlap, pay after delivery. Free quote in 24h.`

Each new title keeps the primary keyword ("Développeur Web Freelance France/Canada", "Freelance Web
Developer USA"), adds the price, and fits the SERP without truncation.

## Honest caveat on /usa

0 clicks at position 8.7 on 1,048 impressions is unusually low — it may mean some of those
impressions are for **informational** US queries (e.g. "web developer salary") where no title wins
the click. The query export is below GSC's threshold so I can't confirm the exact terms. The price-led
title is the correct low-effort first move; if clicks stay flat after ~3–4 weeks, the next step is to
pull a fresh GSC query report **filtered to the `/usa` page** and match the title to the real intent.

## Out of scope here (Phase 2 options — see question)

- Country-specific content depth (local payment methods, RGPD/France, Québec French, US time-zone proof).
- A diaspora-targeted blog post ("créer un site web depuis l'étranger / pour la diaspora marocaine").
- Region long-tail (Paris/Lyon, Montréal/Québec, etc.).

## Implementation target

- `src/data/marketConfig.js` — `metaTitle` + `metaDescription` for the three markets. Nothing else.
