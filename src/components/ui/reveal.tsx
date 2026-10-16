"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children into place the first time they enter the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span";
} & Omit<HTMLMotionProps<"div">, "children" | "className">) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits plain text into words that slide up from a mask, line by line.
 * Use for big headlines. Screen readers get the full string once (visually hidden copy).
 * The trigger sits on the outer element: a word clipped by its own mask never counts
 * as "in view", so it must not be the thing that observes the viewport.
 */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  as = "span",
  inView = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  /** true: animate when scrolled into view; false: animate on mount */
  inView?: boolean;
}) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "shown", viewport: { once: true, margin: "-8% 0px" } }
    : { animate: "shown" };
  return (
    <Tag className={className} initial="hidden" {...trigger}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
