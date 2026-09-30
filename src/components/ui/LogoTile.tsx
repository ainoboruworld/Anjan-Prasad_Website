import { logoSrc, type BrandLogo } from "@/lib/data/brands";

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
