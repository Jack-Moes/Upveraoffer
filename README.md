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
npm run build          # production build
npm start              # serve the production build
npm run lint           # eslint
npm run check:lang     # English-only check on tracked files and filenames
npm run check:lang:all # same, plus every commit message and file version
```

### English-only guard

This project is English-only, and that is enforced rather than assumed.
`npm run check:lang` scans every tracked file, filename, commit message and
historical file version for Hangul, Chinese and Japanese characters, and
fails with an exact file and line if it finds any. CI runs the deep version
on every push.

**Use this instead of grep.** Git Bash on Windows runs in a non-UTF-8 locale,
so `grep "[<hangul-range>]"` matches byte-wise rather than by character and
reports false positives on almost every file, binaries included. That is a
property of the shell, not of the repository.

The checker's own source is deliberately pure ASCII: it writes its character
ranges as backslash-u escape sequences rather than literal characters. If you
replace those with literals, the script will match its own source and fail on
every run.

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
5. **Booking** — set `calcom` in `site.ts` to your Cal.com handle
   (`"username/event-slug"`). Until then `/book` shows a fallback that routes
   people to the contact form.
6. **Contact form** — see below.

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
│  └─ api/contact/          Contact form handler
├─ components/
│  ├─ site/                 Header, Footer, Logo, forms, page blocks
│  └─ ui/                   Container, Section, Button primitives
├─ content/                 All editable copy (see table above)
└─ lib/                     Blog loader, helpers
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
