
# Product Requirements Document (PRD): Toplin Investments Website

**Project Name:** Toplin Investments Corporate Website
**Version:** 1.0
**Date:** October 27, 2026
**Target Audience:** Residential and Commercial property developers, homeowners, and businesses in Windhoek, Namibia.

---

## 1. Executive Summary
Toplin Investments is a premier construction and development company based in Windhoek, Namibia. The goal of this project is to build a high-performance, SEO-optimized, and visually striking corporate website. The site will serve as the primary digital storefront to showcase services (Residential, Commercial, Renovations, Joinery, Paving), build trust through portfolio displays, and generate leads via integrated communication widgets (WhatsApp and AI Chatbot).

---

## 2. Brand & Design Guidelines
The design must reflect a "Modern Industrial & Refined" aesthetic, bridging rugged construction strength with high-end interior finishing.

*   **Primary Color (Action/Accent):** `#E31E24` (Toplin Red) - Used for primary buttons, hover states, and logo accents.
*   **Secondary Color (Backgrounds/Text):** `#111111` (Deep Black) - Used for headers, footers, and dark mode sections.
*   **Base Color (Backgrounds):** `#FFFFFF` (Clean White) - Used for main content areas to ensure readability.
*   **Neutral Color (Borders/Subtext):** `#888888` or `#F4F4F4` (Concrete Grey).
*   **Typography:** 
    *   *Headings:* Bold, geometric Sans-Serif (e.g., Montserrat, Oswald) to match the industrial logo.
    *   *Body:* Clean, highly readable Sans-Serif (e.g., Open Sans, Inter).
*   **Visual Style:** Clean lines, high-contrast sections, geometric layouts, and heavy reliance on high-quality project photography.

---

## 3. Technical Stack & Architecture
*   **Framework:** React.js (Strongly recommended to use **Next.js** App Router to natively handle SSR/SSG for the strict SEO requirements).
*   **Styling:** Tailwind CSS or CSS Modules (for clean, maintainable component styling).
*   **Asset Management:** All static images, icons, and fonts must be stored in a dedicated `/public/assets/images` or `/public/images` directory.
*   **Hosting/Deployment:** Vercel or Netlify (to ensure automatic HTTPS enforcement and global CDN for Core Web Vitals).

---

## 4. SEO & Technical Performance Requirements
*This section is critical. The AI agent must strictly adhere to these rules.*

*   **Meta Tags:** Dynamic `<title>` and `<meta name="description">` for every single page.
*   **Open Graph (OG):** `og:image`, `og:title`, and `og:description` configured for social sharing.
*   **Header Hierarchy:** Strict enforcement. Exactly **one `<h1>`** per page. `<h2>` for main sections, `<h3>` for cards/subsections. No skipping levels.
*   **URL Slugs:** Clean, lowercase, hyphenated URLs (e.g., `/services/residential-construction`, NOT `/services?id=1`).
*   **Canonical Tags:** Self-referencing `<link rel="canonical">` on every page to prevent duplicate content.
*   **Image Optimization:** 
    *   All images must have descriptive `alt` text.
    *   Images must be served in modern formats (WebP).
    *   Explicit `width` and `height` attributes on all `<img>` tags to prevent Cumulative Layout Shift (CLS).
*   **Core Web Vitals:** Implement Lazy Loading for all images below the fold. Ensure LCP (Largest Contentful Paint) is under 2.5s.
*   **Sitemap & Robots:** Generate a dynamic `sitemap.xml` and a `robots.txt` file allowing search engine crawlers.
*   **Schema Markup:** Inject `LocalBusiness` JSON-LD schema globally (Name: Toplin Investments, Address: Windhoek, Namibia, Phone: +264 81 718 4507).
*   **Search Console:** Include the Google Search Console verification meta tag in the global `<head>`.
*   **Security:** Enforce HTTPS globally.

---

## 5. Site Architecture & Routing
The website will consist of four primary pages:
1.  **Home** (`/`)
2.  **About** (`/about`)
3.  **Services** (`/services`)
4.  **Contact** (`/contact`)

---

## 6. Page-by-Page Specifications

### 6.1 Home Page (`/`)
*   **Hero Section:** Dark background with a high-quality construction/finished home image. 
    *   *H1:* "Building & Developing Your Vision in Windhoek."
    *   *CTAs:* "View Our Projects" (Secondary) and "Get a Free Quote" (Primary - Red).
*   **Services Overview:** Grid of 3-4 cards highlighting Residential, Commercial, and Renovations.
*   **Trust/Why Us Section:** "Why Choose Toplin Investments" with bullet points (Licensed, On-Time, Quality Materials) and an image of the team/site.
*   **Featured Projects:** A masonry or horizontal scroll grid showing 4 recent projects (Joinery, Ceilings, Paving).
*   **Final CTA:** Dark section prompting the user to start their project.

### 6.2 About Page (`/about`)
*   **Hero Section:** 
    *   *H1:* "About Toplin Investments"
*   **Our Story:** Text block detailing the company's history and commitment to Namibian construction.
*   **Mission & Vision:** Two side-by-side cards.
*   **Leadership/Team:** Brief profile section for the founder/lead (Ben).

### 6.3 Services Page (`/services`)
*   **Hero Section:** 
    *   *H1:* "Our Construction Services"
*   **Main Pillars:** Large cards for Residential Construction, Commercial Buildings, Renovations, and Project Management.
*   **Specialized Finishing:** A secondary grid for Joinery, Ceilings, Paving, and Concrete Construction.
*   **Our Process:** A 4-step visual timeline (Consultation -> Planning -> Construction -> Handover).

### 6.4 Contact Page (`/contact`)
*   **Hero Section:** 
    *   *H1:* "Get In Touch"
*   **Two-Column Layout:**
    *   *Left:* Contact details (Phone, Email, Address), clickable links, and an embedded Google Map of Windhoek.
    *   *Right:* Contact Form (Name, Email, Phone, Service Dropdown, Message).
*   **FAQ Section:** Accordion-style Frequently Asked Questions (doubles as training data for the chatbot).

---

## 7. Feature Specifications: Floating Widgets

A **Floating Action Button (FAB)** menu must be fixed to the bottom-right corner of the screen on all pages.

### 7.1 WhatsApp Widget
*   **Visual:** Standard WhatsApp green icon (`#25D366`).
*   **Action:** On click, opens a new tab to `https://wa.me/264817184507`.

### 7.2 Rule-Based AI Chatbot Widget
*   **Position:** Stacked directly *above* the WhatsApp widget when the menu is expanded.
*   **Visual:** Red/Black chat icon.
*   **Interaction:** 
    *   Clicking the main FAB expands a small menu revealing both the Chatbot and WhatsApp buttons.
    *   Clicking the Chatbot button opens a slide-out drawer or modal.
*   **Chatbot Logic (Rule-Based):**
    *   *Greeting:* "Hi! Welcome to Toplin Investments. How can I help you today?"
    *   *Options:* [View Services] [Get a Quote] [Location/Hours] [Talk to Human].
    *   *Fallback:* If the user types something outside the rules, the bot responds: "I'm not sure about that, but you can chat directly with Ben on WhatsApp!" and highlights the WhatsApp button.

---

## 8. Asset Management Strategy
*   **Directory Structure:** All images must be placed in `/public/assets/images/`.
*   **Subfolders:** Organize by category (e.g., `/projects`, `/services`, `/team`, `/hero`).
*   **Naming Convention:** Use kebab-case for all file names (e.g., `modern-joinery-installation.webp`, NOT `IMG_1234.JPG`).
*   **Optimization:** All images must be pre-compressed and converted to `.webp` format before being added to the folder to ensure Core Web Vitals compliance.
*   **Favicons & OG Images:** Store `favicon.ico` and `og-image.jpg` in the root of the `/public` folder.

---

## 9. Non-Functional Requirements
*   **Accessibility (a11y):** Ensure all interactive elements are keyboard navigable. Maintain WCAG AA contrast ratios. Use ARIA labels for the floating widgets.
*   **Responsiveness:** The site must be fully responsive. Mobile-first approach is required. The navigation must collapse into a hamburger menu on screens smaller than 768px.
*   **Form Handling:** The contact form must include basic client-side validation (required fields, valid email format) and provide clear success/error messages upon submission.