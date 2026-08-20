/** The four-step engagement model, shown on the home page and /process. */

export const steps = [
  {
    number: "01",
    title: "Diagnose",
    duration: "Week 1",
    summary: "Find out what is actually blocking you.",
    body: "We start with a free consult and a structured diagnostic: your current résumé, your target roles, a short mock interview, and — for engineering candidates — a timed coding assessment. The point is to replace your guess about what is going wrong with evidence.",
    detail: [
      "Free 30-minute consult call",
      "Résumé and LinkedIn audit",
      "Diagnostic mock interview",
      "Timed coding assessment (engineering roles)",
      "A written diagnosis with a recommended plan",
    ],
  },
  {
    number: "02",
    title: "Build",
    duration: "Weeks 1–3",
    summary: "Rebuild the materials that represent you.",
    body: "Your résumé gets rewritten around evidence of impact. Your LinkedIn is brought in line with it. Your story bank — the eight to twelve narratives that answer most behavioral questions — gets built and stress-tested. This is the asset layer everything else stands on.",
    detail: [
      "Full résumé rewrite, ATS-safe",
      "LinkedIn profile alignment",
      "Story bank development",
      "Cover letter template and tailoring playbook",
    ],
  },
  {
    number: "03",
    title: "Practice",
    duration: "Weeks 3–8",
    summary: "Rehearse until the real thing is boring.",
    body: "Recorded mock interviews at real difficulty. Live coding sessions where you drive and we correct how you think, not just what you typed. Timed full-length assessments as your dates approach. Every session ends with written feedback specific enough to act on before the next one.",
    detail: [
      "Weekly live mock interviews",
      "Pair problem-solving sessions",
      "Timed full-length mock assessments",
      "Written feedback report after every session",
    ],
  },
  {
    number: "04",
    title: "Land",
    duration: "Offer stage",
    summary: "Convert the loop into a signed offer.",
    body: "Company-specific preparation for the loop in front of you, a dress rehearsal the week of, and negotiation coaching for the conversation most candidates walk into unprepared. We stay with you through the offer, not just up to it.",
    detail: [
      "Company-specific loop preparation",
      "Final dress rehearsal",
      "Offer negotiation strategy and rehearsal",
      "Competing-offer and counter-offer guidance",
    ],
  },
] as const;

/** Short-form version used on the home page. */
export const pillars = [
  {
    title: "Evidence, not adjectives",
    body: "We do not add words like “passionate” to your résumé. We find what you actually shipped and make it impossible to miss.",
  },
  {
    title: "Rehearsal, not advice",
    body: "Reading about interviews does not make you better at them. Doing them under pressure, with feedback, does.",
  },
  {
    title: "Your gaps, not a generic list",
    body: "We diagnose before we prescribe. The plan you get is built from your diagnostic, not from a template.",
  },
] as const;
