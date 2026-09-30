"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { CATEGORIES, type Article, type ArticleCategory } from "@/lib/data/articles";

type Filter = "all" | ArticleCategory;

/** Knowledge Hub header (search + chips) and the filtered grid. */
export function HubExplorer({ articles, initialCategory }: { articles: Article[]; initialCategory?: string }) {
  const [cat, setCat] = useState<Filter>(
    CATEGORIES.includes(initialCategory as ArticleCategory) ? (initialCategory as ArticleCategory) : "all"
  );
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (cat === "all" || a.category === cat) &&
        (!needle || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(needle))
    );
  }, [articles, cat, q]);

  const empty = shown.length === 0;
  const list = empty ? articles.slice(0, 3) : shown;

  return (
    <>
      <header className="ph1 ctr">
        <div className="wrap">
          <span className="khi">
            Notes from Anjan <span className="pen">✍️</span>
          </span>
          <span className="kkw">What I wish someone had told me</span>
          <h1>
            Playbooks &amp; <em>field notes.</em>
          </h1>
          <p>How profitable businesses are actually built, written to be used, not skimmed.</p>

          <div className="srch">
            <input
              type="search"
              id="q"
              placeholder="Search articles"
              aria-label="Search articles"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <span>⌕</span>
          </div>

          <div className="chips" role="group" aria-label="Filter by category">
            <button type="button" className={cat === "all" ? "on" : undefined} onClick={() => setCat("all")} aria-pressed={cat === "all"}>
              All
            </button>
            {CATEGORIES.map((c) => (
              <button type="button" key={c} className={cat === c ? "on" : undefined} onClick={() => setCat(c)} aria-pressed={cat === c}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="sec hubs">
        <div className="wrap">
          <p className="empty" id="empty" style={{ display: empty ? "block" : "none" }} aria-live="polite">
            Nothing here yet. <span>Meanwhile, here are three good places to start.</span>
          </p>
          <div className="ag" id="ag">
            {list.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
