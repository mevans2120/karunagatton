# Carousel Layout Investigation

## Executive Summary

The portrait carousel on the homepage displays at an excessive size on both mobile and desktop viewports. Investigation reveals this issue **existed before Sprint D changes** and is caused by multiple layers of container nesting creating width and padding conflicts.

## Timeline

- **Sprint D (Dec 2024)**: Section component extraction
- **Issue Reported**: Carousel layout "way bigger than the viewport" on mobile and desktop
- **Initial Hypothesis**: Sprint D changes broke the carousel
- **Investigation Finding**: Issue pre-existed Sprint D; carousel section was not modified during Sprint D

## Root Causes

### 1. Multiple Container Nesting (Primary Issue)

The carousel has 3-4 levels of containers, each adding constraints and padding:

```tsx
// Level 1: Page section container (src/app/page.tsx:272-294)
<section className="relative py-20 bg-purple-50">
  <div className="container mx-auto px-4">

    // Level 2: Inner max-width wrapper
    <div className="max-w-5xl mx-auto fade-in-section">

      // Level 3: LazyPortraitCarousel loading state (src/components/LazyPortraitCarousel.tsx:10-18)
      <div className="w-full max-w-6xl mx-auto p-4">
        // Skeleton UI
      </div>

      // Level 4: PortraitCarousel component (src/components/PortraitCarousel.tsx:84)
      <div className="w-full max-w-6xl mx-auto p-4">
        // Actual carousel content
      </div>

    </div>
  </div>
</section>
```

**Width Calculations:**
- Level 1 `.container`: `max-width: 1280px` (from globals.css:96-103)
- Level 2: `max-w-5xl` = `max-width: 64rem` = **1024px**
- Level 3 & 4: `max-w-6xl` = `max-width: 72rem` = **1152px**

**The Conflict:**
The carousel component requests 1152px (`max-w-6xl`) but is constrained by a 1024px wrapper (`max-w-5xl`), creating a width mismatch that causes layout overflow.

### 2. Padding Accumulation

Multiple layers add horizontal padding:
- Level 1: `px-4` (1rem = 16px per side)
- Level 3 & 4: `p-4` (1rem = 16px on all sides)

This creates **32-48px of accumulated horizontal padding** that reduces available carousel width.

### 3. Container Class Duplication

The `.container` class is defined in **two places**:

**globals.css (lines 96-103):**
```css
.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
}
```

**critical.css (line 60):**
```css
.container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
```

This duplication could cause CSS specificity issues or unexpected behavior depending on load order.

### 4. Tailwind vs Custom Container Conflict

The project uses Tailwind's utility classes (`mx-auto`, `px-4`) alongside custom `.container` CSS. Tailwind has its own `container` utility (not explicitly configured in tailwind.config.ts, so using defaults), which may conflict with the custom `.container` class.

## Evidence

### Git History Analysis

```bash
git show 5c98801:src/app/page.tsx | grep -A 20 "Integrated Photo Carousel"
```

Result: The carousel section structure was **identical** before Sprint D:
- Same triple container nesting
- Same `max-w-5xl` wrapper around carousel
- Same `max-w-6xl` in carousel components

**Conclusion:** Sprint D did not introduce this issue.

### Component Analysis

**LazyPortraitCarousel.tsx (lines 10-18):**
```tsx
loading: () => (
  <div className="w-full max-w-6xl mx-auto p-4">
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* Skeleton UI */}
    </div>
  </div>
),
```

**PortraitCarousel.tsx (line 84):**
```tsx
<div className="w-full max-w-6xl mx-auto p-4">
  {/* Carousel content */}
</div>
```

Both components expect to control their own max-width at `6xl` (1152px).

## Viewport Behavior

### Mobile (< 768px)
- `.container` has full width with 1rem padding
- `max-w-5xl` effectively full width
- `max-w-6xl` effectively full width
- **Padding accumulation** (32-48px) reduces available space
- Carousel images may overflow their intended aspect ratio

### Desktop (≥ 768px)
- `.container` caps at 1280px
- `max-w-5xl` caps at 1024px
- `max-w-6xl` tries to use 1152px but is constrained to 1024px
- **Width mismatch** causes carousel to push against constraints
- Accumulated padding further reduces space

## Recommended Solutions

### Option 1: Remove Container Nesting (Recommended)

Remove the intermediate `max-w-5xl` wrapper since the carousel component manages its own width:

```tsx
// src/app/page.tsx
<section className="relative py-20 bg-purple-50">
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    {/* Wave SVG */}
  </div>

  <div className="container mx-auto px-4">
    <Heading level={1} variant="section" align="center" color="primary" fadeIn className="mb-8">
      Visiting Karuna
    </Heading>

    <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 fade-in-section max-w-3xl mx-auto">
      She works out of her yurt, between her purple house and Hendricks Park's urban forest in Eugene
    </p>
  </div>

  {/* Remove the max-w-5xl wrapper - let carousel manage its own width */}
  <div className="fade-in-section">
    <LazyPortraitCarousel />
  </div>

  {/* Bottom wave */}
</section>
```

**Rationale:**
- Eliminates width mismatch (1024px vs 1152px)
- Reduces padding accumulation
- Allows carousel to self-manage layout
- Heading/text still properly constrained by their own max-widths

### Option 2: Standardize Max-Width

Change all carousel-related max-widths to `max-w-5xl`:

1. Update LazyPortraitCarousel.tsx loading state: `max-w-6xl` → `max-w-5xl`
2. Update PortraitCarousel.tsx: `max-w-6xl` → `max-w-5xl`
3. Keep the `max-w-5xl` page wrapper

**Rationale:**
- Ensures consistent width constraints
- Prevents carousel from trying to exceed wrapper width
- Simpler change (no template restructuring)

**Downside:**
- Still has triple nesting
- Still has padding accumulation
- Carousel will be smaller than original design intent

### Option 3: Use Section Component with container=false

Convert the carousel section to use the Section component without inner container:

```tsx
<Section spacing="md" background="bg-purple-50" container={false}>
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    {/* Wave SVG */}
  </div>

  <div className="container mx-auto px-4 max-w-5xl">
    <Heading ... />
    <p ... />
  </div>

  <LazyPortraitCarousel />
</Section>
```

**Rationale:**
- Maintains Sprint D consistency (using Section component)
- Carousel sits outside container, manages own layout
- Clean separation between text content and carousel

## CSS Cleanup Recommendations

### 1. Resolve Container Duplication

Remove duplicate `.container` definition from either globals.css or critical.css. Since critical.css is for above-the-fold styles:

**Keep in critical.css** (remove from globals.css):
```css
.container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
```

### 2. Consider Tailwind Container Plugin Configuration

Add explicit container configuration to tailwind.config.ts:

```ts
theme: {
  container: {
    center: true,
    padding: '1rem',
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  extend: {
    // existing config
  },
}
```

This makes Tailwind's `container` utility match your custom class behavior and removes ambiguity.

## Testing Checklist

After implementing any solution:

- [ ] Test mobile viewport (375px, 414px widths)
- [ ] Test tablet viewport (768px, 1024px widths)
- [ ] Test desktop viewport (1280px, 1440px, 1920px widths)
- [ ] Verify carousel images maintain 3:4 aspect ratio
- [ ] Verify no horizontal scrollbar appears
- [ ] Verify carousel modal still works correctly
- [ ] Run Playwright visual regression tests
- [ ] Test fade-in animation triggers correctly
- [ ] Verify "View All" button is visible and functional

## Related Files

- `src/app/page.tsx` (lines 272-294) - Carousel section
- `src/components/LazyPortraitCarousel.tsx` (lines 10-18) - Loading state
- `src/components/PortraitCarousel.tsx` (line 84) - Main component
- `src/app/globals.css` (lines 96-103) - Container class
- `src/app/critical.css` (line 60) - Duplicate container class
- `tailwind.config.ts` - Tailwind configuration
- `src/components/ui/Section.tsx` - Section component (created in Sprint D)

## Conclusion

The carousel layout issue is a **pre-existing architectural problem** caused by excessive container nesting and width mismatches. It was not introduced by Sprint D changes. The recommended fix is **Option 1** (remove container nesting) as it addresses the root cause while maintaining clean separation of concerns.
