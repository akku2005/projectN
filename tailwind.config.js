/* eslint-disable no-undef */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: `"Poppins", sans-serif`,
      },
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#ddfbe7",
          200: "#bdf5d1",
          300: "#89ecae",
          400: "#4fd982",
          500: "#27c060",
          600: "#1a9c4b",
          700: "#187d3f",
          800: "#186336",
          900: "#16512d",
          950: "#062d16",
        },
        background: "#FAFAFA",
        mainBlack: "#1A1B1F",
        border: "#1A1B1F30",
      },
    },
  },
  plugins: [],
});
