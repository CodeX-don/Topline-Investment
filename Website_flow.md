
# App/Website Flow Document: Toplin Investments

**Project:** Toplin Investments Corporate Website  
**Version:** 1.0  
**Last Updated:** October 27, 2026  
**Purpose:** To define the logical user journeys, state transitions, and interaction flows for the AI development agent.

---

## Table of Contents
1. [Global Application Flow](#1-global-application-flow)
2. [Navigation & Routing Flow](#2-navigation--routing-flow)
3. [Page-Specific Interaction Flows](#3-page-specific-interaction-flows)
4. [Floating Widget Flows (Chatbot & WhatsApp)](#4-floating-widget-flows-chatbot--whatsapp)
5. [Contact Form Submission Flow](#5-contact-form-submission-flow)
6. [Edge Cases & Error Handling](#6-edge-cases--error-handling)
7. [State Management Flow](#7-state-management-flow)

---

## 1. Global Application Flow

### 1.1 Initial App Load
1. **User visits URL** (e.g., `https://toplin.com.na`).
2. **Framework initializes** (Next.js/React).
3. **Global Layout Renders**:
   - `<head>` injects default SEO meta tags, canonical links, and Schema Markup.
   - `<Header>` renders at the top (transparent initially, turns solid black/dark grey on scroll).
   - `<Footer>` renders at the bottom.
   - `<FloatingWidgets>` render fixed at the bottom-right corner.
4. **Page Content Renders**: The specific page component (Home, About, etc.) loads into the main layout container.
5. **Client Hydration**: React attaches event listeners to interactive elements (buttons, forms, widgets).

### 1.2 Scroll Behavior
- **Header**: Starts transparent. When user scrolls down > 50px, header background transitions to solid Deep Black (`#111111`) with a subtle shadow.
- **Images**: Images below the fold remain hidden/blurry until they enter the viewport, then they fade in (Lazy Loading).
- **Animations**: Elements fade up and slide in slightly as they enter the viewport (Intersection Observer).

---

## 2. Navigation & Routing Flow

### 2.1 Desktop Navigation
1. **User clicks a nav link** (e.g., "Services").
2. **Router intercepts click**: Prevents full page reload.
3. **Route changes**: URL updates to `/services`.
4. **SEO Update**: `<head>` meta tags, title, and canonical URL update dynamically for the new page.
5. **Scroll to top**: Window scrolls to `y = 0`.
6. **New Page Renders**: The "Services" page component mounts.
7. **Active State**: The "Services" link in the header highlights (e.g., bottom border in Toplin Red `#E31E24`).

### 2.2 Mobile Navigation (Hamburger Menu)
1. **User clicks Hamburger Icon** (top right).
2. **State Change**: `isMobileMenuOpen` becomes `true`.
3. **UI Update**: 
   - Hamburger icon morphs into an "X" (Close icon).
   - A slide-out drawer or full-screen overlay appears from the right.
   - Background body scroll is locked (`overflow: hidden`).
4. **User clicks a link inside menu**:
   - Route changes to the selected page.
   - `isMobileMenuOpen` becomes `false`.
   - Menu closes, scroll unlocks, and page scrolls to top.

---

## 3. Page-Specific Interaction Flows

### 3.1 Home Page Flow
- **Hero Section**: 
  - User clicks "Get a Free Quote" (Red button) -> Scrolls smoothly to the Contact section or navigates to `/contact`.
  - User clicks "View Our Projects" -> Navigates to the Projects section or `/services` (if a dedicated portfolio page isn't built).
- **Service Cards**: 
  - User hovers over a card -> Card lifts slightly (shadow increases), border or icon turns Toplin Red.
  - User clicks card -> Navigates to `/services` and auto-scrolls to the specific service category.

### 3.2 About Page Flow
- **Team Section**: 
  - User hovers over a team member's photo -> Photo scales up slightly (1.05x), overlay with social links appears.

### 3.3 Services Page Flow
- **Process Timeline**: 
  - As user scrolls down, the timeline line draws itself from top to bottom, and step icons pop in sequentially.
- **Service Filtering (If implemented)**:
  - User clicks a category tab (e.g., "Finishing").
  - Grid filters to show only Joinery, Ceilings, Paving.
  - Non-matching cards fade out; matching cards fade in.

---

## 4. Floating Widget Flows (Chatbot & WhatsApp)

*This is a critical flow. The widgets are stacked, and the AI agent must implement the exact interaction logic.*

### 4.1 Initial Widget State (Default)
- **Visual**: A single, circular Floating Action Button (FAB) is visible at the bottom right.
- **Style**: Toplin Red (`#E31E24`) background, white chat/message icon.
- **Action**: Clicking it expands the widget menu.

### 4.2 Expanded Widget State
1. **User clicks the main FAB**.
2. **State Change**: `isWidgetMenuOpen` becomes `true`.
3. **UI Update**:
   - Main FAB rotates 45 degrees (icon changes to an "X" or "Close").
   - Two smaller buttons animate upwards (staggered fade/slide up):
     - **Bottom Button**: WhatsApp Green (`#25D366`) with WhatsApp icon.
     - **Top Button**: Toplin Red/Black with AI Robot/Chat icon.
   - Clicking anywhere outside the widget closes the menu.

### 4.3 WhatsApp Interaction Flow
1. **User clicks the WhatsApp button**.
2. **Action**: 
   - Opens a new browser tab/window.
   - URL loads: `https://wa.me/264817184507?text=Hi%20Toplin%20Investments...`
3. **UI Update**: Widget menu automatically closes (`isWidgetMenuOpen = false`).

### 4.4 AI Chatbot Interaction Flow (Rule-Based)
1. **User clicks the Chatbot button**.
2. **State Change**: `isChatbotModalOpen` becomes `true`.
3. **UI Update**: 
   - A chat window (modal/drawer) opens above the widget stack.
   - Greeting message appears: *"Hi! Welcome to Toplin Investments. How can I help you today?"*
   - Quick reply buttons appear below the greeting.
4. **User clicks a Quick Reply OR types a message**:
   - **Step A**: User message appears on the right side (Red bubble).
   - **Step B**: "Typing..." indicator appears on the left for 500ms.
   - **Step C**: Bot processes input against `chatbotRules`.
   - **Step D**: Bot response appears on the left (Grey bubble) with new Quick Replies.
5. **Chatbot Action Triggers**:
   - If user asks for a quote/human -> Bot says "Connecting you..." -> Automatically opens WhatsApp link.
   - If user asks about location -> Bot replies -> Highlights the "Contact" button.
6. **User closes chat**: Clicks "X" on chat header or clicks outside. Modal closes.

---

## 5. Contact Form Submission Flow

### 5.1 Form Interaction (Idle to Typing)
1. **User focuses on an input field** (e.g., Name).
2. **UI Update**: Input border changes to Toplin Red (`#E31E24`). Floating label moves up (if using floating labels).
3. **User types**: 
   - If user previously triggered an error, typing clears the error message and red border immediately.

### 5.2 Form Validation (On Blur / On Submit)
1. **User clicks "Send Message"**.
2. **Validation Check**:
   - Is Name empty? -> Show "Name is required" in red.
   - Is Email invalid? -> Show "Please enter a valid email" in red.
   - Is Phone invalid? -> Show "Please enter a valid Namibian phone number" in red.
   - Is Message empty? -> Show "Message is required" in red.
3. **If Invalid**: Stop submission. Focus on the first invalid field. Scroll to it if necessary.

### 5.3 Form Submission (Happy Path)
1. **Validation passes**.
2. **State Change**: `isSubmitting` becomes `true`.
3. **UI Update**: 
   - Button text changes to "Sending...".
   - Button becomes disabled (opacity 50%, cursor not-allowed).
   - Spinner icon appears inside the button.
4. **API Call**: POST request sent to `/api/contact`.
5. **Success Response (200 OK)**:
   - `isSubmitting` becomes `false`.
   - Form fields reset to empty.
   - Success message appears: *"Thank you! Your message has been sent successfully."* (Green background).
   - Message auto-dismisses after 5 seconds.

### 5.4 Form Submission (Unhappy Path / Error)
1. **API Call fails** (Network error or 500 Server Error).
2. **State Change**: `isSubmitting` becomes `false`.
3. **UI Update**: 
   - Button text reverts to "Send Message".
   - Button becomes enabled.
   - Error message appears: *"Sorry, there was an error. Please try again or WhatsApp us directly."* (Red background).
   - Error message includes a direct link to the WhatsApp widget.

---

## 6. Edge Cases & Error Handling

### 6.1 404 Page Not Found
1. **User visits invalid route** (e.g., `/services/joinery/typo`).
2. **App renders Custom 404 Page**.
3. **Content**: 
   - H1: "Page Not Found"
   - Text: "The page you are looking for doesn't exist or has been moved."
   - CTA Button: "Back to Home" (Links to `/`).

### 6.2 Image Loading Failure
1. **Image fails to load** (broken link or network issue).
2. **UI Update**: 
   - Fallback UI renders: A grey box with the Toplin logo or a generic construction icon.
   - `alt` text is displayed visibly below or inside the box for accessibility.

### 6.3 Slow Network / API Timeout
1. **User submits contact form on a slow 3G connection**.
2. **Timeout**: If API takes > 10 seconds, abort the request.
3. **UI Update**: Show a specific timeout error message: *"Connection timed out. Please check your internet and try again."*

### 6.4 Chatbot Fallback
1. **User types gibberish or highly specific question** not in the rule base.
2. **Bot triggers 'fallback' rule**.
3. **Response**: *"I'm not sure about that, but Ben can help! Would you like to chat on WhatsApp?"*
4. **Quick Replies**: [Yes, open WhatsApp] [No, thanks].

---

## 7. State Management Flow

To keep the app lightweight, state is managed locally and via React Context. Here is how the data flows:

### 7.1 Global Context (`AppContext`)
- **Holds**: `isMobileMenuOpen`, `isScrolled`, `activePage`.
- **Flow**: 
  - `Header` listens to `isScrolled` to change background.
  - `Header` and `MobileMenu` read/write `isMobileMenuOpen`.
  - `Footer` reads `activePage` to highlight current link.

### 7.2 Widget Context (`WidgetContext`)
- **Holds**: `isWidgetMenuOpen`, `isChatbotOpen`, `chatHistory`.
- **Flow**:
  - `FloatingWidgets` container manages the open/close state of the FAB.
  - `ChatbotModal` reads `chatHistory` to display previous messages and pushes new messages to it.

### 7.3 Local Component State (`useState`)
- **Used for**: 
  - Form inputs (`formData`, `formErrors`, `isSubmitting`).
  - FAQ Accordions (`openFaqId`).
  - Image Lightboxes (`activeImageIndex`).
  - Mobile Menu internal animations.
- **Flow**: State is created, used, and destroyed within the specific component. It does not leak to other parts of the app.

---

## 8. Accessibility (a11y) Flow

### 8.1 Keyboard Navigation Flow
1. **User presses `Tab`**.
2. **Focus moves** logically: Header Logo -> Nav Links -> CTA Button -> Page Content -> Footer -> Floating Widgets.
3. **Visual Cue**: A highly visible focus ring (Toplin Red or high-contrast white) appears around the focused element.
4. **Modal/Chatbot**: When Chatbot opens, focus is trapped inside the modal. Pressing `Tab` cycles only through chatbot elements. Pressing `Esc` closes the chatbot and returns focus to the FAB button.

### 8.2 Screen Reader Flow
1. **Screen reader announces**: "Toplin Investments website, navigation, 4 links."
2. **User navigates to Chatbot FAB**: Announces "Chat options, button. Press enter to open."
3. **User opens Chatbot**: Announces "Chatbot dialog opened. Greeting: Hi! Welcome..."
4. **Form Errors**: When an error appears, screen reader announces: "Error, Name is required."

---

**Document End**

This flow document provides the exact logical blueprint for the AI agent. By feeding this alongside the `PRD.md` and `TDD.md`, the AI will understand not just *what* to build, but exactly *how* it should behave in every scenario.