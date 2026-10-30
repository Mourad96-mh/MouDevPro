# `data/` — raw exports

Evidence, not interpretation. Every file here is a **raw pull from a source of truth**, kept as
exported so a later reader can re-derive any conclusion drawn from it.

Analysis belongs in `seo/research/` (SEO) and `ads/` (Google Ads) and reads from here. Nothing in
this folder should contain opinions, recommendations, or prose conclusions. The negative-keyword
working list moved to `../ads/negative-keywords.md` on 2026-10-30.

```
data/
├── ads/      Google Ads     — campaigns, keywords, search terms, auction insights, snapshots
├── gsc/      Search Console — queries, pages, countries, devices
├── ga4/      Google Analytics 4 — channels, landing pages, contact_click (data since 2026-10-18)
├── leads/    Leads Sheet "OCT moudev" — anonymous aggregates only (never names/phones)
├── cwv/      Core Web Vitals — CrUX field data
└── reports/  generated — what moved between the last two pulls
```

## Refreshing

```bash
npm run pull    # ingest tools/inbox/*.json → dated CSVs, then diff and report
npm run cwv     # CrUX, self-fetching
```

`reports/` is generated output, not evidence — safe to delete and regenerate.

Fetching Search Console and Google Ads is **not** automated: both are reached through MCP servers
that only the agent can call, and Google Ads also needs an approved developer token. The agent runs
the queries and drops the payloads in `tools/inbox/`; everything after that is deterministic. See
[`../tools/inbox/README.md`](../tools/inbox/README.md).

---

## Naming convention

```
<report>-<YYYY-MM-DD>.csv
```

The date is the **export date**, not the end of the data window. The window itself is recorded in
the accompanying snapshot `.md`, because two exports taken on the same day can cover different
windows. Never overwrite an existing dated file — add a new one, so trends stay comparable.

Undated files are exports whose date could not be established from the repo. There is currently
one such set (`ads/search-terms-*.csv`, see below). Don't add more.

---

## `gsc/` — Google Search Console

**Property:** `https://www.moudevpro.com/` (URL-prefix — `sc-domain:` does not exist for this site)
**Source:** the `gsc` MCP server.

| Set | Window | Notes |
| --- | --- | --- |
| `*-2026-06-19.csv` | ~90 days to 2026-06-19 | The evidence base for `seo/research/data-insights.md`. Was undated until the 2026-08-14 reorganisation; the date comes from that file's own header. |
| `*-2026-08-13.csv` + `snapshot-2026-08-13.md` | 2026-07-15 → 2026-08-11 | 28 days, ending 2 days back — GSC is incomplete for the most recent ~48h. Basis for `seo/research/page-audits/`. |
| `monthly-and-pages-2026-10-30.md` | 2026-07-13 → 2026-10-28 | Monthly clicks, Sep vs Oct by page, homepage queries, countries. Basis for `seo/research/traffic-sources-2026-10-30.md`. |

Always end a window ~2 days before the export date. Query-dimension exports are filtered by Google
for anonymity and will sum to **less** than page totals — that gap is expected, not data loss
(site-wide coverage was 37% in the August pull).

## `ads/` — Google Ads

**Account:** customer `5280469672` · currency MAD · timezone Africa/Casablanca · non-manager
**Source:** the Composio MCP server (`googleads` toolkit), tool `GOOGLEADS_SEARCH_STREAM_GAQL`.

Because the account is **not** a manager account, metrics can be queried directly without
resolving a child customer first.

| File | Notes |
| --- | --- |
| `snapshot-2026-10-30.md` | 2026-09-30 → 10-29, taken **before** the 10-30 account changes: campaigns, settings, weekly, tCPA/budget simulations, landing pages, conversion check |
| `auction-insights-*-2026-10-29.csv` | Manual exports (not in the API), 2026-09-29 → 10-28, one per campaign |
| `overview-cards-2026-10-13-{a,b}.zip` | Manual "Overview" card exports from the Ads UI, 2026-10-13 |
| `snapshot-2026-08-14.md` + `*-2026-08-14.csv` | August pull (campaigns, keywords + QS, change history) |
| `search-terms-*.csv` | All-time exports, one per ad group, undated. They predate 2026-06-03 (the negatives list cites them) but no exact export date is recorded anywhere in the repo, so no date was invented. |

### Re-running a pull

Read-only. `SELECT`-only GAQL never mutates the account.

```sql
-- campaigns
SELECT campaign.name, campaign.status, metrics.impressions, metrics.clicks,
       metrics.cost_micros, metrics.conversions
FROM campaign WHERE segments.date BETWEEN '<start>' AND '<end>'

-- keywords with Quality Score components
SELECT campaign.name, ad_group_criterion.keyword.text,
       ad_group_criterion.quality_info.quality_score,
       ad_group_criterion.quality_info.post_click_quality_score,
       metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
FROM keyword_view WHERE segments.date BETWEEN '<start>' AND '<end>'

-- search terms
SELECT search_term_view.search_term, metrics.impressions, metrics.clicks,
       metrics.cost_micros, metrics.conversions
FROM search_term_view WHERE segments.date BETWEEN '<start>' AND '<end>'

-- applied negatives (campaign-level)
SELECT campaign.name, campaign_criterion.keyword.text
FROM campaign_criterion WHERE campaign_criterion.negative = TRUE

-- applied negatives (shared lists) — check BOTH; campaign_criterion alone will miss shared sets
SELECT shared_set.name, shared_set.type, shared_set.member_count FROM shared_set
```

Gotchas that have already bitten:

- `metrics.cost_micros` is in micro-units — divide by 1,000,000 for MAD.
- Metric values arrive as **strings**; cast before doing arithmetic.
- Filtering on a `segments.*` field requires selecting it too.
- A keyword's Quality Score varies **per ad group**, so the same text can appear several times with
  different scores. Don't deduplicate on keyword text alone.

## `ga4/` — Google Analytics 4

**Property:** 559459207 (`G-P7F2509ZQF`) · **Source:** the `ga4` MCP server (`analytics-mcp`).
Data exists only from **2026-10-18**. `contact_click` carries `method` and `cta_source` (custom dims).

| File | Notes |
| --- | --- |
| `channels-2026-10-30.md` | 10-18 → 10-29: sessions by channel/source, non-paid landing pages, contact_click by source |

## `leads/` — leads Sheet

**Source:** Google Sheet "OCT moudev", tab `Leads` (public CSV export, see `../LEAD-TRACKING.md`).
**Privacy rule:** only anonymous aggregates here, never names, phones or messages. The Sheet itself stays the source.

| File | Notes |
| --- | --- |
| `leads-aggregate-2026-10-30.csv` | 2026-07-13 → 10-30, 350 WhatsApp/phone clicks counted by month × origin (Ads/untagged/utm) × type × page × city × status. Test rows excluded |

## `apify/` — web scraping (Apify, via Composio)

Competitor data Google's own APIs don't expose. Apify free plan ($5/month credit), every run capped with
`maxTotalChargeUsd`. Actors used: `scrapesage/google-ads-transparency-scraper` (ads), `compass/crawler-google-places` (Maps).

| File | Notes |
| --- | --- |
| `ads-transparency-2026-10-30.csv` | 13 domains, region MA: ad counts, formats, first/last shown (79 creatives, $0.14) |
| `maps-casablanca-2026-10-30.csv` | "développeur web", "création site web", "agence web" in Casablanca: rank, rating, reviews (49 places, $0.20) |

## `cwv/` — Core Web Vitals

Generated by `npm run cwv` (`seo/tools/crux-report.mjs`), which writes `crux-<today>.md` here.
Reads the Chrome UX Report API using `CRUX_API_KEY` from `.env` — read-only, no billing.

CrUX is **field data on a 28-day rolling window**, so a report taken today still reflects the
previous four weeks. After a performance deploy, wait ~4 weeks before judging the result.

---

## Adding a new source

One folder per source, lowercase, plus a row in the table at the top of this file and a short
section covering: what the source of truth is, how to re-run the pull, and any gotcha that cost
time the first time. A source with no reproduction instructions is a dead end for whoever reads it
next.
