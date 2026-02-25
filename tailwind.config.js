/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        secondary: '#0066FF1A',
        background: '#FAFAFF',
        border: '#F1F5F9',
        textPrimary: '#0F172A',
      },
    },
  },
  plugins: [],
};
