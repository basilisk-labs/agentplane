import { loadTaskBackend } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";

import {
  buildDependencyState,
  dedupeStrings,
  formatTaskLine,
  parseTaskListFilters,
  toStringArray,
} from "./shared.js";

export async function cmdTaskNext(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const filters = parseTaskListFilters(opts.args, { allowLimit: true });
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    const statuses =
      filters.status.length > 0
        ? new Set(filters.status.map((s) => s.trim().toUpperCase()))
        : new Set(["TODO"]);
    let filtered = tasks.filter((task) =>
      statuses.has(String(task.status || "TODO").toUpperCase()),
    );
    if (filters.owner.length > 0) {
      const wanted = new Set(filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (filters.tag.length > 0) {
      const wanted = new Set(filters.tag.map((t) => t.trim()).filter(Boolean));
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
      filters.limit !== undefined && filters.limit >= 0 ? ready.slice(0, filters.limit) : ready;
    for (const task of limited) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!filters.quiet) {
      process.stdout.write(`Ready: ${limited.length} / ${filtered.length}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task next", root: opts.rootOverride ?? null });
  }
}
