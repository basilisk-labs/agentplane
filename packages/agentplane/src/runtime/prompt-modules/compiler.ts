import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleGraph,
  PromptModuleGraphNode,
  PromptModuleLoadCondition,
} from "./model.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./model.js";
import type {
  PromptModuleBinding,
  PromptModuleMutation,
  PromptModuleMutationSet,
  PromptModuleMutationWhen,
  PromptModuleSelector,
  PromptModuleStructuredPatch,
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
    | "duplicate_module"
    | "missing_dependency"
    | "missing_module"
    | "ambiguous_selector"
    | "missing_binding_endpoint"
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

type WorkingPromptModuleNode = PromptModuleGraphNode & {
  sequence: number;
  disabled?: boolean;
};

function uniqueStrings(values: Iterable<string>): string[] {
  return [...new Set([...values].filter((value) => value.trim().length > 0))];
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

function moduleAddress(module: PromptModule): string {
  return module.address.value;
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
    (selector.namespace === undefined || selector.namespace === address.namespace) &&
    (selector.surface === undefined || selector.surface === address.surface) &&
    (selector.target === undefined || selector.target === address.target) &&
    (selector.slot === undefined || selector.slot === address.slot) &&
    (selector.owner === undefined || selector.owner === module.owner.kind) &&
    (selector.recipe_id === undefined || selector.recipe_id === moduleRecipeId(module))
  );
}

function activeModules(nodes: readonly WorkingPromptModuleNode[]): PromptModule[] {
  return nodes.filter((node) => node.disabled !== true).map((node) => node.module);
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

function findMatchingNodeIndexes(
  nodes: readonly WorkingPromptModuleNode[],
  selector: PromptModuleSelector,
): number[] {
  const indexes: number[] = [];
  for (const [index, node] of nodes.entries()) {
    if (node.disabled === true) continue;
    if (matchesPromptModuleSelector(node.module, selector)) indexes.push(index);
  }
  return indexes;
}

function copyModule(module: PromptModule): PromptModule {
  return structuredClone(module);
}

function patchModule(module: PromptModule, patch: PromptModuleStructuredPatch): PromptModule {
  const next = copyModule(module);
  if (patch.title !== undefined) next.title = patch.title;
  if (patch.summary !== undefined) {
    if (patch.summary === null) {
      delete next.summary;
    } else {
      next.summary = patch.summary;
    }
  }
  if (patch.content !== undefined) next.content = patch.content;
  if (patch.mutability !== undefined) next.mutability = patch.mutability;
  if (patch.merge !== undefined) next.merge = patch.merge;
  if (patch.load !== undefined) {
    if (patch.load === null) {
      delete next.load;
    } else {
      next.load = patch.load;
    }
  }
  if (patch.dependencies !== undefined) {
    if (patch.dependencies === null) {
      delete next.dependencies;
    } else {
      next.dependencies = patch.dependencies;
    }
  }
  if (patch.provenance !== undefined) next.provenance = patch.provenance;
  return next;
}

function precedenceOf(module: PromptModule): number {
  return module.merge.precedence ?? 0;
}

function sortedByPrecedence(nodes: readonly WorkingPromptModuleNode[]): WorkingPromptModuleNode[] {
  return nodes.toSorted((left, right) => {
    const precedenceDiff = precedenceOf(left.module) - precedenceOf(right.module);
    if (precedenceDiff !== 0) return precedenceDiff;
    return left.sequence - right.sequence;
  });
}

function chooseHighestPrecedence(
  nodes: readonly WorkingPromptModuleNode[],
): WorkingPromptModuleNode {
  return sortedByPrecedence(nodes).at(-1)!;
}

function chooseLastWriter(nodes: readonly WorkingPromptModuleNode[]): WorkingPromptModuleNode {
  return nodes.toSorted((left, right) => left.sequence - right.sequence).at(-1)!;
}

function cloneNode(node: WorkingPromptModuleNode): WorkingPromptModuleNode {
  return {
    ...node,
    module: copyModule(node.module),
    replaces: node.replaces ? [...node.replaces] : undefined,
    extends: node.extends ? [...node.extends] : undefined,
  };
}

function mergeStringContent(
  nodes: readonly WorkingPromptModuleNode[],
  direction: "append" | "prepend",
): string | null {
  if (nodes.some((node) => typeof node.module.content !== "string")) return null;
  const sorted = sortedByPrecedence(nodes);
  const ordered = direction === "append" ? sorted : sorted.toReversed();
  return ordered
    .map((node) => (typeof node.module.content === "string" ? node.module.content : ""))
    .join("");
}

function mergeObjectContent(
  nodes: readonly WorkingPromptModuleNode[],
): Record<string, unknown> | null {
  const merged: Record<string, unknown> = {};
  for (const node of sortedByPrecedence(nodes)) {
    if (!node.module.content || typeof node.module.content !== "object") return null;
    if (Array.isArray(node.module.content)) return null;
    Object.assign(merged, node.module.content);
  }
  return merged;
}

function unionByIdContent(
  nodes: readonly WorkingPromptModuleNode[],
): Record<string, unknown> | null {
  const merged: Record<string, unknown> = {};
  for (const node of sortedByPrecedence(nodes)) {
    if (!node.module.content || typeof node.module.content !== "object") return null;
    if (Array.isArray(node.module.content)) return null;
    for (const [key, value] of Object.entries(node.module.content)) {
      if (!Array.isArray(value)) {
        merged[key] = value;
        continue;
      }
      const byId = new Map<string, unknown>();
      const previous = merged[key];
      if (Array.isArray(previous)) {
        for (const item of previous) {
          const id = item && typeof item === "object" ? (item as { id?: unknown }).id : null;
          if (typeof id === "string") byId.set(id, item);
        }
      }
      for (const item of value) {
        const id = item && typeof item === "object" ? (item as { id?: unknown }).id : null;
        if (typeof id === "string") byId.set(id, item);
      }
      merged[key] = [...byId.values()];
    }
  }
  return merged;
}

function mergeDuplicateNodes(
  nodes: readonly WorkingPromptModuleNode[],
  diagnostics: PromptModuleDiagnostic[],
): WorkingPromptModuleNode[] {
  const byAddress = new Map<string, WorkingPromptModuleNode[]>();
  for (const node of nodes) {
    const address = moduleAddress(node.module);
    byAddress.set(address, [...(byAddress.get(address) ?? []), node]);
  }

  const merged: WorkingPromptModuleNode[] = [];
  for (const [address, group] of byAddress.entries()) {
    if (group.length === 1) {
      const only = group[0];
      if (only) merged.push(cloneNode(only));
      continue;
    }

    const latest = group.at(-1);
    const first = group[0];
    if (!latest || !first) continue;
    const conflictPolicy = latest.module.merge.conflict;
    const mergeMode = latest.module.merge.mode;
    switch (conflictPolicy) {
      case "error": {
        diagnostics.push({
          severity: "error",
          code: "duplicate_module",
          module_address: address,
          message: `Multiple active prompt modules target ${address}.`,
        });
        merged.push(cloneNode(first));
        continue;
      }
      case "highest_precedence": {
        merged.push(cloneNode(chooseHighestPrecedence(group)));
        continue;
      }
      case "last_writer_wins": {
        merged.push(cloneNode(chooseLastWriter(group)));
        continue;
      }
      case "keep_all": {
        if (mergeMode !== "replace") break;
        merged.push(cloneNode(chooseLastWriter(group)));
        continue;
      }
    }

    const base = cloneNode(chooseHighestPrecedence(group));
    switch (mergeMode) {
      case "append":
      case "prepend": {
        const content = mergeStringContent(group, mergeMode);
        if (content === null) {
          diagnostics.push({
            severity: "error",
            code: "duplicate_module",
            module_address: address,
            message: `Cannot ${mergeMode} non-string prompt module content for ${address}.`,
          });
        } else {
          base.module.content = content;
        }
        break;
      }
      case "merge_object": {
        const content = mergeObjectContent(group);
        if (content === null) {
          diagnostics.push({
            severity: "error",
            code: "duplicate_module",
            module_address: address,
            message: `Cannot merge non-object prompt module content for ${address}.`,
          });
        } else {
          base.module.content = content;
        }
        break;
      }
      case "union_by_id": {
        const content = unionByIdContent(group);
        if (content === null) {
          diagnostics.push({
            severity: "error",
            code: "duplicate_module",
            module_address: address,
            message: `Cannot union non-object prompt module content for ${address}.`,
          });
        } else {
          base.module.content = content;
        }
        break;
      }
      case "pick_one": {
        break;
      }
    }
    base.extends = uniqueStrings(group.flatMap((node) => node.extends ?? []));
    base.replaces = uniqueStrings(group.flatMap((node) => node.replaces ?? []));
    merged.push(base);
  }

  return merged.toSorted((left, right) => {
    const precedenceDiff = precedenceOf(left.module) - precedenceOf(right.module);
    if (precedenceDiff !== 0) return precedenceDiff;
    return left.sequence - right.sequence;
  });
}

function applyBinding(
  nodes: WorkingPromptModuleNode[],
  binding: PromptModuleBinding,
  diagnostics: PromptModuleDiagnostic[],
  mutationId: string,
): PromptModuleBinding | null {
  const fromIndex = nodes.findIndex(
    (node) => node.disabled !== true && moduleAddress(node.module) === binding.from,
  );
  const toIndex = nodes.findIndex(
    (node) => node.disabled !== true && moduleAddress(node.module) === binding.to,
  );
  const required = binding.required !== false;
  if (required && (fromIndex === -1 || toIndex === -1)) {
    diagnostics.push({
      severity: "error",
      code: "missing_binding_endpoint",
      mutation_id: mutationId,
      module_address: fromIndex === -1 ? binding.from : binding.to,
      message: `Binding ${binding.id} references a missing prompt module endpoint.`,
    });
  }
  if (fromIndex === -1) return null;

  const from = nodes[fromIndex];
  if (!from) return null;
  switch (binding.kind) {
    case "extends": {
      from.extends = uniqueStrings([...(from.extends ?? []), binding.to]);
      break;
    }
    case "replaces": {
      from.replaces = uniqueStrings([...(from.replaces ?? []), binding.to]);
      break;
    }
    case "requires": {
      from.module = {
        ...from.module,
        dependencies: [
          ...(from.module.dependencies ?? []),
          {
            address: binding.to,
            required,
          },
        ],
      };
      break;
    }
    case "feeds":
    case "validates": {
      break;
    }
  }
  return binding;
}

function applyMutation(
  nodes: WorkingPromptModuleNode[],
  mutation: PromptModuleMutation,
  context: PromptModuleCompilerContext,
  diagnostics: PromptModuleDiagnostic[],
  validators: Map<string, PromptModuleValidator>,
  disabledValidators: Set<string>,
  bindings: PromptModuleBinding[],
  nextSequence: () => number,
): void {
  if (!matchesPromptModuleMutationWhen(mutation.when, context, activeModules(nodes))) return;

  switch (mutation.op) {
    case "add_module": {
      if (!matchesPromptModuleLoadCondition(mutation.module.load, context)) return;
      nodes.push({ module: copyModule(mutation.module), sequence: nextSequence() });
      return;
    }
    case "disable_module": {
      const matches = findMatchingNodeIndexes(nodes, mutation.target);
      if (matches.length === 0) {
        diagnostics.push({
          severity: "warning",
          code: "missing_module",
          mutation_id: mutation.id,
          message: `No prompt modules matched disable mutation ${mutation.id}.`,
        });
      }
      for (const index of matches) {
        const node = nodes[index];
        if (node) node.disabled = true;
      }
      return;
    }
    case "patch_module":
    case "replace_module": {
      const matches = findMatchingNodeIndexes(nodes, mutation.target);
      if (matches.length === 0) {
        diagnostics.push({
          severity: "error",
          code: "missing_module",
          mutation_id: mutation.id,
          message: `No prompt modules matched ${mutation.op} mutation ${mutation.id}.`,
        });
        return;
      }
      if (matches.length > 1) {
        diagnostics.push({
          severity: "error",
          code: "ambiguous_selector",
          mutation_id: mutation.id,
          message: `${mutation.op} mutation ${mutation.id} matched ${matches.length} prompt modules.`,
        });
        return;
      }
      const index = matches[0];
      if (index === undefined) return;
      const current = nodes[index];
      if (!current) return;
      const nextModule =
        mutation.op === "patch_module"
          ? patchModule(current.module, mutation.patch)
          : copyModule(mutation.module);
      if (!matchesPromptModuleLoadCondition(nextModule.load, context)) {
        current.disabled = true;
        return;
      }
      nodes[index] = {
        ...current,
        module: nextModule,
        sequence: nextSequence(),
      };
      return;
    }
    case "bind_module": {
      if (!matchesPromptModuleMutationWhen(mutation.binding.when, context, activeModules(nodes))) {
        return;
      }
      const applied = applyBinding(nodes, mutation.binding, diagnostics, mutation.id);
      if (applied) bindings.push(applied);
      return;
    }
    case "add_validator": {
      if (
        !matchesPromptModuleMutationWhen(mutation.validator.when, context, activeModules(nodes))
      ) {
        return;
      }
      disabledValidators.delete(mutation.validator.id);
      validators.set(mutation.validator.id, mutation.validator);
      return;
    }
    case "disable_validator": {
      disabledValidators.add(mutation.validator_id);
      validators.delete(mutation.validator_id);
    }
  }
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
          message: `Validator ${validator.id} requires a matching prompt module.`,
        });
      }
    } else if (validator.kind === "forbidden_module") {
      const found = modules.some((module) => matchesPromptModuleSelector(module, validator.target));
      if (found) {
        diagnostics.push({
          severity: "error",
          code: "validator_failed",
          validator_id: validator.id,
          message: `Validator ${validator.id} forbids a matching prompt module.`,
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
  const context = opts.context ?? {};
  const diagnostics: PromptModuleDiagnostic[] = [];
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
      applyMutation(
        nodes,
        mutation,
        context,
        diagnostics,
        validators,
        disabledValidators,
        bindings,
        nextSequence,
      );
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
