import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { digest, roles } from "./contract.mjs";
import { openOfflineM05Boundary } from "./boundary.mjs";
import { runM05LiveCampaign, runM05OfflineLauncher } from "../../paired-live-codex-launcher.mjs";

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-boundary-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const authorityKey = generateKeyPairSync("ed25519");
  const adapterKey = generateKeyPairSync("ed25519");
  const signed = (payload, key) => ({
    payload,
    signature: sign(null, Buffer.from(digest(payload)), key.privateKey).toString("base64"),
  });
  const contract = {
    schema_version: 3,
    kind: "agentplane.m05_live_contract",
    campaign_id: "offline-boundary",
    objective: "Offline interface qualification only",
    adapter: "injected-test",
    model: "test-model",
    effort: "high",
    sandbox: "isolated",
    network: "deny",
    cache: "cold",
    session: "fresh",
    rate_basis: "test-units",
    ...Object.fromEntries(
      [
        "product_digest",
        "oracle_digest",
        "policy_digest",
        "runtime_digest",
        "corpus_digest",
        "randomization_digest",
      ].map((k) => [k, digest(k)]),
    ),
    target_sha: "b".repeat(40),
    transport: "external",
    limits: { max_tokens: 300, max_cost_microunits: 300, max_calls: 10, retry_limit: 1 },
    assignments: [{ id: "task-1", order: 0, arm: "no_recipe", task_id: "fix", stratum: "direct" }],
  };
  const authority = signed(
    { kind: "agentplane.m05_offline_authority", subject_digest: digest(contract) },
    authorityKey,
  );
  contract.authority_digest = digest(authority);
  const capability = signed(
    {
      kind: "agentplane.m05_offline_capability",
      campaign: digest(contract),
      adapter: contract.adapter,
      enforcement: "offline_hard_limits",
      hidden_retries: 0,
      max_tokens: 40,
      max_cost_microunits: 40,
    },
    adapterKey,
  );
  const reservation = (id = "call-1", role = "EXECUTOR", retry = 0) => ({
    id,
    role,
    retry,
    assignment_id: "task-1",
    episode_id: "episode-1",
    model: contract.model,
    effort: contract.effort,
    max_tokens: 40,
    max_cost_microunits: 40,
  });
  const proof = (r, overrides = {}) =>
    signed(
      {
        kind: "agentplane.m05_offline_receipt",
        campaign: digest(contract),
        reservation_digest: digest(r),
        adapter: contract.adapter,
        observed_model: contract.model,
        observed_effort: contract.effort,
        receipt: {
          status: "failed",
          effect_state: "terminal",
          verified: false,
          usage: {
            state: "observed",
            input_tokens: 10,
            output_tokens: 10,
            cached_input_tokens: 0,
            reasoning_tokens: 0,
            total_tokens: 20,
            cost_microunits: 20,
          },
          spans: [{ stage: "provider", start_ms: 0, end_ms: 1 }],
          ...overrides,
        },
      },
      adapterKey,
    );
  const options = {
    contract,
    authority,
    capability,
    ledgerRoot: path.join(root, "ledger"),
    reservations: [reservation()],
  };
  let calls = 0;
  const host = {
    mode: "offline_injected",
    authorityKey: authorityKey.publicKey,
    adapterKey: adapterKey.publicKey,
    invoke({ reservation: r, permit }) {
      calls++;
      assert.equal(permit.dispatch_digest, digest(r));
      // Simulated adapter checks its exact enforced ceiling before producing evidence.
      assert.ok(r.max_tokens <= 40 && r.max_cost_microunits <= 40);
      return proof(r);
    },
  };
  return { options, host, reservation, proof, signed, adapterKey, calls: () => calls };
}

test("M05 offline launcher attributes every role and retry through durable reservations", async (t) => {
  const f = fixture(t);
  f.options.reservations = roles.map((role, i) => f.reservation(`call-${i}`, role));
  f.options.reservations.push(f.reservation("retry", "EXECUTOR", 1));
  const result = await runM05OfflineLauncher(f.options, f.host);
  assert.equal(f.calls(), 7);
  assert.equal(result.evidence_scope, "offline_launcher_interface");
  assert.equal(result.efficiency, "NOT_ESTABLISHED");
  assert.equal(result.ledger.reserved.max_tokens, 280);
  assert.deepEqual(
    Object.values(result.ledger.calls).map((c) => c.reservation.role),
    [...roles, "EXECUTOR"],
  );
  assert.deepEqual(Object.keys(result.ledger.outcomes), []);
});

test("M05 live is unsupported even with manifest authority and an injected approving callback", (t) => {
  const f = fixture(t);
  assert.throws(
    () => runM05LiveCampaign(f.options, { ...f.host, assertLiveAuthority: () => true }),
    /unsupported/,
  );
  assert.equal(f.calls(), 0);
});

test("M05 rejects untrusted, mismatched and unsupported grants before provider dispatch", async (t) => {
  for (const mutate of [
    (f) => {
      f.host.authorityKey = undefined;
    },
    (f) => {
      f.host.authorityKey = generateKeyPairSync("ed25519").publicKey;
    },
    (f) => {
      f.options.authority.payload.subject_digest = digest("other");
    },
    (f) => {
      f.options.contract.model = "other";
    },
    (f) => {
      f.options.capability.payload.max_tokens = 1000;
    },
    (f) => {
      f.options.capability = f.signed(
        { ...f.options.capability.payload, hidden_retries: 1 },
        f.adapterKey,
      );
    },
    (f) => {
      f.options.capability = f.signed(
        { ...f.options.capability.payload, enforcement: "timeout" },
        f.adapterKey,
      );
    },
    (f) => {
      f.options.capability = f.signed(
        { ...f.options.capability.payload, max_tokens: null },
        f.adapterKey,
      );
    },
    (f) => {
      f.options.reservations[0].max_tokens = 41;
    },
  ]) {
    const f = fixture(t);
    mutate(f);
    await assert.rejects(runM05OfflineLauncher(f.options, f.host));
    assert.equal(f.calls(), 0);
  }
});

test("M05 cumulative budget stops before invocation and unknown cost never releases reserve", async (t) => {
  const f = fixture(t);
  f.host.invoke = ({ reservation }) =>
    f.proof(reservation, {
      usage: {
        state: "partial",
        input_tokens: 10,
        output_tokens: 10,
        cached_input_tokens: null,
        reasoning_tokens: null,
        total_tokens: 20,
        cost_microunits: null,
      },
    });
  const b = openOfflineM05Boundary(f.options, f.host);
  for (let i = 0; i < 7; i++)
    await b.execute({ ...f.reservation(`call-${i}`), episode_id: `episode-${i}` });
  const before = b.read();
  await assert.rejects(
    b.execute({ ...f.reservation("exhausted"), episode_id: "next" }),
    /Budget exhausted/,
  );
  assert.deepEqual(b.read(), before);
  assert.equal(before.reserved.max_cost_microunits, 280);
  assert.equal(before.calls["call-0"].receipt.usage.cost_microunits, null);
});

test("M05 interruption reconciliation requires exact authenticated evidence and never replays a call", async (t) => {
  const f = fixture(t);
  let invocations = 0;
  f.host.invoke = () => {
    invocations++;
    throw new Error("process exited without terminal proof");
  };
  const first = openOfflineM05Boundary(f.options, f.host);
  await assert.rejects(first.execute(f.reservation()), /process exited/);
  const reopened = openOfflineM05Boundary(f.options, f.host);
  await assert.rejects(reopened.execute(f.reservation()), /already assigned/);
  await assert.rejects(reopened.execute(f.reservation("retry", "EXECUTOR", 1)), /Unresolved/);
  const before = reopened.read();
  const invalid = f.proof(f.reservation());
  invalid.signature = "invalid";
  assert.throws(() => reopened.reconcile("call-1", invalid));
  assert.throws(() => reopened.reconcile("call-1", f.proof(f.reservation("other"))));
  assert.deepEqual(reopened.read(), before);
  const proof = f.proof(f.reservation());
  reopened.reconcile("call-1", proof);
  const reconciled = reopened.read();
  reopened.reconcile("call-1", proof);
  assert.deepEqual(reopened.read(), reconciled);
  assert.equal(invocations, 1);
  f.host.invoke = ({ reservation }) => {
    invocations++;
    return f.proof(reservation);
  };
  await openOfflineM05Boundary(f.options, f.host).execute(f.reservation("retry", "EXECUTOR", 1));
  assert.equal(invocations, 2);
});

test("M05 signed identity drift and contradictory usage cannot reconcile durable intent", async (t) => {
  for (const mutate of [
    (p) => {
      p.observed_model = "wrong-model";
    },
    (p) => {
      p.observed_effort = "wrong-effort";
    },
    (p) => {
      p.campaign = digest("wrong-campaign");
    },
    (p) => {
      p.receipt.usage.total_tokens = 0;
    },
  ]) {
    const f = fixture(t);
    f.host.invoke = ({ reservation }) => {
      const p = f.proof(reservation).payload;
      mutate(p);
      return f.signed(p, f.adapterKey);
    };
    const b = openOfflineM05Boundary(f.options, f.host);
    await assert.rejects(b.execute(f.reservation()));
    assert.equal(b.read().calls["call-1"].receipt, null);
    await assert.rejects(b.execute(f.reservation("retry", "EXECUTOR", 1)), /Unresolved/);
  }
});

test("M05 boundary pins host trust across invocation and retains accepted signed evidence", async (t) => {
  const f = fixture(t);
  const originalInvoke = f.host.invoke;
  f.host.invoke = (args) => {
    f.host.adapterKey = generateKeyPairSync("ed25519").publicKey;
    f.host.invoke = () => {
      throw new Error("replacement adapter must not run");
    };
    return originalInvoke(args);
  };
  const b = openOfflineM05Boundary(f.options, f.host);
  await b.execute(f.reservation());
  await b.execute(f.reservation("retry", "EXECUTOR", 1));
  const retained = b.read().calls["call-1"].receipt.host_evidence;
  assert.deepEqual(retained.authority, f.options.authority);
  assert.deepEqual(retained.capability, f.options.capability);
  assert.deepEqual(retained.receipt, f.proof(f.reservation()));
  assert.equal(f.calls(), 2);
});
