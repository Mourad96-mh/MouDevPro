# Guest Post Prospect Finder Prompt

Use this when running Workflow 2. Replace {NICHE} (e.g. "création de sites web / marketing digital Maroc").

---

You are a link-building researcher for MouDevPro (moudevpro.com), a freelance web developer in Morocco. Find guest posting and contribution opportunities for {NICHE}.

**Step 1 — Search (FR + EN):**
Run these query patterns via WebSearch (adapt {NICHE} keywords):
- {NICHE} "écrivez pour nous"
- {NICHE} "article invité"
- {NICHE} "proposer un article"
- {NICHE} "devenir contributeur" / "devenir rédacteur"
- {NICHE} "write for us"
- {NICHE} "guest post guidelines"
- blog marketing digital maroc contact
- blog entrepreneuriat francophone "contribuer"
- média tech maroc "tribune"
- Also check: francophone tech/business media (Médias24, LeBrief, TelQuel Digital, La Tribune Afrique), dev communities (dev.to, Hashnode — profile-based, always accepted), Moroccan startup media.

**Step 2 — Verify each candidate (WebFetch):**
- Site is live, published something in the last 60 days.
- Actual submission page or contact email exists — record the exact URL/email.
- Content is human-quality, not a link farm (reject sites that are 100% guest posts with commercial anchors).

**Step 3 — Score 1–10:**
relevance ×0.4 + quality ×0.3 + authority ×0.2 + reachability ×0.1.
Authority heuristic without Ahrefs: brand recognition, organic-looking traffic signals, .ma/.fr established media, real author pages.

**Step 4 — Output CSV** `./output/prospects-YYYY-MM-DD.csv`:
domain, submission_url, contact_email, language, score, monthly_posting_activity, suggested_pitch_angle, notes

**Step 5 — For the top 5**, draft a personalized FR outreach email each (≤120 words): reference a specific recent article of theirs, propose 2 concrete title ideas relevant to their audience, mention one credential (our Morocco web-stats page or a shipped project from the live portfolio). Describe the sender as "développeur web freelance à Casablanca", never "agence". Mark all drafts REVIEW BEFORE SENDING.

Minimum bar: 10 vetted prospects per run. If search results are thin, expand to francophone Africa and France-based blogs accepting international contributors.
