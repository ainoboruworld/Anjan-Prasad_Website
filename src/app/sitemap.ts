import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getArticles } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl;
  const pages = ["", "/business-advisory", "/consultation", "/knowledge-hub", "/about", "/contact", "/privacy", "/terms"];
  const articles = await getArticles();
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const })),
    ...articles.map((a) => ({
      url: `${base}/knowledge-hub/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
    })),
  ];
}
