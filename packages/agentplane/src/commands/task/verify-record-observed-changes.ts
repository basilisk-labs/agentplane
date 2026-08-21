import {
  resolveActualDiffNames,
  resolveEvaluatorDiffBase,
} from "../evaluator/evaluator-diff-evidence.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { CommandContext } from "../shared/task-backend.js";

export async function resolveObservedVerificationChangedPaths(opts: {
  ctx: CommandContext;
  evaluatedSha: string | null;
  taskId: string;
  artifactTaskIds: readonly string[];
  execution: TaskExecutionContext;
}): Promise<string[]> {
  if (!opts.evaluatedSha) return [];
  const { config, resolvedProject } = opts.ctx;
  const diffBaseSha = await resolveEvaluatorDiffBase({
    gitRoot: resolvedProject.gitRoot,
    evaluatedSha: opts.evaluatedSha,
    baseRef: opts.execution.base_sha,
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
