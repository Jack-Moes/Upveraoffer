/**
 * Client outcomes.
 *
 * IMPORTANT: this array is intentionally EMPTY. Upveraoffer is newly
 * established and has no client results yet, and publishing invented
 * testimonials would be both dishonest and, in most jurisdictions,
 * unlawful advertising.
 *
 * The success-stories page detects the empty array and renders an honest
 * "case studies publishing soon" state. As soon as you have real, written,
 * permission-granted client results, add them here and the page switches
 * to the full layout automatically.
 *
 * Before adding an entry, get the client's written permission for the exact
 * quote and the exact level of identification you plan to publish.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional: only include if the client has agreed to it being public. */
  company?: string;
  /** e.g. "Offer accepted, 6 weeks" — only if verifiable. */
  outcome?: string;
};

export const testimonials: Testimonial[] = [
  // Example of the expected shape — delete this comment and add real entries:
  // {
  //   quote: "…",
  //   name: "…",
  //   role: "Backend Engineer",
  //   company: "…",
  //   outcome: "Offer accepted, 6 weeks",
  // },
];

/** Headline metrics. Leave empty until you can actually substantiate them. */
export const metrics: { value: string; label: string }[] = [];
