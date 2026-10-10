import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { digest } from "./contract.mjs";
import { createBrokeredAppServer } from "./brokered-app-server.mjs";
import { openSubscriptionBoundary } from "./subscription-boundary.mjs";
import { writeIsolationPolicy } from "./isolation.mjs";

const inside = (a, b) => a === b || a.startsWith(b + path.sep);

// This inventory is public input/output, never authentication or oracle storage.
export function setupInventory(root) {
  const result = [];
  let total = 0;
  let directories = 0;
  function visit(directory, depth = 0) {
    assert.ok(depth <= 4 && ++directories <= 32, "Setup directory bound exceeded");
    for (const name of readdirSync(directory).toSorted()) {
      const file = path.join(directory, name);
      const stat = lstatSync(file);
      assert.ok(!stat.isSymbolicLink(), "Setup symlinks are forbidden");
      if (stat.isDirectory()) visit(file, depth + 1);
      else {
        assert.ok(stat.isFile() && stat.size <= 262_144, "Invalid setup file");
        total += stat.size;
        assert.ok(total <= 1_048_576 && result.length < 64, "Setup artifact bound exceeded");
        result.push({
          path: path.relative(root, file),
          bytes: stat.size,
          sha256: createHash("sha256").update(readFileSync(file)).digest("hex"),
        });
      }
    }
  }
  visit(root);
  return result;
}

// Operator-owned packet and authorize function are not model-controlled input.
// These are measured authoring calls, not fabricated native semantic episodes.
export async function runSubscriptionSetup(
  { packet, authorize },
  { createServer = createBrokeredAppServer, openBoundary = openSubscriptionBoundary } = {},
) {
  assert.equal(packet.kind, "agentplane.m05_prospective_setup");
  const { contract } = packet;
  const roles = packet.role_sequence ?? ["PLANNER", "EXECUTOR", "EVALUATOR"];
  assert.ok(
    JSON.stringify(roles) === JSON.stringify(["PLANNER", "EXECUTOR", "EVALUATOR"]) ||
      JSON.stringify(roles) === JSON.stringify(["EXECUTOR", "EVALUATOR"]),
    "Unsupported setup role sequence",
  );
  assert.equal(contract.limits.max_calls, roles.length);
  assert.equal(contract.limits.max_episodes, roles.length);
  assert.equal(contract.limits.retry_limit, 0);
  assert.equal(contract.limits.quota_cutoff_percent, 80);
  assert.equal(contract.assignments.length, 1);
  assert.equal(await authorize(digest(packet)), true, "Setup packet authority missing");
  const subject = realpathSync(packet.subject);
  const inputs = realpathSync(packet.inputs);
  const outputs = realpathSync(packet.outputs);
  const host = realpathSync(packet.host);
  assert.ok(inside(inputs, subject) && inside(outputs, subject));
  assert.ok(!inside(inputs, outputs) && !inside(outputs, inputs));
  assert.ok(!inside(host, subject) && !inside(subject, host));
  assert.deepEqual(setupInventory(inputs), packet.input_inventory, "Public inputs changed");
  const initialOutputs = roles.length === 2 ? packet.initial_output_inventory : [];
  if (roles.length === 2)
    assert.ok(
      Array.isArray(initialOutputs) && initialOutputs.length > 0,
      "Correction candidate inventory required",
    );
  assert.deepEqual(setupInventory(outputs), initialOutputs, "Initial strategy changed");
  const results = [];
  for (const role of roles) {
    const directory = path.join(host, role.toLowerCase());
    mkdirSync(directory, { recursive: false });
    const policyPath = path.join(directory, "policy.json");
    writeIsolationPolicy(policyPath, {
      cwd: subject,
      readOnly: [inputs, outputs],
      writable: role === "EXECUTOR" ? [outputs] : [],
      network: "deny",
    });
    const port = await createServer({
      ...packet.runtime,
      cwd: subject,
      policyPath,
      auditPath: path.join(directory, "effects.jsonl"),
      timeoutMs: contract.limits.turn_timeout_ms,
    });
    const messages = [];
    let observationFailure = null;
    const off = port.subscribe((event) => {
      if (event.method !== "item/completed" || event.params?.item?.type !== "agentMessage") return;
      const message = event.params;
      if (
        typeof message.item.text !== "string" ||
        Buffer.byteLength(message.item.text) > 65_536 ||
        messages.length >= 32
      ) {
        observationFailure = "Setup message bound exceeded";
        // Close the trusted transport and its workers. The existing ledger intent
        // remains unresolved if terminal provider evidence is unavailable.
        Promise.resolve()
          .then(() => port.close())
          .catch(() => {});
        return;
      }
      messages.push(structuredClone(message));
    });
    try {
      const boundary = await openBoundary(
        { contract, ledgerRoot: path.join(host, "ledger") },
        {
          ...port,
          authorize: async (subjectDigest, authorityDigest) =>
            subjectDigest === digest(contract) &&
            authorityDigest === contract.authority_digest &&
            (await authorize(digest(packet))),
        },
      );
      const call = {
        id: `setup-${role.toLowerCase()}`,
        assignment_id: contract.assignments[0].id,
        episode_id: `author-${role.toLowerCase()}`,
        role,
        accounting_phase: "setup",
        retry: 0,
      };
      const prompt = [
        `You are the ${role} for prospective reusable strategy authoring.`,
        `Read only public inputs in ${inputs}. Generated strategies are in ${outputs}.`,
        "Do not solve fixture tasks or access hidden tests, reference answers, prior Recipes, host configuration or credentials.",
        "Do not run AgentPlane lifecycle commands. This is measured setup, not a native task episode.",
        "Author reusable structural plans with parameters and verification/recovery instructions; no fixture answers or code patches.",
        role === "EXECUTOR"
          ? "Write only the requested Recipe artifacts inside the output directory."
          : "You have no write authority.",
        role === "EVALUATOR"
          ? "Independently inspect schema, closure, applicability, and answer leakage. Return a JSON verdict with findings; do not repair."
          : "Return a concise JSON account of your plan or produced artifacts.",
        "Prior role results: " +
          JSON.stringify(results.map((r) => ({ role: r.role, message: r.message }))),
      ].join("\n");
      const receipt = await boundary.execute(call, [
        { type: "text", text: prompt, text_elements: [] },
      ]);
      assert.equal(observationFailure, null, observationFailure ?? "Invalid observation");
      assert.equal(receipt.status, "completed");
      assert.equal(receipt.effect_state, "terminal");
      assert.equal(receipt.identity_valid, true);
      assert.equal(receipt.stop_reason, null);
      assert.equal(receipt.usage.state, "observed", "Unknown setup usage stops continuation");
      const message = messages.findLast(
        (m) => m.threadId === receipt.thread_id && m.turnId === receipt.turn_id,
      )?.item.text;
      assert.equal(typeof message, "string", "Bound setup result required");
      assert.deepEqual(setupInventory(inputs), packet.input_inventory, "Public inputs changed");
      const result = { role, call_id: call.id, receipt, message, outputs: setupInventory(outputs) };
      writeFileSync(path.join(directory, "result.json"), JSON.stringify(result, null, 2) + "\n", {
        flag: "wx",
      });
      results.push(result);
      for (const file of result.outputs)
        assert.match(
          file.path,
          /^(?:[a-z0-9-]+\/)?(?:manifest\.json|scenario\.json|agent\.md)$/u,
          "Unexpected strategy output",
        );
      if (role === "EVALUATOR")
        assert.equal(JSON.parse(message).verdict, "pass", "Independent setup review rejected");
    } catch (error) {
      writeFileSync(
        path.join(directory, "failure.json"),
        JSON.stringify({
          role,
          observation_failure: observationFailure,
          bounded_messages: messages,
          disposition: "stopped; retain ledger and do not replay",
        }) + "\n",
        { flag: "wx" },
      );
      throw error;
    } finally {
      off();
      await port.close();
    }
  }
  return {
    packet_digest: digest(packet),
    results,
    outputs: setupInventory(outputs),
    qualification: "independent_operator_review_required",
  };
}
