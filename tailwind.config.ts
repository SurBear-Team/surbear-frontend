import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      gray: {
        1: "#F5F5F5",
        2: "#EEEEEE",
        3: "#E0E0E0",
        4: "#BDBDBD",
        5: "#9E9E9E",
        6: "#757575",
        7: "#616161",
        8: "#424242",
        9: "#101010",
      },
      brown: {
        1: "#FFFBE9",
        2: "#E3CAA5",
        3: "#CEAB93",
        4: "#AD8B73",
      },
      primary: {
        1: "#6E7CF2",
      },
      red: {
        1: "#D52828",
      },
      green: {
        1: "#5BC552",
      },
      white: colors.white,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
