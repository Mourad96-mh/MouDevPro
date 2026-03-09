# MouDEV Agency Website — CLAUDE.md

## Project Overview

Multi-city, multi-language digital marketing agency website for **MouDEV** based in Casablanca, Morocco. The site targets 3 cities (Casablanca, Tanger, Marrakech) in 3 languages (French, English, Arabic). Primary goal: lead generation via WhatsApp with Google Ads and Facebook Pixel conversion tracking.

> **Active optimization goal:** Align landing page content with running Google Ads campaign (`web-dev-casablanca`) to fix low quality scores, reduce CPC, and increase conversion rate.

---

## Tech Stack

- **Framework:** React 18 + Vite 6
- **Routing:** React Router DOM 7
- **i18n:** i18next + react-i18next
- **Head management:** react-helmet-async
- **Icons:** react-icons
- **Deployment:** Vercel
- **CSS:** Custom CSS with CSS variables — NO Tailwind, NO Bootstrap

## Commands

```bash
npm run dev        # Start development server (Vite)
npm run build      # Build for production + generate sitemap
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Router + all 9 routes defined here
├── index.css             # Global styles and CSS variables
├── i18n.js               # i18next init (default lang: French)
├── pages/
│   └── CityPage.jsx      # Main dynamic page (city + language props)
├── components/
│   ├── layout/           # Header, Footer, Hero, Logo, CitySwitcher, LanguageSwitcher, CallLinks, AppLayout
│   └── sections/         # Portfolio, Stats, FAQ, ClientLogos, Temoignes
├── context/
│   └── CityContext.jsx   # Global state: current city + language
├── data/
│   └── cityConfig.js     # Per-city metadata (addresses, geo, meta tags, hreflang)
├── hooks/
│   └── useConversion.js  # Conversion tracking (Facebook Pixel + Google Ads → WhatsApp)
└── locales/
    ├── fr/translation.json
    ├── en/translation.json
    └── ar/translation.json
public/                   # Static assets (AVIF/WebP images, robots.txt, sitemap.xml)
sitemap-generator.js      # Node script run after build to generate sitemap
vercel.json               # SPA rewrites: all paths → index.html
```

## Routing

9 routes (3 cities × 3 languages), all defined in `App.jsx`:

| Path                    | City       | Language |
| ----------------------- | ---------- | -------- |
| `/`                     | Casablanca | French   |
| `/en`                   | Casablanca | English  |
| `/ar`                   | Casablanca | Arabic   |
| `/agence-web-rabat`     | Rabat      | French   |
| `/agence-web-marrakech` | Marrakech  | French   |
| + EN/AR variants        | ...        | ...      |

All routes render `<CityPage>` with `city` and `lang` props.

## Styling Conventions

- **No CSS framework.** All styles in `src/index.css` with CSS custom properties.
- CSS variables defined on `:root`: color palette (scarlet red, gray scale, blue-violet accent), spacing scale, font size scale.
- Font: **Rubik** (Google Fonts).
- Utility classes: `.lg-mb`, `.md-mb`, `.sl-mb`, `.center-text`, `.heading--primary`, `.secondary-heading`, `.text`, `.img`
- BEM-like naming for component-specific styles.
- Responsive: mobile-first, hamburger nav on mobile.
- Images: AVIF/WebP with lazy loading (`loading="lazy"`).

## SEO Patterns

Every page uses `react-helmet-async` for:

- Dynamic `<title>`, `<meta description>`, Open Graph tags
- Canonical URLs
- Hreflang alternate links for all language variants
- Schema.org JSON-LD: `ProfessionalService`, `LocalBusiness`, `FAQPage`

City-specific metadata lives in `src/data/cityConfig.js`. When adding a new city or language, update that file and `App.jsx` routes.

## Internationalization

- `src/i18n.js` loads all 3 translation files; default fallback is French.
- Translation keys use `{{city}}` interpolation for dynamic city names.
- Language is set via URL prefix: `/en/...`, `/ar/...`, default is French (no prefix).
- RTL layout is expected for Arabic — keep that in mind when editing CSS.

## Conversion Tracking

`src/hooks/useConversion.js` fires both:

1. **Facebook Pixel** (`fbq('track', 'Lead')`)
2. **Google Ads** (`gtag_report_conversion`)

Then redirects to WhatsApp (`+212696964341`). Call this hook for any CTA button that should be tracked.

> **Additional conversion events to track** (not yet implemented):
>
> - Phone number click (tel: link)
> - WhatsApp button click (floating button)
> - Contact form submission
> - All 3 should fire `gtag_report_conversion` + `fbq('track', 'Lead')`

## Key Decisions & Constraints

- **Do not add a CSS framework.** The project intentionally uses plain CSS variables.
- **Do not modify `vercel.json` rewrites** — they are required for SPA routing.
- **Build always runs `sitemap-generator.js`** after Vite — do not separate these.
- All text content is in `locales/` JSON files — avoid hardcoded strings in components.
- AVIF is the preferred image format; WebP as fallback. No JPEG/PNG for hero images.
- Business phone for WhatsApp: `+212696964341` — do not change without confirming with user.

## Adding Content

- **New service package:** Edit `CityPage.jsx` packages section + add translations to all 3 locale files.
- **New FAQ item:** Add to `FAQ.jsx` + all locale files. Keep Schema.org FAQPage JSON-LD in sync.
- **New portfolio project:** Edit `Portfolio.jsx` + add image to `public/`.
- **New city:** Add config in `cityConfig.js`, new routes in `App.jsx`, update `sitemap-generator.js`.

---

## 🎯 Google Ads Campaign Context

> Read this section before touching any content, copy, meta tags, or page structure.

### Business Profile

- **Type:** Agence web & freelance — blend both. Use "je" for personal touch (speed, direct contact, pricing) and "agence" for range of services and professionalism. Core message: **"L'expertise d'une agence, la réactivité d'un freelance."**
- **Location:** Quartier Maarif, Casablanca, Maroc
- **Phone:** +212 696 964 341
- **Services:** Site Vitrine · Application Web Sur Mesure · Landing Page

### Active Campaign

- **Campaign name:** `web-dev-casablanca`
- **Ad group:** `developer casablanca`
- **Cities targeted:** Casablanca (primary), Marrakech, Rabat
- **Daily budget:** 80–100 MAD
- **Bidding:** Maximize Clicks → Target CPA after 30 conversions
- **Goal:** Lead generation (WhatsApp + form)

### Ad Headlines (15 in rotation)

```
1.  Création Site Web Casablanca
2.  Développeur Web Freelance
3.  Application Web Sur Mesure
4.  Landing Page Qui Convertit
5.  Site Vitrine Dès 3990 DH
6.  Devis Gratuit en 24h
7.  Livraison en 7 Jours
8.  Site Web Pro Pour PME
9.  100% Satisfaction Garantie
10. Site Responsive & Optimisé
11. Startups & PME Bienvenues
12. Votre Site Clé en Main
13. Pas D'Intermédiaire
14. MouDEV – Expert Web Maroc
15. Appelez Maintenant
```

### Ad Descriptions (4 in rotation)

```
1. Site vitrine professionnel à Casablanca. Design moderne, livraison en 7 jours.
2. Freelance web disponible — pas d'intermédiaire, devis gratuit en 24h.
3. Développement web sur mesure pour startups & PME. Prix compétitif à Casablanca.
4. Landing page ou app web sur mesure — contactez MouDEV et recevez votre devis.
```

### ⚠️ Low Quality Score Keywords — Fix These First

Google has flagged these keywords — the Casablanca landing page (`/`) must match them:

| Keyword                        | Status         | Required Fix                   |
| ------------------------------ | -------------- | ------------------------------ |
| `création site web casablanca` | 🔴 Low quality | Must appear in H1 on `/` route |
| `création de site internet`    | 🔴 Low quality | Must appear in body copy       |

**Low quality score = Google charges more per click AND shows ads less.** Fixing these is the highest-priority content task.

---

## 📄 Landing Page Requirements (Casablanca — `/` route)

### Meta Tags — Update in `cityConfig.js`

```html
<title>Création Site Web Casablanca | Freelance Web | MouDEV</title>
<meta
  name="description"
  content="Création site web professionnel à Casablanca. Freelance développeur web — site vitrine, app sur mesure, landing page. Devis gratuit en 24h. Livraison en 7 jours."
/>
```

### H1 — CRITICAL (fixes quality score)

```
Création Site Web Casablanca
```

Full suggestion: **"Création Site Web Casablanca — Freelance Web Professionnel"**

> This exact phrase must be the H1 on the `/` route. Update the hero title key in `fr/translation.json`.

### Keyword Density Requirements

These phrases must appear naturally in the French translation of the Casablanca page:

| Phrase                                 | Min occurrences | Where                             |
| -------------------------------------- | --------------- | --------------------------------- |
| `création site web Casablanca`         | 3x              | H1, services section, footer area |
| `développeur web freelance Casablanca` | 2x              | Hero subtitle, about section      |
| `site vitrine Casablanca`              | 2x              | Services card, body copy          |
| `application web sur mesure`           | 1x              | Services card                     |
| `landing page`                         | 1x              | Services card                     |
| `devis gratuit`                        | 2x              | Hero CTA, contact section         |
| `Casablanca`                           | 5x+             | Throughout                        |

### Above-the-Fold Checklist (Hero component)

Every visitor from Google Ads must see this without scrolling:

- [ ] H1 containing `Création Site Web Casablanca`
- [ ] Subtitle mentioning freelance + Casablanca
- [ ] Primary CTA button: `"Devis Gratuit en 24h"` → fires `useConversion` hook
- [ ] Phone number visible: `+212 696 964 341`
- [ ] At least 2 trust badges: `✅ Livraison en 7 Jours` · `✅ Paiement après livraison` · `✅ Basé à Casablanca`

### Page Structure (for `CityPage.jsx` Casablanca)

```
[HEADER]        Logo | Nav | Tel: +212 696 964 341

[HERO]          H1: Création Site Web Casablanca
                Subtitle: Freelance développeur web — Maarif, Casablanca
                CTA: "Devis Gratuit en 24h" → useConversion()
                Trust badges: Livraison 7J · Paiement après livraison · Basé Casablanca

[SERVICES]      3 cards:
                  • Site Vitrine — Dès 3990 DH
                  • Application Web Sur Mesure
                  • Landing Page

[WHY MOUDEV]    Freelance vs Agence comparison
                Speed · Price · Direct contact · Local presence

[PORTFOLIO]     3–6 projects (Portfolio.jsx)

[TESTIMONIALS]  2–3 client quotes with name + city (Temoignes.jsx)

[CONTACT FORM]  Short: Nom + Téléphone + Type de projet + Submit
                Button: "Recevoir Mon Devis Gratuit" → useConversion()
                Reassurance: "Réponse sous 24h — Aucun engagement"
                + WhatsApp floating button

[FOOTER]        Quartier Maarif, Casablanca | Links | Legal
```

### Contact Form (not yet built — add to `CityPage.jsx`)

```jsx
// Fields: name, phone/email, project type (dropdown), submit
// On submit: fire useConversion() then show confirmation message
// Project type options: Site Vitrine / Application Web / Landing Page / Autre
// Reassurance text below button: "Réponse sous 24h — Aucun engagement"
```

---

## ✍️ Tone & Voice

- **Language:** French primary · Arabic secondary · English for `/en` routes
- **Person:** Mix "je" (direct contact, speed, pricing) with "nous/agence" (services, process, results). Never sound like a big cold agency — always personal and accessible.
- **Tone:** Expert but approachable — trusted local professional with agency-level quality

### ✅ Write like this:

> "Je crée votre site web professionnel à Casablanca avec l'expertise d'une agence et la réactivité d'un freelance. Devis gratuit en 24h."

### ❌ Not like this:

> "Notre équipe d'experts vous accompagne dans votre transformation digitale avec des solutions innovantes et sur mesure."

### Key phrases to use repeatedly:

- `livraison en 7 jours`
- `pas d'intermédiaire`
- `basé à Casablanca / Maarif`
- `dès 3990 DH`
- `devis gratuit en 24h`
- `je m'occupe de tout`
- `paiement après livraison`

---

## ⚔️ Competitive Positioning

| Competitor                    | Their Weakness                   | MouDEV Counter                               |
| ----------------------------- | -------------------------------- | -------------------------------------------- |
| Rythme Media (rythmedia.com)  | Agency overhead, expensive       | "Contact direct — pas d'intermédiaire"       |
| Monkey Lab (monkeylab.ma)     | Premium, targets big brands only | "Pour les PME et startups — prix accessible" |
| Eleven Media (elevenmedia.ma) | 16 years old, dated feel         | "Technologies modernes, livraison rapide"    |
| Guide Web (guide-web.ma)      | Races to bottom on price         | "Qualité professionnelle à prix compétitif"  |
| site-vitrine.ma               | Based in Marrakech, not local    | "Basé à Casablanca — disponible en personne" |

**Core differentiators to always surface in content:**

1. 🚀 Livraison en 7 jours
2. 💬 Contact direct — pas d'intermédiaire
3. 📍 Basé à Casablanca (Maarif)
4. 💰 Dès 3990 DH — prix transparent dès le départ
5. ✅ Paiement après livraison

---

## 🌍 City-Specific Notes

### Casablanca (`/`) — PRIMARY

- Most of the ad budget goes here
- H1 must contain `Création Site Web Casablanca`
- Quality score fix is urgent — prioritize this route above all others

### Marrakech (`/agence-web-marrakech`)

- H1: `Création Site Web Marrakech`
- Competitor site-vitrine.ma is based here — differentiate with "freelance local" angle
- Same structure as Casablanca

### Rabat (`/agence-web-rabat`)

- H1: `Création Site Web Rabat`
- Capital city — administration, startups, PME audience
- Same structure as Casablanca

---

## 📊 Campaign Performance Targets

| Metric                           | Current          | Target       |
| -------------------------------- | ---------------- | ------------ |
| Quality Score (main keywords)    | 🔴 Low (flagged) | 7/10 minimum |
| CTR from ads                     | ~6.74%           | > 10%        |
| Conversion rate (visitor → lead) | Unknown          | > 5%         |
| Cost per conversion              | 9.81 MAD         | < 15 MAD     |
| Avg. CPC                         | 4.95 MAD         | < 6 MAD      |

---

## 🔧 Technical Performance Requirements

Google Ads Quality Score is partly based on **landing page experience**:

- **Mobile-first** — majority of Casablanca traffic is mobile
- **Page speed** — target < 3s load time
- **Core Web Vitals:** LCP < 2.5s · CLS < 0.1 · FID < 100ms
- **SSL** — must stay HTTPS (already on Vercel ✅)
- Images: AVIF/WebP only, lazy-loaded (already enforced ✅)

---

## ✅ Content Change Checklist

Before committing any content change to the Casablanca route, verify:

- [ ] H1 contains exact phrase `création site web Casablanca`
- [ ] Meta title updated in `cityConfig.js`
- [ ] Meta description updated in `cityConfig.js`
- [ ] "je" used throughout (not "nous")
- [ ] `devis gratuit` CTA present and fires `useConversion` hook
- [ ] Price `dès 3990 DH` mentioned at least once
- [ ] `Casablanca` or `Maarif` mentioned 5+ times
- [ ] All new strings added to `fr/translation.json` (and `ar/`, `en/` if applicable)
- [ ] Schema.org JSON-LD updated if services/FAQ changed

---

_Last updated: March 2026 — MouDEV Google Ads × Landing Page Optimization_
