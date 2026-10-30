/**
 * Plain, brand-toned HTML emails. Kept deliberately simple so they render in
 * every client. Navy #0B1A2E, off-white #F4F1EB, gold #CDB27A.
 */

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

function timeline(steps: [string, string][]): string {
  return `<table style="border-collapse:collapse;margin:8px 0 22px">${steps
    .map(
      ([when, what]) =>
        `<tr><td style="padding:7px 14px 7px 0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4C6B8A;white-space:nowrap;vertical-align:top">${esc(when)}</td><td style="padding:7px 0;font-size:15px;line-height:1.6">${esc(what)}</td></tr>`
    )
    .join("")}</table>`;
}

function newsletterNudge(): string {
  return `<div style="margin:28px 0 0;padding:18px 20px;background:#fff;border:1px solid rgba(11,26,46,.1)">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-size:19px;margin-bottom:6px">While you wait, the weekly letter.</div>
    <div style="font-size:14px;line-height:1.65;color:#4C6B8A">One short note a week on margins, pricing, hiring and the decisions founders actually face. No motivation, only method. <a href="${SITE}/#newsletter" style="color:#0B1A2E;text-decoration:underline">Join it here</a>.</div>
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
export function autoReply(name: string, kind: LeadKind, ctx: AutoReplyContext = {}): string {
  const first = name.split(" ")[0] || "there";
  const lower = (s?: string) => (s ?? "").trim().toLowerCase();
  const areaKnown = ctx.area && lower(ctx.area) !== "not sure yet";
  const who =
    lower(ctx.identity) === "building an early-stage startup"
      ? "building an early-stage startup"
      : lower(ctx.identity) === "planning to start a business"
        ? "about to start a business"
        : lower(ctx.identity) === "running a business"
          ? "running a business"
          : "";

  let title = `Thank you, ${first}.`;
  let body = "";

  switch (kind) {
    case "consultation": {
      title = `Thank you, ${first}. Your request is with me.`;
      body =
        para(
          `You&rsquo;ve asked for a consultation${areaKnown ? ` on <b>${esc(ctx.area!)}</b>` : ""}${who ? ` while ${who}` : ""}. ` +
            `That takes a clear head and a bit of courage, and I don&rsquo;t take it lightly.`
        ) +
        quote("The decision you described", ctx.decision) +
        para(
          `I read every request myself. There is no assistant and no template behind this. Within <b>3&ndash;4 working days</b> you&rsquo;ll hear from me either with a time for us to talk, or with an honest note on whether I&rsquo;m the right person for this decision. Either way, you get a reply.`
        ) +
        timeline([
          ["Now", "Your request is in my inbox, exactly as you wrote it."],
          ["Next", "I read it against the numbers and the context you've shared."],
          ["3–4 working days", "You hear back from me with a time, or a straight answer."],
        ]) +
        para(
          `If there&rsquo;s a deadline on this decision, reply to this email and tell me the date. I&rsquo;ll move it up.`
        );
      break;
    }
    case "mentorship": {
      title = `Thank you for telling me your story, ${first}.`;
      body =
        para(
          `Not a pitch, just where you are and what you&rsquo;re building${areaKnown ? `, and why <b>${esc(ctx.area!)}</b> matters right now` : ""}. That&rsquo;s exactly what I asked for, and it&rsquo;s the only way I can judge whether I can actually help.`
        ) +
        quote("What you wrote", ctx.decision) +
        para(
          `I take on very few mentees, and I read every application myself. Within <b>3&ndash;4 working days</b> I&rsquo;ll reply honestly: either a yes and a first conversation, or a no with a reason and, where I can, a pointer to who or what might serve you better. You will not be left waiting.`
        ) +
        timeline([
          ["Now", "Your story has reached me."],
          ["Next", "I read it personally and think about fit, not just need."],
          ["3–4 working days", "An honest reply, either way."],
        ]) +
        para(`In the meantime, keep building. Nothing about this should slow you down.`);
      break;
    }
    case "advisory": {
      title = `Thank you, ${first}. Your application is in.`;
      const biz = ctx.company ? `<b>${esc(ctx.company)}</b>` : "your business";
      body =
        para(
          `You&rsquo;ve applied for advisory on ${biz}${ctx.stage ? ` at the <b>${esc(lower(ctx.stage))}</b> stage` : ""}${areaKnown ? `, focused on <b>${esc(ctx.area!)}</b>` : ""}. Advisory is a working relationship, so I treat the application as the first piece of work.`
        ) +
        quote("The decision you're facing", ctx.decision) +
        para(
          `I read every application myself and reply within <b>five working days</b>. If I think I can move the needle, I&rsquo;ll propose a first session. If I don&rsquo;t, I&rsquo;ll say so plainly and tell you why. Owners deserve a straight answer, not a holding pattern.`
        ) +
        timeline([
          ["Now", "Your application is in my inbox."],
          ["Next", "I review the decision, the stage and what you've already tried."],
          ["Five working days", "A proposal for a first session, or a clear no with reasons."],
        ]);
      break;
    }
    case "speaking": {
      title = `Thank you for the invitation, ${first}.`;
      body =
        para(
          `You&rsquo;ve invited me to ${ctx.engagement ? `a <b>${esc(lower(ctx.engagement))}</b>` : "a session"}${ctx.organisation ? ` with <b>${esc(ctx.organisation)}</b>` : ""}. I&rsquo;m selective about where I speak, because I only want to be in a room where founders and operators leave with something they can use on Monday.`
        ) +
        quote("The session you have in mind", ctx.details) +
        para(
          `I read every invitation myself and reply within <b>five working days</b> with a yes, a question or two about the audience, or a polite no. If your date is close, reply here and flag it.`
        );
      break;
    }
    case "contact":
    default: {
      title = `Thank you for writing, ${first}.`;
      body =
        para(
          `Your message${ctx.reason ? ` about <b>${esc(lower(ctx.reason))}</b>` : ""} has reached me, and I&rsquo;ll read it myself.`
        ) +
        quote("Your message", ctx.message) +
        para(
          `You&rsquo;ll hear back from me within <b>3&ndash;4 working days</b>. If it&rsquo;s time-sensitive, reply to this email and say so.`
        );
      break;
    }
  }

  return shell(
    title,
    body +
      para(`Warmly,<br><span style="font-family:'Instrument Serif',Georgia,serif;font-size:22px">Anjan</span><br><span style="font-size:13px;color:#4C6B8A">Business advisor &amp; mentor to founders</span>`) +
      newsletterNudge()
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
