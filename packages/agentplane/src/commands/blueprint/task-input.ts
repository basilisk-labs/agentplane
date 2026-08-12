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
import {
  BLUEPRINT_REQUEST_VALUES,
  MUTATION_SCOPE_VALUES,
  RISK_FLAG_VALUES,
  TASK_KIND_VALUES,
} from "../../backends/task-backend/shared/domain-values.js";
import { resolveEffectiveTaskWorkflowMode } from "../../runtime/task-routing/index.js";

export function workflowModeFromConfig(config: AgentplaneConfig): WorkflowMode | undefined {
  return config.workflow_mode === "direct" || config.workflow_mode === "branch_pr"
    ? config.workflow_mode
    : undefined;
}

function mutationFromExecutionContract(task: Pick<TaskData, "execution_contract">): MutationKind {
  const repositoryEffects = task.execution_contract?.authority.allowed_repository_effects ?? [];
  const externalEffects = task.execution_contract?.declaration.external_effects ?? [];
  if (repositoryEffects.includes("release_metadata") || externalEffects.includes("publish")) {
    return "release";
  }
  if (
    externalEffects.some((effect) =>
      ["external_write", "credentials", "deploy", "destructive_git"].includes(effect),
    )
  ) {
    return "ops";
  }
  if (
    repositoryEffects.some((effect) =>
      [
        "source_code",
        "tests",
        "public_api",
        "schema",
        "dependencies",
        "ci",
        "security_boundary",
      ].includes(effect),
    )
  ) {
    return "code";
  }
  if (repositoryEffects.includes("documentation")) return "docs";
  return repositoryEffects.includes("repository_write") ? "unknown" : "none";
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

function riskFlagsFromExecutionContract(task: Pick<TaskData, "execution_contract">): RiskFlag[] {
  const contract = task.execution_contract;
  if (!contract) return [];
  const risks: RiskFlag[] = [];
  if (contract.authority.allowed_repository_effects.includes("security_boundary")) {
    risks.push("security");
  }
  for (const effect of contract.declaration.external_effects) {
    if (effect === "network_read") risks.push("network");
    if (effect === "external_write") risks.push("external_system");
    if (effect === "credentials") risks.push("credentials");
    if (effect === "publish") risks.push("publish");
    if (effect === "deploy") risks.push("deploy");
    if (effect === "destructive_git") risks.push("merge");
  }
  return [...new Set(risks)].toSorted();
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
    workflowMode: opts.workflowMode ?? resolveEffectiveTaskWorkflowMode(opts.task, opts.config),
    mutation: opts.mutation ?? opts.task.mutation_scope ?? mutationFromExecutionContract(opts.task),
    mutationScope: enumValue<MutationKind>(opts.task.mutation_scope, MUTATION_SCOPE_VALUES),
    riskFlags:
      opts.riskFlags && opts.riskFlags.length > 0
        ? opts.riskFlags
        : [
            ...new Set([
              ...riskFlagsFromExecutionContract(opts.task),
              ...enumArray<RiskFlag>(opts.task.risk_flags, RISK_FLAG_VALUES),
            ]),
          ].toSorted(),
    blueprintRequest: enumValue<BlueprintId>(opts.task.blueprint_request, BLUEPRINT_REQUEST_VALUES),
  };
}
