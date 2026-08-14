# `/blog/site-web-hotel-riad-marrakech`

**The highest-value CTR failure on the site.** Top-3 rankings, zero clicks, two windows running.

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 0 | 148 | 0% | 6.80 |
| Current 28d | 0 | 135 | 0% | 6.98 |

**283 impressions across 8 weeks at an average position of ~6.9, and not a single click.**

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| web design riad marrakech english | 25 | 0 | **2.12** |
| site vitrine riad marrakech | 18 | 0 | **2.17** |
| morocco riad website builder | 17 | 0 | 6.24 |
| création site web riad marrakech | 14 | 0 | 16.21 |
| riad website design morocco | 11 | 0 | **3.27** |
| site vitrine riad prix maroc | 10 | 0 | 13.40 |
| création site web riad maroc | 10 | 0 | 11.50 |
| création site pour riad ou hôtel marrakech | 4 | 0 | **2.75** |

Query data covers 114 of 135 impressions (84%) — high coverage, so this picture is reliable.

## Diagnosis

Four queries sit at **position 2.1–3.3**. Expected CTR there is 15–30%. Actual is 0%. Across 114
impressions at those positions you would expect roughly 15–25 clicks.

**This is a different problem from the homepage's.** The homepage's zero-CTR queries are
high-competition commercial terms in Morocco where ads and a local pack plausibly bury the organic
result. These are **long-tail English and French niche queries** — `web design riad marrakech
english`, `morocco riad website builder`, `création site pour riad ou hôtel marrakech`. Queries
like that rarely carry a full ad block or a local pack. There is usually nothing above position 2
but position 1.

That leaves the snippet itself as the likely cause: **title and meta description**. This is the one
page in the audit where "fix the title" is genuinely the leading hypothesis rather than the
fallback.

Two specific mismatches stand out:

- **`web design riad marrakech english` (25 impressions, position 2.12)** — the searcher is
  explicitly asking for English. If the title and meta rendering in the SERP are in French, the
  result looks wrong to them and they skip it. The article is French (`blogPosts.js` FR entry);
  the English counterpart is the *statistics* article, not this one.
- **`site vitrine riad prix maroc` and `site vitrine riad marrakech`** — price and
  vitrine intent. If the snippet does not surface a price signal, it loses to results that do.
  `style-guide.md` §1 already prescribes a price signal in titles for money pages.

## Actions

1. **Look at the live SERP for `site vitrine riad marrakech` and `web design riad marrakech
   english`.** Confirm what your snippet actually renders as, and what the results above and around
   it look like. This takes two minutes and determines everything below.
2. **Rewrite the title and meta description** in `src/data/blogPosts.js` for this post. Priorities:
   a price signal (`dès …`), the words riad *and* hôtel, and Marrakech. Keep under 60 characters
   per `style-guide.md` §1.
3. **Consider an English version of this post.** `web design riad marrakech english`, `morocco riad
   website builder` and `riad website design morocco` are English queries totalling 53 impressions
   at positions 2–6, being served a French article. An EN counterpart is the same play that already
   exists for the statistics article. Root `CLAUDE.md` §6 and §8 both call for English content for
   Marrakech tourism operators.
4. **Add an internal link to `/marrakech`** with a keyword-rich anchor, so whatever clicks this
   page starts earning flow to the money page.
5. Re-measure 4 weeks after the snippet change. Baseline: 135 impressions, 0 clicks, position 6.98.
   **Judge on clicks and CTR — position is already fine and should not be the metric here.**

## Why this is the priority

Every other recommendation in this audit is about improving a ranking. This page already has the
ranking. It is 114 impressions at position 2–6 that convert at zero, on low-competition queries
where the fix is likely a snippet rewrite — the cheapest, highest-certainty change available.
