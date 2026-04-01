import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { createRunnerAdapter } from "../adapters/index.js";
import { runnerAdapterCancelledResult } from "../adapters/shared.js";
import { evolveRunnerRunState } from "../artifacts.js";
import { isProcessAlive, readObservedProcessIdentity } from "../process-supervision.js";
import { assertRunnerBundleMatchesTask, RunnerRunRepository } from "../run-repository.js";
import type {
  RunnerContextBundle,
  RunnerLifecycleStatus,
  RunnerProcessSignal,
  RunnerResult,
  RunnerRunState,
} from "../types.js";

import {
  assertRunnerTaskExecutable,
  type ExecutedTaskRunnerExecution,
  type PreparedTaskRunnerExecution,
} from "./task-run.js";

export type LoadedRunnerExecution = PreparedTaskRunnerExecution & {
  ctx: CommandContext;
  state: RunnerRunState;
  repository: RunnerRunRepository;
};

export type CancelledTaskRunnerExecution = LoadedRunnerExecution & {
  previous_status: RunnerLifecycleStatus;
  changed: boolean;
};

export type ResumedTaskRunnerExecution = LoadedRunnerExecution & {
  previous_status: RunnerLifecycleStatus;
  result: RunnerResult;
};

export type RetriedTaskRunnerExecution = ExecutedTaskRunnerExecution & {
  ctx: CommandContext;
  source_run_id: string;
  source_status: RunnerLifecycleStatus;
};

function normalizeTaskStatus(task: TaskData): string {
  return String(task.status || "TODO")
    .trim()
    .toUpperCase();
}

function assertCurrentTaskDoing(taskId: string, task: TaskData | null): void {
  if (!task) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Task not found: ${taskId}`,
    });
  }
  const status = normalizeTaskStatus(task);
  if (status === "DOING") return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `${taskId}: runner lifecycle commands require task status DOING ` +
      `(current=${JSON.stringify(status)}; use \`agentplane task start-ready ${taskId} --author <ROLE> --body "Start: ..."\` first).`,
  });
}

export function assertExecuteMode(bundle: RunnerContextBundle, action: "resume" | "retry"): void {
  if (bundle.execution.mode === "execute") return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `runner ${action} requires an execute-mode run ` +
      `(current=${JSON.stringify(bundle.execution.mode)}; dry-run artifacts cannot be ${action}d).`,
  });
}

export function readRunningPid(state: RunnerRunState): number | null {
  return typeof state.supervision?.pid === "number" ? state.supervision.pid : null;
}

function normalizeCommandFingerprint(command: string | null | undefined): string | null {
  const firstToken = command?.trim().split(/\s+/u)[0] ?? "";
  return firstToken ? path.basename(firstToken) : null;
}

function commandMatchesFingerprint(
  expected: string | null | undefined,
  observedCommand: string | null | undefined,
): boolean {
  const expectedFingerprint = normalizeCommandFingerprint(expected);
  if (!expectedFingerprint || !observedCommand) return false;
  return observedCommand.includes(expectedFingerprint);
}

function startedAtMatches(expected: string | null | undefined, observed: string | null): boolean {
  const expectedMs = expected ? Date.parse(expected) : Number.NaN;
  const observedMs = observed ? Date.parse(observed) : Number.NaN;
  if (Number.isNaN(expectedMs) || Number.isNaN(observedMs)) return false;
  return Math.abs(expectedMs - observedMs) <= 5000;
}

export async function assertMatchingProcessIdentity(opts: {
  task_id: string;
  run_id: string;
  state: RunnerRunState;
  pid: number;
}): Promise<void> {
  const observed = await readObservedProcessIdentity(opts.pid);
  if (!observed) {
    if (!isProcessAlive(opts.pid)) return;
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `runner cancel refused because process identity could not be confirmed for ` +
        `${opts.task_id}:${opts.run_id} pid=${opts.pid}.`,
      context: {
        task_id: opts.task_id,
        run_id: opts.run_id,
        pid: opts.pid,
        expected_command: opts.state.supervision?.command ?? null,
        expected_started_at: opts.state.supervision?.started_at ?? null,
      },
    });
  }
  const commandMatches = commandMatchesFingerprint(
    opts.state.supervision?.command,
    observed.command,
  );
  const startMatches = startedAtMatches(opts.state.supervision?.started_at, observed.started_at);
  if (commandMatches && startMatches) return;
  throw new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `runner cancel refused because the live process no longer matches persisted supervision ` +
      `metadata for ${opts.task_id}:${opts.run_id} pid=${opts.pid}.`,
    context: {
      task_id: opts.task_id,
      run_id: opts.run_id,
      pid: opts.pid,
      expected_command: opts.state.supervision?.command ?? null,
      observed_command: observed.command,
      expected_started_at: opts.state.supervision?.started_at ?? null,
      observed_started_at: observed.started_at,
    },
  });
}

export function signalProcess(pid: number, signal: RunnerProcessSignal): boolean {
  try {
    process.kill(pid, signal);
    return true;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ESRCH") return false;
    throw err;
  }
}

export function buildSyntheticCancelledState(opts: {
  state: RunnerRunState;
  signal: RunnerProcessSignal;
  updated_at: string;
}): RunnerRunState {
  const priorSupervision = opts.state.supervision;
  const started_at =
    opts.state.result?.started_at ??
    priorSupervision?.started_at ??
    opts.state.updated_at ??
    opts.updated_at;
  const result = runnerAdapterCancelledResult({
    reason:
      `Runner cancellation state synthesized after requested ${opts.signal}; ` +
      "observed process exit metadata was unavailable.",
    started_at,
    ended_at: opts.updated_at,
    output_paths: [opts.state.bundle_path, opts.state.bootstrap_path].filter(
      (value): value is string => typeof value === "string" && value.trim().length > 0,
    ),
  });
  return evolveRunnerRunState({
    state: opts.state,
    status: "cancelled",
    result,
    updated_at: opts.updated_at,
    supervision: {
      ...priorSupervision,
      heartbeat_at: opts.updated_at,
      cancel_requested_at: priorSupervision?.cancel_requested_at ?? opts.updated_at,
      cancel_signal: priorSupervision?.cancel_signal ?? opts.signal,
      exit_signal: priorSupervision?.exit_signal ?? null,
    },
  });
}

export async function loadExistingRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  require_task_doing?: boolean;
}): Promise<LoadedRunnerExecution> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  if (opts.require_task_doing !== false) {
    assertCurrentTaskDoing(opts.task_id, await ctx.taskBackend.getTask(opts.task_id));
  }

  const repository = RunnerRunRepository.forTaskRun({
    git_root: ctx.resolvedProject.gitRoot,
    workflow_dir: ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  const record = await repository.readRecord();
  if (!record) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner artifacts not found for ${opts.task_id}:${opts.run_id}`,
    });
  }
  assertRunnerBundleMatchesTask(record.bundle, opts.task_id, opts.run_id);
  assertRunnerTaskExecutable(record.bundle);

  const adapter = createRunnerAdapter(ctx.config);
  const invocation = await adapter.prepare(record.bundle);
  return {
    ctx,
    bundle: record.bundle,
    invocation,
    state: record.state,
    repository,
  };
}
