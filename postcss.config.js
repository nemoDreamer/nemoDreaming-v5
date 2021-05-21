module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-preset-env": {
      // NOTE: includes `autoprefixer`
    },
    "flex-gap-polyfill": {
      tailwindCSS: true,
    },
  },
};
