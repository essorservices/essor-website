import type Lenis from "lenis";

/** Elements behind the mobile menu: made inert so focus and screen readers stay in the menu. */
const backgroundSelectors = ["#contenu", "[data-site-footer]"];

/** Freezes the page behind the mobile menu. Safe to call several times. */
export function lockPage(lenis: Lenis | undefined) {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
  for (const selector of backgroundSelectors) document.querySelector(selector)?.setAttribute("inert", "");
}

/**
 * Releases the page. Also called synchronously from menu link clicks, so smooth
 * scrolling to an anchor (handled by Lenis on the same click) is not blocked.
 */
export function unlockPage(lenis: Lenis | undefined) {
  document.documentElement.style.overflow = "";
  for (const selector of backgroundSelectors) document.querySelector(selector)?.removeAttribute("inert");
  lenis?.start();
}

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keeps Tab / Shift+Tab cycling inside the given containers (in DOM order). */
export function trapTab(event: KeyboardEvent, containers: (HTMLElement | null)[]) {
  const items = containers
    .flatMap((c) => (c ? Array.from(c.querySelectorAll<HTMLElement>(focusable)) : []))
    .filter((el) => el.offsetParent !== null || el.getClientRects().length > 0);
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const current = document.activeElement as HTMLElement | null;
  const inside = current ? items.includes(current) : false;
  if (event.shiftKey && (current === first || !inside)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (current === last || !inside)) {
    event.preventDefault();
    first.focus();
  }
}
