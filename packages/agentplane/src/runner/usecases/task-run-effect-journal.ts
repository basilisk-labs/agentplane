import { digestRunnerEffectValue } from "@agentplaneorg/core/schemas";

import {
  advanceRunnerEffectJournal,
  prepareRunnerEffectOperation,
  startRunnerEffectOperation,
} from "../effect-operation.js";
import type { StartedRunnerEffectOperation } from "../effect-operation.js";
export type { StartedRunnerEffectOperation } from "../effect-operation.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResult,
  RunnerRunState,
  RunnerStateFingerprintRecord,
} from "../types.js";

export async function persistPreparedTaskRunnerEffectOperation(opts: {
  repository: RunnerRunRepository;
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state: RunnerRunState;
  task_id: string;
  source_run_id?: string | null;
  resolved_not_applied_source?: boolean;
}): Promise<RunnerRunState> {
  if (!opts.state.state_fingerprint) {
    throw new Error(
      `Runner prepared state is missing effect-journal fingerprint authority for ` +
        `${opts.task_id}:${opts.invocation.run_id}.`,
    );
  }
  const effectOperation = await prepareRunnerEffectOperation({
    bundle: opts.bundle,
    invocation: opts.invocation,
    state_fingerprint: opts.state.state_fingerprint,
    ...(opts.source_run_id ? { source_run_id: opts.source_run_id } : {}),
    ...(opts.resolved_not_applied_source ? { resolved_not_applied_source: true } : {}),
  });
  const state = {
    ...opts.state,
    effect_operation: effectOperation.reference,
    updated_at: new Date().toISOString(),
  };
  await opts.repository.writeState(state);
  return state;
}

export async function startTaskRunnerEffectOperation(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state_fingerprint: RunnerStateFingerprintRecord;
  source_run_id?: string | null;
  resolved_not_applied_source?: boolean;
}): Promise<StartedRunnerEffectOperation> {
  return await startRunnerEffectOperation(opts);
}

export async function recordTaskRunnerEffectUnknown(opts: {
  session: StartedRunnerEffectOperation;
  error: unknown;
}): Promise<void> {
  await advanceRunnerEffectJournal({
    session: opts.session,
    phase: "effect_unknown",
    evidence: {
      code: "runner_adapter_effect_error",
      digest: digestRunnerEffectValue({
        message: opts.error instanceof Error ? opts.error.message : String(opts.error),
      }),
    },
  });
}

export async function recordTaskRunnerPostStateUnknown(opts: {
  session: StartedRunnerEffectOperation;
  result: RunnerResult;
  error?: unknown;
  code?: "runner_post_state_observation_unavailable" | "runner_post_effect_persistence_unavailable";
}): Promise<void> {
  const postPersistence = opts.code === "runner_post_effect_persistence_unavailable";
  await advanceRunnerEffectJournal({
    session: opts.session,
    phase: "post_state_unknown",
    evidence: {
      code: opts.code ?? "runner_post_state_observation_unavailable",
      digest: digestRunnerEffectValue(
        postPersistence
          ? { message: opts.error instanceof Error ? opts.error.message : String(opts.error) }
          : {
              status: opts.result.status,
              exit_code: opts.result.exit_code,
              ended_at: opts.result.ended_at,
            },
      ),
    },
  });
}

async function recordTaskRunnerEffectAccepted(opts: {
  session: StartedRunnerEffectOperation;
  result: RunnerResult;
  state_fingerprint: RunnerStateFingerprintRecord;
}): Promise<void> {
  await advanceRunnerEffectJournal({
    session: opts.session,
    phase: "accepted",
    evidence: {
      code: "runner_post_state_observed",
      digest: digestRunnerEffectValue({
        status: opts.result.status,
        exit_code: opts.result.exit_code,
        ended_at: opts.result.ended_at,
        state_fingerprint: opts.state_fingerprint.state_after?.digest ?? null,
      }),
    },
  });
}

export async function persistTaskRunnerEffectAccepted<T>(opts: {
  session: StartedRunnerEffectOperation | null;
  task_id: string;
  run_id: string;
  result: RunnerResult;
  state_fingerprint: RunnerStateFingerprintRecord;
  persist_post_effect_state: () => Promise<T>;
}): Promise<T> {
  if (!opts.session) {
    throw new Error(
      `Runner adapter returned without a durable effect operation for ` +
        `${opts.task_id}:${opts.run_id}.`,
    );
  }
  let state: T;
  try {
    state = await opts.persist_post_effect_state();
  } catch (error) {
    await recordTaskRunnerPostStateUnknown({
      session: opts.session,
      result: opts.result,
      error,
      code: "runner_post_effect_persistence_unavailable",
    });
    throw error;
  }
  await recordTaskRunnerEffectAccepted({
    session: opts.session,
    result: opts.result,
    state_fingerprint: opts.state_fingerprint,
  });
  return state;
}
