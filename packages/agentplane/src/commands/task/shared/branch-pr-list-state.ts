import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskSummary } from "../../../backends/task-backend.js";
import { isRecord } from "../../../shared/guards.js";
import type { CommandContext } from "../../shared/task-backend.js";

const BRANCH_PR_LIST_STATE_KEY = "agentplane.branch_pr_list_state";
const DIRECT_LIST_STATE_KEY = "agentplane.direct_list_state";

const MERGED_PENDING_CLOSE_STATUS = "MERGED_PENDING_CLOSE";
const MERGED_PENDING_CLOSE_LABEL = "MERGED->DONE?";
const VERIFIED_PENDING_CLOSEOUT_STATUS = "VERIFIED_PENDING_CLOSEOUT";
const VERIFIED_PENDING_CLOSEOUT_LABEL = "VERIFY->DONE?";

type BranchPrMergedPendingCloseState = {
  kind: "merged_pending_close";
  status: typeof MERGED_PENDING_CLOSE_STATUS;
  label: typeof MERGED_PENDING_CLOSE_LABEL;
  prNumber: number | null;
  mergeCommit: string;
};

type DirectVerifiedPendingCloseState = {
  kind: "verified_pending_closeout";
  status: typeof VERIFIED_PENDING_CLOSEOUT_STATUS;
  label: typeof VERIFIED_PENDING_CLOSEOUT_LABEL;
  verifiedBy: string | null;
};

function readBranchPrListState(task: TaskSummary): BranchPrMergedPendingCloseState | null {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const raw = extensions[BRANCH_PR_LIST_STATE_KEY];
  if (!isRecord(raw)) return null;
  if (raw.kind !== "merged_pending_close") return null;
  if (raw.status !== MERGED_PENDING_CLOSE_STATUS) return null;
  if (raw.label !== MERGED_PENDING_CLOSE_LABEL) return null;
  if (typeof raw.mergeCommit !== "string" || raw.mergeCommit.trim().length === 0) return null;
  return {
    kind: "merged_pending_close",
    status: MERGED_PENDING_CLOSE_STATUS,
    label: MERGED_PENDING_CLOSE_LABEL,
    prNumber: typeof raw.prNumber === "number" ? raw.prNumber : null,
    mergeCommit: raw.mergeCommit,
  };
}

function readDirectListState(task: TaskSummary): DirectVerifiedPendingCloseState | null {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const raw = extensions[DIRECT_LIST_STATE_KEY];
  if (!isRecord(raw)) return null;
  if (raw.kind !== "verified_pending_closeout") return null;
  if (raw.status !== VERIFIED_PENDING_CLOSEOUT_STATUS) return null;
  if (raw.label !== VERIFIED_PENDING_CLOSEOUT_LABEL) return null;
  return {
    kind: "verified_pending_closeout",
    status: VERIFIED_PENDING_CLOSEOUT_STATUS,
    label: VERIFIED_PENDING_CLOSEOUT_LABEL,
    verifiedBy: typeof raw.verifiedBy === "string" && raw.verifiedBy.trim().length > 0
      ? raw.verifiedBy
      : null,
  };
}

function withBranchPrListState(
  task: TaskSummary,
  state: BranchPrMergedPendingCloseState,
): TaskSummary {
  return {
    ...task,
    extensions: {
      ...(isRecord(task.extensions) ? task.extensions : {}),
      [BRANCH_PR_LIST_STATE_KEY]: state,
    },
  };
}

function withDirectListState(
  task: TaskSummary,
  state: DirectVerifiedPendingCloseState,
): TaskSummary {
  return {
    ...task,
    extensions: {
      ...(isRecord(task.extensions) ? task.extensions : {}),
      [DIRECT_LIST_STATE_KEY]: state,
    },
  };
}

export async function annotateBranchPrTaskListState(opts: {
  ctx: CommandContext;
  tasks: TaskSummary[];
}): Promise<TaskSummary[]> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") {
    return opts.tasks.map((task) => {
      if (
        normalizeTaskStatus(task.status) === "DOING" &&
        task.verification?.state === "ok"
      ) {
        return withDirectListState(task, {
          kind: "verified_pending_closeout",
          status: VERIFIED_PENDING_CLOSEOUT_STATUS,
          label: VERIFIED_PENDING_CLOSEOUT_LABEL,
          verifiedBy:
            typeof task.verification?.updated_by === "string" &&
            task.verification.updated_by.trim().length > 0
              ? task.verification.updated_by
              : null,
        });
      }
      return task;
    });
  }
  const { readPrMetaIfPresent, resolveLocalMergedPrMeta } =
    await import("../hosted-merge-sync/pr-meta.js");

  const annotated: TaskSummary[] = [];
  for (const task of opts.tasks) {
    if (normalizeTaskStatus(task.status) === "DONE") {
      annotated.push(task);
      continue;
    }

    const prMeta = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: task.id });
    const localMerged = resolveLocalMergedPrMeta(prMeta?.meta ?? null);
    if (!localMerged) {
      annotated.push(task);
      continue;
    }

    annotated.push(
      withBranchPrListState(task, {
        kind: "merged_pending_close",
        status: MERGED_PENDING_CLOSE_STATUS,
        label: MERGED_PENDING_CLOSE_LABEL,
        prNumber:
          typeof prMeta?.meta.pr_number === "number" && Number.isFinite(prMeta.meta.pr_number)
            ? prMeta.meta.pr_number
            : null,
        mergeCommit: localMerged.mergeCommit,
      }),
    );
  }
  return annotated;
}

export function taskListStatusKey(task: TaskSummary): string {
  return (
    readBranchPrListState(task)?.status ??
    readDirectListState(task)?.status ??
    normalizeTaskStatus(task.status)
  );
}

export function taskListStatusLabel(task: TaskSummary): string {
  return (
    readBranchPrListState(task)?.label ??
    readDirectListState(task)?.label ??
    normalizeTaskStatus(task.status)
  );
}

export function taskListBranchPrExtraFields(task: TaskSummary): string[] {
  const branchState = readBranchPrListState(task);
  if (branchState) {
    return [
      "branch_pr=merged_pending_close",
      ...(branchState.prNumber ? [`pr=#${branchState.prNumber}`] : []),
      `merge=${branchState.mergeCommit.slice(0, 12)}`,
      "next=task-normalize-sync-hosted-merges",
    ];
  }
  const directState = readDirectListState(task);
  if (!directState) return [];
  return [
    "direct=verified_pending_closeout",
    ...(directState.verifiedBy ? [`verified_by=${directState.verifiedBy}`] : []),
    "next=task-complete",
  ];
}
