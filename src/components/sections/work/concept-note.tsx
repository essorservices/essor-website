import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { ConceptTag } from "./concept-tag";
import { workCopy } from "./copy";

/**
 * Pinned sticky note (the Bond reference) explaining what "Projet concept" means,
 * with an optional link. Slightly tilted, held by a coral pin.
 */
export function ConceptNote({
  cta,
  className,
}: {
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("relative rotate-[-1.6deg] rounded-[1.25rem] bg-sky px-6 pb-7 pt-8 sm:px-8 sm:pb-8 sm:pt-9", className)}>
      {/* The pin */}
      <span aria-hidden className="absolute -top-2.5 left-9 size-5 rounded-full bg-coral shadow-sticker">
        <span className="absolute left-1 top-1 size-1.5 rounded-full bg-white/70" />
      </span>
      {/* Folded corner */}
      <span
        aria-hidden
        className="absolute bottom-0 right-0 size-9 rounded-br-[1.25rem] rounded-tl-[0.9rem] bg-sky-200 [clip-path:polygon(100%_0,0_100%,100%_100%)]"
      />
      <ConceptTag className="bg-white" />
      <p className="mt-5 max-w-[30rem] text-[1.06rem] leading-relaxed text-navy/80">{workCopy.conceptNote}</p>
      {cta ? (
        <ButtonLink href={cta.href} variant="dark" className="mt-7">
          {cta.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}
