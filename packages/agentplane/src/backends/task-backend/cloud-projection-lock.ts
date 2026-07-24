import { randomUUID } from "node:crypto";
import { constants } from "node:fs";
import {
  link,
  lstat,
  mkdir,
  open,
  readdir,
  realpath,
  unlink,
  type FileHandle,
} from "node:fs/promises";
import { hostname } from "node:os";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import { compareCodeUnits } from "./cloud-backend-utils.js";
import { BackendError } from "./shared/errors.js";

const LOCK_DIRECTORY = ".agentplane/cache/cloud-projection-lock";
const LOCK_NAME = "projection-operation.lock";
const CANDIDATE_PREFIX = "projection-operation.candidate.";
const RECOVERY_PREFIX = "projection-operation.recovery.";
const RECOVERY_MARKER_SUFFIX = ".json";
const RECOVERY_TARGET_SUFFIX = ".target";
const NO_FOLLOW = constants.O_NOFOLLOW ?? 0;
const RECOVERY_WAIT_ATTEMPTS = 20;
const RECOVERY_WAIT_MS = 10;

export type CloudProjectionDirectoryIdentity = {
  dev: bigint;
  ino: bigint;
  path: string;
};

type ProcessOwner = {
  host: string;
  nonce: string;
  operation: string;
  pid: number;
};

type RecoveryClaim = {
  markerPath: string;
  owner: ProcessOwner;
  targetPath: string;
};

export async function withCloudProjectionLock<T>(
  opts: { operation: string; repositoryRoot: string },
  run: () => Promise<T>,
): Promise<T> {
  const repositoryRoot = await realpath(path.resolve(opts.repositoryRoot));
  const lockDir = path.join(repositoryRoot, LOCK_DIRECTORY);
  const lockPath = path.join(lockDir, LOCK_NAME);
  const directoryChain = await ensureContainedDirectoryChain(
    repositoryRoot,
    lockDir,
    "cloud projection lock",
  );
  const owner: ProcessOwner = {
    host: hostname(),
    nonce: randomUUID(),
    operation: opts.operation,
    pid: process.pid,
  };
  const handle = await acquireLock({
    directoryChain,
    lockDir,
    lockPath,
    owner,
  });
  try {
    return await run();
  } finally {
    await releaseOwnedLock({ directoryChain, handle, lockPath });
  }
}

async function acquireLock(opts: {
  directoryChain: CloudProjectionDirectoryIdentity[];
  lockDir: string;
  lockPath: string;
  owner: ProcessOwner;
}): Promise<FileHandle> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await removeAbandonedRecoveryClaims(opts.lockDir);
    const candidatePath = path.join(opts.lockDir, `${CANDIDATE_PREFIX}${opts.owner.nonce}.json`);
    await writeNewStableRegularFileNoFollow(
      candidatePath,
      `${JSON.stringify(
        {
          ...opts.owner,
          acquired_at: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
      "cloud projection lock candidate",
    );
    const handle = await open(candidatePath, constants.O_RDWR | NO_FOLLOW);
    let linked = false;
    try {
      await link(candidatePath, opts.lockPath);
      linked = true;
      await assertDirectoryChainUnchanged(opts.directoryChain);
      await assertOwnedLockPath(handle, opts.lockPath);
      await unlink(candidatePath);
      if (!(await waitForRecoveryClaimsToClear(opts.lockDir))) {
        throw cloudProjectionLockHeldError(opts.lockPath, null);
      }
      await assertOwnedLockPath(handle, opts.lockPath);
      return handle;
    } catch (error) {
      if (linked) {
        await releaseOwnedLock({
          directoryChain: opts.directoryChain,
          handle,
          lockPath: opts.lockPath,
        });
      } else {
        await handle.close();
        await unlinkIfRegularFile(candidatePath);
      }
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
      const recovered = await tryRecoverAbandonedLock(opts);
      if (recovered) continue;
      throw cloudProjectionLockHeldError(opts.lockPath, await readProcessOwner(opts.lockPath));
    }
  }
  throw cloudProjectionLockHeldError(opts.lockPath, await readProcessOwner(opts.lockPath));
}

async function tryRecoverAbandonedLock(opts: {
  directoryChain: CloudProjectionDirectoryIdentity[];
  lockDir: string;
  lockPath: string;
  owner: ProcessOwner;
}): Promise<boolean> {
  const recoveryNonce = randomUUID();
  const markerPath = path.join(
    opts.lockDir,
    `${RECOVERY_PREFIX}${recoveryNonce}${RECOVERY_MARKER_SUFFIX}`,
  );
  const targetPath = path.join(
    opts.lockDir,
    `${RECOVERY_PREFIX}${recoveryNonce}${RECOVERY_TARGET_SUFFIX}`,
  );
  const claim: RecoveryClaim = {
    markerPath,
    owner: {
      ...opts.owner,
      nonce: recoveryNonce,
      operation: `recover:${opts.owner.operation}`,
    },
    targetPath,
  };
  await atomicWriteFile(
    markerPath,
    `${JSON.stringify(
      {
        ...claim.owner,
        acquired_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  try {
    await removeAbandonedRecoveryClaims(opts.lockDir);
    const markerNames = await listRecoveryMarkerNames(opts.lockDir);
    if (markerNames[0] !== path.basename(markerPath)) return false;
    await assertDirectoryChainUnchanged(opts.directoryChain);
    try {
      await link(opts.lockPath, targetPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return true;
      throw error;
    }
    const existingOwner = await readProcessOwner(targetPath);
    if (!isRecoverableAbandonedOwner(existingOwner)) return false;
    const [target, current] = await Promise.all([
      lstat(targetPath, { bigint: true }),
      lstat(opts.lockPath, { bigint: true }).catch((error: unknown) => {
        if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
        throw error;
      }),
    ]);
    if (
      target.isSymbolicLink() ||
      !target.isFile() ||
      current === null ||
      current.isSymbolicLink() ||
      !current.isFile() ||
      BigInt(target.dev) !== BigInt(current.dev) ||
      BigInt(target.ino) !== BigInt(current.ino)
    ) {
      return true;
    }
    await assertDirectoryChainUnchanged(opts.directoryChain);
    if (!isRecoverableAbandonedOwner(await readProcessOwner(targetPath))) return false;
    try {
      await unlink(opts.lockPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
    }
    return true;
  } finally {
    await cleanupRecoveryClaim(claim);
  }
}

async function waitForRecoveryClaimsToClear(lockDir: string): Promise<boolean> {
  for (let attempt = 0; attempt < RECOVERY_WAIT_ATTEMPTS; attempt += 1) {
    await removeAbandonedRecoveryClaims(lockDir);
    const markerNames = await listRecoveryMarkerNames(lockDir);
    if (markerNames.length === 0) return true;
    await new Promise<void>((resolve) => {
      setTimeout(resolve, RECOVERY_WAIT_MS);
    });
  }
  return false;
}

async function removeAbandonedRecoveryClaims(lockDir: string): Promise<void> {
  for (const markerName of await listRecoveryMarkerNames(lockDir)) {
    const markerPath = path.join(lockDir, markerName);
    const owner = await readProcessOwner(markerPath);
    if (!owner || !isRecoverableAbandonedOwner(owner)) continue;
    const nonce = markerName.slice(RECOVERY_PREFIX.length, -RECOVERY_MARKER_SUFFIX.length);
    await cleanupRecoveryClaim({
      markerPath,
      owner,
      targetPath: path.join(lockDir, `${RECOVERY_PREFIX}${nonce}${RECOVERY_TARGET_SUFFIX}`),
    });
  }
}

async function listRecoveryMarkerNames(lockDir: string): Promise<string[]> {
  const names = await readdir(lockDir);
  return names
    .filter((name) => name.startsWith(RECOVERY_PREFIX) && name.endsWith(RECOVERY_MARKER_SUFFIX))
    .toSorted(compareCodeUnits);
}

async function cleanupRecoveryClaim(claim: RecoveryClaim): Promise<void> {
  await unlinkIfRegularFile(claim.targetPath);
  await unlinkIfRegularFile(claim.markerPath);
}

async function releaseOwnedLock(opts: {
  directoryChain: CloudProjectionDirectoryIdentity[];
  handle: FileHandle;
  lockPath: string;
}): Promise<void> {
  try {
    await assertDirectoryChainUnchanged(opts.directoryChain);
    await assertOwnedLockPath(opts.handle, opts.lockPath);
    await unlink(opts.lockPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
  } finally {
    await opts.handle.close();
  }
}

async function assertOwnedLockPath(handle: FileHandle, lockPath: string): Promise<void> {
  const [opened, current] = await Promise.all([
    handle.stat({ bigint: true }),
    lstat(lockPath, { bigint: true }),
  ]);
  if (
    current.isSymbolicLink() ||
    !current.isFile() ||
    BigInt(opened.dev) !== BigInt(current.dev) ||
    BigInt(opened.ino) !== BigInt(current.ino)
  ) {
    throw unsafeLockPathError(`Refusing changed cloud projection lock: ${lockPath}`);
  }
}

async function ensureContainedDirectoryChain(
  repositoryRoot: string,
  directory: string,
  label: string,
): Promise<CloudProjectionDirectoryIdentity[]> {
  const relative = path.relative(repositoryRoot, directory);
  if (relative !== "") relativeDescendant(repositoryRoot, directory, label);
  const chain: CloudProjectionDirectoryIdentity[] = [];
  const rootStats = await lstat(repositoryRoot, { bigint: true });
  if (rootStats.isSymbolicLink() || !rootStats.isDirectory()) {
    throw unsafeLockPathError(`Refusing non-directory repository root: ${repositoryRoot}`);
  }
  chain.push({
    dev: BigInt(rootStats.dev),
    ino: BigInt(rootStats.ino),
    path: repositoryRoot,
  });
  let current = repositoryRoot;
  for (const segment of relative === "" ? [] : relative.split(path.sep)) {
    current = path.join(current, segment);
    try {
      await mkdir(current);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
    }
    const stats = await lstat(current, { bigint: true });
    if (stats.isSymbolicLink() || !stats.isDirectory()) {
      throw unsafeLockPathError(`Refusing symlinked or non-directory ${label}: ${current}`);
    }
    const resolved = await realpath(current);
    relativeDescendant(repositoryRoot, resolved, label);
    chain.push({ dev: BigInt(stats.dev), ino: BigInt(stats.ino), path: current });
  }
  return chain;
}

async function assertDirectoryChainUnchanged(
  chain: readonly CloudProjectionDirectoryIdentity[],
  label = "cloud projection lock",
): Promise<void> {
  for (const expected of chain) {
    const current = await lstat(expected.path, { bigint: true });
    if (
      current.isSymbolicLink() ||
      !current.isDirectory() ||
      BigInt(current.dev) !== expected.dev ||
      BigInt(current.ino) !== expected.ino
    ) {
      throw unsafeLockPathError(`${label} ancestor changed: ${expected.path}`);
    }
  }
}

async function readProcessOwner(filePath: string): Promise<ProcessOwner | null> {
  try {
    const raw = JSON.parse(
      await readStableRegularTextNoFollow(filePath, "cloud projection lock owner", {
        max_bytes: 16 * 1024,
      }),
    ) as Partial<ProcessOwner>;
    return typeof raw.host === "string" &&
      typeof raw.nonce === "string" &&
      typeof raw.operation === "string" &&
      Number.isInteger(raw.pid)
      ? (raw as ProcessOwner)
      : null;
  } catch {
    return null;
  }
}

function isRecoverableAbandonedOwner(owner: ProcessOwner | null): boolean {
  if (owner?.host !== hostname() || owner.pid <= 0) return false;
  try {
    process.kill(owner.pid, 0);
    return false;
  } catch (error) {
    return (error as NodeJS.ErrnoException | null)?.code === "ESRCH";
  }
}

async function unlinkIfRegularFile(filePath: string): Promise<void> {
  try {
    const stats = await lstat(filePath);
    if (stats.isSymbolicLink() || !stats.isFile()) {
      throw unsafeLockPathError(`Refusing to unlink non-regular cloud lock artifact: ${filePath}`);
    }
    await unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
  }
}

function relativeDescendant(root: string, target: string, label: string): string {
  const relative = path.relative(root, target);
  if (
    relative === "" ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw unsafeLockPathError(`Refusing ${label} outside the repository: ${target}`);
  }
  return relative;
}

export function assertCloudProjectionPathContained(opts: {
  label: string;
  repositoryRoot: string;
  targetPath: string;
}): void {
  relativeDescendant(path.resolve(opts.repositoryRoot), path.resolve(opts.targetPath), opts.label);
}

export async function ensureContainedCloudProjectionDirectory(opts: {
  directoryPath: string;
  label: string;
  repositoryRoot: string;
}): Promise<CloudProjectionDirectoryIdentity[]> {
  const repositoryRootInput = path.resolve(opts.repositoryRoot);
  const directoryInput = path.resolve(opts.directoryPath);
  const relative = path.relative(repositoryRootInput, directoryInput);
  if (relative !== "") relativeDescendant(repositoryRootInput, directoryInput, opts.label);
  const repositoryRoot = await realpath(repositoryRootInput);
  return await ensureContainedDirectoryChain(
    repositoryRoot,
    path.join(repositoryRoot, relative),
    opts.label,
  );
}

export async function assertCloudProjectionDirectoryUnchanged(
  chain: readonly CloudProjectionDirectoryIdentity[],
  label: string,
): Promise<void> {
  await assertDirectoryChainUnchanged(chain, label);
}

function unsafeLockPathError(message: string): BackendError {
  return new BackendError(message, "E_BACKEND", {
    reasonCode: "cloud_projection_lock_unsafe",
  });
}

function cloudProjectionLockHeldError(lockPath: string, owner: ProcessOwner | null): BackendError {
  return new BackendError(
    [
      "Another cloud projection operation is already in progress.",
      "Why: synchronization and local cache mutation must not overlap.",
      `Lock: ${lockPath}`,
      `Owner: ${JSON.stringify(owner)}`,
      "Fix: wait for the recorded process to finish, then retry.",
      "Stop condition: do not remove a live or unverified lock.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_projection_operation_in_progress" },
  );
}
