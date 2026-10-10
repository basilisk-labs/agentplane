import { spawn } from "node:child_process";
import { isolatedCommand } from "./isolation.mjs";

export function runBrokerWorker(policyPath, argv, { timeout, signal }) {
  return new Promise((resolve) => {
    const child = spawn("python3", isolatedCommand(policyPath, argv), {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: { PATH: "/usr/bin:/bin", LANG: "C.UTF-8", TZ: "UTC" },
    });
    const buffers = { stdout: [], stderr: [] };
    let bytes = 0;
    let error = null;
    const kill = () => {
      if (!child.pid) return;
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch (error_) {
        if (error_.code !== "ESRCH") error ??= "WORKER_TERMINATION_FAILED";
      }
    };
    const abort = () => {
      error ??= "ABORT_ERR";
      kill();
    };
    const timer = setTimeout(() => {
      error ??= "ETIMEDOUT";
      kill();
    }, timeout);
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    for (const name of ["stdout", "stderr"])
      child[name].on("data", (chunk) => {
        const room = Math.max(0, 1024 * 1024 - bytes);
        buffers[name].push(chunk.subarray(0, room));
        bytes += chunk.length;
        if (bytes > 1024 * 1024) {
          error ??= "OUTPUT_LIMIT";
          kill();
        }
      });
    child.on("error", () => {
      error ??= "WORKER_START_FAILED";
    });
    child.once("close", (status, exitSignal) => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      kill(); // A successful parent must not leave descendants running.
      resolve({
        status,
        signal: exitSignal,
        error,
        stdout: Buffer.concat(buffers.stdout).toString("utf8"),
        stderr: Buffer.concat(buffers.stderr).toString("utf8"),
      });
    });
  });
}
