import { spawn } from "node:child_process";

const DEFAULT_OUTPUT_TAIL_BYTES = 256 * 1024;
const DEFAULT_GROUP_TIMEOUT_MS = 15 * 60_000;
const DEFAULT_KILL_GRACE_MS = 2000;

function appendTail(current, chunk, limit) {
  const next = `${current}${String(chunk)}`;
  return next.length <= limit ? next : next.slice(-limit);
}

function runOne(group, options) {
  return new Promise((resolve) => {
    const started = performance.now();
    const child = spawn(group.command, group.args ?? [], {
      cwd: options.cwd,
      env: options.env,
      detached: process.platform !== "win32",
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;
    let killTimer = null;
    const outputLimit = options.outputTailBytes ?? DEFAULT_OUTPUT_TAIL_BYTES;
    const timeoutMs = Math.max(1, Math.trunc(group.timeoutMs ?? options.timeoutMs));
    const terminate = (signal) => {
      if (!child.pid) return child.kill(signal);
      try {
        if (process.platform === "win32") return child.kill(signal);
        process.kill(-child.pid, signal);
        return true;
      } catch {
        return child.kill(signal);
      }
    };
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutTimer);
      if (killTimer) clearTimeout(killTimer);
      resolve(result);
    };
    const timeoutTimer = setTimeout(() => {
      timedOut = true;
      killTimer = setTimeout(() => terminate("SIGKILL"), options.killGraceMs);
      killTimer.unref();
      terminate("SIGTERM");
    }, timeoutMs);
    timeoutTimer.unref();
    child.stdout.on("data", (chunk) => (stdout = appendTail(stdout, chunk, outputLimit)));
    child.stderr.on("data", (chunk) => (stderr = appendTail(stderr, chunk, outputLimit)));
    child.on("error", (error) => {
      finish({
        id: group.id,
        exit_code: 1,
        timed_out: false,
        duration_ms: Math.round(performance.now() - started),
        stdout,
        stderr: `${stderr}${error.message}\n`,
      });
    });
    child.on("close", (code) => {
      finish({
        id: group.id,
        exit_code: timedOut ? 124 : (code ?? 1),
        timed_out: timedOut,
        duration_ms: Math.round(performance.now() - started),
        stdout,
        stderr,
      });
    });
  });
}

export async function runVerificationGroups(groups, options = {}) {
  const concurrency = Math.max(1, Math.trunc(options.concurrency ?? groups.length ?? 1));
  const results = Array.from({ length: groups.length });
  let cursor = 0;
  async function worker() {
    while (cursor < groups.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await runOne(groups[index], {
        cwd: options.cwd ?? process.cwd(),
        env: { ...(options.env ?? process.env), ...(groups[index].env ?? {}) },
        timeoutMs: options.timeoutMs ?? DEFAULT_GROUP_TIMEOUT_MS,
        killGraceMs: options.killGraceMs ?? DEFAULT_KILL_GRACE_MS,
        outputTailBytes: options.outputTailBytes,
      });
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, groups.length) }, () => worker()));
  return {
    schema_version: 1,
    kind: "verification_group_result",
    ok: results.every((result) => result.exit_code === 0),
    results,
  };
}
