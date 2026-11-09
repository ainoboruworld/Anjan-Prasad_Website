import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getArticles } from "@/lib/sanity";
import { BRAND_PAGES } from "@/lib/data/brandPages";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl;
  const pages = ["", "/business-advisory", "/mentorship", "/speaking", "/knowledge-hub", "/brands", "/about", "/contact", "/resources/first-call-questions", "/privacy", "/terms"];
  const articles = await getArticles();
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const })),
    ...BRAND_PAGES.map((b) => ({ url: `${base}/brands/${b.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const })),
    ...articles.map((a) => ({
      url: `${base}/knowledge-hub/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
    })),
  ];
}
