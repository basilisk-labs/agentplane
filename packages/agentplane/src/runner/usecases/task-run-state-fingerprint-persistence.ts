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
