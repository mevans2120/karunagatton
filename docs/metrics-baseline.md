# Baseline Metrics

## Phase 1 Complete (Current Baseline)

**Date:** 2025-11-22
**Branch:** refactor/tailwind-tokenization
**Phase:** 1 - Configuration Cleanup

## Original Baseline (Pre-Refactoring)

**Date:** 2025-11-22
**Commit:** 7f63afb0f51905d064bfd3f5e92928beb3d61ef9
**Git Tag:** baseline-before-tailwind-refactor
**Branch:** refactor/tailwind-tokenization

---

## Build Metrics

### Bundle Sizes
- **CSS Bundle Size:** 39 KB (ac1e7e9ae91c1d28.css)
- **First Load JS (shared):** 138 kB
  - chunks/fd9d1056-d17313c03983f67e.js: 53.6 kB
  - chunks/vendors-f87d8f7fb8e7588c.js: 82.5 kB
  - other shared chunks: 1.98 kB

### Page Sizes (First Load JS)
- `/` (Homepage): 147 kB (8.59 kB page-specific)
- `/about`: 142 kB (4.22 kB page-specific)
- `/drum-circle`: 141 kB (3.23 kB page-specific)
- `/get-in-touch`: 141 kB (3.29 kB page-specific)
- `/offerings`: 142 kB (3.93 kB page-specific)
- `/_not-found`: 138 kB (138 B page-specific)

### Build Configuration
- Next.js Version: 14.2.33
- Experiments: optimizeCss
- Total Pages Generated: 9/9
- All pages: Static (prerendered)

---

## Performance Budget Targets

**CRITICAL:** Performance must not regress after refactoring

### Target Metrics (To Be Maintained or Improved)
- CSS Bundle: ≤ 39 KB (current)
- First Load JS: ≤ 147 kB (current maximum)
- Build Success: All pages compile without errors
- Static Generation: All pages remain static

---

## Lighthouse Metrics

**Status:** To be measured

Run Lighthouse audits for:
- Homepage (/)
- About (/about)
- Offerings (/offerings)
- Drum Circle (/drum-circle)
- Get in Touch (/get-in-touch)

### How to Run Lighthouse:
```bash
npm run build
npm run start
# Open http://localhost:3000 in Chrome Incognito
# DevTools → Lighthouse → Desktop/Mobile → Run audit
# Repeat 3 times, record averages
```

### Metrics to Record:
- Performance Score: /100
- First Contentful Paint (FCP): ms
- Largest Contentful Paint (LCP): ms
- Total Blocking Time (TBT): ms
- Cumulative Layout Shift (CLS): score
- Speed Index: ms

---

## Visual Regression Baseline

### Screenshots Location
`docs/screenshots/before/`

### Pages to Capture
- Homepage: `/`
- About: `/about`
- Offerings: `/offerings`
- Drum Circle: `/drum-circle`
- Get in Touch: `/get-in-touch`
- 404 Page: `/not-found`

### Viewports to Test
- Mobile: 375px × 667px
- Tablet: 768px × 1024px
- Desktop: 1280px × 800px
- Large Desktop: 1920px × 1080px

---

## Success Criteria

After each refactoring phase:
- ✅ CSS bundle size ≤ 39 KB (or smaller)
- ✅ First Load JS ≤ 147 kB per page
- ✅ All pages build successfully
- ✅ All pages remain static
- ✅ Visual regression tests pass (0 pixel differences)
- ✅ Lighthouse Performance score maintained or improved
- ✅ No console errors or warnings

---

## Notes

- Current setup uses Tailwind with custom CSS in globals.css and critical.css
- Performance is already excellent with optimizeCss experiment enabled
- Goal: Improve maintainability WITHOUT sacrificing performance or visual consistency
