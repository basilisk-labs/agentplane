import type { AgentplaneConfig } from "@agentplaneorg/core";

import { evaluatePolicy } from "./evaluate.js";
import { resolvePolicyActionDescriptor, type PolicyActionDescriptor } from "./taxonomy.js";
import type { PolicyAction, PolicyContext, PolicyProblem, PolicyResult } from "./model.js";

export type PolicyDecision = {
  ok: boolean;
  action: PolicyActionDescriptor;
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

    // Delegate existing policy actions to the current rule engine.
    if (descriptor.enforcement === "git_rules") {
      const result = evaluatePolicy(ctx as unknown as PolicyContext);
      return { ok: result.ok, action: descriptor, violations: toViolations(result) };
    }

    // Default: no-op. Usecases should still call into the engine so we can harden
    // policy coverage incrementally without duplicating checks across commands.
    return { ok: true, action: descriptor, violations: [] };
  }
}
