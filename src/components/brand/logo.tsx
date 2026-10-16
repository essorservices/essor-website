import { cn } from "@/lib/cn";
import { DISC, DOT, LOGO_VIEWBOX, MARK_PATH, MARK_VIEWBOX, WORD_PATH } from "./logo-paths";

type LogoProps = {
  className?: string;
  /** Accessible name. Pass an empty string when the logo is decorative. */
  title?: string;
  /** Class applied to the coral dot (e.g. for animations) */
  dotClassName?: string;
};

/** Horizontal lockup: mark + "essor". Inherits colour from `currentColor`; the dot stays coral. */
export function Logo({ className, title = "essor", dotClassName }: LogoProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("h-7 w-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={MARK_PATH + WORD_PATH} fill="currentColor" />
      <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill="var(--color-coral)" className={dotClassName} />
    </svg>
  );
}

/** The mark alone (ring + bar + dot). */
export function Mark({ className, title = "essor", dotClassName }: LogoProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={cn("h-8 w-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={MARK_PATH} fill="currentColor" />
      <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill="var(--color-coral)" className={dotClassName} />
    </svg>
  );
}

/** The mark inside the navy disc, as on the brand sheet. */
export function MarkDisc({ className, title = "essor" }: Omit<LogoProps, "dotClassName">) {
  const s = DISC.r * 2;
  return (
    <svg
      viewBox={`${-DISC.r} ${DISC.cy - DISC.r} ${s} ${s}`}
      className={cn("size-12", className)}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <circle cx="0" cy={DISC.cy} r={DISC.r} fill="var(--color-navy)" />
      <path d={MARK_PATH} fill="#fff" />
      <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill="var(--color-coral)" />
    </svg>
  );
}
