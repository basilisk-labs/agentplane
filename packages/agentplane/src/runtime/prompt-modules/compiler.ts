import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleGraph,
  PromptModuleLoadCondition,
} from "./model.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./schema.js";
import { mergeDuplicateNodes } from "./compiler.merge.js";
import { copyModule, moduleAddress, type WorkingPromptModuleNode } from "./compiler.shared.js";
import {
  contextCommands,
  matchesPromptModuleLoadCondition,
  normalizePromptModuleCompilerContext,
  type PromptModuleCompilerContext,
} from "./compiler.context.js";
import { applyPromptModuleMutation, describePromptModuleSelector } from "./mutations-engine.js";
import type {
  PromptModuleBinding,
  PromptModuleMutationSet,
  PromptModuleMutationWhen,
  PromptModuleSelector,
  PromptModuleValidator,
  PromptModuleValidatorPhase,
} from "./mutations.js";

export {
  matchesPromptModuleLoadCondition,
  normalizePromptModuleCompilerContext,
} from "./compiler.context.js";
export type { PromptModuleCompilerContext } from "./compiler.context.js";

export type PromptModulePolicyGateway = NonNullable<
  PromptModuleLoadCondition["policy_gateways"]
>[number];
export type PromptModuleWorkflowMode = NonNullable<
  PromptModuleLoadCondition["workflow_modes"]
>[number];

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
