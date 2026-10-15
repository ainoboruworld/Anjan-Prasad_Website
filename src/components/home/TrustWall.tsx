import { LogoTile } from "../ui/LogoTile";
import { SecHead } from "../shared/SecHead";
import type { PageSection } from "@/lib/sections";

import { CAREER, COMPANIES_ADVISED, FACULTY, VENTURES, type BrandLogo } from "@/lib/data/brands";

function Marquee({ logos, reverse = false }: { logos: BrandLogo[]; reverse?: boolean }) {
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

/** "The brands built, advised, and led." — ventures, marquees, faculty. */
export function TrustWall({ sec }: { sec?: PageSection }) {
  return (
    <section className="trust4 in" id="tw">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="hd">
          <SecHead sec={sec} label="Trusted over seventeen years" plain="The brands built, " em="advised, and led." />
        </div>

        <div className="ven">
          {VENTURES.map((v, i) => (
            <div className="vc2" key={v.slug} style={{ ["--d" as string]: `${i * 90}ms` }}>
              <small>{v.role}</small>
              <b className="vlg">
                <LogoTile logo={v} />
              </b>
            </div>
          ))}
        </div>

        <div className="mqw">
          <div className="mqh">
            <span className="lab">Companies advised</span>
            <small>{COMPANIES_ADVISED.length} brands</small>
          </div>
          <Marquee logos={COMPANIES_ADVISED} />

          <div className="mqh">
            <span className="lab">Where I learned and mentored</span>
            <small>Career · Startups</small>
          </div>
          <Marquee logos={CAREER} reverse />

          <div className="mqh">
            <span className="lab">Where I taught</span>
            <small>Visiting faculty</small>
          </div>
          <div className="fac">
            {FACULTY.map((l) => (
              <LogoTile key={l.slug} logo={l} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
