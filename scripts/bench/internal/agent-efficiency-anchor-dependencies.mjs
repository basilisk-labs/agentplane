import { createHash } from "node:crypto";
import {
  closeSync,
  constants,
  cpSync,
  fstatSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import path from "node:path";

import { stableJson } from "../../lib/agent-efficiency-baseline.mjs";
import {
  assertReplayDependencyManifestUnchanged,
  createReplayDependencyManifest,
  parseReplayJsonc,
  replayDependencyClaimFromManifest,
} from "./agent-efficiency-dependency-manifest.mjs";

const MAX_PACKAGES = 512;
const MAX_FILES = 100_000;
const MAX_BYTES = 1024 * 1024 * 1024;
const digest = (value) => createHash("sha256").update(value).digest("hex");
const inside = (root, file) => file === root || file.startsWith(`${root}${path.sep}`);
const fail = (reason) => {
  throw new Error(`ANCHOR_DEPENDENCY_${reason}`);
};

function packageName(name) {
  if (
    !/^(?:@[a-z0-9_.-]+\/)?[a-z0-9_.-]+$/i.test(name) ||
    name.split("/").some((part) => part === "." || part === "..")
  )
    fail("NAME");
  return name;
}

function sameFile(left, right) {
  return ["dev", "ino", "mode", "size", "mtimeNs", "ctimeNs", "nlink"].every(
    (field) => left[field] === right[field],
  );
}

function readSnapshotFile(root, file, expected, remainingBytes) {
  // Bind the read to one descriptor, not a pathname reopened after classification.
  const parents = [];
  for (
    let directory = path.dirname(file);
    inside(root, directory);
    directory = path.dirname(directory)
  ) {
    const stat = lstatSync(directory, { bigint: true });
    if (!stat.isDirectory() || realpathSync(directory) !== directory) fail("ESCAPE");
    parents.push([directory, stat]);
    if (directory === root) break;
  }
  const unchanged = () => {
    if (realpathSync(file) !== file || !sameFile(expected, lstatSync(file, { bigint: true })))
      fail("CHANGED");
    for (const [directory, stat] of parents)
      if (!sameFile(stat, lstatSync(directory, { bigint: true }))) fail("CHANGED");
  };
  const fd = openSync(file, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd, { bigint: true });
    if (!before.isFile() || !sameFile(expected, before)) fail("CHANGED");
    if (before.size > BigInt(remainingBytes)) fail("BUDGET");
    unchanged();
    const content = readFileSync(fd);
    if (
      !sameFile(before, fstatSync(fd, { bigint: true })) ||
      BigInt(content.length) !== before.size
    )
      fail("CHANGED");
    unchanged();
    return { size: content.length, hash: digest(content) };
  } finally {
    closeSync(fd);
  }
}

function snapshot(root) {
  const entries = [];
  let bytes = 0;
  function visit(file, relative) {
    const stat = lstatSync(file, { bigint: true });
    if (stat.isSymbolicLink()) {
      const target = realpathSync(file);
      if (!inside(root, target)) fail("ESCAPE");
      // Do not allow directory links/cycles in package payloads.
      if (!lstatSync(target).isFile()) fail("LINK");
      entries.push([relative, "link", path.relative(root, target)]);
    } else if (stat.isDirectory()) {
      for (const entry of readdirSync(file).toSorted()) {
        if (relative === "" && entry === "node_modules") continue;
        visit(path.join(file, entry), relative ? `${relative}/${entry}` : entry);
      }
    } else if (stat.isFile()) {
      const captured = readSnapshotFile(root, file, stat, MAX_BYTES - bytes);
      bytes += captured.size;
      entries.push([relative, Number(stat.mode & 0o777n), captured.hash]);
    } else fail("FILE_KIND");
    if (entries.length > MAX_FILES || bytes > MAX_BYTES) fail("BUDGET");
  }
  visit(root, "");
  return digest(stableJson(entries));
}

function platformList(value) {
  if (value === undefined) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value) && value.every((item) => typeof item === "string"))
    return value.toSorted();
  fail("PLATFORM");
}

function acceptsPlatform(value, actual) {
  const values = platformList(value);
  return (
    !values.includes(`!${actual}`) &&
    (values.every((item) => item.startsWith("!")) || values.includes(actual))
  );
}

function compatiblePlatform(metadata) {
  return (
    acceptsPlatform(metadata.os, process.platform) && acceptsPlatform(metadata.cpu, process.arch)
  );
}

function resolveLock(lock, parent, name) {
  packageName(name);
  let prefix = parent;
  while (prefix) {
    const candidate = `${prefix}/${name}`;
    if (Object.hasOwn(lock.packages, candidate)) return candidate;
    prefix = prefix.slice(0, Math.max(0, prefix.lastIndexOf("/")));
  }
  return Object.hasOwn(lock.packages, name) ? name : null;
}

function selectPackage(store, entry) {
  if (
    !Array.isArray(entry) ||
    typeof entry[0] !== "string" ||
    !entry[2] ||
    typeof entry[2] !== "object"
  )
    fail("LOCK_ENTRY");
  const split = entry[0].lastIndexOf("@");
  const name = packageName(entry[0].slice(0, split));
  const version = entry[0].slice(split + 1);
  if (!/^\d+\.\d+\.\d+(?:[-+][a-z0-9.-]+)?$/i.test(version)) fail("VERSION");
  const prefix = `${name.replaceAll("/", "+")}@${version}`;
  const candidates = [];
  for (const folder of readdirSync(store).toSorted()) {
    if (folder !== prefix && !folder.startsWith(`${prefix}+`)) continue;
    const candidate = path.join(store, folder, "node_modules", name);
    if (!lstatSync(candidate, { throwIfNoEntry: false })) continue;
    const real = realpathSync(candidate);
    if (!inside(store, real)) fail("ESCAPE");
    const manifest = JSON.parse(readFileSync(path.join(real, "package.json"), "utf8"));
    if (manifest.name !== name || manifest.version !== version) fail("VERSION");
    for (const field of ["os", "cpu"]) {
      if (stableJson(platformList(manifest[field])) !== stableJson(platformList(entry[2][field])))
        fail("PLATFORM");
    }
    for (const field of ["dependencies", "optionalDependencies", "peerDependencies"]) {
      if (stableJson(manifest[field] ?? {}) !== stableJson(entry[2][field] ?? {})) fail("EDGES");
    }
    candidates.push({ source: real, hash: snapshot(real), manifest });
  }
  if (candidates.length === 0) return null;
  if (new Set(candidates.map((candidate) => candidate.hash)).size !== 1) fail("AMBIGUOUS");
  return { ...candidates[0], name, version };
}

function link(target, destination) {
  mkdirSync(path.dirname(destination), { recursive: true });
  symlinkSync(target, destination);
}

/** Select an exact frozen graph; availability is not historical byte equivalence. */
export function prepareIsolatedAnchorDependencies(
  subjectRoot,
  driverRoot,
  repositoryRoot = driverRoot,
) {
  const repository = realpathSync(repositoryRoot);
  const modules = realpathSync(path.join(driverRoot, "node_modules"));
  if (!inside(repository, modules)) fail("ESCAPE");
  const store = realpathSync(path.join(modules, ".bun"));
  if (!inside(modules, store)) fail("ESCAPE");
  const lock = parseReplayJsonc(readFileSync(path.join(subjectRoot, "bun.lock"), "utf8"));
  if (!lock.workspaces || !lock.packages) fail("LOCK_ENTRY");
  const selected = new Map();
  const workspaceLinks = [];
  const seeds = [];
  const workspaceNames = new Map(
    Object.entries(lock.workspaces).map(([relative, value]) => [value.name, relative]),
  );
  function select(key, required) {
    if (selected.has(key)) return selected.get(key);
    const entry = lock.packages[key];
    if (!entry || !compatiblePlatform(entry[2] ?? {})) {
      if (required) fail("MISSING");
      return null;
    }
    const node = selectPackage(store, entry);
    if (!node) {
      if (required) fail("MISSING");
      return null;
    }
    if (selected.size >= MAX_PACKAGES) fail("BUDGET");
    node.key = key;
    node.edges = [];
    node.absent = [];
    selected.set(key, node);
    const kinds = new Map();
    for (const name of Object.keys(node.manifest.peerDependencies ?? {})) kinds.set(name, false);
    for (const name of Object.keys(node.manifest.optionalDependencies ?? {}))
      kinds.set(name, false);
    for (const name of Object.keys(node.manifest.dependencies ?? {}))
      kinds.set(name, !Object.hasOwn(node.manifest.optionalDependencies ?? {}, name));
    for (const [name, mandatory] of kinds) {
      const resolved = resolveLock(lock, key, name);
      if (!resolved) {
        if (mandatory) fail("MISSING");
        node.absent.push(name);
        continue;
      }
      const child = select(resolved, mandatory);
      if (child) node.edges.push({ name, child });
      else node.absent.push(name);
    }
    return node;
  }
  for (const relative of ["", "packages/agentplane", "packages/core"]) {
    const manifest = JSON.parse(
      readFileSync(path.join(subjectRoot, relative, "package.json"), "utf8"),
    );
    const frozen = lock.workspaces[relative];
    for (const field of ["dependencies", "devDependencies", "optionalDependencies"]) {
      if (stableJson(manifest[field] ?? {}) !== stableJson(frozen?.[field] ?? {}))
        fail("WORKSPACE");
    }
    const names =
      relative === ""
        ? ["tsup", "typescript"]
        : Object.keys({
            ...manifest.dependencies,
            ...manifest.devDependencies,
            ...manifest.optionalDependencies,
          });
    for (const name of names) {
      packageName(name);
      if (workspaceNames.has(name)) {
        const target = workspaceNames.get(name);
        if (
          typeof target !== "string" ||
          !inside(path.resolve(subjectRoot), path.resolve(subjectRoot, target)) ||
          !inside(realpathSync(subjectRoot), realpathSync(path.join(subjectRoot, target)))
        )
          fail("ESCAPE");
        workspaceLinks.push({ relative, name, target });
        continue;
      }
      const key = resolveLock(lock, relative, name);
      if (!key) fail("MISSING");
      const node = select(key, !Object.hasOwn(manifest.optionalDependencies ?? {}, name));
      if (node) seeds.push({ relative, name, node });
    }
  }
  const rootModules = path.join(subjectRoot, "node_modules");
  for (const relative of ["", "packages/agentplane", "packages/core"]) {
    const directory = path.join(subjectRoot, relative, "node_modules");
    rmSync(directory, { recursive: true, force: true });
    mkdirSync(directory, { recursive: true });
  }
  for (const node of selected.values()) {
    node.destination = path.join(
      rootModules,
      ".anchor",
      digest(node.key),
      "node_modules",
      node.name,
    );
    mkdirSync(path.dirname(node.destination), { recursive: true });
    cpSync(node.source, node.destination, {
      recursive: true,
      dereference: true,
      filter: (source) => source !== path.join(node.source, "node_modules"),
    });
    if (snapshot(node.destination) !== node.hash || snapshot(node.source) !== node.hash)
      fail("CHANGED");
  }
  for (const node of selected.values())
    for (const edge of node.edges)
      link(
        edge.child.destination,
        path.join(rootModules, ".anchor", digest(node.key), "node_modules", edge.name),
      );
  for (const seed of seeds)
    link(seed.node.destination, path.join(subjectRoot, seed.relative, "node_modules", seed.name));
  for (const workspace of workspaceLinks)
    link(
      path.join(subjectRoot, workspace.target),
      path.join(subjectRoot, workspace.relative, "node_modules", workspace.name),
    );
  // Omitted optional/peer edges must not resolve through a containing checkout.
  for (const node of selected.values())
    for (const name of node.absent) {
      let ancestor = path.dirname(path.resolve(subjectRoot));
      while (inside(repository, ancestor)) {
        if (lstatSync(path.join(ancestor, "node_modules", name), { throwIfNoEntry: false }))
          fail("FALLBACK");
        if (ancestor === repository) break;
        ancestor = path.dirname(ancestor);
      }
    }
  const before = createReplayDependencyManifest(subjectRoot);
  const claim = replayDependencyClaimFromManifest(before);
  return {
    mode: "isolated_frozen_lock_v1",
    anchor_dependency_claim: claim,
    assertUnchanged() {
      if (stableJson(claim) !== stableJson(replayDependencyClaimFromManifest(before)))
        fail("RECEIPT");
      for (const node of selected.values())
        if (snapshot(node.source) !== node.hash) fail("CHANGED");
      assertReplayDependencyManifestUnchanged(before, createReplayDependencyManifest(subjectRoot));
    },
  };
}
