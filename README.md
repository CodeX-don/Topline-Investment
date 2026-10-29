# Toplin Investments — Corporate Website

High-performance, SEO-first corporate website for **Toplin Investments**, a construction
and development company based in Windhoek, Namibia.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | Type-check without emitting |

---

## Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| Next.js | 14.x (App Router) | SSG, routing, metadata, image optimisation |
| React | 18.x | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| react-icons | 4.x | Iconography |
| sharp | 0.33.x | Image processing |

The site uses Next.js native metadata, `app/sitemap.ts`, and `app/robots.ts`.
`next-seo` and `next-sitemap` are not used by the current implementation.

---

## Architecture

```
public/
  assets/
    images/{hero,projects,services,team,logos}
    fonts/
  favicon.ico
  apple-touch-icon.png
  og-image.jpg
src/
  app/                 # App Router routes, sitemap, robots, API route
  components/
    layout/            # Header, Footer, Navigation, MobileMenu
    sections/          # Page sections (Hero, Services, FAQ, ContactForm…)
    ui/                # Button, Card, SectionHeading, Image, Container
    widgets/           # FloatingWidgets, WhatsApp, Chatbot
    seo/               # SchemaMarkup, GoogleAnalytics
  data/                # services, projects, testimonials, faqs, company
  types/               # Shared TypeScript models
  utils/               # seo, chatbot, validation
  hooks/               # useScrollPosition, useChatbot
```

---

## Brand tokens

| Token | Value |
| --- | --- |
| Toplin Red | `#E31E24` |
| Toplin Red (hover) | `#C41A1F` |
| Deep Black | `#111111` |
| Clean White | `#FFFFFF` |
| Concrete Grey | `#888888` |
| Concrete Light | `#F4F4F4` |
| Card border | `#E5E5E5` |

Headings: **Montserrat** (variable, used at 700/800, uppercase for H1/H2).
Body: **Open Sans** (variable, used at 400-600). Both variable WOFF2 files are
self-hosted in `public/assets/fonts`.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you need.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin, Open Graph URLs, sitemap |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | WhatsApp number without `+` (defaults to `264817184507`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification token |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID (`G-…`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | No | Reserved for a future Maps Embed API integration |
| `EMAIL_API_KEY` | No | Resend API key for contact-form email delivery |
| `EMAIL_FROM` | No | Verified sender address |
| `EMAIL_TO` | No | Enquiry recipient (defaults to `ben@toplin.com.na`) |

Without `EMAIL_API_KEY`, the contact API validates and accepts enquiries, logs the
submission to the server console, and returns a success response. This is useful for
local development and preview deployments. Configure the email variables before
going live to receive enquiries by email.

---

## Contact form

The form posts JSON to `POST /api/contact`. The route:

- validates and sanitises every field;
- applies an in-memory rate limit (5 requests per 10 minutes per IP);
- sends the enquiry through Resend when `EMAIL_API_KEY` is set;
- returns structured `400`, `429`, `500`, or `502` responses for failures.

The browser form validates on submit, focuses the first invalid field, aborts the
request after 10 seconds, and auto-dismisses the success message after 5 seconds.

---

## Content note

The project gallery copy and service descriptions are representative content pending
final client confirmation. Testimonials are intentionally empty until verified client
quotes are supplied; the testimonials section renders nothing while the data list is
empty.

---

## Deployment notes

- Target host: **Vercel** (automatic HTTPS + CDN).
- The project is **not** configured with `output: 'export'` because the contact form
  posts to a server route. Deploy as a standard Next.js app.
- Set the environment variables from `.env.example` in the hosting dashboard.
- `NEXT_PUBLIC_SITE_URL` must be the production origin for canonical URLs, Open Graph
  and the sitemap.
"# Topline-Investment" 
"# Topline-Investment" 
