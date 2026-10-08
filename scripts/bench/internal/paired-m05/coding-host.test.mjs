import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createCodingHost } from "./coding-host.mjs";
import { codingCases, materializeCodingFixture } from "./coding-corpus.mjs";
import { digest } from "./contract.mjs";
const contract = () => ({
  schema_version: 4,
  kind: "agentplane.m05_subscription_contract",
  authentication: "chatgpt",
  metric: "tokens_per_verified_success",
  transport: "app_server",
  token_limit_enforcement: "soft_monitored",
  campaign_id: "host-fixture",
  model: "fixture-model",
  effort: "medium",
  sandbox: "landlock",
  network: "deny",
  cache: "cold",
  session: "fresh",
  target_sha: "a".repeat(40),
  ...Object.fromEntries(
    ["product", "oracle", "policy", "runtime", "authority", "corpus", "randomization"].map(
      (key) => [`${key}_digest`, digest(key)],
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
  assignments: [{ id: "a", order: 0, task_id: "direct-fix", stratum: "direct", arm: "no_recipe" }],
});
test("concrete host wires role grants, managed boundary, final JSON and durable accounting", async (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-host-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const { subject, manifest } = materializeCodingFixture(root, codingCases()[0]);
  const runtime = path.join(root, "runtime"),
    hidden = path.join(root, "oracle");
  mkdirSync(runtime);
  mkdirSync(hidden);
  const source = path.join(subject, "src/module.mjs");
  const corpusManifest = { cases: [{ manifest }] };
  const qualified = contract();
  qualified.corpus_digest = digest(corpusManifest);
  const options = {
    contract: qualified,
    corpusManifest,
    assignmentId: "a",
    subject,
    scope: ["src/module.mjs"],
    hostRoot: path.join(root, "host"),
    ledgerRoot: path.join(root, "ledger"),
    codexBinary: process.execPath,
    managedRuntime: { readOnly: [], writable: [runtime], env: {} },
    oracleRoots: [hidden],
    authorize: async () => true,
    native: { executable: process.execPath, taskId: "fixture", timeoutMs: 1000, env: {} },
  };
  let sequence = 0,
    closed = 0,
    currentOrder;
  const policies = [];
  const createServer = async ({ policyPath }) => {
    policies.push(JSON.parse(readFileSync(policyPath, "utf8")));
    const listeners = new Set();
    const thread = `thread-${++sequence}`,
      turn = `turn-${sequence}`;
    const emit = (method, params) => {
      for (const listener of listeners)
        listener({ method, params: { threadId: thread, turnId: turn, ...params } });
    };
    return {
      // This fixture checks host wiring, not filesystem scheduling latency.
      // Dedicated subscription boundary tests exercise real deadline behavior.
      now: () => sequence * 100,
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      close: async () => {
        closed++;
      },
      threadOptions: async () => ({ cwd: subject, sandbox: "read-only" }),
      turnOptions: async () => ({
        sandboxPolicy: { type: "externalSandbox", networkAccess: "restricted" },
      }),
      request: async (method) => {
        if (method === "account/read") return { account: { type: "chatgpt" } };
        if (method === "account/rateLimits/read")
          return {
            ordinaryUsageAllowed: true,
            rateLimits: { primary: { usedPercent: 10, windowDurationMins: 10_080 } },
          };
        if (method === "thread/start")
          return { thread: { id: thread }, model: "fixture-model", reasoningEffort: "medium" };
        if (method === "turn/start") {
          emit("item/completed", {
            item: {
              type: "agentMessage",
              text: JSON.stringify({
                work_order_id: currentOrder.work_order_id,
                status: "failed",
                summary: "Offline host double",
                findings: [],
                uncertainty: [],
              }),
            },
          });
          emit("thread/tokenUsage/updated", {
            tokenUsage: {
              total: {
                inputTokens: 2,
                outputTokens: 2,
                cachedInputTokens: 0,
                reasoningOutputTokens: 0,
                totalTokens: 4,
              },
            },
          });
          emit("turn/completed", { turn: { id: turn, status: "completed" } });
          return { turn: { id: turn } };
        }
        throw new Error(`Unexpected ${method}`);
      },
    };
  };
  const host = createCodingHost(options, createServer);
  for (const role of ["EXECUTOR", "EVALUATOR"]) {
    currentOrder = {
      task: { id: "fixture" },
      role,
      work_order_id: digest(role),
      authority: { writable_roots: role === "EXECUTOR" ? ["src/module.mjs"] : [] },
    };
    const result = await host.solve({ order: currentOrder, required: [], schema: {} });
    const call = await host.readCall(result.call_id);
    assert.equal(call.reservation.role, role);
    assert.equal(call.receipt.usage.totalTokens, 4);
    assert.equal(call.receipt.stop_reason, null);
    assert.equal(call.reservation.started_ms, sequence * 100);
    assert.equal(call.receipt.finished_ms, sequence * 100);
  }
  assert.equal(closed, 2);
  assert.ok(policies[0].writable.includes(source));
  assert.equal(policies[1].writable.includes(source), false);
  assert.throws(
    () =>
      createCodingHost(
        { ...options, managedRuntime: { ...options.managedRuntime, writable: [subject] } },
        createServer,
      ),
    /Runtime writes/u,
  );
  assert.throws(
    () =>
      createCodingHost(
        { ...options, managedRuntime: { ...options.managedRuntime, readOnly: [options.hostRoot] } },
        createServer,
      ),
    /Oracle/u,
  );
  const childFile = path.join(hidden, "reference.json");
  const childDirectory = path.join(hidden, "answers");
  writeFileSync(childFile, "hidden");
  mkdirSync(childDirectory);
  for (const grant of [childFile, childDirectory])
    for (const access of ["readOnly", "writable"])
      assert.throws(
        () =>
          createCodingHost(
            { ...options, managedRuntime: { ...options.managedRuntime, [access]: [grant] } },
            createServer,
          ),
        /Oracle/u,
      );
  assert.throws(
    () => createCodingHost({ ...options, corpusManifest: { cases: [] } }, createServer),
    /Frozen corpus/u,
  );
  assert.throws(
    () =>
      createCodingHost(
        { ...options, managedRuntime: { ...options.managedRuntime, readOnly: [root] } },
        createServer,
      ),
    /Oracle/u,
  );
});

const episode = (role, attempt) => ({
  order: {
    task: { id: "task" },
    role,
    work_order_id: `sha256:${role}-${attempt}`,
    canonical_binding: { task_id: "task", work_item_id: "fix", attempt, plan_revision: 1 },
  },
  solved: {
    call_id: `${role}-${attempt}`,
    result: { work_order_id: `sha256:${role}-${attempt}` },
  },
});

test("native accounting rejects absent execution, retry and semantic episode usage", async () => {
  const { assertNativeAccounting } = await import("./native-coding-evidence.mjs");
  const record = {
    aggregate: { id: "task", current_plan: { revision: 1 }, work_items: { fix: { attempt: 2 } } },
  };
  const episodes = [episode("EXECUTOR", 1), episode("EXECUTOR", 2), episode("EVALUATOR", 2)];
  const calls = episodes.map(({ order, solved }) => ({
    reservation: { id: solved.call_id, role: order.role, episode_id: order.work_order_id.slice(7) },
  }));
  const history = { pending: null, records: [], episodes };
  assert.doesNotThrow(() => assertNativeAccounting(record, history, calls, "task"));
  assert.throws(
    () =>
      assertNativeAccounting(
        record,
        { ...history, episodes: episodes.slice(2) },
        calls.slice(2),
        "task",
      ),
    /execution attempt/u,
  );
  assert.throws(
    () =>
      assertNativeAccounting(
        record,
        { ...history, episodes: episodes.slice(1) },
        calls.slice(1),
        "task",
      ),
    /execution attempt/u,
  );
  assert.throws(
    () => assertNativeAccounting(record, history, calls.slice(1), "task"),
    /episode usage/u,
  );
  assert.throws(
    () => assertNativeAccounting(record, { ...history, pending: episodes[0].order }, calls, "task"),
    /Unresolved/u,
  );
  const wrong = structuredClone(calls);
  wrong[0].reservation.episode_id = "unrelated";
  assert.throws(() => assertNativeAccounting(record, history, wrong, "task"));
  assert.throws(
    () =>
      assertNativeAccounting(
        record,
        history,
        [...calls, { reservation: { id: "untracked" } }],
        "task",
      ),
    /Unattributed/u,
  );
});
