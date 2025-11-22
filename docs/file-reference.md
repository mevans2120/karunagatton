# Design System Analysis - File Reference

All file paths referenced in the design system analysis.

---

## Documentation Files (Created)

- `/Users/michaelevans/karunagatton/docs/design-system-plan.md` (1,734 lines) - Complete plan
- `/Users/michaelevans/karunagatton/docs/design-system-summary.md` - Executive summary
- `/Users/michaelevans/karunagatton/docs/file-reference.md` - This file
- `/Users/michaelevans/karunagatton/docs/tailwind-tokenization-research.md` - Original research
- `/Users/michaelevans/karunagatton/docs/tailwind-refactoring-implementation-plan.md` - Original plan

---

## Core Configuration Files

- `/Users/michaelevans/karunagatton/tailwind.config.ts` (86 lines)
- `/Users/michaelevans/karunagatton/package.json`

---

## CSS Files

- `/Users/michaelevans/karunagatton/src/app/globals.css` (484 lines)
- `/Users/michaelevans/karunagatton/src/app/critical.css` (99 lines)

---

## Layout & Root Files

- `/Users/michaelevans/karunagatton/src/app/layout.tsx` - Root layout with critical CSS inline

---

## Page Files

- `/Users/michaelevans/karunagatton/src/app/page.tsx` (342 lines) - Homepage
- `/Users/michaelevans/karunagatton/src/app/about/page.tsx` - About page
- `/Users/michaelevans/karunagatton/src/app/offerings/page.tsx` - Offerings catalog
- `/Users/michaelevans/karunagatton/src/app/drum-circle/page.tsx` - Drum circle info
- `/Users/michaelevans/karunagatton/src/app/get-in-touch/page.tsx` - Contact form
- `/Users/michaelevans/karunagatton/src/app/not-found.tsx` - 404 page

---

## Component Files

- `/Users/michaelevans/karunagatton/src/components/Navigation.tsx` - Header with mobile menu
- `/Users/michaelevans/karunagatton/src/components/Footer.tsx` - Site footer
- `/Users/michaelevans/karunagatton/src/components/ViewAllButton.tsx` - CTA button
- `/Users/michaelevans/karunagatton/src/components/TestimonialModal.tsx` - Modal for testimonials
- `/Users/michaelevans/karunagatton/src/components/PortraitCarousel.tsx` - Image carousel
- `/Users/michaelevans/karunagatton/src/components/LazyPortraitCarousel.tsx` - Lazy carousel
- `/Users/michaelevans/karunagatton/src/components/LazyAnalytics.tsx` - Deferred analytics
- `/Users/michaelevans/karunagatton/src/components/SunAnimationHandler.tsx` - Sun animation

---

## Files to Create (Phase 1)

- `/Users/michaelevans/karunagatton/src/lib/tokens.ts` - Design token source of truth

---

## Files to Create (Phase 2)

- `/Users/michaelevans/karunagatton/src/lib/utils.ts` - className utility (cn function)
- `/Users/michaelevans/karunagatton/src/components/ui/Button.tsx` - Button component
- `/Users/michaelevans/karunagatton/src/components/ui/Heading.tsx` - Heading component
- `/Users/michaelevans/karunagatton/src/components/ui/Card.tsx` - Card component
- `/Users/michaelevans/karunagatton/src/components/ui/Section.tsx` - Section wrapper
- `/Users/michaelevans/karunagatton/src/components/ui/index.ts` - Barrel export

---

## Files to Create (Phase 3 - Optional)

- `/Users/michaelevans/karunagatton/scripts/generate-css-vars.ts` - CSS variable generator

---

## Files to Create (Phase 4)

- `/Users/michaelevans/karunagatton/docs/design-system.md` - Usage guide
- `/Users/michaelevans/karunagatton/docs/components.md` - Component API reference

---

## Key Line References

### globals.css
- Lines 30-42: CSS custom properties (:root) - KEEP (needed for critical CSS)
- Lines 226-257: Manual utility classes - KEEP (support critical CSS)
- Lines 106-125: .animate-gradient - Complex gradient
- Lines 260-359: Sun spot animations

### critical.css
- Lines 2-10: :root variables - KEEP (inlined for performance)
- Lines 55-60: Manual utilities (.flex, .items-center) - KEEP (critical)

### tailwind.config.ts
- Line 19: `primary: '#4B006E'` - Brand color
- Lines 26-57: Flat color structure
- Line 62: `hero-gradient` - Hard-coded colors (could tokenize)

### layout.tsx
- Lines 71-75: Critical CSS inline <style> tag - KEEP (performance critical)

---

## Pattern Locations

### Button Pattern
- `src/app/page.tsx:192` - Ghost button variant
- `src/components/ViewAllButton.tsx:14` - Primary button variant

### Heading Pattern
- `src/app/page.tsx:219` - Section heading
- `src/app/page.tsx:401` - Section heading
- `src/app/page.tsx:450` - Section heading
- `src/app/offerings/page.tsx:172` - Section heading

### Card Pattern
- `src/app/page.tsx:405` - Offering card (in grid)
- Multiple uses in offerings array

### Container Pattern
- Used 17 times: `container mx-auto px-4`
- Appears in every page file

### Fade-in Pattern
- Used 36 times: `fade-in-section`
- Intersection Observer setup in every page's useEffect

---

## Color Reference Locations

### In tailwind.config.ts
- Lines 18-24: Semantic colors (primary, secondary, accent, background, footer)
- Lines 26-57: Color scales (purple, yellow, amber)

### In globals.css
- Lines 31-34: CSS variables (--primary, --accent, --secondary, --background)
- Lines 108-116: Hard-coded in .animate-gradient
- Lines 265-273: Hard-coded in .sun-spot

### In critical.css
- Lines 3-6: CSS variables (duplicate of globals.css)

---

## Usage Stats (For Reference)

| Pattern | Count | Files |
|---------|-------|-------|
| `text-primary` | 19 | 6 files |
| `bg-primary` | 22 | 7 files |
| `font-heading` | 35 | 8 files |
| `fade-in-section` | 36 | 6 files |
| `container mx-auto` | 17 | 6 files |
| `bg-gray-50` | 15 | 5 files |
| `text-white` | 24 | 6 files |

---

**Last Updated:** 2025-11-22  
**Analyzed Files:** 15 TypeScript/TSX files  
**Total Lines Analyzed:** ~2,500 lines of code
