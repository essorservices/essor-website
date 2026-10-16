"use client";

import { useState } from "react";

/**
 * The tilted coral strip, with a pause toggle docked at its right end: anything that moves
 * on its own for more than five seconds needs a way to stop it (WCAG 2.2.2). Hover already
 * pauses the shared Marquee for the mouse; the toggle covers keyboard and touch.
 * Keyboard focus on the toggle holds the band still, like hover does, until the visitor presses it.
 */
export function PausableBand({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);

  return (
    <div
      data-paused={paused || held ? "" : undefined}
      className="relative -mx-[4%] -rotate-2 bg-coral text-navy shadow-[0_4px_0_0_var(--color-navy-950)] data-paused:[&_.animate-marquee]:[animation-play-state:paused]"
    >
      {children}
      {/* inset past the 4% overhang so it sits inside the visible part of the band */}
      <button
        type="button"
        aria-pressed={paused}
        aria-label="Mettre en pause le défilement"
        onClick={() => {
          setHeld(false);
          setPaused((p) => !p);
        }}
        onFocus={(e) => setHeld(e.currentTarget.matches(":focus-visible"))}
        onBlur={() => setHeld(false)}
        className="absolute right-[calc(4%+0.75rem)] top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-navy text-coral ring-4 ring-coral transition-[color,scale] duration-300 ease-[var(--ease-out-expo)] hover:text-white focus-visible:outline-navy active:scale-95 motion-reduce:hidden sm:right-[calc(4%+1.25rem)]"
      >
        <svg viewBox="0 0 16 16" aria-hidden focusable="false" className="size-3.5" fill="currentColor">
          {paused ? <path d="M4.5 2.8v10.4L13 8 4.5 2.8Z" /> : <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />}
        </svg>
      </button>
    </div>
  );
}
