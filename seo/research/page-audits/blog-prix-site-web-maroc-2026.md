# `/blog/prix-site-web-maroc-2026`

Supports `/tarifs` on price intent — the site's highest-converting intent per root `CLAUDE.md` §4
(persona 4, price researcher).

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 0 | 69 | 0% | **8.12** |
| Current 28d | 0 | **9** | 0% | 13.78 |

**Impressions collapsed 87%** and position fell 5.7 places, off page 1.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| prix site web maroc | 1 | 0 | 14.00 |
| tarif site web freelance | 1 | 0 | 11.00 |

Query data covers 2 of 9 impressions.

## Diagnosis

**This is half of the price-cluster decline**, and the more severe half. Read it together with
[`tarifs.md`](tarifs.md):

| Page | Impressions | Position |
| --- | --- | --- |
| `/tarifs` | 74 → 26 (−65%) | 8.61 → 19.85 |
| `/blog/prix-site-web-maroc-2026` | 69 → 9 (−87%) | 8.12 → 13.78 |

**Both price pages ranked ~8 on page 1 last window. Both fell off it in the same 28 days.** Two
independent pages moving together on the same intent cluster is not coincidence — something changed
in how Google serves Moroccan price queries, or a competitor gained ground across the cluster.

Note that a *third* page ranks well for Casablanca price intent —
`/blog/creation-site-web-casablanca` holds `création site web casablanca prix` at 13.67. It did not
collapse. That page's price query is geo-qualified; the two that fell are national (`prix site web
maroc`). That is a thin distinction on small numbers, but it is the only pattern the data offers.

**Candidate explanations, none confirmable from GSC alone:**

- **AI Overviews.** Google increasingly answers "prix"/"combien coûte" queries directly, suppressing
  clicks and sometimes impressions for the pages it draws from. Price queries are among the most
  affected categories.
- **Competitor movement** on the national price cluster.
- **Seasonality** — late July/August is low season for Moroccan business enquiries.

## Actions

1. **Investigate as one price-cluster question**, not as two page problems. Pull 3–6 months for this
   post and `/tarifs` together — a 28-day window cannot distinguish a trend from noise.
2. **Check the live SERP for `prix site web maroc`.** Specifically: is there an AI Overview at the
   top now? That single observation determines whether this is fixable by conventional SEO.
3. **If it is an AI Overview:** the response is structured, citable content — clear price tables,
   `FAQPage` schema, explicit figures — not title tweaks. The statistics articles already
   demonstrate this pattern working.
4. **Do not rewrite on 2 impressions of query data.**
5. Priority: **high urgency to diagnose.** Price intent is the closest thing this site has to
   bottom-of-funnel organic traffic, and it halved across two pages simultaneously.
