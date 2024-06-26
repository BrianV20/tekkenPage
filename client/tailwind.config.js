/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightblue': '#8ecae6'
      },
      fontFamily: {
        'Page-Title': ['Be Vietnam Pro'],
        'Default': ['Poppins'],
        'Lato': ['Lato']
      }
    },
  },
  plugins: [],
}

