import { LogoBox } from "../ui/LogoTile";
import { CAREER, COMPANIES_ADVISED, FACULTY, VENTURES, type BrandLogo } from "@/lib/data/brands";

function Marquee({ logos, reverse = false }: { logos: BrandLogo[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.slug}>
          <LogoBox logo={l} />
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
export function TrustWall() {
  return (
    <section className="trust4 in" id="tw">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="hd">
          <span className="lab">Trusted over sixteen years</span>
          <h2>
            The brands built, <em>advised, and led.</em>
          </h2>
        </div>

        <div className="ven">
          {VENTURES.map((v, i) => (
            <div className="vc2" key={v.slug} style={{ ["--d" as string]: `${i * 90}ms` }}>
              <small>{v.role}</small>
              <b className="vlg">
                <LogoBox logo={v} large />
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
              <LogoBox key={l.slug} logo={l} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
