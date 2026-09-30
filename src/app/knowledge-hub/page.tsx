import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { HubExplorer } from "@/components/knowledge/HubExplorer";
import { getArticles } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Knowledge Hub — Playbooks & field notes",
  description:
    "How profitable businesses are actually built, written to be used, not skimmed. Articles and case studies by Anjan Prasad.",
  alternates: { canonical: "/knowledge-hub" },
};

export const revalidate = 300;

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const [{ cat }, articles] = await Promise.all([searchParams, getArticles()]);

  return (
    <main className="pg on" data-p="knowledge" id="main">
      <HubExplorer articles={articles} initialCategory={cat} />

      <section className="ask">
        <div className="wrap">
          <div>
            <span className="lab">Can&rsquo;t find it?</span>
            <h2>
              Ask me what <em>I haven&rsquo;t written yet.</em>
            </h2>
            <p>
              Most of these notes started as a question from a founder. If yours isn&rsquo;t here, send it. The good
              ones become the next article.
            </p>
          </div>
          <Cta href="/contact">Send me a question</Cta>
        </div>
      </section>
    </main>
  );
}
