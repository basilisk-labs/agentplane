import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function usage() {
  return [
    "Usage: node scripts/write-release-ready-manifest.mjs [options]",
    "",
    "Inspect the current checkout and emit a deterministic release-ready manifest.",
    "",
    "Options:",
    "  --out <path>           Write the manifest JSON to this path",
    "  --sha <git-sha>        Exact release SHA to record (default: $GITHUB_SHA)",
    "  --ref <git-ref>        Git ref to record (default: $GITHUB_REF)",
    "  --check-registry       Snapshot npm published-state metadata when possible",
    "  --json                 Emit machine-readable JSON to stdout",
    "  --help, -h            Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
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

function assertNonEmptyString(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`invalid ${label}`);
  return text;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readPackageVersion(filePath) {
  const raw = await readJson(filePath);
  return assertNonEmptyString(raw.version, `version in ${filePath}`);
}

async function readReleaseWorkspace(repoRoot) {
  const corePackagePath = path.join(repoRoot, "packages", "core", "package.json");
  const cliPackagePath = path.join(repoRoot, "packages", "agentplane", "package.json");
  const cliPackage = await readJson(cliPackagePath);
  const [coreVersion, cliVersion] = await Promise.all([
    readPackageVersion(corePackagePath),
    readPackageVersion(cliPackagePath),
  ]);
  const coreDependencyVersion =
    typeof cliPackage.dependencies?.["@agentplaneorg/core"] === "string"
      ? cliPackage.dependencies["@agentplaneorg/core"].trim()
      : "";

  return {
    coreVersion,
    cliVersion,
    coreDependencyVersion,
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

async function buildRegistrySnapshot(repoRoot, version, enabled) {
  if (!enabled) {
    return {
      checked: false,
      status: "skipped",
      corePublished: null,
      cliPublished: null,
      detail: "registry snapshot was not requested",
    };
  }

  const [core, cli] = await Promise.all([
    probeNpmPublished(`@agentplaneorg/core@${version}`, repoRoot),
    probeNpmPublished(`agentplane@${version}`, repoRoot),
  ]);
  if (core.published === null || cli.published === null) {
    return {
      checked: false,
      status: "unavailable",
      corePublished: core.published,
      cliPublished: cli.published,
      detail: [core.detail, cli.detail].filter(Boolean).join("\n"),
    };
  }

  return {
    checked: true,
    status: "checked",
    corePublished: core.published,
    cliPublished: cli.published,
    detail: [core.detail, cli.detail].filter(Boolean).join("\n"),
  };
}

async function buildManifest(repoRoot, args) {
  const workspace = await readReleaseWorkspace(repoRoot);
  const notesPresent = await fileExists(workspace.notesPath);
  const parityAligned =
    workspace.coreVersion === workspace.cliVersion &&
    workspace.coreDependencyVersion === workspace.coreVersion;
  const ready = parityAligned && notesPresent;
  const reasonCode = parityAligned
    ? notesPresent
      ? "ready"
      : "release_notes_missing"
    : "release_version_parity_drift";
  const message =
    reasonCode === "ready"
      ? `Release-ready manifest emitted for ${workspace.tag} at ${workspace.cliVersion}.`
      : reasonCode === "release_notes_missing"
        ? `Release notes are missing for ${workspace.tag}.`
        : `Release parity drift prevents a release-ready manifest: core=${workspace.coreVersion}, agentplane=${workspace.cliVersion}, dependency=${workspace.coreDependencyVersion || "missing"}.`;
  const nextAction =
    reasonCode === "ready"
      ? "Use this manifest as the only auto-publish input for the exact release SHA."
      : reasonCode === "release_notes_missing"
        ? `Write ${path.relative(repoRoot, workspace.notesPath)} before treating this SHA as release-ready.`
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
      cliVersion: workspace.cliVersion,
      coreDependencyVersion: workspace.coreDependencyVersion || null,
    },
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const repoRoot = process.cwd();
  const manifest = await buildManifest(repoRoot, args);

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

await main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
