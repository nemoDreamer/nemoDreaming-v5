module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "**/*.{js,ts}?(x)": "npm run lint:js",
  "**/*.md": "npm run lint:md",
  "package.json": "sort-package-json",
};
