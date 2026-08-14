# `/rabat`

**Target keywords** (§5.1): création site web rabat · développeur web rabat
**Google Ads landing page** for `"création site web rabat"`, `"développeur web rabat"` (§11).
**Standing priority:** Wave 0.1 in `../topical-map.md` — rewrite this page.

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 2 | 190 | 1.05% | 32.70 |
| Current 28d | 3 | 236 | 1.27% | 28.40 |

Improving on all four measures — impressions +24%, position +4.3. The only city page trending up.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| creation site web rabat | 45 | 0 | 30.62 |
| création site web rabat | 30 | 0 | 28.33 |
| creation site internet rabat | 8 | 0 | 24.62 |
| site internet rabat | 7 | 0 | 31.57 |
| céation site internet rabat | 5 | 0 | 46.00 |
| société de developpement web rabat | 5 | 0 | 33.20 |
| creation site web à rabat | 5 | 0 | 25.80 |
| céation site web rabat | 4 | 0 | 38.75 |

Query data covers 156 of 236 impressions (66%).

## Diagnosis

**The page ranks for exactly the right terms and ranks badly at all of them.** Both spellings of
its primary keyword sit at 28–31 — page 3. Every variant in the list is on-target commercial
intent for Rabat; none breaks position 24.

This is the cleanest diagnosis in the audit: no cannibalisation, no junk queries, no CTR anomaly,
no wrong-query matching. The page is simply **not competitive enough** on terms it is correctly
aimed at.

> **Corrected 2026-08-13 after reading `src/pages/RabatPage.jsx`.** The original conclusion —
> "it needs content quality" — was reached from GSC numbers without opening the page source.
> **The Wave 0.1 rewrite has already shipped.** The live page satisfies every Wave 0.1 requirement:
> keyword in title, H1 and first sentence; local context covering Technopolis, Smart City startups,
> ONG internationales and administrations; a dedicated `#temara` section plus Témara/Salé
> neighbourhood entries and an FAQ item. It also carries 7 neighbourhood blocks, 6 FAQ items with
> `FAQPage` schema, `LocalBusiness`+`ProfessionalService` schema, a freelance-vs-agence table, and
> 10 inbound internal links (2 with keyword-rich anchors from blog posts).
> `topical-map.md:42` records the same thing. **Rewriting this page again is not the lever.**

### The constraint is off-page

`/ar/rabat` — rendered from the generic `CityPage` template, no deliberate investment, a fraction
of the content — ranks **9.50, page one**. This page, far more thorough, ranks **28.40**. Same
domain, same city, same topic; the thin page wins by 19 positions.

On-page depth is therefore not what is binding. The difference is competition density: the French
Rabat SERP is contested by agencies, the Arabic one is not. The domain can reach page one for Rabat
where competition is thin, which points at **authority and local citations**, not content.

The unaccented spelling (`creation site web rabat`, 45 impressions) draws more volume than the
accented one (30) and ranks slightly worse. Moroccan users frequently search without accents;
the copy should read naturally with accents but the page should not be so accent-dependent that
Google treats the variants differently.

Two typo queries appear (`céation site internet rabat`, `céation site web rabat` — 9 impressions
combined). Not worth targeting deliberately, but they confirm real local search volume.

`société de developpement web rabat` at 33.20 signals agency-shaped intent — searchers looking for
a company. The freelance positioning (root `CLAUDE.md` §2) is a differentiator here, not a
handicap, but the page should address that framing head-on.

## Actions

> Actions 1–4 below are **superseded** — see the correction in the diagnosis. They describe the
> Wave 0.1 rewrite, which has already shipped: keyword targeting, both-spelling coverage, the
> "société / agence" framing (the freelance-vs-agence table) and the local context paragraph are
> all present in `src/pages/RabatPage.jsx`. Kept for the record.
>
> ~~1. Proceed with the Wave 0.1 rewrite. 2. Cover both spellings naturally. 3. Address the
> "société / agence" framing. 4. Add the local context paragraph.~~

**Revised actions, in priority order:**

1. **Do not rewrite the page.** On-page work is done and is not the constraint. Further copy here
   has no plausible path from position 28 to page one.
2. **Build local citations.** `backlinks-log.csv` already holds 6 directory profiles at
   `action-required / pending-register`: Sortlist, TechBehemoths, GoodFirms, Twine, Freelancer.ma,
   Adresses.ma. Every competitor in root `CLAUDE.md` §3 is listed in these; local citations are a
   direct local-ranking signal and the cheapest available authority.
3. **Deploy.** Three drafted citation pitches sit at `blocked-pending-upload` (cashod.ma,
   clarodigi.com, netspace.ma) waiting on the same upload as the `.htaccess` and `/france` work.
4. **Google Business Profile** — confirm Rabat is covered in the service area. Local pack presence
   is the strongest lever available for a city term and does not depend on domain authority.
5. **Do not change the slug** — active Ads keyword (§10).
6. Re-measure in ~4 weeks. Baseline: 236 impressions, 3 clicks, position 28.40.

Judge this page on **whether it breaks position 20**, not on click count. At 236 impressions and
page-3 rankings, clicks are too sparse to read as a rate.
