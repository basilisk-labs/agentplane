import { describe, expect, it } from "vitest";

import { decideIntegrationQueueRecovery } from "./integrate-queue-recovery.js";
import type { PrFlowStatusReport } from "./pr/flow-status.js";
import type { IntegrationQueueEntry } from "./pr/integrate/queue-state.js";

function queueEntry(status: IntegrationQueueEntry["status"] = "handoff"): IntegrationQueueEntry {
  return {
    task_id: "T-1",
    branch: "task/T-1/work",
    base: "main",
    head_sha: "head",
    base_sha: "base",
    changed_paths: ["src/work.ts"],
    pr_number: 101,
    pr_url: "https://example.invalid/pull/101",
    priority: 0,
    status,
    enqueued_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

const entry = queueEntry();

function report(overrides: Partial<PrFlowStatusReport>): PrFlowStatusReport {
  return {
    task: { id: "T-1", status: "DOING", verification: "ok" },
    branch: { name: "task/T-1/work", headSha: "head", metaHeadSha: null },
    pr: {
      provider: "github",
      state: "OPEN",
      source: "lookup",
      prNumber: 101,
      prUrl: "https://example.invalid/pull/101",
      base: "main",
      headSha: "head",
      mergeCommit: null,
    },
    closeTail: {
      state: "not_applicable",
      reason: "implementation PR is not merged or merge commit is unavailable",
    },
    nextAction: "wait hosted checks",
    ...overrides,
  };
}

describe("integration queue recovery decisions", () => {
  it("keeps live open PR lanes occupied", () => {
    expect(decideIntegrationQueueRecovery({ entry, report: report({}) })).toMatchObject({
      action: "keep",
    });
  });

  it("keeps active claimed lanes occupied even when provider state is terminal", () => {
    expect(
      decideIntegrationQueueRecovery({
        entry: queueEntry("claimed"),
        report: report({
          pr: {
            provider: "github",
            state: "MERGED",
            source: "lookup",
            prNumber: 101,
            prUrl: "https://example.invalid/pull/101",
            base: "main",
            headSha: "head",
            mergeCommit: "merge",
          },
          closeTail: { state: "recorded_on_base", base: "main" },
        }),
      }),
    ).toMatchObject({ action: "keep" });
  });

  it("marks non-claimed DONE task entries as terminal stale", () => {
    expect(
      decideIntegrationQueueRecovery({
        entry: queueEntry("queued"),
        report: report({
          task: { id: "T-1", status: "DONE", verification: "ok" },
        }),
      }),
    ).toMatchObject({
      action: "mark",
      status: "done",
      reason: "task is already DONE; queue entry is terminal stale",
    });
  });

  it("marks stale handoff lanes done only after close-tail evidence is recorded", () => {
    expect(
      decideIntegrationQueueRecovery({
        entry: queueEntry("handoff"),
        report: report({
          pr: {
            provider: "github",
            state: "MERGED",
            source: "lookup",
            prNumber: 101,
            prUrl: "https://example.invalid/pull/101",
            base: "main",
            headSha: "head",
            mergeCommit: "merge",
          },
          closeTail: { state: "recorded_on_base", base: "main" },
        }),
      }),
    ).toMatchObject({ action: "mark", status: "done" });
  });

  it("keeps merged lanes in handoff until close-tail work completes", () => {
    expect(
      decideIntegrationQueueRecovery({
        entry,
        report: report({
          pr: {
            provider: "github",
            state: "MERGED",
            source: "lookup",
            prNumber: 101,
            prUrl: "https://example.invalid/pull/101",
            base: "main",
            headSha: "head",
            mergeCommit: "merge",
          },
          closeTail: {
            state: "not_found",
            provider: "github",
            branch: "task-close/T-1/merge",
            prNumber: null,
            prUrl: null,
          },
          nextAction: "agentplane task hosted-close-pr T-1",
        }),
      }),
    ).toMatchObject({ action: "keep" });
  });

  it.each(["CLOSED", "not_found"] as const)("marks %s provider state as rework", (state) => {
    const pr =
      state === "not_found"
        ? { provider: "github" as const, state, source: "lookup" as const }
        : {
            provider: "github" as const,
            state,
            source: "lookup" as const,
            prNumber: 101,
            prUrl: "https://example.invalid/pull/101",
            base: "main",
            headSha: "head",
            mergeCommit: null,
          };
    expect(decideIntegrationQueueRecovery({ entry, report: report({ pr }) })).toMatchObject({
      action: "mark",
      status: "rework",
    });
  });
});
