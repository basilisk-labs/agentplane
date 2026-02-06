import { loadTaskBackend } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";

import {
  buildDependencyState,
  dedupeStrings,
  formatTaskLine,
  parseTaskListFilters,
  toStringArray,
} from "./shared.js";

export async function cmdTaskListWithFilters(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const filters = parseTaskListFilters(opts.args);
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    let filtered = tasks;
    if (filters.status.length > 0) {
      const wanted = new Set(filters.status.map((s) => s.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.status || "TODO").toUpperCase()));
    }
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
    for (const task of sorted) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!filters.quiet) {
      const counts: Record<string, number> = {};
      for (const task of sorted) {
        const status = String(task.status || "TODO").toUpperCase();
        counts[status] = (counts[status] ?? 0) + 1;
      }
      const total = sorted.length;
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
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  return await cmdTaskListWithFilters(opts);
}
