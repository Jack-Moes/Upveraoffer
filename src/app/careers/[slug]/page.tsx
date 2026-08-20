import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { Card } from "@/components/site/Blocks";
import { getJob, getJobSlugs, getOpenJobs, formatSalary, formatDate } from "@/lib/careers";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return {};
  return {
    // The location contains an em dash of its own, so keep it out of the
    // title template and let the summary carry it instead.
    title: job.title,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: {
      type: "article",
      title: `${job.title} at ${site.name}`,
      description: job.summary,
      publishedTime: job.postedDate,
    },
  };
}

/** schema.org uses SCREAMING_SNAKE for employment type. */
const EMPLOYMENT_TYPE_LD: Record<string, string> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Internship: "INTERN",
};

export default async function JobPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const pay = formatSalary(job.salary);
  const applyTo = job.applyEmail || site.careersEmail;
  const mailto = `mailto:${applyTo}?subject=${encodeURIComponent(
    `Application — ${job.title}`,
  )}`;
  const otherRoles = getOpenJobs().filter((j) => j.slug !== job.slug);

  const isRemote = job.workplace === "Remote";

  /**
   * JobPosting structured data — this is what puts the role into Google Jobs.
   *
   * applicantLocationRequirements is emitted only when the post lists real
   * countries in `applicantCountries`. Google expects country names there, so
   * emitting something like "Worldwide" would be worse than omitting it.
   */
  const jobLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.html,
    identifier: {
      "@type": "PropertyValue",
      name: site.name,
      value: job.slug,
    },
    datePosted: job.postedDate,
    ...(job.closingDate ? { validThrough: job.closingDate } : {}),
    employmentType: EMPLOYMENT_TYPE_LD[job.employmentType] ?? "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
    },
    ...(isRemote
      ? {
          jobLocationType: "TELECOMMUTE",
          ...(job.applicantCountries.length > 0
            ? {
                applicantLocationRequirements: job.applicantCountries.map((c) => ({
                  "@type": "Country",
                  name: c,
                })),
              }
            : {}),
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: job.location },
          },
        }),
    ...(job.salary.min !== null || job.salary.max !== null
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.salary.currency,
            value: {
              "@type": "QuantitativeValue",
              ...(job.salary.min !== null ? { minValue: job.salary.min } : {}),
              ...(job.salary.max !== null ? { maxValue: job.salary.max } : {}),
              unitText: job.salary.period.toUpperCase(),
            },
          },
        }
      : {}),
    directApply: true,
  };

  return (
    <>
      {/* ------------------------------------------------------------ Header */}
      <div className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <Link
            href="/careers"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            ← All open roles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
              {job.department}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
              {job.workplace}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
              {job.employmentType}
            </span>
            {!job.open && (
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-subtle">
                Closed
              </span>
            )}
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
            {job.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {job.summary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={mailto} size="lg">
              Apply for this role
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#how-we-interview" size="lg" variant="secondary">
              See the interview process
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* -------------------------------------------------------------- Body */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <article
              id="how-we-interview"
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:mt-12 prose-h2:text-2xl
                prose-h3:mt-8 prose-h3:text-xl
                prose-p:text-muted prose-p:leading-relaxed
                prose-li:text-muted prose-li:leading-relaxed
                prose-strong:text-foreground
                prose-a:text-primary prose-a:underline-offset-4
                prose-ol:text-muted
                dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: job.html }}
            />

            {/* Sticky summary rail */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Card className="bg-surface">
                <h2 className="font-display text-base font-semibold">
                  Role at a glance
                </h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                      Location
                    </dt>
                    <dd className="mt-1 text-foreground">{job.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                      Type
                    </dt>
                    <dd className="mt-1 text-foreground">
                      {job.employmentType} · {job.workplace}
                    </dd>
                  </div>
                  {job.experience && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                        Experience
                      </dt>
                      <dd className="mt-1 text-foreground">{job.experience}</dd>
                    </div>
                  )}
                  {pay && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                        Salary band
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">{pay}</dd>
                    </div>
                  )}
                  {job.postedDate && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                        Posted
                      </dt>
                      <dd className="mt-1 text-foreground">
                        <time dateTime={job.postedDate}>
                          {formatDate(job.postedDate)}
                        </time>
                      </dd>
                    </div>
                  )}
                  {job.closingDate && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-subtle">
                        Closes
                      </dt>
                      <dd className="mt-1 text-foreground">
                        <time dateTime={job.closingDate}>
                          {formatDate(job.closingDate)}
                        </time>
                      </dd>
                    </div>
                  )}
                </dl>

                <ButtonLink href={mailto} className="mt-6 w-full">
                  Apply now
                </ButtonLink>
                <p className="mt-3 text-center text-xs text-subtle">
                  Every application gets a reply.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Other roles */}
      {otherRoles.length > 0 && (
        <Section className="border-t border-border bg-surface">
          <Container>
            <h2 className="font-display text-2xl font-semibold">Other open roles</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {otherRoles.map((other) => (
                <Link key={other.slug} href={`/careers/${other.slug}`} className="group">
                  <Card className="flex h-full flex-col group-hover:border-primary/40">
                    <span className="w-fit rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                      {other.department}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold group-hover:text-primary">
                      {other.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                      {other.summary}
                    </p>
                    <p className="mt-4 text-sm text-subtle">
                      {other.location} · {other.employmentType}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
      />
    </>
  );
}
