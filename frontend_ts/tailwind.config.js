/** @type {import('tailwindcss').Config} */

module.exports = {
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
}

