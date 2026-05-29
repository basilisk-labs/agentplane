import type { PromptModuleBindingKind, PromptModuleValidatorPhase } from "./mutations.js";
import type {
  PromptModuleConflictPolicy,
  PromptModuleContentKind,
  PromptModuleMergeMode,
  PromptModuleMutability,
  PromptModuleSlot,
  PromptModuleSourceKind,
  PromptModuleSurface,
  PromptModuleTarget,
} from "./model.js";

export const PROMPT_MODULE_SURFACES: PromptModuleSurface[] = [
  "gateway",
  "policy",
  "agent_profile",
  "runner",
  "validator",
  "template",
];

export const PROMPT_MODULE_TARGETS: PromptModuleTarget[] = [
  "AGENTS.md",
  "CLAUDE.md",
  ".agentplane/policy",
  ".agentplane/agents",
  "runner.bundle",
  "recipe.manifest",
  "generated.artifact",
];

export const PROMPT_MODULE_SLOTS: PromptModuleSlot[] = [
  "frontmatter",
  "purpose",
  "startup",
  "commands",
  "load_rules",
  "source_of_truth",
  "hard_constraint",
  "body",
  "example",
  "identity",
  "inputs",
  "outputs",
  "permissions",
  "workflow",
  "cli_notes",
  "context",
  "schema",
  "check",
  "partial",
  "file",
];

export const CONTENT_KINDS: PromptModuleContentKind[] = [
  "markdown",
  "json",
  "text",
  "typescript",
  "command",
];

export const MUTABILITIES: PromptModuleMutability[] = [
  "locked",
  "replaceable",
  "extendable",
  "append_only",
];

export const MERGE_MODES: PromptModuleMergeMode[] = [
  "pick_one",
  "replace",
  "prepend",
  "append",
  "merge_object",
  "union_by_id",
];

export const CONFLICT_POLICIES: PromptModuleConflictPolicy[] = [
  "error",
  "highest_precedence",
  "last_writer_wins",
  "keep_all",
];

export const SOURCE_KINDS: PromptModuleSourceKind[] = [
  "framework_builtin",
  "project_file",
  "recipe_asset",
  "generated",
  "runtime",
];

export const OWNER_KINDS = ["framework", "project", "recipe", "runtime"] as const;
export const WORKFLOW_MODES = ["direct", "branch_pr"] as const;
export const POLICY_GATEWAYS = ["codex", "claude"] as const;
export const BINDING_KINDS: PromptModuleBindingKind[] = [
  "extends",
  "replaces",
  "requires",
  "feeds",
  "validates",
];
export const VALIDATOR_PHASES: PromptModuleValidatorPhase[] = [
  "resolve",
  "compile",
  "emit",
  "doctor",
];
export const VALIDATOR_KINDS = ["required_module", "forbidden_module", "required_command"] as const;
export const MUTATION_OPS = [
  "add_module",
  "replace_module",
  "patch_module",
  "disable_module",
  "bind_module",
  "add_validator",
  "disable_validator",
] as const;
