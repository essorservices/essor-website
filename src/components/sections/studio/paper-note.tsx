import { cn } from "@/lib/cn";
import { paperClasses, type NoteFastener, type NotePaper } from "./note-styles";

/** "24 h" → { figure: "24", unit: "h" }, so the unit can sit smaller next to the figure. */
function splitValue(value: string) {
  const match = /^(\d+)[\s ]*(.*)$/.exec(value);
  return match ? { figure: match[1], unit: match[2] } : { figure: value, unit: "" };
}

/** Size of the folded bottom-right corner */
const FOLD = "1.35rem";

/**
 * A pinned paper card: big figure, short label, a folded corner, and either
 * a strip of tape or a coral pin holding it to the board. Purely presentational.
 */
export function PaperNote({
  value,
  label,
  paper,
  fastener,
  className,
}: {
  value: string;
  label: string;
  paper: NotePaper;
  fastener: NoteFastener;
  className?: string;
}) {
  const { figure, unit } = splitValue(value);
  const tones = paperClasses[paper];

  return (
    <div
      className={cn(
        "relative [filter:drop-shadow(0_1px_0_rgb(7_8_42/0.35))_drop-shadow(0_18px_22px_rgb(7_8_42/0.5))]",
        className,
      )}
    >
      <div
        style={{ clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${FOLD}), calc(100% - ${FOLD}) 100%, 0 100%)` }}
        className={cn(
          // A square-ish sheet on the collage that still grows if the label needs more room
          "flex h-full flex-col justify-between gap-6 rounded-[3px] p-4 text-navy sm:p-5 lg:aspect-[1/0.94] lg:h-auto lg:gap-8 xl:p-6",
          tones.face,
        )}
      >
        <p className="flex items-baseline gap-1 font-display font-semibold leading-[0.85] tracking-[-0.04em] tabular">
          <span className="text-[3.25rem] sm:text-6xl xl:text-7xl">{figure}</span>
          {unit ? <span className="text-2xl tracking-[-0.02em] sm:text-3xl xl:text-4xl">{unit}</span> : null}
        </p>
        <p className="max-w-[14rem] text-[0.95rem] leading-snug text-navy/80 sm:text-base lg:max-w-[66%] lg:text-[0.95rem] xl:text-[1.05rem]">{label}</p>

        {/* The folded corner: the back of the paper, a shade darker */}
        <span
          aria-hidden
          style={{ width: FOLD, height: FOLD }}
          className={cn(
            "absolute bottom-0 right-0 [clip-path:polygon(0_0,100%_0,0_100%)] rounded-tl-[2px]",
            tones.fold,
          )}
        />
      </div>

      {fastener === "tape" ? (
        // Translucent tape with torn ends, half on the paper, half on the board
        <span
          aria-hidden
          className={cn(
            "absolute -top-3 left-1/2 h-7 w-[5.5rem] -translate-x-1/2 -rotate-[4deg] bg-white/55",
            "[clip-path:polygon(0_8%,4%_0,10%_10%,16%_0,84%_0,90%_9%,96%_0,100%_10%,100%_92%,95%_100%,89%_90%,83%_100%,17%_100%,11%_91%,5%_100%,0_90%)]",
          )}
        />
      ) : (
        <span aria-hidden className="absolute left-1/2 top-3 -translate-x-1/2">
          <span className="block size-3.5 rounded-full bg-coral shadow-[0_2px_0_0_var(--color-navy-950),0_6px_8px_-2px_rgb(7_8_42/0.45)]" />
          <span className="absolute left-[3px] top-[3px] block size-1.5 rounded-full bg-white/70" />
        </span>
      )}
    </div>
  );
}
