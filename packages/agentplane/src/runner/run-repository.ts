import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../shared/errors.js";

import {
  appendRunnerEvent,
  readRunnerRunState,
  writePreparedRunnerArtifacts,
  writeRunnerRunState,
} from "./artifacts.js";
import {
  RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME,
  RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME,
  RUNNER_BLUEPRINT_PLAN_FILENAME,
  RUNNER_CONTEXT_MANIFEST_FILENAME,
  resolveTaskRunnerPaths,
} from "./task-run-paths.js";
import { readTraceArtifactText } from "./trace-artifacts.js";
import type {
  RunnerArtifactPaths,
  RunnerContextBundle,
  RunnerEvent,
  RunnerInvocation,
  RunnerRunRecord,
  RunnerRunState,
} from "./types.js";

function parseTimestamp(value: string | null | undefined): number {
  const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

export function parseRunnerEventsText(text: string): RunnerEvent[] {
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

async function readOptionalJson<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

async function readRequiredText(opts: {
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

export function assertRunnerBundleMatchesTask(
  bundle: RunnerContextBundle,
  taskId: string,
  runId: string,
): void {
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

export class RunnerRunRepository {
  constructor(readonly paths: RunnerArtifactPaths) {}

  static forTaskRun(opts: {
    git_root: string;
    workflow_dir: string;
    task_id: string;
    run_id: string;
  }): RunnerRunRepository {
    return new RunnerRunRepository(
      resolveTaskRunnerPaths({
        git_root: opts.git_root,
        workflow_dir: opts.workflow_dir,
        task_id: opts.task_id,
        run_id: opts.run_id,
      }),
    );
  }

  static fromBundle(bundle: RunnerContextBundle): RunnerRunRepository {
    return new RunnerRunRepository(bundle.execution.artifact_paths);
  }

  static fromInvocation(invocation: RunnerInvocation): RunnerRunRepository {
    return new RunnerRunRepository({
      run_dir: invocation.run_dir,
      bundle_path: invocation.bundle_path,
      blueprint_plan_path: path.join(invocation.run_dir, RUNNER_BLUEPRINT_PLAN_FILENAME),
      blueprint_execution_plan_path: path.join(
        invocation.run_dir,
        RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME,
      ),
      blueprint_execution_state_path: path.join(
        invocation.run_dir,
        RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME,
      ),
      context_manifest_path: path.join(invocation.run_dir, RUNNER_CONTEXT_MANIFEST_FILENAME),
      bootstrap_path: invocation.bootstrap_path ?? "",
      state_path: invocation.state_path,
      events_path: invocation.events_path,
      result_path: invocation.result_path,
      trace_path: invocation.trace_path,
      stderr_path: invocation.stderr_path,
    });
  }

  async writePrepared(opts: {
    bundle: RunnerContextBundle;
    bootstrap_markdown?: string;
    created_at?: string;
    invocation?: RunnerInvocation;
  }): Promise<RunnerRunState> {
    return await writePreparedRunnerArtifacts(opts);
  }

  async readBundle(): Promise<RunnerContextBundle | null> {
    return await readOptionalJson<RunnerContextBundle>(this.paths.bundle_path);
  }

  async readState(): Promise<RunnerRunState | null> {
    return await readRunnerRunState(this.paths.state_path);
  }

  async readRecord(): Promise<RunnerRunRecord | null> {
    const [bundle, state] = await Promise.all([this.readBundle(), this.readState()]);
    if (!bundle || !state) return null;
    return {
      bundle,
      state,
      result: state.result ?? null,
    };
  }

  async readRequiredRecord(opts: { task_id: string; run_id: string }): Promise<RunnerRunRecord> {
    const record = await this.readRecord();
    if (!record) {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `Runner artifact not found for ${opts.task_id}:${opts.run_id}`,
      });
    }
    assertRunnerBundleMatchesTask(record.bundle, opts.task_id, opts.run_id);
    return record;
  }

  async writeState(state: RunnerRunState): Promise<void> {
    await writeRunnerRunState({
      state_path: this.paths.state_path,
      state,
    });
  }

  async appendEvent(event: RunnerEvent): Promise<void> {
    await appendRunnerEvent({
      events_path: this.paths.events_path,
      event,
    });
  }

  async readEventsTextRequired(opts: { task_id: string; run_id: string }): Promise<string> {
    return await readRequiredText({
      file_path: this.paths.events_path,
      task_id: opts.task_id,
      run_id: opts.run_id,
      artifact_label: "events",
    });
  }

  async readEventsRequired(opts: {
    task_id: string;
    run_id: string;
  }): Promise<{ events_text: string; events: RunnerEvent[] }> {
    const events_text = await this.readEventsTextRequired(opts);
    return {
      events_text,
      events: parseRunnerEventsText(events_text),
    };
  }

  async readTraceTextRequired(opts: { task_id: string; run_id: string }): Promise<string> {
    try {
      return await readTraceArtifactText(this.paths.trace_path);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException | null)?.code;
      if (code === "ENOENT") {
        throw new CliError({
          exitCode: 4,
          code: "E_IO",
          message:
            `Runner artifact not found for ${opts.task_id}:${opts.run_id} ` +
            `(trace at ${this.paths.trace_path} or ${this.paths.trace_path}.gz)`,
        });
      }
      throw err;
    }
  }
}

export async function resolveLatestRunnerRunId(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
}): Promise<string> {
  const runsDir = path.join(opts.git_root, opts.workflow_dir, opts.task_id, "runs");
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
      const repository = RunnerRunRepository.forTaskRun({
        git_root: opts.git_root,
        workflow_dir: opts.workflow_dir,
        task_id: opts.task_id,
        run_id: runId,
      });
      const state = await repository.readState();
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
