import { mapBackendError } from "../../cli/error-map.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import {
  buildDependencyState,
  dedupeStrings,
  formatTaskLine,
  toStringArray,
  type TaskListFilters,
} from "./shared.js";

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
    const tasks = await ctx.taskBackend.listTasks();
    const depState = buildDependencyState(tasks);
    const statuses =
      opts.filters.status.length > 0
        ? new Set(opts.filters.status.map((s) => s.trim().toUpperCase()))
        : new Set(["TODO"]);
    let filtered = tasks.filter((task) =>
      statuses.has(String(task.status || "TODO").toUpperCase()),
    );
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
    const sorted = filtered.toSorted((a, b) => a.id.localeCompare(b.id));
    const ready = sorted.filter((task) => {
      const dep = depState.get(task.id);
      return !dep || (dep.missing.length === 0 && dep.incomplete.length === 0);
    });
    const limited =
      opts.filters.limit !== undefined && opts.filters.limit >= 0
        ? ready.slice(0, opts.filters.limit)
        : ready;
    for (const task of limited) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!opts.filters.quiet) {
      process.stdout.write(`Ready: ${limited.length} / ${filtered.length}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task next", root: opts.rootOverride ?? null });
  }
}
