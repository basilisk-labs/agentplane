import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

const ROOT = process.cwd();
const RELEASE_PACKAGES = [
  "packages/core/package.json",
  "packages/recipes/package.json",
  "packages/agentplane/package.json",
];
const INTERNAL_DEPENDENCY_PACKAGES = ["packages/testkit/package.json"];
const RECIPES_RUNTIME_PATH = "packages/recipes/src/index.ts";
const CONFIG_PATH = ".agentplane/config.json";
const ACR_EXAMPLE_PATH = "packages/spec/examples/acr.json";

function usage() {
  return `Usage: node scripts/release/version-bump.mjs (--version <semver> | --bump <patch|minor|major>) [--write] [--skip-install] [--json]

Bumps AgentPlane release participant versions and related local release surfaces.
Default mode is dry-run. Pass --write to modify files.
`;
}

function readJson(relPath) {
  return JSON.parse(readFileSync(path.join(ROOT, relPath), "utf8"));
}

function writeJson(relPath, value) {
  writeFileSync(path.join(ROOT, relPath), `${JSON.stringify(value, null, 2)}\n`, "utf8");
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

function updatePackage(relPath, nextVersion) {
  const pkg = readJson(relPath);
  const before = JSON.stringify(pkg);
  pkg.version = nextVersion;
  if (pkg.name === "agentplane") {
    pkg.dependencies = pkg.dependencies ?? {};
    pkg.dependencies["@agentplaneorg/core"] = nextVersion;
    pkg.dependencies["@agentplaneorg/recipes"] = nextVersion;
  }
  return { relPath, before, after: JSON.stringify(pkg), value: pkg };
}

function updateInternalDependencies(relPath, nextVersion) {
  const pkg = readJson(relPath);
  const before = JSON.stringify(pkg);
  for (const dependencyBlock of ["dependencies", "devDependencies", "peerDependencies"]) {
    const dependencies = pkg[dependencyBlock];
    if (!dependencies || typeof dependencies !== "object") continue;
    for (const name of ["@agentplaneorg/core", "@agentplaneorg/recipes", "agentplane"]) {
      if (typeof dependencies[name] === "string") dependencies[name] = nextVersion;
    }
  }
  return { relPath, before, after: JSON.stringify(pkg), value: pkg };
}

function updateRecipesRuntime(nextVersion) {
  const absPath = path.join(ROOT, RECIPES_RUNTIME_PATH);
  const text = readFileSync(absPath, "utf8");
  const next = text.replace(
    /export\s+const\s+RECIPES_VERSION\s*=\s*["'][^"']*["']\s*;/u,
    `export const RECIPES_VERSION = "${nextVersion}";`,
  );
  if (next === text) {
    throw new Error(`${RECIPES_RUNTIME_PATH} must export RECIPES_VERSION as a string literal.`);
  }
  return { relPath: RECIPES_RUNTIME_PATH, before: text, after: next };
}

function updateExpectedCliVersion(nextVersion) {
  if (!existsSync(path.join(ROOT, CONFIG_PATH))) return null;
  const cfg = readJson(CONFIG_PATH);
  cfg.framework = cfg.framework ?? {};
  cfg.framework.cli = cfg.framework.cli ?? {};
  cfg.framework.cli.expected_version = nextVersion;
  return { relPath: CONFIG_PATH, value: cfg };
}

function updateAcrExampleVersion(nextVersion) {
  const acr = readJson(ACR_EXAMPLE_PATH);
  const before = JSON.stringify(acr);
  acr.producer = acr.producer ?? {};
  acr.producer.version = nextVersion;
  const toolchain = Array.isArray(acr.agent?.toolchain) ? acr.agent.toolchain : [];
  for (const tool of toolchain) {
    if (tool?.name === "agentplane") tool.version = nextVersion;
  }
  return { relPath: ACR_EXAMPLE_PATH, before, after: JSON.stringify(acr), value: acr };
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

  const packageUpdates = RELEASE_PACKAGES.map((relPath) => updatePackage(relPath, targetVersion));
  const internalDependencyUpdates = INTERNAL_DEPENDENCY_PACKAGES.map((relPath) =>
    updateInternalDependencies(relPath, targetVersion),
  );
  const runtimeUpdate = updateRecipesRuntime(targetVersion);
  const configUpdate = updateExpectedCliVersion(targetVersion);
  const acrExampleUpdate = updateAcrExampleVersion(targetVersion);
  const runtimeChanged = runtimeUpdate.before !== runtimeUpdate.after;
  const changed = [
    ...packageUpdates.filter((entry) => entry.before !== entry.after).map((entry) => entry.relPath),
    ...internalDependencyUpdates
      .filter((entry) => entry.before !== entry.after)
      .map((entry) => entry.relPath),
    ...(runtimeChanged ? [runtimeUpdate.relPath] : []),
    ...(configUpdate ? [configUpdate.relPath] : []),
    ...(acrExampleUpdate.before !== acrExampleUpdate.after ? [acrExampleUpdate.relPath] : []),
    "bun.lock",
  ];

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
    for (const update of packageUpdates) writeJson(update.relPath, update.value);
    for (const update of internalDependencyUpdates) writeJson(update.relPath, update.value);
    writeFileSync(path.join(ROOT, runtimeUpdate.relPath), runtimeUpdate.after, "utf8");
    if (configUpdate) writeJson(configUpdate.relPath, configUpdate.value);
    writeJson(acrExampleUpdate.relPath, acrExampleUpdate.value);
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
