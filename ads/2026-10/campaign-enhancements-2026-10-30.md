# Campaign enhancements — 2026-10-30

> **Status:** applied through the Google Ads API on 2026-10-30 (with dry runs first, each step approved). Remaining: pause the 3 old ads once Google approves the new ones; bid changes at +1 and +2 weeks.

> Scope: the 3 running campaigns only (Creation-site-web, creation-site-web-rabat, google-ads-casa).
> Data: Google Ads API, 2026-09-30 → 10-29, read-only (nothing changed in the account), plus the
> 2026-10-29 audit and the negative lists in `shared-negative-lists-2026-10-29.md` / `negative-additions-2026-10-30.md`.
> All ad text below has been checked against Google's limits (headline 30, description 90,
> sitelink 25/35, callout 25, path 15). Prices come from the site: vitrine from 2 000 DH, e-commerce from 3 000 DH.

## Snapshot (last 30 days)

| Campaign | Spend | Clicks | Conv. | CPA | Impr. share | Lost (rank) | Bidding | Budget/day |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Creation-site-web (Casablanca) | 3 941 | 288 | 42 | 94 | 64% | 36% | Max conv., tCPA 100 | 400 |
| creation-site-web-rabat | 965 | 98 | 21 | **46** | 65% | 35% | Max conv., tCPA 60 | 200 |
| google-ads-casa | 198 | 35 | 6 | **33** | 32% | 68% | Max clicks, CPC cap 6 | 60 |

No campaign is limited by budget (budget lost = 0%). Every dirham of improvement comes from **relevance**
(keywords → ad → landing page), not from spending more.

## Step 0: account-wide, before anything else

The only conversion action is still **Contact-from-moudev** (WhatsApp/phone clicks). Every bid
Google makes is optimised for clicks on a WhatsApp button, not for real quote requests. Restore
**Submit lead form** + **Lead Qualifié (OCI)** as primary (audit issue 1). The changes below still help
without this step, but you can't judge them properly.

Also in the account settings: switch off auto-applied recommendations and automatically created assets
(audit issue 10). If you don't, Google will rewrite the ads below on its own.

---

## 1. Creation-site-web (Casablanca)

### What's wrong (new findings in bold)

1. **4 of the 5 sitelinks send Casablanca searchers to the Rabat page** (/rabat, /rabat#seo,
   /rabat#contact, /rabat#ecommerce): 17 clicks, 190 MAD this month. `#seo` and `#ecommerce` don't
   even exist on /rabat, so visitors land at the top of the wrong city's page.
2. ~~12 junk words are POSITIVE keywords~~ **Correction (2026-10-30):** these 12 are ad-group-level
   **negative** keywords and work as intended; nothing to change. The list was: `"gratuite"` (phrase!), `yolasite`, `youkan`, `webflow templates`, `notion website`,
   `kadence theme demo`, `gohighlevel website builder`, `dropship builder`, `build website easily`,
   `créer une landing page gratuite`, `new web said`, `i m web designer`. They have 0 impressions today
   only because other negatives block them. `"gratuite"` in phrase match is a request to show your ad for anything "gratuite".
3. **Keywords landing on the homepage convert worse:** / = 32 clicks, 452 MAD, 3 conv (CPA 151)
   vs /casablanca = CPA 88. /tarifs = 11 clicks, 164 MAD, **0 conv**.
4. `"creation site internet"` (phrase) = 1 992 MAD, half the spend, QS 5, expected CTR *below average*.
5. The ad says "Agence Web à Casablanca", "Au Meilleur Tarif", has a lowercase keyword-stuffed headline
   ("developer site web maroc") and no price or delivery time.
6. Duplicate callouts (each of the 4 is attached twice), and "Support Local au Maroc" says nothing.
7. One ad group mixes vitrine, e-commerce, prices and English keywords.

### Structure: split into 2 ad groups

| Ad group | Keywords | Final URL |
| --- | --- | --- |
| **Site web Casablanca** (rename the existing one) | everything in it today except e-commerce | /casablanca |
| **E-commerce Casablanca** (new) | `"creation site e-commerce"`, [creation site e-commerce maroc], `"creation site e-commerce casablanca"`, `"site e-commerce casablanca"`, `"boutique en ligne casablanca"`, [creation boutique en ligne] | /ecommerce |

`"creation site e-commerce"` = 355 MAD for 3 conv (CPA 118) while landing on /casablanca, which
doesn't mention a boutique. In its own ad group, with e-commerce copy and the /ecommerce page, CTR and landing-page score go up.

### Keywords

| Action | Keyword |
| --- | --- |
| ~~Remove~~ | ~~the 12 junk positives~~: they're negatives, keep them |
| **Change match** | `"creation site internet"` → keep running, but add [creation site internet] + [création site internet] exact next to it. After 2 weeks, pause the phrase version if the exact ones carry the volume |
| **Add (exact)** | [creation site web casablanca], [création site web casablanca], [développeur web casablanca], [developpeur web casablanca], [site web casablanca], [creation site internet casablanca], [agence site web casablanca] |
| **Change final URL → /casablanca** | creation site web maroc, création site web maroc, entreprise de conception de site web, web developer casablanca, website design morocco, developer site web maroc, site web PME Maroc, website design casablanca |
| **Change final URL → /casablanca** | prix site web casablanca, devis site web casablanca, prix site web maroc, devis site web maroc (/tarifs: 0 conversions from 11 clicks). Switch back once /tarifs has a mobile WhatsApp CTA above the fold |

[créer un site web] is a judgment call: it looks like a DIY search, but it got 3 conversions for 71 MAD. Leave it.

### New RSA, ad group "Site web Casablanca" (replace the current ad)

Final URL `/casablanca` · Path: `casablanca` / `site-web`

Headlines (pin 1 and 2 to position 1, leave the rest free):
```
Création Site Web Casablanca      ← pin 1
Développeur Web à Casablanca      ← pin 1
Création de Site Internet
Site Vitrine dès 2 000 DH
Site E-commerce dès 3 000 DH
Devis Gratuit en 24h
Livré en 7 à 10 Jours
Paiement Après Livraison
Vous Parlez au Développeur
Sans Agence ni Intermédiaire
Qualité Agence, Prix Freelance
React, WordPress, WooCommerce
Développeur Freelance Maroc
Site Web Pro pour PME
SEO Inclus dans Chaque Site
```
Descriptions:
```
Je crée votre site vitrine ou e-commerce à Casablanca. Livré en 7 à 10 jours, SEO inclus.
Vous parlez directement avec le développeur : pas d'agence, pas d'intermédiaire.
Site vitrine dès 2 000 DH, e-commerce dès 3 000 DH. Vous payez après la livraison.
Demandez votre devis gratuit : réponse en 24h sur WhatsApp. Contactez-moi.
```

### New RSA, ad group "E-commerce Casablanca"

Final URL `/ecommerce` · Path: `e-commerce` / `casablanca`

```
Site E-commerce Casablanca        ← pin 1
Création Boutique en Ligne        ← pin 1
E-commerce dès 3 000 DH
Paiement CMI et PayPal
Boutique Livrée en 7 à 10 J
WooCommerce ou Sur Mesure
Gestion Stock et Commandes
Formation 2h Incluse
Catalogue Produits Illimité
Développeur E-commerce Maroc
Paiement Après Livraison
Devis Gratuit en 24h
Vous Parlez au Développeur
Sans Agence ni Intermédiaire
Qualité Agence, Prix Freelance
```
```
Je crée votre boutique en ligne à Casablanca : catalogue, paiement CMI/PayPal, stocks.
E-commerce dès 3 000 DH, livré en 7 à 10 jours. Vous payez après la livraison.
Vous parlez directement au développeur. WooCommerce ou sur mesure, selon vos besoins.
Devis gratuit et transparent sous 24h. Contactez-moi sur WhatsApp.
```

### Assets

**Sitelinks**: remove all 5 current ones, add:

| Text | URL | Line 1 | Line 2 |
| --- | --- | --- | --- |
| Tarifs Transparents | /tarifs | Vitrine dès 2 000 DH | E-commerce dès 3 000 DH |
| Site E-commerce | /ecommerce | Boutique en ligne clé en main | Paiement CMI et PayPal intégré |
| Devis Gratuit en 24h | /casablanca#contact | Réponse rapide sur WhatsApp | Gratuit et sans engagement |
| Qui Suis-Je ? | /about | Développeur web freelance | Vous parlez directement avec moi |
| Services Web | /services | Vitrine, e-commerce, application | Refonte de votre site existant |

**Callouts**: remove the 8 current ones (4 duplicated), add:
`Paiement Après Livraison` · `Livraison 7 à 10 Jours` · `Devis Gratuit en 24h` · `Sans Intermédiaire` · `SEO Inclus` · `Site 100% Sur Mesure`

**Structured snippet** (header *Services*): Site vitrine · Site e-commerce · Application web · Refonte de site · Landing page

### Settings

| Setting | Today | Change to | When |
| --- | --- | --- | --- |
| Location option | Presence or interest | **Presence** | now |
| Desktop | −100% | −40% | after step 0 (form conversion back) |
| Target CPA | 100 | keep 100 | review after 2 weeks of the new ads |
| Ad schedule | 07:00–24:00 | keep | 9h (143 MAD, 0 conv) and 23h (197 MAD, 0 conv) are weak, but tCPA ignores hour bid adjustments and 30 days is too little data. Recheck at 60 days |

**Target:** CPA 94 → ≤ 70 MAD within 4–6 weeks; QS of `creation site internet` 5 → 7.

---

## 2. creation-site-web-rabat

Your best campaign: CPA 46, stable for 6 months. The goal here is **more volume at the same CPA**.

### What's wrong

1. **No callouts at all.**
2. Sitelinks: "creations site web" (lowercase, → /rabat, same page as the ad), "Landing Page Rapide" (→ /rabat),
   "Expert SEO Maroc" (→ /rabat#seo, anchor doesn't exist), "Création Site E-commerce" (→ /rabat#ecommerce, anchor doesn't exist).
3. Ad copy: "Contactez-nous", "Appelez-nous", "agence de création de site web", "Au Meilleur Tarif",
   and one description that is only `{Keyword:creation site web}`.
4. Low QS on the keywords that matter for Rabat: [agence web rabat] **QS 3**, [création site web maroc] **QS 3**,
   [création site web rabat] QS 5 with expected CTR *below average*. The ad doesn't say "Rabat" often enough.
5. Location = Rabat city only. /rabat has a Témara section, but Salé and Témara aren't targeted.
6. 35% of impressions lost on rank, 0% on budget: the 60 MAD target CPA is holding it back.

### Keywords

| Action | Keyword |
| --- | --- |
| **Add (exact)** | [creation site web rabat], [création site internet rabat], [creation de site web rabat], [developpeur web rabat], [développeur web rabat], [site web rabat], [agence site web rabat] |
| **Add (phrase)** | `"site vitrine rabat"`, `"site institutionnel rabat"` (Rabat persona: institutions, NGOs) |
| Keep | `"creation site internet"` (633 MAD, 15 conv, CPA 42: works here, unlike in Casablanca) |
| Watch | `"agence creation de site"` (30 MAD, 0 conv), `"agence creation site ecommerce"` (25 MAD, 0 conv) |

### New RSA (replace the current ad)

Final URL `/rabat` · Path: `rabat` / `site-web`

```
Création Site Web à Rabat         ← pin 1
Développeur Web à Rabat           ← pin 1
Création Site Internet Rabat      ← pin 1
Site Vitrine dès 2 000 DH
Site E-commerce dès 3 000 DH
Devis Gratuit en 24h
Livré en 7 à 10 Jours
Paiement Après Livraison
Vous Parlez au Développeur
Sans Agence ni Intermédiaire
Qualité Agence, Prix Freelance
Site Institutionnel et ONG
Sites pour Startups et PME
Rabat, Salé et Témara
SEO Inclus dans Chaque Site
```
```
Je crée votre site vitrine, e-commerce ou institutionnel à Rabat. Livré en 7 à 10 jours.
Vous parlez directement avec le développeur : pas d'agence, pas d'intermédiaire.
Site vitrine dès 2 000 DH, e-commerce dès 3 000 DH. Vous payez après la livraison.
Startups, ONG, PME : demandez votre devis gratuit, réponse en 24h. Contactez-moi.
```

### Assets

**Sitelinks**: remove the 5 current ones, add:

| Text | URL | Line 1 | Line 2 |
| --- | --- | --- | --- |
| Tarifs Transparents | /tarifs | Vitrine dès 2 000 DH | E-commerce dès 3 000 DH |
| Site E-commerce | /ecommerce | Boutique en ligne clé en main | Paiement CMI et PayPal intégré |
| Devis Gratuit en 24h | /rabat#contact | Réponse rapide sur WhatsApp | Gratuit et sans engagement |
| Rabat, Salé et Témara | /rabat#temara | Je livre partout, à distance | Sans frais de déplacement |
| Questions Fréquentes | /rabat#faq | Prix, délais, paiement | Tout ce qu'il faut savoir |

**Callouts** (new): `Paiement Après Livraison` · `Livraison 7 à 10 Jours` · `Devis Gratuit en 24h` · `Sans Intermédiaire` · `SEO Inclus` · `Développeur Freelance`

**Structured snippet** (header *Services*): Site vitrine · Site e-commerce · Site institutionnel · Refonte de site · Landing page

### Settings

| Setting | Today | Change to | When |
| --- | --- | --- | --- |
| Location option | Presence or interest | **Presence** | now |
| Locations | Rabat | Rabat **+ Salé + Témara** | now |
| Target CPA | 60 | **70** | 1 week after the new ad is live: wins part of the 35% lost on rank, still far below Casablanca |
| Desktop | −100% | −40% | after step 0 |

**Target:** keep CPA ≤ 55 MAD while going from ~21 to 30+ conversions/month.

---

## 3. google-ads-casa

Cheapest conversions in the account (CPA 33) but small: 6 conversions/month, 32% impression share.

### What's wrong

1. **No ad schedule.** The campaign is paused and resumed by hand from the phone every day, which resets its learning.
2. Max CPC cap 6 MAD + 68% lost on rank. Part of that is google.com (unwinnable navigational searches,
   blocked by the List 3 negatives); the rest is the cap.
3. `"campagne google ads"` = 72 MAD, 13 clicks, **0 conv**. Its search terms are "annonce google",
   "google ads library", "comment publier une annonce…": people doing it themselves.
4. `"agence google ads"` QS **1**. `"marketing digital casablanca"` brings 5 of the 6 conversions, but
   its landing-page score is *below average*: /google-ads doesn't talk about "marketing digital".
5. The ad has 10 headlines and 3 descriptions (Google allows 15 and 4). One description reads
   "Gestion Google Ads À Casablanca -- Consultant Freelance", which wastes 90 characters.
6. One ad group mixes Google Ads intent and marketing-agency intent.

### Structure: split into 2 ad groups

| Ad group | Keywords | Final URL |
| --- | --- | --- |
| **Gestion Google Ads** (rename "Ad group 1") | gestion / expert / consultant / freelance / prix google ads, google ads maroc, google ads casablanca, publicité google casablanca, agence publicité google, agence sea | /google-ads |
| **Marketing digital Casablanca** (new) | `"marketing digital casablanca"`, `"agence marketing digital casablanca"`, `"agence de marketing casablanca"` (2 conv for 12 MAD in search terms) | /google-ads |

### Keywords

| Action | Keyword |
| --- | --- |
| **Pause** | `"campagne google ads"` (72 MAD, 0 conv, DIY traffic) |
| **Pause** | `"agence google ads"` (QS 1, 0 clicks): `"gestion google ads"` and `"expert google ads"` cover the same buyers |
| **Add (exact)** | [gestion google ads casablanca], [consultant google ads maroc], [freelance google ads maroc], [expert google ads maroc] |
| **Add (phrase)** | `"agence marketing digital casablanca"`, `"agence de marketing casablanca"` (in the new ad group) |

### RSA: complete the existing ad (keep the 10 headlines that work)

Add 5 headlines:
```
Audit Gratuit de Votre Compte
Freelance Google Ads Maroc
Plus d'Appels et de Devis
Rapport Clair Chaque Mois
Marketing Digital Casablanca
```
Replace description 1 and add a 4th:
```
Dès 1 000 DH/mois, 0% de commission sur votre budget. Vous parlez directement avec moi.
Je gère vos campagnes Google Ads : mots-clés, annonces, suivi des appels et WhatsApp.
```
For the new "Marketing digital Casablanca" ad group, copy this ad and pin **Marketing Digital Casablanca** to position 1.

### Assets

Sitelinks are good (they all point to /google-ads sections). Callouts: add
`Audit Gratuit` · `Rapport Mensuel` · `Suivi des Conversions` · `Devis Gratuit en 24h` (already attached).

### Settings

| Setting | Today | Change to | When |
| --- | --- | --- | --- |
| Ad schedule | none + manual pausing | **07:00–24:00 every day**, stop pausing by hand | now |
| Max CPC cap | 6 MAD | **8 MAD** | after the List 3 negatives are in (so the extra bid doesn't go to "google ads" navigational searches) |
| Location option | Presence or interest | **Presence** | now |
| Bidding | Maximize clicks | Maximize conversions | after ~15 conversions on the campaign with step 0 done |

**Target:** 6 → 10+ conversions/month at CPA ≤ 40 MAD.

---

## Site-side fixes (done in code 2026-10-30, built, waiting for upload)

1. **`#ecommerce` anchor**: `#services` and `#tarifs` already existed on /casablanca and /rabat (they come
   from the shared section components); only `#ecommerce` was missing. Each service card now carries its id
   (`#vitrine`, `#ecommerce`, `#sur-mesure`) on every page that uses the services section, so
   /casablanca#ecommerce, /rabat#ecommerce and the homepage #ecommerce now scroll to the e-commerce card.
   `#seo` still doesn't exist: just remove the "Expert SEO Maroc" sitelink.
2. **/tarifs**: WhatsApp button "Devis gratuit — réponse en 24h" + phone number in the hero, above the
   fold (GA4 `cta_source` = `tarifs-hero`). After the upload, price keywords can be pointed back to /tarifs.
3. **/google-ads**: the intro now says "marketing digital à Casablanca" in its first sentence (H1 and title unchanged).

## Order of work

| # | When | Action | Time |
| --- | --- | --- | --- |
| 1 | Today | Step 0: conversions + auto-apply off | 30 min |
| 2 | Today | Negative lists (10-29 + 10-30 files) + remove the bad negatives + remove the 12 junk positives | 30 min |
| 3 | Today | Location → Presence on all 3; Salé + Témara on Rabat; ad schedule on google-ads-casa | 10 min |
| 4 | Today | New RSAs + sitelinks + callouts + snippets (all 3 campaigns) | 60 min |
| 5 | This week | Split ad groups (E-commerce Casa, Marketing digital), add exact keywords, fix final URLs, pause the 2 google-ads-casa keywords | 40 min |
| 6 | Today | Upload `dist/` (site fixes are built), incl. the hidden `.htaccess` | 10 min |
| 7 | +1 week | Rabat tCPA 60 → 70; google-ads-casa CPC cap 6 → 8 | 5 min |
| 8 | +2 weeks | Desktop −100% → −40% on both website campaigns; pause `"creation site internet"` phrase in Casablanca if exact carries the volume | 10 min |
| 9 | +4 weeks | Re-pull and compare with the snapshot at the top of this file | — |

Don't change everything and the bids on the same day: ads + keywords first, bids a week later, so each change can be measured.
