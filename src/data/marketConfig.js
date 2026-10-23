const BASE = "https://www.moudevpro.com";

// International market landing pages (organic SEO).
// Audience: Moroccan diaspora (MRE) + local businesses wanting quality remote dev
// at an optimized price. Pricing shown in local currency (€/$).
export const marketConfig = {
  // Positioning (rewritten 2026-10-23 from GSC data): these pages were ranking
  // 50–100 for generic terms ("développement web sur mesure", "développeur site
  // web") owned by local agencies. They now lead with what local agencies can't
  // claim — a developer based in Morocco — to win the offshore / sous-traitance /
  // MRE long tail instead.
  france: {
    lang: "fr",
    dir: "ltr",
    country: "France",
    linkLabel: { fr: "la France", en: "France" },
    locale: "fr_FR",
    hreflang: "fr-FR",
    slug: "france",
    canonical: `${BASE}/france`,
    currency: "€",
    currencyCode: "EUR",
    price: { vitrine: "199 €", ecommerce: "299 €" },
    priceNumeric: { vitrine: "199", ecommerce: "299" },
    keywords:
      "développeur web au Maroc pour la France, développeur web freelance Maroc France, sous-traitance développement web Maroc, externaliser création site web Maroc, développement web offshore Maroc, faire créer son site web au Maroc, développeur web marocain freelance, création site web MRE, site web pas cher freelance Maroc, prix site web freelance France",
    metaTitle: "Développeur Web Freelance au Maroc pour la France — dès 199 €",
    metaDescription:
      "Faites créer votre site web au Maroc par un développeur freelance : dès 199 €, même fuseau que la France (±1h), paiement après livraison. Devis gratuit 24h.",
    h1: "Faire Créer Votre Site Web au Maroc — Développeur Freelance pour la France et les MRE",
    heroSub:
      "Entreprise française ou Marocain résidant en France : je crée votre site web depuis Casablanca, en français, à ±1h de Paris. Un budget 3 à 5 fois inférieur à une agence française, et vous ne payez qu'après la livraison. Devis gratuit sous 24h.",
    intro: [
      "Je suis développeur web freelance au Maroc, basé à Casablanca. Je crée des sites vitrine, e-commerce et applications web pour deux types de clients en France : des entrepreneurs et PME françaises qui veulent externaliser leur site sans passer par une agence, et des Marocains résidant en France (MRE) qui préfèrent travailler avec un développeur qui parle leur langue — au sens propre comme au figuré.",
      "Sous-traiter son développement web au Maroc n'est plus un pari : le français y est une langue de travail courante, les développeurs y utilisent les mêmes outils qu'en France (React, WordPress, WooCommerce) et le pays est sur le même fuseau horaire, à ±1h. La différence, c'est le coût : sans loyer parisien ni équipe commerciale à financer, mon devis est 3 à 5 fois moins élevé.",
      "Et contrairement aux plateformes de sous-traitance offshore, vous ne passez par aucun intermédiaire : vous parlez directement avec le développeur qui code votre site, sur WhatsApp ou en visio, aux heures françaises. Livraison en 7 à 10 jours, paiement uniquement après validation.",
    ],
    offshore: {
      title: "Pourquoi sous-traiter la création de votre site web au Maroc ?",
      lead: "Ce que mes clients en France cherchent en venant me voir :",
      bullets: [
        ["Un budget raisonnable", "Une agence parisienne facture un site vitrine 3 000 à 8 000 €. Le même site, avec la même stack, démarre chez moi à 199 €. Vous payez le travail, pas les bureaux ni les commerciaux."],
        ["La même langue, le même fuseau", "Le Maroc est francophone et à ±1h de la France. Pas d'appels à 6h du matin ni de cahier des charges à traduire en anglais, comme avec une sous-traitance lointaine."],
        ["Un seul interlocuteur", "Pas de plateforme, pas de chef de projet qui transmet. Vous parlez au développeur : les réponses sont techniques, immédiates et sans déformation."],
        ["Un délai court", "Un projet d'agence prend 2 à 4 mois. Je livre un site vitrine en 7 à 10 jours, parce qu'il n'y a personne entre vous et moi."],
      ],
      closing:
        "Les objections légitimes, traitées franchement : je facture en euros, vous payez par virement (IBAN), Wise ou PayPal, après livraison — zéro acompte. Le site vous appartient entièrement, code et accès compris, et il respecte les obligations françaises (mentions légales, bandeau cookies RGPD).",
    },
    cities:
      "Je travaille avec des clients partout en France — Paris, Lyon, Marseille, Bordeaux, Toulouse, Lille, Nantes — et avec la diaspora marocaine qui y vit. Tout se fait à distance et en français : votre ville ne change rien au délai ni au tarif.",
    budget: {
      title: "Prix d'un site web : freelance au Maroc ou agence en France",
      headers: ["Type de site", "MouDevPro — Freelance au Maroc", "Agence française"],
      rows: [
        ["Site vitrine (5–10 pages)", "dès 199 € — livré en 7 à 10 jours", "3 000 – 8 000 €"],
        ["Site e-commerce", "dès 299 € — livré en 2 à 3 semaines", "8 000 – 20 000 €"],
        ["Application web sur mesure", "sur devis — selon le cahier des charges", "15 000 € et +"],
      ],
      note: "Devis fixe sous 24h : le prix annoncé est le prix final, aucun supplément en cours de projet.",
    },
    valueProps: [
      ["💬", "Contact direct, en français", "Vous parlez directement avec le développeur qui code votre site. Pas de commercial, pas de plateforme — réponses claires et rapides."],
      ["💶", "Tarifs transparents en euros", "Site vitrine dès 199 €, e-commerce dès 299 €. 3 à 5 fois moins cher qu'une agence française, à qualité égale. Devis fixe avant de commencer."],
      ["🕐", "Même fuseau horaire", "Basé à Casablanca (±1h avec la France), je suis disponible aux heures françaises. Échanges fluides, suivi en temps réel."],
      ["🚀", "Livraison 7 à 10 jours", "Pas de process d'agence. Votre site en ligne en une à deux semaines, et vous ne réglez qu'une fois satisfait du résultat."],
    ],
    facts: [
      ["±1h", "de décalage horaire avec la France — disponible à vos heures, en direct sur WhatsApp et en visio."],
      ["3 à 5×", "moins cher qu'une agence française, à qualité technique égale (React, WordPress, WooCommerce)."],
      ["7-10 jours", "de délai pour un site vitrine professionnel complet — responsive et optimisé pour Google."],
      ["0 acompte", "vous ne payez qu'après livraison et validation du site. Virement, Wise ou PayPal."],
    ],
    faq: [
      ["Pourquoi faire créer son site web au Maroc plutôt qu'en France ?", "Pour le coût, sans sacrifier la communication : un développeur au Maroc travaille en français, sur le même fuseau horaire (±1h) et avec les mêmes outils qu'en France (React, WordPress, WooCommerce), mais sans les charges d'une agence française. Résultat : un site vitrine dès 199 €, contre 3 000 à 8 000 € en agence."],
      ["Quelle différence avec une plateforme de sous-traitance offshore ?", "Il n'y a pas d'intermédiaire. Sur une plateforme, vous publiez une annonce et le travail peut changer de mains. Ici, vous parlez dès le premier message au développeur qui code votre site, et c'est lui qui le livre et le maintient."],
      ["Comment se passe le travail à distance depuis le Maroc ?", "Nous échangeons par WhatsApp, e-mail et visio, aux heures françaises. Vous validez d'abord la maquette, puis le site complet avant la mise en ligne, et vous suivez l'avancement sur un lien de prévisualisation."],
      ["Je suis MRE en France : pouvez-vous créer un site pour mon activité en France ou au Maroc ?", "Oui, les deux. Je crée des sites pour des Marocains résidant en France qui lancent une activité en France, mais aussi pour ceux qui ouvrent un commerce, un riad ou un projet immobilier au Maroc. Le site peut être en français, en arabe et en anglais."],
      ["Comment puis-je vous payer depuis la France ?", "Par virement bancaire international (IBAN), Wise ou PayPal, en euros. Et vous ne payez qu'après la livraison et la validation du site — zéro acompte imposé."],
      ["Le site respectera-t-il les obligations françaises (RGPD, mentions légales) ?", "Oui. J'intègre les mentions légales, la politique de confidentialité et un bandeau de consentement aux cookies conforme au RGPD. Vous restez propriétaire du nom de domaine, de l'hébergement et du code."],
      ["Est-ce risqué de faire créer son site web à l'étranger ?", "Le risque habituel, c'est de payer d'avance et de ne pas être livré. Je fonctionne à l'inverse : vous validez la maquette, puis le site, et vous ne payez qu'après la mise en ligne. Le code et les accès vous appartiennent dès la livraison."],
      ["Combien coûte un site web pour une entreprise française ?", "Un site vitrine professionnel démarre à 199 € et un e-commerce à 299 €, contre 3 000 à 8 000 € en agence française pour un résultat équivalent. Vous recevez un devis fixe sous 24h."],
    ],
  },

  canada: {
    lang: "fr",
    dir: "ltr",
    country: "Canada",
    linkLabel: { fr: "le Canada", en: "Canada" },
    locale: "fr_CA",
    hreflang: "fr-CA",
    slug: "canada",
    canonical: `${BASE}/canada`,
    currency: "$ CA",
    currencyCode: "CAD",
    price: { vitrine: "290 $ CA", ecommerce: "430 $ CA" },
    priceNumeric: { vitrine: "290", ecommerce: "430" },
    keywords:
      "développeur web freelance Québec à distance, création site web Québec pas cher, site web pas cher Québec, prix site web Québec, développeur web au Maroc pour le Canada, sous-traitance développement web Maroc Canada, développeur web marocain Canada, création site web diaspora marocaine Canada, site web bilingue français anglais Québec, développeur WordPress Québec freelance",
    metaTitle: "Création Site Web Québec et Canada à Distance — dès 290 $ CA",
    metaDescription:
      "Site web pour le Québec dès 290 $ CA par un développeur freelance francophone au Maroc. Site bilingue FR/EN, paiement après livraison. Devis gratuit 24h.",
    h1: "Création de Site Web pour le Québec et le Canada — Développeur Freelance au Maroc",
    heroSub:
      "Entrepreneur québécois, PME canadienne ou Marocain installé au Canada : je crée votre site web à distance depuis Casablanca, en français, bilingue français-anglais si besoin. Un budget bien inférieur à une agence de Montréal, et vous ne payez qu'après la livraison.",
    intro: [
      "Je suis développeur web freelance au Maroc et je crée des sites vitrine, e-commerce et applications web pour des clients au Québec et dans le reste du Canada. Deux profils me contactent surtout : des entrepreneurs et PME québécoises qui veulent un site professionnel sans payer les tarifs d'une agence montréalaise, et des Marocains installés au Canada qui préfèrent travailler en français avec un développeur qui comprend leur projet.",
      "Le Maroc est francophone : on échange en français, sans traduction ni intermédiaire, et je livre un site bilingue français / anglais quand votre clientèle l'exige. Côté technique, j'utilise les mêmes outils qu'une agence canadienne (React, WordPress, WooCommerce) — seule la facture change.",
      "Le décalage horaire est réel, mais il se gère : Casablanca a 5 à 6 heures d'avance sur Montréal. Vos matinées correspondent à mes après-midis, ce qui laisse chaque jour plusieurs heures pour une visio ou des échanges sur WhatsApp. Le travail avance pendant votre nuit, et vous retrouvez les modifications le matin.",
    ],
    offshore: {
      title: "Pourquoi faire créer votre site web au Maroc depuis le Canada ?",
      lead: "Ce que mes clients au Québec et au Canada y gagnent :",
      bullets: [
        ["Le budget", "Une agence québécoise facture couramment plusieurs milliers de dollars pour un site vitrine. Le même site démarre chez moi à 290 $ CA, parce que je n'ai ni bureau à Montréal ni équipe commerciale à financer."],
        ["Le français, sans compromis", "Contrairement à la plupart des options de sous-traitance à l'étranger, tout se fait en français : brief, maquette, textes et support. Le site peut être livré en français et en anglais."],
        ["Un travail qui avance la nuit", "Avec 5 à 6 heures d'avance, je travaille pendant votre nuit. Vous envoyez vos retours le soir, vous les retrouvez intégrés le lendemain matin."],
        ["Un seul interlocuteur", "Pas de plateforme ni de chef de projet : vous parlez directement au développeur qui code, livre et maintient votre site."],
      ],
      closing:
        "Côté paiement : je facture en dollars canadiens, vous réglez par virement international, Wise ou PayPal, uniquement après la livraison et votre validation — aucun acompte. Le code, le nom de domaine et les accès vous appartiennent.",
    },
    cities:
      "Je travaille avec des clients à Montréal, Québec, Laval, Gatineau et Sherbrooke, mais aussi à Ottawa et Toronto pour les entreprises francophones. Tout se fait à distance : votre ville ne change rien au délai ni au tarif.",
    budget: {
      title: "Prix d'un site web : freelance au Maroc ou agence au Québec",
      headers: ["Type de site", "MouDevPro — Freelance au Maroc", "Agence au Québec (ordre de grandeur)"],
      rows: [
        ["Site vitrine (5–10 pages)", "dès 290 $ CA — livré en 7 à 10 jours", "3 000 – 10 000 $ CA"],
        ["Site e-commerce", "dès 430 $ CA — livré en 2 à 3 semaines", "10 000 $ CA et +"],
        ["Application web sur mesure", "sur devis — selon le cahier des charges", "20 000 $ CA et +"],
      ],
      note: "Devis fixe sous 24h : le prix annoncé est le prix final. La version bilingue français / anglais est chiffrée dans le devis.",
    },
    valueProps: [
      ["💬", "Contact direct, en français", "Vous parlez directement avec le développeur. Communication claire en français, du brief à la mise en ligne — idéal pour le Québec et la diaspora marocaine au Canada."],
      ["💵", "Tarifs transparents en dollars", "Site vitrine dès 290 $ CA, e-commerce dès 430 $ CA. Bien moins cher qu'une agence locale, pour une qualité identique. Devis fixe avant de démarrer."],
      ["🌐", "Site bilingue FR / EN", "Votre site en français et en anglais pour toucher toute votre clientèle canadienne, avec un référencement Google adapté à chaque langue."],
      ["🚀", "Livraison 7 à 10 jours", "Pas de lourdeur d'agence. Votre site livré en une à deux semaines, paiement seulement une fois le résultat validé."],
    ],
    facts: [
      ["5–6 h", "d'avance sur Montréal : vos matinées sont mes après-midis, et le travail avance pendant votre nuit."],
      ["3 à 5×", "moins cher qu'une agence québécoise, pour une qualité technique identique (React, WordPress, WooCommerce)."],
      ["7-10 jours", "de délai pour un site vitrine professionnel — responsive, bilingue FR/EN possible, SEO inclus."],
      ["0 acompte", "paiement uniquement après livraison et validation. Virement international, Wise ou PayPal."],
    ],
    faq: [
      ["Pourquoi faire créer son site web au Maroc quand on est au Québec ?", "Pour payer nettement moins cher sans renoncer au français. Le Maroc est francophone : vous travaillez en français avec le développeur, avec les mêmes outils qu'une agence québécoise (React, WordPress, WooCommerce), mais sans ses coûts de structure. Un site vitrine démarre à 290 $ CA."],
      ["Comment gérez-vous le décalage horaire avec le Canada ?", "Casablanca a 5 à 6 heures d'avance sur Montréal. Je garde chaque jour des plages libres pendant vos matinées pour les visios et WhatsApp. Le reste du travail avance pendant votre nuit : vous envoyez vos retours le soir et vous les retrouvez intégrés le matin."],
      ["Pouvez-vous livrer un site bilingue français et anglais ?", "Oui. Je livre des sites bilingues avec une version française et une version anglaise distinctes, chacune référencée sur Google dans sa langue. C'est souvent indispensable pour une entreprise qui vend hors du Québec."],
      ["Je suis Marocain installé au Canada : pouvez-vous m'aider pour un projet ici ou au Maroc ?", "Oui. Je crée des sites pour des membres de la diaspora marocaine qui lancent une activité au Canada, mais aussi pour ceux qui ouvrent un commerce, un riad ou un projet immobilier au Maroc — en français, en arabe et en anglais."],
      ["Comment se fait le paiement depuis le Canada ?", "En dollars canadiens, par virement international, Wise ou PayPal — et toujours après la livraison et votre validation. Aucun acompte imposé."],
      ["Combien coûte un site web pour une entreprise au Québec ?", "Avec moi, un site vitrine démarre à 290 $ CA et un e-commerce à 430 $ CA, devis fixe sous 24h. En agence au Québec, un site vitrine se chiffre généralement en milliers de dollars."],
    ],
  },

  usa: {
    lang: "en",
    dir: "ltr",
    country: "USA",
    linkLabel: { fr: "les USA", en: "the USA" },
    locale: "en_US",
    hreflang: "en-US",
    slug: "usa",
    canonical: `${BASE}/usa`,
    currency: "$",
    currencyCode: "USD",
    price: { vitrine: "$219", ecommerce: "$329" },
    priceNumeric: { vitrine: "219", ecommerce: "329" },
    keywords:
      "freelance web developer USA, website development for US business, offshore web developer Morocco, hire freelance web developer remote, custom website USA, ecommerce website USA, React WordPress developer USA, affordable web developer USA, Moroccan web developer diaspora USA, build a website for my business, create a website USA, hire a web developer remote",
    metaTitle:
      "Freelance Web Developer USA — Websites from $219 | MouDEV",
    metaDescription:
      "Professional website for US businesses from $219, e-commerce from $329. Freelance developer, 100% remote, US-hours overlap, pay after delivery. Free quote in 24h.",
    h1: "Build a Website for Your US Business — Freelance Web Developer, Remote",
    heroSub:
      "I build your professional website remotely from Morocco for your US clients. Work directly with the developer, transparent pricing, pay only after delivery. Agency quality, freelance price.",
    intro: [
      "Whether you're a US small business owner or part of the Moroccan community in the States, I build your custom website by working directly with you — no agency, no middleman, and none of the agency price tag.",
      "Remote is how I work every day. We communicate over WhatsApp, email and video calls, with daily availability windows that overlap US hours. You talk to the developer who actually writes your code.",
      "You get the same technical quality as a US agency (React, WordPress, WooCommerce), delivery in 7 to 10 days, and a budget a fraction of local rates. You pay only after the site is delivered and approved.",
    ],
    valueProps: [
      ["💬", "Direct contact, no middleman", "You talk straight to the developer building your site — no account managers, no project managers. Faster answers, clearer decisions."],
      ["💲", "Transparent pricing in dollars", "Business website from $219, e-commerce from $329. A fraction of US agency rates, same technical quality. Fixed quote before any work starts."],
      ["🌐", "100% remote, US-hours overlap", "The whole project runs online. I keep daily windows that overlap US time zones, with one point of contact reachable on WhatsApp."],
      ["🚀", "7–10 day delivery", "No bureaucratic process. Your site goes live in one to two weeks, and you only pay once you're happy with the result."],
    ],
    facts: [
      ["US-hours", "daily availability windows that overlap US time zones — direct chat on WhatsApp and video calls."],
      ["A fraction", "of US agency rates, for the same technical quality (React, WordPress, WooCommerce)."],
      ["7-10 days", "delivery time for a complete professional business website — responsive and SEO-optimized."],
      ["$0 upfront", "you pay only after delivery and approval. Bank transfer, Wise or PayPal."],
    ],
    faq: [
      ["How does working remotely from Morocco actually work?", "Just like hiring a US freelancer: we use WhatsApp, email and video calls. I keep daily availability windows that overlap US hours, and you approve the design and the finished site before it goes live."],
      ["Why is this cheaper than a US web agency?", "No office, no team, no sales staff to pay for. You pay for the work, not the overhead — with the same stack a US agency uses (React, WordPress, WooCommerce)."],
      ["How do I pay you from the US?", "International bank transfer (IBAN), Wise or PayPal — and always after delivery and your approval. No upfront deposit required."],
      ["Do you speak English and understand the US market?", "Yes. I work in English and build sites that fit US expectations — local payment gateways, mobile-first design, SEO — for both US businesses and the Moroccan diaspora in the States."],
      ["Can you build a website for my US business remotely?", "Yes — that's exactly what I do. We talk through your needs over a video call or WhatsApp during US hours, I send a fixed quote within 24h, then I build your website (business site or e-commerce) in 7 to 10 days, 100% remotely from Morocco. You approve the design and the finished site, and you only pay after delivery."],
    ],
  },
};

export const marketRoutes = ["france", "canada", "usa"];
