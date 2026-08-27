import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminControlCenter } from "@/components/admin/AdminControlCenter";
import { Card } from "@/components/site/Blocks";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { getAllPostDrafts, getAllPosts } from "@/lib/blog";
import {
  getAdminConfiguration,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { site } from "@/content/site";
import {
  getAdminFeedbackEntries,
  getPublicPlans,
  getPublicTestimonials,
} from "@/lib/managed-content";
import { readAdminStore } from "@/lib/admin-store";
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
            Add the following server-only environment variables locally and as
            Cloudflare Worker secrets, then restart or redeploy the site. The
            dashboard stays locked until both secrets meet the minimum lengths.
          </p>
          <div className="mt-6 space-y-2 rounded-2xl bg-ink p-5 font-mono text-sm text-ink-foreground">
            <p>ADMIN_USERNAME=admin</p>
            <p>ADMIN_PASSWORD=use-at-least-6-characters</p>
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
    <Section className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative max-w-4xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl shadow-primary/10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-ink p-8 text-ink-foreground sm:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/35 blur-3xl" />
            <div className="relative flex h-full min-h-80 flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary font-display text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/30">U</span>
              <div className="mt-auto">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Owner workspace</p>
                <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Everything important, in one view.</h1>
                <p className="mt-4 leading-relaxed text-ink-foreground/65">Review content, integrations, client proof, and launch readiness without exposing private controls to visitors.</p>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Private area</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Welcome back</h2>
            <p className="mt-3 leading-relaxed text-muted">Sign in with the owner credentials for this deployment.</p>
            <AdminLoginForm username={username} />
          </div>
        </div>
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

  const [
    posts,
    postDrafts,
    testimonials,
    feedbackEntries,
    plans,
    adminStore,
  ] = await Promise.all([
    getAllPosts(),
    getAllPostDrafts(),
    getPublicTestimonials(),
    getAdminFeedbackEntries(),
    getPublicPlans(),
    readAdminStore(),
  ]);
  const emailConfigured = Boolean(
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
        ? `Cal.com is connected with ${site.calcom}; calls can also be tracked below.`
        : "The built-in consultation request form and booking tracker are active.",
      status: "ready",
      href: "/book",
    },
    {
      title: "Contact delivery",
      detail: emailConfigured
        ? "Messages are saved to the inbox and Resend email notifications are active."
        : "Messages are saved to the inbox. Resend email notifications are not configured.",
      status: emailConfigured ? "ready" : "review",
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
  const readyCount = checks.filter((check) => check.status === "ready").length;
  const readiness = Math.round((readyCount / checks.length) * 100);

  return (
    <>
      <div className="bg-surface py-8 sm:py-10">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-ink-foreground shadow-2xl shadow-primary/15 sm:p-12">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Private dashboard
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                Good to see you.
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-foreground/65">
                Here is the current health of Upveraoffer’s content, integrations, and launch checklist.
              </p>
            </div>
            <form action={logoutAdmin}>
              <button type="submit" className={buttonClass("secondary", "md", "border-white/15 bg-white/10 text-white hover:bg-white/15")}>
                Sign out
              </button>
            </form>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: adminStore.messages.filter((message) => message.status === "new").length, label: "New messages" },
              { value: adminStore.bookings.filter((booking) => booking.status === "requested").length, label: "Call requests" },
              { value: posts.length, label: "Blog posts" },
              { value: plans.length, label: "Pricing packages" },
            ].map((item) => (
              <Card key={item.label} className="group relative overflow-hidden bg-surface p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <span aria-hidden="true" className="absolute -right-3 -top-5 font-display text-8xl font-semibold text-primary/5">{item.value}</span>
                <p className="font-display text-3xl font-semibold text-primary">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_2fr]">
            <Card className="bg-primary-soft p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Readiness score</p>
              <div className="mt-4 flex items-end gap-2">
                <p className="font-display text-5xl font-semibold text-primary">{readiness}</p>
                <span className="mb-1 text-lg text-muted">%</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full bg-linear-to-r from-primary to-accent" style={{ width: `${readiness}%` }} />
              </div>
            </Card>
            <Card className="flex flex-col justify-center bg-surface p-7 sm:p-8">
              <p className="font-display text-xl font-semibold">Your next best move</p>
              <p className="mt-3 leading-relaxed text-muted">Replace demonstration testimonials and add a genuine founder profile first. Those two changes create more trust than any additional visual polish.</p>
            </Card>
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

        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <AdminControlCenter
            messages={adminStore.messages}
            bookings={adminStore.bookings}
            plans={plans}
            posts={postDrafts}
            feedback={feedbackEntries}
          />
        </Container>
      </Section>
    </>
  );
}
