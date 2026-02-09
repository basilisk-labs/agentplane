import type { AgentplaneConfig } from "@agentplaneorg/core";

import { evaluatePolicy } from "./evaluate.js";
import type { PolicyAction, PolicyContext, PolicyProblem, PolicyResult } from "./types.js";

export type PolicyDecision = {
  ok: boolean;
  violations: PolicyViolation[];
};

export type PolicyViolation = {
  level: "error" | "warning";
  code: PolicyProblem["code"];
  exitCode: number;
  message: string;
};

export type ActionId =
  | PolicyAction
  | "task_list"
  | "task_new"
  | "upgrade_apply"
  | "doctor_fix"
  | (string & {});

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

    // Delegate existing policy actions to the current rule engine.
    if (
      action === "guard_commit" ||
      action === "commit" ||
      action === "hook_pre_commit" ||
      action === "hook_commit_msg"
    ) {
      const result = evaluatePolicy(ctx as unknown as PolicyContext);
      return { ok: result.ok, violations: toViolations(result) };
    }

    // Default: no-op. Usecases should still call into the engine so we can harden
    // policy coverage incrementally without duplicating checks across commands.
    return { ok: true, violations: [] };
  }
}
