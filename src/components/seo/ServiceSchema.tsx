import { env } from "@/lib/env";

/** Service schema for a program page, tied to Anjan as provider. */
export function ServiceSchema({ name, description, path, type = "Service" }: { name: string; description: string; path: string; type?: "Service" | "ProfessionalService" }) {
  const site = env.siteUrl.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: `${site}${path}`,
    serviceType: name,
    areaServed: { "@type": "Country", name: "India" },
    provider: { "@type": "Person", name: "Anjan Prasad", url: site },
    audience: { "@type": "BusinessAudience", audienceType: "Founders and business owners" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
