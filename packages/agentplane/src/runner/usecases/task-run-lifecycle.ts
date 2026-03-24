import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { createRunnerAdapter } from "../adapters/index.js";
import { runnerAdapterCancelledResult } from "../adapters/shared.js";
import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writePreparedRunnerArtifacts,
  writeRunnerRunState,
} from "../artifacts.js";
import { createRunnerRunId } from "../run-id.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import { resolveTaskRunnerPaths } from "../task-run-paths.js";
import type {
  RunnerContextBundle,
  RunnerLifecycleStatus,
  RunnerProcessSignal,
  RunnerResult,
  RunnerRunState,
} from "../types.js";
import {
  exitCodeForSignal,
  isProcessAlive,
  readObservedProcessIdentity,
  waitForProcessExit,
  waitForRunnerStateStop,
} from "../process-supervision.js";

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

function readRunningPid(state: RunnerRunState): number | null {
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

async function assertMatchingProcessIdentity(opts: {
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

function signalProcess(pid: number, signal: RunnerProcessSignal): boolean {
  try {
    process.kill(pid, signal);
    return true;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ESRCH") return false;
    throw err;
  }
}

function buildSyntheticCancelledState(opts: {
  state: RunnerRunState;
  signal: RunnerProcessSignal;
  updated_at: string;
}): RunnerRunState {
  const started_at =
    opts.state.result?.started_at ??
    opts.state.supervision?.started_at ??
    opts.state.updated_at ??
    opts.updated_at;
  const result = runnerAdapterCancelledResult({
    reason: `Runner cancelled via ${opts.signal}.`,
    started_at,
    ended_at: opts.updated_at,
    exit_code: exitCodeForSignal(opts.signal),
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
      ...opts.state.supervision,
      heartbeat_at: opts.updated_at,
      exit_signal: opts.signal,
    },
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
  if (loaded.state.status === "running") {
    const pid = readRunningPid(loaded.state);
    if (!pid) {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `runner cancel requires supervision metadata for running run ${opts.task_id}:${opts.run_id}`,
      });
    }
    try {
      await assertMatchingProcessIdentity({
        task_id: opts.task_id,
        run_id: opts.run_id,
        state: loaded.state,
        pid,
      });
    } catch (err) {
      if (err instanceof CliError) {
        const refusedAt = new Date().toISOString();
        await appendRunnerEvent({
          events_path: loaded.invocation.events_path,
          event: {
            at: refusedAt,
            type: "runner_cancel_refused",
            message: err.message,
            data: err.context ?? {
              task_id: opts.task_id,
              run_id: opts.run_id,
              pid,
            },
          },
        });
      }
      throw err;
    }
    const requested_at = new Date().toISOString();
    const requestedState = evolveRunnerRunState({
      state: loaded.state,
      status: "running",
      updated_at: requested_at,
      supervision: {
        ...loaded.state.supervision,
        cancel_requested_at: requested_at,
        cancel_signal: "SIGTERM",
        heartbeat_at: requested_at,
      },
    });
    await writeRunnerRunState({
      state_path: loaded.invocation.state_path,
      state: requestedState,
    });
    await appendRunnerEvent({
      events_path: loaded.invocation.events_path,
      event: {
        at: requested_at,
        type: "runner_cancel_requested",
        message: `runner cancel requested via SIGTERM for pid=${pid}`,
        data: {
          previous_status: loaded.state.status,
          pid,
          signal: "SIGTERM",
        },
      },
    });
    const exitedAfterTerm = signalProcess(pid, "SIGTERM")
      ? await waitForProcessExit({ pid, timeout_ms: 1500 })
      : true;
    let finalSignal: RunnerProcessSignal = "SIGTERM";
    if (!exitedAfterTerm && isProcessAlive(pid)) {
      const killRequestedAt = new Date().toISOString();
      const killRequestedState = evolveRunnerRunState({
        state: requestedState,
        status: "running",
        updated_at: killRequestedAt,
        supervision: {
          ...requestedState.supervision,
          cancel_requested_at: requested_at,
          cancel_signal: "SIGKILL",
          force_killed: true,
          heartbeat_at: killRequestedAt,
        },
      });
      await writeRunnerRunState({
        state_path: loaded.invocation.state_path,
        state: killRequestedState,
      });
      await appendRunnerEvent({
        events_path: loaded.invocation.events_path,
        event: {
          at: killRequestedAt,
          type: "runner_force_kill_requested",
          message: `runner cancel escalated to SIGKILL for pid=${pid}`,
          data: {
            previous_status: loaded.state.status,
            pid,
            signal: "SIGKILL",
          },
        },
      });
      signalProcess(pid, "SIGKILL");
      await waitForProcessExit({ pid, timeout_ms: 1500 });
      finalSignal = "SIGKILL";
    }
    const settledState = await waitForRunnerStateStop({
      state_path: loaded.invocation.state_path,
      timeout_ms: 3000,
    });
    const nextState =
      settledState ??
      buildSyntheticCancelledState({
        state: (await readRunnerRunState(loaded.invocation.state_path)) ?? requestedState,
        signal: finalSignal,
        updated_at: new Date().toISOString(),
      });
    if (!settledState) {
      await writeRunnerRunState({
        state_path: loaded.invocation.state_path,
        state: nextState,
      });
      await appendRunnerEvent({
        events_path: loaded.invocation.events_path,
        event: {
          at: nextState.updated_at,
          type: "runner_cancelled",
          message: `runner process exited after ${finalSignal}; state synthesized as cancelled`,
          data: {
            previous_status: loaded.state.status,
            pid,
            signal: finalSignal,
          },
        },
      });
    }
    await persistRunnerOutcomeToTask({
      ctx: loaded.ctx,
      task_id: opts.task_id,
      bundle: loaded.bundle,
      state: nextState,
    });
    return {
      ...loaded,
      state: nextState,
      previous_status: loaded.state.status,
      changed: nextState.status === "cancelled",
    };
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
  await persistRunnerOutcomeToTask({
    ctx: loaded.ctx,
    task_id: opts.task_id,
    bundle: loaded.bundle,
    state: nextState,
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
  await persistRunnerOutcomeToTask({
    ctx: loaded.ctx,
    task_id: opts.task_id,
    bundle: loaded.bundle,
    state: nextState,
  });
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
  await persistRunnerOutcomeToTask({
    ctx: source.ctx,
    task_id: opts.task_id,
    bundle: retriedBundle,
    state: nextState,
  });
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
