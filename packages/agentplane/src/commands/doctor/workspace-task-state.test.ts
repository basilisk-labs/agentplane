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
    expect(findings[0]).toContain("task-centric plan projection mismatch");
    expect(findings[0]).toContain("README revision/state: 52/rejected");
    expect(findings[0]).toContain("Aggregate revision/state: 50/missing");
    expect(findings[0]).toContain("task plan recover-rejection");
  });
});
