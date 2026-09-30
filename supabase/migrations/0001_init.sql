-- Anjan Prasad website — initial schema.
-- Run in the Supabase SQL editor (or `supabase db push`).

create extension if not exists pgcrypto;

-- Advisory applications, consultation requests and contact messages.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('advisory', 'consultation', 'contact')),
  name text not null,
  email text not null,
  phone text,
  payload jsonb not null default '{}'::jsonb,
  source_page text,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_kind_idx on public.leads (kind);

-- Footer newsletter.
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  source text,
  created_at timestamptz not null default now()
);

-- Row-level security: the site writes with the service-role key from the
-- server. If you prefer the anon key, these policies allow inserts only.
alter table public.leads enable row level security;
alter table public.newsletter_subscriptions enable row level security;

drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads" on public.leads for insert to anon with check (true);

drop policy if exists "anon can subscribe" on public.newsletter_subscriptions;
create policy "anon can subscribe" on public.newsletter_subscriptions for insert to anon with check (true);
