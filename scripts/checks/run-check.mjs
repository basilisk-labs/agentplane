import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

// `bun run check`: the fast local CI gate with conservative concurrency defaults.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const verificationEnv = { ...process.env };
verificationEnv.AGENTPLANE_FAST_VITEST_MAX_WORKERS ??= "2";
verificationEnv.AGENTPLANE_LOCAL_CI_GROUP_CONCURRENCY ??= "1";
verificationEnv.AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS ??= "1800000";

const result = spawnSync("bun", ["run", "ci:local:fast"], {
  cwd: repoRoot,
  env: verificationEnv,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
