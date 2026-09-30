import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/shared/Loader";
import { NewsletterPopup } from "@/components/shared/NewsletterPopup";
import { SITE } from "@/lib/data/site";
import { env } from "@/lib/env";

/* Two fonts, nothing more: Instrument Serif for headlines, Geist for text. */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: SITE.title,
    template: "%s | Anjan Prasad",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  keywords: [
    "Anjan Prasad",
    "business consultant",
    "business advisor",
    "business mentor",
    "business coach",
    "growth consultant",
    "GTM strategist",
    "fractional CMO",
    "startup mentor India",
    "Noboru World",
    "Lushful",
    "Filing Buddy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.twitterHandle,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anjan Prasad",
  jobTitle: "Business Consultant, Business Advisor and Business Mentor",
  description: SITE.description,
  worksFor: { "@type": "Organization", name: "Noboru World" },
  alumniOf: ["IIFT", "IMT Ghaziabad", "BML Munjal University"],
  knowsAbout: [
    "Business Strategy",
    "Go-to-Market Strategy",
    "Marketing and Sales",
    "Finance and Unit Economics",
    "Operations",
    "Startup Mentorship",
  ],
  sameAs: [SITE.linkedin, SITE.instagram],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }} />
        <QueryProvider>
          <Loader />
          <Header />
          {children}
          <Footer />
          <NewsletterPopup />
        </QueryProvider>
      </body>
    </html>
  );
}
