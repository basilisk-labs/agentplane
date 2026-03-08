import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

if (process.platform === "win32") {
  throw new Error(
    "test:significant-coverage is supported only on POSIX shells (CI uses ubuntu-24.04).",
  );
}

function runShell(command) {
  return new Promise((resolve, reject) => {
    const child = spawn("bash", ["-lc", command], {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
    });
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(
        new Error(`bash runner failed with code ${code ?? "null"} signal ${signal ?? "none"}`),
      );
    });
    child.on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForStableCoverageReport() {
  const reportPath = path.join(process.cwd(), "coverage", "coverage-final.json");
  let lastSize = -1;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const info = await stat(reportPath);
      if (info.size > 0 && info.size === lastSize) return;
      lastSize = info.size;
    } catch {
      lastSize = -1;
    }
    await sleep(250);
  }

  throw new Error(
    "coverage-final.json did not stabilize before significant coverage threshold check",
  );
}

async function ensureCoverageTempDir() {
  await mkdir(path.join(process.cwd(), "coverage", ".tmp"), { recursive: true });
}

await ensureCoverageTempDir();
await runShell(
  "bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=json --coverage.include='packages/agentplane/src/commands/guard/**'",
);
await waitForStableCoverageReport();
await runShell("bun run coverage:significant");
