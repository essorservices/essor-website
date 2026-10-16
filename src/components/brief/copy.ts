/**
 * Microcopy of the brief form that is not in src/content/brief.ts yet
 * (field labels, hints, the "Et ensuite ?" note). Candidates to move there.
 */
export const formCopy = {
  formLabel: "Brief de projet",
  optional: "facultatif",
  stepOf: (current: number, total: number) => `Étape ${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  stepsLabel: "Étapes du brief",
  stepDone: "terminée",
  stepCurrent: "en cours",
  duration: "≈ 3 min",

  fields: {
    name: { label: "Votre nom" },
    company: { label: "Votre entreprise" },
    sector: { label: "Votre secteur" },
    city: { label: "Ville" },
    needs: { hint: "Au moins un choix, plusieurs possibles. Vous hésitez\u00A0? Choisissez la dernière option." },
    budget: { label: "Budget envisagé", hint: "Une fourchette suffit, on affinera ensemble." },
    timeline: { label: "Quand voulez-vous démarrer ?" },
    description: {
      label: "Votre projet en quelques lignes",
      placeholder: "Votre activité, ce qui vous manque aujourd’hui, ce que vous aimeriez obtenir…",
      counter: (n: string, max: string) => `${n} / ${max} caractères`,
    },
    email: { label: "Adresse e-mail", placeholder: "vous@entreprise.com" },
    phone: { label: "Téléphone ou WhatsApp", hint: "Pour vous rappeler plus vite." },
    source: { label: "Comment nous avez-vous connus ?" },
  },

  /** Shown under the "Je ne sais pas encore" need tile. */
  adviceHint: "On fait le point ensemble et on vous oriente.",
  legalLink: "Comment nous utilisons vos données",
  newTab: "(nouvel onglet)",

  draft: {
    restored: "Vos réponses sont gardées sur cet appareil.",
    clear: "Tout effacer",
  },

  honeypot: "Ne remplissez pas ce champ",
  sendingStatus: "Envoi de votre brief en cours.",
  errorMail: "Écrire à",

  nextSteps: {
    title: "Et ensuite ?",
    items: ["On lit votre brief.", "On vous recontacte pour en parler.", "Vous recevez une proposition claire."],
  },

  direct: "Vous préférez écrire directement ?",
} as const;
