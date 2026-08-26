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
  indianDeveloper: {
    src: "/images/people/indian-developer-v2.jpg",
    alt: "An Indian American Upveraoffer senior developer seated in an office lounge",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  vietnameseDeveloper: {
    src: "/images/people/vietnamese-developer-v2.jpg",
    alt: "A Vietnamese American Upveraoffer senior developer standing beside an office library",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  chineseDeveloper: {
    src: "/images/people/chinese-developer-v2.jpg",
    alt: "A Chinese American Upveraoffer senior developer standing in a warm office interior",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  indianCustomerAssistance: {
    src: "/images/people/indian-customer-assistance-v2.jpg",
    alt: "An Indian American Upveraoffer customer-assistance specialist working at a laptop",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  usCustomerAssistance: {
    src: "/images/people/us-customer-assistance-v1.jpg",
    alt: "An experienced American Upveraoffer customer-assistance specialist at her desk",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamMeeting: {
    src: "/images/workplace/team-company-studio-v5.jpg",
    alt: "Upveraoffer's six-person team working across engineering and customer-assistance stations",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamHoliday: {
    src: "/images/workplace/team-holiday-square-v5.jpg",
    alt: "Upveraoffer's six-person team sharing warm drinks at an outdoor holiday market",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  workshop: {
    src: "/images/workplace/modern-workshop.jpg",
    alt: "Professionals taking notes during a focused business workshop",
    credit: "Pavel Danilyuk",
    creditUrl:
      "https://www.pexels.com/photo/businesspeople-attending-a-business-seminar-8761535/",
  },
  teamSightseeing: {
    src: "/images/workplace/team-sightseeing-v5.jpg",
    alt: "Upveraoffer's six-person team exploring a contemporary sculpture garden",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  officeExterior: {
    src: "/images/workplace/office-exterior.jpg",
    alt: "A contemporary glass office building framed by trees in warm evening light",
    credit: "Musa Nicholas Dibal",
    creditUrl:
      "https://www.pexels.com/photo/modern-office-building-with-glass-facade-33206338/",
  },
  officeInterior: {
    src: "/images/workplace/team-equipment-interior-v5.jpg",
    alt: "Upveraoffer's six-person team working with a desktop tower, dual monitors, TV, Dell and Mac laptops, and printers",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  coachingSession: {
    src: "/images/workplace/laptop-session-v2.jpg",
    alt: "Two professionals reviewing work together on a laptop at an office table",
    credit: "Antoni Shkraba",
    creditUrl:
      "https://www.pexels.com/photo/employees-using-a-laptop-in-the-office-7163386/",
  },
  teamSailing: {
    src: "/images/workplace/team-sailing-offsite-v5.jpg",
    alt: "Upveraoffer's six-person team working together aboard a sailboat",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamHike: {
    src: "/images/workplace/team-hike-overlook-v5.jpg",
    alt: "Upveraoffer's six-person team pausing at a mountain trail overlook",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamLounge: {
    src: "/images/workplace/team-lounge-v5.jpg",
    alt: "Upveraoffer's six-person team taking an informal coffee break in the office lounge",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamVolunteer: {
    src: "/images/workplace/team-volunteer-day-v5.jpg",
    alt: "Upveraoffer's six-person team packing food donations at a community volunteer event",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamGolf: {
    src: "/images/workplace/team-golf-day-v5.jpg",
    alt: "Upveraoffer's six-person team playing a casual round of golf together",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
  },
  teamDinner: {
    src: "/images/workplace/team-dinner-v6.jpg",
    alt: "Upveraoffer's complete six-person team sharing dinner after an event",
    credit: "Upveraoffer",
    creditUrl: "https://upveraoffer.com",
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
