import { spawnSync } from "node:child_process";
import { lstatSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";

import { readFixtureRegistry, stableJson } from "../../lib/agent-efficiency-baseline.mjs";
import {
  createReplayDriverIdentity,
  createReplayHarnessManifest,
  fixtureRegistrySha256,
} from "../../lib/agent-efficiency-replay.mjs";
import {
  assertRepoPathNoSymlinkEscape,
  buildReplayGitEnvironment,
} from "../../lib/agent-efficiency-replay-safety.mjs";
import {
  assertReplayDependencyManifestUnchanged,
  createReplayDependencyManifest,
  replayDependencyClaimFromManifest,
} from "./agent-efficiency-dependency-manifest.mjs";

export const FIXTURE_REGISTRY_OVERLAY =
  ".rf04-runtime/fixture-control/agent-efficiency-fixtures.json";

export function assertReplayCaptureInputsUnchanged({
  dependencyManifest,
  driverIdentity,
  driverPath,
  fixtureDigest,
  harnessManifest,
  registry,
  registryPath,
  repoRoot,
}) {
  assertRepoPathNoSymlinkEscape(repoRoot, registryPath, "RF-04 fixture registry", {
    kind: "file",
  });
  const actualRegistry = readFixtureRegistry(registryPath, { historicalBaseline: true });
  if (
    stableJson(actualRegistry) !== stableJson(registry) ||
    fixtureRegistrySha256(actualRegistry) !== fixtureDigest
  ) {
    throw new Error("RF-04 fixture registry changed during capture");
  }
  const actualDriverIdentity = createReplayDriverIdentity(repoRoot, driverPath);
  if (stableJson(actualDriverIdentity) !== stableJson(driverIdentity)) {
    throw new Error("RF-04 reviewed driver bytes changed during capture");
  }
  const actualDependencyManifest = createReplayDependencyManifest(repoRoot);
  assertReplayDependencyManifestUnchanged(dependencyManifest, actualDependencyManifest);
  const actualHarnessManifest = createReplayHarnessManifest(repoRoot, actualDriverIdentity, {
    dependencyClaim: replayDependencyClaimFromManifest(actualDependencyManifest),
  });
  if (stableJson(actualHarnessManifest) !== stableJson(harnessManifest)) {
    throw new Error("RF-04 transitive capture harness bytes changed during capture");
  }
}

function runGit(args, cwd, label, exposeStderr = true) {
  const result = spawnSync("/usr/bin/git", args, {
    cwd,
    encoding: "utf8",
    env: buildReplayGitEnvironment(),
    maxBuffer: 128 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    const stderr = exposeStderr ? result.stderr.trim() : "";
    throw new Error(`${label} failed${stderr ? `: ${stderr}` : ""}`);
  }
  return result.stdout;
}

export function replayAnchorCloneArgs(sourceRoot) {
  return [
    "clone",
    "--quiet",
    "--shared",
    "--no-checkout",
    "--no-tags",
    path.resolve(sourceRoot),
    ".",
  ];
}

export function initializeAnchorCheckout(sourceRoot, repositoryPath, anchor) {
  runGit(replayAnchorCloneArgs(sourceRoot), repositoryPath, "replay anchor local clone", false);
  runGit(["config", "core.hooksPath", "/dev/null"], repositoryPath, "disable hooks");
  runGit(["config", "gc.auto", "0"], repositoryPath, "disable gc");
  runGit(["checkout", "--quiet", "--detach", anchor], repositoryPath, "anchor checkout");
  const actualHead = runGit(["rev-parse", "HEAD"], repositoryPath, "checkout head").trim();
  if (actualHead !== anchor) throw new Error("replay checkout does not point at the exact anchor");
  const actualTree = runGit(["rev-parse", "HEAD^{tree}"], repositoryPath, "checkout tree").trim();
  const expectedTree = runGit(["rev-parse", `${anchor}^{tree}`], sourceRoot, "anchor tree").trim();
  if (actualTree !== expectedTree) {
    throw new Error("replay checkout tree differs from the exact anchor tree");
  }
  runGit(["remote", "remove", "origin"], repositoryPath, "remove origin");
  const status = runGit(
    ["status", "--porcelain", "--untracked-files=no"],
    repositoryPath,
    "checkout status",
  );
  if (status !== "") throw new Error("replay checkout is not clean before harness setup");
}

export function installFixtureRegistryOverlay(repositoryPath, registry, fixtureDigest) {
  const tracked = runGit(
    ["ls-files", "--", FIXTURE_REGISTRY_OVERLAY],
    repositoryPath,
    "fixture registry tracked-path check",
  );
  if (tracked !== "")
    throw new Error("fixture control overlay collides with an anchor-tracked path");
  const overlayPath = path.join(repositoryPath, FIXTURE_REGISTRY_OVERLAY);
  mkdirSync(path.dirname(overlayPath), { recursive: true });
  writeFileSync(overlayPath, `${stableJson(registry, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
    mode: 0o600,
  });
  const stats = lstatSync(overlayPath);
  if (
    !stats.isFile() ||
    stats.isSymbolicLink() ||
    path.resolve(realpathSync(overlayPath)) !== path.resolve(overlayPath) ||
    fixtureRegistrySha256(JSON.parse(readFileSync(overlayPath, "utf8"))) !== fixtureDigest
  ) {
    throw new Error("fixture control overlay failed its canonical content boundary");
  }
  return FIXTURE_REGISTRY_OVERLAY;
}
