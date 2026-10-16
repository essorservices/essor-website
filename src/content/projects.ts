import type { ServiceKey } from "./services";

/**
 * PROJECTS
 * These are concept projects (concept: true) used until real case studies are ready.
 * They render with a visible "Projet concept" tag. To add a real project, copy an entry,
 * set concept: false, and fill in the real client, texts and media.
 */

export type DeliverableKind = "identity" | "reel" | "website" | "app" | "post" | "automation";

/** Visual identity of a client, used to render deliverable mockups in their colours */
export type ClientTheme = {
  /** Brand name as it appears on mockups */
  brand: string;
  /** 1–2 letters used for the monogram */
  monogram: string;
  /** Main background colour of the client's brand */
  bg: string;
  /** Secondary surface (cards, panels) */
  surface: string;
  /** Text colour on bg */
  ink: string;
  /** Primary accent */
  accent: string;
  /** Secondary accent */
  accent2: string;
  /** Short brand line used in mockups */
  line: string;
  /** Decorative motif used by the compositions */
  motif: "arch" | "circle" | "wave" | "stripe" | "grid";
  /** Typographic voice for the mockups */
  voice: "display" | "sans" | "mono";
};

export type Project = {
  slug: string;
  concept: boolean;
  client: string;
  sector: string;
  year: string;
  services: ServiceKey[];
  headline: string;
  summary: string;
  challenge: string;
  approach: { service: ServiceKey; title: string; text: string }[];
  deliverables: string[];
  theme: ClientTheme;
  cover: DeliverableKind;
  gallery: DeliverableKind[];
};

export const projects: Project[] = [
  {
    slug: "cafe-nour",
    concept: true,
    client: "Café Nour",
    sector: "Coffee shop",
    year: "2026",
    services: ["branding", "contenu", "web", "automatisation"],
    headline: "Une identité chaleureuse et une fidélité qui tourne toute seule.",
    summary:
      "Un coffee shop de quartier qui voulait une image à la hauteur de son café, et des clients qui reviennent sans avoir à tenir une carte en carton.",
    challenge:
      "Le café était bon, mais rien ne le distinguait des autres : pas de logo propre, une carte photocopiée et un compte Instagram alimenté au hasard. Les habitués revenaient, les nouveaux ne s’arrêtaient pas.",
    approach: [
      {
        service: "branding",
        title: "Une identité qui sent le café",
        text: "Un monogramme en forme d’arche, une palette crème et caramel, et des déclinaisons pour les gobelets, les sacs et l’enseigne.",
      },
      {
        service: "contenu",
        title: "Des Reels tournés derrière le comptoir",
        text: "Une journée de tournage par mois : latte art, préparation, coulisses. Montés au format vertical, prêts à publier.",
      },
      {
        service: "web",
        title: "Un menu digital et la commande à emporter",
        text: "Un QR code sur chaque table, un menu toujours à jour, et la possibilité de commander avant de passer.",
      },
      {
        service: "automatisation",
        title: "Une carte de fidélité sans carton",
        text: "Le dixième café offert, suivi automatiquement à partir du numéro de téléphone, avec un message quand la récompense est prête.",
      },
    ],
    deliverables: ["Logo & monogramme", "Packaging", "Menu digital", "Reels mensuels", "Programme de fidélité"],
    theme: {
      brand: "Café Nour",
      monogram: "N",
      bg: "#F3E7D7",
      surface: "#FBF5EC",
      ink: "#3A2216",
      accent: "#C8742B",
      accent2: "#7F9C80",
      line: "Torréfié avec soin",
      motif: "arch",
      voice: "display",
    },
    cover: "identity",
    gallery: ["identity", "reel", "app", "automation"],
  },
  {
    slug: "maison-safran",
    concept: true,
    client: "Maison Safran",
    sector: "Restaurant",
    year: "2026",
    services: ["branding", "contenu", "strategie", "web"],
    headline: "Des tables pleines le soir, réservées depuis Instagram.",
    summary:
      "Un restaurant de cuisine familiale qui faisait le plein le midi mais peinait le soir. On a refait son image, ses photos et son parcours de réservation.",
    challenge:
      "Des plats superbes mais mal photographiés, des réservations prises au téléphone pendant le service, et une présence en ligne qui ne donnait pas envie de venir dîner.",
    approach: [
      {
        service: "branding",
        title: "Une identité généreuse",
        text: "Un vert profond, une touche safran et une typographie élégante, déclinés sur la carte, les sets de table et la devanture.",
      },
      {
        service: "contenu",
        title: "Un shooting pensé pour donner faim",
        text: "Lumière naturelle, plats en situation, mains en cuisine : une banque d’images pour toute l’année.",
      },
      {
        service: "strategie",
        title: "Des campagnes ciblées autour du restaurant",
        text: "Des publicités Meta diffusées dans un rayon de quelques kilomètres, les soirs où la salle se vide.",
      },
      {
        service: "web",
        title: "Réserver en trois clics",
        text: "Un site rapide avec la carte, les horaires et une réservation en ligne reliée au planning de la salle.",
      },
    ],
    deliverables: ["Identité visuelle", "Shooting culinaire", "Campagnes Meta", "Site & réservation"],
    theme: {
      brand: "Maison Safran",
      monogram: "MS",
      bg: "#1E2B24",
      surface: "#2A3A31",
      ink: "#F5ECDD",
      accent: "#E2A52E",
      accent2: "#B84A2C",
      line: "Cuisine de famille",
      motif: "circle",
      voice: "display",
    },
    cover: "post",
    gallery: ["post", "website", "identity", "reel"],
  },
  {
    slug: "clinique-azur",
    concept: true,
    client: "Clinique Azur",
    sector: "Clinique dentaire",
    year: "2026",
    services: ["web", "automatisation", "strategie"],
    headline: "Des rendez-vous en ligne et beaucoup moins d’absences.",
    summary:
      "Une clinique dentaire dont le secrétariat passait ses journées au téléphone. On a mis la prise de rendez-vous en ligne et automatisé les rappels.",
    challenge:
      "Un standard saturé, des patients qui oubliaient leur rendez-vous et un site qui datait. L’équipe voulait retrouver du temps pour l’accueil.",
    approach: [
      {
        service: "web",
        title: "Un site clair et rassurant",
        text: "Les soins expliqués simplement, l’équipe présentée, et un bouton de rendez-vous visible sur chaque page.",
      },
      {
        service: "automatisation",
        title: "Des rappels qui partent tout seuls",
        text: "Un SMS de confirmation à la réservation, un rappel la veille, et une relance pour les contrôles annuels.",
      },
      {
        service: "strategie",
        title: "Être trouvé localement",
        text: "Une fiche Google optimisée, des avis patients sollicités automatiquement et des contenus pédagogiques.",
      },
    ],
    deliverables: ["Site web", "Prise de rendez-vous", "Rappels SMS", "Référencement local"],
    theme: {
      brand: "Clinique Azur",
      monogram: "A",
      bg: "#EEF6F6",
      surface: "#FFFFFF",
      ink: "#12343B",
      accent: "#23A39C",
      accent2: "#9BD3CE",
      line: "Soins dentaires",
      motif: "wave",
      voice: "sans",
    },
    cover: "website",
    gallery: ["website", "automation", "app"],
  },
  {
    slug: "atelier-lina",
    concept: true,
    client: "Atelier Lina",
    sector: "Boutique de mode",
    year: "2026",
    services: ["branding", "web", "contenu", "strategie"],
    headline: "D’une boutique de quartier à une marque qui vend partout.",
    summary:
      "Une créatrice de prêt-à-porter qui vendait en boutique et en messages privés. On a construit sa marque et sa boutique en ligne.",
    challenge:
      "Des commandes prises sur Instagram à la main, des photos faites au téléphone et aucune boutique en ligne. Chaque vente prenait trop de temps.",
    approach: [
      {
        service: "branding",
        title: "Une marque à porter",
        text: "Un logotype souple, une palette poudrée et un packaging qui donne envie de partager le déballage.",
      },
      {
        service: "web",
        title: "Une boutique en ligne simple à gérer",
        text: "Catalogue, tailles, paiement et livraison : tout se gère depuis un seul tableau de bord.",
      },
      {
        service: "contenu",
        title: "Des shootings à chaque collection",
        text: "Photos portées, détails des matières et Reels de nouveautés pour chaque lancement.",
      },
      {
        service: "strategie",
        title: "Des lancements qui font du bruit",
        text: "Un calendrier de publication autour de chaque collection et des campagnes ciblées sur les bonnes clientes.",
      },
    ],
    deliverables: ["Identité & packaging", "E-commerce", "Shootings collection", "Stratégie de lancement"],
    theme: {
      brand: "Atelier Lina",
      monogram: "L",
      bg: "#F6E6E1",
      surface: "#FFF7F4",
      ink: "#2C1A2E",
      accent: "#BF4B6C",
      accent2: "#E7B5A6",
      line: "Nouvelle collection",
      motif: "stripe",
      voice: "display",
    },
    cover: "reel",
    gallery: ["reel", "website", "identity", "post"],
  },
  {
    slug: "pulse",
    concept: true,
    client: "Pulse",
    sector: "Salle de sport",
    year: "2026",
    services: ["web", "automatisation", "contenu"],
    headline: "Une appli membre et des abonnements qui se renouvellent seuls.",
    summary:
      "Une salle de sport qui gérait ses abonnements sur un tableur. On a créé son application membre et automatisé les relances.",
    challenge:
      "Des renouvellements oubliés, des cours collectifs réservés sur un groupe WhatsApp et aucune visibilité sur les membres actifs.",
    approach: [
      {
        service: "web",
        title: "Une application pour les membres",
        text: "Réservation des cours, suivi de l’abonnement et notifications, sur iPhone et Android.",
      },
      {
        service: "automatisation",
        title: "Des relances au bon moment",
        text: "Rappel avant l’échéance, message de retour après deux semaines d’absence, tableau de bord pour l’équipe.",
      },
      {
        service: "contenu",
        title: "Une énergie qui se voit",
        text: "Des Reels tournés pendant les cours et des portraits de coachs pour donner envie de s’inscrire.",
      },
    ],
    deliverables: ["Application mobile", "Automatisations", "Reels"],
    theme: {
      brand: "Pulse",
      monogram: "P",
      bg: "#121212",
      surface: "#1E1E1E",
      ink: "#F1F1EC",
      accent: "#D5F53B",
      accent2: "#6E6E6E",
      line: "Train harder",
      motif: "grid",
      voice: "mono",
    },
    cover: "app",
    gallery: ["app", "automation", "reel"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
