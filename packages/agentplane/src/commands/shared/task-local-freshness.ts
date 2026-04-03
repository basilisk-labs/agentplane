import path from "node:path";

import { gitDiffNames, toGitPath } from "./git-diff.js";

function taskRootPrefix(workflowDir: string, taskId: string): string {
  return `${toGitPath(path.join(workflowDir, taskId))}/`;
}

export function isTaskLocalAdvancePath(opts: {
  workflowDir: string;
  taskId: string;
  relPath: string;
}): boolean {
  return opts.relPath.startsWith(taskRootPrefix(opts.workflowDir, opts.taskId));
}

export async function isTaskLocalOnlyAdvance(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
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
        relPath,
      }),
    )
  );
}
