import { applyExecutionToApprovals, type AgentplaneConfig } from "@agentplaneorg/core/config";

import { resolveRunnerTimeoutPolicy, resolveRunnerTracePolicy } from "../../runner/config.js";

import type {
  ExecutionBudgetCounter,
  ExecutionBudgetPhase,
  ResolvedExecutionProfileRuntime,
} from "./model.js";

function toBudgetCounter(limit: number): ExecutionBudgetCounter {
  return {
    limit,
    used: 0,
    remaining: limit,
    exhausted: limit <= 0,
  };
}

function applyProfileToTracePolicy(
  config: Pick<AgentplaneConfig, "execution" | "runner">,
): ResolvedExecutionProfileRuntime["runner"]["trace_policy"] {
  const trace = resolveRunnerTracePolicy(config);
  if (config.execution.profile === "conservative") {
    return {
      ...trace,
      capture_stderr: true,
      retention: "keep",
    };
  }
  return trace;
}

function applyProfileToTimeoutPolicy(
  config: Pick<AgentplaneConfig, "execution" | "runner">,
): ResolvedExecutionProfileRuntime["runner"]["timeout_policy"] {
  const timeout = resolveRunnerTimeoutPolicy(config);
  if (config.execution.profile === "conservative") {
    return {
      ...timeout,
      terminate_grace_ms: Math.max(timeout.terminate_grace_ms, 5000),
    };
  }
  return timeout;
}

export function resolveExecutionProfileRuntime(
  config: Pick<AgentplaneConfig, "agents" | "execution" | "runner">,
): ResolvedExecutionProfileRuntime {
  const approvals = applyExecutionToApprovals({
    execution: config.execution,
    approvals: config.agents?.approvals ?? {
      require_plan: false,
      require_network: false,
      require_verify: false,
      require_force: false,
    },
  });

  return {
    profile: config.execution.profile,
    reasoning_effort: config.execution.reasoning_effort,
    text_verbosity: config.execution.text_verbosity,
    budget: {
      discovery: toBudgetCounter(config.execution.tool_budget.discovery),
      implementation: toBudgetCounter(config.execution.tool_budget.implementation),
      verification: toBudgetCounter(config.execution.tool_budget.verification),
    },
    stop_conditions: [...config.execution.stop_conditions],
    handoff_conditions: [...config.execution.handoff_conditions],
    unsafe_actions_requiring_explicit_user_ok: [
      ...config.execution.unsafe_actions_requiring_explicit_user_ok,
    ],
    approvals,
    runner: {
      trace_policy: applyProfileToTracePolicy(config),
      timeout_policy: applyProfileToTimeoutPolicy(config),
    },
  };
}

export function consumeExecutionProfileBudget(opts: {
  runtime: ResolvedExecutionProfileRuntime;
  phase: ExecutionBudgetPhase;
  units?: number;
}): ResolvedExecutionProfileRuntime {
  const units = Math.max(0, Math.trunc(opts.units ?? 1));
  const current = opts.runtime.budget[opts.phase];
  const used = current.used + units;
  const limit = current.limit;
  const nextCounter: ExecutionBudgetCounter = {
    limit,
    used,
    remaining: Math.max(0, limit - used),
    exhausted: used >= limit,
  };
  return {
    ...opts.runtime,
    budget: {
      ...opts.runtime.budget,
      [opts.phase]: nextCounter,
    },
  };
}
