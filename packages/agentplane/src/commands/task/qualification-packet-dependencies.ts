import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";

function sortedUnique(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].toSorted();
}

export async function resolveQualificationDependencyLeaves(opts: {
  backend: Pick<TaskBackend, "getTask">;
  taskId: string;
  dependsOn: readonly string[];
}): Promise<{ rootDependencyIds: string[]; terminalLeaves: TaskData[] }> {
  const rootDependencyIds = sortedUnique(opts.dependsOn);
  if (rootDependencyIds.length === 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Qualification task ${opts.taskId} must declare at least one dependency leaf.`,
    });
  }
  const terminalLeaves = new Map<string, TaskData>();
  const visited = new Set<string>();
  const stack = [opts.taskId];
  const visit = async (taskId: string): Promise<void> => {
    const cycleStart = stack.indexOf(taskId);
    if (cycleStart !== -1) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Qualification dependency cycle detected: ${[...stack.slice(cycleStart), taskId].join(" -> ")}.`,
      });
    }
    if (visited.has(taskId)) return;
    const task = await opts.backend.getTask(taskId);
    if (!task) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Qualification dependency task ${taskId} is missing from the task backend.`,
      });
    }
    stack.push(taskId);
    const dependsOn = sortedUnique(task.depends_on);
    if (dependsOn.length === 0) terminalLeaves.set(taskId, task);
    else for (const dependencyId of dependsOn) await visit(dependencyId);
    stack.pop();
    visited.add(taskId);
  };
  for (const dependencyId of rootDependencyIds) await visit(dependencyId);
  return {
    rootDependencyIds,
    terminalLeaves: [...terminalLeaves.values()].toSorted((a, b) => a.id.localeCompare(b.id)),
  };
}
