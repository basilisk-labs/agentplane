import type { RunnerCapabilityChannel, RunnerCapabilityLevel } from "./capabilities.js";

export type RunnerPolicyFieldStatus = "not_requested" | "enforced" | "advisory" | "unsupported";

export type RunnerPolicyFieldDecision = {
  requested?: unknown;
  effective?: unknown;
  status: RunnerPolicyFieldStatus;
  capability_level: RunnerCapabilityLevel;
  channel: RunnerCapabilityChannel;
  supported_values?: string[];
  note?: string;
};

export type RunnerPolicyRefusal = {
  code: string;
  message: string;
  policy_field?: string;
  declared_value?: unknown;
};

export type RunnerPolicyDecision = {
  adapter_id: string;
  requested: Record<string, unknown>;
  effective: Record<string, unknown>;
  fields: Record<string, RunnerPolicyFieldDecision>;
  refusal_reason?: RunnerPolicyRefusal | null;
};
