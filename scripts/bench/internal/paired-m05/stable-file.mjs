import assert from "node:assert/strict";
import { constants, openSync, closeSync, fstatSync, readSync } from "node:fs";
import path from "node:path";

const directoryFlags = constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW;
export function descriptorPath(fd, name = "") {
  assert.ok(process.platform === "linux", "M05 stable reads require Linux descriptor paths");
  assert.ok(name === "" || (name !== "." && name !== ".." && path.basename(name) === name));
  return `/proc/self/fd/${fd}${name ? "/" + name : ""}`;
}

export function openStableDirectory(directory) {
  const absolute = path.resolve(directory);
  let fd = openSync(path.parse(absolute).root, directoryFlags);
  try {
    for (const name of absolute.split(path.sep).filter(Boolean)) {
      const next = openSync(descriptorPath(fd, name), directoryFlags);
      closeSync(fd);
      fd = next;
    }
    return fd;
  } catch (error) {
    closeSync(fd);
    throw error;
  }
}

export function openChildDirectory(fd, name) {
  return openSync(descriptorPath(fd, name), directoryFlags);
}

export function readStableFileAt(directory, name, maxBytes = 1_048_576) {
  assert.ok(Number.isSafeInteger(maxBytes) && maxBytes >= 0, "Invalid file size bound");
  const fd = openSync(
    descriptorPath(directory, name),
    constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK,
  );
  try {
    const before = fstatSync(fd);
    assert.ok(before.isFile() && before.size <= maxBytes, "Invalid bounded regular file");
    const bytes = Buffer.alloc(before.size + 1);
    let length = 0;
    while (length < bytes.length) {
      const count = readSync(fd, bytes, length, bytes.length - length, length);
      if (count === 0) break;
      length += count;
    }
    const after = fstatSync(fd);
    assert.ok(
      length === before.size &&
        after.size === before.size &&
        after.mtimeMs === before.mtimeMs &&
        after.ctimeMs === before.ctimeMs,
      "File changed while reading",
    );
    return bytes.subarray(0, length);
  } finally {
    closeSync(fd);
  }
}

export function readStableFile(file, maxBytes) {
  const directory = openStableDirectory(path.dirname(file));
  try {
    return readStableFileAt(directory, path.basename(file), maxBytes);
  } finally {
    closeSync(directory);
  }
}
