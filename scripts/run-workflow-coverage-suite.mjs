import { spawn } from "node:child_process";

if (process.platform === "win32") {
  throw new Error(
    "test:workflow-coverage is supported only on POSIX shells (CI uses ubuntu-24.04).",
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
await runShell(
  "bunx vitest run packages/agentplane/src/workflow-runtime/*.test.ts packages/agentplane/src/harness/*.test.ts",
);
await runShell("bun run coverage:workflow-harness");
