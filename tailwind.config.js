/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      holidaze: ["Gochi Hand", "cursive"],
      text: ["Crimson Text", "serif"],
      heading: ["Barlow", "sans-serif"],
      cta: ["Quicksand", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "#FEFBE1",
      dark: "#29324F",
      "dark-green": "#3A591C",
      orange: "#BF4A30",
      "light-green": "#A2A638",
    },
    extend: {},
  },
  plugins: [],
};
