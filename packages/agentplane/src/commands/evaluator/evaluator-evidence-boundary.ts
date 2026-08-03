import { constants, type BigIntStats } from "node:fs";
import { randomUUID } from "node:crypto";
import { link, lstat, mkdir, open, realpath, rename, unlink } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";

const NO_FOLLOW = constants.O_NOFOLLOW ?? 0;
const NON_BLOCKING = constants.O_NONBLOCK ?? 0;

type Identity = { dev: bigint; ino: bigint };
type FileSnapshot = Identity & {
  size: bigint;
  mtime_ns: bigint;
  ctime_ns: bigint;
};

type EvaluatorEvidenceBoundaryPhase =
  | "before_artifact_open"
  | "after_artifact_open"
  | "before_object_staging_open"
  | "after_object_staging_open"
  | "before_object_link"
  | "after_object_link"
  | "before_object_staging_cleanup"
  | "before_manifest_staging_open"
  | "after_manifest_staging_open"
  | "before_manifest_rename"
  | "after_manifest_rename"
  | "before_manifest_staging_cleanup";

export type EvaluatorEvidenceBoundaryHook = (
  phase: EvaluatorEvidenceBoundaryPhase,
  targetPath: string,
) => Promise<void>;

type DirectoryBoundary = {
  directory_path: string;
  assertStable: (phase: string) => Promise<void>;
};

function identity(stats: BigIntStats): Identity {
  return { dev: stats.dev, ino: stats.ino };
}

function snapshot(stats: BigIntStats): FileSnapshot {
  return {
    ...identity(stats),
    size: stats.size,
    mtime_ns: stats.mtimeNs,
    ctime_ns: stats.ctimeNs,
  };
}

function sameIdentity(left: Identity, right: Identity): boolean {
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

function isInside(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return (
    relative.length > 0 &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function boundaryError(message: string): CliError {
  return new CliError({ code: "E_VALIDATION", message });
}

export function assertEvaluatorEvidencePathWithinRepository(
  gitRoot: string,
  targetPath: string,
  label: string,
): void {
  const resolvedRoot = path.resolve(gitRoot);
  const resolvedTarget = path.resolve(targetPath);
  if (resolvedTarget !== resolvedRoot && !isInside(resolvedRoot, resolvedTarget)) {
    throw boundaryError(`${label} is outside the repository root: ${targetPath}`);
  }
}

async function inspectDirectoryChain(opts: {
  gitRoot: string;
  directoryPath: string;
  label: string;
  create: boolean;
}): Promise<{ stats: BigIntStats; physical_path: string }> {
  assertEvaluatorEvidencePathWithinRepository(opts.gitRoot, opts.directoryPath, opts.label);
  const resolvedRoot = path.resolve(opts.gitRoot);
  const resolvedDirectory = path.resolve(opts.directoryPath);
  const physicalRoot = await realpath(resolvedRoot);
  let current = resolvedRoot;
  let finalStats: BigIntStats | null = null;
  let finalPhysicalPath = physicalRoot;
  for (const segment of path.relative(resolvedRoot, resolvedDirectory).split(path.sep)) {
    if (!segment || segment === "." || segment === "..") {
      throw boundaryError(`${opts.label} contains an unsafe path segment: ${opts.directoryPath}`);
    }
    current = path.join(current, segment);
    let stats: BigIntStats;
    try {
      stats = await lstat(current, { bigint: true });
    } catch (error) {
      if (!opts.create || (error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
      try {
        await mkdir(current, { recursive: false, mode: 0o700 });
      } catch (mkdirError) {
        if ((mkdirError as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw mkdirError;
      }
      stats = await lstat(current, { bigint: true });
    }
    if (!stats.isDirectory() || stats.isSymbolicLink()) {
      throw boundaryError(`${opts.label} traverses a symbolic link or non-directory: ${current}`);
    }
    const physicalPath = await realpath(current);
    if (physicalPath !== physicalRoot && !isInside(physicalRoot, physicalPath)) {
      throw boundaryError(`${opts.label} resolves outside the repository root: ${current}`);
    }
    finalStats = stats;
    finalPhysicalPath = physicalPath;
  }
  if (!finalStats) {
    throw boundaryError(`${opts.label} must be below the repository root: ${opts.directoryPath}`);
  }
  return { stats: finalStats, physical_path: finalPhysicalPath };
}

async function captureDirectoryBoundary(opts: {
  gitRoot: string;
  directoryPath: string;
  label: string;
  create: boolean;
}): Promise<DirectoryBoundary> {
  // Portable Node has no openat/linkat/renameat. Match the runner trust-boundary model by
  // rejecting symlink ancestors and checking directory/file identity around every operation.
  const initial = await inspectDirectoryChain(opts);
  const initialIdentity = identity(initial.stats);
  return {
    directory_path: path.resolve(opts.directoryPath),
    async assertStable(phase: string): Promise<void> {
      let current;
      try {
        current = await inspectDirectoryChain({ ...opts, create: false });
      } catch (error) {
        throw boundaryError(
          `${opts.label} became unsafe ${phase}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
      if (
        !sameIdentity(initialIdentity, identity(current.stats)) ||
        current.physical_path !== initial.physical_path
      ) {
        throw boundaryError(`${opts.label} identity changed ${phase}: ${opts.directoryPath}`);
      }
    },
  };
}

async function checkpoint(opts: {
  phase: EvaluatorEvidenceBoundaryPhase;
  targetPath: string;
  hook?: EvaluatorEvidenceBoundaryHook;
  boundaries: readonly DirectoryBoundary[];
}): Promise<void> {
  await opts.hook?.(opts.phase, opts.targetPath);
  for (const boundary of opts.boundaries) {
    await boundary.assertStable(opts.phase.replaceAll("_", " "));
  }
}

function assertRegular(stats: BigIntStats, filePath: string, label: string): void {
  if (!stats.isFile() || stats.isSymbolicLink()) {
    throw boundaryError(`${label} is not a regular file: ${filePath}`);
  }
}

async function openNewStableFile(opts: {
  boundary: DirectoryBoundary;
  filePath: string;
  label: string;
  contents: string;
  hook?: EvaluatorEvidenceBoundaryHook;
  beforeOpen: EvaluatorEvidenceBoundaryPhase;
  afterOpen: EvaluatorEvidenceBoundaryPhase;
}): Promise<Identity> {
  await checkpoint({
    phase: opts.beforeOpen,
    targetPath: opts.filePath,
    hook: opts.hook,
    boundaries: [opts.boundary],
  });
  const handle = await open(
    opts.filePath,
    constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | NO_FOLLOW | NON_BLOCKING,
    0o600,
  );
  try {
    const before = await handle.stat({ bigint: true });
    assertRegular(before, opts.filePath, opts.label);
    await checkpoint({
      phase: opts.afterOpen,
      targetPath: opts.filePath,
      hook: opts.hook,
      boundaries: [opts.boundary],
    });
    await handle.writeFile(opts.contents, { encoding: "utf8" });
    await handle.sync();
    const after = await handle.stat({ bigint: true });
    assertRegular(after, opts.filePath, opts.label);
    if (!sameIdentity(identity(before), identity(after))) {
      throw boundaryError(`${opts.label} changed while it was written: ${opts.filePath}`);
    }
    await opts.boundary.assertStable(`after writing ${opts.label}`);
    const pathAfter = await lstat(opts.filePath, { bigint: true });
    assertRegular(pathAfter, opts.filePath, opts.label);
    if (!sameIdentity(identity(after), identity(pathAfter))) {
      throw boundaryError(`${opts.label} path changed while it was written: ${opts.filePath}`);
    }
    return identity(after);
  } finally {
    await handle.close();
  }
}

async function removeStableFile(opts: {
  boundary: DirectoryBoundary;
  filePath: string;
  expectedIdentity: Identity;
  hook?: EvaluatorEvidenceBoundaryHook;
  phase: EvaluatorEvidenceBoundaryPhase;
}): Promise<void> {
  await checkpoint({
    phase: opts.phase,
    targetPath: opts.filePath,
    hook: opts.hook,
    boundaries: [opts.boundary],
  });
  let current: BigIntStats;
  try {
    current = await lstat(opts.filePath, { bigint: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return;
    throw error;
  }
  assertRegular(current, opts.filePath, "Evaluator staging file");
  if (!sameIdentity(opts.expectedIdentity, identity(current))) {
    throw boundaryError(`Evaluator staging file identity changed before cleanup: ${opts.filePath}`);
  }
  await unlink(opts.filePath);
  await opts.boundary.assertStable("after staging cleanup");
}

export async function readStableEvaluatorEvidenceFile(opts: {
  gitRoot: string;
  filePath: string;
  label: string;
  hook?: EvaluatorEvidenceBoundaryHook;
}): Promise<Buffer> {
  const boundary = await captureDirectoryBoundary({
    gitRoot: opts.gitRoot,
    directoryPath: path.dirname(opts.filePath),
    label: `${opts.label} parent`,
    create: false,
  });
  const pathBefore = await lstat(opts.filePath, { bigint: true });
  assertRegular(pathBefore, opts.filePath, opts.label);
  const expected = snapshot(pathBefore);
  await checkpoint({
    phase: "before_artifact_open",
    targetPath: opts.filePath,
    hook: opts.hook,
    boundaries: [boundary],
  });
  const handle = await open(opts.filePath, constants.O_RDONLY | NO_FOLLOW | NON_BLOCKING);
  try {
    const before = await handle.stat({ bigint: true });
    assertRegular(before, opts.filePath, opts.label);
    if (!sameSnapshot(expected, snapshot(before))) {
      throw boundaryError(`${opts.label} changed before it could be read: ${opts.filePath}`);
    }
    await checkpoint({
      phase: "after_artifact_open",
      targetPath: opts.filePath,
      hook: opts.hook,
      boundaries: [boundary],
    });
    const contents = await handle.readFile();
    const after = await handle.stat({ bigint: true });
    if (!sameSnapshot(snapshot(before), snapshot(after))) {
      throw boundaryError(`${opts.label} changed while it was read: ${opts.filePath}`);
    }
    await boundary.assertStable(`after reading ${opts.label}`);
    const pathAfter = await lstat(opts.filePath, { bigint: true });
    if (!sameSnapshot(snapshot(after), snapshot(pathAfter))) {
      throw boundaryError(`${opts.label} path changed while it was read: ${opts.filePath}`);
    }
    return contents;
  } finally {
    await handle.close();
  }
}

export async function publishEvaluatorEvidenceObject(opts: {
  gitRoot: string;
  objectDirectoryPath: string;
  stagingDirectoryPath: string;
  objectPath: string;
  stagingPath: string;
  contents: string;
  hook?: EvaluatorEvidenceBoundaryHook;
}): Promise<void> {
  const objectBoundary = await captureDirectoryBoundary({
    gitRoot: opts.gitRoot,
    directoryPath: opts.objectDirectoryPath,
    label: "Evaluator object directory",
    create: true,
  });
  const stagingBoundary = await captureDirectoryBoundary({
    gitRoot: opts.gitRoot,
    directoryPath: opts.stagingDirectoryPath,
    label: "Evaluator staging directory",
    create: true,
  });
  const stagingIdentity = await openNewStableFile({
    boundary: stagingBoundary,
    filePath: opts.stagingPath,
    label: "Evaluator staging file",
    contents: opts.contents,
    hook: opts.hook,
    beforeOpen: "before_object_staging_open",
    afterOpen: "after_object_staging_open",
  });
  try {
    await checkpoint({
      phase: "before_object_link",
      targetPath: opts.objectPath,
      hook: opts.hook,
      boundaries: [stagingBoundary, objectBoundary],
    });
    try {
      await link(opts.stagingPath, opts.objectPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
    }
    await checkpoint({
      phase: "after_object_link",
      targetPath: opts.objectPath,
      hook: opts.hook,
      boundaries: [stagingBoundary, objectBoundary],
    });
  } finally {
    await removeStableFile({
      boundary: stagingBoundary,
      filePath: opts.stagingPath,
      expectedIdentity: stagingIdentity,
      hook: opts.hook,
      phase: "before_object_staging_cleanup",
    });
  }
}

export async function writeEvaluatorEvidenceFileAtomically(opts: {
  gitRoot: string;
  filePath: string;
  label: string;
  contents: string;
  hook?: EvaluatorEvidenceBoundaryHook;
}): Promise<void> {
  const boundary = await captureDirectoryBoundary({
    gitRoot: opts.gitRoot,
    directoryPath: path.dirname(opts.filePath),
    label: `${opts.label} directory`,
    create: true,
  });
  const temporaryPath = path.join(
    boundary.directory_path,
    `.${path.basename(opts.filePath)}.${String(process.pid)}.${randomUUID()}.tmp`,
  );
  const temporaryIdentity = await openNewStableFile({
    boundary,
    filePath: temporaryPath,
    label: `${opts.label} staging file`,
    contents: opts.contents,
    hook: opts.hook,
    beforeOpen: "before_manifest_staging_open",
    afterOpen: "after_manifest_staging_open",
  });
  let published = false;
  try {
    await checkpoint({
      phase: "before_manifest_rename",
      targetPath: opts.filePath,
      hook: opts.hook,
      boundaries: [boundary],
    });
    await rename(temporaryPath, opts.filePath);
    published = true;
    await checkpoint({
      phase: "after_manifest_rename",
      targetPath: opts.filePath,
      hook: opts.hook,
      boundaries: [boundary],
    });
  } finally {
    if (!published) {
      await removeStableFile({
        boundary,
        filePath: temporaryPath,
        expectedIdentity: temporaryIdentity,
        hook: opts.hook,
        phase: "before_manifest_staging_cleanup",
      });
    }
  }
  const stored = await readStableEvaluatorEvidenceFile({
    gitRoot: opts.gitRoot,
    filePath: opts.filePath,
    label: opts.label,
    hook: opts.hook,
  });
  if (!stored.equals(Buffer.from(opts.contents, "utf8"))) {
    throw boundaryError(`${opts.label} changed while it was written: ${opts.filePath}`);
  }
}
