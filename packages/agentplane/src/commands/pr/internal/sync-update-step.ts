import path from "node:path";

import { CliError } from "../../../shared/errors.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../../shared/write-if-changed.js";
import {
  buildObservedGithubPrMeta,
  buildUpdatedPrMeta,
  resolvePrBatchIncludedTaskIds,
  type PrMeta,
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
  shouldPersistObservedGithubPrMeta,
  tryLookupExistingGithubPrByBranch,
} from "./sync-github.js";
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
  });
  let nextMeta: PrMeta = buildUpdatedPrMeta({
    meta: common.existingMeta!,
    relatedTaskIds: common.relatedTaskIds,
    branch: common.branch,
    at: common.now,
    base: common.baseBranch,
    headSha: common.renderedHeadSha,
  });
  const observedGithubPr = await tryLookupExistingGithubPrByBranch({
    gitRoot: common.resolved.gitRoot,
    branch: common.branch,
    baseBranch: common.baseBranch,
  });
  if (shouldPersistObservedGithubPrMeta(observedGithubPr)) {
    nextMeta = buildObservedGithubPrMeta({
      meta: nextMeta,
      observed: observedGithubPr!,
      at: common.now,
    });
  }
  const nextAutoSummary = renderPrAutoSummary({
    updatedAt: nextMeta.updated_at,
    branch: common.branch,
    headSha: common.artifactRefresh
      ? (nextMeta.head_sha ?? common.renderedHeadSha ?? null)
      : (nextMeta.head_sha ?? common.renderedHeadSha ?? common.headSha ?? null),
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
