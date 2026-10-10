import assert from "node:assert/strict";
import { lstatSync, mkdtempSync, renameSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { readSnapshotFile } from "./snapshot-file.mjs";

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-snapshot-file-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const file = path.join(root, "input.txt");
  writeFileSync(file, "original");
  return { root, file, observed: lstatSync(file, { bigint: true }) };
}

test("reads the observed regular file through its descriptor", (t) => {
  const { file, observed } = fixture(t);
  assert.equal(readSnapshotFile(file, observed).toString(), "original");
});

test("rejects a regular file replaced after the snapshot observation", (t) => {
  const { root, file, observed } = fixture(t);
  renameSync(file, path.join(root, "original.txt"));
  writeFileSync(file, "replaced");
  assert.throws(() => readSnapshotFile(file, observed), /changed during observation/u);
});

test("rejects a file changed in place after the snapshot observation", (t) => {
  const { file, observed } = fixture(t);
  writeFileSync(file, "changed contents");
  assert.throws(() => readSnapshotFile(file, observed), /changed during observation/u);
});

test("rejects a symlink substituted after the snapshot observation", (t) => {
  const { root, file, observed } = fixture(t);
  const target = path.join(root, "outside.txt");
  renameSync(file, target);
  symlinkSync(target, file);
  assert.throws(() => readSnapshotFile(file, observed));
});

test("rejects non-regular snapshot entries", (t) => {
  const { root } = fixture(t);
  assert.throws(
    () => readSnapshotFile(root, lstatSync(root, { bigint: true })),
    /not a regular file/u,
  );
});
