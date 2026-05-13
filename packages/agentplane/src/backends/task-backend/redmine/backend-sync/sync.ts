import { infoMessage, successMessage } from "../../../../cli/output.js";
import { BackendError, toStringSafe, type TaskData } from "../../shared.js";
import type { RedmineSyncContext } from "./context.js";

export async function syncRedmine(
  context: RedmineSyncContext,
  opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  },
): Promise<void> {
  if (opts.direction === "push") {
    await syncPushRedmine(context, opts.quiet, opts.confirm);
    return;
  }
  if (opts.direction === "pull") {
    await syncPullRedmine(context, opts.conflict, opts.quiet);
    return;
  }
  throw new BackendError("Invalid sync direction (expected push|pull)", "E_BACKEND");
}

export async function syncPushRedmine(
  context: RedmineSyncContext,
  quiet: boolean,
  confirm: boolean,
): Promise<void> {
  if (!context.cache) {
    throw new BackendError("Redmine cache is disabled; sync push is unavailable", "E_BACKEND");
  }
  const tasks = await context.cache.listTasks();
  const dirty = tasks.filter((task) => task.dirty);
  if (dirty.length === 0) {
    if (!quiet) process.stdout.write(`${infoMessage("no local task changes to push")}\n`);
    return;
  }
  if (!confirm) {
    for (const task of dirty) {
      process.stdout.write(`- pending push: ${task.id}\n`);
    }
    throw new BackendError("Refusing to push without --yes (preview above)", "E_BACKEND");
  }
  await context.writeTasks(dirty);
  if (!quiet)
    process.stdout.write(`${successMessage("pushed", `${dirty.length} task(s)`, "dirty")}\n`);
}

export async function syncPullRedmine(
  context: RedmineSyncContext,
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
  quiet: boolean,
): Promise<void> {
  if (!context.cache) {
    throw new BackendError("Redmine cache is disabled; sync pull is unavailable", "E_BACKEND");
  }
  const remoteTasks = await context.listTasksRemote();
  const remoteById = new Map<string, TaskData>();
  for (const task of remoteTasks) {
    const taskId = toStringSafe(task.id);
    if (taskId) remoteById.set(taskId, task);
  }
  const localTasks = await context.cache.listTasks();
  const localById = new Map<string, TaskData>();
  for (const task of localTasks) {
    const taskId = toStringSafe(task.id);
    if (taskId) localById.set(taskId, task);
  }

  for (const [taskId, remoteTask] of remoteById.entries()) {
    const localTask = localById.get(taskId);
    if (localTask?.dirty) {
      if (context.tasksDiffer(localTask, remoteTask)) {
        await handleRedmineConflict(context, taskId, localTask, remoteTask, conflict);
        continue;
      }
      localTask.dirty = false;
      await context.cacheTask(localTask, false);
      continue;
    }
    await context.cacheTask(remoteTask, false);
  }
  if (!quiet) {
    process.stdout.write(`${successMessage("pulled", `${remoteById.size} task(s)`, "remote")}\n`);
  }
}

export async function handleRedmineConflict(
  context: RedmineSyncContext,
  taskId: string,
  localTask: TaskData,
  remoteTask: TaskData,
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
): Promise<void> {
  if (conflict === "prefer-local") {
    await context.writeTask(localTask);
    return;
  }
  if (conflict === "prefer-remote") {
    await context.cacheTask(remoteTask, false);
    return;
  }
  if (conflict === "diff") {
    process.stdout.write(`${context.diffTasks(localTask, remoteTask)}\n`);
    throw new BackendError(`Conflict detected for ${taskId}`, "E_BACKEND");
  }
  throw new BackendError(`Conflict detected for ${taskId}`, "E_BACKEND");
}
