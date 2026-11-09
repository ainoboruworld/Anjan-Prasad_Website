import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/knowledge/ArticleView";
import { ARTICLES } from "@/lib/data/articles";
import { getArticle, getArticles } from "@/lib/sanity";
import { env } from "@/lib/env";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: "Not found" };
  const title = a.metaTitle ?? a.title;
  const description = a.metaDescription ?? a.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/knowledge-hub/${a.slug}` },
    openGraph: { title, description, type: "article", publishedTime: a.publishedAt, images: [a.image] },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const [article, all] = await Promise.all([getArticle(slug), getArticles()]);
  if (!article) notFound();

  const i = all.findIndex((a) => a.slug === article.slug);
  const related = [1, 2, 3].map((k) => all[(i + k) % all.length]).filter((r) => r && r.slug !== article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: "Anjan Prasad", url: env.siteUrl },
    publisher: { "@type": "Person", name: "Anjan Prasad", url: env.siteUrl },
    mainEntityOfPage: `${env.siteUrl}/knowledge-hub/${article.slug}`,
    image: article.image.startsWith("http") ? article.image : `${env.siteUrl}${article.image}`,
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: env.siteUrl },
      { "@type": "ListItem", position: 2, name: "Knowledge Hub", item: `${env.siteUrl}/knowledge-hub` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${env.siteUrl}/knowledge-hub/${article.slug}` },
    ],
  };

  return (
    <main className="pg on" data-p="article" id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <ArticleView article={article} related={related} />
    </main>
  );
}
