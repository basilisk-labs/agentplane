import type { RunnerCapabilityChannel, RunnerCapabilityLevel } from "./capabilities.js";

const ALLOWED_RUNNER_SANDBOX_VALUES = new Set([
  "read-only",
  "workspace-write",
  "danger-full-access",
]);

export type RunnerSandboxMode = string;

export const RUNNER_SANDBOX_MODES = [
  ...ALLOWED_RUNNER_SANDBOX_VALUES,
] as readonly RunnerSandboxMode[];
export const RUNNER_READ_ONLY_SANDBOX = RUNNER_SANDBOX_MODES[0]!;
export const RUNNER_WORKSPACE_WRITE_SANDBOX = RUNNER_SANDBOX_MODES[1]!;
export const RUNNER_DANGER_FULL_ACCESS_SANDBOX = RUNNER_SANDBOX_MODES[2]!;

export type RunnerDangerFullAccessAuthority = {
  danger_full_access_authorized: true;
  provenance: "explicit_operator";
  source: string;
};

export type RunnerSandboxAuthority = {
  danger_full_access_authorized: boolean;
  provenance: RunnerDangerFullAccessAuthority["provenance"] | null;
  source: string | null;
};

export type RunnerSandboxPolicy = {
  requested: string;
  source: "role_default" | "recipe_run_profile" | "cli_override";
  role: string;
  authority: RunnerSandboxAuthority;
};

export type RunnerWriteScopePolicy = {
  mutation_scope?: string | null;
  writable_roots: string[];
  protected_paths: string[];
};

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
