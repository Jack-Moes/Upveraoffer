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
  /** The pain this service removes, in the candidate's own words. */
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
      "A résumé that survives the six-second scan and the applicant tracking system behind it.",
    headline: "Your experience, written so a recruiter can't skim past it.",
    intro:
      "Most résumés fail for the same reason: they describe responsibilities instead of proving impact. We rebuild yours around evidence — what you shipped, what changed because of it, and how it maps to the job you actually want.",
    problem:
      "You are applying constantly and hearing nothing back. You cannot tell whether the problem is your experience, your writing, or a filter you never see.",
    deliverables: [
      {
        title: "Full résumé rewrite",
        body: "A rebuilt document in a clean, ATS-safe layout — no tables, no text boxes, no graphics that parsers choke on. Delivered as editable DOCX and print-ready PDF.",
      },
      {
        title: "Impact-first bullet rewriting",
        body: "Every bullet reworked into an action-and-result structure with real numbers where they exist, and honest, specific language where they do not.",
      },
      {
        title: "Keyword and ATS alignment",
        body: "We read the postings you are actually targeting and align terminology so the screening layer sees the match a human would.",
      },
      {
        title: "LinkedIn profile pass",
        body: "Headline, About section, and experience entries rewritten to stay consistent with your résumé — recruiters check both.",
      },
      {
        title: "Tailoring playbook",
        body: "A short written guide showing how to adapt the master résumé per application in ten minutes, so you are not paying for a rewrite every time.",
      },
    ],
    process: [
      "Intake call plus a written questionnaire to surface the accomplishments you have forgotten.",
      "We draft. You get the first version with margin comments explaining every significant choice.",
      "Two revision rounds on your notes, turned around quickly.",
      "Final delivery in DOCX and PDF, plus the tailoring playbook.",
    ],
    outcomes: [
      "A document you can send without hesitating",
      "Consistent story across résumé, LinkedIn, and cover letter",
      "A repeatable way to tailor per role",
    ],
  },
  {
    slug: "interview",
    icon: "conversation",
    name: "Interview Prep",
    short:
      "Mock interviews with real pressure, then the specific feedback that fixes what went wrong.",
    headline: "Rehearse under pressure so the real thing feels familiar.",
    intro:
      "Interviewing is a performance skill, and performance skills respond to rehearsal. We run realistic mock interviews — behavioral, technical, and system design — and give you feedback precise enough to act on before the next round.",
    problem:
      "You know the material but freeze in the room, ramble past the point, or leave the interviewer unconvinced you were the one who did the work.",
    deliverables: [
      {
        title: "Live mock interviews",
        body: "Recorded sessions run at real difficulty by an interviewer who has sat on the other side of the table. Behavioral, technical deep-dive, or system design.",
      },
      {
        title: "Story bank development",
        body: "We build eight to twelve structured stories from your actual history that cover the themes almost every loop tests — conflict, failure, ownership, ambiguity, influence.",
      },
      {
        title: "Written feedback report",
        body: "After each session: what landed, what did not, and the specific rewrite or reframe to apply. Not vague encouragement.",
      },
      {
        title: "Company-specific preparation",
        body: "Targeted prep for the loop you are actually walking into, including the values and rubrics that company is known to screen against.",
      },
      {
        title: "Offer negotiation coaching",
        body: "What to say, when to say it, and what to never say first — plus a rehearsal of the conversation itself.",
      },
    ],
    process: [
      "Diagnostic mock to establish your real starting point, not your assumed one.",
      "Story bank workshop — we build and stress-test your core narratives.",
      "Repeat mocks at increasing difficulty, each with a written report.",
      "Final dress rehearsal timed to the week of your loop.",
    ],
    outcomes: [
      "Answers that stay under two minutes and still land",
      "A story bank you can recombine for any question",
      "Calm in the room because you have already been there",
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
      "Most candidates practice by volume and plateau anyway, because volume does not reveal the specific pattern they cannot see. We diagnose where your solving actually breaks down and drill that, in the language and format your target assessment uses.",
    problem:
      "You have solved hundreds of problems and still blank on the timed assessment, or you find an answer but cannot finish it inside the limit.",
    deliverables: [
      {
        title: "Diagnostic assessment",
        body: "A timed session that maps which patterns you have, which you half-have, and which you are avoiding without realising it.",
      },
      {
        title: "Pattern-based curriculum",
        body: "A sequenced plan built on the patterns that actually recur — two pointers, sliding window, graph traversal, dynamic programming, heaps — ordered by your gaps, not by a generic list.",
      },
      {
        title: "Live problem-solving sessions",
        body: "Pair sessions where you drive and we watch how you think, then correct the process rather than handing you the answer.",
      },
      {
        title: "Timed mock assessments",
        body: "Full-length simulations in the platform style you will face, including the pressure of a countdown and no ability to look things up.",
      },
      {
        title: "Post-mortem reviews",
        body: "Line-by-line review of your submitted solutions covering correctness, complexity, edge cases, and readability.",
      },
    ],
    process: [
      "Diagnostic session to find the real gaps.",
      "A written study plan you can follow between sessions.",
      "Weekly live sessions focused on how you solve, not just what you solve.",
      "Timed full-length mocks as your assessment date approaches.",
    ],
    outcomes: [
      "Recognizing the pattern within the first two minutes",
      "Finishing inside the time limit with edge cases handled",
      "Explaining your complexity without guessing",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
