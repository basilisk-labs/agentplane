import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleGraph,
  PromptModuleLoadCondition,
} from "./model.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./schema.js";
import { mergeDuplicateNodes } from "./compiler.merge.js";
import {
  copyModule,
  moduleAddress,
  uniqueStrings,
  type WorkingPromptModuleNode,
} from "./compiler.shared.js";
import { applyPromptModuleMutation, describePromptModuleSelector } from "./mutations-engine.js";
import type {
  PromptModuleBinding,
  PromptModuleMutationSet,
  PromptModuleMutationWhen,
  PromptModuleSelector,
  PromptModuleValidator,
  PromptModuleValidatorPhase,
} from "./mutations.js";

export type PromptModulePolicyGateway = NonNullable<
  PromptModuleLoadCondition["policy_gateways"]
>[number];
export type PromptModuleWorkflowMode = NonNullable<
  PromptModuleLoadCondition["workflow_modes"]
>[number];

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

export type PromptModuleDiagnosticSeverity = "error" | "warning";

export type PromptModuleDiagnostic = {
  severity: PromptModuleDiagnosticSeverity;
  code:
    | "compiler_context_value_discarded"
    | "broad_disable_selector"
    | "duplicate_module"
    | "implicit_duplicate_selection"
    | "missing_dependency"
    | "missing_module"
    | "ambiguous_selector"
    | "missing_binding_endpoint"
    | "mutability_violation"
    | "validator_failed";
  message: string;
  module_address?: string;
  mutation_id?: string;
  validator_id?: string;
};

export type PromptModuleCompiledGraph = PromptModuleGraph & {
  diagnostics: PromptModuleDiagnostic[];
  validators: PromptModuleValidator[];
  bindings: PromptModuleBinding[];
  ok: boolean;
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

function contextCommands(context: PromptModuleCompilerContext): string[] {
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

function moduleRecipeId(module: PromptModule): string | undefined {
  if (module.owner.kind === "recipe") return module.owner.recipe_id;
  return module.provenance.recipe_id;
}

export function matchesPromptModuleSelector(
  module: PromptModule,
  selector: PromptModuleSelector,
): boolean {
  const address: PromptModuleAddress = module.address;
  return (
    (selector.address === undefined || selector.address === address.value) &&
    (selector.fragment_id === undefined ||
      selector.fragment_id === module.provenance.fragment_id) &&
    (selector.namespace === undefined || selector.namespace === address.namespace) &&
    (selector.surface === undefined || selector.surface === address.surface) &&
    (selector.target === undefined || selector.target === address.target) &&
    (selector.slot === undefined || selector.slot === address.slot) &&
    (selector.owner === undefined || selector.owner === module.owner.kind) &&
    (selector.recipe_id === undefined || selector.recipe_id === moduleRecipeId(module))
  );
}

export function matchesPromptModuleMutationWhen(
  when: PromptModuleMutationWhen | undefined,
  context: PromptModuleCompilerContext,
  modules: readonly PromptModule[],
): boolean {
  if (!matchesPromptModuleLoadCondition(when, context)) return false;
  const addresses = new Set(modules.map((module) => moduleAddress(module)));
  if (when?.module_present?.some((address) => !addresses.has(address))) return false;
  if (when?.module_absent?.some((address) => addresses.has(address))) return false;
  return true;
}

function validateDependencies(
  nodes: readonly WorkingPromptModuleNode[],
  diagnostics: PromptModuleDiagnostic[],
): void {
  const addresses = new Set(nodes.map((node) => moduleAddress(node.module)));
  for (const node of nodes) {
    for (const dependency of node.module.dependencies ?? []) {
      if (!dependency.required || addresses.has(dependency.address)) continue;
      diagnostics.push({
        severity: "error",
        code: "missing_dependency",
        module_address: moduleAddress(node.module),
        message: `Prompt module ${moduleAddress(node.module)} requires missing module ${dependency.address}.`,
      });
    }
  }
}

function validatorPhases(context: PromptModuleCompilerContext): Set<PromptModuleValidatorPhase> {
  return new Set(context.validator_phases ?? ["resolve", "compile"]);
}

function availableCommands(context: PromptModuleCompilerContext): Set<string> {
  return new Set([...(context.available_commands ?? []), ...contextCommands(context)]);
}

function runValidators(
  nodes: readonly WorkingPromptModuleNode[],
  validators: readonly PromptModuleValidator[],
  context: PromptModuleCompilerContext,
  diagnostics: PromptModuleDiagnostic[],
): void {
  const phases = validatorPhases(context);
  const modules = nodes.map((node) => node.module);
  const commands = availableCommands(context);

  for (const validator of validators) {
    if (!phases.has(validator.phase)) continue;
    if (!matchesPromptModuleMutationWhen(validator.when, context, modules)) continue;

    if (validator.kind === "required_module") {
      const found = modules.some((module) => matchesPromptModuleSelector(module, validator.target));
      if (!found) {
        diagnostics.push({
          severity: "error",
          code: "validator_failed",
          validator_id: validator.id,
          message: `Validator ${validator.id} requires a matching prompt module (${describePromptModuleSelector(validator.target)}).`,
        });
      }
    } else if (validator.kind === "forbidden_module") {
      const found = modules.some((module) => matchesPromptModuleSelector(module, validator.target));
      if (found) {
        diagnostics.push({
          severity: "error",
          code: "validator_failed",
          validator_id: validator.id,
          message: `Validator ${validator.id} forbids a matching prompt module (${describePromptModuleSelector(validator.target)}).`,
        });
      }
    } else if (validator.required && !commands.has(validator.command)) {
      diagnostics.push({
        severity: "error",
        code: "validator_failed",
        validator_id: validator.id,
        message: `Validator ${validator.id} requires command ${validator.command}.`,
      });
    }
  }
}

export function compilePromptModuleGraph(opts: {
  graph: PromptModuleGraph;
  context?: PromptModuleCompilerContext;
  mutation_sets?: PromptModuleMutationSet[];
  validators?: PromptModuleValidator[];
}): PromptModuleCompiledGraph {
  const diagnostics: PromptModuleDiagnostic[] = [];
  const context = normalizePromptModuleCompilerContext(opts.context ?? {}, diagnostics);
  let sequence = 0;
  const nextSequence = () => sequence++;
  const nodes: WorkingPromptModuleNode[] = opts.graph.nodes
    .filter((node) => matchesPromptModuleLoadCondition(node.module.load, context))
    .map((node) => ({
      ...node,
      module: copyModule(node.module),
      replaces: node.replaces ? [...node.replaces] : undefined,
      extends: node.extends ? [...node.extends] : undefined,
      sequence: nextSequence(),
    }));
  const validators = new Map<string, PromptModuleValidator>(
    (opts.validators ?? []).map((validator) => [validator.id, validator]),
  );
  const disabledValidators = new Set<string>();
  const bindings: PromptModuleBinding[] = [];

  for (const set of opts.mutation_sets ?? []) {
    for (const mutation of set.mutations) {
      applyPromptModuleMutation({
        nodes,
        mutation,
        context,
        diagnostics,
        validators,
        disabledValidators,
        bindings,
        nextSequence,
        matchesLoadCondition: matchesPromptModuleLoadCondition,
        matchesMutationWhen: matchesPromptModuleMutationWhen,
        matchesSelector: matchesPromptModuleSelector,
      });
    }
  }

  const loadedNodes = nodes.filter(
    (node) => node.disabled !== true && matchesPromptModuleLoadCondition(node.module.load, context),
  );
  const mergedNodes = mergeDuplicateNodes(loadedNodes, diagnostics);
  validateDependencies(mergedNodes, diagnostics);
  const enabledValidators = [...validators.values()].filter(
    (validator) => !disabledValidators.has(validator.id),
  );
  runValidators(mergedNodes, enabledValidators, context, diagnostics);

  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    nodes: mergedNodes.map((node) => {
      const { sequence: _sequence, disabled: _disabled, ...graphNode } = node;
      return graphNode;
    }),
    diagnostics,
    validators: enabledValidators,
    bindings,
    ok: diagnostics.every((diagnostic) => diagnostic.severity !== "error"),
  };
}
