/**
 * Client feedback.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * NOTE FOR WHOEVER SHIPS THIS FOR REAL
 *
 * The entries below are DEMONSTRATION CONTENT for a portfolio build. The
 * quotes are written, the names are invented, and the portraits are stock
 * photographs of people who are not clients and have not endorsed anything.
 *
 * That is fine for a study or template project. It is NOT fine on a live
 * commercial site: publishing invented testimonials is unlawful advertising
 * in most jurisdictions (FTC in the US; equivalent rules in the UK, EU,
 * Australia and Korea), and captioning a stock portrait as a named client
 * misuses that person's likeness.
 *
 * Before this ever sells anything: delete every entry here and replace it
 * with feedback you actually received, published with written permission
 * for the exact quote and the exact level of identification.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Only publish with the client's permission. */
  company?: string;
  /** Which service they used, shown as a tag. */
  service?: string;
  /** e.g. "Offer accepted in 6 weeks" — only if you can evidence it. */
  outcome?: string;
  /** 1–5. Omit rather than guess. */
  rating?: number;
  /** Portrait path. Omit and the avatar falls back to a generated monogram. */
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I had sent out ninety applications and had two replies. The rewrite was brutal in the best way — half my bullets described the team's work rather than mine, and I could not see it until someone showed me. Four first-round interviews in the three weeks after.",
    name: "Daniel Reyes",
    role: "Backend Engineer",
    service: "Résumé & CV",
    outcome: "4 interviews in 3 weeks",
    rating: 5,
    photo: "/images/people/a1.jpg",
  },
  {
    quote:
      "The mock interviews were harder than the real loop, which turned out to be the point. Watching myself back was genuinely unpleasant and it fixed more in one session than a month of reading advice had.",
    name: "Priya Nair",
    role: "Product Manager",
    service: "Interview Prep",
    outcome: "Offer accepted",
    rating: 5,
    photo: "/images/people/a2.jpg",
  },
  {
    quote:
      "I had solved close to four hundred problems and still went blank on timed assessments. The diagnostic found it in one session — I could not name the pattern under a clock. We drilled exactly that instead of grinding more problems.",
    name: "Marcus Adeyemi",
    role: "New Graduate, Software",
    service: "Coding Tests",
    outcome: "Passed on-site assessment",
    rating: 5,
    photo: "/images/people/a3.jpg",
  },
  {
    quote:
      "What I valued most was being told my target list was unrealistic before I wasted three months on it. Everyone else had been encouraging and useless. They rebuilt the list with me and I had an offer inside two months.",
    name: "Sofia Almeida",
    role: "Career Changer",
    service: "Everything",
    outcome: "Offer in 8 weeks",
    rating: 5,
    photo: "/images/people/a4.jpg",
  },
  {
    quote:
      "The written feedback after every session is the part nobody else does. Not “be more confident” — actual sentences to cut, and where I was burning ninety seconds on setup before saying anything about myself.",
    name: "Tom Whitfield",
    role: "Data Analyst",
    service: "Interview Prep",
    rating: 5,
  },
  {
    quote:
      "I came in expecting a template and a pep talk. I got a diagnosis I did not particularly want to hear and a plan that worked. Worth every hour.",
    name: "Hannah Kobayashi",
    role: "Senior Frontend Engineer",
    service: "Everything",
    outcome: "Two competing offers",
    rating: 5,
  },
];

/** Headline metrics shown above the feedback. Demonstration figures. */
export const metrics: { value: string; label: string }[] = [
  { value: "120+", label: "Job seekers coached" },
  { value: "7 wks", label: "Median time to offer" },
  { value: "94%", label: "Would recommend us" },
];

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getMetrics(): { value: string; label: string }[] {
  return metrics;
}
