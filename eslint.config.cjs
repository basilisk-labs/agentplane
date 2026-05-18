const js = require("@eslint/js");
const globals = require("globals");

const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

const importPlugin = require("eslint-plugin-import");
const nPluginModule = require("eslint-plugin-n");
const promisePlugin = require("eslint-plugin-promise");
const unicornPlugin = require("eslint-plugin-unicorn").default;
const prettierConfig = require("eslint-config-prettier");
const nPlugin = nPluginModule.default ?? nPluginModule;

function rulesFromConfig(config) {
  if (Array.isArray(config)) {
    return Object.assign({}, ...config.map((entry) => entry.rules ?? {}));
  }
  return config?.rules ?? {};
}

const nRecommendedModuleRules = rulesFromConfig(
  nPlugin.configs["flat/recommended-module"] ??
    nPlugin.configs["recommended-module"] ??
    nPlugin.configs.recommended,
);

const tsconfigProjects = [
  "./tsconfig.eslint.json",
  "./packages/*/tsconfig.json",
  "./website/tsconfig.eslint.json",
];

const sharedBoundaryTargets = [
  "./packages/agentplane/src/commands",
  "./packages/agentplane/src/backends",
  "./packages/agentplane/src/runner",
  "./packages/agentplane/src/runtime",
  "./packages/agentplane/src/adapters",
  "./packages/agentplane/src/ports",
];

const sharedBoundaryPatterns = [
  "../commands/*",
  "../backends/*",
  "../runner/*",
  "../runtime/*",
  "../adapters/*",
  "../ports/*",
];

const testkitDeepImportPatterns = [
  "**/testkit/src/*",
  "**/testkit/src/*.js",
  "**/testkit/dist/*",
  "**/testkit/dist/*.js",
];

const coreSubpathRestrictedImportNames = [
  "AGENTPLANE_CONFIG_SCHEMA",
  "AgentplaneConfigSchema",
  "DEFAULT_TASK_DOC_VERSION",
  "GitContext",
  "Logger",
  "LoggerEntry",
  "LoggerMode",
  "LoggerStream",
  "LoggerWriter",
  "ParsedTaskReadme",
  "PlanApproval",
  "PlanApprovalState",
  "RunProcessOptions",
  "RunProcessResult",
  "TASK_DOC_CONTRACTS",
  "TASK_DOC_SECTION_ORDER",
  "TASK_ID_ALPHABET",
  "TaskDocContract",
  "TaskDocMutation",
  "TaskDocMutationComment",
  "TaskDocMutationResult",
  "TaskDocMutationState",
  "TaskDocSections",
  "TaskDocVersion",
  "TaskEvent",
  "TaskEventType",
  "TaskFrontmatter",
  "TaskHandoff",
  "TaskHandoffRoute",
  "TaskHandoffRunnerNextAction",
  "TaskHandoffRunnerState",
  "TaskOrigin",
  "TaskPrMeta",
  "TaskPriority",
  "TaskRecord",
  "TaskRunnerEvidence",
  "TaskRunnerExecutionMetrics",
  "TaskRunnerHistoryEntry",
  "TaskRunnerOutcome",
  "TaskRunnerOutcomeStatus",
  "TaskRunnerTarget",
  "TaskStatus",
  "TasksExportMeta",
  "TasksExportSnapshot",
  "TasksExportTask",
  "TasksLintResult",
  "VerificationResult",
  "VerificationState",
  "applyTaskDocMutations",
  "atomicWriteFile",
  "buildDefaultTaskDoc",
  "buildTasksExportSnapshot",
  "canonicalTasksPayload",
  "canonicalizeJson",
  "clearPinnedBaseBranch",
  "computeTasksChecksum",
  "createLogger",
  "createTask",
  "defaultAgentplaneConfig",
  "docChanged",
  "ensureDocSections",
  "execFileAsync",
  "extractTaskDoc",
  "findWorktreeForBranch",
  "formatAgentplaneConfigIssues",
  "generateTaskId",
  "getBaseBranch",
  "getPinnedBaseBranch",
  "getStagedFiles",
  "getTaskDocContract",
  "getTasksDir",
  "getUnstagedFiles",
  "getUnstagedTrackedFiles",
  "gitAddPaths",
  "gitAheadBehind",
  "gitBranchExists",
  "gitBranchUpstream",
  "gitCommit",
  "gitCurrentBranch",
  "gitDiffNames",
  "gitDiffStat",
  "gitEnv",
  "gitInitRepo",
  "gitIsAncestor",
  "gitListBranches",
  "gitListBranchesByPrefixes",
  "gitListTaskBranches",
  "gitRevParse",
  "gitShowFile",
  "gitStagedPaths",
  "isIsoUtcTimestamp",
  "lintTasksFile",
  "lintTasksSnapshot",
  "listTaskHandoffSchemaErrors",
  "listTaskPrMetaSchemaErrors",
  "listTaskReadmeFrontmatterSchemaErrors",
  "listTasks",
  "listTasksExportSnapshotSchemaErrors",
  "listWorktrees",
  "mergeTaskDoc",
  "normalizeDocSectionName",
  "normalizeTaskDoc",
  "normalizeTaskDocVersion",
  "parseDocSections",
  "parseTaskIdFromBranch",
  "parseTaskIdFromCloseBranch",
  "parseTaskReadme",
  "readTask",
  "readTaskReadme",
  "readTasksExport",
  "renderAgentplaneConfigSchemaJson",
  "renderTaskDocFromSections",
  "renderTaskFrontmatter",
  "renderTaskHandoffSchemaJson",
  "renderTaskPrMetaSchemaJson",
  "renderTaskReadme",
  "renderTaskReadmeFrontmatterSchemaJson",
  "renderTasksExportSchemaJson",
  "resolveBaseBranch",
  "resolveInitBaseBranch",
  "resolveLoggerMode",
  "resolveTaskDocUpdatedBy",
  "runProcess",
  "runProcessSync",
  "setMarkdownSection",
  "setPinnedBaseBranch",
  "setTaskDocSection",
  "splitCombinedHeadingLines",
  "startProcess",
  "taskDocToSectionMap",
  "taskReadmePath",
  "timestampIdPrefix",
  "toGitPath",
  "updateTaskReadmeAtomic",
  "validateAgentplaneConfig",
  "validateTaskDocMetadata",
  "validateTaskHandoff",
  "validateTaskPrMeta",
  "validateTaskReadmeFrontmatter",
  "validateTasksExportSnapshot",
  "withTaskReadmeFrontmatterDefaults",
  "writeTasksExport",
];

const coreSubpathRestrictedImportPath = {
  name: "@agentplaneorg/core",
  importNames: coreSubpathRestrictedImportNames,
  message:
    "Import this symbol from the matching @agentplaneorg/core subpath: /fs, /git, /logger, /process, /schemas, or /tasks.",
};

const coreRootProductionImportPath = {
  name: "@agentplaneorg/core",
  message:
    "Production code must import from explicit @agentplaneorg/core subpaths: /commit, /config, /fs, /git, /logger, /process, /project, /schemas, or /tasks. Keep the root barrel only for external compatibility and test mocks.",
};

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      ".agentplane/**",
      "agentplane-recipes/**",
      "website/.docusaurus/**",
      "website/build/**",
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
      ...nRecommendedModuleRules,
      ...promisePlugin.configs.recommended.rules,
      ...unicornPlugin.configs.recommended.rules,
      ...prettierConfig.rules,

      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-process-exit": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-top-level-await": "off",
      "no-useless-assignment": "off",
      "preserve-caught-error": "off",
    },
  },

  {
    files: ["packages/agentplane/bin/agentplane.js"],
    rules: {
      "import/no-unresolved": "off",
      "n/no-missing-import": "off",
    },
  },

  {
    files: ["website/scripts/generate-social-images.mjs"],
    rules: {
      "import/no-unresolved": "off",
      "n/no-missing-import": "off",
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
          noWarnOnMultipleProjects: true,
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
      "no-useless-assignment": "off",
      "preserve-caught-error": "off",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],

      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: true }],
      "@typescript-eslint/no-unnecessary-type-assertion": "off",

      "no-restricted-imports": [
        "error",
        {
          paths: [coreSubpathRestrictedImportPath],
        },
      ],

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
      "no-restricted-imports": [
        "error",
        {
          paths: [coreSubpathRestrictedImportPath],
          patterns: testkitDeepImportPatterns.map((group) => ({
            group: [group],
            message:
              "Import test helpers through @agentplane/testkit instead of packages/testkit internals.",
          })),
        },
      ],
    },
  },

  {
    files: ["**/*.test-helpers.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program",
          message:
            "Do not add .test-helpers.ts files. Put shared test helpers in @agentplane/testkit or colocate them in a focused *.test.ts file.",
        },
      ],
    },
  },

  {
    files: ["packages/agentplane/src/**/*.ts", "packages/testkit/src/**/*.ts"],
    ignores: ["**/*.test.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [coreRootProductionImportPath],
        },
      ],
    },
  },

  {
    files: ["website/src/theme/*.tsx"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },

  {
    files: ["packages/core/src/**/*.{ts,tsx}", "packages/agentplane/src/shared/**/*.{ts,tsx}"],
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./packages/core/src",
              from: "./packages/agentplane/src",
              message: "Core package must stay independent from agentplane package internals.",
            },
            ...sharedBoundaryTargets.map((target) => ({
              target,
              from: "./packages/agentplane/src/shared",
              message: "Shared helpers must stay below command/runtime/backend adapter layers.",
            })),
          ],
        },
      ],
    },
  },

  {
    files: ["packages/agentplane/src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [coreRootProductionImportPath],
          patterns: sharedBoundaryPatterns.map((group) => ({
            group: [group],
            message: "Shared helpers must not import higher-level package layers.",
          })),
        },
      ],
    },
  },

  {
    files: [
      "packages/agentplane/src/shared/errors.ts",
      "packages/agentplane/src/cli/spec/errors.ts",
      "packages/agentplane/src/backends/task-backend/shared/errors.ts",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            coreRootProductionImportPath,
            {
              name: "../../cli/spec/errors.js",
              message:
                "Shared/runtime and backend error modules must not depend on CLI usage helpers.",
            },
            {
              name: "../../../cli/spec/errors.js",
              message: "Backend error modules must not depend on CLI usage helpers.",
            },
            {
              name: "../../backends/task-backend/shared/errors.js",
              message: "CLI/shared error modules must not depend on backend-local error types.",
            },
            {
              name: "../../../backends/task-backend/shared/errors.js",
              message: "CLI/shared error modules must not depend on backend-local error types.",
            },
          ],
        },
      ],
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
            coreRootProductionImportPath,
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
