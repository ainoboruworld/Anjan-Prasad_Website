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
import { env, flags } from "./env";
import { ARTICLES, type Article, type ArticleCategory } from "./data/articles";

export const REVALIDATE_SECONDS = 300;

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!flags.sanity) return null;
  if (client) return client;
  client = createClient({
    projectId: env.sanity.projectId,
    dataset: env.sanity.dataset,
    apiVersion: env.sanity.apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return client;
}

export interface CmsArticle extends Article {
  /** Portable Text body from the CMS (rendered by <PortableText/>). */
  portableBody?: PortableTextBlock[];
}

interface RawPost {
  slug: string;
  title: string;
  category?: string;
  publishedAt?: string;
  readTime?: number;
  excerpt?: string;
  imageUrl?: string;
  kicker?: string;
  bannerTitle?: string;
  body?: PortableTextBlock[];
  sources?: string;
  caseStudy?: Article["caseStudy"];
}

const POST_QUERY = `*[_type == "blogPost" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
  "slug": slug.current, title, "category": category->title, publishedAt, readTime, excerpt,
  "imageUrl": featuredImage.asset->url, kicker, bannerTitle, body, sources,
  "caseStudy": select(defined(caseStudy.sector) => caseStudy, null)
}`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function toArticle(p: RawPost): CmsArticle {
  const category = (p.category ?? "Business") as ArticleCategory;
  return {
    slug: p.slug,
    title: p.title,
    category: p.caseStudy ? "Case Studies" : category,
    date: p.caseStudy?.sector ?? shortDate(p.publishedAt),
    publishedAt: p.publishedAt ?? new Date().toISOString(),
    readTime: p.readTime ? `${p.readTime} min read` : "5 min read",
    excerpt: p.excerpt ?? "",
    image: p.imageUrl ?? "/images/life-4.jpg",
    kicker: p.kicker ?? (p.caseStudy ? "Case Studies" : category),
    bannerTitle: p.bannerTitle,
    sources: p.sources,
    caseStudy: p.caseStudy ?? undefined,
    portableBody: p.body,
  };
}

/** All articles, CMS first (by slug), then the local seed. */
export async function getArticles(): Promise<CmsArticle[]> {
  const sanity = getSanityClient();
  if (!sanity) return ARTICLES;
  try {
    const raw = await sanity.fetch<RawPost[]>(POST_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } });
    const cms = raw.map(toArticle);
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
