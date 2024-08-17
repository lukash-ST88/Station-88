/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      gridTemplateColumns: {
     '16': 'repeat(16, minmax(0, 1fr))'},
     gridColumn: {
      'span-14': 'span 14 / span 14',
     },
     color: {
      'st88-main':'rgba(5, 150, 105,1)',
      'st88-sacondary': '#ffffff',
      'st88-background': '#181818'
     }
    },
  },
  plugins: [],
});

