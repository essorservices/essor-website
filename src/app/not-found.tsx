import type { Metadata } from "next";
import { LostDot404 } from "@/components/layout/lost-dot-404";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n’existe pas ou plus. Retrouvez nos services et nos projets depuis l’accueil.",
};

export default function NotFound() {
  return (
    <Panel tone="white" grid className="flex min-h-[min(100svh-1.5rem,60rem)] flex-col">
      <Container className="flex min-h-[inherit] flex-col pb-12 pt-28 sm:pb-16 lg:pt-28">
        <SectionLabel index="404">Page introuvable</SectionLabel>

        {/* Generous top padding: the dot needs room for its flight above the numerals */}
        <div className="mt-auto grid gap-x-10 gap-y-12 pt-28 sm:pt-36 lg:grid-cols-12 lg:items-end lg:pt-44">
          <div className="lg:col-span-7">
            <LostDot404 className="text-[clamp(6.75rem,30vw,19rem)] lg:text-[clamp(10rem,16vw,14rem)] xl:text-[clamp(12rem,21vw,19rem)]" />
          </div>

          <div className="border-t border-navy/10 pt-8 lg:col-span-5 lg:border-0 lg:pb-[0.4rem] lg:pt-0 xl:col-span-4 xl:col-start-9">
            <h1 className="max-w-[16ch] text-[clamp(2.2rem,3.4vw,3.1rem)] leading-[1.02]">
              Cette page a pris son essor… un peu trop loin.
            </h1>
            <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-navy/70">
              Le lien est peut-être ancien, ou l’adresse contient une petite faute de frappe. Le reste du site, lui, est
              bien à sa place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/">Retour à l’accueil</ButtonLink>
              <ButtonLink href="/projets" variant="outline" arrow={false}>
                Voir les projets
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Panel>
  );
}
