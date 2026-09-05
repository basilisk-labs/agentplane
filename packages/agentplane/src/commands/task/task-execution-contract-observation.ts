import type { TaskData } from "../../backends/task-backend.js";
import type { TaskExternalEffect, TaskVerificationObservation } from "@agentplaneorg/core/tasks";
import type { RunnerResult } from "../../runner/types.js";
import { reconcileTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";

export async function recordObservedTaskExecutionContract(opts: {
  command: CommandContext;
  execution: TaskExecutionContext;
  task: TaskData;
  changed_paths: readonly string[];
  observed_external_effects?: readonly TaskExternalEffect[];
  verification_results?: readonly TaskVerificationObservation[];
  preserved_commit?: string;
}): Promise<{ task: TaskData; escalated: boolean; episodeAuthorityViolations: string[] }> {
  if (!opts.execution.task_ids.includes(opts.task.id)) {
    throw new Error(`Execution context does not authorize task ${opts.task.id}.`);
  }
  const workflowDir = opts.command.config.paths.workflow_dir
    .replaceAll("\\", "/")
    .replaceAll(/\/+$/gu, "");
  const taskArtifactPrefix = `${workflowDir}/${opts.task.id}/`;
  const productChangedPaths = opts.changed_paths.filter(
    (changedPath) => !changedPath.replaceAll("\\", "/").startsWith(taskArtifactPrefix),
  );

  let escalated = false;
  let episodeAuthorityViolations: string[] = [];
  const mutation = await applyTaskMutation({
    ctx: opts.command,
    taskId: opts.task.id,
    build: (currentTask) => {
      const current = currentTask.execution_contract;
      const episodeReconciliation = current
        ? reconcileTaskExecutionContract({
            contract: {
              ...current,
              observed: {
                repository_effects: [],
                external_effects: [],
                changed_paths: [],
                changed_components: [],
                verification_results: [],
                authority_violations: [],
              },
            },
            changed_paths: productChangedPaths,
            ...(opts.observed_external_effects
              ? { observed_external_effects: opts.observed_external_effects }
              : {}),
            ...(opts.verification_results
              ? { verification_results: opts.verification_results }
              : {}),
          })
        : null;
      episodeAuthorityViolations =
        episodeReconciliation?.contract.observed.authority_violations ?? [];

      const reconciled = current
        ? reconcileTaskExecutionContract({
            contract: current,
            changed_paths: productChangedPaths,
            ...(opts.observed_external_effects
              ? { observed_external_effects: opts.observed_external_effects }
              : {}),
            ...(opts.verification_results
              ? { verification_results: opts.verification_results }
              : {}),
            ...(opts.preserved_commit ? { preserved_commit: opts.preserved_commit } : {}),
          })
        : null;
      escalated = reconciled?.escalated ?? false;
      const recordedImplementationCommit = currentTask.extensions?.implementation_commit;
      const recordedImplementationHash =
        typeof recordedImplementationCommit === "object" &&
        recordedImplementationCommit !== null &&
        "hash" in recordedImplementationCommit &&
        typeof recordedImplementationCommit.hash === "string"
          ? recordedImplementationCommit.hash.trim()
          : "";
      const implementationCommitChanged =
        opts.preserved_commit !== undefined && recordedImplementationHash !== opts.preserved_commit;
      const contractChanged =
        reconciled !== null && JSON.stringify(reconciled.contract) !== JSON.stringify(current);
      if (!contractChanged && !implementationCommitChanged) return null;
      const blueprintRequest =
        reconciled?.escalated && currentTask.blueprint_request === "code.direct"
          ? "code.branch_pr"
          : currentTask.blueprint_request;

      return {
        nextTask: {
          ...currentTask,
          blueprint_request: blueprintRequest,
          ...(implementationCommitChanged
            ? {
                extensions: {
                  ...currentTask.extensions,
                  implementation_commit: { hash: opts.preserved_commit },
                },
              }
            : {}),
          execution_contract: reconciled?.contract ?? current,
          execution_route:
            reconciled && currentTask.execution_route
              ? {
                  ...currentTask.execution_route,
                  selected_mode: reconciled.contract.selected_mode,
                  reason_codes: [...reconciled.contract.reason_codes],
                }
              : undefined,
        },
      };
    },
    writeOptions: opts.task.revision ? { expectedRevision: opts.task.revision } : undefined,
  });
  return {
    task: mutation.changed
      ? await loadTaskFromContext({ ctx: opts.command, taskId: opts.task.id })
      : mutation.task,
    escalated,
    episodeAuthorityViolations,
  };
}

const SUPERVISOR_EXTERNAL_CAPABILITY_EFFECTS = new Map<string, TaskExternalEffect>([
  ["agentplane.network.read", "network_read"],
  ["agentplane.external.write", "external_write"],
  ["agentplane.credentials.use", "credentials"],
  ["agentplane.package.publish", "publish"],
  ["agentplane.deploy", "deploy"],
  ["agentplane.git.destructive", "destructive_git"],
]);

/**
 * Only supervisor-issued capability ids are objective observations. Provider prose and
 * agent-writable manifest claims never enter the execution contract as observed effects.
 */
export function observedExternalEffectsFromRunnerResult(
  result: Pick<RunnerResult, "capabilities_used"> | null,
): TaskExternalEffect[] {
  return [
    ...new Set(
      (result?.capabilities_used ?? []).flatMap((capability) => {
        const effect = SUPERVISOR_EXTERNAL_CAPABILITY_EFFECTS.get(capability);
        return effect ? [effect] : [];
      }),
    ),
  ].toSorted();
}
