import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { resolveRunnerTimeoutPolicy, resolveRunnerTracePolicy } from "../../runner/config.js";
import { resolveEffectiveApprovalSettings } from "../approvals/index.js";
import { buildCanonicalExecutionPolicy } from "./canonical.js";

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
  return resolveRunnerTracePolicy(config);
}

function applyProfileToTimeoutPolicy(
  config: Pick<AgentplaneConfig, "execution" | "runner">,
): ResolvedExecutionProfileRuntime["runner"]["timeout_policy"] {
  return resolveRunnerTimeoutPolicy(config);
}

export function resolveExecutionProfileRuntime(
  config: Pick<AgentplaneConfig, "agents" | "execution" | "runner">,
): ResolvedExecutionProfileRuntime {
  const execution = buildCanonicalExecutionPolicy();
  const approvals = resolveEffectiveApprovalSettings(config);

  return {
    profile: execution.profile,
    reasoning_effort: execution.reasoning_effort,
    text_verbosity: execution.text_verbosity,
    budget: {
      discovery: toBudgetCounter(execution.tool_budget.discovery),
      implementation: toBudgetCounter(execution.tool_budget.implementation),
      verification: toBudgetCounter(execution.tool_budget.verification),
    },
    stop_conditions: [...execution.stop_conditions],
    handoff_conditions: [...execution.handoff_conditions],
    unsafe_actions_requiring_explicit_user_ok: [
      ...execution.unsafe_actions_requiring_explicit_user_ok,
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
