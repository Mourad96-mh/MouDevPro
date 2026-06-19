# Draft — / (home) strengthen (Wave 0.5)

> Status: **draft, awaiting review**. Source: `research/topical-map.md` 0.5 + `data-insights.md`.
> **Highest-stakes title change of the wave** — `/` is the Ads QS landing page for
> `[création site web maroc]`, `[creation site web maroc]`, `[freelance developpeur web]` and
> `[developer site web maroc]` (§11). Every one of those is preserved in the new title (check below).

## Page brief

- **URL slug:** `/` (unchanged)
- **Primary keyword (title + H1 + first 100 words):** création site web maroc
- **Secondary:** développeur web freelance maroc, freelance création site web maroc, prix site web maroc
- **Target persona:** national entry — all personas; Casablanca-primary
- **Brief actions (0.5):** *put pricing-from + "développeur freelance" in title/meta; tighten H1 to the money keyword.* → target top 10.
- **Now:** 1,470 impressions, pos ~16.5, CTR 3.4%.

## Already done (no action)

- "Développeur web freelance" — already in title, meta, H1, body.
- Price "dès 2 000 DH" — already in meta description, GEO-facts block, tarifs/freelance sections.
- Rich JSON-LD (LocalBusiness + OfferCatalog + reviews + WebSite + WebPage), city cards with keyword anchors, phone tracking wired.

## Targeted changes (the two real gaps)

### 1. `<title>` — add the price signal + lead with the money keyword

**Current:**
> Développeur Web Freelance Maroc | Création Site Web Professionnel | MouDEV

**New:**
> Création Site Web Maroc dès 2 000 DH | Développeur Web Freelance | MouDEV

**Ads QS keyword check (must all survive — §5.4):**

| Ads keyword (→ `/`) | In new title? |
| --- | --- |
| `[création site web maroc]` | ✅ "Création Site Web Maroc" |
| `[creation site web maroc]` | ✅ (accent-insensitive) |
| `[freelance developpeur web]` | ✅ "Développeur Web Freelance" |
| `[developer site web maroc]` | ➖ same as today — "developer" (EN) wasn't in the old title either; no regression. Covered in meta keywords + `/en`. |

*Length ≈ 71 chars (current is 73) — no worse. Adds price for CTR, leads with the money keyword.*

### 2. `<og:title>` — mirror the new title (consistency)

Update `og:title` to the same string. (Home has no twitter:title tags — nothing else to sync.)

### 3. H1 — tighten to lead with the money keyword

**Current:**
> Développeur Web Freelance au Maroc — Création de Site Web Professionnel

**New:**
> Création de Site Web Professionnel au Maroc — Développeur Web Freelance

*Leads with "Création de Site Web Professionnel au Maroc" (the money keyword) while keeping
"Développeur Web Freelance". Mirrors the §6/§7 H1 pattern (Création … — Développeur Freelance).*

## Decision flag — Maroc vs Casablanca in title/H1

CLAUDE.md §6/§7 templates show **Casablanca** in the home title/H1 ("Création Site Web Casablanca …").
But that was written before the dedicated `/casablanca` page existed, and `[création site web
casablanca]` now points to `/casablanca` in Ads (§11), which already ranks ~pos 3.4 for it. So I've
kept the **home page national ("Maroc")** to own `[création site web maroc]` and avoid cannibalising
`/casablanca`. **If you'd rather the home title/H1 say Casablanca**, tell me — but I recommend Maroc.

## Optional (flagged, not in default set)

- **Meta description** already has money keyword + price + devis. I can front-load it to mirror the
  new title ("Création site web Maroc dès 2 000 DH — développeur web freelance…") for CTR
  consistency, but it's already compliant. Say if you want it.

## Out of scope (not changing)

- Canonical / hreflang / schema. No slug change. No new sections.

## Implementation targets

- `src/pages/HomePage.jsx` — `<title>`, `<og:title>`, H1 (and meta description only if approved).
- No `cityConfig` / sitemap change.
