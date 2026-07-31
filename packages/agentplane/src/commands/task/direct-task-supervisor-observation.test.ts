import { describe, expect, it } from "vitest";

import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";
import { observeDirectExecutor } from "./direct-task-supervisor-observation.js";

function lifecycle(
  verificationState: "observed_success" | "unverified" | "rejected",
  semanticStatus: "blocked" | "completed" | "failed" | "needs_context" = "completed",
): TaskRunnerLifecycleResult {
  return {
    phase: "executed",
    invocation: { run_id: "rf10-run" },
    result: {
      status: "success",
      execution_receipt: {
        path: "agentplane-run://rf10/receipt.json",
        sha256: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
        verification_state: verificationState,
        observed_by: "agentplane",
      },
      semantic_result: {
        provenance: "agent_reported",
        value: { kind: "agent_semantic_result", status: semanticStatus },
      },
    },
  } as TaskRunnerLifecycleResult;
}

describe("direct executor observation", () => {
  it("requires an observed-success receipt by default", () => {
    const observed = observeDirectExecutor(lifecycle("unverified"));
    expect(observed).toMatchObject({
      stop: "runner_receipt_unobserved",
    });
    expect("reason" in observed ? observed.reason : "").toContain("verification_state=unverified");
    expect("reason" in observed ? observed.reason : "").toContain("will not replay the provider");
  });

  it("accepts an explicitly authorized danger receipt without relabeling it", () => {
    expect(
      observeDirectExecutor(lifecycle("unverified"), { allow_unverified_receipt: true }),
    ).toMatchObject({
      executor: {
        run_id: "rf10-run",
        receipt: { verification_state: "unverified", observed_by: "agentplane" },
      },
    });
  });

  it("never accepts a rejected receipt", () => {
    expect(
      observeDirectExecutor(lifecycle("rejected"), { allow_unverified_receipt: true }),
    ).toMatchObject({ stop: "runner_receipt_unobserved" });
  });

  it("never accepts a missing receipt for a typed non-success result", () => {
    const withReceipt = lifecycle("unverified", "blocked");
    const result = withReceipt.result;
    if (!result) throw new Error("test lifecycle result is missing");
    const withoutReceipt: TaskRunnerLifecycleResult = {
      ...withReceipt,
      result: { ...result, execution_receipt: undefined },
    };
    expect(observeDirectExecutor(withoutReceipt)).toMatchObject({
      stop: "runner_receipt_unobserved",
    });
  });

  it.each([
    ["blocked", "executor_blocked"],
    ["failed", "executor_semantic_failed"],
    ["needs_context", "missing_knowledge"],
  ] as const)(
    "surfaces an unverified typed %s stop without accepting completed execution",
    (semanticStatus, stop) => {
      expect(observeDirectExecutor(lifecycle("unverified", semanticStatus))).toMatchObject({
        stop,
      });
    },
  );
});
