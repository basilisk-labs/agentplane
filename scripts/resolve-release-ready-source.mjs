import {
  resolveGithubApiBase,
  resolveGithubRepo,
  resolveGithubToken,
} from "./lib/github-actions-workflow-status.mjs";
import { resolveReleaseReadySource } from "./lib/release-ready-source.mjs";

function usage() {
  return [
    "Usage: node scripts/resolve-release-ready-source.mjs [options]",
    "",
    "Resolve the successful Core CI run and release-ready artifact for an exact release SHA.",
    "",
    "Options:",
    "  --repo <owner/name>    GitHub repository slug (default: $GITHUB_REPOSITORY)",
    "  --workflow <file>      Workflow file or ID to inspect (default: ci.yml)",
    "  --sha <git-sha>        Commit SHA to resolve a release-ready artifact for",
    "  --run-id <id>          Explicit workflow run id to inspect first",
    "  --artifact <name>      Artifact name to require (default: release-ready)",
    "  --json                 Emit machine-readable output",
    "  --help, -h             Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const out = {
    repo: undefined,
    workflow: "ci.yml",
    sha: process.env.GITHUB_SHA,
    runId: null,
    artifactName: "release-ready",
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--repo") {
      out.repo = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--workflow") {
      out.workflow = argv[index + 1] ?? out.workflow;
      index += 1;
      continue;
    }
    if (arg === "--sha") {
      out.sha = argv[index + 1] ?? out.sha;
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const repo = resolveGithubRepo(args.repo);
  const token = resolveGithubToken();
  const apiBase = resolveGithubApiBase();
  const headSha = assertNonEmpty(args.sha, "head SHA");
  const artifactName = assertNonEmpty(args.artifactName, "artifact name");

  const outcome = await resolveReleaseReadySource({
    apiBase,
    repo,
    workflow: args.workflow,
    headSha,
    runId: args.runId,
    artifactName,
    token,
  });

  if (args.json) {
    process.stdout.write(`${JSON.stringify(outcome)}\n`);
  } else {
    process.stdout.write(`${outcome.message}\n`);
    if (outcome.run?.id) {
      process.stdout.write(`Run ID: ${outcome.run.id}\n`);
    }
    if (outcome.nextAction) {
      process.stdout.write(`Next action: ${outcome.nextAction}\n`);
    }
  }

  if (!outcome.ok) {
    process.exitCode = 1;
  }
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
