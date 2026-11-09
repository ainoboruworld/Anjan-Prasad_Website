import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND_KIND_LABEL, BRAND_PAGES, brandLogo, brandPage } from "@/lib/data/brandPages";
import { ARTICLES, articleHref } from "@/lib/data/articles";
import { env } from "@/lib/env";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return BRAND_PAGES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const b = brandPage(slug);
  if (!b) return { title: "Not found" };
  const title = `${b.name} — ${b.role}`;
  return {
    title,
    description: b.headline,
    alternates: { canonical: `/brands/${b.slug}` },
    openGraph: { title, description: b.headline, type: "article" },
  };
}

/** One-page case study for a brand, with a way out to the brand itself. */
export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const b = brandPage(slug);
  if (!b) notFound();
  const cases = (b.cases ?? []).map((s) => ARTICLES.find((a) => a.slug === s)).filter((a): a is (typeof ARTICLES)[number] => Boolean(a));
  const others = BRAND_PAGES.filter((x) => x.slug !== b.slug && !x.draft).slice(0, 3);
  const site = env.siteUrl.replace(/\/$/, "");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: b.name,
      ...(b.website ? { url: b.website } : {}),
      ...(b.kind === "founded" ? { founder: { "@type": "Person", name: "Anjan Prasad", url: site } } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        { "@type": "ListItem", position: 2, name: "Brands", item: `${site}/brands` },
        { "@type": "ListItem", position: 3, name: b.name, item: `${site}/brands/${b.slug}` },
      ],
    },
  ];

  return (
    <main className="pg on" id="main" data-p="brand">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="art brd">
        <div className="aw">
          <Link href="/brands" className="back">
            ← All brands
          </Link>
          <div className="brhead">
            <span className="brlogo lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brandLogo(b.slug)} alt={b.name} />
            </span>
            <div>
              <span className="lab">
                {BRAND_KIND_LABEL[b.kind]} · {b.role}
              </span>
              <h1>{b.name}</h1>
              <p className="brsec">{b.sector}</p>
            </div>
          </div>
          <p className="lead">{b.headline}</p>

          {b.draft && <span className="ph-flag">Short version: the full case study is coming</span>}

          {b.metrics && (
            <div className="csb">
              <div className="csmx">
                {b.metrics.map(([v, l]) => (
                  <div key={l}>
                    <b>{v}</b>
                    <small>{l}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {b.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>What I did</h2>
          <ul className="brwork">
            {b.work.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>

          {b.quote && (
            <blockquote>
              &ldquo;{b.quote[0]}&rdquo;<cite>{b.quote[1]}</cite>
            </blockquote>
          )}

          {cases.length > 0 && (
            <>
              <h2>The full case {cases.length > 1 ? "studies" : "study"}</h2>
              <div className="brcases">
                {cases.map((a) => (
                  <Link href={articleHref(a.slug)} key={a.slug} className="ok-pick">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.cardImage ?? a.image} alt="" loading="lazy" />
                    <span>
                      <small>{a.readTime}</small>
                      <b>{a.title}</b>
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="brcta">
            {b.website && (
              <a href={b.website} className="cta" target="_blank" rel="noopener noreferrer">
                Visit {b.name} <span>↗</span>
              </a>
            )}
            <Link href="/business-advisory#capply" className={b.website ? "brcta-alt" : "cta"}>
              {b.website ? "Or talk to me about your business →" : <>Talk to me about your business <span>→</span></>}
            </Link>
          </div>

          <div className="more-r">
            <span className="lab">More brands</span>
            <div className="brgrid small">
              {others.map((o) => (
                <Link href={`/brands/${o.slug}`} key={o.slug} className="brcard">
                  <span className="brlogo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={brandLogo(o.slug)} alt={o.name} loading="lazy" />
                  </span>
                  <small>{o.role}</small>
                  <b>{o.name}</b>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
