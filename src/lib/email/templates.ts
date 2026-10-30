/**
 * Plain, brand-toned HTML emails. Kept deliberately simple so they render in
 * every client. Navy #0B1A2E, off-white #F4F1EB, gold #CDB27A.
 */

import { addWorkingDays, formatReplyDate } from "../replyDate";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function shell(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#F4F1EB;font-family:Geist,Helvetica,Arial,sans-serif;color:#0B1A2E">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
  <div style="font-family:'Instrument Serif',Georgia,serif;font-size:30px;line-height:1.1;margin-bottom:6px">A<span style="color:#CDB27A;font-style:italic">p</span></div>
  <h1 style="font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:26px;line-height:1.2;margin:18px 0 12px">${esc(title)}</h1>
  ${body}
  <p style="font-size:12px;color:#4C6B8A;margin-top:36px;border-top:1px solid rgba(11,26,46,.12);padding-top:14px">Anjan Prasad · Business advisor · anjanprasad.com</p>
</div></body></html>`;
}

function rows(fields: Record<string, string | undefined>): string {
  return Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4C6B8A;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;font-size:15px;line-height:1.6">${esc(v as string).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");
}

export function adminNotification(kind: string, fields: Record<string, string | undefined>): string {
  return shell(`New ${kind}`, `<table style="border-collapse:collapse">${rows(fields)}</table>`);
}

type LeadKind = "advisory" | "consultation" | "mentorship" | "speaking" | "contact";

/** The fields each form collects that are worth echoing back to the sender. */
export type AutoReplyContext = {
  identity?: string;
  area?: string;
  stage?: string;
  company?: string;
  decision?: string;
  organisation?: string;
  engagement?: string;
  reason?: string;
  message?: string;
  details?: string;
};

const SITE = "https://anjanprasad.com";

function para(text: string): string {
  return `<p style="font-size:16px;line-height:1.75;margin:0 0 16px">${text}</p>`;
}

/** Their own words, trimmed, in a quiet quote block so they can see what reached me. */
function quote(label: string, text?: string): string {
  const t = (text ?? "").trim();
  if (!t) return "";
  const short = t.length > 420 ? `${t.slice(0, 420).trimEnd()}…` : t;
  return `<div style="margin:22px 0;padding:14px 18px;border-left:2px solid #CDB27A;background:#fff;color:#0B1A2E">
    <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4C6B8A;margin-bottom:6px">${esc(label)}</div>
    <div style="font-size:15px;line-height:1.7;font-style:italic">${esc(short).replace(/\n/g, "<br>")}</div>
  </div>`;
}

export function autoReplySubject(name: string, kind: LeadKind): string {
  const first = name.split(" ")[0] || "there";
  const subjects: Record<LeadKind, string> = {
    advisory: `${first}, your advisory application has reached me`,
    consultation: `${first}, your consultation request has reached me`,
    mentorship: `${first}, I have your story`,
    speaking: `${first}, thank you for the invitation`,
    contact: `${first}, I have your message`,
  };
  return subjects[kind];
}

/**
 * Personal confirmation to the sender. Written in Anjan's voice to founders
 * and business owners: it names what they asked about, quotes their own words
 * back, sets a concrete reply window and tells them what happens next.
 */
/** Reply-by date, computed the same way the confirmation panel does it. */
function replyBy(workingDays: number): string {
  return formatReplyDate(addWorkingDays(new Date(), workingDays));
}

/**
 * Personal confirmation to the sender. Short enough for a founder to read on
 * a phone between meetings: what reached me, when they will hear back, and
 * their own words so they know a person saw them. No marketing blocks here;
 * the follow-up journey does that work later.
 */
export function autoReply(name: string, kind: LeadKind, ctx: AutoReplyContext = {}): string {
  const first = name.split(" ")[0] || "there";
  const lower = (s?: string) => (s ?? "").trim().toLowerCase();
  const areaKnown = ctx.area && lower(ctx.area) !== "not sure yet";
  const area = areaKnown ? ` on <b>${esc(ctx.area!)}</b>` : "";

  let title = `Got it, ${first}.`;
  let what = "";
  let yourWords: [string, string | undefined] = ["What you wrote", ctx.decision];
  let outcome = "";
  let days = 4;

  switch (kind) {
    case "consultation":
      what = `Your consultation request${area} is with me.`;
      yourWords = ["The decision you're facing", ctx.decision];
      outcome = `a time for us to talk, or a straight answer on whether I'm the right person for this`;
      break;
    case "mentorship":
      title = `Thank you for your story, ${first}.`;
      what = `It&rsquo;s with me${areaKnown ? `, and I noted that <b>${esc(ctx.area!)}</b> is where it matters right now` : ""}. I take on very few mentees, so I read each one properly.`;
      yourWords = ["What you wrote", ctx.decision];
      outcome = `a yes and a first conversation, or an honest no with the reason`;
      break;
    case "advisory":
      what = `Your advisory application${ctx.company ? ` for <b>${esc(ctx.company)}</b>` : ""}${ctx.stage ? ` (${esc(lower(ctx.stage))}` : ""}${ctx.stage && areaKnown ? `, ${esc(lower(ctx.area!))})` : ctx.stage ? ")" : areaKnown ? ` on <b>${esc(ctx.area!)}</b>` : ""} is with me.`;
      yourWords = ["The decision you're facing", ctx.decision];
      outcome = `a first session proposed, or a straight no with the reason`;
      days = 5;
      break;
    case "speaking":
      title = `Thank you for the invitation, ${first}.`;
      what = `${ctx.organisation ? `<b>${esc(ctx.organisation)}</b>` : "Your session"}${ctx.engagement ? `, ${esc(lower(ctx.engagement))}` : ""}: noted, and I&rsquo;ll read the brief myself.`;
      yourWords = ["The session you have in mind", ctx.details];
      outcome = `a yes, a question or two about the room, or a polite no`;
      days = 5;
      break;
    case "contact":
    default:
      what = `Your message${ctx.reason ? ` about ${esc(lower(ctx.reason))}` : ""} is with me.`;
      yourWords = ["Your message", ctx.message];
      outcome = `a proper reply`;
      break;
  }

  return shell(
    title,
    para(`${what} I read every one myself; there is no assistant and no template behind this.`) +
      quote(yourWords[0], yourWords[1]) +
      para(`You&rsquo;ll hear from me by <b>${replyBy(days)}</b>: ${outcome}.`) +
      para(`If there&rsquo;s a deadline on this, reply with the date and I&rsquo;ll move it up.`) +
      para(`Anjan`)
  );
}

export function newsletterWelcome(name?: string): string {
  const first = (name ?? "").split(" ")[0];
  return shell(
    first ? `Welcome, ${first}.` : "Welcome.",
    `<p style="font-size:16px;line-height:1.7">One operator's letter, every week. Playbooks, margins and field notes on building profitable businesses in India. No motivation, only method.</p><p style="font-size:16px;line-height:1.7">Anjan</p>`
  );
}

export interface ArticleEmailInput {
  title: string;
  excerpt: string;
  kicker?: string;
  category?: string;
  readTime?: string;
  image?: string;
  url: string;
  /** Up to the first few paragraphs, as plain text, so the email is worth opening. */
  preview?: string[];
}

/** "Email me this article": the piece, a teaser of the body and a PDF hint. */
export function articleEmail(name: string | undefined, a: ArticleEmailInput): string {
  const first = (name ?? "").split(" ")[0];
  const img = a.image
    ? `<a href="${a.url}"><img src="${a.image.startsWith("http") ? a.image : SITE + a.image}" alt="" width="520" style="display:block;width:100%;max-width:520px;height:auto;margin:0 0 22px;border-radius:6px"></a>`
    : "";
  const meta = [a.category, a.readTime].filter(Boolean).join(" · ");
  const preview = (a.preview ?? [])
    .slice(0, 3)
    .map((t) => para(esc(t)))
    .join("");
  return shell(
    first ? `${first}, here’s the article you asked for.` : "Here’s the article you asked for.",
    para(`You asked me to send you this one. Read it when you have a quiet twenty minutes, or forward it to whoever on your team needs it most.`) +
      `<div style="margin:24px 0;padding:22px 24px;background:#fff;border:1px solid rgba(11,26,46,.1);border-top:3px solid #CDB27A">
        ${img}
        ${meta ? `<div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#4C6B8A;margin-bottom:8px">${esc(meta)}</div>` : ""}
        <div style="font-family:'Instrument Serif',Georgia,serif;font-size:26px;line-height:1.2;margin-bottom:10px"><a href="${a.url}" style="color:#0B1A2E;text-decoration:none">${esc(a.title)}</a></div>
        <div style="font-size:15px;line-height:1.65;color:#4C6B8A;margin-bottom:18px">${esc(a.excerpt)}</div>
        ${preview}
        <a href="${a.url}" style="display:inline-block;background:#0B1A2E;color:#fff;text-decoration:none;font-size:13px;letter-spacing:.06em;padding:13px 22px;border-radius:2px">Read the full article &rarr;</a>
        <div style="font-size:13px;color:#4C6B8A;margin-top:14px">Prefer a copy to keep? Open the article and use <b>Download as PDF</b> under the title.</div>
      </div>` +
      para(`I&rsquo;ve also added you to the weekly letter, one short note on the decisions founders and owners actually face. If that&rsquo;s not for you, reply with &ldquo;no letter&rdquo; and I&rsquo;ll take you off.`) +
      para(`Warmly,<br><span style="font-family:'Instrument Serif',Georgia,serif;font-size:22px">Anjan</span>`)
  );
}

/** Shell for follow-up emails: same brand frame, plus a one-click stop link. */
export function journeyShell(title: string, body: string, unsubscribeHref: string): string {
  return shell(
    title,
    body +
      para(`Warmly,<br><span style="font-family:'Instrument Serif',Georgia,serif;font-size:22px">Anjan</span>`) +
      `<p style="font-size:12px;line-height:1.6;color:#4C6B8A;margin-top:28px">You're getting this because you wrote to me, or asked for something, at anjanprasad.com. A few short notes, then I stop. <a href="${unsubscribeHref}" style="color:#4C6B8A">Stop these now</a>.</p>`
  );
}
