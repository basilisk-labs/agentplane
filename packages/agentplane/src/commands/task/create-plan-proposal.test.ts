import { describe, expect, it } from "vitest";
import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
  taskKernel as k,
  assertSuppliedAggregateDefinition,
  kernelWorkContractSchema,
  planObligationIssues,
} from "@agentplaneorg/core/tasks";
import { compactPlanInput } from "./create-plan-input.testkit.js";
import { assertCanonicalPlanWithinExecutionContract } from "./kernel-plan-authority.js";
import { suppliedKernelProposal, legacySuppliedKernelProposal } from "./create-plan-proposal.js";
import { canonicalPlanFromProposal } from "./kernel-plan-proposal.js";
import { kernelDocumentIssues } from "../../adapters/task-backend/kernel-documents.js";

const baseline = createRepositorySnapshot({
  git: { kind: "commit", sha: "a".repeat(40), ref: null },
  dirty_paths: [],
  policy_digest: null,
  config_digest: null,
  context_digest: null,
  task_history_cursor: null,
  captured_at: "2026-10-10T00:00:00.000Z",
});
const task = {
  verify: ["node visible.test.mjs"],
  execution_contract: {
    declaration: { repository_effects: ["source_code"], external_effects: [] },
    authority: { allowed_capabilities: ["task.verify"] },
  },
} as Parameters<typeof suppliedKernelProposal>[1];
function input() {
  const base = compactPlanInput();
  const ids = ["inspect", "implement", "verify"];
  return {
    ...base,
    criteria: [
      ...ids.map((id) => ({
        id,
        description: `${id} phase only`,
        required: true,
        check_ids: [id],
      })),
      {
        id: "final",
        description: "Final objective is satisfied",
        required: true,
        check_ids: ["final"],
      },
    ],
    checks: [
      ...ids.map((id) => ({ id, kind: "semantic", required: true, capability: "task.verify" })),
      {
        id: "final",
        kind: "deterministic",
        required: true,
        capability: "task.verify",
        command: "node visible.test.mjs",
      },
    ],
    work_items: ids.map((id, i) => ({
      ...base.work_items[0]!,
      id,
      depends_on: i ? [ids[i - 1]!] : [],
      expected_outputs: [`${id}-evidence`],
      criterion_ids: [id],
      check_ids: [id],
    })),
    top_level_validation: { criterion_ids: ["final"], check_ids: ["final"] },
  };
}
function normalized(value: unknown = input()) {
  return normalizeTaskPlanProposal(value, { task_id: "T-1", planning_baseline: baseline });
}
describe("phase-local supplied Plan conversion", () => {
  it("preserves local contracts and requires a separately bound final review stage", () => {
    const source = normalized();
    const before = structuredClone(source);
    const proposal = suppliedKernelProposal(source, task);
    expect(source).toEqual(before);
    expect(proposal.work_items.slice(0, 3).map((x) => x.contract.acceptance_criteria)).toEqual([
      ["inspect phase only"],
      ["implement phase only"],
      ["verify phase only"],
    ]);
    const final = proposal.work_items[3]!;
    expect(final.optional).toBe(false);
    expect(final.depends_on).toEqual(["inspect", "implement", "verify"]);
    expect(final.contract.acceptance_criteria).toEqual(["Final objective is satisfied"]);
    expect(final.contract.verification_commands).toEqual(["node visible.test.mjs"]);
    expect(final.execution_requirements.repository_effects).toEqual([]);
    expect(final.execution_requirements.external_effects).toEqual([]);
    const plan = canonicalPlanFromProposal(proposal, 1);
    expect(() =>
      assertSuppliedAggregateDefinition(source, plan.work_items[3]!, final.contract),
    ).not.toThrow();
    const intent = {
      objective: "Example",
      context: "Public test",
      plan_input_digest: k.kernelDigest(source),
    };
    const aggregate = {
      id: "T-1",
      intent_digest: k.kernelDigest(intent),
      current_plan: plan,
      plan_history: [],
    } as unknown as k.TaskAggregate;
    const documents = {
      intent,
      contracts: Object.fromEntries(
        proposal.work_items.map((x) => [k.kernelDigest(x.contract), x.contract]),
      ),
      plan_inputs: { [String(k.kernelDigest(source))]: source },
    };
    expect(kernelDocumentIssues(aggregate, documents)).toEqual([]);
    const forged = structuredClone(aggregate);
    forged.current_plan!.work_items[3]!.depends_on = [];
    forged.current_plan!.digest = k.kernelDigest({
      revision: 1,
      work_items: forged.current_plan!.work_items,
    });
    expect(kernelDocumentIssues(forged, documents)).toContain(
      `generated_aggregate_binding:${final.id}`,
    );
  });
  it("rejects marker removal and transferred final criteria through document admission and refinement", () => {
    const source = normalized();
    const proposal = suppliedKernelProposal(source, task);
    const original = canonicalPlanFromProposal(proposal, 1);
    const intent = {
      objective: "Example",
      context: "Public test",
      plan_input_digest: k.kernelDigest(source),
    };
    const contracts = Object.fromEntries(
      proposal.work_items.map((item) => [k.kernelDigest(item.contract), item.contract]),
    );
    const altered = structuredClone(proposal);
    delete altered.work_items[3]!.contract.generated_origin;
    for (const item of altered.work_items)
      contracts[String(k.kernelDigest(item.contract))] = item.contract;
    const current = canonicalPlanFromProposal(altered, 2);
    const aggregate = {
      id: "T-1",
      intent_digest: k.kernelDigest(intent),
      current_plan: current,
      plan_history: [original],
    } as unknown as k.TaskAggregate;
    const documents = {
      intent,
      contracts,
      plan_inputs: { [String(k.kernelDigest(source))]: source },
    };
    expect(kernelDocumentIssues(aggregate, documents)).toContain(
      `generated_aggregate_binding:${original.work_items[3]!.id}`,
    );
    expect(planObligationIssues(original.work_items, current.work_items, contracts)).toContain(
      `generated_aggregate_obligation_changed:${original.work_items[3]!.id}`,
    );
    const removed = structuredClone(proposal);
    const final = removed.work_items.pop()!;
    removed.work_items[0]!.contract.acceptance_criteria.push(...final.contract.acceptance_criteria);
    removed.work_items[0]!.contract.verification_commands.push(
      ...final.contract.verification_commands,
    );
    removed.work_items[0]!.expected_outputs.push(...final.expected_outputs);
    for (const item of removed.work_items)
      contracts[String(k.kernelDigest(item.contract))] = item.contract;
    const replacement = canonicalPlanFromProposal(removed, 3);
    expect(planObligationIssues(original.work_items, replacement.work_items, contracts)).toContain(
      `generated_aggregate_obligation_changed:${final.id}`,
    );
    expect(kernelDocumentIssues({ ...aggregate, current_plan: replacement }, documents)).toContain(
      `generated_aggregate_obligation_changed:${final.id}`,
    );
  });

  it("admits the aggregate without synthesizing write-to-read resources or capabilities", () => {
    const source = normalized();
    source.work_items.work_items[0]!.resource_claims = [
      { kind: "path", resource: "src/module.mjs", mode: "write" },
      { kind: "path", resource: "visible.test.mjs", mode: "read" },
    ];
    const admitted = structuredClone(task);
    Object.assign(admitted.execution_contract!.authority, {
      writable_roots: [],
      allowed_repository_effects: ["source_code"],
      allowed_external_effects: [],
      allowed_capabilities: [],
      allowed_resources: ["path:src/module.mjs:write", "path:visible.test.mjs:read"],
    });
    const proposal = suppliedKernelProposal(source, admitted);
    expect(proposal.work_items.at(-1)!.execution_requirements.resources).toEqual([
      "path:visible.test.mjs:read",
    ]);
    expect(proposal.work_items.at(-1)!.execution_requirements.capabilities).toEqual([]);
    expect(() =>
      assertCanonicalPlanWithinExecutionContract(admitted, canonicalPlanFromProposal(proposal, 1)),
    ).not.toThrow();
  });

  it("preserves full-form plans with no top-level obligations and retains checks-only final validation", () => {
    const source = normalized();
    source.top_level_validation.criteria = [];
    source.top_level_validation.checks = [];
    expect(suppliedKernelProposal(source, task).work_items).toHaveLength(3);
    expect(legacySuppliedKernelProposal(source, task).work_items).toHaveLength(3);
    source.top_level_validation.checks = normalized().top_level_validation.checks;
    const aggregate = suppliedKernelProposal(source, task).work_items[3]!;
    expect(aggregate.contract.acceptance_criteria).toEqual([
      "Top-level validation check final passes with retained evidence.",
    ]);
    expect(aggregate.contract.verification_commands).toEqual(["node visible.test.mjs"]);
    expect(legacySuppliedKernelProposal(source, task).work_items).toHaveLength(3);
  });

  it("keeps optional source items optional without making them aggregate prerequisites", () => {
    const value = input();
    value.work_items.push({
      ...value.work_items[0]!,
      id: "optional",
      optional: true,
      depends_on: [],
      expected_outputs: ["optional-evidence"],
    });
    const proposal = suppliedKernelProposal(normalized(value), task);
    expect(proposal.work_items[3]!.optional).toBe(true);
    expect(proposal.work_items[4]!.depends_on).toEqual(["inspect", "implement", "verify"]);
    expect(new Set(proposal.work_items.map((x) => x.id)).size).toBe(5);
  });
  it.each(["missing", "unknown"])("rejects %s local criterion references", (kind) => {
    const value = input();
    value.work_items[0]!.criterion_ids = kind === "missing" ? [] : ["unknown"];
    expect(() => normalized(value)).toThrow();
  });
  it("preserves legacy single-item conversion and accepts old contracts without a marker", () => {
    const proposal = suppliedKernelProposal(normalized(compactPlanInput()), task);
    expect(proposal.work_items).toHaveLength(1);
    expect(proposal.work_items[0]!.contract.generated_origin).toBeUndefined();
    expect(kernelWorkContractSchema.parse(proposal.work_items[0]!.contract)).toEqual(
      proposal.work_items[0]!.contract,
    );
  });
  it.each(["criteria", "digest", "origin", "dependencies", "identity"])(
    "rejects forged aggregate %s",
    (field) => {
      const source = normalized();
      const proposal = suppliedKernelProposal(source, task);
      const final = proposal.work_items[3]!;
      const definition = canonicalPlanFromProposal(proposal, 1).work_items[3]!;
      if (field === "criteria") final.contract.acceptance_criteria = ["Everything passes"];
      if (field === "digest") final.contract.plan_input_digest = `sha256:${"0".repeat(64)}`;
      if (field === "origin") delete final.contract.generated_origin;
      if (field === "dependencies") definition.depends_on = [];
      if (field === "identity") definition.id = "forged";
      expect(() => assertSuppliedAggregateDefinition(source, definition, final.contract)).toThrow(
        "exact retained source",
      );
    },
  );
});
