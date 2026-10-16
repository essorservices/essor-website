import { buttonClasses } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/section-label";
import { Sticker } from "@/components/ui/sticker";
import { briefPage } from "@/content/brief";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { formCopy } from "./copy";

/**
 * The page title with each highlighted word on its own tilted sticker
 * ("votre" / "business."), like the stacked stickers of the Bond reference.
 * Words wrap independently, so the title never overflows its narrow column.
 */
function Title() {
  const { title, highlight } = briefPage;
  const at = title.indexOf(highlight);
  if (at < 0) return <>{title}</>;
  const words = highlight.split(" ");
  const tilts = [-3, 2.5, -2];
  return (
    <>
      {title.slice(0, at)}
      {words.map((word, i) => (
        <span key={word}>
          <Sticker rotate={tilts[i % tilts.length]} className="mx-[0.03em] my-[0.04em] px-[0.22em]">
            {word}
          </Sticker>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
      {title.slice(at + highlight.length)}
    </>
  );
}

function DirectContact() {
  // Widened: the content file types these as literal "" until the team fills them in.
  const { email, whatsapp }: { email: string; whatsapp: string } = site.contact;
  if (!email && !whatsapp) return null;
  const pill = buttonClasses({ variant: "outline-light", size: "sm", arrow: false, className: "gap-2 px-4" });
  return (
    <div className="mt-10 border-t border-sky/15 pt-6">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-sky/70">{formCopy.direct}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {email ? (
          <li>
            <a href={`mailto:${email}`} className={pill}>
              <span className="[overflow-wrap:anywhere]">{email}</span>
            </a>
          </li>
        ) : null}
        {whatsapp ? (
          <li>
            <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={pill}>
              WhatsApp
              <ArrowUpRightIcon className="size-3.5 opacity-70" />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export function BriefIntro({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <SectionLabel tone="light">{briefPage.label}</SectionLabel>
      <div className="animate-rise [--rise-y:22px]">
        <h1
          id="contact-titre"
          className="mt-7 max-w-[11ch] text-[clamp(2.9rem,10vw,4.6rem)] lg:text-[clamp(2.75rem,5vw,5rem)] leading-[0.98] text-white sm:mt-8"
        >
          <Title />
        </h1>
      </div>
      <div className="animate-rise [--rise-y:16px] [animation-delay:120ms]">
        <p className="mt-7 max-w-[30rem] text-lg leading-relaxed text-sky/75 sm:text-xl">{briefPage.intro}</p>
        <p className="mt-6 flex items-center gap-2.5 text-[0.98rem] font-medium text-white">
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-coral" />
          {briefPage.promise}
        </p>
      </div>
      <DirectContact />
    </div>
  );
}
