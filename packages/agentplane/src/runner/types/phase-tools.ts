import type { AgentWorkOrderRole } from "@agentplaneorg/core/schemas";

export const RUNNER_PHASE_TOOL_NAMES = [
  "report_result",
  "report_blocker",
  "request_knowledge",
  "knowledge_search",
  "knowledge_show",
] as const;

export type RunnerPhaseToolName = (typeof RUNNER_PHASE_TOOL_NAMES)[number];

type RunnerPhaseToolTransport = "run_scoped_command" | "terminal_result" | "none";

export type RunnerPhaseToolCapability = {
  availability: "available" | "unavailable";
  transport: RunnerPhaseToolTransport;
  enforcement: "supervisor" | "adapter" | "advisory";
  note: string;
};

export type RunnerPhaseToolDescriptor = {
  name: RunnerPhaseToolName;
  allowed: boolean;
  transport: RunnerPhaseToolTransport;
  enforcement: RunnerPhaseToolCapability["enforcement"];
  invocation: string | null;
  input_mode: "stdin_json" | "terminal_result";
  input_schema: Record<string, unknown>;
  reason: string | null;
};

export type RunnerPhaseToolManifest = {
  schema_version: 1;
  kind: "runner_phase_tool_manifest";
  run_id: string;
  work_order_id: string;
  task_id: string;
  phase: string;
  role: AgentWorkOrderRole;
  global_help_required: false;
  token: {
    id: string;
    issued_at: string;
    expires_at: string;
    terminal_reports_revoke: true;
  };
  tools: RunnerPhaseToolDescriptor[];
  repository_tool_classes: string[];
  grant_path: string;
  audit_directory: string;
};

export type RunnerPhaseToolResponseCode =
  | "accepted"
  | "invalid_input"
  | "invalid_token"
  | "token_expired"
  | "token_revoked"
  | "run_not_active"
  | "tool_not_allowed"
  | "role_forbidden"
  | "work_order_mismatch"
  | "state_fingerprint_mismatch"
  | "terminal_result_exists"
  | "storage_error";

export type RunnerPhaseToolResponse = {
  schema_version: 1;
  kind: "runner_phase_tool_response";
  status: "ok" | "denied";
  code: RunnerPhaseToolResponseCode;
  tool: string;
  run_id: string | null;
  work_order_id: string | null;
  data: unknown;
  audit: {
    path: string;
    digest: string;
  } | null;
};
