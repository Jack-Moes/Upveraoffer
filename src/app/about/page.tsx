import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { PageHeader, Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { site } from "@/content/site";
import { getOpenJobs } from "@/lib/careers";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Upveraoffer exists, what we believe about job searching, and how we work with the people we take on.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "The market is not a meritocracy",
    body: "Plenty of excellent engineers go unhired for months because their materials misrepresent them and nobody ever tells them why. Presentation is not the same as substance, but a search fails without both.",
  },
  {
    title: "Feedback has to be specific to be useful",
    body: "“Be more confident” is not feedback. “You spent ninety seconds on setup and thirty on your own decisions — invert that” is. We give the second kind, in writing, after every session.",
  },
  {
    title: "Practice beats advice",
    body: "Nobody has ever read their way to being good at interviews. The gains come from doing the thing under pressure and being corrected immediately afterwards.",
  },
  {
    title: "Honesty is the whole product",
    body: "We will tell you when your résumé is not ready, when your target is unrealistic, and when you do not need to hire us. A service that only ever agrees with you is worth nothing.",
  },
];

export default function AboutPage() {
  const openRoles = getOpenJobs();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We built the service we wanted during our own job searches."
        intro="Upveraoffer exists because the gap between being capable and being hired is real, unfair, and almost entirely fixable with structure and honest feedback."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
            <div className="max-w-2xl">
              <Eyebrow>Our story</Eyebrow>
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                {/* TODO(founder): replace the three paragraphs below with your
                    real story — why you started this, what you did before, and
                    what you saw that made the gap obvious. Specific beats
                    polished; people hire the person, not the prose. */}
                <p>
                  Every job search produces the same quiet moment: dozens of
                  applications sent, no replies, and no way to tell whether the
                  problem is the market, the résumé, or something invisible in
                  between. Nobody writes back to explain.
                </p>
                <p>
                  We started {site.name} to close that feedback loop. Not with
                  motivational advice, and not with a template — with a
                  diagnostic that tells you precisely which part of your search
                  is failing, then the work to fix it.
                </p>
                <p>
                  We work with a deliberately small number of clients at a time.
                  The work is hands-on, the feedback is direct, and we would
                  rather turn someone away than take money for a package that
                  does not match what they need.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Card className="bg-surface">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Founded
                </p>
                <p className="mt-2 font-display text-3xl font-semibold">
                  {site.foundedYear}
                </p>
              </Card>
              <Card className="bg-surface">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Where we work
                </p>
                <p className="mt-2 font-display text-xl font-semibold">
                  Remote, worldwide
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Sessions are scheduled to your time zone, not ours.
                </p>
              </Card>
              <Card className="bg-surface">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Get in touch
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block font-display text-lg font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </Card>

              {openRoles.length > 0 && (
                <Card className="border-primary/40 bg-primary-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    We are hiring
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold">
                    {openRoles.length} open{" "}
                    {openRoles.length === 1 ? "role" : "roles"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Published salary bands, paid take-homes, and a reply to every
                    application.
                  </p>
                  <Link
                    href="/careers"
                    className="mt-4 inline-block font-medium text-primary underline underline-offset-4"
                  >
                    See open roles
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Four things that shape how we work."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {beliefs.map((b) => (
              <Card key={b.title}>
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* TODO(founder): add a team section here once you have coach bios —
          name, photo, one paragraph of relevant credentials. Real credentials
          are the single strongest trust signal on a page like this. */}

      <CTABanner
        title="Talk to us before you decide anything."
        body="The consult is genuinely free and genuinely useful. Worst case, you get an honest outside read on your search and go do it yourself."
        secondary={{ href: "/faq", label: "Read the FAQ" }}
      />
    </>
  );
}
