import {
  classifyWorkflowState,
  listWorkflowRunArtifacts,
  listWorkflowRuns,
  readWorkflowRun,
  selectLatestRun,
} from "./github-actions-workflow-status.mjs";

function releaseReadyArtifactAlias(headSha) {
  return `release-ready-${headSha}`;
}

function findReleaseReadyArtifact(artifacts, artifactName, headSha) {
  const alias = releaseReadyArtifactAlias(headSha);
  return (
    artifacts.find((item) => item.name === alias) ??
    artifacts.find((item) => item.name === artifactName) ??
    null
  );
}

function findReleaseReadyArtifactAlias(artifacts, headSha) {
  const alias = releaseReadyArtifactAlias(headSha);
  return artifacts.find((item) => item.name === alias) ?? null;
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
    case "workflow_wait_timeout": {
      return {
        ok: false,
        state,
        message: `Timed out waiting for workflow ${workflow} to complete successfully for ${headSha} in ${repo}.`,
        nextAction:
          "Wait for Core CI to finish, inspect the run if it is stuck, then retry publish for the same exact SHA.",
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

function isWaitableWorkflowState(state) {
  return new Set(["queued", "in_progress", "requested", "waiting", "pending"]).has(state);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      const artifacts = await listWorkflowRunArtifacts({
        apiBase,
        repo,
        runId: run.id,
        token,
      });
      const artifact = findReleaseReadyArtifactAlias(artifacts, headSha);
      if (artifact) {
        return {
          state: "success",
          run,
          artifact,
        };
      }
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

  const directRuns = await listWorkflowRuns({
    apiBase,
    repo,
    workflow,
    headSha,
    token,
  });
  const latestDirectRun = selectLatestRun(directRuns);
  let artifactMissingDirectRun = null;
  if (latestDirectRun) {
    const state = classifyWorkflowState(latestDirectRun);
    if (state === "success") {
      const directArtifact = findReleaseReadyArtifact(
        await listWorkflowRunArtifacts({
          apiBase,
          repo,
          runId: latestDirectRun.id,
          token,
        }),
        "release-ready",
        headSha,
      );
      if (directArtifact) {
        return {
          state: "success",
          run: latestDirectRun,
          artifact: directArtifact,
        };
      }
      artifactMissingDirectRun = latestDirectRun;
    } else {
      return {
        state: isWaitableWorkflowState(state) ? state : "workflow_not_success",
        run: latestDirectRun,
      };
    }
  }

  const dispatchRuns = await listWorkflowRuns({
    apiBase,
    repo,
    workflow,
    event: "workflow_dispatch",
    token,
  });

  const matches = [];
  for (const run of dispatchRuns) {
    if (classifyWorkflowState(run) !== "success") continue;
    const artifacts = await listWorkflowRunArtifacts({
      apiBase,
      repo,
      runId: run.id,
      token,
    });
    const artifact = findReleaseReadyArtifactAlias(artifacts, headSha);
    if (!artifact) continue;
    matches.push({ run, artifact });
  }

  const latestDispatchMatch =
    [...matches].toSorted((left, right) => {
      const leftTime = Date.parse(left.run.createdAt ?? "") || 0;
      const rightTime = Date.parse(right.run.createdAt ?? "") || 0;
      return rightTime - leftTime;
    })[0] ?? null;
  if (latestDispatchMatch) {
    return {
      state: "success",
      run: latestDispatchMatch.run,
      artifact: latestDispatchMatch.artifact,
    };
  }

  if (artifactMissingDirectRun) {
    return {
      state: "ready_artifact_missing",
      run: artifactMissingDirectRun,
    };
  }

  return {
    state: "workflow_missing",
    run: null,
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
  wait = false,
  timeoutMs = 15 * 60 * 1000,
  pollIntervalMs = 15 * 1000,
}) {
  const deadline = Date.now() + Math.max(0, timeoutMs);
  let runResult = null;
  for (;;) {
    runResult = await resolveRun({
      apiBase,
      repo,
      workflow,
      headSha,
      runId,
      token,
    });
    if (!wait || !isWaitableWorkflowState(runResult.state)) break;
    if (Date.now() >= deadline) {
      return buildOutcome({
        state: "workflow_wait_timeout",
        workflow,
        headSha,
        artifactName,
        repo,
        run: runResult.run,
        artifact: null,
      });
    }
    await sleep(Math.min(Math.max(1, pollIntervalMs), Math.max(1, deadline - Date.now())));
  }

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

  const artifact =
    runResult.artifact ??
    findReleaseReadyArtifact(
      await listWorkflowRunArtifacts({
        apiBase,
        repo,
        runId: runResult.run.id,
        token,
      }),
      artifactName,
      headSha,
    );
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
