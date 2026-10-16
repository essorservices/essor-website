import { cn } from "@/lib/cn";

/**
 * A 3px stroke painted under the fill leaves a clean 1.5px outline: the fill hides the inner half
 * and the overlapping contours of the variable font, which a plain text-stroke would show.
 */
const outline = "[-webkit-text-stroke:3px_var(--color-navy)] [paint-order:stroke_fill]";

/**
 * Big outlined step number in condensed type. When `filled`, coral rises inside it
 * from the bottom (a clip-path wipe), keeping the navy outline on top.
 */
export function StepNumber({ value, filled, reduced }: { value: string; filled: boolean; reduced: boolean }) {
  return (
    <span
      aria-hidden
      className="relative block w-fit font-display text-[4.75rem] font-semibold leading-[0.8] tracking-[-0.02em] tabular font-condensed sm:text-[6rem] lg:text-[clamp(5.5rem,8.4vw,8.25rem)]"
    >
      <span className={cn("block text-white", outline)}>{value}</span>
      <span
        className={cn(
          "absolute inset-0 block text-coral",
          outline,
          !reduced && "transition-[clip-path] duration-[900ms] ease-[var(--ease-out-expo)]",
          filled ? "[clip-path:inset(-10%_-10%_-10%_-10%)]" : "[clip-path:inset(110%_-10%_-10%_-10%)]",
        )}
      >
        {value}
      </span>
    </span>
  );
}
