import assert from "node:assert/strict";
import { verify } from "node:crypto";
import { digest, integer, validateM05Contract, validateM05Receipt } from "./contract.mjs";
import { openM05Ledger } from "./ledger.mjs";

// This interface qualifies an injected offline host only. Keys must come from the
// host, never from campaign JSON. It does not install a production trust root.
function authenticate(envelope, key, kind) {
  assert.ok(key, "Missing host trust root");
  assert.equal(envelope?.payload?.kind, kind);
  assert.equal(typeof envelope.signature, "string");
  assert.ok(
    verify(
      null,
      Buffer.from(digest(envelope.payload)),
      key,
      Buffer.from(envelope.signature, "base64"),
    ),
    "Unauthenticated host evidence",
  );
  return structuredClone(envelope.payload);
}

export function openOfflineM05Boundary(
  { contract: input, authority, capability, ledgerRoot },
  host,
) {
  const contract = validateM05Contract(input);
  assert.equal(host?.mode, "offline_injected", "Only offline injected hosts are qualified");
  assert.equal(typeof host.invoke, "function");
  const { authorityKey, adapterKey, invoke } = host;
  const { authority_digest: ignored, ...authoritySubject } = contract;
  assert.equal(ignored, digest(authority), "Authority artifact mismatch");
  const grant = authenticate(authority, authorityKey, "agentplane.m05_offline_authority");
  assert.equal(grant.subject_digest, digest(authoritySubject), "Authority campaign mismatch");
  const bound = authenticate(capability, adapterKey, "agentplane.m05_offline_capability");
  const campaign = digest(contract);
  assert.equal(bound.campaign, campaign);
  assert.equal(bound.adapter, contract.adapter);
  assert.equal(bound.enforcement, "offline_hard_limits");
  assert.equal(bound.hidden_retries, 0, "Every retry requires its own reservation");
  for (const field of ["max_tokens", "max_cost_microunits"])
    assert.ok(integer(bound[field]) && bound[field] > 0, "Unsupported finite cap");
  const retainedAuthority = structuredClone(authority);
  const retainedCapability = structuredClone(capability);
  const ledger = openM05Ledger(ledgerRoot, contract);

  function accept(reservation, envelope) {
    const proof = authenticate(envelope, adapterKey, "agentplane.m05_offline_receipt");
    assert.equal(proof.campaign, campaign);
    assert.equal(proof.reservation_digest, digest(reservation));
    assert.equal(proof.adapter, contract.adapter);
    assert.equal(proof.observed_model, contract.model, "Observed model drift");
    assert.equal(proof.observed_effort, contract.effort, "Observed effort drift");
    // Signed terminal/not-started evidence is the offline host's effect proof.
    // A process exit code or exception is deliberately not converted into one.
    const receipt = validateM05Receipt(
      {
        ...proof.receipt,
        host_evidence: {
          authority: retainedAuthority,
          capability: retainedCapability,
          receipt: structuredClone(envelope),
        },
        evidence_digest: digest(envelope),
        observed_model: proof.observed_model,
        observed_effort: proof.observed_effort,
      },
      reservation,
    );
    ledger.receipt(reservation.id, receipt);
    return receipt;
  }

  return {
    read: ledger.read,
    async execute(value) {
      const reservation = structuredClone(value);
      assert.ok(reservation.max_tokens <= bound.max_tokens, "Unsupported token reservation");
      assert.ok(
        reservation.max_cost_microunits <= bound.max_cost_microunits,
        "Unsupported spend reservation",
      );
      const permit = ledger.dispatch(reservation);
      // The intent is durable before control crosses the host boundary. Exceptions
      // leave it unresolved. Reopening never dispatches an uncertain call again.
      const envelope = await invoke({
        contract: structuredClone(contract),
        reservation: structuredClone(reservation),
        permit,
      });
      return accept(reservation, envelope);
    },
    reconcile(callId, envelope) {
      const call = ledger.read().calls[callId];
      assert.ok(call, "No retained dispatch intent");
      return accept(call.reservation, envelope);
    },
  };
}
