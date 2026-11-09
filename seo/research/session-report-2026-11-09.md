# SEO session — 2026-11-09

> Data: Search Console (URL-prefix property) 2026-08-01 → 11-07, GA4 property 559459207 last 28 days.
> Previous session: `session-report-2026-10-30.md` (its changes are live — verified on production 11-09).

## Health check — is ranking going the right way?

**Overall: flat, not declining.** ~2 clicks/day and 250–450 impressions/day since August; average position
oscillates 12–28 with no trend. Last 28 days: ~43 clicks / 7 300 impressions from Morocco (99 % of clicks).

| Signal | Status |
| --- | --- |
| "création site web casablanca" → `/` | **Position 1.0–1.2 every day**, ~10 impr./day, CTR 0.5 % (2 clicks / 439). Unchanged since 10-30: ads (incl. our own Casablanca campaign) + map pack sit above. Not an SEO ranking problem. |
| "création site web maroc" → `/` | **Dropped**: position 1–3 every day until 10-23, then 9–23 from 10-26 (only one day back at 2.25 on 11-06). `/casablanca` (20–31) and `/tarifs` (32–46) now get impressions for it instead → Google is less sure which URL owns the query. Root cause found: the homepage never contained the phrase "création (de) site web (au) Maroc" — title said "Casablanca … Maroc", intro "à Casablanca et partout au Maroc". |
| "creation site web" (generic) → `/` | Position 4.0, 333 impr., 2 clicks — stable. |
| "développeur web freelance maroc" | Still split: `/developpeur-web-freelance-maroc` 35, two blog posts 30–35 (167 impr.). Oct-30 changes only 10 days old. |
| `/ecommerce` | 27 avg; 12–16 for "site e-commerce maroc" / "ecommerce maroc" (the clicks it gets). |
| `/rabat` | 20.9 for "création site web rabat" (112 impr.) — stuck. Page has 1 800 words and good on-page; it lacks authority (backlinks / GBP Rabat). |
| `/europe` (new 10-30) | Already **position 10** (148 impr.), 7.1 for "app development agency casablanca". Working. |
| `/usa` | 9.5 (65 impr.). |
| Blog stats post | 5.3 (237 impr., 4 clicks) — best CTR on the site. |

## GA4 (last 28 days)

| Channel | Sessions | Engagement | Key events |
| --- | --- | --- | --- |
| Paid Search | 294 | 55 % | 43 |
| Direct | 89 | **24 %** | 1 |
| Organic Search | 56 | 59 % | 7 (12.5 % — best conversion rate) |
| Referral | 13 | 46 % | 2 |
| AI Assistant | 9 | 78 % | 1 |

- Organic converts best per session; the limit is volume, not quality.
- Direct at 24 % engagement is mostly noise (bots / own visits) — not worth acting on.
- AI assistants (ChatGPT/Perplexity…) already send 9 sessions/month at 78 % engagement → keep `llms.txt` current.

## Changes made (built, not deployed)

1. **Homepage title**: `Création Site Web Casablanca & Maroc dès 2 000 DH | Développeur Freelance`
   (was `… Casablanca dès 2 000 DH | Développeur Web Freelance Maroc`). Casablanca stays first (homepage
   owns it at #1); "Maroc" now sits next to the service phrase. Also fixes Ads QS alignment for
   `[création site web maroc] → /` (CLAUDE.md §5.4). H1 unchanged (spec'd in CLAUDE.md).
2. **Homepage intro** now opens with "Création de site web au Maroc par un développeur freelance" — exact
   phrase in the first 100 words.
3. **Blog → money page**: both freelance posts link to `/developpeur-web-freelance-maroc` with the anchor
   "développeur web freelance au Maroc" in their **first paragraph** (links existed only near the end).
4. **llms.txt**: added `/agents-ia`.

## Next (proposed, not done)

1. **Re-check 11-23 → 11-30**: homepage position for "création site web maroc" (target back to 1–3);
   whether `/casablanca` and `/tarifs` stop appearing for it.
2. **Rabat**: needs authority, not more copy. ✅ 11-09: Mourad added Rabat, Salé and Témara to the Google
   Business Profile service area. Still to do: 2–3 local citations/backlinks pointing to `/rabat`
   (see `backlinks` skill). Re-check "création site web rabat" (was 20.9) in early December.
3. **Homepage CTR test** (from 10-30, still open): meta description with "payez après livraison" first.
4. `/agents-ia` (new, 11-09): submit in GSC after deploy; target "agent ia entreprise maroc",
   "automatisation ia maroc", "chatbot whatsapp entreprise".
