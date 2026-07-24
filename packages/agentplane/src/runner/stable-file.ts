import { constants, type BigIntStats } from "node:fs";
import { lstat, open } from "node:fs/promises";
import path from "node:path";
import { syncDirectory } from "@agentplaneorg/core/fs";

const NO_FOLLOW = constants.O_NOFOLLOW ?? 0;
const NON_BLOCKING = constants.O_NONBLOCK ?? 0;
const DEFAULT_MAX_READ_BYTES = 256 * 1024 * 1024;

type FileIdentity = {
  dev: bigint;
  ino: bigint;
};

type FileSnapshot = FileIdentity & {
  size: bigint;
  mtime_ns: bigint;
  ctime_ns: bigint;
};

function identity(stat: BigIntStats): FileIdentity {
  return {
    dev: BigInt(stat.dev),
    ino: BigInt(stat.ino),
  };
}

function snapshot(stat: BigIntStats): FileSnapshot {
  return {
    ...identity(stat),
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

function assertRegular(stat: BigIntStats, filePath: string, label: string): void {
  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new Error(`Refusing non-regular ${label}: ${filePath}`);
  }
}

async function lstatRegular(filePath: string, label: string): Promise<BigIntStats> {
  const stat = await lstat(filePath, { bigint: true });
  assertRegular(stat, filePath, label);
  return stat;
}

export async function readStableRegularFileNoFollow(
  filePath: string,
  label: string,
  opts: { max_bytes?: number } = {},
): Promise<Buffer> {
  const maxBytes = opts.max_bytes ?? DEFAULT_MAX_READ_BYTES;
  const pathStat = await lstatRegular(filePath, label);
  if (pathStat.size > BigInt(maxBytes)) {
    throw new Error(`${label} exceeds the ${maxBytes}-byte observation budget: ${filePath}`);
  }
  const pathSnapshot = snapshot(pathStat);
  let handle;
  try {
    handle = await open(filePath, constants.O_RDONLY | NO_FOLLOW | NON_BLOCKING);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ELOOP") {
      throw new Error(`Refusing non-regular ${label}: ${filePath}`);
    }
    throw error;
  }
  try {
    const before = await handle.stat({ bigint: true });
    assertRegular(before, filePath, label);
    if (!sameSnapshot(pathSnapshot, snapshot(before))) {
      throw new Error(`${label} changed before it could be read: ${filePath}`);
    }
    const content = await handle.readFile();
    if (content.byteLength > maxBytes) {
      throw new Error(`${label} exceeds the ${maxBytes}-byte observation budget: ${filePath}`);
    }
    const after = await handle.stat({ bigint: true });
    assertRegular(after, filePath, label);
    if (!sameSnapshot(snapshot(before), snapshot(after))) {
      throw new Error(`${label} changed while it was being read: ${filePath}`);
    }
    const pathAfter = await lstatRegular(filePath, label);
    if (!sameIdentity(identity(after), identity(pathAfter))) {
      throw new Error(`${label} path changed while it was being read: ${filePath}`);
    }
    return content;
  } finally {
    await handle.close();
  }
}

export async function readStableRegularTextNoFollow(
  filePath: string,
  label: string,
  opts: { max_bytes?: number } = {},
): Promise<string> {
  const content = await readStableRegularFileNoFollow(filePath, label, opts);
  return content.toString("utf8");
}

export async function appendStableRegularFileNoFollow(
  filePath: string,
  contents: string | Buffer,
  label: string,
): Promise<void> {
  let pathStat: BigIntStats | null;
  try {
    pathStat = await lstatRegular(filePath, label);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
    pathStat = null;
  }
  const pathIdentity = pathStat ? identity(pathStat) : null;
  let handle;
  try {
    handle = await open(
      filePath,
      constants.O_WRONLY |
        constants.O_APPEND |
        NO_FOLLOW |
        NON_BLOCKING |
        (pathStat ? 0 : constants.O_CREAT | constants.O_EXCL),
      0o600,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ELOOP") {
      throw new Error(`Refusing non-regular ${label}: ${filePath}`);
    }
    if (!pathStat && (error as NodeJS.ErrnoException | null)?.code === "EEXIST") {
      return await appendStableRegularFileNoFollow(filePath, contents, label);
    }
    throw error;
  }
  try {
    const before = await handle.stat({ bigint: true });
    assertRegular(before, filePath, label);
    if (pathIdentity && !sameIdentity(pathIdentity, identity(before))) {
      throw new Error(`${label} changed before it could be appended: ${filePath}`);
    }
    await handle.writeFile(contents);
    await handle.sync();
    const after = await handle.stat({ bigint: true });
    assertRegular(after, filePath, label);
    const pathAfter = await lstatRegular(filePath, label);
    if (
      !sameIdentity(identity(before), identity(after)) ||
      !sameIdentity(identity(after), identity(pathAfter))
    ) {
      throw new Error(`${label} path changed while it was being appended: ${filePath}`);
    }
    if (!pathStat) await syncDirectory(path.dirname(filePath));
  } finally {
    await handle.close();
  }
}

export async function writeNewStableRegularFileNoFollow(
  filePath: string,
  contents: string | Buffer,
  label: string,
): Promise<void> {
  let handle;
  try {
    handle = await open(
      filePath,
      constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | NO_FOLLOW | NON_BLOCKING,
      0o600,
    );
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | null)?.code;
    if (code === "ELOOP" || code === "EEXIST") {
      throw new Error(`Refusing pre-existing or non-regular ${label}: ${filePath}`);
    }
    throw error;
  }
  try {
    const before = await handle.stat({ bigint: true });
    assertRegular(before, filePath, label);
    await handle.writeFile(contents);
    await handle.sync();
    const after = await handle.stat({ bigint: true });
    assertRegular(after, filePath, label);
    const pathAfter = await lstatRegular(filePath, label);
    if (
      !sameIdentity(identity(before), identity(after)) ||
      !sameIdentity(identity(after), identity(pathAfter))
    ) {
      throw new Error(`${label} path changed while it was being written: ${filePath}`);
    }
    await syncDirectory(path.dirname(filePath));
  } finally {
    await handle.close();
  }
}
