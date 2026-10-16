import { cn } from "@/lib/cn";

/**
 * Section heading of a case study, styled like SectionLabel ("● 01 — Le défi")
 * but rendered as a real h2 so the page outline stays meaningful.
 */
export function CaseLabel({
  index,
  id,
  className,
  children,
}: {
  index: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "flex items-center gap-2.5 font-mono text-[0.78rem] font-normal uppercase leading-none tracking-[0.14em] text-navy/70 [font-variation-settings:normal]",
        className,
      )}
    >
      <span aria-hidden className="size-2 shrink-0 rounded-full bg-coral" />
      <span className="tabular">{index}</span>
      <span aria-hidden className="text-navy/30">
        —
      </span>
      <span>{children}</span>
    </h2>
  );
}
