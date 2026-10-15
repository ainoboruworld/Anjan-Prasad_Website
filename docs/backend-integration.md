# Backend integration

Everything editable lives in two places:

- **Sanity Studio** — all articles and case studies (see `docs/sanity-cms.md`).
- **Supabase** — every form submission and newsletter signup (your CRM).

## Supabase as the CRM

Run the SQL files in `supabase/migrations/` (in order) in the Supabase SQL
editor, then set in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server only, never `NEXT_PUBLIC_`)

Tables:

- `public.leads` — one row per form submit from any page. `kind` is one of
  `advisory`, `consultation`, `mentorship`, `speaking`, `contact`; the full
  form answers are in the `payload` JSON column. Use the `status` column
  (`new` / `read` / `replied` / `archived`) to work the pipeline straight
  from the Supabase table editor.
- `public.newsletter_subscriptions` — one row per subscriber, unique on
  email.

## Email trigger (Resend)

Set `RESEND_API_KEY`, `NOTIFY_ADMIN_EMAIL` and `NOTIFY_FROM_EMAIL`. Every
lead then also sends a notification email to Anjan and an auto-reply to the
sender; newsletter signups get a welcome email. The Supabase insert and the
email both happen on the same submit, so nothing needs a webhook.

## API routes

`POST /api/leads` and `POST /api/newsletter`, validated by the Zod schemas
in `src/lib/validation/schemas.ts`, handled in `src/lib/leads.ts`. If
Supabase or Resend is not configured the submit still succeeds and is
logged server-side, so the site never breaks while keys are missing.

## Environment

See `.env.example`. Secrets never carry the `NEXT_PUBLIC_` prefix and are
read only in server modules (`import "server-only"`).
