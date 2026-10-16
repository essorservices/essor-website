import { Marquee } from "@/components/ui/marquee";
import { marquee } from "@/content/home";
import { cn } from "@/lib/cn";
import { PausableBand } from "./pausable-band";

/** Four-point star used as a separator (same outline as the "star" doodle, filled). */
function Star() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden focusable="false" className="mx-[0.55em] size-[0.5em] shrink-0 fill-current">
      <path d="M24 3c1.6 12.6 4.4 17.4 21 21-16.6 3.6-19.4 8.4-21 21-1.6-12.6-4.4-17.4-21-21 16.6-3.6 19.4-8.4 21-21Z" />
    </svg>
  );
}

function Items() {
  return (
    <ul aria-label="Nos métiers" className="flex shrink-0 items-center">
      {marquee.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          {item}
          <Star />
        </li>
      ))}
    </ul>
  );
}

/**
 * Coral strip slapped across the seam between the hero and the next panel, slightly tilted,
 * running the list of trades, with a pause toggle (PausableBand).
 * The tilt is clipped horizontally so the page never scrolls sideways.
 */
export function MarqueeBand({ className }: { className?: string }) {
  return (
    <div className={cn("relative z-10 -my-7 overflow-x-clip sm:-my-9", className)}>
      <PausableBand>
        <Marquee duration={70} className="py-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:py-[1.1rem] sm:text-4xl">
          <Items />
        </Marquee>
      </PausableBand>
    </div>
  );
}
