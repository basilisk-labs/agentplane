import {
  resolveActualDiffNames,
  resolveEvaluatorDiffBase,
} from "../evaluator/evaluator-diff-evidence.js";
import { isRecord } from "../../shared/guards.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { CommandContext } from "../shared/task-backend.js";
import { gitIsAncestor } from "@agentplaneorg/core/git";
import {
  componentForVerificationPath,
  repositoryEffectsForPath,
  type TaskExecutionContract,
  type TaskVerificationObservation,
} from "@agentplaneorg/core/tasks";
import { reconcileTaskExecutionContract } from "../../runtime/task-routing/index.js";

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

/** Keep the full frozen verification range, but do not attribute inherited base content to the task. */
export async function resolveInheritedVerificationPaths(
  opts: Parameters<typeof resolveObservedVerificationChangedPaths>[0] & {
    changed_paths: readonly string[];
  },
): Promise<string[]> {
  // An empty verification range cannot remove any write observation. Legacy lifecycle-only
  // descendants can resolve their execution base after the semantic implementation commit.
  if (
    opts.execution.selected_mode !== "branch_pr" ||
    !opts.evaluatedSha ||
    opts.changed_paths.length === 0
  ) {
    return [];
  }
  const root = opts.ctx.resolvedProject.gitRoot;
  const base = await resolveEvaluatorDiffBase({
    gitRoot: root,
    evaluatedSha: opts.evaluatedSha,
    baseRef: opts.execution.base_ref,
  });
  if (!base || !(await gitIsAncestor(root, opts.execution.base_sha, base))) {
    throw new Error("Verification authority base is outside the frozen execution ancestry.");
  }
  const owned = new Set(await resolveActualDiffNames(root, opts.evaluatedSha, base));
  return opts.changed_paths.filter((file) => !owned.has(file));
}

/** Verification coverage may include inherited files; semantic write observations must not. */
export function reconcileVerificationExecutionContract(opts: {
  contract: TaskExecutionContract;
  changed_paths: readonly string[];
  inherited_paths: readonly string[];
  verification_results?: readonly TaskVerificationObservation[];
}): TaskExecutionContract {
  const inherited = new Set(opts.inherited_paths);
  const paths = [
    ...new Set([...opts.contract.observed.changed_paths, ...opts.changed_paths]),
  ].filter((file) => !inherited.has(file));
  const effects = new Set(paths.flatMap((file) => repositoryEffectsForPath(file)));
  const inheritedOnlyEffects = new Set(
    opts.inherited_paths
      .flatMap((file) => repositoryEffectsForPath(file))
      .filter((effect) => !effects.has(effect)),
  );
  const scoped = reconcileTaskExecutionContract({
    contract: {
      ...opts.contract,
      reason_codes: opts.contract.reason_codes.filter(
        (code) =>
          !opts.inherited_paths.some((file) => code === `observed_path_outside_scope:${file}`) &&
          ![...inheritedOnlyEffects].some((effect) => code === `observed_effect_${effect}`),
      ),
      observed: {
        ...opts.contract.observed,
        changed_paths: paths,
        changed_components: [
          ...new Set(paths.map((file) => componentForVerificationPath(file))),
        ].toSorted(),
        repository_effects: opts.contract.observed.repository_effects.filter(
          (effect) => !inheritedOnlyEffects.has(effect),
        ),
        authority_violations: opts.contract.observed.authority_violations.filter(
          (violation) =>
            !opts.inherited_paths.some((file) => violation === `writable_scope:${file}`) &&
            ![...inheritedOnlyEffects].some(
              (effect) => violation === `repository_effect:${effect}`,
            ),
        ),
      },
    },
    changed_paths: paths,
    verification_results: opts.verification_results,
  }).contract;
  const coverage = reconcileTaskExecutionContract({
    contract: scoped,
    changed_paths: opts.changed_paths,
  }).contract;
  return { ...scoped, verification: coverage.verification };
}
