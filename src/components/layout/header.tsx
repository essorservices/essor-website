"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { DesktopNav } from "./desktop-nav";
import { MenuButton } from "./menu-button";
import { MOBILE_MENU_ID, MobileMenu } from "./mobile-menu";
import { activeHref, homeSectionIds } from "./nav";
import { lockPage, trapTab, unlockPage } from "./page-lock";
import { useHeaderScroll } from "./use-header-scroll";
import { useSectionInView } from "./use-section-in-view";

/**
 * Site header, floating inside the page margin.
 * The pathname is read inside Suspense so routes with request-time params can still
 * prerender their shell (Cache Components); the fallback is the same bar without an active link.
 */
export function Header() {
  return (
    <Suspense fallback={<HeaderBar pathname={null} />}>
      <HeaderWithPathname />
    </Suspense>
  );
}

function HeaderWithPathname() {
  return <HeaderBar pathname={usePathname()} />;
}

function HeaderBar({ pathname }: { pathname: string | null }) {
  const path = pathname ?? "";
  const frameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const home = path === "/";
  // /contact is the only route whose first panel is navy.
  const onContact = path === site.cta.href;
  const { scrolled, hidden, tone } = useHeaderScroll(frameRef, barRef, path, onContact ? "dark" : "light");
  const section = useSectionInView(homeSectionIds, home);
  const active = activeHref(path, section);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();

  // The menu remembers the route it was opened on: navigating anywhere closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn !== null && openedOn === path && !isDesktop;
  const [focusWithin, setFocusWithin] = useState(false);

  useEffect(() => {
    if (!open) return;
    lockPage(lenis);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedOn(null);
        buttonRef.current?.focus();
      } else if (event.key === "Tab") {
        trapTab(event, [frameRef.current, menuRef.current]);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockPage(lenis);
    };
  }, [open, lenis]);

  const closeForNavigation = () => {
    unlockPage(lenis);
    setOpenedOn(null);
  };

  const barTone = open ? "dark" : tone;
  const dark = barTone === "dark";
  const framed = scrolled && !open;
  const isHidden = hidden && !open && !focusWithin;

  return (
    <>
      <div
        ref={frameRef}
        data-header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3"
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
        }}
      >
        <motion.header
          initial={false}
          animate={{ y: isHidden ? "-150%" : "0%" }}
          transition={{ duration: isHidden ? 0.45 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12"
        >
          <div ref={barRef} className="pointer-events-auto relative flex h-16 items-center justify-between">
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 -left-4 -right-1 rounded-full ring-1 ring-inset backdrop-blur-md lg:-right-2",
                "transition-[opacity,scale,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
                framed ? "scale-100 opacity-100" : "scale-[0.985] opacity-0",
                dark ? "bg-navy/70 ring-sky/15" : "bg-white/85 ring-navy/10",
              )}
            />

            <Link
              href="/"
              aria-label="essor, accueil"
              onClick={open ? closeForNavigation : undefined}
              className={cn("relative rounded-md transition-colors duration-500", dark ? "text-white" : "text-navy")}
            >
              <Logo title="" className="h-7" />
            </Link>

            <DesktopNav tone={barTone} active={active} home={home} framed={framed} />

            <div className="relative flex items-center">
              {onContact ? null : (
                <ButtonLink
                  href={site.cta.href}
                  size="sm"
                  variant={dark ? "light" : "dark"}
                  className="hidden lg:inline-flex"
                >
                  {site.cta.label}
                </ButtonLink>
              )}
              <MenuButton
                ref={buttonRef}
                open={open}
                tone={barTone}
                controls={open ? MOBILE_MENU_ID : undefined}
                onClick={() => setOpenedOn(open ? null : path)}
              />
            </div>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {open ? <MobileMenu ref={menuRef} active={active} home={home} onContact={onContact} reduced={reduced} onNavigate={closeForNavigation} /> : null}
      </AnimatePresence>
    </>
  );
}
