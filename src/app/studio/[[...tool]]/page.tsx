import type { Metadata } from "next";
import { Studio } from "./Studio";

/**
 * Sanity Studio embedded in the site: the CMS lives at /studio and deploys
 * with every Vercel build, so no separate studio hosting is needed. Access
 * is protected by Sanity's own login (only members of the Sanity project
 * can see or edit anything).
 */
export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
