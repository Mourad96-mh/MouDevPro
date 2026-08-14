# `/ar/rabat` — Arabic Rabat

Rendered by `CityPage.jsx` with `city="rabat" lang="ar"`.
**Target keyword** (§5.2): تصميم موقع الرباط

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | **2** | 14 | **14.29%** | 9.14 |
| Current 28d | 0 | 54 | 0% | 9.50 |

**Impressions nearly quadrupled while the 2 clicks disappeared.** Position held steady at ~9.5 —
page 1.

## Top queries

No queries survived Google's anonymity filter for this page in the current window — query-level
coverage is **0 of 54 impressions**. The entire visible profile is withheld long tail.

## Diagnosis

**This is the best-positioned Arabic page and one of the better-positioned pages on the site** —
position 9.50, page 1, with growing impressions. It also produced the **highest CTR on the entire
site last window** (14.29%, 2 clicks from 14 impressions).

Then it went to zero clicks on 4× the impressions.

Two readings, and the data does not separate them:

- **Small numbers.** 2 clicks is not a rate, it is two events. Going from 2 to 0 while impressions
  grow could be ordinary variance. At 54 impressions and a realistic 3% CTR you would expect 1–2
  clicks; observing 0 is unremarkable.
- **The query mix changed.** Quadrupling impressions while holding position often means the page
  started surfacing for broader terms. If the original 14 impressions were tight-intent Rabat
  queries and the new 54 are generic, losing the clicks makes sense.

**With zero query coverage, neither can be confirmed.** This is the page in the audit where the
anonymity filter hurts most — it is performing well positionally and is completely opaque.

Note that `/ar/rabat` shows **no trailing-slash twin**, unlike `/ar/` and `/ar/marrakech`. It is the
cleanest Arabic URL in the set.

## Actions

1. **Leave it alone and watch it.** Position 9.50 with growing impressions is the healthiest
   positional signal among the Arabic pages. There is nothing diagnosable to fix and a real risk of
   breaking something that is working.
2. **Re-pull in 4 weeks.** If impressions keep growing, some queries will clear the anonymity
   threshold and a real diagnosis becomes possible. Baseline: 54 impressions, 0 clicks, position 9.50.
3. **Do not extrapolate the 14.29% CTR.** It was 2 clicks. Treating it as a rate would be a
   mistake — it is the smallest sample in the audit.
4. **Include it in the `hreflang` verification** covering all `/ar/*` routes — see
   [`ar-casablanca.md`](ar-casablanca.md).
5. **This page is quiet evidence that Arabic can rank.** Position 9.50 for an Arabic city page,
   with no deliberate investment, is the strongest argument in the data that the "only structured
   AR competitor" advantage is real — even though `/ar/` itself shows little.
