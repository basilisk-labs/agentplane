import { mapBackendError } from "../../cli/error-map.js";
import { warnMessage } from "../../cli/output.js";
import { gitAheadBehind } from "@agentplaneorg/core/git";
import { gitBranchUpstream, gitCurrentBranch } from "../shared/git-ops.js";
import {
  listTaskSummariesMemo,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import {
  formatTaskLine,
  handleTaskListWarnings,
  queryTaskProjection,
  type TaskListFilters,
} from "./shared.js";
import {
  createTaskBlueprintLifecycleResolver,
  formatTaskBlueprintListExtra,
} from "./blueprint-summary.js";
import { annotateBranchPrTaskListState, taskListStatusKey } from "./shared/branch-pr-list-state.js";

const DEFAULT_ACTIVE_TASK_LIST_STATUSES = [
  "TODO",
  "DOING",
  "BLOCKED",
  "MERGED_PENDING_CLOSE",
] as const;

function resolveProjectionStatusesForList(filters: TaskListFilters): string[] | undefined {
  if (filters.all && filters.status.length === 0) return undefined;
  const requested = filters.status.length > 0 ? filters.status : DEFAULT_ACTIVE_TASK_LIST_STATUSES;
  const statuses = new Set<string>();
  for (const status of requested) {
    const normalized = status.trim().toUpperCase();
    if (!normalized) continue;
    if (normalized === "MERGED_PENDING_CLOSE") {
      statuses.add("TODO");
      statuses.add("DOING");
      statuses.add("BLOCKED");
      continue;
    }
    statuses.add(normalized);
  }
  if (statuses.size > 0) statuses.add("DONE");
  return statuses.size > 0 ? [...statuses] : undefined;
}

export async function warnIfLocalTaskStateBehindUpstream(ctx: CommandContext): Promise<void> {
  try {
    const branch = await gitCurrentBranch(ctx.resolvedProject.gitRoot);
    const upstream = await gitBranchUpstream(ctx.resolvedProject.gitRoot, branch);
    if (!upstream) return;
    const { behind } = await gitAheadBehind(ctx.resolvedProject.gitRoot, upstream, branch);
    if (behind === 0) return;
    process.stderr.write(
      `${warnMessage(
        `local task state may be stale: ${branch} is behind ${upstream} by ${behind} commit(s); fetch/rebase before making task decisions`,
      )}\n`,
    );
  } catch {
    // Task listing must stay available in detached, shallow, or partially initialized repos.
  }
}

export async function cmdTaskListWithFilters(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  filters: TaskListFilters;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const projectionStatus = resolveProjectionStatusesForList(opts.filters);
    const tasks = await annotateBranchPrTaskListState({
      ctx,
      tasks: await listTaskSummariesMemo(ctx, {
        projectionStatus,
        fallbackToCanonicalOnEmpty: projectionStatus !== undefined,
      }),
    });
    await warnIfLocalTaskStateBehindUpstream(ctx);
    handleTaskListWarnings({ backend: ctx.taskBackend, strictRead: opts.filters.strictRead });
    const { depState, items } = queryTaskProjection({
      tasks,
      filters: opts.filters,
      defaultStatuses: opts.filters.all ? undefined : [...DEFAULT_ACTIVE_TASK_LIST_STATUSES],
    });
    const resolveBlueprint = await createTaskBlueprintLifecycleResolver({
      config: ctx.config,
      projectRoot: ctx.resolvedProject.gitRoot,
    });
    for (const task of items) {
      const blueprint = resolveBlueprint(task);
      process.stdout.write(
        `${formatTaskLine(task, depState.get(task.id), [formatTaskBlueprintListExtra(blueprint)])}\n`,
      );
    }
    if (!opts.filters.quiet) {
      const counts: Record<string, number> = {};
      for (const task of items) {
        const status = taskListStatusKey(task);
        counts[status] = (counts[status] ?? 0) + 1;
      }
      const total = items.length;
      const summary = Object.keys(counts)
        .toSorted()
        .map((key) => `${key}=${counts[key]}`)
        .join(", ");
      process.stdout.write(`Total: ${total}${summary ? ` (${summary})` : ""}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task list", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskList(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  filters: TaskListFilters;
}): Promise<number> {
  return await cmdTaskListWithFilters(opts);
}
