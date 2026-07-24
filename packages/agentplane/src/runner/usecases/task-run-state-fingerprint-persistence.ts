import type { CommandContext } from "../../commands/shared/task-backend.js";
import { evolveRunnerRunState } from "../artifacts.js";
import { RunnerRunRepository } from "../run-repository.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResult,
  RunnerRunState,
  RunnerStateFingerprintRecord,
} from "../types.js";
import type { RunnerStateFingerprintCliError } from "./task-run-state-fingerprint.js";

export async function persistRunnerStateFingerprintRefusal(opts: {
  ctx: CommandContext;
  task_id: string;
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  prepared_state: RunnerRunState;
  error: RunnerStateFingerprintCliError;
}): Promise<void> {
  const refusedAt = new Date().toISOString();
  const result: RunnerResult = {
    status: "failed",
    exit_code: opts.error.exitCode ?? 8,
    started_at: opts.prepared_state.created_at,
    ended_at: refusedAt,
    summary: opts.error.message,
    stderr_summary: opts.error.message,
  };
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.invocation.run_id,
    storage: "supervisor",
  });
  const refusedState = evolveRunnerRunState({
    state: opts.prepared_state,
    status: "failed",
    result,
    updated_at: refusedAt,
    state_fingerprint: opts.error.state_fingerprint,
  });
  await repository.writeState(refusedState);
  await repository.appendEvent({
    at: refusedAt,
    type: "runner_refused",
    message: opts.error.message,
    data: {
      code: opts.error.code,
      exit_code: opts.error.exitCode,
      reason_code: opts.error.context?.reason_code,
      state_fingerprint: opts.error.state_fingerprint,
    },
  });
  await persistRunnerOutcomeToTask({
    ctx: opts.ctx,
    task_id: opts.task_id,
    bundle: opts.bundle,
    state: refusedState,
    ordering_authority: "current_active_claim",
  });
}

export async function persistRunnerStateFingerprintEffectStarted(opts: {
  ctx: CommandContext;
  task_id: string;
  invocation: RunnerInvocation;
  state_fingerprint: RunnerStateFingerprintRecord;
}): Promise<void> {
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.invocation.run_id,
    storage: "supervisor",
  });
  const current = await repository.readState();
  if (!current || (current.status !== "prepared" && current.status !== "running")) {
    throw new Error(
      `Runner effect journal requires non-terminal state for ` +
        `${opts.task_id}:${opts.invocation.run_id}.`,
    );
  }
  const recordedAt = new Date().toISOString();
  await repository.writeState({
    ...current,
    updated_at: recordedAt,
    state_fingerprint: opts.state_fingerprint,
  });
  await repository.appendEvent({
    at: recordedAt,
    type: "runner_effect_started",
    message: "runner adapter effect entered after a fresh state precondition",
    data: {
      state_fingerprint: opts.state_fingerprint,
    },
  });
}

export async function persistRunnerStateFingerprintEffectUnknown(opts: {
  ctx: CommandContext;
  task_id: string;
  invocation: RunnerInvocation;
  prepared_state: RunnerRunState;
  error: unknown;
  state_fingerprint: RunnerStateFingerprintRecord;
}): Promise<void> {
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.invocation.run_id,
    storage: "supervisor",
  });
  const current = (await repository.readState()) ?? opts.prepared_state;
  const failedAt = new Date().toISOString();
  const message = opts.error instanceof Error ? opts.error.message : String(opts.error);
  const result: RunnerResult =
    current.result ??
    ({
      status: "failed",
      exit_code: 8,
      started_at: current.created_at,
      ended_at: failedAt,
      summary: `Runner adapter effect ended without a trustworthy outcome: ${message}`,
      stderr_summary: message,
    } satisfies RunnerResult);
  const state =
    current.status !== "prepared" && current.status !== "running"
      ? {
          ...current,
          state_fingerprint: opts.state_fingerprint,
        }
      : evolveRunnerRunState({
          state: current,
          status: "failed",
          result,
          updated_at: failedAt,
          state_fingerprint: opts.state_fingerprint,
        });
  await repository.writeState(state);
  await repository.appendEvent({
    at: failedAt,
    type: "runner_effect_unknown",
    message,
    data: {
      reason_code: "runner_effect_outcome_unknown",
      state_fingerprint: opts.state_fingerprint,
    },
  });
}

export async function persistRunnerStateFingerprintPostStateUnknown(opts: {
  ctx: CommandContext;
  task_id: string;
  invocation: RunnerInvocation;
  result: RunnerResult;
  state_fingerprint: RunnerStateFingerprintRecord;
}): Promise<void> {
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.invocation.run_id,
    storage: "supervisor",
  });
  const current = await repository.readState();
  if (!current) {
    throw new Error(
      `Runner post-state journal requires an existing state for ` +
        `${opts.task_id}:${opts.invocation.run_id}.`,
    );
  }
  const recordedAt = new Date().toISOString();
  await repository.writeState({
    ...current,
    updated_at: recordedAt,
    result: current.result ?? opts.result,
    state_fingerprint: opts.state_fingerprint,
  });
  await repository.appendEvent({
    at: recordedAt,
    type: "runner_post_state_unknown",
    message: "runner effect completed but post-state observation is unavailable",
    data: {
      reason_code: "runner_post_state_unavailable",
      result: opts.result,
      state_fingerprint: opts.state_fingerprint,
    },
  });
}

export async function persistRunnerStateFingerprintSuccess(opts: {
  ctx: CommandContext;
  task_id: string;
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  prepared_state: RunnerRunState;
  result: RunnerResult;
  state_fingerprint: RunnerStateFingerprintRecord;
}): Promise<RunnerRunState> {
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.invocation.run_id,
    storage: "supervisor",
  });
  const observedTerminal = await repository.readState();
  const state =
    observedTerminal &&
    observedTerminal.status !== "prepared" &&
    observedTerminal.status !== "running"
      ? {
          ...observedTerminal,
          state_fingerprint: opts.state_fingerprint,
        }
      : evolveRunnerRunState({
          state: opts.prepared_state,
          status: opts.result.status,
          result: opts.result,
          updated_at: opts.result.ended_at,
          state_fingerprint: opts.state_fingerprint,
        });
  await repository.writeState(state);
  await persistRunnerOutcomeToTask({
    ctx: opts.ctx,
    task_id: opts.task_id,
    bundle: opts.bundle,
    state,
    ordering_authority: "current_active_claim",
  });
  return state;
}
