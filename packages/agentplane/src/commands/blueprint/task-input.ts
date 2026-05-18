import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { TaskData } from "../../backends/task-backend.js";
import type {
  BlueprintResolveInput,
  BlueprintId,
  MutationKind,
  RiskFlag,
  TaskKind,
  WorkflowMode,
} from "../../blueprints/model.js";

const CODE_TAGS = ["code", "backend", "frontend", "cli"] as const;
const DOCS_TAGS = ["docs", "documentation", "roadmap"] as const;
const OPS_TAGS = ["ops", "deploy", "config"] as const;
const TASK_KIND_VALUES = new Set([
  "analysis",
  "content",
  "docs",
  "code",
  "release",
  "ops",
  "context",
]);
const MUTATION_SCOPE_VALUES = new Set([
  "none",
  "docs",
  "code",
  "release",
  "ops",
  "context",
  "unknown",
]);
const RISK_FLAG_VALUES = new Set([
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
]);
const BLUEPRINT_REQUEST_VALUES = new Set([
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "performance.benchmark",
  "quality.regression",
  "context.assimilation",
  "post_run.improvement_review",
  "release.strict",
  "ops.approval",
]);

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

function enumValue<T extends string>(value: unknown, allowed: Set<string>): T | undefined {
  return typeof value === "string" && allowed.has(value) ? (value as T) : undefined;
}

function enumArray<T extends string>(value: unknown, allowed: Set<string>): T[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string" && allowed.has(item))
    .filter((item, index, array) => array.indexOf(item) === index) as T[];
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
    taskKind: enumValue<TaskKind>(opts.task.task_kind, TASK_KIND_VALUES),
    workflowMode: opts.workflowMode ?? workflowModeFromConfig(opts.config),
    mutation: opts.mutation ?? opts.task.mutation_scope ?? inferMutationFromTask(opts.task),
    mutationScope: enumValue<MutationKind>(opts.task.mutation_scope, MUTATION_SCOPE_VALUES),
    riskFlags:
      opts.riskFlags && opts.riskFlags.length > 0
        ? opts.riskFlags
        : enumArray<RiskFlag>(opts.task.risk_flags, RISK_FLAG_VALUES),
    blueprintRequest: enumValue<BlueprintId>(opts.task.blueprint_request, BLUEPRINT_REQUEST_VALUES),
  };
}
