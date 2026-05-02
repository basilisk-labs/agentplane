import { extractTaskSuffix } from "@agentplaneorg/core/commit";

import { runGhApiJson } from "../pr/internal/gh-api.js";
import { cleanupMergedLocalBranch } from "../shared/merged-branch-cleanup.js";

import { taskCloseAlreadyRecordedOnBase } from "./close-tail-state.js";
import type {
  GithubPullRequestRecord,
  HostedClosePrExecutionResult,
  HostedClosePrNotice,
  HostedClosePrPlan,
} from "./hosted-close-pr.types.js";

function normalizeOneLine(value: string, maxChars: number): string {
  const trimmed = value.trim().replaceAll(/\s+/g, " ");
  if (!trimmed) return "";
  return trimmed.length > maxChars ? `${trimmed.slice(0, Math.max(1, maxChars - 3))}...` : trimmed;
}

function buildHostedClosePrTitle(opts: { taskId: string; taskTitle: string }): string {
  const title = normalizeOneLine(opts.taskTitle, 96) || "Hosted task closure";
  const suffix = extractTaskSuffix(opts.taskId);
  return `🧩 ${suffix} task-close: ${title} [${opts.taskId}]`;
}

function buildHostedClosePrBody(opts: {
  taskId: string;
  prNumber: number | null;
  sourceBranch: string;
  mergeSha: string;
}): string {
  const prLine =
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? `Closes task \`${opts.taskId}\` after merged task PR #${opts.prNumber}.`
      : `Closes task \`${opts.taskId}\` after a merged task PR.`;
  return [
    prLine,
    "",
    "## Source",
    "",
    `- Task: \`${opts.taskId}\``,
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? `- Source PR: #${opts.prNumber}`
      : "- Source PR: not recorded",
    `- Source branch: \`${opts.sourceBranch}\``,
    `- Merge SHA: \`${opts.mergeSha}\``,
    "",
    "## Scope",
    "",
    "This PR contains only tracked task artifacts produced by the hosted branch_pr closure flow.",
  ].join("\n");
}

async function maybeCleanupMergedTaskBranch(opts: {
  gitRoot: string;
  branch: string;
}): Promise<HostedClosePrNotice[]> {
  try {
    const cleanup = await cleanupMergedLocalBranch({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
    });
    if (!cleanup.removedBranch && !cleanup.removedWorktree) {
      if (cleanup.skippedReason === "current_worktree") {
        return [
          {
            level: "info",
            message: `local merged branch cleanup skipped: ${opts.branch} is the current checkout`,
          },
        ];
      }
      if (cleanup.skippedReason === "outside_repo") {
        return [
          {
            level: "info",
            message: `local merged branch cleanup skipped: ${opts.branch} is attached to a worktree outside the current checkout root`,
          },
        ];
      }
      return [];
    }
    const details: string[] = [];
    if (cleanup.removedWorktree && cleanup.worktreePath) {
      details.push(`removed worktree ${cleanup.worktreePath}`);
    }
    if (cleanup.removedBranch) {
      details.push(`deleted branch ${opts.branch}`);
    }
    return [{ level: "info", message: `local merged branch cleanup: ${details.join("; ")}` }];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return [
      {
        level: "warn",
        message: `local merged branch cleanup failed for ${opts.branch}: ${message}`,
      },
    ];
  }
}

export async function executeHostedClosePrPlan(
  plan: HostedClosePrPlan,
): Promise<HostedClosePrExecutionResult> {
  const notices = await maybeCleanupMergedTaskBranch({
    gitRoot: plan.gitRoot,
    branch: plan.sourceBranch,
  });
  const alreadyClosedOnBase = await taskCloseAlreadyRecordedOnBase({
    gitRoot: plan.gitRoot,
    workflowDir: plan.workflowDir,
    taskId: plan.taskId,
    baseBranch: plan.baseBranch,
  });
  if (alreadyClosedOnBase) {
    return {
      notices,
      outcome: {
        kind: "base-already-recorded",
        taskId: plan.taskId,
        baseBranch: plan.baseBranch,
      },
    };
  }

  const owner = plan.repo.split("/")[0]?.trim() ?? "";
  const existingQuery = new URLSearchParams({
    state: "open",
    head: `${owner}:${plan.closeBranch}`,
  });
  const existing = await runGhApiJson<GithubPullRequestRecord[]>(plan.gitRoot, [
    `repos/${plan.repo}/pulls?${existingQuery.toString()}`,
  ]);
  const existingPr = Array.isArray(existing) ? (existing[0] ?? null) : null;
  const existingNumber = Number(existingPr?.number ?? 0);
  if (Number.isInteger(existingNumber) && existingNumber > 0) {
    return {
      notices,
      outcome: {
        kind: "existing-pr",
        taskId: plan.taskId,
        prNumber: existingNumber,
        prUrl: existingPr?.html_url ?? null,
      },
    };
  }

  const mergedQuery = new URLSearchParams({
    state: "closed",
    head: `${owner}:${plan.closeBranch}`,
  });
  mergedQuery.set("base", plan.baseBranch);
  const merged = await runGhApiJson<GithubPullRequestRecord[]>(plan.gitRoot, [
    `repos/${plan.repo}/pulls?${mergedQuery.toString()}`,
  ]);
  const mergedPr =
    Array.isArray(merged) && merged.length > 0
      ? (merged.find(
          (record) =>
            typeof record.merged_at === "string" &&
            record.merged_at.trim().length > 0 &&
            record.head?.ref?.trim() === plan.closeBranch &&
            record.base?.ref?.trim() === plan.baseBranch,
        ) ?? null)
      : null;
  const mergedNumber = Number(mergedPr?.number ?? 0);
  if (Number.isInteger(mergedNumber) && mergedNumber > 0) {
    return {
      notices,
      outcome: {
        kind: "already-merged-pr",
        taskId: plan.taskId,
        prNumber: mergedNumber,
        prUrl: mergedPr?.html_url ?? null,
      },
    };
  }

  const created = await runGhApiJson<GithubPullRequestRecord>(plan.gitRoot, [
    `repos/${plan.repo}/pulls`,
    "-X",
    "POST",
    "-f",
    `title=${buildHostedClosePrTitle({ taskId: plan.taskId, taskTitle: plan.taskTitle })}`,
    "-f",
    `body=${buildHostedClosePrBody({
      taskId: plan.taskId,
      prNumber: plan.sourcePrNumber,
      sourceBranch: plan.sourceBranch,
      mergeSha: plan.mergeCommit,
    })}`,
    "-f",
    `head=${plan.closeBranch}`,
    "-f",
    `base=${plan.baseBranch}`,
  ]);
  return {
    notices,
    outcome: {
      kind: "created-pr",
      taskId: plan.taskId,
      closeBranch: plan.closeBranch,
      prNumber: Number(created.number ?? 0),
      prUrl: created.html_url ?? null,
    },
  };
}
