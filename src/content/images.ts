/**
 * Every photograph used outside the blog, in one place.
 *
 * Keeping alt text and attribution next to the path means an image can never
 * be dropped into a page without both. If you add an image here, also add a
 * row to public/images/CREDITS.md.
 *
 * Every source below permits commercial use. See public/images/CREDITS.md
 * for the exact source page and licence.
 */

export type SiteImage = {
  src: string;
  /** Describes the picture for screen readers. Never leave this empty. */
  alt: string;
  credit: string;
  creditUrl: string;
};

export const images = {
  founderPortrait: {
    src: "/images/site/founder-team-manager.jpg",
    alt: "Upveraoffer founder and team manager seated at a desk with an open laptop",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamMeeting: {
    src: "/images/workplace/four-men-meeting.jpg",
    alt: "Four software professionals in a relaxed meeting room with laptops open on the table",
    credit: "Sidney Zou",
    creditUrl:
      "https://unsplash.com/photos/four-men-in-a-meeting-room-with-laptops-7cahomYTo1U",
  },
  seniorTeam: {
    src: "/images/workplace/senior-team-laptops.jpg",
    alt: "Four software professionals collaborating around a table with their laptops open",
    credit: "Ofspace LLC, Culture",
    creditUrl:
      "https://www.pexels.com/photo/man-people-woman-desk-8128190/",
  },
  workshop: {
    src: "/images/workplace/modern-workshop.jpg",
    alt: "Professionals taking notes during a focused business workshop",
    credit: "Pavel Danilyuk",
    creditUrl:
      "https://www.pexels.com/photo/businesspeople-attending-a-business-seminar-8761535/",
  },
  seniorEngineer: {
    src: "/images/workplace/senior-engineer.jpg",
    alt: "An Asian software professional working on a laptop at a bright office table",
    credit: "Kindel Media",
    creditUrl:
      "https://www.pexels.com/photo/man-using-a-laptop-at-the-office-7651656/",
  },
  officeExterior: {
    src: "/images/workplace/office-exterior.jpg",
    alt: "A contemporary glass office building framed by trees in warm evening light",
    credit: "Musa Nicholas Dibal",
    creditUrl:
      "https://www.pexels.com/photo/modern-office-building-with-glass-facade-33206338/",
  },
  officeInterior: {
    src: "/images/workplace/office-interior.jpg",
    alt: "A refined modern conference room with glass walls and a marble table",
    credit: "Essentia Media",
    creditUrl:
      "https://www.pexels.com/photo/elegant-modern-office-interior-design-with-glass-walls-33342712/",
  },
  coachingSession: {
    src: "/images/workplace/laptop-session-v2.jpg",
    alt: "Two professionals reviewing work together on a laptop at an office table",
    credit: "Antoni Shkraba",
    creditUrl:
      "https://www.pexels.com/photo/employees-using-a-laptop-in-the-office-7163386/",
  },
  companyEvent: {
    src: "/images/workplace/company-event.jpg",
    alt: "A professional learning event in a bright room with laptops on the tables",
    credit: "Matheus Bertelli",
    creditUrl:
      "https://www.pexels.com/photo/people-during-digital-presentation-18999535/",
  },
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
    src: "/images/services/resume-review.jpg",
    alt: "A professional reviewing an application document beside an open laptop",
    credit: "Sora Shimazaki",
    creditUrl:
      "https://www.pexels.com/photo/woman-filling-job-application-form-in-office-with-boss-5668858/",
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
  if (image.creditUrl.includes("pexels.com")) {
    return `Photo by ${image.credit} on Pexels`;
  }
  if (image.creditUrl.includes("unsplash.com")) {
    return `Photo by ${image.credit} on Unsplash`;
  }
  return `Photo courtesy of ${image.credit}`;
}
