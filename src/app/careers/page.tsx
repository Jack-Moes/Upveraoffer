import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { PageHeader, Card, SectionHeading } from "@/components/site/Blocks";
import { getOpenJobs, formatSalary } from "@/lib/careers";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Upveraoffer. We run the hiring process we wish everyone ran — every stage published up front, paid take-homes, and feedback whatever the outcome.",
  alternates: { canonical: "/careers" },
};

const principles = [
  {
    title: "We hire the way we teach",
    body: "Every stage of our loop is published before you apply. Take-home exercises are timeboxed and paid. Everyone who applies gets a reply, and everyone who interviews gets feedback — including the people we turn down.",
  },
  {
    title: "Salary bands are published and real",
    body: "The band on the post is the band. We do not pay differently based on how hard someone negotiates, and we never ask what you currently earn.",
  },
  {
    title: "Remote, asynchronous, adult",
    body: "Work from wherever you are, in whatever hours suit you, with a small agreed overlap. We measure what ships, not when you were online.",
  },
  {
    title: "Small team, real ownership",
    body: "You will own systems outright rather than a slice of someone else's. Decisions get made by the person closest to the problem.",
  },
];

export default function CareersPage() {
  const jobs = getOpenJobs();

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Come build the thing we wish had existed."
        intro="We help people through job searches for a living, which makes our own hiring process a fair test of whether we mean any of it. So we published the whole thing."
      />

      {/* --------------------------------------------------------- Openings */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title={
                jobs.length === 0
                  ? "No open roles right now"
                  : `Open ${jobs.length === 1 ? "role" : "roles"}`
              }
            />
            {jobs.length > 0 && (
              <p className="text-sm text-subtle">
                {jobs.length} {jobs.length === 1 ? "position" : "positions"} accepting
                applications
              </p>
            )}
          </div>

          {jobs.length === 0 ? (
            <Card className="mt-10 bg-surface p-10 text-center">
              <h3 className="font-display text-xl font-semibold">
                Nothing open at the moment
              </h3>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
                We are not hiring right now, but that changes. If you would be a
                strong fit for a team like ours, send a note anyway — we keep good
                applications on file and we do reply.
              </p>
              <ButtonLink
                href={`mailto:${site.careersEmail}`}
                className="mt-6"
                variant="secondary"
              >
                {site.careersEmail}
              </ButtonLink>
            </Card>
          ) : (
            <ul className="mt-10 space-y-4">
              {jobs.map((job) => {
                const pay = formatSalary(job.salary);
                return (
                  <li key={job.slug}>
                    <Link href={`/careers/${job.slug}`} className="group block">
                      <Card className="group-hover:border-primary/40">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                          <div className="max-w-2xl">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                                {job.department}
                              </span>
                              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
                                {job.workplace}
                              </span>
                              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
                                {job.employmentType}
                              </span>
                            </div>

                            <h3 className="mt-4 font-display text-2xl font-semibold group-hover:text-primary">
                              {job.title}
                            </h3>
                            <p className="mt-3 leading-relaxed text-muted">
                              {job.summary}
                            </p>

                            {job.highlights.length > 0 && (
                              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                                {job.highlights.map((h) => (
                                  <li
                                    key={h}
                                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div className="shrink-0 rounded-2xl bg-surface p-5 lg:w-64">
                            <dl className="space-y-3 text-sm">
                              <div>
                                <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                                  Location
                                </dt>
                                <dd className="mt-1 text-foreground">{job.location}</dd>
                              </div>
                              {job.experience && (
                                <div>
                                  <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                                    Experience
                                  </dt>
                                  <dd className="mt-1 text-foreground">
                                    {job.experience}
                                  </dd>
                                </div>
                              )}
                              {pay && (
                                <div>
                                  <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                                    Salary
                                  </dt>
                                  <dd className="mt-1 font-medium text-foreground">
                                    {pay}
                                  </dd>
                                </div>
                              )}
                            </dl>
                            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                              View role
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </Section>

      {/* -------------------------------------------------------- Principles */}
      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="How we hire"
            title="The parts most companies leave vague."
            intro="We spend our days watching people get treated badly by hiring processes. It would be strange to run one of those ourselves."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map((p) => (
              <Card key={p.title}>
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Open appl. */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 sm:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
            />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink-foreground sm:text-4xl">
                No role that fits? Write anyway.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-foreground/70">
                We are small and the roles we post are the ones we already knew we
                needed. If you can do something we have not thought to ask for, tell
                us what it is and what you would do with it here.
              </p>
              <ButtonLink
                href={`mailto:${site.careersEmail}?subject=Open%20application`}
                size="lg"
                className="mt-8"
              >
                Email {site.careersEmail}
                <ArrowRight />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
