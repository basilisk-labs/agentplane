import assert from "node:assert/strict";
import { compileScenarioInstantiation } from "../../../../packages/recipes/dist/index.js";
import { digest } from "./contract.mjs";

// Reusable strategy only. There is no answer patch or precomputed inline Plan.
export function codingRecipe(spec, { specialize = false } = {}) {
  if (spec.selection === "no_match") return null;
  const parameters = [{ name: "objective", type: "string", required: true }];
  if (spec.selection === "near_match")
    parameters.push({ name: "delimiter", type: "string", required: true });
  return {
    schema_version: "2",
    id: spec.id,
    goal: "Repair {{objective}}",
    parameters,
    applicability: { required: [{ kind: "path_exists", path: "src/module.mjs" }], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [
        {
          id: "behavior",
          description: "Implement {{objective}} without changing checks",
          required: true,
          check_ids: ["visible"],
        },
      ],
      checks: [
        {
          id: "visible",
          kind: "deterministic",
          command: "node visible.test.mjs",
          required: true,
          capability: "task.verify",
        },
      ],
      work_items: [
        {
          id: "repair",
          objective:
            "Inspect the source and implement {{objective}}. Preserve tests and public behavior outside the stated change.",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["patch"],
          scope_roots: ["src/module.mjs"],
          context: {
            required_sources: ["README.md", "src/module.mjs", "visible.test.mjs"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 8192,
          },
          risk: "low",
          capabilities: ["repository_write", "task.verify"],
          resource_claims: [{ kind: "path", resource: "src/module.mjs", mode: "write" }],
          optional: false,
          priority: 0,
        },
      ],
      assumptions: [],
      unresolved_questions: specialize
        ? [
            "Inspect the implementation and identify the task-specific edge cases before admitting the executable Plan.",
          ]
        : [],
    },
  };
}
export function prepareCodingRecipe({
  spec,
  scenario,
  expectedScenarioDigest,
  bindings,
  taskId,
  planningBaseline,
}) {
  if (scenario === null) {
    assert.equal(spec.selection, "no_match");
    return { kind: "no_match", coding_success: false, fallback: "native_ordinary_planning" };
  }
  assert.equal(scenario.id, spec.id, "Wrong Recipe scenario");
  assert.equal(digest(scenario), expectedScenarioDigest, "Recipe source changed");
  // This pure result is preparation only; actual retention, path/applicability
  // observations and admission stay with task create/plan set --recipe-file.
  return compileScenarioInstantiation({
    mode: "instantiate",
    scenario,
    bindings,
    task_id: taskId,
    planning_baseline: planningBaseline,
  });
}
