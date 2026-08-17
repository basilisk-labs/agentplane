import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { applyReleaseVersionSurfaces } from "./release-version-surfaces.mjs";
import {
  compareReleaseSemver,
  nextPatchBetaVersion,
  parseReleaseSemver,
} from "./release-semver.mjs";

function readPackageVersion(rootDir) {
  const manifest = JSON.parse(
    readFileSync(path.join(rootDir, "packages", "agentplane", "package.json"), "utf8"),
  );
  const version = String(manifest.version ?? "").trim();
  if (!parseReleaseSemver(version)) throw new Error(`Invalid workspace version: ${version}`);
  return version;
}

function readOptional(rootDir, relPath) {
  const absPath = path.join(rootDir, relPath);
  return existsSync(absPath) ? readFileSync(absPath, "utf8") : null;
}

function run(command, args, rootDir, quiet = false) {
  execFileSync(command, args, {
    cwd: rootDir,
    env: process.env,
    stdio: quiet ? ["ignore", "ignore", "inherit"] : "inherit",
  });
}

export function planNextDevelopmentVersion(currentVersion, publishedVersion) {
  const current = parseReleaseSemver(currentVersion);
  const published = parseReleaseSemver(publishedVersion);
  if (!current) throw new Error(`Invalid workspace version: ${currentVersion}`);
  if (!published) throw new Error(`Invalid published version: ${publishedVersion}`);
  const nextVersion = nextPatchBetaVersion(publishedVersion);
  if (!nextVersion) {
    return {
      action: "skip",
      reason: "published_version_is_prerelease",
      currentVersion,
      publishedVersion,
      nextVersion: null,
    };
  }
  if (compareReleaseSemver(currentVersion, nextVersion) === 0) {
    return {
      action: "skip",
      reason: "development_version_already_open",
      currentVersion,
      publishedVersion,
      nextVersion,
    };
  }
  if (
    current.prerelease.length === 0 &&
    compareReleaseSemver(currentVersion, publishedVersion) === 0
  ) {
    return {
      action: "apply",
      reason: "stable_publish_matches_workspace",
      currentVersion,
      publishedVersion,
      nextVersion,
    };
  }
  if (compareReleaseSemver(currentVersion, nextVersion) > 0) {
    return {
      action: "skip",
      reason: "workspace_already_ahead",
      currentVersion,
      publishedVersion,
      nextVersion,
    };
  }
  if (compareReleaseSemver(currentVersion, publishedVersion) < 0) {
    throw new Error(
      `Workspace version ${currentVersion} is behind published version ${publishedVersion}; refusing to rewrite release history.`,
    );
  }
  throw new Error(
    `Workspace version ${currentVersion} conflicts with expected next development version ${nextVersion} after ${publishedVersion}.`,
  );
}

export function applyNextDevelopmentVersion(rootDir, publishedVersion, opts = {}) {
  const currentVersion = readPackageVersion(rootDir);
  const plan = planNextDevelopmentVersion(currentVersion, publishedVersion);
  if (plan.action !== "apply" || opts.write !== true) {
    return { ...plan, dryRun: opts.write !== true, changedPaths: [] };
  }

  const referencePath = "docs/reference/generated-reference.mdx";
  const referenceBefore = readOptional(rootDir, referencePath);
  const changedPaths = applyReleaseVersionSurfaces(rootDir, plan.nextVersion);

  if (opts.skipInstall !== true && existsSync(path.join(rootDir, "bun.lock"))) {
    run("bun", ["install", "--frozen-lockfile", "--ignore-scripts"], rootDir, opts.quiet === true);
  }
  const generatorPath = path.join(rootDir, "scripts", "generate", "generate-website-docs.mjs");
  if (existsSync(generatorPath)) {
    run("node", [generatorPath], rootDir, opts.quiet === true);
  }
  const referenceAfter = readOptional(rootDir, referencePath);
  if (referenceBefore !== referenceAfter && referenceAfter !== null)
    changedPaths.push(referencePath);

  const parityPath = path.join(rootDir, "scripts", "release", "check-release-parity.mjs");
  if (existsSync(parityPath)) run("node", [parityPath], rootDir, opts.quiet === true);

  return {
    ...plan,
    dryRun: false,
    changedPaths: [...new Set(changedPaths)].toSorted(),
  };
}
