import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { env, serverEnv } from "@/lib/env";
import { ARTICLES, type ArticleBlock } from "@/lib/data/articles";
import { TESTIMONIALS } from "@/lib/data/site";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * One-time CMS seeding: fills Sanity with the website's current content so
 * the Studio starts full, not empty — categories, the five business quotes,
 * the "Site copy" document and every article, blog posts and case studies
 * alike, with their images uploaded as Sanity assets.
 *
 * Safe to call repeatedly: documents are created only if they do not exist,
 * so edits made in the Studio are never overwritten. Requires
 * SANITY_API_TOKEN with Editor permissions. Open /api/cms-seed?run=1.
 */

const CATEGORIES = ["Business", "Startup", "Marketing", "Society", "Politics", "Spirituality"];

const QUOTES: [string, string][] = [
  ["I don’t advise from a textbook.", "I advise from the other side of the table."],
  ["Revenue is opinion.", "Cash in the bank is fact."],
  ["A business that needs you every day", "is a job you can’t quit."],
  ["Discounts buy customers.", "Margins keep companies."],
  ["Plans don’t survive contact with customers.", "Systems do."],
];

interface SeedSection {
  key: string;
  page: string;
  sectionTitle: string;
  label?: string;
  heading?: string;
  body?: string;
  items?: { title?: string; value?: string; text?: string }[];
}

/** Every editable section, pre-filled with the site's current content. */
const SECTIONS: SeedSection[] = [
  {
    key: "home-hero",
    page: "Home",
    sectionTitle: "Hero",
    heading: "Build a Business That *Outlasts You.*",
    body: "I work with founders on the decisions that shape their businesses, from finding product-market fit to pricing, profitability and scaling. The goal is simple: build a business that grows with purpose and stands on its own.",
  },
  {
    key: "home-about",
    page: "Home",
    sectionTitle: "About intro",
    label: "Serial entrepreneur. Three times from zero, and counting.",
    heading: "I don’t study businesses. *I run them.*",
    body: "I run three businesses today, after seventeen plus years inside global agencies managing over ₹1,200 Cr in budgets for some of India’s biggest brands. I’ve had the salary and left it to start from zero, worried about payroll and fixed things at midnight. That’s what makes my advice different: I advise businesses the way I run my own, on systems, margins and honest execution.",
  },
  {
    key: "home-testimonials",
    page: "Home",
    sectionTitle: "Testimonials",
    items: TESTIMONIALS.map((t) => ({ title: t.name, value: t.role, text: t.quote })),
  },
  {
    key: "home-close",
    page: "Home",
    sectionTitle: "Closing CTA",
    label: "Your next step",
    heading: "Ready to build *your next chapter?*",
    body: "Bring a proven operating playbook into your business, or get clarity on your next decision.",
  },
  {
    key: "about-hero",
    page: "About",
    sectionTitle: "Hero",
    label: "About me",
    heading: "Hi, I’m Anjan. *Let me tell you how I got here.*",
    body: "I’ll be honest: I never planned to become an entrepreneur. I was the guy with the steady corporate job, the good title and the monthly salary that showed up on time.\n\nThen one day I walked away from all of it to build something of my own. Some days I still wonder how I had the nerve. But everything I know about business, I learned after that day.",
  },
  {
    key: "about-beliefs",
    page: "About",
    sectionTitle: "What I believe",
    items: [
      { title: "Profit is the plan.", text: "I spent years spending other people's crores. Spending my own taught me: growth multiplies whatever you have, including losses." },
      { title: "Say no more often.", text: "Every business I've run grew fastest after I stopped doing something. The second product, the fourth channel, the client who drains the team." },
      { title: "Systems over heroics.", text: "If the business needs me at 11pm, I haven't built a business yet. I build so the week runs without me, then I work on what's next." },
      { title: "Skin in the game.", text: "I only advise on what I've run, broken and fixed with my own money. Advice is cheap when the adviser has nothing to lose." },
    ],
  },
  { key: "home-trust", page: "Home", sectionTitle: "Trust wall", label: "Trusted over seventeen years", heading: "The brands built, *advised, and led.*" },
  { key: "home-cases", page: "Home", sectionTitle: "Case studies row", label: "Case studies", heading: "Work that moved *the numbers.*" },
  {
    key: "home-record",
    page: "Home",
    sectionTitle: "Record band",
    label: "Trust & Experience",
    heading: "A record measured *in outcomes.*",
    body: "Seventeen plus years across global agencies, enterprise growth teams and my own ventures. These are the numbers I'm proudest of.",
  },
  { key: "home-life", page: "Home", sectionTitle: "Off the clock", label: "Off the clock", heading: "Life beyond *the boardroom.*" },
  { key: "home-wheel", page: "Home", sectionTitle: "360 holistic", label: "360° business consulting", heading: "One advisor who sees *the whole business.*" },
  {
    key: "home-knowledge",
    page: "Home",
    sectionTitle: "Knowledge teaser",
    label: "Knowledge Hub",
    heading: "Playbooks & *field notes.*",
    body: "How profitable businesses are actually built, written to be used, not skimmed.",
  },
  { key: "about-story", page: "About", sectionTitle: "My story", label: "My story", heading: "The long version, *over a cup of coffee.*" },
  { key: "about-work", page: "About", sectionTitle: "How I work", label: "How I work" },
  {
    key: "advisory-who",
    page: "Business Advisory",
    sectionTitle: "Who it's for",
    label: "Who it's for",
    heading: "Founders at *a turning point.*",
    items: [
      { title: "Growth has stalled", text: "You're working harder than ever and the numbers aren't moving. I've hit that ceiling in my own companies, more than once." },
      { title: "A big bet is coming", text: "A new product, city or channel, and real money going in. One prepared conversation before you commit is the cheapest insurance there is." },
      { title: "Profit isn't keeping up", text: "Revenue grows, but the margin or the cash doesn't. I've lived that month, worrying about salaries while the P&L looked fine." },
    ],
  },
  {
    key: "advisory-proof",
    page: "Business Advisory",
    sectionTitle: "Why founders listen",
    label: "Why founders listen",
    heading: "Advice that's been *paid for already.*",
    items: [
      { title: "Across agencies and brands", value: "17+ years", text: "I kept seeing the same gaps repeat: fragmented teams, disconnected channels and growth trapped in silos. It's why I advise on the whole business, not one department." },
      { title: "Running today", value: "3 businesses", text: "A tech company, a food brand and a compliance business, each built from zero. My advice is tested on my own money first." },
      { title: "In media and performance marketing", value: "₹1,200 Cr+", text: "Managed for some of India's biggest brands. I know what good execution costs, and what you should never pay for." },
    ],
  },
  { key: "advisory-help", page: "Business Advisory", sectionTitle: "How I help", label: "How I help", heading: "Whatever you *call it.*" },
  { key: "advisory-steps", page: "Business Advisory", sectionTitle: "How it works", label: "How it works", heading: "Simple, and *personal.*" },
  { key: "mentorship-long-game", page: "Mentorship", sectionTitle: "Not another program", label: "Not another program", heading: "This is the *long game.*" },
  {
    key: "mentorship-differs",
    page: "Mentorship",
    sectionTitle: "How it differs",
    label: "How it differs",
    heading: "Advisory solves. *Mentorship builds.*",
    items: [
      { title: "Advisory solves a decision", text: "You bring a specific problem, we work it through, and you leave with a clear next step. It can be one session or a few." },
      { title: "Mentorship builds a founder", text: "No single problem to solve. We work on you and the business together, over months and years, through whatever comes." },
      { title: "Sometimes, with equity", text: "For a few startups I believe in deeply, I take part of my commitment in equity. Skin in the game, both ways." },
    ],
  },
  { key: "mentorship-rhythm", page: "Mentorship", sectionTitle: "The rhythm", label: "The rhythm", heading: "What a year together *looks like.*" },
  { key: "speaking-why", page: "Speaker", sectionTitle: "Why hosts invite him", label: "Why hosts invite him", heading: "Stories are cheap. *Numbers aren't.*" },
  {
    key: "speaking-talks",
    page: "Speaker",
    sectionTitle: "What he talks about",
    label: "What he talks about",
    heading: "Three conversations *worth having.*",
    items: [
      { title: "The numbers nobody shows you", text: "What a P&L hides, why profitable businesses run out of cash, and the months he worried about payroll while the books looked fine." },
      { title: "Leaving the salary", text: "The honest version of 0 to 1: what he kept from Accenture and the agency years, what he had to unlearn, and what the first year really costs." },
      { title: "Marketing from both chairs", text: "He managed over ₹1,200 Cr in budgets on the agency side, then spent his own money as a founder. What changes when it's your rupee." },
    ],
  },
  { key: "speaking-rooms", page: "Speaker", sectionTitle: "Where this lands", label: "Where this lands", heading: "Rooms he's *at home in.*" },
  {
    key: "advisory-hero",
    page: "Business Advisory",
    sectionTitle: "Hero",
    label: "Programs · Business Advisory",
    heading: "Clear decisions for founders *who are building for the long run.*",
    body: "I run three businesses today and spent seventeen plus years inside global agencies before that. Founders bring me the decision in front of them: one focused consultation when that's all it takes, ongoing advisory when you want me at the table as you build. Either way it starts with you telling me where the business is.",
  },
  {
    key: "mentorship-hero",
    page: "Mentorship",
    sectionTitle: "Hero",
    label: "Programs · Mentorship",
    heading: "A seat at your table, *for the whole journey.*",
    body: "I mentor a small number of early-stage founders the way I wish someone had mentored me: long-term, hands-on and honest, sometimes with equity, always with skin in the game.",
  },
  {
    key: "speaking-hero",
    page: "Speaker",
    sectionTitle: "Hero",
    label: "Speaker",
    heading: "Ask him anything. *He has run the numbers.*",
    body: "Anjan runs three businesses today and spent seventeen plus years before that inside global agencies, spending budgets for some of the biggest brands in the country. On a stage or a mic he does one thing: say plainly what building a business is actually like, with the numbers to back it.",
  },
  {
    key: "contact-hero",
    page: "Contact",
    sectionTitle: "Hero",
    label: "Contact",
    heading: "Let’s *talk.*",
    body: "For advisory, use the application. For everything else, speaking, collaborations, press or just a hello, write to me here.",
  },
];

let keyN = 0;
const key = () => `seed${(keyN++).toString(36)}${Date.now().toString(36)}`;

function textBlock(style: string, text: string) {
  return { _type: "block", _key: key(), style, markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] };
}

function listItem(text: string) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

export async function GET(req: Request) {
  const run = new URL(req.url).searchParams.get("run") === "1";
  if (!env.sanity.projectId) {
    return NextResponse.json({ ok: false, error: "NEXT_PUBLIC_SANITY_PROJECT_ID is not set." }, { status: 400 });
  }
  if (!serverEnv.sanityApiToken) {
    return NextResponse.json(
      { ok: false, error: "SANITY_API_TOKEN is not set. Create a token with Editor permissions in sanity.io/manage and add it in Vercel." },
      { status: 400 }
    );
  }
  if (!run) {
    return NextResponse.json({ ok: true, hint: "Add ?run=1 to seed the CMS with the site's current content. Existing documents are never overwritten." });
  }

  const client = createClient({
    projectId: env.sanity.projectId,
    dataset: env.sanity.dataset,
    apiVersion: env.sanity.apiVersion,
    token: serverEnv.sanityApiToken,
    useCdn: false,
  });

  const created: string[] = [];
  const skipped: string[] = [];
  const failed: string[] = [];
  const assetByPath = new Map<string, string>();

  async function uploadImage(path: string): Promise<string | null> {
    if (assetByPath.has(path)) return assetByPath.get(path)!;
    try {
      const res = await fetch(`${env.siteUrl}${path}`);
      if (!res.ok) return null;
      const buf = Buffer.from(await res.arrayBuffer());
      const asset = await client.assets.upload("image", buf, { filename: path.split("/").pop() });
      assetByPath.set(path, asset._id);
      return asset._id;
    } catch {
      return null;
    }
  }

  async function createIfMissing(doc: { _id: string; _type: string } & Record<string, unknown>) {
    try {
      const existing = await client.getDocument(doc._id);
      if (existing) {
        skipped.push(doc._id);
        return;
      }
      await client.createIfNotExists(doc);
      created.push(doc._id);
    } catch (err) {
      failed.push(`${doc._id}: ${(err as Error).message}`);
    }
  }

  for (const c of CATEGORIES) {
    await createIfMissing({ _id: `category-${c.toLowerCase()}`, _type: "category", title: c });
  }

  for (let i = 0; i < QUOTES.length; i++) {
    await createIfMissing({ _id: `quote-seed-${i + 1}`, _type: "quote", lead: QUOTES[i][0], emphasis: QUOTES[i][1], order: i + 1 });
  }

  for (const s of SECTIONS) {
    await createIfMissing({
      _id: `sec-${s.key}`,
      _type: "pageSection",
      key: s.key,
      page: s.page,
      sectionTitle: s.sectionTitle,
      label: s.label,
      heading: s.heading,
      body: s.body,
      items: s.items?.map((it) => ({ _key: key(), ...it })),
    });
  }

  // Every article: blog posts and case studies.
  for (const a of ARTICLES.filter((x) => x.body?.length)) {
    const id = `blogpost-${a.slug}`;
    const existing = await client.getDocument(id).catch(() => null);
    if (existing) {
      skipped.push(id);
      continue;
    }

    const body: unknown[] = [];
    for (const b of a.body as ArticleBlock[]) {
      switch (b.type) {
        case "lead":
        case "p":
          body.push(textBlock("normal", b.text ?? ""));
          break;
        case "h2":
          body.push(textBlock("h2", b.text ?? ""));
          break;
        case "quote":
          body.push(textBlock("blockquote", [b.strong, b.text].filter(Boolean).join(" ")));
          break;
        case "ul":
          for (const it of b.items ?? []) body.push(listItem(it));
          break;
        case "img": {
          const assetId = b.src ? await uploadImage(b.src) : null;
          if (assetId) body.push({ _type: "image", _key: key(), asset: { _type: "reference", _ref: assetId }, alt: b.alt ?? "" });
          break;
        }
        case "imgs": {
          for (const im of b.images ?? []) {
            const assetId = await uploadImage(im.src);
            if (assetId) body.push({ _type: "image", _key: key(), asset: { _type: "reference", _ref: assetId }, alt: im.alt ?? "" });
          }
          break;
        }
        default:
          break;
      }
    }

    const bannerAsset = await uploadImage(a.image);
    const cardAsset = a.cardImage ? await uploadImage(a.cardImage) : null;
    const cs = a.caseStudy;
    const logoAsset = cs?.logo ? await uploadImage(cs.logo) : null;

    await createIfMissing({
      _id: id,
      _type: "blogPost",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      ...(CATEGORIES.includes(a.category) ? { category: { _type: "reference", _ref: `category-${a.category.toLowerCase()}` } } : {}),
      publishedAt: a.publishedAt,
      readTime: parseInt(a.readTime, 10) || 5,
      excerpt: a.excerpt,
      kicker: a.kicker,
      bannerTitle: a.bannerTitle,
      sources: a.sources,
      ...(bannerAsset ? { featuredImage: { _type: "image", asset: { _type: "reference", _ref: bannerAsset } } } : {}),
      ...(cardAsset ? { cardImage: { _type: "image", asset: { _type: "reference", _ref: cardAsset } } } : {}),
      ...(cs
        ? {
            caseStudy: {
              _type: "caseStudy",
              sector: cs.sector,
              client: cs.client,
              summary: cs.summary,
              metrics: cs.metrics.map(([value, label]) => ({ _key: key(), value, label })),
              tags: cs.tags,
              ...(cs.quote ? { quoteText: cs.quote[0], quoteBy: cs.quote[1] } : {}),
              ...(logoAsset ? { logo: { _type: "image", asset: { _type: "reference", _ref: logoAsset } } } : {}),
            },
          }
        : {}),
      body,
    });
  }

  return NextResponse.json({ ok: failed.length === 0, created, skipped, failed });
}
