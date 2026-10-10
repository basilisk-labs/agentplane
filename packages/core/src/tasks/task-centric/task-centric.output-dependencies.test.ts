import { describe, expect, it } from "vitest";
import { validateWorkItemGraph } from "./graph.js";
import { taskCentricDigest } from "./digest.js";
import type { ValidationPlan, WorkItem } from "./model.js";

function validation(id: string): ValidationPlan {
  const checkId = `check-${id}`;
  return {
    schema_version: 1,
    criteria: [
      {
        id: `criterion-${id}`,
        description: `Validate ${id}`,
        required: true,
        check_ids: [checkId],
      },
    ],
    checks: [{ id: checkId, kind: "deterministic", required: true, capability: "test" }],
    evidence_fingerprint: taskCentricDigest({ id }),
  };
}

function item(opts: Partial<WorkItem> & Pick<WorkItem, "id">): WorkItem {
  const plan = validation(opts.id);
  return {
    id: opts.id,
    objective: opts.objective ?? `Implement ${opts.id}`,
    depends_on: opts.depends_on ?? [],
    required_inputs: opts.required_inputs ?? [],
    expected_outputs: opts.expected_outputs ?? [`out-${opts.id}`],
    scope_roots: opts.scope_roots ?? [`packages/${opts.id}`],
    acceptance_criteria: opts.acceptance_criteria ?? plan.criteria,
    validation: opts.validation ?? plan,
    context: opts.context ?? {
      required_sources: ["repository"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 16_384,
    },
    risk: opts.risk ?? "medium",
    capabilities: opts.capabilities ?? ["test"],
    resource_claims: opts.resource_claims ?? [
      { kind: "path", resource: `packages/${opts.id}`, mode: "write" },
    ],
    optional: opts.optional ?? false,
    priority: opts.priority ?? 0,
  };
}

describe("native graph output references", () => {
  it("rejects dangling and self inputs and duplicate output producers", () => {
    expect(
      validateWorkItemGraph({
        schema_version: 1,
        work_items: [item({ id: "a", required_inputs: ["missing"] })],
      }),
    ).toContainEqual(expect.objectContaining({ code: "missing_input_declaration" }));
    expect(
      validateWorkItemGraph({
        schema_version: 1,
        work_items: [item({ id: "a", required_inputs: ["out-a"] })],
      }),
    ).toContainEqual(expect.objectContaining({ code: "missing_input_declaration" }));
    expect(
      validateWorkItemGraph({
        schema_version: 1,
        work_items: [item({ id: "a" }), item({ id: "b", expected_outputs: ["out-a"] })],
      }),
    ).toContainEqual(expect.objectContaining({ code: "duplicate_output_declaration" }));
    expect(
      validateWorkItemGraph({
        schema_version: 1,
        work_items: [
          item({ id: "a" }),
          item({ id: "b", depends_on: ["a"], required_inputs: ["out-a"] }),
        ],
      }),
    ).toEqual([]);
  });
});

describe("effective input-producer dependencies", () => {
  it.each(["input-only", "mixed"] as const)("rejects a %s prerequisite cycle", (kind) => {
    const graph = {
      schema_version: 1 as const,
      work_items: [
        item({
          id: "a",
          ...(kind === "input-only" ? { required_inputs: ["out-b"] } : { depends_on: ["b"] }),
        }),
        item({ id: "b", required_inputs: ["out-a"] }),
      ],
    };
    expect(validateWorkItemGraph(graph)).toContainEqual(
      expect.objectContaining({ code: "dependency_cycle" }),
    );
  });

  it("accepts an acyclic input-only producer chain without rewriting explicit dependencies", () => {
    const graph = {
      schema_version: 1 as const,
      work_items: [
        item({ id: "a" }),
        item({ id: "b", required_inputs: ["out-a"] }),
        item({ id: "c", required_inputs: ["out-b"] }),
      ],
    };
    const before = structuredClone(graph);
    expect(validateWorkItemGraph(graph)).toEqual([]);
    expect(graph).toEqual(before);
  });
});
