/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode colors (default)
        'dark-bg': '#0A0A0A',
        'dark-surface': '#111111',
        'dark-border': '#1F1F1F',
        'dark-gray': '#8B8B8B',
        'light-gray': '#B8B8B8',
        'accent-green': '#00FF00',
        'accent-green-dark': '#00CC00',
        'white': '#FFFFFF',
        // Light mode colors
        'light-bg': '#FFFFFF',
        'light-surface': '#F8FAFC',
        'light-border': '#E5E7EB',
        'light-text': '#111827',
        'light-text-secondary': '#6B7280',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      textColor: {
        DEFAULT: '#FFFFFF',
        'light-mode': '#111827',
      },
    },
  },
  plugins: [],
}