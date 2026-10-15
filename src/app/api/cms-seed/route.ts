import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { env, serverEnv } from "@/lib/env";
import { ARTICLES, type ArticleBlock } from "@/lib/data/articles";

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

const SITE_COPY = {
  _id: "siteCopy",
  _type: "siteCopy",
  title: "Site copy",
  heroTitle: "Build a Business That *Outlasts You.*",
  heroSubheadline:
    "I work with founders on the decisions that shape their businesses, from finding product-market fit to pricing, profitability and scaling. The goal is simple: build a business that grows with purpose and stands on its own.",
  aboutLabel: "Serial entrepreneur. Three times from zero, and counting.",
  aboutHeading: "I don’t study businesses. *I run them.*",
  aboutBody:
    "I run three businesses today, after seventeen plus years inside global agencies managing over ₹1,200 Cr in budgets for some of India’s biggest brands. I’ve had the salary and left it to start from zero, worried about payroll and fixed things at midnight. That’s what makes my advice different: I advise businesses the way I run my own, on systems, margins and honest execution.",
};

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

  await createIfMissing(SITE_COPY);

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
