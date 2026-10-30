-- Follow-up journey: every contact (lead, subscriber, article reader,
-- checklist download) is enrolled in a short email sequence. A daily cron
-- (/api/cron/journey) sends whatever is due. One row per contact; the row
-- remembers which step they are on and when the next one is due.
create table if not exists public.journey_contacts (
  email text primary key,
  name text,
  -- lead | magnet | subscriber | article
  segment text not null,
  -- what we know: lead kind, area, stage, identity, article slug, etc.
  context jsonb not null default '{}'::jsonb,
  step integer not null default 0,
  next_at timestamptz,
  stopped_at timestamptz,
  stop_reason text,
  last_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists journey_due_idx on public.journey_contacts (next_at) where stopped_at is null;

-- Every send, for the record (and so a step is never sent twice).
create table if not exists public.journey_sends (
  id uuid primary key default gen_random_uuid(),
  email text not null references public.journey_contacts (email) on delete cascade,
  segment text not null,
  step integer not null,
  subject text not null,
  sent_at timestamptz not null default now(),
  unique (email, segment, step)
);

alter table public.journey_contacts enable row level security;
alter table public.journey_sends enable row level security;
-- Written only by the server with the service-role key; no anon policies.

-- Where a subscriber came from (footer, popup, article:<slug>, magnet, form).
alter table public.newsletter_subscriptions add column if not exists source text;
