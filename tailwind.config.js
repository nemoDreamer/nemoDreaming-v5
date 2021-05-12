const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
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
          100: "#cce6e6",
          200: "#99cccc",
          300: "#66b3b3",
          400: "#339999",
          500: "#008080",
          600: "#006666",
          700: "#004d4d",
          800: "#003333",
          900: "#001a1a",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        main: {
          code: {
            color: theme("colors.white"),
            backgroundColor: theme("colors.teal.600"),
          },
        },
      });
    }),
  ],
};
