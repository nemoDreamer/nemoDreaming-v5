const defaultTheme = require("tailwindcss/defaultTheme");

const blinkFade = 10; // in %

module.exports = {
  // mode: "jit",
  purge: {
    content: ["./pages/**/*.{jsx,tsx}", "./components/**/*.{jsx,tsx}"],
    options: {
      safelist: [
        // FIXME: these kept getting removed, even though they were explicitly named in the HTML output...:
        "hover:rotate-1",
        "hover:rotate-2",
        "hover:rotate-3",
        "hover:rotate-6",
        "hover:-rotate-1",
        "hover:-rotate-2",
        "hover:-rotate-3",
        "hover:-rotate-6",
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    // NOTE: overwriting sizes to add `xs`, because adding it using `extends`
    // gives it _higher_ specificity...
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
    extend: {
      margin: ["group-hover", "last"],
      padding: ["group-hover", "last"],
    },
  },
  plugins: [],
};
