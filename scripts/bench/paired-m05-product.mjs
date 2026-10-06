#!/usr/bin/env node
/* eslint n/hashbang: "off" -- Bundled product is executed directly by the campaign driver. */
// Deterministic offline treatment adapter. It prepares a Plan; it never admits or executes one.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
} from "../../packages/core/dist/tasks/index.js";
import {
  MissingScenarioParametersError,
  parseScenarioV2,
  resolveScenarioParameters,
} from "../../packages/recipes/dist/index.js";

const start = performance.now();
assert.equal(process.env.AGENTPLANE_PAIRED_MODE, "offline");
assert.equal(process.env.AGENTPLANE_PAIRED_FAKE_PROVIDER, "1");
assert.equal(process.env.AGENTPLANE_PAIRED_NETWORK, "deny");
const task = JSON.parse(readFileSync("fixture.json", "utf8"));
const arm = process.env.AGENTPLANE_PAIRED_ARM;
assert.ok(["no_recipe", "instantiate", "specialize"].includes(arm));
let compact = structuredClone(task.plan);
let route = "inline";
const stages = [];
const selectionStart = performance.now();
stages.push({ id: "fixture_input", duration_ms: selectionStart - start });
if (arm !== "no_recipe") {
  if (task.selection === "no_match") {
    // Exact selection only. An unrelated scenario is not a substitute.
    assert.notEqual(task.requested_scenario, task.scenario.id);
    route = "no_match_fallback";
  } else {
    assert.equal(task.requested_scenario, task.scenario.id);
    try {
      compact = resolveScenarioParameters(task.scenario, task.bindings).plan_template;
      route = "instantiated";
      if (arm === "specialize") {
        const draft = structuredClone(compact);
        draft.work_items[0].objective = "Fixture specialization input: semantic detail absent";
        // This deterministic fixture substitutes an exact known proposal. No model judged it.
        compact = { ...draft, work_items: structuredClone(task.plan.work_items) };
        route = "deterministic_specialization";
      }
    } catch (error) {
      assert.equal(task.selection, "near_match");
      assert.ok(error instanceof MissingScenarioParametersError);
      assert.deepEqual(error.parameterNames, ["objective"]);
      compact = structuredClone(task.plan);
      route = "missing_binding_fallback";
    }
  }
}
stages.push({
  id: "selection_and_fixture_planning",
  duration_ms: performance.now() - selectionStart,
});
const normalizationStart = performance.now();
// A Recipe/model field cannot manufacture lifecycle approval.
assert.throws(() => parseScenarioV2({ ...task.scenario, approval: "USER" }));
const baseline = createRepositorySnapshot({
  git: { kind: "commit", sha: process.env.AGENTPLANE_PAIRED_TARGET_COMMIT, ref: "refs/heads/main" },
  dirty_paths: [],
  policy_digest: task.policy_digest,
  config_digest: null,
  context_digest: null,
  task_history_cursor: null,
  captured_at: "2026-10-06T00:00:00.000Z",
});
const proposal = normalizeTaskPlanProposal(compact, {
  task_id: "m05-offline-fixture",
  planning_baseline: baseline,
});
writeFileSync("plan.json", JSON.stringify(proposal));
writeFileSync(
  "route.json",
  JSON.stringify({ arm, route, authority_granted: false, provider_invoked: false }),
);
const resultDigest = `sha256:${createHash("sha256").update(JSON.stringify(proposal)).digest("hex")}`;
stages.push({
  id: "normalization_and_fixture_output",
  duration_ms: performance.now() - normalizationStart,
});
process.stdout.write(
  JSON.stringify({
    status: "completed",
    result_digest: resultDigest,
    violations: [],
    stages,
    token_usage: {
      state: "unavailable",
      input_tokens: null,
      cached_input_tokens: null,
      output_tokens: null,
      reasoning_tokens: null,
      total_tokens: null,
      reason: "Deterministic offline Plan preparation; no provider usage was observed.",
    },
    observed_identity: {
      adapter: process.env.AGENTPLANE_PAIRED_ADAPTER,
      model: process.env.AGENTPLANE_PAIRED_MODEL,
      reasoning_effort: process.env.AGENTPLANE_PAIRED_REASONING_EFFORT,
      authority_digest: process.env.AGENTPLANE_PAIRED_AUTHORITY_DIGEST,
      check_ids: JSON.parse(process.env.AGENTPLANE_PAIRED_CHECK_IDS),
      retry_limit: Number(process.env.AGENTPLANE_PAIRED_RETRY_LIMIT),
      runtime_profile: JSON.parse(process.env.AGENTPLANE_PAIRED_RUNTIME_PROFILE),
    },
  }),
);
