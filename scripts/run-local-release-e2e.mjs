import { execFile, spawn } from "node:child_process";
import { mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import {
  resolveGithubApiBase,
  resolveGithubRepo,
  resolveGithubToken,
} from "./lib/github-actions-workflow-status.mjs";
import { resolveReleaseReadySource } from "./lib/release-ready-source.mjs";

const execFileAsync = promisify(execFile);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

function usage() {
  return [
    "Usage: node scripts/run-local-release-e2e.mjs [options]",
    "",
    "Validate the current checkout against the canonical GitHub release-ready artifact",
    "for the exact release SHA, without performing npm publish.",
    "",
    "Options:",
    "  --sha <git-sha>        Exact release SHA to validate (default: current HEAD)",
    "  --repo <owner/name>    GitHub repository slug (default: $GITHUB_REPOSITORY)",
    "  --workflow <file>      Core CI workflow file or ID (default: ci.yml)",
    "  --run-id <id>          Optional explicit Core CI run id to validate first",
    "  --artifact <name>      Artifact name to download (default: release-ready)",
    "  --out-dir <path>       Output directory for local and downloaded manifests",
    "                        (default: .agentplane/.release/e2e-local)",
    "  --skip-prepublish      Skip `bun run release:prepublish` before GitHub checks",
    "  --json                 Emit machine-readable output",
    "  --help, -h             Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const out = {
    sha: null,
    repo: process.env.GITHUB_REPOSITORY ?? null,
    workflow: "ci.yml",
    runId: null,
    artifactName: "release-ready",
    outDir: path.resolve(".agentplane/.release/e2e-local"),
    skipPrepublish: false,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--sha") {
      out.sha = argv[index + 1] ?? out.sha;
      index += 1;
      continue;
    }
    if (arg === "--repo") {
      out.repo = argv[index + 1] ?? out.repo;
      index += 1;
      continue;
    }
    if (arg === "--workflow") {
      out.workflow = argv[index + 1] ?? out.workflow;
      index += 1;
      continue;
    }
    if (arg === "--run-id") {
      out.runId = argv[index + 1] ?? out.runId;
      index += 1;
      continue;
    }
    if (arg === "--artifact") {
      out.artifactName = argv[index + 1] ?? out.artifactName;
      index += 1;
      continue;
    }
    if (arg === "--out-dir") {
      out.outDir = path.resolve(argv[index + 1] ?? out.outDir);
      index += 1;
      continue;
    }
    if (arg === "--skip-prepublish") {
      out.skipPrepublish = true;
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

function assertNonEmpty(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    throw new Error(`Missing required ${label}.`);
  }
  return text;
}

async function run(cmd, args, options = {}) {
  return execFileAsync(cmd, args, {
    cwd: process.cwd(),
    env: process.env,
    maxBuffer: 50 * 1024 * 1024,
    ...options,
  });
}

function runInherited(cmd, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: process.cwd(),
      env,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(
        new Error(
          `${cmd} ${args.join(" ")} failed with code ${code ?? "null"} signal ${signal ?? "none"}`,
        ),
      );
    });
  });
}

async function git(args) {
  const result = await run("git", args);
  return String(result.stdout ?? "").trim();
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function checkGhInstalled() {
  try {
    await run("gh", ["--version"]);
  } catch (error) {
    const code = typeof error === "object" && error !== null ? error.code : null;
    if (code === "ENOENT") {
      throw new Error(
        "Missing required gh CLI. Install GitHub CLI before running local release E2E checks.",
      );
    }
    throw error;
  }
}

async function downloadArtifact({ repo, runId, artifactName, destination, token }) {
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  try {
    await run(
      "gh",
      [
        "run",
        "download",
        String(runId),
        "--repo",
        repo,
        "--name",
        artifactName,
        "--dir",
        destination,
      ],
      {
        env: {
          ...process.env,
          GITHUB_TOKEN: token,
          GH_TOKEN: token,
        },
      },
    );
  } catch (error) {
    const message =
      typeof error === "object" && error !== null && "stderr" in error
        ? String(error.stderr ?? "").trim()
        : "";
    throw new Error(
      message || `gh run download failed for run ${runId} and artifact ${artifactName}.`,
    );
  }
}

async function findFileByName(root, fileName) {
  const entries = await readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      const nested = await findFileByName(fullPath, fileName);
      if (nested) return nested;
      continue;
    }
    if (entry.isFile() && entry.name === fileName) {
      return fullPath;
    }
  }
  return null;
}

function compareManifest(localManifest, githubManifest, expectedSha) {
  const failures = [];
  if (!localManifest.ready) {
    failures.push(
      `local release-ready manifest is not ready (reason=${localManifest.reasonCode ?? "unknown"})`,
    );
  }
  if (!githubManifest.ready) {
    failures.push(
      `downloaded release-ready manifest is not ready (reason=${githubManifest.reasonCode ?? "unknown"})`,
    );
  }
  if (localManifest.sha !== expectedSha) {
    failures.push(`local manifest sha mismatch: ${localManifest.sha} !== ${expectedSha}`);
  }
  if (githubManifest.sha !== expectedSha) {
    failures.push(`downloaded manifest sha mismatch: ${githubManifest.sha} !== ${expectedSha}`);
  }
  if (localManifest.version !== githubManifest.version) {
    failures.push(
      `version mismatch: local=${localManifest.version} github=${githubManifest.version}`,
    );
  }
  if (localManifest.tag !== githubManifest.tag) {
    failures.push(`tag mismatch: local=${localManifest.tag} github=${githubManifest.tag}`);
  }
  return failures;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const expectedSha = args.sha
    ? assertNonEmpty(args.sha, "release SHA")
    : await git(["rev-parse", "HEAD"]);
  const headSha = await git(["rev-parse", "HEAD"]);
  if (expectedSha !== headSha) {
    throw new Error(
      `Exact checkout required: current HEAD is ${headSha}, but requested SHA is ${expectedSha}. Checkout the target commit first.`,
    );
  }

  const token = resolveGithubToken(process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN);
  const repo = resolveGithubRepo(args.repo);
  const apiBase = resolveGithubApiBase();
  await checkGhInstalled();

  if (!args.skipPrepublish) {
    process.stdout.write("== release:prepublish ==\n");
    await runInherited("bun", ["run", "release:prepublish"], process.env);
  }

  const gitRef = await git(["rev-parse", "--symbolic-full-name", "HEAD"]);
  const localDir = path.join(args.outDir, "local");
  const githubDir = path.join(args.outDir, "github");
  const localManifestPath = path.join(localDir, "release-ready.json");

  await rm(args.outDir, { recursive: true, force: true });
  await mkdir(localDir, { recursive: true });

  await run("node", [
    path.join(SCRIPT_DIR, "write-release-ready-manifest.mjs"),
    "--out",
    localManifestPath,
    "--sha",
    expectedSha,
    "--ref",
    gitRef,
    "--check-registry",
  ]);

  const releaseReady = await resolveReleaseReadySource({
    apiBase,
    repo,
    workflow: args.workflow,
    headSha: expectedSha,
    runId: args.runId,
    artifactName: args.artifactName,
    token,
  });
  if (!releaseReady.ok || !releaseReady.run?.id) {
    const message = [releaseReady.message, releaseReady.nextAction].filter(Boolean).join("\n");
    throw new Error(message);
  }

  await downloadArtifact({
    repo,
    runId: releaseReady.run.id,
    artifactName: args.artifactName,
    destination: githubDir,
    token,
  });

  const downloadedManifestPath = await findFileByName(githubDir, "release-ready.json");
  if (!downloadedManifestPath) {
    throw new Error(
      `Downloaded artifact ${args.artifactName} does not contain release-ready.json.`,
    );
  }

  const localManifest = await readJson(localManifestPath);
  const githubManifest = await readJson(downloadedManifestPath);
  const compareFailures = compareManifest(localManifest, githubManifest, expectedSha);
  if (compareFailures.length > 0) {
    throw new Error(`Local release E2E validation failed:\n- ${compareFailures.join("\n- ")}`);
  }

  const summary = {
    ok: true,
    sha: expectedSha,
    repo,
    workflow: args.workflow,
    artifactName: args.artifactName,
    runId: releaseReady.run.id,
    localManifestPath: path.relative(process.cwd(), localManifestPath),
    downloadedManifestPath: path.relative(process.cwd(), downloadedManifestPath),
    version: localManifest.version,
    tag: localManifest.tag,
    message: `Local release E2E passed for ${expectedSha} via run ${releaseReady.run.id}.`,
  };

  if (args.json) {
    process.stdout.write(`${JSON.stringify(summary)}\n`);
    return;
  }

  process.stdout.write(`${summary.message}\n`);
  process.stdout.write(`Local manifest: ${summary.localManifestPath}\n`);
  process.stdout.write(`Downloaded manifest: ${summary.downloadedManifestPath}\n`);
  process.stdout.write(`Version: ${summary.version}\n`);
  process.stdout.write(`Tag: ${summary.tag}\n`);
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
