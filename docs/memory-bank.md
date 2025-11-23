# Tailwind Tokenization & Design System - Memory Bank

**Last Updated:** 2025-11-22
**Branch:** `refactor/tailwind-tokenization`
**Baseline Tag:** `baseline-before-tailwind-refactor`

---

## Project Status

### Completed Phases

#### ✅ Pre-Implementation (Complete)
- Created feature branch `refactor/tailwind-tokenization`
- Created git tag `baseline-before-tailwind-refactor`
- Set up Playwright visual regression testing
- Generated 24 baseline screenshots (6 pages × 4 viewports)
- Documented baseline metrics (CSS: 39KB, JS: 138-147KB)

#### ✅ Phase 1: Configuration Cleanup (Complete)
- Removed duplicate Tailwind config (fontSize, spacing, borderRadius, maxWidth)
- Removed duplicate gray color overrides
- Added complete purple, yellow, amber color scales
- Updated baseline screenshots after visual regression tests
- Committed successfully

#### ✅ Phase 0: Foundation Documentation (Complete)
- Created `critical-css-architecture.md` - 365 lines
- Created `component-inventory.md` - 463 lines
- Created `design-system-plan.md` - 1,734 lines
- Created `design-system-summary.md` - 196 lines
- Created `file-reference.md` - 69 lines
- **Total:** 2,926 lines of documentation, zero code changes
- Committed: "docs: Phase 0 - Design system foundation and architecture documentation"

#### ✅ Phase 1: Token Layer (Complete)
- Created `src/app/design-tokens.css` with CSS custom properties
- Defined color tokens (primary, secondary, accent, background)
- Defined typography tokens (font-heading)
- Maintained critical CSS architecture
- Committed: "feat: Phase 1 - Add design tokens CSS file"

#### ✅ Phase 2: Component Extraction - Sprints A, B, C (Complete)

**Sprint A: Button Component**
- Created `src/components/ui/Button.tsx` (124 lines)
- 3 variants: ghost, primary, outline
- Updated homepage and PortraitCarousel
- Committed: "feat: create reusable Button component with variants"

**Sprint B: Heading Component**
- Created `src/components/ui/Heading.tsx` (173 lines)
- 6 variants: hero, hero-sm, section, subsection, subtitle, default
- Updated 6 pages (all pages, 19 total headings)
- Added hero-sm variant (25% smaller for subpages)
- Committed: "feat: create Heading component and update all pages"
- Committed: "feat: add hero-sm variant for 25% smaller subpage headings"

**Sprint C: Card Component**
- Created `src/components/ui/Card.tsx` (108 lines)
- 3 variants: default, elevated, interactive
- Updated 5 pages (7 card instances total)
- Reduced page bundle sizes by 1-2 KB per page
- Committed: "feat: add Card component and update all pages (Sprint C)"

### Current Phase

#### 🔄 Phase 2: Component Extraction (Sprint D - In Progress)
- **Goal:** Extract repeated UI patterns into reusable components
- **Status:** Sprint C complete, Sprint D pending
- **Expected Duration:** 2-3 hours for Sprint D
- **Expected Outcome:** Less code duplication, better maintainability

**Completed Sprints:**
- ✅ Sprint A: Button Component (3 variants: ghost, primary, outline)
- ✅ Sprint B: Heading Component (6 variants including hero-sm)
- ✅ Sprint C: Card Component (3 variants: default, elevated, interactive)

**Current Sprint:**
- ⬜ Sprint D: Section Component (container + spacing patterns)

---

## Critical Discoveries

### ⚠️ Three-Layer CSS Architecture (DO NOT BREAK)

The site uses an intentional three-layer CSS architecture for 95+ Lighthouse Performance:

**Layer 1: tailwind.config.ts (86 lines)**
- Source of truth for design tokens
- Generates Tailwind utility classes

**Layer 2: critical.css (99 lines, ~2.5KB)**
- Inlined in `<head>` for instant LCP
- Contains hero styles, manual utilities, CSS variables
- **Why inlined:** Eliminates render-blocking CSS for above-the-fold content

**Layer 3: globals.css (484 lines)**
- Full stylesheet loaded asynchronously
- Lines 30-42: CSS custom properties (duplicates critical.css)
- **Lines 226-257: Manual utility classes - CANNOT BE REMOVED**
- Complex gradients, sun animations, mobile optimizations

### 🚨 Manual Utilities MUST Stay (Lines 226-257 in globals.css)

These utilities look like duplicates of Tailwind, but they serve **two critical purposes:**

1. **Critical CSS Compatibility** - Mirror classes in critical.css for instant rendering
2. **Purge Safety Backup** - Fail-safe if Tailwind's purge removes a class

**What happens if you remove them:**
- Hero sections render incorrectly on initial load
- Flash of unstyled content (FOUC)
- Lighthouse Performance drops from 95+ to ~70s
- Critical CSS strategy collapses

**We tested this - it breaks the site immediately.**

Manual utilities affected:
```css
/* globals.css - Lines 226-257 */
.bg-primary, .text-primary, .bg-secondary, .text-secondary
.bg-accent, .text-accent, .bg-background, .bg-white
.font-light, .font-medium, .font-heading
.flex, .flex-col, .items-center, .justify-center, .justify-between
.space-x-8, .space-y-8, .px-4, .py-20
```

Used **51 times across 12 files** in the codebase.

---

## CSS Token Duplication (Intentional)

Colors are defined in **3 places:**

1. **tailwind.config.ts** (Lines 18-23)
   - Used by Tailwind's build process

2. **critical.css** (Lines 3-8)
   - CSS variables for inlined styles

3. **globals.css** (Lines 31-36)
   - CSS variables for async stylesheet

**Why this exists:**
- Tailwind config → generates `.bg-primary` utility classes
- CSS variables → used in complex gradients that can't use Tailwind
- Duplication → ensures critical and async CSS have same values

**Maintenance burden:**
- To change primary color, update 3 files
- Phase 1 will reduce this to 1 file (tokens.ts)

---

## Component Extraction Opportunities

### High-Value Patterns (Phase 2)

**1. Button Pattern** (Priority: HIGH)
- Impact: 10+ uses across 6 files
- Variants: 3 (ghost, primary, outline)
- Lines saved: ~30-40
- Difficulty: LOW

**2. Heading Pattern** (Priority: HIGH)
- Impact: 6+ uses with 150+ character className strings
- Variants: 4 levels (H1, H2, H3, H4)
- Lines saved: ~50-60
- Difficulty: LOW

**3. Card Pattern** (Priority: MEDIUM)
- Impact: 12+ uses (9 in offerings grid, 3 testimonials)
- Variants: 2 (offering card, testimonial card)
- Lines saved: ~40-50
- Difficulty: MEDIUM

**4. Section Pattern** (Priority: MEDIUM)
- Impact: 30+ sections across all pages
- Variants: 3 sizes (py-16, py-20, py-24)
- Lines saved: ~20-30
- Difficulty: LOW

**Total potential savings:** ~140-180 lines

---

## Performance Baseline (MUST MAINTAIN)

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Lighthouse Performance | 95-98 | >90 | ✅ Excellent |
| LCP (Largest Contentful Paint) | ~1.2s | <2.0s | ✅ Great |
| FCP (First Contentful Paint) | ~0.8s | <1.8s | ✅ Great |
| First Load JS | 138 kB | <180 kB | ✅ Good |
| Critical CSS Size | ~2.5 kB | <5 kB | ✅ Perfect |
| CSS Bundle (async) | 39 kB | <50 kB | ✅ Good |

**Rule:** If any metric degrades during refactoring, rollback immediately.

---

## Testing Strategy

### After Every Phase

**1. Visual Regression**
```bash
npm run build
npx playwright test
# All 24 tests must pass
```

**2. Performance Validation**
```bash
npm run build
npm run start
# Run Lighthouse (Desktop + Mobile)
# Performance score must be >90
```

**3. Manual Checks**
- Hero section renders instantly
- No flash of unstyled content
- All pages load correctly
- Responsive breakpoints work

### Rollback Triggers
- ❌ Lighthouse Performance < 90
- ❌ Visual regression tests fail
- ❌ FOUC appears on any page
- ❌ Hero sections render incorrectly

---

## What We Learned

### ❌ Failed Attempt: Removing Manual Utilities
- **What we tried:** Remove lines 226-257 from globals.css (manual utilities)
- **Why we tried:** They looked like duplicates of Tailwind utilities
- **Result:** CATASTROPHIC failure
  - Viewport sizes changed (375px → 743px)
  - Heights drastically different (7238px → 4359px)
  - All 24 visual regression tests failed
- **Action:** Immediate rollback via `git checkout src/app/globals.css`
- **Learning:** Manual utilities support critical CSS strategy - CANNOT remove

### ✅ Successful: Phase 1 Config Cleanup
- **What we did:** Removed duplicate fontSize, spacing, borderRadius, maxWidth from tailwind.config.ts
- **Result:** Minor height reductions (90-130px on some pages)
- **User feedback:** "The site looks good with the updates"
- **Action:** Updated baseline screenshots
- **Learning:** Config cleanup is safe if you test thoroughly

---

## Phase Roadmap

### ✅ Phase 1: Token Layer (Complete)
- ✅ Create `src/app/design-tokens.css` - CSS custom properties
- ✅ Define color and typography tokens
- ✅ Keep manual utilities (documented why)
- ✅ Keep three-layer architecture
- ✅ Committed changes

### 🔄 Phase 2: Component Extraction (Sprint D - Current)
- ✅ Extract Button component (3 variants)
- ✅ Extract Heading component (6 variants including hero-sm)
- ✅ Extract Card component (3 variants)
- ⬜ Extract Section component (container + spacing)
- ✅ Update pages incrementally (one at a time)
- ✅ Test after each component
- ✅ Build succeeds with smaller bundle sizes

### Phase 3: CSS Variable Unification (OPTIONAL, 6-8 hours)
- ⬜ Build script to generate CSS vars from tokens
- ⬜ Auto-sync critical.css and globals.css :root
- ⬜ Single file update for color changes

### Phase 4: Documentation (4-6 hours)
- ⬜ Design system usage guide
- ⬜ Component API documentation
- ⬜ Migration examples
- ⬜ Critical CSS explanation

---

## Important Files

### Source Code
- `tailwind.config.ts` - Token definitions, Tailwind configuration
- `src/app/globals.css` - Full stylesheet (484 lines)
- `src/app/critical.css` - Inlined critical CSS (99 lines)
- `src/app/layout.tsx` - Critical CSS inlining location
- `src/lib/tokens.ts` - **TO BE CREATED** in Phase 1

### Documentation
- `docs/design-system-plan.md` - 1,734 line comprehensive plan
- `docs/design-system-summary.md` - Executive summary
- `docs/critical-css-architecture.md` - Three-layer architecture explanation
- `docs/component-inventory.md` - UI pattern catalog
- `docs/file-reference.md` - Complete file paths
- `docs/metrics-baseline.md` - Performance baseline
- `docs/memory-bank.md` - This file

### Testing
- `playwright.config.ts` - Visual regression config
- `tests/visual-regression.spec.ts` - Screenshot tests
- `tests/screenshots/` - 24 baseline screenshots

---

## Golden Rules

1. **Understand before removing** - If you don't know why something exists, don't delete it
2. **Test everything** - Visual regression + performance after every change
3. **Incremental changes** - One page/component at a time
4. **Respect critical CSS** - The three-layer architecture is why we have 95+ Lighthouse
5. **Manual utilities stay** - They support critical CSS, no matter how redundant they look
6. **Zero visual changes** - Token layer should be invisible to users
7. **Maintain performance** - If Lighthouse drops below 90, rollback

---

## Quick Commands

```bash
# Visual regression testing
npm run build
npx playwright test

# Update baselines (only after user confirms site looks good)
npx playwright test --update-snapshots

# Performance testing
npm run build
npm run start
# Then run Lighthouse in Chrome DevTools

# Git operations
git status
git add .
git commit -m "message"
git push origin refactor/tailwind-tokenization

# Rollback last commit
git reset --soft HEAD~1

# Rollback specific file
git checkout HEAD -- path/to/file
```

---

## Recent Progress Summary

### ✅ Portrait Carousel Modal Fix (Complete - 2025-11-22)

**Issue:** Modal was "stuck to the top of the page" instead of viewport
- Close button (X) and thumbnails positioned at page edges, not viewport edges
- Modal stretched to entire document height instead of browser window
- CSS `position: fixed` being broken by parent `position: relative`

**Root Causes Identified:**
1. `body` had `position: relative` in globals.css (line 82)
2. Mobile-specific CSS also added `position: relative` to html/body (lines 370-380)
3. These properties break `position: fixed` for child elements rendered via React Portal

**Solution Implemented:**
1. Removed `position: relative` from globals.css (commented out lines 82 and 370-380)
2. Converted modal to use full viewport dimensions (100vw × 100vh)
3. Used inline styles to bypass CSS specificity conflicts
4. Modal now properly fills entire viewport edge-to-edge with no padding

**Key Learnings:**
- **Viewport vs Page:** Viewport = browser window, Page = entire document
- React Portals render to document.body but still affected by body CSS
- `position: relative` on body/html breaks `position: fixed` children
- Transform properties can also create new stacking contexts that break fixed positioning

**Files Modified:**
- `src/components/PortraitCarousel.tsx` - Complete modal rewrite with viewport sizing
- `src/app/globals.css` - Removed position: relative conflicts
- `src/app/page.tsx` - Removed 115 lines of orphaned carousel CSS
- `src/components/ui/Button.tsx` - Added cursor-pointer class

**Status:** Committed to main branch with message "fix: portrait carousel modal viewport positioning and cleanup"

---

**Sprint C (Card Component) - Completed:**
- Created Card component with 3 variants (default, elevated, interactive)
- Updated 5 pages: homepage, offerings, about, drum-circle, get-in-touch
- Eliminated 7 instances of repeated card patterns
- Reduced page bundle sizes by 1-2 KB per page
- Build succeeded, zero visual changes maintained
- Committed and pushed to remote

**Components Created So Far:**
1. `src/components/ui/Button.tsx` - 124 lines (updated with cursor-pointer)
2. `src/components/ui/Heading.tsx` - 173 lines
3. `src/components/ui/Card.tsx` - 108 lines

**Total Lines Added:** 405 lines of reusable component code
**Total Lines Saved:** ~265 lines across pages (including 115 lines of orphaned CSS)
**Bundle Size Impact:** 1-2 KB reduction per page

---

**Next Action:** Sprint D - Extract Section component (container + spacing patterns)
