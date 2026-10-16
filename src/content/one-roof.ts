import type { ServiceKey } from "./services";

export type BusinessKey = "cafe" | "restaurant" | "clinique" | "boutique";

export type Business = {
  key: BusinessKey;
  /** Tab label */
  label: string;
  /** Example business shown in the centre card */
  example: string;
  descriptor: string;
  items: { service: ServiceKey; label: string }[];
};

export const oneRoof = {
  title: "Un business au centre, tout le digital autour.",
  highlight: "tout le digital",
  intro:
    "Choisissez un type de business : on vous montre tout ce qu’on peut prendre en charge pour lui. Du logo à l’appli, sans changer d’interlocuteur.",
  businesses: [
    {
      key: "cafe",
      label: "Café",
      example: "Votre café",
      descriptor: "Coffee shop de quartier",
      items: [
        { service: "branding", label: "Logo, gobelets & enseigne" },
        { service: "strategie", label: "Stratégie Instagram & TikTok" },
        { service: "contenu", label: "Reels barista & latte art" },
        { service: "web", label: "Menu digital + QR code" },
        { service: "web", label: "Commande en ligne" },
        { service: "automatisation", label: "Carte de fidélité automatique" },
      ],
    },
    {
      key: "restaurant",
      label: "Restaurant",
      example: "Votre restaurant",
      descriptor: "Cuisine & salle",
      items: [
        { service: "branding", label: "Identité & carte des plats" },
        { service: "contenu", label: "Shooting des plats" },
        { service: "contenu", label: "Reels en cuisine" },
        { service: "strategie", label: "Campagnes Meta Ads" },
        { service: "web", label: "Réservation en ligne" },
        { service: "automatisation", label: "Demandes d’avis Google" },
      ],
    },
    {
      key: "clinique",
      label: "Clinique",
      example: "Votre clinique",
      descriptor: "Cabinet & soins",
      items: [
        { service: "branding", label: "Identité rassurante" },
        { service: "web", label: "Site + prise de rendez-vous" },
        { service: "automatisation", label: "Rappels SMS automatiques" },
        { service: "contenu", label: "Vidéo de présentation" },
        { service: "strategie", label: "Fiche Google optimisée" },
        { service: "strategie", label: "Contenus pédagogiques" },
      ],
    },
    {
      key: "boutique",
      label: "Boutique",
      example: "Votre boutique",
      descriptor: "Mode & commerce",
      items: [
        { service: "branding", label: "Identité & packaging" },
        { service: "web", label: "Boutique en ligne" },
        { service: "contenu", label: "Shooting produits" },
        { service: "strategie", label: "Campagnes saisonnières" },
        { service: "automatisation", label: "Relance des paniers abandonnés" },
        { service: "contenu", label: "Reels nouveautés" },
      ],
    },
  ] satisfies Business[],
};
