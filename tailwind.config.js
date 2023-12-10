/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{html,js,ts,jsx,tsx,mdx}'],
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
      colors: {
        'brand-black-100': '#333333',
        'brand-bg': '#f4f4f4',
        'brand-lightbg': '#F5FAFF',
        'brand-primary': '#0556B3',
        'brand-hover': '#076BCD',
        'brand-secondary': '#8505B3',
        'brand-accent': '#ff7f50',
        'brand-gray': '#f5f5f5',
        'brand-text-secondary': '#787878',
        'brand-success': '#067647',
        'brand-failed': '#B42318',
      },
    },
  },
  plugins: [],
};
