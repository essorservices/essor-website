/**
 * Project brief form: copy and options.
 * The keys are stored in the e-mail and the Google Sheet, the labels are shown to visitors.
 */

export const briefPage = {
  label: "Démarrer un projet",
  title: "Parlez-nous de votre business.",
  highlight: "votre business.",
  intro: "Quatre étapes, environ trois minutes. Plus on en sait, plus notre première réponse sera utile.",
  /** TODO: confirmer ce délai avec l'équipe (même valeur que dans home.ts > notes) */
  promise: "Réponse sous 24 h, les jours ouvrés.",
};

export const briefSteps = [
  { key: "vous", label: "Vous", title: "Qui êtes-vous ?" },
  { key: "besoins", label: "Besoins", title: "De quoi avez-vous besoin ?" },
  { key: "cadre", label: "Cadre", title: "Budget et calendrier" },
  { key: "projet", label: "Projet", title: "Votre projet et vos coordonnées" },
] as const;

export const sectorOptions = [
  { value: "cafe", label: "Café / coffee shop" },
  { value: "restaurant", label: "Restaurant" },
  { value: "sante", label: "Santé / clinique" },
  { value: "commerce", label: "Boutique / commerce" },
  { value: "beaute", label: "Beauté / bien-être" },
  { value: "sport", label: "Sport" },
  { value: "immobilier", label: "Immobilier" },
  { value: "autre", label: "Autre" },
] as const;

export const needOptions = [
  { value: "branding", label: "Branding & identité" },
  { value: "strategie", label: "Stratégie & marketing" },
  { value: "contenu", label: "Contenu & vidéo" },
  { value: "web", label: "Site web ou application" },
  { value: "automatisation", label: "Automatisation & outils" },
  { value: "conseil", label: "Je ne sais pas encore, conseillez-moi" },
] as const;

/** TODO: ajuster les fourchettes et la devise au marché de l'agence */
export const budgetOptions = [
  { value: "lt100k", label: "Moins de 100 000 DA" },
  { value: "100-300k", label: "100 000 – 300 000 DA" },
  { value: "300-800k", label: "300 000 – 800 000 DA" },
  { value: "gt800k", label: "Plus de 800 000 DA" },
  { value: "unknown", label: "Je ne sais pas encore" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "Dès que possible" },
  { value: "1m", label: "Dans le mois" },
  { value: "3m", label: "D’ici 2 à 3 mois" },
  { value: "none", label: "Pas de date précise" },
] as const;

export const sourceOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "bouche-a-oreille", label: "Bouche-à-oreille" },
  { value: "google", label: "Google" },
  { value: "autre", label: "Autre" },
] as const;

export const briefCopy = {
  next: "Continuer",
  back: "Retour",
  submit: "Envoyer mon brief",
  sending: "Envoi en cours…",
  consent:
    "J’accepte qu’essor utilise ces informations pour répondre à ma demande. Elles ne sont jamais revendues ni cédées à des tiers.",
  successTitle: "Brief reçu.",
  successText: "Merci {name}. On lit tout attentivement et on revient vers vous très vite.",
  successCta: "Retour à l’accueil",
  errorTitle: "L’envoi n’a pas abouti.",
  errorText: "Réessayez dans un instant : vos réponses sont toujours là.",
};
