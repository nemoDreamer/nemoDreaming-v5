module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "**/*.{js,ts}?(x)": "npm run lint:js",
  "package.json": "sort-package-json",
};
