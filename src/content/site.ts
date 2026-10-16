/**
 * Global site settings.
 * Every value marked TODO must be confirmed by the essor team before launch.
 * Empty strings are not rendered, so an unknown value never shows up on the site.
 */

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const site = {
  name: "essor",
  /** TODO: raison sociale exacte pour les mentions légales */
  legalName: "essor",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || productionUrl || "http://localhost:3000",
  tagline: "Tout le digital de votre business.",
  description:
    "essor est une agence de branding, marketing et développement. Identité visuelle, stratégie, Reels, sites web, applications et automatisations : on prend en charge tout le digital de votre business.",
  locale: "fr_FR",

  contact: {
    /** TODO: adresse e-mail publique de l'agence */
    email: "",
    /** TODO: numéro au format international, ex. "+213 555 00 00 00" */
    phone: "",
    /** TODO: numéro WhatsApp sans espaces ni +, ex. "213555000000" */
    whatsapp: "",
    /** TODO: ville / pays affichés dans le pied de page */
    city: "",
  },

  /** TODO: renseigner les liens réels. Les entrées sans URL ne s'affichent pas. */
  socials: [
    { label: "Instagram", href: "" },
    { label: "TikTok", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Behance", href: "" },
  ],

  nav: [
    { label: "Services", href: "/#services" },
    { label: "Projets", href: "/projets" },
    { label: "Studio", href: "/#studio" },
    { label: "Méthode", href: "/#methode" },
  ],

  cta: { label: "Démarrer un projet", href: "/contact" },
} as const;

export const socialLinks = site.socials.filter((s) => s.href.length > 0);
