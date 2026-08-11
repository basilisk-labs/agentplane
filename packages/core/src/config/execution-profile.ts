import type { AgentplaneConfig, ExecutionProfile } from "./config.js";

export type ApprovalSettings = {
  require_plan: boolean;
  require_network: boolean;
  require_verify: boolean;
  require_force?: boolean;
};

export const CANONICAL_EXECUTION_PROFILE: ExecutionProfile = "standard";

const CANONICAL_EXECUTION_POLICY: AgentplaneConfig["execution"] = {
  profile: CANONICAL_EXECUTION_PROFILE,
  reasoning_effort: "medium",
  text_verbosity: "medium",
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
};

/**
 * Legacy profile names remain valid config input for patch-level compatibility.
 * They intentionally resolve to one immutable runtime policy.
 */
export const EXECUTION_PROFILE_PRESETS: Record<ExecutionProfile, AgentplaneConfig["execution"]> = {
  standard: structuredClone(CANONICAL_EXECUTION_POLICY),
  conservative: structuredClone(CANONICAL_EXECUTION_POLICY),
  balanced: structuredClone(CANONICAL_EXECUTION_POLICY),
  aggressive: structuredClone(CANONICAL_EXECUTION_POLICY),
};

export function resolveExecutionProfilePreset(
  _profile: ExecutionProfile,
): AgentplaneConfig["execution"] {
  return structuredClone(CANONICAL_EXECUTION_POLICY);
}

export function buildExecutionProfile(
  profile: ExecutionProfile,
  opts?: { strictUnsafeConfirm?: boolean },
): AgentplaneConfig["execution"] {
  void opts;
  return resolveExecutionProfilePreset(profile);
}

export function applyExecutionToApprovals(opts: {
  execution: AgentplaneConfig["execution"];
  approvals: ApprovalSettings;
}): Required<ApprovalSettings> {
  const base: Required<ApprovalSettings> = {
    require_plan: opts.approvals.require_plan === true,
    require_network: opts.approvals.require_network === true,
    require_verify: opts.approvals.require_verify === true,
    require_force: true,
  };

  void opts.execution;
  return base;
}
