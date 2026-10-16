/**
 * Microcopy of the work pages that does not exist in src/content yet.
 * Candidates to move into src/content/projects.ts (see the builder report).
 * Non-breaking spaces ( ) sit before ? ! : ; as French typography requires.
 */
export const workCopy = {
  concept: "Projet concept",
  conceptNote:
    "Ces projets sont des concepts : des business imaginés pour montrer comment nos métiers s’enchaînent, de l’identité aux automatisations.",

  index: {
    title: "Projets",
    metaDescription:
      "Cafés, restaurants, cliniques, boutiques : des projets concept qui montrent comment essor prend en charge tout le digital d’un business, de la marque à l’appli.",
    filterLabel: "Filtrer par métier",
    all: "Tous",
    count: (n: number) => (n > 1 ? `${n} projets` : `${n} projet`),
  },

  caseStudy: {
    back: "Tous les projets",
    sector: "Secteur",
    year: "Année",
    services: "Services",
    showcase: "Aperçu des livrables",
    challenge: "Le défi",
    approach: "Ce qu’on a fait",
    deliverables: "Livrables",
    next: "Projet suivant",
    cta: "Un projet similaire ? Parlons-en",
    ctaHref: "/contact",
  },
} as const;
