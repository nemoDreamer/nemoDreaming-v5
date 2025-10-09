import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const blinkFade = 10; // in %

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
        mono: ["var(--font-ibm-plex-mono)", ...defaultTheme.fontFamily.mono],
        sans: ["var(--font-ibm-plex-sans)", ...defaultTheme.fontFamily.sans],
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
          "0%": { opacity: "0" },
          [`${blinkFade}%, 50%`]: { opacity: "1" },
          [`${50 + blinkFade}%, 100%`]: { opacity: "0" },
        },
      },
      screens: {
        // => @media print { ... }
        print: { raw: "print" },
      },
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
