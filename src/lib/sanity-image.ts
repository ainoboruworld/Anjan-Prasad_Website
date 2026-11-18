import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { env } from "./env";

const builder = env.sanity.projectId ? imageUrlBuilder({ projectId: env.sanity.projectId, dataset: env.sanity.dataset }) : null;

/**
 * A sized, optimised URL for a Sanity image (or asset URL). Non-Sanity URLs
 * (local /brand-logos files, seeded content) pass through untouched.
 */
export function sized(src: string | undefined, width: number, opts: { height?: number; quality?: number } = {}): string | undefined {
  if (!src) return undefined;
  if (!builder || !src.includes("cdn.sanity.io")) return src;
  let b = builder.image(src as SanityImageSource).width(width).auto("format").quality(opts.quality ?? 82).fit(opts.height ? "crop" : "max");
  if (opts.height) b = b.height(opts.height);
  return b.url();
}
