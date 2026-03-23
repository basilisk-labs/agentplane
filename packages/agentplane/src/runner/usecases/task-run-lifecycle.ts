import { readFile } from "node:fs/promises";

import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { createRunnerAdapter } from "../adapters/index.js";
import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writePreparedRunnerArtifacts,
  writeRunnerRunState,
} from "../artifacts.js";
import { createRunnerRunId } from "../run-id.js";
import { resolveTaskRunnerPaths } from "../task-run-paths.js";
import type {
  RunnerContextBundle,
  RunnerLifecycleStatus,
  RunnerResult,
  RunnerRunState,
} from "../types.js";

import {
  assertRunnerTaskExecutable,
  renderTaskRunnerBootstrap,
  type ExecutedTaskRunnerExecution,
  type PreparedTaskRunnerExecution,
} from "./task-run.js";

type LoadedRunnerExecution = PreparedTaskRunnerExecution & {
  ctx: CommandContext;
  state: RunnerRunState;
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

async function readRunnerBundle(bundlePath: string): Promise<RunnerContextBundle | null> {
  try {
    return JSON.parse(await readFile(bundlePath, "utf8")) as RunnerContextBundle;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
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

function assertExecuteMode(bundle: RunnerContextBundle, action: "resume" | "retry"): void {
  if (bundle.execution.mode === "execute") return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `runner ${action} requires an execute-mode run ` +
      `(current=${JSON.stringify(bundle.execution.mode)}; dry-run artifacts cannot be ${action}d).`,
  });
}

async function loadExistingRunnerExecution(opts: {
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

  const paths = resolveTaskRunnerPaths({
    git_root: ctx.resolvedProject.gitRoot,
    workflow_dir: ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  const [bundle, state] = await Promise.all([
    readRunnerBundle(paths.bundle_path),
    readRunnerRunState(paths.state_path),
  ]);
  if (!bundle || !state) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner artifacts not found for ${opts.task_id}:${opts.run_id}`,
    });
  }
  assertBundleMatchesTask(bundle, opts.task_id, opts.run_id);
  assertRunnerTaskExecutable(bundle);

  const adapter = createRunnerAdapter(ctx.config);
  const invocation = await adapter.prepare(bundle);
  return {
    ctx,
    bundle,
    invocation,
    state,
  };
}

export async function cancelTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
}): Promise<CancelledTaskRunnerExecution> {
  const loaded = await loadExistingRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: opts.run_id,
    require_task_doing: false,
  });
  if (loaded.state.status === "success") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `runner cancel requires a non-success run (current=${JSON.stringify(loaded.state.status)})`,
    });
  }
  if (loaded.state.status === "cancelled") {
    return { ...loaded, previous_status: loaded.state.status, changed: false };
  }
  const updated_at = new Date().toISOString();
  const nextState = evolveRunnerRunState({
    state: loaded.state,
    status: "cancelled",
    updated_at,
  });
  await writeRunnerRunState({
    state_path: loaded.invocation.state_path,
    state: nextState,
  });
  await appendRunnerEvent({
    events_path: loaded.invocation.events_path,
    event: {
      at: updated_at,
      type: "runner_cancelled",
      message: `runner marked cancelled from status=${loaded.state.status}`,
      data: {
        previous_status: loaded.state.status,
      },
    },
  });
  return { ...loaded, state: nextState, previous_status: loaded.state.status, changed: true };
}

export async function resumeTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
}): Promise<ResumedTaskRunnerExecution> {
  const loaded = await loadExistingRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  assertExecuteMode(loaded.bundle, "resume");
  if (loaded.state.status === "running" || loaded.state.status === "success") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `runner resume requires a prepared, failed, or cancelled run ` +
        `(current=${JSON.stringify(loaded.state.status)})`,
    });
  }

  const requested_at = new Date().toISOString();
  const resetState = evolveRunnerRunState({
    state: loaded.state,
    status: "prepared",
    updated_at: requested_at,
  });
  await writeRunnerRunState({
    state_path: loaded.invocation.state_path,
    state: resetState,
  });
  await appendRunnerEvent({
    events_path: loaded.invocation.events_path,
    event: {
      at: requested_at,
      type: "runner_resume_requested",
      message: `runner resume requested from status=${loaded.state.status}`,
      data: {
        previous_status: loaded.state.status,
      },
    },
  });

  const result = await createRunnerAdapter(loaded.ctx.config).execute(loaded.invocation);
  const nextState = (await readRunnerRunState(loaded.invocation.state_path)) ?? resetState;
  return { ...loaded, state: nextState, previous_status: loaded.state.status, result };
}

export async function retryTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  new_run_id?: string;
}): Promise<RetriedTaskRunnerExecution> {
  const source = await loadExistingRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  assertExecuteMode(source.bundle, "retry");
  if (source.state.status === "prepared" || source.state.status === "running") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `runner retry requires a failed or cancelled run ` +
        `(current=${JSON.stringify(source.state.status)}; use \`agentplane task run resume ${opts.task_id} ${opts.run_id}\` instead).`,
    });
  }

  const nextRunId = opts.new_run_id ?? createRunnerRunId();
  const paths = resolveTaskRunnerPaths({
    git_root: source.ctx.resolvedProject.gitRoot,
    workflow_dir: source.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: nextRunId,
  });
  const retriedBundle: RunnerContextBundle = {
    ...source.bundle,
    execution: {
      ...source.bundle.execution,
      mode: "execute",
      run_id: nextRunId,
      artifact_paths: paths,
    },
  };
  const adapter = createRunnerAdapter(source.ctx.config);
  const invocation = await adapter.prepare(retriedBundle);
  const state = await writePreparedRunnerArtifacts({
    bundle: retriedBundle,
    bootstrap_markdown: renderTaskRunnerBootstrap(retriedBundle, invocation),
    invocation,
  });
  const requested_at = new Date().toISOString();
  await appendRunnerEvent({
    events_path: source.invocation.events_path,
    event: {
      at: requested_at,
      type: "runner_retry_requested",
      message: `runner retry requested into run_id=${nextRunId}`,
      data: {
        next_run_id: nextRunId,
      },
    },
  });
  await appendRunnerEvent({
    events_path: invocation.events_path,
    event: {
      at: requested_at,
      type: "runner_retry_created",
      message: `runner retry created from run_id=${source.state.run_id}`,
      data: {
        source_run_id: source.state.run_id,
        source_status: source.state.status,
      },
    },
  });
  const result = await adapter.execute(invocation);
  const nextState = (await readRunnerRunState(invocation.state_path)) ?? state;
  return {
    ctx: source.ctx,
    bundle: retriedBundle,
    invocation,
    state: nextState,
    result,
    source_run_id: source.state.run_id,
    source_status: source.state.status,
  };
}
