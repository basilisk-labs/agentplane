import type { AgentplaneConfig, ExecutionProfile } from "./config.js";

export const EXECUTION_PROFILE_PRESETS: Record<ExecutionProfile, AgentplaneConfig["execution"]> = {
  conservative: {
    profile: "conservative",
    reasoning_effort: "high",
    tool_budget: {
      discovery: 4,
      implementation: 8,
      verification: 8,
    },
    stop_conditions: [
      "Missing required input blocks correctness.",
      "Requested action expands scope or risk beyond approved plan.",
      "Verification fails and remediation changes scope.",
    ],
    handoff_conditions: [
      "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
      "Task depends_on prerequisites are incomplete.",
      "Specialized agent is required.",
    ],
    unsafe_actions_requiring_explicit_user_ok: [
      "Destructive git history operations.",
      "Outside-repo read/write.",
      "Credential, keychain, or SSH material changes.",
      "Network actions when approvals are enabled.",
    ],
  },
  balanced: {
    profile: "balanced",
    reasoning_effort: "medium",
    tool_budget: {
      discovery: 6,
      implementation: 10,
      verification: 6,
    },
    stop_conditions: [
      "Missing required input blocks correctness.",
      "Requested action expands scope or risk beyond approved plan.",
      "Verification fails and remediation changes scope.",
    ],
    handoff_conditions: [
      "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
      "Task depends_on prerequisites are incomplete.",
      "Specialized agent is required.",
    ],
    unsafe_actions_requiring_explicit_user_ok: [
      "Destructive git history operations.",
      "Outside-repo read/write.",
      "Credential, keychain, or SSH material changes.",
    ],
  },
  aggressive: {
    profile: "aggressive",
    reasoning_effort: "low",
    tool_budget: {
      discovery: 10,
      implementation: 16,
      verification: 8,
    },
    stop_conditions: [
      "Requested action expands scope or risk beyond approved plan.",
      "Verification fails and remediation changes scope.",
    ],
    handoff_conditions: [
      "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
      "Specialized agent is required.",
    ],
    unsafe_actions_requiring_explicit_user_ok: [
      "Destructive git history operations.",
      "Outside-repo read/write.",
      "Credential, keychain, or SSH material changes.",
    ],
  },
};

export function resolveExecutionProfilePreset(
  profile: ExecutionProfile,
): AgentplaneConfig["execution"] {
  return structuredClone(EXECUTION_PROFILE_PRESETS[profile]);
}

export function buildExecutionProfile(
  profile: ExecutionProfile,
  opts?: { strictUnsafeConfirm?: boolean },
): AgentplaneConfig["execution"] {
  const resolved = resolveExecutionProfilePreset(profile);
  if (opts?.strictUnsafeConfirm !== true) return resolved;
  const strictItem = "Network actions when approvals are disabled.";
  if (!resolved.unsafe_actions_requiring_explicit_user_ok.includes(strictItem)) {
    resolved.unsafe_actions_requiring_explicit_user_ok.push(strictItem);
  }
  return resolved;
}
