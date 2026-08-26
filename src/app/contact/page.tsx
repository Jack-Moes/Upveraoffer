import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, Card } from "@/components/site/Blocks";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { getPublicPlans } from "@/lib/managed-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where your job search is stuck. We reply to every message within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const plans = getPublicPlans();
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us where you’re stuck."
        intro="The more specific you are, the more useful our first reply will be. We answer everything within one business day."
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
                <ContactForm plans={plans} />
              </Suspense>
            </div>

            <aside className="space-y-5">
              <div className="photo-frame relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-lg shadow-primary/10">
                <Image
                  src={images.hero.src}
                  alt={images.hero.alt}
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="photo-media object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/35 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3.5 py-2 text-xs font-medium text-white backdrop-blur">A small team that answers directly</p>
              </div>
              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  Prefer to talk?
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  The free consult runs thirty minutes and covers far more
                  ground than email ever will.
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
                    A person reads your message properly. Not an autoresponder.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-sm text-primary">02</span>
                    You get a reply within one business day with a first read on
                    your situation.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-sm text-primary">03</span>
                    If it makes sense to talk, we send you some times. If it
                    doesn’t, we say so.
                  </li>
                </ol>
              </Card>

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  Confidentiality
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Nothing you send goes anywhere else, and we’ll never name you
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
