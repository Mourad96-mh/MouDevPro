# `/blog/web-statistics-morocco-2026` (EN) — the link-bait asset

Produced by the `backlinks` skill as a linkable asset. **Its purpose is citations and backlinks,
not leads.** Judge it accordingly.

## Performance

| | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Previous 28d | 0 | 0 | — | — |
| Current 28d (slashed) | 2 | 3,431 | 0.06% | 6.06 |
| Current 28d (unslashed) | 0 | 139 | 0% | 9.42 |
| **Combined** | **2** | **3,570** | **0.06%** | — |

**The highest-impression page on the site by a factor of two**, from nothing in the previous window.
It alone accounts for 42% of all site impressions and is the reason total impressions doubled while
clicks fell.

**Affected by trailing-slash duplication** — see
[`_technical-trailing-slash.md`](_technical-trailing-slash.md). This is the most extreme case:
3,431 vs 139 impressions on two URLs of the same article, both indexed simultaneously.

## Top queries

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| anrt morocco internet penetration urban rural 2024 or 2025 | 7 | 0 | 7.86 |
| morocco smartphone penetration 2025 source | 6 | 0 | 6.00 |
| morocco smartphone penetration rate 2026 | 4 | 0 | 5.50 |
| morocco internet social media users 2026 datareportal | 4 | 0 | 7.75 |
| anrt morocco mobile subscribers 2025 report | 3 | 0 | 7.67 |
| moroccan digital media market size trends 2024 2025 | 3 | 0 | 9.33 |

Query data covers only 46 of 3,431 impressions (1.3%) — the lowest coverage in the audit. The
visible queries are a tiny, unrepresentative slice.

## Diagnosis

**This is working exactly as designed and should not be "fixed".**

The visible queries are precisely the research-intent pattern the asset was built for: people
looking for *sources* — `anrt morocco internet penetration… report`, `morocco smartphone
penetration 2025 source`, `datareportal`. These are journalists, analysts, students and content
writers hunting citable figures. They rank at positions 5.5–9.3.

**A 0.06% CTR is not a defect here.** People searching for a statistic often read it from the
snippet and never click, or they cite the page without visiting it again. The conversion event for
this asset is a **backlink**, which GSC cannot measure.

**The USA connection matters for how the rest of the account is read.** The USA is the site's
second-largest country by impressions (2,829, zero clicks) and this article absorbs nearly all of
it. Any analysis crediting `/usa` with US visibility is wrong — `/usa` contributes 112. See
[`usa.md`](usa.md).

**The risk it creates is measurement distortion.** It drags every site-wide average: total CTR fell
from 0.85% to 0.36% largely because of these 3,570 impressions. Site-level CTR is now close to
meaningless as a health metric. **Exclude this page when judging site performance.**

## Actions

1. **Do not optimise for CTR.** Rewriting the title to chase clicks would work against the asset's
   purpose and could reduce its citation value.
2. **Fix the trailing-slash duplication** — 139 impressions and whatever links point at the
   unslashed URL are being wasted. This page has the most to gain from the fix.
3. **Track backlinks, not clicks.** The `backlinks` skill's log
   (`.claude/skills/backlinks/output/backlinks-log.csv`) is the right instrument. Position 5–9 on
   source-hunting queries is the leading indicator of citations.
4. **Exclude from site-wide CTR reporting.** Otherwise it will keep making the account look like it
   is declining when the money pages are stable.
5. **Verify the citation block is intact.** `blogPosts.js:1990` carries a "How to cite this page"
   block with the canonical URL — confirm it names the URL you consolidate on after the
   trailing-slash fix.
