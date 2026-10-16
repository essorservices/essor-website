import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";
import { manifesto, notes } from "@/content/home";
import { DictionaryEntry } from "./dictionary-entry";
import { NotesBoard } from "./notes-board";

/**
 * 04, "Studio": why the name. A dictionary entry for "essor" whose third sense is the studio,
 * next to a board of pinned notes with the structural facts (one team, one contact…).
 */
export function Studio() {
  return (
    <Panel id="studio" tone="navy" grid aria-labelledby="studio-titre">
      <Container className="py-20 sm:py-28 lg:py-36">
        <SectionLabel tone="light" index="04">
          {manifesto.label}
        </SectionLabel>

        <div className="mt-10 grid gap-y-16 sm:mt-12 sm:gap-y-20 lg:grid-cols-12 lg:gap-x-10">
          <DictionaryEntry entry={manifesto} titleId="studio-titre" className="lg:col-span-6 xl:col-span-7" />
          <NotesBoard
            notes={notes}
            hint="Déplacez les notes"
            className="lg:col-span-6 lg:mt-6 xl:col-span-5 xl:-mr-4 xl:mt-2"
          />
        </div>
      </Container>
    </Panel>
  );
}
