/**
 * Sanity content source for the Knowledge Hub.
 *
 * When a Sanity project is configured via env, published posts are fetched
 * live (GROQ) and merged over the local seed slate; otherwise the seed in
 * src/lib/data/articles.ts is served. Newly published posts appear
 * automatically because the query filters on `publishedAt <= now()`.
 *
 * Configure with NEXT_PUBLIC_SANITY_PROJECT_ID (+ dataset / api version).
 * See docs/sanity-cms.md for the studio schema and editor workflow.
 */
import { createClient, type SanityClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";
import { env, flags, serverEnv } from "./env";
import { ARTICLES, type Article, type ArticleCategory } from "./data/articles";
import { AREAS as AREAS_BASE } from "./data/areas";

export const REVALIDATE_SECONDS = 300;

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!flags.sanity) return null;
  if (client) return client;
  // This module only runs on the server (server components / route handlers),
  // so the optional token never reaches the browser bundle. A token is only
  // needed when the dataset is private; public datasets read without one.
  const token = serverEnv.sanityApiToken || undefined;
  client = createClient({
    projectId: env.sanity.projectId,
    dataset: env.sanity.dataset,
    apiVersion: env.sanity.apiVersion,
    useCdn: !token,
    token,
    perspective: "published",
  });
  return client;
}

export interface ArticleCmsSection {
  heading?: string;
  text?: PortableTextBlock[];
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export interface CmsArticle extends Article {
  /** Portable Text body from the CMS (rendered by <PortableText/>). */
  portableBody?: PortableTextBlock[];
  /** Pinkfly-style sections: heading + paragraphs + optional image below. */
  cmsSections?: ArticleCmsSection[];
  metaTitle?: string;
  metaDescription?: string;
}

interface RawPost {
  slug: string;
  title: string;
  category?: string;
  publishedAt?: string;
  readTime?: number;
  excerpt?: string;
  imageUrl?: string;
  cardImageUrl?: string;
  kicker?: string;
  bannerTitle?: string;
  body?: PortableTextBlock[];
  sections?: ArticleCmsSection[];
  metaTitle?: string;
  metaDescription?: string;
  sources?: string;
  caseStudy?: {
    sector?: string;
    client?: string;
    logoUrl?: string;
    summary?: string;
    metrics?: { value?: string; label?: string }[];
    tags?: string[];
    quoteText?: string;
    quoteBy?: string;
  };
}

/** Convert the CMS case-study object into the shape the site renders. */
function toCaseStudy(c: NonNullable<RawPost["caseStudy"]>, seed?: Article): Article["caseStudy"] {
  const base = seed?.caseStudy;
  const metrics = (c.metrics ?? [])
    .filter((m) => m.value && m.label)
    .map((m) => [m.value!, m.label!] as [string, string]);
  return {
    sector: c.sector ?? base?.sector ?? "",
    client: c.client ?? base?.client ?? "",
    logo: c.logoUrl ?? base?.logo,
    cardMetrics: base?.cardMetrics ?? [metrics[0] ?? ["", ""], metrics[1] ?? ["", ""]],
    summary: c.summary ?? base?.summary ?? "",
    metrics: metrics.length ? metrics : base?.metrics ?? [],
    tags: c.tags?.length ? c.tags : base?.tags ?? [],
    quote: c.quoteText ? [c.quoteText, c.quoteBy ?? ""] : base?.quote,
  };
}

const POST_QUERY = `*[_type == "blogPost" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
  "slug": slug.current, title, "category": category->title, publishedAt, readTime, excerpt,
  "imageUrl": featuredImage.asset->url, "cardImageUrl": cardImage.asset->url, kicker, bannerTitle, body, sources, metaTitle, metaDescription,
  "sections": sections[]{heading, text, "imageUrl": image.asset->url, "imageAlt": image.alt, "imageCaption": image.caption},
  "caseStudy": select(defined(caseStudy.sector) => caseStudy{sector, client, "logoUrl": logo.asset->url, summary, metrics, tags, quoteText, quoteBy}, null)
}`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function toArticle(p: RawPost, seed?: Article): CmsArticle {
  const category = (p.category ?? "Business") as ArticleCategory;
  return {
    slug: p.slug,
    title: p.title,
    category: p.caseStudy ? "Case Studies" : category,
    date: p.caseStudy?.sector ?? shortDate(p.publishedAt),
    publishedAt: p.publishedAt ?? new Date().toISOString(),
    readTime: p.readTime ? `${p.readTime} min read` : "5 min read",
    excerpt: p.excerpt ?? "",
    // While a CMS post has no uploaded images, keep the seed's visuals so
    // banners and card thumbnails never regress to the placeholder.
    image: p.imageUrl ?? seed?.image ?? "/images/life-3.jpg",
    cardImage: p.cardImageUrl ?? seed?.cardImage,
    kicker: p.kicker ?? (p.caseStudy ? "Case Studies" : category),
    bannerTitle: p.bannerTitle ?? seed?.bannerTitle,
    sources: p.sources,
    caseStudy: p.caseStudy ? toCaseStudy(p.caseStudy, seed) : undefined,
    portableBody: p.body,
    cmsSections: p.sections?.length ? p.sections : undefined,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
  };
}

/** All articles, CMS first (by slug), then the local seed. */
export async function getArticles(): Promise<CmsArticle[]> {
  const sanity = getSanityClient();
  if (!sanity) return ARTICLES;
  try {
    const raw = await sanity.fetch<RawPost[]>(POST_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } });
    const seedBySlug = new Map(ARTICLES.map((a) => [a.slug, a]));
    const cms = raw.map((p) => toArticle(p, seedBySlug.get(p.slug)));
    const seen = new Set(cms.map((a) => a.slug));
    return [...cms, ...ARTICLES.filter((a) => !seen.has(a.slug))];
  } catch (err) {
    console.warn("[sanity] fetch failed, using seed content:", (err as Error).message);
    return ARTICLES;
  }
}

export async function getArticle(slug: string): Promise<CmsArticle | undefined> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug);
}

export interface SiteQuote {
  lead: string;
  em: string;
}

/** CMS quotes for the About slideshow; null when none are published yet. */
export async function getQuotes(): Promise<SiteQuote[] | null> {
  const sanity = getSanityClient();
  if (!sanity) return null;
  try {
    const raw = await sanity.fetch<{ lead?: string; emphasis?: string }[]>(
      `*[_type == "quote"] | order(coalesce(order, 9999) asc, _createdAt asc){lead, emphasis}`,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    const quotes = raw.filter((q) => q.lead && q.emphasis).map((q) => ({ lead: q.lead!, em: q.emphasis! }));
    return quotes.length ? quotes : null;
  } catch (err) {
    console.warn("[sanity] quotes fetch failed:", (err as Error).message);
    return null;
  }
}

import type { PageSection, Sections } from "./sections";
export { splitEm, secHeading } from "./sections";
export type { SectionItem, PageSection, Sections } from "./sections";

/** All page sections keyed by their section key; {} when the CMS is off. */
export async function getSections(): Promise<Sections> {
  const sanity = getSanityClient();
  if (!sanity) return {};
  try {
    const raw = await sanity.fetch<PageSection[]>(
      `*[_type == "pageSection" && defined(key)]{key, label, heading, body, items[]{title, value, text, "imageUrl": image.asset->url, "imageAlt": image.alt}, "imageUrl": image.asset->url, "imageAlt": image.alt}`,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    return Object.fromEntries(raw.map((s) => [s.key, s]));
  } catch (err) {
    console.warn("[sanity] sections fetch failed:", (err as Error).message);
    return {};
  }
}


export interface SiteSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  footerAbout?: string;
  newsletterHeading?: string;
  newsletterText?: string;
}

/** Site settings & default SEO; {} when the CMS is off. */
export async function getSiteSeo(): Promise<SiteSeo> {
  const sanity = getSanityClient();
  if (!sanity) return {};
  try {
    const d = await sanity.fetch<SiteSeo | null>(
      `*[_type == "siteSeo"][0]{metaTitle, metaDescription, "ogImageUrl": ogImage.asset->url, email, linkedin, instagram, footerAbout, newsletterHeading, newsletterText}`,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    return d ?? {};
  } catch (err) {
    console.warn("[sanity] site seo fetch failed:", (err as Error).message);
    return {};
  }
}

export interface PageSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
}

/** A page's SEO document (by the page name used in the Studio); {} when unset. */
export async function getPageSeo(page: string): Promise<PageSeo> {
  const sanity = getSanityClient();
  if (!sanity) return {};
  try {
    const d = await sanity.fetch<PageSeo | null>(
      `*[_type == "pageSeo" && page == $page][0]{metaTitle, metaDescription, "ogImageUrl": ogImage.asset->url}`,
      { page },
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    return d ?? {};
  } catch (err) {
    console.warn("[sanity] page seo fetch failed:", (err as Error).message);
    return {};
  }
}

/** Next.js metadata for a page, CMS first, built-in fallback second. */
export async function pageMetadata(
  page: string,
  fallback: { title: string; description: string }
): Promise<{ title: string; description: string; openGraph: { title: string; description: string; images?: string[] } }> {
  const seo = await getPageSeo(page);
  const title = seo.metaTitle ?? fallback.title;
  const description = seo.metaDescription ?? fallback.description;
  return {
    title,
    description,
    openGraph: { title, description, ...(seo.ogImageUrl ? { images: [seo.ogImageUrl] } : {}) },
  };
}

export interface CmsLogo {
  name: string;
  role?: string;
  url: string;
  colourUrl?: string;
}

export type LogoGroups = Partial<Record<"ventures" | "advised" | "career" | "faculty", CmsLogo[]>>;

/** Brand logos by trust-wall group; {} when none are published. */
export async function getBrandLogos(): Promise<LogoGroups> {
  const sanity = getSanityClient();
  if (!sanity) return {};
  try {
    const raw = await sanity.fetch<{ name?: string; group?: string; role?: string; url?: string; colourUrl?: string }[]>(
      `*[_type == "brandLogo" && defined(logo)] | order(coalesce(order, 9999) asc){name, group, role, "url": logo.asset->url, "colourUrl": colourLogo.asset->url}`,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    const groups: LogoGroups = {};
    for (const l of raw) {
      if (!l.name || !l.url || !l.group) continue;
      const g = l.group as keyof LogoGroups;
      (groups[g] ??= []).push({ name: l.name, role: l.role, url: l.url, colourUrl: l.colourUrl });
    }
    return groups;
  } catch (err) {
    console.warn("[sanity] logos fetch failed:", (err as Error).message);
    return {};
  }
}

/** The nine 360° areas, CMS text merged over the built-in copy by key. */
export async function getAreas(): Promise<typeof AREAS_BASE> {
  const sanity = getSanityClient();
  if (!sanity) return AREAS_BASE;
  try {
    const raw = await sanity.fetch<{ key?: string; name?: string; stat?: string; headline?: string; note?: string; points?: string[] }[]>(
      `*[_type == "wheelArea" && defined(key)]{key, name, stat, headline, note, points}`,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    const byKey = new Map(raw.map((a) => [a.key, a]));
    return AREAS_BASE.map((a) => {
      const o = byKey.get(a.key);
      if (!o) return a;
      return {
        ...a,
        name: o.name ?? a.name,
        stat: o.stat ?? a.stat,
        headline: o.headline ?? a.headline,
        note: o.note ?? a.note,
        points: o.points?.length === 3 ? (o.points as [string, string, string]) : a.points,
      };
    });
  } catch (err) {
    console.warn("[sanity] areas fetch failed:", (err as Error).message);
    return AREAS_BASE;
  }
}
