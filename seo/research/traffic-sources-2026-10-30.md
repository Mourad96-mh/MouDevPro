# Where the contacts come from — 2026-10-30

> Sources: leads Sheet "OCT moudev" (350 WhatsApp/phone clicks, 2026-07-13 → 10-30,
> `../../data/leads/leads-aggregate-2026-10-30.csv`), Search Console (`../../data/gsc/monthly-and-pages-2026-10-30.md`),
> GA4 (`../../data/ga4/channels-2026-10-30.md`, data only since 10-18).
> A "contact" = a click on the WhatsApp or phone button, not a confirmed conversation.

## Mix

| Source | Contacts | Share |
| --- | --- | --- |
| Google Ads (gclid + iOS) | 271 | 77% |
| Untagged (Google organic, direct, Maps, social…) | 52 | 15% |
| ChatGPT (`utm_source=chatgpt.com`) | 25 | 7% |
| trouverunexpertdigital.ma | 2 | <1% |

| Month | Ads | Untagged | ChatGPT | Other |
| --- | --- | --- | --- | --- |
| Jul (from 13th) | 44 | 6 | — | — |
| Aug | 77 | 7 | 5 | — |
| Sep | 74 | 25 | 15 | — |
| Oct | 76 | 14 | 5 | 2 |

330 WhatsApp, 20 phone.

## Findings

1. **Ads carry the business:** 3 contacts out of 4, steady ~75/month. /casablanca and /rabat are almost
   100% paid.
2. **ChatGPT is the best free channel per visit.** 25 contacts, 15 of them in September. GA4 shows few
   sessions (7 in 12 days) but high engagement. The stats article (position ~5 in GSC) is the likely
   citation source.
3. **The homepage is the organic entry point:** 30 of its 55 contacts are non-paid. In October it ranks
   #1.15 for "creation site web casablanca" (241 impressions) but gets 2 clicks (0.8% CTR). The paid ad
   and the map pack above it take the click.
4. **Organic fell in October:** GSC clicks 70 → 45 (−36%), non-paid contacts 40 → 21. Homepage 23 → 13 clicks,
   brand "moudev" 4 → 2, zero clicks 10-07 → 10-11, average position slipping late in the month. No site
   deploy matches those dates. Watch it through November.
5. **/ecommerce is the second organic page** (12 clicks, 1 778 impressions) but at position 26, so getting
   it onto page 1 is the clearest SEO quick win.
6. Free pages with contacts and no ads: /ecommerce, /ar, /canada, /usa, /developpeur-web-freelance-maroc.

## Measurement gaps

| Gap | Fix |
| --- | --- |
| Sheet doesn't store `document.referrer`, so the 52 untagged contacts can't be split | add a `referrer` column (trackLead.js + Code.gs HEADERS) |
| GA4 Direct = 51 sessions at 22% engagement, likely the owner's own visits | GA4 internal-traffic IP filter |
| URLs with and without trailing slash (`/casablanca/` = 71 Sheet rows; GSC duplicates) | 301 slash → no slash in `.htaccess` (see `page-audits/_technical-trailing-slash.md`) |
| GA4 only since 10-18 | nothing to do; history builds up |

## Next actions (proposed 10-30)
1. `referrer` column in the Sheet. 2. Trailing-slash 301. 3. Internal-traffic filter in GA4.
4. /ecommerce to page 1 (content + internal links). 5. Keep feeding AI assistants (stats article refresh, FAQs, citations).
