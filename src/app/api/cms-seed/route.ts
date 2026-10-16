import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { env, serverEnv } from "@/lib/env";
import { ARTICLES, type ArticleBlock } from "@/lib/data/articles";
import { TESTIMONIALS, JOURNEY, LIFE_PHOTOS } from "@/lib/data/site";
import { AREAS } from "@/lib/data/areas";
import { VENTURES, COMPANIES_ADVISED, CAREER, FACULTY, logoSrc } from "@/lib/data/brands";

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
  /** Local image to upload into the section (hero portraits etc.). */
  imagePath?: string;
  page: string;
  sectionTitle: string;
  label?: string;
  heading?: string;
  body?: string;
  items?: { title?: string; value?: string; text?: string; imagePath?: string }[];
}

/** Every editable section, pre-filled with the site's current content. */
const SECTIONS: SeedSection[] = [
  {
    key: "home-hero",
    page: "Home",
    sectionTitle: "Hero",
    imagePath: "/images/hero-anjan.webp",
    heading: "Build a Business That *Outlasts You.*",
    body: "I work with founders on the decisions that shape their businesses, from finding product-market fit to pricing, profitability and scaling. The goal is simple: build a business that grows with purpose and stands on its own.",
  },
  {
    key: "home-about",
    page: "Home",
    sectionTitle: "About intro",
    imagePath: "/images/portrait-anjan.jpg",
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
    imagePath: "/images/portrait-anjan-2.jpg",
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
  {
    key: "home-trust",
    page: "Home",
    sectionTitle: "Trust wall",
    label: "Trusted over seventeen years",
    heading: "The brands built, *advised, and led.*",
    items: [
      { title: "Companies advised", value: "21 brands" },
      { title: "Where I learned and mentored", value: "Career · Startups" },
      { title: "Where I taught", value: "Visiting faculty" },
    ],
  },
  {
    key: "home-cases",
    page: "Home",
    sectionTitle: "Case studies row",
    label: "Case studies",
    heading: "Work that moved *the numbers.*",
    body: "Want results like these in your business?",
  },
  {
    key: "home-record",
    page: "Home",
    sectionTitle: "Record band",
    label: "Trust & Experience",
    heading: "A record measured *in outcomes.*",
    body: "Seventeen plus years across global agencies, enterprise growth teams and my own ventures. These are the numbers I'm proudest of.",
    items: [
      { title: "Years of experience", value: "17+" },
      { title: "Businesses guided", value: "250+" },
      { title: "Brands worked with", value: "100+" },
      { title: "Ventures built", value: "4" },
      { title: "Companies advised", value: "Fortune 500" },
      { title: "Institutions and universities", value: "3+" },
    ],
  },
  {
    key: "home-journey",
    page: "Home",
    sectionTitle: "My journey",
    items: JOURNEY.map((j) => ({ title: j.title, value: j.when, text: j.text })),
  },
  {
    key: "home-life",
    page: "Home",
    sectionTitle: "Off the clock",
    label: "Off the clock",
    heading: "Life beyond *the boardroom.*",
    body: "Most of my best decisions weren’t made in meetings. They came on quiet mornings, long drives and slow weekends.",
    items: LIFE_PHOTOS.map((p) => ({ title: p.tag, text: p.caption, imagePath: p.src })),
  },
  { key: "home-wheel", page: "Home", sectionTitle: "360 holistic", label: "360° business consulting", heading: "One advisor who sees *the whole business.*" },
  {
    key: "home-knowledge",
    page: "Home",
    sectionTitle: "Knowledge teaser",
    label: "Knowledge Hub",
    heading: "Playbooks & *field notes.*",
    body: "How profitable businesses are actually built, written to be used, not skimmed.",
  },
  {
    key: "about-story",
    page: "About",
    sectionTitle: "My story",
    label: "My story",
    heading: "The long version, *over a cup of coffee.*",
    body: [
      "My first real job was at Accenture. After that I spent years in advertising, at Mindshare and IPG Mediabrands, working on brands you’d find in almost every Indian home. I loved it. I also slowly realised I was helping other people build their businesses, and never building my own.",
      "At Zeta Global and Fareportal I got closer to the numbers. That’s where I understood something nobody teaches you in a classroom: a business isn’t the idea or the logo. It’s whether people pay you, again and again, at a price that leaves something over.",
      "So I left. I started Noboru World with more confidence than clarity. I made almost every mistake you can make. I hired too fast, priced too low, said yes to the wrong clients and worried about payroll more nights than I’d like to admit. Slowly, we figured it out. Across the businesses I’ve built and grown since, we’ve generated more than ₹120 crore in revenue, and I remember what every rupee of it cost. Then came Lushful, working directly with farmers, and Filing Buddy, where I’m CEO today.",
      "“I’m not writing this as someone who got it right the first time. I’m writing it as someone who got it wrong, and kept going.”",
      "These days I also teach at IIFT and IMT Ghaziabad, and I spend a good part of my week with founders. Some are running a business that has stopped growing. Some haven’t started yet and just want someone to think it through with them.",
      "I work with them as a mentor, an advisor and sometimes just a sounding board. I don’t have a framework to sell you. I have seventeen plus years of doing this for real, and I’m happy to share all of it.",
    ].join("\n\n"),
  },
  {
    key: "about-proof",
    page: "About",
    sectionTitle: "Built, advised, taught",
    items: [
      { value: "Built", title: "Noboru World · Lushful · Filing Buddy", text: "Businesses I founded, co-founded and lead today." },
      { value: "Advised", title: "Fortune 500 companies and 100+ brands", text: "Including American Express, Sony, Google, PwC, Dabur, Tata Housing and Aditya Birla Capital." },
      { value: "Taught", title: "IIFT · IMT Ghaziabad · BML Munjal", text: "Visiting faculty, sharing real operating lessons with the next generation of leaders." },
    ],
  },
  {
    key: "about-cred",
    page: "About",
    sectionTitle: "Credentials strip",
    items: [
      { title: "Years building and advising", value: "16+" },
      { title: "Revenue generated", value: "₹120 Cr+" },
      { title: "Brands worked with", value: "100+" },
      { title: "Businesses guided", value: "250+" },
    ],
  },
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
  {
    key: "advisory-help",
    page: "Business Advisory",
    sectionTitle: "How I help",
    label: "How I help",
    heading: "Whatever you *call it.*",
    body: [
      "**Business consultant**, **business advisor**, **business mentor**: founders have called me all three. The title never changes what happens in the room. You bring the decision that’s costing you sleep, and we settle it.",
      "One month that looks like a growth consultant fixing a leaking funnel. Another, it’s a fractional CMO building your marketing engine, or a GTM strategist taking a product to its first hundred customers. The label follows the problem, never the other way around.",
      "And for a few early startups I believe in, it goes deeper: a long-term seat at the table. That is the mentorship program.",
    ].join("\n\n"),
  },
  {
    key: "advisory-impact",
    page: "Business Advisory",
    sectionTitle: "Business impact",
    label: "Business impact",
    heading: "Results you can *measure.*",
    items: [
      { value: "₹1,200 Cr+", title: "Budgets managed", text: "Across media and performance marketing for some of India's biggest brands, before spending my own." },
      { value: "250+", title: "Businesses guided", text: "From first-customer startups to Fortune 500 teams, across tech, food, compliance and retail." },
      { value: "₹120 Cr+", title: "Revenue generated", text: "Across the businesses I've built and grown myself. I remember what every rupee of it cost." },
    ],
  },
  {
    key: "advisory-steps",
    page: "Business Advisory",
    sectionTitle: "How it works",
    label: "How it works",
    heading: "Simple, and *personal.*",
    items: [
      { title: "You request a session", text: "A short form about your business and the decision in front of you. Ten minutes, no deck needed." },
      { title: "I read it myself", text: "Every request, no team in between. I reply within five working days." },
      { title: "We talk", text: "A focused one-to-one session on the real problem. If I'm not the right person for it, I'll tell you that on the call." },
      { title: "You leave with a next step", text: "A written, specific one. One session is often enough; if you want me at the table longer, we agree how." },
    ],
  },
  {
    key: "mentorship-long-game",
    page: "Mentorship",
    sectionTitle: "Not another program",
    label: "Not another program",
    heading: "This is the *long game.*",
    body: [
      "Advisory answers a question. Mentorship walks the road. I take very few mentees at a time, because this only works when I know your business almost as well as you do.",
      "It’s for founders near the start: an idea taking shape, or a young startup finding its first customers. You don’t need a polished deck. You need to be all in, and honest about where you are.",
      "Running an established business with one decision in front of you? Advisory is the faster door.",
    ].join("\n\n"),
  },
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
  {
    key: "mentorship-rhythm",
    page: "Mentorship",
    sectionTitle: "The rhythm",
    label: "The rhythm",
    heading: "What a year together *looks like.*",
    items: [
      { title: "A monthly deep dive", text: "One long working session a month: the numbers, the team, the one thing that matters most right now." },
      { title: "A message away", text: "Between sessions you don't wait for a slot. A vendor quote, a hire, a pricing call: send it, I answer." },
      { title: "Quarterly honesty", text: "Every quarter we stop and compare the business to where we said it would be. No stories, just the numbers." },
      { title: "Doors, not just advice", text: "My network becomes yours: agencies, vendors, lawyers, operators and the people I'd call for my own companies." },
    ],
  },
  {
    key: "speaking-why",
    page: "Speaker",
    sectionTitle: "Why hosts invite him",
    label: "Why hosts invite him",
    heading: "Stories are cheap. *Numbers aren't.*",
    body: [
      "Most business talks are either theory from people who never operated, or motivation with nothing underneath. Anjan sits in the rare third seat: still operating, and willing to show the working.",
      "He has been the agency selling the campaign and the founder paying for it, the consultant recommending the software and the buyer living with it. That both-sides view is what audiences remember, because nobody else in the room has it.",
      "No jargon, no slides for the sake of slides, and questions welcome at any point.",
    ].join("\n\n"),
  },
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
  {
    key: "speaking-rooms",
    page: "Speaker",
    sectionTitle: "Where this lands",
    label: "Where this lands",
    heading: "Rooms he's *at home in.*",
    items: [
      { title: "Podcasts", text: "Long-form and unscripted. He answers the question asked, with real numbers from his own companies, not rehearsed lines." },
      { title: "Business schools", text: "He already teaches at IIFT and IMT Ghaziabad. Case-led sessions where students work a real decision, not slideware." },
      { title: "Tech schools and universities", text: "For engineers who will build companies: revenue, pricing and customers, the chapters the curriculum skips." },
      { title: "Conferences and corporate events", text: "Keynotes and fireside chats on strategy, profitability and operating discipline, sized to the room and the hour." },
    ],
  },
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
    const sectionImage = s.imagePath ? await uploadImage(s.imagePath) : null;
    const items = s.items
      ? await Promise.all(
          s.items.map(async ({ imagePath, ...it }) => {
            const assetId = imagePath ? await uploadImage(imagePath) : null;
            return {
              _key: key(),
              ...it,
              ...(assetId ? { image: { _type: "image", asset: { _type: "reference", _ref: assetId } } } : {}),
            };
          })
        )
      : undefined;
    const fields: Record<string, unknown> = {
      label: s.label,
      heading: s.heading,
      body: s.body,
      ...(sectionImage ? { image: { _type: "image", asset: { _type: "reference", _ref: sectionImage } } } : {}),
      ...(items ? { items } : {}),
    };
    const id = `sec-${s.key}`;
    const existed = Boolean(await client.getDocument(id).catch(() => null));
    await createIfMissing({ _id: id, _type: "pageSection", key: s.key, page: s.page, sectionTitle: s.sectionTitle, ...fields });
    if (existed) {
      // Fill in fields this seed adds over time without touching anything
      // already edited in the Studio: set only what the document lacks.
      try {
        const missing = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined));
        if (Object.keys(missing).length) {
          await client.patch(id).setIfMissing(missing).commit();
        }
        // Upgrade a field the seed itself wrote earlier (and the Studio has
        // not edited since): the body text matches the old seed verbatim.
        if (s.key === "advisory-help" && typeof s.body === "string") {
          const old = s.body.replace(/\*\*/g, "");
          const doc = await client.getDocument(id);
          if (doc && doc.body === old && old !== s.body) {
            await client.patch(id).set({ body: s.body }).commit();
          }
        }
      } catch (err) {
        failed.push(`${id} (patch): ${(err as Error).message}`);
      }
    }
  }

  // SEO: one document per page plus the site-wide settings.
  const PAGE_SEO: { page: string; metaTitle: string; metaDescription: string }[] = [
    { page: "Home", metaTitle: "Anjan Prasad | Business Consultant, Business Advisor and Business Mentor", metaDescription: "Anjan Prasad is a business consultant, business advisor and business mentor who has built profitable businesses. Strategy, growth, marketing and go-to-market guidance for founders and people starting out." },
    { page: "About", metaTitle: "About", metaDescription: "Hi, I'm Anjan. From Accenture and global agencies to founding Noboru World, Lushful and Filing Buddy: the long version of how I got here." },
    { page: "Business Advisory", metaTitle: "Business Advisory", metaDescription: "Clear decisions for founders who are building for the long run. Business advisory and one-to-one consulting with Anjan Prasad, from a single session to an ongoing seat at your table." },
    { page: "Mentorship", metaTitle: "Mentorship", metaDescription: "Long-term mentorship for a small number of early-stage founders. Anjan Prasad takes a seat at your table for the journey, sometimes with equity, always with skin in the game." },
    { page: "Speaker", metaTitle: "Speaker", metaDescription: "Invite Anjan Prasad to your podcast, business school or event. Seventeen plus years of building and advising profitable businesses, told plainly, with real numbers." },
    { page: "Contact", metaTitle: "Contact", metaDescription: "For advisory, use the application. For everything else, speaking, collaborations, press or just a hello, write to Anjan here." },
  ];
  for (const ps of PAGE_SEO) {
    await createIfMissing({ _id: `seo-${ps.page.toLowerCase().replace(/\s+/g, "-")}`, _type: "pageSeo", ...ps });
  }
  await createIfMissing({
    _id: "siteSeo",
    _type: "siteSeo",
    metaTitle: "Anjan Prasad | Business Consultant, Business Advisor and Business Mentor",
    metaDescription: "Anjan Prasad is a business consultant, business advisor and business mentor who has built profitable businesses. Strategy, growth, marketing and go-to-market guidance for founders and people starting out.",
    email: "performance@noboruworld.com",
    linkedin: "https://www.linkedin.com/in/anjanprasad/",
    instagram: "https://www.instagram.com/anjanpr/",
    footerAbout: "I work with founders as a business mentor and advisor, helping them build businesses that are profitable, scalable and built to last.",
    newsletterHeading: "One operator\u2019s letter. Every week.",
    newsletterText: "Playbooks, margins, and field notes on building profitable businesses in India. No motivation, only method.",
  });

  // Case studies only; blog posts are written directly in the Studio.
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

  // The nine 360° areas.
  for (const a of AREAS) {
    await createIfMissing({
      _id: `area-${a.key}`,
      _type: "wheelArea",
      key: a.key,
      name: a.name,
      stat: a.stat,
      headline: a.headline,
      note: a.note,
      points: [...a.points],
    });
  }

  // Trust-wall brand logos, muted + colour versions uploaded as assets.
  const LOGO_GROUPS: { group: string; logos: { slug: string; name: string; role?: string }[] }[] = [
    { group: "ventures", logos: VENTURES },
    { group: "advised", logos: COMPANIES_ADVISED },
    { group: "career", logos: CAREER },
    { group: "faculty", logos: FACULTY },
  ];
  for (const g of LOGO_GROUPS) {
    for (let i = 0; i < g.logos.length; i++) {
      const l = g.logos[i];
      const id = `logo-${l.slug}`;
      const existing = await client.getDocument(id).catch(() => null);
      if (existing) {
        skipped.push(id);
        continue;
      }
      const base = await uploadImage(logoSrc(l.slug));
      if (!base) {
        failed.push(`${id}: logo image missing`);
        continue;
      }
      const colour = await uploadImage(logoSrc(l.slug, true));
      await createIfMissing({
        _id: id,
        _type: "brandLogo",
        name: l.name,
        group: g.group,
        role: (l as { role?: string }).role,
        order: i + 1,
        logo: { _type: "image", asset: { _type: "reference", _ref: base } },
        ...(colour ? { colourLogo: { _type: "image", asset: { _type: "reference", _ref: colour } } } : {}),
      });
    }
  }

  // Venture upgrades: Lushful's role changed and Filing Buddy left the
  // ventures row. Applied only to the seed's own values, never to edits.
  try {
    const lush = await client.getDocument("logo-lushful");
    if (lush && lush.role === "02 · Co-founder") {
      await client.patch("logo-lushful").set({ role: "03 · Co-founder & MD", order: 3 }).commit();
    }
    const fb = await client.getDocument("logo-filing-buddy");
    if (fb && fb.group === "ventures") {
      await client.delete("logo-filing-buddy");
    }
  } catch (err) {
    failed.push(`venture upgrades: ${(err as Error).message}`);
  }

  return NextResponse.json({ ok: failed.length === 0, created, skipped, failed });
}
