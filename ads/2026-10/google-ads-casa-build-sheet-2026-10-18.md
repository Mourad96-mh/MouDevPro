# Campaign build sheet — Gestion Google Ads (Casablanca)

> Prepared 2026-10-18. To be created manually in Google Ads (the API connection is read-only).
> Landing page: `https://www.moudevpro.com/google-ads` — **upload `dist/` first**, then create the campaign.
> Offer: standalone Google Ads management, **dès 1 000 DH/mois**, fixed fee, 0% commission, no commitment.

## Why this shape

Keyword Planner (Morocco, last 12 months) shows little demand for the service by name:
`google ads maroc` 50/mo, `google ads prix` 50, `agence google ads` 30, everything else (`consultant / expert /
freelance / gestion google ads`, `agence sea`) ≤10 — expect many _low search volume_ flags.
The volume is in `agence (de) marketing digital casablanca` (390 + 140) and `agence digital casablanca` (260),
cheap (≈5–20 MAD top-of-page) and low competition. So: one small campaign, two ad groups.

Competitor landscape (pages read 2026-10-18): Web Success (2 500 DH/mois + 5 000 budget), Major Media (3 000 DH/mois),
meg.ma (1 900 DH test, 4 900 DH/mois), Neotransition (fixed fee, "zéro commission"), Acharki Digital (solo expert,
Google Partner), Redbox, Hostino, AgenceAds. **1 000 DH/mois is the lowest displayed price in the market** — lead with it.

## 1. Campaign settings

| Setting          | Value                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Name             | `Search — Gestion Google Ads — Casablanca`                                                                                                  |
| Type / goal      | Search · Leads                                                                                                                              |
| Networks         | Google Search only — **untick Search Partners and Display**                                                                                 |
| Locations        | Casablanca (city) — **"Presence: people in or regularly in"** (not "interest")                                                              |
| Languages        | French, English, Arabic                                                                                                                     |
| Budget           | **60 MAD/day** to start (~1 800 MAD/month)                                                                                                  |
| Bidding          | Weeks 1–3: **Maximize clicks**, max CPC cap **15 MAD**. Switch to **Maximize conversions** once the campaign has ≥15 conversions in 30 days |
| Conversions      | Use the existing account goals: `Contact` (form) + `Contact-from-moudev` (WhatsApp/phone)                                                   |
| Ad schedule      | All days, 08:00–22:00                                                                                                                       |
| Final URL        | `https://www.moudevpro.com/google-ads`                                                                                                      |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign=google-ads-casa`                                                                             |

## 2. Ad groups & keywords

### Ad group A — `Google Ads (intent)`

Phrase match:

```
"agence google ads"
"gestion google ads"
"google ads maroc"
"google ads casablanca"
"prix google ads"
"campagne google ads"
"consultant google ads"
"freelance google ads"
"expert google ads"
"agence publicité google"
"publicité google casablanca"
"agence sea"
```

### Ad group B — `Agence digitale Casablanca (volume)`

Phrase match:

```
"agence marketing digital casablanca"
"agence de marketing digital casablanca"
"agence digital casablanca"
"marketing digital casablanca"
"digital marketing agency casablanca"
```

Watch the search terms report closely — some searchers want social-media management or branding, not Google Ads.
Pause the group if cost per contact is > 2× group A after 30 days.

## 3. Negative keywords (campaign level, phrase match)

```
emploi
recrutement
stage
salaire
offre d'emploi
formation
cours
certification
examen
pdf
gratuit
c'est quoi
comment faire
tuto
youtube
adsense
upwork
fiverr
login
connexion
compte suspendu
community manager
```

Keep this list separate from the shared web-dev negative list.

Cross-negative: add `"google ads"` and `"marketing digital"` (phrase) to the 3 existing web-dev campaigns
(Casablanca / Rabat / Marrakech) so they don't compete with this one in the auction.

## 4. Responsive search ads (one per ad group, pin nothing at first)

Headlines (≤30 chars — lengths verified):

| #   | Headline                      | Chars |
| --- | ----------------------------- | ----- |
| 1   | Gestion Google Ads Casablanca | 29    |
| 2   | Dès 1 000 DH/Mois             | 17    |
| 3   | 0% Commission sur le Budget   | 27    |
| 4   | Consultant Google Ads         | 21    |
| 5   | Google Ads à Casablanca       | 23    |
| 6   | Audit Gratuit en 24h          | 20    |
| 7   | Sans Engagement               | 15    |
| 8   | Suivi des Appels et WhatsApp  | 28    |
| 9   | Compte Ads à Votre Nom        | 22    |
| 10  | Optimisation Chaque Semaine   | 27    |
| 11  | Un Seul Interlocuteur         | 21    |
| 12  | Freelance, Pas une Agence     | 25    |
| 13  | Plus de Contacts, Moins Cher  | 28    |
| 14  | Alternative à une Agence      | 24    |
| 15  | Point Hebdo sur WhatsApp      | 24    |

For ad group B swap headline 5 for **"Agence Digitale Casablanca ?"** (28).

Descriptions (≤90 chars — lengths verified):

| #   | Description                                                                           | Chars |
| --- | ------------------------------------------------------------------------------------- | ----- |
| 1   | Je gère vos Google Ads à Casablanca. Montant fixe dès 1 000 DH/mois, 0% commission.   | 83    |
| 2   | Mots-clés, annonces, suivi des appels et WhatsApp, optimisation chaque semaine.       | 79    |
| 3   | Compte Google Ads à votre nom, sans engagement. Vous parlez directement au consultant. | 86    |
| 4   | Transformez votre budget en appels et devis. Audit gratuit de votre compte en 24h.    | 82    |

Display path: `moudevpro.com/google-ads/casablanca`

## 5. Assets (extensions)

- **Call:** +212 696 964 341 (business hours)
- **Location:** link the Google Business Profile
- **Sitelinks:** Tarif → `/google-ads#tarifs` · Ma méthode → `/google-ads#methode` · Agence ou freelance ? → `/google-ads#comparatif` · Création de site web → `/services#vitrine`
- **Callouts:** `0% commission` · `Sans engagement` · `Audit gratuit 24h` · `Compte à votre nom` · `Point hebdo WhatsApp`
- **Structured snippet (Services):** Campagnes Search, Suivi des conversions, GA4, Mots-clés négatifs, Reporting
- **Price asset:** Gestion Google Ads — dès 1 000 MAD/mois

## 6. Ad group A — ready to paste (Google Ads UI)

Field-by-field values for the "Create ads" screen of ad group `Google Ads (intent)`. Lengths verified.

**Final URL:** `https://www.moudevpro.com/google-ads`
**Display path:** `google-ads` / `casablanca`

**Headlines (15/15)**

```
Gestion Google Ads Casablanca
Dès 1 000 DH/Mois
0% Commission sur le Budget
Consultant Google Ads
Google Ads à Casablanca
Audit Gratuit en 24h
Sans Engagement
Suivi des Appels et WhatsApp
Compte Ads à Votre Nom
Optimisation Chaque Semaine
Un Seul Interlocuteur
Freelance, Pas une Agence
Plus de Contacts, Moins Cher
Alternative à une Agence
Point Hebdo sur WhatsApp
```

**Descriptions (4/4)**

```
Je gère vos Google Ads à Casablanca. Montant fixe dès 1 000 DH/mois, 0% commission.
Mots-clés, annonces, suivi des appels et WhatsApp, optimisation chaque semaine.
Compte Google Ads à votre nom, sans engagement. Vous parlez directement au consultant.
Transformez votre budget en appels et devis. Audit gratuit de votre compte en 24h.
```

**Business name:** `MouDevPro` (matches the URL, ≤25 chars)
**Business logo:** square site logo (1:1, ≥128 px)
**Images:** skip for now — no text or logo overlays allowed; add 4 clean photos later.

**Sitelinks (campaign level — overrides the 5 account-level web-dev sitelinks for this campaign)**

| Text (≤25)              | Final URL                                         | Description 1 (≤35)         | Description 2 (≤35)             |
| ----------------------- | ------------------------------------------------- | --------------------------- | ------------------------------- |
| Tarif dès 1 000 DH/mois | `https://www.moudevpro.com/google-ads#tarifs`     | Montant fixe, 0% commission | Sans engagement, résiliable     |
| Ma méthode              | `https://www.moudevpro.com/google-ads#methode`    | Mots-clés, annonces, suivi  | Optimisation chaque semaine     |
| Agence ou freelance ?   | `https://www.moudevpro.com/google-ads#comparatif` | Un seul interlocuteur       | Comparez avant de choisir       |
| Création de site web    | `https://www.moudevpro.com/services#vitrine`      | Site rapide qui convertit   | Vitrine, e-commerce, sur mesure |

If Google flags the `#anchor` sitelinks as duplicate destinations, add a query string: `/google-ads?s=tarifs#tarifs`.

**Callouts**

```
0% commission
Sans engagement
Audit gratuit 24h
Compte à votre nom
Point hebdo WhatsApp
```

**More asset types:** Call `+212 696 964 341` · Price "Gestion Google Ads — dès 1 000 MAD/mois" ·
Structured snippet (Services): `Campagnes Search`, `Suivi des conversions`, `GA4`, `Mots-clés négatifs`, `Reporting`

## 6b. Ad group B — ready to paste (Google Ads UI)

Ad group `Agence digitale Casablanca (volume)`. These searchers typed "agence", so the ad echoes their query
honestly (as a question, never claiming to be an agency) and says **Google Ads** clearly, so people looking for
social media or branding skip the ad instead of costing a click. Lengths verified.

**Final URL:** `https://www.moudevpro.com/google-ads`
**Display path:** `google-ads` / `casablanca`

**Headlines (15/15)**

```
Agence Digitale Casablanca ?
Marketing Digital Casablanca
Dès 1 000 DH/Mois
0% Commission sur le Budget
Google Ads Clé en Main
Qualité Agence, Prix Freelance
Audit Gratuit en 24h
Sans Engagement
Plus d'Appels et de Devis
Un Seul Interlocuteur
Alternative à une Agence
Compte Ads à Votre Nom
Rapport Hebdo sur WhatsApp
Pas de Frais d'Agence
Trouvez des Clients sur Google
```

**Descriptions (4/4)**

```
Vous cherchez une agence digitale à Casablanca ? Je gère vos Google Ads dès 1 000 DH/mois.
Qualité agence, prix freelance : montant fixe, 0% de commission sur votre budget.
Je trouve vos clients sur Google : mots-clés, annonces, suivi des appels et WhatsApp.
Vous parlez directement au consultant, sans engagement. Audit gratuit de votre compte 24h.
```

Business name, logo, sitelinks, callouts and other assets: same as ad group A (campaign level).

## 7. First 30 days checklist

- Day 1: confirm ads approved; check that a test WhatsApp click records in Google Ads (Tools → Conversions) and in GA4 Realtime (`contact_click`, source `google-ads-*`).
- Day 3, 7, 14: search terms report → add negatives.
- Keywords marked **"Low search volume"** in group A are expected — leave them; they activate if volume appears.
- Day 21: if CTR < 3% in group B, test headline 14 pinned to position 1.
- Day 30: cost per contact by ad group → keep, cut or rebudget.
