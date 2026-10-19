"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps the site's own chrome (header, footer, loader, pop-ups) so none of it
 * renders on /studio: the fixed header otherwise floats invisibly over the
 * Studio's toolbar and swallows its clicks.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <>{children}</>;
}
