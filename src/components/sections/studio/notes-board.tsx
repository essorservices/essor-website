"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { Doodle } from "@/components/ui/doodle";
import { useMedia, usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { noteStyles } from "./note-styles";
import { PaperNote } from "./paper-note";

const ease = [0.16, 1, 0.3, 1] as const;

/** Desktop collage with a mouse or trackpad: the only case where notes can be moved. */
const DRAG_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

type Note = { value: string; label: string };

/**
 * The sticky notes from the Bond reference. On desktop they are scattered over the board
 * and, with a precise pointer, can be picked up and moved around (the last one touched
 * comes to the front). Below lg they settle into a tidy 2 × 2 grid.
 */
export function NotesBoard({ notes, hint, className }: { notes: Note[]; hint: string; className?: string }) {
  const boardRef = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();
  const canDrag = useMedia(DRAG_QUERY) && !reduced;
  // Stacking order: the note dragged last sits on top
  const [stack, setStack] = useState(() => notes.map((_, i) => i));
  const [held, setHeld] = useState<number | null>(null);

  function bringToFront(i: number) {
    setStack((s) => [...s.filter((n) => n !== i), i]);
  }

  return (
    <div className={cn("relative lg:self-start", className)}>
      <ul
        ref={boardRef}
        className="relative grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-7 lg:block lg:aspect-[1/1.42] lg:w-full"
      >
        {notes.map((note, i) => {
          const style = noteStyles[i % noteStyles.length];
          return (
            <motion.li
              key={note.label}
              style={
                {
                  zIndex: stack.indexOf(i) + 1,
                  "--spot-x": style.spot.left,
                  "--spot-y": style.spot.top,
                  "--tilt": `${style.tilt}deg`,
                  "--tilt-sm": `${style.tiltSm}deg`,
                } as React.CSSProperties
              }
              className="relative lg:absolute lg:left-[var(--spot-x)] lg:top-[var(--spot-y)] lg:w-[57%] xl:w-[55%]"
              initial={{ opacity: 0, y: -28, scale: 1.06 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease }}
            >
              <motion.div
                // Remount when the mode changes so a dragged note does not keep its offset in the grid
                key={canDrag ? "drag" : "still"}
                drag={canDrag}
                dragConstraints={boardRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 420, bounceDamping: 28 }}
                onPointerDown={canDrag ? () => bringToFront(i) : undefined}
                onDragStart={() => setHeld(i)}
                onDragEnd={() => setHeld(null)}
                whileDrag={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className={cn(
                  // The tilt is plain CSS (it changes with the breakpoint); a held note straightens up
                  "h-full rotate-[var(--tilt-sm)] transition-[rotate] duration-500 ease-[var(--ease-out-back)] lg:rotate-[var(--tilt)]",
                  held === i && "lg:rotate-0",
                  canDrag && "cursor-grab touch-none select-none active:cursor-grabbing",
                )}
              >
                <PaperNote
                  value={note.value}
                  label={note.label}
                  paper={style.paper}
                  fastener={style.fastener}
                  className="h-full lg:h-auto"
                />
              </motion.div>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {canDrag ? (
          <motion.p
            key="hint"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="pointer-events-none absolute left-0 top-[86%] flex items-start gap-2 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-sky/70"
          >
            <span className="pt-6">{hint}</span>
            <Doodle name="arrow" strokeWidth={2.4} delay={1.1} className="h-10 w-14 -scale-y-100 text-coral" />
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
