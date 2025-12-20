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
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    │
    ├── src/                   # Source code
    │   ├── app/               # Next.js App Router pages
    │   ├── components/        # React components
    │   ├── lib/               # Utilities and data
    │   └── types/             # TypeScript type definitions
    │
    ├── README.md
    └── LAYOUT_SUMMARY.md

README.md                      # Workspace-level README
```

---

## Source Code Structure (`src/`)

### 📄 App Directory (`src/app/`)
Next.js App Router structure with page routes:

```
app/
├── layout.tsx                 # Root layout with fonts (Cormorant Garamond, DM Sans)
├── page.tsx                   # Home page
├── globals.css                # Global styles and Tailwind CSS
├── favicon.ico                # Site favicon
│
├── about/
│   └── page.tsx               # About page
│
├── book/
│   └── page.tsx               # Booking page
│
├── contact/
│   └── page.tsx               # Contact page
│
├── packages/
│   └── page.tsx               # Packages page
│
└── services/
    └── page.tsx               # Services page
```

**Total Pages:** 6 routes (home, about, book, contact, packages, services)

---

### 🧩 Components Directory (`src/components/`)

#### Layout Components (`components/layout/`)
```
layout/
├── navbar.tsx                 # Navigation bar component
├── footer.tsx                 # Footer component
├── minimal-layout.tsx         # Minimal layout wrapper
├── mobile-menu.tsx            # Mobile navigation menu
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

### Project Structure Patterns
1. **App Router:** Uses Next.js 13+ App Router with file-based routing
2. **Component Organization:** Separated into layout, sections, and UI components
3. **Data Management:** Centralized data in `lib/data/` with helper functions
4. **Type Safety:** Comprehensive TypeScript types in `types/index.ts`
5. **Modular Exports:** Index files for clean imports

### Business Domain
- **Business Type:** Premium waxing studio
- **Location:** Los Angeles
- **Services:** Face, body, and Brazilian waxing services
- **Features:** Booking system, service packages, reviews/testimonials

---

## File Count Summary

| Category | Count |
|----------|-------|
| **Pages** | 6 |
| **Layout Components** | 4 |
| **Section Components** | 5 |
| **UI Components** | 11 |
| **Data Files** | 5 |
| **Type Definitions** | 1 |
| **Configuration Files** | 8 |
| **Static Assets** | 5 |
| **Total Source Files** | ~45+ |

---

## Notes
- All pages follow Next.js App Router conventions with `page.tsx` files
- Workspace includes `.vscode/settings.json` for VS Code configuration
- Component organization follows a clear hierarchy: layout → sections → UI

---

*Generated: Repository Layout Summary for AstiGlow*
