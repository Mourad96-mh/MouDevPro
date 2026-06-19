# Draft — /marrakech strengthen (Wave 0.3)

> Status: **draft, awaiting review**. Source: `research/topical-map.md` 0.3 + `data-insights.md`.
> This page is already the strongest of the three — light, additive pass only. Slug, anchors,
> title/meta, EN block and live Ads keywords preserved per root CLAUDE.md §10/§5.4.

## Page brief

- **URL slug:** `/marrakech` (unchanged — live in Google Ads)
- **Primary keyword (title + H1 + first 100 words):** création site web marrakech / site web hôtel marrakech
- **Secondary:** site web riad marrakech, hotel website marrakech, développeur web marrakech, site web restaurant marrakech, site réservation riad maroc
- **Target persona:** CLAUDE.md §4 Persona 2 — Marrakech tourism operator (hotel/riad/restaurant)
- **Brief actions (0.3):** *strengthen hôtel/riad/restaurant angle + EN block (already ranks `/en/marrakech` pos 19).*
- **Now:** 435 impressions, pos ~31; `site vitrine riad marrakech` already pos 3.4; blog guide pos 7.

## What's already good (keep)

- Bilingual hero, full EN section, FAQ with EN questions (FAQPage schema), service cards (hotel/riad/restaurant), freelance-vs-agence table, blog-guide link, phone tracking on both CTAs.
- Title/meta/OG/hreflang/canonical — on-spec, title feeds Ads QS → **don't touch**.

## Targeted changes

### 1. Hero subheading — cover the two general Marrakech Ads keywords without losing the tourism lead

The FR subheading currently never says "création de site web à Marrakech" or "développeur web" —
both are active Ads terms mapped to `/marrakech` (§11). Reframe so they appear in the first 100
words (QS §5.4) while keeping the hotel/riad/restaurant focus:

**FR subheading (rewrite):**
> **Développeur web freelance à Marrakech**, je réalise la **création de site web à
> Marrakech** pour les hôtels, riads et restaurants — réservation en ligne, multilingue
> FR/EN/AR, SEO tourisme. Réduisez vos commissions OTA, générez des réservations directes.

*(EN subheading below it: unchanged.)*

### 2. Local context — add the restaurant angle (currently only in a service card)

The context section is entirely hotel/riad OTA-commission framing — which doesn't apply to
restaurants. Add one paragraph so the third pillar of the brief is actually present in prose:

> Pour les **restaurants de Marrakech**, l'enjeu n'est pas la commission mais la visibilité :
> un site vitrine avec menu en ligne, photos, réservation de table et fiche Google Business
> optimisée vous fait apparaître quand un voyageur cherche « où manger à Marrakech ». Site
> restaurant livré en 7 à 10 jours, dès 2 000 DH.

### 3. Local context — one general-business line (captures non-tourism "création site web marrakech" / "développeur web marrakech")

Marrakech isn't only tourism. Add a single sentence (after the restaurant paragraph) so general
commercial intent is served without diluting the tourism positioning:

> Je crée aussi des sites web pour les commerces, artisans, agences de voyage et PME de
> Marrakech — même qualité, même réactivité, contact direct avec le développeur.

## Out of scope (not changing)

- Title / meta / canonical / hreflang (Ads QS). No slug or anchor changes. No new pages.
- EN section already substantial and ranking (`/en/marrakech` pos 19) — left as-is.
- Schema `areaServed` already correct. Phone tracking already wired on both CTAs.
- Internal links *into* `/marrakech` from the page-1 blog were added in Wave 0.1.

## Implementation targets

- `src/pages/MarrakechPage.jsx` — hero FR subheading + two paragraphs in the local-context block.
- No `cityConfig` / sitemap change.
