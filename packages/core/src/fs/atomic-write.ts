import { createHash, randomBytes } from "node:crypto";
import { constants, type BigIntStats } from "node:fs";
import { lstat, mkdir, open, rename, unlink, type FileHandle } from "node:fs/promises";
import path from "node:path";

const ATOMIC_TEMP_ATTEMPTS = 8;
const VERIFY_CHUNK_BYTES = 64 * 1024;

type FileIdentity = {
  dev: bigint;
  ino: bigint;
};

type FileSnapshot = FileIdentity & {
  size: bigint;
  mtime_ns: bigint;
  ctime_ns: bigint;
};

function fileIdentity(stat: BigIntStats): FileIdentity {
  return { dev: BigInt(stat.dev), ino: BigInt(stat.ino) };
}

function fileSnapshot(stat: BigIntStats): FileSnapshot {
  return {
    ...fileIdentity(stat),
    size: BigInt(stat.size),
    mtime_ns: BigInt(stat.mtimeNs),
    ctime_ns: BigInt(stat.ctimeNs),
  };
}

function sameIdentity(left: FileIdentity, right: FileIdentity): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function sameSnapshot(left: FileSnapshot, right: FileSnapshot): boolean {
  return (
    sameIdentity(left, right) &&
    left.size === right.size &&
    left.mtime_ns === right.mtime_ns &&
    left.ctime_ns === right.ctime_ns
  );
}

function assertRegularFile(stat: BigIntStats, filePath: string): void {
  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new Error(`Atomic-write path is not a regular file: ${filePath}`);
  }
}

async function assertHandleOwnsPath(handle: FileHandle, filePath: string, phase: string) {
  const [handleStat, pathStat] = await Promise.all([
    handle.stat({ bigint: true }),
    lstat(filePath, { bigint: true }),
  ]);
  assertRegularFile(handleStat, filePath);
  assertRegularFile(pathStat, filePath);
  if (!sameIdentity(fileIdentity(handleStat), fileIdentity(pathStat))) {
    throw new Error(`Atomic-write temp path identity changed ${phase}: ${filePath}`);
  }
}

async function hashStableFileHandle(
  handle: FileHandle,
  filePath: string,
): Promise<{
  bytes: bigint;
  sha256: string;
}> {
  const before = await handle.stat({ bigint: true });
  assertRegularFile(before, filePath);
  const beforeSnapshot = fileSnapshot(before);
  const hash = createHash("sha256");
  let position = 0;
  while (BigInt(position) < beforeSnapshot.size) {
    const remaining = beforeSnapshot.size - BigInt(position);
    const length = Number(
      remaining < BigInt(VERIFY_CHUNK_BYTES) ? remaining : BigInt(VERIFY_CHUNK_BYTES),
    );
    const buffer = Buffer.allocUnsafe(length);
    const { bytesRead } = await handle.read(buffer, 0, length, position);
    if (bytesRead <= 0) {
      throw new Error(`Atomic-write temp file ended before its recorded size: ${filePath}`);
    }
    hash.update(bytesRead === length ? buffer : buffer.subarray(0, bytesRead));
    position += bytesRead;
  }
  const after = await handle.stat({ bigint: true });
  assertRegularFile(after, filePath);
  if (!sameSnapshot(beforeSnapshot, fileSnapshot(after))) {
    throw new Error(`Atomic-write temp file changed while it was verified: ${filePath}`);
  }
  return {
    bytes: beforeSnapshot.size,
    sha256: hash.digest("hex"),
  };
}

async function assertExpectedHandleContents(
  handle: FileHandle,
  filePath: string,
  expected: Buffer,
): Promise<void> {
  const observed = await hashStableFileHandle(handle, filePath);
  const expectedSha256 = createHash("sha256").update(expected).digest("hex");
  if (observed.bytes !== BigInt(expected.byteLength) || observed.sha256 !== expectedSha256) {
    throw new Error(`Atomic-write temp file contents changed before publication: ${filePath}`);
  }
}

async function openExclusiveTempFile(filePath: string) {
  for (let attempt = 0; attempt < ATOMIC_TEMP_ATTEMPTS; attempt += 1) {
    const tmpPath = `${filePath}.tmp-${randomBytes(16).toString("hex")}`;
    try {
      const handle = await open(
        tmpPath,
        constants.O_RDWR | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0),
        0o600,
      );
      return { handle, tmpPath };
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "EEXIST") continue;
      throw error;
    }
  }
  throw new Error(`Unable to allocate an exclusive atomic-write temp file for ${filePath}`);
}

export async function atomicWriteFile(
  filePath: string,
  contents: string | Buffer,
  encoding: BufferEncoding = "utf8",
): Promise<void> {
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  const { handle, tmpPath } = await openExclusiveTempFile(filePath);
  const expected = Buffer.isBuffer(contents) ? contents : Buffer.from(contents, encoding);
  let renamed = false;
  try {
    await handle.writeFile(expected);
    await handle.sync();
    await assertHandleOwnsPath(handle, tmpPath, "before publication");
    await assertExpectedHandleContents(handle, tmpPath, expected);
    await rename(tmpPath, filePath);
    renamed = true;
    await assertHandleOwnsPath(handle, filePath, "after publication");
    await assertExpectedHandleContents(handle, filePath, expected);
  } finally {
    try {
      await handle.close();
    } catch {
      // The handle may already be closed after a successful write.
    }
    if (!renamed) {
      try {
        await unlink(tmpPath);
      } catch {
        // Temporary-file cleanup is best effort after an earlier write failure.
      }
    }
  }
}
