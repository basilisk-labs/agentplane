import {
  resolveGithubApiBase,
  resolveGithubRepo,
  resolveGithubToken,
  waitForWorkflowConclusion,
} from "./lib/github-actions-workflow-status.mjs";

function usage() {
  return [
    "Usage: node scripts/check-core-ci-status.mjs [options]",
    "",
    "Require a successful Core CI workflow run for the exact release SHA before npm publish proceeds.",
    "",
    "Options:",
    "  --repo <owner/name>    GitHub repository slug (default: $GITHUB_REPOSITORY)",
    "  --workflow <file>      Workflow file or ID to inspect (default: ci.yml)",
    "  --sha <git-sha>        Commit SHA to require a green run for (default: $GITHUB_SHA)",
    "  --timeout-ms <ms>      Max wait before failing (default: 1800000)",
    "  --poll-ms <ms>         Poll interval while Core CI is running (default: 5000)",
    "  --json                 Emit machine-readable output",
    "  --help, -h             Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const out = {
    repo: undefined,
    workflow: "ci.yml",
    sha: process.env.GITHUB_SHA,
    timeoutMs: 30 * 60 * 1000,
    pollMs: 5000,
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
    if (arg === "--timeout-ms") {
      out.timeoutMs = Number.parseInt(argv[index + 1] ?? "", 10);
      index += 1;
      continue;
    }
    if (arg === "--poll-ms") {
      out.pollMs = Number.parseInt(argv[index + 1] ?? "", 10);
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

function buildOutcome({ state, workflow, headSha, repo, run }) {
  if (state === "success") {
    return {
      ok: true,
      state,
      message: `Required workflow ${workflow} succeeded for ${headSha} in ${repo}.`,
      run,
    };
  }

  if (state === "completed_not_success") {
    return {
      ok: false,
      state,
      message: `Required workflow ${workflow} completed with conclusion=${run?.conclusion ?? "unknown"} for ${headSha}.`,
      nextAction:
        "Fix Core CI on the exact release SHA or dispatch publish against a newer recovery commit once Core CI is green.",
      run,
    };
  }

  if (state === "timeout") {
    return {
      ok: false,
      state,
      message: `Timed out waiting for workflow ${workflow} to finish for ${headSha}.`,
      nextAction: "Wait for Core CI to finish or inspect the stuck run before retrying publish.",
      run,
    };
  }

  return {
    ok: false,
    state: "missing",
    message: `No workflow ${workflow} run was found for ${headSha} in ${repo}.`,
    nextAction: "Ensure Core CI ran for the exact release SHA before attempting publish.",
    run,
  };
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
  const headSha = typeof args.sha === "string" ? args.sha.trim() : "";
  if (!headSha) {
    throw new Error("Missing required head SHA.");
  }
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs <= 0) {
    throw new Error("Invalid --timeout-ms value.");
  }
  if (!Number.isFinite(args.pollMs) || args.pollMs <= 0) {
    throw new Error("Invalid --poll-ms value.");
  }

  const result = await waitForWorkflowConclusion({
    apiBase,
    repo,
    workflow: args.workflow,
    headSha,
    token,
    timeoutMs: args.timeoutMs,
    pollMs: args.pollMs,
  });
  const outcome = buildOutcome({
    state: result.state,
    workflow: args.workflow,
    headSha,
    repo,
    run: result.run,
  });

  if (args.json) {
    process.stdout.write(`${JSON.stringify(outcome)}\n`);
  } else {
    process.stdout.write(`${outcome.message}\n`);
    if (outcome.run?.url) {
      process.stdout.write(`Run URL: ${outcome.run.url}\n`);
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
