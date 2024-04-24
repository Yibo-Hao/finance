/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-yellow': '#F2796B',
        'main-gray': '#979797'
      },
      textColor: {
        'main-yellow': '#F2796B',
        'main-gray': '#5B5B5B'
      },
      ringColor: {
        'main-yellow': '#F2796B'
      },
      boxShadow: {
        'big-inner': 'inset 0 0 0 2000px #fff',
      }
    },
  },
  plugins: [],
}

