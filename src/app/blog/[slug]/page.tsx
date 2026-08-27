import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CTABanner } from "@/components/site/Blocks";
import { getPost, getAllPosts, formatDate } from "@/lib/blog";
import { site } from "@/content/site";

type Params = { slug: string };

export const dynamic = "force-dynamic";

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
      // Falls back to the site-wide generated card when a post has no cover.
      ...(post.cover
        ? { images: [{ url: post.cover, width: 1600, height: 900, alt: post.coverAlt }] }
        : {}),
    },
    ...(post.cover ? { twitter: { card: "summary_large_image", images: [post.cover] } } : {}),
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

  const related = (await getAllPosts())
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
      <div className="relative overflow-hidden border-b border-border bg-surface">
        <div aria-hidden="true" className="absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <Container className="relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
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
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
              {post.description}
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">U</span>
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="text-xs text-subtle">Practical job-search field notes</p>
              </div>
            </div>
          </div>
          {post.cover && (
            <figure>
              <div className="photo-frame relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-2 shadow-2xl shadow-primary/15">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                priority
                className="photo-media object-cover"
              />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/20 via-transparent to-transparent" />
              </div>
              {post.coverCredit && (
                <figcaption className="mt-3 text-right text-xs text-subtle">
                  Photo by{" "}
                  <a href={post.coverCreditUrl} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 hover:text-primary">
                    {post.coverCredit}
                  </a>{" "}
                  on Unsplash
                </figcaption>
              )}
            </figure>
          )}
          </div>
        </Container>
      </div>

      <Section className="bg-background">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,46rem)_16rem] lg:justify-center">
            <article
            id="article"
            className="prose prose-lg max-w-none rounded-xl border border-border bg-background p-7 shadow-sm sm:p-10
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
            <aside className="hidden lg:sticky lg:top-28 lg:block">
              <div className="overflow-hidden rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Guide details</p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between gap-3 border-b border-border pb-3">
                    <dt className="text-subtle">Topic</dt>
                    <dd className="font-medium">{post.category}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border pb-3">
                    <dt className="text-subtle">Reading time</dt>
                    <dd className="font-medium">{post.readingTime} min</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-subtle">Published</dt>
                    <dd className="text-right font-medium">{formatDate(post.date)}</dd>
                  </div>
                </dl>
                <Link href="/book" className="mt-6 flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary-hover">
                  Apply it to my search
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-border bg-surface">
          <Container>
            <h2 className="font-display text-2xl font-semibold">Keep reading</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                  <Card className="flex h-full flex-col overflow-hidden p-0 group-hover:border-primary/40">
                    {r.cover && (
                      <div className="photo-frame relative aspect-[16/9] overflow-hidden bg-surface-2">
                        <Image
                          src={r.cover}
                          alt={r.coverAlt}
                          fill
                          sizes="(min-width: 768px) 22rem, 100vw"
                          className="photo-media object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <span className="w-fit rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                        {r.category}
                      </span>
                      <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                        {r.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                        {r.description}
                      </p>
                    </div>
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
