import { Doodle } from "@/components/ui/doodle";
import { cn } from "@/lib/cn";
import { formCopy } from "./copy";

const FOLD = "1.4rem";

/** "Et ensuite ?": a sky paper note pinned to the navy board, with the three next steps. */
export function NextStepsNote({ className }: { className?: string }) {
  const { title, items } = formCopy.nextSteps;
  return (
    <aside aria-labelledby="ensuite-titre" className={cn("relative w-full max-w-[22rem]", className)}>
      <div className="relative -rotate-[2.5deg] [filter:drop-shadow(0_1px_0_rgb(7_8_42/0.35))_drop-shadow(0_18px_22px_rgb(7_8_42/0.5))]">
        <div
          style={{ clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${FOLD}), calc(100% - ${FOLD}) 100%, 0 100%)` }}
          className="relative rounded-[3px] bg-sky px-6 pb-7 pt-9 text-navy sm:px-7"
        >
          <h2 id="ensuite-titre" className="text-[1.65rem] leading-none">
            {title}
          </h2>
          <ol className="mt-5">
            {items.map((item, i) => (
              <li key={item} className="flex items-baseline gap-4 border-t border-navy/10 py-3 last:pb-0">
                <span className="tabular font-mono text-[0.75rem] tracking-[0.08em] text-navy/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty text-[1rem] leading-snug">{item}</span>
              </li>
            ))}
          </ol>
          {/* Folded corner: the back of the paper */}
          <span
            aria-hidden
            style={{ width: FOLD, height: FOLD }}
            className="absolute bottom-0 right-0 rounded-tl-[2px] bg-sky-300 [clip-path:polygon(0_0,100%_0,0_100%)]"
          />
        </div>
        {/* Coral pin */}
        <span aria-hidden className="absolute left-1/2 top-3 -translate-x-1/2">
          <span className="block size-3.5 rounded-full bg-coral shadow-[0_2px_0_0_var(--color-navy-950),0_6px_8px_-2px_rgb(7_8_42/0.45)]" />
          <span className="absolute left-[3px] top-[3px] block size-1.5 rounded-full bg-white/70" />
        </span>
      </div>
      <Doodle
        name="arrow"
        className="absolute -right-24 top-1/2 hidden h-auto w-20 -translate-y-1/2 -rotate-[24deg] text-sky/40 xl:block"
        strokeWidth={2}
        delay={0.8}
      />
    </aside>
  );
}
