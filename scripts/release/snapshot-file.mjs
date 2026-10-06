import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync } from "node:fs";

function assertSameFile(expected, actual) {
  const fields = ["dev", "ino", "mode", "size", "mtimeNs", "ctimeNs", "nlink"];
  if (!actual.isFile() || fields.some((field) => expected[field] !== actual[field])) {
    throw new Error("Snapshot file changed during observation");
  }
}

/** Read the exact regular file observed by the snapshot walker. */
export function readSnapshotFile(file, expected) {
  if (!expected.isFile()) throw new Error("Snapshot entry is not a regular file");
  const descriptor = openSync(
    file,
    constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0),
  );
  try {
    assertSameFile(expected, fstatSync(descriptor, { bigint: true }));
    const bytes = readFileSync(descriptor);
    assertSameFile(expected, fstatSync(descriptor, { bigint: true }));
    assertSameFile(expected, lstatSync(file, { bigint: true }));
    return bytes;
  } finally {
    closeSync(descriptor);
  }
}
