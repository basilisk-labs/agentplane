import type { PromptModule, PromptModuleLoadCondition, PromptModuleMutability } from "./model.js";
import {
  copyModule,
  moduleAddress,
  uniqueStrings,
  type WorkingPromptModuleNode,
} from "./compiler.shared.js";
import type {
  PromptModuleBinding,
  PromptModuleMutation,
  PromptModuleMutationWhen,
  PromptModuleSelector,
  PromptModuleStructuredPatch,
  PromptModuleValidator,
} from "./mutations.js";
import type { PromptModuleCompilerContext, PromptModuleDiagnostic } from "./compiler.js";

export type PromptModuleLoadMatcher = (
  condition: PromptModuleLoadCondition | undefined,
  context: PromptModuleCompilerContext,
) => boolean;

export type PromptModuleSelectorMatcher = (
  module: PromptModule,
  selector: PromptModuleSelector,
) => boolean;

export type PromptModuleMutationWhenMatcher = (
  when: PromptModuleMutationWhen | undefined,
  context: PromptModuleCompilerContext,
  modules: readonly PromptModule[],
) => boolean;

export type ApplyPromptModuleMutationOptions = {
  nodes: WorkingPromptModuleNode[];
  mutation: PromptModuleMutation;
  context: PromptModuleCompilerContext;
  diagnostics: PromptModuleDiagnostic[];
  validators: Map<string, PromptModuleValidator>;
  disabledValidators: Set<string>;
  bindings: PromptModuleBinding[];
  nextSequence: () => number;
  matchesLoadCondition: PromptModuleLoadMatcher;
  matchesMutationWhen: PromptModuleMutationWhenMatcher;
  matchesSelector: PromptModuleSelectorMatcher;
};

export function describePromptModuleSelector(selector: PromptModuleSelector): string {
  const parts = [
    selector.address ? `address=${selector.address}` : null,
    selector.fragment_id ? `fragment_id=${selector.fragment_id}` : null,
    selector.namespace ? `namespace=${selector.namespace}` : null,
    selector.surface ? `surface=${selector.surface}` : null,
    selector.target ? `target=${selector.target}` : null,
    selector.slot ? `slot=${selector.slot}` : null,
    selector.owner ? `owner=${selector.owner}` : null,
    selector.recipe_id ? `recipe_id=${selector.recipe_id}` : null,
  ].filter((part): part is string => part !== null);
  return parts.length > 0 ? parts.join(", ") : "empty selector";
}

function activeModules(nodes: readonly WorkingPromptModuleNode[]): PromptModule[] {
  return nodes.filter((node) => node.disabled !== true).map((node) => node.module);
}

function findMatchingNodeIndexes(
  nodes: readonly WorkingPromptModuleNode[],
  selector: PromptModuleSelector,
  matchesSelector: PromptModuleSelectorMatcher,
): number[] {
  const indexes: number[] = [];
  for (const [index, node] of nodes.entries()) {
    if (node.disabled === true) continue;
    if (matchesSelector(node.module, selector)) indexes.push(index);
  }
  return indexes;
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

function allowsDirectMutation(mutability: PromptModuleMutability): boolean {
  return mutability === "replaceable";
}

function reportMutabilityViolation(
  diagnostics: PromptModuleDiagnostic[],
  mutation: Extract<
    PromptModuleMutation,
    { op: "disable_module" | "patch_module" | "replace_module" }
  >,
  module: PromptModule,
): void {
  diagnostics.push({
    severity: "error",
    code: "mutability_violation",
    mutation_id: mutation.id,
    module_address: moduleAddress(module),
    message: `${mutation.op} mutation ${mutation.id} cannot modify prompt module ${moduleAddress(module)} because its mutability is ${module.mutability}; only replaceable modules allow direct patch, replace, or disable mutations.`,
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

export function applyPromptModuleMutation(opts: ApplyPromptModuleMutationOptions): void {
  const {
    nodes,
    mutation,
    context,
    diagnostics,
    validators,
    disabledValidators,
    bindings,
    nextSequence,
    matchesLoadCondition,
    matchesMutationWhen,
    matchesSelector,
  } = opts;

  if (!matchesMutationWhen(mutation.when, context, activeModules(nodes))) return;

  switch (mutation.op) {
    case "add_module": {
      if (!matchesLoadCondition(mutation.module.load, context)) return;
      nodes.push({ module: copyModule(mutation.module), sequence: nextSequence() });
      return;
    }
    case "disable_module": {
      const matches = findMatchingNodeIndexes(nodes, mutation.target, matchesSelector);
      if (matches.length === 0) {
        diagnostics.push({
          severity: "warning",
          code: "missing_module",
          mutation_id: mutation.id,
          message: `No prompt modules matched disable mutation ${mutation.id} (${describePromptModuleSelector(mutation.target)}).`,
        });
      }
      if (matches.length > 1) {
        diagnostics.push({
          severity: "warning",
          code: "broad_disable_selector",
          mutation_id: mutation.id,
          message: `disable_module mutation ${mutation.id} matched ${matches.length} prompt modules (${describePromptModuleSelector(mutation.target)}).`,
        });
      }
      if (
        matches.some((index) => {
          const node = nodes[index];
          if (!node || allowsDirectMutation(node.module.mutability)) return false;
          reportMutabilityViolation(diagnostics, mutation, node.module);
          return true;
        })
      ) {
        return;
      }
      for (const index of matches) {
        const node = nodes[index];
        if (node) node.disabled = true;
      }
      return;
    }
    case "patch_module":
    case "replace_module": {
      const matches = findMatchingNodeIndexes(nodes, mutation.target, matchesSelector);
      if (matches.length === 0) {
        diagnostics.push({
          severity: "error",
          code: "missing_module",
          mutation_id: mutation.id,
          message: `No prompt modules matched ${mutation.op} mutation ${mutation.id} (${describePromptModuleSelector(mutation.target)}).`,
        });
        return;
      }
      if (matches.length > 1) {
        diagnostics.push({
          severity: "error",
          code: "ambiguous_selector",
          mutation_id: mutation.id,
          message: `${mutation.op} mutation ${mutation.id} matched ${matches.length} prompt modules (${describePromptModuleSelector(mutation.target)}).`,
        });
        return;
      }
      const index = matches[0];
      if (index === undefined) return;
      const current = nodes[index];
      if (!current) return;
      if (!allowsDirectMutation(current.module.mutability)) {
        reportMutabilityViolation(diagnostics, mutation, current.module);
        return;
      }
      const nextModule =
        mutation.op === "patch_module"
          ? patchModule(current.module, mutation.patch)
          : copyModule(mutation.module);
      if (!matchesLoadCondition(nextModule.load, context)) {
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
      if (!matchesMutationWhen(mutation.binding.when, context, activeModules(nodes))) {
        return;
      }
      const applied = applyBinding(nodes, mutation.binding, diagnostics, mutation.id);
      if (applied) bindings.push(applied);
      return;
    }
    case "add_validator": {
      if (!matchesMutationWhen(mutation.validator.when, context, activeModules(nodes))) {
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
