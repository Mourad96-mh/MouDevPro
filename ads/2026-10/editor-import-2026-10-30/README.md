# Google Ads Editor import — 2026-10-30

> **⚠️ Applied through the Google Ads API on 2026-10-30 — do NOT import these files.** Everything below is already live (ad groups, keywords, ads, negatives, sitelinks, callouts, snippets, locations, schedule). Importing them in Editor would create duplicates. Kept as a record only.

Applies `../campaign-enhancements-2026-10-30.md` to the 3 running campaigns. Nothing has been changed in
the account: everything here goes through Editor, and **nothing is live until you click Post**.

Files (UTF-8 CSV, one entity type per file):

| File | Rows | What it does |
| --- | --- | --- |
| `01-ad-groups-and-keywords.csv` | 61 | Creates 2 ad groups (*E-commerce Casablanca*, *Marketing digital Casablanca*), adds 31 keywords, moves 10 existing keywords to /casablanca, **pauses** 18 keywords (moved e-commerce + marketing keywords, 12 junk positives, 2 google-ads-casa losers) |
| `02-responsive-search-ads.csv` | 5 | New RSAs: Casablanca, E-commerce Casablanca, Rabat, google-ads-casa × 2 (pins included) |
| `03-negative-keywords.csv` | 552 | Campaign-level negatives: the 10-29 lists + 10-30 additions (Casablanca 241, Rabat 241, google-ads-casa 70) |
| `04-sitelinks.csv` | 10 | 5 new sitelinks for Casablanca, 5 for Rabat |
| `05-callouts.csv` | 15 | 6 Casablanca, 6 Rabat, 3 google-ads-casa |
| `06-structured-snippets.csv` | 2 | "Services" snippet for Casablanca and Rabat |

Checked before export: every text is within Google's limits, and none of the 41 enabled keywords is blocked by a new
negative or by any of the 680 negatives already in the account.

The negatives go in at **campaign level** because Editor imports them reliably that way. Same effect as the
shared lists. If you'd rather keep shared lists, paste the 10-29 / 10-30 blocks into Shared library → Exclusion
lists in the web interface and skip file 03.

---

## Step 1: Upload the site first

`dist/` is built with the /tarifs CTA and the `#ecommerce` anchors. Upload it (with hidden files, for `.htaccess`)
**before posting**: the new sitelinks and e-commerce ads point to these pages.

## Step 2: Get the latest account

Editor → **Get recent changes** → *More data* → account 528-046-9672.

## Step 3: Import the 6 files, in order

For each file: **Account → Import → From file…** → pick the file → check the preview (column mapping, number of
new/edited rows) → **Process** → **Finish and review changes** → **Keep proposed changes**.

1. `01-ad-groups-and-keywords.csv`. Expected: 2 new ad groups, 31 new keywords, 10 edited final URLs, 18 paused.
2. `02-responsive-search-ads.csv`. Expected: 5 new ads.
3. `03-negative-keywords.csv`. Some lines will be flagged as duplicates of negatives that already exist. That's normal, skip them.
4. `04-sitelinks.csv`, then `05-callouts.csv`, then `06-structured-snippets.csv`.
   If Editor doesn't recognise a column (e.g. *Snippet Values*), map it by hand in the preview: Header = snippet
   header, Values = snippet values (separated by `;`).

## Step 4: Manual changes in Editor (can't be done safely by import)

**a. Pause the old ads** (Ads → Responsive search ads). Keep them paused, not deleted, so you can compare:
- Creation-site-web: the ad starting "Creation Site Web a Casablanca / Agence Web à Casablanca…"
- creation-site-web-rabat: the ad with "Contactez-nous !" in the descriptions
- google-ads-casa / Ad group 1: the old 10-headline ad

**b. Remove the old sitelinks** (Shared library / Assets → Sitelinks, or the campaign's Assets tab):
- On **Creation-site-web**, unlink all 5 old ones: *Site Vitrine Pro*, *Création Site E-commerce* (→/rabat#ecommerce),
  *creations site web* (→/rabat), *Expert SEO Maroc* (→/rabat#seo), *Devis Gratuit* (→/rabat#contact)
- On **creation-site-web-rabat**, unlink all 5 old ones: *Landing Page Rapide*, *Création Site E-commerce*,
  *creations site web*, *Expert SEO Maroc*, *Devis Gratuit*
- google-ads-casa: keep its 4 sitelinks

**c. Remove the old Casablanca callouts**: the 8 old ones (*Devis Gratuit en 24h*, *Site Web Sur Mesure*,
*Livraison Rapide*, *Support Local au Maroc*, each attached twice). Keep google-ads-casa's 4 existing callouts.

**d. Delete the negatives that block your buyers** (Keywords → Negative keywords, filter by text):

| Campaign | Delete |
| --- | --- |
| Creation-site-web | `"wordpress"`, `"woocommerce"` (phrase), `woocommerce` (broad), `[woocommerce maroc]`, `"custom"`, `"responsive"`, `"laravel"`, `"next js"`, `"plateforme"`, `"gestion site web"`, `[site e commerce]`, `[web marrakech]`, `[webmaster casablanca]`, `figma"` (broad, broken) |
| creation-site-web-rabat | `[site e commerce]`, `"gestion site web"`, `[web marrakech]`, `[startup développement web]`, `[woocommerce maroc]` |

**e. Optional, after posting and a check:** delete the 12 junk positives that file 01 pauses (*gratuite*,
*yolasite*, *youkan*, *webflow templates*…). Pausing is enough for now.

**f. Campaign settings** (select the campaign → edit panel):

| Campaign | Setting | New value |
| --- | --- | --- |
| all 3 | Locations → Location options (targeting) | **Presence: people in or regularly in your targeted locations** |
| creation-site-web-rabat | Locations → add | **Salé** (ID 1009985), **Témara** (ID 9073703) |
| google-ads-casa | Ad schedule | Monday → Sunday, **07:00–24:00** (and stop pausing it from the phone) |

Leave bids (target CPA, CPC cap, desktop) alone today. They change in a week, so you can see the effect of the ads first.

## Step 5: Check, then Post

1. **Check changes** (top bar). Fix any red error. Yellow warnings about duplicate negatives can be ignored.
2. **Post** → all 3 campaigns.
3. Tell me when it's posted. I'll verify through the API that everything landed (new ads, keywords, assets,
   negatives, settings), and I'll check the search terms again around **2026-11-06**.

## Not in Editor (web interface, 5 min)

- Tools → Conversions: restore **Submit lead form** + **Lead Qualifié (OCI)** as primary (audit issue 1)
- Recommendations → Auto-apply: turn everything off
- Account settings → Automatically created assets: off

## +1 week / +2 weeks (from the plan)

- +1 week: Rabat target CPA 60 → 70; google-ads-casa max CPC cap 6 → 8 MAD
- +2 weeks: desktop −100% → −40% on both website campaigns (once the form conversion is back); pause
  `"creation site internet"` (phrase) in Casablanca if the new exact keywords carry the volume
