const defaultTheme = require("tailwindcss/defaultTheme");

const blinkFade = 10; // in %

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
      animation: {
        blink: "blink 1s linear infinite",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 0 },
          [`${blinkFade}%, 50%`]: { opacity: 1 },
          [`${50 + blinkFade}%, 100%`]: { opacity: 0 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
