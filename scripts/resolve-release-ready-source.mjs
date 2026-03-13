import {
  classifyWorkflowState,
  listWorkflowRunArtifacts,
  listWorkflowRuns,
  resolveGithubApiBase,
  resolveGithubRepo,
  resolveGithubToken,
  selectLatestRun,
} from "./lib/github-actions-workflow-status.mjs";

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

function buildOutcome({ state, workflow, headSha, artifactName, repo, run, artifact }) {
  switch (state) {
    case "ready_artifact_available": {
      return {
        ok: true,
        state,
        message: `Resolved ${artifactName} from workflow ${workflow} for ${headSha} in ${repo}.`,
        run,
        artifact,
      };
    }
    case "ready_artifact_missing": {
      return {
        ok: false,
        state,
        message: `Workflow ${workflow} succeeded for ${headSha}, but artifact ${artifactName} is missing.`,
        nextAction:
          "Treat this SHA as not release-ready. Re-run Core CI after the release-ready job exists or pick a newer release SHA.",
        run,
        artifact: null,
      };
    }
    case "workflow_not_success": {
      return {
        ok: false,
        state,
        message: `Workflow ${workflow} is not successfully completed for ${headSha} (status=${run?.status ?? "unknown"}, conclusion=${run?.conclusion ?? "unknown"}).`,
        nextAction:
          "Use a successful Core CI run for this SHA, or dispatch publish against a newer recovery SHA with a release-ready artifact.",
        run,
        artifact: null,
      };
    }
    default: {
      return {
        ok: false,
        state: "workflow_missing",
        message: `No workflow ${workflow} run was found for ${headSha} in ${repo}.`,
        nextAction:
          "Run Core CI for the exact release SHA first; publish must consume the corresponding release-ready artifact.",
        run: null,
        artifact: null,
      };
    }
  }
}

async function resolveRun({ apiBase, repo, workflow, headSha, runId, token }) {
  if (runId) {
    return {
      state: "success",
      run: {
        id: Number.parseInt(assertNonEmpty(runId, "workflow run id"), 10),
        status: "completed",
        conclusion: "success",
        url: "",
        headSha,
      },
    };
  }

  const runs = await listWorkflowRuns({
    apiBase,
    repo,
    workflow,
    headSha,
    token,
  });
  const latestRun = selectLatestRun(runs);
  if (!latestRun) {
    return {
      state: "workflow_missing",
      run: null,
    };
  }

  const state = classifyWorkflowState(latestRun);
  if (state !== "success") {
    return {
      state: "workflow_not_success",
      run: latestRun,
    };
  }

  return {
    state: "success",
    run: latestRun,
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
  const headSha = assertNonEmpty(args.sha, "head SHA");
  const artifactName = assertNonEmpty(args.artifactName, "artifact name");

  const runResult = await resolveRun({
    apiBase,
    repo,
    workflow: args.workflow,
    headSha,
    runId: args.runId,
    token,
  });

  if (runResult.state !== "success" || !runResult.run) {
    const outcome = buildOutcome({
      state: runResult.state,
      workflow: args.workflow,
      headSha,
      artifactName,
      repo,
      run: runResult.run,
      artifact: null,
    });
    if (args.json) {
      process.stdout.write(`${JSON.stringify(outcome)}\n`);
    } else {
      process.stdout.write(`${outcome.message}\n`);
      process.stdout.write(`Next action: ${outcome.nextAction}\n`);
    }
    process.exitCode = 1;
    return;
  }

  const artifacts = await listWorkflowRunArtifacts({
    apiBase,
    repo,
    runId: runResult.run.id,
    token,
  });
  const artifact = artifacts.find((item) => item.name === artifactName) ?? null;
  const outcome = buildOutcome({
    state: artifact ? "ready_artifact_available" : "ready_artifact_missing",
    workflow: args.workflow,
    headSha,
    artifactName,
    repo,
    run: runResult.run,
    artifact,
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
