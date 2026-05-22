import { execFile, execFileSync } from "node:child_process";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { checkTaskState } from "../checks/check-task-state.mjs";

import {
  collectWatchedRuntimeSnapshot,
  getWatchedRuntimePathsForPackage,
} from "../../packages/agentplane/bin/runtime-watch.js";

const execFileAsync = promisify(execFile);

function usage() {
  return [
    "Usage: node scripts/manifest.mjs <command> [options]",
    "",
    "Commands:",
    "  build <package-dir>           Emit dist/.build-manifest.json for a package build",
    "  sanitize <package-dir>        Rewrite dist/.build-manifest.json for npm packaging",
    "  publish-result [options]      Emit a publish-result artifact for the GitHub publish workflow",
    "  release-ready [options]       Inspect the checkout and emit a release-ready manifest",
  ].join("\n");
}

function parseTopLevel(argv) {
  const command = argv[0] ?? "";
  if (command === "--help" || command === "-h" || !command) {
    return { help: true, command: null, args: [] };
  }
  return { help: false, command, args: argv.slice(1) };
}

async function fileMtimeMs(filePath) {
  try {
    const details = await stat(filePath);
    return details.isFile() ? details.mtimeMs : null;
  } catch {
    return null;
  }
}

function resolveGitHead(cwd) {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

async function runBuildManifest(argv) {
  const packageDirArg = argv[0];
  if (!packageDirArg) {
    throw new Error("usage: node scripts/manifest.mjs build <package-dir>");
  }

  const packageDir = path.resolve(packageDirArg);
  const packageJson = JSON.parse(await readFile(path.join(packageDir, "package.json"), "utf8"));
  const watchedRuntime = await collectWatchedRuntimeSnapshot(
    packageDir,
    getWatchedRuntimePathsForPackage(packageJson.name),
  );
  const srcCliPath = path.join(packageDir, "src", "cli.ts");
  const srcIndexPath = path.join(packageDir, "src", "index.ts");
  const distCliPath = path.join(packageDir, "dist", "cli.js");
  const distIndexPath = path.join(packageDir, "dist", "index.js");
  const tsBuildInfoPath = path.join(packageDir, "tsconfig.tsbuildinfo");

  const manifest = {
    schema_version: 1,
    manifest_kind: "development",
    package_name: packageJson.name,
    package_version: packageJson.version,
    package_dir: packageDir,
    generated_at: new Date().toISOString(),
    git_head: resolveGitHead(packageDir),
    src_cli_mtime_ms: await fileMtimeMs(srcCliPath),
    src_index_mtime_ms: await fileMtimeMs(srcIndexPath),
    dist_cli_mtime_ms: await fileMtimeMs(distCliPath),
    dist_index_mtime_ms: await fileMtimeMs(distIndexPath),
    tsbuildinfo_mtime_ms: await fileMtimeMs(tsBuildInfoPath),
    watched_runtime_paths: watchedRuntime.watchedPaths,
    watched_runtime_snapshot_hash: watchedRuntime.snapshotHash,
    watched_runtime_files: watchedRuntime.files,
  };

  const outPath = path.join(packageDir, "dist", ".build-manifest.json");
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

async function runSanitizeManifest(argv) {
  const packageDirArg = argv[0];
  if (!packageDirArg) {
    throw new Error("usage: node scripts/manifest.mjs sanitize <package-dir>");
  }

  const packageDir = path.resolve(packageDirArg);
  const packageJson = JSON.parse(await readFile(path.join(packageDir, "package.json"), "utf8"));
  const manifestPath = path.join(packageDir, "dist", ".build-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const sanitized = {
    schema_version: 1,
    manifest_kind: "package",
    package_name: packageJson.name,
    package_version: packageJson.version,
    git_head: typeof manifest.git_head === "string" ? manifest.git_head : null,
    watched_runtime_snapshot_hash:
      typeof manifest.watched_runtime_snapshot_hash === "string"
        ? manifest.watched_runtime_snapshot_hash
        : null,
  };
  await writeFile(manifestPath, `${JSON.stringify(sanitized, null, 2)}\n`, "utf8");
}

function publishResultUsage() {
  return [
    "Usage: node scripts/manifest.mjs publish-result [options]",
    "",
    "Emit a machine-readable publish-result artifact for the GitHub publish workflow.",
    "",
    "Options:",
    "  --out <path>                 Output path for publish-result.json",
    "  --sha <git-sha>             Exact release SHA",
    "  --version <semver>          Released package version",
    "  --tag <tag>                 Release tag (vX.Y.Z)",
    "  --release-ready-run-id <id> Core CI run id that produced release-ready",
    "  --distribution-manifest <path> Optional release-distribution.json path",
    "  --external-result <path>    Optional external distribution module result JSON path; repeatable",
    "  --job-status <status>       Current GitHub job status",
    "  --core-prepublished <bool>  Whether @agentplaneorg/core was already published before this run",
    "  --recipes-prepublished <bool> Whether @agentplaneorg/recipes was already published before this run",
    "  --cli-prepublished <bool>   Whether agentplane was already published before this run",
    "  --core-outcome <outcome>    Step outcome for @agentplaneorg/core publish",
    "  --recipes-outcome <outcome> Step outcome for @agentplaneorg/recipes publish",
    "  --cli-outcome <outcome>     Step outcome for agentplane publish",
    "  --smoke-outcome <outcome>   Step outcome for post-publish npm smoke",
    "  --ghcr-outcome <outcome>    Step outcome for GHCR image publication",
    "  --tag-exists <bool>         Whether the release tag already existed on origin",
    "  --tag-outcome <outcome>     Step outcome for pushing the release tag",
    "  --release-outcome <outcome> Step outcome for GitHub release creation",
    "  --json                      Emit JSON to stdout",
    "  --help, -h                  Show this help text",
  ].join("\n");
}

function parseBoolean(value, label) {
  const text = String(value ?? "")
    .trim()
    .toLowerCase();
  if (text === "true") return true;
  if (text === "false") return false;
  throw new Error(`Invalid boolean for ${label}: ${String(value ?? "")}`);
}

function assertNonEmpty(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`Missing required ${label}.`);
  return text;
}

function normalizeOutcome(value) {
  const text = String(value ?? "").trim();
  return text || "unknown";
}

function parsePublishResultArgs(argv) {
  const out = {
    outPath: null,
    sha: null,
    version: null,
    tag: null,
    releaseReadyRunId: null,
    distributionManifestPath: null,
    externalResultPaths: [],
    jobStatus: process.env.AGENTPLANE_PUBLISH_JOB_STATUS ?? null,
    corePrepublished: false,
    recipesPrepublished: false,
    cliPrepublished: false,
    coreOutcome: "unknown",
    recipesOutcome: "unknown",
    cliOutcome: "unknown",
    smokeOutcome: "unknown",
    ghcrOutcome: "unknown",
    tagExists: false,
    tagOutcome: "unknown",
    releaseOutcome: "unknown",
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    const next = argv[index + 1];
    if (arg === "--out") {
      out.outPath = path.resolve(next ?? "");
      index += 1;
      continue;
    }
    if (arg === "--sha") {
      out.sha = next ?? out.sha;
      index += 1;
      continue;
    }
    if (arg === "--version") {
      out.version = next ?? out.version;
      index += 1;
      continue;
    }
    if (arg === "--tag") {
      out.tag = next ?? out.tag;
      index += 1;
      continue;
    }
    if (arg === "--release-ready-run-id") {
      out.releaseReadyRunId = next ?? out.releaseReadyRunId;
      index += 1;
      continue;
    }
    if (arg === "--distribution-manifest") {
      out.distributionManifestPath = next ? path.resolve(next) : out.distributionManifestPath;
      index += 1;
      continue;
    }
    if (arg === "--external-result") {
      if (next) out.externalResultPaths.push(path.resolve(next));
      index += 1;
      continue;
    }
    if (arg === "--job-status") {
      out.jobStatus = next ?? out.jobStatus;
      index += 1;
      continue;
    }
    if (arg === "--core-prepublished") {
      out.corePrepublished = parseBoolean(next, "core-prepublished");
      index += 1;
      continue;
    }
    if (arg === "--recipes-prepublished") {
      out.recipesPrepublished = parseBoolean(next, "recipes-prepublished");
      index += 1;
      continue;
    }
    if (arg === "--cli-prepublished") {
      out.cliPrepublished = parseBoolean(next, "cli-prepublished");
      index += 1;
      continue;
    }
    if (arg === "--core-outcome") {
      out.coreOutcome = next ?? out.coreOutcome;
      index += 1;
      continue;
    }
    if (arg === "--recipes-outcome") {
      out.recipesOutcome = next ?? out.recipesOutcome;
      index += 1;
      continue;
    }
    if (arg === "--cli-outcome") {
      out.cliOutcome = next ?? out.cliOutcome;
      index += 1;
      continue;
    }
    if (arg === "--smoke-outcome") {
      out.smokeOutcome = next ?? out.smokeOutcome;
      index += 1;
      continue;
    }
    if (arg === "--ghcr-outcome") {
      out.ghcrOutcome = next ?? out.ghcrOutcome;
      index += 1;
      continue;
    }
    if (arg === "--tag-exists") {
      out.tagExists = parseBoolean(next, "tag-exists");
      index += 1;
      continue;
    }
    if (arg === "--tag-outcome") {
      out.tagOutcome = next ?? out.tagOutcome;
      index += 1;
      continue;
    }
    if (arg === "--release-outcome") {
      out.releaseOutcome = next ?? out.releaseOutcome;
      index += 1;
      continue;
    }
    if (arg === "--json") {
      out.json = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      out.help = true;
      continue;
    }
    throw new Error(`unknown argument: ${arg}`);
  }

  return out;
}

function derivePackageResult({ prepublished, outcome }) {
  if (prepublished) {
    return {
      alreadyPublished: true,
      stepOutcome: normalizeOutcome(outcome),
      published: true,
      source: "preexisting",
    };
  }
  if (outcome === "success") {
    return {
      alreadyPublished: false,
      stepOutcome: "success",
      published: true,
      source: "published_in_run",
    };
  }
  return {
    alreadyPublished: false,
    stepOutcome: normalizeOutcome(outcome),
    published: false,
    source: "not_confirmed",
  };
}

function buildPublishResultManifest(args) {
  const core = derivePackageResult({
    prepublished: args.corePrepublished,
    outcome: normalizeOutcome(args.coreOutcome),
  });
  const recipes = derivePackageResult({
    prepublished: args.recipesPrepublished,
    outcome: normalizeOutcome(args.recipesOutcome),
  });
  const cli = derivePackageResult({
    prepublished: args.cliPrepublished,
    outcome: normalizeOutcome(args.cliOutcome),
  });

  const smokeOutcome = normalizeOutcome(args.smokeOutcome);
  const ghcrOutcome = normalizeOutcome(args.ghcrOutcome);
  const tagOutcome = normalizeOutcome(args.tagOutcome);
  const releaseOutcome = normalizeOutcome(args.releaseOutcome);
  const tagEnsured = args.tagExists || tagOutcome === "success";
  const smokePassed = smokeOutcome === "success";
  const ghcrPublished = ghcrOutcome === "success";
  const releaseCreated = releaseOutcome === "success";
  const jobStatus = assertNonEmpty(args.jobStatus, "job status");

  const failures = [];
  if (!core.published) failures.push("@agentplaneorg/core publish not confirmed");
  if (!recipes.published) failures.push("@agentplaneorg/recipes publish not confirmed");
  if (!cli.published) failures.push("agentplane publish not confirmed");
  if (!smokePassed) failures.push(`post-publish smoke outcome=${smokeOutcome}`);
  if (!ghcrPublished) failures.push(`GHCR publish outcome=${ghcrOutcome}`);
  if (!tagEnsured) failures.push(`release tag not ensured (outcome=${tagOutcome})`);
  if (!releaseCreated) failures.push(`GitHub release outcome=${releaseOutcome}`);
  if (jobStatus !== "success") failures.push(`publish job status=${jobStatus}`);
  if (args.distribution?.requested && !args.distribution.loaded) {
    failures.push(`release distribution manifest unavailable (${args.distribution.reason})`);
  }
  const externalModules = args.external?.modules ?? [];
  for (const module of externalModules) {
    const setupTagConfirmed =
      module.name !== "setup-agentplane" || module.setupTag?.status === "published";
    if (module.loaded && ["published", "unchanged"].includes(module.status) && setupTagConfirmed) {
      continue;
    }
    const detail = module.loaded
      ? `status=${module.status}${module.reasonCode ? ` reason=${module.reasonCode}` : ""}`
      : `unavailable (${module.reason})`;
    const setupTagDetail =
      module.loaded && module.name === "setup-agentplane" && !setupTagConfirmed
        ? `; setupTag=${module.setupTag?.status ?? "missing"}`
        : "";
    failures.push(
      `external distribution ${module.name} not confirmed (${detail}${setupTagDetail})`,
    );
  }

  const success = failures.length === 0;

  return {
    schemaVersion: 1,
    success,
    reasonCode: success ? "publish_succeeded" : "publish_incomplete",
    message: success
      ? `Publish result recorded for ${args.tag} (${args.version}) at ${args.sha}.`
      : `Publish result for ${args.tag} is incomplete: ${failures.join("; ")}.`,
    nextAction: success
      ? "Use this artifact as the canonical post-publish outcome for the release SHA."
      : "Review the failures array and rerun publish recovery only after the missing publish steps are resolved.",
    sha: assertNonEmpty(args.sha, "release SHA"),
    version: assertNonEmpty(args.version, "version"),
    tag: assertNonEmpty(args.tag, "tag"),
    releaseReady: {
      runId: args.releaseReadyRunId ? String(args.releaseReadyRunId) : null,
    },
    distribution: args.distribution ?? {
      requested: false,
      loaded: false,
      path: null,
      reason: "not_requested",
      manifest: null,
    },
    external: args.external ?? {
      requested: false,
      modules: [],
    },
    packages: {
      core,
      recipes,
      cli,
    },
    checks: {
      npmSmoke: {
        passed: smokePassed,
        outcome: smokeOutcome,
      },
      ghcr: {
        published: ghcrPublished,
        outcome: ghcrOutcome,
      },
      tag: {
        ensured: tagEnsured,
        outcome: tagOutcome,
        existed: args.tagExists,
      },
      githubRelease: {
        created: releaseCreated,
        outcome: releaseOutcome,
      },
    },
    failures,
    job: {
      status: jobStatus,
      workflow: process.env.GITHUB_WORKFLOW ?? null,
      runId: process.env.GITHUB_RUN_ID ?? null,
      runAttempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
      eventName: process.env.GITHUB_EVENT_NAME ?? null,
    },
  };
}

async function loadDistributionManifest(filePath) {
  if (!filePath) {
    return {
      requested: false,
      loaded: false,
      path: null,
      reason: "not_requested",
      manifest: null,
    };
  }
  try {
    const manifest = JSON.parse(await readFile(filePath, "utf8"));
    return {
      requested: true,
      loaded: true,
      path: filePath,
      reason: "loaded",
      manifest: {
        schemaVersion: manifest.schemaVersion ?? null,
        manifestKind: manifest.manifestKind ?? null,
        version: manifest.version ?? null,
        tag: manifest.tag ?? null,
        sha: manifest.sha ?? null,
        releaseAssets: Array.isArray(manifest.releaseAssets)
          ? manifest.releaseAssets.map((asset) => ({
              name: asset?.name ?? null,
              kind: asset?.kind ?? null,
              sha256: asset?.sha256 ?? null,
              url: asset?.url ?? null,
            }))
          : [],
        channels:
          manifest.channels && typeof manifest.channels === "object" ? manifest.channels : {},
      },
    };
  } catch (error) {
    return {
      requested: true,
      loaded: false,
      path: filePath,
      reason: error instanceof Error ? error.message : String(error),
      manifest: null,
    };
  }
}

async function loadExternalResult(filePath) {
  try {
    const payload = JSON.parse(await readFile(filePath, "utf8"));
    return {
      requested: true,
      loaded: true,
      path: filePath,
      name: payload.module ?? path.basename(filePath),
      repository: payload.repository ?? null,
      status: payload.status ?? "unknown",
      reasonCode: payload.reasonCode ?? null,
      prUrl: payload.prUrl ?? null,
      branch: payload.branch ?? null,
      metadata: payload.metadata ?? null,
      mergeAttempts: Array.isArray(payload.mergeAttempts) ? payload.mergeAttempts : [],
      verification: payload.verification ?? null,
      setupTag: payload.setupTag ?? null,
      nextAction: payload.nextAction ?? null,
    };
  } catch (error) {
    return {
      requested: true,
      loaded: false,
      path: filePath,
      name: path.basename(filePath),
      repository: null,
      status: "unavailable",
      reasonCode: "external_result_unavailable",
      reason: error instanceof Error ? error.message : String(error),
      prUrl: null,
      branch: null,
      metadata: null,
      nextAction: null,
    };
  }
}

async function loadExternalResults(paths) {
  if (!Array.isArray(paths) || paths.length === 0) {
    return {
      requested: false,
      modules: [],
    };
  }
  return {
    requested: true,
    modules: await Promise.all(paths.map((filePath) => loadExternalResult(filePath))),
  };
}

async function runPublishResultManifest(argv) {
  const args = parsePublishResultArgs(argv);
  if (args.help) {
    process.stdout.write(`${publishResultUsage()}\n`);
    return;
  }
  const [distribution, external] = await Promise.all([
    loadDistributionManifest(args.distributionManifestPath),
    loadExternalResults(args.externalResultPaths),
  ]);
  const manifest = buildPublishResultManifest({ ...args, distribution, external });
  if (args.outPath) {
    await mkdir(path.dirname(args.outPath), { recursive: true });
    await writeFile(args.outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  }
  if (args.json) {
    process.stdout.write(`${JSON.stringify(manifest)}\n`);
    return;
  }
  process.stdout.write(`${manifest.message}\n`);
  process.stdout.write(`State: ${manifest.success ? "success" : "incomplete"}\n`);
  process.stdout.write(`Reason: ${manifest.reasonCode}\n`);
  process.stdout.write(`Next action: ${manifest.nextAction}\n`);
}

function releaseReadyUsage() {
  return [
    "Usage: node scripts/manifest.mjs release-ready [options]",
    "",
    "Inspect the current checkout and emit a deterministic release-ready manifest.",
    "",
    "Options:",
    "  --out <path>           Write the manifest JSON to this path",
    "  --sha <git-sha>        Exact release SHA to record (default: $GITHUB_SHA)",
    "  --ref <git-ref>        Git ref to record (default: $GITHUB_REF)",
    "  --check-registry       Snapshot npm published-state metadata when possible",
    "  --json                 Emit machine-readable JSON to stdout",
    "  --help, -h             Show this help text",
  ].join("\n");
}

function parseReleaseReadyArgs(argv) {
  const out = {
    outPath: null,
    sha: process.env.GITHUB_SHA ?? null,
    ref: process.env.GITHUB_REF ?? null,
    checkRegistry: false,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--out") {
      out.outPath = path.resolve(argv[index + 1] ?? "");
      index += 1;
      continue;
    }
    if (arg === "--sha") {
      out.sha = argv[index + 1] ?? out.sha;
      index += 1;
      continue;
    }
    if (arg === "--ref") {
      out.ref = argv[index + 1] ?? out.ref;
      index += 1;
      continue;
    }
    if (arg === "--check-registry") {
      out.checkRegistry = true;
      continue;
    }
    if (arg === "--json") {
      out.json = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      out.help = true;
      continue;
    }
    throw new Error(`unknown argument: ${arg}`);
  }

  return out;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readPackageVersion(filePath) {
  const raw = await readJson(filePath);
  return assertNonEmpty(raw.version, `version in ${filePath}`);
}

async function readReleaseWorkspace(repoRoot) {
  const corePackagePath = path.join(repoRoot, "packages", "core", "package.json");
  const cliPackagePath = path.join(repoRoot, "packages", "agentplane", "package.json");
  const recipesPackagePath = path.join(repoRoot, "packages", "recipes", "package.json");
  const cliPackage = await readJson(cliPackagePath);
  const [coreVersion, cliVersion, recipesVersion] = await Promise.all([
    readPackageVersion(corePackagePath),
    readPackageVersion(cliPackagePath),
    readPackageVersion(recipesPackagePath),
  ]);
  const coreDependencyVersion =
    typeof cliPackage.dependencies?.["@agentplaneorg/core"] === "string"
      ? cliPackage.dependencies["@agentplaneorg/core"].trim()
      : "";
  const recipesDependencyVersion =
    typeof cliPackage.dependencies?.["@agentplaneorg/recipes"] === "string"
      ? cliPackage.dependencies["@agentplaneorg/recipes"].trim()
      : "";

  return {
    coreVersion,
    cliVersion,
    recipesVersion,
    coreDependencyVersion,
    recipesDependencyVersion,
    tag: `v${cliVersion}`,
    notesPath: path.join(repoRoot, "docs", "releases", `v${cliVersion}.md`),
  };
}

async function fileExists(filePath) {
  try {
    await readFile(filePath, "utf8");
    return true;
  } catch {
    return false;
  }
}

async function probeNpmPublished(pkgSpec, repoRoot) {
  try {
    const result = await execFileAsync("npm", ["view", pkgSpec, "version"], {
      cwd: repoRoot,
      env: process.env,
      maxBuffer: 20 * 1024 * 1024,
    });
    return {
      published: true,
      detail: String(result.stdout ?? "").trim(),
    };
  } catch (error) {
    const stdout = String(error?.stdout ?? "").trim();
    const stderr = String(error?.stderr ?? "").trim();
    const detail = `${stderr}\n${stdout}`.trim().replaceAll(/\n+/gu, "\n");
    if (/E404|404|not in this registry|No match found/iu.test(detail)) {
      return {
        published: false,
        detail,
      };
    }
    return {
      published: null,
      detail: detail || "npm view failed unexpectedly",
    };
  }
}

function checkReleaseTaskRegistry(repoRoot) {
  try {
    checkTaskState(repoRoot, { releaseReady: true, quiet: true, allowActiveReleaseTask: true });
    return {
      ready: true,
      reasonCode: "ready",
      message: "Task registry is release-ready.",
    };
  } catch (error) {
    return {
      ready: false,
      reasonCode: "task_registry_not_release_ready",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

async function buildRegistrySnapshot(repoRoot, version, enabled) {
  if (!enabled) {
    return {
      checked: false,
      status: "skipped",
      corePublished: null,
      recipesPublished: null,
      cliPublished: null,
      detail: "registry snapshot was not requested",
    };
  }

  const [core, recipes, cli] = await Promise.all([
    probeNpmPublished(`@agentplaneorg/core@${version}`, repoRoot),
    probeNpmPublished(`@agentplaneorg/recipes@${version}`, repoRoot),
    probeNpmPublished(`agentplane@${version}`, repoRoot),
  ]);
  if (core.published === null || recipes.published === null || cli.published === null) {
    return {
      checked: false,
      status: "unavailable",
      corePublished: core.published,
      recipesPublished: recipes.published,
      cliPublished: cli.published,
      detail: [core.detail, recipes.detail, cli.detail].filter(Boolean).join("\n"),
    };
  }

  return {
    checked: true,
    status: "checked",
    corePublished: core.published,
    recipesPublished: recipes.published,
    cliPublished: cli.published,
    detail: [core.detail, recipes.detail, cli.detail].filter(Boolean).join("\n"),
  };
}

async function buildReleaseReadyManifest(repoRoot, args) {
  const workspace = await readReleaseWorkspace(repoRoot);
  const notesPresent = await fileExists(workspace.notesPath);
  const parityAligned =
    workspace.coreVersion === workspace.cliVersion &&
    workspace.recipesVersion === workspace.cliVersion &&
    workspace.coreDependencyVersion === workspace.coreVersion &&
    workspace.recipesDependencyVersion === workspace.recipesVersion;
  const taskRegistry = checkReleaseTaskRegistry(repoRoot);
  const ready = parityAligned && notesPresent && taskRegistry.ready;
  let reasonCode = "ready";
  if (parityAligned) {
    if (notesPresent) {
      if (!taskRegistry.ready) reasonCode = taskRegistry.reasonCode;
    } else {
      reasonCode = "release_notes_missing";
    }
  } else {
    reasonCode = "release_version_parity_drift";
  }
  const message =
    reasonCode === "ready"
      ? `Release-ready manifest emitted for ${workspace.tag} at ${workspace.cliVersion}.`
      : reasonCode === "release_notes_missing"
        ? `Release notes are missing for ${workspace.tag}.`
        : reasonCode === "task_registry_not_release_ready"
          ? `Task registry is not release-ready: ${taskRegistry.message}`
          : `Release parity drift prevents a release-ready manifest: core=${workspace.coreVersion}, recipes=${workspace.recipesVersion}, agentplane=${workspace.cliVersion}, coreDependency=${workspace.coreDependencyVersion || "missing"}, recipesDependency=${workspace.recipesDependencyVersion || "missing"}.`;
  const nextAction =
    reasonCode === "ready"
      ? "Use this manifest as the only auto-publish input for the exact release SHA."
      : reasonCode === "release_notes_missing"
        ? `Write ${path.relative(repoRoot, workspace.notesPath)} before treating this SHA as release-ready.`
        : reasonCode === "task_registry_not_release_ready"
          ? "Finish or close active task records before treating this SHA as release-ready."
          : "Restore package version parity before treating this SHA as release-ready.";

  return {
    schemaVersion: 1,
    ready,
    reasonCode,
    message,
    nextAction,
    sha: typeof args.sha === "string" ? args.sha.trim() || null : null,
    ref: typeof args.ref === "string" ? args.ref.trim() || null : null,
    version: workspace.cliVersion,
    tag: workspace.tag,
    notesPath: path.relative(repoRoot, workspace.notesPath),
    packages: {
      coreVersion: workspace.coreVersion,
      recipesVersion: workspace.recipesVersion,
      cliVersion: workspace.cliVersion,
      coreDependencyVersion: workspace.coreDependencyVersion || null,
      recipesDependencyVersion: workspace.recipesDependencyVersion || null,
    },
    taskRegistry,
    registry: await buildRegistrySnapshot(repoRoot, workspace.cliVersion, args.checkRegistry),
    source: {
      workflow: process.env.GITHUB_WORKFLOW ?? null,
      runId: process.env.GITHUB_RUN_ID ?? null,
      runAttempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
      eventName: process.env.GITHUB_EVENT_NAME ?? null,
      generatedAt: new Date().toISOString(),
    },
  };
}

async function runReleaseReadyManifest(argv) {
  const args = parseReleaseReadyArgs(argv);
  if (args.help) {
    process.stdout.write(`${releaseReadyUsage()}\n`);
    return;
  }
  const repoRoot = process.cwd();
  const manifest = await buildReleaseReadyManifest(repoRoot, args);
  if (args.outPath) {
    await mkdir(path.dirname(args.outPath), { recursive: true });
    await writeFile(args.outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  }
  if (args.json) {
    process.stdout.write(`${JSON.stringify(manifest)}\n`);
    return;
  }
  process.stdout.write(`${manifest.message}\n`);
  process.stdout.write(`State: ${manifest.ready ? "ready" : "not_ready"}\n`);
  process.stdout.write(`Reason: ${manifest.reasonCode}\n`);
  process.stdout.write(`Next action: ${manifest.nextAction}\n`);
}

async function main() {
  const top = parseTopLevel(process.argv.slice(2));
  if (top.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (top.command === "build") {
    await runBuildManifest(top.args);
    return;
  }
  if (top.command === "sanitize") {
    await runSanitizeManifest(top.args);
    return;
  }
  if (top.command === "publish-result") {
    await runPublishResultManifest(top.args);
    return;
  }
  if (top.command === "release-ready") {
    await runReleaseReadyManifest(top.args);
    return;
  }
  throw new Error(`unknown manifest command: ${String(top.command ?? "")}`);
}

await main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
