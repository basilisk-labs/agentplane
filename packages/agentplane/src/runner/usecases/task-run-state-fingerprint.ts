import { isDeepStrictEqual } from "node:util";

import {
  StateFingerprintPreconditionError,
  assertStateFingerprintPrecondition,
  validateStateFingerprintPolicy,
  type StateBoundOperationResult,
  type StateFingerprint,
  type StateFingerprintComponentInput,
  type StateFingerprintPolicy,
  type StateFingerprintPreconditionDiagnostic,
} from "@agentplaneorg/core/schemas";

import { exitCodeForError } from "../../cli/exit-codes.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  captureRunnerStateFingerprint,
  type RunnerStateFingerprintProbes,
} from "../state-fingerprint.js";
import {
  buildRunnerBackendProjectionComponent,
  type RunnerBackendProjectionTransitionAttestation,
} from "../task-state.js";
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
    const backendProjectionReason =
      opts.state_fingerprint.state_before?.components.backend_projection.reason_code ?? null;
    const pendingPushRecovery =
      backendProjectionReason === "backend_projection_pending_push"
        ? [
            "Fix: push the local cloud projection, then retry from freshly prepared state.",
            "Safe command: agentplane backend sync cloud --direction push --yes",
            "Stop condition: stop if cloud does not acknowledge the exact local projection.",
          ].join("\n")
        : null;
    super({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner refused stale prepared state for ${opts.task_id}:${opts.run_id} ` +
        `(${opts.cause.reason_code}: ${detail}).` +
        (pendingPushRecovery ? `\n${pendingPushRecovery}` : ""),
      context: {
        reason_code: opts.cause.reason_code,
        task_id: opts.task_id,
        run_id: opts.run_id,
        fingerprint: opts.cause.diagnostic,
        ...(backendProjectionReason
          ? { backend_projection_reason_code: backendProjectionReason }
          : {}),
        ...(pendingPushRecovery
          ? { safe_command: "agentplane backend sync cloud --direction push --yes" }
          : {}),
      },
    });
    this.name = "RunnerStateFingerprintCliError";
    this.state_fingerprint = opts.state_fingerprint;
  }
}

export class RunnerPostStateUnavailableCliError extends CliError {
  readonly result: RunnerResult;
  readonly state_fingerprint: RunnerStateFingerprintRecord;

  constructor(opts: {
    task_id: string;
    run_id: string;
    cause: unknown;
    result: RunnerResult;
    state_fingerprint: RunnerStateFingerprintRecord;
  }) {
    super({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner applied an effect but could not capture post-state for ` +
        `${opts.task_id}:${opts.run_id}; terminal projection is withheld.`,
      context: {
        reason_code: "runner_post_state_unavailable",
        task_id: opts.task_id,
        run_id: opts.run_id,
        cause: opts.cause instanceof Error ? opts.cause.message : String(opts.cause),
      },
    });
    this.name = "RunnerPostStateUnavailableCliError";
    this.result = opts.result;
    this.state_fingerprint = opts.state_fingerprint;
  }
}

function attestedStableProjection(
  input: StateFingerprintComponentInput,
): StateFingerprintComponentInput | null {
  if (input.state !== "present") return null;
  if (!input.value || typeof input.value !== "object" || Array.isArray(input.value)) return null;
  const value = structuredClone(input.value) as Record<string, unknown>;
  const backendState = value.backend_state;
  const freshness = value.projection_freshness;
  if (
    !backendState ||
    typeof backendState !== "object" ||
    Array.isArray(backendState) ||
    !freshness ||
    typeof freshness !== "object" ||
    Array.isArray(freshness)
  ) {
    return null;
  }
  Reflect.deleteProperty(backendState, "sha256");
  Reflect.deleteProperty(freshness, "last_checked_at");
  Reflect.deleteProperty(value, "projection_revision");
  return {
    state: "present",
    source: input.source,
    value,
  };
}

function attestationMatchesAdvance(
  expected: StateFingerprint,
  advanced: StateFingerprint,
  attestation: RunnerBackendProjectionTransitionAttestation | undefined,
): boolean {
  if (!attestation) {
    return isDeepStrictEqual(
      expected.components.backend_projection,
      advanced.components.backend_projection,
    );
  }
  const before = buildRunnerBackendProjectionComponent(attestation.before);
  const after = buildRunnerBackendProjectionComponent(attestation.after);
  if (
    !isDeepStrictEqual(expected.components.backend_projection, before) ||
    !isDeepStrictEqual(advanced.components.backend_projection, after)
  ) {
    return false;
  }
  if (attestation.after.state === "unavailable") {
    return (
      attestation.before.state === "present" &&
      attestation.after.reason_code === "backend_projection_pending_push"
    );
  }
  const stableBefore = attestedStableProjection(attestation.before);
  const stableAfter = attestedStableProjection(attestation.after);
  return (
    stableBefore !== null && stableAfter !== null && isDeepStrictEqual(stableBefore, stableAfter)
  );
}

function attachSuppressedPersistenceError(primary: unknown, suppressed: unknown): void {
  if (
    (typeof primary !== "object" && typeof primary !== "function") ||
    primary === null ||
    !Object.isExtensible(primary)
  ) {
    return;
  }
  const existing = (
    primary as {
      agentplane_suppressed?: unknown[];
    }
  ).agentplane_suppressed;
  const diagnostic = {
    operation: "runner_state_fingerprint_effect_error_persistence",
    message: suppressed instanceof Error ? suppressed.message : String(suppressed),
  };
  if (Array.isArray(existing)) {
    existing.push(diagnostic);
    return;
  }
  Object.defineProperty(primary, "agentplane_suppressed", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: [diagnostic],
  });
}

export async function executeStateBoundRunnerInvocation(opts: {
  ctx: CommandContext;
  task_id: string;
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  precondition_fingerprint?: StateFingerprint;
  precondition_policy?: StateFingerprintPolicy;
  probes?: RunnerStateFingerprintProbes;
  advance_precondition?: (opts: {
    invocation: RunnerInvocation;
    expected_backend_projection: StateFingerprint["components"]["backend_projection"];
  }) => Promise<{
    expected_task: TaskData;
    backend_projection_transition?: RunnerBackendProjectionTransitionAttestation;
  }>;
  before_apply?: (state_fingerprint: RunnerStateFingerprintRecord) => Promise<void>;
  on_apply_error?: (opts: {
    error: unknown;
    state_fingerprint: RunnerStateFingerprintRecord;
  }) => Promise<void>;
  on_post_state_error?: (opts: {
    error: RunnerPostStateUnavailableCliError;
    result: RunnerResult;
    state_fingerprint: RunnerStateFingerprintRecord;
  }) => Promise<void>;
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

  const captureState = async (probes?: RunnerStateFingerprintProbes) =>
    await captureRunnerStateFingerprint({
      ctx: opts.ctx,
      bundle: opts.bundle,
      probes: {
        ...opts.probes,
        ...probes,
      },
    });
  const assertPrecondition = (
    expected: StateFingerprint,
    current: StateFingerprint,
  ): StateFingerprintPreconditionDiagnostic => {
    try {
      return assertStateFingerprintPrecondition({
        expected,
        current,
        policy: preconditionPolicy,
      });
    } catch (error) {
      if (!(error instanceof StateFingerprintPreconditionError)) throw error;
      const stateFingerprint: RunnerStateFingerprintRecord = {
        schema_version: 1,
        kind: "runner_state_fingerprint_record",
        outcome: "refused",
        precondition_fingerprint: expected,
        precondition_policy: preconditionPolicy,
        state_before: current,
        state_after: current,
        precondition: error.diagnostic,
        effect_applied: false,
        post_state_reason_code: null,
      };
      throw new RunnerStateFingerprintCliError({
        task_id: opts.task_id,
        run_id: opts.invocation.run_id,
        cause: error,
        state_fingerprint: stateFingerprint,
      });
    }
  };

  const captureStableState = async (
    probes?: RunnerStateFingerprintProbes,
  ): Promise<StateFingerprint> => {
    const first = await captureState(probes);
    const second = await captureState(probes);
    if (first.task_id !== second.task_id || first.digest !== second.digest) {
      assertPrecondition(first, second);
    }
    return second;
  };
  const assertReplayAdvance = (
    expected: StateFingerprint,
    advanced: StateFingerprint,
    attestation?: RunnerBackendProjectionTransitionAttestation,
  ): void => {
    try {
      assertStateFingerprintPrecondition({
        expected,
        current: advanced,
        policy: preconditionPolicy,
      });
    } catch (error) {
      if (!(error instanceof StateFingerprintPreconditionError)) throw error;
      const backendChanged = !isDeepStrictEqual(
        expected.components.backend_projection,
        advanced.components.backend_projection,
      );
      const expectedComponents = backendChanged ? ["task", "backend_projection"] : ["task"];
      if (
        error.diagnostic.reason_code === "state_fingerprint_stale" &&
        error.diagnostic.changed_components
          .map((entry) => entry.component)
          .every((component, index) => component === expectedComponents[index]) &&
        error.diagnostic.changed_components.length === expectedComponents.length &&
        error.diagnostic.identity_changes.length === 1 &&
        error.diagnostic.identity_changes[0]?.field === "task_revision" &&
        typeof error.diagnostic.identity_changes[0].expected === "number" &&
        error.diagnostic.identity_changes[0].current ===
          error.diagnostic.identity_changes[0].expected + 1
      ) {
        if (!attestationMatchesAdvance(expected, advanced, attestation)) {
          assertPrecondition(expected, advanced);
          return;
        }
        assertPrecondition(advanced, advanced);
        return;
      }
      const stateFingerprint: RunnerStateFingerprintRecord = {
        schema_version: 1,
        kind: "runner_state_fingerprint_record",
        outcome: "refused",
        precondition_fingerprint: expected,
        precondition_policy: preconditionPolicy,
        state_before: advanced,
        state_after: advanced,
        precondition: error.diagnostic,
        effect_applied: false,
        post_state_reason_code: null,
      };
      throw new RunnerStateFingerprintCliError({
        task_id: opts.task_id,
        run_id: opts.invocation.run_id,
        cause: error,
        state_fingerprint: stateFingerprint,
      });
    }
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner replay anchor did not advance the task component for ` +
        `${opts.task_id}:${opts.invocation.run_id}.`,
      context: {
        reason_code: "state_fingerprint_replay_anchor_not_advanced",
        task_id: opts.task_id,
        run_id: opts.invocation.run_id,
      },
    });
  };
  const preparedStateBefore = await captureStableState();
  const preparedPrecondition = assertPrecondition(preconditionFingerprint, preparedStateBefore);
  let effectivePreconditionFingerprint = preconditionFingerprint;
  if (opts.advance_precondition) {
    const advanced = await opts.advance_precondition({
      invocation: opts.invocation,
      expected_backend_projection: preparedStateBefore.components.backend_projection,
    });
    effectivePreconditionFingerprint = await captureStableState({
      load_task: () => Promise.resolve(structuredClone(advanced.expected_task)),
      ...(advanced.backend_projection_transition
        ? {
            observe_backend_projection: () =>
              Promise.resolve(structuredClone(advanced.backend_projection_transition!.after)),
          }
        : {}),
    });
    assertReplayAdvance(
      preparedStateBefore,
      effectivePreconditionFingerprint,
      advanced.backend_projection_transition,
    );
  }
  let stateBefore = opts.advance_precondition ? await captureStableState() : preparedStateBefore;
  let precondition = opts.advance_precondition
    ? assertPrecondition(effectivePreconditionFingerprint, stateBefore)
    : preparedPrecondition;
  const effectStarted: RunnerStateFingerprintRecord = {
    schema_version: 1,
    kind: "runner_state_fingerprint_record",
    outcome: "effect_started",
    precondition_fingerprint: effectivePreconditionFingerprint,
    precondition_policy: preconditionPolicy,
    state_before: stateBefore,
    state_after: null,
    precondition,
    effect_applied: null,
    post_state_reason_code: null,
  };
  await opts.before_apply?.(effectStarted);
  stateBefore = await captureStableState();
  precondition = assertPrecondition(effectivePreconditionFingerprint, stateBefore);
  let result: RunnerResult;
  try {
    result = await opts.apply(opts.invocation);
  } catch (error) {
    const effectUnknown: RunnerStateFingerprintRecord = {
      ...effectStarted,
      outcome: "effect_unknown",
      state_before: stateBefore,
      precondition,
      post_state_reason_code: null,
    };
    try {
      await opts.on_apply_error?.({
        error,
        state_fingerprint: effectUnknown,
      });
    } catch (persistenceError) {
      attachSuppressedPersistenceError(error, persistenceError);
    }
    throw error;
  }
  let stateAfter: StateFingerprint;
  try {
    stateAfter = await captureStableState();
  } catch (cause) {
    const postStateUnknown: RunnerStateFingerprintRecord = {
      ...effectStarted,
      outcome: "post_state_unknown",
      state_before: stateBefore,
      precondition,
      effect_applied: true,
      post_state_reason_code: "post_state_unavailable",
    };
    const error = new RunnerPostStateUnavailableCliError({
      task_id: opts.task_id,
      run_id: opts.invocation.run_id,
      cause,
      result,
      state_fingerprint: postStateUnknown,
    });
    try {
      await opts.on_post_state_error?.({
        error,
        result,
        state_fingerprint: postStateUnknown,
      });
    } catch (persistenceError) {
      attachSuppressedPersistenceError(error, persistenceError);
    }
    throw error;
  }
  const stateFingerprint: RunnerStateFingerprintRecord = {
    schema_version: 1,
    kind: "runner_state_fingerprint_record",
    outcome: "accepted",
    precondition_fingerprint: effectivePreconditionFingerprint,
    precondition_policy: preconditionPolicy,
    state_before: stateBefore,
    state_after: stateAfter,
    precondition,
    effect_applied: true,
    post_state_reason_code: null,
  };
  return {
    result,
    precondition_fingerprint: effectivePreconditionFingerprint,
    precondition_policy: preconditionPolicy,
    state_before: stateBefore,
    state_after: stateAfter,
    precondition,
    state_fingerprint: stateFingerprint,
  };
}
