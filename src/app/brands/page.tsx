import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_KIND_LABEL, BRAND_PAGES, brandLogo } from "@/lib/data/brandPages";
import { HAS_TILE } from "@/lib/data/brands";

const hasLogo = (slug: string) => HAS_TILE.has(slug) || ["pinkfly", "auxman", "fundamentals", "sapiens"].includes(slug);

export const metadata: Metadata = {
  title: "Brands — built, led and advised",
  description:
    "The businesses Anjan Prasad has founded, runs and advised: Noboru World, Lushful, Filing Buddy and more. One page on each, with what was done and what it produced.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  const groups = (["founded", "advised"] as const).map((k) => ({ k, items: BRAND_PAGES.filter((b) => b.kind === k) }));
  return (
    <main className="pg on" id="main" data-p="brands">
      <section className="bri">
        <div className="aw">
          <span className="lab">Brands</span>
          <h1>
            Built, led and <em>advised.</em>
          </h1>
          <p className="lead">
            One page on each business: what the problem was, what I did, and what it produced. Where there is a full case
            study, it&rsquo;s linked.
          </p>
          {groups.map(({ k, items }) => (
            <div className="brg" key={k}>
              <span className="lab">{BRAND_KIND_LABEL[k]}</span>
              <div className="brgrid">
                {items.map((b) => (
                  <Link href={`/brands/${b.slug}`} key={b.slug} className="brcard">
                    {hasLogo(b.slug) ? (
                      <span className="brlogo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={brandLogo(b.slug)} alt={b.name} loading="lazy" />
                      </span>
                    ) : (
                      <span className="brlogo mono" aria-hidden>
                        {b.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("")}
                      </span>
                    )}
                    <small>{b.role}</small>
                    <b>{b.name}</b>
                    <span className="brsec">{b.sector}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
