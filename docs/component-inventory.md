# Component Inventory

**Purpose:** Catalog all UI patterns for design system extraction
**Date:** 2025-11-22
**Status:** Baseline for Phase 2 (Component Extraction)

---

## Summary Stats

- **Total Files:** 15 TypeScript/TSX files
- **Pages:** 6 page components
- **Components:** 8 reusable components
- **Repeated Patterns:** 4 major patterns identified
- **Potential Code Savings:** ~150 lines

---

## Current Component Structure

### Page Files (src/app/)

| File | Lines | Purpose | Key Patterns Used |
|------|-------|---------|-------------------|
| `page.tsx` (Home) | ~200 | Homepage with hero | Button, Heading, Section |
| `about/page.tsx` | ~100 | About page | Heading, Section, Card |
| `offerings/page.tsx` | ~150 | Services grid | Card (9x), Heading, Section |
| `drum-circle/page.tsx` | ~120 | Drum circle info | Heading, Section, Button |
| `get-in-touch/page.tsx` | ~90 | Contact page | Heading, Section |
| `not-found.tsx` | ~40 | 404 page | Heading, Button |

### Component Files (src/components/)

| File | Lines | Purpose | Reusability |
|------|-------|---------|-------------|
| `Footer.tsx` | ~80 | Site footer | Single use, well-structured |
| `Navigation.tsx` | ~100 | Main nav | Single use, works well |
| `ViewAllButton.tsx` | ~30 | CTA button | Could be generalized |
| `PortraitCarousel.tsx` | ~150 | Image carousel | Single use, complex |
| `TestimonialModal.tsx` | ~120 | Modal dialog | Single use |
| `DrumImage.tsx` | ~40 | Drum SVG logo | Single use |
| `WavesSVG.tsx` | ~60 | Wave decoration | Single use |
| `SunSpot.tsx` | ~80 | Sun animation | Single use |

---

## Repeated Patterns (Extract Candidates)

### 1. Button Pattern

**Current Implementation:** Inline className strings
**Occurrences:** 10+ across 6 files
**Variants:** 3 (Ghost, Primary, Outline)

#### Ghost Button (5 uses)
```tsx
// Currentcode:
<Link
  href="/offerings"
  className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-white rounded-full backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition duration-300"
>
  View Offerings
</Link>
```

**Locations:**
- `src/app/page.tsx`: Line 192, 205
- `src/app/drum-circle/page.tsx`: Line 95
- `src/app/get-in-touch/page.tsx`: Line 78
- `src/app/not-found.tsx`: Line 24

#### Primary Button (3 uses)
```tsx
<button className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-medium">
  Get Started
</button>
```

**Locations:**
- `src/app/page.tsx`: Line 156
- `src/app/offerings/page.tsx`: Line 210
- `src/components/ViewAllButton.tsx`: Line 12

#### Outline Button (2 uses)
```tsx
<button className="px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300">
  Learn More
</button>
```

**Proposed Component:**
```tsx
// src/components/ui/Button.tsx
<Button variant="ghost" href="/offerings">View Offerings</Button>
<Button variant="primary" onClick={handleClick}>Get Started</Button>
<Button variant="outline">Learn More</Button>
```

**Lines Saved:** ~30-40 lines

---

### 2. Heading Pattern

**Current Implementation:** 150+ character className string
**Occurrences:** 6+ across all pages
**Levels:** 4 (H1, H2, H3, H4)

#### Section Heading (Most Common - 6 uses)
```tsx
<h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">
  Welcome to Karuna Gatton
</h2>
```

**Locations:**
- `src/app/page.tsx`: Lines 134, 178
- `src/app/about/page.tsx`: Line 45
- `src/app/offerings/page.tsx`: Line 56
- `src/app/drum-circle/page.tsx`: Line 38
- `src/app/get-in-touch/page.tsx`: Line 29

#### Hero Heading (2 uses)
```tsx
<h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wider mb-4 leading-tight font-heading">
  Karuna Gatton
</h1>
```

**Locations:**
- `src/app/page.tsx`: Line 98
- `src/app/about/page.tsx`: Line 22

**Proposed Component:**
```tsx
// src/components/ui/Heading.tsx
<Heading level={1} variant="hero">Karuna Gatton</Heading>
<Heading level={2}>Welcome to Karuna Gatton</Heading>
<Heading level={3}>Section Title</Heading>
```

**Lines Saved:** ~50-60 lines

---

### 3. Card Pattern

**Current Implementation:** Repeated grid items
**Occurrences:** 9+ in offerings grid, 3+ in testimonials
**Variants:** 2 (Offering Card, Testimonial Card)

#### Offering Card (9 uses)
```tsx
<div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
  <div className="mb-6 text-primary">
    {/* Icon */}
  </div>
  <h3 className="text-xl font-medium text-primary mb-4 font-heading">
    {title}
  </h3>
  <p className="text-gray-700 leading-relaxed">
    {description}
  </p>
</div>
```

**Location:**
- `src/app/offerings/page.tsx`: Lines 78-156 (9 cards in grid)

#### Testimonial Card (3 uses)
```tsx
<div className="bg-white p-6 rounded-lg shadow-sm">
  <p className="text-gray-700 italic mb-4">{quote}</p>
  <p className="text-primary font-medium">{author}</p>
</div>
```

**Location:**
- `src/app/page.tsx`: Lines 220-245

**Proposed Component:**
```tsx
// src/components/ui/Card.tsx
<Card variant="offering" icon={<Icon />} title="Title">
  Description text
</Card>

<Card variant="testimonial" author="Name">
  Quote text
</Card>
```

**Lines Saved:** ~40-50 lines

---

### 4. Section Pattern

**Current Implementation:** Repeated container/padding structure
**Occurrences:** Every page (30+ sections total)
**Variants:** 3 spacing levels

#### Standard Section (Most Common)
```tsx
<section className="py-20 bg-background">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

**Occurrences:** 17+ uses

#### Large Section
```tsx
<section className="py-24 bg-white">
  <div className="container mx-auto px-4 max-w-4xl">
    {/* Content */}
  </div>
</section>
```

**Occurrences:** 8+ uses

#### Small Section
```tsx
<section className="py-16">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

**Occurrences:** 5+ uses

**Proposed Component:**
```tsx
// src/components/ui/Section.tsx
<Section>Default padding (py-20)</Section>
<Section size="large">Larger padding (py-24)</Section>
<Section size="small">Smaller padding (py-16)</Section>
<Section bg="white">With background</Section>
```

**Lines Saved:** ~20-30 lines

---

## Design Token Usage

### Color Classes (Most Used)

| Class | Uses | Purpose |
|-------|------|---------|
| `text-primary` | 19 | Primary brand text color |
| `bg-primary` | 22 | Primary brand backgrounds |
| `text-white` | 24 | White text (hero, buttons) |
| `bg-gray-50` | 15 | Alternating section backgrounds |
| `bg-white` | 12 | White backgrounds |
| `text-gray-700` | 18 | Body text color |
| `bg-background` | 8 | Custom background color |

### Typography Classes (Most Used)

| Class | Uses | Purpose |
|-------|------|---------|
| `font-heading` | 35 | All headings |
| `font-light` | 28 | Brand aesthetic |
| `text-3xl md:text-4xl` | 6 | Section headings |
| `text-lg` | 22 | Body text |
| `text-xl` | 12 | Card titles, larger body |

### Spacing Classes (Most Used)

| Class | Uses | Purpose |
|-------|------|---------|
| `mb-6` | 37 | Most common bottom margin |
| `py-20` | 9 | Standard section padding |
| `container mx-auto` | 17 | Page width constraint |
| `px-4` | 25 | Horizontal padding |
| `mb-16` | 7 | Large section spacing |

### Animation/Effects

| Class | Uses | Purpose |
|-------|------|---------|
| `fade-in-section` | 36 | Intersection Observer animation |
| `hover:shadow-md` | 12 | Hover elevations |
| `transition-all` | 15 | Smooth transitions |

---

## Consistency Analysis

### What's Working Well ✅

**Color Usage:**
- Consistent purple/white/gray palette
- Strong brand identity
- Predictable color hierarchy

**Typography:**
- Clear heading hierarchy
- Consistent font weights (light = brand)
- Responsive text sizing

**Spacing:**
- Section padding very consistent (py-20/py-24)
- Bottom margins predictable (mb-6 most common)
- Container usage uniform

**Responsive Design:**
- Consistent breakpoint usage (md:, lg:)
- Mobile-first approach
- Touch-optimized sizes

### What Could Improve ⚠️

**Button Consistency:**
- Same button, different className strings
- No single source for button styles
- Hard to maintain consistency

**Heading Consistency:**
- 150+ character className repeated
- Easy to make typos
- No type safety

**Card Variations:**
- Similar cards, slightly different
- Inconsistent hover states
- Could be more systematic

---

## Extraction Priority

### Phase 2A: High-Value Components (8-10 hours)

**1. Button Component** (Priority: HIGH)
- **Impact:** 10+ uses across site
- **Variants:** 3 (ghost, primary, outline)
- **Lines Saved:** ~30-40
- **Difficulty:** LOW

**2. Heading Component** (Priority: HIGH)
- **Impact:** 6+ uses with 150+ char strings
- **Variants:** 4 levels
- **Lines Saved:** ~50-60
- **Difficulty:** LOW

**3. Card Component** (Priority: MEDIUM)
- **Impact:** 12+ uses
- **Variants:** 2 (offering, testimonial)
- **Lines Saved:** ~40-50
- **Difficulty:** MEDIUM (has children/composition)

**4. Section Component** (Priority:** MEDIUM)
- **Impact:** 30+ sections
- **Variants:** 3 sizes
- **Lines Saved:** ~20-30
- **Difficulty:** LOW

**Total Lines Saved:** ~140-180 lines
**Total Time:** 8-12 hours

### Phase 2B: Lower Priority (Future)

- **Modal Component** (TestimonialModal could be generalized)
- **Carousel Component** (if pattern repeats)
- **Icon Component** (if icon usage grows)

---

## Component API Design Principles

### 1. Composition Over Configuration
```tsx
// Good - composable
<Card>
  <CardIcon>{icon}</CardIcon>
  <CardTitle>{title}</CardTitle>
  <CardContent>{content}</CardContent>
</Card>

// Avoid - too many props
<Card icon={icon} title={title} content={content} showBorder align="center" />
```

### 2. Sensible Defaults
```tsx
// Users shouldn't need to specify everything
<Button>Click Me</Button>  // Default variant + size

<Button variant="ghost" size="large">Click Me</Button>  // When needed
```

### 3. TypeScript Safety
```tsx
// Enforce valid variants
type ButtonVariant = 'primary' | 'ghost' | 'outline'
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
```

### 4. Preserve Flexibility
```tsx
// Allow className override for edge cases
<Button className="custom-override">Click</Button>

// Use cn() helper from clsx + tailwind-merge
className={cn(baseStyles, variantStyles, className)}
```

---

## Migration Strategy

### Incremental Approach (Recommended)

**Week 1:** Button + Heading components
- Create components
- Update homepage only
- Test thoroughly
- Commit

**Week 2:** Remaining pages
- Update about, offerings, drum-circle
- Update get-in-touch, not-found
- Test each page
- Commit after each

**Week 3:** Card + Section components
- Create components
- Update offerings page (most cards)
- Update remaining pages
- Test + commit

### Testing Per Component

1. **Visual regression:** `npx playwright test`
2. **Manual testing:** All interactions work
3. **Responsive:** Mobile + tablet + desktop
4. **Performance:** Lighthouse score maintained
5. **TypeScript:** No type errors

---

## Next Steps

After Phase 0 (this documentation):

1. **Review with team** - Get consensus on approach
2. **Phase 1:** Create token layer (`src/lib/tokens.ts`)
3. **Phase 2:** Extract components (Button → Heading → Card → Section)
4. **Phase 3:** (Optional) Auto-generate CSS variables
5. **Phase 4:** Usage documentation

---

**Last Updated:** 2025-11-22
**Next Action:** Proceed to Phase 1 (Token Layer) when ready
**Estimated Time to Phase 2:** 4-6 hours (Phase 1) + 8-12 hours (Phase 2) = 12-18 hours total
