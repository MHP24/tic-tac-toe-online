/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c1': '#0D0D0D',
        'c2': '#000000',
        'c3': '#FFFFFF',
        'c4': '#1F1F1F'
      },
      fontFamily: {
        'primary': ['Goldman', 'Arial']
      },
      backgroundImage: {
        'bg': 'url(/bg.svg)'
      }
    },
  },
  plugins: [],
}