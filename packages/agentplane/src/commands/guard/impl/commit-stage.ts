import { protectedPathKindForFile } from "../../../shared/protected-paths.js";
import { isTaskLocalAdvancePath } from "../../shared/task-local-freshness.js";
import { type CommandContext } from "../../shared/task-backend.js";

export function hasExplicitCommitScope(opts: {
  allow: string[];
  allowTasks: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
}): boolean {
  return (
    opts.allow.some((prefix) => prefix.trim().length > 0) ||
    opts.allowTasks ||
    opts.allowPolicy ||
    opts.allowConfig ||
    opts.allowHooks ||
    opts.allowCI
  );
}

export async function stageActiveTaskArtifactsFromAllowTasks(opts: {
  ctx: CommandContext;
  taskId: string;
  allowTasks: boolean;
}): Promise<string[]> {
  if (!opts.allowTasks) return [];

  const changedPaths = await opts.ctx.git.statusChangedPaths();
  const taskArtifactPaths = changedPaths.filter((relPath) =>
    isTaskLocalAdvancePath({
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskId: opts.taskId,
      tasksPath: opts.ctx.config.paths.tasks_path,
      relPath,
    }),
  );
  if (taskArtifactPaths.length === 0) return [];

  const staged = new Set(await opts.ctx.git.statusStagedPaths());
  const unique = [...new Set(taskArtifactPaths)]
    .filter((relPath) => !staged.has(relPath))
    .toSorted((a, b) => a.localeCompare(b));
  if (unique.length === 0) return [];
  await opts.ctx.git.stage(unique);
  return unique;
}

export async function stageCloseCommitPaths(opts: {
  ctx: CommandContext;
  readmeRel: string;
  taskId: string;
  allowPolicy: boolean;
}): Promise<void> {
  const stagePaths = new Set<string>([opts.readmeRel]);
  if (opts.allowPolicy) {
    const changedPaths = await opts.ctx.git.statusChangedPaths();
    for (const relPath of changedPaths) {
      if (
        protectedPathKindForFile({
          filePath: relPath,
          tasksPath: opts.ctx.config.paths.tasks_path,
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskId: opts.taskId,
        }) === "policy"
      ) {
        stagePaths.add(relPath);
      }
    }
  }
  await opts.ctx.git.stage([...stagePaths].toSorted((a, b) => a.localeCompare(b)));
}
