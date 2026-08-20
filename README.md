# Upveraoffer

Company website for **Upveraoffer** — an end-to-end job search partner covering
résumé writing, interview preparation, and coding test coaching.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.
Deployed on Vercel.

---

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
```

---

## Editing the site content

**You almost never need to touch a page component to change copy.** All the
text lives in `src/content/`:

| File | Controls |
|---|---|
| `site.ts` | Company name, tagline, email, domain, social links, nav and footer menus |
| `services.ts` | The three service offerings and every detail page |
| `pricing.ts` | Packages, prices, the comparison table, pricing FAQ |
| `process.ts` | The four-stage process and the guiding principles |
| `faq.ts` | The FAQ page |
| `testimonials.ts` | Client results (currently empty — see below) |
| `blog/*.md` | Blog articles |
| `careers/*.md` | Job postings (see below) |

### Adding a blog post

Create a new `.md` file in `src/content/blog/`. The filename becomes the URL
(`my-post.md` → `/blog/my-post`). Start it with frontmatter:

```markdown
---
title: "Your headline"
description: "One sentence shown in listings and search results."
date: "2026-09-01"
category: "Interviews"
author: "Upveraoffer"
---

Your article in normal markdown.
```

Reading time is calculated automatically. The post appears in the blog index,
the home page teaser, and the sitemap with no other changes.

### Posting a job

Job posts work the same way. Create a `.md` file in `src/content/careers/` —
the filename becomes the URL (`senior-backend-engineer.md` →
`/careers/senior-backend-engineer`).

```markdown
---
title: "Senior Backend Engineer"
department: "Engineering"
location: "Remote — worldwide"
workplace: "Remote"             # Remote | Hybrid | On-site
employmentType: "Full-time"     # Full-time | Part-time | Contract | Internship
experience: "5+ years"
summary: "One sentence shown on the listing card and in search results."
postedDate: "2026-08-20"
closingDate: ""                 # empty means no fixed close date
open: true                      # false hides it without deleting the file
salary:
  min: 130000
  max: 170000
  currency: "USD"
  period: "year"                # year | month | day | hour
highlights:                     # short bullets on the listing card
  - "Own the assessment platform end to end"
applyEmail: "careers@upveraoffer.com"
applicantCountries: []          # real country names, for Google Jobs
---

The full job description in normal markdown.
```

Adding the file is all it takes. The role then appears on `/careers`, gets its
own page with a sticky summary rail and an apply button, is counted in the
"we are hiring" card on `/about`, and is added to the sitemap.

**Closing a role:** set `open: false`. It disappears from listings and the
sitemap but the file and its URL stay put.

**Google Jobs:** each post emits `JobPosting` structured data, which is what
gets a role indexed into Google's jobs results. Two things to know:

- `applicantCountries` must contain **real country names** — `"Worldwide"` is
  not valid. Left empty, the field is omitted rather than emitted wrong, which
  is the safe default but weaker for indexing. Fill it in with the countries
  you can genuinely employ or contract in.
- Publish the salary band honestly. It is rendered on the page *and* in the
  structured data, so a band you will not honor is visible in two places.

---

## Before you launch — required changes

Search the codebase for `PLACEHOLDER` and `TODO(founder)` and work through
each one. The important ones:

1. **`src/content/site.ts`** — set `url` to your real domain, `email` to a real
   inbox, and fix the LinkedIn/GitHub links. `legalName` must be your
   registered entity.
2. **`src/content/pricing.ts`** — every price is invented. Set real numbers.
3. **`src/app/about/page.tsx`** — replace the story paragraphs with your own,
   and add coach bios with real credentials. This is the strongest trust
   signal on the site.
4. **`src/app/privacy/page.tsx` and `src/app/terms/page.tsx`** — these are
   **starting drafts, not legal advice**. Have a lawyer in your jurisdiction
   review them before you take a single payment.
5. **`src/content/careers/*.md`** — the Senior Backend Engineer post has a
   placeholder salary band and a placeholder benefits list. Both must match
   what you will actually offer, and `careersEmail` in `site.ts` must be a real
   inbox that someone reads.
6. **Booking** — set `calcom` in `site.ts` to your Cal.com handle
   (`"username/event-slug"`). Until then `/book` shows a fallback that routes
   people to the contact form.
7. **Contact form** — see below.

### Testimonials

`src/content/testimonials.ts` is **intentionally empty**. Upveraoffer has no
client results yet, and publishing invented testimonials is dishonest and, in
most jurisdictions, unlawful advertising. `/success-stories` detects the empty
array and renders an honest "results publishing soon" state instead.

When you have real, permissioned client results, add them to that array and the
page switches to the full layout automatically.

---

## Contact form setup

The form at `/contact` posts to `src/app/api/contact/route.ts`, which sends
email via [Resend](https://resend.com).

1. Create a Resend account and verify your sending domain.
2. Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL="Upveraoffer <hello@yourdomain.com>"
CONTACT_TO_EMAIL=you@yourdomain.com
```

3. Add the same three variables in Vercel under
   **Project Settings → Environment Variables**, then redeploy.

Until those are set the form returns an honest error telling visitors to email
you directly — it never silently drops a message.

The route includes a honeypot field and a simple in-memory rate limit
(5 submissions per IP per hour). The rate limit resets on cold start and is
per-instance; move it to Vercel KV or Upstash if volume ever justifies it.

---

## Project structure

```
src/
├─ app/                     Routes (App Router)
│  ├─ page.tsx              Home
│  ├─ layout.tsx            Shell, fonts, metadata, JSON-LD
│  ├─ globals.css           Design tokens + Tailwind theme
│  ├─ icon.svg              Favicon
│  ├─ opengraph-image.tsx   Generated social share card
│  ├─ sitemap.ts / robots.ts
│  ├─ services/[slug]/      Service detail pages
│  ├─ blog/[slug]/          Blog posts
│  ├─ careers/[slug]/       Job posts (JobPosting structured data)
│  └─ api/contact/          Contact form handler
├─ components/
│  ├─ site/                 Header, Footer, Logo, forms, page blocks
│  └─ ui/                   Container, Section, Button primitives
├─ content/                 All editable copy (see table above)
└─ lib/                     blog.ts and careers.ts markdown loaders
```

### Design system

Colors, fonts, and radii are CSS custom properties defined once in
`src/app/globals.css` — light values on `:root`, dark overrides on `.dark`, and
both mapped into Tailwind via `@theme inline`. Use the semantic utilities
(`bg-surface`, `text-muted`, `border-border`, `text-primary`) rather than raw
color values, and the whole site restyles from one place.

Dark mode follows the system preference by default and can be overridden with
the header toggle; the choice persists in `localStorage`. An inline script in
`layout.tsx` applies it before first paint so there is no flash.

---

## Deployment

Pushes to `main` deploy to production automatically. Pull requests get their
own preview URL.

To deploy manually or configure the project the first time, see the
"Deploying" section of the handover notes, or run `vercel` from this directory
after `npm i -g vercel`.
