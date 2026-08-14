# `/en/` — English homepage (Casablanca)

Rendered by `CityPage.jsx` with `city="casablanca" lang="en"`.
**Target keywords** (§5.2): web developer casablanca · website design morocco · website design
casablanca · freelance web developer morocco
**Google Ads:** `"web developer casablanca"` and `"website design morocco"` point at `/casablanca`
and `/` respectively — not here (§11).

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 1 (`/en/`) + 0 (`/en`) | 531 + 196 = 727 | 0.14% | 18.27 / 11.36 |
| Current 28d | 2 | 853 | 0.23% | 28.71 |

**Affected by trailing-slash duplication** — see [`_technical-trailing-slash.md`](_technical-trailing-slash.md).
Impressions moved wholesale from `/en` to `/en/` between windows, so the position figures are not
comparable across windows. Treat the combined 727 → 853 impressions (+17%) as the real trend.

This is the **second-highest-impression page on the site** after the English stats article.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| web design and development agency | 65 | 0 | 43.54 |
| web designer morocco | 62 | 0 | **20.03** |
| web design morocco | 25 | 0 | 34.60 |
| web design company morocco | 23 | 0 | 33.13 |
| website design morocco | 21 | 0 | 32.81 |
| web development company | 19 | 0 | 56.00 |
| web dev agency | 18 | 0 | 58.28 |
| web design agency in morocco | 17 | 0 | 27.41 |

Query data covers 464 of 853 impressions (54%).

## Diagnosis

**Substantial English demand, consistently ranked on page 2–4.** Six of the eight top queries are
Morocco-qualified English terms — `web designer morocco`, `web design morocco`, `website design
morocco`, `web design company morocco`, `web design agency in morocco` — totalling 148 impressions
at positions 20–35. These are explicit §5.2 targets. None reaches page 1, and the page earns 2
clicks from 853 impressions.

**The strongest term is `web designer morocco` at 20.03** — top of page 3, the closest this page
comes to breaking through.

**Two queries reveal a positioning mismatch.** `web design and development agency` (65 impressions,
the single largest) and `web dev agency` (18) at positions 43–58 are **agency** searches with no
geographic qualifier. This site is deliberately not an agency (root `CLAUDE.md` §2, §8) and
deliberately Morocco-focused. Ranking 43–58 for generic global agency terms is the same pattern
that afflicted `/france`: the page is being matched to broad head terms it cannot win, which
inflates impressions and drags average position while never converting.

83 of 464 query-level impressions (18%) come from these unwinnable agency terms.

**The `agency` wording is worth checking on-page.** If the English copy uses "agency" anywhere to
describe the service, that is both off-brand per §8 and the likely reason Google matches these
queries.

## Actions

1. **Fix the trailing-slash duplication first** — this page's history is split across two URLs and
   every measurement here is degraded by it. Highest-leverage single change.
2. **Concentrate on the Morocco-qualified English cluster.** `web designer morocco` (20.03),
   `web design agency in morocco` (27.41), `website design morocco` (32.81) are the realistic
   targets. 148 impressions of genuine intent currently earning nothing.
3. **Audit the English copy for the word "agency."** If present, it contradicts §8 positioning
   *and* attracts the wrong queries. Replace with freelance-forward phrasing.
4. **Do not chase `web design and development agency` or `web dev agency`** — generic, global,
   agency-framed. Wrong on all three counts.
5. Consider whether `/en/` should carry the same price-signal treatment as the French money pages
   (`style-guide.md` §1) — none of the English queries show price intent yet, but none of the
   English pages surface a price either.
