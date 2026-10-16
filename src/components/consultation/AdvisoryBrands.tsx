import { SecHead } from "../shared/SecHead";
import { LogoTile } from "../ui/LogoTile";
import type { PageSection } from "@/lib/sections";
import type { CmsLogo, LogoGroups } from "@/lib/sanity";
import { COMPANIES_ADVISED, CAREER, type BrandLogo } from "@/lib/data/brands";

function Row({ logos, reverse = false }: { logos: BrandLogo[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.slug}>
          <LogoTile logo={l} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`mq${reverse ? " rev" : ""}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}

function CmsRow({ logos, reverse = false }: { logos: CmsLogo[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.name}>
          <span className="lx" style={{ height: 44 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lt" src={l.url} alt={l.name} style={{ height: 44, width: "auto" }} loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lc2" src={l.colourUrl ?? l.url} alt="" aria-hidden style={{ height: 44, width: "auto" }} loading="lazy" />
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`mq${reverse ? " rev" : ""}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}

/**
 * Advisory brand wall: the moving logo marquees, same animation as the home
 * trust wall. Logos are managed in the Studio under Brand Logos; this
 * section's label and heading live in the "Brand wall" page section.
 */
export function AdvisoryBrands({ sec, logos = {} }: { sec?: PageSection; logos?: LogoGroups }) {
  if (sec?.hidden) return null;
  return (
    <section className="trust4 in abw" id="abrands">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="hd">
          <SecHead sec={sec} label="Proof across industries" plain="Brands this advice " em="has already served." />
        </div>
        <div className="mqw">
          {logos.advised?.length ? <CmsRow logos={logos.advised} /> : <Row logos={COMPANIES_ADVISED} />}
          {logos.career?.length ? <CmsRow logos={logos.career} reverse /> : <Row logos={CAREER} reverse />}
        </div>
      </div>
    </section>
  );
}
