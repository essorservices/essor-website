import { cn } from "@/lib/cn";

/** Small mono label above section titles: "● 02 — Services" */
export function SectionLabel({
  children,
  index,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
  /** dark = for light backgrounds, light = for navy backgrounds */
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-[0.78rem] uppercase tracking-[0.14em]",
        tone === "dark" ? "text-navy/70" : "text-sky/75",
        className,
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-coral" />
      {index ? (
        <>
          <span className="tabular">{index}</span>
          <span aria-hidden className={tone === "dark" ? "text-navy/30" : "text-sky/40"}>
            —
          </span>
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
