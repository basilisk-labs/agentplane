import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";

export type DirectExecutorObservation =
  | {
      executor: {
        run_id: string;
        receipt: NonNullable<NonNullable<TaskRunnerLifecycleResult["result"]>["execution_receipt"]>;
        semantic_status: "completed";
      };
    }
  | {
      stop:
        | "runner_failed"
        | "runner_receipt_unobserved"
        | "executor_result_missing"
        | "missing_knowledge"
        | "executor_blocked"
        | "executor_semantic_failed";
      reason: string;
    };

export function observeDirectExecutor(
  lifecycle: TaskRunnerLifecycleResult,
  opts: { allow_unverified_receipt?: boolean } = {},
): DirectExecutorObservation {
  if (lifecycle.phase !== "executed" || lifecycle.result?.status !== "success") {
    return { stop: "runner_failed", reason: "The EXECUTOR runner did not complete successfully." };
  }
  const receipt = lifecycle.result.execution_receipt;
  if (!receipt || receipt.verification_state === "rejected") {
    const observedState = receipt?.verification_state ?? "missing";
    const receiptRef = receipt?.path?.trim() ?? "none";
    return {
      stop: "runner_receipt_unobserved",
      reason:
        "The EXECUTOR result has no receipt accepted for the current authority " +
        `(verification_state=${observedState}, receipt_ref=${receiptRef}). ` +
        "The supervisor preserves this terminal observation and will not replay the provider.",
    };
  }
  const semantic = lifecycle.result.semantic_result?.value;
  if (semantic?.kind !== "agent_semantic_result") {
    return {
      stop: "executor_result_missing",
      reason: "The EXECUTOR result has no current typed semantic result.",
    };
  }
  // A typed non-success result cannot authorize implementation or lifecycle
  // progress. Surface it even when process containment leaves the receipt
  // unverified so the supervisor preserves the real semantic stop without
  // replaying the provider. Completed work still requires an accepted receipt.
  if (semantic.status === "needs_context") {
    return {
      stop: "missing_knowledge",
      reason: "The EXECUTOR requested bounded additional context.",
    };
  }
  if (semantic.status === "blocked") {
    return { stop: "executor_blocked", reason: "The EXECUTOR returned a typed blocked result." };
  }
  if (semantic.status === "failed") {
    return {
      stop: "executor_semantic_failed",
      reason: "The EXECUTOR returned a typed semantic failure.",
    };
  }
  const acceptableReceipt =
    receipt?.verification_state === "observed_success" ||
    (opts.allow_unverified_receipt === true && receipt?.verification_state === "unverified");
  if (!acceptableReceipt) {
    const observedState = receipt?.verification_state ?? "missing";
    const receiptRef = receipt?.path?.trim() ?? "none";
    return {
      stop: "runner_receipt_unobserved",
      reason:
        "The EXECUTOR result has no receipt accepted for the current authority " +
        `(verification_state=${observedState}, receipt_ref=${receiptRef}). ` +
        "The supervisor preserves this terminal observation and will not replay the provider.",
    };
  }
  return {
    executor: {
      run_id: lifecycle.invocation.run_id,
      receipt,
      semantic_status: "completed",
    },
  };
}
