import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { Card, CTABanner } from "@/components/site/Blocks";
import { getAllPosts, getCategories, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides on résumé writing, interview preparation, and coding assessments. The same material we teach clients.",
  alternates: { canonical: "/blog" },
};

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 10h11m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const [featured, ...rest] = posts;
  const totalReadingTime = posts.reduce((total, post) => total + post.readingTime, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div aria-hidden="true" className="ambient-float absolute -right-28 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-48 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <Container className="relative py-20 sm:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="fade-up max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                The Upveraoffer field guide
              </div>
              <h1 className="mt-7 font-display text-5xl leading-[0.94] sm:text-6xl lg:text-7xl">
                Useful advice for the
                <span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  moments that matter.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                Practical playbooks for stronger résumés, sharper interviews,
                and calmer coding tests. No email gate and no recycled filler.
              </p>
              {categories.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted shadow-sm">
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="fade-up-delay relative overflow-hidden rounded-xl bg-ink p-7 text-ink-foreground shadow-2xl shadow-primary/15 sm:p-8">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/35 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-foreground/60">Resource library</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-accent">✦</span>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-display text-4xl font-semibold">{posts.length}</p>
                    <p className="mt-1 text-sm text-ink-foreground/60">Deep guides</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-semibold">{totalReadingTime}</p>
                    <p className="mt-1 text-sm text-ink-foreground/60">Minutes of tactics</p>
                  </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-sm leading-relaxed text-ink-foreground/70">
                    Built from the same frameworks used in client sessions, made useful enough to apply on your own.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {posts.length === 0 ? (
        <Section>
          <Container>
            <Card className="bg-surface p-10 text-center">
              <h2 className="font-display text-xl font-semibold">Articles are on the way</h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">We’re writing the first pieces now. Check back shortly.</p>
            </Card>
          </Container>
        </Section>
      ) : (
        <Section>
          <Container>
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Start here</p>
                <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">The latest playbook</h2>
              </div>
              <p className="hidden max-w-sm text-right text-sm leading-relaxed text-muted md:block">Specific changes you can make before your next application.</p>
            </div>

            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="editorial-grid relative overflow-hidden rounded-xl bg-ink text-ink-foreground shadow-2xl shadow-primary/10">
                <div aria-hidden="true" className="absolute -right-16 -top-28 h-80 w-80 rounded-full border border-primary/25" />
                <div className="relative z-10 flex min-h-[30rem] max-w-4xl flex-col justify-center p-8 sm:p-12 lg:p-14">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-foreground/60">
                    <span className="rounded-full bg-white/10 px-3 py-1.5 font-medium text-accent">{featured.category}</span>
                    <span>{featured.readingTime} min read</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(featured.date)}</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-semibold leading-tight sm:text-4xl">{featured.title}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-ink-foreground/70">{featured.description}</p>
                  <span className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform group-hover:translate-x-1">
                    Read the guide <Arrow />
                  </span>
                </div>
              </article>
            </Link>

            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {rest.map((post, index) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                      <div className="flex flex-1 flex-col p-7 sm:p-8">
                        <span className="mb-10 font-mono text-xs text-primary">/0{index + 2}</span>
                        <div className="flex items-center gap-2 text-xs text-subtle">
                          <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">{post.category}</span>
                          <span>{post.readingTime} min read</span>
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-semibold leading-snug transition-colors group-hover:text-primary">{post.title}</h3>
                        <p className="mt-4 flex-1 leading-relaxed text-muted">{post.description}</p>
                        <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                          <time className="text-xs text-subtle" dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Arrow /></span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </Section>
      )}

      <CTABanner
        title="Want this applied to your actual search?"
        body="Reading is the cheap part. The consult is where we look at your actual materials and tell you what to change."
        secondary={{ href: "/services", label: "See our services" }}
      />
    </>
  );
}
