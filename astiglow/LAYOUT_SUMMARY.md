# AstiGlow Repository Layout Summary

## Project Overview
**AstiGlow** is a Next.js 16 application for a premium waxing studio in Los Angeles. Built with React 19, TypeScript, and Tailwind CSS 4.

---

## Root Directory Structure

```
AstiGlow/                      # Workspace root
├── .vscode/                   # VS Code workspace settings
│   └── settings.json
│
└── astiglow/                  # Project root
    ├── Configuration Files
    │   ├── .gitignore
    │   ├── eslint.config.mjs
    │   ├── next.config.ts
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── postcss.config.mjs
    │   ├── tailwind.config.ts
    │   ├── tsconfig.json
    │   └── next-env.d.ts
    │
    ├── public/                # Static assets
    │   ├── images/            # Image assets
    │   │   └── aster-portrait.jpeg
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    │
    ├── src/                   # Source code
    │   ├── app/               # Next.js App Router pages
    │   ├── components/        # React components
    │   ├── hooks/             # Custom React hooks
    │   ├── lib/               # Utilities and data
    │   └── types/             # TypeScript type definitions
    │
    ├── scripts/               # Utility scripts
    │   └── create-cal-event-types.ts  # Script to create Cal.com event types
    │
    ├── README.md
    └── LAYOUT_SUMMARY.md

README.md                      # Workspace-level README
```

---

## Source Code Structure (`src/`)

### 📄 App Directory (`src/app/`)
Next.js App Router structure with route groups:

```
app/
├── layout.tsx                 # Root layout with fonts (Cormorant Garamond, DM Sans)
├── globals.css                # Global styles and Tailwind CSS
├── favicon.ico                # Site favicon
│
├── (main)/                    # Route group: Main pages with navbar/footer
│   ├── layout.tsx             # Main layout (Navbar + Footer)
│   ├── page.tsx               # Home page
│   │
│   ├── about/
│   │   └── page.tsx           # About page
│   │
│   ├── book/
│   │   └── page.tsx           # Booking page (with Cal.com integration)
│   │
│   ├── checkout/
│   │   └── success/
│   │       └── page.tsx       # Checkout success page
│   │
│   ├── contact/
│   │   └── page.tsx           # Contact page
│   │
│   ├── packages/
│   │   └── page.tsx           # Packages page
│   │
│   └── services/
│       └── page.tsx           # Services page
│
├── (checkout)/                # Route group: Checkout flow (minimal layout)
│   ├── layout.tsx             # Checkout layout (minimal, no navbar/footer)
│   ├── cart/
│   │   └── page.tsx           # Shopping cart page
│   └── checkout/
│       └── page.tsx           # Checkout page
│
└── api/                       # API routes
    ├── checkout/
    │   └── route.ts           # Stripe checkout session creation endpoint
    └── webhooks/
        ├── cal/
        │   └── route.ts       # Cal.com webhook handler
        └── stripe/
            └── route.ts      # Stripe webhook handler
```

**Total Pages:** 9 routes (home, about, book, cart, checkout, checkout/success, contact, packages, services)
**Route Groups:** 2 groups `(main)` and `(checkout)` for different layout strategies
**API Routes:** 3 endpoints (checkout, webhooks/cal, webhooks/stripe)

---

### 🧩 Components Directory (`src/components/`)

#### Layout Components (`components/layout/`)
```
layout/
├── navbar.tsx                 # Navigation bar component
├── footer.tsx                 # Footer component
├── minimal-layout.tsx         # Minimal layout wrapper
├── mobile-menu.tsx            # Mobile navigation menu
├── toast-wrapper.tsx          # Toast provider wrapper (client component)
└── index.ts                   # Layout exports
```

#### Section Components (`components/sections/`)
```
sections/
├── hero.tsx                   # Hero section component
├── about-preview.tsx          # About preview section
├── services-preview.tsx       # Services preview section
├── cta-section.tsx            # Call-to-action section
├── testimonials.tsx           # Testimonials section component
└── index.ts                   # Section exports
```

#### UI Components (`components/ui/`)
```
ui/
├── button.tsx                 # Button component
├── input.tsx                  # Input field component
├── service-card.tsx           # Service card display
├── package-card.tsx           # Package card display
├── review-card.tsx            # Review/testimonial card
├── section-header.tsx         # Section header component
├── step-indicator.tsx         # Step indicator (for booking flow)
├── testimonial-carousel.tsx   # Testimonial carousel component
├── accordion.tsx              # Accordion component
├── icons.tsx                  # Icon components
├── toast.tsx                  # Toast notification component
└── index.ts                   # UI component exports
```

**Total Components:** 20 components across 3 categories

---

### 🪝 Hooks Directory (`src/hooks/`)

Custom React hooks for shared functionality:

```
hooks/
├── use-cart.ts                # Cart state management hook with localStorage
└── index.ts                   # Hooks exports
```

**Hooks:**
- `useCart()` - Manages shopping cart state, localStorage persistence, and cross-tab synchronization
- Exports `packagesData` - Package data for cart operations

---

### 📚 Library Directory (`src/lib/`)

#### Data Files (`lib/data/`)
```
data/
├── business.ts                # Business information (address, hours, contact, stats)
├── services.ts                # Service data and helper functions
├── packages.ts                # Package data and calculations
├── reviews.ts                 # Review/testimonial data
└── index.ts                   # Central data exports
```

#### Utilities (`lib/`)
```
lib/
├── stripe.ts                  # Stripe integration utilities (client-side)
└── utils.ts                   # Utility functions
```

---

### 🔷 Types Directory (`src/types/`)
```
types/
└── index.ts                   # TypeScript type definitions
    ├── Service & ServiceCategory
    ├── Package
    ├── Review
    ├── BusinessInfo & Address
    ├── BookingFormData & TimeSlot
    └── ContactFormData
```

---

## Key Features & Architecture

### Technology Stack
- **Framework:** Next.js 16.1.0 (App Router)
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4
- **Fonts:** Cormorant Garamond (headings), DM Sans (body)
- **Payment Processing:** Stripe (stripe, @stripe/stripe-js)
- **Booking Integration:** Cal.com (@calcom/embed-react)

### Project Structure Patterns
1. **App Router:** Uses Next.js 13+ App Router with file-based routing and route groups
2. **Route Groups:** Organized into `(main)` for public pages and `(checkout)` for cart/checkout flow
3. **Component Organization:** Separated into layout, sections, and UI components
4. **State Management:** Custom hooks in `hooks/` for shared state (e.g., cart)
5. **Data Management:** Centralized data in `lib/data/` with helper functions
6. **Type Safety:** Comprehensive TypeScript types in `types/index.ts`
7. **Modular Exports:** Index files for clean imports

### Business Domain
- **Business Type:** Premium waxing studio
- **Location:** Los Angeles (Westwood)
- **Services:** Face, body, and Brazilian waxing services
- **Features:** 
  - Booking system (Cal.com integration)
  - Shopping cart with localStorage persistence
  - Stripe checkout integration
  - Service packages
  - Reviews/testimonials
  - Webhook handlers for Cal.com and Stripe events

---

## File Count Summary

| Category | Count |
|----------|-------|
| **Pages** | 9 |
| **API Routes** | 3 |
| **Route Groups** | 2 |
| **Layout Components** | 5 |
| **Section Components** | 5 |
| **UI Components** | 11 |
| **Custom Hooks** | 1 |
| **Data Files** | 5 |
| **Utility Files** | 2 (stripe.ts, utils.ts) |
| **Type Definitions** | 1 |
| **Scripts** | 1 |
| **Configuration Files** | 8 |
| **Static Assets** | 6 (5 SVGs + 1 image) |
| **Total Source Files** | ~60+ |

---

## Notes
- All pages follow Next.js App Router conventions with `page.tsx` files
- Route groups `(main)` and `(checkout)` provide different layout contexts
- Main pages use full layout with navbar and footer
- Checkout pages use minimal layout without navbar/footer
- Workspace includes `.vscode/settings.json` for VS Code configuration
- Component organization follows a clear hierarchy: layout → sections → UI
- E-commerce flow: Services/Packages → Cart → Checkout → Success
- Cart state is managed via `useCart()` hook with localStorage persistence
- Real portrait image of Aster is stored in `public/images/aster-portrait.jpeg`

### Integrations
- **Cal.com:** Embedded booking widget on `/book` page with event type mapping
- **Stripe:** Payment processing with checkout sessions and webhook handlers
- **Environment Variables:** 
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
  - `STRIPE_SECRET_KEY` - Stripe secret key (server-side)
  - `CAL_API_KEY` - Cal.com API key for event type creation
  - `CAL_USERNAME` - Cal.com username (defaults to 'astiglow')
  - `NEXT_PUBLIC_CAL_USERNAME` - Exposed to client via next.config.ts

### Scripts
- `scripts/create-cal-event-types.ts` - Utility script to programmatically create Cal.com event types from service data

---

*Generated: Repository Layout Summary for AstiGlow*
