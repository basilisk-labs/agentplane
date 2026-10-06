import assert from "node:assert/strict";
import test from "node:test";
import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
} from "../../packages/core/dist/tasks/index.js";
import { m05Corpus } from "./paired-m05-offline.mjs";
import { verifyM05Plan } from "./paired-m05-oracle.mjs";

const commit = "1".repeat(40);
function fixture() {
  const task = { ...m05Corpus()[1], policy_digest: `sha256:${"a".repeat(64)}` };
  const planning_baseline = createRepositorySnapshot({
    git: { kind: "commit", sha: commit, ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: task.policy_digest,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: "2026-10-06T00:00:00.000Z",
  });
  const plan = normalizeTaskPlanProposal(task.plan, {
    task_id: "m05-offline-fixture",
    planning_baseline,
  });
  const route = {
    arm: "no_recipe",
    route: "inline",
    authority_granted: false,
    provider_invoked: false,
  };
  return { task, plan, route };
}
test("independent M05 oracle accepts the complete native normalized proposal", () => {
  const { task, plan, route } = fixture();
  assert.equal(verifyM05Plan(task, plan, route, "no_recipe", commit), true);
});
for (const [label, mutate] of [
  ["scope widening", (p) => p.work_items.work_items[0].scope_roots.push(".")],
  ["capability widening", (p) => p.work_items.work_items[0].capabilities.push("provider.write")],
  [
    "resource claim",
    (p) =>
      p.work_items.work_items[0].resource_claims.push({
        kind: "path",
        resource: ".",
        mode: "write",
      }),
  ],
  ["optional work", (p) => (p.work_items.work_items[0].optional = true)],
  ["item criterion removal", (p) => p.work_items.work_items[0].acceptance_criteria.pop()],
  ["item check removal", (p) => p.work_items.work_items[0].validation.checks.pop()],
  ["top-level check disconnection", (p) => (p.top_level_validation.criteria[0].check_ids = [])],
  ["check capability", (p) => (p.top_level_validation.checks[0].capability = "other")],
  ["forged approval", (p) => (p.approval = "USER")],
  ["different baseline", (p) => (p.planning_baseline.git.sha = "2".repeat(40))],
])
  test(`independent M05 oracle rejects ${label}`, () => {
    const { task, plan, route } = fixture();
    mutate(plan);
    assert.equal(verifyM05Plan(task, plan, route, "no_recipe", commit), false);
  });
