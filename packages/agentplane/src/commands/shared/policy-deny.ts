import type { PolicyResult } from "../../policy/model.js";
import type { PolicyDecision } from "../../policy/engine.js";
import { CliError } from "../../shared/errors.js";

export function throwIfPolicyDenied(res: PolicyResult): void {
  if (res.ok) return;
  const messages = res.errors.map((e) => e.message).join("\n");
  const chosen =
    res.errors.find((e) => e.code === "E_INTERNAL") ??
    res.errors.find((e) => e.code === "E_PHASE_POLICY") ??
    res.errors.find((e) => e.code === "E_USAGE") ??
    res.errors[0];
  if (!chosen) return;
  throw new CliError({ exitCode: chosen.exitCode, code: chosen.code, message: messages });
}

export function throwIfPolicyDecisionDenied(decision: PolicyDecision): void {
  if (decision.ok) return;
  const errors = decision.violations.filter((v) => v.level === "error");
  const messages = errors.map((e) => e.message).join("\n");
  const chosen =
    errors.find((e) => e.code === "E_INTERNAL") ??
    errors.find((e) => e.code === "E_PHASE_POLICY") ??
    errors.find((e) => e.code === "E_USAGE") ??
    errors[0];
  if (!chosen) return;
  throw new CliError({ exitCode: chosen.exitCode, code: chosen.code, message: messages });
}
