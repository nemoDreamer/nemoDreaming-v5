const jsExtensions = ".{j,t}s?(x)";

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
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
    // 'import/no-cycle': ['error', {}],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          // Jest, Storybook:
          "**/__{tests,stories,mocks,fixtures}__/**/*" + jsExtensions,
          "**/*.{{spec,test}?(s),stories}" + jsExtensions,
          "{,.}{jest,storybook}/**/*" + jsExtensions,
          // Scripts:
          "{bin,script}/**/*" + jsExtensions,
          // Configs:
          "**/?(*.)config?(.*).{js,json}",
          "**/.*rc?(.{js,json})",
        ],
      },
    ],

    "@typescript-eslint/no-unused-vars": "error",
  },
  overrides: [
    {
      files: "*.{ts,tsx}",
      rules: {
        // REACT
        // --------------------------------------------------
        "react/prop-types": "off", // <- keeps interfering w/ TypeScript
      },
    },
    {
      files: "*.{js,jsx}",
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
