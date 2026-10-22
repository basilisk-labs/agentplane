import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { stableJson } from "../../../lib/agent-efficiency-baseline.mjs";

export const digest = (value) =>
  `sha256:${createHash("sha256").update(stableJson(value)).digest("hex")}`;
export const roles = [
  "selection",
  "PLANNER",
  "specialization",
  "EXECUTOR",
  "EVALUATOR",
  "orchestration",
];
export const stages = [
  "setup",
  "preparation",
  "provider",
  "checks",
  "git_filesystem",
  "user_wait",
  "external_wait",
];
export const integer = (value) => Number.isSafeInteger(value) && value >= 0;
const text = (value) =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  !/^(unknown|pending|default)$/iu.test(value);
const hash = (value) => typeof value === "string" && /^sha256:[a-f0-9]{64}$/u.test(value);

// A contract is an identity declaration, never an approval or an adapter capability.
export function validateM05Contract(value) {
  const v = structuredClone(value);
  assert.equal(v.schema_version, 3);
  assert.equal(v.kind, "agentplane.m05_live_contract");
  for (const key of [
    "campaign_id",
    "objective",
    "adapter",
    "model",
    "effort",
    "sandbox",
    "network",
    "cache",
    "session",
    "rate_basis",
  ])
    assert.ok(text(v[key]), `Missing ${key}`);
  for (const key of [
    "product_digest",
    "oracle_digest",
    "policy_digest",
    "runtime_digest",
    "authority_digest",
    "corpus_digest",
    "randomization_digest",
  ])
    assert.ok(hash(v[key]), `Missing ${key}`);
  assert.ok(/^[a-f0-9]{40}$/u.test(v.target_sha));
  assert.ok(["managed", "external"].includes(v.transport));
  for (const key of ["max_tokens", "max_cost_microunits", "max_calls", "retry_limit"])
    assert.ok(integer(v.limits?.[key]), `Invalid finite ${key}`);
  assert.ok(v.limits.max_tokens > 0 && v.limits.max_cost_microunits > 0 && v.limits.max_calls > 0);
  assert.ok(Array.isArray(v.assignments) && v.assignments.length > 0);
  const ids = new Set();
  for (const [order, a] of v.assignments.entries()) {
    assert.ok(text(a.id) && /^[a-z0-9][a-z0-9-]*$/u.test(a.id) && !ids.has(a.id));
    ids.add(a.id);
    assert.equal(a.order, order);
    assert.ok(["no_recipe", "instantiate", "specialize"].includes(a.arm));
    assert.ok(text(a.task_id) && text(a.stratum));
  }
  return v;
}

export function validateM05Receipt(value, reservation) {
  const v = structuredClone(value);
  assert.ok(["completed", "failed", "blocked", "cancelled", "interrupted"].includes(v.status));
  assert.ok(hash(v.evidence_digest));
  assert.ok(["terminal", "not_started", "unknown"].includes(v.effect_state));
  if (v.status === "interrupted") assert.equal(v.effect_state, "unknown");
  if (v.verified) assert.equal(v.effect_state, "terminal");
  assert.equal(typeof v.verified, "boolean");
  if (v.verified) assert.equal(v.status, "completed");
  assert.ok(["observed", "partial", "unavailable", "unattributable"].includes(v.usage?.state));
  for (const key of [
    "input_tokens",
    "output_tokens",
    "cached_input_tokens",
    "reasoning_tokens",
    "total_tokens",
    "cost_microunits",
  ])
    assert.ok(v.usage[key] === null || integer(v.usage[key]), `Invalid usage ${key}`);
  const usageFields = [
    "input_tokens",
    "output_tokens",
    "cached_input_tokens",
    "reasoning_tokens",
    "total_tokens",
    "cost_microunits",
  ];
  const known = usageFields.filter((key) => v.usage[key] !== null).length;
  if (["unavailable", "unattributable"].includes(v.usage.state))
    assert.equal(known, 0, "Unknown usage must remain null");
  if (v.usage.state === "partial")
    assert.ok(known > 0 && known < usageFields.length, "Partial usage must be incomplete");
  if (v.usage.state === "observed")
    assert.equal(known, usageFields.length, "Observed usage must be complete");
  // Subsets bound their parent when the parent is unknown; they are never added twice.
  const lowerBound =
    Math.max(v.usage.input_tokens ?? 0, v.usage.cached_input_tokens ?? 0) +
    Math.max(v.usage.output_tokens ?? 0, v.usage.reasoning_tokens ?? 0);
  assert.ok(
    Number.isSafeInteger(lowerBound) && lowerBound <= reservation.max_tokens,
    "Known token components exceed reservation",
  );
  if (v.usage.total_tokens !== null)
    assert.ok(v.usage.total_tokens >= lowerBound, "Provider total contradicts known components");
  if (v.usage.state === "observed") {
    assert.ok(integer(v.usage.total_tokens) && integer(v.usage.cost_microunits));
    assert.equal(v.observed_model, reservation.model);
    assert.equal(v.observed_effort, reservation.effort);
  }
  if (v.usage.total_tokens !== null) assert.ok(v.usage.total_tokens <= reservation.max_tokens);
  if (v.usage.cost_microunits !== null)
    assert.ok(v.usage.cost_microunits <= reservation.max_cost_microunits);
  if (v.usage.cached_input_tokens !== null && v.usage.input_tokens !== null)
    assert.ok(v.usage.cached_input_tokens <= v.usage.input_tokens);
  if (v.usage.reasoning_tokens !== null && v.usage.output_tokens !== null)
    assert.ok(v.usage.reasoning_tokens <= v.usage.output_tokens);
  assert.ok(Array.isArray(v.spans));
  let end = 0;
  for (const span of v.spans) {
    assert.ok(stages.includes(span.stage) && integer(span.start_ms) && integer(span.end_ms));
    assert.ok(span.start_ms >= end && span.end_ms >= span.start_ms, "Overlapping spans");
    end = span.end_ms;
  }
  return v;
}
