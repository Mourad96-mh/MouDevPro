# Draft — /casablanca rewrite (Wave 0.2)

> Status: **draft, awaiting review**. Source: `research/topical-map.md` 0.2 + `data-insights.md`.
> Targeted pass — `CasablancaPage.jsx` is structurally solid. Slug, anchors, title/meta and live
> Ads keywords preserved per root CLAUDE.md §10/§5.4.

## Page brief

- **URL slug:** `/casablanca` (unchanged — live in Google Ads)
- **Primary keyword (title + H1 + first 100 words):** création site web casablanca
- **Secondary keywords:** développeur web casablanca, boutique en ligne casablanca, site e-commerce casablanca, web developer casablanca, site vitrine casablanca
- **Target persona:** CLAUDE.md §4 Persona 1 — Casablanca PME/startup owner; + Persona 4 price researcher
- **Search intent:** commercial — find a developer in Casablanca / compare price
- **Brief actions (0.2):** *same on-page pass; lead with PME/e-commerce; surface price + "devis 24h" above fold.*
- **Now:** 690 impressions, pos ~27 overall (but already pos ~3.4 for the exact `creation site web casablanca` query — the gap is the broader commercial cluster + CTR).

## What's already good (keep)

- Title/meta/OG/twitter/hreflang/canonical — on-spec, title feeds Ads QS → **don't touch**.
- LocalBusiness + Breadcrumb JSON-LD (with geo), shared FAQ (FAQPage schema via i18n).
- Neighbourhoods, freelance-vs-agence table, services/tarifs/portfolio, dual CTA.
- Freelance voice, no "nous".

## Targeted changes

### 1. Hero — surface price + "devis 24h" above fold, lead with PME/e-commerce, exact keyword in first 100 words

**H1 (unchanged — already contains the keyword):**
> Création Site Web à Casablanca — Développeur Web Freelance

**Subheading (rewrite):**
> La **création de site web à Casablanca** est mon métier : sites vitrine, boutiques
> e-commerce et applications sur mesure pour les PME, startups et commerces de la ville
> — **dès 2 000 DH**. Vous parlez directement avec le développeur, pas d'agence, pas
> d'intermédiaire. **Devis gratuit en 24h.**

*Why: gets the exact phrase "création de site web à Casablanca" + PME + e-commerce + a price signal (`dès 2 000 DH`) + "Devis gratuit en 24h" all above the fold and inside the first ~45 words — the three brief items in one block, and the QS first-100-words rule (§5.4). Currently the hero has none of price/devis-24h above the fold (Rabat does — this fixes the inconsistency).*

### 2. Local context — strengthen the e-commerce angle + internal link to /ecommerce

Adjust the **first** context paragraph to surface e-commerce (Casablanca = the country's e-commerce hub) and add a keyword-anchored internal link:

> Casablanca est la capitale économique du Maroc et son premier marché e-commerce.
> Chaque jour, des PME, startups, commerces et indépendants y cherchent un
> **développeur web freelance à Casablanca** pour créer leur site vitrine, leur
> [boutique en ligne à Casablanca](/ecommerce) ou refondre un site existant. Je suis
> basé à Maarif et je connais le marché local.

*Why: "lead with PME/e-commerce" (brief), and routes link equity to `/ecommerce` with the anchor "boutique en ligne à Casablanca" (§5.2 supporting keyword; "site e-commerce casablanca" is an active Ads term, §11).*

### 3. (Optional, flagged) Phone-click conversion tracking parity

The final-CTA phone link on `/casablanca` has **no** `onClick` tracking, while `/rabat`'s does
(`trackPhone()`, added in commit ccd3752 "correct phone click tracking"). So phone-lead
conversions from `/casablanca` are currently **not recorded**. Fix = import `trackPhone` from
`useConversion` and add `onClick={() => trackPhone()}` to the `tel:` link — identical to Rabat.

This is a conversion-tracking fix, not SEO, and it touches the conversion path (§10-adjacent) —
so I've left it out of the default change set. **Say the word and I'll include it** (it's low-risk
parity with an existing, intended pattern).

## Out of scope (not changing)

- Title / meta / canonical / hreflang (Ads QS). No slug or anchor changes. No new pages.
- Schema `areaServed` already correct (Casablanca/Rabat/Marrakech).
- Internal links *into* `/casablanca` from the page-1 blogs were already added in Wave 0.1.

## Implementation targets

- `src/pages/CasablancaPage.jsx` — hero subheading, first context paragraph (+ `/ecommerce` Link),
  and (if approved) phone-tracking parity.
- No `cityConfig` change required (context string is fine); no sitemap change.
