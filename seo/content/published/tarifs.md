# Draft — /tarifs strengthen (Wave 0.4)

> Status: **draft, awaiting review**. Source: `research/topical-map.md` 0.4 + `data-insights.md`.
> Minimal pass — most of the brief is already implemented. Slug, anchors and **`<title>`**
> (feeds Ads QS for `[prix site web maroc]` + `[devis site web maroc]`) preserved per §10/§5.4.

## Page brief

- **URL slug:** `/tarifs` (unchanged — live in Google Ads)
- **Primary keyword (title + H1 + first 100 words):** prix site web maroc
- **Secondary:** devis site web maroc, tarif site web maroc, prix site vitrine maroc, prix site e-commerce maroc
- **Target persona:** CLAUDE.md §4 Persona 4 — price researcher (all cities)
- **Brief actions (0.4):** *add price to `<title>` and H1 (beat creationsiteweb's "dès 1990 DH"); FAQ schema.* → target top 5.
- **Now:** 203 impressions, pos ~10.

## Already done (no action)

- **`<title>`** = "Prix Site Web Maroc 2026 : dès 2 000 DH, Devis 24h | MouDEV" — price + devis already in title (~58 chars). Leave it (Ads QS).
- **FAQ schema** (`faqJsonLd`, 6 Q/A) — already present and valid.
- LocalBusiness + Breadcrumb JSON-LD, per-city price cards linking to `/casablanca` `/rabat` `/marrakech`, includes grid, delivery timeline, reassurance, final CTA.

## Targeted changes (the two real gaps)

### 1. H1 — add the price number + "devis" (brief: "add price to … H1")

The H1 currently has no price. Add the price floor (matches creationsiteweb's "dès 1990 DH" tactic
with our real floor) and surface "devis":

**H1 (rewrite):**
> Prix Création Site Web Maroc 2026 — dès 2 000 DH, Devis Gratuit 24h

*(Keeps the exact phrase "Prix … Site Web Maroc" for QS; adds the price signal for CTR; "Mes
Formules 2026" is dropped — the formulas render directly below in `TarifsSection`.)*

### 2. Hero subheading — get "devis" into the first 100 words (QS for `[devis site web maroc]`)

"devis" currently appears only far down the page. The hero subheading should carry it so the active
Ads keyword is covered in the first 100 words (§5.4):

**Subheading (rewrite — adds the devis line):**
> Site vitrine dès **2 000 DH**, e-commerce dès **3 000 DH**. Paiement après livraison —
> zéro acompte. Livraison en 7 à 10 jours. **Devis gratuit et transparent en 24h** —
> choisissez votre formule ci-dessous.

## Note on price (no change)

creationsiteweb advertises "dès 1990 DH"; our real floor is 2 000 DH. We don't undercut on a
fabricated number — we compete on transparency + freelance positioning, which they lack. Price
stays 2 000 DH everywhere (consistent with all other pages).

## Out of scope (not changing)

- `<title>` / meta / canonical / hreflang (Ads QS). No slug or anchor changes. No new pages.
- Per-city cards already link out with keyword anchors; FAQ schema already present.

## Implementation targets

- `src/pages/TarifsPage.jsx` — H1 + hero subheading only.
- No `cityConfig` / sitemap change.
