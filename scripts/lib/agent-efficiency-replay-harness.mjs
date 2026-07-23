import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";

import { stableJson } from "./agent-efficiency-baseline.mjs";

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
export const REPLAY_HARNESS_ROOTS = Object.freeze([
  "scripts/bench/capture-agent-efficiency-replay.mjs",
  "scripts/bench/run-agent-efficiency-codex-replay.mjs",
  "scripts/checks/check-agent-efficiency-replay.mjs",
]);

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function assertRelativePath(value, label) {
  if (typeof value !== "string" || value.length === 0) throw new Error(`${label} is required`);
  const portable = value.replaceAll("\\", "/");
  const normalized = path.posix.normalize(portable);
  if (
    normalized !== portable ||
    path.posix.isAbsolute(normalized) ||
    normalized === "." ||
    normalized.startsWith("../")
  ) {
    throw new Error(`${label} must remain inside the repository`);
  }
  return normalized;
}

function moduleSpecifiers(source) {
  const result = [];
  const patterns = [
    /(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/gu,
    /import\s*\(\s*["']([^"']+)["']\s*\)/gu,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) result.push(match[1]);
  }
  return result;
}

function resolveLocalModule(repoRoot, importer, specifier) {
  if (!specifier.startsWith(".")) return null;
  const base = path.resolve(repoRoot, path.dirname(importer), specifier);
  const candidates = path.extname(base)
    ? [base]
    : [`${base}.mjs`, `${base}.js`, path.join(base, "index.mjs")];
  const candidate = candidates.find((item) => lstatSync(item, { throwIfNoEntry: false })?.isFile());
  if (!candidate) throw new Error(`unresolved replay harness import ${specifier} from ${importer}`);
  const root = path.resolve(realpathSync(repoRoot));
  const stats = lstatSync(candidate);
  const real = path.resolve(realpathSync(candidate));
  if (stats.isSymbolicLink() || !real.startsWith(`${root}${path.sep}`)) {
    throw new Error(`replay harness import escapes through a symlink: ${specifier}`);
  }
  return assertRelativePath(
    path.relative(root, real).split(path.sep).join("/"),
    "harness file path",
  );
}

export function collectReplayHarnessFiles(repoRoot, driverPath) {
  const pending = [...new Set([...REPLAY_HARNESS_ROOTS, driverPath])];
  const visited = new Set();
  while (pending.length > 0) {
    const relativePath = assertRelativePath(pending.pop(), "harness file path");
    if (visited.has(relativePath)) continue;
    const absolutePath = path.join(repoRoot, relativePath);
    const stats = lstatSync(absolutePath, { throwIfNoEntry: false });
    if (!stats?.isFile() || stats.isSymbolicLink()) {
      throw new Error(`replay harness file must be a regular non-symlink file: ${relativePath}`);
    }
    const source = readFileSync(absolutePath, "utf8");
    visited.add(relativePath);
    for (const specifier of moduleSpecifiers(source)) {
      const resolved = resolveLocalModule(repoRoot, relativePath, specifier);
      if (resolved && !visited.has(resolved)) pending.push(resolved);
    }
  }
  return [...visited].toSorted();
}

export function createReplayHarnessManifest(repoRoot, driverIdentity, options = {}) {
  if (
    driverIdentity?.contract_version !== 1 ||
    !SHA256_PATTERN.test(driverIdentity?.sha256 ?? "")
  ) {
    throw new Error("invalid replay driver identity for harness manifest");
  }
  const dependencyClaim = options.dependencyClaim;
  const capturePlatformKeys = Object.keys(dependencyClaim?.capture_platform ?? {}).toSorted();
  if (
    stableJson(Object.keys(dependencyClaim ?? {}).toSorted()) !==
      stableJson([
        "capture_executable_sha256",
        "capture_platform",
        "capture_receipt_sha256",
        "portable_sha256",
      ]) ||
    !SHA256_PATTERN.test(dependencyClaim.capture_executable_sha256) ||
    !SHA256_PATTERN.test(dependencyClaim.capture_receipt_sha256) ||
    !SHA256_PATTERN.test(dependencyClaim.portable_sha256) ||
    stableJson(capturePlatformKeys) !== stableJson(["arch", "libc", "node_abi", "platform"])
  ) {
    throw new Error("replay harness requires the complete dependency capture claim");
  }
  const receipt = {
    capture_platform: dependencyClaim.capture_platform,
    executable_sha256: dependencyClaim.capture_executable_sha256,
    portable_sha256: dependencyClaim.portable_sha256,
    schema_version: 1,
  };
  if (sha256(canonicalBytes(receipt)) !== dependencyClaim.capture_receipt_sha256) {
    throw new Error("replay harness dependency receipt does not link its platform and digests");
  }
  const files = collectReplayHarnessFiles(repoRoot, driverIdentity.path).map((relativePath) => ({
    path: relativePath,
    sha256: sha256(readFileSync(path.join(repoRoot, relativePath))),
  }));
  const payload = {
    dependency_claim: dependencyClaim,
    driver_contract_version: 1,
    files,
  };
  return { ...payload, sha256: sha256(canonicalBytes(payload)) };
}
