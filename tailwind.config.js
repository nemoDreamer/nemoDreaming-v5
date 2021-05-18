const defaultTheme = require("tailwindcss/defaultTheme");

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
          100: "#cce0df",
          200: "#99c2c0",
          300: "#66a3a0",
          400: "#338581",
          500: "#006661",
          600: "#00524e",
          700: "#003d3a",
          800: "#002927",
          900: "#001413",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
