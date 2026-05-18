import { defineConfig } from "tsup";

export default defineConfig({
  clean: false,
  dts: false,
  entry: {
    "commit/index": "src/commit/index.ts",
    "config/index": "src/config/index.ts",
    index: "src/index.ts",
    "fs/index": "src/fs/index.ts",
    "git/index": "src/git/index.ts",
    logger: "src/logger.ts",
    "process/index": "src/process/index.ts",
    "project/index": "src/project/index.ts",
    "schemas/index": "src/schemas/index.ts",
    "tasks/index": "src/tasks/index.ts",
  },
  external: ["execa", "yaml", "zod"],
  format: ["esm"],
  minify: true,
  outDir: "dist",
  platform: "node",
  sourcemap: false,
  splitting: true,
  target: "node20",
  treeshake: true,
  tsconfig: "tsconfig.tsup.json",
});
