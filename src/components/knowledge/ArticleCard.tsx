import Link from "next/link";
import { articleHref, articleMeta, type Article } from "@/lib/data/articles";

/** Knowledge Hub card. `teaser` adds the arrow read-time used on the home page. */
export function ArticleCard({ article, teaser = false }: { article: Article; teaser?: boolean }) {
  return (
    <Link href={articleHref(article.slug)} className="ac" data-cat={article.category}>
      <div className="im">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt="" loading="lazy" />
      </div>
      <div className="b">
        <span className="c">{articleMeta(article)}</span>
        <h3>{article.title}</h3>
        <p className="dsc">{article.excerpt}</p>
        {teaser ? <span className="rd2">{article.readTime} →</span> : <small>{article.readTime}</small>}
      </div>
    </Link>
  );
}
