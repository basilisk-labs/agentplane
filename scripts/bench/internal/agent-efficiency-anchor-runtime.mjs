import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildCodexReplayEnvironment,
  fail,
  runSanitizedCommand,
} from "./agent-efficiency-codex-runtime.mjs";

const DRIVER_REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function buildAnchorProcessEnvironment(fixtureRoot, source = process.env) {
  const processRoot = path.join(path.resolve(fixtureRoot), ".rf04-runtime", "process");
  return {
    ...buildAnchorGitEnvironment(source),
    AGENTPLANE_HOME: path.join(processRoot, "agentplane-home"),
    HOME: path.join(processRoot, "home"),
    TMPDIR: path.join(processRoot, "tmp"),
    XDG_CACHE_HOME: path.join(processRoot, "xdg-cache"),
    XDG_CONFIG_HOME: path.join(processRoot, "xdg-config"),
  };
}

export function buildAnchorGitEnvironment(source = process.env) {
  return {
    ...buildCodexReplayEnvironment(source),
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_TERMINAL_PROMPT: "0",
  };
}

export function prepareAnchorProcessEnvironment(fixtureRoot) {
  const environment = buildAnchorProcessEnvironment(fixtureRoot);
  for (const name of ["AGENTPLANE_HOME", "HOME", "TMPDIR", "XDG_CACHE_HOME", "XDG_CONFIG_HOME"]) {
    mkdirSync(environment[name], { recursive: true });
  }
  return environment;
}

function mirrorRelativeSymlinkLayout(sourceRoot, targetRoot) {
  mkdirSync(targetRoot, { recursive: true });
  for (const entry of readdirSync(sourceRoot, { withFileTypes: true })) {
    const source = path.join(sourceRoot, entry.name);
    const target = path.join(targetRoot, entry.name);
    if (entry.isDirectory()) {
      mirrorRelativeSymlinkLayout(source, target);
      continue;
    }
    if (!entry.isSymbolicLink()) fail("ANCHOR_DEPENDENCY_LAYOUT");
    const linkTarget = readlinkSync(source);
    if (path.isAbsolute(linkTarget)) fail("ANCHOR_DEPENDENCY_LINK_ESCAPE");
    symlinkSync(linkTarget, target);
  }
}

function assertAnchorWorkspaceLink(subjectRoot, linkRelative, packageRelative) {
  const resolved = path.resolve(realpathSync(path.join(subjectRoot, linkRelative)));
  const expected = path.resolve(subjectRoot, packageRelative);
  if (resolved !== expected) fail("ANCHOR_WORKSPACE_LINK");
}

function linkAnchorDependencies(subjectRoot) {
  const subjectLock = readFileSync(path.join(subjectRoot, "bun.lock"));
  const driverLock = readFileSync(path.join(DRIVER_REPO_ROOT, "bun.lock"));
  if (sha256(subjectLock) !== sha256(driverLock)) fail("ANCHOR_LOCK_MISMATCH");

  const rootModules = path.join(subjectRoot, "node_modules");
  rmSync(rootModules, { force: true, recursive: true });
  symlinkSync(realpathSync(path.join(DRIVER_REPO_ROOT, "node_modules")), rootModules, "dir");

  for (const packageRelative of ["packages/agentplane", "packages/core"]) {
    const target = path.join(subjectRoot, packageRelative, "node_modules");
    const source = realpathSync(path.join(DRIVER_REPO_ROOT, packageRelative, "node_modules"));
    rmSync(target, { force: true, recursive: true });
    mirrorRelativeSymlinkLayout(source, target);
  }

  assertAnchorWorkspaceLink(
    subjectRoot,
    "packages/agentplane/node_modules/@agentplaneorg/core",
    "packages/core",
  );
  assertAnchorWorkspaceLink(
    subjectRoot,
    "packages/agentplane/node_modules/@agentplaneorg/recipes",
    "packages/recipes",
  );
  assertAnchorWorkspaceLink(
    subjectRoot,
    "packages/agentplane/node_modules/@agentplane/testkit",
    "packages/testkit",
  );
}

function buildAnchorPackageBundle(subjectRoot, packageRelative, environment) {
  const packageRoot = path.join(subjectRoot, packageRelative);
  const options = {
    code: "ANCHOR_BUNDLE_BUILD",
    cwd: packageRoot,
    env: environment,
    timeout: 240_000,
  };
  runSanitizedCommand(
    process.execPath,
    [path.join(subjectRoot, "scripts/release/prune-package-js.mjs"), "dist"],
    options,
  );
  runSanitizedCommand(
    process.execPath,
    [path.join(subjectRoot, "scripts/checks/run-tsup-build.mjs")],
    options,
  );
  runSanitizedCommand(
    process.execPath,
    [path.join(subjectRoot, "scripts/release/manifest.mjs"), "build", "."],
    options,
  );
}

function assertAnchorBuildManifest(subjectRoot, packageRelative, packageName, expectedHead) {
  const manifestPath = path.join(subjectRoot, packageRelative, "dist/.build-manifest.json");
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    fail("ANCHOR_BUILD_MANIFEST");
  }
  if (
    manifest.schema_version !== 1 ||
    manifest.manifest_kind !== "development" ||
    manifest.package_name !== packageName ||
    manifest.git_head !== expectedHead ||
    typeof manifest.watched_runtime_snapshot_hash !== "string" ||
    manifest.watched_runtime_snapshot_hash.length === 0
  ) {
    fail("ANCHOR_BUILD_MANIFEST");
  }
}

export function buildAnchorRuntime(subjectRoot, expectedAnchor) {
  if (!/^[a-f0-9]{40}$/.test(expectedAnchor)) fail("ANCHOR_COMMIT");
  const localHead = runSanitizedCommand("/usr/bin/git", ["rev-parse", "HEAD"], {
    code: "ANCHOR_HEAD",
    cwd: subjectRoot,
    env: buildAnchorGitEnvironment(),
  }).trim();
  if (localHead !== expectedAnchor) fail("ANCHOR_HEAD");
  if (
    runSanitizedCommand("/usr/bin/git", ["status", "--porcelain", "--untracked-files=no"], {
      code: "ANCHOR_STATUS",
      cwd: subjectRoot,
      env: buildAnchorGitEnvironment(),
    }) !== ""
  ) {
    fail("ANCHOR_DIRTY");
  }
  linkAnchorDependencies(subjectRoot);
  const environment = prepareAnchorProcessEnvironment(subjectRoot);
  runSanitizedCommand(process.execPath, ["scripts/checks/run-typescript-build.mjs"], {
    code: "ANCHOR_BUILD",
    cwd: subjectRoot,
    env: environment,
    timeout: 240_000,
  });
  buildAnchorPackageBundle(subjectRoot, "packages/core", environment);
  buildAnchorPackageBundle(subjectRoot, "packages/agentplane", environment);
  const cliPath = path.join(subjectRoot, "packages/agentplane/bin/agentplane.js");
  if (
    !existsSync(path.join(subjectRoot, "packages/agentplane/dist/cli.js")) ||
    !existsSync(path.join(subjectRoot, "packages/core/dist/index.js"))
  ) {
    fail("ANCHOR_DIST_MISSING");
  }
  assertAnchorBuildManifest(subjectRoot, "packages/core", "@agentplaneorg/core", localHead);
  assertAnchorBuildManifest(subjectRoot, "packages/agentplane", "agentplane", localHead);
  return cliPath;
}
