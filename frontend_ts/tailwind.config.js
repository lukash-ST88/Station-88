/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: { 
      gridTemplateColumns: {
     '16': 'repeat(16, minmax(0, 1fr))'},
     gridColumn: {
      'span-14': 'span 14 / span 14',
     },
     colors: {
      'st88-main':'rgb(34 197 94)',
      'st88-secondary': '#e53935',
      'st88-background': '#181818'
     },
     fontFamily: {
      'restora-sans':  ['RestoraLight', 'ui-sans-serif', 'system-ui', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
     },
    },
  },
  plugins: [],
});

