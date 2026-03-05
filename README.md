# MouDEV — Agence Web & Marketing Digital à Casablanca

Site vitrine de l'agence **MouDEV**, spécialisée en création de sites web, webdesign, SEO et Google Ads au Maroc.

🌐 **Live:** [www.moudevpro.com](https://www.moudevpro.com)

---

## Stack technique

| Outil                                                               | Rôle                                      |
| ------------------------------------------------------------------- | ----------------------------------------- |
| [React 18](https://react.dev)                                       | UI framework                              |
| [Vite 6](https://vite.dev)                                          | Bundler & dev server                      |
| [React Router v7](https://reactrouter.com)                          | Routing                                   |
| [React Helmet Async](https://github.com/staylor/react-helmet-async) | SEO meta tags dynamiques                  |
| [React Icons](https://react-icons.github.io/react-icons)            | Icônes (HeroIcons, FontAwesome, Devicons) |
| CSS custom (sans framework)                                         | Styles — variables CSS, responsive        |

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production (génère aussi sitemap.xml)
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

---

## Structure du projet

```
MoDev/
├── public/
│   ├── hero-img.avif           # Image hero (LCP — chargement eager)
│   ├── home-dev-1.avif
│   ├── web-dev.avif
│   ├── web-dev-1.avif
│   ├── setup.avif
│   ├── customer-*.webp/avif    # Photos témoignages
│   ├── webdev-logo.png         # Logo (og:image)
│   ├── robots.txt
│   └── sitemap.xml             # Généré automatiquement au build
│
├── src/
│   ├── pages/
│   │   └── HomePage.jsx        # Page principale + SEO (Helmet + JSON-LD)
│   │
│   ├── components/
│   │   ├── UI/
│   │   │   ├── AppLayout.jsx   # Layout global
│   │   │   ├── Header.jsx      # Nav sticky + hamburger mobile
│   │   │   ├── Hero.jsx        # Section hero (H1)
│   │   │   ├── Logo.jsx
│   │   │   ├── Footer.jsx      # Footer 3 colonnes
│   │   │   └── CallLinks.jsx   # Boutons flottants WhatsApp / Téléphone
│   │   │
│   │   ├── Stats.jsx           # Compteurs animés (IntersectionObserver)
│   │   ├── ClientLogos.jsx     # Bande logos clients
│   │   ├── Portfolio.jsx       # Grille réalisations
│   │   ├── FAQ.jsx             # Accordion FAQ + JSON-LD FAQPage
│   │   └── Temoignes.jsx       # Carousel témoignages
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Styles globaux + variables CSS
│
├── sitemap-generator.js        # Génère dist/sitemap.xml au build
├── vite.config.js
├── index.html                  # Meta statiques + tracking scripts
└── package.json
```

---

## SEO

### Ce qui est en place

- **Titre** (57 chars) : `Création site web Casablanca – Marketing Digital | MouDEV`
- **Meta description** (~140 chars) dans le HTML statique
- **Canonical**, **robots**, **hreflang** dans `index.html` (visibles sans JS)
- **Open Graph** + **Twitter Card** dans `index.html`
- **JSON-LD schemas** :
  - `ProfessionalService` dans `HomePage.jsx`
  - `FAQPage` dans `FAQ.jsx` (rich snippets Google)
- **Sitemap** : `priority: 1.0`, `changefreq: weekly`
- **robots.txt** : `Allow: /` + lien sitemap
- **Hero image** : `loading="eager"` + `fetchpriority="high"` + `<link rel="preload">`
- **`<noscript>`** : contenu H1 + contact visible sans JavaScript

### Modifier le SEO

| Élément                               | Fichier                                 |
| ------------------------------------- | --------------------------------------- |
| Titre, description, keywords          | `src/pages/HomePage.jsx` + `index.html` |
| H1                                    | `src/components/UI/Hero.jsx`            |
| JSON-LD (adresse, horaires, services) | `src/pages/HomePage.jsx` → `jsonLd`     |
| JSON-LD FAQ                           | `src/components/FAQ.jsx` → `faqJsonLd`  |
| Sitemap                               | `sitemap-generator.js`                  |

### À faire manuellement

- **GA4** : Créer une propriété sur [analytics.google.com](https://analytics.google.com) et ajouter le tag `G-XXXXXXXXXX` dans `index.html`
- **OG image** : Remplacer `public/webdev-logo.png` par une image **1200×630px**
- **Google Search Console** : Soumettre le sitemap et demander l'indexation après chaque déploiement

---

## Tracking & Conversions

| Service                  | ID                | Emplacement  |
| ------------------------ | ----------------- | ------------ |
| Google Ads               | `AW-17548598231`  | `index.html` |
| Meta Pixel               | `788065947556365` | `index.html` |
| Google Site Verification | `GSLrbqH...`      | `index.html` |

Les conversions (WhatsApp / téléphone) sont trackées dans `Header.jsx`, `Hero.jsx`, `CallLinks.jsx` et `HomePage.jsx` via `window.gtag_report_conversion()` et `window.fbq("track", "Contact")`.

---

## Personnalisation

### Statistiques

Éditer le tableau `stats` dans `src/components/Stats.jsx` :

```js
const stats = [
  { value: 30, suffix: "+", label: "Clients satisfaits" },
  { value: 45, suffix: "+", label: "Projets livrés" },
  { value: 4, suffix: "+", label: "Années d'expérience" },
  { value: 100, suffix: "%", label: "Satisfaction client" },
];
```

### Logos clients

Éditer le tableau `clients` dans `src/components/ClientLogos.jsx`.
Pour utiliser de vraies images :

```jsx
<img
  src="/logos/nom-client.png"
  alt="Nom Client"
  className="client__logo-img"
/>
```

### Portfolio

Éditer le tableau `projects` dans `src/components/Portfolio.jsx`.

### Liens réseaux sociaux

Mettre à jour les `href="#"` dans `src/components/UI/Footer.jsx`.

### FAQ

Éditer le tableau `faqs` dans `src/components/FAQ.jsx` — les réponses alimentent automatiquement le schema `FAQPage`.

---

## Déploiement

```bash
npm run build   # génère dist/ + dist/sitemap.xml
```

Uploader le dossier `dist/` sur l'hébergeur, puis :

1. Google Search Console → **Inspecteur d'URL** → Demander l'indexation
2. Google Search Console → **Sitemaps** → Vérifier `sitemap.xml`

---

## Design System (variables CSS)

```css
--scarletRed-500: #e41c3e /* Couleur principale */ --gray-600: #121212
  /* Texte / Header / Footer */ --gray-100: #ffffff /* Blanc */
  --scarletRed-100: #fff2f4 /* Fond page */;
```

---
