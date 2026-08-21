import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader } from "@/components/site/Blocks";
import { site } from "@/content/site";

/**
 * ⚠️ TODO(founder): THIS IS A STARTING DRAFT, NOT LEGAL ADVICE.
 *
 * Have a lawyer in your operating jurisdiction review this before launch.
 * Consumer-protection law in many countries overrides terms like these —
 * statutory cooling-off periods, mandatory refund rights, and limits on
 * liability exclusions in particular. Confirm your entity name, governing
 * law, dispute forum, and refund terms match what you will actually honor.
 */

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms that apply when you engage ${site.name} for career services.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "August 20, 2026"; // TODO(founder): update on every revision

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of service"
        intro={`The agreement between you and ${site.legalName} when you use our services.`}
      />

      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm text-subtle">Last updated: {LAST_UPDATED}</p>

          <div className="prose prose-lg mt-8 max-w-none prose-headings:font-display prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-2xl prose-p:text-muted prose-li:text-muted prose-strong:text-foreground prose-a:text-primary dark:prose-invert">
            <h2>1. What these terms cover</h2>
            <p>
              These terms apply when you use this website or engage {site.legalName} for
              any service. By booking a consultation or purchasing a package you accept
              them. If you do not accept them, please do not use the services.
            </p>

            <h2>2. What we provide</h2>
            <p>
              We provide career support services: résumé and CV writing, interview
              preparation and mock interviews, and coding assessment coaching. The precise
              scope of your engagement is whatever is described in the package you
              purchase or in a written agreement between us.
            </p>

            <h2>3. What we do not promise</h2>
            <p>
              <strong>We do not guarantee employment.</strong> We do not guarantee
              interviews, offers, salary outcomes, or that any particular employer will
              respond to you. Hiring depends on market conditions, timing, employer
              preferences, and your own performance, none of which we control. Any
              example outcomes described on this site are illustrative and are not a
              prediction of your results.
            </p>

            <h2>4. Your responsibilities</h2>
            <ul>
              <li>
                Provide accurate information. Everything we write about you is based on
                what you tell us, and <strong>we will not misrepresent your experience,
                qualifications, employment dates, or credentials</strong>. If you ask us
                to, we will decline and may end the engagement.
              </li>
              <li>Attend scheduled sessions or reschedule with reasonable notice.</li>
              <li>
                Review drafts and give feedback within the timeframes we agree, so the
                work can be completed.
              </li>
            </ul>

            <h2>5. Scheduling and missed sessions</h2>
            <p>
              Sessions can be rescheduled free of charge with at least twenty-four hours
              notice. A session missed without notice may be counted as delivered. We
              will always be reasonable about genuine emergencies.
            </p>

            <h2>6. Fees and payment</h2>
            <p>
              Fees are as stated at the time of purchase. Payment plans are available on
              request and must be kept current for work to continue. Prices may change
              for new clients at any time, but never for an engagement already agreed.
            </p>

            <h2>7. Refunds</h2>
            <p>
              If you are unhappy after your first working session and no deliverable has
              been produced, you may request a full refund. After delivery has begun,
              refunds are prorated against work completed and sessions delivered. Where
              consumer law in your jurisdiction grants you stronger rights, those rights
              apply and nothing here limits them.
            </p>

            <h2>8. Intellectual property</h2>
            <p>
              The documents and written feedback we produce for you are yours to use
              freely once paid for. Our underlying frameworks, templates, curricula, and
              site content remain ours, and may not be resold or redistributed as a
              competing service.
            </p>

            <h2>9. Confidentiality</h2>
            <p>
              We keep your engagement confidential as described in our{" "}
              <a href="/privacy">privacy policy</a>. Session recordings belong to you and
              are never published or shared. We will not name you publicly without your
              written permission.
            </p>

            <h2>10. Acceptable use</h2>
            <p>
              You may not use our services to prepare fraudulent applications, to
              misrepresent another person, or to gain an unfair advantage through
              dishonest means, including having us complete a live assessment on
              your behalf. We will end an engagement without refund if this happens.
            </p>

            <h2>11. Limitation of liability</h2>
            <p>
              To the extent permitted by law, our total liability arising from an
              engagement is limited to the amount you paid us for it. We are not liable
              for indirect or consequential losses, including lost earnings or lost
              opportunities. Nothing here excludes liability that cannot lawfully be
              excluded.
            </p>

            <h2>12. Ending an engagement</h2>
            <p>
              Either of us may end an engagement in writing at any time. If we end it
              without cause, we refund the unused portion. If you end it, section 7
              applies.
            </p>

            <h2>13. Governing law</h2>
            <p>
              {/* TODO(founder): insert your actual governing law and forum. */}
              These terms are governed by the laws of the jurisdiction in which{" "}
              {site.legalName} is established, and disputes will be handled by the courts
              of that jurisdiction, unless mandatory local law entitles you to bring a
              claim elsewhere.
            </p>

            <h2>14. Contact</h2>
            <p>
              Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
