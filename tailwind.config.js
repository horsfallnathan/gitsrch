const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      success: "#96cc28",
      "dark-4": "#1b1b1b",
      "dark-3": "#252525",
      "dark-2": "#303030",
      "dark-1": "#3b3b3b",
      "main-text": "#f0f0f0",
      "sub-text": "#b8b8b8",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
