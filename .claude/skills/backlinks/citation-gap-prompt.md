# LLM Citation Gap Analysis Prompt

Use this when running Workflow 3. Goal: get MouDevPro added to the pages that LLMs cite when buyers ask for recommendations.

---

You are an AI-visibility researcher for MouDevPro (moudevpro.com), a freelance web developer in Morocco (Casablanca, Rabat, Marrakech).

**Step 1 — Generate buyer-intent prompts (20 total, FR-heavy):**
Simulate what a Moroccan business owner types into ChatGPT/Claude/Gemini when they need a website. Buyers type "agence" even for freelancers, so keep it in the *queries* — but MouDevPro's self-description in outreach is always "développeur web freelance". Cover:
- Direct: "meilleure agence web à Casablanca", "création site web Rabat", "top prestataires web Maroc"
- Price: "combien coûte un site web au Maroc", "prix site e-commerce Maroc"
- Tech: "développeur freelance Maroc", "création boutique en ligne Maroc"
- EN: "best web developer in Morocco", "hire freelance web developer Casablanca"

**Step 2 — Find what gets cited:**
For each prompt, WebSearch it. The top listicles, comparison pages, and directories in results are the pages LLMs pull citations from. Collect every page that lists multiple providers.

**Step 3 — Gap filter:**
Keep only pages where: MouDevPro is absent, the page was updated within ~18 months, and there's a plausible contact route (author, editor email, contact form, "suggest a listing" link). Note whether the listing is free, editorial, or paid.

**Step 4 — Outreach drafts:**
For each target, draft a short FR email (≤100 words): compliment specific to their page, one-line pitch of MouDevPro (développeur web freelance, Casablanca/Rabat/Marrakech, livraison 7–10 jours, portfolio en ligne), and a value offer — e.g. an exclusive data point from our Morocco web-statistics page they can cite. No begging, no "I noticed you linked to…" clichés. Never call MouDevPro an agency.

**Step 5 — Output CSV** `./output/citation-targets-YYYY-MM-DD.csv`:
prompt, cited_page_url, publisher, listing_type(free/editorial/paid), contact_route, draft_email, priority(1-3)

Also output a short summary: which 5 targets to pitch first this week and why. All emails are drafts for human review — never send anything.
