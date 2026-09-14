import { readFile } from "node:fs/promises";
import path from "node:path";

import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { EvaluatorProviderFailureReceipt } from "./evaluator-episode.js";
import { isWithinRoot, readWorkOrder } from "./evaluator-review-usecase.js";

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function validIdentity(candidate: unknown): boolean {
  return candidate === null || (typeof candidate === "string" && candidate.length > 0);
}

function assertPersistedEvaluatorFailureReceipt(opts: {
  value: unknown;
  work_order_id: string;
}): asserts opts is {
  value: EvaluatorProviderFailureReceipt;
  work_order_id: string;
} {
  const receipt = opts.value;
  if (!receipt || typeof receipt !== "object" || Array.isArray(receipt)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Persisted evaluator failure receipt is invalid.",
    });
  }
  const value = receipt as Partial<EvaluatorProviderFailureReceipt>;
  const usage = value.provider_usage;
  const validUsage =
    usage === null ||
    (typeof usage === "object" &&
      usage !== null &&
      Object.entries(usage).every(
        ([key, entry]) =>
          [
            "input_tokens",
            "output_tokens",
            "total_tokens",
            "visible_output_tokens",
            "reasoning_tokens",
            "cached_input_tokens",
            "prepared_context_bytes",
            "thread_id",
            "turn_id",
          ].includes(key) &&
          (key === "thread_id" || key === "turn_id"
            ? typeof entry === "string" && entry.length > 0
            : isNonNegativeInteger(entry)),
      ));
  const failure = value.failure;
  const validFailure =
    !!failure &&
    failure.kind === "evaluator_provider_failure" &&
    [
      "nonzero_exit",
      "malformed_structured_result",
      "missing_structured_result",
      "provider_error",
      "stdin_write_failure",
      "stderr_limit",
      "stdout_limit",
      "timeout",
      "unclassified",
    ].includes(failure.classification) &&
    (failure.exit_code === null || isNonNegativeInteger(failure.exit_code)) &&
    (failure.signal === null || (typeof failure.signal === "string" && failure.signal.length > 0));
  const fullUsage =
    usage != null &&
    isNonNegativeInteger(usage.input_tokens) &&
    isNonNegativeInteger(usage.output_tokens) &&
    isNonNegativeInteger(usage.total_tokens);
  const validObservation =
    (value.provider_usage_status === "observed" &&
      fullUsage &&
      validIdentity(value.provider_thread_id) &&
      value.provider_thread_id !== null &&
      validIdentity(value.provider_turn_id) &&
      value.provider_turn_id !== null) ||
    (value.provider_usage_status === "partial" &&
      validIdentity(value.provider_thread_id) &&
      validIdentity(value.provider_turn_id)) ||
    (value.provider_usage_status === "unavailable" &&
      usage === null &&
      value.provider_thread_id === null &&
      value.provider_turn_id === null);
  if (
    value.schema_version !== 1 ||
    value.kind !== "evaluator_provider_failure_receipt" ||
    value.work_order_id !== opts.work_order_id ||
    value.provider !== "codex" ||
    value.authority?.sandbox !== "read-only" ||
    value.authority?.writable_roots?.length !== 0 ||
    !Array.isArray(value.argv) ||
    !value.argv.every((entry) => typeof entry === "string") ||
    typeof value.started_at !== "string" ||
    !Number.isFinite(Date.parse(value.started_at)) ||
    typeof value.ended_at !== "string" ||
    !Number.isFinite(Date.parse(value.ended_at)) ||
    !isNonNegativeInteger(value.stdout_bytes) ||
    !isNonNegativeInteger(value.stderr_bytes) ||
    !validUsage ||
    !validObservation ||
    value.workspace_state !== "unchanged" ||
    !validFailure
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Persisted evaluator failure receipt does not attest the failed provider episode.",
    });
  }
  opts.value = value as EvaluatorProviderFailureReceipt;
}

export async function readPersistedEvaluatorFailureReceipt(opts: {
  git_root: string;
  journal: SupervisorExecutionEpisodeJournal;
}): Promise<EvaluatorProviderFailureReceipt> {
  const operation = opts.journal.operations.at(-1);
  if (
    operation?.status !== "intent" ||
    operation.role !== "EVALUATOR" ||
    operation.kind !== "evaluator_episode" ||
    !operation.work_order_ref
  ) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Supervisor journal intent is not an evaluator failure that can be resumed.",
    });
  }
  const workOrderPath = path.resolve(opts.git_root, operation.work_order_ref);
  if (!isWithinRoot(opts.git_root, workOrderPath)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Supervisor journal evaluator work order is outside the project root.",
    });
  }
  const workOrder = readWorkOrder(JSON.parse(await readFile(workOrderPath, "utf8")) as unknown);
  if (operation.effect_ref !== workOrder.work_order_id) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Supervisor journal evaluator intent does not match its work order.",
    });
  }
  const receiptHolder = {
    value: JSON.parse(
      await readFile(path.join(path.dirname(workOrderPath), "evaluator-episode.json"), "utf8"),
    ) as unknown,
    work_order_id: workOrder.work_order_id,
  };
  assertPersistedEvaluatorFailureReceipt(receiptHolder);
  return receiptHolder.value;
}
