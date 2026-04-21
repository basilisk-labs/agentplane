import path from "node:path";

import { gitDiffNames, toGitPath } from "@agentplaneorg/core/git";

function taskRootPrefix(workflowDir: string, taskId: string): string {
  return `${toGitPath(path.join(workflowDir, taskId))}/`;
}

export function isTaskLocalAdvancePath(opts: {
  workflowDir: string;
  taskId: string;
  tasksPath?: string;
  relPath: string;
}): boolean {
  const normalizedRelPath = toGitPath(opts.relPath);
  if (normalizedRelPath.startsWith(taskRootPrefix(opts.workflowDir, opts.taskId))) {
    return true;
  }
  const normalizedTasksPath = opts.tasksPath ? toGitPath(opts.tasksPath) : null;
  return normalizedTasksPath !== null && normalizedRelPath === normalizedTasksPath;
}

export async function isTaskLocalOnlyAdvance(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  tasksPath?: string;
  fromRef: string | null;
  toRef: string;
}): Promise<boolean> {
  if (!opts.fromRef || opts.fromRef === opts.toRef) {
    return false;
  }
  const changedPaths = await gitDiffNames(opts.gitRoot, opts.fromRef, opts.toRef);
  return (
    changedPaths.length > 0 &&
    changedPaths.every((relPath) =>
      isTaskLocalAdvancePath({
        workflowDir: opts.workflowDir,
        taskId: opts.taskId,
        tasksPath: opts.tasksPath,
        relPath,
      }),
    )
  );
}
