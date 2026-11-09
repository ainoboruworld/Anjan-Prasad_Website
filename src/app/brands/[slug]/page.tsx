import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApMark } from "@/components/brand/ApMark";
import { BRAND_KIND_LABEL, BRAND_PAGES, brandLogo, brandPage } from "@/lib/data/brandPages";
import { HAS_TILE } from "@/lib/data/brands";
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

/** Logo where one exists, otherwise a quiet monogram tile. */
function Logo({ slug, name, large = false }: { slug: string; name: string; large?: boolean }) {
  const hasFile = HAS_TILE.has(slug) || ["pinkfly", "auxman", "fundamentals", "sapiens", "accenture"].includes(slug);
  if (!hasFile) {
    return (
      <span className={`brlogo mono${large ? " lg" : ""}`} aria-label={name}>
        {name
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")}
      </span>
    );
  }
  return (
    <span className={`brlogo${large ? " lg" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brandLogo(slug)} alt={name} loading={large ? undefined : "lazy"} />
    </span>
  );
}

/** One-page story of a brand: what it is, what I did, what it taught me. */
export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const b = brandPage(slug);
  if (!b) notFound();
  const cases = (b.cases ?? [])
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a));
  const others = BRAND_PAGES.filter((x) => x.slug !== b.slug && !x.draft).slice(0, 3);
  const site = env.siteUrl.replace(/\/$/, "");
  const host = b.website ? new URL(b.website).hostname.replace(/^www\./, "") : null;

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

      {/* Hero: the brand, the relationship, and the one line that matters. */}
      <section className="bh">
        <div className="aw">
          <Link href="/brands" className="back">
            ← All brands
          </Link>
          <div className="bh-grid">
            <div className="bh-copy">
              <span className="lab">
                {BRAND_KIND_LABEL[b.kind]} · {b.role}
              </span>
              <h1>{b.name}</h1>
              <p className="bh-sector">{b.sector}</p>
              <p className="bh-line">{b.headline}</p>
              <div className="bh-actions">
                {b.website && (
                  <a href={b.website} className="cta" target="_blank" rel="noopener noreferrer">
                    Visit {host} <span>↗</span>
                  </a>
                )}
                {cases.length > 0 && (
                  <Link href={articleHref(cases[0].slug)} className={b.website ? "bh-alt" : "cta"}>
                    Read the case study {b.website ? "→" : <span>→</span>}
                  </Link>
                )}
              </div>
            </div>
            <div className="bh-card">
              <Logo slug={b.slug} name={b.name} large />
              <dl>
                <div>
                  <dt>My role</dt>
                  <dd>{b.role}</dd>
                </div>
                <div>
                  <dt>Sector</dt>
                  <dd>{b.sector}</dd>
                </div>
                {b.since && (
                  <div>
                    <dt>Since</dt>
                    <dd>{b.since}</dd>
                  </div>
                )}
                {host && (
                  <div>
                    <dt>Website</dt>
                    <dd>
                      <a href={b.website} target="_blank" rel="noopener noreferrer">
                        {host} ↗
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              {b.draft && <span className="ph-flag">Short version · full story coming</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers, when there are real ones. */}
      {b.metrics && (
        <section className="bm">
          <div className="aw">
            <div className="bm-row">
              {b.metrics.map(([v, l]) => (
                <div key={l}>
                  <b>{v}</b>
                  <small>{l}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The story, in Anjan's voice. */}
      <section className="bs">
        <div className="aw bs-grid">
          <div className="bs-main">
            <span className="lab">The story</span>
            {b.story.map((p, i) => (
              <p key={i} className={i === 0 ? "bs-first" : undefined}>
                {p}
              </p>
            ))}

            <span className="lab bs-lab">What I did</span>
            <ol className="bs-steps">
              {b.work.map((w, i) => (
                <li key={w}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {w}
                </li>
              ))}
            </ol>

            {b.lesson && (
              <div className="bs-lesson">
                <span className="lab">What it taught me</span>
                <p>{b.lesson}</p>
              </div>
            )}
          </div>

          <aside className="bs-side">
            {b.quote && (
              <blockquote className="bs-quote">
                <p>&ldquo;{b.quote[0]}&rdquo;</p>
                <cite>{b.quote[1]}</cite>
              </blockquote>
            )}
            {cases.length > 0 && (
              <div className="bs-cases">
                <span className="lab">Read the full {cases.length > 1 ? "case studies" : "case study"}</span>
                {cases.map((a) => (
                  <Link href={articleHref(a.slug)} key={a.slug} className="bs-case">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.cardImage ?? a.image} alt="" loading="lazy" />
                    <span>
                      <small>{a.readTime}</small>
                      <b>{a.title}</b>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* A note from Anjan, then the way forward. */}
      <section className="bn">
        <div className="aw">
          <div className="bn-card">
            <div className="bn-mark">
              <ApMark title="Anjan Prasad" />
            </div>
            <div>
              <p>
                {b.note ??
                  (b.kind === "founded"
                    ? `Every business I've built taught me something I now check for in the first conversation with a founder. If ${b.name} sounds anything like where you are, tell me about it.`
                    : `The work with ${b.name} is the kind I like most: a clear problem, real numbers, and a team willing to change what isn't working. If that's your business, let's talk.`)}
              </p>
              <span className="bn-sign">Anjan</span>
            </div>
            <div className="bn-cta">
              <Link href="/business-advisory#capply" className="cta">
                Tell me about your business <span>→</span>
              </Link>
              {b.website && (
                <a href={b.website} target="_blank" rel="noopener noreferrer" className="bh-alt">
                  Visit {host} ↗
                </a>
              )}
            </div>
          </div>

          <div className="more-r">
            <span className="lab">More brands</span>
            <div className="brgrid small">
              {others.map((o) => (
                <Link href={`/brands/${o.slug}`} key={o.slug} className="brcard">
                  <Logo slug={o.slug} name={o.name} />
                  <small>{o.role}</small>
                  <b>{o.name}</b>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
