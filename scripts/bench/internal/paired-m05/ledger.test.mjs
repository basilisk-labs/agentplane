import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { validateM05Contract } from "./contract.mjs";
import { openM05Ledger } from "./ledger.mjs";

const hash = `sha256:${"a".repeat(64)}`;
function contract() {
  return {
    schema_version: 3,
    kind: "agentplane.m05_live_contract",
    campaign_id: "offline-test",
    objective: "Fix a bounded defect",
    adapter: "injected-test",
    model: "test-model",
    effort: "high",
    sandbox: "isolated",
    network: "deny",
    cache: "cold",
    session: "fresh",
    rate_basis: "test-units",
    product_digest: hash,
    oracle_digest: hash,
    policy_digest: hash,
    runtime_digest: hash,
    authority_digest: hash,
    corpus_digest: hash,
    randomization_digest: hash,
    target_sha: "b".repeat(40),
    transport: "external",
    limits: { max_tokens: 100, max_cost_microunits: 100, max_calls: 5, retry_limit: 1 },
    assignments: [{ id: "task-1", order: 0, arm: "no_recipe", task_id: "fix", stratum: "direct" }],
  };
}
function reservation(id = "call-1", role = "EXECUTOR") {
  return {
    id,
    assignment_id: "task-1",
    episode_id: "episode-1",
    role,
    retry: 0,
    model: "test-model",
    effort: "high",
    max_tokens: 40,
    max_cost_microunits: 40,
  };
}
function receipt(status = "failed") {
  return {
    status,
    effect_state: status === "interrupted" ? "unknown" : "terminal",
    verified: false,
    evidence_digest: hash,
    observed_model: null,
    observed_effort: null,
    usage: {
      state: "unavailable",
      input_tokens: null,
      output_tokens: null,
      cached_input_tokens: null,
      reasoning_tokens: null,
      total_tokens: null,
      cost_microunits: null,
    },
    spans: [{ stage: "provider", start_ms: 0, end_ms: 3 }],
  };
}
function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-ledger-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}
test("M05 contract rejects absent pins and nonfinite limits without authorizing execution", () => {
  const value = contract();
  assert.deepEqual(validateM05Contract(value), value);
  for (const key of [
    "product_digest",
    "authority_digest",
    "oracle_digest",
    "model",
    "effort",
    "corpus_digest",
  ]) {
    const bad = contract();
    bad[key] = "unknown";
    assert.throws(() => validateM05Contract(bad));
  }
  for (const limit of [null, Infinity, -1, 1.1]) {
    const bad = contract();
    bad.limits.max_tokens = limit;
    assert.throws(() => validateM05Contract(bad));
  }
});
test("durable assignments survive reopen; interrupted dispatch never returns a second permit", (t) => {
  const root = fixture(t);
  const ledger = openM05Ledger(root, contract());
  assert.equal(ledger.read().assignments.length, 1);
  ledger.dispatch(reservation());
  const reopened = openM05Ledger(root, contract());
  assert.throws(() => reopened.dispatch(reservation()), /never relaunch/u);
  assert.throws(() => reopened.dispatch(reservation("call-2", "EVALUATOR")), /Unresolved/u);
  const done = receipt("failed");
  reopened.receipt("call-1", done);
  assert.deepEqual(reopened.receipt("call-1", done), reopened.read());
  assert.throws(() => reopened.receipt("call-1", receipt("cancelled")), /Conflicting/u);
  reopened.dispatch(reservation("call-2", "EVALUATOR"));
  assert.equal(reopened.read().reserved.max_tokens, 80);
  assert.equal(reopened.read().calls["call-1"].receipt.usage.total_tokens, null);
});
test("all failure outcomes retain reservations and finite budget rejects further work", (t) => {
  for (const status of ["failed", "blocked", "cancelled", "interrupted", "completed"]) {
    const root = path.join(fixture(t), status);
    const ledger = openM05Ledger(root, contract());
    ledger.dispatch(reservation());
    ledger.receipt("call-1", receipt(status));
    if (status === "interrupted") {
      assert.throws(() => ledger.dispatch(reservation("call-2", "PLANNER")), /Unresolved/u);
      assert.throws(
        () =>
          ledger.outcome("task-1", { status: "failed", verified: false, evidence_digest: hash }),
        /Unresolved/u,
      );
      continue;
    }
    ledger.dispatch(reservation("call-2", "PLANNER"));
    ledger.receipt("call-2", receipt());
    assert.throws(() => ledger.dispatch(reservation("call-3", "orchestration")), /Budget/u);
    assert.equal(ledger.read().calls["call-1"].receipt.status, status);
  }
});
test("corrupt, truncated, mismatched and symlink journals fail closed", (t) => {
  const root = fixture(t);
  const ledger = openM05Ledger(root, contract());
  ledger.dispatch(reservation());
  const file = path.join(root, "1.json");
  const raw = readFileSync(file);
  const parsed = JSON.parse(raw);
  parsed.event.reservation.max_tokens = 1;
  writeFileSync(file, JSON.stringify(parsed));
  assert.throws(() => ledger.read(), /Corrupt|Claim/u);
  writeFileSync(file, "{");
  assert.throws(() => ledger.read());
  writeFileSync(file, raw);
  rmSync(file);
  assert.throws(() => ledger.read(), /Incomplete/u);
  writeFileSync(file, raw);
  const changed = contract();
  changed.model = "other";
  assert.throws(() => openM05Ledger(root, changed));
  const link = path.join(fixture(t), "link");
  symlinkSync(root, link, "dir");
  assert.throws(() => openM05Ledger(link, contract()));
});
test("receipt validation rejects overlaps, subset double counts and over-reservation usage", (t) => {
  const ledger = openM05Ledger(fixture(t), contract());
  ledger.dispatch(reservation());
  const overlap = receipt();
  overlap.spans.push({ stage: "checks", start_ms: 1, end_ms: 5 });
  assert.throws(() => ledger.receipt("call-1", overlap), /Overlapping/u);
  const over = receipt();
  over.usage.total_tokens = 41;
  assert.throws(() => ledger.receipt("call-1", over));
  const subset = receipt();
  subset.usage.input_tokens = 1;
  subset.usage.cached_input_tokens = 2;
  assert.throws(() => ledger.receipt("call-1", subset));
  assert.equal(ledger.read().calls["call-1"].receipt, null);
});
test("two real processes cannot obtain concurrent dispatch permits", async (t) => {
  const root = fixture(t);
  openM05Ledger(root, contract());
  const source = `import {openM05Ledger} from ${JSON.stringify(new URL("ledger.mjs", import.meta.url).href)}; try {openM05Ledger(${JSON.stringify(root)},${JSON.stringify(contract())}).dispatch(${JSON.stringify(reservation())}); process.exitCode=0;} catch {process.exitCode=2;}`;
  const run = () =>
    new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ["--input-type=module", "--eval", source], {
        stdio: "ignore",
      });
      child.on("error", reject);
      child.on("exit", resolve);
    });
  const results = await Promise.all([run(), run()]);
  assert.deepEqual(results.toSorted(), [0, 2]);
  assert.equal(Object.keys(openM05Ledger(root, contract()).read().calls).length, 1);
});
test("native roles, repeated episodes and bounded retries retain distinct accounting", (t) => {
  const value = contract();
  value.limits = { max_tokens: 1000, max_cost_microunits: 1000, max_calls: 10, retry_limit: 1 };
  const ledger = openM05Ledger(fixture(t), value);
  for (const [index, role] of [
    "selection",
    "PLANNER",
    "specialization",
    "EXECUTOR",
    "EVALUATOR",
    "orchestration",
  ].entries()) {
    const call = reservation(`role-${index}`, role);
    ledger.dispatch(call);
    ledger.receipt(call.id, receipt("completed"));
  }
  const next = { ...reservation("next"), episode_id: "episode-2" };
  ledger.dispatch(next);
  ledger.receipt(next.id, receipt("failed"));
  const retry = { ...next, id: "retry", retry: 1 };
  ledger.dispatch(retry);
  ledger.receipt(retry.id, receipt("failed"));
  assert.throws(() => ledger.dispatch({ ...retry, id: "too-many", retry: 2 }));
  assert.equal(Object.keys(ledger.read().calls).length, 8);
  assert.equal(ledger.read().reserved.max_tokens, 320);
});

test("pre-provider cancellation remains assigned and cannot later dispatch", (t) => {
  const ledger = openM05Ledger(fixture(t), contract());
  const outcome = { status: "cancelled", verified: false, evidence_digest: hash };
  ledger.outcome("task-1", outcome);
  assert.deepEqual(ledger.outcome("task-1", outcome).outcomes["task-1"], outcome);
  assert.equal(ledger.read().assignments.length, 1);
  assert.equal(Object.keys(ledger.read().calls).length, 0);
  assert.throws(() => ledger.dispatch(reservation()), /already closed/u);
});

test("real process termination at publication boundaries never duplicates a launch", (t) => {
  for (const point of ["before-claim", "after-claim", "after-record"]) {
    const root = fixture(t);
    openM05Ledger(root, contract());
    const source = `import fs from "node:fs"; import {syncBuiltinESMExports} from "node:module";
      const original=fs.linkSync; fs.linkSync=(from,to)=>{
        if (${JSON.stringify(point)}==="before-claim" && to.endsWith("/1.claim")) process.exit(71);
        original(from,to);
        if ((${JSON.stringify(point)}==="after-claim" && to.endsWith("/1.claim")) || (${JSON.stringify(point)}==="after-record" && to.endsWith("/1.json"))) process.exit(71);
      }; syncBuiltinESMExports();
      const {openM05Ledger}=await import(${JSON.stringify(new URL("ledger.mjs", import.meta.url).href)});
      openM05Ledger(${JSON.stringify(root)},${JSON.stringify(contract())}).dispatch(${JSON.stringify(reservation())});`;
    const child = spawnSync(process.execPath, ["--input-type=module", "--eval", source], {
      timeout: 5000,
    });
    assert.equal(child.status, 71);
    if (point === "after-claim") {
      assert.throws(() => openM05Ledger(root, contract()), /Incomplete/u);
      continue;
    }
    const ledger = openM05Ledger(root, contract());
    if (point === "before-claim") {
      assert.equal(Object.keys(ledger.read().calls).length, 0);
      ledger.dispatch(reservation());
    } else {
      assert.equal(Object.keys(ledger.read().calls).length, 1);
      assert.throws(() => ledger.dispatch(reservation()), /never relaunch/u);
    }
  }
});

test("failure status alone never resolves unknown provider effects", (t) => {
  const ledger = openM05Ledger(fixture(t), contract());
  ledger.dispatch(reservation());
  ledger.receipt("call-1", { ...receipt("failed"), effect_state: "unknown" });
  assert.throws(() => ledger.dispatch({ ...reservation("retry"), retry: 1 }), /Unresolved/u);
});

test("dispatch follows the pinned assignment order", (t) => {
  const value = contract();
  value.assignments.push({ ...value.assignments[0], id: "task-2", order: 1, arm: "instantiate" });
  const ledger = openM05Ledger(fixture(t), value);
  assert.throws(
    () => ledger.dispatch({ ...reservation(), assignment_id: "task-2" }),
    /order mismatch/u,
  );
  ledger.outcome("task-1", { status: "blocked", verified: false, evidence_digest: hash });
  ledger.dispatch({ ...reservation(), assignment_id: "task-2" });
});

test("contradictory usage never publishes a receipt or unblocks dispatch", (t) => {
  const ledger = openM05Ledger(fixture(t), contract());
  ledger.dispatch(reservation());
  const observed = {
    ...receipt(),
    observed_model: "test-model",
    observed_effort: "high",
    usage: {
      state: "observed",
      input_tokens: 1000,
      output_tokens: 1000,
      cached_input_tokens: 0,
      reasoning_tokens: 0,
      total_tokens: 0,
      cost_microunits: 0,
    },
  };
  const invalid = [
    observed,
    {
      ...observed,
      usage: { ...observed.usage, input_tokens: 20, output_tokens: 20, total_tokens: 39 },
    },
    ...["unavailable", "unattributable"].map((state) => ({
      ...receipt(),
      usage: { ...receipt().usage, state, total_tokens: 0 },
    })),
    { ...receipt(), usage: { ...receipt().usage, state: "partial" } },
    { ...observed, usage: { ...observed.usage, input_tokens: null } },
    { ...receipt(), usage: { ...receipt().usage, state: "partial", input_tokens: 41 } },
    { ...receipt(), usage: { ...receipt().usage, state: "partial", cached_input_tokens: 41 } },
  ];
  const before = ledger.read();
  for (const value of invalid) {
    assert.throws(() => ledger.receipt("call-1", value));
    assert.deepEqual(ledger.read(), before);
    assert.throws(() => ledger.dispatch(reservation("next", "EVALUATOR")), /Unresolved/u);
  }
});
test("coherent observed and partial usage preserve subsets and null costs", (t) => {
  const ledger = openM05Ledger(fixture(t), contract());
  ledger.dispatch(reservation());
  const observed = {
    ...receipt(),
    observed_model: "test-model",
    observed_effort: "high",
    usage: {
      state: "observed",
      input_tokens: 10,
      output_tokens: 20,
      cached_input_tokens: 8,
      reasoning_tokens: 15,
      total_tokens: 32,
      cost_microunits: 2,
    },
  };
  ledger.receipt("call-1", observed);
  ledger.dispatch(reservation("next", "EVALUATOR"));
  const partial = {
    ...receipt(),
    usage: {
      ...receipt().usage,
      state: "partial",
      input_tokens: 10,
      cached_input_tokens: 8,
      output_tokens: 20,
      total_tokens: 32,
    },
  };
  ledger.receipt("next", partial);
  assert.deepEqual(ledger.read().calls.next.receipt.usage, partial.usage);
  assert.equal(ledger.read().calls["call-1"].receipt.usage.total_tokens, 32);
  assert.equal(ledger.read().reserved.max_tokens, 80);
});
