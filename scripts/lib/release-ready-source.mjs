import {
  classifyWorkflowState,
  listWorkflowRunArtifacts,
  listWorkflowRuns,
  readWorkflowRun,
  selectLatestRun,
} from "./github-actions-workflow-status.mjs";

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
    case "workflow_run_sha_mismatch": {
      return {
        ok: false,
        state,
        message: `Workflow ${workflow} run ${run?.id ?? "unknown"} belongs to ${run?.headSha ?? "unknown"}, not requested ${headSha}.`,
        nextAction:
          "Use a successful Core CI run id for the exact release SHA, or omit --run-id and resolve the release-ready artifact by SHA.",
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
    const run = await readWorkflowRun({
      apiBase,
      repo,
      runId,
      token,
    });
    if (run.headSha !== headSha) {
      return {
        state: "workflow_run_sha_mismatch",
        run,
      };
    }

    const state = classifyWorkflowState(run);
    if (state !== "success") {
      return {
        state: "workflow_not_success",
        run,
      };
    }

    return {
      state: "success",
      run,
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

export async function resolveReleaseReadySource({
  apiBase,
  repo,
  workflow,
  headSha,
  runId,
  artifactName = "release-ready",
  token,
}) {
  const runResult = await resolveRun({
    apiBase,
    repo,
    workflow,
    headSha,
    runId,
    token,
  });

  if (runResult.state !== "success" || !runResult.run) {
    return buildOutcome({
      state: runResult.state,
      workflow,
      headSha,
      artifactName,
      repo,
      run: runResult.run,
      artifact: null,
    });
  }

  const artifacts = await listWorkflowRunArtifacts({
    apiBase,
    repo,
    runId: runResult.run.id,
    token,
  });
  const artifact = artifacts.find((item) => item.name === artifactName) ?? null;
  return buildOutcome({
    state: artifact ? "ready_artifact_available" : "ready_artifact_missing",
    workflow,
    headSha,
    artifactName,
    repo,
    run: runResult.run,
    artifact,
  });
}
