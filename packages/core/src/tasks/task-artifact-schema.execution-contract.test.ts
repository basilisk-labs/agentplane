import { describe, expect, it } from "vitest";
import { validateTaskReadmeFrontmatter, withTaskReadmeFrontmatterDefaults } from "../index.js";

function fixture(authority: Record<string, unknown>) {
  return {
    id: "202610300000-AUTH01",
    title: "Retain authority presence",
    status: "TODO",
    priority: "med",
    owner: "EXECUTOR",
    doc_version: 3,
    doc_updated_at: "2026-10-30T00:00:00.000Z",
    doc_updated_by: "EXECUTOR",
    description: "Bounded authority fixture",
    execution_contract: {
      schema_version: 1,
      source: "agent_declared",
      declaration: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["source.ts"],
        repository_effects: ["source_code"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["Bounded fixture"],
      },
      selected_mode: "direct",
      repository_mode: "direct",
      reason_codes: ["explicit_direct"],
      authority,
      safety: { requires_worktree: false, requires_user_approval: false, approval_effects: [] },
      verification: { required_evidence: ["task_outcome"] },
      observed: { repository_effects: [], changed_paths: [] },
    },
  };
}

describe("optional execution authority fields", () => {
  it.each(["allowed_capabilities", "allowed_resources"])(
    "preserves absent and explicit %s through defaults and validation",
    (field) => {
      for (const value of [undefined, [], ["repository_write", "fixture"]]) {
        const authority = value === undefined ? {} : { [field]: value };
        const normalized = withTaskReadmeFrontmatterDefaults(fixture(authority));
        const validated = validateTaskReadmeFrontmatter(normalized);
        const actual = validated.execution_contract!.authority;
        expect(Object.hasOwn(actual, field)).toBe(value !== undefined);
        if (value !== undefined) expect(actual[field as keyof typeof actual]).toEqual(value);
      }
    },
  );
  it.each(["allowed_capabilities", "allowed_resources"])(
    "rejects malformed present %s instead of converting it to empty authority",
    (field) => {
      for (const value of [null, "repository_write", 1, {}, [null], [""]]) {
        const normalized = withTaskReadmeFrontmatterDefaults(fixture({ [field]: value }));
        expect(() => validateTaskReadmeFrontmatter(normalized), JSON.stringify(value)).toThrow();
      }
    },
  );
});
