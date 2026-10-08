import assert from "node:assert/strict";
import { digest, integer } from "./contract.mjs";

export function validateSubscriptionContract(input) {
  const v = structuredClone(input);
  assert.equal(v.schema_version, 4);
  assert.equal(v.kind, "agentplane.m05_subscription_contract");
  assert.equal(v.authentication, "chatgpt");
  assert.equal(v.metric, "tokens_per_verified_success");
  assert.equal(v.transport, "app_server");
  assert.equal(v.token_limit_enforcement, "soft_monitored");
  for (const key of ["campaign_id", "model", "effort", "sandbox", "network", "cache", "session"])
    assert.ok(
      typeof v[key] === "string" && v[key].trim() && !/^(unknown|pending|default)$/iu.test(v[key]),
      `Missing ${key}`,
    );
  for (const key of [
    "product_digest",
    "oracle_digest",
    "policy_digest",
    "runtime_digest",
    "authority_digest",
    "corpus_digest",
    "randomization_digest",
  ])
    assert.match(v[key], /^sha256:[a-f0-9]{64}$/u);
  assert.match(v.target_sha, /^[a-f0-9]{40}$/u);
  for (const key of [
    "max_calls",
    "max_episodes",
    "max_duration_ms",
    "turn_timeout_ms",
    "soft_token_ceiling",
  ])
    assert.ok(integer(v.limits?.[key]) && v.limits[key] > 0, `Invalid finite ${key}`);
  assert.ok(integer(v.limits.retry_limit));
  assert.ok(v.limits.turn_timeout_ms <= v.limits.max_duration_ms);
  assert.ok(
    Number.isFinite(v.limits.quota_cutoff_percent) &&
      v.limits.quota_cutoff_percent > 0 &&
      v.limits.quota_cutoff_percent < 100,
  );
  assert.ok(
    !Object.hasOwn(v.limits, "max_cost_microunits") && !Object.hasOwn(v, "rate_basis"),
    "Subscription is not a dollar measurement",
  );
  assert.ok(Array.isArray(v.assignments) && v.assignments.length > 0);
  const ids = new Set();
  for (const [order, a] of v.assignments.entries()) {
    assert.match(a.id, /^[a-z0-9][a-z0-9-]*$/u);
    assert.ok(!ids.has(a.id));
    ids.add(a.id);
    assert.equal(a.order, order);
    assert.ok(["no_recipe", "instantiate", "specialize"].includes(a.arm));
    assert.ok(
      typeof a.task_id === "string" && a.task_id && typeof a.stratum === "string" && a.stratum,
    );
  }
  return v;
}

export const tokenFields = [
  "inputTokens",
  "outputTokens",
  "cachedInputTokens",
  "reasoningOutputTokens",
  "totalTokens",
];
export function parseSubscriptionTokens(input) {
  const v = Object.fromEntries(tokenFields.map((key) => [key, input?.[key] ?? null]));
  for (const value of Object.values(v))
    assert.ok(value === null || integer(value), "Invalid token count");
  const lower =
    Math.max(v.inputTokens ?? 0, v.cachedInputTokens ?? 0) +
    Math.max(v.outputTokens ?? 0, v.reasoningOutputTokens ?? 0);
  assert.ok(Number.isSafeInteger(lower));
  if (v.totalTokens !== null) assert.ok(v.totalTokens >= lower, "Contradictory token total");
  if (v.inputTokens !== null && v.cachedInputTokens !== null)
    assert.ok(v.cachedInputTokens <= v.inputTokens);
  if (v.outputTokens !== null && v.reasoningOutputTokens !== null)
    assert.ok(v.reasoningOutputTokens <= v.outputTokens);
  const known = Object.values(v).filter((x) => x !== null).length;
  return {
    state: known === 0 ? "unavailable" : known === tokenFields.length ? "observed" : "partial",
    ...v,
  };
}

// codex-cli 0.157.1 AccountRateLimitsUpdatedNotification is a sparse delta.
// Keep only sanitized quota facts, never account identifiers or credit balances.
function quotaBucket(snapshot, previous = {}) {
  assert.ok(snapshot && typeof snapshot === "object", "Unknown quota");
  assert.notEqual(snapshot.spendControlReached, true, "Subscription spend control reached");
  assert.ok(
    snapshot.rateLimitReachedType === null || snapshot.rateLimitReachedType === undefined,
    "Subscription rate limit reached",
  );
  const bucket = { ...previous };
  for (const slot of ["primary", "secondary"]) {
    const window = snapshot[slot];
    if (window === null || window === undefined) continue;
    assert.ok(Number.isFinite(window.usedPercent) && window.usedPercent >= 0, "Unknown quota");
    const minutes = window.windowDurationMins ?? previous[slot]?.window_minutes ?? null;
    assert.ok(minutes === null || (integer(minutes) && minutes > 0), "Invalid quota window");
    bucket[slot] = { used_percent: window.usedPercent, window_minutes: minutes };
  }
  assert.ok(Object.keys(bucket).length > 0, "Unknown quota");
  return bucket;
}
function quotaState(buckets, source) {
  return {
    authentication: "chatgpt",
    ordinary_usage_allowed: true,
    entitlement_source: source,
    buckets,
    windows: Object.values(buckets).flatMap((bucket) => Object.values(bucket)),
  };
}
export function subscriptionQuota(account, response) {
  assert.equal(account?.account?.type, "chatgpt", "Managed ChatGPT subscription required");
  assert.equal(response?.ordinaryUsageAllowed, true, "Subscription usage is unavailable");
  assert.ok(response.rateLimits, "Unknown quota");
  const buckets = {};
  for (const [label, snapshot] of [
    ["codex", response.rateLimits],
    ...Object.entries(response.rateLimitsByLimitId ?? {}),
  ]) {
    const key = digest(snapshot.limitId ?? label);
    const bucket = quotaBucket(snapshot);
    if (Object.hasOwn(buckets, key))
      assert.deepEqual(buckets[key], bucket, "Conflicting quota snapshots");
    buckets[key] = bucket;
  }
  return quotaState(buckets, "account/rateLimits/read");
}
export function mergeSubscriptionQuota(previous, notification) {
  assert.equal(previous?.ordinary_usage_allowed, true, "No confirmed subscription preflight");
  if (Object.hasOwn(notification, "ordinaryUsageAllowed"))
    assert.equal(notification.ordinaryUsageAllowed, true, "Subscription usage revoked");
  const snapshot = notification.rateLimits;
  assert.ok(snapshot, "Missing quota delta");
  const key = digest(snapshot.limitId ?? "codex");
  const buckets = structuredClone(previous.buckets);
  buckets[key] = quotaBucket(snapshot, buckets[key]);
  return quotaState(buckets, "retained_preflight_with_sparse_update");
}
