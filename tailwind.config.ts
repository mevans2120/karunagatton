import type { Config } from "tailwindcss";
import { tokens } from "./src/lib/tokens";

/**
 * Tailwind CSS Configuration
 *
 * This configuration imports design tokens from src/lib/tokens.ts to maintain
 * a single source of truth for all design values.
 *
 * @see src/lib/tokens.ts - Design token definitions
 * @see docs/design-system-plan.md - Full design system documentation
 * @see docs/critical-css-architecture.md - Critical CSS architecture explanation
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ['text-white', 'bg-red-500'],
  theme: {
    extend: {
      // Import font families from design tokens
      fontFamily: tokens.fontFamily,

      // Import colors from design tokens
      colors: tokens.colors,

      // Import background images from design tokens
      backgroundImage: tokens.backgroundImage,

      // Import animations from design tokens
      animation: tokens.animation,

      // Import keyframes from design tokens
      keyframes: tokens.keyframes,
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config; 