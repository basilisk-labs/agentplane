import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";
import {
  createVerificationObservation,
  verificationRedactor,
} from "./verification-observation.mjs";

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
    const startedAtMs = Date.now();
    const timeoutMs = Math.max(1, Math.trunc(group.timeoutMs ?? options.timeoutMs));
    const redact = verificationRedactor(options.env, options.cwd);
    let observation;
    let unavailable;
    const observationDirectory =
      options.observationDirectory ?? options.env.AGENTPLANE_VERIFICATION_OBSERVATION_DIR;
    if (observationDirectory) {
      try {
        observation = createVerificationObservation({
          directory: observationDirectory,
          budgetDirectory: options.env.AGENTPLANE_VERIFICATION_BUDGET_DIR,
          binding: {
            kind: "verification_group",
            command: JSON.stringify([group.command, ...(group.args ?? [])]),
            deadline_ms: startedAtMs + timeoutMs,
            implementation: options.env.AGENTPLANE_VERIFICATION_IMPLEMENTATION ?? "unavailable",
            parent_run_id: options.env.AGENTPLANE_VERIFICATION_PARENT_RUN_ID,
            runtime: { node: process.version, platform: process.platform, arch: process.arch },
          },
          env: options.env,
          cwd: options.cwd,
          heartbeatMs: options.heartbeatMs,
          maxRuns: 64,
        });
      } catch {
        unavailable = { status: "unavailable", reason: "observation admission failed" };
      }
    }
    const child = spawn(group.command, group.args ?? [], {
      cwd: options.cwd,
      env: {
        ...options.env,
        ...(observation
          ? {
              AGENTPLANE_VERIFICATION_OBSERVATION_DIR: path.join(observation.directory, "children"),
              AGENTPLANE_VERIFICATION_PARENT_RUN_ID: observation.runId,
              AGENTPLANE_VERIFICATION_BUDGET_DIR: observation.budgetDirectory,
            }
          : {}),
      },
      detached: process.platform !== "win32",
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let cancelled = false;
    let settled = false;
    let killTimer = null;
    const outputLimit = options.outputTailBytes ?? DEFAULT_OUTPUT_TAIL_BYTES;
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
      options.signal?.removeEventListener("abort", abort);
      const evidence = observation?.finish(
        cancelled
          ? "cancelled"
          : timedOut
            ? "timed_out"
            : result.exit_code === 0
              ? "passed"
              : "failed",
        { exit_code: result.exit_code, group_id: group.id },
      );
      resolve({
        ...result,
        cancelled,
        stdout: observation ? observation.tail("stdout") : redact(result.stdout),
        stderr: observation ? observation.tail("stderr") : redact(result.stderr),
        ...(evidence || unavailable ? { observation: evidence ?? unavailable } : {}),
      });
    };
    const abort = () => {
      cancelled = true;
      killTimer = setTimeout(() => terminate("SIGKILL"), options.killGraceMs);
      killTimer.unref();
      terminate("SIGTERM");
    };
    options.signal?.addEventListener("abort", abort, { once: true });
    if (options.signal?.aborted) abort();
    const timeoutTimer = setTimeout(() => {
      timedOut = true;
      killTimer = setTimeout(() => terminate("SIGKILL"), options.killGraceMs);
      killTimer.unref();
      terminate("SIGTERM");
    }, timeoutMs);
    timeoutTimer.unref();
    child.stdout.on("data", (chunk) => {
      observation?.write("stdout", chunk);
      stdout = appendTail(stdout, chunk, outputLimit);
    });
    child.stderr.on("data", (chunk) => {
      observation?.write("stderr", chunk);
      stderr = appendTail(stderr, chunk, outputLimit);
    });
    child.on("error", (error) => {
      observation?.write("stderr", error.message);
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
        exit_code: cancelled ? 130 : timedOut ? 124 : (code ?? 1),
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
        observationDirectory: options.observationDirectory,
        heartbeatMs: options.heartbeatMs,
        signal: options.signal,
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
      ...(result.observation ? { observation: result.observation } : {}),
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
  const summary = summarizeVerificationGroupResults(results);
  const serialized = `${JSON.stringify(summary)}\n`;
  await writeStreamChunk(stdout, serialized);
  if (!summary.ok) await writeStreamChunk(stderr, serialized);
  return summary;
}
