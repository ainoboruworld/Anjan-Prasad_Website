import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote hosts for optimised <Image> — Sanity CDN and YouTube thumbnails.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    // Legacy IA (old AP website) → the current IA.
    return [
      { source: "/advisory", destination: "/business-advisory", permanent: true },
      { source: "/consulting", destination: "/consultation", permanent: true },
      { source: "/consult", destination: "/consultation", permanent: true },
      { source: "/knowledge", destination: "/knowledge-hub", permanent: true },
      { source: "/knowledge-hub/blogs", destination: "/knowledge-hub", permanent: true },
      { source: "/knowledge-hub/blogs/:slug", destination: "/knowledge-hub/:slug", permanent: true },
      { source: "/case-studies", destination: "/knowledge-hub?cat=Case%20Studies", permanent: true },
      { source: "/resources", destination: "/knowledge-hub", permanent: true },
      { source: "/resources/blogs", destination: "/knowledge-hub", permanent: true },
      { source: "/resources/case-studies", destination: "/knowledge-hub?cat=Case%20Studies", permanent: true },
      { source: "/media", destination: "/about#hear", permanent: true },
      { source: "/corporate-training", destination: "/business-advisory", permanent: true },
      { source: "/counselling", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
