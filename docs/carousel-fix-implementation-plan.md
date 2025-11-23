# Carousel Layout Fix - Implementation Plan

## Overview

This plan implements **Option 1** from the carousel layout investigation: removing container nesting to eliminate width conflicts and padding accumulation.

**Goal:** Fix carousel overflow on mobile and desktop by simplifying container structure and resolving CSS conflicts.

**Estimated Complexity:** Low-Medium (structural changes + CSS cleanup)

## Pre-Implementation Checklist

- [ ] Backup current state (git status should be clean)
- [ ] Verify dev server is running
- [ ] Document current carousel behavior (screenshots optional)
- [ ] Review `docs/carousel-layout-investigation.md` for context

## Implementation Phases

### Phase 1: Simplify Carousel Section Structure

**File:** `src/app/page.tsx` (lines 272-294)

**Current Structure:**
```tsx
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

    <div className="max-w-5xl mx-auto fade-in-section">
      <LazyPortraitCarousel />
    </div>
  </div>

  {/* Bottom wave */}
</section>
```

**New Structure:**
```tsx
<section className="relative py-20 bg-purple-50">
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    {/* Wave SVG */}
  </div>

  {/* Container only for heading and text */}
  <div className="container mx-auto px-4">
    <Heading level={1} variant="section" align="center" color="primary" fadeIn className="mb-8">
      Visiting Karuna
    </Heading>

    <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 fade-in-section max-w-3xl mx-auto">
      She works out of her yurt, between her purple house and Hendricks Park's urban forest in Eugene
    </p>
  </div>

  {/* Carousel outside container - manages its own width */}
  <div className="fade-in-section">
    <LazyPortraitCarousel />
  </div>

  {/* Bottom wave */}
</section>
```

**Changes:**
1. Close `container` div after the text paragraph
2. Remove `max-w-5xl mx-auto` wrapper around LazyPortraitCarousel
3. Keep `fade-in-section` wrapper for animation
4. Add comment explaining why carousel is outside container

**Expected Outcome:**
- Carousel can use full `max-w-6xl` (1152px) width
- Reduces padding accumulation from 32-48px to 16px
- Heading and text remain properly centered and constrained

### Phase 2: Update LazyPortraitCarousel Padding

**File:** `src/components/LazyPortraitCarousel.tsx` (lines 10-18)

**Current:**
```tsx
loading: () => (
  <div className="w-full max-w-6xl mx-auto p-4">
    {/* Skeleton UI */}
  </div>
),
```

**Updated:**
```tsx
loading: () => (
  <div className="w-full max-w-6xl mx-auto px-4">
    {/* Skeleton UI */}
  </div>
),
```

**Change:**
- `p-4` → `px-4` (remove top/bottom padding, keep horizontal only)

**Rationale:**
- Vertical padding (`py`) not needed (section already has `py-20`)
- Horizontal padding (`px-4`) maintains mobile spacing
- Matches PortraitCarousel component pattern

### Phase 3: Update PortraitCarousel Padding

**File:** `src/components/PortraitCarousel.tsx` (line 84)

**Current:**
```tsx
<div className="w-full max-w-6xl mx-auto p-4">
```

**Updated:**
```tsx
<div className="w-full max-w-6xl mx-auto px-4">
```

**Change:**
- `p-4` → `px-4` (remove top/bottom padding, keep horizontal only)

**Rationale:**
- Consistent with LazyPortraitCarousel loading state
- Removes unnecessary vertical padding
- Maintains proper mobile spacing

### Phase 4: CSS Cleanup - Remove Container Duplication

**Issue:** `.container` class defined in both globals.css and critical.css

**Option A (Recommended): Keep in critical.css only**

1. **Remove from:** `src/app/globals.css` (lines 95-103)
   ```css
   /* DELETE THIS BLOCK */
   /* Container */
   .container {
     max-width: 1280px;
     margin-left: auto;
     margin-right: auto;
     padding-left: 1rem;
     padding-right: 1rem;
     width: 100%;
   }
   ```

2. **Keep in:** `src/app/critical.css` (line 60)
   ```css
   /* KEEP THIS */
   .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
   ```

**Rationale:**
- Critical.css loads first (above-the-fold styles)
- Container class is used immediately in hero sections
- Removes duplication and potential specificity conflicts

**Option B: Keep in globals.css only**

If critical.css is meant only for hero/initial viewport:
1. Keep expanded version in globals.css
2. Remove from critical.css

**Decision Point:** Choose based on critical CSS strategy

### Phase 5: Optional - Configure Tailwind Container

**File:** `tailwind.config.ts`

**Current:**
```ts
theme: {
  extend: {
    fontFamily: tokens.fontFamily,
    colors: tokens.colors,
    // ...
  },
}
```

**Updated:**
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
    fontFamily: tokens.fontFamily,
    colors: tokens.colors,
    // ...
  },
}
```

**Rationale:**
- Makes Tailwind's `container` utility explicit
- Matches custom `.container` class behavior
- Removes ambiguity between Tailwind and custom CSS

**Trade-off:**
- Adds ~100 bytes to CSS bundle
- Makes behavior predictable
- **Optional:** Can skip if preferring to use only custom class

## Testing Protocol

### Manual Testing Checklist

**Mobile Viewports:**
- [ ] 375px width (iPhone SE)
  - [ ] No horizontal scroll
  - [ ] Carousel images maintain 3:4 aspect ratio
  - [ ] "View All" button visible and centered
  - [ ] Fade-in animation works
- [ ] 414px width (iPhone Pro Max)
  - [ ] Same checks as above

**Tablet Viewports:**
- [ ] 768px width (iPad)
  - [ ] Carousel centered on page
  - [ ] Grid shows 2 columns properly
  - [ ] Modal opens correctly
- [ ] 1024px width (iPad Pro)
  - [ ] Same checks as above

**Desktop Viewports:**
- [ ] 1280px width
  - [ ] Carousel uses ~1152px max width
  - [ ] Proper centering with margins
  - [ ] No edge overflow
- [ ] 1440px width
  - [ ] Same checks as above
- [ ] 1920px width
  - [ ] Carousel doesn't exceed max-w-6xl
  - [ ] Centered with equal margins

**Functional Testing:**
- [ ] Click "View All" opens modal
- [ ] Modal navigation (arrows, thumbnails) works
- [ ] Keyboard navigation (←, →, Esc) works
- [ ] Modal closes properly (X button, Esc)
- [ ] Fade-in animation triggers on scroll
- [ ] Images load without layout shift

### Automated Testing

**Run Playwright Tests:**
```bash
npm run test:e2e
```

**Expected Results:**
- Homepage loads without console errors
- No layout shift warnings
- Visual regression tests may show intentional changes (smaller carousel)

**Review Screenshots:**
```
tests/screenshots/
  ├── homepage-mobile.png
  ├── homepage-tablet.png
  └── homepage-desktop.png
```

### Build Testing

**Production Build:**
```bash
npm run build
```

**Checks:**
- [ ] Build completes without errors
- [ ] No Tailwind purge warnings
- [ ] Bundle size similar or smaller
- [ ] No unused CSS warnings

## Rollback Plan

If issues arise:

### Quick Rollback (Git)
```bash
git diff src/app/page.tsx
git diff src/components/LazyPortraitCarousel.tsx
git diff src/components/PortraitCarousel.tsx

# If needed:
git checkout src/app/page.tsx
git checkout src/components/LazyPortraitCarousel.tsx
git checkout src/components/PortraitCarousel.tsx
```

### Alternative: Implement Option 2

If Option 1 causes issues, fallback to Option 2:
- Keep container nesting
- Change all `max-w-6xl` to `max-w-5xl`
- Simpler change, smaller carousel

## Success Criteria

### Required
- [ ] No horizontal scroll on any viewport
- [ ] Carousel images display at correct aspect ratio (3:4)
- [ ] Modal functionality preserved
- [ ] Fade-in animations work
- [ ] Build succeeds without errors

### Desired
- [ ] Carousel visually balanced on all viewports
- [ ] Improved mobile spacing/readability
- [ ] Reduced CSS duplication
- [ ] Cleaner component structure

## Documentation Updates

After implementation:

1. **Update:** `docs/carousel-layout-investigation.md`
   - Add "Implementation" section
   - Document which option was chosen
   - Note any deviations from plan

2. **Create:** Git commit message
   ```
   fix: resolve carousel layout overflow on mobile and desktop

   - Remove max-w-5xl wrapper causing width conflict with carousel's max-w-6xl
   - Simplify container nesting (carousel outside page container)
   - Update carousel components to use px-4 instead of p-4 (remove vertical padding)
   - Remove duplicate .container class from globals.css (keep in critical.css)

   Carousel now properly uses its intended max-w-6xl (1152px) width without
   constraint conflicts. Reduces accumulated padding from 32-48px to 16px.

   Issue existed before Sprint D changes. Root cause was multiple container
   nesting creating width mismatches (1024px wrapper vs 1152px carousel).

   Refs: docs/carousel-layout-investigation.md
   ```

3. **Optional:** Update `README.md` or design system docs if carousel is documented

## Implementation Order

1. **Phase 1** - Update page.tsx carousel section structure
2. **Phase 2** - Update LazyPortraitCarousel padding
3. **Phase 3** - Update PortraitCarousel padding
4. **Test** - Manual viewport testing
5. **Phase 4** - CSS cleanup (container duplication)
6. **Phase 5** - Optional Tailwind config (if desired)
7. **Test** - Full testing protocol
8. **Build** - Production build test
9. **Commit** - With detailed message

## Risk Assessment

**Low Risk:**
- Phase 1-3 (structural changes) - Easily reversible
- Changes are localized to carousel section

**Medium Risk:**
- Phase 4 (CSS cleanup) - Could affect other pages using `.container`
- **Mitigation:** Test all pages after removing duplication

**Low Risk:**
- Phase 5 (Tailwind config) - Optional, purely additive

**Overall:** Low-Medium risk implementation with clear rollback path

## Notes

- Sprint D Section component not used for carousel section due to unique wave SVG positioning requirements
- Could be future refactor target after carousel is stable
- Carousel components (LazyPortraitCarousel, PortraitCarousel) remain unchanged in core functionality
- Only layout/spacing classes modified
