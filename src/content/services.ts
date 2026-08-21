/**
 * Service definitions. Each entry drives:
 *  - the card on the home page
 *  - the /services index row
 *  - the full /services/[slug] detail page
 *  - JSON-LD Service structured data
 */

export type Service = {
  slug: "resume" | "interview" | "coding-test";
  icon: "document" | "conversation" | "terminal";
  name: string;
  short: string;
  headline: string;
  intro: string;
  /** The pain this service removes, in the candidate’s own words. */
  problem: string;
  deliverables: { title: string; body: string }[];
  process: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "resume",
    icon: "document",
    name: "Résumé & CV",
    short:
      "A résumé that survives the six-second scan, and the tracking system sitting behind it.",
    headline: "Your experience, written so a recruiter can’t skim past it.",
    intro:
      "Most résumés fail for the same reason. They list what you were responsible for instead of proving what changed because you were there. We rebuild yours around evidence: what you shipped, what it moved, and how that maps to the job you actually want.",
    problem:
      "You’re applying constantly and hearing nothing back, and you can’t tell whether the problem is your experience, your writing, or a filter you never get to see.",
    deliverables: [
      {
        title: "Full résumé rewrite",
        body: "A rebuilt document in a clean layout that parsers can actually read. No tables, no text boxes, no graphics that break on the way in. You get editable DOCX and print-ready PDF.",
      },
      {
        title: "Impact-first bullet rewriting",
        body: "Every bullet reworked so it says what you did and what happened next. Real numbers where they exist, and specific language where they don’t.",
      },
      {
        title: "Keyword and ATS alignment",
        body: "We read the postings you’re actually targeting and line up the wording, so the screening layer sees the same match a person would.",
      },
      {
        title: "LinkedIn profile pass",
        body: "Headline, About section and experience rewritten to match your résumé. Recruiters check both, and it’s obvious when they disagree.",
      },
      {
        title: "Tailoring playbook",
        body: "A short written guide for adapting the master résumé to each application in about ten minutes, so you’re not paying for a rewrite every time.",
      },
    ],
    process: [
      "An intake call and a written questionnaire, to dig out the work you’ve forgotten you did.",
      "We draft. You get the first version with comments in the margin explaining the choices.",
      "Two rounds of revisions on your notes, turned around fast.",
      "Final delivery in DOCX and PDF, plus the tailoring playbook.",
    ],
    outcomes: [
      "A document you can send without wincing",
      "One consistent story across résumé, LinkedIn and cover letter",
      "A repeatable way to tailor it per role",
    ],
  },
  {
    slug: "interview",
    icon: "conversation",
    name: "Interview Prep",
    short:
      "Mock interviews with real pressure, then feedback specific enough to act on.",
    headline: "Rehearse under pressure so the real thing feels familiar.",
    intro:
      "Interviewing is a performance skill, and performance skills respond to rehearsal. We run realistic mocks (behavioral, technical, system design) and give you feedback you can actually use before the next round.",
    problem:
      "You know the material, but you freeze in the room, or ramble past the point, or leave the interviewer unconvinced you’re the one who did the work.",
    deliverables: [
      {
        title: "Live mock interviews",
        body: "Recorded sessions at real difficulty, run by someone who has sat on the other side of the table. Behavioral, technical deep-dive, or system design.",
      },
      {
        title: "Story bank development",
        body: "We build eight to twelve structured stories from your actual history, covering the themes nearly every loop tests: conflict, failure, ownership, ambiguity, influence.",
      },
      {
        title: "Written feedback report",
        body: "After each session you get what landed, what didn’t, and the exact rewrite to apply. Not vague encouragement.",
      },
      {
        title: "Company-specific preparation",
        body: "Targeted prep for the loop you’re actually walking into, including the values and rubrics that company screens against.",
      },
      {
        title: "Offer negotiation coaching",
        body: "What to say, when to say it, and what never to say first. Then we rehearse the conversation itself.",
      },
    ],
    process: [
      "A diagnostic mock, to find your real starting point rather than the one you assume.",
      "Story bank workshop, where we build your core narratives and stress-test them.",
      "Repeat mocks at rising difficulty, each with a written report.",
      "A final dress rehearsal, timed to the week of your loop.",
    ],
    outcomes: [
      "Answers that stay under two minutes and still land",
      "A story bank you can recombine for any question",
      "Calm in the room, because you’ve already been there",
    ],
  },
  {
    slug: "coding-test",
    icon: "terminal",
    name: "Coding Tests",
    short:
      "Algorithm coaching aimed at the assessment in front of you, not a thousand random problems.",
    headline: "Stop grinding randomly. Start closing the gaps that fail you.",
    intro:
      "Most candidates practice by volume and plateau anyway, because volume never shows you the one pattern you can’t see. We work out where your solving actually breaks down and drill that, in the language and format your assessment uses.",
    problem:
      "You’ve solved hundreds of problems and you still blank on the timed test, or you find the answer but can’t finish it before the clock runs out.",
    deliverables: [
      {
        title: "Diagnostic assessment",
        body: "A timed session that maps which patterns you have, which you half-have, and which you’ve been quietly avoiding.",
      },
      {
        title: "Pattern-based curriculum",
        body: "A plan built around the patterns that actually recur: two pointers, sliding window, graph traversal, dynamic programming, heaps. Ordered by your gaps, not by a generic list.",
      },
      {
        title: "Live problem-solving sessions",
        body: "Pair sessions where you drive and we watch how you think, then fix the process instead of handing you the answer.",
      },
      {
        title: "Timed mock assessments",
        body: "Full-length simulations in the platform style you’ll face, countdown and all, with nothing to look up.",
      },
      {
        title: "Post-mortem reviews",
        body: "Line-by-line review of what you submitted: correctness, complexity, edge cases, readability.",
      },
    ],
    process: [
      "A diagnostic session to find the real gaps.",
      "A written study plan you can follow between sessions.",
      "Weekly live sessions focused on how you solve, not just what you solve.",
      "Full-length timed mocks as your assessment date gets closer.",
    ],
    outcomes: [
      "Spotting the pattern in the first two minutes",
      "Finishing inside the limit with edge cases handled",
      "Explaining your complexity without guessing",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
