# `/contact`

**Target keywords** (§5.1): devis site web maroc (shared with `/tarifs`)
**Title template** (§7): "Devis Gratuit Site Web Maroc | Réponse en 24h"

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 2 | 36 | 5.56% | **6.06** |
| Current 28d | 0 | 34 | 0% | **36.68** |

**Position collapsed 30 places on flat impressions.** The steepest positional drop in the audit.
It also had the best CTR on the site last window (5.56%) — precisely because it ranked 6th.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| devis en ligne maroc | 3 | 0 | 19.67 |
| maghreb dev | 1 | 0 | 11.00 |
| obradepot | 1 | 0 | 41.00 |

Query data covers 5 of 34 impressions (15%) — very thin. The page-level collapse is reliable; the
query table is not enough to explain it.

## Diagnosis

**A 30-place drop on stable impressions is unusual and worth understanding.** Impressions barely
moved (36 → 34) while position went from page 1 to page 4. Normally a fall that steep reduces
impressions too. Stable impressions with collapsed position suggests the page is now matching a
*different, broader* set of queries — appearing far down for many things rather than near the top
for a few.

Last window it ranked 6.06 and converted 5.56% — the best CTR on the site. That is what a contact
page ranking on page 1 for `devis`-intent queries looks like. Losing it costs quote requests
directly, which is the site's entire conversion goal (root `CLAUDE.md` §1).

**`devis en ligne maroc` at 19.67** is the only on-target query visible, and it is page 2.

**The two branded-ish queries are noise:** `maghreb dev` and `obradepot` are unrelated business
names — one impression each.

**This may be connected to the `/tarifs` decline.** Both are quote/price-intent pages, both fell in
the same window. See [`tarifs.md`](tarifs.md), which raises the same question. If a single cause is
affecting the commercial-intent cluster, these two pages are the evidence.

## Actions

1. **Investigate alongside `/tarifs`, not separately.** Two quote-intent pages declining in the same
   28 days is more likely one cause than two coincidences. Pull 3–6 months for both.
2. **Check indexing status** via URL inspection — confirm the page is still `Submitted and indexed`
   with a correct canonical, and that nothing changed in its crawl date.
3. **Verify the §7 title is intact** — "Devis Gratuit Site Web Maroc | Réponse en 24h". A title
   change would explain a matching shift.
4. **Do not rewrite on 5 impressions of query data.** There is not enough signal.
5. Priority: **investigate urgently** — this page ranked 6th and converted better than anything
   else on the site four weeks ago. Recovering that is worth more than most ranking gains available
   elsewhere.
