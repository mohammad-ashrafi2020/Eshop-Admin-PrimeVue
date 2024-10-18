/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  plugins: [require("tailwindcss-primeui")],
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./components/**/**/*.{vue,js}",
    "./components/**/**/**/*.{vue,js}",
    "./components/base/*.{vue,js}",
    "./composables/*.{ts,js}",
    "./composables/**/*.{ts,js}",
    "./pages/*.vue",
    "./layouts/*.vue",
    "./pages/**/*.vue",
    "./pages/**/**/*.vue",
    "./pages/**/**/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./*.{vue,js}",
  ],
  theme: {
    extend: {
      screens: {
        xl: { max: "1536px" },
        lg: { max: "1280px" },
        md: { max: "1024px" },
        sm: { max: "768px" },
      },
      gap: {
        19: "19px",
        "10p": "10px",
      },
      fontFamily: {
        IranSans: "iransans",
        IranSansBold: "iransans-bold",
      },
    },
  },
};
