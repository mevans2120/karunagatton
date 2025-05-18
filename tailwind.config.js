/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '100%',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
      },
      fontFamily: {
        heading: ['Unbounded', 'sans-serif'],
        serif: ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
} 