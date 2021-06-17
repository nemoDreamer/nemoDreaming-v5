const withYaml = require("next-plugin-yaml");

module.exports = withYaml({
  future: {
    webpack5: true,
  },
});
