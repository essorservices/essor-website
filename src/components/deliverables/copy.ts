import { projects, type ClientTheme } from "@/content/projects";

/**
 * Microcopy printed inside the mockups (fake UI text of the client's own products).
 * Chosen by sector so a café shows a menu and a gym shows a class schedule.
 * Unknown brands fall back to a neutral set.
 */

export type FlowStepType = "Déclencheur" | "Action" | "Délai" | "Condition";
export type FlowIconName = "bolt" | "message" | "clock" | "stamp" | "branch" | "bell" | "tag" | "star" | "calendar" | "mail";

export type DeliverableCopy = {
  nav: [string, string, string];
  cta: string;
  secondary: string;
  eyebrow: string;
  heroSub: string;
  cards: [string, string, string];
  reelOverlay: string;
  reelCaption: string;
  greeting: string;
  appCard: { label: string; title: string; meta: string; action: string };
  appRing: { label: string; done: number; total: number; unit: string };
  appListTitle: string;
  appRows: [string, string][];
  postHeadline: string;
  postTag: string;
  postMeta: string;
  postCaption: string;
  liker: string;
  flowTitle: string;
  flow: { type: FlowStepType; label: string; icon: FlowIconName }[];
  application: "cup" | "bag" | "card";
};

type Flavour = "cafe" | "restaurant" | "sante" | "mode" | "sport" | "generic";

const copies: Record<Flavour, DeliverableCopy> = {
  cafe: {
    nav: ["Carte", "Le lieu", "Fidélité"],
    cta: "Commander",
    secondary: "Voir la carte",
    eyebrow: "Coffee shop · Dès 7 h",
    heroSub: "Cafés de spécialité, pâtisseries maison et commande à emporter depuis votre téléphone.",
    cards: ["Espresso", "Flat white", "Cookie noisette"],
    reelOverlay: "Latte art du matin",
    reelCaption: "Le premier latte de la journée, tiré à la main.",
    greeting: "Bonjour Yanis",
    appCard: { label: "Commande n° 24", title: "Votre commande est prête", meta: "Latte avoine · Cookie", action: "Au comptoir" },
    appRing: { label: "Carte fidélité", done: 7, total: 10, unit: "cafés" },
    appListTitle: "Vos habitudes",
    appRows: [
      ["Latte avoine", "Moyen"],
      ["Espresso double", "Petit"],
      ["Cookie noisette", "× 1"],
    ],
    postHeadline: "Nouvelle carte",
    postTag: "Dès lundi",
    postMeta: "Centre-ville",
    postCaption: "La carte change avec la saison : trois nouveaux cafés et un cookie à la noisette, à goûter dès lundi.",
    liker: "yasmine.b",
    flowTitle: "Programme fidélité",
    flow: [
      { type: "Déclencheur", label: "Achat enregistré", icon: "bolt" },
      { type: "Action", label: "Ajouter un tampon", icon: "stamp" },
      { type: "Condition", label: "10 tampons atteints", icon: "branch" },
      { type: "Action", label: "SMS « café offert »", icon: "message" },
    ],
    application: "cup",
  },
  restaurant: {
    nav: ["La carte", "Le lieu", "Privatiser"],
    cta: "Réserver",
    secondary: "Voir la carte",
    eyebrow: "Restaurant · Midi & soir",
    heroSub: "Une cuisine de famille, généreuse et de saison. Réservez votre table en trois clics.",
    cards: ["Entrées", "Plats du jour", "Desserts"],
    reelOverlay: "Le service du soir",
    reelCaption: "Coulisses d’un vendredi soir en cuisine.",
    greeting: "Bonsoir Inès",
    appCard: { label: "Réservation confirmée", title: "Ce soir, 20:30", meta: "4 personnes · Terrasse", action: "Itinéraire" },
    appRing: { label: "Fidélité", done: 4, total: 5, unit: "dîners" },
    appListTitle: "Le menu du jour",
    appRows: [
      ["Pastilla au poulet", "Entrée"],
      ["Tajine d’agneau", "Plat"],
      ["Orange à la cannelle", "Dessert"],
    ],
    postHeadline: "Le menu du vendredi",
    postTag: "Ce soir",
    postMeta: "Sponsorisé",
    postCaption: "Pastilla, tajine d’agneau et orange à la cannelle : il reste quelques tables pour ce soir.",
    liker: "nadia.m",
    flowTitle: "Réservations",
    flow: [
      { type: "Déclencheur", label: "Nouvelle réservation", icon: "bolt" },
      { type: "Action", label: "SMS de confirmation", icon: "message" },
      { type: "Délai", label: "Le jour J, à 15:00", icon: "clock" },
      { type: "Action", label: "Rappel par SMS", icon: "bell" },
    ],
    application: "card",
  },
  sante: {
    nav: ["Soins", "L’équipe", "Infos pratiques"],
    cta: "Rendez-vous",
    secondary: "Nos soins",
    eyebrow: "Clinique dentaire · Sur rendez-vous",
    heroSub: "Des soins expliqués simplement, une équipe à l’écoute et la prise de rendez-vous en ligne.",
    cards: ["Contrôle", "Détartrage", "Blanchiment"],
    reelOverlay: "Votre première visite",
    reelCaption: "On vous montre comment se passe un premier rendez-vous.",
    greeting: "Bonjour Karim",
    appCard: { label: "Prochain rendez-vous", title: "Mardi, 10:00", meta: "Contrôle annuel · Salle 2", action: "Confirmer" },
    appRing: { label: "Plan de soins", done: 2, total: 3, unit: "séances" },
    appListTitle: "Historique",
    appRows: [
      ["Détartrage", "12 mars"],
      ["Radio panoramique", "4 févr."],
      ["Consultation", "18 janv."],
    ],
    postHeadline: "Rendez-vous en ligne",
    postTag: "Nouveau",
    postMeta: "Sponsorisé",
    postCaption: "Plus besoin d’appeler : choisissez votre créneau en ligne, on vous envoie un rappel la veille.",
    liker: "lina.s",
    flowTitle: "Rappels patients",
    flow: [
      { type: "Déclencheur", label: "Rendez-vous réservé", icon: "calendar" },
      { type: "Action", label: "SMS de confirmation", icon: "message" },
      { type: "Délai", label: "Jusqu’à la veille", icon: "clock" },
      { type: "Action", label: "Rappel du rendez-vous", icon: "bell" },
    ],
    application: "card",
  },
  mode: {
    nav: ["Collection", "Atelier", "Journal"],
    cta: "Boutique",
    secondary: "Le lookbook",
    eyebrow: "Prêt-à-porter · Petites séries",
    heroSub: "Des pièces dessinées et cousues à l’atelier, en petites séries, livrées chez vous.",
    cards: ["Robe Sidra", "Chemise Ilef", "Jupe Nada"],
    reelOverlay: "3 façons de la porter",
    reelCaption: "La robe Sidra, du matin au soir.",
    greeting: "Bonjour Sofia",
    appCard: { label: "Commande expédiée", title: "Livraison jeudi", meta: "Robe Sidra · Taille M", action: "Suivre le colis" },
    appRing: { label: "Livraison", done: 3, total: 4, unit: "étapes" },
    appListTitle: "Vos favoris",
    appRows: [
      ["Chemise Ilef", "Lin"],
      ["Jupe Nada", "Coton"],
      ["Robe Sidra", "Viscose"],
    ],
    postHeadline: "Nouvelle collection",
    postTag: "En ligne",
    postMeta: "Sponsorisé",
    postCaption: "Des matières légères et des coupes amples : la collection est en ligne et en boutique.",
    liker: "meriem.a",
    flowTitle: "Commandes en ligne",
    flow: [
      { type: "Déclencheur", label: "Commande payée", icon: "bolt" },
      { type: "Action", label: "Étiquette d’envoi", icon: "tag" },
      { type: "Délai", label: "Attendre 3 jours", icon: "clock" },
      { type: "Action", label: "Demande d’avis", icon: "star" },
    ],
    application: "bag",
  },
  sport: {
    nav: ["Planning", "Coachs", "Tarifs"],
    cta: "S’inscrire",
    secondary: "Le planning",
    eyebrow: "Salle de sport · Cours collectifs",
    heroSub: "Musculation, cross training et cours collectifs. Réservez votre séance depuis l’appli.",
    cards: ["Cross training", "Yoga flow", "Musculation"],
    reelOverlay: "Le cours de 18:30",
    reelCaption: "Une séance de cross training en trente secondes.",
    greeting: "Salut Amine",
    appCard: { label: "Prochaine séance", title: "18:30", meta: "Cross training · Salle 2", action: "Réservé" },
    appRing: { label: "Cette semaine", done: 3, total: 4, unit: "séances" },
    appListTitle: "Demain",
    appRows: [
      ["Yoga flow", "07:00"],
      ["HIIT", "12:15"],
      ["Mobilité", "19:00"],
    ],
    postHeadline: "Nouveau planning",
    postTag: "Dès lundi",
    postMeta: "Sponsorisé",
    postCaption: "Plus de cours le soir et le week-end : le nouveau planning est déjà dans l’appli.",
    liker: "rayan.k",
    flowTitle: "Abonnements",
    flow: [
      { type: "Déclencheur", label: "Échéance dans 7 jours", icon: "calendar" },
      { type: "Action", label: "Rappel dans l’appli", icon: "bell" },
      { type: "Délai", label: "Attendre 3 jours", icon: "clock" },
      { type: "Action", label: "Relance par SMS", icon: "message" },
    ],
    application: "card",
  },
  generic: {
    nav: ["Services", "À propos", "Contact"],
    cta: "Nous écrire",
    secondary: "Nos services",
    eyebrow: "Bienvenue",
    heroSub: "Ce que nous faisons, comment nous travaillons et un moyen simple de nous contacter.",
    cards: ["Services", "Réalisations", "Contact"],
    reelOverlay: "Dans les coulisses",
    reelCaption: "Une journée avec l’équipe.",
    greeting: "Bonjour Sami",
    appCard: { label: "Nouveau message", title: "Demande reçue", meta: "Via le formulaire", action: "Ouvrir" },
    appRing: { label: "Votre dossier", done: 2, total: 3, unit: "étapes" },
    appListTitle: "Récent",
    appRows: [
      ["Devis envoyé", "Lun."],
      ["Rendez-vous", "Mar."],
      ["Facture", "Jeu."],
    ],
    postHeadline: "C’est nouveau",
    postTag: "Cette semaine",
    postMeta: "Sponsorisé",
    postCaption: "Une nouveauté arrive cette semaine, on vous dit tout en story.",
    liker: "sami.d",
    flowTitle: "Nouveaux contacts",
    flow: [
      { type: "Déclencheur", label: "Nouveau contact", icon: "bolt" },
      { type: "Action", label: "Email de bienvenue", icon: "mail" },
      { type: "Délai", label: "Attendre 2 jours", icon: "clock" },
      { type: "Action", label: "Relance personnalisée", icon: "message" },
    ],
    application: "card",
  },
};

const rules: [RegExp, Flavour][] = [
  [/caf[eé]|coffee|boulang|p[aâ]tiss|th[eé]/i, "cafe"],
  [/restaurant|traiteur|food|cuisine|pizz|burger/i, "restaurant"],
  [/dent|clinique|sant[eé]|m[eé]dic|cabinet|pharma/i, "sante"],
  [/mode|boutique|pr[eê]t|bijou|beaut|v[eê]tement|atelier/i, "mode"],
  [/sport|fitness|gym|salle|coach|yoga/i, "sport"],
];

export function copyFor(theme: ClientTheme): DeliverableCopy {
  const sector = projects.find((p) => p.theme.brand === theme.brand)?.sector ?? "";
  const hit = rules.find(([re]) => re.test(sector)) ?? rules.find(([re]) => re.test(theme.brand));
  return copies[hit?.[1] ?? "generic"];
}
