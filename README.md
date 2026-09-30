# Anjan Prasad — anjanprasad.com

The new website for Anjan Prasad, business consultant, advisor and mentor.
Built on the same stack as the previous AP site: **Next.js 16 (App Router)**,
**React 19**, **TypeScript**, **Tailwind CSS v4**, **react-hook-form + Zod**,
**TanStack Query**, **Supabase** (leads, newsletter), **Sanity** (Knowledge
Hub CMS) and **Resend** (email).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — everything works unconfigured
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint · npm run typecheck
npm run studio               # Sanity Studio (needs SANITY_STUDIO_PROJECT_ID)
```

## Brand

The design follows the final moodboard (`docs/brand.md`): navy leads,
off-white gives space, gold is the signature, soft blue is a quiet extra.
Two fonts only — Instrument Serif for headlines, Geist for text — loaded via
`next/font`. The logo kit lives in `public/brand/` and the mark is a React
component (`src/components/brand/ApMark.tsx`).

All design tokens and component styles live in `src/styles/site.css`, ported
from the approved prototype so the build matches the design 1:1.

## Structure

| Concern | Location |
| --- | --- |
| Pages (App Router) | `src/app/*` — home, business-advisory, consultation, knowledge-hub, knowledge-hub/[slug], about, contact, privacy, terms |
| Design system | `src/styles/site.css`, `src/app/globals.css` |
| Content & copy | `src/lib/data/*` (site, brands, areas, articles) |
| Environment (single source) | `src/lib/env.ts`, `.env.example` |
| Validation (Zod) | `src/lib/validation/schemas.ts` |
| Service layer | `src/services/*` (leads, newsletter) |
| Mutations (TanStack Query) | `src/hooks/mutations/*` |
| API routes | `src/app/api/leads`, `src/app/api/newsletter` |
| Lead pipeline (server) | `src/lib/leads.ts` → Supabase + Resend |
| CMS read layer | `src/lib/sanity.ts` (falls back to seed content) |
| Sanity Studio | `sanity.config.ts`, `sanity/schemas/*` |
| Supabase schema | `supabase/migrations/0001_init.sql` |

## Forms

Every form separates **UI / validation / API**: the field components in
`src/components/forms/fields.tsx`, the Zod schema, and the `/api/leads`
route which stores the lead in Supabase and emails Anjan via Resend. When
neither is configured the lead is written to the server log, so nothing is
lost during setup.

## Connecting the backend

1. Fill `.env.local` from `.env.example`.
2. Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor.
3. Create a Sanity project, set the project id, `npm run studio`, and add a
   few `category` documents (Business, Startup, Marketing, Society, Politics,
   Spirituality). Published posts appear in the hub automatically.
4. Add a verified Resend domain and API key.

See `docs/` for details on each integration.

## Placeholders to replace

Flagged in the UI with a small "placeholder" tag: the "Off the clock" photos,
the testimonials, the article banner images, the About story details and the
beliefs list. Swap the files in `public/images/` and the copy in
`src/lib/data/*`.

## Deployment

Hosted on Vercel, connected to this repository. Every push to `main` builds and
deploys to production automatically; other branches get preview deployments.
Set `NEXT_PUBLIC_SITE_URL` in the Vercel project's Environment Variables to the
live domain so canonical links, the sitemap and share previews point at it.
