import assert from "node:assert/strict";
import { digest, integer, roles, validateM05Contract, validateM05Receipt } from "./contract.mjs";

import { openJournal } from "./journal.mjs";

const unresolved = (call) => call.receipt === null || call.receipt.effect_state === "unknown";

function apply(state, event, contract) {
  if (event.type === "dispatch") {
    assert.ok(!Object.values(state.calls).some((call) => unresolved(call)), "Unresolved dispatch");
    const v = event.reservation;
    assert.ok(contract.assignments.some((a) => a.id === v.assignment_id));
    assert.ok(!Object.hasOwn(state.outcomes, v.assignment_id), "Assignment already closed");
    assert.equal(
      contract.assignments.find((a) => !Object.hasOwn(state.outcomes, a.id))?.id,
      v.assignment_id,
      "Assigned order mismatch",
    );
    assert.ok(
      typeof v.id === "string" &&
        /^[a-z0-9][a-z0-9-]*$/u.test(v.id) &&
        !Object.hasOwn(state.calls, v.id),
    );
    assert.ok(roles.includes(v.role));
    assert.ok(typeof v.episode_id === "string" && /^[a-z0-9][a-z0-9-]*$/u.test(v.episode_id));
    assert.equal(v.model, contract.model);
    assert.equal(v.effort, contract.effort);
    assert.ok(integer(v.retry) && v.retry <= contract.limits.retry_limit);
    const earlier = Object.values(state.calls).filter(
      (call) =>
        call.reservation.assignment_id === v.assignment_id &&
        call.reservation.role === v.role &&
        call.reservation.episode_id === v.episode_id,
    );
    assert.equal(v.retry, earlier.length, "Retry sequence mismatch");
    if (earlier.length > 0) assert.notEqual(earlier.at(-1).receipt.status, "completed");
    for (const key of ["max_tokens", "max_cost_microunits"]) {
      assert.ok(integer(v[key]) && v[key] > 0);
      const total = state.reserved[key] + v[key];
      assert.ok(Number.isSafeInteger(total) && total <= contract.limits[key], "Budget exhausted");
      state.reserved[key] = total;
    }
    assert.ok(Object.keys(state.calls).length < contract.limits.max_calls, "Call limit exhausted");
    state.calls[v.id] = { reservation: v, receipt: null };
  } else if (event.type === "outcome") {
    assert.ok(contract.assignments.some((a) => a.id === event.assignment_id));
    assert.ok(!Object.hasOwn(state.outcomes, event.assignment_id), "Assignment already closed");
    assert.ok(
      !Object.values(state.calls).some(
        (call) => call.reservation.assignment_id === event.assignment_id && unresolved(call),
      ),
      "Unresolved dispatch",
    );
    assert.ok(
      ["completed", "failed", "blocked", "cancelled", "interrupted"].includes(event.outcome.status),
    );
    assert.ok(/^sha256:[a-f0-9]{64}$/u.test(event.outcome.evidence_digest));
    assert.equal(typeof event.outcome.verified, "boolean");
    if (event.outcome.verified) assert.equal(event.outcome.status, "completed");
    state.outcomes[event.assignment_id] = event.outcome;
  } else {
    assert.equal(event.type, "receipt");
    const call = state.calls[event.call_id];
    assert.ok(call && call.receipt === null, "Unknown or completed dispatch");
    call.receipt = validateM05Receipt(event.receipt, call.reservation);
  }
}

export function openM05Ledger(root, input) {
  const contract = validateM05Contract(input);
  const { read, append } = openJournal(
    root,
    contract,
    {
      assignments: structuredClone(contract.assignments),
      calls: Object.create(null),
      outcomes: Object.create(null),
      reserved: { max_tokens: 0, max_cost_microunits: 0 },
    },
    apply,
  );
  const campaign = digest(contract);
  return {
    read,
    // This primitive records intent only. The launcher must separately authenticate
    // authority and cap enforcement before using its single returned launch permit.
    dispatch(reservation) {
      const state = read();
      assert.ok(!state.calls[reservation.id], "Dispatch already assigned; never relaunch");
      append(state, { type: "dispatch", reservation });
      return { call_id: reservation.id, campaign, dispatch_digest: digest(reservation) };
    },
    outcome(assignmentId, outcome) {
      const state = read();
      if (Object.hasOwn(state.outcomes, assignmentId)) {
        assert.deepEqual(state.outcomes[assignmentId], outcome, "Conflicting outcome");
        return state;
      }
      return append(state, { type: "outcome", assignment_id: assignmentId, outcome });
    },
    receipt(callId, receipt) {
      const state = read();
      if (state.calls[callId]?.receipt) {
        assert.deepEqual(state.calls[callId].receipt, receipt, "Conflicting receipt");
        return state;
      }
      return append(state, { type: "receipt", call_id: callId, receipt });
    },
  };
}
