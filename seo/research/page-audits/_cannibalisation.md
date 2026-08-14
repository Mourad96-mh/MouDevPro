# Keyword cannibalisation — three clusters

Where several pages compete for one query, Google splits link equity and relevance signals between
them and usually ranks all of them worse than one consolidated page would rank. Three clusters are
active on this site.

---

## Cluster 1 — `développeur web freelance maroc` (and spelling variants)

**Seven pages compete. Best position is 26.95. Nothing reaches page 1.**

| Page | Impressions | Position | Should it rank? |
| --- | --- | --- | --- |
| `/blog/freelance-creation-site-web-maroc` | 22 | **26.95** | supporting only |
| `/blog/choisir-developpeur-web-freelance-maroc` | 45 | 31.96 | supporting only |
| `/developpeur-web-freelance-maroc` | 45 | 36.78 | **yes — this is the money page** |
| `/about` | 7 | 39.14 | no |
| `/` | 34 | 44.47 | secondary at most |
| `/casablanca` | 13 | 51.62 | no |
| `/services` | 1 | 134 | no |

Related variants scatter the same way: `développeur web freelance` (26 on the money page at 35.58,
30 on the homepage at 37.90, 9 on `/canada` at 82.89), `developpeur web freelance` (21 at 24.24,
10 at 34.10), `développeur freelance casablanca` (53 on `/casablanca` at 24.40, 21 at 30.95, and
**`/about` at 13.83 — outranking both money pages**).

The page named after the keyword is the *third-best* of its own siblings, and the About page beats
the Casablanca page on a Casablanca freelance query. That is the signature of an unconsolidated
cluster.

**Fix:**
1. Make `/developpeur-web-freelance-maroc` the single canonical target. It is already the correct
   page by name and slug.
2. Point the two blog posts at it with keyword-rich internal links (`style-guide.md` §6 requires
   money pages to receive links from page-1 blog posts). Those posts should support, not compete —
   their own topic angles ("comment choisir", "freelance vs agence") are fine, but their H1 and
   title should not duplicate the money page's exact keyword.
3. Remove the keyword from `/about` and `/services` targeting. `/about` ranking 13.83 for
   `développeur freelance casablanca` suggests it has more topical authority than intended.
4. Decide whether the homepage should compete here at all. It already owns
   `création site web casablanca` at #1; asking it to also own the national freelance term splits
   its own focus.

---

## Cluster 2 — `création site web casablanca`

**The dedicated city page does not rank for its own primary keyword.**

| Page | Impressions | Position |
| --- | --- | --- |
| `/` | 196 (+111 unaccented) | **1.42 / 1.01** |
| `/blog/creation-site-web-casablanca` | 80 (+57 unaccented) | 17.45 / 20.04 |
| `/casablanca` | — | **absent** |

This one is unusual: the cannibalisation has already resolved itself in the homepage's favour, and
the homepage is at #1. The problem is that **`/casablanca` is the Google Ads landing page for this
exact keyword** (root `CLAUDE.md` §11) while being organically invisible for it.

**Fix — this is a decision, not a mechanical change:**

- **Option A (recommended): leave organic alone.** The homepage ranks #1; do not disturb it. Accept
  that `/casablanca` serves paid traffic and `/` serves organic. Retarget `/casablanca` at the
  terms it actually wins — `développeur freelance casablanca` (53 impressions, position 24.40) and
  `développeur web casablanca` (14, 36.43) — which are its own §5.1 targets anyway.
- **Option B: consolidate onto `/casablanca`.** Cleaner in theory, but it means deliberately
  displacing a #1 ranking and hoping the city page inherits it. High risk, no upside — the
  homepage already converts this term as well as it is going to until the CTR issue is solved.

Do not pursue B without a strong reason.

The blog post at 17.45 adds 137 impressions but no clicks and is not harming the homepage. Leave
it; just ensure it links up to `/casablanca` with a keyword-rich anchor.

---

## Cluster 3 — Riad / Marrakech

**The blog post outranks the city pages by ~27 positions on their own tourism keywords.**

| Query | `/blog/site-web-hotel-riad-marrakech` | `/marrakech` | `/en/marrakech/` |
| --- | --- | --- | --- |
| web design riad marrakech english | **2.12** | 31.53 | — |
| site vitrine riad marrakech | **2.17** | 29.29 | — |
| riad website design morocco | **3.27** | 31.17 | — |
| création site pour riad ou hôtel marrakech | **2.75** | — | — |
| morocco riad website builder | **6.24** | 30.80 | 43.90 |
| création site web riad marrakech | 16.21 | 29.33 | 86.67 |
| create website guesthouse morocco | — | **14.64** | 66.67 |

`site web riad marrakech`, `riad website marrakech` and `hotel website design morocco` are all
explicit §5.1/§5.2 targets for `/marrakech`. The blog post owns them at positions 2–6; the city
page trails at 29–31.

**Fix:**
1. **Do not fight the blog post — it is winning.** It holds positions 2–3 on the exact target
   terms. Displacing it in favour of the city page risks losing top-3 rankings for nothing.
2. **The real problem is that it earns zero clicks** at those positions. Solve that first — see
   [`blog-site-web-hotel-riad-marrakech.md`](blog-site-web-hotel-riad-marrakech.md). A top-3
   ranking converting at 0% is worth more attention than the ranking split.
3. Make the blog post link prominently to `/marrakech` with a keyword-rich anchor so the traffic it
   does earn flows to the money page.
4. Retarget `/marrakech` at terms the blog post does *not* hold — `create website guesthouse
   morocco` (position 14.64, its best) and booking/réservation angles per §6 of root `CLAUDE.md`.

---

## Priority

Cluster 1 is the only one causing pure loss — seven pages, none on page 1. Fix it first.

Cluster 2 is already resolved in practice; it needs a decision recorded, not work.

Cluster 3 looks bad on paper but the winning page is at position 2. Its CTR problem matters far
more than its cannibalisation.
