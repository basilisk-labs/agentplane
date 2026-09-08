import { defineConfig, type Options } from "tsup";

const common: Options = {
  clean: false,
  dts: false,
  external: [
    "@agentplaneorg/core",
    "@agentplaneorg/core/*",
    "@agentplaneorg/recipes",
    "@agentplaneorg/recipes/*",
    "@clack/prompts",
    "yauzl",
    "zod",
    "zod-validation-error",
  ],
  format: ["esm"],
  minify: true,
  outDir: "dist",
  platform: "node",
  sourcemap: false,
  splitting: false,
  target: "node20",
  treeshake: true,
  tsconfig: "tsconfig.tsup.json",
};

export default defineConfig([
  {
    ...common,
    entry: {
      cli: "src/cli.ts",
      "command-catalog": "src/cli/run-cli/command-catalog.ts",
      "command-catalog/core-fast": "src/cli/run-cli/command-catalog/core-fast.ts",
      "command-catalog/task-read": "src/cli/run-cli/command-catalog/task-read.ts",
      "deferred-runtime": "src/cli/run-cli/deferred-runtime.ts",
    },
  },
  {
    ...common,
    entry: { "cli-bun": "src/cli-bun.ts" },
    // Bun rebundles this file. Preserve identifiers to avoid renamer collisions.
    minify: false,
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: false,
  },
]);
