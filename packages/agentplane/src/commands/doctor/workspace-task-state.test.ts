import { createLegacyTaskAggregate, withTaskCentricAggregate } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import { buildTaskCentricProjectionIntegrityFindings } from "./workspace-task-state.js";

describe("task-centric projection integrity diagnostics", () => {
  it("detects the historical rejected README and stale aggregate revision", () => {
    const aggregate = createLegacyTaskAggregate({
      id: "202609021331-5FPZAB",
      revision: 50,
      title: "Recover projection",
      description: "Fixture",
      status: "TODO",
      acceptance_criteria: ["recovered"],
      captured_at: "2026-09-02T13:31:00.000Z",
      updated_at: "2026-09-02T13:31:00.000Z",
    });
    const findings = buildTaskCentricProjectionIntegrityFindings([
      {
        id: aggregate.id,
        status: "TODO",
        doc_version: 3,
        revision: 52,
        plan_approval: { state: "rejected" },
        extensions: withTaskCentricAggregate({}, aggregate),
      },
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]).toContain("[WARN]");
    expect(findings[0]).toContain("task-centric plan projection mismatch");
    expect(findings[0]).toContain("README revision/state: 52/rejected");
    expect(findings[0]).toContain("Aggregate revision/state: 50/missing");
    expect(findings[0]).toContain("task plan recover-rejection");
  });

  it("blocks ambiguous 15/14 drift without proposing rejected-plan recovery", () => {
    const aggregate = createLegacyTaskAggregate({
      id: "ordinary-active-task",
      revision: 14,
      title: "Ordinary task",
      description: "Fixture",
      status: "DOING",
      acceptance_criteria: ["complete"],
      captured_at: "2026-09-03T10:00:00.000Z",
      updated_at: "2026-09-03T10:00:00.000Z",
    });

    const findings = buildTaskCentricProjectionIntegrityFindings([
      {
        id: aggregate.id,
        status: "DOING",
        doc_version: 3,
        revision: 15,
        plan_approval: { state: "approved" },
        extensions: withTaskCentricAggregate({}, aggregate),
      },
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]).toContain("[ERROR]");
    expect(findings[0]).toContain("task-centric revision split blocks");
    expect(findings[0]).toContain("README revision/state: 15/approved");
    expect(findings[0]).toContain("Aggregate revision/state: 14/missing");
    expect(findings[0]).toContain("task show ordinary-active-task");
    expect(findings[0]).not.toContain("recover-rejection");
  });

  it("reports a completed historical split without failing the workspace doctor", () => {
    const aggregate = createLegacyTaskAggregate({
      id: "archived-task",
      revision: 38,
      title: "Archived task",
      description: "Fixture",
      status: "DONE",
      acceptance_criteria: ["complete"],
      captured_at: "2026-08-22T07:00:00.000Z",
      updated_at: "2026-08-22T07:00:00.000Z",
    });
    const findings = buildTaskCentricProjectionIntegrityFindings([
      {
        id: aggregate.id,
        status: "DONE",
        doc_version: 3,
        revision: 44,
        plan_approval: { state: "approved" },
        extensions: withTaskCentricAggregate({}, aggregate),
      },
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]).toContain("[WARN]");
    expect(findings[0]).toContain("archived task-centric revision split");
    expect(findings[0]).toContain("README revision/state: 44/approved");
    expect(findings[0]).toContain("Aggregate revision/state: 38/missing");
    expect(findings[0]).toContain("task show archived-task");
  });

  it("blocks a DONE README when the aggregate is still active", () => {
    const aggregate = createLegacyTaskAggregate({
      id: "unfinished-aggregate",
      revision: 14,
      title: "Unfinished aggregate",
      description: "Fixture",
      status: "DOING",
      acceptance_criteria: ["complete"],
      captured_at: "2026-09-03T10:00:00.000Z",
      updated_at: "2026-09-03T10:00:00.000Z",
    });
    const findings = buildTaskCentricProjectionIntegrityFindings([
      {
        id: aggregate.id,
        status: "DONE",
        doc_version: 3,
        revision: 15,
        plan_approval: { state: "approved" },
        extensions: withTaskCentricAggregate({}, aggregate),
      },
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]).toContain("[ERROR]");
    expect(findings[0]).toContain("task-centric revision split blocks unfinished-aggregate");
  });

  it("does not report synchronized projection revisions", () => {
    const aggregate = createLegacyTaskAggregate({
      id: "coherent-task",
      revision: 14,
      title: "Coherent task",
      description: "Fixture",
      status: "DOING",
      acceptance_criteria: [],
      captured_at: "2026-09-03T10:00:00.000Z",
      updated_at: "2026-09-03T10:00:00.000Z",
    });
    expect(
      buildTaskCentricProjectionIntegrityFindings([
        {
          id: aggregate.id,
          status: "DOING",
          revision: 14,
          plan_approval: { state: "approved" },
          extensions: withTaskCentricAggregate({}, aggregate),
        },
      ]),
    ).toEqual([]);
  });
});
