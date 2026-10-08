import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import {
  closeSync,
  constants,
  fsyncSync,
  fstatSync,
  linkSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { digest, integer, roles, validateM05Contract, validateM05Receipt } from "./contract.mjs";

const unresolved = (call) => call.receipt === null || call.receipt.effect_state === "unknown";

function readRecord(file) {
  const fd = openSync(file, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd, { bigint: true });
    assert.ok(before.isFile(), "Not a regular journal record");
    const bytes = readFileSync(fd, "utf8");
    const after = fstatSync(fd, { bigint: true });
    const current = lstatSync(file, { bigint: true });
    assert.ok(current.isFile(), "Journal path replaced");
    for (const key of ["dev", "ino", "size", "mtimeNs", "ctimeNs"]) {
      assert.equal(before[key], after[key], "Journal changed during read");
      assert.equal(after[key], current[key], "Journal path replaced");
    }
    return bytes;
  } finally {
    closeSync(fd);
  }
}

function syncDirectory(root) {
  const fd = openSync(root, constants.O_RDONLY);
  try {
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}

// Hard-link publication is the CAS: competing writers cannot replace the same sequence.
// Before the claim, a crash leaves only a temporary file. After the claim, an
// incomplete publication fails closed. Neither path returns a launch permit.
function publish(root, sequence, event) {
  const temporary = path.join(root, `.pending-${randomUUID()}`);
  const fd = openSync(temporary, "wx", 0o600);
  try {
    writeFileSync(fd, JSON.stringify({ event, digest: digest(event) }));
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  try {
    linkSync(temporary, path.join(root, `${sequence}.claim`));
    syncDirectory(root);
    linkSync(temporary, path.join(root, `${sequence}.json`));
    syncDirectory(root);
  } finally {
    unlinkSync(temporary);
  }
}

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
  const campaign = digest(contract);
  assert.equal(
    path.resolve(path.dirname(root)),
    realpathSync(path.dirname(root)),
    "Ledger parent contains a symlink",
  );
  try {
    mkdirSync(root);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
  syncDirectory(path.dirname(root));
  assert.ok(lstatSync(root).isDirectory() && !lstatSync(root).isSymbolicLink());
  assert.equal(path.resolve(root), realpathSync(root), "Ledger path contains a symlink");
  const initial = { sequence: 0, previous: null, campaign, type: "assignments", contract };
  try {
    publish(root, 0, initial);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
  function read() {
    const names = readdirSync(root).filter((name) => !name.startsWith(".pending-"));
    assert.ok(
      names.every((name) => /^(0|[1-9][0-9]*)\.(json|claim)$/u.test(name)),
      "Unexpected ledger entry",
    );
    const state = {
      campaign,
      assignments: structuredClone(contract.assignments),
      calls: Object.create(null),
      outcomes: Object.create(null),
      reserved: { max_tokens: 0, max_cost_microunits: 0 },
    };
    let previous = null;
    assert.equal(names.length % 2, 0, "Incomplete journal publication");
    for (let sequence = 0; sequence < names.length / 2; sequence++) {
      const file = path.join(root, `${sequence}.json`);
      const claim = path.join(root, `${sequence}.claim`);
      const bytes = readRecord(file);
      assert.equal(readRecord(claim), bytes, "Claim mismatch");
      const envelope = JSON.parse(bytes);
      const event = envelope.event;
      assert.equal(envelope.digest, digest(event), "Corrupt ledger record");
      assert.equal(event.sequence, sequence);
      assert.equal(event.previous, previous);
      assert.equal(event.campaign, campaign);
      if (sequence === 0) assert.deepEqual(event, initial);
      else apply(state, event, contract);
      previous = digest(event);
    }
    return { ...state, sequence: names.length / 2, previous };
  }
  function append(state, change) {
    const event = {
      ...structuredClone(change),
      campaign,
      sequence: state.sequence,
      previous: state.previous,
    };
    apply(structuredClone(state), event, contract);
    publish(root, state.sequence, event);
    return read();
  }
  read();
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
