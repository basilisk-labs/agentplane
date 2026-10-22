import assert from "node:assert/strict";
import { digest, integer, roles } from "./contract.mjs";
import { openJournal } from "./journal.mjs";
import { parseSubscriptionTokens, validateSubscriptionContract } from "./subscription-contract.mjs";

function apply(state, event, contract) {
  const calls = Object.values(state.calls);
  if (event.type === "intent") {
    assert.ok(
      calls.every(
        (c) =>
          c.receipt?.effect_state === "terminal" &&
          c.receipt.usage.state === "observed" &&
          c.receipt.identity_valid &&
          !c.receipt.stop_reason,
      ),
      "Unresolved or stopped campaign",
    );
    const r = event.reservation;
    assert.match(r.id, /^[a-z0-9][a-z0-9-]*$/u);
    assert.ok(!Object.hasOwn(state.calls, r.id), "Never replay an assigned call");
    assert.ok(contract.assignments.some((a) => a.id === r.assignment_id));
    assert.ok(roles.includes(r.role));
    assert.ok(["setup", "steady"].includes(r.accounting_phase));
    assert.match(r.episode_id, /^[a-z0-9][a-z0-9-]*$/u);
    assert.equal(r.model, contract.model);
    assert.equal(r.effort, contract.effort);
    assert.ok(typeof r.thread_id === "string" && r.thread_id);
    assert.ok(
      !calls.some((c) => c.reservation.thread_id === r.thread_id),
      "Use a fresh thread for each accounted call",
    );
    assert.ok(integer(r.retry) && r.retry <= contract.limits.retry_limit);
    const earlier = calls.filter(
      (c) =>
        c.reservation.assignment_id === r.assignment_id &&
        c.reservation.role === r.role &&
        c.reservation.episode_id === r.episode_id,
    );
    assert.equal(r.retry, earlier.length, "Retry sequence mismatch");
    if (earlier.length > 0) assert.notEqual(earlier.at(-1).receipt.status, "completed");
    assert.ok(calls.length < contract.limits.max_calls, "Call limit exhausted");
    const episodes = new Set([
      ...calls.map((c) => `${c.reservation.assignment_id}/${c.reservation.episode_id}`),
      `${r.assignment_id}/${r.episode_id}`,
    ]);
    assert.ok(episodes.size <= contract.limits.max_episodes, "Episode limit exhausted");
    assert.ok(integer(r.started_ms) && integer(r.deadline_ms) && r.deadline_ms > r.started_ms);
    assert.ok(r.deadline_ms - r.started_ms <= contract.limits.turn_timeout_ms);
    const start = calls[0]?.reservation.started_ms ?? r.started_ms;
    assert.ok(r.started_ms >= (calls.at(-1)?.receipt.finished_ms ?? start));
    assert.ok(r.deadline_ms <= start + contract.limits.max_duration_ms, "Campaign time exhausted");
    const tokens = calls.reduce((sum, c) => sum + c.receipt.usage.totalTokens, 0);
    assert.ok(
      Number.isSafeInteger(tokens) && tokens < contract.limits.soft_token_ceiling,
      "Soft token ceiling reached",
    );
    state.calls[r.id] = { reservation: r, turn_id: null, receipt: null };
  } else if (event.type === "turn") {
    const c = state.calls[event.call_id];
    assert.ok(c && !c.turn_id && !c.receipt);
    assert.ok(typeof event.turn_id === "string" && event.turn_id);
    assert.ok(!calls.some((v) => v.turn_id === event.turn_id));
    c.turn_id = event.turn_id;
  } else {
    assert.equal(event.type, "receipt");
    const c = state.calls[event.call_id];
    assert.ok(c && c.turn_id && !c.receipt);
    const r = event.receipt;
    assert.equal(r.thread_id, c.reservation.thread_id);
    assert.equal(r.turn_id, c.turn_id);
    assert.equal(r.effect_state, "terminal");
    assert.ok(["completed", "failed", "interrupted"].includes(r.status));
    assert.deepEqual(r.usage, parseSubscriptionTokens(r.usage));
    assert.ok(integer(r.finished_ms) && r.finished_ms >= c.reservation.started_ms);
    assert.equal(typeof r.identity_valid, "boolean");
    if (r.identity_valid) {
      assert.equal(r.observed_model, contract.model);
      assert.equal(r.observed_effort, contract.effort);
    }
    assert.ok(r.stop_reason === null || typeof r.stop_reason === "string");
    c.receipt = r;
  }
}

export function openSubscriptionLedger(root, input) {
  const contract = validateSubscriptionContract(input);
  const journal = openJournal(
    root,
    contract,
    { assignments: contract.assignments, calls: {} },
    apply,
  );
  return {
    read: journal.read,
    intent(reservation) {
      journal.append(journal.read(), { type: "intent", reservation });
      return digest(reservation);
    },
    turn(callId, turnId) {
      return journal.append(journal.read(), { type: "turn", call_id: callId, turn_id: turnId });
    },
    receipt(callId, receipt) {
      const state = journal.read();
      if (state.calls[callId]?.receipt) {
        assert.deepEqual(state.calls[callId].receipt, receipt, "Conflicting receipt");
        return state;
      }
      return journal.append(state, { type: "receipt", call_id: callId, receipt });
    },
  };
}
