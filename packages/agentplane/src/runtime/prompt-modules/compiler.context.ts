import type { PromptModuleLoadCondition } from "./model.js";
import { uniqueStrings } from "./compiler.shared.js";
import type { PromptModuleValidatorPhase } from "./mutations.js";
import type { PromptModuleDiagnostic } from "./compiler.js";

type PromptModulePolicyGateway = NonNullable<PromptModuleLoadCondition["policy_gateways"]>[number];
type PromptModuleWorkflowMode = NonNullable<PromptModuleLoadCondition["workflow_modes"]>[number];

export type PromptModuleCompilerContext = {
  workflow_mode?: PromptModuleWorkflowMode;
  policy_gateway?: PromptModulePolicyGateway;
  roles?: string[];
  command?: string;
  commands?: string[];
  task_tags?: string[];
  repo_type?: string;
  repo_types?: string[];
  recipe_ids?: string[];
  available_commands?: string[];
  validator_phases?: PromptModuleValidatorPhase[];
};

const PROMPT_MODULE_WORKFLOW_MODE_VALUES = ["direct", "branch_pr"] as const;
const PROMPT_MODULE_POLICY_GATEWAY_VALUES = ["codex", "claude"] as const;
const PROMPT_MODULE_VALIDATOR_PHASE_VALUES = ["resolve", "compile", "emit", "doctor"] as const;

function hasAllowedValue<TValue extends string>(
  value: string,
  allowedValues: readonly TValue[],
): value is TValue {
  return (allowedValues as readonly string[]).includes(value);
}

function contextValueLabel(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (value === undefined) return "undefined";
  return Object.prototype.toString.call(value);
}

function hasControlCharacter(value: string): boolean {
  for (const character of value) {
    const code = character.codePointAt(0) ?? 0;
    if (code <= 0x1f || code === 0x7f) return true;
  }
  return false;
}

function reportDiscardedContextValue(
  diagnostics: PromptModuleDiagnostic[],
  field: string,
  value: unknown,
  reason: string,
): void {
  diagnostics.push({
    severity: "warning",
    code: "compiler_context_value_discarded",
    message: `Discarded compiler context value ${field}=${contextValueLabel(value)}: ${reason}.`,
  });
}

function normalizeContextString<TValue extends string = string>(
  value: unknown,
  field: string,
  diagnostics: PromptModuleDiagnostic[],
  allowedValues?: readonly TValue[],
): TValue | string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    reportDiscardedContextValue(diagnostics, field, value, "expected string");
    return undefined;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    reportDiscardedContextValue(diagnostics, field, value, "empty after trimming");
    return undefined;
  }
  if (hasControlCharacter(trimmed)) {
    reportDiscardedContextValue(diagnostics, field, value, "contains control characters");
    return undefined;
  }
  if (allowedValues && !hasAllowedValue(trimmed, allowedValues)) {
    reportDiscardedContextValue(
      diagnostics,
      field,
      value,
      `expected one of ${allowedValues.join(", ")}`,
    );
    return undefined;
  }
  return trimmed;
}

function normalizeContextStringList<TValue extends string = string>(
  value: unknown,
  field: string,
  diagnostics: PromptModuleDiagnostic[],
  allowedValues?: readonly TValue[],
): TValue[] | string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    reportDiscardedContextValue(diagnostics, field, value, "expected string array");
    return undefined;
  }

  const normalized: string[] = [];
  for (const [index, item] of value.entries()) {
    const normalizedItem = normalizeContextString(
      item,
      `${field}[${index}]`,
      diagnostics,
      allowedValues,
    );
    if (normalizedItem !== undefined) normalized.push(normalizedItem);
  }
  return uniqueStrings(normalized);
}

export function normalizePromptModuleCompilerContext(
  context: PromptModuleCompilerContext = {},
  diagnostics: PromptModuleDiagnostic[] = [],
): PromptModuleCompilerContext {
  const raw = context as Record<string, unknown>;
  const normalized: PromptModuleCompilerContext = {};

  const workflowMode = normalizeContextString(
    raw.workflow_mode,
    "workflow_mode",
    diagnostics,
    PROMPT_MODULE_WORKFLOW_MODE_VALUES,
  );
  if (workflowMode !== undefined) {
    normalized.workflow_mode = workflowMode as PromptModuleWorkflowMode;
  }

  const policyGateway = normalizeContextString(
    raw.policy_gateway,
    "policy_gateway",
    diagnostics,
    PROMPT_MODULE_POLICY_GATEWAY_VALUES,
  );
  if (policyGateway !== undefined) {
    normalized.policy_gateway = policyGateway as PromptModulePolicyGateway;
  }

  const command = normalizeContextString(raw.command, "command", diagnostics);
  if (command !== undefined) normalized.command = command;

  const repoType = normalizeContextString(raw.repo_type, "repo_type", diagnostics);
  if (repoType !== undefined) normalized.repo_type = repoType;

  const roles = normalizeContextStringList(raw.roles, "roles", diagnostics);
  if (roles !== undefined) normalized.roles = roles;

  const commands = normalizeContextStringList(raw.commands, "commands", diagnostics);
  if (commands !== undefined) normalized.commands = commands;

  const taskTags = normalizeContextStringList(raw.task_tags, "task_tags", diagnostics);
  if (taskTags !== undefined) normalized.task_tags = taskTags;

  const repoTypes = normalizeContextStringList(raw.repo_types, "repo_types", diagnostics);
  if (repoTypes !== undefined) normalized.repo_types = repoTypes;

  const recipeIds = normalizeContextStringList(raw.recipe_ids, "recipe_ids", diagnostics);
  if (recipeIds !== undefined) normalized.recipe_ids = recipeIds;

  const availableCommands = normalizeContextStringList(
    raw.available_commands,
    "available_commands",
    diagnostics,
  );
  if (availableCommands !== undefined) normalized.available_commands = availableCommands;

  const validatorPhases = normalizeContextStringList(
    raw.validator_phases,
    "validator_phases",
    diagnostics,
    PROMPT_MODULE_VALIDATOR_PHASE_VALUES,
  );
  if (validatorPhases !== undefined) {
    normalized.validator_phases = validatorPhases as PromptModuleValidatorPhase[];
  }

  return normalized;
}

export function contextCommands(context: PromptModuleCompilerContext): string[] {
  return uniqueStrings([context.command ?? "", ...(context.commands ?? [])]);
}

function contextRepoTypes(context: PromptModuleCompilerContext): string[] {
  return uniqueStrings([context.repo_type ?? "", ...(context.repo_types ?? [])]);
}

function intersects<T>(expected: readonly T[] | undefined, actual: readonly T[]): boolean {
  if (!expected || expected.length === 0) return true;
  return expected.some((value) => actual.includes(value));
}

function includesValue<T>(expected: readonly T[] | undefined, actual: T | undefined): boolean {
  if (!expected || expected.length === 0) return true;
  return actual === undefined ? false : expected.includes(actual);
}

export function matchesPromptModuleLoadCondition(
  condition: PromptModuleLoadCondition | undefined,
  context: PromptModuleCompilerContext,
): boolean {
  if (!condition) return true;
  return (
    includesValue(condition.workflow_modes, context.workflow_mode) &&
    includesValue(condition.policy_gateways, context.policy_gateway) &&
    intersects(condition.roles, context.roles ?? []) &&
    intersects(condition.commands, contextCommands(context)) &&
    intersects(condition.task_tags_any, context.task_tags ?? []) &&
    intersects(condition.repo_types, contextRepoTypes(context)) &&
    intersects(condition.recipe_ids, context.recipe_ids ?? [])
  );
}
