import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ApMark } from "@/components/brand/ApMark";
import { getAllBrands, getBrand, type Brand } from "@/lib/brands";
import { sized } from "@/lib/sanity-image";
import { env } from "@/lib/env";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getAllBrands()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBrand(slug);
  if (!b) return { title: "Not found" };
  const title = b.role ? `${b.name} — ${b.role}` : b.name;
  const description = b.shortDescription ?? `${b.name}: one of the brands Anjan Prasad has built or advised.`;
  const og = sized(b.heroImage?.url ?? b.previewUrl, 1200, { height: 630 });
  return {
    title,
    description,
    alternates: { canonical: `/brands/${b.slug}` },
    openGraph: { title, description, type: "article", ...(og ? { images: [og] } : {}) },
  };
}

function Logo({ b, large = false }: { b: Brand; large?: boolean }) {
  const src = sized(b.logoUrl, large ? 480 : 240);
  if (!src) {
    return (
      <span className={`brlogo mono${large ? " lg" : ""}`} aria-label={b.name}>
        {b.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("")}
      </span>
    );
  }
  return (
    <span className={`brlogo${large ? " lg" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={b.name} />
    </span>
  );
}

/**
 * One brand, one page. Every section renders only when it has content:
 * hero, about, gallery, information, the built-in extras for seeded brands
 * (numbers, results, lesson, case studies), then an optional call to action.
 */
export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const b = await getBrand(slug);
  if (!b) notFound();
  const all = await getAllBrands();
  const others = all.filter((x) => x.slug !== b.slug && !x.draft).slice(0, 3);
  const site = env.siteUrl.replace(/\/$/, "");
  const host = b.website ? new URL(b.website).hostname.replace(/^www\./, "") : null;
  const heroCtaHref = b.heroCtaHref ?? b.website;
  const heroCtaLabel = b.heroCtaLabel ?? (host ? `Visit ${host}` : undefined);
  const hasAbout = Boolean(b.aboutBody?.length || b.aboutParagraphs?.length);
  const hasInfo = Boolean(b.industry || b.services?.length || b.positioning || b.website || b.role);
  const hasCta = Boolean(b.ctaHeading || b.ctaLabel);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: b.name,
      ...(b.website ? { url: b.website } : {}),
      ...(b.logoUrl ? { logo: b.logoUrl.startsWith("http") ? b.logoUrl : `${site}${b.logoUrl}` } : {}),
      ...(b.categorySlug === "built" ? { founder: { "@type": "Person", name: "Anjan Prasad", url: site } } : {}),
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

      {/* A. Hero */}
      <section className="bh">
        <div className="aw">
          <Link href="/brands" className="back">
            ← All brands
          </Link>
          <div className="bh-top">
            <Logo b={b} large />
            <div className="bh-copy">
              {b.role && <span className="lab">{b.role}</span>}
              <h1>{b.name}</h1>
              {b.shortDescription && <p className="bh-line">{b.shortDescription}</p>}
              {heroCtaHref && heroCtaLabel && (
                <div className="bh-actions">
                  <a href={heroCtaHref} className="cta" target={heroCtaHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {heroCtaLabel} <span>{heroCtaHref.startsWith("http") ? "↗" : "→"}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
          {b.heroImage && (
            <figure className="bh-fig">
              <Image src={sized(b.heroImage.url, 1800)!} alt={b.heroImage.alt ?? ""} width={1800} height={900} priority sizes="(max-width: 900px) 100vw, 1320px" />
            </figure>
          )}
        </div>
      </section>

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

      {/* B. About */}
      {hasAbout && (
        <section className="ba">
          <div className={`aw ba-grid${b.aboutImage ? " has-img" : ""}`}>
            <div className="ba-copy">
              <span className="lab">About</span>
              {b.aboutHeading && <h2>{b.aboutHeading}</h2>}
              {b.aboutBody?.length ? <PortableText value={b.aboutBody} /> : b.aboutParagraphs?.map((p, i) => <p key={i}>{p}</p>)}
              {b.draft && <span className="ph-flag">Short version · full story coming</span>}
            </div>
            {b.aboutImage && (
              <figure className="ba-fig">
                <Image src={sized(b.aboutImage.url, 1000)!} alt={b.aboutImage.alt ?? ""} width={1000} height={1250} sizes="(max-width: 900px) 100vw, 480px" />
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Built-in extras: results, lesson, quote, case studies. */}
      {(b.results || b.lesson || b.quote || b.cases?.length) && (
        <section className="bs">
          <div className="aw bs-grid">
            <div className="bs-main">
              {b.results && (
                <>
                  <span className="lab bs-lab">The results</span>
                  <ul className="bs-results">
                    {b.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </>
              )}
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
              {b.cases && b.cases.length > 0 && (
                <div className="bs-cases">
                  <span className="lab">Read the full {b.cases.length > 1 ? "case studies" : "case study"}</span>
                  {b.cases.map((a) => (
                    <Link href={`/knowledge-hub/${a.slug}`} key={a.slug} className="bs-case">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.image} alt="" loading="lazy" />
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
      )}

      {/* C. Gallery */}
      {b.gallery && b.gallery.length > 0 && (
        <section className="bp" id="photos">
          <div className="aw">
            <span className="lab">In pictures</span>
            <div className={`bp-ed n${Math.min(b.gallery.length, 5)}`}>
              {b.gallery.map((ph, i) => (
                <figure key={ph.url + i} className="bp-fig">
                  <Image src={sized(ph.url, i === 0 ? 1600 : 900)!} alt={ph.alt ?? ""} width={i === 0 ? 1600 : 900} height={i === 0 ? 1000 : 675} sizes={i === 0 ? "(max-width: 900px) 100vw, 880px" : "(max-width: 900px) 100vw, 440px"} loading={i < 2 ? undefined : "lazy"} />
                  {ph.caption && <figcaption>{ph.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* D. Information */}
      {hasInfo && (
        <section className="bi">
          <div className="aw">
            <dl className="bi-grid">
              {b.industry && (
                <div>
                  <dt>Industry</dt>
                  <dd>{b.industry}</dd>
                </div>
              )}
              {b.role && (
                <div>
                  <dt>Anjan&rsquo;s role</dt>
                  <dd>{b.role}</dd>
                </div>
              )}
              {b.services && b.services.length > 0 && (
                <div className="wide">
                  <dt>{b.source === "cms" ? "Services" : "What I did"}</dt>
                  <dd>
                    <ul>
                      {b.services.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {b.positioning && (
                <div className="wide">
                  <dt>Positioning</dt>
                  <dd>{b.positioning}</dd>
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
          </div>
        </section>
      )}

      {/* E. Call to action (optional) + Anjan's note for built-in brands */}
      <section className="bn">
        <div className="aw">
          {hasCta ? (
            <div className="bn-card">
              <div className="bn-mark">
                <ApMark title="Anjan Prasad" />
              </div>
              <div>
                {b.ctaHeading && <h2 className="bn-h">{b.ctaHeading}</h2>}
                {b.ctaDescription && <p>{b.ctaDescription}</p>}
              </div>
              {b.ctaLabel && (
                <div className="bn-cta">
                  <a href={b.ctaHref ?? "/business-advisory#capply"} className="cta" target={b.ctaHref?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {b.ctaLabel} <span>→</span>
                  </a>
                </div>
              )}
            </div>
          ) : b.source === "seed" ? (
            <div className="bn-card">
              <div className="bn-mark">
                <ApMark title="Anjan Prasad" />
              </div>
              <div>
                <p>
                  {b.categorySlug === "built"
                    ? `Every business I've built taught me something I now check for in the first conversation with a founder. If ${b.name} sounds anything like where you are, tell me about it.`
                    : `The work with ${b.name} is the kind I like most: a clear problem, real numbers, and a team willing to change what isn't working. If that's your business, let's talk.`}
                </p>
                <span className="bn-sign">Anjan</span>
              </div>
              <div className="bn-cta">
                <Link href="/business-advisory#capply" className="cta">
                  Tell me about your business <span>→</span>
                </Link>
              </div>
            </div>
          ) : null}

          {others.length > 0 && (
            <div className="more-r">
              <span className="lab">More brands</span>
              <div className="brgrid small">
                {others.map((o) => (
                  <Link href={`/brands/${o.slug}`} key={o.slug} className="brcard">
                    <Logo b={o} />
                    {o.role && <small>{o.role}</small>}
                    <b>{o.name}</b>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
