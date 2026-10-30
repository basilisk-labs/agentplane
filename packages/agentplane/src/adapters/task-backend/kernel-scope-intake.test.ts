import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../backends/task-backend.js";
import {
  resolveTaskExecutionContract,
  reconcileTaskExecutionContract,
} from "../../runtime/task-routing/resolve.js";
import { taskRecordToData } from "../../backends/task-backend.js";
import { normalizeVerificationContract } from "../../backends/task-backend/shared/normalize-verification-contract.js";
import {
  amendedScopeIntake,
  completedScopeIntake,
  scopeIntakeDigest,
} from "./kernel-scope-intake.js";

function fixture(
  mode: "direct" | "branch_pr" = "direct",
  effects: ("source_code" | "ci" | "documentation")[] = ["source_code"],
) {
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
        repository_effects: effects,
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
  it("preserves existing ci and documentation grants in a redundant exact request", () => {
    const task = fixture("branch_pr", ["source_code", "ci", "documentation"]);
    const next = amendedScopeIntake(task, ["fixture.test.ts"], ["ci", "documentation", "tests"]);
    expect(next.authority.allowed_repository_effects).toEqual(
      expect.arrayContaining(["ci", "documentation", "tests"]),
    );
    expect(next.authority.allowed_external_effects).toEqual(
      task.execution_contract!.authority.allowed_external_effects,
    );
    const denied = structuredClone(task);
    denied.execution_contract!.authority.forbidden_repository_effects.push("ci");
    expect(() => amendedScopeIntake(denied, ["fixture.test.ts"], ["ci", "tests"])).toThrow(
      "independently constrained",
    );
    expect(() => amendedScopeIntake(fixture(), ["fixture.test.ts"], ["ci", "tests"])).toThrow(
      "unsupported repository effect",
    );
  });
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

const decodeContract = (contract: TaskData["execution_contract"]) =>
  taskRecordToData({
    id: "T-1",
    frontmatter: {
      id: "T-1",
      title: "Authority fixture",
      status: "DONE",
      priority: "med",
      owner: "EXECUTOR",
      execution_contract: contract,
    } as never,
    body: "",
    readmePath: "fixture",
  });

describe("completed intake authority and historical verification", () => {
  it("retains optional grant presence, independent restrictions and a broader historical floor", () => {
    const task = fixture("branch_pr");
    const contract = task.execution_contract!;
    contract.authority.allowed_capabilities = ["repository_write"];
    contract.authority.allowed_resources = [];
    // This deny is independent of the generated complement and must remain exact.
    contract.authority.forbidden_repository_effects = ["ci"];
    contract.observed.verification_results = [{ id: "prior", result: "pass" }];
    const historical = reconcileTaskExecutionContract({
      contract,
      changed_paths: ["packages/core/src/tasks/task-kernel/kernel.ts"],
    }).contract;
    contract.verification.contract = historical.verification.contract;
    const before = structuredClone(contract);
    const next = completedScopeIntake(task, ["helper.test.ts"], ["tests"]);
    expect(next.authority.allowed_capabilities).toEqual(["repository_write"]);
    expect(Object.hasOwn(next.authority, "allowed_resources")).toBe(true);
    expect(next.authority.forbidden_repository_effects).toEqual(
      before.authority.forbidden_repository_effects,
    );
    expect(next.observed.verification_results).toEqual(before.observed.verification_results);
    expect(next.observed.changed_paths).toEqual(before.observed.changed_paths);
    expect(next.verification.contract?.selected_checks).toEqual(
      expect.arrayContaining(before.verification.contract!.selected_checks),
    );
    expect(next.verification.contract?.observed.changed_files).toContain(
      "packages/core/src/tasks/task-kernel/kernel.ts",
    );
    expect(normalizeVerificationContract(next.verification.contract)).not.toBeNull();
    expect(task.execution_contract).toEqual(before);
    const absent = fixture("branch_pr");
    delete absent.execution_contract!.authority.allowed_capabilities;
    delete absent.execution_contract!.authority.allowed_resources;
    const projected = completedScopeIntake(absent, ["helper.ts"], []);
    expect(Object.hasOwn(projected.authority, "allowed_capabilities")).toBe(false);
    expect(Object.hasOwn(projected.authority, "allowed_resources")).toBe(false);
  });
  it("keeps an independent denial effective against a requested effect or required path effect", () => {
    const task = fixture("branch_pr");
    task.execution_contract!.authority.forbidden_repository_effects = ["tests"];
    expect(() => completedScopeIntake(task, ["helper.test.ts"], ["tests"])).toThrow(
      "independent effect restriction",
    );
    expect(() => completedScopeIntake(task, ["helper.test.ts"], [])).toThrow(
      "forbidden or unrequested",
    );
  });
  it.each(["allowed_capabilities", "allowed_resources"] as const)(
    "backend preserves exact presence of %s and rejects malformed grants",
    (field) => {
      const task = fixture("branch_pr");
      for (const value of [undefined, [], ["repository_write"]]) {
        const contract = structuredClone(task.execution_contract!);
        delete contract.authority[field];
        if (value !== undefined) contract.authority[field] = value;
        const decoded = decodeContract(contract).execution_contract!.authority;
        expect(Object.hasOwn(decoded, field)).toBe(value !== undefined);
        if (value !== undefined) expect(decoded[field]).toEqual(value);
      }
      for (const value of [null, "repository_write", {}, [null], [""]]) {
        const contract = structuredClone(task.execution_contract!);
        Object.assign(contract.authority, { [field]: value });
        expect(() => decodeContract(contract)).toThrow(
          `Malformed execution authority field: ${field}`,
        );
      }
    },
  );
});
