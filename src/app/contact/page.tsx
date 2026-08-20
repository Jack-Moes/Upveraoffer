import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, Card } from "@/components/site/Blocks";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where your job search is stuck. We reply to every message within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us where you are stuck."
        intro="The more specific you are, the more useful our first reply will be. We answer every message within one business day."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Suspense
                fallback={
                  <div className="h-96 animate-pulse rounded-card bg-surface" />
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            <aside className="space-y-5">
              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  Prefer to talk?
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  The free consult is thirty minutes and covers more ground than
                  email ever will.
                </p>
                <Link
                  href="/book"
                  className="mt-4 inline-block font-medium text-primary underline underline-offset-4"
                >
                  Book a consult
                </Link>
              </Card>

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">Email us</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block break-all font-medium text-primary underline underline-offset-4"
                >
                  {site.email}
                </a>
                {site.phone && (
                  <p className="mt-4 text-muted">
                    <span className="block text-sm text-subtle">Phone</span>
                    {site.phone}
                  </p>
                )}
              </Card>

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  What happens next
                </h2>
                <ol className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted">
                  <li className="flex gap-3">
                    <span className="font-mono text-sm text-primary">01</span>
                    We read your message properly — a person, not an autoresponder.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-sm text-primary">02</span>
                    You get a reply within one business day with an initial read
                    on your situation.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-sm text-primary">03</span>
                    If it makes sense to talk, we send times. If it does not, we
                    say so.
                  </li>
                </ol>
              </Card>

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  Confidentiality
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Nothing you send is shared with anyone. We will never name you
                  publicly without written permission. See our{" "}
                  <Link href="/privacy" className="text-primary underline underline-offset-4">
                    privacy policy
                  </Link>
                  .
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
