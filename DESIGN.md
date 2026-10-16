# essor: design system and build rules

Read this whole file before writing UI code. It is the contract every section follows, so the site reads as one piece of work and not as a set of templates.

## 1. Brand

essor (always lowercase) is a French-speaking agency that takes over **the whole digital side of a business**: branding, marketing strategy, video content (Reels, shootings), websites and apps, automation tools. "essor" means take-off or rapid growth in French. The site is in **French only**.

Inspiration: (1) the "Bond" agency site: dark grid canvas, tilted lime stickers on key words, pinned sticky-note stat cards, service pills linked by curved dashed lines, small hand-drawn sparks and squiggles. (2) A clean white "digital library" hero: big tight type, a small object inline inside the headline, and a fanned stack of cards spilling out of the bottom of a rounded white card on a grey page.

We combine them: **clean light hero, playful navy grid sections**, using only essor's palette.

## 2. Colour (only these exist; the default Tailwind palette is disabled)

| Token | Hex | Role |
|---|---|---|
| `navy` | #0F1045 | Text on light, dark panels, primary ink |
| `navy-950/900/700/600` | | Shadows, hover, subtle dark variations |
| `coral` | #FF5C5C | **Accent only (about 10%)**: stickers, CTAs, the dot, small highlights |
| `coral-600/200/100` | | Hover, tints |
| `sky` | #E3ECFF | Page background, light cards, grid lines on navy |
| `sky-50/200/300` | | Light variations |
| `white` | #FFFFFF | Light panels |

Contrast rules (WCAG AA). These are not optional:
- Coral backgrounds take **navy text**, never white (white on coral is 3:1 and fails).
- Coral text on white only at ≥ 24px. Coral text on navy is fine at any size (5.9:1).
- Muted text on white: `text-navy/60` minimum, never lower for body copy. On navy: `text-sky/70` minimum.
- Decorative low-opacity text is fine when `aria-hidden`.

Client brand colours (in `content/projects.ts > theme`) are allowed **only inside deliverable mockups**, applied through inline `style`. The essor UI itself never uses them.

## 3. Typography

- Display: **Bricolage Grotesque** (`font-display`), variable `opsz` and `wdth`. Headlines are weight 600 with tracking around -0.028em (set on h1–h4 by default). Use `font-condensed` for very large numerals or labels where width matters.
- Text: **DM Sans** (`font-sans`, the body default).
- Labels: **DM Mono** (`font-mono`), uppercase, tracking 0.12–0.16em, small (0.72–0.8rem). Use for meta info: indices, tags, years, captions.
- Scale tokens: `text-mega` (hero), `text-display` (section titles), `text-title` (sub-sections). Body 1rem–1.25rem. Lead paragraphs `text-lg sm:text-xl` with `text-navy/70` or `text-sky/75`.
- French typography: content files already contain non-breaking spaces before `? ! : ;`. Never hard-code copy in components when it exists in `src/content/*`. If you must write new microcopy, write correct French, use "vous", use the typographic apostrophe ’ and a non-breaking space (` `) before `? ! : ;`.

## 4. Layout

- The page background is `sky`. Each section is a **`<Panel>`**, a rounded sheet with a 8–12px margin (`src/components/ui/panel.tsx`). Tones: `white`, `navy` (with `grid` for the Bond canvas), `sky`, `coral` (avoid for large panels).
- Inside a panel use `<Container>` (max-width 1360px, side padding 20/32/48px).
- Vertical rhythm inside panels: `py-20 sm:py-28 lg:py-36`. Section header = `SectionLabel` + title + optional intro paragraph (max-width ~38rem).
- Asymmetry is good. Avoid three equal centred cards with an icon on top. Prefer editorial layouts: big type left, content offset right, overlaps, rotated stickers, numbers in mono.
- Mobile first. Everything must work at 360px wide with no horizontal scroll. Test at 390×844 and 1440×900.

Section order and ids on the home page (ids are used by the navigation):
1. Hero: white panel, no index
2. Marquee band: coral, between hero and next panel
3. `#un-seul-toit`: navy grid, label index "01", "Un seul toit"
4. `#services`: white, "02"
5. `#projets`: white, "03"
6. `#studio`: navy grid, "04" (manifesto + sticky notes)
7. `#methode`: white, "05"
8. `#faq`: white, "06"
9. Footer (navy, contains the final call to action on every page except /contact)

## 5. Components you must reuse (do not re-implement)

- `@/components/brand/logo`: `Logo`, `Mark`, `MarkDisc` (colour via `currentColor`; the dot is always coral)
- `@/components/ui/panel`: `Panel`
- `@/components/ui/container`: `Container`
- `@/components/ui/section-label`: `SectionLabel` (`tone="light"` on navy)
- `@/components/ui/sticker`: `Sticker` (tilted label; tones coral/sky/white/navy; size follows font-size)
- `@/components/ui/highlight`: `Highlight` (title + highlight substring → sticker); content exposes `{ title, highlight }`
- `@/components/ui/button`: `ButtonLink`, `Button`, `buttonClasses` (variants primary/dark/light/outline/outline-light, sizes sm/md/lg)
- `@/components/ui/icons`: `ArrowIcon`, `ArrowUpRightIcon`, `PlusIcon`, `CheckIcon`, `ServiceIcon` (per service key)
- `@/components/ui/doodle`: `Doodle` (spark, squiggle, arrow, loop, underline, circle, star, zigzag), which draws itself in view
- `@/components/ui/reveal`: `Reveal` (fade-up on view), `RevealWords` (masked word-by-word headline)
- `@/components/ui/marquee`: `Marquee`
- `@/components/ui/magnetic`: `Magnetic` (pointer pull for important CTAs)
- `@/components/deliverables`: `Deliverable` (themed mockups: identity, reel, website, app, post, automation)
- `@/hooks/use-media`: `useMedia`, `usePrefersReducedMotion`, `useFinePointer`, `useIsDesktop`
- `@/lib/cn`: `cn()`

If a primitive is missing something you need, build a local component in your own folder. Do not edit shared files (listed above, plus `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/content/*`). Report needed shared changes in your final message instead.

## 6. Motion

- Libraries: **Motion** (`motion/react`) for component animation, gestures, layout and presence; **GSAP + ScrollTrigger** (`gsap`, `@gsap/react` `useGSAP`) only for scroll-scrubbed choreography. ScrollTrigger is registered and synced with Lenis in `Providers`. Don't create another Lenis instance.
- Easing: `[0.16, 1, 0.3, 1]` (expo out) for entrances; springs for interactive things (stiffness 300–500, damping 25–35). Durations 0.5–1s. Stagger 0.04–0.08s.
- Motion has a job: show hierarchy, reward interaction, explain (the one-roof diagram, the fan of deliverables). No constant wobbling or decoration that fights the content.
- **Reduced motion**: `MotionConfig reducedMotion="user"` is global, which covers Motion transforms. For GSAP, loops, autoplaying mockups, drag or marquee, check `usePrefersReducedMotion()` and render the static final state.
- Animate only `transform` and `opacity` (and `clip-path` sparingly). No layout thrash, no animating width/height on scroll.

## 7. What "not AI slop" means here

Never: purple/blue gradients, glassmorphism blobs, glowing orbs, generic stock icons in rounded squares, a "trusted by" logo wall with fake logos, emoji as icons, testimonials or numbers that were not provided (no invented clients, ratings, revenue or "+200 projects"), lorem ipsum, filler words ("Elevate", "Boostez", "solutions innovantes", "à 360°"), centred-everything layouts, identical card grids, drop shadows on everything.

Always: real content from `src/content`, strong typographic hierarchy, deliberate asymmetry, brand motifs (the coral dot, stickers, the grid, hand-drawn doodles), crisp details (hairlines `border-navy/10`, mono meta labels, tabular numbers), and a design that explains the offer.

Projects are **concept projects** until the agency adds real ones. Always render a small "Projet concept" tag when `project.concept` is true. Never present them as real clients.

## 8. Accessibility

- Semantic landmarks and headings (one `h1` per page). Section titles are `h2`.
- Every interactive element is reachable by keyboard and has a visible focus state (global `:focus-visible` ring is coral; inside `bg-sky` / `bg-sky-50` containers it turns navy, since coral is under 3:1 on sky). Focusable elements carry a `scroll-margin-top` so focus never lands under the fixed header.
- Tabs use proper `role="tablist"`/`tab`/`tabpanel` + arrow-key navigation, or plain buttons with `aria-pressed`.
- Decorative SVG gets `aria-hidden`. Mockups (deliverables) are decorative: wrap them `aria-hidden` and give the parent a meaningful label.
- Target size ≥ 44×44px on touch.

## 9. Next.js 16.4 specifics (read `node_modules/next/dist/docs/` when unsure)

- App Router, React 19.3, React Compiler on, **Cache Components on** (`cacheComponents: true`). In Server Components, do not call `new Date()`, `Date.now()` or `Math.random()` during render (it breaks prerendering); move such code to a Client Component or a cached function. Read `01-app/01-getting-started/08-caching.md` if the dev overlay complains.
- `params` and `searchParams` are Promises (`PageProps<'/projets/[slug]'>`). Use `generateStaticParams` for dynamic routes.
- `"use client"` only where needed (interactivity, motion). Keep sections as Server Components that render small client islands where possible.
- Tailwind CSS v4: tokens live in `globals.css` `@theme`. Utility examples: `bg-navy`, `text-coral`, `text-navy/60`, `ring-sky/30`, `font-display`, `text-display`, `rounded-[var(--radius-panel)]`, `ease-[var(--ease-out-expo)]`.

## 10. Checking your work

- The dev server is already running at http://localhost:3000 (Turbopack hot reload). Do **not** start another one or run `next build`.
- Preview your section in isolation at `src/app/lab/<your-name>/page.tsx` (a throwaway route, deleted before launch).
- Screenshot: `node /tmp/claude-1000/-home-nvssim-Projects-essor/1f35da8e-c9b6-44c7-9819-a3e5c1687008/scratchpad/tools/shot.mjs <url> <out.png> [--full] [--mobile] [--w=1440 --h=900] [--scroll=800] [--hover=css-selector] [--click=css-selector] [--wait=1500] [--reduced]`. It prints console errors and horizontal overflow. Save shots to the scratchpad `shots/` folder and look at them with the Read tool. Iterate until it looks like work from a top studio.
- Type check: `npx tsc --noEmit` (ignore errors in files you don't own). Lint your files: `npx eslint <your paths>`.
