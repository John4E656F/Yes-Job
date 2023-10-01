/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  mode: 'jit',
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        robotoCondensed: ['Roboto Condensed', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'brand-black-100': '#333333',
        'brand-bg': '#f4f4f4',
        'brand-primary': '#2E90FA',
        'brand-secondary': '#40E0D0',
        'brand-accent': '#ff7f50',
        'brand-gray': '#D9D9D9',
      },
    },
  },
  plugins: [],
};
