import type { Faq as FaqItem } from "@/lib/data/faqs";

/**
 * Plain question-and-answer section with matching FAQPage schema. Written so
 * each answer stands alone when a search engine or AI assistant quotes it.
 */
export function Faq({ items, label = "Questions founders ask", title }: { items: FaqItem[]; label?: string; title: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="sec faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <div className="sh">
          <div>
            <span className="lab">{label}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="faq-list">
          {items.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                <h3>{f.q}</h3>
                <span aria-hidden>+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
