import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/studio"] },
      // AI assistants are welcome to read and cite the site.
      { userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"], allow: "/", disallow: ["/api/", "/studio"] },
    ],
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
