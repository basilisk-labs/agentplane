import { describe, expect, it } from "vitest";

import { EXECUTION_RECEIPT_V2_VALID_FIXTURE } from "@agentplaneorg/core/schemas";

import {
  isTaskPathMatch,
  readAllowed,
  readChangedPaths,
  readExecutionReceiptRef,
} from "./verify-task-policy.js";

describe("context verify-task policy", () => {
  it("allows maximum-assimilation derived roots required by structural validators", () => {
    const taskId = "202605191451-CTXMAX";
    const allowed = readAllowed({ mode: "maximum_assimilation" }, taskId);

    expect(
      isTaskPathMatch(".agentplane/context/derived/claims/decisions.jsonl", allowed, taskId),
    ).toBe(true);
    expect(
      isTaskPathMatch(
        ".agentplane/context/derived/ontology/entity-resolution.jsonl",
        allowed,
        taskId,
      ),
    ).toBe(true);
    expect(
      isTaskPathMatch(".agentplane/context/derived/sources/source-spans.jsonl", allowed, taskId),
    ).toBe(true);
    expect(
      isTaskPathMatch(".agentplane/context/derived/wiki/topology.plan.json", allowed, taskId),
    ).toBe(true);
  });

  it("reads changed paths only from an observed execution receipt", () => {
    expect(readChangedPaths(EXECUTION_RECEIPT_V2_VALID_FIXTURE)).toEqual([
      "packages/core/src/runner/execution-receipt.ts",
    ]);
  });

  it("reads a receipt reference without consulting legacy runner evidence", () => {
    const task = {
      id: "202607231000-RECEIPT",
      runner: {
        evidence: { changed_paths: ["context/raw/agent-claimed.md"] },
        execution_receipt: {
          path: ".agentplane/tasks/202607231000-RECEIPT/runs/run-1/execution-receipt.json",
          sha256: `sha256:${"a".repeat(64)}`,
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
      },
    };

    expect(readExecutionReceiptRef(task)).toEqual(task.runner.execution_receipt);
  });
});
