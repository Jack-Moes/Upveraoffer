/**
 * Single source of truth for company-wide facts.
 * Update values here and they propagate to every page, the footer,
 * structured data, and the sitemap.
 *
 * TODO(founder): replace every value marked PLACEHOLDER before launch.
 */

export const site = {
  name: "Upveraoffer",
  legalName: "Upveraoffer", // PLACEHOLDER: registered legal entity name
  tagline: "From résumé to offer.",
  description:
    "Upveraoffer is an end-to-end job search partner. We help you write a résumé that gets read, prepare for interviews that get passed, and clear the coding tests that stand between you and the offer.",

  /** Used for canonical URLs, sitemap, and Open Graph. */
  url: "https://upveraoffer.com", // PLACEHOLDER: set to your real domain

  email: "hello@upveraoffer.com", // PLACEHOLDER
  phone: "", // PLACEHOLDER: leave empty to hide from the site

  /**
   * Cal.com booking handle, used by the booking embed.
   * Format: "<username>/<event-slug>" — e.g. "upveraoffer/intro".
   * Leave empty and the booking page falls back to the contact form.
   */
  calcom: "", // PLACEHOLDER

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/upveraoffer" }, // PLACEHOLDER
    { label: "GitHub", href: "https://github.com/upveraoffer" }, // PLACEHOLDER
  ],

  /** Shown in the footer and structured data. */
  foundedYear: 2026,
} as const;

export const nav = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Résumé & CV", href: "/services/resume" },
      { label: "Interview Prep", href: "/services/interview" },
      { label: "Coding Tests", href: "/services/coding-test" },
    ],
  },
  { label: "How it works", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Results", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = [
  {
    title: "Services",
    links: [
      { label: "Résumé & CV writing", href: "/services/resume" },
      { label: "Interview preparation", href: "/services/interview" },
      { label: "Coding test coaching", href: "/services/coding-test" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How it works", href: "/process" },
      { label: "Success stories", href: "/success-stories" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Book a free consult", href: "/book" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
] as const;
