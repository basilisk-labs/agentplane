import type {
  AgentplaneConfig,
  RunnerTimeoutConfig,
  RunnerTraceConfig,
} from "@agentplaneorg/core/config";

export type ExecutionBudgetPhase = keyof AgentplaneConfig["execution"]["tool_budget"];

export type ExecutionBudgetCounter = {
  limit: number;
  used: number;
  remaining: number;
  exhausted: boolean;
};

export type ResolvedExecutionProfileRuntime = {
  profile: AgentplaneConfig["execution"]["profile"];
  reasoning_effort: AgentplaneConfig["execution"]["reasoning_effort"];
  text_verbosity: AgentplaneConfig["execution"]["text_verbosity"];
  budget: Record<ExecutionBudgetPhase, ExecutionBudgetCounter>;
  stop_conditions: string[];
  handoff_conditions: string[];
  unsafe_actions_requiring_explicit_user_ok: string[];
  approvals: {
    require_plan: boolean;
    require_network: boolean;
    require_verify: boolean;
    require_force?: boolean;
  };
  runner: {
    trace_policy: RunnerTraceConfig;
    timeout_policy: RunnerTimeoutConfig;
  };
};
