import {
  resolveActualDiffNames,
  resolveEvaluatorDiffBase,
  resolveEvaluatorDiffBaseRef,
} from "../evaluator/evaluator-diff-evidence.js";
import type { CommandContext } from "../shared/task-backend.js";

export async function resolveObservedVerificationChangedPaths(opts: {
  ctx: CommandContext;
  evaluatedSha: string | null;
  taskId: string;
  artifactTaskIds: readonly string[];
}): Promise<string[]> {
  if (!opts.evaluatedSha) return [];
  const { config, resolvedProject } = opts.ctx;
  const baseRef =
    config.workflow_mode === "branch_pr"
      ? await resolveEvaluatorDiffBaseRef({ ctx: opts.ctx, taskId: opts.taskId })
      : null;
  const diffBaseSha = await resolveEvaluatorDiffBase({
    gitRoot: resolvedProject.gitRoot,
    evaluatedSha: opts.evaluatedSha,
    baseRef,
    allowSingleCommitFallback: true,
  });
  const taskArtifactPrefixes = opts.artifactTaskIds.map(
    (taskId) => `${config.paths.workflow_dir.replaceAll("\\", "/")}/${taskId}/`,
  );
  const exactChangedPaths = await resolveActualDiffNames(
    resolvedProject.gitRoot,
    opts.evaluatedSha,
    diffBaseSha,
  );
  return exactChangedPaths.filter(
    (changedPath) => !taskArtifactPrefixes.some((prefix) => changedPath.startsWith(prefix)),
  );
}
