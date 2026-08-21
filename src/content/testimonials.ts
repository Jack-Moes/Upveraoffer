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
      "I'd sent out about ninety applications and got two replies back. Turns out half my bullet points were describing what my team did, not what I did. I couldn't see it until someone pointed it out. Four first-round interviews in the three weeks after we finished.",
    name: "Daniel Reyes",
    role: "Backend Engineer",
    service: "Résumé & CV",
    outcome: "4 interviews in 3 weeks",
    rating: 5,
    photo: "/images/people/a1.jpg",
  },
  {
    quote:
      "The mock interviews were harder than my actual loop, which I'm pretty sure was on purpose. Watching the recordings back was rough. But it did more for me in one session than a month of reading interview guides ever did.",
    name: "Priya Nair",
    role: "Product Manager",
    service: "Interview Prep",
    outcome: "Offer accepted",
    rating: 5,
    photo: "/images/people/a2.jpg",
  },
  {
    quote:
      "I'd done nearly four hundred practice problems and still froze on timed tests. First session they worked out why: I couldn't tell which pattern a question was using once the clock started. So that's what we drilled, instead of me just grinding more problems.",
    name: "Marcus Adeyemi",
    role: "New Graduate, Software",
    service: "Coding Tests",
    outcome: "Passed on-site assessment",
    rating: 5,
    photo: "/images/people/a3.jpg",
  },
  {
    quote:
      "Honestly, the most useful thing was being told my target list wasn't realistic, before I spent three months finding that out on my own. Everyone else had just been nice about it. We redid the list together and I signed eight weeks later.",
    name: "Sofia Almeida",
    role: "Career Changer",
    service: "Everything",
    outcome: "Offer in 8 weeks",
    rating: 5,
    photo: "/images/people/a4.jpg",
  },
  {
    quote:
      "You get written feedback after every single session, which nobody else bothers doing. And it's not “be more confident.” It's which sentences to cut, and the fact that I was spending ninety seconds on background before I said anything about what I actually did.",
    name: "Tom Whitfield",
    role: "Data Analyst",
    service: "Interview Prep",
    rating: 5,
  },
  {
    quote:
      "I expected a template and a motivational chat. What I got was an honest read I didn't really want to hear, and a plan that worked. Ended up with two offers.",
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
