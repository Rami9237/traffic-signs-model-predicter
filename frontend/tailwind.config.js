/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        widthGrow: 'widthGrow 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};