import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { invalidValueMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import {
  buildDependencyState,
  dedupeStrings,
  formatTaskLine,
  taskTextBlob,
  toStringArray,
  type TaskListFilters,
} from "./shared.js";

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
    const tasks = await ctx.taskBackend.listTasks();
    const depState = buildDependencyState(tasks);
    let filtered = tasks;
    if (opts.filters.status.length > 0) {
      const wanted = new Set(opts.filters.status.map((s) => s.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.status || "TODO").toUpperCase()));
    }
    if (opts.filters.owner.length > 0) {
      const wanted = new Set(opts.filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (opts.filters.tag.length > 0) {
      const wanted = new Set(opts.filters.tag.map((t) => t.trim()).filter(Boolean));
      filtered = filtered.filter((task) => {
        const tags = dedupeStrings(toStringArray(task.tags));
        return tags.some((tag) => wanted.has(tag));
      });
    }
    let matches: TaskData[] = [];
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
      matches = filtered.filter((task) => pattern.test(taskTextBlob(task)));
    } else {
      const needle = query.toLowerCase();
      matches = filtered.filter((task) => taskTextBlob(task).toLowerCase().includes(needle));
    }
    if (opts.filters.limit !== undefined && opts.filters.limit >= 0) {
      matches = matches.slice(0, opts.filters.limit);
    }
    const sorted = matches.toSorted((a, b) => a.id.localeCompare(b.id));
    for (const task of sorted) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task search", root: opts.rootOverride ?? null });
  }
}
