import path from "node:path";

function summary(truthLevel, value) {
  return { ...value, truthLevel };
}

export function deriveRecoverySummary(report, args) {
  if (
    report.current.github.checked &&
    report.current.github.publishResult.state === "available" &&
    report.current.github.publishResult.success === true &&
    report.current.github.coreCi.state === "completed_not_success"
  ) {
    return summary("canonical_artifact", {
      state: "release_already_published_with_red_core_ci",
      likelyCause:
        "the canonical publish-result artifact confirms publish success for the release SHA, but sibling Core CI completed red on the same commit",
      nextAction:
        "Do not rerun publish for this version. Fix the failing Core CI issue on a follow-up commit, then use workflow_dispatch publish only if a newer recovery SHA still needs publication.",
    });
  }

  if (
    report.current.github.checked &&
    report.current.github.publishResult.state === "available" &&
    report.current.github.publishResult.success === false
  ) {
    return summary("canonical_artifact", {
      state: "release_publish_workflow_failed",
      likelyCause:
        "the canonical publish-result artifact reports an incomplete publish outcome for the release SHA",
      nextAction:
        report.current.github.publishResult.nextAction ||
        "Inspect the publish-result artifact and publish workflow logs before retrying npm publication for any recovery SHA.",
    });
  }

  if (
    report.current.github.checked &&
    report.current.github.publish.state === "success" &&
    report.current.github.coreCi.state === "completed_not_success"
  ) {
    return summary("github_observed", {
      state: "release_already_published_with_red_core_ci",
      likelyCause:
        "the GitHub publish workflow already succeeded for the release SHA, but sibling Core CI completed red on the same commit",
      nextAction:
        "Do not rerun publish for this version. Fix the failing Core CI issue on a follow-up commit, then use workflow_dispatch publish only if a newer recovery SHA still needs publication.",
    });
  }

  if (
    report.current.github.checked &&
    report.current.github.releaseReady.state === "ready_artifact_available" &&
    report.current.github.publish.state !== "success"
  ) {
    return summary("github_observed", {
      state: "release_ready_but_not_published",
      likelyCause:
        "a successful Core CI run already produced the release-ready artifact for this SHA, but the GitHub publish workflow has not completed successfully for it",
      nextAction:
        "Inspect the publish workflow history for this SHA; if no publish run succeeded, use workflow_dispatch publish against the same release-ready SHA.",
    });
  }

  if (
    report.current.github.checked &&
    report.current.github.releaseReady.state === "ready_artifact_missing"
  ) {
    return summary("canonical_artifact", {
      state: "release_ready_artifact_missing",
      likelyCause:
        "the release SHA does not have the canonical release-ready artifact, so publish should not proceed from this commit",
      nextAction:
        "Use a newer SHA that produced the release-ready artifact, or rerun Core CI after the release-ready job exists before attempting publish recovery.",
    });
  }

  if (report.current.github.checked && report.current.github.publish.state === "success") {
    return summary("github_observed", {
      state: "release_publish_already_succeeded",
      likelyCause:
        "the GitHub publish workflow already completed successfully for the release SHA, so this is not an unpublished-release state",
      nextAction:
        "Do not rerun publish unless registry checks prove the target version is still missing from npm.",
    });
  }

  if (
    report.current.github.checked &&
    report.current.github.publish.state === "completed_not_success"
  ) {
    return summary("github_observed", {
      state: "release_publish_workflow_failed",
      likelyCause:
        "the GitHub publish workflow for the release SHA completed without success, so release recovery should inspect that workflow directly",
      nextAction:
        "Inspect the failed publish workflow run, fix the blocking issue, and retry publish only after Core CI is green for the intended recovery SHA.",
    });
  }

  if (report.current.registry.checked && report.current.registry.status === "blocked") {
    return summary("registry_observed", {
      state: "release_npm_version_burned",
      likelyCause:
        "the target npm version is already unavailable for publish, so the prepared release plan cannot complete safely",
      nextAction:
        "Pick a new patch version, rerun `agentplane release plan`, and regenerate release notes for the new target tag before retrying publish.",
    });
  }

  if (
    report.current.localTagPresent &&
    report.current.remote.configured &&
    !report.current.remote.tagPresent
  ) {
    return summary("local_state", {
      state: "release_committed_locally_not_pushed",
      likelyCause:
        "the release commit and local tag were created, but the push step did not complete against the configured remote",
      nextAction: `If this release is correct, run: git push ${args.remote} HEAD && git push ${args.remote} ${report.target.nextTag}`,
    });
  }

  if (report.current.localTagPresent && !report.current.remote.configured) {
    return summary("local_state", {
      state: "release_created_locally_without_remote",
      likelyCause:
        "release apply completed local mutation, but there is no configured remote to receive the release refs",
      nextAction: `Configure ${args.remote}, then push HEAD and ${report.target.nextTag} intentionally once the remote target is confirmed.`,
    });
  }

  if (report.current.coreVersion === report.target.nextVersion && !report.current.localTagPresent) {
    return summary("local_state", {
      state: "release_versions_bumped_without_local_tag",
      likelyCause:
        "version files were bumped to the target release, but the local tag creation step never completed",
      nextAction: `Inspect the recent release commit, then either create ${report.target.nextTag} intentionally or rerun \`agentplane release plan\` from the current repo state.`,
    });
  }

  if (
    report.current.coreVersion !== report.target.prevVersion &&
    report.current.coreVersion !== report.target.nextVersion
  ) {
    return summary("local_state", {
      state: "release_plan_drifted",
      likelyCause:
        "the repository version moved away from both the release-plan baseline and target, so the current plan is no longer authoritative",
      nextAction:
        "Run `agentplane release plan` again and use the new plan as the only recovery baseline.",
    });
  }

  if (
    report.current.agentplaneVersion !== report.current.coreVersion ||
    report.current.coreDependencyVersion !== report.current.coreVersion
  ) {
    return summary("local_state", {
      state: "release_version_parity_drift",
      likelyCause:
        "release-related package versions no longer agree, which usually means a partial local mutation or manual edit interrupted parity",
      nextAction:
        "Restore package version parity first, then rerun `agentplane release plan` before any publish or push step.",
    });
  }

  if (!report.current.notesPresent) {
    return summary("local_state", {
      state: "release_notes_missing",
      likelyCause:
        "the release plan exists, but the release notes artifact for the target tag was never written into docs/releases",
      nextAction: `Write ${path.relative(report.repoRoot, report.current.notesPath)} before retrying release apply or push recovery.`,
    });
  }

  return summary("inferred", {
    state: "release_recovery_clean",
    likelyCause: "no partial release state was detected for the latest release plan",
    nextAction:
      "Continue with the normal release flow or inspect the latest apply report if recovery is still needed.",
  });
}

function formatWorkflowStatus(result) {
  if (result.state === "skipped") return "skipped";
  if (result.state === "missing") return "missing";
  if (result.state === "completed_not_success") {
    return `completed_not_success (conclusion=${result.conclusion ?? "unknown"})`;
  }
  if (result.state === "success") return "success";
  return result.status ? `${result.state} (status=${result.status})` : result.state;
}

export function renderText(report) {
  const lines = [
    "Release recovery report",
    `State: ${report.summary.state}`,
    `Truth level: ${report.summary.truthLevel ?? "unknown"}`,
    `Likely cause: ${report.summary.likelyCause}`,
    `Next safe action: ${report.summary.nextAction}`,
    "",
    `Plan dir: ${path.relative(report.repoRoot, report.planDir) || "."}`,
    `Target: ${report.target.nextTag} / ${report.target.nextVersion} (prev: ${report.target.prevTag ?? "none"} / ${report.target.prevVersion})`,
    `Current versions: core=${report.current.coreVersion}, agentplane=${report.current.agentplaneVersion}, dependency=${report.current.coreDependencyVersion || "missing"}`,
    `Release notes: ${report.current.notesPresent ? "present" : "missing"} (${path.relative(report.repoRoot, report.current.notesPath)})`,
    `Local tag ${report.target.nextTag}: ${report.current.localTagPresent ? "present" : "missing"}`,
    `Local tag commit: ${report.current.localTagCommit ?? "unknown"}`,
    `Remote ${report.current.remote.name}: ${report.current.remote.configured ? "configured" : "missing"}`,
    `Remote tag ${report.current.remote.name}/${report.target.nextTag}: ${report.current.remote.tagPresent ? "present" : "missing"}`,
    `Apply report: ${report.current.apply.present ? `present (${report.current.apply.path})` : "missing"}`,
    `Apply report matches plan: ${report.current.apply.matchesPlan ? "yes" : "no"}`,
    `Apply report commit: ${report.current.apply.commitHash ?? "unknown"}`,
    `Registry check: ${report.current.registry.checked ? report.current.registry.status : "skipped"}`,
    `GitHub check: ${report.current.github.checked ? "enabled" : "skipped"}`,
    `GitHub repo: ${report.current.github.repo ?? "unknown"}`,
    `GitHub release SHA: ${report.current.github.releaseSha ?? "unknown"}`,
    `GitHub release-ready: ${report.current.github.releaseReady.state}`,
    `GitHub release-ready run id: ${report.current.github.releaseReady.runId ?? "unknown"}`,
    `GitHub Core CI (${report.current.github.coreWorkflow}): ${formatWorkflowStatus(report.current.github.coreCi)}`,
    `GitHub Publish (${report.current.github.publishWorkflow}): ${formatWorkflowStatus(report.current.github.publish)}`,
    `GitHub publish-result: ${report.current.github.publishResult.state}${report.current.github.publishResult.reasonCode ? ` (reason=${report.current.github.publishResult.reasonCode})` : ""}`,
    "",
    "Findings:",
  ];

  if (report.current.github.coreCi.url) {
    lines.push(`Core CI URL: ${report.current.github.coreCi.url}`);
  }
  if (report.current.github.releaseReady.url) {
    lines.push(`Release-ready URL: ${report.current.github.releaseReady.url}`);
  }
  if (report.current.github.publish.url) {
    lines.push(`Publish URL: ${report.current.github.publish.url}`);
  }

  for (const finding of report.findings) {
    lines.push(`- [${finding.level.toUpperCase()}] ${finding.code}: ${finding.message}`);
    if (finding.nextAction) lines.push(`  Next: ${finding.nextAction}`);
  }

  return `${lines.join("\n")}\n`;
}
