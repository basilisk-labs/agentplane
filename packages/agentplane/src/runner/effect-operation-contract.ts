import {
  createRunnerEffectOperation,
  digestRunnerEffectValue,
  type RunnerEffectOperation,
  type RunnerEffectReplayDisposition,
} from "@agentplaneorg/core/schemas";

import { exitCodeForError } from "../cli/exit-codes.js";
import { CliError } from "../shared/errors.js";

import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerStateFingerprintRecord,
} from "./types.js";

export const RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV = "AGENTPLANE_RUNNER_EFFECT_IDEMPOTENCY_KEY";

export function runnerEffectRuntimeError(
  message: string,
  context: Record<string, unknown>,
): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message,
    context,
  });
}

export function taskIdFromRunnerEffectBundle(bundle: RunnerContextBundle): string {
  const taskId = bundle.task?.task_id ?? bundle.target.task_id;
  if (!taskId) throw new Error("Runner effect operation requires a task-bound invocation.");
  return taskId;
}

export function runnerEffectOperationMatchesIdentity(
  left: RunnerEffectOperation,
  right: RunnerEffectOperation,
): boolean {
  return (
    left.operation_key === right.operation_key &&
    left.claim_generation === right.claim_generation &&
    left.task_id === right.task_id &&
    left.adapter_id === right.adapter_id &&
    left.work_order_id === right.work_order_id &&
    left.authority_ref === right.authority_ref &&
    left.authority_digest === right.authority_digest &&
    left.precondition_fingerprint_digest === right.precondition_fingerprint_digest &&
    left.precondition_policy_digest === right.precondition_policy_digest &&
    left.invocation_digest === right.invocation_digest &&
    left.enforcement === right.enforcement &&
    left.idempotency_key === right.idempotency_key &&
    left.expected_postconditions.join("\n") === right.expected_postconditions.join("\n") &&
    JSON.stringify(left.replay_source) === JSON.stringify(right.replay_source)
  );
}

function adapterForwardsEffectIdempotencyKey(bundle: RunnerContextBundle): boolean {
  const capability = bundle.execution?.adapter_capabilities?.fields.effect_idempotency_key;
  return capability?.level === "native" && capability.channel === "env";
}

function injectionEnvironmentKeys(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
}): string[] {
  const keys = new Set(Object.keys(opts.invocation.env));
  if (adapterForwardsEffectIdempotencyKey(opts.bundle)) {
    keys.add(RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV);
  }
  return [...keys].toSorted();
}

export function applyForwardedRunnerEffectIdempotencyKey(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  operation: RunnerEffectOperation;
}): void {
  if (opts.operation.enforcement !== "provider_key_forwarded") return;
  if (!adapterForwardsEffectIdempotencyKey(opts.bundle)) {
    throw runnerEffectRuntimeError(
      "Runner operation requires a provider idempotency-key forwarding adapter.",
      {
        reason: "runner_effect_provider_forwarding_unavailable",
        operation_key: opts.operation.operation_key,
        adapter_id: opts.invocation.adapter_id,
      },
    );
  }
  const existing = opts.invocation.env[RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV];
  if (existing && existing !== opts.operation.idempotency_key) {
    throw runnerEffectRuntimeError(
      "Runner invocation contains an incompatible provider idempotency key.",
      {
        reason: "runner_effect_provider_key_conflict",
        operation_key: opts.operation.operation_key,
        adapter_id: opts.invocation.adapter_id,
      },
    );
  }
  opts.invocation.env[RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV] = opts.operation.idempotency_key;
}

export function buildFreshRunnerEffectOperation(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state_fingerprint: RunnerStateFingerprintRecord;
  replay_source?: {
    source_run_id: string;
    disposition: RunnerEffectReplayDisposition;
  } | null;
}): RunnerEffectOperation {
  const taskId = taskIdFromRunnerEffectBundle(opts.bundle);
  const authority = opts.bundle.work_order?.authority ?? {
    kind: "runner_route_authority",
    state_fingerprint: opts.state_fingerprint.precondition_fingerprint.digest,
  };
  return createRunnerEffectOperation({
    task_id: taskId,
    origin_run_id: opts.invocation.run_id,
    adapter_id: opts.invocation.adapter_id,
    work_order_id: opts.invocation.work_order_id,
    authority_ref: opts.bundle.work_order
      ? `work-order:${opts.bundle.work_order.work_order_id}`
      : `runner:${taskId}:${opts.state_fingerprint.precondition_fingerprint.digest}`,
    authority_digest: digestRunnerEffectValue(authority),
    precondition_fingerprint_digest: opts.state_fingerprint.precondition_fingerprint.digest,
    precondition_policy_digest: digestRunnerEffectValue(opts.state_fingerprint.precondition_policy),
    invocation_digest: digestRunnerEffectValue({
      adapter_id: opts.invocation.adapter_id,
      argv: opts.invocation.argv,
      env_keys: injectionEnvironmentKeys(opts),
      work_order_id: opts.invocation.work_order_id,
    }),
    expected_postconditions: [
      "runner.execution_receipt.observed",
      "runner.result.recorded",
      "runner.state_fingerprint.recorded",
    ],
    replay_source: opts.replay_source
      ? {
          source_run_id: opts.replay_source.source_run_id,
          destination_run_id: opts.invocation.run_id,
          disposition: opts.replay_source.disposition,
        }
      : null,
    enforcement: adapterForwardsEffectIdempotencyKey(opts.bundle)
      ? "provider_key_forwarded"
      : "supervisor_single_spawn",
  });
}
