# Draft — /rabat rewrite (Wave 0.1)

> Status: **draft, awaiting review**. Source: `research/topical-map.md` 0.1 + `data-insights.md`.
> This is a *targeted* pass, not a full rewrite — the existing `RabatPage.jsx` is already strong.
> Slug, anchors (`#contact`, `#faq`) and live Ads keywords are preserved per root CLAUDE.md §10/§5.4.

## Page brief

- **URL slug:** `/rabat` (unchanged — live in Google Ads)
- **Primary keyword (title + H1 + first 100 words):** création site web rabat
- **Secondary keywords:** développeur web rabat, création site web temara, création site web salé, site web rabat, site institutionnel rabat, web developer rabat
- **Target persona:** CLAUDE.md §4 Persona 3 — Rabat business / NGO / startup / institutional
- **Search intent:** commercial — find a developer to build a site in the Rabat agglomeration
- **Why this page first:** 676 impressions, pos ~31; `creation site web rabat` alone = 148 impr at pos 30; `création site web temara` converts **100%** in Ads (2 conv) yet Témara/Salé appear nowhere on the page.

## What's already good (keep as-is)

- Title, meta, OG, hreflang, canonical, FAQ + Breadcrumb + LocalBusiness JSON-LD — all present and on-spec.
- Local-context, neighbourhoods, freelance-vs-agence table, services/tarifs/portfolio sections, dual CTA.
- Freelance voice, "devis 24h", price signals. No "nous".

## Targeted changes

### 1. Hero — get the exact phrase "création site web rabat" + Salé/Témara into the first 100 words

**H1 (unchanged — already contains the keyword naturally):**
> Création Site Web à Rabat — Développeur Web Freelance

**Subheading (rewrite — leads with the exact-match keyword, adds the agglomeration):**
> La **création de site web à Rabat** est mon métier : je conçois votre site
> professionnel pour Rabat, Salé et Témara — PME, startups, ONG et administrations.
> Vous parlez directement avec le développeur. Qualité agence, prix freelance.
> Devis gratuit en 24h.

*(Result: "création … site web … Rabat" + "Témara" + "Salé" all inside the first ~40 words → satisfies the QS first-100-words rule and captures the converting Témara term.)*

### 2. Local-context section — add a Rabat-Salé-Témara paragraph

Append to the context text (third paragraph), before "Mes sites sont rapides…":

> J'accompagne aussi les commerces et professionnels de **Salé** et de **Témara** :
> la création de site web à Témara et Salé suit le même standard qu'à Rabat —
> livraison en 7 à 10 jours, contact direct, paiement après livraison. L'agglomération
> Rabat-Salé-Témara est un seul marché, je le couvre en entier, à distance et sans frais
> de déplacement.

### 3. Neighbourhoods list — add Salé and Témara entries

Add two items to the existing `city-neighborhoods` list (after Souissi):

- **Salé / Tabriquet :** commerces, artisans et PME — site vitrine professionnel, SEO local "création site web Salé", mobile-first.
- **Témara / Harhoura :** cliniques, écoles privées, commerces de proximité — site vitrine ou e-commerce, design soigné, devis gratuit 24h. *(Témara convertit fort — signal Ads.)*

### 4. FAQ — add one question targeting Témara/Salé

> **Q. Créez-vous aussi des sites web à Témara et Salé ?**
> A. Oui. Je couvre toute l'agglomération Rabat-Salé-Témara avec le même service :
> création de site web vitrine ou e-commerce, livraison en 7 à 10 jours, contact direct
> avec le développeur et paiement après livraison. Que vous soyez à Témara, Harhoura,
> Salé ou Tabriquet, le suivi se fait à distance — aucun frais de déplacement. Devis
> gratuit et détaillé sous 24h.

### 5. Schema — extend `areaServed`

Add to the `areaServed` array in the LocalBusiness/ProfessionalService JSON-LD:

```js
{ "@type": "City", name: "Salé" },
{ "@type": "City", name: "Témara" },
```

### 6. Internal links IN (the "do alongside" task — page-1 blog authority → /rabat)

Add keyword-anchored links from the two page-1 posts into `/rabat`:

- `/blog/prix-site-web-maroc-2026` (pos 6) → anchor **"création de site web à Rabat"** → `/rabat`, and **"tarifs"** → `/tarifs`.
- `/blog/choisir-developpeur-web-freelance-maroc` → anchor **"développeur web freelance à Rabat"** → `/rabat`.

*(Lives in `src/data/blogPosts.js` content arrays — separate edit, same wave.)*

## Out of scope (not changing)

- Title / meta / canonical / hreflang — already correct, and title feeds Ads QS (§5.4): leave it.
- No new pages. No slug or anchor changes.

## Implementation targets (after approval)

- `src/pages/RabatPage.jsx` — subheading, context paragraph, neighbourhood items, FAQ item, `areaServed`.
- `src/data/blogPosts.js` — internal links from the two posts.
- `cityConfig.rabat.fr.cityContext` — optionally mirror the Salé/Témara mention (used by Footer/Header context).
- No sitemap change (no new URL).
