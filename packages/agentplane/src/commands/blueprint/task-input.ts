import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { TaskData } from "../../backends/task-backend.js";
import type {
  BlueprintResolveInput,
  MutationKind,
  RiskFlag,
  WorkflowMode,
} from "../../blueprints/model.js";

const CODE_TAGS = ["code", "backend", "frontend", "cli"] as const;
const DOCS_TAGS = ["docs", "documentation", "roadmap"] as const;
const OPS_TAGS = ["ops", "deploy", "config"] as const;

function hasAny(tags: Set<string>, candidates: readonly string[]): boolean {
  return candidates.some((candidate) => tags.has(candidate));
}

export function workflowModeFromConfig(config: AgentplaneConfig): WorkflowMode | undefined {
  return config.workflow_mode === "direct" || config.workflow_mode === "branch_pr"
    ? config.workflow_mode
    : undefined;
}

export function inferMutationFromTask(task: Pick<TaskData, "tags" | "verify">): MutationKind {
  const tags = new Set((task.tags ?? []).map((tag) => tag.trim().toLowerCase()).filter(Boolean));
  if (hasAny(tags, ["release", "publish"])) return "release";
  if (hasAny(tags, OPS_TAGS)) return "ops";
  if (hasAny(tags, CODE_TAGS)) return "code";
  if (hasAny(tags, DOCS_TAGS)) return "docs";
  if ((task.verify ?? []).length > 0) return "code";
  return "none";
}

export function blueprintResolveInputFromTask(opts: {
  task: TaskData;
  config: AgentplaneConfig;
  mutation?: MutationKind;
  workflowMode?: WorkflowMode;
  riskFlags?: readonly RiskFlag[];
}): BlueprintResolveInput {
  return {
    taskId: opts.task.id,
    title: opts.task.title,
    description: opts.task.description,
    tags: opts.task.tags ?? [],
    owner: opts.task.owner,
    workflowMode: opts.workflowMode ?? workflowModeFromConfig(opts.config),
    mutation: opts.mutation ?? inferMutationFromTask(opts.task),
    riskFlags: opts.riskFlags,
  };
}
