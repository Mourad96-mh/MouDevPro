# Shared negative keyword lists — 2026-10-29

> Built from: all 340 campaign-level negatives currently in the account (union of the 4 campaigns that existed then),
> the search-terms report 2026-09-29 → 2026-10-28 (654 terms), and the auction insights of the same
> window (builders — Shopify, Hostinger, Strikingly, Fiverr, google.com — are in your auctions).
> To apply by hand: Tools → Shared library → **Exclusion lists** → **+** → paste a block.
> The paste syntax sets the match type: `"phrase"`, `[exact]`, `broad` (plain word).

## How the lists are split

| List | Apply to | Why separate |
| --- | --- | --- |
| **MDP — Universel** | all 3 active campaigns (Creation-site-web, creation-site-web-rabat, google-ads-casa) | Jobs, training, free, marketplaces — never a client, whatever the service |
| **MDP — Site web DIY** | Creation-site-web, creation-site-web-rabat | Builders and do-it-yourself queries — specific to the website offer |
| *(campaign-level)* google-ads-casa | google-ads-casa only | Navigational "google ads" queries — would block nothing useful elsewhere, but keep it scoped |

Do **not** put the website DIY list on google-ads-casa, or the Google Ads list on the website campaigns.

---

## List 1 — MDP — Universel (all campaigns)

```
"offre d'emploi"
"emploi"
"recrutement"
"stage"
"salaire"
"job"
"jobs"
"formation"
"cours"
"tutorial"
"tutoriel"
"tuto"
"apprendre"
"certification"
"examen"
"pdf"
"download"
"télécharger"
"gratuit"
"gratuitement"
"free"
"مجاني"
"fiverr"
"upwork"
"login"
"connexion"
```

`"free"` in phrase match does **not** block "freelance" — phrase match works on whole words.

---

## List 2 — MDP — Site web DIY (Casablanca, Rabat)

### 2a. Builders and platforms (phrase)

```
"website builder"
"site builder"
"web builder"
"page builder"
"generator"
"generateur"
"générateur"
"maker"
"editor"
"wix"
"squarespace"
"square space"
"shopify"
"hostinger"
"hostingersite"
"strikingly"
"godaddy"
"webflow"
"webador"
"webnode"
"zyro"
"site123"
"site 123"
"123site"
"website123"
"carrd"
"mixo"
"webild"
"tiiny"
"tini site"
"brizy"
"blogspot"
"blogger"
"teleporthq"
"devaito"
"durable"
"mobirise"
"odoo"
"flazio"
"peach web"
"peachweb"
"ecomnation"
"gomage"
"vytrini"
"codunk"
"pagepilot"
"netlify"
"vercel"
"github"
"google site"
"google sites"
"sites google"
"e monsite"
"elementor"
"avada"
"bubble io"
"10web"
"tilda"
"framer"
"lovable"
"canva"
"claude"
"infomaniak"
"magento"
"prestashop"
"opencart"
"big cartel"
"ecwid"
"youcan"
"yocan"
```

### 2b. Do-it-yourself intent (phrase)

```
"how to"
"faire soi-même"
"soi-même"
"moi-même"
"i wanna"
"build your store"
"build website"
"create website"
"create a website"
"create your website"
"make a website"
"template"
"templates"
"thème"
"plugin"
"modèle de site"
"exemple"
"html"
"prompt"
"ai"
"ia"
"figma"
"maquette"
"blog"
"logo seul"
"réseaux sociaux"
"facebook"
"portfolio"
"landing page generator"
"landing page free"
"landing page gratuite"
"squeeze page"
"website management"
"website tools"
"web creators"
"https"
"www"
```

### 2c. Exact-only (generic phrases you don't want, but whose longer versions you do)

```
[web design]
[website design]
[web development]
[website]
[site internet]
[landing page]
[code website]
[code site web]
[web space]
[page z]
[site business]
[mon site web]
[site site]
[son site]
```

`[site web]` is deliberately **not** here: it cost 344 MAD for 5 conversions (cost per conversion 69, below
the account average). Revisit once real-lead tracking is restored.

### 2d. Competitor and agency names (exact)

```
[booming btl casablanca]
[boxcom casablanca]
[conversium casablanca]
[elavi agency casablanca]
[eskimoz casablanca]
[tribal ddb casablanca]
[void casablanca]
[webeuz casablanca]
[edicom casablanca]
[freeconcept casablanca]
[genious ma]
[genius maroc]
[hostino ma]
[linkeo]
[soft seven art]
[soft seven art agence digitale & design]
[os websolutions]
[inovat rabat]
[majjane rabat]
[afoulki]
[athar web studio]
[agence web marrakech vsf agency]
[geekweb]
[geekweb com]
[ella web design]
[dani web]
[gemeosagency]
[protandy]
[supafast]
[scaleb media agence marketing digital & développement web à casablanca]
```

---

## List 3 — google-ads-casa (campaign-level negatives)

```
[google ads]
[ads google]
[google ad]
[google adwords]
"google ads login"
"se connecter"
"compte google ads"
"compte suspendu"
"adsense"
"admob"
"keyword planner"
"skillshop"
"youtube"
"c'est quoi"
"comment faire"
"community manager"
```

Auction insights: google.com takes the top spot in 99% of the auctions it shares with you here
(34% overlap). Those are people looking for the Google Ads interface, not a consultant. Keep the
phrase keywords ("gestion google ads", "expert google ads") — they aren't affected by exact negatives.

---

## ⚠️ Remove these existing negatives — they block your own buyers

These are live in the account today. Each one blocks searches for a service you sell.

| Negative (match) | Where | Blocks e.g. |
| --- | --- | --- |
| `"wordpress"` | Casablanca | "développeur wordpress casablanca", "création site wordpress maroc" |
| `"woocommerce"` + `woocommerce` (broad) | Casablanca | "développeur woocommerce maroc", "boutique woocommerce" |
| `[woocommerce maroc]` | Casa, Rabat | a buyer query |
| `"custom"` | Casablanca | "custom website casablanca" |
| `"responsive"` | Casablanca | "site web responsive casablanca" |
| `"laravel"`, `"next js"` | Casablanca | "développeur laravel casablanca" |
| `"plateforme"` | Casablanca | "création plateforme web maroc" |
| `"gestion site web"` | Casa, Rabat | maintenance / site management clients |
| `[site e commerce]` | Casa, Rabat | an exact query matching your e-commerce offer |
| `[startup développement web]` | Rabat | startups looking for a developer (Rabat persona) |
| `[web marrakech]` | Casa, Rabat | a Marrakech buyer query — remove before you turn the Marrakech campaign back on |
| `[webmaster casablanca]` | Casablanca | someone looking to hire |
| `figma"` (broad, malformed) | Casablanca | broken entry — replaced by `"figma"` in list 2b |

If WordPress/WooCommerce DIY queries come back, block them precisely instead:
`"wordpress gratuit"`, `"installer wordpress"`, `"wordpress com"`, `"woocommerce theme"`, `"woocommerce plugin"`.

## Judgment call — not included

- **`"comment"`** is a negative on Casablanca only. In June, several "comment créer un site / une boutique"
  queries converted, and this month "comment créer un site web" got 2 conversions for 95 MAD on Rabat.
  It's left out of the shared list until real leads (form + WhatsApp conversations) are tracked again —
  today's conversion action counts WhatsApp clicks, which can't tell a buyer from a DIY searcher.
- **`"storeino"`** is not added: it converted in June.

## After applying

1. Attach list 1 to the 3 active campaigns, list 2 to Creation-site-web and creation-site-web-rabat only.
   The Marrakech campaign is paused (as is the old "creation site web"), so skip it. If you turn it back on, attach both lists to it.
2. Remove the 13 harmful negatives above from each campaign.
3. Leave the rest of the campaign-level negatives in place; they're now duplicated by the lists,
   which is harmless. Clean them up later if you want a tidy account.
4. Check the search-terms report after 7 days for anything new that slips through.
