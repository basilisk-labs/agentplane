import type { CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  claimRunnerPreSpawnDecision,
  finalizeRunnerPreSpawnCancellation,
  publishRunnerCancellationIntent,
} from "../adapters/execution-control.js";
import { waitForRunnerStateStop } from "../process-supervision/state.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import type { RunnerRunState } from "../types.js";

import { readTaskRunnerActiveClaim } from "./task-run-active-claim.js";
import { reconcileTerminalTaskRunnerActiveClaim } from "./task-run-active-claim-runtime.js";
import {
  loadExistingRunnerExecution,
  readRunningPid,
  type CancelledTaskRunnerExecution,
  type LoadedRunnerExecution,
} from "./task-run-lifecycle-shared.js";
import {
  inspectStartOwnerLease,
  waitForPreparedRunnerTransition,
} from "./task-run-cancel-prepared.js";
import { recoverOrphanedPreparedCancellation } from "./task-run-cancel-prepared-recovery.js";
import { finalizeOrphanedRunningCancellation } from "./task-run-cancel-orphaned.js";

function isTerminalRunnerState(state: RunnerRunState): boolean {
  return state.status !== "prepared" && state.status !== "running";
}

function terminalCancellationError(state: RunnerRunState): CliError {
  return new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `runner cancel only applies to prepared or running runs ` +
      `(current=${JSON.stringify(state.status)})`,
    context: {
      reason: "runner_terminal_state_immutable",
      current_status: state.status,
    },
  });
}

function cancelledExecutionResult(opts: {
  loaded: LoadedRunnerExecution;
  state: RunnerRunState;
  previous_status: RunnerRunState["status"];
  changed: boolean;
}): CancelledTaskRunnerExecution {
  return {
    ...opts.loaded,
    state: opts.state,
    previous_status: opts.previous_status,
    changed: opts.changed,
  };
}

async function appendCancellationRefusal(opts: {
  loaded: LoadedRunnerExecution;
  error: CliError;
  pid: number | null;
}): Promise<void> {
  await opts.loaded.repository.appendEvent({
    at: new Date().toISOString(),
    type: "runner_cancel_refused",
    message: opts.error.message,
    data: opts.error.context ?? {
      task_id: opts.loaded.bundle.task?.task_id ?? null,
      run_id: opts.loaded.invocation.run_id,
      pid: opts.pid,
    },
  });
}

async function recoverTerminalActiveClaim(opts: {
  loaded: LoadedRunnerExecution;
  expected_owner?: {
    owner_pid: number;
    owner_command: string | null;
    owner_started_at: string | null;
  };
  require_recovery: boolean;
}): Promise<void> {
  if (opts.loaded.repository.storage !== "supervisor") return;
  const lookup = {
    git_root: opts.loaded.bundle.repository.git_root,
    workflow_dir: opts.loaded.bundle.repository.workflow_dir,
    task_id: opts.loaded.bundle.task?.task_id ?? "",
    run_id: opts.loaded.invocation.run_id,
  };
  const active = await readTaskRunnerActiveClaim(lookup);
  if (!active) return;
  if (active.run_id !== lookup.run_id) {
    const error = new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner terminal state was projected, but the task active claim references another run ` +
        `recovery authority for run_id=${JSON.stringify(lookup.run_id)}.`,
      context: {
        reason: "active_claim_recovery_run_mismatch",
        task_id: lookup.task_id,
        run_id: lookup.run_id,
        active_run_id: active.run_id,
        active_generation: active.generation,
      },
    });
    await opts.loaded.repository.appendEvent({
      at: new Date().toISOString(),
      type: "runner_active_claim_recovery_refused",
      message: error.message,
      data: error.context,
    });
    if (opts.require_recovery) throw error;
    return;
  }
  const recovery = await reconcileTerminalTaskRunnerActiveClaim({
    ctx: opts.loaded.ctx,
    task_id: lookup.task_id,
    claim: active,
    expected_owner: opts.expected_owner,
    require_recovery: opts.require_recovery,
  });
  if (recovery === "recovered") {
    await opts.loaded.repository.appendEvent({
      at: new Date().toISOString(),
      type: "runner_active_claim_recovered",
      message: "stale supervisor active claim retired after terminal projection",
      data: {
        run_id: opts.loaded.invocation.run_id,
        recovery,
      },
    });
  }
}

async function readRequiredCurrentState(loaded: LoadedRunnerExecution): Promise<RunnerRunState> {
  const current = await loaded.repository.readState();
  if (current) return current;
  throw new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `Runner state disappeared for run_id=${JSON.stringify(loaded.invocation.run_id)}.`,
    context: {
      run_id: loaded.invocation.run_id,
      state_path: loaded.invocation.state_path,
    },
  });
}

async function reconcileTerminalProjection(opts: {
  loaded: LoadedRunnerExecution;
  task_id: string;
  state: RunnerRunState;
}): Promise<void> {
  const active =
    opts.loaded.repository.storage === "supervisor"
      ? await readTaskRunnerActiveClaim({
          git_root: opts.loaded.bundle.repository.git_root,
          workflow_dir: opts.loaded.bundle.repository.workflow_dir,
          task_id: opts.task_id,
          run_id: opts.loaded.invocation.run_id,
        })
      : null;
  if (active && active.run_id !== opts.loaded.invocation.run_id) {
    await opts.loaded.repository.appendEvent({
      at: new Date().toISOString(),
      type: "runner_terminal_projection_deferred",
      message: "terminal projection deferred because another run owns the task active claim",
      data: {
        run_id: opts.loaded.invocation.run_id,
        active_run_id: active.run_id,
        active_generation: active.generation,
      },
    });
    return;
  }
  await persistRunnerOutcomeToTask({
    ctx: opts.loaded.ctx,
    task_id: opts.task_id,
    bundle: opts.loaded.bundle,
    state: opts.state,
  });
  if (active) {
    await recoverTerminalActiveClaim({
      loaded: opts.loaded,
      require_recovery: false,
    });
  }
}

export async function cancelTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
}): Promise<CancelledTaskRunnerExecution> {
  let loaded = await loadExistingRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: opts.run_id,
    require_task_doing: false,
  });
  const previousStatus = loaded.state.status;

  if (loaded.state.status === "prepared") {
    const decision = await claimRunnerPreSpawnDecision({
      invocation: loaded.invocation,
      decision: "cancel",
      assert_artifact_boundary: async (phase) => await loaded.repository.assertBoundary(phase),
    });
    let cancellationRequestedAt = decision.record.decided_at;
    if (decision.record.decision === "cancel") {
      loaded = {
        ...loaded,
        state: await finalizeRunnerPreSpawnCancellation({
          repository: loaded.repository,
          decision: decision.record,
        }),
      };
    } else {
      const intent = await publishRunnerCancellationIntent({
        invocation: loaded.invocation,
        assert_artifact_boundary: async (phase) => await loaded.repository.assertBoundary(phase),
      });
      cancellationRequestedAt = intent.record.requested_at;
      await loaded.repository.appendEvent({
        at: intent.record.requested_at,
        type: "runner_cancel_requested",
        message: "runner cancellation requested while child-process start was pending",
        data: {
          previous_status: loaded.state.status,
          start_decided_at: decision.record.decided_at,
          cancellation_intent_won: intent.won,
          start_owner_id: decision.record.owner_lease?.owner_id ?? null,
          start_owner_heartbeat_at: decision.record.owner_lease?.heartbeat_at ?? null,
          start_owner_lease_expires_at: decision.record.owner_lease?.lease_expires_at ?? null,
        },
      });
    }
    if (loaded.state.status === "prepared") {
      const transitionedState = await waitForPreparedRunnerTransition({
        state_path: loaded.invocation.state_path,
        timeout_ms: 3000,
      });
      if (!transitionedState || transitionedState.status === "prepared") {
        const recoveredState = await recoverOrphanedPreparedCancellation({
          loaded,
          task_id: opts.task_id,
          decision: decision.record,
        });
        if (recoveredState?.status === "cancelled") {
          return cancelledExecutionResult({
            loaded,
            state: recoveredState,
            previous_status: previousStatus,
            changed: true,
          });
        }
        if (recoveredState && recoveredState.status !== "prepared") {
          loaded = { ...loaded, state: recoveredState };
        } else {
          const ownerLeaseStatus = await inspectStartOwnerLease(decision.record.owner_lease);
          throw new CliError({
            exitCode: 8,
            code: "E_RUNTIME",
            message:
              `runner cancellation authority was persisted, but start supervision did not settle for ` +
              `${opts.task_id}:${opts.run_id}.`,
            context: {
              task_id: opts.task_id,
              run_id: opts.run_id,
              state_path: loaded.invocation.state_path,
              cancellation_requested_at: cancellationRequestedAt,
              start_owner_lease_status: ownerLeaseStatus,
              start_owner_lease: decision.record.owner_lease ?? null,
            },
          });
        }
      } else {
        loaded = {
          ...loaded,
          state: transitionedState,
        };
      }
    }
  }

  if (loaded.state.status === "success") {
    await reconcileTerminalProjection({
      loaded,
      task_id: opts.task_id,
      state: loaded.state,
    });
    throw terminalCancellationError(loaded.state);
  }
  if (loaded.state.status === "cancelled") {
    await reconcileTerminalProjection({
      loaded,
      task_id: opts.task_id,
      state: loaded.state,
    });
    return cancelledExecutionResult({
      loaded,
      state: loaded.state,
      previous_status: previousStatus,
      changed: previousStatus !== "cancelled",
    });
  }

  if (loaded.state.status === "running") {
    const originalRunningState = loaded.state;
    const pid = readRunningPid(originalRunningState);
    if (loaded.repository.storage === "task") {
      const error = new CliError({
        exitCode: 8,
        code: "E_RUNTIME",
        message:
          `runner cancel cannot safely control historical task-local running run ` +
          `${opts.task_id}:${opts.run_id}; its supervisor does not support cooperative intent.`,
        context: {
          reason: "legacy_running_cancellation_unsupported",
          task_id: opts.task_id,
          run_id: opts.run_id,
          pid,
          storage: "task",
        },
      });
      await appendCancellationRefusal({ loaded, error, pid });
      throw error;
    }
    const orphaned = await finalizeOrphanedRunningCancellation({
      loaded,
      task_id: opts.task_id,
    });
    if (orphaned) {
      if (orphaned.status === "cancelled") {
        return cancelledExecutionResult({
          loaded,
          state: orphaned,
          previous_status: previousStatus,
          changed: true,
        });
      }
      await reconcileTerminalProjection({
        loaded,
        task_id: opts.task_id,
        state: orphaned,
      });
      throw terminalCancellationError(orphaned);
    }

    const currentBeforeIntent = await readRequiredCurrentState(loaded);
    if (isTerminalRunnerState(currentBeforeIntent)) {
      if (currentBeforeIntent.status === "cancelled") {
        return cancelledExecutionResult({
          loaded,
          state: currentBeforeIntent,
          previous_status: previousStatus,
          changed: false,
        });
      }
      await reconcileTerminalProjection({
        loaded,
        task_id: opts.task_id,
        state: currentBeforeIntent,
      });
      throw terminalCancellationError(currentBeforeIntent);
    }
    const intent = await publishRunnerCancellationIntent({
      invocation: loaded.invocation,
      signal: "SIGTERM",
      assert_artifact_boundary: async (phase) => await loaded.repository.assertBoundary(phase),
    });
    await loaded.repository.appendEvent({
      at: intent.record.requested_at,
      type: "runner_cancel_requested",
      message: "runner cancellation intent persisted for the owning supervisor",
      data: {
        previous_status: previousStatus,
        pid,
        signal: "SIGTERM",
        storage: loaded.repository.storage,
        cancellation_intent_won: intent.won,
        expected_process_identity: null,
      },
    });

    const settledState = await waitForRunnerStateStop({
      state_path: loaded.invocation.state_path,
      timeout_ms: Math.max(3000, originalRunningState.timeout_policy.terminate_grace_ms + 3000),
    });
    if (!settledState) {
      const recovered = await finalizeOrphanedRunningCancellation({
        loaded,
        task_id: opts.task_id,
      });
      if (recovered?.status === "cancelled") {
        return cancelledExecutionResult({
          loaded,
          state: recovered,
          previous_status: previousStatus,
          changed: true,
        });
      }
      if (recovered && isTerminalRunnerState(recovered)) {
        throw terminalCancellationError(recovered);
      }
      const current = await loaded.repository.readState();
      const error = new CliError({
        exitCode: 8,
        code: "E_RUNTIME",
        message:
          `runner cancellation could not be verified because terminal finalization did not settle ` +
          `for ${opts.task_id}:${opts.run_id}; no terminal state was synthesized.`,
        context: {
          task_id: opts.task_id,
          run_id: opts.run_id,
          pid,
          current_status: current?.status ?? null,
          storage: loaded.repository.storage,
        },
      });
      await appendCancellationRefusal({ loaded, error, pid });
      throw error;
    }
    if (settledState.status !== "cancelled") {
      await reconcileTerminalProjection({
        loaded,
        task_id: opts.task_id,
        state: settledState,
      });
      throw terminalCancellationError(settledState);
    }
    await reconcileTerminalProjection({
      loaded,
      task_id: opts.task_id,
      state: settledState,
    });
    return cancelledExecutionResult({
      loaded,
      state: settledState,
      previous_status: previousStatus,
      changed: settledState.status === "cancelled",
    });
  }

  const current = await readRequiredCurrentState(loaded);
  if (current.status !== "cancelled" && isTerminalRunnerState(current)) {
    await reconcileTerminalProjection({
      loaded,
      task_id: opts.task_id,
      state: current,
    });
    throw terminalCancellationError(current);
  }
  if (current.status === "cancelled") {
    await reconcileTerminalProjection({
      loaded,
      task_id: opts.task_id,
      state: current,
    });
    return cancelledExecutionResult({
      loaded,
      state: current,
      previous_status: previousStatus,
      changed: false,
    });
  }
  if (current.status === "running") {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `runner state changed to running while cancellation was being prepared for ` +
        `${opts.task_id}:${opts.run_id}; retry cancellation against the live supervision state.`,
    });
  }
  if (current.status === "prepared") {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `runner cancellation left prepared state without a verified terminal owner for ` +
        `${opts.task_id}:${opts.run_id}.`,
    });
  }
  return cancelledExecutionResult({
    loaded,
    state: current,
    previous_status: previousStatus,
    changed: false,
  });
}
