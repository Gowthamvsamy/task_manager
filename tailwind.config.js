/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
}

