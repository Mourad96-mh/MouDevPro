# Bidding strategy per campaign — 2026-10-30

> Source: Google Ads API (read-only). Campaign settings, `campaign_simulation` (TARGET_CPA and BUDGET,
> week 2026-10-20 → 10-26), weekly performance 2026-08-31 → 10-29, conversion actions.
> Conversions = "Contact-from-moudev" (WhatsApp + phone clicks). OCI qualified leads were recreated on
> 10-30 and have no data yet.

## Settings at the time

| Campaign | Strategy | Target / cap | Budget/day | 30-day CPA | Impr. share | Lost (rank) | Lost (budget) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Creation-site-web (Casablanca) | Maximize conversions | tCPA 100 | 400 | 94 | 64% | 36% | 0% |
| creation-site-web-rabat | Maximize conversions | tCPA 60 | 200 | 46 | 65% | 35% | 0% |
| google-ads-casa | Maximize clicks | CPC cap 6 | 60 | 33 | 32% | 68% | 0% |

## Casablanca — keep 100, then lower

Google's tCPA simulation (one week):

| Target CPA | Conversions | Spend | Real CPA |
| --- | --- | --- | --- |
| 41 | 5.3 | 401 | 76 |
| 90 | 7.1 | 824 | 116 |
| 900 | 8.3 | 2 231 | 269 |

Going from 41 to 90 buys +1.8 conversions for +423 MAD, so **about 235 MAD per extra conversion**.
Casablanca is at its ceiling. Weekly CPA swings between 68 and 151.
**Decision:** no change while the 10-30 changes settle; 11-13 → 85 if CPA ≤ 100; later 75 if volume holds.
This reverses the 10-29 audit's idea of raising it to 110.

## Rabat — 60 → 70

| Target CPA | Conversions/week | Spend/week | Cost per extra conversion |
| --- | --- | --- | --- |
| 60 | 7.1 | 300 | — |
| ~70 | ~7.7 | ~380 | ~130 |
| ~90 | ~8.1 | ~480 | ~200 |

More headroom than Casablanca. Salé + Témara (added 10-30) add volume for free.
**Decision:** 11-06 → 70 if the new ad is stable. No higher until OCI data exists.

## google-ads-casa — keep Maximize clicks, cap 6 → 8

Budget simulation (one week): 29/day → 6.8 conv / 191 MAD · **60/day → 9.0 conv / 384 MAD** ·
109/day → 11.0 conv / 705 MAD. The campaign actually spent ~16/day because it was paused by hand
twice a day. With the 07:00–24:00 schedule (10-30), expect spend to rise to ~55/day.
Auction insights confirm the cap is too low: technopek / digitalisq / mediazain rank above it 80–85% of the time.
**Decision:** cap 6 → 8 (11-06, or earlier if approved); switch to Maximize conversions, tCPA ~45,
after ~15 conversions in 30 days. Open question for Mourad: keep budget 60/day or lower it to 30.

## Desktop

Stays at −100% on the website campaigns. Leads come from WhatsApp/phone (mobile), so the old argument
that desktop form leads were invisible no longer applies.
