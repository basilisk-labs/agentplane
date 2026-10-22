import assert from "node:assert/strict";
import test from "node:test";
import {
  closeSync,
  mkdtempSync,
  mkdirSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { openStableDirectory, readStableFileAt, readStableFile } from "./stable-file.mjs";

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-stable-file-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

test("stable reads hash actual descriptor bytes and preserve exact size bounds", (t) => {
  const file = path.join(fixture(t), "input");
  writeFileSync(file, "abc");
  assert.equal(readStableFile(file, 3).toString(), "abc");
  assert.throws(() => readStableFile(file, 2), /Invalid bounded regular file/u);
});

test("replacement by a symlink never follows its target", (t) => {
  const root = fixture(t);
  const file = path.join(root, "input");
  const secret = path.join(root, "secret");
  writeFileSync(file, "allowed");
  writeFileSync(secret, "forbidden");
  assert.equal(readStableFile(file).toString(), "allowed");
  rmSync(file);
  symlinkSync(secret, file);
  assert.throws(() => readStableFile(file), { code: "ELOOP" });
});

test("directories and missing files are rejected without a content read", (t) => {
  const root = fixture(t);
  const directory = path.join(root, "directory");
  mkdirSync(directory);
  assert.throws(() => readStableFile(directory), /Invalid bounded regular file/u);
  assert.throws(() => readStableFile(path.join(root, "missing")), { code: "ENOENT" });
});

test("parent symlinks are rejected and an opened directory survives path replacement", (t) => {
  const root = fixture(t);
  const parent = path.join(root, "parent");
  const moved = path.join(root, "moved");
  const outside = path.join(root, "outside");
  mkdirSync(parent);
  mkdirSync(outside);
  writeFileSync(path.join(parent, "input"), "allowed");
  writeFileSync(path.join(outside, "input"), "forbidden");
  const fd = openStableDirectory(parent);
  try {
    renameSync(parent, moved);
    symlinkSync(outside, parent);
    assert.equal(readStableFileAt(fd, "input").toString(), "allowed");
    assert.throws(() => readStableFile(path.join(parent, "input")));
  } finally {
    closeSync(fd);
  }
});
