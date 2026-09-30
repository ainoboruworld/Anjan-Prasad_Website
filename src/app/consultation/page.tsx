import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Diagnosis } from "@/components/consultation/Diagnosis";

export const metadata: Metadata = {
  title: "Consultation",
  description:
    "One hour that moves the whole decision. A focused one-to-one session with Anjan Prasad, a business consultant who has built profitable businesses.",
  alternates: { canonical: "/consultation" },
};

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string }>;
}) {
  const { w } = await searchParams;

  return (
    <main className="pg on" data-p="consult" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Consultation</span>
          <h1>
            One hour that moves <em>the whole decision.</em>
          </h1>
          <p>
            A focused one-to-one session with a business consultant who has built profitable businesses. For founders,
            early-stage startups and anyone getting ready to start their own business.
          </p>
          <Cta href="#capply">Request a session</Cta>
        </div>
      </header>

      <Diagnosis initialKey={w} />
    </main>
  );
}
