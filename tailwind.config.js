/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontsize: 16,
      fontFamily: {
        sans: ["Exo", "sans-serif"],
      },
      backgroundColor: {
        base: "#EBEFFF",
        primary: "#AFB3FF",
        navbar: "#3D3A7F"
      }
    },
  },
  plugins: [
  ],
}

