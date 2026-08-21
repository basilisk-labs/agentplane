import {
  resolveActualDiffNames,
  resolveEvaluatorDiffBase,
} from "../evaluator/evaluator-diff-evidence.js";
import { isRecord } from "../../shared/guards.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { CommandContext } from "../shared/task-backend.js";

function hasFrozenDirectExecutionBase(extensions: unknown, executionBaseSha: string): boolean {
  if (!isRecord(extensions)) return false;
  const routeBaseline = isRecord(extensions.workflow_route_baseline)
    ? extensions.workflow_route_baseline
    : null;
  return (
    typeof routeBaseline?.start_head_sha === "string" &&
    routeBaseline.start_head_sha.trim() === executionBaseSha
  );
}

export async function resolveObservedVerificationChangedPaths(opts: {
  ctx: CommandContext;
  evaluatedSha: string | null;
  taskId: string;
  artifactTaskIds: readonly string[];
  execution: TaskExecutionContext;
}): Promise<string[]> {
  if (!opts.evaluatedSha) return [];
  const { config, resolvedProject } = opts.ctx;
  const task =
    opts.execution.selected_mode === "direct"
      ? await opts.ctx.taskBackend.getTask(opts.taskId)
      : null;
  const baseRef =
    opts.execution.selected_mode === "branch_pr" ||
    hasFrozenDirectExecutionBase(task?.extensions, opts.execution.base_sha)
      ? opts.execution.base_sha
      : null;
  // Use a frozen execution boundary when it is persisted; legacy direct tasks retain parent fallback.
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
