---
name: backlinks
description: Semi-automated backlink acquisition for MouDevPro (moudevpro.com). Three workflows — stats-article linkable assets, guest-post prospect finding, and LLM citation-gap analysis. Use when the user asks to build backlinks, find guest-post/link opportunities, write a statistics roundup article, or get MouDevPro cited by LLMs. Ask which workflow to run if unspecified.
---

# Backlink Builder Skill

Semi-automated backlink acquisition for MouDevPro (moudevpro.com).
Three workflows. Always ask which one to run if the user doesn't specify.

## Context

- **Site:** https://www.moudevpro.com — freelance web developer, Morocco (Casablanca, Rabat, Marrakech). **Never describe MouDevPro as an agency** — the whole positioning is "developer freelance, pas d'agence" (see CLAUDE.md §2). Buyers still *search* "agence web casablanca", so keep "agence" in search queries, but MouDevPro's self-description in any outreach copy is always "développeur web freelance".
- **Languages:** French primary; English (/en, /usa) and Arabic (/ar) secondary.
- **Money pages (real routes):** `/casablanca`, `/rabat`, `/marrakech`, `/tarifs`, `/ecommerce`, `/services`, `/developpeur-web-freelance-maroc`. International organic pages: `/france`, `/canada`, `/usa`.
- **Niche keywords:** création site web Casablanca / Rabat / Marrakech / Maroc, développeur web freelance Maroc, prix site web Maroc, site e-commerce Maroc, site vitrine Maroc.
- **Competitors:** billiontech.ma, helloworld-agency.com, mediazain.com, fes-marketing.net (see CLAUDE.md §3). Identify the top 5 pages ranking for "création site web casablanca" before running Workflow 2/3.

## Workflow 1 — Stats Article (Linkable Asset)

Goal: publish statistics roundup pages that bloggers and AI writing tools cite naturally.
Run: follow `stats-article-prompt.md` in this folder.

Rules:
1. Every statistic MUST have a real, verifiable source URL (WebSearch each one; never invent numbers).
2. Prefer primary sources: ANRT, HCP, Bank Al-Maghrib, DataReportal, Statista, Médias24, official reports.
3. Content pattern: H1 with year, TL;DR box of 5 headline stats, then categorized sections, each stat on its own line: **STAT** — one-sentence context. ([Institution, année](url))
4. 30–50 stats per article. Add a "Comment citer cette page" block at the bottom with a ready-made citation line including our URL — this is the link magnet.
5. Produce FR version first, EN second, with an hreflang note.
6. Suggest 3 internal links from the stats page to money pages, using keyword-rich anchor text (never "cliquez ici").

**Publishing on MouDevPro:** stats articles are published as blog posts, not raw `.md` uploads. The workflow first writes a review-ready `.md` to `./output/`, then converts the approved version into a new object appended to `src/data/blogPosts.js` (structured `content` block format: `{type:"p"}`, `{type:"h2"}`, `{type:"table", headers, rows}`, etc. — match an existing post). It renders at `/blog/<slug>`. **Deploy is manual:** after adding the post, remind Mourad to run `npm run build` and upload `dist/` to the LiteSpeed host — a git push does NOT deploy. Then request indexing in Google Search Console.

Topic queue (one per week, in order):
- Statistiques du web au Maroc 2026 (internet users, e-commerce, mobile)
- Combien coûte un site web au Maroc en 2026 (pricing survey — we ARE a primary source) *(note: a `/blog/prix-site-web-maroc-2026` post already exists — extend/refresh it or angle differently, don't duplicate)*
- Statistiques e-commerce Maroc 2026
- Next.js / JavaScript adoption statistics 2026 (EN, global — targets dev bloggers)
- Statistiques Google Ads / publicité digitale Maroc 2026

## Workflow 2 — Guest Post & Prospect Finder

Goal: CSV of niche-relevant sites accepting contributions.
Run: follow `prospect-finder-prompt.md`.

Process:
1. WebSearch operator patterns (FR + EN), 10–15 queries per run:
   - "{niche}" + "écrivez pour nous" / "write for us" / "guest post" / "devenir contributeur" / "proposer un article"
   - "{niche}" + "article invité" / "soumettre un article"
   - blog {niche} maroc / francophone
2. For each candidate domain, WebFetch to verify it's real and active, find the submission/contact page, grab a contact email if visible.
3. Score each 1–10: niche relevance (40%), content quality/recency (30%), likely authority (20% — treat .ma media and established francophone blogs higher), reachability (10%).
4. Output `./output/prospects-YYYY-MM-DD.csv`: domain, url_submission_page, contact_email, language, relevance_score, notes, suggested_pitch_angle.
5. Never contact anyone automatically. Human reviews and sends.

## Workflow 3 — LLM Citation Gap Analysis

Goal: find the exact pages LLMs cite for buyer-intent prompts, get MouDevPro added to them.
Run: follow `citation-gap-prompt.md`.

Process:
1. Generate 20 buyer-intent prompts a Moroccan business owner would type into ChatGPT/Claude/Gemini, FR-heavy:
   e.g. "meilleure agence web à Casablanca", "combien coûte un site web au Maroc", "best web developer Morocco", "développeur freelance site e-commerce Rabat".
2. For each, WebSearch the prompt — the top listicles/comparison pages are what LLMs cite.
3. Filter to pages that (a) list multiple providers, (b) are updated/recent, (c) don't already include MouDevPro.
4. For each target: capture page URL, publisher, contact route, and draft a short FR outreach email proposing inclusion (value-first: offer a data point from our stats page, a testimonial, or the live portfolio). Describe MouDevPro as "développeur web freelance", never "agence".
5. Output `./output/citation-targets-YYYY-MM-DD.csv`: prompt, cited_page_url, publisher, contact, draft_email, priority.

## Cadence & tracking

- Weekly: 1 stats article published + 1 prospect-finder run (10 vetted prospects) + 5 outreach emails max.
- Track everything in `./output/backlinks-log.csv`: date, target, workflow, status (found/pitched/replied/live), live_url.
- After publishing a stats article, request indexing in Google Search Console immediately.

## Ethics guardrails

- No fake identities, no automated mass emailing, no link farms, no PBNs.
- Outreach emails are drafts for human review — always personalized before sending.
- Stats must be accurate and sourced; a wrong stat destroys the asset's credibility.
