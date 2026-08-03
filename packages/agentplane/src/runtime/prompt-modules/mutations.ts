import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleDependency,
  PromptModuleLoadCondition,
  PromptModuleMergePolicy,
  PromptModuleMutability,
  PromptModuleOwner,
  PromptModuleProvenance,
  PromptModuleSlot,
  PromptModuleSurface,
  PromptModuleTarget,
} from "./model.js";
import type { PromptModuleContractSchemaVersion } from "./schema.js";

export type PromptModuleSelector = {
  address?: string;
  fragment_id?: string;
  namespace?: PromptModuleAddress["namespace"];
  surface?: PromptModuleSurface;
  target?: PromptModuleTarget;
  slot?: PromptModuleSlot;
  owner?: PromptModuleOwner["kind"];
  recipe_id?: string;
};

export type PromptModuleMutationWhen = PromptModuleLoadCondition & {
  module_present?: string[];
  module_absent?: string[];
};

type PromptModuleMutationSource = {
  owner: PromptModuleOwner;
  provenance: PromptModuleProvenance;
};

export type PromptModuleStructuredPatch<TContent = string | Record<string, unknown>> = {
  title?: string;
  summary?: string | null;
  content?: TContent;
  mutability?: PromptModuleMutability;
  merge?: PromptModuleMergePolicy;
  load?: PromptModuleLoadCondition | null;
  dependencies?: PromptModuleDependency[] | null;
  provenance?: PromptModuleProvenance;
};

export type PromptModuleBindingKind = "extends" | "replaces" | "requires" | "feeds" | "validates";

export type PromptModuleBinding = {
  id: string;
  kind: PromptModuleBindingKind;
  from: string;
  to: string;
  order?: number;
  required?: boolean;
  when?: PromptModuleMutationWhen;
};

export type PromptModuleValidatorPhase = "resolve" | "compile" | "emit" | "doctor";

export type PromptModuleValidator =
  | {
      id: string;
      phase: PromptModuleValidatorPhase;
      kind: "required_module";
      target: PromptModuleSelector;
      required: true;
      when?: PromptModuleMutationWhen;
    }
  | {
      id: string;
      phase: PromptModuleValidatorPhase;
      kind: "forbidden_module";
      target: PromptModuleSelector;
      required: true;
      when?: PromptModuleMutationWhen;
    }
  | {
      id: string;
      phase: PromptModuleValidatorPhase;
      kind: "required_command";
      command: string;
      required: boolean;
      when?: PromptModuleMutationWhen;
    };

type PromptModuleMutationBase = {
  id: string;
  source: PromptModuleMutationSource;
  when?: PromptModuleMutationWhen;
  reason?: string;
};

type PromptModuleAddMutation = PromptModuleMutationBase & {
  op: "add_module";
  module: PromptModule;
};

type PromptModuleReplaceMutation = PromptModuleMutationBase & {
  op: "replace_module";
  target: PromptModuleSelector;
  module: PromptModule;
};

type PromptModulePatchMutation<TContent = string | Record<string, unknown>> =
  PromptModuleMutationBase & {
    op: "patch_module";
    target: PromptModuleSelector;
    patch: PromptModuleStructuredPatch<TContent>;
  };

type PromptModuleDisableMutation = PromptModuleMutationBase & {
  op: "disable_module";
  target: PromptModuleSelector;
};

type PromptModuleBindMutation = PromptModuleMutationBase & {
  op: "bind_module";
  binding: PromptModuleBinding;
};

type PromptModuleValidatorMutation = PromptModuleMutationBase &
  (
    | {
        op: "add_validator";
        validator: PromptModuleValidator;
      }
    | {
        op: "disable_validator";
        validator_id: string;
      }
  );

export type PromptModuleMutation =
  | PromptModuleAddMutation
  | PromptModuleReplaceMutation
  | PromptModulePatchMutation
  | PromptModuleDisableMutation
  | PromptModuleBindMutation
  | PromptModuleValidatorMutation;

export type PromptModuleMutationSet = {
  schema_version: PromptModuleContractSchemaVersion;
  recipe_id?: string;
  mutations: PromptModuleMutation[];
};
