module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "ibm-plex-mono",
          // default fallbacks:
          "ui-monospace",
          "SFMono-Regular",
          "Consolas",
          "'Liberation Mono'",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
