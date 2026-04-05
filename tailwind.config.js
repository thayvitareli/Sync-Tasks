/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#4a40e0',
        'primary-container': '#9795ff',
        surface: '#faf4ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5eeff',
        'surface-container': '#ede4ff',
        'surface-container-highest': '#e2d7ff',
        'on-surface': '#32294f',
        'outline-variant': '#b2a6d5',
        tertiary: '#983772',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        headline: ['Manrope', 'sans-serif'],
        title: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        ambient: '0 12px 32px -4px rgba(50, 41, 79, 0.08)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.25rem',
        md: '0.75rem',
        lg: '1rem',
      },
    },
  },
  plugins: [],
}