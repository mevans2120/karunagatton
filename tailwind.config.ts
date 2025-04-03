import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-eb-garamond)', 'serif'],
        sans: ['var(--font-unbounded)', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['var(--font-unbounded)', 'sans-serif'],
      },
      colors: {
        primary: '#4B006E',
        secondary: '#6d5590',
        accent: '#b2a3c7',
        background: '#f5f3f7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(circle at 25% 30%, #6B20A0, transparent 40%), radial-gradient(circle at 75% 60%, #4B006E, transparent 50%), radial-gradient(circle at 50% 50%, #35004F, transparent 60%), radial-gradient(circle at 80% 20%, #7B36A0, transparent 40%), radial-gradient(circle at 20% 70%, #eab308, transparent 35%), radial-gradient(circle at 65% 40%, #facc15, transparent 30%), radial-gradient(circle at 40% 25%, #fef08a, transparent 25%), radial-gradient(circle at 85% 80%, #fef9c3, transparent 20%), #4B006E',
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config; 