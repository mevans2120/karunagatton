# Tailwind CSS Refactoring - Phased Implementation Plan

**Project:** Karuna Gatton Website
**Created:** 2025-11-22
**Status:** Ready for Implementation
**Based on:** [Tailwind Tokenization Research](./tailwind-tokenization-research.md)

---

## Table of Contents

1. [Pre-Implementation Phase](#pre-implementation-phase)
2. [Phase 1: Configuration Cleanup](#phase-1-configuration-cleanup)
3. [Phase 2: CSS Consolidation](#phase-2-css-consolidation)
4. [Phase 3: Token Migration](#phase-3-token-migration)
5. [Phase 4: Component Extraction (Optional)](#phase-4-component-extraction-optional)
6. [Rollback Procedures](#rollback-procedures)
7. [Success Metrics](#success-metrics)

---

## CRITICAL CONSTRAINTS

- **ZERO VISUAL CHANGES** - Design and functionality must remain exactly as-is
- **PERFORMANCE MAINTAINED** - Current performance is excellent, must not regress
- **INDEPENDENTLY TESTABLE** - Each phase can be tested and verified separately
- **REVERSIBLE** - Each change must have a clear rollback path
- **ZERO-RISK APPROACH** - Verify before moving forward

---

## Pre-Implementation Phase

### Objective
Set up infrastructure for safe, verifiable refactoring with zero visual changes.

### Duration
**2-4 hours**

### Tasks

#### 1. Create Feature Branch
```bash
git checkout -b refactor/tailwind-tokenization
git push -u origin refactor/tailwind-tokenization
```

#### 2. Document Current State

**2.1 Take Visual Screenshots**

Create a screenshot directory:
```bash
mkdir -p docs/screenshots/before
```

Take screenshots of all pages at multiple breakpoints:
- Homepage: `/`
- About: `/about`
- Offerings: `/offerings`
- Drum Circle: `/drum-circle`
- Get in Touch: `/get-in-touch`
- 404 Page: `/not-found`

**Breakpoints to test:**
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1280px width
- Large Desktop: 1920px width

**Tools:**
- Manual screenshots in browser DevTools
- OR automated with Playwright (see Testing Strategy)

**2.2 Document CSS Output Size**

```bash
npm run build
# Note the CSS bundle size from build output
# Record in docs/metrics-baseline.md
```

Create `/Users/michaelevans/karunagatton/docs/metrics-baseline.md`:
```markdown
# Baseline Metrics (Pre-Refactoring)

**Date:** [Current Date]
**Commit:** [Git SHA]

## Build Metrics
- CSS Bundle Size: [X] KB
- Build Time: [X] seconds
- No. of CSS Classes Generated: [use PostCSS stats]

## Performance (Lighthouse)
- Performance: [X]/100
- FCP: [X]ms
- LCP: [X]ms

## Bundle Sizes
- Main JS: [X] KB
- First Load JS: [X] KB
```

**2.3 Run Lighthouse Audit**

```bash
npm run build
npm run start
# Open http://localhost:3000 in Chrome
# Run Lighthouse audit (3 runs, take average)
# Record scores in metrics-baseline.md
```

#### 3. Set Up Testing Strategy

**3.1 Install Visual Regression Testing (Recommended)**

```bash
npm install -D playwright @playwright/test
npx playwright install
```

Create `/Users/michaelevans/karunagatton/tests/visual-regression.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'offerings', path: '/offerings' },
  { name: 'drum-circle', path: '/drum-circle' },
  { name: 'get-in-touch', path: '/get-in-touch' },
];

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const page of pages) {
  for (const viewport of viewports) {
    test(`${page.name} - ${viewport.name}`, async ({ page: pw }) => {
      await pw.setViewportSize(viewport);
      await pw.goto(page.path);

      // Wait for animations to complete
      await pw.waitForTimeout(1000);

      // Take screenshot
      await expect(pw).toHaveScreenshot(
        `${page.name}-${viewport.name}.png`,
        {
          fullPage: true,
          animations: 'disabled',
        }
      );
    });
  }
}
```

Create `/Users/michaelevans/karunagatton/playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**3.2 Generate Baseline Screenshots**

```bash
# Start dev server
npm run dev

# In another terminal
npx playwright test
# This will generate baseline screenshots in tests/__screenshots__
```

#### 4. Create Backup

```bash
# Tag current state
git tag -a pre-refactor-baseline -m "Baseline before Tailwind refactoring"
git push origin pre-refactor-baseline

# Create backup of critical files
mkdir -p .backups
cp tailwind.config.ts .backups/tailwind.config.ts.backup
cp src/app/globals.css .backups/globals.css.backup
```

### Success Criteria

- [ ] Feature branch created and pushed
- [ ] Screenshots taken of all pages at all breakpoints
- [ ] Baseline metrics documented (CSS size, Lighthouse scores)
- [ ] Visual regression tests set up (recommended) OR manual screenshot comparison process defined
- [ ] Baseline tagged in git
- [ ] Backup files created
- [ ] All team members can access baseline documentation

### Rollback Plan

Simple git reset: No changes made yet, nothing to roll back.

---

## Phase 1: Configuration Cleanup

### Objective
Remove duplicate and unnecessary configurations from `tailwind.config.ts` without changing any visual output.

### Duration
**2-3 hours**

### Risk Level
**LOW** - No component changes, purely configuration cleanup

### Files Modified
- `/Users/michaelevans/karunagatton/tailwind.config.ts`

### Tasks

#### 1.1 Remove Duplicate fontSize Definitions

**Current State (Lines 43-51):**
```typescript
fontSize: {
  'xl': '1.25rem',    // Duplicates Tailwind default
  '2xl': '1.5rem',    // Duplicates Tailwind default
  '3xl': '1.875rem',  // Duplicates Tailwind default
  '4xl': '2.25rem',   // Duplicates Tailwind default
  '5xl': '3rem',      // Duplicates Tailwind default
  '7xl': '4.5rem',    // Duplicates Tailwind default
  '8xl': '6rem',      // Duplicates Tailwind default
}
```

**Action:**
Delete the entire `fontSize` section (lines 43-51) from `extend` object.

**Verification:**
```bash
# Build and check that text-xl, text-2xl, etc. still work
npm run build
npm run dev
# Visually check homepage hero (should use text-5xl md:text-7xl lg:text-8xl)
```

**Why this is safe:**
All these values are identical to Tailwind's defaults. Removing them has zero effect on output.

#### 1.2 Remove Duplicate Spacing Definitions

**Current State (Lines 52-70):**
```typescript
spacing: {
  '3': '0.75rem',   // Duplicates default
  '4': '1rem',      // Duplicates default
  '6': '1.5rem',    // Duplicates default
  '8': '2rem',      // Duplicates default
  '10': '2.5rem',   // Duplicates default
  '12': '3rem',     // Duplicates default
  '16': '4rem',     // Duplicates default
  '20': '5rem',     // Duplicates default
  '24': '6rem',     // Duplicates default
  '32': '8rem',     // Duplicates default
  '40': '10rem',    // Duplicates default
  '48': '12rem',    // Duplicates default
  '64': '16rem',    // Duplicates default
  '80': '20rem',    // Duplicates default
  '96': '24rem',    // Duplicates default
  'h-800': '800px', // ❌ Non-standard naming
  'w-600': '600px', // ❌ Non-standard naming
}
```

**Action:**
Replace the entire `spacing` section with:
```typescript
spacing: {
  // Remove non-standard h-800 and w-600 - use height/width instead
}
```

Then add proper height/width tokens:
```typescript
height: {
  '800': '800px',
},
width: {
  '600': '600px',
},
```

**Component Changes Required:**
Need to search for usage of `h-800` and `w-600`:

```bash
grep -r "h-800\|w-600" src/
```

If found, replace:
- `h-800` → `h-[800px]` (arbitrary value)
- `w-600` → `w-[600px]` (arbitrary value)

OR keep them in height/width and use `h-800` and `w-600` as before (they'll now correctly reference height/width).

**Verification:**
```bash
npm run build
# Check that all spacing values (p-4, m-8, etc.) still work
# Check any components that used h-800 or w-600
```

**Why this is safe:**
All standard spacing values (3, 4, 6, etc.) are identical to Tailwind defaults. The h-800/w-600 are preserved in proper height/width configs.

#### 1.3 Remove Duplicate Gray Color Overrides

**Current State (Lines 24-29):**
```typescript
colors: {
  // ...
  'gray-800': '#1f2937',  // Exact Tailwind default
  'gray-700': '#374151',  // Exact Tailwind default
  'gray-600': '#4b5563',  // Exact Tailwind default
  'gray-300': '#d1d5db',  // Exact Tailwind default
  'gray-200': '#e5e7eb',  // Exact Tailwind default
  'gray-900': '#111827',  // Exact Tailwind default
}
```

**Action:**
Delete these 6 gray color definitions from the `colors` object.

**Verification:**
```bash
# Build and check that gray colors still work
npm run build
# Check offerings page (uses gray-700 for text)
# Check footer (may use gray colors)
```

**Why this is safe:**
These values are byte-for-byte identical to Tailwind's default gray scale. Removing them has zero effect.

#### 1.4 Remove Duplicate borderRadius and maxWidth

**Current State (Lines 71-82):**
```typescript
borderRadius: {
  'lg': '0.5rem',   // Duplicates default
  'full': '9999px', // Duplicates default
},
maxWidth: {
  'xl': '36rem',    // Duplicates default
  '2xl': '42rem',   // Duplicates default
  '3xl': '48rem',   // Duplicates default
  '4xl': '56rem',   // Duplicates default
  '5xl': '64rem',   // Duplicates default
  'xs': '20rem',    // Duplicates default
}
```

**Action:**
Delete both `borderRadius` and `maxWidth` sections entirely.

**Verification:**
```bash
npm run build
# Check that rounded-lg and rounded-full still work (buttons)
# Check that max-w-4xl, max-w-5xl still work (content containers)
```

**Why this is safe:**
All values are identical to Tailwind defaults.

#### 1.5 Add Complete Color Scales

**Current State:**
Incomplete purple/yellow/amber scales mixed with semantic colors.

**Action:**
Reorganize colors section to have complete scales:

```typescript
colors: {
  // Semantic brand colors (keep these as-is for now)
  primary: '#4B006E',
  secondary: '#6d5590',
  accent: '#b2a3c7',
  background: '#F5F3FE',
  white: '#fff',
  footer: '#121826',

  // Complete purple scale (based on primary)
  purple: {
    50: '#f5f3ff',
    100: '#ede9ff',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    // Custom brand shades
    'brand': '#4B006E',           // primary
    'brand-light': '#6d5590',      // secondary
    'brand-lighter': '#b2a3c7',    // accent
    'gradient-1': '#6B20A0',       // Used in hero gradient
    'gradient-2': '#7B36A0',       // Used in hero gradient
    'gradient-3': '#35004F',       // Used in hero gradient
  },

  // Complete yellow/amber scale (for sun animations)
  yellow: {
    50: '#fffbe6',
    100: '#fff9c3',
    200: '#fff176',
    300: '#ffed4e',
    400: '#ffc107',
    500: '#ffdd33',
    600: '#f59e0b',
    700: '#d97706',
    800: '#b45309',
    900: '#92400e',
  },

  amber: {
    50: '#fef9c3',
    100: '#fef3c7',
    200: '#fef08a',
    300: '#facc15',
    400: '#eab308',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
}
```

**Why this is safe:**
We're ADDING colors, not removing or changing existing ones. All currently used color references will continue to work.

### Implementation Steps

**Step 1: Create backup**
```bash
cp tailwind.config.ts tailwind.config.ts.phase1.backup
```

**Step 2: Make changes**
Edit `/Users/michaelevans/karunagatton/tailwind.config.ts`:

1. Delete lines 43-51 (fontSize)
2. Delete lines 52-70 (spacing) and replace with empty object or height/width config
3. Delete lines 24-29 (gray colors)
4. Delete lines 71-82 (borderRadius and maxWidth)
5. Expand colors section with complete scales (see above)

**Step 3: Search for h-800 and w-600 usage**
```bash
grep -rn "h-800\|w-600" src/
```

If found, update those components to use `h-[800px]` or move to height config.

**Step 4: Build and test**
```bash
npm run build
```

Check for any errors. If errors occur, they'll point to missing values.

**Step 5: Visual verification**
```bash
npm run dev
```

Manually check all pages or run visual regression tests:
```bash
npx playwright test
# Check for differences - there should be ZERO differences
```

**Step 6: Lighthouse audit**
```bash
npm run build
npm run start
# Run Lighthouse - scores should be identical to baseline
```

### Verification Checklist

- [ ] Build succeeds with no errors
- [ ] All font sizes render correctly (text-xl, text-5xl, etc.)
- [ ] All spacing works (p-4, m-8, py-20, etc.)
- [ ] All gray colors render correctly
- [ ] Border radius works (rounded-lg, rounded-full)
- [ ] Max-width classes work (max-w-4xl, max-w-5xl)
- [ ] Visual regression tests show ZERO differences
- [ ] Lighthouse scores match baseline (±1 point acceptable)
- [ ] CSS bundle size same or smaller
- [ ] No console errors in browser

### Success Criteria

- [ ] tailwind.config.ts reduced by ~30 lines
- [ ] No duplicate default values remain
- [ ] Complete color scales added
- [ ] All pages render identically to baseline
- [ ] Build size unchanged or smaller
- [ ] Performance metrics maintained

### Rollback Plan

```bash
# If issues found
cp tailwind.config.ts.phase1.backup tailwind.config.ts
npm run build
# Verify everything works
git checkout tailwind.config.ts
```

### Commit Strategy

```bash
git add tailwind.config.ts
git commit -m "refactor(tailwind): remove duplicate config values and add complete color scales

- Remove duplicate fontSize definitions (all match Tailwind defaults)
- Remove duplicate spacing definitions (all match Tailwind defaults)
- Remove duplicate gray color overrides (all match Tailwind defaults)
- Remove duplicate borderRadius and maxWidth (all match Tailwind defaults)
- Add complete purple scale with brand color references
- Add complete yellow and amber scales for sun animations
- Fix non-standard h-800 and w-600 spacing tokens

ZERO visual changes - all values either removed (duplicates) or added (new scales).
Verified with visual regression tests and manual QA.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 2: CSS Consolidation

### Objective
Move custom utility classes from `globals.css` to `tailwind.config.ts` plugin system, removing manual CSS duplicates.

### Duration
**4-6 hours**

### Risk Level
**MEDIUM** - Requires component updates and careful testing

### Files Modified
- `/Users/michaelevans/karunagatton/tailwind.config.ts`
- `/Users/michaelevans/karunagatton/src/app/globals.css`
- All component files using custom color classes

### Background

Currently, custom utility classes are manually created in `globals.css` (lines 226-249):

```css
/* These manually recreate Tailwind functionality */
.bg-primary { background-color: var(--primary); }
.text-primary { color: var(--primary); }
.bg-secondary { background-color: var(--secondary); }
.text-secondary { color: var(--secondary); }
.bg-accent { background-color: var(--accent); }
.text-accent { color: var(--accent); }
.bg-background { background-color: var(--background); }
.bg-white { background-color: #fff !important; }
.font-light { font-weight: 300; }
.font-medium { font-weight: 500; }
.font-heading { font-family: var(--font-heading); font-display: swap; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
/* ... etc */
```

**Problem:** These bypass Tailwind's purging and optimization.

**Solution:** Create a Tailwind plugin that generates these utilities properly.

### Tasks

#### 2.1 Audit Custom Class Usage

**Action:**
Find all usages of custom color classes:

```bash
# Create audit file
echo "# Custom Class Usage Audit\n" > docs/custom-class-audit.md

# Find all instances
grep -rn "bg-primary\|text-primary\|bg-secondary\|text-secondary\|bg-accent\|text-accent\|bg-background\|bg-footer" src/ >> docs/custom-class-audit.md
```

**Expected Files:**
Based on research, these classes are likely used in:
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/offerings/page.tsx`
- `src/app/drum-circle/page.tsx`
- `src/app/get-in-touch/page.tsx`
- `src/components/Footer.tsx`
- `src/components/Navigation.tsx`

#### 2.2 Create Tailwind Plugin for Brand Colors

**Action:**
Add to `/Users/michaelevans/karunagatton/tailwind.config.ts`:

**Before the `export default config;` line (around line 105), modify the `plugins` array:**

```typescript
plugins: [
  // Custom plugin for brand color utilities
  function({ addUtilities, theme }) {
    const newUtilities = {
      '.bg-brand': {
        backgroundColor: theme('colors.primary'),
      },
      '.text-brand': {
        color: theme('colors.primary'),
      },
      '.border-brand': {
        borderColor: theme('colors.primary'),
      },
      '.bg-brand-secondary': {
        backgroundColor: theme('colors.secondary'),
      },
      '.text-brand-secondary': {
        color: theme('colors.secondary'),
      },
      '.bg-brand-accent': {
        backgroundColor: theme('colors.accent'),
      },
      '.text-brand-accent': {
        color: theme('colors.accent'),
      },
      '.bg-surface': {
        backgroundColor: theme('colors.background'),
      },
      '.bg-footer-dark': {
        backgroundColor: theme('colors.footer'),
      },
    }

    addUtilities(newUtilities, ['responsive', 'hover'])
  }
],
```

**Why this is safe:**
We're ADDING new utilities, not removing old ones yet. Both will coexist temporarily.

#### 2.3 Update Component Classes (Incremental Approach)

**Strategy:** Update one component at a time, test, then move to next.

**Migration Mapping:**
- `.bg-primary` → `.bg-brand` (or keep using `.bg-primary` if we keep in colors config)
- `.text-primary` → `.text-brand` (or `.text-primary`)
- `.bg-secondary` → `.bg-brand-secondary` (or `.bg-secondary`)
- `.text-secondary` → `.text-brand-secondary` (or `.text-secondary`)
- `.bg-accent` → `.bg-brand-accent` (or `.bg-accent`)
- `.bg-background` → `.bg-surface` (or `.bg-background`)
- `.bg-footer` → `.bg-footer-dark` (or keep `.bg-footer`)

**IMPORTANT DECISION:**

We have TWO approaches:

**Approach A: Keep existing class names (RECOMMENDED)**
- Keep `primary`, `secondary`, `accent`, `background`, `footer` in colors config
- Existing classes like `bg-primary`, `text-primary` will work automatically via Tailwind
- No component changes needed
- Only remove manual CSS definitions from globals.css

**Approach B: Migrate to semantic names**
- Rename to `brand`, `brand-secondary`, `brand-accent`, etc.
- Requires updating all components
- More work, but more semantic

**RECOMMENDATION: Use Approach A for Phase 2**

This minimizes risk and component changes. Semantic renaming can be Phase 5 if desired.

#### 2.4 Remove Manual CSS Classes (Approach A)

**Action:**
Edit `/Users/michaelevans/karunagatton/src/app/globals.css`

**Delete lines 226-249:**
```css
/* DELETE THESE LINES */
.bg-primary { background-color: var(--primary); }
.text-primary { color: var(--primary); }
.bg-secondary { background-color: var(--secondary); }
.text-secondary { color: var(--secondary); }
.bg-accent { background-color: var(--accent); }
.text-accent { color: var(--accent); }
.bg-background { background-color: var(--background); }
.bg-white { background-color: #fff !important; }
.font-light { font-weight: 300; }
.font-medium { font-weight: 500; }
.font-heading {
  font-family: var(--font-heading);
  font-display: swap;
}
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
/* ... all manual utility classes */
```

**Keep:**
- Complex component classes like `.sun-spot`, `.animate-gradient`
- Custom animations
- Base styles (html, body, :root)

**Why this is safe:**
Since `primary`, `secondary`, etc. are defined in `tailwind.config.ts` colors, Tailwind will automatically generate:
- `.bg-primary`, `.text-primary`, `.border-primary`
- `.bg-secondary`, `.text-secondary`, etc.
- All with proper hover:, responsive:, etc. variants
- Properly purged and optimized

**Also delete:**
Lines 239-249 (Tailwind utility duplicates):
```css
/* DELETE - Tailwind already provides these */
.font-light { font-weight: 300; }
.font-medium { font-weight: 500; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
```

**Keep the custom .font-heading class** (lines 241-244) as it has specific font-display:
```css
/* KEEP THIS - Custom font configuration */
.font-heading {
  font-family: var(--font-heading);
  font-display: swap;
}
```

Actually, even this can be removed if we ensure `font-heading` in tailwind.config.ts is properly configured. But let's keep it for safety in Phase 2.

#### 2.5 Update .bg-footer Special Case

**Current Issue:**
`globals.css` line 200-202:
```css
.bg-footer {
  background-color: #121826;
}
```

This is manually defined. Since we have `footer: '#121826'` in colors config, Tailwind should auto-generate `bg-footer`.

**Action:**
Delete lines 200-202 from `globals.css`.

**Verification:**
Check that Footer component still has correct background color.

### Implementation Steps

**Step 1: Create backup**
```bash
cp tailwind.config.ts tailwind.config.ts.phase2.backup
cp src/app/globals.css src/app/globals.css.phase2.backup
```

**Step 2: No plugin needed (using Approach A)**

Since we're keeping color names in config, Tailwind auto-generates the utilities.

**Step 3: Remove manual CSS classes**

Edit `/Users/michaelevans/karunagatton/src/app/globals.css`:

Delete lines 200-202 (`.bg-footer`)
Delete lines 226-249 (all manual utility classes)

**Keep:**
- Lines 1-199 (up to footer styles)
- Line 203+ (footer typography, media queries, etc.)
- All complex custom classes (`.sun-spot`, `.animate-gradient`, etc.)

**Step 4: Build and test**
```bash
npm run build
```

If build succeeds, all utilities are being generated correctly by Tailwind.

**Step 5: Visual verification**
```bash
npm run dev
# Check all pages
# Verify colors match exactly
```

**Step 6: Run visual regression**
```bash
npx playwright test
# Should show ZERO differences
```

### Verification Checklist

- [ ] Build succeeds with no errors
- [ ] All color classes work (bg-primary, text-primary, etc.)
- [ ] Footer background color correct (#121826)
- [ ] All text colors correct
- [ ] Hover states work
- [ ] Visual regression tests show ZERO differences
- [ ] globals.css is ~23 lines shorter
- [ ] CSS bundle size same or smaller

### Success Criteria

- [ ] globals.css reduced by ~20-30 lines
- [ ] No manual utility class definitions remain
- [ ] All color utilities generated by Tailwind
- [ ] All pages render identically
- [ ] Build succeeds
- [ ] No console errors

### Rollback Plan

```bash
# If issues found
cp tailwind.config.ts.phase2.backup tailwind.config.ts
cp src/app/globals.css.phase2.backup src/app/globals.css
npm run build
git checkout tailwind.config.ts src/app/globals.css
```

### Commit Strategy

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "refactor(tailwind): remove manual utility classes from globals.css

- Remove manual .bg-primary, .text-primary, etc. definitions
- Remove manual .flex, .font-light, etc. (Tailwind provides these)
- Remove manual .bg-footer definition
- Tailwind auto-generates all utilities from colors config
- Reduces globals.css by ~25 lines
- Improves CSS optimization and purging

ZERO visual changes - utilities now generated by Tailwind instead of manual CSS.
All colors and styles render identically.
Verified with visual regression tests.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 3: Token Migration

### Objective
Replace all hard-coded color values in CSS files with theme token references.

### Duration
**6-8 hours**

### Risk Level
**MEDIUM** - Requires careful color matching and gradient updates

### Files Modified
- `/Users/michaelevans/karunagatton/src/app/globals.css`
- `/Users/michaelevans/karunagatton/tailwind.config.ts`
- Any SVG components with hard-coded fills

### Background

Research identified 20+ instances of hard-coded colors:
- `#4B006E` (primary purple) - 15+ times
- `#6B20A0`, `#7B36A0`, `#35004F` (gradient purples)
- `#F5F3FE` (background)
- `#121826` (footer)
- `rgba(255, 236, 25, X)` (yellow gradients)
- `rgba(250, 204, 21, X)` (amber gradients)

These should reference theme tokens for consistency and maintainability.

### Tasks

#### 3.1 Audit All Hard-Coded Colors

**Action:**
```bash
# Find all hex colors
grep -rn "#[0-9a-fA-F]\{3,6\}" src/app/globals.css > docs/hardcoded-colors.txt

# Find all rgba colors
grep -rn "rgba(" src/app/globals.css >> docs/hardcoded-colors.txt
```

**Create mapping document:**

`docs/color-token-mapping.md`:
```markdown
# Color Token Mapping

## Hard-coded → Token Reference

### Primary Purple
- `#4B006E` → `theme('colors.primary')`
- `var(--primary)` → `theme('colors.primary')`

### Gradient Purples
- `#6B20A0` → `theme('colors.purple.gradient-1')`
- `#7B36A0` → `theme('colors.purple.gradient-2')`
- `#35004F` → `theme('colors.purple.gradient-3')`

### Background
- `#F5F3FE` → `theme('colors.background')`
- `var(--background)` → `theme('colors.background')`

### Footer
- `#121826` → `theme('colors.footer')`

### Yellow/Amber (Sun animations)
- `#ffc107` → `theme('colors.yellow.400')`
- `#ffdd33` → `theme('colors.yellow.500')`
- `#fff176` → `theme('colors.yellow.200')`
- `#fffbe6` → `theme('colors.yellow.50')`
- `#facc15` → `theme('colors.amber.300')`
- `#fef08a` → `theme('colors.amber.200')`
- `#fef9c3` → `theme('colors.amber.50')`
- `#eab308` → `theme('colors.amber.400')`

### RGBA Conversions
- `rgba(75, 0, 110, X)` → `rgb(from theme('colors.primary') r g b / X)`
- OR use Tailwind opacity utilities where possible
```

#### 3.2 Update globals.css Hard-Coded Colors

**File:** `/Users/michaelevans/karunagatton/src/app/globals.css`

**3.2.1 Update :root CSS Variables (Lines 30-34)**

**Current:**
```css
:root {
  --primary: #4B006E;
  --accent: #b2a3c7;
  --secondary: #6d5590;
  --background: #F5F3FE;
  /* ... */
}
```

**Decision:** Keep these as-is for now.

**Why:** Some custom CSS may rely on `var(--primary)`. We can reference these in components that need theme() function, but keep CSS variables for backwards compatibility during migration.

**Alternative (more aggressive):** Remove :root variables entirely and update all `var(--primary)` to direct color values or Tailwind classes. But this is higher risk.

**RECOMMENDATION:** Keep :root variables in Phase 3, remove in optional Phase 5.

**3.2.2 Update HTML/Body Styles (Lines 52-87)**

**Current (Line 53):**
```css
html {
  background-color: var(--primary);
  /* ... */
}
```

**Keep as-is** - Already uses CSS variable.

**Current (Lines 68-69):**
```css
body {
  background-color: #F5F3FE;
  color: #333;
  /* ... */
}
```

**Update to:**
```css
body {
  background-color: var(--background); /* or keep #F5F3FE - it's defined in one place */
  color: #333; /* This is standard text, can keep as-is or add to theme */
  /* ... */
}
```

**3.2.3 Update .animate-gradient (Lines 106-119)**

**Current:**
```css
.animate-gradient {
  background:
    radial-gradient(circle at 25% 30%, #6B20A0, transparent 40%),
    radial-gradient(circle at 75% 60%, #4B006E, transparent 50%),
    radial-gradient(circle at 50% 50%, #35004F, transparent 60%),
    radial-gradient(circle at 80% 20%, #7B36A0, transparent 40%),
    radial-gradient(circle at 20% 70%, #ffc107, transparent 35%),
    radial-gradient(circle at 65% 40%, #ffdd33, transparent 30%),
    radial-gradient(circle at 40% 25%, #fff176, transparent 25%),
    radial-gradient(circle at 85% 80%, #fffbe6, transparent 20%),
    #4B006E;
  /* ... */
}
```

**Challenge:** CSS `theme()` function is not widely supported yet (CSS spec in progress).

**Options:**

**Option A: Use CSS variables (RECOMMENDED)**
```css
.animate-gradient {
  background:
    radial-gradient(circle at 25% 30%, var(--purple-gradient-1), transparent 40%),
    radial-gradient(circle at 75% 60%, var(--primary), transparent 50%),
    radial-gradient(circle at 50% 50%, var(--purple-gradient-3), transparent 60%),
    radial-gradient(circle at 80% 20%, var(--purple-gradient-2), transparent 40%),
    radial-gradient(circle at 20% 70%, var(--yellow-400), transparent 35%),
    radial-gradient(circle at 65% 40%, var(--yellow-500), transparent 30%),
    radial-gradient(circle at 40% 25%, var(--yellow-200), transparent 25%),
    radial-gradient(circle at 85% 80%, var(--yellow-50), transparent 20%),
    var(--primary);
  /* ... */
}
```

Then add to `:root`:
```css
:root {
  --primary: #4B006E;
  --accent: #b2a3c7;
  --secondary: #6d5590;
  --background: #F5F3FE;
  /* Add gradient colors */
  --purple-gradient-1: #6B20A0;
  --purple-gradient-2: #7B36A0;
  --purple-gradient-3: #35004F;
  --yellow-400: #ffc107;
  --yellow-500: #ffdd33;
  --yellow-200: #fff176;
  --yellow-50: #fffbe6;
  /* ... */
}
```

**Option B: Keep as-is (ALSO VALID)**

Since these colors are defined in one place (globals.css), and they're complex gradients, keeping them as hard-coded values is acceptable. The main benefit of tokenization is when values are duplicated across files.

**RECOMMENDATION for Phase 3:** Use Option B (keep as-is). The gradient colors are only used in this one location, so tokenization provides minimal benefit.

**3.2.4 Update .bg-footer (Line 200-202)**

Already removed in Phase 2.

**3.2.5 Update .sun-spot gradient colors**

Search for `.sun-spot` in globals.css (likely around line 260+):

```bash
grep -n "sun-spot" src/app/globals.css
```

Similar to `.animate-gradient`, these complex gradients with rgba values can either:
- Convert to CSS variables (Option A)
- Keep as-is since they're in one location (Option B - RECOMMENDED)

#### 3.3 Update tailwind.config.ts Hero Gradient

**File:** `/Users/michaelevans/karunagatton/tailwind.config.ts`

**Current (Line 86):**
```typescript
'hero-gradient': 'radial-gradient(circle at 30% 40%, #4B006E, transparent 15%), radial-gradient(circle at 70% 30%, #4B006E, transparent 12%), ...'
```

**This is a PERFECT candidate for tokenization.**

**Update to use theme() function:**

```typescript
backgroundImage: {
  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  'hero-gradient': ({ theme }) =>
    `radial-gradient(circle at 30% 40%, ${theme('colors.primary')}, transparent 15%), ` +
    `radial-gradient(circle at 70% 30%, ${theme('colors.primary')}, transparent 12%), ` +
    `radial-gradient(circle at 85% 60%, ${theme('colors.primary')}, transparent 18%), ` +
    `radial-gradient(circle at 25% 30%, ${theme('colors.purple.gradient-1')}, transparent 40%), ` +
    `radial-gradient(circle at 75% 60%, ${theme('colors.primary')}, transparent 50%), ` +
    `radial-gradient(circle at 50% 50%, ${theme('colors.purple.gradient-3')}, transparent 60%), ` +
    `radial-gradient(circle at 80% 20%, ${theme('colors.purple.gradient-2')}, transparent 40%), ` +
    `radial-gradient(circle at 15% 20%, ${theme('colors.amber.400')}, transparent 10%), ` +
    `radial-gradient(circle at 90% 80%, ${theme('colors.amber.400')}, transparent 8%), ` +
    `radial-gradient(circle at 20% 80%, ${theme('colors.amber.300')}, transparent 35%), ` +
    `radial-gradient(circle at 65% 40%, ${theme('colors.amber.300')}, transparent 25%), ` +
    `radial-gradient(circle at 40% 25%, ${theme('colors.amber.200')}, transparent 25%), ` +
    `radial-gradient(circle at 85% 80%, ${theme('colors.amber.50')}, transparent 20%), ` +
    `${theme('colors.primary')}`,
}
```

**Why this is better:**
- Single source of truth for colors
- If we change `primary` color, hero gradient updates automatically
- More maintainable

**NOTE:** Must ensure `purple.gradient-1`, etc. are defined in colors (added in Phase 1).

#### 3.4 Update SVG Fill Colors (if any)

Search for SVG components with hard-coded fills:

```bash
grep -rn 'fill="#' src/components/
```

If found, update to use Tailwind class utilities:
- `fill="#4B006E"` → `className="fill-primary"`
- `fill="#f9fafb"` → `className="fill-gray-50"`

### Implementation Steps

**Step 1: Create backup**
```bash
cp tailwind.config.ts tailwind.config.ts.phase3.backup
cp src/app/globals.css src/app/globals.css.phase3.backup
```

**Step 2: Add gradient color tokens to Phase 1 colors**

Ensure `tailwind.config.ts` has:
```typescript
colors: {
  // ... existing colors ...
  purple: {
    // ... existing purple scale ...
    'gradient-1': '#6B20A0',
    'gradient-2': '#7B36A0',
    'gradient-3': '#35004F',
  },
}
```

**Step 3: Update hero-gradient in tailwind.config.ts**

Replace line 86 with the tokenized version (see 3.3 above).

**Step 4: Update body background in globals.css**

Line 69: Change `#F5F3FE` to `var(--background)` if desired.

**Step 5: Leave complex gradients as-is**

`.animate-gradient` and `.sun-spot` can stay with hard-coded values (single location, complex).

**Step 6: Build and test**
```bash
npm run build
npm run dev
```

**Step 7: Visual verification**

Critical: Check hero gradient renders EXACTLY the same:
- Homepage hero section
- Color intensity matches
- Gradient positions match

```bash
npx playwright test
# Focus on homepage hero section
```

### Verification Checklist

- [ ] Build succeeds
- [ ] Hero gradient colors match exactly
- [ ] No color shifts or visual differences
- [ ] All gradients render correctly
- [ ] Background colors unchanged
- [ ] Footer color unchanged
- [ ] Visual regression tests pass
- [ ] No console errors

### Success Criteria

- [ ] hero-gradient uses theme() references
- [ ] Gradient color tokens defined in config
- [ ] All colors render identically
- [ ] Single source of truth for brand colors
- [ ] Build succeeds

### Rollback Plan

```bash
cp tailwind.config.ts.phase3.backup tailwind.config.ts
cp src/app/globals.css.phase3.backup src/app/globals.css
npm run build
git checkout tailwind.config.ts src/app/globals.css
```

### Commit Strategy

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "refactor(tailwind): migrate hard-coded colors to theme tokens

- Add gradient color tokens (purple.gradient-1/2/3)
- Update hero-gradient to use theme() function
- Convert hard-coded gradient colors to token references
- Improves maintainability and single source of truth

ZERO visual changes - all colors render identically.
Gradients use exact same hex values via theme tokens.
Verified with visual regression tests.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 4: Component Extraction (Optional)

### Objective
Extract repeated component patterns into reusable components with proper TypeScript types and variants.

### Duration
**12-20 hours**

### Risk Level
**LOW-MEDIUM** - Improves maintainability, requires refactoring many files

### Files Created
- `/Users/michaelevans/karunagatton/src/components/ui/Button.tsx`
- `/Users/michaelevans/karunagatton/src/components/ui/Heading.tsx`
- `/Users/michaelevans/karunagatton/src/components/ui/Card.tsx`
- `/Users/michaelevans/karunagatton/src/components/ui/Section.tsx`

### Files Modified
- All page files (`src/app/**/*.tsx`)
- Some existing components

### Dependencies
- Optional: Install `class-variance-authority` for variant management
- Optional: Install `clsx` for className merging

```bash
npm install class-variance-authority clsx
```

### Background

Research identified repeated patterns:
- **Button pattern** - Used 10+ times with same className combination
- **Heading pattern** - Used 15+ times with consistent text-3xl md:text-4xl structure
- **Card pattern** - Used for testimonials, offerings, etc.
- **Section wrapper** - Consistent py-20 py-24 spacing

### Tasks

#### 4.1 Install Dependencies (Optional but Recommended)

```bash
npm install class-variance-authority clsx
```

Create utility function:

`src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwindcss/lib/util/twMerge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### 4.2 Create Button Component

**File:** `/Users/michaelevans/karunagatton/src/components/ui/Button.tsx`

**Research finding:** This pattern appears 10+ times:
```tsx
<Link
  href="/offerings"
  className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-white rounded-full backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition duration-300"
>
  View Offerings
</Link>
```

**Create reusable Button component:**

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        ghost: "bg-transparent backdrop-blur-sm border text-white hover:bg-white/10",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
      },
      border: {
        default: "border-white",
        primary: "border-primary",
        none: "border-transparent",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      border: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, border, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : href ? "a" : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, border, className }))}
        ref={ref}
        {...(href && { href })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Usage migration:**

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
import { Button } from "@/components/ui/Button"
import Link from "next/link"

<Button variant="ghost" asChild>
  <Link href="/offerings">View Offerings</Link>
</Button>
```

**Backward Compatibility:**
Old pattern will still work during migration. Update incrementally.

#### 4.3 Create Heading Component

**File:** `/Users/michaelevans/karunagatton/src/components/ui/Heading.tsx`

**Research finding:** This pattern appears 15+ times:
```tsx
<h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">
  Section Title
</h2>
```

**Create reusable Heading component:**

```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  align?: "left" | "center" | "right"
  weight?: "light" | "medium" | "normal" | "semibold"
  color?: "primary" | "secondary" | "white" | "inherit"
  fadeIn?: boolean
}

const headingSizes = {
  1: "text-5xl md:text-7xl lg:text-8xl",
  2: "text-3xl md:text-4xl",
  3: "text-2xl md:text-3xl",
  4: "text-xl md:text-2xl",
  5: "text-lg md:text-xl",
  6: "text-base md:text-lg",
} as const

const headingWeights = {
  light: "font-light",
  medium: "font-medium",
  normal: "font-normal",
  semibold: "font-semibold",
} as const

const headingColors = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  inherit: "text-inherit",
} as const

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      align = "left",
      weight = "light",
      color = "primary",
      fadeIn = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return (
      <Tag
        ref={ref}
        className={cn(
          "font-heading tracking-wider",
          headingSizes[level],
          headingWeights[weight],
          headingColors[color],
          align === "center" && "text-center",
          align === "right" && "text-right",
          fadeIn && "fade-in-section",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
Heading.displayName = "Heading"

export { Heading }
```

**Usage migration:**

**Before:**
```tsx
<h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">
  My Services
</h2>
```

**After:**
```tsx
import { Heading } from "@/components/ui/Heading"

<Heading level={2} align="center" fadeIn className="mb-16">
  My Services
</Heading>
```

#### 4.4 Create Card Component

**File:** `/Users/michaelevans/karunagatton/src/components/ui/Card.tsx`

**Research finding:**
```tsx
<div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
```

**Create reusable Card component:**

```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "tinted" | "ghost"
  padding?: "none" | "sm" | "md" | "lg"
  alignment?: "left" | "center"
}

const cardVariants = {
  default: "bg-white shadow-sm",
  elevated: "bg-white shadow-md hover:shadow-lg hover:scale-[1.02]",
  tinted: "bg-gray-50 shadow-sm",
  ghost: "bg-transparent",
} as const

const cardPadding = {
  none: "",
  sm: "p-4",
  md: "p-8",
  lg: "p-12",
} as const

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      alignment = "left",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg transition-all duration-300",
          cardVariants[variant],
          cardPadding[padding],
          alignment === "center" && "text-center flex flex-col items-center",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-medium text-primary font-heading", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
```

**Usage migration:**

**Before:**
```tsx
<div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
  <h3 className="text-xl font-medium text-primary mb-4">Offering Title</h3>
  <p>Description...</p>
</div>
```

**After:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"

<Card variant="default" padding="md" alignment="center">
  <CardHeader>
    <CardTitle>Offering Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Description...</p>
  </CardContent>
</Card>
```

#### 4.5 Create Section Component

**File:** `/Users/michaelevans/karunagatton/src/components/ui/Section.tsx`

**Research finding:** Consistent `py-20 py-24` section padding.

```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  background?: "default" | "primary" | "background" | "white"
}

const sectionSpacing = {
  none: "",
  sm: "py-12",
  md: "py-20",
  lg: "py-24",
  xl: "py-32",
} as const

const sectionBackground = {
  default: "",
  primary: "bg-primary",
  background: "bg-background",
  white: "bg-white",
} as const

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      container = true,
      spacing = "md",
      background = "default",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          sectionSpacing[spacing],
          sectionBackground[background],
          className
        )}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4 md:px-6">{children}</div>
        ) : (
          children
        )}
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }
```

**Usage migration:**

**Before:**
```tsx
<section className="py-20 bg-background">
  <div className="container mx-auto px-4 md:px-6">
    {/* content */}
  </div>
</section>
```

**After:**
```tsx
import { Section } from "@/components/ui/Section"

<Section spacing="md" background="background">
  {/* content */}
</Section>
```

### Implementation Steps

This phase is OPTIONAL and can be done gradually.

**Step 1: Install dependencies**
```bash
npm install class-variance-authority clsx
```

**Step 2: Create ui components directory**
```bash
mkdir -p src/components/ui
```

**Step 3: Create components one at a time**

Start with Button (most reused):
1. Create `Button.tsx`
2. Update one page to use it
3. Test that page
4. Update remaining pages incrementally

**Step 4: Repeat for Heading, Card, Section**

**Step 5: Update components gradually**

Don't update all at once. Update per page:
```bash
# Update homepage
git add src/app/page.tsx src/components/ui/Button.tsx
git commit -m "refactor: use Button component on homepage"

# Update about page
git add src/app/about/page.tsx
git commit -m "refactor: use Button component on about page"

# etc.
```

### Verification Checklist

Per component extracted:
- [ ] Component renders identically to old pattern
- [ ] Props work correctly
- [ ] TypeScript types are correct
- [ ] Variants produce expected classes
- [ ] Responsive behavior maintained
- [ ] Hover states work
- [ ] Focus states work (accessibility)
- [ ] Visual regression tests pass

### Success Criteria

- [ ] Reusable component library created
- [ ] Less duplication in page files
- [ ] Improved maintainability
- [ ] Type-safe component APIs
- [ ] All pages render identically
- [ ] No functionality lost

### Rollback Plan

Per component:
```bash
# Remove component and revert pages
git revert <commit-hash>
# OR manually revert the page changes
```

Since this is done incrementally, rollback is per-page.

### Commit Strategy

Per component:
```bash
git add src/components/ui/Button.tsx
git commit -m "feat(ui): create reusable Button component

- Add Button component with ghost, primary, outline variants
- Support for sizes (sm, md, lg)
- Type-safe props with VariantProps
- Backward compatible during migration

No visual changes - component produces identical output to manual classes.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Rollback Procedures

### Emergency Rollback (Any Phase)

If at any point something goes wrong:

**Immediate rollback:**
```bash
# Stop dev server
# Restore from backup
cp .backups/tailwind.config.ts.backup tailwind.config.ts
cp .backups/globals.css.backup src/app/globals.css
npm run build
npm run dev
```

**Rollback to last commit:**
```bash
git reset --hard HEAD~1
npm install
npm run build
```

**Rollback to baseline:**
```bash
git reset --hard pre-refactor-baseline
npm install
npm run build
```

### Phase-Specific Rollback

**Phase 1:**
```bash
cp tailwind.config.ts.phase1.backup tailwind.config.ts
npm run build
```

**Phase 2:**
```bash
cp tailwind.config.ts.phase2.backup tailwind.config.ts
cp src/app/globals.css.phase2.backup src/app/globals.css
npm run build
```

**Phase 3:**
```bash
cp tailwind.config.ts.phase3.backup tailwind.config.ts
cp src/app/globals.css.phase3.backup src/app/globals.css
npm run build
```

**Phase 4:**
Since it's incremental, rollback per component:
```bash
git revert <commit-hash-for-component>
```

---

## Success Metrics

### Quantitative Metrics

**Build Metrics:**
- CSS bundle size: Should decrease by 5-15%
- Build time: Should remain same or improve
- Number of generated classes: Should decrease

**Performance Metrics:**
- Lighthouse Performance: Must maintain 90+ score
- FCP: Must remain under 1.5s
- LCP: Must remain under 2.5s
- TBT: Must remain under 300ms

**Code Metrics:**
- globals.css lines: Should decrease by ~50 lines
- tailwind.config.ts lines: May increase by ~20-30 (from complete color scales)
- Component className length: Should decrease (if Phase 4 completed)
- Code duplication: Should decrease

### Qualitative Metrics

**Developer Experience:**
- Easier to understand color system
- Faster to add new components
- Better IntelliSense for colors
- Clearer component patterns

**Maintainability:**
- Single source of truth for colors
- Consistent spacing patterns
- Reusable component library
- Better TypeScript support

### Before/After Comparison

Create `/Users/michaelevans/karunagatton/docs/refactoring-results.md` after completion:

```markdown
# Refactoring Results

## Metrics Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| CSS Bundle Size | X KB | Y KB | -Z% |
| tailwind.config.ts lines | 111 | ? | ? |
| globals.css lines | 484 | ? | ? |
| Color definitions | 3 files | 1 file | ✅ |
| Manual utilities | 23 | 0 | ✅ |
| Lighthouse Performance | X | Y | ✓ |

## Improvements

- [ ] Removed duplicate configuration values
- [ ] Consolidated color definitions to single source
- [ ] Removed manual utility classes
- [ ] Migrated hard-coded colors to tokens
- [ ] Created reusable component library (if Phase 4)

## Visual Regression

- All pages: PASS ✅
- All breakpoints: PASS ✅
- All animations: PASS ✅

## Performance

- Lighthouse scores maintained ✅
- Build time unchanged or improved ✅
- Bundle size maintained or reduced ✅
```

---

## Testing Strategy per Phase

### Visual Regression Testing

**After each phase:**
```bash
# Build and start
npm run build
npm run start

# Run Playwright tests
npx playwright test

# Compare screenshots
# Should show ZERO differences
```

**Manual testing checklist:**
- [ ] Homepage hero gradient renders correctly
- [ ] All section headings have correct colors
- [ ] Footer background correct (#121826)
- [ ] Button hover states work
- [ ] Mobile menu animations work
- [ ] Sun animations work
- [ ] All text colors correct
- [ ] All background colors correct
- [ ] Responsive breakpoints work (375px, 768px, 1280px, 1920px)

### Performance Testing

**After each phase:**
```bash
npm run build
npm run start
# Open Chrome DevTools
# Run Lighthouse audit 3 times
# Average the scores
# Compare to baseline
```

**Acceptable variance:** ±1 point on any metric

### Browser Testing

**Test in:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Critical pages:**
- Homepage (/)
- Offerings (/offerings)
- About (/about)

---

## Risk Mitigation Strategies

### Strategy 1: Incremental Changes

Never change multiple things at once. Each phase is independent and testable.

### Strategy 2: Backup Everything

Before each phase, create backups. Keep them until project is complete.

### Strategy 3: Visual Regression Tests

Automated screenshot comparison catches any visual changes immediately.

### Strategy 4: Git Discipline

- Commit after each successful phase
- Tag important milestones
- Keep commits atomic and reversible
- Never force-push

### Strategy 5: Build Verification

Always run `npm run build` before committing. Catch errors early.

### Strategy 6: Documentation

Document every change. If rollback is needed, documentation guides the process.

### Strategy 7: Stakeholder Checkpoints

After each phase, share results with team:
- Show before/after screenshots (should be identical)
- Share performance metrics
- Get approval before next phase

---

## Phase Sequencing & Dependencies

```
Pre-Implementation (Required)
    ↓
Phase 1: Configuration Cleanup (Required)
    ↓
Phase 2: CSS Consolidation (Required)
    ↓
Phase 3: Token Migration (Recommended)
    ↓
Phase 4: Component Extraction (Optional)
```

**Can skip:** Phase 4 is entirely optional.

**Cannot skip:** Phases 1-2 build on each other.

**Recommended order:** Complete 1-3 for best results.

---

## Time Estimates by Role

### Solo Developer
- Pre-Implementation: 3-4 hours
- Phase 1: 2-3 hours
- Phase 2: 4-6 hours
- Phase 3: 6-8 hours
- Phase 4 (optional): 12-20 hours
- **Total (Phases 1-3): 15-21 hours**
- **Total (All phases): 27-41 hours**

### Team (2-3 developers)
- Pre-Implementation: 2-3 hours (setup together)
- Phase 1: 1-2 hours
- Phase 2: 2-3 hours
- Phase 3: 3-4 hours
- Phase 4 (parallel work): 6-10 hours
- **Total (Phases 1-3): 8-12 hours**
- **Total (All phases): 14-22 hours**

---

## Automated Testing Recommendations

### Playwright Visual Regression (Implemented in Pre-Implementation)

See Pre-Implementation Phase for setup.

**Run tests:**
```bash
npx playwright test
```

**Update baselines (when changes are intentional):**
```bash
npx playwright test --update-snapshots
```

### Jest Unit Tests (Optional)

If creating components in Phase 4:

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

Create `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

Test components:
```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct variant classes', () => {
    render(<Button variant="ghost">Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toHaveClass('bg-transparent')
  })
})
```

---

## Browser Testing Requirements

### Critical Browsers
- Chrome 85+ (primary)
- Safari 14+ (iOS compatibility)
- Firefox 79+
- Edge 85+

### Test Matrix

| Page | Chrome | Safari | Firefox | Edge | Mobile |
|------|--------|--------|---------|------|--------|
| Homepage | ✓ | ✓ | ✓ | ✓ | ✓ |
| Offerings | ✓ | ✓ | ✓ | ✓ | ✓ |
| About | ✓ | ✓ | - | - | ✓ |
| Drum Circle | ✓ | - | - | - | ✓ |
| Get in Touch | ✓ | ✓ | - | - | ✓ |

### Focus Areas per Browser

**Safari:**
- Gradient rendering (hero section)
- backdrop-filter support
- Animation performance

**Firefox:**
- Color accuracy
- Custom properties
- Animation smoothness

**Edge:**
- Same as Chrome (Chromium-based)

**Mobile:**
- Touch interactions
- Viewport units
- Performance

---

## Final Checklist

### Pre-Implementation
- [ ] Feature branch created
- [ ] Baseline screenshots captured
- [ ] Metrics documented
- [ ] Visual regression tests set up
- [ ] Backups created
- [ ] Team aligned on plan

### Phase 1
- [ ] Duplicate configs removed
- [ ] Complete color scales added
- [ ] Build succeeds
- [ ] Visual tests pass
- [ ] Changes committed

### Phase 2
- [ ] Manual CSS utilities removed
- [ ] Tailwind auto-generates utilities
- [ ] Build succeeds
- [ ] Visual tests pass
- [ ] Changes committed

### Phase 3
- [ ] Hard-coded colors migrated
- [ ] Hero gradient uses theme()
- [ ] Build succeeds
- [ ] Visual tests pass
- [ ] Changes committed

### Phase 4 (Optional)
- [ ] Component library created
- [ ] Pages migrated incrementally
- [ ] TypeScript types correct
- [ ] Visual tests pass
- [ ] Changes committed

### Completion
- [ ] All phases completed successfully
- [ ] Final metrics documented
- [ ] Performance validated
- [ ] Pull request created
- [ ] Code review completed
- [ ] Merged to main

---

## Questions & Support

### Common Issues

**Q: Build fails after removing fontSize definitions**
A: Check that you removed the entire fontSize object, not individual keys. Tailwind defaults will take over.

**Q: Colors look different after Phase 2**
A: Ensure `colors` in tailwind.config.ts exactly match the CSS variables in :root. Use browser DevTools to inspect computed colors.

**Q: Visual regression tests show differences**
A: Inspect the specific differences. Minor anti-aliasing differences (<1px) are acceptable. Actual color/layout changes indicate a problem.

**Q: Build size increased**
A: Check that purging is enabled. Ensure no unnecessary safelist entries. May need to run production build for accurate measurement.

### Getting Help

If issues arise:
1. Check rollback procedures in this document
2. Review specific phase's verification checklist
3. Compare with backup files
4. Check git diff to see exact changes
5. Run build with verbose output: `npm run build -- --debug`

---

## Appendix A: File Structure

After all phases, expected structure:

```
/Users/michaelevans/karunagatton/
├── docs/
│   ├── tailwind-tokenization-research.md (existing)
│   ├── tailwind-refactoring-implementation-plan.md (this file)
│   ├── metrics-baseline.md (created in pre-implementation)
│   ├── refactoring-results.md (created after completion)
│   ├── custom-class-audit.md (created in phase 2)
│   ├── screenshots/
│   │   ├── before/ (baseline screenshots)
│   │   └── after/ (final screenshots)
├── src/
│   ├── app/
│   │   ├── globals.css (modified phases 2-3)
│   │   └── ...
│   ├── components/
│   │   ├── ui/ (created in phase 4)
│   │   │   ├── Button.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Section.tsx
│   │   └── ...
│   └── lib/
│       └── utils.ts (created in phase 4)
├── tests/
│   ├── visual-regression.spec.ts (created in pre-implementation)
│   └── __screenshots__/ (baseline images)
├── tailwind.config.ts (modified phases 1-3)
├── playwright.config.ts (created in pre-implementation)
└── .backups/ (created in pre-implementation)
    ├── tailwind.config.ts.backup
    └── globals.css.backup
```

---

## Appendix B: Color Token Reference

Complete color token structure after Phase 1:

```typescript
colors: {
  // Semantic brand colors
  primary: '#4B006E',
  secondary: '#6d5590',
  accent: '#b2a3c7',
  background: '#F5F3FE',
  white: '#fff',
  footer: '#121826',

  // Complete purple scale
  purple: {
    50: '#f5f3ff',
    100: '#ede9ff',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    'brand': '#4B006E',
    'brand-light': '#6d5590',
    'brand-lighter': '#b2a3c7',
    'gradient-1': '#6B20A0',
    'gradient-2': '#7B36A0',
    'gradient-3': '#35004F',
  },

  // Complete yellow scale
  yellow: {
    50: '#fffbe6',
    100: '#fff9c3',
    200: '#fff176',
    300: '#ffed4e',
    400: '#ffc107',
    500: '#ffdd33',
    600: '#f59e0b',
    700: '#d97706',
    800: '#b45309',
    900: '#92400e',
  },

  // Complete amber scale
  amber: {
    50: '#fef9c3',
    100: '#fef3c7',
    200: '#fef08a',
    300: '#facc15',
    400: '#eab308',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
}
```

**Usage:**
- `text-primary` - Main brand purple text
- `bg-purple-50` - Lightest purple background
- `text-purple-gradient-1` - Gradient accent color
- `bg-amber-400` - Sun glow yellow
- etc.

---

## Appendix C: Performance Budget

Maintain these performance targets throughout refactoring:

| Metric | Target | Max Acceptable |
|--------|--------|----------------|
| FCP (First Contentful Paint) | < 1.2s | < 1.5s |
| LCP (Largest Contentful Paint) | < 2.0s | < 2.5s |
| TBT (Total Blocking Time) | < 200ms | < 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.1 |
| CSS Bundle Size | < 50KB | < 60KB |
| JS Bundle Size | < 300KB | < 350KB |
| Lighthouse Performance | > 95 | > 90 |

**How to measure:**
```bash
npm run build
npm run start
# Chrome DevTools → Lighthouse → Run audit
```

If any metric exceeds "Max Acceptable", rollback and investigate.

---

**End of Implementation Plan**

This plan provides step-by-step instructions for safe, zero-risk refactoring of the Tailwind CSS setup. Follow phases sequentially, test thoroughly, and maintain performance throughout.

For questions or clarifications, refer to specific sections by heading.
