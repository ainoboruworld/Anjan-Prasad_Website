import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/knowledge/ArticleView";
import { ARTICLES } from "@/lib/data/articles";
import { getArticle, getArticles } from "@/lib/sanity";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: "Not found" };
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/knowledge-hub/${a.slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: "article", publishedTime: a.publishedAt, images: [a.image] },
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
    author: { "@type": "Person", name: "Anjan Prasad" },
    image: article.image,
  };

  return (
    <main className="pg on" data-p="article" id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleView article={article} related={related} />
    </main>
  );
}
