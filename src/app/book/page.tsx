import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, Card } from "@/components/site/Blocks";
import { BookingEmbed } from "@/components/site/BookingEmbed";

export const metadata: Metadata = {
  title: "Book a free consult",
  description:
    "Book a free 30-minute consultation with Upveraoffer. You leave with a written read on where your job search stands.",
  alternates: { canonical: "/book" },
};

const covered = [
  "Where your search is actually breaking down, based on what you show us",
  "A quick read on your résumé — the two or three changes that matter most",
  "Which stage to fix first, and roughly how long it should take",
  "Whether we are the right help, or whether you can do this yourself",
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free consult"
        title="Thirty minutes. No charge. No pitch."
        intro="Bring your résumé and a description of your search so far. You will leave with a written diagnosis whether or not you ever become a client."
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

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  How to prepare
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Send your current résumé ahead of the call if you can, plus one
                  or two job postings you are targeting. It means we spend the
                  thirty minutes on advice rather than on context gathering.
                </p>
              </Card>

              <Card className="bg-surface">
                <h2 className="font-display text-lg font-semibold">
                  No obligation, genuinely
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  There is no follow-up sequence and no pressure. If we do not
                  think we can help, we will tell you on the call and point you
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
