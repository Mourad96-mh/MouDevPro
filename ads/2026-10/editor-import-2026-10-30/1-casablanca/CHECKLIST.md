# Creation-site-web (Casablanca) — Editor checklist

> **⚠️ Applied through the Google Ads API on 2026-10-30 — do NOT import these files.** Everything below is already live (ad groups, keywords, ads, negatives, sitelinks, callouts, snippets, locations, schedule). Importing them in Editor would create duplicates. Kept as a record only.

> **Done by API on 2026-10-30, skip these:** the 14 negatives that blocked buyers are deleted · location = Casablanca only · Presence targeting is on.
> Still to do **after** posting the import: pause the old ad, delete the 5 old sitelinks and the 8 old callouts (by hand, or ask me to do it by API).

Before starting: upload `dist/` (site fixes) · Editor → **Get recent changes** · Account → Export → backup.

## Import (Account → Import → From file), in this order

| File | Expected in the preview |
| --- | --- |
| `01-ad-groups-and-keywords.csv` | 1 new ad group (*E-commerce Casablanca*), 15 new keywords, 10 edited (final URL → /casablanca), 15 paused (3 moved e-commerce + 12 junk) |
| `02-responsive-search-ads.csv` | 2 new ads (creation-site-web-casablanca + E-commerce Casablanca) |
| `03-negative-keywords.csv` | 241 negatives (some flagged as duplicates: skip them) |
| `04-sitelinks.csv` | 5 sitelinks |
| `05-callouts.csv` | 6 callouts |
| `06-structured-snippets.csv` | 1 snippet (Services) |

For each: Process → Finish and review changes → **Keep proposed changes**.

## By hand

- [ ] **Ads**: pause the old ad (headlines "Creation Site Web a Casablanca", "Agence Web à Casablanca"…)
- [ ] **Sitelinks**: delete the 5 old ones: *Site Vitrine Pro*, *Création Site E-commerce* (→/rabat#ecommerce), *creations site web* (→/rabat), *Expert SEO Maroc* (→/rabat#seo), *Devis Gratuit* (→/rabat#contact)
- [ ] **Callouts**: delete the 8 old ones: *Devis Gratuit en 24h*, *Site Web Sur Mesure*, *Livraison Rapide*, *Support Local au Maroc* (each listed twice). Keep the 6 new ones.
- [ ] **Negative keywords**: delete `"wordpress"`, `"woocommerce"` (phrase), `woocommerce` (broad), `[woocommerce maroc]`, `"custom"`, `"responsive"`, `"laravel"`, `"next js"`, `"plateforme"`, `"gestion site web"`, `[site e commerce]`, `[web marrakech]`, `[webmaster casablanca]`, `figma"` (broad, broken)
- [ ] **Campaign settings → Locations → Location options**: *Presence: people in or regularly in your targeted locations*

Don't touch today: target CPA (100), desktop (−100%), ad schedule.

## Finish

Check changes → fix red errors → **Post**.
