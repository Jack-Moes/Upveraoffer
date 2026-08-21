/**
 * Client feedback.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HOW THIS WORKS
 *
 *   `testimonials`        Real, permissioned client feedback. Currently empty
 *                         because Upveraoffer has no clients yet.
 *
 *   `sampleTestimonials`  Demonstration content so you can see the finished
 *                         section. NEVER shown in production. It appears only
 *                         when NEXT_PUBLIC_PREVIEW_SAMPLES="true" is set in
 *                         .env.local, which is gitignored and never reaches
 *                         Vercel — and even then it renders behind a visible
 *                         "example layout" notice.
 *
 * As soon as you add a single real entry to `testimonials`, the samples stop
 * being used entirely and the real feedback takes over automatically.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Before publishing a real entry, get the client's WRITTEN permission for the
 * exact quote and the exact level of identification. Publishing invented
 * feedback is unlawful advertising in most jurisdictions — in the US the FTC
 * fines it, and the UK, EU, Australia and Korea all prohibit it too.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Only include if the client agreed to it being public. */
  company?: string;
  /** Which service they used, shown as a tag. */
  service?: string;
  /** e.g. "Offer accepted in 6 weeks" — only if you can evidence it. */
  outcome?: string;
  /** 1–5. Omit rather than guess. */
  rating?: number;
  /**
   * Path to a real photo the client agreed to publish, e.g.
   * "/images/clients/jane.jpg". Leave empty and a monogram is generated.
   * Never point this at a stock photo — see public/images/CREDITS.md.
   */
  photo?: string;
};

/** Real client feedback. Add entries here as you earn them. */
export const testimonials: Testimonial[] = [];

/** Headline metrics. Leave empty until you can substantiate every number. */
export const metrics: { value: string; label: string }[] = [];

/**
 * Demonstration content only — see the note at the top of this file.
 * These are illustrative examples of the kind of feedback the section is
 * designed to hold. They are not real people and are never shown publicly.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    quote:
      "I had sent out ninety applications and had two replies. The rewrite was brutal — half my bullets described the team's work, not mine. Four interviews in the first three weeks after.",
    name: "Sample Reviewer",
    role: "Backend Engineer",
    service: "Résumé & CV",
    outcome: "4 interviews in 3 weeks",
    rating: 5,
  },
  {
    quote:
      "The mock interviews were harder than the real loop, which was the point. Watching myself back was awful and it fixed more in one session than a month of reading had.",
    name: "Example Client",
    role: "Product Manager",
    service: "Interview Prep",
    outcome: "Offer accepted",
    rating: 5,
  },
  {
    quote:
      "I had solved hundreds of problems and still blanked on timed tests. The diagnostic found it in one session: I could not name the pattern under a clock. We drilled exactly that.",
    name: "Demo Candidate",
    role: "New Graduate",
    service: "Coding Tests",
    outcome: "Passed on-site assessment",
    rating: 5,
  },
  {
    quote:
      "What I valued most was being told my target list was unrealistic before I wasted three months on it. Nobody else had been willing to say that.",
    name: "Placeholder Person",
    role: "Career Changer",
    service: "Everything",
    rating: 4,
  },
];

/** Sample metrics, shown only alongside the sample feedback. */
export const sampleMetrics: { value: string; label: string }[] = [
  { value: "—", label: "Clients coached" },
  { value: "—", label: "Average weeks to offer" },
  { value: "—", label: "Would recommend" },
];

/**
 * True only when previewing samples locally. Reads a NEXT_PUBLIC_ variable so
 * the value is inlined at build time; it is absent in production, so this is
 * false on the deployed site.
 */
export const previewingSamples =
  testimonials.length === 0 &&
  process.env.NEXT_PUBLIC_PREVIEW_SAMPLES === "true";

/** What the pages should actually render. */
export function getTestimonials(): Testimonial[] {
  if (testimonials.length > 0) return testimonials;
  return previewingSamples ? sampleTestimonials : [];
}

export function getMetrics(): { value: string; label: string }[] {
  if (testimonials.length > 0) return metrics;
  return previewingSamples ? sampleMetrics : [];
}
