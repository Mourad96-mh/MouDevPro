"""Generate the Google Ads action plans as .docx.

Run:  python ads/generate-plans.py
Data: read-only GAQL pull of customer 5280469672, window 2026-07-15..2026-08-11
      (8-week trend 2026-06-15..08-11). Raw exports in data/ads/.

Regenerate after each new pull so the documents never drift from the data.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from docx import Doc, CRIT, GOOD, WARN, MUTED, CRIT_FILL, GOOD_FILL  # noqa: E402

OUT = os.path.dirname(os.path.abspath(__file__))
WINDOW = "2026-07-15 → 2026-08-11 (28 days)"
PULLED = "Pulled 2026-08-14 · customer 5280469672 · MAD · Africa/Casablanca"

B = {"b": True}
R = {"color": CRIT}
RB = {"b": True, "color": CRIT}
G = {"color": GOOD}
M = {"color": MUTED}
MONO = {"mono": True}


def plan_step(d, n, action, where, why, verify):
    d.numbered(n, [(action, B)])
    d.bullet([("Where: ", {"b": True, "color": MUTED}), where], level=1)
    d.bullet([("Why: ", {"b": True, "color": MUTED}), why], level=1)
    d.bullet([("Check it worked: ", {"b": True, "color": MUTED}), verify], level=1)


def footer(d):
    d.h1("How this was produced")
    d.p([
        "Every figure comes from read-only ", ("SELECT", MONO),
        " queries against the Google Ads API. Nothing in the account was modified. "
        "The reproducible queries are documented in ", ("data/README.md", MONO), "."
    ])
    d.p([
        ("Two limits worth knowing. ", B),
        "Search-term data covers 3 534 MAD of the 5 144 MAD spent (69%) — Google withholds "
        "rare queries, so every waste figure here is a floor, not a total. And Auction "
        "Insights (who else bids against you) is not exposed by the API at any version; it "
        "has to be exported from the Ads interface by hand.",
    ])


# ─────────────────────────────────────────────────────────────────────────────
# 00 — account overview
# ─────────────────────────────────────────────────────────────────────────────
def account_doc():
    d = Doc()
    d.title("Google Ads — account plan",
            f"Cross-campaign issues and running order · {WINDOW} · {PULLED}")

    d.p([
        "Three problems sit above the individual campaigns. They affect all of them, and two "
        "of them make campaign-level tuning meaningless until they are resolved — one because "
        "the bid model is never allowed to settle, the other because the number it optimises "
        "toward may not mean what it appears to. ",
        ("Do this document first.", B),
    ])

    d.h1("Account at a glance")
    d.table(
        ["Campaign", "Status", "Budget/day", "28d spend", "Conv", "CPA", "Avg CPC"],
        [
            ["Creation-site-web", "enabled", "400", "4 272", "31", ("137.79", RB), ("20.24", R)],
            ["creation-site-web-rabat", "enabled", "150", "713", "23", ("30.99", G), "9.90"],
            ["creation-website-marrakech", ("paused", R), "150", "159", "5", ("31.84", G), "6.63"],
            ["creation site web (PMax)", ("paused", M), "157", "0", "0", "—", "—"],
        ],
        widths=[26, 11, 12, 12, 8, 12, 12],
        fills={0: CRIT_FILL},
    )
    d.p([
        ("The Casablanca campaign costs 4.4× more per conversion than the other two", B),
        ", and holds 2.7× the budget. That is the single clearest imbalance in the account.",
    ])

    d.h1("Problem 1 — the campaigns are restarted by hand twice a day")
    d.p([
        "Change history for the last 27 days holds ", ("52 campaign status changes", B),
        ", 55 events in total from the Google Ads mobile app, in a daily cycle at roughly "
        "00:30 and 08:40:",
    ])
    d.mono(
        "2026-08-11 08:48  Creation-site-web + rabat   status\n"
        "2026-08-11 01:05  Creation-site-web + rabat   status\n"
        "2026-08-10 08:50  Creation-site-web + rabat   status\n"
        "2026-08-10 00:10  Creation-site-web + rabat   status\n"
        "   ... the same two events daily, back to 2026-07-31"
    )
    d.p([
        "All three campaigns use ", ("MAXIMIZE_CONVERSIONS", MONO),
        ". Smart Bidding models each auction from recent, continuous delivery. Stopping and "
        "restarting daily denies it that continuity — it is one of the most damaging things "
        "you can do to an automated bid strategy. On 6 August a target CPA was also changed "
        "mid-blowout, adding more churn on top.",
    ])
    d.p([("The hours being switched off are the cheap ones:", B)])
    d.mono(
        "22:00 - 06:59     50 clicks     574 MAD    10.0 conv    CPA  57.41\n"
        "07:00 - 21:59    257 clicks   4 570 MAD    49.0 conv    CPA  93.26\n\n"
        "hour 01  CPA   3.99          hour 09  CPA  294.83\n"
        "hour 23  CPA  39.34          hour 14  CPA  171.61\n"
        "hour 22  CPA  57.07          hour 16  CPA  140.83"
    )
    d.p([
        "Conversions arrive overnight at roughly 60% of the daytime cost. The manual pause "
        "suppresses the most efficient window in the account and pays a learning-phase "
        "penalty for it.",
    ])
    plan_step(
        d, 1, "Stop pausing campaigns by hand. Use an ad schedule instead.",
        "Campaign → Settings → Ad schedule.",
        "A schedule restricts hours without interrupting delivery or resetting the bid model. "
        "If the aim is cost control, that is a budget setting, not a status toggle.",
        "Change history shows no CAMPAIGN status events for 14 consecutive days.",
    )
    plan_step(
        d, 2, "Then change nothing else for 14 days.",
        "—",
        "Smart Bidding cannot be judged while it is being restarted. No bidding conclusion "
        "is trustworthy until delivery has been continuous for two weeks.",
        "CPC and CPA stop swinging week to week.",
    )

    d.h2("And Google is changing the account by itself")
    d.p([
        "The same change history carries a row that was not made by you at all. Read the "
        "client column:",
    ])
    d.mono(
        "2026-08-06 21:37:25   Creation-site-web   CAMPAIGN   UPDATE\n"
        "    GOOGLE_ADS_RECOMMENDATIONS    maximizeConversions.targetCpaMicros"
    )
    d.p([
        ("Auto-apply recommendations is switched on", B),
        ", and Google set a target CPA on your worst-performing campaign during the week its "
        "cost per click tripled. Separately, ", ("86 of the 150 change events", B),
        " are ", ("ASSET / CREATE", MONO), " from ", ("INTERNAL_TOOL", MONO),
        " — automatically created ad assets, also written by Google rather than by you.",
    ])
    d.p([
        "Neither is necessarily harmful. But both mean the account changes without anyone "
        "deciding to change it, which makes any before-and-after measurement unreliable — "
        "and auto-generated ad copy can drift into the agency register your content rules "
        "specifically forbid.",
    ])
    plan_step(
        d, 3, "Review auto-apply recommendations and turn off the bidding-related ones.",
        "Recommendations → the three-dot menu → Auto-apply settings.",
        "A target CPA applied automatically to a campaign you are trying to diagnose makes "
        "the diagnosis impossible. Keep whichever suggestions you want to review by hand; "
        "switch off anything that changes bids, budgets or targeting on its own.",
        "Change history shows no further GOOGLE_ADS_RECOMMENDATIONS rows.",
    )
    plan_step(
        d, 4, "Read what the auto-created assets actually say.",
        "Campaign → Assets → check the automatically created headlines and descriptions.",
        "Ad strength is GOOD across all three campaigns, so nothing is broken. But 86 assets "
        "were written without review, and your content rules forbid 'nous', agency framing "
        "and unverifiable superlatives.",
        "Anything off-voice is removed, or automatically created assets is switched off.",
    )

    d.h1("Problem 2 — the conversion signal may be counting the wrong event")
    d.p([
        "Bidding chases whatever the conversion action counts. Only one action is enabled, "
        "and both actions describing a real lead are removed:",
    ])
    d.table(
        ["Conversion action", "Type", "Category", "Status"],
        [
            ["Contact-from-moudev", "WEBPAGE", "CONTACT", ("ENABLED", {"b": True, "color": GOOD})],
            ["Lead Qualifié (OCI)", "UPLOAD_CLICKS", "QUALIFIED_LEAD", ("REMOVED", RB)],
            ["Submit lead form", "WEBPAGE", "SUBMIT_LEAD_FORM", ("REMOVED", RB)],
            ["Contact", "WEBPAGE_CODELESS", "CONTACT", ("REMOVED", RB)],
        ],
        widths=[30, 22, 26, 22],
    )
    d.p([
        "59 conversions on 307 clicks is a ", ("19.2% conversion rate", B),
        " — very high for cold paid search on commercial terms. The enabled action is type ",
        ("WEBPAGE", MONO), " in the ", ("CONTACT", MONO),
        " category, which is consistent with firing when someone reaches the contact page "
        "rather than when they submit the form. The API cannot tell which.",
    ])
    plan_step(
        d, 5, "Answer: did roughly 59 quote requests actually arrive between 15 July and 11 August?",
        "Your inbox / WhatsApp / the leads sheet.",
        "If the real number is far lower, the action counts page views, the bidding has "
        "trained on that for weeks, and it explains the 20 MAD CPC in the Casablanca campaign.",
        "The count you can verify matches, or does not, what Ads reports.",
    )
    plan_step(
        d, 6, "Restore the Lead Qualifié (OCI) conversion action.",
        "Tools → Conversions.",
        "It was built in July and is the only signal that teaches the algorithm which leads "
        "are actually worth having, rather than which clicks reach a page.",
        "The action shows ENABLED and starts recording uploads again.",
    )

    d.h1("Problem 3 — the negative keyword list was never applied")
    d.p([
        "There are ", ("no shared negative lists on the account at all", B),
        " — every negative is campaign-level. Against the documented list in ",
        ("data/ads/negative-keywords.md", MONO),
        ", all three campaigns are missing 18 of 23 hard negatives:",
    ])
    d.mono(
        "website builder · best website builder · web creator · website maker\n"
        "site maker · site creator · easy site builder · webflow · no code\n"
        "gratuite · demo · abidjan · dakar · senegal · tunisie · algerie\n"
        "france · paris"
    )
    d.p([("The two most expensive clicks in the window:", B)])
    d.mono(
        "532.16 MAD   website maken gratis    1 click   0 conv   (Dutch, \"free\")\n"
        "198.51 MAD   liveweave               1 click   0 conv   (free code playground)"
    )
    d.p([
        "That is ", ("730 MAD — 14% of the 28-day budget — for two visitors", B),
        " who were never going to hire anyone. Across all search terms, DIY, free and "
        "tool-shopping intent accounts for 1 248 MAD, about 24% of spend.",
    ])
    d.p([
        ("Two contradictions to fix while you are in there. ", B),
        "The word ", ("gratuite", MONO), " is listed as a hard negative in the repo and runs as an ",
        ("active phrase keyword", B), " in the Casablanca campaign, next to ",
        ("créer une landing page gratuite", MONO),
        " — you are paying to reach people searching for free work. And ",
        ("CLAUDE.md", MONO), " §12 states the list blocks France/USA/Canada geo; ",
        ("france", MONO), " and ", ("paris", MONO),
        " are not applied anywhere, so that safeguard does not exist.",
    ])
    plan_step(
        d, 7, "Create one shared negative list and apply it to all three campaigns.",
        "Tools → Shared library → Negative keyword lists → then apply to each campaign.",
        "The repo file already assumes a shared list exists. Campaign-level negatives have "
        "to be maintained three times and drift apart — which is exactly what happened.",
        "Each campaign's negative list shows the shared list attached.",
    )
    plan_step(
        d, 8, "Add the 18 missing terms, plus what this pull surfaced.",
        "The new shared list.",
        "New waste found in this window: gratis, liveweave, opencart, godaddy, google sites, "
        "yolasite. Keep the exceptions the repo file flags — the 'comment créer…' terms do convert.",
        "Re-run the search-terms report in 2 weeks; the DIY bucket should shrink sharply.",
    )
    plan_step(
        d, 9, "Delete the positive keywords 'gratuite' and 'créer une landing page gratuite'.",
        "Creation-site-web → Keywords.",
        "You sell sites from 2 000 MAD. Bidding on 'free' buys the one visitor guaranteed "
        "not to buy.",
        "Neither keyword appears in the keyword list.",
    )

    d.h1("Running order across the whole account")
    for i, (what, why) in enumerate([
        ("Stop the twice-daily pausing (Problem 1).",
         "Nothing about bidding can be measured until delivery is continuous."),
        ("Turn off auto-apply for anything that changes bids or budgets.",
         "Google set a target CPA by itself on 6 August. A campaign that changes on its own "
         "cannot be diagnosed."),
        ("Verify the conversion action (Problem 2).",
         "Decides whether the signal driving all bidding is real."),
        ("Build and apply the shared negative list (Problem 3).",
         "Fastest payback — stops roughly a quarter of spend leaking."),
        ("Fix Marrakech's landing page, then re-enable it.",
         "It is paused, so free to fix, and it converts at 32 MAD when running."),
        ("Split the Casablanca campaign's ad groups by intent.",
         "The real Quality Score fix and the largest single piece of work."),
        ("Export Auction Insights for the competitor picture.",
         "The only part the API cannot reach."),
        ("After 14 stable days, re-measure and rebalance budget.",
         "Rebalancing before bidding settles just moves the instability around."),
    ], start=1):
        d.numbered(i, [(what, B)])
        d.bullet([(why, M)], level=1)

    d.h1("A weekly routine worth keeping")
    d.bullet(["Check the search-terms report and add negatives — 10 minutes, highest return."])
    d.bullet(["Check that no campaign status changed unless you meant it."])
    d.bullet(["Compare conversions reported in Ads against real quote requests received."])
    d.bullet(["Once a month: re-pull Quality Score and check landing-page experience is improving."])

    footer(d)
    d.save(os.path.join(OUT, "00-account-plan.docx"))


# ─────────────────────────────────────────────────────────────────────────────
# Per-campaign documents
# ─────────────────────────────────────────────────────────────────────────────
def casablanca_doc():
    d = Doc()
    d.title("Campaign — Creation-site-web (Casablanca)",
            f"Analysis and action plan · {WINDOW} · {PULLED}")

    d.h1("Snapshot")
    d.table(
        ["Metric", "Value", "Read"],
        [
            ["Status", "Enabled", ""],
            ["Daily budget", "400 MAD", "38% used — not budget-limited"],
            ["Bid strategy", "Maximize conversions", "Being reset daily — see account plan"],
            ["Geo target", "Casablanca (city only)", "Excludes Rabat + Marrakesh"],
            ["Landing page", "/casablanca", "One page for all 31 keywords"],
            ["Spend (28d)", "4 271.63 MAD", "83% of the whole account"],
            ["Clicks / conv", "211 / 31", ""],
            ["CPA", ("137.79 MAD", RB), "4.4× the other two campaigns"],
            ["Avg CPC", ("20.24 MAD", RB), "2× Rabat"],
            ["Impression share", "65.9%", "33.7% lost to rank, 0.4% to budget"],
            ["Absolute top IS", "39.1%", "Wins first position 59% of the time it shows"],
            ["Weighted Quality Score", "5.84", ""],
        ],
        widths=[24, 24, 52],
        fills={7: CRIT_FILL, 8: CRIT_FILL},
    )

    d.h1("What is wrong")

    d.h2("1. One keyword carries 63% of the campaign and pulls the junk")
    d.mono(
        "creation site internet   PHRASE   QS 5   expected CTR BELOW AVERAGE\n"
        "   2 683.28 MAD   1 283 impr   129 clicks   17.0 conv   CPA 157.84"
    )
    d.p([
        "It is generic and carries no geography, no service and no intent. It is what let ",
        ("website maken gratis", MONO), " (532 MAD) and ", ("liveweave", MONO),
        " (198 MAD) into the account. Its expected CTR is already rated below average, which "
        "means Google itself thinks the match is weak.",
    ])
    d.p([
        "It does convert — 17 conversions — so this is not a delete. It is a keyword that "
        "needs tight negatives around it, and it should not be sharing an ad group with "
        "Casablanca city terms.",
    ])

    d.h2("2. Seven keywords are rated BELOW AVERAGE on landing page experience")
    d.p([
        "Ad relevance is ", ("above average on 100% of spend", {"b": True, "color": GOOD}),
        ". The ads are not the problem. Landing page experience is below average on 22% of "
        "spend, and every one of those keywords wants a page other than ", ("/casablanca", MONO), ":",
    ])
    d.table(
        ["Keyword", "QS", "Landing page", "Should point at"],
        [
            [("prix site web maroc", MONO), "7", ("BELOW", R), "/tarifs"],
            [("devis site web maroc", MONO), "7", ("BELOW", R), "/tarifs"],
            [("freelance developpeur web", MONO), "7", ("BELOW", R), "/developpeur-web-freelance-maroc"],
            [("site web de l entreprise", MONO), "7", ("BELOW", R), "/services"],
            [("développeur web casablanca", MONO), "5", ("BELOW", R), "/casablanca (ok)"],
            [("creation site web maroc", MONO), "5", ("BELOW", R), "national campaign"],
            [("création site web maroc", MONO), "5", ("BELOW", R), "national campaign"],
        ],
        widths=[34, 8, 18, 40],
    )
    d.p([
        "This is the root cause of the lost impression share. Because the loss is to rank "
        "and not to budget, better Quality Score buys back visibility ",
        ("at the same spend", B), ".",
    ])

    d.h2("3. National keywords are trapped in a city-only campaign")
    d.p([
        "The campaign targets Casablanca city. But it holds ", ("creation site web maroc", MONO),
        ", ", ("prix site web maroc", MONO), ", ", ("devis site web maroc", MONO), ", ",
        ("web developer morocco", MONO), ", ", ("website design morocco", MONO), ", ",
        ("site web PME Maroc", MONO), " and ", ("developer site web maroc", MONO),
        ". Someone in Tangier, Agadir or Fès searching those never sees you — while the "
        "keywords still drag Quality Score by pointing at a city page.",
    ])

    d.h2("4. Money on keywords with no Quality Score at all")
    d.mono(
        "conception des sites web              125.93 MAD   8 clicks   0 conv\n"
        "creation site e-commerce casablanca    56.78 MAD   1 click    0 conv\n"
        "entreprise de conception de site web   26.74 MAD   2 clicks   0 conv"
    )
    d.p([
        "No Quality Score means too little history for Google to rate them. ",
        ("conception des sites web", MONO),
        " has spent 126 MAD across three campaigns for zero conversions.",
    ])

    d.h1("Quality Score, keyword by keyword")
    d.table(
        ["Keyword", "Match", "QS", "Ad rel.", "Landing", "Exp. CTR", "Cost", "Conv"],
        [
            [("creation site internet", MONO), "PHR", "5", "above", "avg", ("BELOW", R), "2 683.28", "17.0"],
            [("creation site e-commerce", MONO), "PHR", ("8", G), "above", "avg", "above", "530.29", "3.0"],
            [("creation de site web", MONO), "EXA", ("8", G), "above", "avg", "above", "428.30", "6.0"],
            [("conception des sites web", MONO), "EXA", "–", "–", "–", "–", "125.93", "0.0"],
            [("prix site web maroc", MONO), "EXA", "7", "above", ("BELOW", R), "above", "103.33", "0.0"],
            [("freelance developpeur web", MONO), "EXA", "7", "above", ("BELOW", R), "above", "77.03", "0.0"],
            [("développeur web casablanca", MONO), "PHR", "5", "above", ("BELOW", R), "avg", "72.94", "2.0"],
            [("creation site e-commerce casablanca", MONO), "PHR", "–", "–", "–", "–", "56.78", "0.0"],
            [("site web de l entreprise", MONO), "EXA", "7", "above", ("BELOW", R), "above", "42.62", "0.0"],
            [("web developer morocco", MONO), "PHR", "7", "above", "avg", "avg", "39.29", "1.0"],
            [("prix site web casablanca", MONO), "PHR", "–", "–", "–", "–", "36.24", "1.0"],
            [("création site web maroc", MONO), "EXA", "5", "above", ("BELOW", R), "avg", "34.81", "0.0"],
            [("entreprise de conception de site web", MONO), "EXA", "–", "–", "–", "–", "26.74", "0.0"],
            [("creation site web maroc", MONO), "EXA", "5", "above", ("BELOW", R), "avg", "14.04", "1.0"],
            [("en charge de la création d'un site web", MONO), "EXA", ("3", R), ("BELOW", R), ("BELOW", R), "avg", "0.00", "0.0"],
        ],
        widths=[30, 8, 6, 11, 11, 11, 12, 11],
    )
    d.p([
        ("Read it this way: ", B),
        "ad relevance is above average almost everywhere, so the ad copy is working. "
        "Every weak score is either landing page or expected CTR — destination and match, "
        "not creative.",
    ])

    d.h1("The plan")
    plan_step(
        d, 1, "Split this campaign into four ad groups, one per landing page.",
        "Campaign → Ad groups → create three new ones, then move keywords across.",
        "Every keyword currently inherits /casablanca. Matching destination to intent is the "
        "single biggest Quality Score lever available, and it recovers impression share "
        "without more spend.",
        "Landing page experience stops reading BELOW AVERAGE on the moved keywords (allow ~2 weeks).",
    )
    d.bullet([("Ad group 'tarifs' → /tarifs: ", B),
              ("prix site web maroc, devis site web maroc, prix site web casablanca", MONO)], level=1)
    d.bullet([("Ad group 'ecommerce' → /ecommerce: ", B),
              ("creation site e-commerce, creation site e-commerce casablanca, creation site e-commerce maroc", MONO)], level=1)
    d.bullet([("Ad group 'freelance' → /developpeur-web-freelance-maroc: ", B),
              ("freelance developpeur web, developer site web maroc", MONO)], level=1)
    d.bullet([("Ad group 'casablanca' → /casablanca: ", B),
              ("keeps only the Casablanca city terms", MONO)], level=1)
    d.p([
        ("Write one responsive search ad per ad group", B),
        ", using that group's own keyword in a headline. Reusing the current ad across all "
        "four would waste the split.",
    ])

    plan_step(
        d, 2, "Isolate 'creation site internet' in its own ad group with tight negatives.",
        "New ad group, phrase match kept, shared negative list applied.",
        "It is 63% of campaign spend and converts, but it is also the entry point for every "
        "piece of junk traffic. Isolating it means the junk it attracts stops contaminating "
        "the Quality Score of your city and service keywords.",
        "Its search-terms report shows mostly Moroccan commercial intent, not free/DIY.",
    )
    plan_step(
        d, 3, "Pause 'conception des sites web' and 'entreprise de conception de site web'.",
        "Campaign → Keywords.",
        "153 MAD across the account for zero conversions and no Quality Score. Nobody in "
        "Morocco searching to hire phrases it that way.",
        "Spend on both reads zero next month.",
    )
    plan_step(
        d, 4, "Move the national keywords out to their own Morocco-targeted campaign.",
        "New campaign, geo = Morocco, landing pages matched per intent.",
        "They cannot serve outside Casablanca today, so they buy no reach while still "
        "dragging Quality Score against a city page. Either give them national targeting or "
        "remove them.",
        "Impressions appear from cities outside the three you target.",
    )
    plan_step(
        d, 5, "Do not raise this budget. Consider lowering it until CPA recovers.",
        "Campaign → Settings → Budget.",
        "Only 0.4% of impression share is lost to budget — more money buys nothing. The "
        "campaign is losing 33.7% to rank, which is a Quality Score problem, and it converts "
        "at 4.4× the cost of Rabat.",
        "CPA moves toward the 30–60 MAD range the other campaigns achieve.",
    )

    d.h1("What to measure in four weeks")
    d.p([("Baseline to judge against — 28 days to 2026-08-11:", B)])
    d.mono(
        "spend        4 271.63 MAD          CPA              137.79 MAD\n"
        "clicks             211             avg CPC           20.24 MAD\n"
        "conversions         31             weighted QS            5.84\n"
        "impression share 65.9%             lost to rank          33.7%"
    )
    d.p([
        "Judge on ", ("CPA and landing page experience", B),
        ", not on impression share alone — share is expected to rise as a side effect of the "
        "Quality Score work, and rising share at an unchanged CPA would not be a win.",
    ])
    footer(d)
    d.save(os.path.join(OUT, "01-casablanca-plan.docx"))


def rabat_doc():
    d = Doc()
    d.title("Campaign — creation-site-web-rabat",
            f"Analysis and action plan · {WINDOW} · {PULLED}")

    d.h1("Snapshot")
    d.table(
        ["Metric", "Value", "Read"],
        [
            ["Status", "Enabled", ""],
            ["Daily budget", "150 MAD", ("Only 17% used", WARN and {"color": WARN})],
            ["Bid strategy", "Maximize conversions", "Being reset daily — see account plan"],
            ["Geo target", "Rabat (city only)", ""],
            ["Landing page", "/rabat", "Correct"],
            ["Spend (28d)", "712.83 MAD", ""],
            ["Clicks / conv", "72 / 23", ""],
            ["CPA", ("30.99 MAD", {"b": True, "color": GOOD}), "Best in the account"],
            ["Avg CPC", "9.90 MAD", "Half the Casablanca campaign"],
            ["Impression share", "57.0%", "43.0% lost to rank, 0% to budget"],
            ["Absolute top IS", "26.6%", ""],
            ["Weighted Quality Score", "5.43", ""],
        ],
        widths=[24, 24, 52],
        fills={7: GOOD_FILL},
    )
    d.p([
        ("This is the healthiest campaign you have, and it is improving. ", {"b": True, "color": GOOD}),
        "CPA fell across the last three weeks — 35.15 → 29.97 → 18.83 — on a stable CPC. "
        "The plan below is about removing what holds it back, not rebuilding it.",
    ])

    d.h1("What is wrong")

    d.h2("1. The campaign's own core keyword scores worst")
    d.mono(
        "création site web rabat   EXACT   QS 3\n"
        "   ad relevance above · landing page BELOW · expected CTR BELOW\n"
        "   14.49 MAD   11 impr   2 clicks   1.5 conv"
    )
    d.p([
        "The keyword the campaign is named after is rated 3 out of 10, on a page (",
        ("/rabat", MONO), ") that is genuinely about creating websites in Rabat. That "
        "combination — good ad, bad landing page score, bad expected CTR, tiny volume — "
        "usually means too little data rather than a real quality problem. It is worth "
        "watching rather than acting on immediately.",
    ])
    d.p([
        ("One thing does connect to it. ", B),
        "The GSC audit found ", ("/rabat", MONO),
        " sitting at organic position 28 while the thin ", ("/ar/rabat", MONO),
        " page ranks 9.5 — the conclusion there was that the constraint is off-page "
        "authority, not content. The paid data agrees the page itself is not the issue.",
    ])

    d.h2("2. 'agence web rabat' contradicts the positioning")
    d.mono(
        "agence web rabat   EXACT   QS 3\n"
        "   ad relevance above · landing page BELOW · expected CTR BELOW\n"
        "   16.97 MAD   45 impr   3 clicks   1.0 conv"
    )
    d.p([
        "Someone searching for an agency arrives at a page whose central argument is ",
        ("pas d'agence, pas d'intermédiaire", {"i": True}),
        ". Google reads the mismatch and scores the landing page accordingly. It did produce "
        "one conversion, so this is a judgement call rather than an obvious delete.",
    ])

    d.h2("3. Landing page experience is below average on 6 of 11 scored keywords")
    d.p([
        "Including ", ("creation site internet", MONO),
        ", which is 67% of this campaign's spend. Unlike in the Casablanca campaign it "
        "performs well here — 476.41 MAD for 16.5 conversions, a CPA of 28.87 — but it is "
        "still pointing generic national intent at a Rabat city page.",
    ])

    d.h1("Quality Score, keyword by keyword")
    d.table(
        ["Keyword", "Match", "QS", "Ad rel.", "Landing", "Exp. CTR", "Cost", "Conv"],
        [
            [("creation site internet", MONO), "PHR", "5", "above", ("BELOW", R), "avg", "476.41", "16.5"],
            [("creation de site web", MONO), "EXA", "7", "above", ("BELOW", R), "above", "166.70", "3.0"],
            [("agence web rabat", MONO), "EXA", ("3", R), "above", ("BELOW", R), ("BELOW", R), "16.97", "1.0"],
            [("création site web rabat", MONO), "EXA", ("3", R), "above", ("BELOW", R), ("BELOW", R), "14.49", "1.5"],
            [("entreprise création de site internet", MONO), "PHR", "–", "–", "–", "–", "11.75", "0.0"],
            [("devis site web maroc", MONO), "EXA", "–", "–", "–", "–", "10.94", "0.0"],
            [("agence creation de site", MONO), "PHR", "–", "–", "–", "–", "6.75", "0.0"],
            [("creation site web maroc", MONO), "EXA", ("8", G), "above", "avg", "above", "6.36", "1.0"],
            [("freelance developpeur web", MONO), "EXA", "7", "above", ("BELOW", R), "above", "2.45", "0.0"],
            [("web developer rabat", MONO), "PHR", "7", "above", "avg", "avg", "0.00", "0.0"],
            [("prix site web maroc", MONO), "EXA", "7", "above", ("BELOW", R), "above", "0.00", "0.0"],
        ],
        widths=[30, 8, 6, 11, 11, 11, 12, 11],
    )

    d.h1("The plan")
    plan_step(
        d, 1, "Split out a /tarifs ad group.",
        "Campaign → Ad groups → new group pointing at /tarifs.",
        "prix site web maroc, devis site web maroc and prix site web rabat all currently "
        "land on /rabat and all read BELOW AVERAGE on landing page. /tarifs is the page "
        "that answers them.",
        "Landing page experience improves on those keywords within ~2 weeks.",
    )
    plan_step(
        d, 2, "Move 'creation site internet' into its own ad group.",
        "New ad group, same phrase match.",
        "It is 67% of campaign spend at a good CPA, but it is generic national intent "
        "sitting in a Rabat city group. Isolating it protects the city keywords' scores and "
        "lets you write a non-city ad for it.",
        "The Rabat city keywords' landing page score improves once the generic traffic is separated.",
    )
    plan_step(
        d, 3, "Decide on 'agence web rabat' and 'agence creation de site'.",
        "Campaign → Keywords.",
        "Either drop them, or build the freelance-versus-agency comparison page and point "
        "an ad group there. Bidding on the term while contradicting it on arrival is the one "
        "option that cannot work.",
        "Either they are gone, or their landing page score stops reading BELOW AVERAGE.",
    )
    plan_step(
        d, 4, "Leave 'création site web rabat' alone for now; re-check in a month.",
        "—",
        "QS 3 on 11 impressions is not a reliable signal. Acting on it now risks removing "
        "the campaign's most on-target keyword because of a small sample.",
        "Re-pull Quality Score in 4 weeks and see whether it has moved with more data.",
    )
    plan_step(
        d, 5, "After the account is stable for 14 days, give this campaign more budget.",
        "Campaign → Settings → Budget.",
        "It converts at 31 MAD — the best in the account — and uses only 17% of a 150 MAD "
        "budget while losing 43% of impressions to rank. It is the safest place to put money "
        "once bidding has settled and Quality Score work has landed.",
        "Spend rises without CPA rising with it.",
    )

    d.h1("What to measure in four weeks")
    d.p([("Baseline to judge against — 28 days to 2026-08-11:", B)])
    d.mono(
        "spend          712.83 MAD          CPA               30.99 MAD\n"
        "clicks               72            avg CPC            9.90 MAD\n"
        "conversions          23            weighted QS            5.43\n"
        "impression share  57.0%            lost to rank          43.0%"
    )
    footer(d)
    d.save(os.path.join(OUT, "02-rabat-plan.docx"))


def marrakech_doc():
    d = Doc()
    d.title("Campaign — creation-website-marrakech",
            f"Analysis and action plan · {WINDOW} · {PULLED}")

    d.h1("Snapshot")
    d.table(
        ["Metric", "Value", "Read"],
        [
            ["Status", ("Paused", RB), "Paused around 31 July"],
            ["Daily budget", "150 MAD", ""],
            ["Bid strategy", "Maximize conversions", ""],
            ["Geo target", "Marrakesh (city only)", ""],
            ["Ad group name", ('"Ad group 1"', RB), "Never configured"],
            ["Landing page", ("/ (homepage)", RB), "Should be /marrakech"],
            ["Spend (28d)", "159.21 MAD", ""],
            ["Clicks / conv", "24 / 5", ""],
            ["CPA", ("31.84 MAD", {"b": True, "color": GOOD}), "Second best in the account"],
            ["Avg CPC", "6.63 MAD", "Cheapest clicks you buy"],
            ["Impression share", ("36.6%", R), "62.6% lost to rank — worst in account"],
            ["Absolute top IS", ("10.0%", R), ""],
            ["Weighted Quality Score", ("5.16", R), "Lowest of the three"],
        ],
        widths=[24, 24, 52],
        fills={4: CRIT_FILL, 5: CRIT_FILL},
    )
    d.p([
        ("The paradox worth understanding: ", B),
        "this campaign has the cheapest clicks and a good CPA, yet the worst Quality Score "
        "and the worst auction position in the account. Both facts have the same cause — "
        "every keyword points at the homepage.",
    ])

    d.h1("What is wrong")

    d.h2("1. Every keyword sends traffic to the homepage")
    d.mono(
        'ad group "Ad group 1"  ->  https://www.moudevpro.com/\n\n'
        "   site web hôtel marrakech      site web riad marrakech\n"
        "   hotel website marrakech       تصميم موقع مراكش\n"
        "   creation site web marrakech   développeur web marrakech"
    )
    d.p([
        "This is the whole problem, and it explains everything else. The ad group still "
        "carries its default name, which means it was never configured after the campaign "
        "was created. Someone searching ", ("site web riad marrakech", MONO),
        " arrives at a homepage that — since 14 August — is explicitly targeted at "
        "Casablanca. Google scores that mismatch, Quality Score falls, Ad Rank falls, and "
        "the campaign loses 62.6% of its available impressions.",
    ])

    d.h2("2. Five keywords sit at QS 3 — all of them Marrakech-specific")
    d.table(
        ["Keyword", "QS", "Ad rel.", "Landing", "Exp. CTR"],
        [
            [("agence web marrakech", MONO), ("3", R), "above", ("BELOW", R), ("BELOW", R)],
            [("creation site internet marrakech", MONO), ("3", R), "above", ("BELOW", R), ("BELOW", R)],
            [("développeur web marrakech", MONO), ("3", R), "above", ("BELOW", R), ("BELOW", R)],
            [("web developer morocco", MONO), ("3", R), "above", ("BELOW", R), ("BELOW", R)],
            [("devis site web maroc", MONO), ("3", R), "above", ("BELOW", R), ("BELOW", R)],
        ],
        widths=[38, 12, 16, 16, 18],
    )
    d.p([
        "Every one has ", ("above average ad relevance", {"color": GOOD}),
        " and below average landing page. The ads describe Marrakech correctly; the "
        "destination does not. Fix the destination and these should recover on their own.",
    ])

    d.h2("3. The tourism keywords have never had a matching page in the account")
    d.p([
        ("site web hôtel marrakech", MONO), ", ", ("site web riad marrakech", MONO), " and ",
        ("hotel website marrakech", MONO), " are documented in ", ("CLAUDE.md", MONO),
        " §11 as pointing at ", ("/marrakech", MONO),
        ". In the account they point at the homepage and have done since the campaign was built.",
    ])
    d.p([
        "There is an organic angle here too. The blog post ",
        ("/blog/site-web-hotel-riad-marrakech", MONO),
        " ranks at organic position 2–3 for exactly these riad terms. Its title and meta "
        "description were rewritten on 14 August to fix a zero-click problem. Between that "
        "post and ", ("/marrakech", MONO),
        ", the tourism intent has two decent destinations — the campaign just is not using "
        "either of them.",
    ])

    d.h1("Quality Score, keyword by keyword")
    d.table(
        ["Keyword", "Match", "QS", "Ad rel.", "Landing", "Exp. CTR", "Cost", "Conv"],
        [
            [("creation site internet", MONO), "PHR", "5", "above", "avg", ("BELOW", R), "46.15", "1.0"],
            [("creation de site web", MONO), "EXA", "7", "above", "avg", "avg", "28.77", "3.0"],
            [("agence web marrakech", MONO), "EXA", ("3", R), "above", ("BELOW", R), ("BELOW", R), "26.02", "0.0"],
            [("création de site web professionnel", MONO), "PHR", "–", "–", "–", "–", "17.25", "0.0"],
            [("création site web", MONO), "PHR", "7", "above", "avg", "avg", "16.95", "1.0"],
            [("creation site internet prix", MONO), "PHR", "–", "–", "–", "–", "14.46", "0.0"],
            [("creation site internet marrakech", MONO), "EXA", ("3", R), "above", ("BELOW", R), ("BELOW", R), "6.54", "0.0"],
            [("web developer morocco", MONO), "PHR", ("3", R), "above", ("BELOW", R), ("BELOW", R), "3.07", "0.0"],
            [("creation site web maroc", MONO), "EXA", ("8", G), "above", "avg", "above", "0.00", "0.0"],
            [("creation site web marrakech", MONO), "EXA", "5", "above", "avg", ("BELOW", R), "0.00", "0.0"],
            [("développeur web marrakech", MONO), "PHR", ("3", R), "above", ("BELOW", R), ("BELOW", R), "0.00", "0.0"],
            [("devis site web maroc", MONO), "EXA", ("3", R), "above", ("BELOW", R), ("BELOW", R), "0.00", "0.0"],
        ],
        widths=[30, 8, 6, 11, 11, 11, 12, 11],
    )

    d.h1("The plan")
    d.p([
        ("Do steps 1–3 before re-enabling. ", RB),
        "The campaign is paused, so all of this costs nothing to fix now — and switching it "
        "back on unchanged would just resume buying badly-scored clicks.",
    ])
    plan_step(
        d, 1, "Change the ad group's final URL from / to /marrakech.",
        "Campaign → Ad groups → Ad group 1 → the responsive search ad → Final URL.",
        "It is the single highest-value change available in this campaign. Five QS-3 "
        "keywords should recover once the destination matches what the ads promise.",
        "The ad's final URL reads https://www.moudevpro.com/marrakech.",
    )
    plan_step(
        d, 2, "Rename 'Ad group 1' to 'marrakech-general'.",
        "Campaign → Ad groups → rename.",
        "Not cosmetic — the default name is why this was easy to miss for months. Named ad "
        "groups make a misrouted landing page obvious at a glance.",
        "No ad group in the account is still called 'Ad group 1'.",
    )
    plan_step(
        d, 3, "Create a second ad group 'marrakech-tourisme' for the hotel and riad terms.",
        "New ad group → /marrakech → move site web hôtel marrakech, site web riad marrakech, "
        "hotel website marrakech, تصميم موقع مراكش.",
        "Tourism intent is a different pitch from general web design — direct bookings and "
        "OTA commission, not vitrine sites. It deserves its own ad copy, in English as well "
        "as French, since hotel owners search in both.",
        "The tourism keywords show impressions against their own ad rather than the generic one.",
    )
    plan_step(
        d, 4, "Re-enable the campaign, then leave it alone for 14 days.",
        "Campaign → Status.",
        "It converted at 31.84 MAD with the cheapest clicks in the account while pointing at "
        "the wrong page entirely. With the right page it should do better — but only if the "
        "daily pausing from the account plan has stopped.",
        "Spend resumes and Quality Score is re-checked after two weeks, not two days.",
    )
    plan_step(
        d, 5, "Decide on 'agence web marrakech'.",
        "Campaign → Keywords.",
        "QS 3, zero conversions on 38 impressions, and it contradicts the freelance "
        "positioning. Weakest case of the six agence keywords in the account.",
        "Either removed, or its landing page score improves after step 1.",
    )

    d.h1("What to measure in four weeks")
    d.p([("Baseline to judge against — 28 days to 2026-08-11 (partly paused):", B)])
    d.mono(
        "spend          159.21 MAD          CPA               31.84 MAD\n"
        "clicks               24            avg CPC            6.63 MAD\n"
        "conversions           5            weighted QS            5.16\n"
        "impression share  36.6%            lost to rank          62.6%"
    )
    d.p([
        "The clearest signal that step 1 worked will be ", ("lost impression share to rank", B),
        " falling from 62.6%, and the five QS-3 keywords moving up. Because the campaign was "
        "paused for part of this window, treat the spend and conversion figures as indicative "
        "rather than a clean baseline.",
    ])
    footer(d)
    d.save(os.path.join(OUT, "03-marrakech-plan.docx"))


if __name__ == "__main__":
    account_doc()
    casablanca_doc()
    rabat_doc()
    marrakech_doc()
    for f in sorted(os.listdir(OUT)):
        if f.endswith(".docx"):
            print(f"  {f}  ({os.path.getsize(os.path.join(OUT, f)):,} bytes)")
