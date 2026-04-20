import { defineConfig } from "tsup";

export default defineConfig({
  clean: false,
  dts: false,
  entry: {
    index: "src/index.ts",
    "fs/index": "src/fs/index.ts",
    "git/index": "src/git/index.ts",
    logger: "src/logger.ts",
    "process/index": "src/process/index.ts",
    "schemas/index": "src/schemas/index.ts",
    "tasks/index": "src/tasks/index.ts",
  },
  external: ["execa", "yaml", "zod", "zod-to-json-schema"],
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
