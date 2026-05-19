import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

import { parseScriptArgs } from "../lib/script-runtime.mjs";
import {
  applyReleaseVersionSurfaces,
  listReleaseVersionSurfacePaths,
} from "../lib/release-version-surfaces.mjs";

const ROOT = process.cwd();

function usage() {
  return `Usage: node scripts/release/version-bump.mjs (--version <semver> | --bump <patch|minor|major>) [--write] [--skip-install] [--json]

Bumps AgentPlane release participant versions and related local release surfaces.
Default mode is dry-run. Pass --write to modify files.
`;
}

function readJson(relPath) {
  return JSON.parse(readFileSync(path.join(ROOT, relPath), "utf8"));
}

function parseSemver(version) {
  const match =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/u.exec(
      String(version).trim(),
    );
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function bumpVersion(currentVersion, bump) {
  const parsed = parseSemver(currentVersion);
  if (!parsed) throw new Error(`Invalid current semver: ${currentVersion}`);
  if (bump === "patch") return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  if (bump === "minor") return `${parsed.major}.${parsed.minor + 1}.0`;
  if (bump === "major") return `${parsed.major + 1}.0.0`;
  throw new Error(`Invalid --bump value: ${bump}`);
}

function assertTargetVersion(version) {
  if (!parseSemver(version)) {
    throw new Error(
      `Invalid --version value: ${version}. Expected X.Y.Z with optional prerelease/build.`,
    );
  }
}

function run(cmd, args) {
  execFileSync(cmd, args, { cwd: ROOT, stdio: "inherit", env: process.env });
}

function main() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    valueFlags: ["version", "bump"],
    booleanFlags: ["write", "skip-install", "json", "help"],
  });
  if (flags.help === true) {
    process.stdout.write(usage());
    return;
  }

  const currentVersion = String(readJson("packages/agentplane/package.json").version ?? "").trim();
  const targetVersion = flags.version
    ? String(flags.version).trim()
    : bumpVersion(currentVersion, String(flags.bump ?? "patch"));
  assertTargetVersion(targetVersion);

  const surfacePaths = listReleaseVersionSurfacePaths(ROOT);
  const changed = [...surfacePaths, "bun.lock"];

  const report = {
    schema_version: 1,
    dry_run: flags.write !== true,
    previous_version: currentVersion,
    next_version: targetVersion,
    changed_paths: [...new Set(changed)].toSorted(),
    next_commands: [
      "bun run release:parity",
      "bun run release:check:registry -- --version " + targetVersion,
    ],
  };

  if (flags.write === true) {
    applyReleaseVersionSurfaces(ROOT, targetVersion);
    if (flags["skip-install"] !== true) {
      run("bun", ["install", "--ignore-scripts"]);
    }
    run("bun", ["run", "release:parity"]);
  }

  if (flags.json === true) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  process.stdout.write(
    `${flags.write === true ? "updated" : "dry-run"}: ${currentVersion} -> ${targetVersion}\n` +
      `paths: ${report.changed_paths.join(", ")}\n`,
  );
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.stderr.write(usage());
  process.exitCode = 1;
}
