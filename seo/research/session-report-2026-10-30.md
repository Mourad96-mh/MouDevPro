# SEO session — 2026-10-30

> Data: Search Console, 2026-08-01 → 10-28 (query × page, by country). Raw numbers in
> `../../data/gsc/monthly-and-pages-2026-10-30.md`.

## What the data said

1. **"création site web casablanca" is already #1** for the homepage in Morocco (position 1.1–1.2, ~700
   impressions over 3 months). The page-level average looked like 16.6 because /casablanca also shows up for it
   at position 30–36. The problem is CTR (0.5%): ads + map pack above the organic result. Homepage stays the
   owner (decision of 2026-08, see memory "Casablanca Keyword Owner").
2. **"développeur (web) freelance (maroc/casablanca)" is cannibalised** across 6 URLs: /, /developpeur-web-freelance-maroc,
   /about, /casablanca, and 2 blog posts. Each ranks 14–40, none in the top 10. ~650 impressions over 3 months.
   Best placed: /developpeur-web-freelance-maroc (17.9 for "développeur freelance casablanca", 106 impr.) and /about (10.5).
3. **/ecommerce** ranks 22–23 for "création site e-commerce maroc"; /casablanca competes for the Casablanca variant (45 vs 22).
4. **/rabat** ranks 19–21 for "création site web rabat" (~250 impressions). Still the Wave 0.1 rewrite.

## Outside Morocco

| Country | Impr. (3 mo) | What ranks | Opportunity |
| --- | --- | --- | --- |
| Canada | 1 118 | **Homepage at 5.5 for "création site web"** (97 impr.), /canada at 47 | Canadians see the DH homepage, not /canada. /canada misses "développeur de site web pour e-commerce" (240 impr., pos. 45), "développement web professionnel" (70, pos. 40), "développement web canada" (33, pos. 24) |
| France | 1 035 | Homepage 1–3 for Casablanca queries (diaspora), /france barely | French users get the Moroccan homepage |
| UK | 517 | Homepage / /en/marrakech, small volumes | — |
| Switzerland | 278 | Homepage 1–2 + **/en for "web app / software development agency morocco"** (pos. 13–23) | B2B nearshore buyers |
| Belgium | 150 | **/en for "app / software development agency casablanca/morocco"** (pos. 16–23) | B2B nearshore buyers |
| UAE | 178 | position 5.4 average | — |

**New angle found:** European companies (BE, CH, CA, UK) searching for an *offshore/nearshore* web & app
developer in Morocco in English: "web app development agency morocco" (13.1), "software development agency
casablanca" (17.4), "custom software development agency morocco" (18–20), "app development agency marrakech" (13–17).
/en ranks for them by accident; no page targets them.

## Changes made (built, not deployed)

1. **One hreflang cluster** for /, /en, /ar, /france (fr-FR), /canada (fr-CA), /usa (en-US). Market pages were
   isolated before, so Google showed the DH homepage abroad. Defined once in `src/data/marketConfig.js`
   (`homeHreflangCluster`), used by HomePage, CityPage (/en, /ar), MarketPage, and mirrored in `sitemap-generator.js`.
2. **Sitemap hreflang fixed:** it still declared /en and /ar as translations of /casablanca (pages were corrected
   on 10-23, commit 2fe41c5). Now /casablanca = fr + x-default only, matching its page.
3. **/developpeur-web-freelance-maroc:** title "Développeur Web Freelance Maroc & Casablanca | Dès 2 000 DH",
   H1 adds "et à Casablanca". With the new navigation (Services menu + footer), it now gets a link from every page.
4. **/ecommerce:** H1 "Création Site E-commerce Maroc — …" (Ads keyword "site e-commerce maroc" kept); intro
   names Casablanca, Rabat, Marrakech.
5. **/canada:** title, meta, H1 and intro target "création site web et e-commerce", "développement web professionnel",
   "développeur de site web pour e-commerce"; new FAQ on e-commerce for Canada.

## Next (proposed)

1. **English nearshore page** for European companies ("Web & app development in Morocco — freelance alternative
   to an agency"), EN, € pricing, timezone CET±1. Biggest new opportunity found.
2. /rabat rewrite (Wave 0.1).
3. Blog posts "freelance-creation-site-web-maroc" and "choisir-developpeur-web-freelance-maroc": keep them
   informational (titles already are), link prominently to /developpeur-web-freelance-maroc.
4. Homepage CTR: test a more distinctive meta description (price + "payez après livraison").
5. Re-check in GSC ~3–4 weeks after deploy (late November): positions for the freelance queries, which URL Google
   shows in Canada / France for "création site web".

## Added later the same day — /europe (EN, B2B nearshore)

New market page `/europe` (config `marketConfig.europe`, rendered by MarketPage, route + prerender + sitemap
added). Targets European companies outsourcing web/app work to Morocco: "web app development morocco",
"software development agency casablanca/morocco", "nearshore / outsource web development morocco".
Positioning: freelance alternative to an agency, same time zone (0–1 h CET), EN/FR, € pricing (€199 / €299,
custom apps on quote), pay after delivery, EU hosting on request, white label for agencies (to confirm with Mourad).
Standalone hreflang (en + x-default self). Linked from the nav (International → Europe (EN)), the footer and
the other market pages. Built, not deployed. Watch in GSC from late November: does /europe replace /en for
those queries in BE / CH / UK / NL?
