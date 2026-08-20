import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, Card, CTABanner } from "@/components/site/Blocks";
import { getAllPosts, getCategories, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides on résumé writing, interview preparation, and coding assessments — the same material we teach clients.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Free material, no email required."
        intro="Everything here is what we would tell a client. If you can use it without hiring us, that is a good outcome."
      />

      {posts.length === 0 ? (
        <Section>
          <Container>
            <Card className="bg-surface p-10 text-center">
              <h2 className="font-display text-xl font-semibold">
                Articles are on the way
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
                We are writing the first pieces now. Check back shortly.
              </p>
            </Card>
          </Container>
        </Section>
      ) : (
        <Section>
          <Container>
            {categories.length > 1 && (
              <div className="mb-10 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* Featured: the most recent post gets the wide treatment. */}
            <Link href={`/blog/${featured.slug}`} className="group block">
              <Card className="grid gap-8 p-8 group-hover:border-primary/40 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="flex items-center gap-2 text-xs text-subtle">
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">
                      {featured.category}
                    </span>
                    <span>{featured.readingTime} min read</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(featured.date)}</span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold leading-tight group-hover:text-primary">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">
                    {featured.description}
                  </p>
                </div>
                <div className="flex items-end">
                  <span className="text-sm font-medium text-primary underline-offset-4 group-hover:underline">
                    Read the article →
                  </span>
                </div>
              </Card>
            </Link>

            {rest.length > 0 && (
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <Card className="flex h-full flex-col group-hover:border-primary/40">
                      <div className="flex items-center gap-2 text-xs text-subtle">
                        <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">
                          {post.category}
                        </span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <h2 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                        {post.description}
                      </p>
                      <p className="mt-5 text-xs text-subtle">
                        {formatDate(post.date)}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </Section>
      )}

      <CTABanner
        title="Want this applied to your actual search?"
        body="Reading is the cheap part. The consult is where we look at your specific materials and tell you what to change."
        secondary={{ href: "/services", label: "See our services" }}
      />
    </>
  );
}
