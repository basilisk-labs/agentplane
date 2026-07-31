import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { stableJson } from "../../lib/agent-efficiency-baseline.mjs";
import { parseReplayJsonc } from "./agent-efficiency-dependency-manifest.mjs";
import {
  buildCodexReplayEnvironment,
  fail,
  runSanitizedCommand,
} from "./agent-efficiency-codex-runtime.mjs";

const DRIVER_REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const TYPESCRIPT_NATIVE_ALIAS = "npm:typescript@7.0.2";
const TYPESCRIPT_NATIVE_VERSION = "7.0.2";
const TYPESCRIPT_PLATFORM_PACKAGES = Object.freeze([
  "@typescript/typescript-aix-ppc64",
  "@typescript/typescript-darwin-arm64",
  "@typescript/typescript-darwin-x64",
  "@typescript/typescript-freebsd-arm64",
  "@typescript/typescript-freebsd-x64",
  "@typescript/typescript-linux-arm",
  "@typescript/typescript-linux-arm64",
  "@typescript/typescript-linux-loong64",
  "@typescript/typescript-linux-mips64el",
  "@typescript/typescript-linux-ppc64",
  "@typescript/typescript-linux-riscv64",
  "@typescript/typescript-linux-s390x",
  "@typescript/typescript-linux-x64",
  "@typescript/typescript-netbsd-arm64",
  "@typescript/typescript-netbsd-x64",
  "@typescript/typescript-openbsd-arm64",
  "@typescript/typescript-openbsd-x64",
  "@typescript/typescript-sunos-x64",
  "@typescript/typescript-win32-arm64",
  "@typescript/typescript-win32-x64",
]);

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function projectApprovedTypeScript7Lock(lock) {
  const projected = structuredClone(lock);
  const rootDependencies = projected.workspaces?.[""]?.devDependencies;
  const websiteDependencies = projected.workspaces?.website?.devDependencies;
  const nativePackage = projected.packages?.["@typescript/native"];
  const nativeMetadata = nativePackage?.[2];
  const optionalDependencies = nativeMetadata?.optionalDependencies;
  if (
    rootDependencies?.["@typescript/native"] !== TYPESCRIPT_NATIVE_ALIAS ||
    rootDependencies?.typescript !== "6.0.3" ||
    websiteDependencies?.typescript !== "6.0.3" ||
    nativePackage?.[0] !== `typescript@${TYPESCRIPT_NATIVE_VERSION}` ||
    nativeMetadata?.bin?.tsc !== "bin/tsc" ||
    stableJson(Object.keys(optionalDependencies ?? {}).toSorted()) !==
      stableJson([...TYPESCRIPT_PLATFORM_PACKAGES].toSorted()) ||
    Object.values(optionalDependencies ?? {}).some(
      (version) => version !== TYPESCRIPT_NATIVE_VERSION,
    )
  ) {
    return null;
  }

  delete rootDependencies["@typescript/native"];
  rootDependencies.typescript = "^6.0.3";
  websiteDependencies.typescript = "~6.0.3";
  delete projected.packages["@typescript/native"];
  for (const packageName of TYPESCRIPT_PLATFORM_PACKAGES) {
    const platformPackage = projected.packages?.[packageName];
    if (platformPackage?.[0] !== `${packageName}@${TYPESCRIPT_NATIVE_VERSION}`) return null;
    delete projected.packages[packageName];
  }
  return projected;
}

export function assertAnchorLockCompatible(subjectLockBytes, driverLockBytes) {
  if (sha256(subjectLockBytes) === sha256(driverLockBytes)) return;
  let subjectLock;
  let driverLock;
  try {
    subjectLock = parseReplayJsonc(subjectLockBytes.toString("utf8"));
    driverLock = parseReplayJsonc(driverLockBytes.toString("utf8"));
  } catch {
    fail("ANCHOR_LOCK_MISMATCH");
  }
  const projected = projectApprovedTypeScript7Lock(driverLock);
  if (projected === null || stableJson(projected) !== stableJson(subjectLock)) {
    fail("ANCHOR_LOCK_MISMATCH");
  }
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
    GIT_OPTIONAL_LOCKS: "0",
    GIT_PAGER: "cat",
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

const WORKSPACE_DEPENDENCIES = new Map([
  ["@agentplaneorg/core", "packages/core"],
  ["@agentplaneorg/recipes", "packages/recipes"],
  ["@agentplane/testkit", "packages/testkit"],
]);

function mirrorDependencyLayout(sourceRoot, targetRoot, subjectRoot, layoutRelative = "") {
  mkdirSync(targetRoot, { recursive: true });
  for (const entry of readdirSync(sourceRoot, { withFileTypes: true })) {
    const source = path.join(sourceRoot, entry.name);
    const target = path.join(targetRoot, entry.name);
    if (entry.isDirectory()) {
      mirrorDependencyLayout(
        source,
        target,
        subjectRoot,
        layoutRelative ? `${layoutRelative}/${entry.name}` : entry.name,
      );
      continue;
    }
    if (!entry.isSymbolicLink()) fail("ANCHOR_DEPENDENCY_LAYOUT");
    const dependencyName = layoutRelative ? `${layoutRelative}/${entry.name}` : entry.name;
    const workspaceRelative = WORKSPACE_DEPENDENCIES.get(dependencyName);
    if (workspaceRelative) {
      symlinkSync(path.join(subjectRoot, workspaceRelative), target);
    } else {
      symlinkSync(path.resolve(realpathSync(source)), target);
    }
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
  assertAnchorLockCompatible(subjectLock, driverLock);

  const rootModules = path.join(subjectRoot, "node_modules");
  rmSync(rootModules, { force: true, recursive: true });
  mkdirSync(rootModules, { recursive: true });
  for (const dependency of ["tsup", "typescript"]) {
    symlinkSync(
      realpathSync(path.join(DRIVER_REPO_ROOT, "node_modules", dependency)),
      path.join(rootModules, dependency),
    );
  }

  for (const packageRelative of ["packages/agentplane", "packages/core"]) {
    const target = path.join(subjectRoot, packageRelative, "node_modules");
    const source = realpathSync(path.join(DRIVER_REPO_ROOT, packageRelative, "node_modules"));
    rmSync(target, { force: true, recursive: true });
    mirrorDependencyLayout(source, target, subjectRoot);
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

export function buildAnchorRuntime(subjectRoot, expectedAnchor, expectedDependencyClaim) {
  if (!/^[a-f0-9]{40}$/.test(expectedAnchor)) fail("ANCHOR_COMMIT");
  if (
    !/^sha256:[a-f0-9]{64}$/.test(expectedDependencyClaim?.capture_executable_sha256) ||
    !/^sha256:[a-f0-9]{64}$/.test(expectedDependencyClaim?.capture_receipt_sha256) ||
    !/^sha256:[a-f0-9]{64}$/.test(expectedDependencyClaim?.portable_sha256) ||
    typeof expectedDependencyClaim?.capture_platform !== "object"
  ) {
    fail("ANCHOR_DEPENDENCY_DIGEST");
  }
  const localHead = runSanitizedCommand("/usr/bin/git", ["rev-parse", "HEAD"], {
    code: "ANCHOR_HEAD",
    cwd: subjectRoot,
    env: buildAnchorGitEnvironment(),
  }).trim();
  if (localHead !== expectedAnchor) fail("ANCHOR_HEAD");
  const localTree = runSanitizedCommand("/usr/bin/git", ["rev-parse", "HEAD^{tree}"], {
    code: "ANCHOR_TREE",
    cwd: subjectRoot,
    env: buildAnchorGitEnvironment(),
  }).trim();
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
  const afterHead = runSanitizedCommand("/usr/bin/git", ["rev-parse", "HEAD"], {
    code: "ANCHOR_HEAD_AFTER_BUILD",
    cwd: subjectRoot,
    env: buildAnchorGitEnvironment(),
  }).trim();
  const afterTree = runSanitizedCommand("/usr/bin/git", ["rev-parse", "HEAD^{tree}"], {
    code: "ANCHOR_TREE_AFTER_BUILD",
    cwd: subjectRoot,
    env: buildAnchorGitEnvironment(),
  }).trim();
  const trackedStatus = runSanitizedCommand(
    "/usr/bin/git",
    ["status", "--porcelain", "--untracked-files=no"],
    { code: "ANCHOR_STATUS_AFTER_BUILD", cwd: subjectRoot, env: buildAnchorGitEnvironment() },
  );
  if (afterHead !== localHead || afterTree !== localTree || trackedStatus !== "") {
    fail("ANCHOR_TRACKED_DRIFT_AFTER_BUILD");
  }
  return {
    cliPath,
    receipt: {
      dependency_claim: expectedDependencyClaim,
      head_verified_after_build: true,
      tracked_status_clean_after_build: true,
      tree_verified_after_build: true,
    },
  };
}
