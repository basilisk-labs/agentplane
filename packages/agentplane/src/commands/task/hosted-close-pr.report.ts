import { createCliEmitter } from "../../cli/output.js";

import { shortHostedCloseSha } from "./hosted-close-pr.precheck.js";
import type {
  HostedClosePrExecutionResult,
  HostedClosePrNotice,
  HostedClosePrOutcome,
} from "./hosted-close-pr.types.js";

function normalizeGithubPrLink(
  prNumber: number,
  prUrl: string | null,
  verb: "linked to" | "created",
): string {
  return prUrl?.trim()
    ? `${verb} GitHub PR #${prNumber}: ${prUrl.trim()}`
    : `${verb} GitHub PR #${prNumber}`;
}

function reportNotice(output: ReturnType<typeof createCliEmitter>, notice: HostedClosePrNotice) {
  if (notice.level === "warn") {
    output.warn(notice.message);
    return;
  }
  output.info(notice.message);
}

export function reportHostedClosePrOutcome(
  outcome: HostedClosePrOutcome,
  opts?: { silent?: boolean },
): void {
  reportHostedClosePrExecutionResult({ notices: [], outcome }, opts);
}

export function reportHostedClosePrExecutionResult(
  result: HostedClosePrExecutionResult,
  opts?: { silent?: boolean },
): void {
  if (opts?.silent) return;
  const output = createCliEmitter();
  for (const notice of result.notices) {
    reportNotice(output, notice);
  }

  switch (result.outcome.kind) {
    case "canonical-already-present": {
      output.info(
        `hosted-close-pr skipped: ${result.outcome.taskId} is already closed on ${result.outcome.baseBranch || "the base branch"} for merge ${shortHostedCloseSha(result.outcome.mergeCommit)}`,
      );
      return;
    }
    case "base-already-recorded": {
      output.info(
        `hosted close already recorded on ${result.outcome.baseBranch}; no follow-up PR needed`,
      );
      output.success(
        "task hosted-close-pr",
        result.outcome.taskId,
        `hosted close already recorded on ${result.outcome.baseBranch}; skipped follow-up PR`,
      );
      return;
    }
    case "already-merged-pr": {
      output.info(
        normalizeGithubPrLink(result.outcome.prNumber, result.outcome.prUrl, "linked to") +
          `; already merged, close_branch=${result.outcome.closeBranch}, base=${result.outcome.baseBranch}, merge=${shortHostedCloseSha(result.outcome.mergeCommit)}`,
      );
      output.success(
        "task hosted-close-pr",
        result.outcome.taskId,
        `hosted close already merged in PR #${result.outcome.prNumber}; skipped follow-up PR`,
      );
      return;
    }
    case "existing-pr": {
      output.info(
        `hosted close-tail already open: close_branch=${result.outcome.closeBranch}, base=${result.outcome.baseBranch}, merge=${shortHostedCloseSha(result.outcome.mergeCommit)}`,
      );
      output.success(
        "task hosted-close-pr",
        result.outcome.taskId,
        normalizeGithubPrLink(result.outcome.prNumber, result.outcome.prUrl, "linked to"),
      );
      return;
    }
    case "created-pr": {
      output.success(
        "task hosted-close-pr",
        result.outcome.taskId,
        normalizeGithubPrLink(result.outcome.prNumber, result.outcome.prUrl, "created"),
      );
      return;
    }
  }
}
