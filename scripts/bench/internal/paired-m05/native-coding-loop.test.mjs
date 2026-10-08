import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { renderAgentSemanticResultSchemaJson } from "../../../../packages/core/dist/runner/agent-semantic-result.js";
import { stableJson } from "../../../lib/agent-efficiency-baseline.mjs";
import { digest } from "./contract.mjs";
import { loadNativeCodingEpisode, runNativeCodingLoop } from "./native-coding-loop.mjs";
function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-native-loop-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const binding = {
    task_id: "coding",
    assignment_id: "assignment",
    corpus_digest: digest("fixture"),
  };
  function episode(role, index) {
    const directory = path.join(root, String(index));
    mkdirSync(directory);
    const phase = { PLANNER: "planning", EXECUTOR: "implementation", EVALUATOR: "evaluation" }[
      role
    ];
    const order = {
      work_order_id: digest({ role, index }),
      task: { id: binding.task_id },
      role,
      canonical_binding: { phase },
    };
    const orderPath = path.join(directory, "work-order.json");
    writeFileSync(orderPath, JSON.stringify(order));
    const blocks = [
      {
        id: "whole-order",
        required: true,
        ref: orderPath,
        digest: digest(order),
        bytes: Buffer.byteLength(stableJson(order)),
      },
    ];
    const manifest = { source_digest: digest(order), work_order_id: order.work_order_id, blocks };
    const ref = path.join(directory, "context.json");
    writeFileSync(ref, JSON.stringify(manifest));
    writeFileSync(
      path.join(directory, "schema.json"),
      renderAgentSemanticResultSchemaJson({ role, phase }),
    );
    const resultPath = path.join(directory, "result.json");
    return {
      task_id: binding.task_id,
      action: { kind: "agent_episode" },
      authority: { role },
      context_manifest: { ref, digest: digest(manifest), blocks: 1, required: 1 },
      exchange: {
        directory,
        work_order_ref: "work-order.json",
        result_schema_ref: "schema.json",
        result_path: resultPath,
        resume_argv: [
          "agentplane",
          "task",
          "advance",
          binding.task_id,
          "--result",
          resultPath,
          "--agent-json",
        ],
      },
    };
  }
  return { root, binding, episode };
}
function hostFor(f, packets, { missingUsage = false, crash = false } = {}) {
  const calls = new Map(),
    seen = [];
  let cursor = 0;
  return {
    seen,
    async solve({ order }) {
      if (crash) throw new Error("provider connection lost");
      const call_id = `call-${cursor}`;
      calls.set(call_id, {
        reservation: {
          assignment_id: f.binding.assignment_id,
          role: order.role,
          episode_id: order.work_order_id.slice(7),
        },
        receipt: {
          effect_state: "terminal",
          status: "completed",
          stop_reason: null,
          usage: { state: missingUsage ? "unavailable" : "observed" },
          identity_valid: true,
        },
      });
      return {
        call_id,
        result: {
          work_order_id: order.work_order_id,
          status: "failed",
          summary: "Offline transport double only",
          findings: [],
          uncertainty: [],
        },
      };
    },
    readCall: async (id) => calls.get(id),
    async resumeExact(argv) {
      seen.push(argv);
      return packets[++cursor];
    },
  };
}
test("native loop follows all emitted roles and preserves operator handoff without approval", async (t) => {
  const f = fixture(t),
    packets = [
      f.episode("PLANNER", 0),
      f.episode("EXECUTOR", 1),
      f.episode("EVALUATOR", 2),
      {
        task_id: f.binding.task_id,
        action: { kind: "approval_required", argv: ["operator-only"] },
      },
    ];
  const host = hostFor(f, packets);
  const result = await runNativeCodingLoop(
    { ...f, checkpointRoot: path.join(f.root, "journal"), packet: packets[0], maxSteps: 4 },
    host,
  );
  assert.equal(result.kind, "operator_handoff");
  assert.deepEqual(result.packet, packets[3]);
  assert.deepEqual(
    host.seen,
    packets.slice(0, 3).map((p) => p.exchange.resume_argv),
  );
  assert.deepEqual(
    result.history.filter((h) => h.intent?.kind === "semantic").map((h) => h.intent.role),
    ["PLANNER", "EXECUTOR", "EVALUATOR"],
  );
  assert.equal(
    result.history.filter((h) => h.intent).every((h) => h.duration_ms >= 0),
    true,
  );
});
test("missing usage never resumes or produces a successful coding outcome", async (t) => {
  const f = fixture(t),
    packet = f.episode("EXECUTOR", 0),
    host = hostFor(f, [packet], { missingUsage: true });
  const result = await runNativeCodingLoop(
    { ...f, checkpointRoot: path.join(f.root, "journal"), packet, maxSteps: 1 },
    host,
  );
  assert.equal(result.reason, "incomplete_provider_accounting");
  assert.equal(host.seen.length, 0);
  assert.equal(existsSync(packet.exchange.result_path), false);
});
test("interrupted semantic call stays unresolved on restart and is not replayed", async (t) => {
  const f = fixture(t),
    packet = f.episode("EXECUTOR", 0),
    host = hostFor(f, [packet], { crash: true });
  const config = { ...f, checkpointRoot: path.join(f.root, "journal"), packet, maxSteps: 1 };
  await assert.rejects(runNativeCodingLoop(config, host), /connection lost/u);
  const result = await runNativeCodingLoop(config, { solve: () => assert.fail("replayed") });
  assert.equal(result.reason, "uncertain_previous_action");
});
test("native context and schema tampering fail before semantic dispatch", (t) => {
  const f = fixture(t),
    packet = f.episode("EXECUTOR", 0);
  writeFileSync(path.join(packet.exchange.directory, "schema.json"), "{}");
  assert.throws(() => loadNativeCodingEpisode(packet), /schema differs/u);
  const second = f.episode("PLANNER", 1);
  writeFileSync(path.join(second.exchange.directory, "work-order.json"), "{}");
  assert.throws(() => loadNativeCodingEpisode(second), /WorkOrder changed/u);
});

test("native subprocess port uses exact issued argv and refuses remote/operator flags", async (t) => {
  const { nativeCodingPort } = await import("./native-coding-port.mjs");
  const f = fixture(t);
  const executable = path.join(f.root, "native-fixture");
  writeFileSync(
    executable,
    `#!${process.execPath}\nconsole.log(JSON.stringify({argv:process.argv.slice(2),cwd:process.cwd()}));\n`,
    { mode: 0o700 },
  );
  const resume = nativeCodingPort({
    executable,
    cwd: f.root,
    env: { PATH: "/usr/bin:/bin" },
    taskId: f.binding.task_id,
    timeoutMs: 1000,
  });
  const packet = f.episode("EXECUTOR", 0),
    argv = packet.exchange.resume_argv;
  const output = await resume(argv);
  assert.deepEqual(output.argv, argv.slice(1));
  assert.equal(output.cwd, f.root);
  await assert.rejects(resume([...argv, "--remote"]), /handoff/u);
  await assert.rejects(resume([...argv, "--by", "USER"]), /handoff/u);
});
test("a retained completed transport is not silently replayed after restart", async (t) => {
  const f = fixture(t),
    packet = f.episode("EXECUTOR", 0),
    handoff = { task_id: f.binding.task_id, action: { kind: "human" } };
  const config = { ...f, checkpointRoot: path.join(f.root, "journal"), packet, maxSteps: 2 };
  await runNativeCodingLoop(config, hostFor(f, [packet, handoff]));
  const retry = await runNativeCodingLoop(config, { solve: () => assert.fail("replayed") });
  assert.equal(retry.reason, "retained_checkpoint_requires_native_continuation");
});

test("stopped provider turn cannot advance native coding even with known tokens", async (t) => {
  const f = fixture(t),
    packet = f.episode("EXECUTOR", 0),
    host = hostFor(f, [packet]);
  const read = host.readCall;
  host.readCall = async (id) => {
    const call = await read(id);
    call.receipt.stop_reason = "quota_cutoff";
    return call;
  };
  const result = await runNativeCodingLoop(
    { ...f, checkpointRoot: path.join(f.root, "journal"), packet, maxSteps: 1 },
    host,
  );
  assert.equal(result.reason, "incomplete_provider_accounting");
  assert.equal(host.seen.length, 0);
});
