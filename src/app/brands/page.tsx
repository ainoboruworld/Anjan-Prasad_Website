import type { Metadata } from "next";
import Link from "next/link";
import { getBrandCatalog, type Brand } from "@/lib/brands";
import { sized } from "@/lib/sanity-image";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Brands — built, led and advised",
  description:
    "The businesses Anjan Prasad has founded, runs and advised: Noboru World, Lushful, Filing Buddy and more. One page on each, with what was done and what it produced.",
  alternates: { canonical: "/brands" },
};

function Logo({ b }: { b: Brand }) {
  const src = sized(b.logoUrl, 240);
  if (!src) return <span className="brlogo mono" aria-hidden>{b.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("")}</span>;
  return (
    <span className="brlogo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={b.name} loading="lazy" />
    </span>
  );
}

export default async function BrandsPage() {
  const cats = await getBrandCatalog();
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
          {cats.map((c) => (
            <div className="brg" key={c.slug}>
              <span className="lab">{c.name}</span>
              <div className="brgrid">
                {c.brands.map((b) => (
                  <Link href={`/brands/${b.slug}`} key={b.slug} className="brcard">
                    <Logo b={b} />
                    {b.role && <small>{b.role}</small>}
                    <b>{b.name}</b>
                    {b.industry && <span className="brsec">{b.industry}</span>}
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
