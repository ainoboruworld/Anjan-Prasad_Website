import { HAS_TILE, logoSrc, tileSrc, type BrandLogo } from "@/lib/data/brands";

/**
 * A brand logo box: the tinted version by default, the full-colour version on
 * hover. Dimensions are the fitted box from the design so marquees never jump.
 */
export function LogoTile({ logo }: { logo: BrandLogo }) {
  return (
    <span className="lx" style={{ width: logo.width, height: logo.height }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-box PNGs, no optimisation needed */}
      <img className="lt" src={logoSrc(logo.slug)} alt={logo.name} loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lc2" src={logoSrc(logo.slug, true)} alt="" aria-hidden loading="lazy" />
    </span>
  );
}

/** White tile with the full-colour logo — used on the navy trust wall. */
export function LogoBox({ logo, large = false }: { logo: BrandLogo; large?: boolean }) {
  const src = HAS_TILE.has(logo.slug) ? tileSrc(logo.slug) : logoSrc(logo.slug, true);
  return (
    <span className={`lg-tile${large ? " large" : ""}`} title={logo.name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={logo.name} loading="lazy" />
    </span>
  );
}
