import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { evaluatePolicy } from "./evaluate.js";
import { evaluatePhasePolicy, resolvePolicyPhase } from "./rules/phase.js";
import { mergeResults } from "./result.js";
import { resolvePolicyActionDescriptor, type PolicyActionDescriptor } from "./taxonomy.js";
import type {
  PolicyAction,
  PolicyContext,
  PolicyPhase,
  PolicyProblem,
  PolicyResult,
} from "./model.js";

export type PolicyDecision = {
  ok: boolean;
  action: PolicyActionDescriptor;
  phase: PolicyPhase | null;
  violations: PolicyViolation[];
};

export type PolicyViolation = {
  level: "error" | "warning";
  code: PolicyProblem["code"];
  exitCode: number;
  message: string;
};

export type ActionId = PolicyAction | (string & {});

export type PolicyEngineContext = Omit<PolicyContext, "action"> & {
  action: ActionId;
  config: AgentplaneConfig;
};

function toViolations(result: PolicyResult): PolicyViolation[] {
  const out: PolicyViolation[] = [];
  for (const err of result.errors) {
    out.push({ level: "error", code: err.code, exitCode: err.exitCode, message: err.message });
  }
  for (const warn of result.warnings) {
    out.push({
      level: "warning",
      code: warn.code,
      exitCode: warn.exitCode,
      message: warn.message,
    });
  }
  return out;
}

export class PolicyEngine {
  evaluate(ctx: PolicyEngineContext): PolicyDecision {
    const action = ctx.action;
    const descriptor = resolvePolicyActionDescriptor(action);
    const phase = resolvePolicyPhase(descriptor.id, ctx.phase);
    const phaseResult = evaluatePhasePolicy({
      ...(ctx as unknown as PolicyContext),
      action: descriptor.id,
      phase: phase ?? ctx.phase,
    });

    // Delegate existing policy actions to the current rule engine.
    if (descriptor.enforcement === "git_rules") {
      const result = mergeResults(evaluatePolicy(ctx as unknown as PolicyContext), phaseResult);
      return { ok: result.ok, action: descriptor, phase, violations: toViolations(result) };
    }

    // Default: no-op. Usecases should still call into the engine so we can harden
    // policy coverage incrementally without duplicating checks across commands.
    return { ok: phaseResult.ok, action: descriptor, phase, violations: toViolations(phaseResult) };
  }
}
