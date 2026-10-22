import assert from "node:assert/strict";
import test from "node:test";
import { createRepositorySnapshot } from "../../../../packages/core/dist/tasks/index.js";
import { codingCases } from "./coding-corpus.mjs";
import { codingRecipe, prepareCodingRecipe } from "./coding-recipe.mjs";
import { digest } from "./contract.mjs";
const baseline = createRepositorySnapshot({
  git: { kind: "commit", sha: "1".repeat(40), ref: "refs/heads/main" },
  dirty_paths: [],
  policy_digest: `sha256:${"a".repeat(64)}`,
  config_digest: null,
  context_digest: null,
  task_history_cursor: null,
  captured_at: "2026-10-08T00:00:00.000Z",
});
const prepare = (spec, scenario, bindings) =>
  prepareCodingRecipe({
    spec,
    scenario,
    bindings,
    expectedScenarioDigest: digest(scenario),
    taskId: "fixture",
    planningBaseline: baseline,
  });
test("coding Recipe uses the real compiler without an answer patch", () => {
  const spec = codingCases()[0];
  const scenario = codingRecipe(spec);
  const result = prepare(spec, scenario, [{ name: "objective", value: spec.objective }]);
  assert.equal(result.kind, "compiled");
  assert.equal(JSON.stringify(result).includes(spec.reference), false);
  assert.equal(
    prepare(spec, codingRecipe(spec, { specialize: true }), [
      { name: "objective", value: spec.objective },
    ]).kind,
    "specialization_required",
  );
});
test("near match refuses missing binding and no match requires genuine planning", () => {
  const spec = codingCases()[4];
  const result = prepare(spec, codingRecipe(spec), [{ name: "objective", value: spec.objective }]);
  assert.equal(result.kind, "needs_evidence");
  assert.equal(result.evidence_needs[0].name, "delimiter");
  const absent = codingCases()[3];
  assert.deepEqual(prepare(absent, null, []), {
    kind: "no_match",
    coding_success: false,
    fallback: "native_ordinary_planning",
  });
});
test("wrong or modified Recipe cannot substitute the pinned source", () => {
  const spec = codingCases()[0],
    scenario = codingRecipe(spec);
  assert.throws(
    () =>
      prepareCodingRecipe({
        spec,
        scenario: { ...scenario, goal: "changed" },
        expectedScenarioDigest: digest(scenario),
        bindings: [],
        taskId: "fixture",
        planningBaseline: baseline,
      }),
    /Recipe source changed/u,
  );
  assert.throws(() => prepare(spec, codingRecipe(codingCases()[1]), []), /Wrong Recipe/u);
});
