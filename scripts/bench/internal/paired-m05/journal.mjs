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
import { digest } from "./contract.mjs";

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

export function openJournal(root, contract, initialState, apply) {
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
    const state = structuredClone(initialState);
    for (const [key, value] of Object.entries(initialState)) {
      if (value && Object.getPrototypeOf(value) === null) Object.setPrototypeOf(state[key], null);
    }
    let previous = null;
    assert.equal(names.length % 2, 0, "Incomplete journal publication");
    for (let sequence = 0; sequence < names.length / 2; sequence++) {
      const bytes = readRecord(path.join(root, `${sequence}.json`));
      assert.equal(readRecord(path.join(root, `${sequence}.claim`)), bytes, "Claim mismatch");
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
    return { ...state, campaign, sequence: names.length / 2, previous };
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
  return { read, append };
}
