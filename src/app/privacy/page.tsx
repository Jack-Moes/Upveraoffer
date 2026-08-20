import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader } from "@/components/site/Blocks";
import { site } from "@/content/site";

/**
 * ⚠️ TODO(founder): THIS IS A STARTING DRAFT, NOT LEGAL ADVICE.
 *
 * Have a lawyer in your operating jurisdiction review this before launch.
 * It must be checked against the regimes that actually apply to you —
 * GDPR/UK GDPR if you serve the EU or UK, CCPA/CPRA for California
 * residents, and your local consumer and data-protection law.
 *
 * At minimum, confirm: your legal entity name and registered address, your
 * lawful basis for processing, your actual retention periods, every
 * third-party processor you really use, and your data subject request route.
 */

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses, stores, and protects your personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "August 20, 2026"; // TODO(founder): update on every revision

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        intro={`How ${site.name} handles the information you share with us.`}
      />

      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm text-subtle">Last updated: {LAST_UPDATED}</p>

          <div className="prose prose-lg mt-8 max-w-none prose-headings:font-display prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-2xl prose-p:text-muted prose-li:text-muted prose-strong:text-foreground prose-a:text-primary dark:prose-invert">
            <h2>Who we are</h2>
            <p>
              {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides career
              services including résumé writing, interview preparation, and coding
              assessment coaching. For any question about this policy or your data,
              contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Information you give us.</strong> Your name, email address,
                current and target roles, the contents of messages you send, and any
                documents you share with us such as a résumé or portfolio.
              </li>
              <li>
                <strong>Session material.</strong> If you engage us for coaching, the
                recordings, notes, and written feedback produced during your sessions.
              </li>
              <li>
                <strong>Booking information.</strong> If you schedule a call, the name,
                email, and time slot you supply to our scheduling provider.
              </li>
              <li>
                <strong>Basic technical data.</strong> Standard server and analytics
                information such as pages viewed and approximate region. We do not use
                advertising trackers or sell any data.
              </li>
            </ul>

            <h2>Why we use it</h2>
            <ul>
              <li>To reply to your enquiry and arrange a consultation.</li>
              <li>To deliver the services you have engaged us for.</li>
              <li>To handle billing and keep required financial records.</li>
              <li>To improve our own materials and understand how the site is used.</li>
            </ul>
            <p>
              We do not use your personal information for automated decision-making, and
              we do not sell or rent it to anyone.
            </p>

            <h2>Confidentiality of your job search</h2>
            <p>
              We treat the fact that you are searching as confidential. We will not
              disclose your identity, your materials, your recordings, or the companies
              you are targeting to any third party. We will never publish a testimonial,
              quote, or case study identifying you without your prior written permission.
            </p>

            <h2>Who we share it with</h2>
            <p>
              We share information only with service providers who help us operate, and
              only to the extent they need it — for example our website host, email
              delivery provider, scheduling tool, and payment processor. Each is bound to
              protect it. We may also disclose information where the law requires it.
            </p>
            {/* TODO(founder): list your actual processors by name here — most
                privacy regimes expect specificity, not a generic category list. */}

            <h2>How long we keep it</h2>
            <p>
              Enquiries that do not become engagements are deleted within twelve months.
              Client records are retained for as long as we work together and afterwards
              only as long as tax and accounting law requires. Session recordings are
              deleted on request at any time.
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access a copy of
              your data, correct it, delete it, restrict or object to its use, or receive
              it in a portable format. To exercise any of these, email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within thirty
              days and never charge for a first request.
            </p>

            <h2>Security</h2>
            <p>
              We use encrypted transport, access controls, and reputable providers.
              No system is perfectly secure, so please do not send us information you
              would not want stored — such as national identity numbers or bank details —
              unless we have specifically asked for it.
            </p>

            <h2>Children</h2>
            <p>
              Our services are intended for adults. We do not knowingly collect
              information from anyone under sixteen.
            </p>

            <h2>Changes</h2>
            <p>
              If we change this policy we will update the date at the top of this page,
              and we will notify active clients directly where the change is significant.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
