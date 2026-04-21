import { defineConfig } from "tsup";

export default defineConfig({
  clean: false,
  dts: false,
  entry: {
    cli: "src/cli.ts",
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
