import type { CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { evolveRunnerRunState } from "../artifacts.js";
import {
  isProcessAlive,
  waitForProcessExit,
  waitForRunnerStateStop,
} from "../process-supervision.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import type { RunnerProcessSignal } from "../types.js";

import {
  assertMatchingProcessIdentity,
  buildSyntheticCancelledState,
  loadExistingRunnerExecution,
  readRunningPid,
  signalProcess,
  type CancelledTaskRunnerExecution,
} from "./task-run-lifecycle-shared.js";

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
        await loaded.repository.appendEvent({
          at: refusedAt,
          type: "runner_cancel_refused",
          message: err.message,
          data: err.context ?? {
            task_id: opts.task_id,
            run_id: opts.run_id,
            pid,
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
    await loaded.repository.writeState(requestedState);
    await loaded.repository.appendEvent({
      at: requested_at,
      type: "runner_cancel_requested",
      message: `runner cancel requested via SIGTERM for pid=${pid}`,
      data: {
        previous_status: loaded.state.status,
        pid,
        signal: "SIGTERM",
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
      await loaded.repository.writeState(killRequestedState);
      await loaded.repository.appendEvent({
        at: killRequestedAt,
        type: "runner_force_kill_requested",
        message: `runner cancel escalated to SIGKILL for pid=${pid}`,
        data: {
          previous_status: loaded.state.status,
          pid,
          signal: "SIGKILL",
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
        state: (await loaded.repository.readState()) ?? requestedState,
        signal: finalSignal,
        updated_at: new Date().toISOString(),
      });
    if (!settledState) {
      await loaded.repository.writeState(nextState);
      await loaded.repository.appendEvent({
        at: nextState.updated_at,
        type: "runner_cancelled",
        message: `runner process exited after ${finalSignal}; state synthesized as cancelled`,
        data: {
          previous_status: loaded.state.status,
          pid,
          signal: finalSignal,
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
  await loaded.repository.writeState(nextState);
  await loaded.repository.appendEvent({
    at: updated_at,
    type: "runner_cancelled",
    message: `runner marked cancelled from status=${loaded.state.status}`,
    data: {
      previous_status: loaded.state.status,
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
