# essor: agency website

Portfolio and lead-generation site for **essor**, a branding, marketing and development agency. French only.

Stack: Next.js 16.4 (App Router, Cache Components, React Compiler) · React 19.3 · TypeScript · Tailwind CSS v4 · Motion · GSAP ScrollTrigger · Lenis · React Hook Form + Zod · Resend · Google Sheets (Apps Script webhook).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the values, see docs/FORMULAIRE.md
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

| What | Where |
|---|---|
| All site copy (French) | `src/content/*.ts` |
| Site settings: contact details, socials, navigation | `src/content/site.ts` |
| Projects / case studies | `src/content/projects.ts` |
| Project-form options (sectors, budgets…) | `src/content/brief.ts` |
| Design system rules | `DESIGN.md` |
| Colours, fonts, tokens | `src/app/globals.css` (`@theme`) |
| Shared UI primitives | `src/components/ui/*` |
| Page sections | `src/components/sections/*` |
| Mockup compositions (project covers, hero cards) | `src/components/deliverables/*` |
| Project form (front + server action) | `src/components/brief/*`, `src/app/contact/*`, `src/lib/brief/*` |
| Google Apps Script for the Sheet | `integrations/google-apps-script.gs` |
| Header, footer, 404, legal page, SEO (sitemap, robots, JSON-LD, OG images) | `src/components/layout/*`, `src/components/seo/*`, `src/app/*` |
| Legal page details (company name, registration…) | `src/app/mentions-legales/legal.ts` |
| Real 404 for unknown `/projets/…` URLs | `src/proxy.ts` |
| Security headers, Server Action size limit | `next.config.ts` |

### Editing copy

Edit the strings in `src/content/*.ts`. French typography (non-breaking space before `? ! : ;`) can be re-applied automatically:

```bash
node scripts/fr-typo.mjs
```

### Adding a real project

Copy an entry in `src/content/projects.ts`, set `concept: false`, and fill in the real client, texts and theme colours. Concept projects show a "Projet concept" tag; remove them once real case studies exist.

### Logo

The logo in `public/brand/*.svg` and `src/components/brand/logo-paths.ts` is a **redraw** made from the brand sheet (`scripts/build-logo.mjs`, wordmark set in Poppins SemiBold). Replace it with the designer's original vector files when available.

## Project form

Each brief is sent **by e-mail (Resend)** and **appended to a Google Sheet**. Setup guide, in French: [`docs/FORMULAIRE.md`](docs/FORMULAIRE.md). Environment variables: [`.env.example`](.env.example).

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel (framework preset: Next.js).
2. Add the environment variables from `.env.example` (Production and Preview).
3. Set `NEXT_PUBLIC_SITE_URL` to the final domain (used for canonical URLs, sitemap, Open Graph).
4. Deploy, then submit a test brief and check the inbox and the Sheet.
