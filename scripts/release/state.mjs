import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { parseScriptArgs } from "../lib/script-runtime.mjs";
import {
  readReleaseParityState,
  collectReleaseParityErrors,
} from "../lib/release-version-parity.mjs";

const ROOT = process.cwd();
const PUBLIC_PACKAGES = ["@agentplaneorg/core", "@agentplaneorg/recipes", "agentplane"];

function runGit(args) {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", env: process.env }).trim();
  } catch {
    return null;
  }
}

function runQuiet(cmd, args) {
  try {
    return {
      ok: true,
      stdout: execFileSync(cmd, args, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        env: process.env,
      }).trim(),
    };
  } catch (error) {
    return {
      ok: false,
      stdout: String(error?.stdout ?? "").trim(),
      stderr: String(error?.stderr ?? error?.message ?? "").trim(),
    };
  }
}

function readPackageVersion() {
  const raw = JSON.parse(readFileSync(path.join(ROOT, "packages/agentplane/package.json"), "utf8"));
  return String(raw.version ?? "").trim();
}

function latestPlanDir() {
  const base = path.join(ROOT, ".agentplane/.release/plan");
  try {
    if (!existsSync(base)) return null;
    const entries = execFileSync("find", [base, "-mindepth", "1", "-maxdepth", "1", "-type", "d"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .toSorted();
    return entries.at(-1) ? path.relative(ROOT, entries.at(-1)).replaceAll(path.sep, "/") : null;
  } catch {
    return null;
  }
}

function registrySnapshot(version, enabled) {
  if (!enabled) return { checked: false, packages: [] };
  return {
    checked: true,
    packages: PUBLIC_PACKAGES.map((name) => {
      const result = runQuiet("npm", ["view", `${name}@${version}`, "version"]);
      return {
        name,
        version,
        published: result.ok && result.stdout === version,
        detail: result.ok ? result.stdout : result.stderr,
      };
    }),
  };
}

async function buildState(opts) {
  const version = readPackageVersion();
  const tag = `v${version}`;
  const parityState = await readReleaseParityState(ROOT);
  const parityErrors = collectReleaseParityErrors(parityState);
  const notesPath = `docs/releases/${tag}.md`;
  const publishResultPath = ".agentplane/.release/publish/publish-result.json";
  const releaseDistributionPath =
    ".agentplane/.release/publish/distribution/release-distribution.json";
  const latestTag = runGit([
    "describe",
    "--tags",
    "--abbrev=0",
    "--match",
    "v[0-9]*.[0-9]*.[0-9]*",
  ]);
  const head = runGit(["rev-parse", "HEAD"]);
  const branch = runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
  const dirty = runGit(["status", "--short", "--untracked-files=no"]);

  return {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    git: {
      branch,
      head,
      tracked_dirty: Boolean(dirty),
      tracked_dirty_lines: dirty ? dirty.split("\n").filter(Boolean) : [],
      latest_semver_tag: latestTag,
    },
    release: {
      version,
      tag,
      latest_plan_dir: latestPlanDir(),
      notes_path: notesPath,
      notes_exists: existsSync(path.join(ROOT, notesPath)),
      publish_result_path: publishResultPath,
      publish_result_exists: existsSync(path.join(ROOT, publishResultPath)),
      release_distribution_path: releaseDistributionPath,
      release_distribution_exists: existsSync(path.join(ROOT, releaseDistributionPath)),
    },
    parity: {
      ok: parityErrors.length === 0,
      errors: parityErrors,
      versions: {
        core: parityState.coreVersion,
        recipes: parityState.recipesVersion,
        agentplane: parityState.agentplaneVersion,
        recipes_runtime: parityState.recipesRuntimeVersion?.version ?? null,
        core_dependency: parityState.coreDependency,
        recipes_dependency: parityState.recipesDependency,
      },
    },
    registry: registrySnapshot(version, opts.checkRegistry),
  };
}

function printHuman(state) {
  const blockers = [];
  if (state.git.tracked_dirty) blockers.push("tracked tree is dirty");
  if (!state.parity.ok) blockers.push("release parity failed");
  if (!state.release.notes_exists) blockers.push(`missing ${state.release.notes_path}`);
  const published = state.registry.checked
    ? state.registry.packages.filter((pkg) => pkg.published).map((pkg) => pkg.name)
    : [];

  process.stdout.write(`Release state: ${state.release.tag} on ${state.git.branch}\n`);
  process.stdout.write(`Parity: ${state.parity.ok ? "ok" : "failed"}\n`);
  process.stdout.write(`Notes: ${state.release.notes_exists ? "present" : "missing"}\n`);
  process.stdout.write(`Latest plan: ${state.release.latest_plan_dir ?? "none"}\n`);
  if (state.registry.checked) {
    process.stdout.write(
      `Published packages: ${published.length > 0 ? published.join(", ") : "none"}\n`,
    );
  }
  process.stdout.write(
    `Next: ${
      blockers.length > 0 ? `fix ${blockers.join("; ")}` : "candidate/prepublish checks can run"
    }\n`,
  );
}

const { flags } = parseScriptArgs(process.argv.slice(2), {
  booleanFlags: ["json", "check-registry"],
});

buildState({ checkRegistry: flags["check-registry"] === true })
  .then((state) => {
    if (flags.json === true) {
      process.stdout.write(`${JSON.stringify(state, null, 2)}\n`);
      return;
    }
    printHuman(state);
    return state;
  })
  .catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
