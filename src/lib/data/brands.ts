/**
 * Brand logos shown on the trust wall. Each logo ships as a tinted version
 * (`/brand-logos/<slug>.png`) and a full-colour version (`-colour.png`) that
 * fades in on hover. Width/height are the intrinsic display box the logo was
 * fitted to in the design so the marquee never jumps.
 */
export interface BrandLogo {
  slug: string;
  name: string;
  width: number;
  height: number;
}

export function logoSrc(slug: string, colour = false): string {
  return `/brand-logos/${slug}${colour ? "-colour" : ""}.png`;
}

export const VENTURES: (BrandLogo & { role: string })[] = [
  { slug: "noboru-world", name: "Noboru World", width: 108, height: 37, role: "01 · Founder & CEO" },
  { slug: "lushful", name: "Lushful", width: 130, height: 31, role: "02 · Co-founder" },
  { slug: "filing-buddy", name: "Filing Buddy", width: 108, height: 37, role: "03 · CEO" },
];

export const COMPANIES_ADVISED: BrandLogo[] = [
  { slug: "american-express", name: "American Express", width: 150, height: 10 },
  { slug: "sony", name: "Sony", width: 149, height: 27 },
  { slug: "dabur", name: "Dabur", width: 49, height: 44 },
  { slug: "kfc", name: "KFC", width: 44, height: 44 },
  { slug: "pizza-hut", name: "Pizza Hut", width: 127, height: 32 },
  { slug: "snapdeal", name: "Snapdeal", width: 141, height: 28 },
  { slug: "pwc", name: "PwC", width: 88, height: 44 },
  { slug: "google", name: "Google", width: 111, height: 36 },
  { slug: "motorola", name: "Motorola", width: 131, height: 31 },
  { slug: "niit", name: "NIIT", width: 103, height: 39 },
  { slug: "cheapoair", name: "CheapOair", width: 120, height: 33 },
  { slug: "aditya-birla-capital", name: "Aditya Birla Capital", width: 129, height: 31 },
  { slug: "digit", name: "Digit", width: 88, height: 44 },
  { slug: "tata-housing", name: "Tata Housing", width: 44, height: 44 },
  { slug: "tommy-hilfiger", name: "Tommy Hilfiger", width: 150, height: 10 },
  { slug: "black-decker", name: "Black+Decker", width: 87, height: 44 },
];

export const CAREER: BrandLogo[] = [
  { slug: "accenture", name: "Accenture", width: 123, height: 32 },
  { slug: "mindshare", name: "Mindshare", width: 150, height: 18 },
  { slug: "ipg-mediabrands", name: "IPG Mediabrands", width: 150, height: 18 },
  { slug: "zeta-global", name: "Zeta Global", width: 112, height: 36 },
  { slug: "fareportal", name: "Fareportal", width: 79, height: 44 },
  { slug: "art-of-living", name: "The Art of Living", width: 97, height: 41 },
  { slug: "urban-kisaan", name: "Urban Kisaan", width: 100, height: 40 },
  { slug: "akounto", name: "Akounto", width: 144, height: 28 },
];

export const FACULTY: BrandLogo[] = [
  { slug: "iift", name: "IIFT", width: 64, height: 44 },
  { slug: "imt-ghaziabad", name: "IMT Ghaziabad", width: 40, height: 44 },
  { slug: "bml-munjal", name: "BML Munjal University", width: 45, height: 44 },
];
