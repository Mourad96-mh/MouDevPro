# `/france` rewrite — implemented 2026-08-13

> Status: **implemented** in `src/data/marketConfig.js` (key `france`) and rendered by
> `src/pages/MarketPage.jsx`. Not yet deployed — needs `dist/` uploaded to the LiteSpeed host.
> Written 2026-08-13 from the GSC pull in `data/gsc/snapshot-2026-08-13.md`.
>
> **Baseline to measure against:** `/france` averaged position 74.8 on 258 impressions and
> 0 clicks over 2026-07-15 → 2026-08-11. Re-check ~4 weeks after deploy, judging on clicks.

## Why this rewrite

`/france` averages position **74.8** vs `/canada` 41.8 and `/usa` 13.0. The cause is not page
quality — the page is indexed, canonical is correct, and "France" is already in the title, H1,
meta and intro. The cause is **which queries it gets matched to**:

| Query | Impressions | Position |
| --- | --- | --- |
| développement web sur mesure | 89 | 97.1 |
| développeurs sur mesure | 15 | 79.5 |
| développement web sur-mesure | 9 | 100.1 |
| développeur site e-commerce | 21 | 57.1 |
| développeur web france et budget indicatif | 15 | 77.5 |
| développeurs de sites web hors de france | 3 | **43.3** |
| développeur freelance france | 1 | **24.0** |

113 of 197 visible impressions (57%) are three spellings of *"développement web sur mesure"*,
ranking 79–100. That single cluster drags the average down. Where the page surfaces on
France-qualified or offshore-intent queries it ranks **24–43** — in line with `/canada`.

**Root cause is search behaviour, not the page.** French users don't type "France" into queries —
they're in France, it's the default — so they search generic national head terms where the page
competes with every French agency. Quebecers *do* add "canada"/"québec"/"montréal" to escape
France-dominated results, which is why `/canada` gets cheap geo-qualified impressions.

**Strategy: stop competing for the generic head term. Own the offshore/externalisation angle**,
which is exactly the positioning in root `CLAUDE.md` §12 but which the page currently never
verbalises. `développeurs de sites web hors de france` already ranks 43 with zero targeting.

## Keyword targets (revised)

**Primary (new focus)**
- externaliser création site web
- développeur web hors de France / à l'étranger
- développeur web freelance pas cher France
- faire faire son site web à l'étranger

**Secondary — city-qualified** (`artisan développeur freelance paris` already shows at pos 76)
- développeur web freelance Paris / Lyon / Marseille / Bordeaux / Toulouse

**Secondary — budget intent** (`développeur web france et budget indicatif`, 15 impressions)
- prix site web France freelance, budget création site internet, tarif développeur web France

**Keep** — diaspora/MRE: créer site web MRE France, développeur web marocain France

**Drop from the `keywords` field** — `développement web sur mesure` and variants. Unwinnable, and
they are what's poisoning the average position.

---

## Proposed copy

### Meta title (57 chars)
```
Développeur Web Freelance pour la France — dès 199 €
```

### Meta description (158 chars)
```
Externalisez la création de votre site web : développeur freelance basé au Maroc, site dès 199 €,
même fuseau horaire, paiement après livraison. Devis gratuit 24h.
```

### H1
```
Externaliser la Création de Votre Site Web — Développeur Freelance pour la France
```

*Alternative if "externaliser" feels too corporate:*
`Créer Votre Site Web hors de France — Développeur Freelance à Distance`

### Hero sub
```
Je crée votre site web professionnel depuis le Maroc, pour vos clients en France. Même fuseau
horaire, contact direct avec le développeur, et un budget 3 à 5 fois inférieur à une agence
française. Devis gratuit sous 24h.
```

### Intro (first 100 words carry the primary keyword)

1. Faire créer son site web hors de France n'a plus rien à voir avec la sous-traitance low-cost
   d'il y a dix ans. Je suis développeur web freelance basé au Maroc, et je crée des sites sur
   mesure pour des entrepreneurs français et des Marocains résidant en France (MRE) — directement,
   sans agence et sans intermédiaire.

2. Externaliser, ici, veut simplement dire que vous ne payez pas les charges d'une agence
   parisienne. Même stack technique (React, WordPress, WooCommerce), même exigence de qualité,
   mais un devis 3 à 5 fois moins élevé — et vous ne réglez qu'après la livraison.

3. Le décalage horaire ne joue pas contre vous : le Maroc est à ±1h de la France. On échange en
   direct sur WhatsApp ou en visio, aux heures qui vous arrangent, en français, avec le développeur
   qui code réellement votre site. Livraison en 7 à 10 jours.

### New section — "Pourquoi externaliser la création de votre site web ?"

> This is the section that targets the offshore query cluster. It does not exist on the page today.

Trois raisons reviennent chez mes clients français :

- **Le budget.** Une agence parisienne facture un site vitrine 3 000 à 8 000 €. Le même site,
  livré avec la même stack, démarre chez moi à 199 €. Vous payez le travail, pas les bureaux ni
  les commerciaux.
- **La lenteur.** Un projet d'agence prend 2 à 4 mois entre les allers-retours et les validations
  internes. Je livre un site vitrine en 7 à 10 jours parce qu'il n'y a personne entre vous et moi.
- **L'interlocuteur.** En agence, vous parlez à un chef de projet qui transmet. Ici, vous parlez au
  développeur. Les réponses sont techniques, immédiates et sans déformation.

Et les objections légitimes, traitées franchement : je facture en euros, vous payez par virement
(IBAN), Wise ou PayPal, **après** livraison — zéro acompte. Le site vous appartient entièrement,
code et accès compris.

### City paragraph (new — captures "développeur freelance paris/lyon/marseille")

Je travaille avec des clients partout en France : Paris, Lyon, Marseille, Bordeaux, Toulouse,
Lille ou Nantes. Comme tout se fait à distance et en français, votre ville ne change rien au délai
ni au tarif — pas de frais de déplacement, pas de rendez-vous à caler trois semaines à l'avance.

### Budget section (new — captures "budget indicatif" intent)

**Budget indicatif pour un site web en France**

| Type de site | Agence française | Chez moi | Délai |
| --- | --- | --- | --- |
| Site vitrine (5–10 pages) | 3 000 – 8 000 € | **dès 199 €** | 7–10 jours |
| Site e-commerce | 8 000 – 20 000 € | **dès 299 €** | 2–3 semaines |
| Application web sur mesure | 15 000 € et + | sur devis | selon le cahier des charges |

Devis fixe sous 24h : le prix annoncé est le prix final, aucun supplément en cours de projet.

**CTA:** Demandez votre devis gratuit

### FAQ — add these three

- **Est-ce risqué de faire créer son site web à l'étranger ?**
  Le risque habituel, c'est de payer d'avance et de ne pas être livré. Je fonctionne à l'inverse :
  vous validez la maquette, puis le site, et vous ne payez qu'après la mise en ligne. Le code et
  les accès vous appartiennent dès la livraison.

- **Combien coûte un site web pour une entreprise française ?**
  Un site vitrine professionnel démarre à 199 € et un e-commerce à 299 €, contre 3 000 à 8 000 €
  en agence française pour un résultat équivalent. Vous recevez un devis fixe sous 24h.

- **Travaillez-vous avec des clients à Paris, Lyon ou Marseille ?**
  Oui, partout en France. Tout se fait à distance : WhatsApp, e-mail et visio, aux heures
  françaises. Aucun frais de déplacement, aucun délai supplémentaire lié à votre ville.

**Keep the existing 5 FAQ entries** — they already cover remote working, pricing vs agencies,
payment methods, French language, and the "comment créer un site web" phrasing.

---

## Voice check

- First person singular throughout, no "nous" / "notre équipe" ✓
- "Devis gratuit sous 24h" present ✓
- Differentiator phrases used: *vous parlez directement avec le développeur*, *pas d'intermédiaire,
  pas d'agence*, *qualité agence, prix freelance*, *livraison en 7 à 10 jours* ✓
- No unverifiable superlatives, no "solution innovante" filler ✓
- Prices in € as required by root `CLAUDE.md` §12 ✓

## Implementation notes

- Apply to `src/data/marketConfig.js` → `france` key. `/canada` and `/usa` are **not** touched by
  this draft; the same offshore treatment may suit them but the data doesn't yet justify it.
- Slug stays `/france` — never change a live slug.
- **Done:** the config gained three optional keys — `offshore` (title/lead/bullets/closing),
  `cities` (string) and `budget` (title/headers/rows/note). `MarketPage.jsx` renders each only
  when present, so `/canada` and `/usa` are structurally unchanged (verified in the prerendered
  HTML). The budget table reuses the existing `.compare-table` / `.compare-me` markup from
  `CasablancaPage.jsx` rather than introducing new CSS.
- If `/canada` or `/usa` later warrant the same treatment, add the same three keys to their config
  entries — no renderer changes needed.
- Re-run `node sitemap-generator.js` is **not** needed — no new URL.
- Expect the average position to *drop further before it improves*: shedding the generic head-term
  impressions removes 113 low-ranking impressions, so the average will move toward the 24–43 band
  as the offshore terms take over. Judge this on clicks, not average position.
