import { lstat } from "node:fs/promises";

import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import { resolveLatestRunnerRunId, RunnerRunRepository } from "../run-repository.js";
import { resolveTaskRunnerPaths, type TaskRunnerPaths } from "../task-run-paths.js";
import { compressedTraceArtifactPath, readTraceArtifactText } from "../trace-artifacts.js";
import type { RunnerContextBundle, RunnerEvent, RunnerRunState } from "../types.js";

export type LoadedTaskRunnerInspection = {
  ctx: CommandContext;
  task_id: string;
  run_id: string;
  selection: "explicit" | "latest";
  paths: TaskRunnerPaths;
  bundle: RunnerContextBundle;
  state: RunnerRunState;
  events: RunnerEvent[];
  events_text: string;
};

export type TaskRunnerActivityHealth = "active" | "idle" | "exited" | "unknown";

export type TaskRunnerActivityInspection = {
  last_trace_at: string | null;
  last_trace_seq: number | null;
  seconds_since_activity: number | null;
  health: TaskRunnerActivityHealth;
};

export type TaskRunnerProcessLiveness = boolean | null;

function parsedTimestamp(value: string | null | undefined): number | null {
  if (typeof value !== "string") return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function latestTimestamp(values: readonly (string | null | undefined)[]): string | null {
  let latest: { value: string; parsed: number } | null = null;
  for (const value of values) {
    const parsed = parsedTimestamp(value);
    if (typeof value === "string" && parsed !== null && (!latest || parsed > latest.parsed)) {
      latest = { value, parsed };
    }
  }
  return latest?.value ?? null;
}

async function readActivityText(filePath: string): Promise<string> {
  try {
    return await readTraceArtifactText(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return "";
    throw error;
  }
}

async function artifactModifiedAt(filePath: string, hasContent: boolean): Promise<string | null> {
  if (!hasContent) return null;
  for (const candidate of [filePath, compressedTraceArtifactPath(filePath)]) {
    try {
      const stats = await lstat(candidate);
      if (stats.isFile() && !stats.isSymbolicLink() && stats.size > 0) {
        return stats.mtime.toISOString();
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
    }
  }
  return null;
}

function latestTraceRecord(traceText: string): { at: string | null; seq: number | null } {
  let latestAt: string | null = null;
  let latestSeq: number | null = null;
  for (const line of traceText.split("\n")) {
    if (!line.trim()) continue;
    try {
      const record = JSON.parse(line) as { ts?: unknown; seq?: unknown };
      if (typeof record.ts === "string" && parsedTimestamp(record.ts) !== null) {
        latestAt = latestTimestamp([latestAt, record.ts]);
      }
      if (typeof record.seq === "number" && Number.isSafeInteger(record.seq)) {
        latestSeq = latestSeq === null ? record.seq : Math.max(latestSeq, record.seq);
      }
    } catch {
      // A partial final JSONL record must not hide earlier durable activity.
    }
  }
  return { at: latestAt, seq: latestSeq };
}

export async function inspectTaskRunnerActivity(opts: {
  inspection: LoadedTaskRunnerInspection;
  process_liveness: TaskRunnerProcessLiveness;
  now_ms?: number;
}): Promise<TaskRunnerActivityInspection> {
  const { inspection } = opts;
  const [traceText, stderrText] = await Promise.all([
    readActivityText(inspection.paths.trace_path),
    readActivityText(inspection.paths.stderr_path),
  ]);
  const traceRecord = latestTraceRecord(traceText);
  const [traceModifiedAt, stderrModifiedAt] = await Promise.all([
    artifactModifiedAt(inspection.paths.trace_path, traceText.length > 0),
    artifactModifiedAt(inspection.paths.stderr_path, stderrText.length > 0),
  ]);
  const lastTraceAt = latestTimestamp([traceRecord.at, traceModifiedAt]);
  const lastActivityAt = latestTimestamp([
    lastTraceAt,
    stderrModifiedAt,
    inspection.state.supervision?.heartbeat_at,
    inspection.state.updated_at,
    inspection.state.created_at,
  ]);
  const lastActivityMs = parsedTimestamp(lastActivityAt);
  const nowMs = opts.now_ms ?? Date.now();
  const secondsSinceActivity =
    lastActivityMs === null ? null : Math.max(0, Math.floor((nowMs - lastActivityMs) / 1000));
  const idleMs = inspection.state.timeout_policy?.idle_ms;
  const recentActivity =
    lastActivityMs !== null &&
    typeof idleMs === "number" &&
    idleMs > 0 &&
    nowMs - lastActivityMs <= idleMs;
  const terminal = ["success", "failed", "blocked", "cancelled"].includes(inspection.state.status);
  let health: TaskRunnerActivityHealth;
  if (terminal) health = "exited";
  else if (recentActivity || opts.process_liveness === true) health = "active";
  else if (opts.process_liveness === false) health = "exited";
  else if (lastActivityMs !== null && typeof idleMs === "number" && idleMs > 0) health = "idle";
  else health = "unknown";

  return {
    last_trace_at: lastTraceAt,
    last_trace_seq: traceRecord.seq,
    seconds_since_activity: secondsSinceActivity,
    health,
  };
}

export async function loadTaskRunnerInspection(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
}): Promise<LoadedTaskRunnerInspection> {
  const command =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const executionContext = await makeReadOnlyExecutionContext(command);
  const task = await executionContext.backend.task_backend.getTask(opts.task_id);
  if (!task) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Task not found: ${opts.task_id}`,
    });
  }

  const runId =
    typeof opts.run_id === "string" && opts.run_id.trim().length > 0
      ? opts.run_id
      : await resolveLatestRunnerRunId({
          git_root: executionContext.repo.git_root,
          workflow_dir: executionContext.repo.workflow_dir,
          task_id: opts.task_id,
        });
  const paths = resolveTaskRunnerPaths({
    git_root: executionContext.repo.git_root,
    workflow_dir: executionContext.repo.workflow_dir,
    task_id: opts.task_id,
    run_id: runId,
  });
  const repository = new RunnerRunRepository(paths);
  const [record, eventsData] = await Promise.all([
    repository.readRequiredRecord({
      task_id: opts.task_id,
      run_id: runId,
    }),
    repository.readEventsRequired({
      task_id: opts.task_id,
      run_id: runId,
    }),
  ]);

  return {
    ctx: executionContext.command,
    task_id: opts.task_id,
    run_id: runId,
    selection: opts.run_id ? "explicit" : "latest",
    paths,
    bundle: record.bundle,
    state: record.state,
    events: eventsData.events,
    events_text: eventsData.events_text,
  };
}
