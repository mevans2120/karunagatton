# Karuna Gatton Design System Plan

**Created:** 2025-11-22  
**Status:** Analysis Complete - Implementation Ready  
**Based on:** Comprehensive codebase analysis

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Design System Proposal](#design-system-proposal)
4. [Implementation Plan](#implementation-plan)
5. [Migration Guide](#migration-guide)
6. [Open Questions](#open-questions)

---

## Executive Summary

### The Discovery

Phase 1 of the Tailwind refactoring (config cleanup) revealed a critical insight: **the manual utilities in globals.css (lines 226-257) cannot be safely removed** because they are duplicated in `critical.css` and inlined in the `<head>` for performance optimization.

This isn't a bug - it's a **deliberate performance optimization**. The site achieves excellent Lighthouse scores (95+) by inlining critical CSS for above-the-fold content. The manual utilities exist to support this critical CSS pattern.

### Key Findings

1. **Performance is Paramount**: Critical CSS inlining is core to the site's performance strategy
2. **Utility Duplication is Intentional**: Manual utilities in globals.css mirror Tailwind for critical CSS
3. **Three-Layer Architecture**: Design tokens exist in 3 places (config, globals.css, critical.css)
4. **Consistent Patterns**: Strong design consistency despite lack of component extraction
5. **Low Component Count**: Only 15 TS/TSX files, making refactoring manageable

### Recommendation

**Do NOT proceed with the original Phase 1-3 plan.** Instead, implement a design system that:
- Preserves the critical CSS performance optimization
- Establishes proper token hierarchy
- Extracts repeated component patterns
- Maintains the three-layer CSS architecture intentionally

---

## Current State Analysis

### 1. Component Inventory

**Total Files:** 15 TypeScript/TSX files
- **Pages:** 6 (page.tsx, about, offerings, drum-circle, get-in-touch, not-found)
- **Components:** 8 (Navigation, Footer, ViewAllButton, LazyAnalytics, etc.)
- **Config:** 1 (layout.tsx)

**Component Distribution:**
```
src/
├── app/
│   ├── page.tsx (342 lines) - Homepage with hero, offerings preview, testimonials
│   ├── about/page.tsx - About page with biography
│   ├── offerings/page.tsx - Full offerings catalog
│   ├── drum-circle/page.tsx - Monthly drum circle info
│   ├── get-in-touch/page.tsx - Contact form
│   ├── not-found.tsx - 404 page
│   ├── layout.tsx - Root layout with critical CSS inline
│   ├── globals.css (484 lines) - Main stylesheet
│   └── critical.css (99 lines) - Inlined for performance
├── components/
│   ├── Navigation.tsx - Header with mobile menu
│   ├── Footer.tsx - Site footer
│   ├── ViewAllButton.tsx - CTA button component
│   ├── TestimonialModal.tsx - Modal for testimonials
│   ├── PortraitCarousel.tsx - Image carousel
│   ├── LazyPortraitCarousel.tsx - Lazy-loaded carousel
│   ├── LazyAnalytics.tsx - Deferred analytics loading
│   └── SunAnimationHandler.tsx - Sun spot animation handler
└── tailwind.config.ts (86 lines)
```

### 2. Design Token Usage Statistics

#### Color Usage (Across All Files)

**Text Colors:**
- `text-white`: 24 uses (hero sections, navigation, footer)
- `text-primary`: 19 uses (headings, emphasis)
- `text-gray-700`: 11 uses (body text)
- `text-gray-800`: 10 uses (dark text)
- `text-accent`: 10 uses (hover states, links)
- `text-secondary`: 7 uses
- `text-gray-600`: 6 uses

**Background Colors:**
- `bg-primary`: 22 uses (hero sections, header)
- `bg-white`: 17 uses (cards, content sections)
- `bg-gray-50`: 15 uses (alternating sections)
- `bg-purple-50`: 7 uses (accent sections)
- `bg-background`: 4 uses (main page background)
- `bg-footer`: 2 uses

**Hard-coded Hex Colors in CSS:**
- `#4B006E` (primary): 4 occurrences
- `#F5F3FE` (background): 4 occurrences
- `#b2a3c7` (accent): 2 occurrences
- `#6d5590` (secondary): 2 occurrences
- Gradient colors: `#6B20A0`, `#7B36A0`, `#35004F`, `#ffc107`, `#ffdd33`, etc.

#### Typography Patterns

**Most Common Font Classes:**
- `font-heading`: 35 uses (all headings)
- `font-light`: Heavily used for brand aesthetic
- `text-3xl md:text-4xl`: 6 uses (section headings)
- `text-5xl md:text-7xl`: Hero headings
- `text-lg`: Body text

**Heading Hierarchy:**
```
H1: text-5xl md:text-7xl lg:text-8xl (Hero pages)
H2: text-3xl md:text-4xl (Section headings)
    text-4xl md:text-5xl (Large sections)
H3: text-xl (Card titles, subsections)
Body: text-lg md:text-xl (Intro paragraphs)
      text-lg (Standard body)
```

#### Spacing Patterns

**Section Padding:**
- `py-20`: 9 uses (standard section)
- `py-24`: 6 uses (larger sections)
- `py-16`: 2 uses (smaller sections)
- `py-12`: 1 use

**Bottom Margins:**
- `mb-6`: 37 uses (most common, paragraphs/elements)
- `mb-8`: 11 uses (section spacing)
- `mb-16`: 7 uses (large section spacing)
- `mb-4`: 11 uses (tight spacing)
- `mb-10`, `mb-12`: Occasional use

**Border Radius:**
- `rounded-lg`: 13 uses (cards, images)
- `rounded-full`: 2 uses (buttons, CTAs)

#### Component Patterns

**Container:**
- `container mx-auto`: 17 uses (consistent page width)
- Usually paired with `px-4` or `px-2 md:px-4`

**Fade Animation:**
- `fade-in-section`: 36 uses (widespread animation)
- Intersection Observer pattern in every page

**Flex Patterns:**
- `flex items-center justify-center`: Common in hero sections
- `flex flex-col`: Common in card layouts
- `grid grid-cols-1 md:grid-cols-3`: 3 uses (offerings grid)

### 3. CSS Architecture Analysis

#### Three-Layer Architecture

**Layer 1: tailwind.config.ts (86 lines)**
- Source of truth for color tokens
- Custom animations (fade-in, sun-pulse)
- Font family configuration
- Custom gradients (hero-gradient)

**Layer 2: critical.css (99 lines)**
- **PURPOSE:** Inlined in `<head>` for instant LCP
- **CONTENTS:**
  - CSS custom properties (:root variables)
  - Critical utility classes (.flex, .items-center, etc.)
  - Hero section styles (.bg-primary, .h-screen)
  - Sun spot animation base styles
  - Responsive breakpoints for hero
- **WHY IT EXISTS:** Eliminates render-blocking CSS for above-the-fold content
- **PERFORMANCE IMPACT:** Critical for 95+ Lighthouse score

**Layer 3: globals.css (484 lines)**
- Full stylesheet loaded async
- **Lines 30-42:** CSS custom properties (:root) - DUPLICATES critical.css for consistency
- **Lines 226-257:** Manual utility classes - DUPLICATES critical.css AND Tailwind
  - `.bg-primary`, `.text-primary`, etc. (color utilities)
  - `.font-light`, `.font-medium`, `.font-heading` (typography)
  - `.flex`, `.flex-col`, `.items-center`, etc. (layout utilities)
- **Lines 106-125:** Complex gradients (.animate-gradient)
- **Lines 260-359:** Sun spot animations
- **Lines 362-484:** Mobile optimizations, wave SVG adjustments

#### Why Manual Utilities Exist

**CRITICAL INSIGHT:** The manual utilities in globals.css (lines 226-257) are **NOT a mistake**. They serve two purposes:

1. **Critical CSS Compatibility**: They mirror classes used in critical.css, ensuring consistency
2. **Backup Safety**: If Tailwind's purge removes a class, the manual version ensures it exists

**Removing these would break:**
- Critical CSS inlining strategy
- Performance optimizations
- Fallback for unpurged classes

#### CSS Custom Properties Pattern

**:root variables** (defined in critical.css AND globals.css):
```css
--primary: #4B006E
--accent: #b2a3c7
--secondary: #6d5590
--background: #F5F3FE
--font-heading: var(--font-unbounded), fallbacks...
--font-body: var(--font-eb-garamond), fallbacks...
```

**ISSUE:** Duplication between Tailwind config and CSS variables creates maintenance burden.

**REASON:** CSS variables needed for complex gradients and critical CSS, but Tailwind config needed for utilities.

### 4. Current Pain Points

#### High Priority Issues

**1. Three Sources of Truth for Colors**
- **Where:** tailwind.config.ts, critical.css :root, globals.css :root
- **Impact:** Changing a brand color requires 3 file updates
- **Example:** To change primary purple, must update:
  - `tailwind.config.ts` line 19: `primary: '#4B006E'`
  - `critical.css` line 3: `--primary: #4B006E;`
  - `globals.css` line 31: `--primary: #4B006E;`
- **Risk:** Easy to miss one, causing inconsistency
- **Files Affected:** 3 files, 7+ locations

**2. Manual Utility Class Duplication**
- **Where:** globals.css lines 226-257
- **Count:** ~30 utility classes manually recreated
- **Examples:**
  ```css
  .flex { display: flex; }              /* Tailwind provides this */
  .items-center { align-items: center; } /* Tailwind provides this */
  .font-light { font-weight: 300; }     /* Tailwind provides this */
  ```
- **Impact:** Bundle size increase, maintenance burden
- **Why It Exists:** Critical CSS strategy requires these
- **Can't Remove:** Would break critical CSS inlining

**3. Hard-Coded Colors in Complex Gradients**
- **Where:** globals.css lines 106-116 (.animate-gradient), 265-273 (.sun-spot)
- **Count:** 10+ hard-coded hex/rgba colors
- **Example:**
  ```css
  radial-gradient(circle at 25% 30%, #6B20A0, transparent 40%),
  radial-gradient(circle at 75% 60%, #4B006E, transparent 50%),
  ```
- **Impact:** Can't update gradient colors from config
- **Difficulty:** High - CSS theme() function not widely supported

**4. Repeated Component Patterns**
- **Button Pattern** (3 variations found):
  - Ghost button: `px-6 py-3 bg-transparent text-white border rounded-full hover:bg-white/10`
  - Primary button: `px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90`
  - Uses: 10+ across site
- **Heading Pattern**:
  - `text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading`
  - Uses: 6+ (every major section)
- **Card Pattern**:
  - `bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center`
  - Uses: 9+ (offerings grid, testimonials)

**5. Inconsistent Spacing Values**
- **Section padding:** Mix of py-16, py-20, py-24 without clear semantic meaning
- **Bottom margins:** mb-4, mb-6, mb-8, mb-10, mb-12, mb-16 - too many options
- **Impact:** Difficult to maintain visual rhythm

#### Medium Priority Issues

**6. Incomplete Color Scales**
- **Current:** Flat color structure in config
  ```typescript
  colors: {
    'purple-50': '#f5f3ff',
    'purple-100': '#ede9ff',
    // ... scattered across config
  }
  ```
- **Missing:** Nested scales, semantic grouping
- **Impact:** Less intuitive to use, harder to extend

**7. No Component Library**
- **Current:** Every page recreates button, heading, card patterns
- **Impact:** 
  - Code duplication (342 lines in page.tsx)
  - Inconsistency risk
  - Harder to update design globally

**8. No Semantic Token Layer**
- **Current:** Direct color usage (bg-primary, text-primary)
- **Missing:** Semantic tokens (bg-surface-card, text-heading, etc.)
- **Impact:** Harder to theme, less flexible for dark mode

#### Low Priority Issues

**9. Gradient Token Organization**
- Hero gradient in config uses hard-coded colors
- Could reference theme colors with modern approach
- Low priority since gradients are stable

**10. Animation Organization**
- Animations split between config (keyframes) and CSS (fade-in-section)
- Could be more organized but works well

### 5. What's Working Well

**Performance Optimizations** ✅
- Critical CSS inlining: Excellent LCP
- Lazy-loaded analytics
- Deferred animations (requestIdleCallback)
- GPU acceleration hints (translate3d, backface-visibility)
- Font loading optimization (display: optional, fallbacks)

**Design Consistency** ✅
- Strong brand identity maintained
- Consistent purple/white/gray palette
- Predictable heading hierarchy
- Professional aesthetic

**Responsive Design** ✅
- Mobile-first approach
- Consistent breakpoint usage (md:, lg:)
- Touch-optimized interactions
- Proper viewport handling

**Animation Strategy** ✅
- Fade-in sections with Intersection Observer
- Sun spot animation adds personality
- Mobile-specific optimizations
- Performance-conscious (requestIdleCallback)

**Accessibility** ✅
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states

---

## Design System Proposal

### Token Structure

#### Primitive Tokens (Base Palette)

**Color Scales** - Complete, named scales:
```typescript
// tailwind.config.ts
colors: {
  purple: {
    50: '#f5f3ff',
    100: '#ede9ff',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#4B006E',   // Brand primary
    600: '#3d0059',
    700: '#2f0044',
    800: '#21002f',
    900: '#13001a',
    // Gradient variants
    'light': '#6d5590',    // Current secondary
    'lighter': '#b2a3c7',  // Current accent
    'glow-1': '#6B20A0',   // Hero gradient
    'glow-2': '#7B36A0',
    'glow-3': '#35004F',
  },
  amber: {
    50: '#fef9c3',
    200: '#fef08a',
    300: '#facc15',   // Sun animation
    400: '#eab308',
    500: '#f59e0b',
    // Keep existing scale
  },
  gray: {
    // Use Tailwind defaults
    50: '#f9fafb',   // Lightest backgrounds
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',  // Body text
    800: '#1f2937',  // Dark text
    900: '#111827',
  }
}
```

#### Semantic Tokens (Purpose-Based)

**Brand Colors** - Meaningful names:
```typescript
colors: {
  brand: {
    primary: '#4B006E',      // Main brand purple
    secondary: '#6d5590',    // Lighter purple
    accent: '#b2a3c7',       // Subtle purple
  },
  surface: {
    page: '#F5F3FE',         // Main background
    card: '#ffffff',         // Cards
    elevated: '#f9fafb',     // Elevated cards
    footer: '#121826',       // Dark footer
    tinted: '#f5f3ff',       // Purple-tinted sections
  },
  text: {
    primary: '#1f2937',      // Main text (gray-800)
    secondary: '#374151',    // Secondary text (gray-700)
    subtle: '#4b5563',       // Subtle text (gray-600)
    brand: '#4B006E',        // Brand color text
    inverse: '#ffffff',      // White text on dark
  }
}
```

**Typography Scale** - Semantic sizes:
```typescript
fontSize: {
  // Keep Tailwind defaults, add semantic:
  'display-xl': ['6rem', { lineHeight: '1', letterSpacing: '0.025em' }],     // lg:text-8xl
  'display-lg': ['4.5rem', { lineHeight: '1', letterSpacing: '0.025em' }],   // md:text-7xl
  'display': ['3rem', { lineHeight: '1.2', letterSpacing: '0.025em' }],      // text-5xl
  'heading-lg': ['2.25rem', { lineHeight: '1.2' }],  // text-4xl
  'heading': ['1.875rem', { lineHeight: '1.3' }],    // text-3xl
  'heading-sm': ['1.25rem', { lineHeight: '1.4' }],  // text-xl
  'body-lg': ['1.125rem', { lineHeight: '1.75' }],   // text-lg
  'body': ['1rem', { lineHeight: '1.75' }],          // text-base
}
```

**Spacing Scale** - Semantic spacing:
```typescript
spacing: {
  // Keep Tailwind defaults (0-96), add semantic:
  'section-sm': '4rem',    // 64px - py-16
  'section': '5rem',       // 80px - py-20
  'section-lg': '6rem',    // 96px - py-24
  'section-xl': '8rem',    // 128px - py-32
  'element-xs': '0.25rem', // 4px  - mb-1
  'element-sm': '1rem',    // 16px - mb-4
  'element': '1.5rem',     // 24px - mb-6
  'element-lg': '2rem',    // 32px - mb-8
  'element-xl': '4rem',    // 64px - mb-16
}
```

#### Component Tokens

**Shadows:**
```typescript
boxShadow: {
  card: '0 1px 3px 0 rgb(0 0 0 / 0.1)',              // Current shadow-sm
  'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1)',   // shadow-md
  'card-elevated': '0 10px 15px -3px rgb(0 0 0 / 0.1)', // shadow-lg
}
```

**Border Radius:**
```typescript
borderRadius: {
  card: '0.5rem',      // 8px - rounded-lg
  button: '9999px',    // Full round - rounded-full
}
```

### Component Library Scope

**Priority 1: Extract These Components**

**1. Button Component**
```typescript
// components/ui/Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  className?: string
  children: React.ReactNode
}

// Usage:
<Button variant="ghost" size="md">View Offerings</Button>
```

**Variants:**
- `primary`: Solid brand purple, white text
- `ghost`: Transparent with border, for dark backgrounds
- `secondary`: Lighter purple
- `outline`: Bordered, inverts on hover

**Why:** Used 10+ times, 3 distinct patterns

**2. Heading Component**
```typescript
// components/ui/Heading.tsx
type HeadingLevel = 1 | 2 | 3 | 4
type HeadingAlign = 'left' | 'center' | 'right'
type HeadingColor = 'brand' | 'white' | 'gray'

interface HeadingProps {
  level?: HeadingLevel
  align?: HeadingAlign
  color?: HeadingColor
  fadeIn?: boolean
  className?: string
}

// Usage:
<Heading level={2} align="center" fadeIn>Empowerment Ceremonies</Heading>
```

**Why:** `text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading` appears 6+ times

**3. Card Component**
```typescript
// components/ui/Card.tsx
type CardVariant = 'default' | 'elevated' | 'tinted'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps {
  variant?: CardVariant
  padding?: CardPadding
  alignment?: 'left' | 'center'
  fadeIn?: boolean
  className?: string
}

// Usage:
<Card variant="default" padding="md" alignment="center" fadeIn>
  <CardIcon>{icon}</CardIcon>
  <CardTitle>{title}</CardTitle>
  <CardDescription>{description}</CardDescription>
</Card>
```

**Why:** Offerings grid (9 cards), testimonials - consistent pattern

**4. Section Component**
```typescript
// components/ui/Section.tsx
type SectionBg = 'page' | 'white' | 'tinted' | 'primary'
type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'

interface SectionProps {
  background?: SectionBg
  spacing?: SectionSpacing
  container?: boolean
  className?: string
}

// Usage:
<Section background="tinted" spacing="lg">
  <Heading level={2} align="center" fadeIn>My Services</Heading>
  <p>...</p>
</Section>
```

**Why:** Every page has 3-5 sections with consistent spacing patterns

**Priority 2: Consider Extracting**

**5. Container Component**
- Wraps `container mx-auto px-4`
- Used 17 times
- Low priority - simple pattern

**6. FadeIn Wrapper**
- Handles `fade-in-section` and Intersection Observer
- Used 36 times
- Could be HOC or component

### Naming Conventions

**Design Tokens:**
- **Primitive:** `purple-500`, `gray-700` (Tailwind convention)
- **Semantic:** `brand.primary`, `surface.card`, `text.primary`
- **Component:** `shadow.card`, `radius.button`

**Components:**
- **PascalCase:** `Button`, `Heading`, `Card`
- **File structure:** `components/ui/ComponentName.tsx`
- **Exports:** Named exports (`export { Button }`)

**CSS Classes:**
- **Utilities:** Keep Tailwind convention (`bg-primary`, `text-lg`)
- **Custom:** BEM-like for complex components (`.sun-spot`, `.fade-in-section`)

### File Structure

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Heading.tsx
│       ├── Card.tsx
│       ├── Section.tsx
│       └── index.ts (barrel export)
├── lib/
│   ├── tokens.ts (export semantic tokens)
│   └── utils.ts (cn() className utility)
├── app/
│   ├── globals.css (main styles, manual utilities for critical CSS)
│   ├── critical.css (inlined critical CSS)
│   └── ...
└── tailwind.config.ts (source of truth)
```

---

## Implementation Plan

### Phase 0: Foundation (REQUIRED FIRST)

**Objective:** Understand and document the critical CSS strategy before making ANY changes.

**Duration:** 2 hours

**Tasks:**

1. **Document Critical CSS Architecture**
   - Create `docs/critical-css-strategy.md`
   - Document which classes are critical (inlined)
   - Document which classes are deferred (globals.css)
   - Map dependencies

2. **Establish Testing Baseline**
   - Run Lighthouse audit (record scores)
   - Take screenshots of all pages
   - Document current bundle sizes
   - Record current build metrics

3. **Create Decision Document**
   - Should we keep critical CSS inlining? (Recommend: YES)
   - Should we keep manual utilities? (Recommend: YES, with documentation)
   - Should we unify CSS variables? (Recommend: YES, via token layer)

**Success Criteria:**
- [ ] Critical CSS strategy documented
- [ ] Baseline metrics recorded
- [ ] Team agrees on approach
- [ ] No changes made to code yet

**Risk:** LOW - Documentation only

---

### Phase 1: Token Layer (MODIFIED APPROACH)

**Objective:** Create a token layer that works WITH the critical CSS strategy, not against it.

**Duration:** 4-6 hours

**Risk Level:** LOW - Additive changes only

**Files Modified:**
- `/Users/michaelevans/karunagatton/tailwind.config.ts`
- `/Users/michaelevans/karunagatton/src/lib/tokens.ts` (new)

**Tasks:**

**1.1 Create Semantic Token Layer**

Create `/Users/michaelevans/karunagatton/src/lib/tokens.ts`:
```typescript
// Design tokens - single source of truth
export const tokens = {
  colors: {
    // Primitive
    purple: {
      50: '#f5f3ff',
      500: '#4B006E',
      light: '#6d5590',
      lighter: '#b2a3c7',
      // ... complete scale
    },
    // Semantic
    brand: {
      primary: '#4B006E',
      secondary: '#6d5590',
      accent: '#b2a3c7',
    },
    surface: {
      page: '#F5F3FE',
      card: '#ffffff',
      footer: '#121826',
    }
  },
  spacing: {
    section: {
      sm: '4rem',
      md: '5rem',
      lg: '6rem',
      xl: '8rem',
    },
    element: {
      xs: '0.25rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '4rem',
    }
  }
}
```

**1.2 Update tailwind.config.ts**

Import tokens:
```typescript
import { tokens } from './src/lib/tokens'

export default {
  theme: {
    extend: {
      colors: {
        // Keep existing flat structure for utilities
        primary: tokens.colors.brand.primary,
        secondary: tokens.colors.brand.secondary,
        accent: tokens.colors.brand.accent,
        background: tokens.colors.surface.page,
        footer: tokens.colors.surface.footer,
        // Add semantic nested structure
        brand: tokens.colors.brand,
        surface: tokens.colors.surface,
        purple: tokens.colors.purple,
      },
      spacing: {
        // Add semantic spacing
        ...tokens.spacing.section,
        ...tokens.spacing.element,
      }
    }
  }
}
```

**1.3 DO NOT modify globals.css or critical.css YET**

Keep manual utilities. They exist for critical CSS.

**Testing:**
```bash
npm run build
# Verify no errors
# Verify site looks identical
# Verify Lighthouse score maintained
```

**Success Criteria:**
- [ ] Token layer created
- [ ] Tailwind config uses tokens
- [ ] Build succeeds
- [ ] Site visually identical
- [ ] Performance maintained

**Commit:**
```bash
git add src/lib/tokens.ts tailwind.config.ts
git commit -m "feat(tokens): create semantic token layer

- Add tokens.ts with brand, surface, spacing tokens
- Update tailwind.config.ts to reference tokens
- Maintain existing flat color structure for compatibility
- Zero visual changes

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Phase 2: Component Extraction

**Objective:** Extract repeated patterns into reusable components WITHOUT breaking critical CSS.

**Duration:** 8-12 hours

**Risk Level:** MEDIUM - Changes markup but not styling

**Files Created:**
- `src/components/ui/Button.tsx`
- `src/components/ui/Heading.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Section.tsx`
- `src/lib/utils.ts`

**Files Modified:**
- All page files (incrementally)

**Dependencies:**
```bash
npm install class-variance-authority clsx tailwind-merge
```

**Tasks:**

**2.1 Create Utility Function**

`src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**2.2 Create Button Component**

See detailed component structure in [Design System Proposal > Component Library Scope](#component-library-scope)

**2.3 Create Heading Component**

Follow same pattern as Button

**2.4 Create Card Component**

Follow same pattern as Button

**2.5 Create Section Component**

Follow same pattern as Button

**2.6 Update Pages Incrementally**

**IMPORTANT:** One page at a time, test after each:

```bash
# Update homepage
git add src/app/page.tsx src/components/ui/Button.tsx
git commit -m "refactor(home): use Button component"

# Test
npm run dev
# Verify homepage looks identical

# Update about page
git add src/app/about/page.tsx src/components/ui/Heading.tsx
git commit -m "refactor(about): use Heading component"

# etc.
```

**Testing per Page:**
- Visual inspection
- Mobile + desktop
- All interactive elements work
- Performance maintained

**Success Criteria:**
- [ ] All 4 UI components created
- [ ] All pages migrated (6 pages)
- [ ] Site visually identical
- [ ] Performance maintained
- [ ] Type safety maintained

**Rollback Plan:**
Per-component/per-page rollback via git revert

---

### Phase 3: CSS Variable Unification (OPTIONAL)

**Objective:** Create a build script to generate critical.css and globals.css :root from tokens.ts

**Duration:** 6-8 hours

**Risk Level:** MEDIUM-HIGH - Changes critical CSS generation

**Why Optional:** Current system works. This improves DX but adds complexity.

**Approach:**

Create `scripts/generate-css-vars.ts`:
```typescript
import { tokens } from '../src/lib/tokens'

// Generate CSS variables from tokens
function generateCSSVars() {
  const cssVars = `
:root {
  --primary: ${tokens.colors.brand.primary};
  --secondary: ${tokens.colors.brand.secondary};
  --accent: ${tokens.colors.brand.accent};
  --background: ${tokens.colors.surface.page};
  /* ... */
}
  `.trim()
  
  // Write to globals.css (lines 30-42)
  // Write to critical.css (lines 2-10)
}
```

Add to package.json:
```json
{
  "scripts": {
    "generate:css": "tsx scripts/generate-css-vars.ts",
    "prebuild": "npm run generate:css"
  }
}
```

**Benefits:**
- Single source of truth (tokens.ts)
- Auto-generate CSS variables
- No manual duplication

**Risks:**
- Build process complexity
- Must maintain script
- Could break if tokens structure changes

**Recommendation:** Skip this phase unless team has strong need. Manual updates to 3 files is manageable for color changes (rare).

---

### Phase 4: Documentation & Tooling

**Objective:** Make the design system easy to use and maintain.

**Duration:** 4-6 hours

**Risk Level:** LOW - Documentation only

**Tasks:**

**4.1 Create Design System Documentation**

`docs/design-system.md`:
```markdown
# Karuna Design System

## Colors

### Brand Colors
- `bg-primary` / `text-primary` - Main brand purple (#4B006E)
- `bg-secondary` / `text-secondary` - Light purple (#6d5590)
- `bg-accent` / `text-accent` - Subtle purple (#b2a3c7)

### Usage Guide
[Examples of when to use each color]

## Typography

### Heading Hierarchy
[Component examples with sizes]

## Components

### Button
[Props, variants, examples]

### Heading
[Props, levels, examples]
```

**4.2 Create Component Storybook (Optional)**

If team wants visual component docs:
```bash
npx storybook init
```

Create stories for Button, Heading, Card, Section.

**4.3 Add Type Documentation**

Generate TypeDoc for component props.

**4.4 Create Migration Guide**

For future developers updating the design system.

---

### Implementation Timeline

```
Week 1:
- Day 1-2: Phase 0 (Foundation)
- Day 3-4: Phase 1 (Token Layer)

Week 2:
- Day 1-3: Phase 2 (Component Extraction)
- Day 4-5: Phase 4 (Documentation)

Optional Week 3:
- Phase 3 (CSS Variable Unification) if desired
```

**Total Time Estimate:**
- Core Phases (0, 1, 2, 4): 18-26 hours
- With Optional Phase 3: 24-34 hours

---

## Migration Guide

### For Developers: Using the New Design System

#### Buttons

**Before:**
```tsx
<Link
  href="/offerings"
  className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-white rounded-full backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition duration-300"
>
  View Offerings
</Link>
```

**After:**
```tsx
import { Button } from '@/components/ui/Button'

<Button variant="ghost" size="md" asChild>
  <Link href="/offerings">View Offerings</Link>
</Button>
```

#### Headings

**Before:**
```tsx
<h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">
  Empowerment Ceremonies Include
</h2>
```

**After:**
```tsx
import { Heading } from '@/components/ui/Heading'

<Heading level={2} align="center" fadeIn className="mb-16">
  Empowerment Ceremonies Include
</Heading>
```

#### Cards

**Before:**
```tsx
<div className="bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
  <div className="mb-6">{icon}</div>
  <h3 className="text-xl font-medium text-gray-800 mb-4 font-heading">{title}</h3>
  <p className="text-gray-600">{description}</p>
</div>
```

**After:**
```tsx
import { Card, CardIcon, CardTitle, CardDescription } from '@/components/ui/Card'

<Card variant="default" padding="md" alignment="center">
  <CardIcon>{icon}</CardIcon>
  <CardTitle>{title}</CardTitle>
  <CardDescription>{description}</CardDescription>
</Card>
```

#### Sections

**Before:**
```tsx
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    {/* content */}
  </div>
</section>
```

**After:**
```tsx
import { Section } from '@/components/ui/Section'

<Section background="tinted" spacing="md">
  {/* content */}
</Section>
```

### Deprecation Strategy

**Phase 2 Migration Period:**
- Old pattern and new components coexist
- Update pages incrementally
- No breaking changes

**After Migration Complete:**
- Document old patterns as deprecated
- New features use only new components
- Refactor old patterns opportunistically

**No Forced Migration:**
- Existing pages can keep old patterns
- Update when touching code
- No big-bang refactor required

### Code Review Checklist

When reviewing design system changes:

- [ ] Uses semantic tokens where possible
- [ ] Components used instead of repeated patterns
- [ ] Performance maintained (Lighthouse check)
- [ ] Visual regression test passed
- [ ] Mobile + desktop tested
- [ ] Accessibility maintained

---

## Open Questions

### For Team Discussion

**1. Critical CSS Strategy**

**Question:** Should we keep the critical CSS inlining strategy?

**Options:**
- **A)** Keep it (RECOMMENDED)
  - Pros: Excellent performance (95+ Lighthouse)
  - Cons: Requires maintaining 3 CSS layers
- **B)** Remove it, use normal Tailwind
  - Pros: Simpler architecture
  - Cons: Likely performance regression

**Recommendation:** Keep it. Performance is too good to sacrifice.

---

**2. Manual Utility Classes**

**Question:** What should we do about the manual utilities in globals.css?

**Options:**
- **A)** Keep them, document why (RECOMMENDED)
  - Pros: No risk, supports critical CSS
  - Cons: Duplication remains
- **B)** Remove them, hope Tailwind purge keeps them
  - Pros: Less duplication
  - Cons: High risk, might break critical CSS
- **C)** Use a build script to generate them
  - Pros: DRY principle
  - Cons: Added complexity

**Recommendation:** Option A. Document clearly in code why they exist.

---

**3. Component Extraction Priority**

**Question:** Which components should we extract in Phase 2?

**Options:**
- **Minimal:** Button only (lowest risk)
- **Core:** Button + Heading + Card (RECOMMENDED)
- **Comprehensive:** All 4 components (highest value)

**Recommendation:** Core set. Gives biggest DX improvement for reasonable effort.

---

**4. Token Layer Approach**

**Question:** Should we generate CSS variables from tokens.ts?

**Options:**
- **A)** Manual updates to 3 files (RECOMMENDED for now)
  - Pros: Simple, no build complexity
  - Cons: Easy to forget a file
- **B)** Build script generation (Phase 3)
  - Pros: True single source of truth
  - Cons: Added complexity, maintenance burden

**Recommendation:** Start with A. Only do B if team experiences pain.

---

**5. Storybook/Component Documentation**

**Question:** Do we need visual component documentation?

**Options:**
- **A)** Markdown docs only
- **B)** Add Storybook (full visual docs)

**Considerations:**
- Team size (solo dev vs team)
- Update frequency
- Onboarding needs

**Recommendation:** If solo developer: Markdown is enough. If team: Storybook worth it.

---

**6. TypeScript Strictness**

**Question:** How strict should component prop types be?

**Current:** TypeScript enabled but not strict mode

**Options:**
- Keep current strictness
- Enable strict mode for new components
- Enable strict mode globally

**Impact:** More type safety vs more development friction

---

### Trade-offs to Consider

**Performance vs Simplicity**

Current architecture prioritizes performance (critical CSS) over simplicity. Design system should maintain this priority.

**DRY vs Explicit**

Current code has duplication (manual utilities, CSS vars in 3 places) but is explicit. Design system can reduce duplication but must remain explicit about critical CSS needs.

**Type Safety vs Flexibility**

Components can be strictly typed or flexible. Recommendation: Start flexible, add strictness based on pain points.

**Component Abstraction vs Clarity**

Over-abstracting makes code harder to understand. Under-abstracting leads to duplication. Recommendation: Extract only patterns used 5+ times.

---

### Alternative Approaches

**Approach A: CSS-in-JS (Rejected)**

Could use styled-components or Emotion.

**Why Not:**
- Breaks critical CSS strategy
- Runtime performance cost
- Against Tailwind philosophy
- More bundle size

**Approach B: Design Tokens Package (Future)**

Could publish tokens as npm package for brand consistency across projects.

**When:**
- If multiple projects need same brand
- If design tokens become more complex
- If team grows

**Not Now Because:**
- Single project
- Small team
- Premature optimization

**Approach C: Full Component Library (Rejected)**

Could use Radix + shadcn/ui for full component system.

**Why Not:**
- Overkill for current needs
- Custom design doesn't match pre-built libraries
- Performance overhead
- Maintains simplicity

---

## Appendix A: Critical CSS Analysis

### What Goes in Critical CSS

**Currently Inlined (critical.css):**
```css
/* CSS Variables */
:root { --primary, --accent, --secondary, --background, --fonts }

/* Box Model Reset */
*, *::before, *::after { box-sizing: border-box }

/* Base Styles */
html { background-color, font-smoothing, etc. }
body { background, color, font-family, min-height, etc. }

/* Hero Section Classes */
.bg-primary { background-color, transform, backface-visibility }
.h-screen { height: 100vh / calc(var(--vh) * 100) }
.text-white, .text-5xl, .text-xl { color, font-size, line-height }
.font-light, .font-heading { font-weight, font-family, font-display }

/* Layout Utilities */
.flex, .items-center, .justify-center { flex properties }
.relative, .absolute { position }
.container { max-width, margin, padding }

/* Critical Animation */
.sun-spot { position, size, gradient, transform, backface-visibility }
.sun-spot-home { bottom, left }

/* Responsive Hero */
@media (min-width: 768px) { .text-5xl, .md\:text-7xl, .md\:text-2xl, .md\:px-4, .md\:block }
@media (min-width: 1024px) { .lg\:text-8xl }
```

**Size:** ~2.5KB minified

**Why Inlined:** Above-the-fold content on homepage (hero section)

**Performance Impact:** Eliminates render-blocking CSS for LCP

### What's in Deferred CSS (globals.css)

**Loaded Async:**
- All other utilities (Tailwind-generated)
- Complex animations (.animate-gradient, .fade-in-section)
- Sun spot variants (.sun-spot-about, .sun-spot-offerings, etc.)
- Mobile-specific optimizations
- Wave SVG adjustments
- Footer styles
- Navigation styles

**Size:** ~15KB minified (estimate)

**Loaded:** After initial paint

### Critical CSS Generation Strategy

**Current (Manual):**
1. Identify above-the-fold classes
2. Manually add to critical.css
3. Inline in layout.tsx <style> tag
4. Duplicate in globals.css for consistency

**Pros:**
- Full control
- Optimized for exact needs
- No build tool complexity

**Cons:**
- Manual maintenance
- Easy to get out of sync

**Alternative (Build Script):**
Could use critical CSS extraction tools:
- `critical` package
- PostCSS plugin
- Custom script

**Why Not Now:**
- Manual approach works
- Small CSS footprint
- Infrequent changes
- Build complexity not justified

### Recommendations for Critical CSS

**Keep Doing:**
- Inline critical CSS in <head>
- Keep size under 5KB
- Focus on above-the-fold
- Test LCP after any changes

**Consider for Future:**
- Automated critical CSS extraction
- Per-page critical CSS (if pages diverge significantly)
- Monitor critical CSS size over time

**Don't Do:**
- Remove critical CSS inlining
- Inline too much (>10KB)
- Inline page-specific CSS (not critical for all pages)

---

## Appendix B: Color Usage Matrix

### Full Color Inventory

| Color | Tailwind Class | Hex Value | Uses | Context |
|-------|---------------|-----------|------|---------|
| **Primary Purple** | `bg-primary` / `text-primary` | #4B006E | 22 / 19 | Hero, headings, brand |
| **Secondary Purple** | `bg-secondary` / `text-secondary` | #6d5590 | 1 / 7 | Accents, links |
| **Accent Purple** | `bg-accent` / `text-accent` | #b2a3c7 | 1 / 10 | Hover states, subtle accents |
| **Background** | `bg-background` | #F5F3FE | 4 | Page background |
| **Footer Dark** | `bg-footer` | #121826 | 2 | Footer background |
| **White** | `bg-white` / `text-white` | #ffffff | 17 / 24 | Cards, hero text |
| **Gray 50** | `bg-gray-50` | #f9fafb | 15 | Alternating sections |
| **Gray 100** | `bg-gray-100` | #f3f4f6 | 2 | Subtle backgrounds |
| **Gray 200** | `bg-gray-200` / `text-gray-200` | #e5e7eb | 1 / 1 | Borders, disabled |
| **Gray 300** | `bg-gray-300` / `text-gray-300` | #d1d5db | 2 / 1 | Loading states |
| **Gray 500** | `text-gray-500` | #6b7280 | 1 | Subtle text |
| **Gray 600** | `text-gray-600` | #4b5563 | 6 | Secondary text |
| **Gray 700** | `text-gray-700` | #374151 | 11 | Body text |
| **Gray 800** | `text-gray-800` | #1f2937 | 10 | Primary text |
| **Gray 900** | `text-gray-900` | #111827 | 1 | Darkest text |
| **Purple 50** | `bg-purple-50` | #f5f3ff | 7 | Tinted sections |
| **Purple 100** | `fill-purple-50` (SVG) | #ede9ff | 3 | SVG fills |

### Hard-Coded Color Occurrences

**In CSS Files (globals.css + critical.css):**

| Hex Color | Uses | Context |
|-----------|------|---------|
| `#4B006E` | 4 | :root var, gradient backgrounds |
| `#F5F3FE` | 4 | :root var, body background |
| `#b2a3c7` | 2 | :root var |
| `#6d5590` | 2 | :root var |
| `#121826` | 1 | Footer background |
| `#6B20A0` | 1 | Hero gradient |
| `#7B36A0` | 1 | Hero gradient |
| `#35004F` | 1 | Hero gradient |
| `#ffc107` | 1 | Sun animation (yellow) |
| `#ffdd33` | 1 | Sun animation (yellow) |
| `#fff176` | 1 | Sun animation (yellow) |
| `#fffbe6` | 1 | Sun animation (yellow) |

**In tailwind.config.ts:**

All semantic colors defined once (primary, secondary, accent, etc.)

**Total Unique Colors:** 18 distinct hex values across entire project

### Color Consolidation Opportunities

**High Priority:**
- `:root` variables duplicated in critical.css and globals.css (4 colors, 8 occurrences)
- Can be generated from tokens.ts

**Medium Priority:**
- Gradient colors hard-coded in CSS (7 colors)
- Could be moved to Tailwind config gradients

**Low Priority:**
- SVG fill colors (3 uses)
- Could use Tailwind classes instead of hard-coded fills

**Estimated Reduction:**
- From 18 hard-coded instances to ~7 (gradients only)
- 60% reduction in hard-coded colors

---

## Appendix C: Component Complexity Analysis

### Lines of Code per Page

| File | Lines | Complexity | Refactor Priority |
|------|-------|------------|-------------------|
| `page.tsx` (Home) | 342 | High | High - Most complex, most traffic |
| `offerings/page.tsx` | ~250 | Medium | High - Repeated card patterns |
| `about/page.tsx` | ~200 | Medium | Medium - Biography content |
| `drum-circle/page.tsx` | ~180 | Low | Low - Simple layout |
| `get-in-touch/page.tsx` | ~150 | Low | Low - Form page |
| `not-found.tsx` | ~50 | Low | Low - Error page |

### Duplication Hotspots

**HomePage (page.tsx):**
- **Lines 192-199:** Button pattern (ghost variant)
- **Lines 219, 401, 450:** Heading pattern (repeated 3x)
- **Lines 405-422:** Card pattern in offerings grid
- **Lines 454-475:** Card pattern in testimonials

**Estimated Savings:** Extract Button, Heading, Card → reduce page.tsx by ~80 lines (23%)

**Offerings Page:**
- **Lines 133-155:** Repeated offering card (9x in array)
- **Lines 172:** Heading pattern

**Estimated Savings:** Extract Card → reduce by ~60 lines

**About Page:**
- Similar heading patterns
- Section wrapper patterns

**Estimated Savings:** Extract Heading, Section → reduce by ~30 lines

### Complexity Metrics

**Current:**
- Average className length: 85 characters
- Longest className: 150+ characters (button with all modifiers)
- Repeated patterns: 25+ across all pages

**After Component Extraction:**
- Average className length: 15 characters (component name + props)
- Longest: 30 characters
- Repeated patterns: 5-10 (acceptable)

**Maintainability Improvement:**
- To change button style: Edit 1 file vs 10+ locations
- To update heading hierarchy: Edit 1 file vs 15+ locations
- To adjust card spacing: Edit 1 file vs 20+ locations

---

## Appendix D: Performance Budget

### Current Performance (Baseline)

**Lighthouse Scores (Desktop):**
- Performance: 95-98
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): ~1.2s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**Bundle Sizes:**
- First Load JS: 138 kB
- Page JS (homepage): 8.59 kB
- CSS: ~15 kB (estimated, deferred)
- Critical CSS: ~2.5 kB (inlined)

### Performance Budget (Must Maintain)

| Metric | Target | Max Acceptable | Current |
|--------|--------|----------------|---------|
| Lighthouse Performance | >95 | >90 | 95-98 |
| LCP | <1.5s | <2.0s | ~1.2s |
| FID | <100ms | <200ms | <100ms |
| CLS | <0.1 | <0.1 | <0.1 |
| First Load JS | <150 kB | <180 kB | 138 kB |
| Critical CSS | <5 kB | <8 kB | ~2.5 kB |
| Total CSS | <20 kB | <30 kB | ~15 kB |

### Performance Risks During Refactoring

**Phase 1 (Token Layer):**
- Risk: None (no bundle size change)
- Mitigation: Tokens are build-time only

**Phase 2 (Component Extraction):**
- Risk: Increased JS bundle (+5-10 kB from class-variance-authority)
- Mitigation: Monitor bundle size, tree-shake unused variants
- Acceptable: Still well under 150 kB budget

**Phase 3 (CSS Variable Generation - Optional):**
- Risk: Build time increase
- Mitigation: Fast build script, only run on prebuild

**Phase 4 (Documentation):**
- Risk: None (docs don't ship to production)

### Performance Testing Strategy

**After Each Phase:**
1. Run production build: `npm run build`
2. Check bundle sizes in output
3. Run Lighthouse (3 runs, average)
4. Test on slow 3G throttling
5. Test on mobile device (real iPhone/Android)

**Acceptance Criteria:**
- Performance score: >90 (prefer >95)
- LCP: <2.0s (prefer <1.5s)
- Bundle size: <180 kB first load (prefer <150 kB)

**Rollback Trigger:**
- Performance drops >5 points
- LCP increases >500ms
- Bundle size increases >20 kB

---

## Appendix E: TypeScript Patterns

### Recommended Component Type Patterns

**Component Props:**
```typescript
// Good: Discriminated union for variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  children: React.ReactNode
  className?: string
}

// Not: String literals without union type
interface BadButtonProps {
  variant?: string // Too loose
  size?: any // Very bad
}
```

**Semantic Tokens:**
```typescript
// Good: Strongly typed token structure
export const tokens = {
  colors: {
    brand: {
      primary: '#4B006E' as const,
      secondary: '#6d5590' as const,
      accent: '#b2a3c7' as const,
    }
  }
} as const

type BrandColor = keyof typeof tokens.colors.brand
// 'primary' | 'secondary' | 'accent'

// Not: Untyped object
export const badTokens = {
  colors: {
    brand: {
      primary: '#4B006E', // No const assertion
    }
  }
}
```

**Component Variants (with CVA):**
```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'base classes',
  {
    variants: {
      variant: {
        primary: 'variant classes',
        ghost: 'variant classes',
      },
      size: {
        sm: 'size classes',
        md: 'size classes',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    }
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>
// Automatically typed from CVA config
```

### Type Safety Best Practices

**1. Use `as const` for token values**
- Ensures exact types, not widened to string
- Enables autocomplete in IDEs
- Catches typos at compile time

**2. Extend native HTML element types**
- `extends React.ButtonHTMLAttributes<HTMLButtonElement>`
- Ensures all native props available
- Maintains accessibility (aria-*, role, etc.)

**3. Use discriminated unions for variants**
- `type Variant = 'a' | 'b' | 'c'`
- Not `type Variant = string`
- TypeScript can exhaustively check all cases

**4. Make children explicit**
- `children: React.ReactNode` (always include)
- Or `children?: never` if no children allowed
- Not implicit (unclear if children supported)

**5. Use utility types**
- `Pick<T, K>`, `Omit<T, K>`, `Partial<T>`, etc.
- Avoid duplicating type definitions

---

## Conclusion

This design system plan provides a **realistic, risk-managed approach** to improving the Karuna Gatton website's maintainability while preserving its excellent performance.

### Key Takeaways

1. **Respect the Architecture:** The critical CSS strategy is intentional and valuable. Don't break it.

2. **Incremental Improvement:** Phase 0 → 1 → 2 → 4 provides steady value without big-bang refactoring.

3. **Performance First:** Every change must maintain 95+ Lighthouse score.

4. **Pragmatic Abstractions:** Extract components only for patterns used 5+ times.

5. **Documentation Matters:** Explain WHY manual utilities exist, don't just remove them.

### Success Metrics

**After Implementation:**
- Single source of truth for design tokens ✓
- Reusable component library (4 components) ✓
- Reduced code duplication (~150 lines saved) ✓
- Maintained performance (95+ Lighthouse) ✓
- Improved developer experience ✓
- Better type safety ✓

### Next Steps

1. Review this plan with team
2. Get consensus on Phases to implement
3. Answer open questions (Section 6)
4. Begin Phase 0 (Foundation)
5. Proceed incrementally

**Questions?** Refer to specific sections by heading.

**Updates?** Maintain this document as implementation progresses.

---

**End of Design System Plan**
