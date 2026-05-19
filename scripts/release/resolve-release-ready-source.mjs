import {
  resolveGithubApiBase,
  resolveGithubRepo,
  resolveGithubToken,
} from "../lib/github-actions-workflow-status.mjs";
import { resolveReleaseReadySource } from "../lib/release-ready-source.mjs";
import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

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
    "  --wait                 Wait for an in-progress matching workflow run before resolving",
    "  --timeout-ms <ms>      Maximum wait time for --wait (default: 900000)",
    "  --poll-interval-ms <ms> Poll interval for --wait (default: 15000)",
    "  --json                 Emit machine-readable output",
    "  --help, -h             Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["repo", "workflow", "sha", "run-id", "artifact", "timeout-ms", "poll-interval-ms"],
    booleanFlags: ["json", "help", "wait"],
    aliases: { h: "help" },
  });
  return {
    repo: flags.repo,
    workflow: flags.workflow ?? "ci.yml",
    sha: flags.sha ?? process.env.GITHUB_SHA,
    runId: flags["run-id"] ?? null,
    artifactName: flags.artifact ?? "release-ready",
    wait: flags.wait === true,
    timeoutMs: Number.parseInt(String(flags["timeout-ms"] ?? "900000"), 10),
    pollIntervalMs: Number.parseInt(String(flags["poll-interval-ms"] ?? "15000"), 10),
    json: flags.json === true,
    help: flags.help === true,
  };
}

function assertNonEmpty(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    throw new Error(`Missing required ${label}.`);
  }
  return text;
}

const main = defineScript({
  name: "resolve-release-ready-source",
  async run({ argv }) {
    const args = parseArgs(argv);
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
      wait: args.wait,
      timeoutMs: Number.isFinite(args.timeoutMs) ? args.timeoutMs : 900_000,
      pollIntervalMs: Number.isFinite(args.pollIntervalMs) ? args.pollIntervalMs : 15_000,
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
  },
});

runScriptMain(main);
