import { realpath } from "node:fs/promises";
import path from "node:path";

import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import { openExistingRunnerRunWithLegacyFallback } from "../run-repository-compat.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type { RunnerInvocation, RunnerLifecycleStatus, RunnerRunState } from "../types.js";

import { assertRunnerTaskExecutable } from "./task-run-authority.js";
import type { ExecutedTaskRunnerExecution, PreparedTaskRunnerExecution } from "./task-run.js";

export type LoadedRunnerExecution = PreparedTaskRunnerExecution & {
  ctx: CommandContext;
  state: RunnerRunState;
  repository: RunnerRunRepository;
};

type LoadedRunnerRun = Omit<LoadedRunnerExecution, "invocation">;

export type CancelledTaskRunnerExecution = LoadedRunnerExecution & {
  previous_status: RunnerLifecycleStatus;
  changed: boolean;
};

export type ResumedTaskRunnerExecution = ExecutedTaskRunnerExecution & {
  ctx: CommandContext;
  source_run_id: string;
  source_status: RunnerLifecycleStatus;
  previous_status: RunnerLifecycleStatus;
};

export type RetriedTaskRunnerExecution = ExecutedTaskRunnerExecution & {
  ctx: CommandContext;
  source_run_id: string;
  source_status: RunnerLifecycleStatus;
};

export type RunnerReplayAction = "resume" | "retry";

export function runnerReplayDangerAuthoritySource(action: RunnerReplayAction): string {
  return `task run ${action} --allow-danger-full-access`;
}

export function assertCurrentTaskDoing(
  taskId: string,
  task: TaskData | null,
): asserts task is TaskData {
  if (!task) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Task not found: ${taskId}`,
    });
  }
  const status = normalizeTaskStatus(task.status);
  if (status === "DOING") return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `${taskId}: runner lifecycle commands require task status DOING ` +
      `(current=${JSON.stringify(status)}; use \`agentplane task start-ready ${taskId} --author <ROLE> --body "Start: ..."\` first).`,
  });
}

export function readRunningPid(state: RunnerRunState): number | null {
  return typeof state.supervision?.pid === "number" ? state.supervision.pid : null;
}

async function loadExistingRunnerRun(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  require_task_doing?: boolean;
}): Promise<LoadedRunnerRun> {
  const command =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const executionContext = await makeReadOnlyExecutionContext(command);
  const currentTask = await executionContext.backend.task_backend.getTask(opts.task_id);
  if (opts.require_task_doing !== false) {
    assertCurrentTaskDoing(opts.task_id, currentTask);
  }

  let repository: RunnerRunRepository;
  try {
    repository = await openExistingRunnerRunWithLegacyFallback({
      git_root: executionContext.repo.git_root,
      workflow_dir: executionContext.repo.workflow_dir,
      task_id: opts.task_id,
      run_id: opts.run_id,
    });
  } catch (err) {
    if ((err as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw err;
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner artifacts not found for ${opts.task_id}:${opts.run_id}`,
    });
  }
  const record = await repository.readRequiredRecord({
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  const bundle = repository.adaptBundleForLifecycle(record.bundle);
  let declaredRepositoryRoot: string;
  let expectedRepositoryRoot: string;
  try {
    [declaredRepositoryRoot, expectedRepositoryRoot] = await Promise.all([
      realpath(path.resolve(bundle.repository.git_root)),
      realpath(path.resolve(executionContext.repo.git_root)),
    ]);
  } catch (err) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message:
        `Runner bundle repository root is unavailable for ${opts.task_id}:${opts.run_id}: ` +
        `${err instanceof Error ? err.message : String(err)}`,
    });
  }
  if (declaredRepositoryRoot !== expectedRepositoryRoot) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message:
        `Runner bundle repository root mismatch for ${opts.task_id}:${opts.run_id} ` +
        `(declared=${JSON.stringify(declaredRepositoryRoot)}; ` +
        `expected=${JSON.stringify(expectedRepositoryRoot)})`,
      context: {
        task_id: opts.task_id,
        run_id: opts.run_id,
        declared_repository_root: declaredRepositoryRoot,
        expected_repository_root: expectedRepositoryRoot,
      },
    });
  }
  assertRunnerTaskExecutable(bundle);

  return {
    ctx: executionContext.command,
    bundle,
    state: record.state,
    repository,
  };
}

function prepareLoadedRunnerExecution(loaded: LoadedRunnerRun): LoadedRunnerExecution {
  const snapshot = loaded.state.prepared_metadata?.invocation;
  const invocation: RunnerInvocation = {
    adapter_id: loaded.bundle.execution.adapter_id,
    run_id: loaded.bundle.execution.run_id,
    work_order_id: snapshot?.work_order_id ?? loaded.bundle.execution.run_id,
    repository_root: loaded.bundle.repository.git_root,
    artifact_root: loaded.repository.paths.artifact_root ?? loaded.bundle.repository.git_root,
    run_dir: loaded.repository.paths.run_dir,
    bundle_path: loaded.repository.paths.bundle_path,
    state_path: loaded.repository.paths.state_path,
    events_path: loaded.repository.paths.events_path,
    result_path: loaded.repository.paths.result_path,
    receipt_path: loaded.repository.paths.receipt_path,
    trace_path: loaded.repository.paths.trace_path,
    stderr_path: loaded.repository.paths.stderr_path,
    trace_policy: loaded.state.trace_policy,
    timeout_policy: loaded.state.timeout_policy,
    bootstrap_path: loaded.repository.paths.bootstrap_path,
    output_last_message_path: snapshot?.output_last_message_path ?? null,
    output_schema_path: null,
    filesystem_effect_containment: snapshot?.filesystem_effect_containment ?? null,
    argv: [...(snapshot?.argv ?? [])],
    env: {},
    dry_run: loaded.state.mode === "dry_run",
  };
  return {
    ...loaded,
    invocation,
  };
}

export async function loadExistingRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  require_task_doing?: boolean;
}): Promise<LoadedRunnerExecution> {
  return prepareLoadedRunnerExecution(await loadExistingRunnerRun(opts));
}
