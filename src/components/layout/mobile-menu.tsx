"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Sticker } from "@/components/ui/sticker";
import { hero } from "@/content/home";
import { site, socialLinks } from "@/content/site";
import { cn } from "@/lib/cn";
import { contactLinks } from "./contact-links";
import { isHashLink } from "./nav";

export const MOBILE_MENU_ID = "menu-mobile";

const expo = [0.16, 1, 0.3, 1] as const;
const inOut = [0.76, 0, 0.24, 1] as const;
/** The sheet grows out of the menu button (top right). */
const origin = "calc(100% - 2.75rem) 2.75rem";

/**
 * Full-screen navy sheet on the Bond grid. Huge staggered links, the main call to
 * action and whatever contact details the team has filled in.
 */
export function MobileMenu({
  active,
  home,
  onContact,
  reduced,
  onNavigate,
  ref,
}: {
  active: string | null;
  /** On the home page every active item is a section in view, not the current page */
  home: boolean;
  /** On /contact the call to action would link to the current page, so it is left out */
  onContact: boolean;
  reduced: boolean;
  onNavigate: () => void;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const contact = contactLinks();
  const sheet: Pick<HTMLMotionProps<"div">, "initial" | "animate" | "exit" | "transition"> = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        initial: { clipPath: `circle(0% at ${origin})` },
        animate: { clipPath: `circle(150% at ${origin})` },
        exit: { clipPath: `circle(0% at ${origin})`, transition: { duration: 0.55, ease: inOut } },
        transition: { duration: 0.8, ease: inOut },
      };

  return (
    <motion.div ref={ref} id={MOBILE_MENU_ID} data-header-ignore className="fixed inset-0 z-40 bg-navy text-white lg:hidden" {...sheet}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_30%,transparent)]" />
        <div className="bg-grid-plus absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_30%,transparent)]" />
      </div>

      <div data-lenis-prevent className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-7 pb-8 pt-28 sm:px-10">
        <nav aria-label="Menu principal">
          <ul className="border-t border-sky/15">
            {site.nav.map((item, i) => {
              const isActive = active === item.href;
              return (
                <li key={item.href} className="border-b border-sky/15">
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? (home || isHashLink(item.href) ? "location" : "page") : undefined}
                    className="group flex items-center gap-4 py-4 outline-offset-[-2px]"
                  >
                    <span className="tabular w-6 font-mono text-[0.75rem] tracking-[0.12em] text-sky/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                      <motion.span
                        className="block font-display text-[clamp(2.6rem,12vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.03em] [font-variation-settings:'opsz'_96]"
                        initial={reduced ? false : { y: "105%" }}
                        animate={{ y: "0%" }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.9, delay: 0.22 + i * 0.06, ease: expo }}
                      >
                        {item.label}
                      </motion.span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "ml-auto size-2.5 rounded-full bg-coral transition-transform duration-500 ease-[var(--ease-out-back)]",
                        isActive ? "scale-100" : "scale-0 group-hover:scale-75",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          aria-hidden
          className="mt-10 self-end pr-2"
          initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: 6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.55 }}
        >
          <Sticker rotate={-5} className="font-display text-[1.6rem] font-semibold tracking-[-0.02em]">
            {hero.sticker}
          </Sticker>
        </motion.div>

        <motion.div
          className="mt-auto pt-12"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.8, delay: 0.5, ease: expo }}
        >
          {onContact ? null : (
            <ButtonLink href={site.cta.href} size="lg" onClick={onNavigate} className="w-full">
              {site.cta.label}
            </ButtonLink>
          )}

          {contact.length > 0 || socialLinks.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-[0.95rem]">
              {contact.map((c) => (
                <div key={c.key}>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sky/70">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-1 inline-block break-all text-white hover:text-coral"
                    >
                      {c.value}
                      {c.external ? <span className="sr-only"> (nouvel onglet)</span> : null}
                    </a>
                  ) : (
                    <p className="mt-1 text-white">{c.value}</p>
                  )}
                </div>
              ))}
              {socialLinks.length > 0 ? (
                <div className="col-span-2">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sky/70">Réseaux</p>
                  <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                    {socialLinks.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-coral">
                          {s.label}
                          <span className="sr-only"> (nouvel onglet)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          <p className="mt-8 flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sky/70">
            <span aria-hidden className="size-1.5 rounded-full bg-coral" />
            {site.tagline}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
