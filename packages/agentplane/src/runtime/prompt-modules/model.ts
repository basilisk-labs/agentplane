export const PROMPT_MODULE_CONTRACT_SCHEMA_VERSION = 1 as const;

export type PromptModuleContractSchemaVersion = typeof PROMPT_MODULE_CONTRACT_SCHEMA_VERSION;

export type PromptModuleNamespace = "framework" | "project" | "runtime" | `recipe.${string}`;

export type PromptModuleSurface =
  | "gateway"
  | "policy"
  | "agent_profile"
  | "runner"
  | "validator"
  | "template";

export type PromptModuleTarget =
  | "AGENTS.md"
  | "CLAUDE.md"
  | ".agentplane/policy"
  | ".agentplane/agents"
  | "runner.bundle"
  | "recipe.manifest"
  | "generated.artifact";

export type PromptModuleSlot =
  | "frontmatter"
  | "purpose"
  | "startup"
  | "commands"
  | "load_rules"
  | "source_of_truth"
  | "hard_constraint"
  | "body"
  | "example"
  | "identity"
  | "inputs"
  | "outputs"
  | "permissions"
  | "workflow"
  | "cli_notes"
  | "context"
  | "schema"
  | "check"
  | "partial"
  | "file";

export type PromptModuleAddress = {
  /**
   * Canonical stable address, for example
   * `framework/gateway/AGENTS.md/load_rules/base`.
   */
  value: string;
  namespace: PromptModuleNamespace;
  surface: PromptModuleSurface;
  target: PromptModuleTarget;
  slot: PromptModuleSlot;
  name: string;
};

export type PromptModuleOwner =
  | {
      kind: "framework";
      package_name: "agentplane";
      version?: string;
    }
  | {
      kind: "project";
      project_root?: string;
    }
  | {
      kind: "recipe";
      recipe_id: string;
      version?: string;
    }
  | {
      kind: "runtime";
      adapter_id?: string;
    };

export type PromptModuleContentKind = "markdown" | "json" | "text" | "typescript" | "command";

export type PromptModuleMutability = "locked" | "replaceable" | "extendable" | "append_only";

export type PromptModuleMergeMode =
  | "pick_one"
  | "replace"
  | "prepend"
  | "append"
  | "merge_object"
  | "union_by_id";

export type PromptModuleConflictPolicy =
  | "error"
  | "highest_precedence"
  | "last_writer_wins"
  | "keep_all";

export type PromptModuleMergePolicy = {
  mode: PromptModuleMergeMode;
  conflict: PromptModuleConflictPolicy;
  precedence?: number;
};

export type PromptModuleLoadCondition = {
  workflow_modes?: ("direct" | "branch_pr")[];
  policy_gateways?: ("codex" | "claude")[];
  roles?: string[];
  commands?: string[];
  task_tags_any?: string[];
  repo_types?: string[];
  recipe_ids?: string[];
};

export type PromptModuleSourceKind =
  | "framework_builtin"
  | "project_file"
  | "recipe_asset"
  | "generated"
  | "runtime";

export type PromptModuleProvenance = {
  source_kind: PromptModuleSourceKind;
  source_ref: string;
  fragment_id?: string;
  fragment_index?: number;
  recipe_id?: string;
  recipe_version?: string;
  generated_by?: string;
  content_hash?: string;
};

export type PromptModuleDependency = {
  address: string;
  required: boolean;
};

export type PromptModule<TContent = string | Record<string, unknown>> = {
  schema_version: PromptModuleContractSchemaVersion;
  address: PromptModuleAddress;
  owner: PromptModuleOwner;
  title: string;
  summary?: string;
  content_kind: PromptModuleContentKind;
  content: TContent;
  mutability: PromptModuleMutability;
  merge: PromptModuleMergePolicy;
  load?: PromptModuleLoadCondition;
  dependencies?: PromptModuleDependency[];
  provenance: PromptModuleProvenance;
};

export type PromptModuleReference = Pick<PromptModule, "address" | "owner" | "provenance">;

export type PromptModuleGraphNode = {
  module: PromptModule;
  replaces?: string[];
  extends?: string[];
};

export type PromptModuleGraph = {
  schema_version: PromptModuleContractSchemaVersion;
  nodes: PromptModuleGraphNode[];
};
