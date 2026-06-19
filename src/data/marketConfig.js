const BASE = "https://www.moudevpro.com";

// International market landing pages (organic SEO).
// Audience: Moroccan diaspora (MRE) + local businesses wanting quality remote dev
// at an optimized price. Pricing shown in local currency (€/$).
export const marketConfig = {
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
      "développeur web freelance France, création site web France, développeur web Maroc pour la France, freelance site internet France, création site vitrine France, site e-commerce France pas cher, développeur React WordPress France, devis site web France, créer site web MRE France, créer un site web pour entreprise, faire un site web France, comment créer un site web",
    metaTitle:
      "Développeur Web Freelance France — Site dès 199 € | MouDEV",
    metaDescription:
      "Site web pro pour la France dès 199 €, e-commerce dès 299 €. Développeur freelance, même fuseau horaire (±1h), paiement après livraison. Devis gratuit 24h.",
    h1: "Créer un Site Web pour la France — Développeur Web Freelance à Distance",
    heroSub:
      "Je crée votre site web professionnel depuis le Maroc, pour vos clients en France. Contact direct avec le développeur, tarif optimisé, même fuseau horaire. Qualité agence, prix freelance.",
    intro: [
      "Que vous soyez un entrepreneur français ou un Marocain résidant en France (MRE), je crée votre site web sur mesure en travaillant directement avec vous — sans agence, sans intermédiaire, et sans les tarifs d'une agence parisienne.",
      "Basé au Maroc, je suis sur le même fuseau horaire que la France (±1h) : on échange en direct sur WhatsApp ou en visio, aux heures qui vous arrangent. Vous parlez français avec le développeur qui code réellement votre site.",
      "Résultat : la même qualité technique qu'une agence française (React, WordPress, WooCommerce), un délai de 7 à 10 jours, et un budget 3 à 5 fois inférieur. Vous ne payez qu'après livraison.",
    ],
    valueProps: [
      ["💬", "Contact direct, en français", "Vous parlez directement avec le développeur qui code votre site. Pas de commercial, pas de chef de projet — réponses claires et rapides."],
      ["💶", "Tarifs transparents en euros", "Site vitrine dès 199 €, e-commerce dès 299 €. 3 à 5 fois moins cher qu'une agence française, à qualité égale. Devis fixe avant de commencer."],
      ["🕐", "Même fuseau horaire", "Basé au Maroc (±1h avec la France), je suis disponible aux heures françaises. Échanges fluides, suivi en temps réel, aucune attente."],
      ["🚀", "Livraison 7 à 10 jours", "Pas de process bureaucratique. Votre site en ligne en une à deux semaines, et vous ne réglez qu'une fois satisfait du résultat."],
    ],
    facts: [
      ["±1h", "de décalage horaire avec la France — disponible à vos heures, échanges en direct sur WhatsApp et en visio."],
      ["3 à 5×", "moins cher qu'une agence française, à qualité technique égale (React, WordPress, WooCommerce)."],
      ["7-10 jours", "de délai pour un site vitrine professionnel complet — responsive et optimisé pour Google."],
      ["0 acompte", "vous ne payez qu'après livraison et validation du site. Virement, Wise ou PayPal."],
    ],
    faq: [
      ["Comment se passe le travail à distance depuis le Maroc ?", "Exactement comme avec un freelance français, en mieux : nous échangeons par WhatsApp, e-mail et visio. Je suis sur le même fuseau horaire que la France (±1h), donc disponible à vos heures. Vous validez la maquette puis le site avant la mise en ligne."],
      ["Pourquoi vos tarifs sont-ils moins chers qu'une agence française ?", "Je n'ai ni bureau parisien, ni équipe, ni commerciaux à financer. Vous bénéficiez de la même stack technique (React, WordPress, WooCommerce) qu'une agence, sans les coûts de structure répercutés sur la facture."],
      ["Comment puis-je vous payer depuis la France ?", "Par virement bancaire international (IBAN), Wise ou PayPal. Et surtout : vous ne payez qu'après la livraison et la validation du site — zéro acompte imposé."],
      ["Parlez-vous français et comprenez-vous le marché français ?", "Oui. Je travaille en français au quotidien et je conçois des sites adaptés aux attentes des clients français et de la diaspora marocaine en France — mentions légales, RGPD, moyens de paiement locaux inclus."],
      ["Comment créer un site web pour mon entreprise en France ?", "C'est simple : on échange 30 min sur votre besoin, je vous envoie un devis fixe sous 24h, puis je crée votre site web (vitrine ou e-commerce) en 7 à 10 jours. Tout se fait à distance depuis le Maroc, en français, sur le même fuseau horaire que la France (±1h). Vous validez la maquette puis le site, et vous ne payez qu'après la livraison."],
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
      "développeur web freelance Canada, création site web Québec, développeur web Maroc pour le Canada, freelance site internet Québec, création site vitrine Canada, site e-commerce Canada, développeur React WordPress Québec, devis site web Canada, créer site web diaspora marocaine Canada, créer un site web Québec, faire un site web Canada, comment créer un site web",
    metaTitle:
      "Développeur Web Freelance Canada — Site dès 290 $ CA | MouDEV",
    metaDescription:
      "Site web pro pour le Canada dès 290 $ CA, e-commerce dès 430 $ CA. Développeur freelance en français, 100% à distance, paiement après livraison. Devis gratuit 24h.",
    h1: "Créer un Site Web pour le Canada — Développeur Web Freelance à Distance",
    heroSub:
      "Je crée votre site web professionnel depuis le Maroc, pour vos clients au Québec et partout au Canada. Contact direct en français, tarif optimisé, paiement après livraison.",
    intro: [
      "Entrepreneur québécois, PME canadienne ou Marocain installé au Canada : je crée votre site web sur mesure en travaillant directement avec vous, en français, sans agence ni intermédiaire.",
      "Le travail à distance est mon quotidien. Nous échangeons par WhatsApp, e-mail et visio ; je prévois des plages de disponibilité adaptées au décalage horaire avec le Québec et le reste du Canada, pour un suivi fluide.",
      "Vous obtenez la qualité technique d'une agence canadienne (React, WordPress, WooCommerce), une livraison en 7 à 10 jours et un budget nettement inférieur. Paiement uniquement après validation du site.",
    ],
    valueProps: [
      ["💬", "Contact direct, en français", "Vous parlez directement avec le développeur. Communication claire en français, du brief à la mise en ligne — idéal pour le Québec et la diaspora marocaine au Canada."],
      ["💵", "Tarifs transparents en dollars", "Site vitrine dès 290 $ CA, e-commerce dès 430 $ CA. Bien moins cher qu'une agence locale, pour une qualité identique. Devis fixe et détaillé avant de démarrer."],
      ["🌐", "100% à distance, suivi simple", "Tout le projet se gère en ligne. Plages horaires adaptées au décalage Canada–Maroc, et un interlocuteur unique joignable sur WhatsApp."],
      ["🚀", "Livraison 7 à 10 jours", "Pas de lourdeur d'agence. Votre site livré en une à deux semaines, paiement seulement une fois le résultat validé."],
    ],
    facts: [
      ["100% à distance", "tout le projet géré en ligne, avec des plages horaires adaptées au décalage Canada–Maroc."],
      ["3 à 5×", "moins cher qu'une agence canadienne, pour une qualité technique identique (React, WordPress, WooCommerce)."],
      ["7-10 jours", "de délai pour un site vitrine professionnel — responsive, bilingue FR/EN possible, SEO inclus."],
      ["0 acompte", "paiement uniquement après livraison et validation. Virement international, Wise ou PayPal."],
    ],
    faq: [
      ["Comment gérez-vous le décalage horaire avec le Canada ?", "Je réserve chaque jour des plages adaptées aux heures canadiennes (Québec et autres provinces) pour nos échanges en visio ou WhatsApp. Le reste du travail avance en continu, donc votre projet progresse même pendant votre nuit."],
      ["Pourquoi est-ce moins cher qu'une agence canadienne ?", "Pas de bureau ni d'équipe à financer : vous payez le travail, pas la structure. La stack technique reste la même qu'une agence (React, WordPress, WooCommerce)."],
      ["Comment se fait le paiement depuis le Canada ?", "Virement international, Wise ou PayPal — et toujours après la livraison et votre validation. Aucun acompte imposé."],
      ["Travaillez-vous en français et en anglais ?", "Oui. Je travaille principalement en français (idéal pour le Québec et la diaspora marocaine) et je peux livrer un site bilingue français / anglais selon votre clientèle."],
      ["Comment créer un site web pour mon entreprise au Québec ou au Canada ?", "On échange sur votre besoin (visio ou WhatsApp aux heures canadiennes), je vous envoie un devis fixe sous 24h, puis je crée votre site web (vitrine ou e-commerce) en 7 à 10 jours — en français, 100% à distance. Vous validez avant la mise en ligne et vous payez uniquement après livraison."],
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
