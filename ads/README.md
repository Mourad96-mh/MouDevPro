# `ads/` — Google Ads analysis and action plans

Interpretation, not evidence. Raw exports live in `../data/ads/`; this folder holds what was
concluded from them and what to do about it. Same split as `seo/` (analysis) versus `data/gsc/`
(exports).

## The documents

| File | Covers |
| --- | --- |
| `00-account-plan.docx` | Cross-campaign problems — read first |
| `01-casablanca-plan.docx` | `Creation-site-web` |
| `02-rabat-plan.docx` | `creation-site-web-rabat` |
| `03-marrakech-plan.docx` | `creation-website-marrakech` |

Each campaign document follows the same shape: snapshot table, what is wrong (with the evidence),
Quality Score keyword by keyword, a numbered plan where every step names **where in the Ads UI**,
**why**, and **how to check it worked**, then the baseline to re-measure against.

The account document comes first on purpose. Two of its three problems — the twice-daily manual
pausing and the unverified conversion action — make campaign-level tuning unmeasurable until they
are resolved.

## Regenerating

```bash
python ads/generate-plans.py
```

Standard library only — no `pip install`. `docx.py` is a minimal OOXML writer (a .docx is a zip of
XML parts); `generate-plans.py` holds the content.

Re-run after every new data pull so the documents never drift from the numbers. All figures are
from the window stated on each cover line; if you re-pull, update `WINDOW`, `PULLED` and the
figures in `generate-plans.py` rather than editing the .docx by hand — hand edits are lost on the
next run.

## Scope

Everything here came from read-only `SELECT` queries. **No campaign has been modified.** The plans
are for you to execute in the Ads interface; nothing in this repo touches the live account.

One thing these documents cannot cover: **Auction Insights is not exposed by the Google Ads API**
at any version — verified by probe, not assumed. Competitor bidding analysis needs a manual export
from Campaigns → Insights & reports → Auction insights, saved into `../data/ads/`.
