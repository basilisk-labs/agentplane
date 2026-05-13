import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskSummary } from "../../../backends/task-backend.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { readPrMetaIfPresent, resolveLocalMergedPrMeta } from "../hosted-merge-sync/pr-meta.js";

const BRANCH_PR_LIST_STATE_KEY = "agentplane.branch_pr_list_state";

export const MERGED_PENDING_CLOSE_STATUS = "MERGED_PENDING_CLOSE";
const MERGED_PENDING_CLOSE_LABEL = "MERGED->DONE?";

type BranchPrMergedPendingCloseState = {
  kind: "merged_pending_close";
  status: typeof MERGED_PENDING_CLOSE_STATUS;
  label: typeof MERGED_PENDING_CLOSE_LABEL;
  prNumber: number | null;
  mergeCommit: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

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

export async function annotateBranchPrTaskListState(opts: {
  ctx: CommandContext;
  tasks: TaskSummary[];
}): Promise<TaskSummary[]> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") return opts.tasks;

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
  return readBranchPrListState(task)?.status ?? normalizeTaskStatus(task.status);
}

export function taskListStatusLabel(task: TaskSummary): string {
  return readBranchPrListState(task)?.label ?? normalizeTaskStatus(task.status);
}

export function taskListBranchPrExtraFields(task: TaskSummary): string[] {
  const state = readBranchPrListState(task);
  if (!state) return [];
  return [
    "branch_pr=merged_pending_close",
    ...(state.prNumber ? [`pr=#${state.prNumber}`] : []),
    `merge=${state.mergeCommit.slice(0, 12)}`,
    "next=task-normalize-sync-hosted-merges",
  ];
}
