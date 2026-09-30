# Backend integration

## Leads (advisory · consultation · contact)
`POST /api/leads` with `{ kind, values, sourcePage }`, validated by the Zod
schemas in `src/lib/validation/schemas.ts`. `src/lib/leads.ts` then:

1. inserts into Supabase `public.leads` (service-role key on the server);
2. emails Anjan (`NOTIFY_ADMIN_EMAIL`) and an auto-reply to the sender via
   Resend;
3. if neither is configured, logs the lead server-side.

## Newsletter
`POST /api/newsletter` upserts into `public.newsletter_subscriptions`
(unique on email) and sends a welcome email.

## Environment
See `.env.example`. Secrets never carry the `NEXT_PUBLIC_` prefix and are
read only in server modules (`import "server-only"`).
