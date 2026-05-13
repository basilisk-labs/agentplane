import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export * from "./checks/run-vitest-suite.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const invokedAsScript =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(scriptPath);

if (invokedAsScript) {
  const targetPath = path.join(path.dirname(scriptPath), "checks", "run-vitest-suite.mjs");
  const result = spawnSync(process.execPath, [targetPath, ...process.argv.slice(2)], {
    stdio: "inherit",
  });
  process.exitCode = result.status ?? 1;
}
