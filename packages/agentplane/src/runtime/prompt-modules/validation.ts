import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleDependency,
  PromptModuleLoadCondition,
  PromptModuleMergePolicy,
  PromptModuleOwner,
  PromptModuleProvenance,
} from "./model.js";
import type { PromptModuleCompiledGraph } from "./compiler.js";
import { migratePromptModuleSchemaVersion } from "./schema.js";
import type {
  PromptModuleMutation,
  PromptModuleMutationSet,
  PromptModuleMutationWhen,
  PromptModuleSelector,
} from "./mutations.js";
import {
  BINDING_KINDS,
  CONFLICT_POLICIES,
  CONTENT_KINDS,
  MERGE_MODES,
  MUTABILITIES,
  MUTATION_OPS,
  OWNER_KINDS,
  POLICY_GATEWAYS,
  PROMPT_MODULE_SLOTS,
  PROMPT_MODULE_SURFACES,
  PROMPT_MODULE_TARGETS,
  SOURCE_KINDS,
  VALIDATOR_KINDS,
  VALIDATOR_PHASES,
  WORKFLOW_MODES,
} from "./validation-constants.js";
import {
  invalid,
  optionalBoolean,
  optionalNumber,
  optionalString,
  requireRecord,
  requireString,
  validateEnum,
  validateNamespace,
  validateOptionalEnumList,
  validateOptionalStringList,
} from "./validation-guards.js";

function validateAddress(raw: unknown, field: string): PromptModuleAddress {
  const address = requireRecord(raw, field);
  return {
    value: requireString(address.value, `${field}.value`),
    namespace: validateNamespace(address.namespace, `${field}.namespace`),
    surface: validateEnum(address.surface, `${field}.surface`, PROMPT_MODULE_SURFACES),
    target: validateEnum(address.target, `${field}.target`, PROMPT_MODULE_TARGETS),
    slot: validateEnum(address.slot, `${field}.slot`, PROMPT_MODULE_SLOTS),
    name: requireString(address.name, `${field}.name`),
  };
}

function validateOwner(raw: unknown, field: string): PromptModuleOwner {
  const owner = requireRecord(raw, field);
  const kind = validateEnum(owner.kind, `${field}.kind`, OWNER_KINDS);
  if (kind === "framework") {
    if (owner.package_name !== "agentplane") {
      throw invalid(`${field}.package_name`, '"agentplane"');
    }
    return {
      kind,
      package_name: "agentplane",
      version: optionalString(owner.version, `${field}.version`),
    };
  }
  if (kind === "project") {
    return { kind, project_root: optionalString(owner.project_root, `${field}.project_root`) };
  }
  if (kind === "recipe") {
    return {
      kind,
      recipe_id: requireString(owner.recipe_id, `${field}.recipe_id`),
      version: optionalString(owner.version, `${field}.version`),
    };
  }
  return { kind, adapter_id: optionalString(owner.adapter_id, `${field}.adapter_id`) };
}

function validateProvenance(raw: unknown, field: string): PromptModuleProvenance {
  const provenance = requireRecord(raw, field);
  return {
    source_kind: validateEnum(provenance.source_kind, `${field}.source_kind`, SOURCE_KINDS),
    source_ref: requireString(provenance.source_ref, `${field}.source_ref`),
    fragment_id: optionalString(provenance.fragment_id, `${field}.fragment_id`),
    fragment_index: optionalNumber(provenance.fragment_index, `${field}.fragment_index`),
    recipe_id: optionalString(provenance.recipe_id, `${field}.recipe_id`),
    recipe_version: optionalString(provenance.recipe_version, `${field}.recipe_version`),
    generated_by: optionalString(provenance.generated_by, `${field}.generated_by`),
    content_hash: optionalString(provenance.content_hash, `${field}.content_hash`),
  };
}

function validateMergePolicy(raw: unknown, field: string): PromptModuleMergePolicy {
  const merge = requireRecord(raw, field);
  return {
    mode: validateEnum(merge.mode, `${field}.mode`, MERGE_MODES),
    conflict: validateEnum(merge.conflict, `${field}.conflict`, CONFLICT_POLICIES),
    precedence: optionalNumber(merge.precedence, `${field}.precedence`),
  };
}

function validateLoadCondition(raw: unknown, field: string): PromptModuleLoadCondition {
  const load = requireRecord(raw, field);
  return {
    workflow_modes: validateOptionalEnumList(
      load.workflow_modes,
      `${field}.workflow_modes`,
      WORKFLOW_MODES,
    ),
    policy_gateways: validateOptionalEnumList(
      load.policy_gateways,
      `${field}.policy_gateways`,
      POLICY_GATEWAYS,
    ),
    roles: validateOptionalStringList(load.roles, `${field}.roles`),
    commands: validateOptionalStringList(load.commands, `${field}.commands`),
    task_tags_any: validateOptionalStringList(load.task_tags_any, `${field}.task_tags_any`),
    repo_types: validateOptionalStringList(load.repo_types, `${field}.repo_types`),
    recipe_ids: validateOptionalStringList(load.recipe_ids, `${field}.recipe_ids`),
  };
}

function validateMutationWhen(raw: unknown, field: string): PromptModuleMutationWhen {
  const when = requireRecord(raw, field);
  return {
    ...validateLoadCondition(when, field),
    module_present: validateOptionalStringList(when.module_present, `${field}.module_present`),
    module_absent: validateOptionalStringList(when.module_absent, `${field}.module_absent`),
  };
}

function validateDependencies(raw: unknown, field: string): PromptModuleDependency[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw invalid(field, "array");
  return raw.map((entry, index) => {
    const dependency = requireRecord(entry, `${field}[${index}]`);
    if (typeof dependency.required !== "boolean") {
      throw invalid(`${field}[${index}].required`, "boolean");
    }
    return {
      address: requireString(dependency.address, `${field}[${index}].address`),
      required: dependency.required,
    };
  });
}

function validateModuleContent(raw: unknown, field: string): void {
  if (typeof raw === "string") return;
  if (Boolean(raw) && typeof raw === "object" && !Array.isArray(raw)) return;
  throw invalid(field, "string | object");
}

export function validatePromptModule(raw: unknown, field = "prompt module"): PromptModule {
  const module = requireRecord(migratePromptModuleSchemaVersion(raw, field), field);
  validateAddress(module.address, `${field}.address`);
  validateOwner(module.owner, `${field}.owner`);
  requireString(module.title, `${field}.title`);
  optionalString(module.summary, `${field}.summary`);
  validateEnum(module.content_kind, `${field}.content_kind`, CONTENT_KINDS);
  validateModuleContent(module.content, `${field}.content`);
  validateEnum(module.mutability, `${field}.mutability`, MUTABILITIES);
  validateMergePolicy(module.merge, `${field}.merge`);
  if (module.load !== undefined) validateLoadCondition(module.load, `${field}.load`);
  validateDependencies(module.dependencies, `${field}.dependencies`);
  validateProvenance(module.provenance, `${field}.provenance`);
  return module as PromptModule;
}

function validateSelector(raw: unknown, field: string): PromptModuleSelector {
  const selector = requireRecord(raw, field);
  if (selector.address !== undefined) requireString(selector.address, `${field}.address`);
  if (selector.fragment_id !== undefined)
    requireString(selector.fragment_id, `${field}.fragment_id`);
  if (selector.namespace !== undefined) validateNamespace(selector.namespace, `${field}.namespace`);
  if (selector.surface !== undefined) {
    validateEnum(selector.surface, `${field}.surface`, PROMPT_MODULE_SURFACES);
  }
  if (selector.target !== undefined) {
    validateEnum(selector.target, `${field}.target`, PROMPT_MODULE_TARGETS);
  }
  if (selector.slot !== undefined)
    validateEnum(selector.slot, `${field}.slot`, PROMPT_MODULE_SLOTS);
  if (selector.owner !== undefined) validateEnum(selector.owner, `${field}.owner`, OWNER_KINDS);
  if (selector.recipe_id !== undefined) requireString(selector.recipe_id, `${field}.recipe_id`);
  return selector as PromptModuleSelector;
}

function validatePatch(raw: unknown, field: string): void {
  const patch = requireRecord(raw, field);
  if (patch.title !== undefined) requireString(patch.title, `${field}.title`);
  if (patch.summary !== undefined && patch.summary !== null) {
    requireString(patch.summary, `${field}.summary`);
  }
  if (patch.content !== undefined) validateModuleContent(patch.content, `${field}.content`);
  if (patch.mutability !== undefined) {
    validateEnum(patch.mutability, `${field}.mutability`, MUTABILITIES);
  }
  if (patch.merge !== undefined) validateMergePolicy(patch.merge, `${field}.merge`);
  if (patch.load !== undefined && patch.load !== null) {
    validateLoadCondition(patch.load, `${field}.load`);
  }
  if (patch.dependencies !== undefined && patch.dependencies !== null) {
    validateDependencies(patch.dependencies, `${field}.dependencies`);
  }
  if (patch.provenance !== undefined) validateProvenance(patch.provenance, `${field}.provenance`);
}

function validateMutationSource(raw: unknown, field: string): void {
  const source = requireRecord(raw, field);
  validateOwner(source.owner, `${field}.owner`);
  validateProvenance(source.provenance, `${field}.provenance`);
}

function validateBinding(raw: unknown, field: string): void {
  const binding = requireRecord(raw, field);
  requireString(binding.id, `${field}.id`);
  validateEnum(binding.kind, `${field}.kind`, BINDING_KINDS);
  requireString(binding.from, `${field}.from`);
  requireString(binding.to, `${field}.to`);
  optionalNumber(binding.order, `${field}.order`);
  optionalBoolean(binding.required, `${field}.required`);
  if (binding.when !== undefined) validateMutationWhen(binding.when, `${field}.when`);
}

function validatePromptModuleValidator(raw: unknown, field: string): void {
  const validator = requireRecord(raw, field);
  requireString(validator.id, `${field}.id`);
  const phase = validateEnum(validator.phase, `${field}.phase`, VALIDATOR_PHASES);
  const kind = validateEnum(validator.kind, `${field}.kind`, VALIDATOR_KINDS);
  if (kind === "required_module" || kind === "forbidden_module") {
    validateSelector(validator.target, `${field}.target`);
    if (validator.required !== true) throw invalid(`${field}.required`, "true");
  } else {
    if (phase !== "resolve" && phase !== "compile" && phase !== "emit" && phase !== "doctor") {
      throw invalid(`${field}.phase`, VALIDATOR_PHASES.map((item) => `"${item}"`).join(" | "));
    }
    requireString(validator.command, `${field}.command`);
    if (typeof validator.required !== "boolean") throw invalid(`${field}.required`, "boolean");
  }
  if (validator.when !== undefined) validateMutationWhen(validator.when, `${field}.when`);
}

function validateMutation(raw: unknown, field: string): void {
  const mutation = requireRecord(raw, field);
  requireString(mutation.id, `${field}.id`);
  const op = validateEnum(mutation.op, `${field}.op`, MUTATION_OPS);
  validateMutationSource(mutation.source, `${field}.source`);
  if (mutation.when !== undefined) validateMutationWhen(mutation.when, `${field}.when`);
  optionalString(mutation.reason, `${field}.reason`);

  if (op === "add_module") {
    validatePromptModule(mutation.module, `${field}.module`);
    return;
  }
  if (op === "replace_module") {
    validateSelector(mutation.target, `${field}.target`);
    validatePromptModule(mutation.module, `${field}.module`);
    return;
  }
  if (op === "patch_module") {
    validateSelector(mutation.target, `${field}.target`);
    validatePatch(mutation.patch, `${field}.patch`);
    return;
  }
  if (op === "disable_module") {
    validateSelector(mutation.target, `${field}.target`);
    return;
  }
  if (op === "bind_module") {
    validateBinding(mutation.binding, `${field}.binding`);
    return;
  }
  if (op === "add_validator") {
    validatePromptModuleValidator(mutation.validator, `${field}.validator`);
    return;
  }
  requireString(mutation.validator_id, `${field}.validator_id`);
}

export function validatePromptModuleMutationSet(
  raw: unknown,
  field = "prompt module mutation set",
): PromptModuleMutationSet {
  const set = requireRecord(migratePromptModuleSchemaVersion(raw, field), field);
  optionalString(set.recipe_id, `${field}.recipe_id`);
  if (!Array.isArray(set.mutations)) throw invalid(`${field}.mutations`, "array");
  for (const [index, mutation] of set.mutations.entries()) {
    validateMutation(mutation, `${field}.mutations[${index}]`);
  }
  return set as PromptModuleMutationSet;
}

function validatePromptModuleGraphNode(raw: unknown, field: string): void {
  const node = requireRecord(raw, field);
  validatePromptModule(node.module, `${field}.module`);
  validateOptionalStringList(node.replaces, `${field}.replaces`);
  validateOptionalStringList(node.extends, `${field}.extends`);
}

function validatePromptModuleDiagnostic(raw: unknown, field: string): void {
  const diagnostic = requireRecord(raw, field);
  validateEnum(diagnostic.severity, `${field}.severity`, ["error", "warning"]);
  requireString(diagnostic.code, `${field}.code`);
  requireString(diagnostic.message, `${field}.message`);
  optionalString(diagnostic.module_address, `${field}.module_address`);
  optionalString(diagnostic.mutation_id, `${field}.mutation_id`);
  optionalString(diagnostic.validator_id, `${field}.validator_id`);
}

export function validatePromptModuleCompiledGraph(
  raw: unknown,
  field = "prompt module graph",
): PromptModuleCompiledGraph {
  const graph = requireRecord(migratePromptModuleSchemaVersion(raw, field), field);
  if (!Array.isArray(graph.nodes)) throw invalid(`${field}.nodes`, "array");
  for (const [index, node] of graph.nodes.entries()) {
    validatePromptModuleGraphNode(node, `${field}.nodes[${index}]`);
  }
  if (!Array.isArray(graph.diagnostics)) throw invalid(`${field}.diagnostics`, "array");
  for (const [index, diagnostic] of graph.diagnostics.entries()) {
    validatePromptModuleDiagnostic(diagnostic, `${field}.diagnostics[${index}]`);
  }
  if (!Array.isArray(graph.validators)) throw invalid(`${field}.validators`, "array");
  for (const [index, validator] of graph.validators.entries()) {
    validatePromptModuleValidator(validator, `${field}.validators[${index}]`);
  }
  if (!Array.isArray(graph.bindings)) throw invalid(`${field}.bindings`, "array");
  for (const [index, binding] of graph.bindings.entries()) {
    validateBinding(binding, `${field}.bindings[${index}]`);
  }
  if (typeof graph.ok !== "boolean") throw invalid(`${field}.ok`, "boolean");
  return graph as PromptModuleCompiledGraph;
}

export type ValidatedPromptModuleMutation = PromptModuleMutation;
