/**
 * The follow-up journey, written as emails from Anjan.
 *
 * Why it exists: a founder's first visit rarely ends in a booking. The ticket
 * is large and the decision is personal, so the job of these emails is to
 * keep being useful until the moment they are ready, then make the next
 * step obvious. Each sequence is short, specific and easy to leave.
 *
 * Segments
 *   lead        someone who sent a consultation / mentorship / advisory /
 *               contact request (the auto-reply already went out)
 *   magnet      downloaded "The 7 questions I ask before a first call"
 *   article     asked for an article by email
 *   subscriber  footer / popup newsletter signup
 */

export type Segment = "lead" | "magnet" | "article" | "subscriber";

export interface JourneyContext {
  kind?: string; // lead kind
  area?: string;
  stage?: string;
  identity?: string;
  company?: string;
  decision?: string;
  slug?: string; // article
  articleTitle?: string;
}

export interface Step {
  /** Days after enrolment (or after the previous step for `afterPrevious`). */
  day: number;
  subject: (c: Vars) => string;
  /** HTML body paragraphs; the shell, signature and unsubscribe are added. */
  body: (c: Vars) => string;
}

export interface Vars {
  first: string;
  area: string | null; // null when "Not sure yet" / unknown
  areaLower: string | null;
  ctx: JourneyContext;
  site: string;
  bookUrl: string;
  mentorUrl: string;
  hubUrl: string;
  checklistUrl: string;
}

/* ── Area-specific content: one sharp question + one case study each ───── */

interface AreaNote {
  question: string;
  why: string;
  caseSlug: string;
  caseLine: string;
}

export const AREA_NOTES: Record<string, AreaNote> = {
  marketing: {
    question: "If you stopped all paid spend for 30 days, how much revenue would actually disappear?",
    why: "Most founders can't answer this, which means they are paying for revenue they would have had anyway. The number is usually smaller than the fear.",
    caseSlug: "case-study-ev-launch",
    caseLine: "5,000 EV bookings in four days, and the launch plan that made spend accountable.",
  },
  "revenue optimisation": {
    question: "Which 20% of your customers produce 80% of your margin, and what do you do differently for them?",
    why: "Revenue hides inside the mix. The fastest growth I have seen came from serving the profitable customers better, not from finding new ones.",
    caseSlug: "case-study-lushful",
    caseLine: "A D2C brand from zero to ₹2.5 Cr ARR, built on unit economics first.",
  },
  "sales optimisation": {
    question: "What happens to a lead in the first 10 minutes after it arrives?",
    why: "Speed and follow-up discipline beat clever pitches. Fix the first ten minutes and the close rate moves before anything else does.",
    caseSlug: "case-study-assure-clinic",
    caseLine: "How a ₹100 Cr dermatology brand turned enquiries into booked chairs.",
  },
  finance: {
    question: "How many days of cash do you have if nothing new comes in from today?",
    why: "Not revenue, not profit. Days of cash. Every hard decision becomes clearer once you know the real number, and it's rarely what the founder thinks.",
    caseSlug: "case-study-lushful",
    caseLine: "Building a brand that funded its own growth instead of borrowing it.",
  },
  hr: {
    question: "Who on your team would you re-hire tomorrow without hesitation, and who would you not?",
    why: "The honest answer tells you where your real problem is. It is almost never a hiring problem; it is a decision the founder is postponing.",
    caseSlug: "case-study-fortune-500-conglomerate",
    caseLine: "Changing how a large organisation worked without changing who worked there.",
  },
  technology: {
    question: "What would break first if your customers doubled next quarter?",
    why: "Technology decisions should be made against a growth number, not a wish list. Name the bottleneck and the roadmap writes itself.",
    caseSlug: "case-study-fortune-500-conglomerate",
    caseLine: "Transforming the digital experience of a Fortune 500 conglomerate.",
  },
  "operational efficiency": {
    question: "Where does work wait? Not where it's slow, where it sits.",
    why: "Queues, approvals, hand-offs. The waiting is almost always bigger than the working, and it is free to remove.",
    caseSlug: "case-study-assure-clinic",
    caseLine: "Operations that let a clinic chain grow without the chaos.",
  },
  "logistics & supply chain": {
    question: "What is your true landed cost per unit, including the returns you don't count?",
    why: "The margin you think you have and the margin you have are separated by freight, breakage and returns. Measure them once and the decisions change.",
    caseSlug: "case-study-lushful",
    caseLine: "A D2C brand that learned its real unit economics early.",
  },
};

const GENERIC: AreaNote = {
  question: "What is the one decision that, made well, would make the next three easier?",
  why: "Founders carry ten open decisions at once. Usually one of them is upstream of the rest. Find it, and the pressure drops everywhere.",
  caseSlug: "case-study-lushful",
  caseLine: "A D2C brand from zero to ₹2.5 Cr ARR, one decision at a time.",
};

export function areaNote(area: string | null): AreaNote {
  if (!area) return GENERIC;
  return AREA_NOTES[area.toLowerCase()] ?? GENERIC;
}

/* ── Helpers for bodies ────────────────────────────────────────────────── */

const p = (t: string) => `<p style="font-size:16px;line-height:1.75;margin:0 0 16px">${t}</p>`;
const btn = (href: string, label: string) =>
  `<p style="margin:22px 0"><a href="${href}" style="display:inline-block;background:#0B1A2E;color:#fff;text-decoration:none;font-size:13px;letter-spacing:.06em;padding:13px 22px;border-radius:2px">${label} &rarr;</a></p>`;
const quiet = (t: string) => `<p style="font-size:14px;line-height:1.7;color:#4C6B8A;margin:0 0 16px">${t}</p>`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ── Sequences ─────────────────────────────────────────────────────────── */

const LEAD: Step[] = [
  {
    day: 2,
    subject: (v) => (v.area ? `${v.first}, one question about ${v.areaLower}` : `${v.first}, one question before we talk`),
    body: (v) => {
      const n = areaNote(v.area);
      return (
        p(`While your request is in my queue, here is the first question I will ask you when we speak. It is worth sitting with before then.`) +
        `<blockquote style="margin:20px 0;padding:16px 20px;border-left:2px solid #CDB27A;background:#fff;font-family:'Instrument Serif',Georgia,serif;font-size:20px;line-height:1.4">${esc(n.question)}</blockquote>` +
        p(esc(n.why)) +
        p(`If you have a number, or even a guess, reply with it. It will make our first conversation twice as useful.`)
      );
    },
  },
  {
    day: 6,
    subject: (v) => `${v.first}, what it looked like for another founder`,
    body: (v) => {
      const n = areaNote(v.area);
      return (
        p(`You may be wondering what working together actually looks like. The honest answer is: a few sharp decisions, made properly, and then the discipline to see them through.`) +
        p(`This case is the closest to your situation${v.area ? ` in ${esc(v.areaLower!)}` : ""}:`) +
        `<div style="margin:18px 0;padding:18px 20px;background:#fff;border:1px solid rgba(11,26,46,.1);border-top:3px solid #CDB27A"><div style="font-family:'Instrument Serif',Georgia,serif;font-size:20px;line-height:1.3;margin-bottom:8px">${esc(n.caseLine)}</div><a href="${v.hubUrl}/${n.caseSlug}" style="font-size:13px;letter-spacing:.06em;color:#0B1A2E">Read the case &rarr;</a></div>` +
        p(`Read the part about what we would do differently. That is where the useful lessons are.`)
      );
    },
  },
  {
    day: 12,
    subject: (v) => `${v.first}, did the decision get made?`,
    body: (v) =>
      p(`A quiet check-in. When you wrote to me${v.ctx.decision ? `, this was the decision on your desk:` : "."}`) +
      (v.ctx.decision
        ? `<blockquote style="margin:16px 0 20px;padding:14px 18px;border-left:2px solid #CDB27A;background:#fff;font-style:italic;font-size:15px;line-height:1.7">${esc(v.ctx.decision.slice(0, 360))}${v.ctx.decision.length > 360 ? "…" : ""}</blockquote>`
        : "") +
      p(`Three things can have happened since: you made it, you parked it, or it got heavier. Any of the three is a good reason to talk. Reply with one line and tell me which.`) +
      btn(v.bookUrl, "Pick up the conversation") +
      quiet(`If it's resolved and you don't need me, reply &ldquo;sorted&rdquo; and I'll close the loop with a congratulations.`),
  },
  {
    day: 24,
    subject: (v) => `${v.first}, the 7 questions I ask before a first call`,
    body: (v) =>
      p(`One last thing from me unprompted. These are the seven questions I ask every founder before we work together. Most people find that answering them honestly, on paper, settles half the decision by itself.`) +
      btn(v.checklistUrl, "Read the seven questions") +
      p(`Keep it. Use it on your own, with your co-founder, or with me. The door stays open, and the weekly letter keeps coming if you want it.`),
  },
];

const MAGNET: Step[] = [
  {
    day: 0,
    subject: (v) => `${v.first}, the 7 questions`,
    body: (v) =>
      p(`Here are the seven questions I ask every founder before a first call. Answer them in writing, honestly, before you look for anyone's advice, including mine.`) +
      btn(v.checklistUrl, "Open the seven questions") +
      p(`It prints cleanly to one page. Put it somewhere you will see it on a bad week.`),
  },
  {
    day: 3,
    subject: (v) => `${v.first}, the question most founders skip`,
    body: (v) =>
      p(`Of the seven, number four is the one most founders skip: <i>how many days of cash do you have if nothing new comes in from today?</i>`) +
      p(`Not revenue. Not profit. Days. The founders I have watched make calm decisions under pressure all knew this number cold. Reply with yours if you like; I read every reply.`) +
      quiet(`Here is a case where knowing the number early changed everything: <a href="${v.hubUrl}/case-study-lushful" style="color:#0B1A2E">a D2C brand from zero to ₹2.5 Cr ARR</a>.`),
  },
  {
    day: 8,
    subject: (v) => `${v.first}, where founders get stuck`,
    body: (v) =>
      p(`After seventeen years with businesses from one-person shops to Fortune 500 teams, the pattern is boringly consistent: founders rarely get stuck for lack of ideas. They get stuck on one decision they keep postponing.`) +
      p(`If your answers to the seven questions pointed at one such decision, that is the one worth an hour with someone outside the business.`) +
      btn(v.bookUrl, "Book a consultation") +
      quiet(`Or just browse the <a href="${v.hubUrl}" style="color:#0B1A2E">Knowledge Hub</a>. Everything there is free and written from the field.`),
  },
  {
    day: 16,
    subject: (v) => `${v.first}, an honest offer`,
    body: (v) =>
      p(`You downloaded the seven questions a couple of weeks ago. If they did their job, you now know which decision is in the way.`) +
      p(`Tell me what it is in two or three lines. I take on few clients and I reply honestly to every note, including when the right answer is &ldquo;you don't need me for this.&rdquo;`) +
      btn(v.bookUrl, "Tell me the decision"),
  },
];

const ARTICLE: Step[] = [
  {
    day: 3,
    subject: (v) => `${v.first}, one more that pairs with it`,
    body: (v) =>
      p(`You asked me to send ${v.ctx.articleTitle ? `<i>${esc(v.ctx.articleTitle)}</i>` : "an article"} a few days ago. If it was useful, this pairs with it: the seven questions I ask every founder before a first call.`) +
      btn(v.checklistUrl, "Read the seven questions"),
  },
  {
    day: 9,
    subject: (v) => `${v.first}, the case founders ask about most`,
    body: (v) =>
      p(`The piece I get the most replies about is this one: <a href="${v.hubUrl}/case-study-lushful" style="color:#0B1A2E">building a D2C brand from zero to ₹2.5 Cr ARR</a>. Not because of the number, but because of the mistakes we kept.`) +
      p(`If any of it sounds like your week, I'm one email away.`) +
      btn(v.bookUrl, "Book a consultation"),
  },
];

const SUBSCRIBER: Step[] = [
  {
    day: 2,
    subject: (v) => `${v.first}, start here`,
    body: (v) =>
      p(`Welcome to the letter. Before the next one lands, here is the most useful thing I can give a new reader: the seven questions I ask every founder before a first call.`) +
      btn(v.checklistUrl, "Read the seven questions"),
  },
  {
    day: 10,
    subject: (v) => `${v.first}, if you ever want a second pair of eyes`,
    body: (v) =>
      p(`Most readers never need more than the letter, and that is fine. A few are carrying one decision that deserves an outside view. If that is you, this is how a consultation works, and how to book one.`) +
      btn(v.bookUrl, "See how a consultation works"),
  },
];

export const SEQUENCES: Record<Segment, Step[]> = {
  lead: LEAD,
  magnet: MAGNET,
  article: ARTICLE,
  subscriber: SUBSCRIBER,
};
