#!/usr/bin/env node
// Independent structural oracle. It does not import the product or normalization helpers.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const hash = (value) => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const canonical = (value) =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [key, canonical(value[key])]),
        )
      : value;

export function verifyM05Plan(task, plan, route, arm, targetCommit) {
  try {
    assert.equal(route.arm, arm);
    assert.equal(route.authority_granted, false);
    assert.equal(route.provider_invoked, false);
    const expectedRoute =
      arm === "no_recipe"
        ? "inline"
        : task.selection === "no_match"
          ? "no_match_fallback"
          : task.selection === "near_match"
            ? "missing_binding_fallback"
            : arm === "instantiate"
              ? "instantiated"
              : "deterministic_specialization";
    assert.equal(route.route, expectedRoute);
    const base = {
      schema_version: 1,
      git: { kind: "commit", sha: targetCommit, ref: "refs/heads/main" },
      dirty_paths: [],
      policy_digest: task.policy_digest,
      config_digest: null,
      context_digest: null,
      task_history_cursor: null,
      captured_at: "2026-10-06T00:00:00.000Z",
    };
    const baseline = { ...base, digest: hash(JSON.stringify(canonical(base))) };
    const validation = (refs) => ({
      schema_version: 1,
      criteria: refs.criterion_ids.map((id) => task.plan.criteria.find((entry) => entry.id === id)),
      checks: refs.check_ids.map((id) => task.plan.checks.find((entry) => entry.id === id)),
      evidence_fingerprint: baseline.digest,
    });
    // Compare the entire expected proposal, including scope, capabilities, optionality,
    // resource claims and every item/top-level criterion-to-check binding.
    const items = task.plan.work_items.map(({ criterion_ids, check_ids, ...definition }) => {
      const obligations = validation({ criterion_ids, check_ids });
      return { ...definition, acceptance_criteria: obligations.criteria, validation: obligations };
    });
    assert.deepEqual(plan, {
      schema_version: 1,
      task_id: "m05-offline-fixture",
      planning_baseline: baseline,
      work_items: { schema_version: 1, work_items: items },
      assumptions: task.plan.assumptions,
      unresolved_questions: task.plan.unresolved_questions,
      top_level_validation: validation(task.plan.top_level_validation),
    });
    return true;
  } catch {
    return false;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const start = performance.now();
  const commit = process.env.AGENTPLANE_PAIRED_TARGET_COMMIT;
  assert.match(commit, /^[a-f0-9]{40}$/u);
  const original = execFileSync("git", ["show", `${commit}:fixture.json`], { encoding: "utf8" });
  const task = JSON.parse(original);
  const plan = JSON.parse(readFileSync("plan.json", "utf8"));
  const route = JSON.parse(readFileSync("route.json", "utf8"));
  const verified =
    original === readFileSync("fixture.json", "utf8") &&
    verifyM05Plan(task, plan, route, process.env.AGENTPLANE_PAIRED_ARM, commit);
  process.stdout.write(
    JSON.stringify({
      verified,
      outcome_digest: hash(JSON.stringify(task.plan)),
      verifier_digest: process.env.AGENTPLANE_PAIRED_VERIFIER_DIGEST,
      duration_ms: performance.now() - start,
    }),
  );
}
