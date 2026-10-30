# google-ads-casa — Editor checklist

> **⚠️ Applied through the Google Ads API on 2026-10-30 — do NOT import these files.** Everything below is already live (ad groups, keywords, ads, negatives, sitelinks, callouts, snippets, locations, schedule). Importing them in Editor would create duplicates. Kept as a record only.

> **Done by API on 2026-10-30, skip these:** ad schedule 07:00–24:00 every day · Presence targeting is on. Stop pausing the campaign from the phone: the schedule handles it now.
> Still to do **after** posting the import: pause the old ad in Ad group 1 (by hand, or ask me to do it by API).

Before starting: Editor → **Get recent changes** · Account → Export → backup.

## Import (Account → Import → From file), in this order

| File | Expected in the preview |
| --- | --- |
| `01-ad-groups-and-keywords.csv` | 1 new ad group (*Marketing digital Casablanca*), 7 new keywords, 3 paused ("marketing digital casablanca" in Ad group 1 because it moves to the new group, "campagne google ads", "agence google ads") |
| `02-responsive-search-ads.csv` | 2 new ads (Ad group 1 + Marketing digital Casablanca) |
| `03-negative-keywords.csv` | 70 negatives (some flagged as duplicates: skip them) |
| `05-callouts.csv` | 3 callouts (Audit Gratuit, Rapport Mensuel, Suivi des Conversions) |

There's no 04 or 06 for this campaign: its sitelinks are already good, and it gets no structured snippet.

For each: Process → Finish and review changes → **Keep proposed changes**.

## By hand

- [ ] **Ads**: pause the old ad in Ad group 1 (the one with 10 headlines)
- [ ] **Campaign settings → Ad schedule**: Monday to Sunday, **07:00–24:00**. From now on, stop pausing the campaign from the phone.
- [ ] **Locations → Location options**: *Presence: people in or regularly in your targeted locations*
- [ ] Keep the 4 existing sitelinks and the existing callouts

Don't touch today: Max CPC cap (6 → 8 MAD in one week), bidding (Maximize clicks).

## Finish

Check changes → fix red errors → **Post**.
