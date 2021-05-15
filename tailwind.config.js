const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  // mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: ["ibm-plex-mono", ...defaultTheme.fontFamily.mono],
        sans: ["ibm-plex-sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        teal: {
          100: "#cce2e1",
          200: "#99c5c3",
          300: "#66a7a4",
          400: "#338a86",
          500: "#006d68",
          600: "#005753",
          700: "#00413e",
          800: "#002c2a",
          900: "#001615",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
