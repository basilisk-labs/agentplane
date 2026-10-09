import { spawn } from "node:child_process";
import { once } from "node:events";

const DEFAULT_OUTPUT_TAIL_BYTES = 256 * 1024;
const DEFAULT_GROUP_TIMEOUT_MS = 15 * 60_000;
const DEFAULT_KILL_GRACE_MS = 2000;

function appendTail(current, chunk, limit) {
  const next = `${current}${String(chunk)}`;
  return next.length <= limit ? next : next.slice(-limit);
}

export function classifyVerificationGroupFailure(result) {
  if (result.exit_code === 0) return null;
  if (result.timed_out || result.exit_code === 124) return "timeout";
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (
    /JavaScript heap out of memory|FATAL ERROR: Ineffective mark-compacts|Allocation failed - JavaScript heap out of memory/iu.test(
      output,
    )
  ) {
    return "out_of_memory";
  }
  if (
    /\b(?:AssertionError|Test Files\s+\d+ failed|Tests\s+\d+ failed)\b|^\s*FAIL\s+/imu.test(output)
  ) {
    return "assertion_failure";
  }
  if (/\b(?:EAI_AGAIN|ECONNRESET|ETIMEDOUT|ENOTFOUND|EHOSTUNREACH)\b/u.test(output)) {
    return "infrastructure_failure";
  }
  return "command_failure";
}

function runOne(group, options) {
  return new Promise((resolve) => {
    const started = performance.now();
    const startedAtMs = Date.now();
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
      resolve({ ...result, failure_kind: classifyVerificationGroupFailure(result) });
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
        started_at_ms: startedAtMs,
        finished_at_ms: Date.now(),
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
        started_at_ms: startedAtMs,
        finished_at_ms: Date.now(),
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

export function summarizeVerificationGroupResults(results) {
  return {
    schema_version: 1,
    kind: "verification_group_summary",
    ok: results.every((result) => result.exit_code === 0),
    groups: results.map((result) => ({
      id: result.id,
      exit_code: result.exit_code,
      timed_out: result.timed_out,
      duration_ms: result.duration_ms,
    })),
  };
}

async function writeStreamChunk(stream, chunk) {
  if (!chunk || stream.write(chunk)) return;
  await once(stream, "drain");
}

export async function writeVerificationGroupResults(results, options = {}) {
  const stdout = options.stdout ?? process.stdout;
  const stderr = options.stderr ?? process.stderr;
  for (const group of results) {
    await writeStreamChunk(stdout, `\n== ${group.id} (${group.duration_ms}ms) ==\n`);
    await writeStreamChunk(stdout, group.stdout);
    await writeStreamChunk(stderr, group.stderr);
  }
  const failures = results
    .filter((result) => result.exit_code !== 0)
    .map((result) => ({
      id: result.id,
      failure_kind: result.failure_kind ?? classifyVerificationGroupFailure(result),
    }));
  if (failures.length > 0) {
    const details = `${JSON.stringify({
      schema_version: 1,
      kind: "verification_group_failure_classification",
      groups: failures,
    })}\n`;
    await writeStreamChunk(stdout, details);
    await writeStreamChunk(stderr, details);
  }
  const summary = summarizeVerificationGroupResults(results);
  const serialized = `${JSON.stringify(summary)}\n`;
  await writeStreamChunk(stdout, serialized);
  if (!summary.ok) await writeStreamChunk(stderr, serialized);
  return summary;
}
