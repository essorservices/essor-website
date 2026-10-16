"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isHashLink } from "./nav";
import type { HeaderTone } from "./use-header-scroll";

const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.7 } as const;

/**
 * Centred pill of links. A soft highlight follows the pointer between links;
 * the current page or section gets the coral dot, which slides from link to link.
 */
export function DesktopNav({
  tone,
  active,
  home,
  framed,
}: {
  tone: HeaderTone;
  active: string | null;
  /** On the home page every active item is a section in view, not the current page */
  home: boolean;
  framed: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dark = tone === "dark";

  return (
    <nav aria-label="Navigation principale" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
      <ul
        onPointerLeave={() => setHovered(null)}
        className={cn(
          "flex items-center rounded-full p-1 ring-1 ring-inset transition-[box-shadow,background-color] duration-500",
          framed ? "ring-transparent" : dark ? "ring-sky/15" : "ring-navy/10",
        )}
      >
        {site.nav.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href} className="relative">
              {hovered === item.href ? (
                <motion.span
                  layoutId="nav-hover"
                  transition={spring}
                  aria-hidden
                  className={cn("absolute inset-0 rounded-full", dark ? "bg-white/10" : "bg-navy/[0.06]")}
                />
              ) : null}
              <Link
                href={item.href}
                aria-current={isActive ? (home || isHashLink(item.href) ? "location" : "page") : undefined}
                onPointerEnter={() => setHovered(item.href)}
                onFocus={() => setHovered(item.href)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "relative flex h-10 items-center rounded-full px-[1.15rem] text-[0.92rem] font-medium tracking-[-0.005em] transition-colors duration-300",
                  dark
                    ? isActive
                      ? "text-white"
                      : "text-sky/75 hover:text-white"
                    : isActive
                      ? "text-navy"
                      : "text-navy/65 hover:text-navy",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-dot"
                    transition={spring}
                    aria-hidden
                    className="absolute left-[0.5rem] top-[calc(50%-2.5px)] size-[5px] rounded-full bg-coral"
                  />
                ) : null}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
