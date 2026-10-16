"use client";

import { useSectionInView } from "@/components/layout/use-section-in-view";
import { cn } from "@/lib/cn";

/** Table of contents; the section being read gets the coral dot. */
export function LegalToc({ sections }: { sections: readonly { id: string; title: string }[] }) {
  const current = useSectionInView(
    sections.map((s) => s.id),
    true,
  );

  return (
    <nav aria-label="Sommaire" className="lg:col-span-3">
      <ol className="space-y-1 lg:sticky lg:top-28">
        {sections.map((s, i) => {
          const active = current === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group flex items-baseline gap-3 rounded-md py-1.5 text-[0.98rem] transition-colors duration-300 hover:text-navy",
                  active ? "text-navy" : "text-navy/70",
                )}
              >
                <span className="tabular relative font-mono text-[0.75rem] text-navy/60">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-3.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-coral transition-[scale,opacity] duration-500 ease-[var(--ease-out-back)]",
                      active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                    )}
                  />
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
