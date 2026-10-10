import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../backends/task-backend.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/resolve.js";
import { amendedScopeIntake, scopeIntakeDigest } from "./kernel-scope-intake.js";

function fixture(mode: "direct" | "branch_pr" = "direct") {
  const config = defaultConfig();
  config.workflow_mode = mode;
  return {
    execution_contract: resolveTaskExecutionContract({
      config,
      task: {},
      declaration: {
        schema_version: 2,
        preferred_mode: mode,
        scope_roots: ["source.ts"],
        repository_effects: ["source_code"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["Test native scope admission"],
      },
    }),
  } as TaskData;
}

describe("prospective scope intake security", () => {
  it("changes only the generated local-effect complement and preserves external restrictions", () => {
    const task = fixture();
    const before = structuredClone(task.execution_contract!);
    const next = amendedScopeIntake(task, ["fixture.test.ts"], ["repository_write", "tests"]);
    expect(next.authority.allowed_repository_effects).toContain("tests");
    expect(next.authority.forbidden_repository_effects).not.toContain("tests");
    expect(next.authority.allowed_external_effects).toEqual(
      before.authority.allowed_external_effects,
    );
    expect(next.authority.forbidden_external_effects).toEqual(
      before.authority.forbidden_external_effects,
    );
    expect(next.safety).toEqual(before.safety);
    expect(next.verification.contract?.declared.repository_effects).toContain("tests");
    expect(scopeIntakeDigest(next)).not.toBe(scopeIntakeDigest(before));
    const evolved = structuredClone(next);
    evolved.observed.verification_results.push({ id: "native-check", result: "pass" });
    expect(scopeIntakeDigest(evolved)).toBe(scopeIntakeDigest(next));
    evolved.authority.writable_roots.push("unapproved.ts");
    expect(scopeIntakeDigest(evolved)).not.toBe(scopeIntakeDigest(next));
    expect(task.execution_contract).toEqual(before);
  });
  it("admits effect-only public API review in an existing isolated task", () => {
    const task = fixture("branch_pr");
    const next = amendedScopeIntake(task, [], ["public_api"]);
    expect(next.authority.writable_roots).toEqual(
      task.execution_contract!.authority.writable_roots,
    );
    expect(next.authority.allowed_repository_effects).toContain("public_api");
    expect(next.verification.contract?.declared.repository_effects).toContain("public_api");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    const resolved = resolveTaskExecutionContract({
      config,
      task: {},
      declaration: next.declaration,
    });
    expect(next.verification.contract?.selected_checks).toEqual(
      resolved.verification.contract?.selected_checks,
    );
    expect(next.verification.required_evidence).toContain("repository_effect:public_api");
    expect(next.authority.allowed_external_effects).toEqual(
      task.execution_contract!.authority.allowed_external_effects,
    );
    expect(next.selected_mode).toBe("branch_pr");
  });
  it("refuses to convert a direct task to isolated public API work implicitly", () => {
    expect(() => amendedScopeIntake(fixture(), [], ["public_api"])).toThrow("already isolated");
  });
  it.each(["security_boundary", "release_metadata", "dependencies", "ci", "schema"])(
    "rejects unsupported USER effect %s",
    (effect) => {
      expect(() => amendedScopeIntake(fixture(), ["fixture.test.ts"], [effect])).toThrow(
        "forbidden or unsupported",
      );
    },
  );
  it.each([
    ".git/config",
    ".agentplane/config.json",
    "AGENTS.md",
    "../outside",
    "/outside",
    "a/../b",
  ])("rejects protected or escaping root %s", (root) => {
    expect(() => amendedScopeIntake(fixture(), [root], ["tests"])).toThrow(
      "unsupported or protected",
    );
  });
  it("does not reinterpret a non-generated deny list as a removable complement", () => {
    const task = fixture();
    task.execution_contract!.authority.forbidden_repository_effects.push("source_code");
    expect(() => amendedScopeIntake(task, ["fixture.test.ts"], ["tests"])).toThrow(
      "independently constrained",
    );
  });
});
