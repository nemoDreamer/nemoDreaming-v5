module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "error",

    // IMPORTS
    // --------------------------------------------------
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        // let `import/order` do its thing:
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        pathGroups: [
          // separate immediate parents into own group:
          {
            pattern: "../!(..)**",
            group: "parent",
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
      },
    ],
    "import/no-anonymous-default-export": 0,
  },
};
