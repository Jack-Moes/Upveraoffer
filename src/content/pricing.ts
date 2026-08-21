/**
 * Pricing tiers.
 *
 * TODO(founder): every price below is a PLACEHOLDER. Set real numbers,
 * and set `currency` to whatever you actually bill in, before launch.
 */

export const currency = "USD";
export const currencySymbol = "$";

export type Plan = {
  id: string;
  name: string;
  price: number | null; // null renders as "Custom"
  cadence: string;
  tagline: string;
  bestFor: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "foundation",
    name: "Foundation",
    price: 390, // PLACEHOLDER
    cadence: "one-time",
    tagline: "Fix the document that’s costing you interviews.",
    bestFor: "You’re applying and hearing nothing back.",
    features: [
      "Full résumé rewrite (DOCX + PDF)",
      "LinkedIn profile pass",
      "ATS and keyword alignment",
      "Two revision rounds",
      "Tailoring playbook",
      "Email support for 30 days",
    ],
    cta: { label: "Start with Foundation", href: "/contact?plan=foundation" },
  },
  {
    id: "interview-ready",
    name: "Interview Ready",
    price: 990, // PLACEHOLDER
    cadence: "one-time",
    tagline: "Everything in Foundation, plus rehearsal until it’s second nature.",
    bestFor: "You’re getting interviews and losing them.",
    features: [
      "Everything in Foundation",
      "Four live mock interviews",
      "Story bank workshop (8–12 stories)",
      "Written feedback report per session",
      "Company-specific loop preparation",
      "Offer negotiation coaching",
      "Email support for 90 days",
    ],
    cta: { label: "Get Interview Ready", href: "/contact?plan=interview-ready" },
    featured: true,
  },
  {
    id: "full-offer",
    name: "Full Offer",
    price: 1890, // PLACEHOLDER
    cadence: "one-time",
    tagline: "The whole path, coding assessments included.",
    bestFor: "You’re going for engineering roles with a coding test in the loop.",
    features: [
      "Everything in Interview Ready",
      "Coding-test diagnostic and study plan",
      "Eight live problem-solving sessions",
      "Three timed full-length mock assessments",
      "Line-by-line solution reviews",
      "System design preparation",
      "Priority scheduling",
      "Support until you sign",
    ],
    cta: { label: "Go for Full Offer", href: "/contact?plan=full-offer" },
  },
];

/** Rows for the comparison table on /pricing. */
export const comparison: { feature: string; values: Record<string, boolean | string> }[] = [
  { feature: "Résumé rewrite", values: { foundation: true, "interview-ready": true, "full-offer": true } },
  { feature: "LinkedIn profile pass", values: { foundation: true, "interview-ready": true, "full-offer": true } },
  { feature: "ATS alignment", values: { foundation: true, "interview-ready": true, "full-offer": true } },
  { feature: "Revision rounds", values: { foundation: "2", "interview-ready": "3", "full-offer": "Unlimited" } },
  { feature: "Live mock interviews", values: { foundation: "—", "interview-ready": "4", "full-offer": "6" } },
  { feature: "Story bank workshop", values: { foundation: false, "interview-ready": true, "full-offer": true } },
  { feature: "Negotiation coaching", values: { foundation: false, "interview-ready": true, "full-offer": true } },
  { feature: "Coding-test diagnostic", values: { foundation: false, "interview-ready": false, "full-offer": true } },
  { feature: "Live coding sessions", values: { foundation: "—", "interview-ready": "—", "full-offer": "8" } },
  { feature: "Timed mock assessments", values: { foundation: "—", "interview-ready": "—", "full-offer": "3" } },
  { feature: "System design prep", values: { foundation: false, "interview-ready": false, "full-offer": true } },
  { feature: "Support window", values: { foundation: "30 days", "interview-ready": "90 days", "full-offer": "Until you sign" } },
];

export const pricingFaq = [
  {
    q: "Do you offer payment plans?",
    a: "Yes. Interview Ready and Full Offer can be split into monthly payments at no extra cost. Mention it on your consult call and we’ll set it up.",
  },
  {
    q: "Are there discounts?",
    a: "We keep a few reduced-rate places open each month for students, career changers, and people currently out of work. Just ask on the consult call. There’s no application form and nobody checks your bank balance.",
  },
  {
    q: "What if I only need one piece?",
    a: "You can book individual sessions à la carte. The packages exist because the pieces build on each other, not because we won’t sell them separately.",
  },
];
