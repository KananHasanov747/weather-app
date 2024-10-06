import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
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
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [
    daisyui,
    plugin(function ({ addVariant }) {
      addVariant("scrollbar", ["&::-webkit-scrollbar", "&::scrollbar"]);
    }),
  ],
} satisfies Config;
