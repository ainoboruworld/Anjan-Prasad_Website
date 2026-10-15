/**
 * Page section types and helpers, safe to import from client components
 * (no Sanity client here). Fetching lives in src/lib/sanity.ts.
 */

export interface SectionItem {
  title?: string;
  value?: string;
  text?: string;
}

/** One editable page section (Pinkfly-style): "Home · Hero", "About · Beliefs", … */
export interface PageSection {
  key: string;
  label?: string;
  heading?: string;
  body?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: SectionItem[];
}

export type Sections = Record<string, PageSection>;

/** Split "plain *italic*" into its plain and italic parts. */
export function splitEm(text: string): { plain: string; em?: string } {
  const m = text.match(/^(.*?)\*([^*]+)\*\s*$/);
  if (!m) return { plain: text };
  return { plain: m[1].trimEnd() + (m[1].trim() ? " " : ""), em: m[2] };
}

/** A section's heading parts, or the built-in fallback when unset. */
export function secHeading(
  sec: PageSection | undefined,
  fallback: { plain: string; em?: string }
): { plain: string; em?: string } {
  return sec?.heading ? splitEm(sec.heading) : fallback;
}
