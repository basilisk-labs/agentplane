import path from "node:path";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../../shared/write-if-changed.js";
import { CliError } from "../../../shared/errors.js";
import {
  buildObservedGithubPrMeta,
  buildOpenedPrMeta,
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
  formatGithubPrLink,
  shouldPersistObservedGithubPrIdentity,
  tryCreateGithubPr,
  tryLookupExistingGithubPrByBranch,
} from "./sync-github.js";
import { digestPrDiffstatText } from "./freshness.js";
import type { PrOpenOutcome, PrRemoteMode, PrSyncCommonState } from "./sync-model.js";

export async function runPrOpenSync(
  common: PrSyncCommonState,
  opts: { author?: string; remoteMode: PrRemoteMode },
): Promise<{
  meta: PrMeta;
  openOutcome?: PrOpenOutcome;
}> {
  const diffstat = common.baseBranch
    ? await computePrDiffstat({
        gitRoot: common.resolved.gitRoot,
        baseBranch: common.baseBranch,
        branch: common.branch,
        prDir: common.prDir,
      })
    : "";
  let nextMeta: PrMeta = buildOpenedPrMeta({
    taskId: common.task.id,
    relatedTaskIds: common.relatedTaskIds,
    branch: common.branch,
    at: common.now,
    previousMeta: common.existingMeta,
    base: common.baseBranch,
    diffstatDigest: digestPrDiffstatText(diffstat ? `${diffstat}\n` : ""),
  });
  const linkedExistingOutcome =
    typeof nextMeta.pr_number === "number" && nextMeta.pr_number > 0
      ? {
          action: "linked-existing" as const,
          message: formatGithubPrLink(nextMeta.pr_number, nextMeta.pr_url ?? null, "linked to"),
        }
      : null;
  let openOutcome: PrOpenOutcome | undefined;
  const githubTitle = buildGithubPrTitle(common.task);
  const githubBody = renderGithubPrBody({
    task: common.task,
    relatedTaskIds: resolvePrBatchIncludedTaskIds(nextMeta),
    handoffNotes: common.handoffNotes,
    autoSummary: renderPrAutoSummary({
      updatedAt: common.renderUpdatedAt,
      branch: common.branch,
      diffstat,
    }),
  });
  const observedGithubPr = await tryLookupExistingGithubPrByBranch({
    gitRoot: common.resolved.gitRoot,
    branch: common.branch,
    baseBranch: common.baseBranch,
  });
  if (observedGithubPr) {
    if (shouldPersistObservedGithubPrIdentity(observedGithubPr)) {
      nextMeta = buildObservedGithubPrMeta({
        meta: nextMeta,
        observed: observedGithubPr,
        at: common.now,
      });
    }
    openOutcome = {
      action: "linked-existing",
      message: formatGithubPrLink(observedGithubPr.prNumber, observedGithubPr.prUrl, "linked to"),
      artifactState: "open",
    };
  } else if (opts.remoteMode === "sync-only") {
    openOutcome = linkedExistingOutcome ?? {
      action: "sync-only",
      message: "local PR artifacts synced; remote PR creation skipped (--sync-only)",
      artifactState: "open",
    };
  } else {
    const createdGithubPr = await tryCreateGithubPr({
      gitRoot: common.resolved.gitRoot,
      branch: common.branch,
      baseBranch: common.baseBranch,
      title: githubTitle,
      body: githubBody,
    });
    if (createdGithubPr.observed) {
      if (shouldPersistObservedGithubPrIdentity(createdGithubPr.observed)) {
        nextMeta = buildObservedGithubPrMeta({
          meta: nextMeta,
          observed: createdGithubPr.observed,
          at: common.now,
        });
      }
      openOutcome = {
        action: "created",
        message: formatGithubPrLink(
          createdGithubPr.observed.prNumber,
          createdGithubPr.observed.prUrl,
          "created",
        ),
        artifactState: "open",
      };
    } else {
      const artifactState = createdGithubPr.artifactState ?? "remote_staged";
      nextMeta = withPrArtifactLifecycleState(
        nextMeta,
        {
          kind: artifactState,
          reason: createdGithubPr.stagedReason ?? "remote PR creation unavailable",
        },
        common.now,
      );
      openOutcome = linkedExistingOutcome ?? {
        action: "staged",
        message:
          artifactState === "remote_failed"
            ? `local PR artifacts synced; remote PR creation failed (${createdGithubPr.stagedReason ?? "remote creation unavailable"})`
            : `local PR artifacts synced; remote PR creation staged (${createdGithubPr.stagedReason ?? "remote creation unavailable"})`,
        artifactState,
      };
    }
  }
  const nextAutoSummary = renderPrAutoSummary({
    updatedAt: common.renderUpdatedAt,
    branch: common.branch,
    diffstat,
  });
  const nextReview = renderPrReviewDocument({
    task: common.task,
    author: opts.author,
    createdAt: common.createdAt,
    branch: common.branch,
    relatedTaskIds: resolvePrBatchIncludedTaskIds(nextMeta),
    handoffNotes: common.handoffNotes,
    autoSummary: nextAutoSummary,
  });
  const nextGithubBody = renderGithubPrBody({
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
      githubBodyText: nextGithubBody,
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
  await writeJsonStableIfChanged(common.metaPath, nextMeta);
  await writeTextIfChanged(common.diffstatPath, diffstat ? `${diffstat}\n` : "");
  await writeTextIfChanged(common.reviewPath, nextReview);
  await writeTextIfChanged(common.githubTitlePath, `${githubTitle}\n`);
  await writeTextIfChanged(common.githubBodyPath, nextGithubBody);
  return { meta: nextMeta, openOutcome };
}
