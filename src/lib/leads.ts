import "server-only";
import { getServerSupabase } from "./supabase/server";
import { sendEmail } from "./email/mailer";
import {
  adminNotification,
  articleEmail,
  autoReply,
  autoReplySubject,
  newsletterWelcome,
  type AutoReplyContext,
} from "./email/templates";
import { env, notifyAdminEmails } from "./env";
import type { CmsArticle } from "./sanity";
import { enrol } from "./journey";
import type { LeadRequest, NewsletterValues } from "./validation/schemas";

/**
 * Lead pipeline (server-only):
 *   1. store the lead in Supabase `leads` (skipped until configured);
 *   2. notify the admin inboxes and auto-reply by email, via Gmail SMTP or
 *      Resend, whichever is configured (skipped until one is).
 * Neither step throws — a configuration gap must never lose a founder's
 * message, so the route always logs the payload as a last resort.
 */

const KIND_LABEL: Record<LeadRequest["kind"], string> = {
  advisory: "advisory application",
  consultation: "consultation request",
  mentorship: "mentorship application",
  speaking: "speaking invitation",
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
        Area: v.area,
        "The decision": v.decision,
        "Already tried": v.tried,
        "Heard about me via": v.heardFrom,
        Page: input.sourcePage,
      };
    case "consultation":
    case "mentorship":
      return {
        Name: v.name,
        Email: v.email,
        "I am": v.identity,
        Phone: v.phone,
        Area: v.area,
        "The decision": v.decision,
        Page: input.sourcePage,
      };
    case "speaking":
      return {
        Name: v.name,
        Email: v.email,
        Organisation: v.organisation,
        Engagement: v.engagement,
        "When (roughly)": v.date,
        Audience: v.audience,
        "The session": v.details,
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
    to: notifyAdminEmails,
    subject: `New ${label}: ${name}`,
    html: adminNotification(label, flatten(input)),
    replyTo: email,
  });
  const reply = await sendEmail({
    to: email,
    subject: autoReplySubject(name, input.kind),
    html: autoReply(name, input.kind, input.values as AutoReplyContext),
  });
  emailed = admin.ok || reply.ok;

  // Speaking invitations are not sales conversations; everyone else joins
  // the short follow-up journey.
  if (input.kind !== "speaking") {
    const v = input.values as { area?: string; stage?: string; identity?: string; company?: string; decision?: string; message?: string };
    void enrol(email, name, "lead", {
      kind: input.kind,
      area: v.area,
      stage: v.stage,
      identity: v.identity,
      company: v.company,
      decision: v.decision ?? v.message,
    });
  }

  if (!stored && !emailed) {
    // Nothing is configured yet: keep the lead in the server log.
    console.info(`[leads] ${label} (not stored, not emailed):`, JSON.stringify(flatten(input)));
  }
  return { stored, emailed };
}

export async function processNewsletter(input: NewsletterValues): Promise<{ stored: boolean }> {
  let stored = false;
  const source = input.source || "footer";
  const supabase = getServerSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .upsert({ email: input.email, name: input.name || null, source }, { onConflict: "email" });
    if (error) console.warn("[newsletter] upsert failed:", error.message);
    else stored = true;
  }
  if (source === "magnet") {
    // The checklist request: the first journey email delivers it right away.
    void enrol(input.email, input.name, "magnet");
  } else {
    void sendEmail({ to: input.email, subject: "Welcome — Anjan Prasad", html: newsletterWelcome(input.name) });
    void enrol(input.email, input.name, "subscriber");
  }
  if (!stored) console.info("[newsletter] subscription (not stored):", input.email);
  return { stored };
}

/** Plain-text teaser of an article body for the email. */
function articlePreview(a: CmsArticle): string[] {
  const out: string[] = [];
  for (const b of a.body ?? []) {
    if ((b.type === "lead" || b.type === "p") && b.text) out.push(b.text);
    if (out.length >= 3) break;
  }
  if (!out.length && a.cmsSections?.length) {
    for (const s of a.cmsSections) {
      for (const blk of s.text ?? []) {
        const t = ((blk as { children?: { text?: string }[] }).children ?? []).map((c) => c.text ?? "").join("");
        if (t.trim()) out.push(t);
        if (out.length >= 3) break;
      }
      if (out.length >= 3) break;
    }
  }
  if (!out.length && a.caseStudy?.summary) out.push(a.caseStudy.summary);
  return out;
}

/** "Email me this article": send it and add the reader to the letter. */
export async function sendArticle(
  input: NewsletterValues & { slug: string },
  article: CmsArticle
): Promise<{ sent: boolean; stored: boolean }> {
  let stored = false;
  const supabase = getServerSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .upsert({ email: input.email, name: input.name || null, source: `article:${article.slug}` }, { onConflict: "email" });
    if (error) console.warn("[articles] upsert failed:", error.message);
    else stored = true;
  }
  const url = `${env.siteUrl.replace(/\/$/, "")}/knowledge-hub/${article.slug}`;
  const res = await sendEmail({
    to: input.email,
    subject: `${article.title} — from Anjan Prasad`,
    html: articleEmail(input.name, {
      title: article.title,
      excerpt: article.excerpt,
      kicker: article.kicker,
      category: article.category,
      readTime: article.readTime,
      image: article.image,
      url,
      preview: articlePreview(article),
    }),
  });
  if (!res.ok) console.info(`[articles] send skipped/failed for ${input.email}: ${res.error ?? "no transport"}`);
  void enrol(input.email, input.name, "article", { slug: article.slug, articleTitle: article.title });
  return { sent: res.ok, stored };
}
