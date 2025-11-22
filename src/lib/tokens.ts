/**
 * Design System Tokens
 * Single source of truth for all design tokens used across the application.
 *
 * @see docs/design-system-plan.md - Full design system documentation
 * @see docs/critical-css-architecture.md - Why tokens exist in multiple places
 */

/**
 * Color Tokens
 *
 * Structure:
 * - Semantic brand colors (primary, secondary, etc.) for business meaning
 * - Full color scales (purple, yellow, amber) for design flexibility
 *
 * Note: These same values are duplicated in critical.css and globals.css
 * as CSS custom properties to support critical CSS inlining strategy.
 * See docs/critical-css-architecture.md for why this duplication is intentional.
 */
export const colors = {
  // Semantic brand colors - Use these for business logic and brand identity
  primary: '#4B006E',      // Deep purple - primary brand color
  secondary: '#6d5590',    // Medium purple - secondary brand color
  accent: '#b2a3c7',       // Light purple - accent color
  background: '#F5F3FE',   // Very light purple - page background
  white: '#fff',           // Pure white - text on dark backgrounds
  footer: '#121826',       // Dark blue-gray - footer background

  // Purple scale - Full Tailwind-compatible purple palette
  'purple-50': '#f5f3ff',
  'purple-100': '#ede9ff',
  'purple-200': '#ddd6fe',
  'purple-300': '#c4b5fd',
  'purple-400': '#a78bfa',
  'purple-500': '#8b5cf6',
  'purple-600': '#7c3aed',
  'purple-700': '#6d28d9',
  'purple-800': '#5b21b6',
  'purple-900': '#4c1d95',

  // Yellow scale - Full Tailwind-compatible yellow palette
  'yellow-50': '#fffbe6',
  'yellow-100': '#fff9c3',
  'yellow-200': '#fff176',
  'yellow-300': '#ffed4e',
  'yellow-400': '#ffc107',
  'yellow-500': '#ffdd33',
  'yellow-600': '#f59e0b',
  'yellow-700': '#d97706',
  'yellow-800': '#b45309',
  'yellow-900': '#92400e',

  // Amber scale - Full Tailwind-compatible amber palette
  'amber-50': '#fef9c3',
  'amber-100': '#fef3c7',
  'amber-200': '#fef08a',
  'amber-300': '#facc15',
  'amber-400': '#eab308',
  'amber-500': '#f59e0b',
  'amber-600': '#d97706',
  'amber-700': '#b45309',
  'amber-800': '#92400e',
  'amber-900': '#78350f',
} as const;

/**
 * Typography Tokens
 *
 * Font families for headings and body text.
 * Uses CSS custom properties defined in globals.css for font loading optimization.
 */
export const fontFamily = {
  // Serif font - Used for body text, provides warmth and readability
  serif: ['var(--font-eb-garamond)', 'serif'] as string[],

  // Sans-serif font - Used for UI elements, clean and modern
  sans: ['var(--font-unbounded)', 'Helvetica', 'Arial', 'sans-serif'] as string[],

  // Heading font - Used for all headings, brand identity
  heading: ['var(--font-unbounded)', 'sans-serif'] as string[],
};

/**
 * Background Image Tokens
 *
 * Complex gradients used for hero sections and visual effects.
 * These cannot be easily replaced with Tailwind utilities due to complexity.
 */
export const backgroundImage = {
  // Radial gradient utilities
  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

  // Hero gradient - Complex multi-layer gradient for homepage hero section
  // Combines purple tones with yellow/amber sun spots
  'hero-gradient': [
    'radial-gradient(circle at 30% 40%, #4B006E, transparent 15%)',
    'radial-gradient(circle at 70% 30%, #4B006E, transparent 12%)',
    'radial-gradient(circle at 85% 60%, #4B006E, transparent 18%)',
    'radial-gradient(circle at 25% 30%, #6B20A0, transparent 40%)',
    'radial-gradient(circle at 75% 60%, #4B006E, transparent 50%)',
    'radial-gradient(circle at 50% 50%, #35004F, transparent 60%)',
    'radial-gradient(circle at 80% 20%, #7B36A0, transparent 40%)',
    'radial-gradient(circle at 15% 20%, #eab308, transparent 10%)',
    'radial-gradient(circle at 90% 80%, #eab308, transparent 8%)',
    'radial-gradient(circle at 20% 80%, #facc15, transparent 35%)',
    'radial-gradient(circle at 65% 40%, #facc15, transparent 25%)',
    'radial-gradient(circle at 40% 25%, #fef08a, transparent 25%)',
    'radial-gradient(circle at 85% 80%, #fef9c3, transparent 20%)',
    '#4B006E',
  ].join(', '),
};

/**
 * Animation Tokens
 *
 * Reusable animation configurations.
 */
export const animation = {
  // Fade in animation - Used for section entrance effects
  'fade-in': 'fadeIn 0.6s ease-out forwards',

  // Sun pulse upward - Used for sun spot decorative elements
  'sun-pulse-upward': 'sunPulseUpward 5s ease-in-out infinite',
};

/**
 * Keyframe Tokens
 *
 * Animation keyframe definitions.
 */
export const keyframes = {
  // Fade in effect - opacity and vertical translation
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },

  // Sun pulse upward effect - vertical movement and scale with opacity
  sunPulseUpward: {
    '0%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
    '50%': { transform: 'translateY(-15px) scale(1.1)', opacity: '0.85' },
    '100%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
  },
};

/**
 * Complete Design Tokens Export
 *
 * Use this for Tailwind configuration and other tooling.
 */
export const tokens = {
  colors,
  fontFamily,
  backgroundImage,
  animation,
  keyframes,
};

/**
 * TypeScript type exports for type-safe token usage
 */
export type ColorToken = keyof typeof colors;
export type FontFamilyToken = keyof typeof fontFamily;
export type BackgroundImageToken = keyof typeof backgroundImage;
export type AnimationToken = keyof typeof animation;
export type KeyframeToken = keyof typeof keyframes;
