import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, FaqAccordion, CTABanner } from "@/components/site/Blocks";
import { faqs } from "@/content/faq";
import { pricingFaq } from "@/content/pricing";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about how Upveraoffer works, what is included, timelines, languages supported, refunds, and confidentiality.",
  alternates: { canonical: "/faq" },
};

const all = [...faqs, ...pricingFaq];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: all.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered plainly."
        intro="If yours is not here, ask us directly — we answer every message within one business day."
      />

      <Section>
        <Container className="max-w-4xl">
          <h2 className="font-display text-2xl font-semibold">Working with us</h2>
          <div className="mt-6">
            <FaqAccordion items={faqs} />
          </div>

          <h2 className="mt-14 font-display text-2xl font-semibold">
            Cost and payment
          </h2>
          <div className="mt-6">
            <FaqAccordion items={pricingFaq} />
          </div>
        </Container>
      </Section>

      <CTABanner
        title="Still have a question?"
        body="Ask it on the consult call, or send it in writing — either way you get a straight answer, not a sales pitch."
        secondary={{ href: "/contact", label: "Send a message" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
