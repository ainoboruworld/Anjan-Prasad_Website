-- Widen leads.kind to every form the site submits.
-- The app sends: advisory, consultation, mentorship, speaking, contact
-- (see src/lib/validation/schemas.ts); 0001 only allowed three of them.
alter table public.leads
  drop constraint if exists leads_kind_check;

alter table public.leads
  add constraint leads_kind_check
  check (kind in ('advisory', 'consultation', 'mentorship', 'speaking', 'contact'));
