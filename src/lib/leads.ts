import "server-only";
import { getServerSupabase } from "./supabase/server";
import { sendEmail } from "./email/resend";
import { adminNotification, autoReply, newsletterWelcome } from "./email/templates";
import { serverEnv } from "./env";
import type { LeadRequest, NewsletterValues } from "./validation/schemas";

/**
 * Lead pipeline (server-only):
 *   1. store the lead in Supabase `leads` (skipped until configured);
 *   2. notify Anjan and send an auto-reply via Resend (skipped until configured).
 * Neither step throws — a configuration gap must never lose a founder's
 * message, so the route always logs the payload as a last resort.
 */

const KIND_LABEL: Record<LeadRequest["kind"], string> = {
  advisory: "advisory application",
  consultation: "consultation request",
  contact: "contact message",
};

function flatten(input: LeadRequest): Record<string, string | undefined> {
  const v = input.values as Record<string, string | undefined>;
  switch (input.kind) {
    case "advisory":
      return {
        Name: v.name,
        Email: v.email,
        Phone: v.phone,
        Company: v.company,
        Website: v.website,
        Stage: v.stage,
        "The decision": v.decision,
        "Already tried": v.tried,
        "Heard about me via": v.heardFrom,
        Page: input.sourcePage,
      };
    case "consultation":
      return {
        Name: v.name,
        Email: v.email,
        "I am": v.identity,
        Phone: v.phone,
        Area: v.area,
        "The decision": v.decision,
        Page: input.sourcePage,
      };
    case "contact":
      return { Name: v.name, Email: v.email, Reason: v.reason, Message: v.message, Page: input.sourcePage };
  }
}

export async function processLead(input: LeadRequest): Promise<{ stored: boolean; emailed: boolean }> {
  const { name, email } = input.values;
  let stored = false;
  let emailed = false;

  const supabase = getServerSupabase();
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      kind: input.kind,
      name,
      email,
      phone: (input.values as { phone?: string }).phone || null,
      payload: input.values,
      source_page: input.sourcePage ?? null,
    });
    if (error) console.warn("[leads] insert failed:", error.message);
    else stored = true;
  }

  const label = KIND_LABEL[input.kind];
  const admin = await sendEmail({
    to: serverEnv.notifyAdminEmail,
    subject: `New ${label}: ${name}`,
    html: adminNotification(label, flatten(input)),
    replyTo: email,
  });
  const reply = await sendEmail({
    to: email,
    subject: "Thank you — Anjan Prasad",
    html: autoReply(name, input.kind),
  });
  emailed = admin.ok || reply.ok;

  if (!stored && !emailed) {
    // Nothing is configured yet: keep the lead in the server log.
    console.info(`[leads] ${label} (not stored, not emailed):`, JSON.stringify(flatten(input)));
  }
  return { stored, emailed };
}

export async function processNewsletter(input: NewsletterValues): Promise<{ stored: boolean }> {
  let stored = false;
  const supabase = getServerSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .upsert({ email: input.email, name: input.name || null, source: "footer" }, { onConflict: "email" });
    if (error) console.warn("[newsletter] upsert failed:", error.message);
    else stored = true;
  }
  void sendEmail({ to: input.email, subject: "Welcome — Anjan Prasad", html: newsletterWelcome(input.name) });
  if (!stored) console.info("[newsletter] subscription (not stored):", input.email);
  return { stored };
}
