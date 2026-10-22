import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { digest } from "./contract.mjs";
const run = promisify(execFile);

// Read via the canonical CLI owner. Candidate processes cannot write the native
// store. Caller-supplied verdict JSON is never a substitute for this read.
export async function readNativeCodingTask({ executable, cwd, env, taskId, timeoutMs }) {
  const result = await run(executable, ["task", "show", taskId], {
    cwd,
    env,
    timeout: timeoutMs,
    maxBuffer: 8 * 1024 * 1024,
    encoding: "utf8",
  });
  const task = JSON.parse(result.stdout);
  assert.equal(task.source, "task_kernel");
  const { digest: recordDigest, ...contents } = task.canonical_record;
  assert.equal(digest(contents), recordDigest, "Canonical record changed");
  assert.equal(contents.aggregate.id, taskId);
  return task;
}
// Reconcile the complete host episode history, not merely calls that happen to
// remain in the ledger. Native item attempts establish execution coverage.
export function assertNativeAccounting(record, retained, calls, taskId) {
  assert.equal(retained.pending, null, "Unresolved semantic episode");
  assert.ok(Array.isArray(retained.episodes), "Semantic episode history missing");
  const ids = new Set();
  for (const { order, solved } of retained.episodes) {
    assert.equal(order.task.id, taskId);
    assert.equal(solved.result.work_order_id, order.work_order_id);
    assert.ok(!ids.has(solved.call_id), "Duplicate semantic accounting call");
    ids.add(solved.call_id);
    const call = calls.find((entry) => entry.reservation.id === solved.call_id);
    assert.ok(call, "Semantic episode usage missing");
    assert.equal(call.reservation.role, order.role);
    assert.equal(call.reservation.episode_id, order.work_order_id.replace(/^sha256:/u, ""));
  }
  assert.equal(ids.size, calls.length, "Unattributed provider attempt");
  const records = [...retained.records.map((entry) => entry.canonical_record), record];
  for (const observed of records) {
    assert.equal(observed.aggregate.id, taskId);
    for (const [id, item] of Object.entries(observed.aggregate.work_items)) {
      for (let attempt = 1; attempt <= item.attempt; attempt++)
        assert.ok(
          retained.episodes.some(({ order }) => {
            const binding = order.canonical_binding;
            return (
              order.role === "EXECUTOR" &&
              binding?.task_id === taskId &&
              binding.work_item_id === id &&
              binding.attempt === attempt &&
              binding.plan_revision === observed.aggregate.current_plan.revision
            );
          }),
          "Native execution attempt usage missing",
        );
    }
  }
  assert.ok(
    retained.episodes.some(({ order }) => order.role === "EXECUTOR"),
    "Executor usage missing",
  );
  assert.ok(
    retained.episodes.some(({ order }) => order.role === "EVALUATOR"),
    "Evaluator usage missing",
  );
}
export function nativeCodingFacts({
  executable,
  cwd,
  env,
  taskId,
  timeoutMs,
  ledger,
  assignmentId,
  scope,
  workflow,
  fallback,
  history,
}) {
  const execute = async (command, args) => {
    const result = await run(command, args, {
      cwd,
      env,
      timeout: timeoutMs,
      maxBuffer: 8 * 1024 * 1024,
      encoding: "utf8",
    });
    return result.stdout.trim();
  };
  return async ({ subject, head, initial_commit }) => {
    assert.equal(subject, cwd);
    if (initial_commit) await execute("git", ["merge-base", "--is-ancestor", initial_commit, head]);
    assert.equal(await execute("git", ["rev-parse", "HEAD"]), head);
    const task = await readNativeCodingTask({ executable, cwd, env, taskId, timeoutMs });
    assert.equal(task.source, "task_kernel");
    const record = task.canonical_record;
    const { digest: recordDigest, ...contents } = record;
    assert.equal(digest(contents), recordDigest, "Canonical record changed");
    assert.equal(record.aggregate.id, taskId);
    assert.equal(record.aggregate.final_validation?.status, "PASSED");
    const items = Object.values(record.aggregate.work_items).filter(
      (item) => !item.definition.optional,
    );
    assert.ok(
      items.length > 0 &&
        items.every((item) => item.state === "COMPLETED" && item.validation?.status === "PASSED"),
    );
    assert.equal(
      task.execution_route?.selected_mode,
      workflow,
      "Native workflow differs from frozen stratum",
    );
    assert.equal(task.quality_review?.state, "pass");
    assert.equal(task.quality_review.provenance, "evaluator_supplied");
    const evidence = task.operational_evidence;
    assert.equal(evidence.source, "task_kernel");
    assert.equal(task.quality_review.evaluated_sha, evidence.implementation_commit);
    await execute("git", ["merge-base", "--is-ancestor", evidence.implementation_commit, head]);
    assert.equal(
      await execute("git", ["diff", evidence.implementation_commit, "--", ...scope]),
      "",
      "Source drift after native verification",
    );
    const actualScope = [
      ...new Set(items.flatMap((item) => item.definition.execution_requirements.scope_roots)),
    ].toSorted();
    assert.deepEqual(actualScope, [...scope].toSorted());
    const calls = Object.values(ledger.read().calls).filter(
      (call) => call.reservation.assignment_id === assignmentId,
    );
    assertNativeAccounting(record, history.read(), calls, taskId);
    const complete =
      calls.length > 0 &&
      calls.every(
        (call) =>
          call.receipt?.effect_state === "terminal" &&
          call.receipt.usage.state === "observed" &&
          call.receipt.identity_valid &&
          !call.receipt.stop_reason,
      );
    assert.ok(
      calls.some((call) => call.reservation.role === "EVALUATOR"),
      "Independent evaluator usage missing",
    );
    if (fallback === "native_ordinary_planning") {
      assert.equal(task.planning?.plan_origin, "planner");
      assert.equal(task.planning?.outcome, "passed");
      assert.ok(
        calls.some((call) => call.reservation.role === "PLANNER"),
        "Fallback planner usage missing",
      );
    }
    const failures = history
      .read()
      .records.filter(
        (entry) =>
          entry.canonical_record.aggregate.id === taskId &&
          (entry.canonical_record.aggregate.final_validation?.status === "FAILED" ||
            Object.values(entry.canonical_record.aggregate.work_items).some(
              (item) => item.validation?.status === "FAILED",
            )),
      );
    return {
      head,
      verification: "passed",
      evaluator: "pass",
      accounting_complete: complete,
      scope: actualScope,
      workflow,
      fallback,
      native_record_digest: recordDigest,
      verification_digest: evidence.verification_evidence_digest,
      review_digest: evidence.review_identity_digest,
      failed_verification_digests: failures.map((entry) => entry.canonical_record.digest),
      recovery_digest: failures.length > 0 ? recordDigest : null,
    };
  };
}
