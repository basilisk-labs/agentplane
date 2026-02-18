const js = require("@eslint/js");
const globals = require("globals");

const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

const importPlugin = require("eslint-plugin-import");
const nPlugin = require("eslint-plugin-n");
const promisePlugin = require("eslint-plugin-promise");
const unicornPlugin = require("eslint-plugin-unicorn").default;
const prettierConfig = require("eslint-config-prettier");

const tsconfigProjects = [
  "./tsconfig.eslint.json",
  "./packages/*/tsconfig.json",
  "./website/tsconfig.eslint.json",
];

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      ".agentplane/**",
      "agentplane-recipes/**",
      "**/*.d.ts",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...nPlugin.configs["recommended-module"].rules,
      ...promisePlugin.configs.recommended.rules,
      ...unicornPlugin.configs.recommended.rules,
      ...prettierConfig.rules,

      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-process-exit": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-top-level-await": "off",
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
      parser: tsParser,
      parserOptions: {
        project: tsconfigProjects,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      promise: promisePlugin,
      unicorn: unicornPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: tsconfigProjects,
        },
      },
    },
    rules: {
      ...tsPlugin.configs["recommended-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,
      ...importPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      ...unicornPlugin.configs.recommended.rules,
      ...prettierConfig.rules,

      "@typescript-eslint/consistent-type-definitions": "off",
      "promise/catch-or-return": "off",
      "unicorn/catch-error-name": "off",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],

      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],

      "no-undef": "off",

      "import/no-unresolved": "off",

      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-process-exit": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prefer-type-error": "off",
    },
  },

  {
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
    },
  },

  {
    files: ["website/src/theme/*.tsx"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },

  // Policy code must be pure: facts are injected via contexts.
  {
    files: ["packages/agentplane/src/policy/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["node:*"],
          paths: [
            { name: "child_process", message: "Policy code must not execute subprocesses." },
            { name: "fs", message: "Policy code must not read or write the filesystem." },
            { name: "fs/promises", message: "Policy code must not read or write the filesystem." },
            { name: "path", message: "Policy code must not depend on OS paths." },
          ],
        },
      ],
      "no-restricted-globals": ["error", "process"],
      "no-restricted-properties": [
        "error",
        { object: "process", property: "env", message: "Use injected context instead of env." },
        { object: "process", property: "cwd", message: "Use injected context instead of cwd." },
      ],
    },
  },
];
