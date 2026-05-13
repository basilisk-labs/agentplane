import { mapBackendError } from "../../cli/error-map.js";
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
import { annotateBranchPrTaskListState } from "./shared/branch-pr-list-state.js";

export async function cmdTaskNext(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  filters: TaskListFilters;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const tasks = await annotateBranchPrTaskListState({
      ctx,
      tasks: await listTaskSummariesMemo(ctx),
    });
    handleTaskListWarnings({ backend: ctx.taskBackend, strictRead: opts.filters.strictRead });
    const { depState, filtered, items } = queryTaskProjection({
      tasks,
      filters: opts.filters,
      defaultStatuses: ["TODO"],
      readyOnly: true,
    });
    for (const task of items) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!opts.filters.quiet) {
      process.stdout.write(`Ready: ${items.length} / ${filtered.length}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task next", root: opts.rootOverride ?? null });
  }
}
