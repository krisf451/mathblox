/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ultrasmall: "375px",
      xs: "425px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        gold_main: "#ebbc00",
        lightgold_main: "#e0c24a",
        navy_main: "#06253f",
        bronze_main: "#daaa00",
        gray_main: "#f8f9fd",
      },
      animation: {
        slideup: "slideup .7s ease-in-out",
        fastfade: "fastfade .4s ease-in-out",
        slideright: "slideright 2s ease-in-out",
        slideleft: "slideleft 2s ease-in-out",
      },
      keyframes: {
        fastfade: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideup: {
          from: { opacity: 0, transform: "translateY(5px)" },
          to: { opacity: 1, transform: "none" },
        },
        slideright: {
          from: { opacity: 1, transform: "none" },
          to: { opacity: 0, transform: "translateX(50px)" },
        },
        slideleft: {
          from: { opacity: 1, transform: "none" },
          to: { opacity: 0, transform: "translateX(-50px)" },
        },
      },
    },
  },
  plugins: [],
};
