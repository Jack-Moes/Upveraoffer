# Image credits and licences

Every image committed to this repository is listed here with its source and
licence. **Do not add an image to `public/` without adding a row below.**
If you cannot name the licence, do not ship the image.

## Blog covers

| File | Photographer | Source | Licence |
|---|---|---|---|
| `blog/resume-bullets.jpg` | Unseen Studio | [Unsplash](https://unsplash.com/@uns__nstudio) | Unsplash License |
| `blog/coding-test.jpg` | Chris Ried | [Unsplash](https://unsplash.com/@cdr6934) | Unsplash License |
| `blog/story-bank.jpg` | Christina @ wocintechchat.com | [Unsplash](https://unsplash.com/@wocintechchat) | Unsplash License |

## Site and service images

Registered in `src/content/images.ts`, which holds the alt text and credit
for each one.

| File | Used on | Photographer | Source | Licence |
|---|---|---|---|---|
| `site/hero.jpg` | Home hero | Jan Baborák | [Unsplash](https://unsplash.com/@janbaborak) | Unsplash License |
| `site/process.jpg` | Home, `/process` | JESHOOTS.COM | [Unsplash](https://unsplash.com/@jeshoots) | Unsplash License |
| `site/consult.jpg` | `/book` | Kelly Sikkema | [Unsplash](https://unsplash.com/@kellysikkema) | Unsplash License |
| `services/resume.jpg` | Résumé service | pure julia | [Unsplash](https://unsplash.com/@purejulia) | Unsplash License |
| `services/interview.jpg` | Interview service | Vitaly Gariev | [Unsplash](https://unsplash.com/@silverkblack) | Unsplash License |
| `services/coding.jpg` | Coding test service | Nubelson Fernandes | [Unsplash](https://unsplash.com/@nublson) | Unsplash License |

## Workplace and event photography

These are licensed editorial workplace images. They illustrate the kind of
collaboration, technical work, and group learning discussed on the site; they
are not employee portraits or claims that the pictured locations belong to
Upveraoffer.

| File | Used on | Photographer | Source | Licence |
|---|---|---|---|---|
| `workplace/four-men-meeting.jpg` | Home and About hero | Sidney Zou | [Unsplash](https://unsplash.com/photos/four-men-in-a-meeting-room-with-laptops-7cahomYTo1U) | Unsplash License |
| `workplace/developers-office.jpg` | About and Contact | cottonbro studio | [Pexels](https://www.pexels.com/photo/men-sitting-at-the-desks-in-an-office-and-using-computers-6804068/) | Pexels License |
| `workplace/workshop-audience.jpg` | About and Services | Viridiana Rivera | [Pexels](https://www.pexels.com/photo/business-workshop-with-engaged-audience-29581807/) | Pexels License |
| `workplace/laptop-session.jpg` | Home, About, Process, and Booking | Antoni Shkraba | [Pexels](https://www.pexels.com/photo/employees-using-a-laptop-in-the-office-7163386/) | Pexels License |
| `workplace/company-event.jpg` | About gallery | Matheus Bertelli | [Pexels](https://www.pexels.com/photo/people-during-digital-presentation-18999535/) | Pexels License |

## Testimonial portraits — demonstration content

These four portraits stand in as client avatars in `src/content/testimonials.ts`.
**The people pictured are not clients and have not endorsed anything.** That is
acceptable for this portfolio build; it is not acceptable on a live commercial
site. Replace them with real, permissioned client photos — or remove the
`photo` field entirely, which falls the avatar back to a generated monogram —
before this sells anything.

| File | Photographer | Source | Licence |
|---|---|---|---|
| `people/a1.jpg` | Jurica Koletić | [Unsplash](https://unsplash.com/@juricakoletic) | Unsplash License |
| `people/a2.jpg` | Michael Dam | [Unsplash](https://unsplash.com/@michaeldam) | Unsplash License |
| `people/a3.jpg` | Joseph Gonzalez | [Unsplash](https://unsplash.com/@miracletwentyone) | Unsplash License |
| `people/a4.jpg` | Andre Styles | [Unsplash](https://unsplash.com/@lovedisorder) | Unsplash License |

## About the Unsplash License

Free to use for commercial and non-commercial purposes, no permission needed.
Attribution is not required but is appreciated, so each blog post credits its
photographer beneath the cover image.

What it does **not** allow: selling unaltered copies of the photos, or using
them to build a competing photography service. Neither applies here.

Full terms: <https://unsplash.com/license>

## What must never go in here

- **A photo presented as our team, our office, or a client.** Stock people
  passed off as real staff is misrepresentation, and a prospective client who
  reverse-image-searches it will find the same face on a dental practice site.
  Team photos must be genuine photographs of genuine team members.
- **Anything from a general web image search.** Most of those images are
  copyrighted, and "it was on Google" is not a licence.
- **Logos of companies we have not worked with**, in any "as seen at" or
  "our clients" context.

## Adding new images

1. Source it from Unsplash, Pexels, or another explicitly commercial-use
   library — or shoot it yourself.
2. Check the photographer is not "Getty Images" on Unsplash; that indicates
   Unsplash+, which is a paid subscription licence, not the free one.
3. Download rather than hotlink, so the site does not break when a remote URL
   changes and no third party can track your visitors.
4. Add a row to the table above.
5. Always set meaningful `alt` text. An empty `alt` on a content image is an
   accessibility failure.
