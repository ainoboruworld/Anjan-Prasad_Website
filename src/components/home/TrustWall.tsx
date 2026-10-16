import { LogoTile } from "../ui/LogoTile";
import { SecHead } from "../shared/SecHead";
import type { PageSection } from "@/lib/sections";
import type { CmsLogo, LogoGroups } from "@/lib/sanity";

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

/** A CMS-managed logo: muted by default, colour version on hover when given. */
function CmsTile({ logo }: { logo: CmsLogo }) {
  return (
    <span className="lx" style={{ height: 44 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lt" src={logo.url} alt={logo.name} style={{ height: 44, width: "auto" }} loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lc2" src={logo.colourUrl ?? logo.url} alt="" aria-hidden style={{ height: 44, width: "auto" }} loading="lazy" />
    </span>
  );
}

function CmsMarquee({ logos, reverse = false }: { logos: CmsLogo[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.name}>
          <CmsTile logo={l} />
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
export function TrustWall({ sec, logos = {} }: { sec?: PageSection; logos?: LogoGroups }) {
  if (sec?.hidden) return null;
  return (
    <section className="trust4 in" id="tw">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="hd">
          <SecHead sec={sec} label="Trusted over seventeen years" plain="The brands built, " em="advised, and led." />
        </div>

        {/* Ventures ride the same moving marquee as the logo rows below, so
            more brands can be added in the Studio without crowding the grid. */}
        <div className="ven ven-mq">
          <div className="mq">
            {[false, true].map((hidden) => (
              <ul key={String(hidden)} aria-hidden={hidden || undefined}>
                {logos.ventures?.length
                  ? logos.ventures.map((v) => (
                      <li key={v.name}>
                        <div className="vc2">
                          <small>{v.role}</small>
                          <b className="vlg">
                            <CmsTile logo={v} />
                          </b>
                        </div>
                      </li>
                    ))
                  : VENTURES.map((v) => (
                      <li key={v.slug}>
                        <div className="vc2">
                          <small>{v.role}</small>
                          <b className="vlg">
                            <LogoTile logo={v} />
                          </b>
                        </div>
                      </li>
                    ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mqw">
          <div className="mqh">
            <span className="lab">{sec?.items?.[0]?.title ?? "Companies advised"}</span>
            <small>{sec?.items?.[0]?.value ?? `${logos.advised?.length ?? COMPANIES_ADVISED.length} brands`}</small>
          </div>
          {logos.advised?.length ? <CmsMarquee logos={logos.advised} /> : <Marquee logos={COMPANIES_ADVISED} />}

          <div className="mqh">
            <span className="lab">{sec?.items?.[1]?.title ?? "Where I learned and mentored"}</span>
            <small>{sec?.items?.[1]?.value ?? "Career · Startups"}</small>
          </div>
          {logos.career?.length ? <CmsMarquee logos={logos.career} reverse /> : <Marquee logos={CAREER} reverse />}

          <div className="mqh">
            <span className="lab">{sec?.items?.[2]?.title ?? "Where I taught"}</span>
            <small>{sec?.items?.[2]?.value ?? "Visiting faculty"}</small>
          </div>
          <div className="fac">
            {logos.faculty?.length
              ? logos.faculty.map((l) => <CmsTile key={l.name} logo={l} />)
              : FACULTY.map((l) => <LogoTile key={l.slug} logo={l} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
