import { defineConfig } from "tsup";

export default defineConfig({
  clean: false,
  dts: false,
  entry: {
    "cli-bun": "src/cli-bun.ts",
    cli: "src/cli.ts",
    "command-catalog": "src/cli/run-cli/command-catalog.ts",
    "command-catalog/core-fast": "src/cli/run-cli/command-catalog/core-fast.ts",
    "command-catalog/task-read": "src/cli/run-cli/command-catalog/task-read.ts",
    "deferred-runtime": "src/cli/run-cli/deferred-runtime.ts",
  },
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
});
