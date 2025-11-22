# Tailwind CSS Tokenization & Best Practices Research

**Project:** Karuna Gatton Website
**Date:** 2025-11-22
**Status:** Research Complete - Ready for Implementation

---

## Executive Summary

This Next.js project demonstrates a **performance-focused approach** with **mixed implementation patterns** that could benefit from systematic tokenization and refactoring. The codebase shows good fundamentals but has opportunities for improved consistency, maintainability, and scalability through better design token organization.

**Key Findings:**
- ✅ Strong performance optimizations (critical CSS, GPU hints)
- ✅ Consistent responsive design patterns
- ⚠️ Color tokens scattered across 3 files (config, CSS files)
- ⚠️ Manual recreation of Tailwind utilities in CSS
- ⚠️ 20+ instances of hard-coded color values
- ⚠️ Duplicate configurations in `tailwind.config.ts`

---

## Table of Contents

1. [Current Tailwind Configuration Analysis](#1-current-tailwind-configuration-analysis)
2. [CSS File Analysis](#2-css-file-analysis)
3. [Component Usage Patterns](#3-component-usage-patterns)
4. [Hard-Coded Values Audit](#4-hard-coded-values-audit)
5. [Best Practices Research Summary](#5-best-practices-research-summary)
6. [What's Being Done Well](#6-whats-being-done-well)
7. [What Needs Refactoring](#7-what-needs-refactoring)
8. [Specific Examples of Patterns to Improve](#8-specific-examples-of-patterns-to-improve)
9. [Recommended Token Structure](#9-recommended-token-structure-for-this-project)
10. [Migration Strategy](#10-migration-strategy-recommendations)
11. [Quick Wins](#11-quick-wins-immediate-actions)
12. [Conclusion](#12-conclusion)

---

## 1. Current Tailwind Configuration Analysis

### File: `/tailwind.config.ts`

**Strengths:**
- TypeScript configuration with proper typing
- Extends default theme rather than replacing it
- Custom font variables properly configured
- Future-focused feature flags (`hoverOnlyWhenSupported`)
- Proper content paths for purging

### Issues Identified

#### 1.1 Color Token Organization

**Current Implementation:**
```typescript
colors: {
  primary: '#4B006E',
  secondary: '#6d5590',
  accent: '#b2a3c7',
  background: '#F5F3FE',
  white: '#fff',
  footer: '#121826',
  'gray-800': '#1f2937',  // Duplicates Tailwind defaults
  'gray-700': '#374151',
  // ... more grays
  'purple-50': '#f5f3ff',
  'yellow-400': '#ffc107',
  'amber-200': '#fef08a',
  // ... inconsistent color scales
}
```

**Problems:**
- Mixing semantic names (`primary`, `footer`) with utility names (`gray-800`)
- Overriding Tailwind's default gray scale unnecessarily
- Incomplete color scales (purple only has 50-300, no 400-900)
- Yellow/amber colors appear to be hard-coded from designs

**Best Practice Recommendation:**
```typescript
colors: {
  // Semantic tokens (references to base colors)
  brand: {
    primary: '#4B006E',
    secondary: '#6d5590',
    accent: '#b2a3c7',
  },
  surface: {
    background: '#F5F3FE',
    footer: '#121826',
  },
  // Complete custom color scales
  purple: {
    50: '#f5f3ff',
    100: '#ede9ff',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#4B006E', // Primary
    600: '#3d0059',
    700: '#2f0044',
    800: '#21002f',
    900: '#13001a',
  },
  // Don't override default grays unless necessary
}
```

#### 1.2 Font Size Configuration

**Current Implementation:**
```typescript
fontSize: {
  'xl': '1.25rem',    // Duplicates default
  '2xl': '1.5rem',    // Duplicates default
  '3xl': '1.875rem',  // Duplicates default
  '4xl': '2.25rem',   // Duplicates default
  '5xl': '3rem',      // Duplicates default
  '7xl': '4.5rem',    // Duplicates default
  '8xl': '6rem',      // Duplicates default
}
```

**Problems:**
- All values duplicate Tailwind defaults - unnecessary configuration
- Missing custom values if needed
- No line-height definitions paired with sizes

**Recommendation:** Remove this section entirely unless you need custom sizes.

#### 1.3 Spacing Configuration

**Current Implementation:**
```typescript
spacing: {
  '3': '0.75rem',   // Duplicates default
  '4': '1rem',      // Duplicates default
  // ... all duplicates
  'h-800': '800px', // ❌ Wrong - arbitrary naming
  'w-600': '600px', // ❌ Wrong - arbitrary naming
}
```

**Problems:**
- All default spacing values are duplicated unnecessarily
- Non-standard naming (`h-800`, `w-600`) breaks Tailwind conventions
- Mixing spacing with width/height creates confusion

**Recommendation:**
```typescript
spacing: {
  // Only add truly custom values
  'page-gutter': '1rem',
  'section': '5rem',
},
// Use extend.width and extend.height for size-specific values
```

#### 1.4 Custom Gradients - Good Implementation ✅

**Current Implementation:**
```typescript
backgroundImage: {
  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  'hero-gradient': 'radial-gradient(circle at 30% 40%, #4B006E, transparent 15%), ...',
}
```

**Strengths:**
- Named semantic gradients
- Reusable patterns
- Performance-conscious (uses CSS variables)

**Issue:** The `hero-gradient` has hard-coded colors that should reference theme colors.

---

## 2. CSS File Analysis

### 2.1 File: `/src/app/globals.css`

**Structure:**
- 484 lines of custom CSS
- Mix of utility classes, custom components, and animations
- Performance optimizations for mobile
- Heavy use of CSS custom properties

### Key Patterns

#### Pattern 1: CSS Custom Properties (Good!) ✅

```css
:root {
  --primary: #4B006E;
  --accent: #b2a3c7;
  --secondary: #6d5590;
  --background: #F5F3FE;
  --font-heading: var(--font-unbounded), 'Unbounded Fallback', ...;
  --font-body: var(--font-eb-garamond), 'EB Garamond Fallback', ...;
}
```

**Strength:** Centralized token management
**Issue:** Duplicates values from `tailwind.config.ts` - creates single source of truth problem

#### Pattern 2: Custom Utility Classes (Anti-pattern) ⚠️

```css
/* Lines 226-257 - Recreating Tailwind utilities */
.bg-primary { background-color: var(--primary); }
.text-primary { color: var(--primary); }
.bg-secondary { background-color: var(--secondary); }
.font-light { font-weight: 300; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
/* ... etc */
```

**Problems:**
- Recreates Tailwind utilities manually
- Creates maintenance burden
- Inconsistent with Tailwind philosophy
- These should be configured in `tailwind.config.ts` instead

#### Pattern 3: Complex Animation Classes (Good!) ✅

```css
.sun-spot {
  position: absolute;
  width: 743px;
  height: 743px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255, 236, 25, 1) 0%,
    /* ... complex gradient */
  );
  /* Performance optimizations */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  will-change: auto;
}
```

**Strengths:**
- Component-specific styling
- Performance-conscious
- Good use case for custom CSS (complex animations)

**Issues:**
- Hard-coded rgba values should reference theme
- Multiple position variants (.sun-spot-home, .sun-spot-footer) could use CSS variables

#### Pattern 4: Hard-Coded Color Values ⚠️

Found throughout the file:

```css
/* Lines 108-116 */
background:
  radial-gradient(circle at 25% 30%, #6B20A0, transparent 40%),
  radial-gradient(circle at 75% 60%, #4B006E, transparent 50%),
  /* ... more hard-coded colors */

/* Line 69 */
background-color: #F5F3FE;
color: #333;

/* Line 201 */
background-color: #121826;
```

**Problem:** 20+ instances of hard-coded hex/rgba colors that should be tokens.

### 2.2 File: `/src/app/critical.css`

**Purpose:** Inline critical CSS for performance (99 lines)
**Assessment:** Well-executed performance optimization ✅

**Issue:** Duplicates values from `globals.css` and `tailwind.config.ts`

---

## 3. Component Usage Patterns

### 3.1 Utility Class Usage (Excellent) ✅

Components use Tailwind utilities extensively:

```tsx
// src/app/page.tsx
<h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wider mb-4 leading-tight font-heading">
```

**Strengths:**
- Responsive utilities (`md:`, `lg:`)
- Good semantic class ordering
- Utility-first approach

### Issues Found

#### Issue 1: Inline Hard-Coded Values ⚠️

```tsx
// src/app/page.tsx:192
<Link
  href="/offerings"
  className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-white rounded-full backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition duration-300"
>
```

**Problem:** `bg-opacity-10`, `px-6 py-3` - repeated pattern across multiple components

**Better Approach:** Extract to reusable component or apply directive:
```typescript
// components/Button.tsx
const buttonVariants = {
  ghost: "bg-transparent hover:bg-white hover:bg-opacity-10 border border-white",
  primary: "bg-primary hover:bg-primary/90 text-white",
}
```

#### Issue 2: Repeated Utility Combinations ⚠️

```tsx
// Appears 10+ times across components
className="text-3xl md:text-4xl text-center font-light text-primary mb-16 font-heading"
className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-8"
```

**Recommendation:** Create semantic components or @apply classes for repeated patterns.

#### Issue 3: Custom Style Props Mixed with Tailwind ✅

```tsx
// src/app/page.tsx:170-175
<div
  className="relative z-20 text-left pb-32 container mx-auto px-2 md:px-4"
  style={{
    contain: 'layout',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform'
  }}
>
```

**Assessment:** This is actually appropriate - performance optimizations that don't belong in Tailwind.

### 3.2 Custom Color Classes Usage

Used extensively across all pages:

```tsx
<section className="bg-primary">
<h2 className="text-primary">
<div className="bg-background">
<footer className="bg-footer">
```

**Problem:** These custom classes work because they're defined in `globals.css`, but they're not in `tailwind.config.ts`, so they bypass Tailwind's purging/optimization.

---

## 4. Hard-Coded Values Audit

### Color Values Found:
- `#4B006E` - Primary purple (appears 15+ times)
- `#6d5590` - Secondary purple
- `#b2a3c7` - Accent purple
- `#F5F3FE` - Background color
- `#121826` - Footer background
- `#f9fafb` - SVG fills (gray-50)
- `#f5f3ff` - SVG fills (purple-50)
- `#333` - Text color
- `#fff` - White
- `rgba(75, 0, 110, X)` - Primary with various opacities
- `rgba(255, 236, 25, X)` - Yellow gradients
- `rgba(250, 204, 21, X)` - Amber gradients

### Spacing Patterns:
- `py-20`, `py-24` - Section padding (consistent, good) ✅
- `px-4`, `px-6`, `px-8` - Horizontal padding (standard) ✅
- `mb-8`, `mb-16`, `mb-6` - Bottom margins (could be more systematic)
- `max-w-4xl`, `max-w-5xl`, `max-w-6xl` - Container sizes (good pattern) ✅

### Typography Patterns:
- `text-3xl md:text-4xl` - Section headings ✅
- `text-5xl md:text-7xl lg:text-8xl` - Hero headings ✅
- `text-lg md:text-xl` - Body text ✅
- `font-light`, `font-medium` - Consistent weight usage ✅

---

## 5. Best Practices Research Summary

### 5.1 Design Token Organization

**Recommended Structure:**
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      // Primitive tokens (base palette)
      purple: {
        50: '#f5f3ff',
        // ... complete scale
        900: '#13001a',
      },

      // Semantic tokens (purpose-based)
      brand: {
        DEFAULT: '#4B006E',
        light: '#6d5590',
        lighter: '#b2a3c7',
      },

      // Component tokens
      surface: {
        page: '#F5F3FE',
        card: '#ffffff',
        footer: '#121826',
      },
    },

    // Semantic spacing scale
    spacing: {
      'section': '5rem',      // py-section
      'section-sm': '3rem',
      'section-lg': '8rem',
    },

    // Typography system
    fontSize: {
      // Only custom sizes, with line-height
      'display-sm': ['3rem', { lineHeight: '1.2' }],
      'display-md': ['4.5rem', { lineHeight: '1.1' }],
      'display-lg': ['6rem', { lineHeight: '1' }],
    },
  }
}
```

### 5.2 @apply vs Utility Classes

**Current State:** No `@apply` usage (good!) ✅

**Best Practices:**
- ✅ Use utilities in components (current approach)
- ✅ Extract repeated patterns to React components
- ⚠️ Use `@apply` sparingly for:
  - Base element styles
  - Third-party component overrides
  - Very frequently repeated 5+ utility combinations

**When to consider @apply:**
```css
/* Good use case - base element styling */
@layer base {
  h1, h2, h3 {
    @apply font-heading font-light text-primary;
  }
}

/* Better as React component */
.button-ghost {
  @apply px-6 py-3 bg-transparent border border-white rounded-full hover:bg-white hover:bg-opacity-10;
}
```

### 5.3 CSS-in-JS vs Utility Classes

**Current Approach:** Mostly utilities with some inline styles for performance

**Assessment:** Well-balanced approach ✅
- Performance CSS in inline styles ✅
- Layout/design in Tailwind utilities ✅
- Complex animations in CSS files ✅

### 5.4 Custom Plugin Usage

**Current State:** No custom plugins

**Recommendations:**
Could benefit from custom plugins for:

```typescript
// Example plugin for brand color utilities
plugin(function({ addUtilities, theme }) {
  addUtilities({
    '.bg-brand': {
      backgroundColor: theme('colors.brand.DEFAULT'),
    },
    '.text-brand': {
      color: theme('colors.brand.DEFAULT'),
    },
    // ... automatically generate all variants
  })
})
```

### 5.5 Dark Mode Setup

**Current State:** No dark mode support

**Recommendation for Future:**
```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        surface: {
          page: {
            light: '#F5F3FE',
            dark: '#1a1a2e',
          }
        }
      }
    }
  }
}
```

---

## 6. What's Being Done Well

### 1. Performance Optimization ✅
- Critical CSS inlining
- GPU acceleration hints
- Lazy loading strategies
- Font loading optimization

### 2. Responsive Design ✅
- Consistent breakpoint usage (`md:`, `lg:`)
- Mobile-first approach
- Proper viewport units

### 3. Component Architecture ✅
- Good separation of concerns
- Reusable components (Footer, Navigation, ViewAllButton)
- Client/server component split

### 4. Typography ✅
- Custom font variables properly configured
- Fallback fonts defined
- Consistent font family usage

### 5. Accessibility ✅
- Semantic HTML
- ARIA labels present
- Keyboard navigation support

---

## 7. What Needs Refactoring

### Priority 1: High Impact

#### 1. Consolidate Color Definitions
- Remove duplicate color definitions from `tailwind.config.ts`
- Remove manual utility classes from `globals.css`
- Create single source of truth in config
- Use Tailwind's color system instead of custom classes

#### 2. Remove Unnecessary Config Duplications
- Remove duplicate fontSize definitions
- Remove duplicate spacing definitions
- Remove duplicate gray colors

#### 3. Convert Hard-Coded Colors to Tokens
- Replace all hex/rgba values in CSS with theme references
- Update SVG fill colors to use Tailwind classes
- Convert gradient colors to theme references

### Priority 2: Medium Impact

#### 4. Extract Repeated Component Patterns
- Create Button component with variants
- Create Heading component for consistent typography
- Create Section component for consistent spacing
- Create Card component for consistent styling

#### 5. Systematize Spacing
- Define semantic spacing scale
- Apply consistent section padding
- Standardize card/component spacing

#### 6. Improve CSS Organization
- Separate animations into dedicated file
- Move component-specific styles to components
- Use Tailwind layers properly (@layer base, @layer components)

### Priority 3: Future Enhancements

#### 7. Create Custom Plugins
- Brand color utilities plugin
- Component variants plugin
- Gradient utilities plugin

#### 8. Theme Structure
- Implement semantic token naming
- Create design token documentation
- Set up token versioning

---

## 8. Specific Examples of Patterns to Improve

### Example 1: Button Pattern

**Current (Repeated 5+ times):**
```tsx
<Link
  href="/offerings"
  className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-white rounded-full backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition duration-300"
>
```

**Improved:**
```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "inline-flex items-center rounded-full transition duration-300",
  {
    variants: {
      variant: {
        ghost: "bg-transparent border border-white text-white hover:bg-white/10",
        primary: "bg-brand text-white hover:bg-brand/90",
        outline: "border-2 border-brand text-brand hover:bg-brand hover:text-white",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    }
  }
)

// Usage
<Button variant="ghost" size="md">View Offerings</Button>
```

### Example 2: Section Heading Pattern

**Current (Repeated 15+ times):**
```tsx
<h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">
```

**Improved:**
```tsx
// components/ui/Heading.tsx
type HeadingProps = {
  level?: 1 | 2 | 3 | 4
  align?: 'left' | 'center' | 'right'
  className?: string
  children: React.ReactNode
}

const Heading = ({ level = 2, align = 'center', className = '', children }: HeadingProps) => {
  const Tag = `h${level}` as const
  const baseClass = "font-light text-primary font-heading fade-in-section"

  const sizes = {
    1: "text-5xl md:text-7xl lg:text-8xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl"
  }

  return (
    <Tag className={`${baseClass} ${sizes[level]} text-${align} ${className}`}>
      {children}
    </Tag>
  )
}

// Usage
<Heading level={2} align="center" className="mb-16">Welcome</Heading>
```

### Example 3: Sun Spot Animation

**Current (Hard-coded colors in CSS):**
```css
.sun-spot {
  background: radial-gradient(circle,
    rgba(255, 236, 25, 1) 0%,
    rgba(255, 215, 0, 0.9) 10%,
    /* ... */
  );
}
```

**Improved:**
```typescript
// tailwind.config.ts
extend: {
  colors: {
    sun: {
      core: '#ffec19',      // rgba(255, 236, 25, 1)
      bright: '#ffd700',    // rgba(255, 215, 0, 1)
      medium: '#facc15',    // rgba(250, 204, 21, 1)
      soft: '#c89632',      // rgba(200, 150, 50, 1)
      dim: '#96644F',       // rgba(150, 100, 80, 1)
    }
  },
  backgroundImage: {
    'sun-gradient': 'radial-gradient(circle, ' +
      'theme(colors.sun.core) 0%, ' +
      'color-mix(in srgb, theme(colors.sun.bright) 90%, transparent) 10%, ' +
      'color-mix(in srgb, theme(colors.sun.medium) 70%, transparent) 25%, ' +
      '/* ... */' +
    ')',
  }
}
```

### Example 4: Card Pattern

**Current (Repeated pattern):**
```tsx
<div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
```

**Improved:**
```tsx
// components/ui/Card.tsx
const cardVariants = cva(
  "rounded-lg shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white",
        tinted: "bg-gray-50",
        elevated: "bg-white hover:shadow-md hover:scale-[1.02]",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-8",
        lg: "p-12",
      },
      alignment: {
        left: "text-left",
        center: "text-center flex flex-col items-center",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      alignment: "left",
    }
  }
)
```

---

## 9. Recommended Token Structure for This Project

```typescript
// tailwind.config.ts - Complete restructure
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // PRIMITIVE TOKENS - Base color palette
      colors: {
        // Brand purples - complete scale
        purple: {
          50: '#f5f3ff',
          100: '#ede9ff',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#4B006E',   // Primary
          600: '#3d0059',
          700: '#2f0044',
          800: '#21002f',
          900: '#13001a',
          // Tints for gradients
          'gradient-1': '#6B20A0',
          'gradient-2': '#7B36A0',
          'gradient-3': '#35004F',
        },

        // Sun/accent yellows - complete scale
        sun: {
          50: '#fffbe6',
          100: '#fff9c3',
          200: '#fff176',
          300: '#ffdd33',
          400: '#ffc107',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },

        // SEMANTIC TOKENS - Purpose-based naming
        brand: {
          DEFAULT: '#4B006E',     // Main brand color
          light: '#6d5590',       // Secondary
          lighter: '#b2a3c7',     // Accent
        },

        // Surface colors
        surface: {
          page: '#F5F3FE',        // Main background
          card: '#ffffff',
          elevated: '#f9fafb',    // Cards on background
          footer: '#121826',
        },
      },

      // TYPOGRAPHY SYSTEM
      fontFamily: {
        serif: ['var(--font-eb-garamond)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-unbounded)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-unbounded)', 'sans-serif'],
      },

      // Custom font sizes with line heights
      fontSize: {
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '0.025em' }],
        'display-md': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.025em' }],
        'display-lg': ['6rem', { lineHeight: '1', letterSpacing: '0.025em' }],
      },

      // SPACING SYSTEM - Semantic scales
      spacing: {
        'section': '5rem',       // Standard section padding
        'section-sm': '3rem',
        'section-lg': '8rem',
        'gutter': '1rem',
        'gutter-md': '2rem',
      },

      // LAYOUT
      maxWidth: {
        'content': '48rem',      // 768px - prose width
        'content-lg': '56rem',   // 896px
        'content-xl': '64rem',   // 1024px
        'container': '80rem',    // 1280px - max container
      },

      // COMPONENT TOKENS
      borderRadius: {
        'card': '0.75rem',
        'button': '9999px',      // Full round
      },

      // GRADIENTS
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero': 'radial-gradient(circle at 30% 40%, theme(colors.purple.500), transparent 15%), ' +
                'radial-gradient(circle at 70% 30%, theme(colors.purple.500), transparent 12%), ' +
                'radial-gradient(circle at 85% 60%, theme(colors.purple.500), transparent 18%), ' +
                'radial-gradient(circle at 25% 30%, theme(colors.purple.gradient-1), transparent 40%), ' +
                'radial-gradient(circle at 15% 70%, theme(colors.purple.gradient-2), transparent 35%), ' +
                'radial-gradient(circle at 60% 85%, theme(colors.purple.gradient-3), transparent 25%)',
        'sun-glow': 'radial-gradient(circle, ' +
                    'theme(colors.sun.400) 0%, ' +
                    'color-mix(in srgb, theme(colors.sun.300) 90%, transparent) 10%, ' +
                    'color-mix(in srgb, theme(colors.sun.500) 70%, transparent) 25%, ' +
                    'color-mix(in srgb, theme(colors.sun.600) 50%, transparent) 40%, ' +
                    'color-mix(in srgb, theme(colors.sun.700) 30%, transparent) 60%, ' +
                    'transparent 100%)',
      },

      // ANIMATIONS
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'sun-pulse': 'sunPulseUpward 5s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sunPulseUpward: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-15px) scale(1.1)', opacity: '0.85' },
        },
      },
    },
  },

  plugins: [
    // Custom plugin for brand utilities
    function({ addUtilities, theme }) {
      addUtilities({
        '.bg-brand': {
          backgroundColor: theme('colors.brand.DEFAULT'),
        },
        '.text-brand': {
          color: theme('colors.brand.DEFAULT'),
        },
        '.border-brand': {
          borderColor: theme('colors.brand.DEFAULT'),
        },
      })
    }
  ],

  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
```

---

## 10. Migration Strategy Recommendations

### Phase 1: Foundation (Low Risk)
**Goal:** Clean up config without breaking changes

**Tasks:**
1. Audit and document current color usage
2. Remove duplicate definitions from `tailwind.config.ts`:
   - fontSize duplicates
   - spacing duplicates
   - gray color overrides
3. Add missing color scales (complete purple, sun/yellow scales)
4. Test thoroughly - no visual changes should occur

**Estimated Time:** 2-4 hours
**Risk Level:** Low
**Files Affected:** `tailwind.config.ts`

### Phase 2: CSS Consolidation (Medium Risk)
**Goal:** Move custom utilities from CSS to config

**Tasks:**
1. Create custom plugin for brand colors
2. Remove manual utility classes from `globals.css` (.bg-primary, .text-primary, etc.)
3. Convert to Tailwind classes in components (bg-brand instead of bg-primary)
4. Update all components to use new classes
5. Test all pages for visual regressions

**Estimated Time:** 4-8 hours
**Risk Level:** Medium (requires component updates)
**Files Affected:** `globals.css`, `tailwind.config.ts`, all component files

### Phase 3: Token Migration (Medium Risk)
**Goal:** Replace hard-coded colors with theme tokens

**Tasks:**
1. Create comprehensive token system in config
2. Replace hard-coded hex values in CSS files with theme() references
3. Update SVG fills to use Tailwind classes
4. Convert rgba values to use opacity utilities
5. Test all gradients and animations

**Estimated Time:** 6-10 hours
**Risk Level:** Medium (visual details matter)
**Files Affected:** `globals.css`, `critical.css`, SVG components

### Phase 4: Component Extraction (Low-Medium Risk)
**Goal:** Create reusable component library

**Tasks:**
1. Extract Button component with variants
2. Extract Heading component with levels
3. Extract Card component with variants
4. Extract Section wrapper for consistent spacing
5. Update all pages to use new components
6. Create Storybook documentation (optional)

**Estimated Time:** 8-16 hours
**Risk Level:** Low-Medium (improves maintainability)
**Files Affected:** New component files, all page files

### Phase 5: Advanced Optimizations (Optional)
**Goal:** Future-proof and enhance

**Tasks:**
1. Set up dark mode infrastructure
2. Create design token documentation
3. Implement CSS-in-JS for complex components (if needed)
4. Add custom Tailwind plugins for common patterns
5. Set up visual regression testing

**Estimated Time:** 16-24 hours
**Risk Level:** Low (additive features)
**Files Affected:** Various

---

## 11. Quick Wins (Immediate Actions)

These can be implemented immediately with minimal risk:

1. **Remove duplicate fontSize** definitions from `tailwind.config.ts`
2. **Remove duplicate spacing** definitions from `tailwind.config.ts`
3. **Remove gray color overrides** (use Tailwind defaults)
4. **Fix spacing tokens** - remove `h-800` and `w-600` non-standard names
5. **Add complete color scales** for purple and sun colors
6. **Document current color usage** in a spreadsheet

**Estimated Time:** 1-2 hours
**Impact:** Cleaner configuration, reduced bundle size

---

## 12. Conclusion

This project has **solid foundations** with good performance practices and consistent utility usage. The main opportunities for improvement are organizational and structural rather than fundamental.

### Biggest Issues:
1. Color tokens scattered across 3 files (config, globals.css, critical.css)
2. Manual recreation of Tailwind utilities in CSS
3. Hard-coded color values throughout CSS files
4. Repeated component patterns without extraction

### Biggest Opportunities:
1. Consolidate to single source of truth for design tokens
2. Extract common component patterns for reusability
3. Implement semantic token naming for better scalability
4. Remove 200+ lines of unnecessary custom CSS

### Recommended Priority:
Start with **Phase 1 (Foundation)** - it's low risk and provides immediate clarity. Then decide whether to continue based on project timeline and maintenance priorities.

The codebase is **well-structured for refactoring** - the current patterns are consistent enough that systematic improvements will be straightforward.

---

## Next Steps

1. **Review this document** with your team
2. **Prioritize phases** based on project timeline
3. **Create implementation tickets** for chosen phases
4. **Set up testing strategy** (visual regression, component testing)
5. **Begin with Quick Wins** to build momentum

**Questions or need clarification?** Reference specific sections by number when discussing implementation details.
