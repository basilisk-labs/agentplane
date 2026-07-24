import { createHash } from "node:crypto";

import {
  EXECUTION_RECEIPT_SCHEMA_VERSION,
  validateExecutionReceipt,
  type ExecutionReceipt,
  type ExecutionReceiptV2,
  type ExecutionReceiptArtifactObservation,
  type ExecutionReceiptGitObservation,
  type ExecutionReceiptObservedCheck,
  type ExecutionReceiptProcessObservation,
  type ExecutionReceiptScopeEvaluation,
} from "@agentplaneorg/core/schemas";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import type { SupervisedProcessResult } from "./process-supervision/run.js";
import { evaluateExecutionSuccessPolicy } from "./success-policy.js";
import type { RunnerExecutionMetrics, RunnerResult } from "./types.js";

const OBSERVED_PROVENANCE = "supervisor_observed" as const;

function sha256Text(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

function renderReceipt(receipt: ExecutionReceipt): string {
  return `${JSON.stringify(validateExecutionReceipt(receipt), null, 2)}\n`;
}

function elapsedMs(startedAt: string, endedAt: string): number {
  const started = Date.parse(startedAt);
  const ended = Date.parse(endedAt);
  if (Number.isNaN(started) || Number.isNaN(ended)) return 0;
  return Math.max(0, Math.round(ended - started));
}

function buildProcessObservation(opts: {
  process_result: SupervisedProcessResult | null;
  started_at: string;
  ended_at: string;
  capabilities_invoked: string[];
  metrics?: RunnerExecutionMetrics;
}): ExecutionReceiptProcessObservation {
  const processResult = opts.process_result;
  if (!processResult) {
    return {
      provenance: OBSERVED_PROVENANCE,
      outcome: "supervisor_error",
      started_at: opts.started_at,
      ended_at: opts.ended_at,
      exit_code: null,
      exit_signal: null,
      timeout_reason: null,
      process_tree: {
        scope: "direct_child_only",
        group_id: null,
        cleanup_state: "failed",
        terminate_sent_at: null,
        kill_sent_at: null,
        completed_at: opts.ended_at,
        residual_alive: null,
        error: "supervisor did not capture process-group cleanup",
        containment_state: "limited",
        containment_limitation:
          "The supervisor did not capture evidence of bounded descendant containment.",
      },
      capabilities_invoked: opts.capabilities_invoked,
      metrics: {
        duration_ms: elapsedMs(opts.started_at, opts.ended_at),
        stdout_bytes: 0,
        stderr_bytes: 0,
        ...(opts.metrics?.output_last_message_bytes === undefined
          ? {}
          : { output_last_message_bytes: opts.metrics.output_last_message_bytes }),
      },
    };
  }
  return {
    provenance: OBSERVED_PROVENANCE,
    outcome: processResult.timeout_reason
      ? "timed_out"
      : processResult.cancel_requested_at
        ? "cancelled"
        : processResult.exit_code === null && processResult.exit_signal === null
          ? "supervisor_error"
          : processResult.exit_signal !== null && processResult.exit_code === null
            ? "signaled"
            : "exited",
    started_at: processResult.started_at,
    ended_at: processResult.ended_at,
    exit_code: processResult.exit_code,
    exit_signal: processResult.exit_signal,
    timeout_reason: processResult.timeout_reason,
    process_tree: processResult.process_tree,
    capabilities_invoked: opts.capabilities_invoked,
    metrics: {
      duration_ms: elapsedMs(processResult.started_at, processResult.ended_at),
      stdout_bytes: processResult.stdout_bytes,
      stderr_bytes: processResult.stderr_bytes,
      ...(opts.metrics?.output_last_message_bytes === undefined
        ? {}
        : { output_last_message_bytes: opts.metrics.output_last_message_bytes }),
    },
  };
}

export function createExecutionReceipt(opts: {
  run_id: string;
  work_order_id: string;
  process_result: SupervisedProcessResult | null;
  started_at: string;
  ended_at: string;
  capabilities_invoked: string[];
  metrics?: RunnerExecutionMetrics;
  git: ExecutionReceiptGitObservation;
  artifacts: ExecutionReceiptArtifactObservation[];
  checks: ExecutionReceiptObservedCheck[];
  scope_evaluation?: ExecutionReceiptScopeEvaluation;
  collection_errors?: string[];
}): ExecutionReceiptV2 {
  const collectionErrors = [...new Set(opts.collection_errors)].toSorted();
  if (!opts.process_result) {
    collectionErrors.push("supervisor did not capture a completed child process observation");
  }
  const collection =
    collectionErrors.length > 0
      ? {
          provenance: OBSERVED_PROVENANCE,
          status: "partial" as const,
          errors: collectionErrors,
        }
      : {
          provenance: OBSERVED_PROVENANCE,
          status: "complete" as const,
          errors: [],
        };
  const process = buildProcessObservation(opts);
  const scopeEvaluation =
    opts.scope_evaluation ??
    ({
      provenance: OBSERVED_PROVENANCE,
      state: "not_evaluated",
    } satisfies ExecutionReceiptScopeEvaluation);
  const successPolicy = evaluateExecutionSuccessPolicy({
    process,
    git: opts.git,
    artifacts: opts.artifacts,
    checks: opts.checks,
    collection,
    scope_evaluation: scopeEvaluation,
  });
  const receipt = validateExecutionReceipt({
    schema_version: EXECUTION_RECEIPT_SCHEMA_VERSION,
    kind: "execution_receipt",
    observed_by: "agentplane",
    run_id: opts.run_id,
    work_order_id: opts.work_order_id,
    process,
    git: opts.git,
    artifacts: opts.artifacts,
    checks: opts.checks,
    collection,
    scope_evaluation: scopeEvaluation,
    success_policy: successPolicy,
  });
  if (receipt.schema_version !== EXECUTION_RECEIPT_SCHEMA_VERSION) {
    throw new Error("execution receipt creator emitted an unexpected legacy schema version");
  }
  return receipt;
}

export async function writeExecutionReceipt(opts: {
  receipt_path: string;
  reference_path?: string;
  receipt: ExecutionReceipt;
}): Promise<NonNullable<RunnerResult["execution_receipt"]>> {
  const text = renderReceipt(opts.receipt);
  await atomicWriteFile(opts.receipt_path, text, "utf8");
  return {
    path: opts.reference_path ?? opts.receipt_path,
    sha256: sha256Text(text),
    verification_state: opts.receipt.success_policy.outcome,
    observed_by: "agentplane",
  };
}
