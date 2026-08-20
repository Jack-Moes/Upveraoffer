/**
 * Every photograph used outside the blog, in one place.
 *
 * Keeping alt text and attribution next to the path means an image can never
 * be dropped into a page without both. If you add an image here, also add a
 * row to public/images/CREDITS.md.
 *
 * All entries are Unsplash License (free for commercial use).
 */

export type SiteImage = {
  src: string;
  /** Describes the picture for screen readers. Never leave this empty. */
  alt: string;
  credit: string;
  creditUrl: string;
};

export const images = {
  hero: {
    src: "/images/site/hero.jpg",
    alt: "A person in a blue sweater working at a laptop by a window",
    credit: "Jan Baborák",
    creditUrl: "https://unsplash.com/@janbaborak",
  },
  process: {
    src: "/images/site/process.jpg",
    alt: "An open notebook, phone and laptop arranged on a white desk",
    credit: "JESHOOTS.COM",
    creditUrl: "https://unsplash.com/@jeshoots",
  },
  consult: {
    src: "/images/site/consult.jpg",
    alt: "A spiral notebook and pen resting on a wooden table",
    credit: "Kelly Sikkema",
    creditUrl: "https://unsplash.com/@kellysikkema",
  },
  resume: {
    src: "/images/services/resume.jpg",
    alt: "Printed pages laid out on a wooden desk",
    credit: "pure julia",
    creditUrl: "https://unsplash.com/@purejulia",
  },
  interview: {
    src: "/images/services/interview.jpg",
    alt: "Two colleagues in conversation across a desk in an office",
    credit: "Vitaly Gariev",
    creditUrl: "https://unsplash.com/@silverkblack",
  },
  "coding-test": {
    src: "/images/services/coding.jpg",
    alt: "A developer typing code on a laptop beside a plant and a mug",
    credit: "Nubelson Fernandes",
    creditUrl: "https://unsplash.com/@nublson",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/** Small caption used under photographs. */
export function creditLine(image: SiteImage) {
  return `Photo by ${image.credit} on Unsplash`;
}
