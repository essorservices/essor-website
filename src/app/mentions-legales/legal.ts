/**
 * Company details for the legal notice.
 * Empty strings are not rendered: fill them in before launch.
 */
export const company = {
  /** TODO: forme juridique (ex. SARL, EURL, auto-entrepreneur) */
  legalForm: "",
  /** TODO: numéro d'immatriculation (registre du commerce, NIF ou SIRET selon le pays) */
  registration: "",
  /** TODO: adresse du siège social */
  address: "",
  /** TODO: nom du directeur ou de la directrice de la publication */
  publisher: "",
};

export const host = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  url: "https://vercel.com",
  label: "vercel.com",
};

/** Fields collected by the project form (src/content/brief.ts), in plain words. */
export const formFields = [
  "votre nom",
  "le nom de votre entreprise",
  "votre secteur d’activité",
  "votre ville",
  "vos besoins",
  "votre budget",
  "le délai souhaité",
  "la description de votre projet",
  "votre adresse e-mail",
  "votre numéro de téléphone",
  "la façon dont vous nous avez connus",
];

export const lastUpdated = "16 octobre 2026";
