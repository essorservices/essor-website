"use client";

import { motion, type Variants } from "motion/react";
import { Deliverable } from "@/components/deliverables";
import { PlusIcon, ServiceIcon } from "@/components/ui/icons";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { servicePreviews } from "./previews";

const ease = [0.16, 1, 0.3, 1] as const;
const easeInOut = [0.76, 0, 0.24, 1] as const;

/** Same condition as the floating preview: the inline mockup is hidden whenever the floating card is on. */
const hideWhenFloating =
  "[@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hidden";

const region: Variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.75, ease },
      opacity: { duration: 0.45, delay: 0.08 },
      staggerChildren: 0.035,
      delayChildren: 0.12,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.6, ease: easeInOut }, opacity: { duration: 0.25 } },
  },
};

const rise: Variants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  closed: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

/** Reduced motion: the panel snaps open and shut, content simply fades in. */
const regionReduced: Variants = {
  open: { height: "auto", opacity: 1, transition: { duration: 0 } },
  closed: { height: 0, opacity: 0, transition: { duration: 0 } },
};

export function ServiceRow({
  service,
  index,
  open,
  reduced,
  onToggle,
  onPointerEnter,
  onPointerLeave,
}: {
  service: Service;
  index: number;
  open: boolean;
  reduced: boolean;
  onToggle: (header: HTMLElement) => void;
  onPointerEnter: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave: () => void;
}) {
  const id = `service-${service.key}`;
  const preview = servicePreviews[service.key];

  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.06, ease }}
    >
      {/* Hairline that draws itself across when the row comes in */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-navy/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 1.1, delay: 0.1 + index * 0.06, ease }}
      />

      <h3>
        <button
          type="button"
          id={`${id}-bouton`}
          aria-expanded={open}
          aria-controls={`${id}-detail`}
          aria-labelledby={`${id}-titre`}
          aria-describedby={`${id}-resume`}
          onClick={(e) => onToggle(e.currentTarget)}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          className={cn(
            "group/head relative -mx-3 grid w-[calc(100%_+_1.5rem)] gap-x-4 rounded-[1.25rem] px-3 py-6 text-left sm:py-7 lg:-mx-5 lg:w-[calc(100%_+_2.5rem)] lg:gap-x-5 lg:px-5 lg:pt-9",
            // Tighter bottom edge once open, so the details read as part of the row
            "transition-[padding] duration-700 ease-[var(--ease-out-expo)]",
            open ? "lg:pb-5" : "lg:pb-9",
            "grid-cols-[minmax(0,1fr)_auto] [grid-template-areas:'num_toggle'_'title_toggle'_'short_short']",
            "lg:grid-cols-[var(--num)_minmax(0,1fr)_auto] lg:[grid-template-areas:'num_title_toggle'_'._short_toggle']",
          )}
        >
          {/* Soft sky wash behind the row on hover / keyboard focus */}
          <span
            aria-hidden
            className="absolute inset-x-0 inset-y-1.5 rounded-[inherit] bg-sky-50 opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] group-hover/head:opacity-100 group-focus-visible/head:opacity-100"
          />

          <span
            aria-hidden
            className={cn(
              "relative font-mono text-[0.8rem] font-normal tracking-[0.12em] tabular transition-colors duration-300 [grid-area:num] lg:self-baseline",
              open ? "text-navy" : "text-navy/60",
            )}
          >
            {service.number}
          </span>

          <span className="relative mt-2.5 [grid-area:title] lg:mt-0 lg:self-baseline">
            {/* Coral disc that slides in before the title (fine pointers / keyboard) */}
            <span
              aria-hidden
              className={cn(
                "absolute right-full top-[calc((var(--row-t)_-_var(--disc))/2)] mr-3 hidden size-[var(--disc)] place-items-center rounded-full bg-coral text-navy lg:grid xl:mr-4",
                "-rotate-45 scale-0 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out-back)]",
                "group-hover/head:rotate-0 group-hover/head:scale-100 group-hover/head:opacity-100",
                "group-focus-visible/head:rotate-0 group-focus-visible/head:scale-100 group-focus-visible/head:opacity-100",
              )}
            >
              <ServiceIcon service={service.key} className="size-[45%]" />
            </span>
            <span
              id={`${id}-titre`}
              data-keep-clear="text"
              className="block text-[length:var(--row-t)] leading-none transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/head:translate-x-3 group-focus-visible/head:translate-x-3"
            >
              {service.title}
            </span>
          </span>

          <span
            id={`${id}-resume`}
            data-keep-clear="text"
            className="relative mt-3 block font-sans text-[1.02rem] font-normal leading-snug tracking-normal text-navy/70 [font-variation-settings:normal] [grid-area:short] sm:text-lg lg:mt-3.5"
          >
            {service.short}
          </span>

          <span
            aria-hidden
            data-keep-clear="box"
            className={cn(
              "relative grid size-[var(--tog)] place-items-center self-center rounded-full ring-1 ring-inset [grid-area:toggle] lg:self-start",
              "lg:mt-[calc((var(--row-t)_-_var(--tog))/2)]",
              "transition-[background-color,color,box-shadow] duration-300",
              open
                ? "bg-navy text-white ring-navy group-hover/head:bg-coral group-hover/head:text-navy group-hover/head:ring-coral"
                : "bg-white text-navy ring-navy/20 group-hover/head:ring-navy",
            )}
          >
            <PlusIcon
              className={cn(
                "size-5 transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "rotate-[135deg]" : "rotate-0",
              )}
            />
          </span>
        </button>
      </h3>

      <motion.div
        id={`${id}-detail`}
        role="region"
        aria-labelledby={`${id}-titre`}
        inert={!open}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={reduced ? regionReduced : region}
        className="overflow-hidden"
      >
        {/* At lg the list column is narrow: a touch tablet (no floating card) stacks the mockup under the text */}
        <div className="flex flex-col gap-9 pb-10 pt-1 sm:flex-row sm:items-start sm:gap-10 lg:flex-col lg:pb-12 lg:pl-[calc(var(--num)_+_1.25rem)] xl:flex-row">
          <div className="min-w-0 flex-1">
            <motion.p variants={rise} className="max-w-[36rem] text-[1.06rem] leading-relaxed text-navy/80 sm:text-lg">
              {service.description}
            </motion.p>
            <motion.p
              variants={rise}
              className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-navy/60"
            >
              Ce qu’on prend en charge
            </motion.p>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <motion.li key={d} variants={rise} className="rounded-full bg-sky px-3.5 py-1.5 text-sm text-navy">
                  {d}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.figure variants={rise} className={cn("w-full max-w-[260px] shrink-0 sm:w-52", hideWhenFloating)}>
            <div className="aspect-[4/5] w-full -rotate-2 overflow-hidden rounded-[1.25rem] shadow-card ring-1 ring-navy/10">
              <Deliverable kind={preview.kind} theme={preview.theme} animate={open} />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-navy/60">
              <span className="sr-only">Aperçu : {preview.label},</span>
              <span className="whitespace-nowrap">{preview.client}</span>
              {preview.concept ? (
                <span className="rounded-full px-2 py-0.5 text-navy ring-1 ring-inset ring-navy/20">Projet concept</span>
              ) : null}
            </figcaption>
          </motion.figure>
        </div>
      </motion.div>
    </motion.li>
  );
}
