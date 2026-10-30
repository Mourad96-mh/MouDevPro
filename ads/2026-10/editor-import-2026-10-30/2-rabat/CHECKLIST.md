# creation-site-web-rabat — Editor checklist

> **⚠️ Applied through the Google Ads API on 2026-10-30 — do NOT import these files.** Everything below is already live (ad groups, keywords, ads, negatives, sitelinks, callouts, snippets, locations, schedule). Importing them in Editor would create duplicates. Kept as a record only.

> **Done by API on 2026-10-30, skip these:** the 5 negatives that blocked buyers are deleted · locations = Rabat + Salé + Témara (Casablanca and Marrakech removed) · Presence targeting is on.
> Still to do **after** posting the import: pause the old ad and delete the 5 old sitelinks (by hand, or ask me to do it by API).

Before starting: upload `dist/` (site fixes) · Editor → **Get recent changes** · Account → Export → backup.

## Import (Account → Import → From file), in this order

| File | Expected in the preview |
| --- | --- |
| `01-ad-groups-and-keywords.csv` | 9 new keywords (7 exact + 2 phrase) |
| `02-responsive-search-ads.csv` | 1 new ad |
| `03-negative-keywords.csv` | 241 negatives (some flagged as duplicates: skip them) |
| `04-sitelinks.csv` | 5 sitelinks |
| `05-callouts.csv` | 6 callouts (the campaign has none today) |
| `06-structured-snippets.csv` | 1 snippet (Services) |

For each: Process → Finish and review changes → **Keep proposed changes**.

## By hand

- [ ] **Ads**: pause the old ad (descriptions with "Contactez-nous !" / "Appelez-nous !")
- [ ] **Sitelinks**: delete the 5 old ones: *Landing Page Rapide*, *Création Site E-commerce*, *creations site web*, *Expert SEO Maroc*, *Devis Gratuit*
- [ ] **Negative keywords**: delete `[site e commerce]`, `"gestion site web"`, `[web marrakech]`, `[startup développement web]`, `[woocommerce maroc]`
- [ ] **Campaign settings → Locations**: add **Salé** (ID 1009985) and **Témara** (ID 9073703) next to Rabat
- [ ] **Locations → Location options**: *Presence: people in or regularly in your targeted locations*

Don't touch today: target CPA (60 → 70 in one week), desktop (−100%), ad schedule.

## Finish

Check changes → fix red errors → **Post**.
