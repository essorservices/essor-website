import { cn } from "@/lib/cn";
import { workCopy } from "./copy";

/**
 * "Projet concept" tag, shown wherever a concept project appears so it is never
 * mistaken for a real client. A sky pill with a dashed ring, like a draft stamp.
 */
export function ConceptTag({ id, className }: { id?: string; className?: string }) {
  return (
    <span
      id={id}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-dashed border-navy/40 bg-sky pl-2.5 pr-3",
        "font-mono text-[0.66rem] uppercase leading-none tracking-[0.14em] text-navy",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-coral" />
      {workCopy.concept}
    </span>
  );
}
