const withGraphql = require("next-plugin-graphql");
const withYaml = require("next-plugin-yaml");

module.exports = withYaml(
  withGraphql({
    future: {
      webpack5: true,
    },
  })
);
