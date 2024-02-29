/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#633CFF",
        "purple-hover": "#BEADFF",
        "light-purple": "#EFEBFF",
        dark: "#333333",
        gray: "#737373",
        "light-gray": "#D9D9D9",
        "dark-white": "#FAFAFA",
        red: "#FF3939",
      },
    },
  },
  plugins: [],
};
