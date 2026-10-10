import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import {
  buildAgentSemanticPayloadSchema,
  renderAgentSemanticResultSchemaJson,
} from "../../../../packages/core/dist/index.js";
import { stableJson } from "../../../lib/agent-efficiency-baseline.mjs";
import { digest, integer } from "./contract.mjs";
import { openJournal } from "./journal.mjs";

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}
export function loadNativeCodingEpisode(packet) {
  assert.equal(packet.action.kind, "agent_episode");
  const manifest = readJson(packet.context_manifest.ref);
  assert.equal(digest(manifest), packet.context_manifest.digest, "Context manifest changed");
  const order = readJson(path.resolve(packet.exchange.directory, packet.exchange.work_order_ref));
  assert.equal(digest(order), manifest.source_digest, "WorkOrder changed");
  assert.equal(order.work_order_id, manifest.work_order_id);
  assert.equal(order.task.id, packet.task_id);
  assert.equal(order.role, packet.authority.role);
  assert.equal(manifest.blocks.length, packet.context_manifest.blocks);
  const required = [];
  for (const block of manifest.blocks.filter((b) => b.required)) {
    const [file, pointer] = block.ref.split("#");
    let value = readJson(file);
    if (pointer)
      for (const key of pointer.split("/").slice(1))
        value = value[key.replaceAll("~1", "/").replaceAll("~0", "~")];
    assert.equal(digest(value), block.digest, `Context block changed: ${block.id}`);
    assert.equal(Buffer.byteLength(stableJson(value)), block.bytes);
    required.push({ id: block.id, value });
  }
  assert.equal(required.length, packet.context_manifest.required);
  const schema = readJson(
    path.resolve(packet.exchange.directory, packet.exchange.result_schema_ref),
  );
  assert.deepEqual(
    schema,
    JSON.parse(
      renderAgentSemanticResultSchemaJson({
        role: order.role,
        phase: order.canonical_binding?.phase,
      }),
    ),
    "Issued result schema differs from qualified native owner",
  );
  return { order, required, schema };
}
function apply(state, event) {
  if (event.type === "intent") {
    assert.equal(state.pending, null, "An interrupted action requires native operator recovery");
    state.pending = event.intent;
  } else if (event.type === "observation") {
    assert.ok(state.pending);
    assert.equal(event.intent_digest, digest(state.pending));
    state.history.push({
      intent: state.pending,
      observation: event.observation,
      duration_ms: event.duration_ms,
    });
    state.pending = null;
  } else {
    assert.equal(event.type, "handoff");
    assert.equal(state.pending, null);
    state.history.push({ handoff: event.packet });
  }
}

// This is a transport loop, not a second task state machine. AgentPlane supplies
// every role, result path, state binding and next action. Non-semantic boundaries
// are returned verbatim for the authorized operator; this code never approves.
export async function runNativeCodingLoop(
  { binding, checkpointRoot, packet: initial, maxSteps },
  host,
) {
  assert.ok(integer(maxSteps) && maxSteps > 0);
  const journal = openJournal(checkpointRoot, binding, { pending: null, history: [] }, apply);
  if (journal.read().pending)
    return {
      kind: "operator_handoff",
      reason: "uncertain_previous_action",
      pending: journal.read().pending,
      history: journal.read().history,
    };
  if (journal.read().history.length > 0)
    return {
      kind: "operator_handoff",
      reason: "retained_checkpoint_requires_native_continuation",
      history: journal.read().history,
    };
  let packet = structuredClone(initial);
  const action = async (intent, invoke) => {
    journal.append(journal.read(), { type: "intent", intent });
    const start = performance.now();
    const observation = await invoke();
    journal.append(journal.read(), {
      type: "observation",
      intent_digest: digest(intent),
      observation,
      duration_ms: performance.now() - start,
    });
    return observation;
  };
  for (let step = 0; step < maxSteps; step++) {
    assert.equal(packet.task_id, binding.task_id, "Wrong native Task");
    if (packet.action.kind !== "agent_episode") {
      journal.append(journal.read(), { type: "handoff", packet });
      return { kind: "operator_handoff", packet, history: journal.read().history };
    }
    const episode = loadNativeCodingEpisode(packet);
    assert.ok(["PLANNER", "EXECUTOR", "EVALUATOR"].includes(episode.order.role));
    const solved = await action(
      {
        kind: "semantic",
        role: episode.order.role,
        work_order_id: episode.order.work_order_id,
        packet_digest: digest(packet),
      },
      () => host.solve(episode),
    );
    const call = await host.readCall(solved.call_id);
    assert.equal(call.reservation.assignment_id, binding.assignment_id);
    assert.equal(call.reservation.role, episode.order.role);
    assert.equal(call.reservation.episode_id, episode.order.work_order_id.replace(/^sha256:/u, ""));
    if (
      call.receipt?.effect_state !== "terminal" ||
      call.receipt.status !== "completed" ||
      call.receipt.stop_reason !== null ||
      call.receipt.usage.state !== "observed" ||
      !call.receipt.identity_valid
    )
      return {
        kind: "operator_handoff",
        reason: "incomplete_provider_accounting",
        packet,
        call_id: solved.call_id,
        history: journal.read().history,
      };
    const result = buildAgentSemanticPayloadSchema({
      role: episode.order.role,
      phase: episode.order.canonical_binding?.phase,
    }).parse(solved.result);
    assert.equal(result.work_order_id, episode.order.work_order_id);
    const argv = packet.exchange.resume_argv;
    assert.ok(["ap", "agentplane"].includes(argv[0]));
    assert.deepEqual(argv.slice(1, 4), ["task", "advance", binding.task_id]);
    assert.equal(argv[argv.indexOf("--result") + 1], packet.exchange.result_path);
    assert.ok(argv.includes("--agent-json") && !argv.includes("--by"));
    packet = await action(
      {
        kind: "native_resume",
        argv,
        result_digest: digest(result),
        work_order_id: result.work_order_id,
      },
      async () => {
        const bytes = `${JSON.stringify(result)}\n`;
        try {
          writeFileSync(packet.exchange.result_path, bytes, { flag: "wx", mode: 0o600 });
        } catch (error) {
          if (error.code !== "EEXIST") throw error;
          assert.equal(
            readFileSync(packet.exchange.result_path, "utf8"),
            bytes,
            "Result already differs",
          );
        }
        return host.resumeExact(argv);
      },
    );
  }
  return {
    kind: "operator_handoff",
    reason: "finite_step_limit",
    packet,
    history: journal.read().history,
  };
}
