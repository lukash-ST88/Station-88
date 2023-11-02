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
     }
    },
  },
  plugins: [],
});

