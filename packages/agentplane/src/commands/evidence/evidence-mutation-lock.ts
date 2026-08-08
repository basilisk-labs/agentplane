import path from "node:path";

import { withTaskReadmeTransaction } from "@agentplaneorg/core/tasks";

function taskReadmePath(opts: { root: string; workflowDir: string; taskId: string }): string {
  return path.join(opts.root, opts.workflowDir, opts.taskId, "README.md");
}

export function evidenceMutationLockGitPath(opts: {
  root: string;
  workflowDir: string;
  taskId: string;
}): string {
  const readmePath = taskReadmePath(opts);
  const taskDirectory = path.dirname(readmePath);
  const lockPath = path.join(
    path.dirname(taskDirectory),
    `.${path.basename(taskDirectory)}.${path.basename(readmePath)}.lock`,
  );
  return path.relative(opts.root, lockPath).replaceAll(path.sep, "/");
}

export async function withEvidenceMutationLock<T>(
  opts: {
    root: string;
    workflowDir: string;
    taskId: string;
  },
  operation: () => Promise<T> | T,
): Promise<T> {
  return await withTaskReadmeTransaction(taskReadmePath(opts), operation);
}
