import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";

import { stableJson } from "../../lib/agent-efficiency-baseline.mjs";

const MAX_DEPENDENCY_FILES = 100_000;
const MAX_DEPENDENCY_BYTES = 1024 * 1024 * 1024;
const PORTABLE_DEPENDENCY_FILES = Object.freeze([
  "bun.lock",
  "package.json",
  "packages/agentplane/package.json",
  "packages/core/package.json",
]);
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function portable(value) {
  return value.split(path.sep).join("/");
}

function isInside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== "..");
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

export function replayCapturePlatform(runtime = process) {
  let libc = "not_applicable";
  if (runtime.platform === "linux") {
    const report = runtime.report?.getReport?.();
    libc = report?.header?.glibcVersionRuntime ? "glibc" : "musl_or_unknown";
  }
  return {
    arch: runtime.arch,
    libc,
    node_abi: runtime.versions?.modules ?? "unknown",
    platform: runtime.platform,
  };
}

function assertCapturePlatform(value, label) {
  const keys = Object.keys(value ?? {}).toSorted();
  if (stableJson(keys) !== stableJson(["arch", "libc", "node_abi", "platform"])) {
    throw new Error(`${label} must contain arch, libc, node_abi, and platform`);
  }
  if (!/^[a-z0-9_+-]+$/i.test(value.arch) || !/^(?:[0-9]+|unknown)$/.test(value.node_abi)) {
    throw new Error(`${label} has an invalid architecture or Node ABI`);
  }
  if (!new Set(["darwin", "linux", "win32"]).has(value.platform)) {
    throw new Error(`${label}.platform is unsupported`);
  }
  if (!new Set(["glibc", "musl_or_unknown", "not_applicable"]).has(value.libc)) {
    throw new Error(`${label}.libc is unsupported`);
  }
  if (value.platform !== "linux" && value.libc !== "not_applicable") {
    throw new Error(`${label}.libc must be not_applicable outside Linux`);
  }
  return value;
}

function parseJsonc(input) {
  let withoutComments = "";
  let inString = false;
  let escaped = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (inString) {
      withoutComments += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      withoutComments += character;
      continue;
    }
    if (character === "/" && input[index + 1] === "/") {
      while (index + 1 < input.length && input[index + 1] !== "\n") index += 1;
      continue;
    }
    if (character === "/" && input[index + 1] === "*") {
      index += 1;
      while (index + 1 < input.length) {
        index += 1;
        if (input[index] === "\n") withoutComments += "\n";
        if (input[index] === "*" && input[index + 1] === "/") {
          index += 1;
          break;
        }
      }
      continue;
    }
    withoutComments += character;
  }
  let normalized = "";
  inString = false;
  escaped = false;
  for (let index = 0; index < withoutComments.length; index += 1) {
    const character = withoutComments[index];
    if (inString) {
      normalized += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    if (character === ",") {
      let cursor = index + 1;
      while (/\s/.test(withoutComments[cursor] ?? "")) cursor += 1;
      if (withoutComments[cursor] === "}" || withoutComments[cursor] === "]") continue;
    }
    normalized += character;
  }
  return JSON.parse(normalized);
}

export function createReplayPortableDependencyManifest(repoRoot) {
  const root = path.resolve(realpathSync(repoRoot));
  const inputs = PORTABLE_DEPENDENCY_FILES.map((relativePath) => {
    const absolutePath = path.join(root, relativePath);
    const stats = lstatSync(absolutePath, { throwIfNoEntry: false });
    if (!stats?.isFile() || stats.isSymbolicLink()) {
      throw new Error(`RF-04 portable dependency input must be a regular file: ${relativePath}`);
    }
    const real = path.resolve(realpathSync(absolutePath));
    if (!isInside(root, real)) {
      throw new Error(`RF-04 portable dependency input escapes the repository: ${relativePath}`);
    }
    let value;
    try {
      value = parseJsonc(readFileSync(real, "utf8"));
    } catch {
      throw new Error(`RF-04 portable dependency input must be JSON: ${relativePath}`);
    }
    return { path: relativePath, value };
  });
  const workspaceNames = new Set(
    inputs
      .filter((input) => input.path.endsWith("package.json"))
      .map((input) => input.value?.name)
      .filter((name) => typeof name === "string"),
  );
  for (const workspace of Object.values(
    inputs.find((input) => input.path === "bun.lock")?.value?.workspaces ?? {},
  )) {
    if (typeof workspace?.name === "string") workspaceNames.add(workspace.name);
  }
  const normalizeDependencies = (value) => {
    const normalized = structuredClone(value);
    delete normalized.version;
    for (const field of [
      "dependencies",
      "devDependencies",
      "optionalDependencies",
      "peerDependencies",
    ]) {
      for (const name of Object.keys(normalized[field] ?? {})) {
        if (workspaceNames.has(name)) normalized[field][name] = "workspace";
      }
    }
    return normalized;
  };
  const lock = structuredClone(inputs.find((input) => input.path === "bun.lock")?.value);
  for (const workspace of Object.values(lock?.workspaces ?? {})) {
    const normalized = normalizeDependencies(workspace);
    for (const key of Object.keys(workspace)) delete workspace[key];
    Object.assign(workspace, normalized);
  }
  const projections = inputs.map((input) => ({
    path: input.path,
    sha256: sha256(
      canonicalBytes(input.path === "bun.lock" ? lock : normalizeDependencies(input.value)),
    ),
  }));
  const payload = {
    contract: "normalized_bun_lock_graph_and_workspace_manifests_v1",
    projections,
    schema_version: 1,
  };
  return { ...payload, sha256: sha256(canonicalBytes(payload)) };
}

function packageSeeds(repoRoot, packageRelative) {
  const modulesRoot = path.join(repoRoot, packageRelative, "node_modules");
  const result = [];
  for (const entry of readdirSync(modulesRoot, { withFileTypes: true })) {
    if (entry.name === ".bin") continue;
    if (entry.name.startsWith("@") && entry.isDirectory()) {
      for (const child of readdirSync(path.join(modulesRoot, entry.name), {
        withFileTypes: true,
      })) {
        result.push({
          label: `${packageRelative}/node_modules/${entry.name}/${child.name}`,
          path: path.join(modulesRoot, entry.name, child.name),
        });
      }
      continue;
    }
    result.push({
      label: `${packageRelative}/node_modules/${entry.name}`,
      path: path.join(modulesRoot, entry.name),
    });
  }
  return result;
}

export function replayDependencySeeds(repoRoot) {
  const root = path.resolve(repoRoot);
  const candidates = [
    { label: "node_modules/tsup", path: path.join(root, "node_modules/tsup") },
    { label: "node_modules/typescript", path: path.join(root, "node_modules/typescript") },
    ...packageSeeds(root, "packages/agentplane"),
    ...packageSeeds(root, "packages/core"),
  ];
  const workspaceSeeds = new Set([
    "packages/agentplane/node_modules/@agentplaneorg/core",
    "packages/agentplane/node_modules/@agentplaneorg/recipes",
    "packages/agentplane/node_modules/@agentplane/testkit",
  ]);
  return candidates
    .filter((seed) => {
      if (workspaceSeeds.has(seed.label)) return false;
      const real = path.resolve(realpathSync(seed.path));
      return !real.startsWith(`${root}${path.sep}packages${path.sep}`);
    })
    .toSorted((left, right) => left.label.localeCompare(right.label));
}

function walkDependency(actualPath, logicalPath, entries, totals, ancestors) {
  const stats = lstatSync(actualPath, { throwIfNoEntry: false });
  if (!stats) throw new Error(`RF-04 dependency disappeared: ${logicalPath}`);
  if (stats.isSymbolicLink()) {
    const resolved = path.resolve(realpathSync(actualPath));
    const targetStats = lstatSync(resolved);
    entries.push({
      path: logicalPath,
      target_kind: targetStats.isDirectory() ? "directory" : "file",
      type: "symlink",
    });
    walkDependency(resolved, logicalPath, entries, totals, ancestors);
    return;
  }
  if (stats.isDirectory()) {
    const real = path.resolve(realpathSync(actualPath));
    if (ancestors.has(real)) throw new Error(`RF-04 dependency cycle: ${logicalPath}`);
    const nextAncestors = new Set(ancestors).add(real);
    entries.push({ path: logicalPath, type: "directory" });
    for (const entry of readdirSync(actualPath, { withFileTypes: true }).toSorted((a, b) =>
      a.name.localeCompare(b.name),
    )) {
      walkDependency(
        path.join(actualPath, entry.name),
        `${logicalPath}/${entry.name}`,
        entries,
        totals,
        nextAncestors,
      );
    }
    return;
  }
  if (!stats.isFile()) throw new Error(`unsupported RF-04 dependency entry: ${logicalPath}`);
  totals.files += 1;
  totals.bytes += stats.size;
  if (totals.files > MAX_DEPENDENCY_FILES || totals.bytes > MAX_DEPENDENCY_BYTES) {
    throw new Error("RF-04 dependency manifest exceeds its bounded capture budget");
  }
  entries.push({
    bytes: stats.size,
    path: logicalPath,
    sha256: sha256(readFileSync(actualPath)),
    type: "file",
  });
}

function packageLocator(actualPath, modulesRoot, fallback) {
  const real = path.resolve(realpathSync(actualPath));
  const marker = `${path.sep}node_modules${path.sep}.bun${path.sep}`;
  const markerIndex = real.lastIndexOf(marker);
  if (markerIndex !== -1) {
    return `node_modules/.bun/${portable(real.slice(markerIndex + marker.length))}`;
  }
  if (isInside(modulesRoot, real)) {
    return `node_modules/${portable(path.relative(modulesRoot, real))}`;
  }
  return fallback;
}

function packageDependencies(packageRoot) {
  const manifestPath = path.join(packageRoot, "package.json");
  const stats = lstatSync(manifestPath, { throwIfNoEntry: false });
  if (!stats?.isFile() || stats.isSymbolicLink()) return [];
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    throw new Error(`invalid RF-04 dependency package manifest: ${manifestPath}`);
  }
  const dependencies = new Map();
  for (const name of Object.keys(manifest.dependencies ?? {})) dependencies.set(name, "required");
  for (const name of Object.keys(manifest.optionalDependencies ?? {})) {
    if (!dependencies.has(name)) dependencies.set(name, "optional");
  }
  for (const name of Object.keys(manifest.peerDependencies ?? {})) {
    if (!dependencies.has(name)) dependencies.set(name, "peer");
  }
  return [...dependencies.entries()].toSorted(([left], [right]) => left.localeCompare(right));
}

function resolvePackageDependency(packageRoot, dependencyName, modulesRoot) {
  let current = path.resolve(packageRoot);
  while (isInside(modulesRoot, current)) {
    const candidate =
      path.basename(current) === "node_modules"
        ? path.join(current, dependencyName)
        : path.join(current, "node_modules", dependencyName);
    const stats = lstatSync(candidate, { throwIfNoEntry: false });
    if (stats) {
      const resolved = path.resolve(realpathSync(candidate));
      if (!isInside(modulesRoot, resolved)) {
        throw new Error(
          `RF-04 runtime dependency resolves outside node_modules: ${dependencyName}`,
        );
      }
      return resolved;
    }
    if (current === modulesRoot) break;
    current = path.dirname(current);
  }
  return null;
}

export function createReplayDependencyManifest(repoRoot) {
  const entries = [];
  const totals = { bytes: 0, files: 0 };
  const seeds = replayDependencySeeds(repoRoot);
  const modulesRoot = path.resolve(realpathSync(path.join(repoRoot, "node_modules")));
  const seedMappings = seeds.map((seed) => {
    const actualPath = path.resolve(realpathSync(seed.path));
    if (!isInside(modulesRoot, actualPath)) {
      throw new Error(`RF-04 dependency seed resolves outside node_modules: ${seed.label}`);
    }
    return {
      actualPath,
      label: seed.label,
      locator: packageLocator(actualPath, modulesRoot, seed.label),
    };
  });
  const queue = seedMappings.map(({ actualPath, locator }) => ({ actualPath, locator }));
  const visited = new Set();
  const resolutionEdges = [];
  for (let index = 0; index < queue.length; index += 1) {
    const { actualPath, locator } = queue[index];
    if (visited.has(actualPath)) continue;
    visited.add(actualPath);
    walkDependency(actualPath, locator, entries, totals, new Set());
    for (const [dependency, kind] of packageDependencies(actualPath)) {
      const resolved = resolvePackageDependency(actualPath, dependency, modulesRoot);
      if (resolved === null) {
        if (kind === "required") {
          throw new Error(`unresolved RF-04 runtime dependency: ${locator} -> ${dependency}`);
        }
        continue;
      }
      const target = packageLocator(resolved, modulesRoot, `${locator}/node_modules/${dependency}`);
      resolutionEdges.push({ dependency, from: locator, kind, to: target });
      queue.push({ actualPath: resolved, locator: target });
    }
  }
  const executable = {
    entries,
    resolution_edges: resolutionEdges.toSorted((left, right) =>
      stableJson(left).localeCompare(stableJson(right)),
    ),
    schema_version: 2,
    seed_mappings: seedMappings.map(({ label, locator }) => ({ label, locator })),
    total_bytes: totals.bytes,
    total_files: totals.files,
  };
  const portable = createReplayPortableDependencyManifest(repoRoot);
  const capturePlatform = replayCapturePlatform();
  const capture = {
    capture_platform: capturePlatform,
    executable_sha256: sha256(canonicalBytes(executable)),
    portable_sha256: portable.sha256,
    schema_version: 1,
  };
  return {
    capture,
    capture_executable_sha256: capture.executable_sha256,
    capture_platform: capturePlatform,
    capture_receipt_sha256: sha256(canonicalBytes(capture)),
    executable,
    portable,
    portable_sha256: portable.sha256,
  };
}

export function assertReplayDependencyManifestUnchanged(expected, actual) {
  if (
    expected.capture_receipt_sha256 !== actual.capture_receipt_sha256 ||
    expected.portable_sha256 !== actual.portable_sha256 ||
    stableJson(expected) !== stableJson(actual)
  ) {
    throw new Error("RF-04 executable dependency bytes changed during capture");
  }
}

export function replayDependencyClaimFromManifest(manifest) {
  return {
    capture_executable_sha256: manifest.capture_executable_sha256,
    capture_platform: manifest.capture_platform,
    capture_receipt_sha256: manifest.capture_receipt_sha256,
    portable_sha256: manifest.portable_sha256,
  };
}

export function assertReplayDependencyClaim(repoRoot, claim, options = {}) {
  const keys = Object.keys(claim ?? {}).toSorted();
  if (
    stableJson(keys) !==
    stableJson([
      "capture_executable_sha256",
      "capture_platform",
      "capture_receipt_sha256",
      "portable_sha256",
    ])
  ) {
    throw new Error("RF-04 dependency claim has an invalid shape");
  }
  const capturePlatform = assertCapturePlatform(claim.capture_platform, "capture platform");
  if (
    !SHA256_PATTERN.test(claim.capture_executable_sha256) ||
    !SHA256_PATTERN.test(claim.capture_receipt_sha256) ||
    !SHA256_PATTERN.test(claim.portable_sha256)
  ) {
    throw new Error("RF-04 dependency claim has an invalid digest");
  }
  const expectedReceipt = {
    capture_platform: capturePlatform,
    executable_sha256: claim.capture_executable_sha256,
    portable_sha256: claim.portable_sha256,
    schema_version: 1,
  };
  if (sha256(canonicalBytes(expectedReceipt)) !== claim.capture_receipt_sha256) {
    throw new Error("RF-04 dependency claim receipt does not link its platform and digests");
  }
  const portable = createReplayPortableDependencyManifest(repoRoot);
  if (portable.sha256 !== claim.portable_sha256) {
    throw new Error("current RF-04 portable dependency graph differs from captured envelopes");
  }
  const currentPlatform = assertCapturePlatform(
    options.currentPlatform ?? replayCapturePlatform(),
    "current platform",
  );
  if (stableJson(currentPlatform) !== stableJson(capturePlatform)) {
    return {
      capture_verification: "foreign_platform_portable_only",
      current_platform: currentPlatform,
    };
  }
  const createManifest = options.createCaptureManifest ?? createReplayDependencyManifest;
  const actual = createManifest(repoRoot);
  if (
    actual.capture_executable_sha256 !== claim.capture_executable_sha256 ||
    actual.capture_receipt_sha256 !== claim.capture_receipt_sha256 ||
    actual.portable_sha256 !== claim.portable_sha256 ||
    stableJson(actual.capture_platform) !== stableJson(capturePlatform)
  ) {
    throw new Error("current RF-04 capture-platform executable bytes differ from the claim");
  }
  return {
    capture_verification: "same_platform_recomputed",
    current_platform: currentPlatform,
  };
}
