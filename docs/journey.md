# The return journey

Most founders do not book on their first visit. This is the system that keeps
being useful to them until they are ready, and brings them back.

## What happens, step by step

| Moment | What the visitor gets | Where it lives |
| --- | --- | --- |
| Submits any form | Premium confirmation panel: soft chime, animated check, reply window with an exact date, calendar reminder, two articles matched to their area, newsletter opt-in prefilled | `src/components/forms/FormSuccess.tsx` |
| Seconds later | A personal email in Anjan's voice that names their area/stage, quotes their own words back, and sets the reply window | `src/lib/email/templates.ts` (`autoReply`) |
| Day 2, 6, 12, 24 | Follow-up emails: one sharp question for their area, a matching case study, a quiet "did the decision get made?", then the seven questions | `src/lib/journey/sequences.ts` (`LEAD`) |
| Scrolls and leaves (back button, exit intent, deep scroll) | One card, once per visitor, offering "The 7 questions I ask before a first call" by email | `src/components/shared/NewsletterPopup.tsx` |
| Asks for the seven questions | Day 0 delivery, then day 3, 8, 16 notes ending in an honest offer to talk | `sequences.ts` (`MAGNET`) |
| Emails themselves an article | The article, then day 3 and day 9 follow-ups | `sequences.ts` (`ARTICLE`) |
| Subscribes to the letter | Welcome, then day 2 and day 10 | `sequences.ts` (`SUBSCRIBER`) |

Rules built in: a lead journey always wins over a lighter one; an
unsubscribe is final; every follow-up has a one-click stop link; speaking
invitations never enter a sales sequence.

## One-time setup

1. Run the migration `supabase/migrations/0003_journey.sql` in Supabase.
2. Add two environment variables in Vercel:
   - `CRON_SECRET` – any long random string. Vercel Cron sends it automatically.
   - `JOURNEY_SECRET` – optional, signs unsubscribe links (falls back to `CRON_SECRET`).
3. Deploy. `vercel.json` schedules `/api/cron/journey` daily at 09:00 IST.
   To run it by hand: `curl -H "Authorization: Bearer $CRON_SECRET" https://anjanprasad.com/api/cron/journey`.

## Watching it work

- `journey_contacts`: one row per person, with `segment`, `step`, `next_at`, `stopped_at`.
- `journey_sends`: every email sent, so a step is never sent twice.
- `newsletter_subscriptions.source`: where each signup came from (`footer`, `magnet`, `form`, `article:<slug>`).

To stop a person's sequence by hand (for example once they book), set
`stopped_at = now()` on their `journey_contacts` row.

## Editing the emails

All copy is in `src/lib/journey/sequences.ts`, including the area-specific
questions and the case study chosen for each area in `AREA_NOTES`. Change a
`day` value to move a step; the next run picks it up.
