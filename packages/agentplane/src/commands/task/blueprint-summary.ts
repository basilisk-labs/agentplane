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
  route?: string[];
  selection_reasons?: string[];
  required_evidence?: string[];
  stop_reasons?: string[];
  explain_command: string;
  snapshot_command: string;
  error?: string;
};

function lifecycleSummaryFromExplain(
  taskId: string,
  output: BlueprintExplainOutput,
): TaskBlueprintLifecycleSummary {
  return {
    blueprint_id: output.blueprintId,
    blueprint_version: output.blueprintVersion,
    ...(output.workflowMode ? { workflow_mode: output.workflowMode } : {}),
    route: output.route.map((node) => node.kind),
    selection_reasons: [...output.selectionReasons],
    required_evidence: output.requiredEvidence.map((item) => item.id),
    stop_reasons: output.stopReasons.map((reason) => reason.id),
    explain_command: `agentplane blueprint explain ${taskId}`,
    snapshot_command: `agentplane blueprint snapshot ${taskId}`,
  };
}

export async function resolveTaskBlueprintLifecycleSummary(opts: {
  task: TaskData | TaskSummary;
  config: AgentplaneConfig;
  projectRoot?: string;
}): Promise<TaskBlueprintLifecycleSummary> {
  const input = blueprintResolveInputFromTask({ task: opts.task as TaskData, config: opts.config });
  try {
    const projectRegistry = opts.projectRoot
      ? await createTrustedProjectBlueprintRegistry(opts.projectRoot)
      : null;
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
      opts.task.id,
      explainResolvedBlueprint({ resolved, input, workflowMode: input.workflowMode }),
    );
  } catch (error) {
    return {
      explain_command: `agentplane blueprint explain ${opts.task.id}`,
      snapshot_command: `agentplane blueprint snapshot ${opts.task.id}`,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export function formatTaskBlueprintListExtra(summary: TaskBlueprintLifecycleSummary): string {
  if (summary.blueprint_id) return `blueprint=${summary.blueprint_id}`;
  return "blueprint=unresolved";
}

function joinOrNone(values: string[] | undefined, separator: string): string {
  return values && values.length > 0 ? values.join(separator) : "none";
}

export function formatTaskBlueprintCreationPreview(
  summary: TaskBlueprintLifecycleSummary,
): string {
  const lines = summary.error
    ? ["Blueprint route preview:", "blueprint_id: unresolved", `error: ${summary.error}`]
    : [
        "Blueprint route preview:",
        `blueprint_id: ${summary.blueprint_id ?? "unresolved"}`,
        ...(summary.blueprint_version === undefined
          ? []
          : [`blueprint_version: ${summary.blueprint_version}`]),
        ...(summary.workflow_mode ? [`workflow_mode: ${summary.workflow_mode}`] : []),
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
