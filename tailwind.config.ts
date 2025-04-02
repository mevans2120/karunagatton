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
    },
  },
  plugins: [],
};

export default config; 