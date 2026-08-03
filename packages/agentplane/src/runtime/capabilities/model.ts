type AgentplaneCapabilityKind =
  | "backend_field"
  | "command"
  | "scenario"
  | "skill"
  | "tool"
  | "agent"
  | "runner_adapter"
  | "runner_policy_field"
  | "policy";

type AgentplaneCapabilityAvailability = "available" | "blocked" | "unavailable";

type AgentplaneCapabilitySourceId =
  | "backend"
  | "builtin"
  | "command_catalog"
  | "harness"
  | "policy"
  | "recipe_manifest"
  | "runner_adapter";

type AgentplaneCapabilitySourceRef = {
  id: AgentplaneCapabilitySourceId;
  detail: string;
};

export type AgentplaneCapabilityEntry = {
  id: string;
  kind: AgentplaneCapabilityKind;
  availability: AgentplaneCapabilityAvailability;
  source: AgentplaneCapabilitySourceRef;
  summary?: string;
  value?: unknown;
  supported_values?: string[];
  reason?: string;
  blocked_by?: string[];
  metadata?: Record<string, unknown>;
};

export type AgentplaneCapabilityRegistry = {
  entries: AgentplaneCapabilityEntry[];
};

export type AgentplaneCapabilityFilter = {
  availability?: AgentplaneCapabilityAvailability;
  kind?: AgentplaneCapabilityKind;
  source_id?: AgentplaneCapabilitySourceId;
};
