/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Cycles make package boundaries harder to enforce and refactor.",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "no-command-catalog-cycles",
      severity: "error",
      comment: "The command catalog is a registry fan-in and must not participate in cycles.",
      from: {},
      to: {
        path: "^packages/agentplane/src/cli/run-cli/command-catalog",
        circular: true,
      },
    },
    {
      name: "not-to-unresolvable",
      severity: "error",
      comment: "Every import in the cruised source graph must resolve.",
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: "core-is-lower-layer",
      severity: "error",
      comment: "@agentplaneorg/core must not depend on CLI, recipes, or testkit implementation.",
      from: {
        path: "^packages/core/src/",
      },
      to: {
        path: "^packages/(agentplane|recipes|testkit)/src/",
      },
    },
    {
      name: "recipes-stays-framework-agnostic",
      severity: "error",
      comment: "@agentplaneorg/recipes must not depend on CLI or testkit implementation.",
      from: {
        path: "^packages/recipes/src/",
      },
      to: {
        path: "^packages/(agentplane|testkit)/src/",
      },
    },
    {
      name: "agentplane-runtime-does-not-import-testkit",
      severity: "error",
      comment: "agentplane runtime source must not import @agentplane/testkit.",
      from: {
        path: "^packages/agentplane/src/",
        pathNot: "\\.test\\.ts$",
      },
      to: {
        path: "^packages/testkit/src/",
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
      dependencyTypes: ["npm", "npm-dev", "npm-optional", "npm-peer", "npm-bundled", "npm-no-pkg"],
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["types", "import", "default", "node"],
      extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"],
    },
    tsConfig: {
      fileName: "tsconfig.json",
    },
  },
};
