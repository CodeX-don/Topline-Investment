
# Technical Design Document (TDD): Toplin Investments Website

**Project:** Toplin Investments Corporate Website  
**Version:** 1.0  
**Last Updated:** October 27, 2026  
**Tech Stack:** React (Next.js), Tailwind CSS

---

## Table of Contents
1. [System Architecture](#1-system-architecture)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Component Architecture](#4-component-architecture)
5. [State Management](#5-state-management)
6. [Data Models & Types](#6-data-models--types)
7. [SEO Implementation Strategy](#7-seo-implementation-strategy)
8. [Widget Implementation](#8-widget-implementation)
9. [Form Handling](#9-form-handling)
10. [Image Optimization Strategy](#10-image-optimization-strategy)
11. [Performance Optimization](#11-performance-optimization)
12. [Third-Party Integrations](#12-third-party-integrations)
13. [Build & Deployment](#13-build--deployment)
14. [Testing Strategy](#14-testing-strategy)
15. [Security Considerations](#15-security-considerations)
16. [Environment Variables](#16-environment-variables)

---

## 1. System Architecture

### 1.1 High-Level Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │   React      │  │   Tailwind   │      │
│  │   SSR/SSG    │  │   Components │  │   CSS        │      │
│  └──────────────  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   SEO Meta   │  │   Floating   │  │   Contact    │      │
│  │   Tags       │  │   Widgets    │  │   Forms      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  External Services                           │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────  ┌──────────────┐      │
│  │   WhatsApp   │  │   Google     │  │   Email      │      │
│  │   API        │  │   Maps       │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Rendering Strategy
- **Static Site Generation (SSG):** All pages will be pre-rendered at build time for optimal performance and SEO.
- **Client-Side Hydration:** React will hydrate static HTML for interactivity (widgets, forms, navigation).
- **No Server-Side Rendering (SSR) Required:** Since content is mostly static, SSG is sufficient.

---

## 2. Technology Stack

### 2.1 Core Framework & Libraries
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with SSG/SSR capabilities |
| **React** | 18.x | UI component library |
| **TypeScript** | 5.x | Type safety (recommended but optional) |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |

### 2.2 Additional Dependencies
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "react-icons": "4.x",
    "next-seo": "6.x",
    "next-sitemap": "4.x",
    "sharp": "0.33.x",
    "eslint": "8.x",
    "eslint-config-next": "14.x"
  },
  "devDependencies": {
    "@types/node": "20.x",
    "@types/react": "18.x",
    "autoprefixer": "10.x",
    "postcss": "8.x",
    "tailwindcss": "3.x"
  }
}
```

### 2.3 Build Tools
- **Package Manager:** npm or yarn
- **Bundler:** Webpack (via Next.js)
- **Transpiler:** Babel/SWC (via Next.js)
- **CSS Processor:** PostCSS with Autoprefixer

---

## 3. Project Structure

### 3.1 Directory Layout
```
toplin-investments/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── projects/
│   │   │   ├── services/
│   │   │   ├── team/
│   │   │   └── logos/
│   │   ├── fonts/
│   │   └── icons/
│   ├── favicon.ico
│   ├── og-image.jpg
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.tsx            # Root layout with SEO
│   │   ├── page.tsx              # Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── ProjectsGallery.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── FAQSection.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── Image.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── widgets/
│   │   │   ├── FloatingWidgets.tsx
│   │   │   ├── WhatsAppWidget.tsx
│   │   │   ├── ChatbotWidget.tsx
│   │   │   └── ChatbotModal.tsx
│   │   │
│   │   └── seo/
│   │       ├── MetaTags.tsx
│   │       ├── SchemaMarkup.tsx
│   │       └── OpenGraph.tsx
│   │
│   ├── data/
│   │   ├── services.ts
│   │   ├── projects.ts
│   │   ├── testimonials.ts
│   │   ├── faqs.ts
│   │   └── company.ts
│   │
│   ├── types/
│   │   ├── index.ts
│   │   ├── service.ts
│   │   ├── project.ts
│   │   └── testimonial.ts
│   │
│   ├── utils/
│   │   ├── seo.ts
│   │   ├── chatbot.ts
│   │   └── validation.ts
│   │
│   └── hooks/
│       ├── useScrollPosition.ts
│       └── useChatbot.ts
│
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 3.2 File Naming Conventions
- **Components:** PascalCase (e.g., `HeroSection.tsx`)
- **Utilities/Hooks:** camelCase (e.g., `useScrollPosition.ts`)
- **Data Files:** camelCase (e.g., `services.ts`)
- **Type Definitions:** PascalCase files, camelCase exports
- **Images:** kebab-case (e.g., `modern-family-home.webp`)

---

## 4. Component Architecture

### 4.1 Component Hierarchy
```
App (layout.tsx)
├── Header
│   ├── Logo
│   ├── Navigation (Desktop)
│   └── MobileMenu (Mobile)
│
├── Page Content
│   ├── HeroSection
│   ├── ServicesOverview
│   ├── WhyChooseUs
│   ├── ProjectsGallery
│   └── CTASection
│
├── Footer
│   ├── FooterLinks
│   ├── ContactInfo
│   └── SocialLinks
│
└── FloatingWidgets (Fixed Position)
    ├── WhatsAppWidget
    └── ChatbotWidget
        └── ChatbotModal
```

### 4.2 Component Specifications

#### 4.2.1 Layout Components

**Header.tsx**
```typescript
interface HeaderProps {
  isScrolled: boolean;
}

// Props:
// - isScrolled: boolean (for sticky header styling)
// Features:
// - Sticky positioning
// - Background changes on scroll
// - Mobile-responsive hamburger menu
// - Active link highlighting
```

**Footer.tsx**
```typescript
interface FooterProps {
  companyInfo: CompanyInfo;
  socialLinks: SocialLink[];
}

// Features:
// - Multi-column layout
// - Newsletter signup (optional)
// - Copyright & legal links
```

#### 4.2.2 Section Components

**HeroSection.tsx**
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
}

// Features:
// - Full-width background image with overlay
// - H1 heading (SEO optimized)
// - Two CTA buttons
// - Responsive text sizing
```

**ServicesOverview.tsx**
```typescript
interface ServicesOverviewProps {
  services: ServiceCard[];
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

// Features:
// - Grid layout (3-4 columns desktop, 1 column mobile)
// - Hover effects
// - Icon + text + link
```

**ProjectsGallery.tsx**
```typescript
interface ProjectsGalleryProps {
  projects: Project[];
}

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  href?: string;
}

// Features:
// - Masonry or grid layout
// - Image lazy loading
// - Category filtering (optional)
// - Lightbox view (optional)
```

#### 4.2.3 UI Components

**Button.tsx**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

// Variants:
// - primary: Red background (#E31E24), white text
// - secondary: White background, black text
// - outline: Transparent background, white border
```

**SectionHeading.tsx**
```typescript
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2' | 'h3';
}

// Features:
// - Consistent typography
// - Optional subtitle
// - Alignment options
```

#### 4.2.4 Widget Components

**FloatingWidgets.tsx**
```typescript
interface FloatingWidgetsProps {
  whatsappNumber: string;
  chatbotConfig: ChatbotConfig;
}

// Features:
// - Fixed position bottom-right
// - z-index: 1000 (above all content)
// - Smooth animations
// - Accessible (ARIA labels)
```

**WhatsAppWidget.tsx**
```typescript
interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
}

// Features:
// - WhatsApp green icon (#25D366)
// - Opens wa.me link in new tab
// - Prefilled message option
```

**ChatbotWidget.tsx**
```typescript
interface ChatbotWidgetProps {
  rules: ChatbotRule[];
  companyName: string;
}

interface ChatbotRule {
  trigger: string[];
  response: string;
  action?: 'whatsapp' | 'email' | 'none';
}

// Features:
// - Rule-based conversation flow
// - Quick reply buttons
// - Fallback to WhatsApp
// - Persistent chat history (session-based)
```

---

## 5. State Management

### 5.1 State Strategy
For a static corporate website, **React Context + Local State** is sufficient. No need for Redux or Zustand.

### 5.2 Global State (Context API)

**AppContext.tsx**
```typescript
interface AppState {
  // UI State
  isMobileMenuOpen: boolean;
  isChatbotOpen: boolean;
  isScrolled: boolean;
  
  // Theme State (if dark mode implemented)
  theme: 'light' | 'dark';
  
  // Actions
  toggleMobileMenu: () => void;
  toggleChatbot: () => void;
  setScrolled: (isScrolled: boolean) => void;
}

// Context Provider wraps the entire app
```

### 5.3 Local State (useState/useReducer)
- **Form inputs:** Controlled components with useState
- **Chatbot conversation:** useReducer for complex state
- **Image lightbox:** useState for active image index
- **FAQ accordion:** useState for open/closed states

### 5.4 Persistent State (localStorage)
- Chatbot conversation history (session-based)
- User theme preference (if dark mode implemented)
- Form draft data (optional, for UX)

---

## 6. Data Models & Types

### 6.1 TypeScript Interfaces

**types/index.ts**
```typescript
// Company Information
export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  registrationNumber?: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  image?: string;
  category: 'residential' | 'commercial' | 'renovation' | 'finishing';
}

// Project Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  year: number;
  images: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  featured: boolean;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number; // 1-5
  avatar?: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Chatbot Types
export interface ChatbotMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

export interface ChatbotRule {
  id: string;
  triggers: string[];
  response: string;
  quickReplies?: string[];
  action?: {
    type: 'open_whatsapp' | 'open_email' | 'scroll_to_section';
    target?: string;
  };
}
```

### 6.2 Data Files Structure

**data/company.ts**
```typescript
export const companyInfo: CompanyInfo = {
  name: "Toplin Investments",
  tagline: "Building & Developing",
  description: "Expert residential and commercial construction in Windhoek, Namibia",
  address: "Windhoek",
  city: "Windhoek",
  country: "Namibia",
  phone: "+264 81 718 4507",
  email: "ben@toplin.com.na",
  whatsappNumber: "264817184507",
};
```

**data/services.ts**
```typescript
export const services: Service[] = [
  {
    id: "residential-construction",
    title: "Residential Construction",
    slug: "residential-construction",
    description: "...",
    shortDescription: "New home builds & custom residential projects",
    icon: "home",
    features: ["Custom Design", "Quality Materials", "On-Time Delivery"],
    category: "residential",
  },
  // ... more services
];
```

**data/projects.ts**
```typescript
export const projects: Project[] = [
  {
    id: "modern-family-home",
    title: "Modern Family Home",
    slug: "modern-family-home",
    category: "Residential",
    description: "...",
    location: "Windhoek",
    year: 2024,
    images: [
      { url: "/assets/images/projects/modern-family-home-1.webp", alt: "..." }
    ],
    featured: true,
  },
  // ... more projects
];
```

---

## 7. SEO Implementation Strategy

### 7.1 Meta Tags Configuration

**utils/seo.ts**
```typescript
import { DefaultSeo, NextSeoProps } from 'next-seo';

export const defaultSEO: NextSeoProps = {
  titleTemplate: '%s | Toplin Investments',
  defaultTitle: 'Toplin Investments - Building & Developing in Windhoek',
  description: 'Expert residential and commercial construction company in Windhoek, Namibia. Specializing in building, renovations, joinery, and paving.',
  openGraph: {
    type: 'website',
    locale: 'en_NA',
    url: 'https://toplin.com.na',
    siteName: 'Toplin Investments',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Toplin Investments - Construction Company',
      },
    ],
  },
  twitter: {
    handle: '@toplininvest',
    site: '@toplininvest',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'google-site-verification',
      content: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE',
    },
  ],
};

export const pageSEO = {
  home: {
    title: 'Home - Building Strong Foundations',
    description: 'Trusted residential & commercial construction experts delivering quality, safety, and on-time results in Windhoek.',
  },
  about: {
    title: 'About Us - Toplin Investments',
    description: 'Learn about Toplin Investments, Windhoek\'s premier construction and development company.',
  },
  services: {
    title: 'Our Services - Construction & Development',
    description: 'Residential construction, commercial buildings, renovations, joinery, and paving services in Namibia.',
  },
  contact: {
    title: 'Contact Us - Get a Free Quote',
    description: 'Contact Toplin Investments for your construction project. Call +264 81 718 4507 or email ben@toplin.com.na',
  },
};
```

### 7.2 Schema Markup Implementation

**components/seo/SchemaMarkup.tsx**
```typescript
import { JSONLD, GenericJson } from 'next-seo';

export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Toplin Investments",
    "image": "https://toplin.com.na/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Windhoek",
      "addressCountry": "NA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -22.5597,
      "longitude": 17.0832
    },
    "url": "https://toplin.com.na",
    "telephone": "+264817184507",
    "email": "ben@toplin.com.na",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/toplin_investments"
    ]
  };

  return <JSONLD item={schema} />;
};

export const ServiceSchema = (service: Service) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Toplin Investments"
    },
    "areaServed": {
      "@type": "City",
      "name": "Windhoek"
    }
  };

  return <JSONLD item={schema} />;
};
```

### 7.3 Sitemap & Robots Configuration

**next-sitemap.config.js**
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toplin.com.na',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
};
```

**public/robots.txt**
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://toplin.com.na/sitemap.xml
```

### 7.4 Canonical URLs
Every page must include a self-referencing canonical tag:
```typescript
<link rel="canonical" href="https://toplin.com.na/current-page" />
```

### 7.5 Header Hierarchy Rules
- **Home Page:** 
  - H1: "Building & Developing Your Vision in Windhoek"
  - H2: "Our Services", "Why Choose Toplin", "Recent Projects"
  - H3: Individual service names, project titles
  
- **About Page:**
  - H1: "About Toplin Investments"
  - H2: "Our Story", "Mission & Vision", "Our Team"
  
- **Services Page:**
  - H1: "Our Construction Services"
  - H2: "What We Build", "Specialized Finishing", "Our Process"
  
- **Contact Page:**
  - H1: "Get In Touch"
  - H2: "Contact Information", "Send Us a Message", "FAQs"

---

## 8. Widget Implementation

### 8.1 Floating Action Button (FAB) Architecture

**components/widgets/FloatingWidgets.tsx**
```typescript
'use client';

import { useState } from 'react';
import { WhatsAppWidget } from './WhatsAppWidget';
import { ChatbotWidget } from './ChatbotWidget';

export const FloatingWidgets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState<'none' | 'whatsapp' | 'chatbot'>('none');

  const toggleWidget = (widget: 'whatsapp' | 'chatbot') => {
    if (activeWidget === widget) {
      setIsOpen(false);
      setActiveWidget('none');
    } else {
      setIsOpen(true);
      setActiveWidget(widget);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chatbot Modal */}
      {activeWidget === 'chatbot' && <ChatbotModal onClose={() => setActiveWidget('none')} />}
      
      {/* WhatsApp Button */}
      <WhatsAppWidget 
        isVisible={activeWidget === 'whatsapp' || !isOpen}
        onClick={() => toggleWidget('whatsapp')}
      />
      
      {/* Chatbot Button */}
      <ChatbotWidget 
        isVisible={activeWidget === 'chatbot' || !isOpen}
        onClick={() => toggleWidget('chatbot')}
      />
      
      {/* Main FAB Toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#E31E24] text-white shadow-lg hover:bg-red-700 transition-all"
          aria-label="Open chat options"
        >
          <MessageIcon />
        </button>
      )}
    </div>
  );
};
```

### 8.2 WhatsApp Integration

**components/widgets/WhatsAppWidget.tsx**
```typescript
interface WhatsAppWidgetProps {
  phoneNumber: string;
  prefillMessage?: string;
  isVisible: boolean;
  onClick: () => void;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber,
  prefillMessage = "Hi Toplin Investments, I'm interested in your services.",
  isVisible,
  onClick,
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(prefillMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleWhatsAppClick}
      className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </button>
  );
};
```

### 8.3 Rule-Based Chatbot Implementation

**utils/chatbot.ts**
```typescript
import { ChatbotRule, ChatbotMessage } from '@/types';

export const chatbotRules: ChatbotRule[] = [
  {
    id: 'greeting',
    triggers: ['hi', 'hello', 'hey', 'start'],
    response: "Hi! Welcome to Toplin Investments. How can I help you today?",
    quickReplies: ['View Services', 'Get a Quote', 'Location & Hours', 'Talk to Human'],
  },
  {
    id: 'services',
    triggers: ['service', 'services', 'what do you do', 'offer'],
    response: "We offer residential construction, commercial buildings, renovations, joinery, ceilings, and paving services. Which one interests you?",
    quickReplies: ['Residential', 'Commercial', 'Renovations', 'Back to Menu'],
  },
  {
    id: 'quote',
    triggers: ['quote', 'price', 'cost', 'estimate'],
    response: "I'd be happy to help you get a quote! Please share your project details, or I can connect you directly with Ben on WhatsApp.",
    quickReplies: ['Contact on WhatsApp', 'Email Us', 'Back to Menu'],
    action: { type: 'scroll_to_section', target: 'contact' },
  },
  {
    id: 'location',
    triggers: ['location', 'where', 'address', 'hours'],
    response: "We're based in Windhoek, Namibia. Our office hours are Monday-Friday, 8:00 AM - 5:00 PM.",
    quickReplies: ['Get Directions', 'Contact Us', 'Back to Menu'],
  },
  {
    id: 'human',
    triggers: ['human', 'person', 'agent', 'speak to someone'],
    response: "I'll connect you with Ben right away. He'll be happy to assist you!",
    action: { type: 'open_whatsapp' },
  },
  {
    id: 'fallback',
    triggers: ['*'], // Catch-all
    response: "I'm not sure about that, but I can connect you with Ben on WhatsApp who will be happy to help!",
    quickReplies: ['Chat on WhatsApp', 'Email Us', 'Back to Menu'],
  },
];

export const findMatchingRule = (userInput: string): ChatbotRule => {
  const normalizedInput = userInput.toLowerCase().trim();
  
  const exactMatch = chatbotRules.find(rule =>
    rule.triggers.some(trigger => trigger.toLowerCase() === normalizedInput)
  );
  
  if (exactMatch) return exactMatch;
  
  const partialMatch = chatbotRules.find(rule =>
    rule.triggers.some(trigger => normalizedInput.includes(trigger.toLowerCase()))
  );
  
  return partialMatch || chatbotRules.find(rule => rule.id === 'fallback')!;
};
```

**components/widgets/ChatbotModal.tsx**
```typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatbotMessage } from '@/types';
import { findMatchingRule, chatbotRules } from '@/utils/chatbot';

export const ChatbotModal = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! Welcome to Toplin Investments. How can I help you today?",
      timestamp: new Date(),
      quickReplies: ['View Services', 'Get a Quote', 'Location & Hours'],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = (reply: string) => {
    handleUserMessage(reply);
  };

  const handleUserMessage = (text: string) => {
    const userMessage: ChatbotMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Process bot response
    setTimeout(() => {
      const rule = findMatchingRule(text);
      const botMessage: ChatbotMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: rule.response,
        timestamp: new Date(),
        quickReplies: rule.quickReplies,
      };

      setMessages(prev => [...prev, botMessage]);

      // Handle actions
      if (rule.action?.type === 'open_whatsapp') {
        window.open('https://wa.me/264817184507', '_blank');
      } else if (rule.action?.type === 'scroll_to_section' && rule.action.target) {
        const element = document.getElementById(rule.action.target);
        element?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-[#E31E24] text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Toplin Investments Chat</h3>
        <button onClick={onClose} aria-label="Close chat">
          <CloseIcon />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-[#E31E24] text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.quickReplies && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition"
                    >
                      {reply}
                    </button>
          ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
          />
          <button
            type="submit"
            className="bg-[#E31E24] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
```

---

## 9. Form Handling

### 9.1 Contact Form Component

**components/sections/ContactForm.tsx**
```typescript
'use client';

import { useState } from 'react';
import { validateEmail, validatePhone } from '@/utils/validation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Replace with your form submission endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+264 XX XXX XXXX"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
        >
          <option value="">Select a service</option>
          <option value="residential">Residential Construction</option>
          <option value="commercial">Commercial Buildings</option>
          <option value="renovation">Renovations</option>
          <option value="joinery">Joinery</option>
          <option value="paving">Paving</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#E31E24] text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Sorry, there was an error sending your message. Please try again or contact us directly.
        </div>
      )}
    </form>
  );
};
```

### 9.2 Validation Utilities

**utils/validation.ts**
```typescript
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Namibia phone number format: +264 XX XXX XXXX or 081 XXX XXXX
  const phoneRegex = /^(\+264|0)[8-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>\"'&]/g, '');
};
```

### 9.3 API Route for Form Submission

**app/api/contact/route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would:
    // 1. Send email using a service like SendGrid, Resend, or Nodemailer
    // 2. Save to database (if needed)
    // 3. Send notification to WhatsApp or SMS

    // Example: Send email
    // await sendEmail({
    //   to: 'ben@toplin.com.na',
    //   subject: `New Inquiry from ${name}`,
    //   body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`,
    // });

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 10. Image Optimization Strategy

### 10.1 Image Handling Guidelines

**All images must:**
1. Be in WebP format (with JPEG fallback if necessary)
2. Have explicit width and height attributes
3. Include descriptive alt text
4. Be lazy-loaded (except hero images)
5. Be compressed (max 200KB for standard images, 500KB for hero)

### 10.2 Next.js Image Component Usage

**components/ui/Image.tsx**
```typescript
import NextImage, { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
  priority?: boolean;
  className?: string;
}

export const Image: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  ...props
}) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
};
```

### 10.3 Image Directory Structure
```
public/assets/images/
├── hero/
│   ├── construction-site.webp (1920x1080, ~300KB)
│   └── finished-home.webp (1920x1080, ~300KB)
├── projects/
│   ├── modern-family-home-1.webp (800x600, ~100KB)
│   ├── modern-family-home-2.webp (800x600, ~100KB)
│   ├── downtown-office-tower.webp (800x600, ~100KB)
│   └── ...
├── services/
│   ├── residential.webp (600x400, ~80KB)
│   ├── commercial.webp (600x400, ~80KB)
│   └── ...
├── team/
│   ├── ben-profile.webp (400x400, ~50KB)
│   └── ...
└── logos/
    ├── toplin-logo.svg
    └── toplin-logo-white.svg
```

### 10.4 Image Optimization Configuration

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
```

---

## 11. Performance Optimization

### 11.1 Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.8s

### 11.2 Optimization Strategies

**1. Code Splitting:**
- Next.js automatically code-splits by route
- Dynamic imports for heavy components (maps, chatbot)

**2. Font Optimization:**
```typescript
// app/layout.tsx
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});
```

**3. CSS Optimization:**
- Use Tailwind's purge/tree-shaking in production
- Minimize custom CSS
- Use CSS variables for theme colors

**4. JavaScript Optimization:**
- Defer non-critical JavaScript
- Use `next/dynamic` for heavy components:
```typescript
import dynamic from 'next/dynamic';

const ChatbotModal = dynamic(() => import('@/components/widgets/ChatbotModal'), {
  loading: () => <div>Loading chat...</div>,
  ssr: false, // Chatbot doesn't need SSR
});
```

**5. Caching Strategy:**
- Static pages cached at CDN level
- Images cached with long TTL (1 year)
- API responses cached where appropriate

### 11.3 Performance Monitoring
- Integrate Google Analytics 4
- Set up Google Search Console
- Use Vercel Analytics (if hosting on Vercel)
- Run regular Lighthouse audits

---

## 12. Third-Party Integrations

### 12.1 WhatsApp Business API
- **Integration Type:** Click-to-chat (wa.me links)
- **Phone Number:** +264 81 718 4507
- **Implementation:** No API key required for basic click-to-chat

### 12.2 Google Maps
```typescript
// components/sections/GoogleMap.tsx
export const GoogleMap = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114684.846!2d17.0832!3d-22.5597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1b5d77b5a5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sWindhoek!5e0!3m2!1sen!2sna!4v1234567890"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Toplin Investments Location"
    />
  );
};
```

### 12.3 Google Analytics 4
**components/seo/GoogleAnalytics.tsx**
```typescript
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const GoogleAnalytics = ({ GA_TRACKING_ID }: { GA_TRACKING_ID: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID);
  }, [GA_TRACKING_ID]);

  useEffect(() => {
    if (pathname) {
      ReactGA.send({ hitType: 'pageview', page: pathname + searchParams.toString() });
    }
  }, [pathname, searchParams]);

  return null;
};
```

### 12.4 Email Service (Optional)
- **Recommended:** Resend, SendGrid, or Nodemailer
- **Purpose:** Contact form submissions, notifications
- **Environment Variables:** `EMAIL_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`

---

## 13. Build & Deployment

### 13.1 Build Configuration

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // For static export (optional)
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
};

module.exports = nextConfig;
```

### 13.2 Deployment Platforms

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Option 2: Netlify**
```bash
# Build command
npm run build

# Publish directory
out  # (if using output: 'export')
# or
.next  # (for Next.js SSR)
```

**Option 3: Traditional Hosting**
```bash
# Build static export
npm run build
npm run export

# Upload 'out' directory to web server
```

### 13.3 CI/CD Pipeline (GitHub Actions)

**.github/workflows/deploy.yml**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Run tests
        run: npm test
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 13.4 Environment Variables

**.env.local**
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://toplin.com.na
NEXT_PUBLIC_WHATSAPP_NUMBER=264817184507

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Service (if using)
EMAIL_API_KEY=your_api_key
EMAIL_FROM=noreply@toplin.com.na
EMAIL_TO=ben@toplin.com.na

# Google Maps (if using custom API)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

**.env.example**
```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_GA_ID=
EMAIL_API_KEY=
EMAIL_FROM=
EMAIL_TO=
```

---

## 14. Testing Strategy

### 14.1 Testing Framework
- **Unit Tests:** Jest + React Testing Library
- **E2E Tests:** Playwright or Cypress
- **Visual Regression:** Chromatic (optional)

### 14.2 Test Coverage Targets
- **Statements:** > 80%
- **Branches:** > 75%
- **Functions:** > 80%
- **Lines:** > 80%

### 14.3 Example Test Files

**tests/components/ContactForm.test.tsx**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '@/components/sections/ContactForm';

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    // Mock API call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '+264 81 123 4567' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  });
});
```

**tests/utils/validation.test.ts**
```typescript
import { validateEmail, validatePhone } from '@/utils/validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('returns true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.na')).toBe(true);
    });

    it('returns false for invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('returns true for valid Namibian phone numbers', () => {
      expect(validatePhone('+264811234567')).toBe(true);
      expect(validatePhone('0811234567')).toBe(true);
      expect(validatePhone('+264 81 123 4567')).toBe(true);
    });

    it('returns false for invalid phone numbers', () => {
      expect(validatePhone('123456')).toBe(false);
      expect(validatePhone('+27811234567')).toBe(false);
    });
  });
});
```

### 14.4 Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works on mobile and desktop
- [ ] Contact form submits successfully
- [ ] WhatsApp widget opens correct number
- [ ] Chatbot responds to all defined triggers
- [ ] All images load and have alt text
- [ ] Meta tags are correct (use Facebook Debugger)
- [ ] Sitemap.xml is accessible
- [ ] Robots.txt allows crawling
- [ ] HTTPS is enforced
- [ ] Core Web Vitals pass (Lighthouse score > 90)
- [ ] Schema markup validates (Google Rich Results Test)

---

## 15. Security Considerations

### 15.1 Security Headers

**next.config.js**
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 15.2 Input Sanitization
- All form inputs must be sanitized server-side
- Use DOMPurify for any user-generated content displayed on the page
- Implement rate limiting on API routes (if using serverless functions)

### 15.3 HTTPS Enforcement
- Force HTTPS via hosting platform (Vercel/Netlify do this automatically)
- Update all internal links to use relative paths or HTTPS
- Implement HSTS headers (see above)

### 15.4 Environment Variable Security
- Never commit `.env.local` to version control
- Use `.env.example` as a template
- Rotate API keys regularly
- Use different keys for development and production

### 15.5 Dependency Security
- Run `npm audit` regularly
- Use `npm audit fix` to patch vulnerabilities
- Keep dependencies updated
- Use Dependabot or similar automated security updates

---

## 16. Environment Variables

### 16.1 Required Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public | Yes | Production URL (e.g., https://toplin.com.na) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public | Yes | WhatsApp number without + (264817184507) |
| `NEXT_PUBLIC_GA_ID` | Public | No | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Public | No | Google Maps Embed API key |
| `EMAIL_API_KEY` | Private | No | Email service API key |
| `EMAIL_FROM` | Private | No | Sender email address |
| `EMAIL_TO` | Private | No | Recipient email address |

### 16.2 Variable Usage

**Client-Side (Public)**
```typescript
// Access via process.env.NEXT_PUBLIC_*
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
```

**Server-Side (Private)**
```typescript
// Access via process.env.* (not prefixed with NEXT_PUBLIC_)
const emailApiKey = process.env.EMAIL_API_KEY;
const emailTo = process.env.EMAIL_TO;
```

### 16.3 Environment-Specific Configuration

**.env.development**
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=264817184507
```

**.env.production**
```bash
NEXT_PUBLIC_SITE_URL=https://toplin.com.na
NEXT_PUBLIC_WHATSAPP_NUMBER=264817184507
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 17. Maintenance & Monitoring

### 17.1 Regular Maintenance Tasks
- [ ] Weekly: Check for dependency updates
- [ ] Monthly: Run security audit (`npm audit`)
- [ ] Monthly: Review Google Search Console for errors
- [ ] Quarterly: Update content and images
- [ ] Quarterly: Test all forms and widgets
- [ ] Annually: Review and update SEO meta tags

### 17.2 Monitoring Tools
- **Uptime:** UptimeRobot or Pingdom
- **Performance:** Google PageSpeed Insights API
- **Errors:** Sentry (optional, for JavaScript error tracking)
- **Analytics:** Google Analytics 4 + Search Console

### 17.3 Backup Strategy
- **Code:** GitHub (automatic version control)
- **Content:** Document in `/data` files (version controlled)
- **Database:** N/A (static site)
- **Media:** Keep original high-res images in separate backup storage

---

## 18. Accessibility (a11y) Requirements

### 18.1 WCAG 2.1 AA Compliance
- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation:** All interactive elements must be focusable
- **Screen Readers:** Proper ARIA labels and roles
- **Focus Indicators:** Visible focus states on all interactive elements

### 18.2 Implementation Checklist
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Buttons have descriptive text (not just "Click here")
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] Color is not the only means of conveying information
- [ ] Site is navigable via keyboard only
- [ ] Skip to main content link is present
- [ ] Language attribute is set on HTML element (`lang="en"`)
- [ ] Focus trap in modals (chatbot)
- [ ] Reduced motion support (`prefers-reduced-motion`)

### 18.3 Testing Tools
- **Automated:** axe-core, Lighthouse accessibility audit
- **Manual:** Keyboard-only navigation, screen reader testing (NVDA/VoiceOver)
- **Color Contrast:** WebAIM Contrast Checker

---

## 19. Browser Support

### 19.1 Supported Browsers
- **Chrome:** Last 2 versions
- **Firefox:** Last 2 versions
- **Safari:** Last 2 versions
- **Edge:** Last 2 versions
- **Mobile Safari:** iOS 12+
- **Chrome Mobile:** Android 5+

### 19.2 Polyfills
- Next.js includes necessary polyfills automatically
- Use `core-js` for additional polyfills if needed
- Test on older browsers if supporting IE11 (not recommended)

---

## 20. Documentation & Handoff

### 20.1 Developer Documentation
- **README.md:** Setup instructions, development workflow
- **CONTRIBUTING.md:** Code style, commit conventions
- **CHANGELOG.md:** Version history and updates

### 20.2 Content Management Guide
- Document how to update:
  - Service descriptions (`/data/services.ts`)
  - Project portfolio (`/data/projects.ts`)
  - Testimonials (`/data/testimonials.ts`)
  - FAQ content (`/data/faqs.ts`)
  - Company information (`/data/company.ts`)

### 20.3 Deployment Guide
- Step-by-step deployment instructions
- Environment variable setup
- Domain configuration
- SSL certificate setup (automatic on Vercel/Netlify)

---

## Appendix A: Color Palette Reference

```css
/* Primary Colors */
--color-primary: #E31E24;        /* Toplin Red */
--color-primary-hover: #C41A1F;  /* Darker Red */

/* Neutral Colors */
--color-black: #111111;          /* Deep Black */
--color-white: #FFFFFF;          /* Clean White */
--color-gray-light: #F4F4F4;     /* Light Gray */
--color-gray: #888888;           /* Concrete Gray */
--color-gray-dark: #333333;      /* Dark Gray */

/* Functional Colors */
--color-whatsapp: #25D366;       /* WhatsApp Green */
--color-success: #10B981;        /* Success Green */
--color-error: #EF4444;          /* Error Red */
--color-warning: #F59E0B;        /* Warning Yellow */
```

---

## Appendix B: Typography Scale

```css
/* Font Families */
--font-heading: 'Montserrat', sans-serif;
--font-body: 'Open Sans', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Appendix C: Breakpoints (Tailwind CSS)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large desktop
    },
  },
};
```

---

**Document End**

This Technical Design Document provides comprehensive specifications for building the Toplin Investments website. All developers and AI agents should follow these guidelines to ensure consistency, performance, and quality.

For questions or clarifications, refer to the PRD.md or contact the project lead.