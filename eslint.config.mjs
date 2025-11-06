import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
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
  },
  {
    // Ignore generated file:
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];

export default eslintConfig;
