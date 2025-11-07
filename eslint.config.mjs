import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    "node_modules/**",
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // ADDITIONAL RULES:
  // --------------------------------------------------
  {
    rules: {
      "no-console": "error",
    },
  },

  // IMPORT RULES:
  // --------------------------------------------------
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
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
  },

  // FILE-SPECIFIC OVERRIDES:
  // --------------------------------------------------
  {
    // Ignore generated file:
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
]);

export default eslintConfig;
