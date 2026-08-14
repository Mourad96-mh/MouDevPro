# `/france`

**Rewritten 2026-08-13** (commit `e89bf88`) — full rationale in `../../content/published/france.md`.
Organic only; Ads geo is deliberately closed to France (root `CLAUDE.md` §12).

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 0 | 2 | 0% | 74.00 |
| Current 28d | 0 | 258 | 0% | 74.84 |

Impressions went from 2 to 258 — the page essentially entered the index during this window — and
landed at position 74.8, the worst on the site.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| développement web sur mesure | 89 | 0 | 97.06 |
| développeur site e-commerce | 21 | 0 | 57.10 |
| développeurs sur mesure | 15 | 0 | 79.53 |
| développeur web france et budget indicatif | 15 | 0 | 77.47 |
| développement web paiement en ligne | 10 | 0 | 61.00 |
| développement web sur-mesure | 9 | 0 | 100.11 |
| développeurs de sites web hors de france | 3 | 0 | **43.33** |
| développeur freelance france | 1 | 0 | **24.00** |

Query data covers 204 of 258 impressions (79%).

## Diagnosis

**The position 74.8 is a mix artifact, not a page-quality verdict.** 113 of 204 visible impressions
(55%) are three spellings of `développement web sur mesure` ranking 79–100. Strip those and the
page's remaining profile is ordinary.

Where it surfaces on France-qualified or offshore-intent queries it ranks **24–43** — in line with
`/canada`.

**Root cause is search behaviour.** French users do not type "France" into queries; they are in
France, so it is the default. The page could therefore only surface on generic national head terms
contested by every French agency. Quebecers *do* add "canada"/"québec"/"montréal" to escape
France-dominated results, which is why `/canada` earns cheaper geo-qualified impressions for the
same underlying offer.

`développeurs de sites web hors de france` at **43.33 with zero targeting** was the tell — that is
the offshore positioning from §12, which the page had never actually verbalised.

## What was changed

- Dropped `développement web sur mesure` and variants from `keywords`
- New title, H1, meta description and intro built on "hors de France" / externalisation
- Added an offshore section, a France cities paragraph (Paris/Lyon/Marseille — `artisan développeur
  freelance paris` already appeared at 76), a budget comparison table, and three FAQ entries
- Config gained optional `offshore`, `cities`, `budget` keys; `/canada` and `/usa` unaffected

## Actions

1. **Deploy.** The rewrite is committed but not live — it requires `npm run build` and an upload to
   the LiteSpeed host.
2. **Re-measure around 2026-09-10** (~4 weeks post-deploy). Baseline: 258 impressions, 0 clicks,
   position 74.84.
3. **Judge on clicks, not average position.** Shedding 113 impressions that ranked 79–100 will make
   the average move erratically — it may look worse before it looks better. That is the intended
   mechanism, not a regression.
4. **Watch whether `/services` picks up the abandoned term.** `/services` also surfaces for
   `développement web sur mesure` (position 82). If `/france` stops competing there, confirm
   `/services` does not simply inherit the same unwinnable fight.
5. Do not extend this treatment to `/canada` or `/usa` yet — see their reports.
