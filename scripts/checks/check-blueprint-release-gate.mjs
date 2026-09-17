import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checks = ["no-blueprint-engine.test.mjs", "no-blueprint-cursor.test.mjs"].map((file) =>
  path.join(repoRoot, "scripts", "checks", file),
);
const result = spawnSync(process.execPath, ["--test", ...checks], {
  cwd: repoRoot,
  encoding: "utf8",
  stdio: "inherit",
});
if (result.error) throw result.error;
if (result.status !== 0) process.exitCode = result.status ?? 1;
