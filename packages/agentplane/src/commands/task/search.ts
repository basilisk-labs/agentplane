import { mapBackendError } from "../../cli/error-map.js";
import { invalidValueMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  listTaskSummariesMemo,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import {
  formatTaskLine,
  handleTaskListWarnings,
  queryTaskProjection,
  taskTextBlob,
  type TaskListFilters,
} from "./shared.js";
import { annotateBranchPrTaskListState } from "./shared/branch-pr-list-state.js";

export async function cmdTaskSearch(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  query: string;
  regex: boolean;
  filters: TaskListFilters;
}): Promise<number> {
  const query = opts.query.trim();
  if (!query) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing query (expected non-empty text)",
    });
  }
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const tasks = await annotateBranchPrTaskListState({
      ctx,
      tasks: await listTaskSummariesMemo(ctx),
    });
    handleTaskListWarnings({ backend: ctx.taskBackend, strictRead: opts.filters.strictRead });
    if (opts.regex) {
      let pattern: RegExp;
      try {
        pattern = new RegExp(query, "i");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid regex";
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage("regex", message, "valid pattern"),
        });
      }
      const { depState, items } = queryTaskProjection({
        tasks,
        filters: opts.filters,
        match: (task) => pattern.test(taskTextBlob(task)),
        limitOrder: "before-sort",
      });
      for (const task of items) {
        process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
      }
      return 0;
    }
    const needle = query.toLowerCase();
    const { depState, items } = queryTaskProjection({
      tasks,
      filters: opts.filters,
      match: (task) => taskTextBlob(task).toLowerCase().includes(needle),
      limitOrder: "before-sort",
    });
    for (const task of items) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task search", root: opts.rootOverride ?? null });
  }
}
