import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CTABanner } from "@/components/site/Blocks";
import { getPost, getPostSlugs, getAllPosts, formatDate } from "@/lib/blog";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <div className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              ← All articles
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-subtle">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">
                {post.category}
              </span>
              <span>{post.readingTime} min read</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {post.description}
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <article
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:mt-12 prose-h2:text-2xl
              prose-h3:mt-8 prose-h3:text-xl
              prose-p:text-muted prose-p:leading-relaxed
              prose-li:text-muted prose-li:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-primary prose-a:underline-offset-4
              prose-blockquote:border-l-primary prose-blockquote:bg-surface prose-blockquote:py-1
              prose-blockquote:not-italic prose-blockquote:text-foreground
              prose-code:font-mono prose-code:text-foreground
              prose-table:text-sm prose-th:text-foreground prose-td:text-muted
              dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-border bg-surface">
          <Container>
            <h2 className="font-display text-2xl font-semibold">Keep reading</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                  <Card className="flex h-full flex-col group-hover:border-primary/40">
                    <span className="w-fit rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                      {r.category}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                      {r.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                      {r.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </>
  );
}
