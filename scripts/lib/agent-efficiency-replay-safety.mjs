import { execFileSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import { stableJson } from "./agent-efficiency-baseline.mjs";

export const TRUSTED_REPLAY_DRIVER_PATH =
  "/Applications/ChatGPT.app/Contents/Resources:/opt/homebrew/bin:/usr/bin:/bin";

export const REPLAY_CONTRACT_ENV_KEYS = Object.freeze([
  "AGENTPLANE_RF04_REPLAY_ANCHOR",
  "AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_EXECUTABLE_SHA256",
  "AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_PLATFORM",
  "AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_RECEIPT_SHA256",
  "AGENTPLANE_RF04_REPLAY_DEPENDENCY_PORTABLE_SHA256",
  "AGENTPLANE_RF04_REPLAY_DRIVER_CONTRACT_VERSION",
  "AGENTPLANE_RF04_REPLAY_DRIVER_PATH",
  "AGENTPLANE_RF04_REPLAY_DRIVER_SHA256",
  "AGENTPLANE_RF04_REPLAY_EVIDENCE_OUTPUT",
  "AGENTPLANE_RF04_REPLAY_EVIDENCE_PATH",
  "AGENTPLANE_RF04_REPLAY_EXPECTED_ROLES",
  "AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_ORIGIN",
  "AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_PATH",
  "AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_SHA256",
  "AGENTPLANE_RF04_REPLAY_HARNESS_SHA256",
  "AGENTPLANE_RF04_REPLAY_OUTPUT",
  "AGENTPLANE_RF04_REPLAY_RUN_ID",
]);

export function buildReplayGitEnvironment(source = process.env) {
  return {
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_OPTIONAL_LOCKS: "0",
    GIT_PAGER: "cat",
    GIT_TERMINAL_PROMPT: "0",
    LANG: source.LANG || "C.UTF-8",
    LC_ALL: source.LC_ALL || "C.UTF-8",
    PATH: "/usr/bin:/bin",
    TZ: "UTC",
  };
}

export function gitOutput(cwd, args, source = process.env) {
  return execFileSync("/usr/bin/git", args, {
    cwd,
    encoding: "utf8",
    env: buildReplayGitEnvironment(source),
    stdio: ["ignore", "pipe", "pipe"],
  });
}

export function assertGitCommitAvailable(repoRoot, anchor, source = process.env) {
  let type;
  try {
    type = gitOutput(repoRoot, ["cat-file", "-t", anchor], source).trim();
  } catch {
    throw new Error(`replay anchor is not available in Git: ${anchor}`);
  }
  if (type !== "commit") {
    throw new Error(`replay anchor must be a commit, got ${type}: ${anchor}`);
  }
}

function isInside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== "..");
}

export function assertRepoPathNoSymlinkEscape(repoRoot, candidate, label, options = {}) {
  const root = path.resolve(realpathSync(repoRoot));
  const resolved = path.resolve(candidate);
  if (!isInside(root, resolved) || resolved === root) {
    throw new Error(`${label} must remain inside the repository`);
  }
  const relative = path.relative(root, resolved);
  let current = root;
  for (const segment of relative.split(path.sep)) {
    current = path.join(current, segment);
    const stats = lstatSync(current, { throwIfNoEntry: false });
    if (!stats) break;
    if (stats.isSymbolicLink()) {
      throw new Error(`${label} must not traverse a symbolic link`);
    }
    const real = path.resolve(realpathSync(current));
    if (!isInside(root, real)) {
      throw new Error(`${label} resolves outside the repository`);
    }
  }
  const finalStats = lstatSync(resolved, { throwIfNoEntry: false });
  if (finalStats && options.kind === "directory" && !finalStats.isDirectory()) {
    throw new Error(`${label} must be a directory`);
  }
  if (finalStats && options.kind === "file" && !finalStats.isFile()) {
    throw new Error(`${label} must be a regular file`);
  }
  return resolved;
}

function overlaps(left, right) {
  const leftRelative = path.relative(left, right);
  const rightRelative = path.relative(right, left);
  return (
    left === right ||
    (leftRelative !== "" && !leftRelative.startsWith(`..${path.sep}`) && leftRelative !== "..") ||
    (rightRelative !== "" && !rightRelative.startsWith(`..${path.sep}`) && rightRelative !== "..")
  );
}

export function assertReplayCaptureTargets({
  driverPath,
  evidenceDirectory,
  harnessPaths = [],
  outputPath,
  registryPath,
  repoRoot,
  sourceDirectory,
  testTargetRoot = null,
}) {
  const canonical = {
    evidenceDirectory: path.join(repoRoot, "scripts/bench/agent-efficiency-replay-evidence"),
    outputPath: path.join(repoRoot, "scripts/baselines/agent-efficiency-pre-v0.7-replay.json"),
    registryPath: path.join(repoRoot, "scripts/bench/agent-efficiency-fixtures.json"),
    sourceDirectory: path.join(repoRoot, "scripts/bench/agent-efficiency-replay-envelopes"),
  };
  const targets = { evidenceDirectory, outputPath, registryPath, sourceDirectory };
  for (const [name, value] of Object.entries(targets)) {
    const resolved = path.resolve(value);
    const canonicalPath = path.resolve(canonical[name]);
    const allowedTestPath =
      testTargetRoot !== null &&
      isInside(path.resolve(testTargetRoot), resolved) &&
      resolved !== path.resolve(testTargetRoot);
    if (resolved !== canonicalPath && !allowedTestPath) {
      throw new Error(`${name} is not an authorized RF-04 capture target`);
    }
  }
  assertRepoPathNoSymlinkEscape(repoRoot, registryPath, "RF-04 fixture registry", { kind: "file" });
  assertRepoPathNoSymlinkEscape(repoRoot, sourceDirectory, "replay source directory", {
    kind: "directory",
  });
  assertRepoPathNoSymlinkEscape(repoRoot, evidenceDirectory, "replay evidence directory", {
    kind: "directory",
  });
  assertRepoPathNoSymlinkEscape(repoRoot, outputPath, "replay baseline output", { kind: "file" });

  const mutable = [sourceDirectory, evidenceDirectory, outputPath].map((value) =>
    path.resolve(value),
  );
  const protectedPaths = [registryPath, driverPath, ...harnessPaths]
    .filter(Boolean)
    .map((value) => path.resolve(value));
  for (let index = 0; index < mutable.length; index += 1) {
    for (let other = index + 1; other < mutable.length; other += 1) {
      if (overlaps(mutable[index], mutable[other])) {
        throw new Error("replay capture targets must be pairwise disjoint");
      }
    }
    for (const protectedPath of protectedPaths) {
      if (overlaps(mutable[index], protectedPath)) {
        throw new Error("replay capture target overlaps a protected input or harness file");
      }
    }
  }
  return targets;
}

function removePath(target) {
  const stats = lstatSync(target, { throwIfNoEntry: false });
  if (!stats) return;
  if (stats.isDirectory() && !stats.isSymbolicLink())
    rmSync(target, { force: true, recursive: true });
  else unlinkSync(target);
}

function writeTransactionMarker(markerPath, marker, initial) {
  if (initial) {
    writeFileSync(markerPath, `${stableJson(marker, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    return;
  }
  const temporaryPath = `${markerPath}.tmp-${process.pid}`;
  try {
    writeFileSync(temporaryPath, `${stableJson(marker, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    renameSync(temporaryPath, markerPath);
  } finally {
    if (existsSync(temporaryPath)) unlinkSync(temporaryPath);
  }
}

export function installReplayArtifactTransaction(pairs, captureRoot, options = {}) {
  if (!Array.isArray(pairs) || pairs.length !== 3) {
    throw new Error("RF-04 capture transaction must contain envelopes, evidence, and baseline");
  }
  const rename = options.rename ?? renameSync;
  const markerPath = options.markerPath;
  if (markerPath && lstatSync(markerPath, { throwIfNoEntry: false })) {
    throw new Error("an unfinished RF-04 capture transaction requires manual recovery");
  }
  const artifacts = pairs.map((pair, index) => ({
    backup: path.join(captureRoot, `previous-${index}`),
    kind: ["envelopes", "evidence", "baseline"][index],
    staging: pair.staging,
    target: pair.target,
  }));
  const marker = {
    artifacts,
    backup_count: 0,
    capture_root: captureRoot,
    crash_semantics: "fail_closed_manual_recovery_required_v1",
    installed_count: 0,
    phase: "prepared",
    schema_version: 1,
  };
  if (markerPath) {
    mkdirSync(path.dirname(markerPath), { recursive: true });
    writeTransactionMarker(markerPath, marker, true);
  }
  const backups = [];
  const installed = [];
  try {
    for (const [index, pair] of pairs.entries()) {
      if (!existsSync(pair.staging)) throw new Error(`missing staged RF-04 artifact ${index}`);
      mkdirSync(path.dirname(pair.target), { recursive: true });
      if (existsSync(pair.target)) {
        const backup = artifacts[index].backup;
        rename(pair.target, backup);
        backups.push({ backup, target: pair.target });
        marker.backup_count = backups.length;
        marker.phase = "backing_up";
        if (markerPath) writeTransactionMarker(markerPath, marker, false);
      }
    }
    marker.phase = "installing";
    if (markerPath) writeTransactionMarker(markerPath, marker, false);
    for (const pair of pairs) {
      rename(pair.staging, pair.target);
      installed.push(pair.target);
      marker.installed_count = installed.length;
      if (markerPath) writeTransactionMarker(markerPath, marker, false);
    }
    marker.phase = "validating";
    if (markerPath) writeTransactionMarker(markerPath, marker, false);
    options.validateInstalled?.();
    if (markerPath) unlinkSync(markerPath);
  } catch (error) {
    let rollbackFailure = null;
    for (const target of installed.toReversed()) {
      try {
        removePath(target);
      } catch (rollbackError) {
        rollbackFailure ??= rollbackError;
      }
    }
    for (const { backup, target } of backups.toReversed()) {
      try {
        if (existsSync(backup)) renameSync(backup, target);
      } catch (rollbackError) {
        rollbackFailure ??= rollbackError;
      }
    }
    if (rollbackFailure) {
      throw new Error(`RF-04 rollback is incomplete; recover from ${captureRoot}`, {
        cause: error,
      });
    }
    if (markerPath && existsSync(markerPath)) unlinkSync(markerPath);
    throw error;
  }
}

export function assertCanonicalJsonFile(filePath, canonicalizer, label) {
  const bytes = readFileSync(filePath, "utf8");
  const value = JSON.parse(bytes);
  if (bytes !== canonicalizer(value)) throw new Error(`${label} must be canonical JSON`);
  return value;
}
