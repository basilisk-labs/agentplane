import type { TaskBackend, TaskData } from "../../../backends/task-backend.js";
import { CliError } from "../../../shared/errors.js";
import { dedupeStrings } from "../../../shared/strings.js";
import { toStringArray } from "./tags.js";

export type DependencyState = {
  dependsOn: string[];
  missing: string[];
  incomplete: string[];
};

function hasDependsOnCycle(dependsOnMap: Map<string, string[]>): string[] | null {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const stack: string[] = [];

  function dfs(taskId: string): string[] | null {
    if (visited.has(taskId)) return null;
    if (visiting.has(taskId)) {
      const start = stack.indexOf(taskId);
      return start === -1 ? [taskId] : [...stack.slice(start), taskId];
    }

    visiting.add(taskId);
    stack.push(taskId);
    const deps = dependsOnMap.get(taskId) ?? [];
    for (const depId of deps) {
      const cycle = dfs(depId);
      if (cycle) return cycle;
    }
    stack.pop();
    visiting.delete(taskId);
    visited.add(taskId);
    return null;
  }

  for (const taskId of dependsOnMap.keys()) {
    const cycle = dfs(taskId);
    if (cycle) return cycle;
  }
  return null;
}

export async function ensureTaskDependsOnGraphIsAcyclic(opts: {
  backend: Pick<TaskBackend, "listTasks">;
  taskId: string;
  dependsOn: string[];
}): Promise<void> {
  const nextDepends = dedupeStrings(opts.dependsOn);
  if (nextDepends.includes(opts.taskId)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `depends_on cannot include task itself (${opts.taskId})`,
    });
  }

  const allTasks = await opts.backend.listTasks();
  const depMap = new Map<string, string[]>();
  for (const task of allTasks) {
    const taskId = String(task.id || "").trim();
    if (!taskId) continue;
    if (taskId === opts.taskId) continue;
    depMap.set(taskId, dedupeStrings(toStringArray(task.depends_on)));
  }
  depMap.set(opts.taskId, nextDepends);

  const cycle = hasDependsOnCycle(depMap);
  if (!cycle) return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `depends_on cycle detected: ${cycle.join(" -> ")}`,
  });
}

export async function resolveTaskDependencyState(
  task: TaskData,
  backend: Pick<TaskBackend, "getTask" | "getTasks">,
): Promise<DependencyState> {
  const dependsOn = dedupeStrings(toStringArray(task.depends_on));
  if (dependsOn.length === 0) {
    return { dependsOn, missing: [], incomplete: [] };
  }

  const loaded = backend.getTasks
    ? await backend.getTasks(dependsOn)
    : await Promise.all(dependsOn.map(async (depId) => await backend.getTask(depId)));

  const missing: string[] = [];
  const incomplete: string[] = [];
  for (const [idx, depId] of dependsOn.entries()) {
    const dep = loaded[idx] ?? null;
    if (!dep) {
      missing.push(depId);
      continue;
    }
    const status = String(dep.status || "TODO").toUpperCase();
    if (status !== "DONE") incomplete.push(depId);
  }

  return { dependsOn, missing, incomplete };
}

export function buildDependencyState(tasks: TaskData[]): Map<string, DependencyState> {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const state = new Map<string, DependencyState>();
  for (const task of tasks) {
    const dependsOn = dedupeStrings(toStringArray(task.depends_on));
    const missing: string[] = [];
    const incomplete: string[] = [];
    for (const depId of dependsOn) {
      const dep = byId.get(depId);
      if (!dep) {
        missing.push(depId);
        continue;
      }
      const status = String(dep.status || "TODO").toUpperCase();
      if (status !== "DONE") {
        incomplete.push(depId);
      }
    }
    state.set(task.id, { dependsOn, missing, incomplete });
  }
  return state;
}

function formatDepsSummary(dep: DependencyState | undefined): string | null {
  if (!dep) return null;
  if (dep.dependsOn.length === 0) return "deps=none";
  if (dep.missing.length === 0 && dep.incomplete.length === 0) return "deps=ready";
  const parts: string[] = [];
  if (dep.missing.length > 0) {
    parts.push(`missing:${dep.missing.join(",")}`);
  }
  if (dep.incomplete.length > 0) {
    parts.push(`wait:${dep.incomplete.join(",")}`);
  }
  return `deps=${parts.join(",")}`;
}

export function formatTaskLine(task: TaskData, depState?: DependencyState): string {
  const status = String(task.status || "TODO").toUpperCase();
  const extras: string[] = [];
  if (task.owner?.trim()) extras.push(`owner=${task.owner.trim()}`);
  if (task.priority !== undefined && String(task.priority).trim()) {
    extras.push(`prio=${String(task.priority).trim()}`);
  }
  const depsSummary = formatDepsSummary(depState);
  if (depsSummary) extras.push(depsSummary);
  const tags = dedupeStrings(toStringArray(task.tags));
  if (tags.length > 0) extras.push(`tags=${tags.join(",")}`);
  const verify = dedupeStrings(toStringArray(task.verify));
  if (verify.length > 0) extras.push(`verify=${verify.length}`);
  const suffix = extras.length > 0 ? ` (${extras.join(", ")})` : "";
  return `${task.id} [${status}] ${task.title?.trim() || "(untitled task)"}${suffix}`;
}
