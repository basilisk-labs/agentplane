#!/usr/bin/env node
// Independent structural oracle: no import of the product adapter or its normalization helpers.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

const start = performance.now();
const task = JSON.parse(readFileSync("fixture.json", "utf8"));
const plan = JSON.parse(readFileSync("plan.json", "utf8"));
const route = JSON.parse(readFileSync("route.json", "utf8"));
let verified = false;
try {
  assert.equal(route.arm, process.env.AGENTPLANE_PAIRED_ARM);
  assert.equal(route.authority_granted, false);
  assert.equal(route.provider_invoked, false);
  const expectedRoute = route.arm === "no_recipe" ? "inline" : task.selection === "no_match"
    ? "no_match_fallback" : task.selection === "near_match" ? "missing_binding_fallback"
      : route.arm === "instantiate" ? "instantiated" : "deterministic_specialization";
  assert.equal(route.route, expectedRoute);
  assert.equal(plan.task_id, "m05-offline-fixture");
  assert.equal(plan.work_items.work_items.length, task.plan.work_items.length);
  for (const [index, item] of plan.work_items.work_items.entries()) {
    const expected = task.plan.work_items[index];
    for (const key of ["id", "objective", "depends_on", "required_inputs", "expected_outputs"])
      assert.deepEqual(item[key], expected[key]);
  }
  const validation = plan.top_level_validation;
  for (const expected of task.plan.criteria) {
    const criterion = validation.criteria.find((entry) => entry.id === expected.id);
    assert.equal(criterion.description, expected.description);
    assert.equal(criterion.required, true);
  }
  for (const expected of task.plan.checks) {
    const check = validation.checks.find((entry) => entry.id === expected.id);
    assert.equal(check.required, true);
    assert.equal(check.kind, expected.kind);
  }
  assert.equal(Object.hasOwn(plan, "approval"), false);
  assert.equal(Object.hasOwn(plan, "execution_grant"), false);
  verified = true;
} catch { /* A failed outcome remains an assigned failed attempt. */ }
process.stdout.write(JSON.stringify({ verified,
  outcome_digest: `sha256:${createHash("sha256").update(JSON.stringify(task.plan)).digest("hex")}`,
  verifier_digest: process.env.AGENTPLANE_PAIRED_VERIFIER_DIGEST,
  duration_ms: performance.now() - start,
}));
