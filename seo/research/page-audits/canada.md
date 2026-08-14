# `/canada`

Organic only; Ads geo deliberately closed to Canada (root `CLAUDE.md` §12).

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 0 | 0 | — | — |
| Current 28d | 3 | 155 | 1.94% | 41.83 |

Did not register in the previous window. **Best CTR of the three international pages**, and its
3 clicks match `/rabat` and `/ecommerce` — from a fraction of the impressions.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| développeur de site web pour e-commerce | 78 | 0 | 54.49 |
| développeur web freelance | 9 | 0 | 82.89 |
| développement web paiement en ligne | 8 | 0 | 38.25 |
| devis développement web canada | 4 | 0 | **20.00** |
| développement web canada | 4 | 0 | **24.00** |
| développement web professionnel | 2 | 0 | 62.00 |
| trouver un freelance ou une agence pour un site webflow… canada | 1 | 0 | 10.00 |
| développeur web freelance maroc | 1 | 0 | 149.00 |

Query data covers 109 of 155 impressions (70%).

## Diagnosis

**The same disease as pre-rewrite `/france`, at half the severity.** `développeur de site web pour
e-commerce` (78 impressions, position 54.49) is a generic non-geo head term contributing 72% of
this page's visible impressions and ranking on page 6. It drags the average exactly as
`développement web sur mesure` did on `/france`.

**But the geo-qualified terms behave completely differently here.** `devis développement web
canada` at **20.00** and `développement web canada` at **24.00** are page-2/3 rankings on
commercially precise queries — a searcher typing "devis développement web canada" is looking to
buy. `/france` has no equivalent, because French searchers do not add the country.

This is the asymmetry documented in [`france.md`](france.md): the Canadian market qualifies its
searches geographically, so the same offer earns cheaper, better-targeted impressions.

**The 3 clicks are the most encouraging signal among the international pages** — 1.94% CTR against
0% for both `/france` and `/usa`. The clicks are not attributable to specific queries in the
visible data (all listed queries show 0), meaning they came from the 30% of withheld long tail.

`développeur web freelance maroc` at position 149 is cluster-1 noise — see
[`_cannibalisation.md`](_cannibalisation.md).

## Actions

1. **Do not apply the `/france` offshore rewrite here.** The situations differ: `/france` had no
   viable geo-qualified queries, `/canada` has two at positions 20–24. Those are a better
   foundation than an offshore repositioning.
2. **Target the Québec vocabulary explicitly.** `montréal`, `québec`, and Canadian-French phrasing
   are absent from the visible query data except one `développeur ecommerce montreal` (position 68
   in the wider pull). The config already prices in `$ CA` and speaks to Québec — the query data
   suggests that framing is under-exploited.
3. **Consider dropping `développeur de site web pour e-commerce`** from targeting, as was done on
   `/france`. 78 impressions at position 54 that will never convert.
4. **Watch it for one more window before investing.** The page appeared from nothing this window;
   one window is not a trend, and 3 clicks is a small number to reason from.
5. Baseline for comparison: 155 impressions, 3 clicks, position 41.83.
