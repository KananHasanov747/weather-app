const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      colors: {
        "light-gray": "#202B3B",
        "dark-gray": "#0c131e",
        "light-white": "#d4d4d8",
        "dark-white": "#9097A0",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("scrollbar", ["&::-webkit-scrollbar", "&::scrollbar"]);
    }),
  ],
};
