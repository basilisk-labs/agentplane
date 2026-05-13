import { parseTaskStatus } from "@agentplaneorg/core/tasks";

import { invalidValueForFlag, missingValueMessage, warnMessage } from "../../../cli/output.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import type { TaskSummary } from "../../../backends/task-backend.js";
import { CliError } from "../../../shared/errors.js";
import { dedupeStrings } from "../../../shared/strings.js";
import { buildDependencyState, type DependencyState } from "./dependencies.js";
import { toStringArray } from "./tags.js";
import { taskListStatusKey } from "./branch-pr-list-state.js";

export type TaskListFilters = {
  status: string[];
  owner: string[];
  tag: string[];
  limit?: number;
  quiet: boolean;
  strictRead?: boolean;
};

export function parseTaskListFilters(
  args: string[],
  opts?: { allowLimit?: boolean },
): TaskListFilters {
  const out: TaskListFilters = { status: [], owner: [], tag: [], quiet: false, strictRead: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--strict-read") {
      out.strictRead = true;
      continue;
    }
    if (arg === "--status") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--status"),
        });
      }
      out.status.push(next);
      i++;
      continue;
    }
    if (arg === "--owner") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--owner"),
        });
      }
      out.owner.push(next);
      i++;
      continue;
    }
    if (arg === "--tag") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--tag"),
        });
      }
      out.tag.push(next);
      i++;
      continue;
    }
    if (opts?.allowLimit && arg === "--limit") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--limit"),
        });
      }
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed)) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: invalidValueForFlag("--limit", next, "integer"),
        });
      }
      out.limit = parsed;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: `Unknown flag: ${arg}`,
      });
    }
  }
  return out;
}

export function handleTaskListWarnings(opts: {
  backend: { getLastListWarnings?: () => string[] };
  strictRead?: boolean;
}): void {
  const warnings = opts.backend.getLastListWarnings?.() ?? [];
  if (warnings.length === 0) return;
  const preview = warnings.slice(0, 3).join("; ");
  const suffix = warnings.length > 3 ? `; +${warnings.length - 3} more` : "";
  const message = `skipped ${warnings.length} task files during scan (${preview}${suffix})`;
  if (opts.strictRead) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `task scan strict mode failed: ${message}`,
    });
  }
  process.stderr.write(`${warnMessage(message)}\n`);
}

function filterTaskProjectionByStatus(
  tasks: TaskSummary[],
  filters: TaskListFilters,
  defaultStatuses?: string[],
): TaskSummary[] {
  const statuses =
    filters.status.length > 0
      ? filters.status
      : (defaultStatuses ?? []).filter((status) => status.trim().length > 0);
  if (statuses.length === 0) {
    return tasks;
  }
  const wanted = new Set(
    statuses
      .map((status) => parseTaskStatus(status) ?? status.trim().toUpperCase())
      .filter((status) => status !== null && status !== ""),
  );
  return tasks.filter((task) => wanted.has(taskListStatusKey(task)));
}

function filterTaskProjectionByOwner(
  tasks: TaskSummary[],
  filters: TaskListFilters,
): TaskSummary[] {
  if (filters.owner.length === 0) {
    return tasks;
  }
  const wanted = new Set(filters.owner.map((owner) => owner.trim().toUpperCase()));
  return tasks.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
}

function filterTaskProjectionByTag(tasks: TaskSummary[], filters: TaskListFilters): TaskSummary[] {
  if (filters.tag.length === 0) {
    return tasks;
  }
  const wanted = new Set(filters.tag.map((tag) => tag.trim()).filter(Boolean));
  return tasks.filter((task) => {
    const tags = dedupeStrings(toStringArray(task.tags));
    return tags.some((tag) => wanted.has(tag));
  });
}

function applyProjectionLimit<T>(items: T[], limit?: number): T[] {
  return limit !== undefined && limit >= 0 ? items.slice(0, limit) : items;
}

function sortTaskProjection(tasks: TaskSummary[]): TaskSummary[] {
  return tasks.toSorted((a, b) => a.id.localeCompare(b.id));
}

export type QueryTaskProjectionResult = {
  depState: Map<string, DependencyState>;
  filtered: TaskSummary[];
  items: TaskSummary[];
};

export function queryTaskProjection(opts: {
  tasks: TaskSummary[];
  filters: TaskListFilters;
  defaultStatuses?: string[];
  match?: (task: TaskSummary) => boolean;
  readyOnly?: boolean;
  limitOrder?: "before-sort" | "after-sort";
}): QueryTaskProjectionResult {
  const depState = buildDependencyState(opts.tasks);
  let filtered = filterTaskProjectionByStatus(opts.tasks, opts.filters, opts.defaultStatuses);
  filtered = filterTaskProjectionByOwner(filtered, opts.filters);
  filtered = filterTaskProjectionByTag(filtered, opts.filters);
  if (opts.match) {
    filtered = filtered.filter((task) => opts.match?.(task) ?? false);
  }

  let queried = filtered;
  if (opts.readyOnly) {
    queried = queried.filter((task) => {
      const dep = depState.get(task.id);
      return !dep || (dep.missing.length === 0 && dep.incomplete.length === 0);
    });
  }

  const limitOrder = opts.limitOrder ?? "after-sort";
  const items =
    limitOrder === "before-sort"
      ? sortTaskProjection(applyProjectionLimit(queried, opts.filters.limit))
      : applyProjectionLimit(sortTaskProjection(queried), opts.filters.limit);
  return { depState, filtered, items };
}

export function taskTextBlob(task: TaskSummary): string {
  const parts: string[] = [];
  for (const key of ["id", "title", "description", "status", "priority", "owner"] as const) {
    const value = (task as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) parts.push(value.trim());
  }
  const tags = toStringArray(task.tags);
  parts.push(...tags.filter(Boolean));
  const comments = Array.isArray(task.comments) ? task.comments : [];
  for (const comment of comments) {
    if (comment && typeof comment.author === "string") parts.push(comment.author);
    if (comment && typeof comment.body === "string") parts.push(comment.body);
  }
  const commit = task.commit ?? null;
  if (commit && typeof commit.hash === "string") parts.push(commit.hash);
  if (commit && typeof commit.message === "string") parts.push(commit.message);
  return parts.join("\n");
}
