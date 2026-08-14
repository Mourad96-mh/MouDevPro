# `/en/marrakech/` — English Marrakech

Rendered by `CityPage.jsx` with `city="marrakech" lang="en"`.
**Target keywords** (§5.1/§5.2): hotel website marrakech · riad website design marrakech · hotel
website design morocco
**Google Ads:** `"hotel website marrakech"` points at `/marrakech` (§11), not here.

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 3 (`/en/marrakech` 172 + `/en/marrakech/` 52) | 224 combined | 1.34% | 29.40 / 42.54 |
| Current 28d | 0 | 161 combined (145 + 16) | 0% | 42.75 / 21.19 |

**Affected by trailing-slash duplication** — both variants are live simultaneously here, unlike the
other English pages. Combined impressions fell 224 → 161 (−28%) and **all 3 clicks were lost**.

## Top queries

`/en/marrakech/` (145 impressions):

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| morocco riad website builder | 10 | 0 | 43.90 |
| création site web riad marrakech | 6 | 0 | 86.67 |
| développement web marrakech | 6 | 0 | 66.83 |
| web development company morocco | 6 | 0 | 79.33 |
| création site web riad maroc | 6 | 0 | 91.17 |
| create website guesthouse morocco | 6 | 0 | 66.67 |

`/en/marrakech` (16 impressions): `morocco riad website builder` 4 @ 35.75 · `create website
guesthouse morocco` 3 @ 8.67 · `création site web marrakech` 1 @ 44 · `développeur web à marrakech`
1 @ 79

Query data covers 83 of 161 combined impressions (52%).

## Diagnosis

**Third place in a three-way split on its own keywords.** On the riad/hotel cluster this page ranks
behind both the blog post and the French city page:

| Query | Blog post | `/marrakech` | `/en/marrakech/` |
| --- | --- | --- | --- |
| morocco riad website builder | **6.24** | 30.80 | 43.90 |
| création site web riad marrakech | 16.21 | 29.33 | 86.67 |
| create website guesthouse morocco | — | **14.64** | 66.67 |

See [`_cannibalisation.md`](_cannibalisation.md) cluster 3. This is the weakest of the three
competing pages on every shared query.

**It is also ranking for French queries.** `création site web riad marrakech`, `création site web
riad maroc`, `développement web marrakech` are French terms landing on the *English* page, at
positions 66–91. An English page competing for French queries against its own French counterpart
is a targeting failure in both directions.

**The trailing-slash split is unusually visible here.** Both variants carry impressions
simultaneously, and the unslashed one ranks dramatically better on the same query — `create website
guesthouse morocco` at **8.67** on `/en/marrakech` versus **66.67** on `/en/marrakech/`. That is a
58-place gap between two URLs serving identical content. It is the single clearest demonstration in
this audit of what the duplication is costing.

**Losing all 3 clicks** while the French pages also lost their Marrakech clicks means the Marrakech
cluster as a whole earned nothing this window.

## Actions

1. **Fix the trailing-slash duplication.** This page demonstrates the cost better than any other —
   a 58-place ranking gap between two URLs of the same page. Highest priority for this page.
2. **Stop competing for French queries.** If the English page surfaces for `création site web riad
   marrakech`, its hreflang/canonical signalling or its content is not cleanly English.
   Verify `hreflang` is correct for `/en/*` routes.
3. **Do not invest in riad keywords here** until cluster 3 is resolved — the blog post holds
   positions 2–3 and this page holds 43–91.
4. **The English tourism demand is real** (`morocco riad website builder`, `create website
   guesthouse morocco`, `web design riad marrakech english` across all three pages). §6 requires
   English content for Marrakech. The demand justifies one strong English page — currently the
   effort is spread across three weak ones.
5. Lowest priority of the Marrakech cluster; fix the blog post's CTR first.
