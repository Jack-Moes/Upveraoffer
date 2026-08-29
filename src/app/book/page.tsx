import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, Card } from "@/components/site/Blocks";
import { BookingEmbed } from "@/components/site/BookingEmbed";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "Book a free consult",
  description:
    "Book a free 30-minute consultation with Upveraoffer. You leave with a written read on where your job search stands.",
  alternates: { canonical: "/book" },
};

const covered = [
  "Where your search is actually breaking down, based on what you show us",
  "A quick read on your résumé, and the two or three changes that matter most",
  "Which stage to fix first, and roughly how long it should take",
  "Whether we’re the right help, or whether you can do this yourself",
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free consult"
        title="Thirty minutes. No charge. No pitch."
        intro="Bring your résumé and a rough account of your search so far. You’ll leave with a written diagnosis whether or not you ever become a client."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <BookingEmbed />

            <aside className="space-y-5">
              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  What we cover
                </h2>
                <ul className="mt-4 space-y-3">
                  {covered.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-muted"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
                          <path
                            d="m3.5 8.5 3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="photo-frame relative aspect-4/3 overflow-hidden rounded-card border border-border bg-surface-2">
                <Image
                  src={images.bookingConsult.src}
                  alt={images.bookingConsult.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="photo-media object-cover"
                />
              </div>

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  How to prepare
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Send your current résumé ahead of the call if you can, plus a
                  couple of job postings you’re targeting. It means we spend the
                  thirty minutes on advice instead of on catching up.
                </p>
              </Card>

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  No obligation, genuinely
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  There’s no follow-up sequence and no pressure. If we don’t
                  think we can help, we’ll say so on the call and point you
                  somewhere better.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
