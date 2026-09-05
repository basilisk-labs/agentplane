import { describe, expect, it } from "vitest";

import type { ExternalAgentExchange } from "./external-agent-exchange.js";
import {
  bindPreparedEvaluatorState,
  evaluatorReturnFingerprint,
  isStaleUnappliedEvaluatorCandidate,
} from "./external-agent-evaluator-recovery.js";
import { buildStateFingerprint, type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { qualityReviewHasRetiredExchange } from "../shared/quality-review-retirement.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskData } from "../../backends/task-backend.js";

const oldFingerprint = `sha256:${"a".repeat(64)}`;
const currentFingerprint = `sha256:${"b".repeat(64)}`;
const candidate = {
  purpose: "quality_review",
  role: "EVALUATOR",
  status: "result_received",
  state_fingerprint: oldFingerprint,
} as ExternalAgentExchange;

describe("evaluator post-preparation state binding", () => {
  function fixture() {
    const component = { state: "present" as const, source: "test", value: "unchanged" };
    const fingerprint = buildStateFingerprint({
      task_id: "T-1",
      task_revision: 4,
      git_head: "a".repeat(40),
      worktree: "/repo",
      components: {
        task: component,
        git: component,
        backend_projection: component,
        policy: component,
        blueprint: component,
        knowledge: component,
        provider: component,
        authority: component,
      },
    });
    const before = {
      workflowStep: {
        kind: "agent_episode",
        episode: { purpose: "quality_review" },
        preconditionFingerprint: fingerprint,
      },
      blockers: [],
      batchOwnership: { role: "none" },
    } as unknown as TaskRouteDecision;
    const after = structuredClone(before);
    after.workflowStep.preconditionFingerprint.digest = currentFingerprint;
    after.workflowStep.preconditionFingerprint.components.authority.digest = currentFingerprint;
    after.blockers = [{ code: "task_worktree_dirty", summary: "Frozen evaluator artifacts" }];
    const order = {
      role: "EVALUATOR",
      state_fingerprint: fingerprint,
      required_inputs: [],
    } as unknown as AgentWorkOrderV2;
    return { before, after, order };
  }

  it("binds the exact prepared state without changing the issued semantic identity", () => {
    const { before, after, order } = fixture();
    const bound = bindPreparedEvaluatorState({ before, after, work_order: order });
    expect(bound.state_fingerprint).toEqual(order.state_fingerprint);
    expect(order.required_inputs).toEqual([]);
    const expected = evaluatorReturnFingerprint({ exchange: candidate, work_order: bound });
    expect(expected).toBe(currentFingerprint);
    expect(expected).not.toBe(oldFingerprint);
    expect(
      evaluatorReturnFingerprint({
        exchange: { ...candidate, status: "result_received" },
        work_order: bound,
      }),
    ).toBe(expected);
  });

  it.each([
    "task",
    "git",
    "backend_projection",
    "policy",
    "blueprint",
    "knowledge",
    "provider",
  ] as const)("rejects %s drift during preparation", (key) => {
    const { before, after, order } = fixture();
    after.workflowStep.preconditionFingerprint.components[key].digest = currentFingerprint;
    expect(() => bindPreparedEvaluatorState({ before, after, work_order: order })).toThrow(
      "inputs changed",
    );
  });

  it.each(["task_id", "task_revision", "git_head", "worktree"] as const)(
    "rejects %s identity drift during preparation",
    (key) => {
      const { before, after, order } = fixture();
      Object.assign(after.workflowStep.preconditionFingerprint, {
        [key]: key === "task_revision" ? 5 : "changed",
      });
      expect(() => bindPreparedEvaluatorState({ before, after, work_order: order })).toThrow(
        "inputs changed",
      );
    },
  );

  it("rejects unrelated blocker and batch ownership changes", () => {
    const { before, after, order } = fixture();
    after.blockers.push({ code: "pr_head_unpublished", summary: "Unpublished head" });
    expect(() => bindPreparedEvaluatorState({ before, after, work_order: order })).toThrow(
      "inputs changed",
    );
    after.blockers.pop();
    after.batchOwnership = { role: "included" } as TaskRouteDecision["batchOwnership"];
    expect(() => bindPreparedEvaluatorState({ before, after, work_order: order })).toThrow(
      "inputs changed",
    );
  });

  it("does not use prepared evaluator state for another role or purpose", () => {
    const { before, after, order } = fixture();
    const bound = bindPreparedEvaluatorState({ before, after, work_order: order });
    for (const exchange of [
      { ...candidate, purpose: "implementation" as const },
      { ...candidate, role: "EXECUTOR" as const },
    ]) {
      expect(evaluatorReturnFingerprint({ exchange, work_order: bound })).toBe(oldFingerprint);
    }
    expect(() =>
      bindPreparedEvaluatorState({ before, after, work_order: { ...order, role: "EXECUTOR" } }),
    ).toThrow("inputs changed");
    expect(evaluatorReturnFingerprint({ exchange: candidate, work_order: order })).toBe(
      oldFingerprint,
    );
  });
});

describe("evaluator retirement eligibility", () => {
  it("does not load external exchange state for a legacy review without its frozen work order", async () => {
    await expect(
      qualityReviewHasRetiredExchange({
        ctx: {} as CommandContext,
        task: {
          quality_review: { evidence_refs: ["quality/run/quality-report.json"] },
        } as TaskData,
      }),
    ).resolves.toBe(false);
  });
  it.each(["issued", "result_received"] as const)(
    "requires an exact freshness change for %s",
    (status) => {
      const exchange = { ...candidate, status };
      expect(isStaleUnappliedEvaluatorCandidate(exchange, oldFingerprint)).toBe(false);
      expect(isStaleUnappliedEvaluatorCandidate(exchange, currentFingerprint)).toBe(true);
    },
  );

  it.each(["prepared", "accepted", "consumed", "retired"] as const)(
    "does not retire a %s exchange",
    (status) => {
      expect(isStaleUnappliedEvaluatorCandidate({ ...candidate, status }, currentFingerprint)).toBe(
        false,
      );
    },
  );

  it.each(["planning", "implementation", "verification", "task_worktree_resolution"] as const)(
    "does not replace %s authority with evaluator recovery",
    (purpose) => {
      expect(
        isStaleUnappliedEvaluatorCandidate({ ...candidate, purpose }, currentFingerprint),
      ).toBe(false);
    },
  );

  it("requires the original evaluator role", () => {
    expect(
      isStaleUnappliedEvaluatorCandidate({ ...candidate, role: "EXECUTOR" }, currentFingerprint),
    ).toBe(false);
  });
});
