import assert from "node:assert/strict";
import { mkdirSync, realpathSync, readFileSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { digest } from "./contract.mjs";
import { writeIsolationPolicy } from "./isolation.mjs";
import { createBrokeredAppServer } from "./brokered-app-server.mjs";
import { openSubscriptionBoundary } from "./subscription-boundary.mjs";
import { openSubscriptionLedger } from "./subscription-ledger.mjs";
import { semanticCodingPort } from "./semantic-coding-port.mjs";
import { nativeCodingPort } from "./native-coding-port.mjs";
import { openJournal } from "./journal.mjs";
import { readNativeCodingTask, nativeCodingFacts } from "./native-coding-evidence.mjs";
import { runNativeCodingLoop } from "./native-coding-loop.mjs";

export function assertNativeCodingToolAuthority(order) {
  assert.equal(order.authority.network, "deny", "Coding tools require native network denial");
  assert.ok(Array.isArray(order.authority.writable_roots));
  if (order.role !== "EXECUTOR") assert.equal(order.authority.writable_roots.length, 0);
}

// All paths and authorize come from the native campaign operator. No values are
// learned from candidate files. Existing managed authentication remains Codex's
// responsibility; this factory never reads, copies or logs credentials.
export function createCodingHost(
  {
    contract,
    corpusManifest,
    assignmentId,
    subject,
    scope,
    hostRoot,
    ledgerRoot,
    codexBinary,
    managedRuntime,
    oracleRoots,
    authorize,
    native,
  },
  createServer = createBrokeredAppServer,
) {
  assert.ok(["deny", "provider"].includes(contract.network));
  assert.ok(oracleRoots.length > 0);
  assert.equal(digest(corpusManifest), contract.corpus_digest, "Frozen corpus changed");
  const assigned = contract.assignments.find((a) => a.id === assignmentId);
  assert.ok(assigned);
  const fixture = corpusManifest.cases.find((c) => c.manifest.id === assigned.task_id)?.manifest;
  assert.ok(fixture, "Assigned coding fixture missing");
  assert.deepEqual(scope, fixture.scope);
  const root = realpathSync(subject);
  const writes = scope.map((p) => realpathSync(path.resolve(root, p)));
  assert.ok(writes.every((p) => p.startsWith(root + path.sep)));
  for (const [file, expected] of [
    ["README.md", fixture.readme_digest],
    ["visible.test.mjs", fixture.visible_digest],
  ])
    assert.equal(
      `sha256:${createHash("sha256")
        .update(readFileSync(path.join(root, file)))
        .digest("hex")}`,
      expected,
      "Frozen public fixture changed",
    );
  mkdirSync(hostRoot, { recursive: true });
  mkdirSync(ledgerRoot, { recursive: true });
  const hidden = [
    fileURLToPath(new URL(".", import.meta.url)),
    hostRoot,
    ledgerRoot,
    ...oracleRoots,
  ].map((p) => realpathSync(p));
  for (const writable of managedRuntime.writable) {
    const grant = realpathSync(writable);
    assert.ok(
      grant !== root && !root.startsWith(grant + path.sep) && !grant.startsWith(root + path.sep),
      "Runtime writes overlap native repository",
    );
  }
  for (const grant of [root, ...managedRuntime.readOnly, ...managedRuntime.writable]) {
    const allowed = realpathSync(grant);
    assert.ok(
      hidden.every(
        (secret) =>
          secret !== allowed &&
          !secret.startsWith(allowed + path.sep) &&
          !allowed.startsWith(secret + path.sep),
      ),
      "Oracle is covered by a process grant",
    );
  }
  mkdirSync(hostRoot, { recursive: true });
  const ledger = openSubscriptionLedger(ledgerRoot, contract);
  const nativeOptions = { ...native, cwd: root };
  const resume = nativeCodingPort(nativeOptions);
  const history = openJournal(
    path.join(hostRoot, "native-evidence"),
    { task_id: native.taskId, assignment_id: assignmentId },
    { records: [], episodes: [], pending: null },
    (state, event) => {
      if (event.type === "episode_started") {
        assert.equal(state.pending, null, "Unresolved semantic episode requires recovery");
        state.pending = event.order;
      } else if (event.type === "episode_finished") {
        assert.ok(state.pending);
        state.episodes.push({ order: state.pending, solved: event.solved });
        state.pending = null;
      } else {
        assert.equal(event.type, "native_read");
        state.records.push(event.task);
      }
    },
  );
  const resumeExact = async (argv) => {
    const packet = await resume(argv);
    const task = await readNativeCodingTask(nativeOptions);
    history.append(history.read(), { type: "native_read", task });
    return packet;
  };
  const solveEpisode = semanticCodingPort({
    assignmentId,
    openEpisode: async (order) => {
      assert.equal(order.task.id, native.taskId);
      assertNativeCodingToolAuthority(order);
      const allowed = order.authority.writable_roots.map((p) =>
        realpathSync(path.resolve(root, p)),
      );
      assert.ok(
        allowed.every((p) => writes.includes(p)),
        "Native episode exceeds frozen coding scope",
      );
      if (order.role !== "EXECUTOR")
        assert.equal(allowed.length, 0, "Planning and evaluation are read only");
      const calls = Object.values(ledger.read().calls),
        callId = `call-${calls.length}`;
      const episodeId = order.work_order_id.replace(/^sha256:/u, "");
      const retry = calls.filter(
        (c) =>
          c.reservation.assignment_id === assignmentId &&
          c.reservation.role === order.role &&
          c.reservation.episode_id === episodeId,
      ).length;
      const directory = path.join(hostRoot, callId);
      mkdirSync(directory, { recursive: true });
      const policyPath = path.join(directory, "isolation.json");
      const policy = writeIsolationPolicy(policyPath, {
        cwd: root,
        readOnly: [root],
        writable: allowed,
        network: "deny",
      });
      for (const grant of [...policy.read_only, ...policy.writable])
        assert.ok(
          hidden.every(
            (secret) =>
              secret !== grant &&
              !secret.startsWith(grant + path.sep) &&
              !grant.startsWith(secret + path.sep),
          ),
          "Runtime grant exposes oracle or accounting evidence",
        );
      const port = await createServer({
        policyPath,
        auditPath: path.join(directory, "tool-effects.jsonl"),
        codexBinary,
        cwd: root,
        env: managedRuntime.env,
        approvedConfigDigests: managedRuntime.approvedConfigDigests,
        disabledPlugins: managedRuntime.disabledPlugins,
        timeoutMs: contract.limits.turn_timeout_ms,
      });
      try {
        const boundary = await openSubscriptionBoundary(
          { contract, ledgerRoot },
          { ...port, authorize },
        );
        return { ...port, boundary, callId, retry };
      } catch (error) {
        await port.close();
        throw error;
      }
    },
  });
  const solve = async (episode) => {
    history.append(history.read(), { type: "episode_started", order: episode.order });
    const solved = await solveEpisode(episode);
    history.append(history.read(), { type: "episode_finished", solved });
    return solved;
  };
  return {
    solve,
    resumeExact,
    facts: ({ workflow, fallback }) =>
      nativeCodingFacts({
        ...nativeOptions,
        ledger,
        assignmentId,
        scope,
        workflow,
        fallback,
        history,
      }),
    readCall: async (id) => ledger.read().calls[id],
    run: (options) =>
      runNativeCodingLoop(options, {
        solve,
        resumeExact,
        readCall: async (id) => ledger.read().calls[id],
      }),
  };
}
