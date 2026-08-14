# `/ar/marrakech` — Arabic Marrakech

Rendered by `CityPage.jsx` with `city="marrakech" lang="ar"`.
**Target keywords** (§5.2): تصميم موقع مراكش · موقع فندق مراكش

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 1 (`/ar/marrakech` 8 + `/ar/marrakech/` 1) | 9 combined | 11.11% | 42.50 / 26.00 |
| Current 28d | 0 | 7 combined (2 + 5) | 0% | 50.00 / 24.00 |

**Affected by trailing-slash duplication** — both variants carry impressions.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| développement web marrakech | 1 | 0 | 93.00 |

Query data covers 1 of 7 impressions.

## Diagnosis

**Insufficient data for meaningful analysis, and that is the finding.** Seven impressions across 28
days is effectively no presence at all. The single visible query is French (`développement web
marrakech`) landing on an Arabic page at position 93 — the same language-signalling problem noted
on [`ar-casablanca.md`](ar-casablanca.md).

Neither §5.2 Arabic target — `تصميم موقع مراكش` or `موقع فندق مراكش` — registers.

For context, the Marrakech tourism cluster in *other* languages is active: the French blog post
holds positions 2–3, `/marrakech` gets 118 impressions, `/en/marrakech/` gets 145. Arabic gets 7.
Whether that reflects genuinely absent Arabic demand for riad/hotel web design, or a page too thin
to surface, cannot be determined from this data.

The `موقع فندق مراكش` target (hotel website Marrakech) is plausible on its face — Marrakech
hospitality has Gulf-market exposure — but nothing in 28 days of data supports or refutes it.

## Actions

1. **No page-level action justified.** Seven impressions cannot support a rewrite decision.
2. **Fix the trailing-slash duplication** as part of the site-wide rule — it applies here but is
   not worth doing for this page alone.
3. **Verify `hreflang`** with the other `/ar/*` routes. A French query at position 93 on an Arabic
   page is the second instance of this pattern.
4. **Fold into the broader Arabic decision.** Whether to invest in Arabic at all should be decided
   once for all three pages — see [`ar-casablanca.md`](ar-casablanca.md) action 1. Note that
   [`ar-rabat.md`](ar-rabat.md) ranks 9.50 with no investment, which is the one piece of evidence
   suggesting Arabic can work.
5. **Do not `noindex` or remove** (§10).
