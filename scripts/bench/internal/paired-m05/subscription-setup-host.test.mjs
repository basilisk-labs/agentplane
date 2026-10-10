import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { runSubscriptionSetup, setupInventory } from "./subscription-setup-host.mjs";
import { digest } from "./contract.mjs";

const noop = () => {};

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-setup-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const subject = path.join(root, "subject");
  const inputs = path.join(subject, "inputs");
  const outputs = path.join(subject, "strategies");
  const host = path.join(root, "host");
  for (const directory of [inputs, outputs, host]) mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(inputs, "public.json"), "{}\n");
  const packet = {
    kind: "agentplane.m05_prospective_setup",
    subject,
    inputs,
    outputs,
    host,
    input_inventory: setupInventory(inputs),
    runtime: {},
    contract: {
      limits: {
        max_calls: 3,
        max_episodes: 3,
        retry_limit: 0,
        quota_cutoff_percent: 80,
        turn_timeout_ms: 1000,
      },
      assignments: [{ id: "setup" }],
      authority_digest: digest("authority"),
    },
  };
  return { packet };
}
function ports(packet, { unknownRole, deniedReview = false, oversized = false } = {}) {
  const observed = [];
  let listener;
  return {
    observed,
    createServer: async (options) => {
      const policy = JSON.parse(readFileSync(options.policyPath, "utf8"));
      observed.push(policy);
      return {
        subscribe: (fn) => {
          listener = fn;
          return noop;
        },
        close: async () => {},
      };
    },
    openBoundary: async () => ({
      execute: async (call) => {
        if (call.role === "EXECUTOR")
          writeFileSync(path.join(packet.outputs, "scenario.json"), "{}\n");
        listener({
          method: "item/completed",
          params: {
            threadId: call.id,
            turnId: call.id,
            item: {
              type: "agentMessage",
              text: oversized
                ? "x".repeat(65_537)
                : JSON.stringify({ verdict: deniedReview ? "reject" : "pass" }),
            },
          },
        });
        return {
          thread_id: call.id,
          turn_id: call.id,
          status: "completed",
          effect_state: "terminal",
          identity_valid: true,
          stop_reason: null,
          usage: { state: call.role === unknownRole ? "partial" : "observed" },
        };
      },
    }),
  };
}
test("prospective setup accounts distinct roles and only executor receives strategy writes", async (t) => {
  const { packet } = fixture(t);
  const mocks = ports(packet);
  const result = await runSubscriptionSetup({ packet, authorize: async () => true }, mocks);
  assert.deepEqual(
    result.results.map((r) => r.role),
    ["PLANNER", "EXECUTOR", "EVALUATOR"],
  );
  assert.deepEqual(
    mocks.observed.map((p) => p.writable),
    [[], [packet.outputs], []],
  );
  assert.ok(
    mocks.observed.every((p) => p.network === "deny" && !p.read_only.includes(packet.host)),
  );
  assert.equal(result.outputs[0].path, "scenario.json");
});
test("unknown usage and missing authority stop without unaccounted continuation", async (t) => {
  const { packet } = fixture(t);
  const mocks = ports(packet, { unknownRole: "PLANNER" });
  await assert.rejects(
    runSubscriptionSetup({ packet, authorize: async () => true }, mocks),
    /Unknown setup usage/u,
  );
  assert.equal(mocks.observed.length, 1);
  const failure = JSON.parse(readFileSync(path.join(packet.host, "planner/failure.json"), "utf8"));
  assert.equal(failure.bounded_messages.length, 1);
  const other = fixture(t);
  const denied = ports(other.packet);
  await assert.rejects(
    runSubscriptionSetup({ packet: other.packet, authorize: async () => false }, denied),
    /authority missing/u,
  );
  assert.equal(denied.observed.length, 0);
});
test("changed public inputs are rejected before provider startup", async (t) => {
  const { packet } = fixture(t);
  const mocks = ports(packet);
  writeFileSync(path.join(packet.inputs, "public.json"), "changed");
  await assert.rejects(
    runSubscriptionSetup({ packet, authorize: async () => true }, mocks),
    /Public inputs changed/u,
  );
  assert.equal(mocks.observed.length, 0);
});

test("independent rejection retains results and never starts repair calls", async (t) => {
  const { packet } = fixture(t);
  const mocks = ports(packet, { deniedReview: true });
  await assert.rejects(
    runSubscriptionSetup({ packet, authorize: async () => true }, mocks),
    /Independent setup review rejected/u,
  );
  assert.equal(mocks.observed.length, 3);
  assert.equal(
    JSON.parse(readFileSync(path.join(packet.host, "evaluator/result.json"), "utf8")).role,
    "EVALUATOR",
  );
});

test("oversized provider messages fail through the host and retain failure evidence", async (t) => {
  const { packet } = fixture(t);
  const mocks = ports(packet, { oversized: true });
  await assert.rejects(
    runSubscriptionSetup({ packet, authorize: async () => true }, mocks),
    /Setup message bound exceeded/u,
  );
  assert.equal(mocks.observed.length, 1);
  assert.equal(
    JSON.parse(readFileSync(path.join(packet.host, "planner/failure.json"), "utf8"))
      .observation_failure,
    "Setup message bound exceeded",
  );
});
test("empty directory depth and breadth are bounded before provider startup", async (t) => {
  const { packet } = fixture(t);
  const mocks = ports(packet);
  mkdirSync(path.join(packet.inputs, "a/b/c/d/e"), { recursive: true });
  await assert.rejects(
    runSubscriptionSetup({ packet, authorize: async () => true }, mocks),
    /directory bound/u,
  );
  assert.equal(mocks.observed.length, 0);
  const other = fixture(t);
  for (let i = 0; i < 33; i++) mkdirSync(path.join(other.packet.inputs, String(i)));
  assert.throws(() => setupInventory(other.packet.inputs), /directory bound/u);
});

test("bounded correction executes only writer then independent reviewer and refuses replay", async (t) => {
  const { packet } = fixture(t);
  packet.role_sequence = ["EXECUTOR", "EVALUATOR"];
  packet.contract.limits.max_calls = 2;
  packet.contract.limits.max_episodes = 2;
  writeFileSync(path.join(packet.outputs, "scenario.json"), "{}\n");
  packet.initial_output_inventory = setupInventory(packet.outputs);
  const mocks = ports(packet);
  const result = await runSubscriptionSetup({ packet, authorize: async () => true }, mocks);
  assert.deepEqual(
    result.results.map((r) => r.role),
    packet.role_sequence,
  );
  assert.deepEqual(
    mocks.observed.map((p) => p.writable),
    [[packet.outputs], []],
  );
  await assert.rejects(
    runSubscriptionSetup({ packet, authorize: async () => true }, mocks),
    /EEXIST/u,
  );
  assert.equal(mocks.observed.length, 2);
});
test("unsupported correction role order is rejected before effects", async (t) => {
  for (const roles of [
    ["EVALUATOR", "EXECUTOR"],
    ["EXECUTOR"],
    ["EXECUTOR", "EXECUTOR", "EVALUATOR"],
  ]) {
    const { packet } = fixture(t);
    packet.role_sequence = roles;
    const mocks = ports(packet);
    await assert.rejects(
      runSubscriptionSetup({ packet, authorize: async () => true }, mocks),
      /Unsupported setup role sequence/u,
    );
    assert.equal(mocks.observed.length, 0);
  }
});
