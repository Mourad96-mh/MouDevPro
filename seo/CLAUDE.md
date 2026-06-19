# CLAUDE.md — moudevpro.com SEO planning layer

> Open Claude Code in this `seo/` folder for **content & planning** work. It auto-loads this file.
> For implementing pages in the React app, open Claude Code at the repo root (`../`) instead.

## What this folder is

The planning + content-production layer for moudevpro.com's SEO. It does not contain app code.
The loop is: plan here → draft → publish → implement in the React app at `../src/`.

## Read these first

- `research/data-insights.md` — findings from real Google Ads + Search Console data (the evidence).
- `research/topical-map.md` — the prioritized action plan (Wave 0 → 2) and page brief template.
- `research/competitors.md` — who actually ranks organically + how to position against each. Read
  before drafting any money page.
- `content/context/brand-voice.md` — how to write (freelance voice, first person, no "nous").
- `content/context/style-guide.md` — on-page SEO mechanics (titles, meta, schema, links).
- `../CLAUDE.md` — the master project context (positioning, keywords, site structure, Ads alignment).
- `../SEO-ROADMAP.md` — the earlier competitor/SERP analysis this builds on.

## Folder structure

```
seo/
├── CLAUDE.md                      ← this file
├── research/
│   ├── data-insights.md           ← Ads + GSC analysis
│   ├── topical-map.md             ← action plan + page briefs
│   ├── competitors.md             ← organic rivals + positioning rules
│   └── data/                      ← raw CSV exports (Ads search terms, GSC queries/pages/etc.)
└── content/
    ├── context/
    │   ├── brand-voice.md
    │   └── style-guide.md
    ├── drafts/                    ← work in progress
    └── published/                 ← reviewed, ready to implement
```

## The production loop

1. Pick the next item from `research/topical-map.md` (start: Wave 0.1, `/rabat`).
2. Fill the page brief template (in topical-map.md) for it.
3. Draft to `content/drafts/<slug>.md` — follow `brand-voice.md` + `style-guide.md`.
4. Review → move to `content/published/<slug>.md`.
5. Implement in the React app (open Claude Code at `../`): page in `src/pages/`, config in
   `src/data/cityConfig.js` / `marketConfig.js`, copy in `src/locales/*/translation.json`,
   then regenerate the sitemap via `../sitemap-generator.js`.

## Guardrails (from ../CLAUDE.md)

- Freelance voice only — never "nous" / "notre équipe".
- Never change a live URL slug or remove anchor sections — they're linked from active Google Ads.
- Never add `noindex`. Never open Google Ads geo to FR/USA/CA (organic only for intl).
- Every keyword in Ads must appear in its landing page's title, H1, and first 100 words (QS rule).
- Don't duplicate homepage copy onto city pages.

## Current priority

**Wave 0.1 — rewrite `/rabat`.** 676 impressions, position ~31 for `creation site web rabat`
(148 impressions alone), plus a 100%-converting "création site web temara" Ads signal. Existing
page, so it's a rewrite not a build — fastest measurable win.
