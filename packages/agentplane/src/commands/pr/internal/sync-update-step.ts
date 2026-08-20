import path from "node:path";

import { CliError } from "../../../shared/errors.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../../shared/write-if-changed.js";
import {
  buildObservedChangeRequestMeta,
  buildUpdatedPrMeta,
  resolvePrBatchIncludedTaskIds,
  type PrMeta,
  withPrArtifactLifecycleState,
} from "../../shared/pr-meta.js";
import {
  buildGithubPrTitle,
  renderGithubPrBody,
  renderPrAutoSummary,
  renderPrReviewDocument,
  validateArtifactsLanguage,
} from "./review-template.js";
import { computePrDiffstat } from "./sync-branch.js";
import {
  resolveChangeRequestIdentity,
  shouldPersistObservedChangeRequestIdentity,
  tryLookupExistingChangeRequestByBranch,
  tryUpdateChangeRequest,
} from "./change-request-provider.js";
import { toRecordedGitHostIdentity, type GitHostIdentity } from "./git-host-identity.js";
import { digestPrDiffstatText } from "./freshness.js";
import type { PrSyncCommonState } from "./sync-model.js";

export async function runPrUpdateSync(common: PrSyncCommonState): Promise<{ meta: PrMeta }> {
  if (!common.baseBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: "Base branch could not be resolved (use `agentplane branch base set`).",
    });
  }
  const diffstat = await computePrDiffstat({
    gitRoot: common.resolved.gitRoot,
    baseBranch: common.baseBranch,
    branch: common.branch,
    prDir: common.prDir,
    tasksPath: common.tasksPath,
  });
  let nextMeta: PrMeta = buildUpdatedPrMeta({
    meta: common.existingMeta!,
    relatedTaskIds: common.relatedTaskIds,
    branch: common.branch,
    at: common.now,
    base: common.baseBranch,
    diffstatDigest: digestPrDiffstatText(diffstat ? `${diffstat}\n` : ""),
  });
  let identity: GitHostIdentity | null = null;
  try {
    identity = await resolveChangeRequestIdentity({
      gitRoot: common.resolved.gitRoot,
      branch: common.branch,
      recorded: common.existingMeta?.provider ?? null,
    });
  } catch (error) {
    // A recorded identity is a security boundary: drift must fail closed. Legacy
    // local-only packets without any publication remote remain refreshable.
    if (common.existingMeta?.provider) throw error;
  }
  if (identity) nextMeta.provider = toRecordedGitHostIdentity(identity);
  let observedChangeRequest = identity
    ? await tryLookupExistingChangeRequestByBranch({
        gitRoot: common.resolved.gitRoot,
        branch: common.branch,
        baseBranch: common.baseBranch,
        identity,
      })
    : null;
  if (shouldPersistObservedChangeRequestIdentity(observedChangeRequest)) {
    nextMeta = buildObservedChangeRequestMeta({
      meta: nextMeta,
      observed: {
        ...observedChangeRequest!,
        providerIdentity: toRecordedGitHostIdentity(observedChangeRequest!.identity),
      },
      at: common.now,
    });
  }
  const nextAutoSummary = renderPrAutoSummary({
    updatedAt: nextMeta.updated_at,
    branch: common.branch,
    diffstat,
  });
  const nextReview = renderPrReviewDocument({
    task: common.task,
    createdAt: common.createdAt,
    branch: common.branch,
    relatedTaskIds: resolvePrBatchIncludedTaskIds(nextMeta),
    handoffNotes: common.handoffNotes,
    autoSummary: nextAutoSummary,
  });
  const githubTitle = buildGithubPrTitle(common.task);
  const githubBody = renderGithubPrBody({
    task: common.task,
    relatedTaskIds: resolvePrBatchIncludedTaskIds(nextMeta),
    handoffNotes: common.handoffNotes,
    autoSummary: nextAutoSummary,
  });
  if (identity && observedChangeRequest?.status === "OPEN") {
    const updated = await tryUpdateChangeRequest({
      gitRoot: common.resolved.gitRoot,
      identity,
      observed: observedChangeRequest,
      title: githubTitle,
      body: githubBody,
    });
    if (updated.observed && shouldPersistObservedChangeRequestIdentity(updated.observed)) {
      nextMeta = buildObservedChangeRequestMeta({
        meta: nextMeta,
        observed: {
          ...updated.observed,
          providerIdentity: toRecordedGitHostIdentity(updated.observed.identity),
        },
        at: common.now,
      });
    }
    if (updated.artifactState) {
      nextMeta = withPrArtifactLifecycleState(
        nextMeta,
        {
          kind: updated.artifactState,
          reason: updated.stagedReason ?? "remote change-request update could not be confirmed",
        },
        common.now,
      );
    }
  }
  const errors: string[] = [];
  validateArtifactsLanguage({
    texts: {
      reviewText: nextReview,
      githubTitleText: githubTitle,
      githubBodyText: githubBody,
    },
    relReviewPath: path.relative(common.resolved.gitRoot, common.reviewPath),
    relGithubTitlePath: path.relative(common.resolved.gitRoot, common.githubTitlePath),
    relGithubBodyPath: path.relative(common.resolved.gitRoot, common.githubBodyPath),
    artifactsLanguage: common.artifactsLanguage,
    errors,
  });
  if (errors.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: errors.join("\n"),
    });
  }

  await writeTextIfChanged(common.diffstatPath, diffstat ? `${diffstat}\n` : "");
  await writeTextIfChanged(common.reviewPath, nextReview);
  await writeTextIfChanged(common.githubTitlePath, `${githubTitle}\n`);
  await writeTextIfChanged(common.githubBodyPath, githubBody);
  await writeJsonStableIfChanged(common.metaPath, nextMeta);
  return { meta: nextMeta };
}
