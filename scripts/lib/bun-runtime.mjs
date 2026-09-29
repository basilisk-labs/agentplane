import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

export function assertPinnedBunRuntime(repoRoot = process.cwd(), env = process.env) {
  const manifest = JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  const pin = /^bun@(\d+\.\d+\.\d+(?:-[\w.-]+)?)$/u.exec(manifest.packageManager ?? "")?.[1];
  if (!pin) throw new Error("Local CI requires an exact Bun version in packageManager.");
  const actual = execFileSync("bun", ["--version"], {
    cwd: repoRoot,
    env,
    encoding: "utf8",
    timeout: 10_000,
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
  if (actual !== pin) {
    throw new Error(
      `Bun runtime mismatch: packageManager requires ${pin}; PATH resolves ${actual}. Select Bun ${pin} before running local CI.`,
    );
  }
  return actual;
}
