import { spawn } from "node:child_process";

if (process.platform === "win32") {
  throw new Error(
    "coverage:significant-suite is supported only on POSIX shells (CI uses ubuntu-24.04).",
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
await runShell("node scripts/run-vitest-suite.mjs significant-coverage");
await runShell("bun run coverage:significant");
