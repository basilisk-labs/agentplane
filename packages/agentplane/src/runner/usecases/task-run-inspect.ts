import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { readRunnerRunState } from "../artifacts.js";
import { resolveTaskRunnerPaths, type TaskRunnerPaths } from "../task-run-paths.js";
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

function parseTimestamp(value: string | null | undefined): number {
  const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

async function readRunnerBundle(bundlePath: string): Promise<RunnerContextBundle | null> {
  try {
    return JSON.parse(await readFile(bundlePath, "utf8")) as RunnerContextBundle;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

function parseRunnerEvents(text: string): RunnerEvent[] {
  return text
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as RunnerEvent];
      } catch {
        return [];
      }
    });
}

function assertBundleMatchesTask(bundle: RunnerContextBundle, taskId: string, runId: string): void {
  const bundleTaskId =
    bundle.task?.task_id ??
    (bundle.target.kind === "task" ? bundle.target.task_id : (bundle.target.task_id ?? null));
  if (bundle.execution.run_id !== runId) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner bundle/run mismatch for ${taskId}:${runId} (bundle.run_id=${bundle.execution.run_id})`,
    });
  }
  if (!bundleTaskId || bundleTaskId !== taskId) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner bundle/task mismatch for ${taskId}:${runId}`,
    });
  }
}

async function readRequiredArtifactText(opts: {
  file_path: string;
  task_id: string;
  run_id: string;
  artifact_label: string;
}): Promise<string> {
  try {
    return await readFile(opts.file_path, "utf8");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message:
          `Runner artifact not found for ${opts.task_id}:${opts.run_id} ` +
          `(${opts.artifact_label} at ${opts.file_path})`,
      });
    }
    throw err;
  }
}

async function resolveLatestRunId(opts: { ctx: CommandContext; task_id: string }): Promise<string> {
  const runsDir = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.task_id,
    "runs",
  );
  let entries: string[] = [];
  try {
    const runEntries = await readdir(runsDir, { withFileTypes: true });
    entries = runEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `No runner runs found for task ${opts.task_id}`,
      });
    }
    throw err;
  }

  const candidates = await Promise.all(
    entries.map(async (runId) => {
      const paths = resolveTaskRunnerPaths({
        git_root: opts.ctx.resolvedProject.gitRoot,
        workflow_dir: opts.ctx.config.paths.workflow_dir,
        task_id: opts.task_id,
        run_id: runId,
      });
      const state = await readRunnerRunState(paths.state_path);
      if (!state) return null;
      return {
        run_id: runId,
        updated_at: parseTimestamp(state.updated_at),
        created_at: parseTimestamp(state.created_at),
      };
    }),
  );

  const latest = candidates
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .toSorted(
      (left, right) =>
        right.updated_at - left.updated_at ||
        right.created_at - left.created_at ||
        right.run_id.localeCompare(left.run_id),
    )[0];
  if (!latest) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `No runner runs found for task ${opts.task_id}`,
    });
  }
  return latest.run_id;
}

export async function loadTaskRunnerInspection(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
}): Promise<LoadedTaskRunnerInspection> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const task = await ctx.taskBackend.getTask(opts.task_id);
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
      : await resolveLatestRunId({ ctx, task_id: opts.task_id });
  const paths = resolveTaskRunnerPaths({
    git_root: ctx.resolvedProject.gitRoot,
    workflow_dir: ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: runId,
  });
  const [bundle, state, eventsText] = await Promise.all([
    readRunnerBundle(paths.bundle_path),
    readRunnerRunState(paths.state_path),
    readRequiredArtifactText({
      file_path: paths.events_path,
      task_id: opts.task_id,
      run_id: runId,
      artifact_label: "events",
    }),
  ]);
  if (!bundle || !state) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner artifacts not found for ${opts.task_id}:${runId}`,
    });
  }
  assertBundleMatchesTask(bundle, opts.task_id, runId);

  return {
    ctx,
    task_id: opts.task_id,
    run_id: runId,
    selection: opts.run_id ? "explicit" : "latest",
    paths,
    bundle,
    state,
    events: parseRunnerEvents(eventsText),
    events_text: eventsText,
  };
}

export async function readTaskRunnerTraceArtifact(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
}): Promise<LoadedTaskRunnerInspection & { trace_text: string }> {
  const inspection = await loadTaskRunnerInspection(opts);
  const trace_text = await readRequiredArtifactText({
    file_path: inspection.paths.trace_path,
    task_id: inspection.task_id,
    run_id: inspection.run_id,
    artifact_label: "trace",
  });
  return {
    ...inspection,
    trace_text,
  };
}

export async function readTaskRunnerTraceTail(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
  lines: number;
}): Promise<LoadedTaskRunnerInspection & { tail_text: string }> {
  const traced = await readTaskRunnerTraceArtifact(opts);
  const lines = traced.trace_text.split(/\r?\n/u);
  if (lines.at(-1) === "") {
    lines.pop();
  }
  const tail = lines.slice(-opts.lines);
  return {
    ...traced,
    tail_text: tail.length > 0 ? `${tail.join("\n")}\n` : "",
  };
}
