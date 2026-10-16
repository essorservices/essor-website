export type ServiceKey = "branding" | "strategie" | "contenu" | "web" | "automatisation";

export type Service = {
  key: ServiceKey;
  number: string;
  title: string;
  /** Short label used on pills, chips and tags */
  label: string;
  short: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    key: "branding",
    number: "01",
    title: "Branding & identité",
    label: "Branding",
    short: "Une marque qu’on reconnaît au premier coup d’œil.",
    description:
      "Logo, palette, typographies, charte graphique, packaging, signalétique : on construit un univers cohérent qui vous ressemble et qui fonctionne partout, de l’enseigne à la story Instagram.",
    deliverables: [
      "Logo & déclinaisons",
      "Charte graphique",
      "Packaging",
      "Signalétique",
      "Papeterie",
      "Templates réseaux sociaux",
    ],
  },
  {
    key: "strategie",
    number: "02",
    title: "Stratégie & marketing",
    label: "Stratégie",
    short: "Un plan clair pour être vu par les bonnes personnes.",
    description:
      "Positionnement, ligne éditoriale, calendrier de publication, gestion des réseaux sociaux et campagnes publicitaires sur Meta, Google et TikTok. On décide ensemble où aller, puis on mesure si on y arrive.",
    deliverables: [
      "Positionnement",
      "Ligne éditoriale",
      "Community management",
      "Publicité Meta & TikTok",
      "Google Ads & fiche Google",
      "Rapports mensuels",
    ],
  },
  {
    key: "contenu",
    number: "03",
    title: "Contenu & vidéo",
    label: "Contenu",
    short: "Des contenus qui donnent envie de pousser la porte.",
    description:
      "On tourne et on monte vos Reels et vos vidéos de présentation, et on réalise vos shootings photo. Format vertical ou horizontal, sur place chez vous, avec une direction artistique fidèle à votre marque.",
    deliverables: [
      "Reels & TikTok",
      "Vidéos de présentation",
      "Shooting photo",
      "Montage & sous-titres",
      "Motion design",
      "Contenus mensuels",
    ],
  },
  {
    key: "web",
    number: "04",
    title: "Sites web & applications",
    label: "Web & apps",
    short: "Votre vitrine et vos outils, ouverts 24 h/24.",
    description:
      "Sites vitrines, boutiques en ligne, applications web et mobiles. Rapides, faciles à mettre à jour, et pensés pour transformer un visiteur en client.",
    deliverables: [
      "Site vitrine",
      "E-commerce",
      "Application mobile",
      "Application web",
      "Menu digital & QR code",
      "Maintenance",
    ],
  },
  {
    key: "automatisation",
    number: "05",
    title: "Automatisation & outils",
    label: "Automatisation",
    short: "Moins de tâches répétitives, plus de temps pour vos clients.",
    description:
      "Réservations, relances, rappels SMS, chatbots, CRM, tableaux de bord : on connecte vos outils entre eux pour que les tâches répétitives se fassent toutes seules.",
    deliverables: [
      "Prise de rendez-vous",
      "Relances & rappels",
      "Chatbot WhatsApp",
      "CRM",
      "Tableaux de bord",
      "Intégrations",
    ],
  },
];

export const serviceByKey = Object.fromEntries(services.map((s) => [s.key, s])) as Record<
  ServiceKey,
  Service
>;
