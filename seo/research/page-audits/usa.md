# `/usa`

Organic only; Ads geo deliberately closed to the USA (root `CLAUDE.md` §12).

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 0 | 8 | 0% | 24.00 |
| Current 28d | 0 | 112 | 0% | **12.98** |

**Best average position of the three international pages by a wide margin** — 12.98 versus 41.83
for `/canada` and 74.84 for `/france`. Impressions grew 14×.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| moudev | 3 | 0 | 6.33 |
| web development morocco | 1 | 0 | 75.00 |

Query data covers only 4 of 112 impressions (4%) — the lowest coverage of any page in the audit.
**Almost nothing can be concluded from this table.** The page-level position of 12.98 is reliable;
the query composition behind it is essentially unknown.

## Diagnosis

**A genuinely strong position with no visible explanation.** 112 impressions at position 12.98 is
the best positional performance of any international page, but 96% of the queries producing it are
withheld. The two visible queries — a brand search and one Morocco term at position 75 — cannot
account for it.

**Critically: `/usa` is not what draws US traffic to this site.** The USA is the second-largest
country by impressions (2,829, zero clicks), and that traffic goes almost entirely to
`/blog/web-statistics-morocco-2026/` — 3,431 impressions at position 6.06. `/usa` contributes 112
of those 2,829. Any reading of the country report that credits `/usa` with US visibility is wrong.

**Zero clicks across both windows** despite the strong position. With so little query data, the
cause is undiagnosable from GSC alone — it could be low-intent informational queries, a snippet
problem, or simply small numbers (112 impressions at a realistic 2% CTR would produce 2 clicks;
observing 0 is not statistically strange).

## Actions

1. **Do not rewrite this page.** There is not enough query data to target anything. Acting on 4
   visible impressions would be guessing.
2. **Do not apply the `/france` offshore treatment.** `/france` was rewritten because its query
   profile was clearly diagnosed. This page's profile is unknown, and its position is already good.
3. **Wait for another window** and re-pull. If impressions keep growing, query coverage will improve
   and a real diagnosis becomes possible.
4. **Correct the country-report reading** in any future analysis: US impressions belong to the
   English stats article, not to `/usa`. See
   [`blog-web-statistics-morocco-2026.md`](blog-web-statistics-morocco-2026.md).
5. Baseline: 112 impressions, 0 clicks, position 12.98.
