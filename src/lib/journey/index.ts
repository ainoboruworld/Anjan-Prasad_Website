import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { getServerSupabase } from "../supabase/server";
import { sendEmail } from "../email/mailer";
import { journeyShell } from "../email/templates";
import { env, serverEnv } from "../env";
import { SEQUENCES, type JourneyContext, type Segment, type Vars } from "./sequences";

/**
 * Follow-up engine. `enrol()` is called wherever a contact appears; the
 * daily cron calls `runDue()`, which sends every step that has come due and
 * schedules the next one. Nothing here throws: a missing database simply
 * means no journey, and the rest of the site carries on.
 */

const DAY = 86_400_000;

function first(name?: string | null): string {
  return (name ?? "").trim().split(/\s+/)[0] || "there";
}

function vars(email: string, name: string | null, ctx: JourneyContext): Vars {
  const site = env.siteUrl.replace(/\/$/, "");
  const area = ctx.area && ctx.area.toLowerCase() !== "not sure yet" ? ctx.area : null;
  return {
    first: first(name),
    area,
    areaLower: area ? area.toLowerCase() : null,
    ctx,
    site,
    bookUrl: `${site}/business-advisory#capply`,
    mentorUrl: `${site}/mentorship`,
    hubUrl: `${site}/knowledge-hub`,
    checklistUrl: `${site}/resources/first-call-questions`,
  };
}

/* ── Unsubscribe links (HMAC so nobody can unsubscribe someone else) ───── */

function secret(): string {
  return serverEnv.journeySecret || serverEnv.cronSecret || "ap-journey-dev";
}

export function unsubscribeToken(email: string): string {
  return createHmac("sha256", secret()).update(email.toLowerCase()).digest("hex").slice(0, 32);
}

export function unsubscribeUrl(email: string): string {
  const site = env.siteUrl.replace(/\/$/, "");
  return `${site}/api/journey/unsubscribe?e=${encodeURIComponent(email)}&t=${unsubscribeToken(email)}`;
}

export function verifyUnsubscribe(email: string, token: string): boolean {
  const want = Buffer.from(unsubscribeToken(email));
  const got = Buffer.from(token);
  return want.length === got.length && timingSafeEqual(want, got);
}

/* ── Enrolment ─────────────────────────────────────────────────────────── */

/**
 * Put a contact on a sequence. A lead always wins over a lighter segment
 * (someone who applied should not keep getting "download the checklist");
 * a lighter segment never overrides a lead already in flight.
 */
export async function enrol(email: string, name: string | undefined | null, segment: Segment, ctx: JourneyContext = {}) {
  const supabase = getServerSupabase();
  if (!supabase) return;
  const key = email.trim().toLowerCase();
  const steps = SEQUENCES[segment];
  if (!steps.length) return;

  const { data: existing } = await supabase
    .from("journey_contacts")
    .select("segment, stopped_at, stop_reason")
    .eq("email", key)
    .maybeSingle();

  if (existing?.stopped_at && existing.stop_reason === "unsubscribed") return; // they said no: respect it
  if (existing && existing.segment === "lead" && segment !== "lead") return; // keep the lead journey
  if (existing && existing.segment === segment && !existing.stopped_at) return; // already running

  const nextAt = new Date(Date.now() + steps[0].day * DAY).toISOString();
  const { error } = await supabase.from("journey_contacts").upsert(
    {
      email: key,
      name: name || null,
      segment,
      context: ctx,
      step: 0,
      next_at: nextAt,
      stopped_at: null,
      stop_reason: null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );
  if (error) console.warn("[journey] enrol failed:", error.message);
}

export async function stop(email: string, reason: string) {
  const supabase = getServerSupabase();
  if (!supabase) return false;
  const { error } = await supabase
    .from("journey_contacts")
    .update({ stopped_at: new Date().toISOString(), stop_reason: reason, updated_at: new Date().toISOString() })
    .eq("email", email.trim().toLowerCase());
  if (error) console.warn("[journey] stop failed:", error.message);
  return !error;
}

/* ── The daily run ─────────────────────────────────────────────────────── */

interface ContactRow {
  email: string;
  name: string | null;
  segment: Segment;
  context: JourneyContext;
  step: number;
}

export async function runDue(limit = 200): Promise<{ sent: number; failed: number; finished: number }> {
  const supabase = getServerSupabase();
  const out = { sent: 0, failed: 0, finished: 0 };
  if (!supabase) return out;

  const { data, error } = await supabase
    .from("journey_contacts")
    .select("email, name, segment, context, step")
    .is("stopped_at", null)
    .lte("next_at", new Date().toISOString())
    .order("next_at", { ascending: true })
    .limit(limit);
  if (error) {
    console.warn("[journey] query failed:", error.message);
    return out;
  }

  for (const c of (data ?? []) as ContactRow[]) {
    const steps = SEQUENCES[c.segment] ?? [];
    const step = steps[c.step];
    if (!step) {
      await stop(c.email, "finished");
      out.finished++;
      continue;
    }
    const v = vars(c.email, c.name, c.context ?? {});
    const subject = step.subject(v);
    const html = journeyShell(subject, step.body(v), unsubscribeUrl(c.email));
    const unsub = unsubscribeUrl(c.email);
    const res = await sendEmail({
      to: c.email,
      subject,
      html,
      headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    });
    if (!res.ok) {
      out.failed++;
      console.warn(`[journey] send failed for ${c.email} (${c.segment}#${c.step}): ${res.error}`);
      continue; // retried on the next run
    }
    out.sent++;
    await supabase.from("journey_sends").upsert(
      { email: c.email, segment: c.segment, step: c.step, subject },
      { onConflict: "email,segment,step" }
    );
    const next = steps[c.step + 1];
    const update = next
      ? { step: c.step + 1, next_at: new Date(Date.now() + (next.day - step.day) * DAY).toISOString(), last_sent_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      : { step: c.step + 1, next_at: null, stopped_at: new Date().toISOString(), stop_reason: "finished", last_sent_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    if (!next) out.finished++;
    await supabase.from("journey_contacts").update(update).eq("email", c.email);
  }
  return out;
}
