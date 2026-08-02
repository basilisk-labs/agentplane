export function isTaskArtifactPath(opts: {
  workflowDir: string;
  tasksPath: string;
  taskId?: string;
  relPath: string;
}): boolean {
  const workflowDir = opts.workflowDir.replaceAll("\\", "/").replace(/\/+$/u, "");
  const tasksPath = opts.tasksPath.replaceAll("\\", "/").replace(/\/+$/u, "");
  const relPath = opts.relPath.replaceAll("\\", "/");
  const workflowPath = opts.taskId ? `${workflowDir}/${opts.taskId}` : workflowDir;
  return (
    relPath === workflowPath || relPath.startsWith(`${workflowPath}/`) || relPath === tasksPath
  );
}

function isForeignTaskReadmePath(opts: {
  workflowDir: string;
  taskId: string | undefined;
  relPath: string;
}): boolean {
  if (!opts.taskId) return false;
  const workflowDir = opts.workflowDir.replaceAll("\\", "/").replace(/\/+$/u, "");
  const relPath = opts.relPath.replaceAll("\\", "/");
  if (!relPath.startsWith(`${workflowDir}/`) || !relPath.endsWith("/README.md")) return false;
  const segments = relPath.slice(workflowDir.length + 1).split("/");
  return segments.length === 2 && segments[0] !== opts.taskId && segments[1] === "README.md";
}

export function filterTaskWorktreeBlockingPaths(opts: {
  changedPaths: readonly string[];
  workflowDir: string;
  tasksPath: string;
  taskId?: string;
}): string[] {
  return opts.changedPaths.filter((relPath) => {
    const artifactPath = {
      workflowDir: opts.workflowDir,
      tasksPath: opts.tasksPath,
      relPath,
    };
    if (!isTaskArtifactPath(artifactPath)) return true;
    if (isTaskArtifactPath({ ...artifactPath, taskId: opts.taskId })) return false;
    return isForeignTaskReadmePath({
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
      relPath,
    });
  });
}
