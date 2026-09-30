import Link from "next/link";
import { ArticleCard } from "../knowledge/ArticleCard";
import type { Article } from "@/lib/data/articles";

/** "Playbooks & field notes." — the three latest notes. */
export function KnowledgeTeaser({ articles }: { articles: Article[] }) {
  return (
    <section className="kb kh">
      <div className="wrap">
        <div className="kh-h sh">
          <div>
            <span className="lab">Knowledge Hub</span>
            <h2>
              Playbooks &amp; <em>field notes.</em>
            </h2>
            <p style={{ marginTop: 12 }}>How profitable businesses are actually built, written to be used, not skimmed.</p>
          </div>
          <Link href="/knowledge-hub" className="ul" style={{ fontSize: 14, color: "var(--slate)" }}>
            All articles
          </Link>
        </div>
        <div className="ag rv on">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} teaser />
          ))}
        </div>
      </div>
    </section>
  );
}
