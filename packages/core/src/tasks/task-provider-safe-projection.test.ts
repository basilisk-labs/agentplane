import { describe, expect, it } from "vitest";

import { buildProviderSafeTaskProjection, type TaskFrontmatter } from "../index.js";

function task(overrides: Partial<TaskFrontmatter> = {}): TaskFrontmatter {
  return {
    id: "202605291917-4RF08R",
    title: "Expose provider-safe task projection fields",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["cloud"],
    verify: ["bun run test"],
    plan_approval: {
      state: "approved",
      updated_at: "2026-05-29T19:00:00.000Z",
      updated_by: "ORCHESTRATOR",
      note: "Approved",
    },
    verification: {
      state: "pending",
      attempts: 2,
      updated_at: null,
      updated_by: null,
      note: null,
    },
    comments: [],
    doc_version: 3,
    doc_updated_at: "2026-05-29T19:10:00.000Z",
    doc_updated_by: "CODER",
    description: "Do not publish this full description as a provider field.",
    sections: {
      Summary: "Public summary can be represented by presence only.",
      Plan: "Sensitive execution plan.",
      "Verify Steps": "Detailed local checks.",
      Verification: "Raw verification log.",
      "Rollback Plan": "Rollback instructions.",
      Findings: "Private findings.",
    },
    commit: null,
    ...overrides,
  };
}

describe("buildProviderSafeTaskProjection", () => {
  it("emits board-safe task metadata without full README section text", () => {
    const projection = buildProviderSafeTaskProjection(
      task({
        sync: {
          version: 1,
          external_refs: [
            {
              provider: "linear",
              connector_kind: "cloud",
              remote_id: "LIN-12",
              remote_url: "https://linear.app/example/issue/LIN-12",
            },
          ],
          field_policies: {},
          freshness: { stale: true },
          conflicts: [
            {
              id: "conflict-1",
              kind: "field",
              severity: "warning",
              status: "open",
              summary: "Status mismatch.",
              detected_at: "2026-05-29T19:10:00.000Z",
            },
          ],
        },
      }),
    );

    expect(projection).toMatchObject({
      schema_version: 1,
      task_id: "202605291917-4RF08R",
      title: "Expose provider-safe task projection fields",
      plan_approved: true,
      verification_attempts: 2,
      rollback_present: true,
      findings_present: true,
      verification_log_present: true,
      sync_external_ref_count: 1,
      sync_open_conflict_count: 1,
      sync_stale: true,
      primary_external_ref: {
        provider: "linear",
        remote_id: "LIN-12",
        remote_url: "https://linear.app/example/issue/LIN-12",
      },
    });
    expect(JSON.stringify(projection)).not.toContain("Sensitive execution plan");
    expect(JSON.stringify(projection)).not.toContain("Private findings");
    expect(JSON.stringify(projection)).not.toContain("Raw verification log");
    expect(JSON.stringify(projection)).not.toContain("full description");
  });

  it("summarizes ACR metadata without exporting raw evidence payloads", () => {
    const projection = buildProviderSafeTaskProjection(task(), {
      acr: {
        record_id: "acr_01HX",
        created_at: "2026-05-29T19:15:00.000Z",
        task: { task_id: "202605291917-4RF08R" },
        evidence: [
          { path: ".agentplane/tasks/202605291917-4RF08R/acr.json" },
          { path: "private/log.txt" },
        ],
        result: { status: "verified", merge_ready: true },
      },
    });

    expect(projection.acr).toEqual({
      present: true,
      stale: false,
      record_id: "acr_01HX",
      created_at: "2026-05-29T19:15:00.000Z",
      result_status: "verified",
      merge_ready: true,
      evidence_count: 2,
    });
    expect(JSON.stringify(projection)).not.toContain("private/log.txt");
  });

  it("marks stale ACR metadata and handles missing sections conservatively", () => {
    const projection = buildProviderSafeTaskProjection(
      task({
        sections: {},
        plan_approval: undefined,
        verification: undefined,
      }),
      {
        acr: {
          record_id: "acr_stale",
          task: { task_id: "202605291917-OTHER" },
          evidence: [],
        },
      },
    );

    expect(projection.section_presence).toEqual({
      summary: false,
      scope: false,
      plan: false,
      verify_steps: false,
      verification: false,
      rollback_plan: false,
      findings: false,
    });
    expect(projection.plan_approval_state).toBe("pending");
    expect(projection.verification_state).toBe("pending");
    expect(projection.acr?.stale).toBe(true);
  });
});
