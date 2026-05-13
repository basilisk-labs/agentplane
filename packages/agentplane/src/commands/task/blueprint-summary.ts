import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { TaskData, TaskSummary } from "../../backends/task-backend.js";
import {
  createTrustedProjectBlueprintRegistry,
  explainResolvedBlueprint,
  resolveBlueprint,
  type BlueprintExplainOutput,
} from "../../blueprints/index.js";
import { blueprintResolveInputFromTask } from "../blueprint/task-input.js";

export type TaskBlueprintLifecycleSummary = {
  blueprint_id?: string;
  blueprint_version?: string | number;
  workflow_mode?: string;
  workflow_git?: string;
  route?: string[];
  selection_reasons?: string[];
  required_evidence?: string[];
  stop_reasons?: string[];
  explain_command: string;
  snapshot_command: string;
  error?: string;
};

export type TaskBlueprintLifecycleResolver = (
  task: TaskData | TaskSummary,
) => TaskBlueprintLifecycleSummary;

type ProjectBlueprintRegistry = Awaited<ReturnType<typeof createTrustedProjectBlueprintRegistry>>;

function lifecycleSummaryFromExplain(
  taskId: string,
  output: BlueprintExplainOutput,
): TaskBlueprintLifecycleSummary {
  return {
    blueprint_id: output.blueprintId,
    blueprint_version: output.blueprintVersion,
    ...(output.workflowMode ? { workflow_mode: output.workflowMode } : {}),
    ...(output.workflowGitCapabilities
      ? {
          workflow_git: [
            `implementation_commit_location=${output.workflowGitCapabilities.implementationCommitLocation}`,
            `finish_commit_source=${output.workflowGitCapabilities.finishCommitSource}`,
            `close_tail_required=${output.workflowGitCapabilities.closeTailRequired ? "yes" : "no"}`,
            `finish_commit_from_comment=${output.workflowGitCapabilities.finishCommitFromComment ? "yes" : "no"}`,
          ].join(" "),
        }
      : {}),
    route: output.route.map((node) => node.kind),
    selection_reasons: [...output.selectionReasons],
    required_evidence: output.requiredEvidence.map((item) => item.id),
    stop_reasons: output.stopReasons.map((reason) => reason.id),
    explain_command: `agentplane blueprint explain ${taskId}`,
    snapshot_command: `agentplane blueprint snapshot ${taskId}`,
  };
}

function errorMessage(value: unknown): string {
  if (value instanceof Error) return value.message;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return value.toString();
  }
  try {
    return JSON.stringify(value) ?? "unknown error";
  } catch {
    return "unknown error";
  }
}

export async function resolveTaskBlueprintLifecycleSummary(opts: {
  task: TaskData | TaskSummary;
  config: AgentplaneConfig;
  projectRoot?: string;
}): Promise<TaskBlueprintLifecycleSummary> {
  const resolver = await createTaskBlueprintLifecycleResolver({
    config: opts.config,
    projectRoot: opts.projectRoot,
  });
  return resolver(opts.task);
}

export async function createTaskBlueprintLifecycleResolver(opts: {
  config: AgentplaneConfig;
  projectRoot?: string;
}): Promise<TaskBlueprintLifecycleResolver> {
  let projectRegistry: ProjectBlueprintRegistry | null = null;
  let projectRegistryError: unknown = null;
  if (opts.projectRoot) {
    try {
      projectRegistry = await createTrustedProjectBlueprintRegistry(opts.projectRoot);
    } catch (error) {
      projectRegistryError = error;
    }
  }
  return (task) => {
    const input = blueprintResolveInputFromTask({ task: task as TaskData, config: opts.config });
    try {
      if (projectRegistryError) {
        return {
          explain_command: `agentplane blueprint explain ${task.id}`,
          snapshot_command: `agentplane blueprint snapshot ${task.id}`,
          error: errorMessage(projectRegistryError),
        };
      }
      const resolved = resolveBlueprint({
        input,
        ...(projectRegistry
          ? {
              registry: projectRegistry.registry,
              projectBlueprintIds: projectRegistry.projectBlueprintIds,
            }
          : {}),
      });
      return lifecycleSummaryFromExplain(
        task.id,
        explainResolvedBlueprint({ resolved, input, workflowMode: input.workflowMode }),
      );
    } catch (error) {
      return {
        explain_command: `agentplane blueprint explain ${task.id}`,
        snapshot_command: `agentplane blueprint snapshot ${task.id}`,
        error: errorMessage(error),
      };
    }
  };
}

export function formatTaskBlueprintListExtra(summary: TaskBlueprintLifecycleSummary): string {
  if (summary.blueprint_id) return `blueprint=${summary.blueprint_id}`;
  return "blueprint=unresolved";
}

function joinOrNone(values: string[] | undefined, separator: string): string {
  return values && values.length > 0 ? values.join(separator) : "none";
}

export function formatTaskBlueprintCreationPreview(summary: TaskBlueprintLifecycleSummary): string {
  const lines = summary.error
    ? ["Blueprint route preview:", "blueprint_id: unresolved", `error: ${summary.error}`]
    : [
        "Blueprint route preview:",
        `blueprint_id: ${summary.blueprint_id ?? "unresolved"}`,
        ...(summary.blueprint_version === undefined
          ? []
          : [`blueprint_version: ${summary.blueprint_version}`]),
        ...(summary.workflow_mode ? [`workflow_mode: ${summary.workflow_mode}`] : []),
        ...(summary.workflow_git ? [`workflow_git: ${summary.workflow_git}`] : []),
        `route: ${joinOrNone(summary.route, " -> ")}`,
        `selection_reasons: ${joinOrNone(summary.selection_reasons, "; ")}`,
        `required_evidence: ${joinOrNone(summary.required_evidence, ", ")}`,
        `stop_reasons: ${joinOrNone(summary.stop_reasons, ", ")}`,
      ];
  return `${[
    ...lines,
    `explain_command: ${summary.explain_command}`,
    `snapshot_command: ${summary.snapshot_command}`,
  ].join("\n")}\n`;
}
