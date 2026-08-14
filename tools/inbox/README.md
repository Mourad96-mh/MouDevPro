# `tools/inbox/` — raw payloads waiting to be ingested

Drop raw MCP/API JSON here, run `npm run pull`, and it becomes a dated CSV in `data/`.
The `.json` files are transient and gitignored; the CSVs they produce are the durable record.

## Why this exists — the one thing `npm run pull` cannot do

Search Console and Google Ads are reached through **MCP servers**, which only the agent can call.
A Node script has no way in without its own OAuth credentials — and Google Ads additionally needs
an approved developer token. So fetching stays manual (the agent runs the queries), and everything
after fetching is deterministic and lives in `tools/pull.mjs`.

That split is deliberate. The fetch is the cheap part; the normalising, dating, diffing and
waste-classification is where the mistakes used to happen.

CrUX is the exception — it has a plain API key in `.env` and self-fetches via `npm run cwv`.

## Filenames map to ingest rules

The filename before `.json` selects the rule in `pull.mjs`:

| Drop this | Becomes |
| --- | --- |
| `ads.campaigns.json` | `data/ads/campaigns-<today>.csv` |
| `ads.search-terms.json` | `data/ads/search-terms-<today>.csv` |

The payload is either the raw `results` array from a GAQL response, or the whole response object —
both are accepted. Cost fields in micro-units are converted to MAD automatically.

Adding a new report means adding one entry to `INGEST` in `tools/pull.mjs` with its field map.

## The queries to run

Full GAQL and the gotchas are in [`../../data/README.md`](../../data/README.md). For a routine
monthly pull:

```sql
-- ads.campaigns.json
SELECT campaign.name, campaign.status, campaign.bidding_strategy_type,
       campaign_budget.amount_micros, metrics.impressions, metrics.clicks,
       metrics.cost_micros, metrics.conversions
FROM campaign WHERE segments.date BETWEEN '<start>' AND '<end>'

-- ads.search-terms.json
SELECT search_term_view.search_term, campaign.name, metrics.impressions,
       metrics.clicks, metrics.cost_micros, metrics.conversions
FROM search_term_view WHERE segments.date BETWEEN '<start>' AND '<end>'
ORDER BY metrics.cost_micros DESC LIMIT 400
```

**Always also pull change history**, even when nothing looks wrong — Google destroys it after 30
days, and it is the only record of who or what altered the account:

```sql
SELECT change_event.change_date_time, change_event.change_resource_type,
       change_event.client_type, change_event.changed_fields,
       change_event.resource_change_operation, campaign.name
FROM change_event
WHERE change_event.change_date_time >= '<within 30 days>'
ORDER BY change_event.change_date_time DESC LIMIT 500
```

Quality Score is the same story — the API exposes only the current value, with no history at all.
A snapshot not taken is one that cannot be recovered, so pull
`keywords-quality-score-<date>.csv` every time.

## Search Console

Exported through the `gsc` MCP server as CSV directly into `data/gsc/`, keeping the existing
column headers (`Top pages` / `Top queries`, `Clicks`, `Impressions`, `CTR`, `Position`) — the
comparison in `pull.mjs` keys off them. End the window ~2 days back; GSC is incomplete for the most
recent 48h.
