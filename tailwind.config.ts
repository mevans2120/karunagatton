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
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#301934',
        secondary: '#6d5590',
        accent: '#b2a3c7',
        background: '#f5f3f7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(circle at 25% 30%, #4b2b5c, transparent 40%), radial-gradient(circle at 75% 60%, #301934, transparent 50%), radial-gradient(circle at 50% 50%, #1d1020, transparent 60%), radial-gradient(circle at 80% 20%, #583668, transparent 40%), radial-gradient(circle at 20% 70%, #eab308, transparent 35%), radial-gradient(circle at 65% 40%, #facc15, transparent 30%), radial-gradient(circle at 40% 25%, #fef08a, transparent 25%), radial-gradient(circle at 85% 80%, #fef9c3, transparent 20%), #301934',
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
};

export default config; 