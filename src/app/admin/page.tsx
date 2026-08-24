import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Card } from "@/components/site/Blocks";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { getAllPosts } from "@/lib/blog";
import {
  getAdminConfiguration,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { plans } from "@/content/pricing";
import { getTestimonials } from "@/content/testimonials";
import { logoutAdmin } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "Private site operations dashboard.",
  robots: { index: false, follow: false, noarchive: true },
};

type Status = "ready" | "attention" | "review";

const statusStyles: Record<Status, string> = {
  ready: "bg-accent-soft text-accent-strong",
  attention: "bg-red-500/10 text-red-700 dark:text-red-300",
  review: "bg-primary-soft text-primary",
};

function StatusBadge({ status }: { status: Status }) {
  const labels: Record<Status, string> = {
    ready: "Ready",
    attention: "Needs attention",
    review: "Review",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function AdminSetup() {
  return (
    <Section>
      <Container className="max-w-xl">
        <Card className="p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Admin setup
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold">
            Secure the dashboard first.
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            Add the following server-only environment variables locally and in
            Vercel, then restart or redeploy the site. The dashboard stays locked
            until both secrets meet the minimum lengths.
          </p>
          <div className="mt-6 space-y-2 rounded-2xl bg-ink p-5 font-mono text-sm text-ink-foreground">
            <p>ADMIN_USERNAME=admin</p>
            <p>ADMIN_PASSWORD=use-at-least-12-characters</p>
            <p>ADMIN_SESSION_SECRET=use-a-random-32-character-secret</p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-subtle">
            Do not commit real values. Generate the session secret with a password
            manager or a cryptographically secure random generator.
          </p>
          <ButtonLink href="/" variant="secondary" className="mt-7">
            Return to the site
          </ButtonLink>
        </Card>
      </Container>
    </Section>
  );
}

function AdminLogin({ username }: { username: string }) {
  return (
    <Section>
      <Container className="max-w-md">
        <Card className="p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Private area
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold">
            Admin sign in
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            Use the owner credentials configured for this deployment.
          </p>
          <AdminLoginForm username={username} />
        </Card>
      </Container>
    </Section>
  );
}

export default async function AdminPage() {
  const configuration = getAdminConfiguration();
  if (!configuration.configured) return <AdminSetup />;
  if (!(await isAdminAuthenticated())) {
    return <AdminLogin username={configuration.username} />;
  }

  const posts = getAllPosts();
  const testimonials = getTestimonials();
  const contactConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL,
  );

  const checks: {
    title: string;
    detail: string;
    status: Status;
    href: string;
  }[] = [
    {
      title: "Founder and business identity",
      detail:
        site.founder.name && site.founder.photo
          ? `${site.founder.name} is published as the lead coach.`
          : "Founder name, portrait, biography, and verifiable credentials are still missing.",
      status:
        site.founder.name && site.founder.photo ? "ready" : "attention",
      href: "/about",
    },
    {
      title: "Consultation booking",
      detail: site.calcom
        ? `Cal.com is connected with ${site.calcom}.`
        : "Cal.com is not connected; visitors are sent to the contact fallback.",
      status: site.calcom ? "ready" : "attention",
      href: "/book",
    },
    {
      title: "Contact delivery",
      detail: contactConfigured
        ? "Resend and the sending address are configured on this server."
        : "Resend credentials are missing; form submissions cannot be delivered.",
      status: contactConfigured ? "ready" : "attention",
      href: "/contact",
    },
    {
      title: "Client proof",
      detail:
        testimonials.length > 0
          ? `${testimonials.length} testimonials are published. Verify every quote, result, name, and portrait has written permission.`
          : "No testimonials are published; the results page uses its honest empty state.",
      status: testimonials.length > 0 ? "attention" : "ready",
      href: "/success-stories",
    },
    {
      title: "Pricing",
      detail: `${plans.length} packages are public. Confirm prices, scope, and refund terms before taking payment.`,
      status: "review",
      href: "/pricing",
    },
    {
      title: "Legal documents",
      detail:
        "Privacy and terms pages are starting drafts and still require jurisdiction-specific review.",
      status: "attention",
      href: "/privacy",
    },
  ];

  return (
    <>
      <div className="border-b border-border bg-surface">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Private dashboard
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold">
                Site administration
              </h1>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                A source-backed view of content, integrations, and launch readiness.
              </p>
            </div>
            <form action={logoutAdmin}>
              <button type="submit" className={buttonClass("secondary")}>
                Sign out
              </button>
            </form>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: services.length, label: "Services" },
              { value: plans.length, label: "Pricing packages" },
              { value: posts.length, label: "Blog posts" },
              { value: testimonials.length, label: "Testimonials" },
            ].map((item) => (
              <Card key={item.label} className="bg-surface">
                <p className="font-display text-3xl font-semibold text-primary">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Launch checklist
              </h2>
              <p className="mt-2 text-muted">
                Resolve every red item before directing customers to the site.
              </p>
            </div>
            <ButtonLink href="/" variant="secondary">
              View homepage
            </ButtonLink>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {checks.map((check) => (
              <Card key={check.title} className="flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold">
                    {check.title}
                  </h3>
                  <StatusBadge status={check.status} />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {check.detail}
                </p>
                <Link
                  href={check.href}
                  className="mt-5 text-sm font-medium text-primary underline underline-offset-4"
                >
                  Inspect public page
                </Link>
              </Card>
            ))}
          </div>

          <Card className="mt-12 border-primary/30 bg-primary-soft">
            <h2 className="font-display text-xl font-semibold">Editing content</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">
              This deployment reads content from <code>src/content</code>. Update
              those files through the repository and deploy the commit; browser-based
              editing would require a persistent CMS or database integration.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
