module.exports = {
  "**/*.ts?(x)": () => "npm run type-check",
  "**/*.{js,ts}?(x)": "npm run lint:js",
  "**/*.md": "npm run lint:md",
  "package.json": "sort-package-json",
};
