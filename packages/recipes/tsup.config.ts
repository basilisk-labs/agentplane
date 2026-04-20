import { defineConfig } from "tsup";

export default defineConfig({
  clean: false,
  dts: false,
  entry: {
    index: "src/index.ts",
  },
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
