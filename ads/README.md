# `ads/` — Google Ads analysis, plans and change log

Interpretation, not evidence. Raw exports live in `../data/ads/`. This folder holds what was concluded
from them, what was decided, and what was changed in the account. Same split as `seo/` (analysis)
versus `data/gsc/` (exports).

## Start here

| File | What it is |
| --- | --- |
| [`CHANGELOG.md`](CHANGELOG.md) | **Every change made to the live account**, dated, plus the upcoming planned changes |
| [`negative-keywords.md`](negative-keywords.md) | Living negative-keyword list. Read by `npm run pull` to flag waste |
| [`2026-10/`](2026-10/) | Current cycle: audit, plan, analyses (October 2026) |
| [`archive/2026-08/`](archive/2026-08/) | August plans (.docx) + their generator. Outdated, kept for history |

## Current cycle — `2026-10/`

| File | Date | Covers |
| --- | --- | --- |
| `google-ads-audit-2026-10-29.pdf` | 10-29 | Full audit: 12 issues, severity, fixes |
| `shared-negative-lists-2026-10-29.md` | 10-29 | Negative lists (Universel / Site web DIY / google-ads-casa) + negatives that blocked buyers |
| `negative-additions-2026-10-30.md` | 10-30 | New negatives from the 30-day search-terms report |
| `campaign-enhancements-2026-10-30.md` | 10-30 | Plan per campaign: structure, keywords, ads, assets, settings |
| `google-ads-campaign-plan-2026-10-30.pdf` | 10-30 | Same plan as a PDF |
| `bidding-strategy-2026-10-30.md` | 10-30 | Bidding per campaign, from Google's tCPA/budget simulations |
| `auction-insights-analysis-2026-10-30.md` | 10-30 | Competitors per campaign + how the ads should stand out |
| `competitor-ads-apify-2026-10-31.md` | 10-31 | Competitors' actual ad texts (Ads Transparency Center) + Google Maps ranking, via Apify |
| `editor-import-2026-10-30/` | 10-30 | Editor CSVs. **Record only — already applied via API, never import** |
| `google-ads-casa-build-sheet-2026-10-18.md` | 10-18 | Original build sheet of the google-ads-casa campaign |

## Working rules

- **Read-only by default.** The API (Composio `googleads`) is used to pull data. Account changes only
  after Mourad approves that specific change set → `validate_only` dry run → apply → re-read → log in
  `CHANGELOG.md`.
- **Auction insights are not in the API.** Export them by hand (Campaigns → Insights & reports →
  Auction insights) into `../data/ads/auction-insights-<campaign>-<date>.csv`.
- **Leads come from WhatsApp/phone clicks**, not the form. "Contact-from-moudev" is the main conversion;
  "Lead Qualifié (OCI)" is fed weekly from the leads Sheet (see `../LEAD-TRACKING.md`).
- **New cycle = new folder** (`2026-11/`, …). Move the previous one under `archive/` when it is outdated.
