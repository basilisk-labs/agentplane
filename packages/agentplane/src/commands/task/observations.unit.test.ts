import type { TaskObservation } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import { findBlockingObservationIssues, summarizeObservationTriage } from "./observations.js";

function observation(overrides: Partial<TaskObservation> = {}): TaskObservation {
  return {
    schema_version: "0.1",
    id: "obs-0001",
    task_id: "202605191736-EQBZ4M",
    created_at: "2026-05-19T17:36:00.000Z",
    author: "CODER",
    phase: "implementation",
    kind: "spec_gap",
    severity: "medium",
    summary: "Spec did not define a required implementation decision.",
    status: "open",
    ...overrides,
  };
}

describe("task observations", () => {
  it("flags only unresolved blocking observations", () => {
    const issues = findBlockingObservationIssues([
      observation({ id: "obs-0001", severity: "critical" }),
      observation({ id: "obs-0002", kind: "deviation" }),
      observation({
        id: "obs-0003",
        kind: "issue_candidate",
        recommended_action: { type: "github_issue", title: "Open follow-up" },
      }),
      observation({
        id: "obs-0004",
        severity: "high",
        status: "accepted",
      }),
    ]);

    expect(issues).toEqual([
      { id: "obs-0001", reason: "open critical severity observation" },
      { id: "obs-0002", reason: "open deviation without decision" },
    ]);
  });

  it("summarizes open downstream actions for triage", () => {
    const summary = summarizeObservationTriage([
      observation({
        id: "obs-0001",
        recommended_action: { type: "github_issue", title: "Open follow-up" },
      }),
      observation({
        id: "obs-0002",
        status: "promoted",
        recommended_action: { type: "github_issue", title: "Open follow-up" },
      }),
      observation({ id: "obs-0003" }),
    ]);

    expect(summary).toEqual({
      github_issue: { total: 2, open: 1, ids: ["obs-0001"] },
      none: { total: 1, open: 1, ids: ["obs-0003"] },
    });
  });
});
