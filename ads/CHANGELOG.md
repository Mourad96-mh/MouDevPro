# Google Ads — change log

Every change made **to the live account** (customer 528-046-9672), newest first. Analysis and plans
live in the dated folders; this file only records what actually changed, when, how, and why.

Rule (since 2026-10-30): read-only by default. A change is applied only after Mourad approves that
specific change set, always after a `validate_only` dry run, then re-read to verify.
"Via" = API (through Claude/Composio), Web (Google Ads interface) or App (mobile app).

---

## 2026-10-31 — payment differentiator in assets (via API, approved)

From the Apify competitor-ads study (`2026-10/competitor-ads-apify-2026-10-31.md`): billiontech now shows
"dès 1 990 DH TTC" but asks 50% upfront; nobody else mentions payment.

| Change | Campaigns |
| --- | --- |
| New callout **"0 Acompte"** (`assets/434835999469`) | Creation-site-web, creation-site-web-rabat (7 callouts each) |
| Sitelink "Tarifs Transparents" replaced: line 2 "E-commerce dès 3 000 DH" → **"Payé seulement à la livraison"** (`assets/434835989482`); old link unlinked | Creation-site-web, creation-site-web-rabat |

Ads, keywords and bids not touched.

---

## 2026-10-30 — campaign plan applied (via API, each step approved)

Plan: [`2026-10/campaign-enhancements-2026-10-30.md`](2026-10/campaign-enhancements-2026-10-30.md)
· PDF [`2026-10/google-ads-campaign-plan-2026-10-30.pdf`](2026-10/google-ads-campaign-plan-2026-10-30.pdf)

### Targeting and settings
| Change | Campaigns | Before → after |
| --- | --- | --- |
| Location option | all 3 | Presence or interest → **Presence** |
| Locations | Creation-site-web | Casablanca + Rabat + Marrakech → **Casablanca only** |
| Locations | creation-site-web-rabat | Casablanca + Rabat + Marrakech → **Rabat + Salé (1009985) + Témara (9073703)** |
| Ad schedule | google-ads-casa | none (paused/resumed by hand from the app) → **07:00–24:00, every day** |

The Casa+Rabat+Marrakech locations had been added by hand on 10-29 (app, Rabat) and 10-30 17:38 (web,
Casablanca). They were removed because the 2 campaigns overlapped (Mourad chose "one city each").

### Negatives
- **Removed 19 negatives that blocked buyers.** Casablanca: "wordpress", "woocommerce" (phrase +
  broad), [woocommerce maroc], "custom", "responsive", "laravel", "next js", "plateforme",
  "gestion site web", [site e commerce], [web marrakech], [webmaster casablanca], figma" (broken).
  Rabat: [site e commerce], "gestion site web", [web marrakech], [startup développement web], [woocommerce maroc].
- **Added 407 campaign-level negatives** from `2026-10/shared-negative-lists-2026-10-29.md` +
  `2026-10/negative-additions-2026-10-30.md`. 145 of the 552 already existed. Totals after:
  Casablanca 395, Rabat 372, google-ads-casa 102.
- **Added 8 ad-group negatives** (routing between ad groups, phrase): Casablanca main group "e-commerce",
  "ecommerce", "e commerce", "boutique en ligne" · google-ads-casa Ad group 1 "marketing digital",
  "agence marketing", "agence de marketing" · Marketing digital group "google ads".
- Not shared lists: everything is at campaign / ad-group level. The account has no shared negative list.

### Structure, keywords, ads
- **New ad groups:** E-commerce Casablanca (`adGroups/200005664125`, → /ecommerce),
  Marketing digital Casablanca (`adGroups/200005664285`, → /google-ads).
- **31 keywords added** (Casablanca 9 exact + 6 e-commerce, Rabat 7 exact + 2 phrase,
  google-ads-casa 4 exact + 3 marketing).
- **16 keyword edits:** 10 landing pages → /casablanca; 6 paused (3 e-commerce keywords moved to the
  new group, "marketing digital casablanca" moved, "campagne google ads" 0 conv, "agence google ads" QS 1).
- **5 new RSAs** (`830058558400/403/406/409/412`), approved the same day.
- **3 old RSAs paused** once the new ones were approved: Casablanca `807357232444`,
  Rabat `807497421006`, google-ads-casa `828439725501`.

### Assets
- **27 assets created and linked:** 10 sitelinks, 15 callouts, 2 structured snippets (Services).
- **18 old links removed:** 10 sitelinks (4 Casablanca sitelinks pointed to /rabat) and 8 duplicated
  Casablanca callouts.

### Conversions
- **"Lead Qualifié (OCI)" recreated** (`conversionActions/7883577328`, upload clicks, qualified lead,
  primary, value from upload, default 200 MAD). The removed one was renamed "Lead Qualifié (OCI) - ancien".
- **Goal "Qualified lead" set biddable** at account level and on the 3 campaigns.
- Unchanged: "Contact-from-moudev" (WhatsApp + phone clicks, primary, 100 MAD).

### Not changed (on purpose)
Bids, target CPA (Casablanca 100, Rabat 60), google-ads-casa CPC cap (6 MAD), budgets, desktop −100%.
Next decisions: see "Upcoming" below.

---

## Before 2026-10-30 (from the change history, Mourad's own edits)
- 2026-10-30 17:36 (web): Casablanca campaign edited. Its target CPA was found at 100 that evening,
  vs 90 in the 10-29 audit; probably this edit, not verified field by field.
- 2026-10-21: target CPA set (Casablanca 90, Rabat 60).
- 2026-10-19 → 10-30: google-ads-casa paused/resumed by hand from the mobile app ~twice a day.
- 2026-10-06: ad schedule 07:00–24:00 on the 2 website campaigns.
- Before 2026-10: "Submit lead form" and "Lead Qualifié (OCI)" conversion actions removed (date unknown,
  older than the 30-day change history).

---

## Upcoming (planned, not applied)
| Date | Change | Condition |
| --- | --- | --- |
| 2026-11-06 | Rabat target CPA 60 → 70 · google-ads-casa max CPC 6 → 8 · search-terms review | new ads stable |
| 2026-11-13 | Casablanca target CPA 100 → 85 | CPA ≤ 100 over the 2 weeks |
| end of Nov | google-ads-casa → Maximize conversions, tCPA ~45 | ~15 conversions in 30 days |
| open | Price assets, business name, link Business Profile, move negatives to shared lists | waiting on Mourad |

Desktop stays at −100%: leads come from WhatsApp/phone (mobile), not from the form.
