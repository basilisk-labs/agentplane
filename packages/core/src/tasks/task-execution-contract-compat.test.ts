import { describe, expect, it } from "vitest";

import { validateTaskReadmeFrontmatter, withTaskReadmeFrontmatterDefaults } from "../index.js";

describe("task execution contract compatibility", () => {
  it("upgrades the initial contract shape while applying task defaults", () => {
    const task = withTaskReadmeFrontmatterDefaults({
      id: "202608120000-LEGACY",
      title: "Legacy execution contract",
      status: "TODO",
      priority: "high",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      execution_contract: {
        schema_version: 1,
        source: "agent_declared",
        declaration: {
          schema_version: 1,
          preferred_mode: "direct",
          scope_roots: ["packages/app"],
          repository_effects: ["repository_write", "source_code"],
          external_effects: [],
          uncertainty: "bounded",
          reversibility: "reversible",
          rationale: ["localized implementation"],
        },
        selected_mode: "direct",
        repository_mode: "direct",
        reason_codes: ["agent_preferred_direct_compatible"],
        safety: {
          requires_worktree: false,
          requires_user_approval: false,
          approval_effects: [],
        },
        verification: { required_evidence: ["task_outcome"] },
        observed: { repository_effects: [], changed_paths: [] },
      },
      comments: [],
      doc_version: 3,
      doc_updated_at: "2026-08-12T00:00:00.000Z",
      doc_updated_by: "CODER",
      description: "Compatibility fixture",
      id_source: "generated",
    });

    expect(() => validateTaskReadmeFrontmatter(task)).not.toThrow();
    expect(task.execution_contract).toMatchObject({
      declaration: {
        schema_version: 2,
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
      },
      authority: {
        writable_roots: ["packages/app"],
        allowed_repository_effects: ["repository_write", "source_code"],
        allowed_external_effects: [],
      },
      observed: {
        external_effects: [],
        changed_components: [],
        verification_results: [],
        authority_violations: [],
      },
    });
  });
});
