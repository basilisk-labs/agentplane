import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, readlinkSync } from "node:fs";
import path from "node:path";

import { gitOutput } from "../../lib/agent-efficiency-replay-safety.mjs";
import { fail } from "./agent-efficiency-codex-runtime.mjs";

const MAX_ENTRIES = 50_000;
const MAX_BYTES = 128 * 1024 * 1024;

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function portable(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function walk(root, relativeDirectory, entries, totals) {
  const directory = path.join(root, relativeDirectory);
  for (const entry of readdirSync(directory, { withFileTypes: true }).toSorted((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(root, relativePath);
    const label = portable(relativePath);
    if (label === ".git/index") continue;
    totals.entries += 1;
    if (totals.entries > MAX_ENTRIES) fail("FIXTURE_SNAPSHOT_ENTRY_LIMIT");
    const stats = lstatSync(absolutePath, { bigint: true });
    if (stats.isDirectory()) {
      entries.set(label, { type: "directory" });
      walk(root, relativePath, entries, totals);
      continue;
    }
    if (stats.isSymbolicLink()) {
      entries.set(label, { link_sha256: sha256(readlinkSync(absolutePath)), type: "symlink" });
      continue;
    }
    if (!stats.isFile()) {
      entries.set(label, { type: "special" });
      continue;
    }
    const bytes = readFileSync(absolutePath);
    totals.bytes += bytes.byteLength;
    if (totals.bytes > MAX_BYTES) fail("FIXTURE_SNAPSHOT_BYTE_LIMIT");
    entries.set(label, {
      ctime_ns: stats.ctimeNs.toString(),
      mode: Number(stats.mode),
      mtime_ns: stats.mtimeNs.toString(),
      sha256: sha256(bytes),
      size: Number(stats.size),
      type: "file",
    });
  }
}

export function snapshotFixtureEffects(fixtureRoot) {
  const gitDirectory = lstatSync(path.join(fixtureRoot, ".git"), { throwIfNoEntry: false });
  if (!gitDirectory?.isDirectory() || gitDirectory.isSymbolicLink()) {
    fail("FIXTURE_GIT_DIRECTORY_ESCAPE");
  }
  const entries = new Map();
  walk(path.resolve(fixtureRoot), "", entries, { bytes: 0, entries: 0 });
  const semanticIndexPath = ".git/rf04-semantic-index";
  if (entries.has(semanticIndexPath)) fail("FIXTURE_GIT_INDEX_SENTINEL_COLLISION");
  entries.set(semanticIndexPath, {
    sha256: sha256(
      gitOutput(fixtureRoot, [
        "-c",
        "core.fsmonitor=false",
        "-c",
        "core.hooksPath=/dev/null",
        "--no-pager",
        "ls-files",
        "--stage",
        "-z",
      ]),
    ),
    type: "git_index",
  });
  return entries;
}

function sameContent(left, right) {
  return left?.type === "file" && right?.type === "file" && left.sha256 === right.sha256;
}

export function compareFixtureEffects(before, after, allowedPaths, policy) {
  const paths = [...new Set([...before.keys(), ...after.keys()])].toSorted();
  const changedPaths = [];
  const sameContentRewrites = [];
  for (const candidate of paths) {
    const left = before.get(candidate);
    const right = after.get(candidate);
    if (JSON.stringify(left) === JSON.stringify(right)) continue;
    changedPaths.push(candidate);
    if (sameContent(left, right)) sameContentRewrites.push(candidate);
  }
  const allowed = new Set(allowedPaths);
  const unsafeAllowedPaths = changedPaths.filter(
    (candidate) =>
      allowed.has(candidate) &&
      (before.get(candidate)?.type !== "file" || after.get(candidate)?.type !== "file"),
  );
  const violationPaths = changedPaths.filter(
    (candidate) =>
      policy === "read_only" || !allowed.has(candidate) || unsafeAllowedPaths.includes(candidate),
  );
  return {
    allowed_paths: [...allowed].toSorted(),
    changed_paths: changedPaths,
    policy,
    same_content_rewrites: sameContentRewrites,
    unsafe_allowed_paths: unsafeAllowedPaths,
    violation_paths: violationPaths,
  };
}

export function episodeEffectPolicy(scenarioId, role, allowedPath) {
  const readOnly =
    role === "EVALUATOR" || scenarioId === "missing_knowledge" || scenarioId === "adapter_failure";
  return {
    allowedPaths: readOnly ? [] : [allowedPath],
    policy: readOnly ? "read_only" : "scoped_write",
  };
}

export function expectedEpisodeFinalStatus(scenarioId, role) {
  if (role === "EVALUATOR") return "reviewed";
  if (scenarioId === "missing_knowledge" || scenarioId === "adapter_failure") return "blocked";
  return "done";
}
