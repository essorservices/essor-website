import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { company, formFields, host, lastUpdated } from "./legal";
import { LegalToc } from "./legal-toc";

const title = "Mentions légales";
const description = `Éditeur, hébergement, propriété intellectuelle, données personnelles et cookies du site ${site.name}.`;
// Page-level openGraph/twitter replace the root ones, so the root image is named again here.
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} | ${site.tagline} ${hero.sticker}` };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/mentions-legales",
    title: `${title} | ${site.name}`,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
    images: [image],
  },
};

const sections = [
  { id: "editeur", title: "Éditeur du site" },
  { id: "hebergement", title: "Hébergement" },
  { id: "propriete-intellectuelle", title: "Propriété intellectuelle" },
  { id: "donnees-personnelles", title: "Données personnelles" },
  { id: "cookies", title: "Cookies" },
] as const;

type SectionId = (typeof sections)[number]["id"];

/** How visitors reach the agency: the public e-mail when it is set, the contact page otherwise. */
function ContactLine() {
  const { email } = site.contact;
  return email ? (
    <a href={`mailto:${email}`} className={linkClass}>
      {email}
    </a>
  ) : (
    <Link href="/contact" className={linkClass}>
      notre page contact
    </Link>
  );
}

const linkClass =
  "font-medium text-navy underline decoration-navy/25 decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-coral";

function Section({ id, children }: { id: SectionId; children: React.ReactNode }) {
  const index = sections.findIndex((s) => s.id === id);
  return (
    <section id={id} aria-labelledby={`${id}-titre`} className="scroll-mt-28 border-t border-navy/10 py-10 first:border-t-0 first:pt-0 sm:py-12">
      <p className="tabular font-mono text-[0.75rem] uppercase tracking-[0.14em] text-navy/60">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2 id={`${id}-titre`} className="mt-3 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.08]">
        {sections[index].title}
      </h2>
      <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-navy/75">{children}</div>
    </section>
  );
}

function Details({ rows }: { rows: { term: string; value: React.ReactNode }[] }) {
  return (
    <dl className="divide-y divide-navy/10 rounded-2xl bg-sky-50 px-5 ring-1 ring-inset ring-navy/[0.07] sm:px-6">
      {rows.map((row) => (
        <div key={row.term} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-navy/60 sm:pt-[0.2rem]">{row.term}</dt>
          <dd className="text-navy">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function LegalPage() {
  const publisherRows = [
    { term: "Raison sociale", value: site.legalName },
    ...(company.legalForm ? [{ term: "Forme juridique", value: company.legalForm }] : []),
    ...(company.registration ? [{ term: "Immatriculation", value: company.registration }] : []),
    ...(company.address ? [{ term: "Siège", value: company.address }] : []),
    ...(company.publisher ? [{ term: "Directeur de la publication", value: company.publisher }] : []),
    { term: "Contact", value: <ContactLine /> },
  ];

  return (
    <Panel tone="white">
      <Container className="pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-32">
        <header className="max-w-[46rem]">
          <SectionLabel>Informations légales</SectionLabel>
          <h1 className="mt-6 text-display">Mentions légales</h1>
          <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-navy/60">
            Dernière mise à jour : <span className="tabular whitespace-nowrap">{lastUpdated}</span>
          </p>
        </header>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <LegalToc sections={sections} />

          <div className="max-w-[44rem] lg:col-span-8 lg:col-start-5">
            <Section id="editeur">
              <p>
                Le site <span className="text-navy">{site.url.replace(/^https?:\/\//, "")}</span> est édité par{" "}
                {site.legalName}, agence de branding, de marketing et de développement.
              </p>
              {/* TODO: compléter `company` dans ./legal.ts (forme juridique, immatriculation, siège, directeur de la publication). */}
              <Details rows={publisherRows} />
            </Section>

            <Section id="hebergement">
              <p>Le site est hébergé par :</p>
              <Details
                rows={[
                  { term: "Hébergeur", value: host.name },
                  { term: "Adresse", value: host.address },
                  {
                    term: "Site",
                    value: (
                      <a href={host.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {host.label}
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    ),
                  },
                ]}
              />
            </Section>

            <Section id="propriete-intellectuelle">
              <p>
                L’ensemble des éléments de ce site (textes, logo, identité visuelle, illustrations, maquettes, vidéos et code)
                appartient à {site.legalName}, sauf mention contraire. Toute reproduction, représentation ou
                adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.
              </p>
              <p>
                Les projets signalés « Projet concept » sont des créations de démonstration réalisées par {site.name} : les
                marques qui y figurent sont fictives et ne désignent pas de clients réels.
              </p>
            </Section>

            <Section id="donnees-personnelles">
              {/* TODO: si l'agence est établie en Algérie, citer la loi n° 18-07 du 10 juin 2018 après validation juridique. */}
              <p>
                Lorsque vous remplissez le formulaire de projet, nous recueillons uniquement les informations nécessaires
                pour vous répondre : {formFields.slice(0, -1).join(", ")} et {formFields[formFields.length - 1]}.
              </p>
              <p>
                Ces données servent uniquement à étudier votre demande, à vous recontacter et, le cas échéant, à vous
                envoyer un devis. Elles sont transmises par e-mail via notre prestataire d’envoi (Resend) et enregistrées
                dans la messagerie de l’agence et dans un tableau Google Sheets privé, accessible uniquement à notre
                équipe.
              </p>
              <p>
                Pour fonctionner, le site et le formulaire s’appuient sur des prestataires qui traitent ces données pour
                notre compte : Vercel (hébergement), Resend (envoi des e-mails) et Google (Google Sheets). Leurs serveurs
                peuvent se trouver hors de votre pays.
              </p>
              <p>
                Vos données ne sont ni vendues, ni louées, ni cédées à des tiers. Nous les conservons le temps nécessaire
                au traitement de votre demande et, si nous travaillons ensemble, pendant toute la durée de notre relation
                commerciale.
              </p>
              <p>
                Vous pouvez à tout moment demander à consulter, corriger ou supprimer vos données en nous écrivant via{" "}
                <ContactLine />.
              </p>
            </Section>

            <Section id="cookies">
              <p>
                Ce site n’utilise aucun cookie publicitaire ni outil de suivi de votre navigation. Seul un stockage technique
                peut être utilisé dans votre navigateur, par exemple pour conserver le brouillon du formulaire de projet sur
                votre appareil. Il ne nous est pas transmis et vous pouvez l’effacer à tout moment depuis les réglages de
                votre navigateur.
              </p>
            </Section>
          </div>
        </div>
      </Container>
    </Panel>
  );
}
