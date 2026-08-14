# `/ar/` — Arabic homepage (Casablanca)

Rendered by `CityPage.jsx` with `city="casablanca" lang="ar"`.
**Target keywords** (§5.2): تصميم موقع الدار البيضاء · متجر إلكتروني المغرب
`style-guide.md` notes: *"you are the only structured AR competitor"* — this is a positional
advantage that currently produces almost nothing.

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 0 (`/ar/` 42 + `/ar` 24) | 66 combined | 0% | 36.86 / 45.96 |
| Current 28d | 0 | 54 | 0% | 28.39 |

**Affected by trailing-slash duplication.** Combined 66 → 54 (−18%), though average position
improved 8 places.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| #تصميم #موقع_ويب #تطوير #إشهار #الداربيضاء #طنجة #الرباط | 4 | 0 | 25.25 |
| مطور مواقع | 2 | 0 | 61.00 |
| مبرمج مواقع | 2 | 0 | 67.50 |
| développement woocommerce maroc | 1 | 0 | 94.00 |
| freelance web developer khobar | 1 | 0 | 74.00 |
| developpeur freelance maroc | 1 | 0 | 92.00 |

Query data covers 12 of 54 impressions (22%).

## Diagnosis

**The Arabic pages are barely competing, and the visible queries confirm why.** The
highest-impression query is a **hashtag string** (`#تصميم #موقع_ويب #تطوير…`) — someone's social
media post copied into search, not genuine commercial intent. That it is the top query for this
page says the page has almost no real Arabic search presence.

The two genuine Arabic queries — `مطور مواقع` (web developer) and `مبرمج مواقع` (web programmer) —
sit at positions 61 and 67.5. Both are generic, non-geo Arabic terms.

**Neither §5.2 Arabic target appears.** `تصميم موقع الدار البيضاء` (website design Casablanca) and
`متجر إلكتروني المغرب` (online store Morocco) generate no recorded impressions here. The second one
*does* appear elsewhere — on the **French** `/ecommerce` page at position 53.25. See
[`ecommerce.md`](ecommerce.md).

**Three of six queries are not Arabic at all** — two French, one English, all at positions 74–94.
The Arabic page is being matched to Latin-script queries it cannot serve, which suggests weak
language signalling.

**The claimed advantage is unrealised.** Being the only structured Arabic competitor is worth
nothing at position 28 with zero clicks. Either the Arabic pages are too thin to rank, or Arabic
search volume for these services in Morocco is lower than assumed — this data cannot distinguish
between the two.

## Actions

1. **Establish whether Arabic demand exists** before investing further. 54 impressions in 28 days,
   with the top query being a hashtag string, is not evidence of a market. Check Arabic keyword
   volume for Morocco independently rather than inferring it from this page.
2. **Fix the trailing-slash duplication** — cheap, and applies to all three Arabic pages.
3. **Verify `hreflang` and `lang` attributes** for `/ar/*`. French and English queries matching an
   Arabic page suggests the language signals are not clean.
4. **Route `متجر إلكتروني المغرب` deliberately.** It is a §5.2 target currently landing on the
   French e-commerce page at position 53. If Arabic is worth pursuing at all, Arabic e-commerce
   content is the most concrete opening in the data.
5. **Do not `noindex`** (§10). Low investment is fine; removal is not.
6. Priority: **low** — but the `hreflang` check is quick and worth doing with the trailing-slash fix.
