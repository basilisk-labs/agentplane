import { randomUUID } from "node:crypto";
import {
  closeSync,
  constants,
  fstatSync,
  lstatSync,
  openSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

export const DEFAULT_COMPATIBILITY_CANDIDATE_PATH =
  "scripts/baselines/v0.7-compatibility-candidate.json";

export function resolveCompatibilityCandidatePath(repoRoot, relativePath) {
  const selected = relativePath ?? DEFAULT_COMPATIBILITY_CANDIDATE_PATH;
  if (
    typeof selected !== "string" ||
    !/^scripts\/baselines\/[A-Za-z0-9][A-Za-z0-9._-]*-compatibility-candidate\.json$/u.test(
      selected,
    )
  ) {
    throw new Error("Compatibility candidate path must name one candidate in scripts/baselines");
  }
  const scriptsDir = path.join(repoRoot, "scripts");
  const baselinesDir = path.join(scriptsDir, "baselines");
  const candidatePath = path.join(repoRoot, selected);
  for (const directory of [scriptsDir, baselinesDir]) {
    const stat = lstatSync(directory);
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw new Error("Compatibility candidate directory must be a regular repository directory");
    }
  }
  const stat = lstatSync(candidatePath);
  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new Error("Compatibility candidate must be a regular repository file");
  }
  return candidatePath;
}

function sameFile(left, right) {
  return left.dev === right.dev && left.ino === right.ino;
}

function sameSnapshot(left, right) {
  return (
    sameFile(left, right) &&
    left.size === right.size &&
    left.mtimeNs === right.mtimeNs &&
    left.ctimeNs === right.ctimeNs
  );
}

export function readCompatibilityCandidate(candidatePath, options = {}) {
  const before = lstatSync(candidatePath, { bigint: true });
  if (before.isSymbolicLink() || !before.isFile()) {
    throw new Error("Compatibility candidate must be a regular repository file");
  }
  options.beforeOpen?.();
  const descriptor = openSync(
    candidatePath,
    constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0),
  );
  try {
    const opened = fstatSync(descriptor, { bigint: true });
    if (!opened.isFile() || !sameSnapshot(before, opened)) {
      throw new Error("Compatibility candidate changed before read");
    }
    const content = readFileSync(descriptor, "utf8");
    const after = fstatSync(descriptor, { bigint: true });
    const pathAfter = lstatSync(candidatePath, { bigint: true });
    if (
      !after.isFile() ||
      !pathAfter.isFile() ||
      !sameSnapshot(opened, after) ||
      !sameSnapshot(after, pathAfter)
    ) {
      throw new Error("Compatibility candidate changed while being read");
    }
    return content;
  } finally {
    closeSync(descriptor);
  }
}

export function writeCompatibilityCandidateAtomic(candidatePath, content, options = {}) {
  const temporaryPath = `${candidatePath}.${randomUUID()}.tmp`;
  let temporaryExists = false;
  try {
    const original = lstatSync(candidatePath, { bigint: true });
    if (original.isSymbolicLink() || !original.isFile()) {
      throw new Error("Compatibility candidate must be a regular repository file");
    }
    const descriptor = openSync(
      temporaryPath,
      constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0),
      Number(original.mode & 0o777n),
    );
    temporaryExists = true;
    try {
      writeFileSync(descriptor, content, "utf8");
    } finally {
      closeSync(descriptor);
    }
    options.beforeReplace?.();
    const current = lstatSync(candidatePath, { bigint: true });
    if (current.isSymbolicLink() || !current.isFile() || !sameFile(original, current)) {
      throw new Error("Compatibility candidate changed before write");
    }
    renameSync(temporaryPath, candidatePath);
    temporaryExists = false;
  } finally {
    if (temporaryExists) unlinkSync(temporaryPath);
  }
}
