import Link from "next/link";
import { ArticleCard } from "../knowledge/ArticleCard";
import type { Article } from "@/lib/data/articles";
import { SecHead } from "../shared/SecHead";
import type { PageSection } from "@/lib/sections";


/** "Playbooks & field notes." — the three latest notes. */
export function KnowledgeTeaser({ articles, sec }: { articles: Article[]; sec?: PageSection }) {
  return (
    <section className="kb kh">
      <div className="wrap">
        <div className="kh-h sh">
          <div>
            <SecHead sec={sec} label="Knowledge Hub" plain="Playbooks & " em="field notes." />
            <p style={{ marginTop: 12 }}>{sec?.body ?? "How profitable businesses are actually built, written to be used, not skimmed."}</p>
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
