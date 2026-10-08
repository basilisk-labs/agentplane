import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { digest } from "./contract.mjs";
import { openSubscriptionBoundary } from "./subscription-boundary.mjs";
import { openSubscriptionLedger } from "./subscription-ledger.mjs";
import {
  parseSubscriptionTokens,
  subscriptionQuota,
  mergeSubscriptionQuota,
  validateSubscriptionContract,
} from "./subscription-contract.mjs";

const noop = () => {};

function contract() {
  return {
    schema_version: 4,
    kind: "agentplane.m05_subscription_contract",
    authentication: "chatgpt",
    metric: "tokens_per_verified_success",
    transport: "app_server",
    token_limit_enforcement: "soft_monitored",
    campaign_id: "offline-test",
    model: "fixture-model",
    effort: "high",
    sandbox: "qualified-host",
    network: "deny",
    cache: "cold",
    session: "fresh-per-call",
    target_sha: "a".repeat(40),
    ...Object.fromEntries(
      ["product", "oracle", "policy", "runtime", "authority", "corpus", "randomization"].map(
        (k) => [`${k}_digest`, digest(k)],
      ),
    ),
    limits: {
      max_calls: 4,
      max_episodes: 4,
      max_duration_ms: 10_000,
      turn_timeout_ms: 1000,
      soft_token_ceiling: 100,
      retry_limit: 1,
      quota_cutoff_percent: 80,
    },
    assignments: [
      { id: "a", order: 0, task_id: "fix-parser", stratum: "direct", arm: "no_recipe" },
    ],
  };
}
const tokens = (n = 10) => ({
  inputTokens: n,
  outputTokens: n,
  cachedInputTokens: 2,
  reasoningOutputTokens: 1,
  totalTokens: n * 2,
});
const account = { account: { type: "chatgpt", email: "PRIVATE", id: "PRIVATE" } };
const quota = (used = 20) => ({
  ordinaryUsageAllowed: true,
  accountId: "PRIVATE",
  rateLimits: {
    primary: { usedPercent: used, windowDurationMins: 10_080 },
    secondary: null,
    credits: { balance: "PRIVATE" },
  },
});
const call = (id = "one", extra = {}) => ({
  id,
  assignment_id: "a",
  role: "EXECUTOR",
  episode_id: id,
  retry: 0,
  accounting_phase: "steady",
  ...extra,
});
async function fixture(t, customize = {}) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-subscription-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const c = customize.contract ?? contract();
  const requests = [];
  let listener = noop;
  let sequence = 0;
  let currentThread;
  const host = {
    authorize: async () => true,
    threadOptions: async () => ({ cwd: root, sandbox: "read-only" }),
    subscribe(fn) {
      listener = fn;
      return () => {
        listener = () => {};
      };
    },
    async request(method, params) {
      requests.push({ method, params });
      if (method === "account/read") return customize.account ?? account;
      if (method === "account/rateLimits/read") return customize.quota ?? quota();
      if (method === "thread/start") {
        currentThread = `thread-${++sequence}`;
        return {
          thread: { id: currentThread },
          model: c.model,
          reasoningEffort: c.effort,
          ...customize.thread,
        };
      }
      if (method === "turn/start") {
        const turnId = `turn-${sequence}`;
        const emit = (method, params) =>
          listener({ method, params: { threadId: currentThread, turnId, ...params } });
        if (customize.turn) await customize.turn({ emit, turnId, requests });
        else {
          emit("thread/tokenUsage/updated", { tokenUsage: { total: tokens() } });
          emit("turn/completed", { turn: { id: turnId, status: "completed" } });
        }
        return { turn: { id: turnId } };
      }
      if (method === "turn/interrupt") return {};
      throw new Error(`Unexpected method ${method}`);
    },
    ...customize.host,
  };
  const options = { contract: c, ledgerRoot: path.join(root, "ledger") };
  return { boundary: await openSubscriptionBoundary(options, host), root, options, host, requests };
}

test("subscription contract distinguishes soft tokens from currency and bounds each dimension", () => {
  assert.equal(validateSubscriptionContract(contract()).schema_version, 4);
  for (const field of [
    "max_calls",
    "max_episodes",
    "max_duration_ms",
    "turn_timeout_ms",
    "soft_token_ceiling",
  ]) {
    const c = contract();
    c.limits[field] = Infinity;
    assert.throws(() => validateSubscriptionContract(c));
  }
  for (const value of [0, 100, NaN]) {
    const c = contract();
    c.limits.quota_cutoff_percent = value;
    assert.throws(() => validateSubscriptionContract(c));
  }
  const c = contract();
  c.limits.max_cost_microunits = 0;
  assert.throws(() => validateSubscriptionContract(c), /dollar/u);
});

test("subscription usage rejects contradictions and preserves unknowns and subsets", () => {
  assert.equal(parseSubscriptionTokens(null).totalTokens, null);
  assert.equal(parseSubscriptionTokens({ totalTokens: 2 }).state, "partial");
  assert.equal(parseSubscriptionTokens(tokens()).totalTokens, 20);
  for (const bad of [
    { ...tokens(), totalTokens: 0 },
    { ...tokens(), cachedInputTokens: 30 },
    { ...tokens(), reasoningOutputTokens: 30 },
    { ...tokens(), outputTokens: -1 },
  ])
    assert.throws(() => parseSubscriptionTokens(bad));
});

test("subscription preflight rejects API auth, unavailable quota and exhaustion without dispatch", async (t) => {
  for (const custom of [
    { account: { account: { type: "apiKey" } } },
    { quota: { ...quota(), ordinaryUsageAllowed: false } },
    { quota: quota(80) },
    { quota: { ordinaryUsageAllowed: true, rateLimits: {} } },
  ]) {
    const f = await fixture(t, custom);
    await assert.rejects(f.boundary.execute(call(), [], {}));
    assert.equal(
      f.requests.some((r) => r.method === "turn/start"),
      false,
    );
    assert.equal(Object.keys(f.boundary.read().calls).length, 0);
  }
  assert.equal(JSON.stringify(subscriptionQuota(account, quota())).includes("PRIVATE"), false);
});

test("subscription native authority and observed identity cannot come from request echoes", async (t) => {
  await assert.rejects(fixture(t, { host: { authorize: async () => false } }), /authority/u);
  for (const thread of [
    { model: "other" },
    { reasoningEffort: null },
    { reasoningEffort: "low" },
  ]) {
    const f = await fixture(t, { thread });
    await assert.rejects(f.boundary.execute(call(), [], {}), /Observed/u);
    assert.equal(
      f.requests.some((r) => r.method === "turn/start"),
      false,
    );
  }
});

test("subscription records durable identity, role, setup and sanitized quota before provider dispatch", async (t) => {
  const f = await fixture(t);
  const result = await f.boundary.execute(
    call("one", { role: "PLANNER", accounting_phase: "setup" }),
    [],
    {},
  );
  assert.equal(result.usage.totalTokens, 20);
  assert.equal(result.identity_valid, true);
  const retained = f.boundary.read().calls.one;
  assert.equal(retained.reservation.accounting_phase, "setup");
  assert.equal(retained.reservation.role, "PLANNER");
  assert.equal(retained.turn_id, "turn-1");
  const files = readdirSync(f.options.ledgerRoot)
    .filter((x) => x.endsWith(".json"))
    .map((x) => readFileSync(path.join(f.options.ledgerRoot, x), "utf8"))
    .join("");
  assert.ok(!files.includes("PRIVATE"));
  assert.equal(result.token_overshoot, 0);
  const reopened = await openSubscriptionBoundary(f.options, f.host);
  await assert.rejects(reopened.execute(call(), [], {}), /replay/u);
});

test("subscription deduplicates cumulative events and records soft overshoot without a fake cap", async (t) => {
  const f = await fixture(t, {
    turn({ emit, turnId }) {
      for (const usage of [tokens(10), tokens(10), tokens(60)])
        emit("thread/tokenUsage/updated", { tokenUsage: { total: usage } });
      emit("turn/completed", { turn: { id: turnId, status: "completed" } });
    },
  });
  const r = await f.boundary.execute(call(), [], {});
  assert.equal(r.usage.totalTokens, 120);
  assert.equal(r.token_overshoot, 20);
  assert.equal(r.stop_reason, "soft_token_ceiling");
  await assert.rejects(f.boundary.execute(call("two"), [], {}), /stopped/u);
  assert.ok(f.requests.some((r) => r.method === "turn/interrupt"));
});

test("subscription conflicting or regressing cumulative events leave intent unresolved", async (t) => {
  for (const next of [{ ...tokens(), inputTokens: 9 }, tokens(9)]) {
    const f = await fixture(t, {
      turn({ emit, turnId }) {
        emit("thread/tokenUsage/updated", { tokenUsage: { total: tokens() } });
        emit("thread/tokenUsage/updated", { tokenUsage: { total: next } });
        emit("turn/completed", { turn: { id: turnId, status: "completed" } });
      },
    });
    await assert.rejects(f.boundary.execute(call(), [], {}));
    assert.equal(f.boundary.read().calls.one.receipt, null);
    await assert.rejects(f.boundary.execute(call("two"), [], {}), /Unresolved/u);
  }
});

test("subscription missing usage stays unknown and prevents another turn", async (t) => {
  const f = await fixture(t, {
    turn({ emit, turnId }) {
      emit("turn/completed", { turn: { id: turnId, status: "completed" } });
    },
  });
  const r = await f.boundary.execute(call(), [], {});
  assert.equal(r.usage.state, "unavailable");
  assert.equal(r.usage.totalTokens, null);
  assert.equal(r.token_overshoot, null);
  await assert.rejects(f.boundary.execute(call("two"), [], {}), /Unresolved/u);
});

test("subscription model rerouting and quota notifications stop subsequent dispatch", async (t) => {
  for (const method of ["model/rerouted", "account/rateLimits/updated"]) {
    const f = await fixture(t, {
      turn({ emit, turnId }) {
        emit(method, method.startsWith("account") ? quota(85) : { toModel: "other" });
        emit("thread/tokenUsage/updated", { tokenUsage: { total: tokens() } });
        emit("turn/completed", { turn: { id: turnId, status: "completed" } });
      },
    });
    const r = await f.boundary.execute(call(), [], {});
    assert.equal(r.stop_reason, method.startsWith("account") ? "quota_cutoff" : "model_rerouted");
    assert.equal(r.identity_valid, method.startsWith("account"));
    if (method.startsWith("account")) assert.equal(r.quota_overshoot_percent, 5);
    await assert.rejects(f.boundary.execute(call("two"), [], {}), /stopped/u);
  }
});

test("subscription interruption after intent never replays uncertain provider effects", async (t) => {
  const f = await fixture(t, {
    turn() {
      throw new Error("connection lost");
    },
  });
  await assert.rejects(f.boundary.execute(call(), [], {}), /connection lost/u);
  assert.equal(f.boundary.read().calls.one.receipt, null);
  const reopened = await openSubscriptionBoundary(f.options, f.host);
  await assert.rejects(reopened.execute(call("two"), [], {}), /Unresolved/u);
  assert.equal(f.requests.filter((r) => r.method === "turn/start").length, 1);
});

test("subscription finite call, episode and retry limits survive reopening", async (t) => {
  for (const field of ["max_calls", "max_episodes"]) {
    const c = contract();
    c.limits[field] = 1;
    const f = await fixture(t, { contract: c });
    await f.boundary.execute(call(), [], {});
    await assert.rejects(f.boundary.execute(call("two"), [], {}), /limit/u);
  }
  const f = await fixture(t);
  await assert.rejects(f.boundary.execute(call("one", { retry: 2 }), [], {}));
  assert.equal(
    f.requests.some((r) => r.method === "turn/start"),
    false,
  );
});

test("subscription deadline requests interruption but does not invent a terminal receipt", async (t) => {
  const c = contract();
  c.limits.turn_timeout_ms = 1000;
  const f = await fixture(t, { contract: c, turn() {} });
  await assert.rejects(f.boundary.execute(call(), [], {}), /deadline/u);
  assert.equal(f.boundary.read().calls.one.receipt, null);
  assert.ok(f.requests.some((r) => r.method === "turn/interrupt"));
});

test("subscription journal concurrent handles cannot issue a second uncertain permit", async (t) => {
  const f = await fixture(t, {
    turn() {
      throw new Error("lost");
    },
  });
  const second = openSubscriptionLedger(f.options.ledgerRoot, f.options.contract);
  await assert.rejects(f.boundary.execute(call(), [], {}));
  assert.throws(
    () => second.intent({ ...second.read().calls.one.reservation, id: "two" }),
    /Unresolved/u,
  );
});

test("subscription notification at subscribe time forbids turn dispatch", async (t) => {
  for (const event of [
    { method: "account/rateLimits/updated", params: quota(90) },
    { method: "account/updated", params: { authMode: "apiKey" } },
  ]) {
    const f = await fixture(t, {
      host: {
        subscribe(consume) {
          consume(event);
          return noop;
        },
      },
    });
    await assert.rejects(f.boundary.execute(call(), [], {}), /stopped before/u);
    assert.equal(
      f.requests.some((r) => r.method === "turn/start"),
      false,
    );
    assert.equal(f.boundary.read().calls.one.receipt, null);
  }
});

test("subscription host preparation cannot dispatch beyond the finite deadline", async (t) => {
  let clock = 0;
  const f = await fixture(t, {
    host: {
      now: () => clock,
      threadOptions: async () => {
        clock = 2000;
        return {};
      },
    },
  });
  await assert.rejects(f.boundary.execute(call(), [], {}), /deadline/u);
  assert.equal(
    f.requests.some((r) => r.method === "thread/start" || r.method === "turn/start"),
    false,
  );
  assert.equal(Object.keys(f.boundary.read().calls).length, 0);
});

test("subscription monitors partial token lower bounds without inventing totals", async (t) => {
  const f = await fixture(t, {
    turn({ emit, turnId }) {
      emit("thread/tokenUsage/updated", { tokenUsage: { total: { inputTokens: 120 } } });
      emit("turn/completed", { turn: { id: turnId, status: "interrupted" } });
    },
  });
  const r = await f.boundary.execute(call(), [], {});
  assert.equal(r.stop_reason, "soft_token_ceiling");
  assert.equal(r.usage.state, "partial");
  assert.equal(r.usage.totalTokens, null);
  assert.equal(r.token_overshoot, null);
  assert.equal(f.requests.filter((v) => v.method === "turn/interrupt").length, 1);
});

test("subscription retains peak quota overshoot after a later lower observation", async (t) => {
  const f = await fixture(t, {
    turn({ emit, turnId }) {
      emit("account/rateLimits/updated", quota(95));
      emit("account/rateLimits/updated", quota(20));
      emit("thread/tokenUsage/updated", { tokenUsage: { total: tokens() } });
      emit("turn/completed", { turn: { id: turnId, status: "interrupted" } });
    },
  });
  const r = await f.boundary.execute(call(), [], {});
  assert.equal(r.stop_reason, "quota_cutoff");
  assert.equal(r.quota_overshoot_percent, 15);
  assert.equal(f.requests.filter((v) => v.method === "turn/interrupt").length, 1);
});

test("subscription merges the installed 0.157.1 sparse quota notification without fabricated entitlement", async (t) => {
  const initial = subscriptionQuota(account, quota());
  assert.throws(() => mergeSubscriptionQuota(null, { rateLimits: {} }), /preflight/u);
  assert.throws(
    () => mergeSubscriptionQuota(initial, { ordinaryUsageAllowed: false, rateLimits: {} }),
    /revoked/u,
  );
  const sparse = mergeSubscriptionQuota(initial, {
    rateLimits: {
      primary: { usedPercent: 30, windowDurationMins: null },
      secondary: null,
      planType: null,
    },
  });
  assert.equal(sparse.windows[0].window_minutes, 10_080);
  assert.equal(sparse.windows[0].used_percent, 30);
  assert.equal(sparse.entitlement_source, "retained_preflight_with_sparse_update");
  assert.equal(
    mergeSubscriptionQuota(initial, { rateLimits: { primary: { usedPercent: 110 } } }).windows[0]
      .used_percent,
    110,
  );
  const f = await fixture(t, {
    turn({ emit, turnId }) {
      emit("account/rateLimits/updated", { rateLimits: { primary: { usedPercent: 30 } } });
      emit("thread/tokenUsage/updated", { tokenUsage: { total: tokens() } });
      emit("turn/completed", { turn: { id: turnId, status: "completed" } });
    },
  });
  const r = await f.boundary.execute(call(), [], {});
  assert.equal(r.stop_reason, null);
  assert.equal(r.final_quota.windows[0].used_percent, 30);
});

test("subscription sparse quota cutoff and explicit entitlement revocation stop dispatch", async (t) => {
  for (const params of [
    { rateLimits: { primary: { usedPercent: 85 } } },
    { ordinaryUsageAllowed: false, rateLimits: {} },
    { rateLimits: { spendControlReached: true } },
  ]) {
    const f = await fixture(t, {
      host: {
        subscribe(consume) {
          consume({ method: "account/rateLimits/updated", params });
          return noop;
        },
      },
    });
    await assert.rejects(f.boundary.execute(call(), [], {}), /stopped before/u);
    assert.equal(
      f.requests.some((r) => r.method === "turn/start"),
      false,
    );
  }
});
