import {
  StateFingerprintPreconditionError,
  assertStateFingerprintPrecondition,
  validateStateFingerprintPolicy,
  type StateBoundOperationResult,
  type StateFingerprint,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import { exitCodeForError } from "../../cli/exit-codes.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  captureRunnerStateFingerprint,
  type RunnerStateFingerprintProbes,
} from "../state-fingerprint.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResult,
  RunnerStateFingerprintRecord,
} from "../types.js";

export type StateBoundRunnerExecution = StateBoundOperationResult<RunnerResult> & {
  precondition_policy: StateFingerprintPolicy;
  state_fingerprint: RunnerStateFingerprintRecord;
};

export class RunnerStateFingerprintCliError extends CliError {
  readonly state_fingerprint: RunnerStateFingerprintRecord;

  constructor(opts: {
    task_id: string;
    run_id: string;
    cause: StateFingerprintPreconditionError;
    state_fingerprint: RunnerStateFingerprintRecord;
  }) {
    const changedComponents = opts.cause.diagnostic.changed_components
      .map((entry) => entry.component)
      .join(",");
    const unavailableComponents = opts.cause.diagnostic.unavailable_required_components.join(",");
    const detail = changedComponents || unavailableComponents || opts.cause.reason_code;
    super({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner refused stale prepared state for ${opts.task_id}:${opts.run_id} ` +
        `(${opts.cause.reason_code}: ${detail}).`,
      context: {
        reason_code: opts.cause.reason_code,
        task_id: opts.task_id,
        run_id: opts.run_id,
        fingerprint: opts.cause.diagnostic,
      },
    });
    this.name = "RunnerStateFingerprintCliError";
    this.state_fingerprint = opts.state_fingerprint;
  }
}

export async function executeStateBoundRunnerInvocation(opts: {
  ctx: CommandContext;
  task_id: string;
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  precondition_fingerprint?: StateFingerprint;
  precondition_policy?: StateFingerprintPolicy;
  probes?: RunnerStateFingerprintProbes;
  apply: (invocation: RunnerInvocation) => Promise<RunnerResult>;
}): Promise<StateBoundRunnerExecution> {
  const preconditionFingerprint = opts.precondition_fingerprint;
  const preconditionPolicy = opts.precondition_policy
    ? validateStateFingerprintPolicy(opts.precondition_policy)
    : undefined;
  if (!preconditionFingerprint || !preconditionPolicy) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner prepared state is missing its fingerprint for ` +
        `${opts.task_id}:${opts.invocation.run_id}.`,
      context: {
        reason_code: "state_fingerprint_missing",
        task_id: opts.task_id,
        run_id: opts.invocation.run_id,
      },
    });
  }

  const captureState = async () =>
    await captureRunnerStateFingerprint({
      ctx: opts.ctx,
      bundle: opts.bundle,
      probes: opts.probes,
    });
  const stateBefore = await captureState();
  let precondition;
  try {
    precondition = assertStateFingerprintPrecondition({
      expected: preconditionFingerprint,
      current: stateBefore,
      policy: preconditionPolicy,
    });
  } catch (error) {
    if (!(error instanceof StateFingerprintPreconditionError)) throw error;
    const stateFingerprint: RunnerStateFingerprintRecord = {
      schema_version: 1,
      kind: "runner_state_fingerprint_record",
      outcome: "refused",
      precondition_fingerprint: preconditionFingerprint,
      precondition_policy: preconditionPolicy,
      state_before: stateBefore,
      state_after: stateBefore,
      precondition: error.diagnostic,
      effect_applied: false,
    };
    throw new RunnerStateFingerprintCliError({
      task_id: opts.task_id,
      run_id: opts.invocation.run_id,
      cause: error,
      state_fingerprint: stateFingerprint,
    });
  }
  const result = await opts.apply(opts.invocation);
  const stateAfter = await captureState();
  const stateFingerprint: RunnerStateFingerprintRecord = {
    schema_version: 1,
    kind: "runner_state_fingerprint_record",
    outcome: "accepted",
    precondition_fingerprint: preconditionFingerprint,
    precondition_policy: preconditionPolicy,
    state_before: stateBefore,
    state_after: stateAfter,
    precondition,
    effect_applied: true,
  };
  return {
    result,
    precondition_fingerprint: preconditionFingerprint,
    precondition_policy: preconditionPolicy,
    state_before: stateBefore,
    state_after: stateAfter,
    precondition,
    state_fingerprint: stateFingerprint,
  };
}
