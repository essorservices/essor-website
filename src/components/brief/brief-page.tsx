import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { BriefForm } from "./brief-form";
import { BriefIntro } from "./brief-intro";
import { NextStepsNote } from "./next-steps-note";

/**
 * /contact: the navy board. Title, promise and the pinned "Et ensuite ?" note on the
 * left (sticky on tall desktop screens), the brief form on a white card on the right.
 * On phones the note moves below the form (display: contents + order), so the form
 * comes first without duplicating any markup.
 */
export function BriefPage() {
  return (
    <Panel tone="navy" grid aria-labelledby="contact-titre" className="min-h-[calc(100svh-1rem)] sm:min-h-[calc(100svh-1.5rem)]">
      <Container className="pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
          <div className="contents lg:col-span-5 lg:block lg:self-start [@media(min-width:1024px)_and_(min-height:860px)]:sticky [@media(min-width:1024px)_and_(min-height:860px)]:top-28">
            <BriefIntro className="order-1" />
            <NextStepsNote className="order-3 mx-auto sm:mx-0 lg:mt-12" />
          </div>

          <div className="order-2 min-w-0 lg:col-span-7">
            <div data-brief-card className="relative scroll-mt-24 rounded-[2rem] bg-white p-6 text-navy shadow-lift sm:p-10">
              <BriefForm />
            </div>
          </div>
        </div>
      </Container>
    </Panel>
  );
}
