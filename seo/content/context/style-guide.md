# Style Guide — moudevpro.com SEO content

> On-page SEO mechanics for every page/post. Derived from root `CLAUDE.md` §5, §7, §8.

## Per-page SEO checklist

1. **Title** `<60 chars`: city + service keyword. Money pages: include a price signal
   (creationsiteweb ranks partly on "dès 1990 DH" in the title — match this).
2. **H1**: contains the primary keyword naturally, mentions the city.
3. **First 100 words**: primary keyword present (required for Google Ads Quality Score, CLAUDE.md §5.4).
4. **Meta description** 150–160 chars: primary keyword + CTA ("Devis gratuit 24h").
5. **Image alt**: descriptive + keyword where natural.
6. **Internal links**: keyword-rich anchors, never "cliquez ici". Money pages must receive links
   from the page-1 blog posts.
7. **URL slugs**: lowercase, hyphenated, stable — never change a live slug (linked from Google Ads).

## Title templates (root CLAUDE.md §7)

| Page | Title |
| --- | --- |
| Home | Création Site Web Casablanca \| Développeur Web Freelance Maroc |
| /casablanca | Création Site Web à Casablanca \| Développeur Freelance Maroc |
| /rabat | Création Site Web à Rabat \| Développeur Web Freelance Maroc |
| /marrakech | Création Site Web Marrakech \| Hôtels, Riads, Restaurants |
| /tarifs | Prix Création Site Web Maroc \| Tarifs Transparents & Devis Gratuit |
| /ecommerce | Site E-commerce Maroc \| Boutique en Ligne Professionnelle |

## Structure conventions

- One H1 per page; logical H2/H3 nesting.
- Short paragraphs (mobile-first); scannable.
- Lead section = outcome + CTA above the fold.
- City pages: unique intro (never duplicate the homepage), local-context paragraph, anchor
  sections `#services` `#tarifs` `#ecommerce` `#contact`, city-specific CTA.
- Pricing tiers: price range + what's included + delivery time + "Je veux ce pack →".

## Schema

- City pages + home: `LocalBusiness` (areaServed = Casablanca/Rabat/Marrakech/Maroc).
- International pages: `ProfessionalService`, provider address Casablanca MA, never a fake local address.
- `/tarifs` and FAQ blocks: `FAQPage`.

## Languages

FR primary. EN block on `/marrakech` + intl pages. AR pages exist (`/ar`, `/ar/rabat`,
`/ar/marrakech`) — you are the only structured AR competitor; keep AR keywords from CLAUDE.md §5.2.

## Performance (Core Web Vitals)

LCP < 2.5s, CLS < 0.1, INP < 200ms. WebP images with explicit width/height, lazy-load below fold,
preload critical fonts, no render-blocking scripts above the fold.
