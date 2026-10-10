import type { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { NativeAuthorityContext } from "../../ports/kernel-authority.js";
import { CliError } from "../../shared/errors.js";

export function invalid(reason: string, details: Record<string, unknown> = {}): never {
  const requiredAction = [
    "plan_exceeds_native_approval_scope",
    "work_item_exceeds_authority",
  ].includes(reason)
    ? "request_authority_delta"
    : "request_fresh_native_context";
  throw Object.assign(
    new CliError({
      code: "E_VALIDATION",
      message: `Canonical authority rejected: ${reason}. Inspect the task route and obtain the required native authority before retrying.`,
      context: { reason_code: reason, required_action: requiredAction, ...details },
    }),
    {
      reason_code: reason,
      required_action: requiredAction,
    },
  );
}

export function freshTime(context: NativeAuthorityContext) {
  const now = Date.parse(context.occurred_at);
  if (!Number.isFinite(now)) invalid("invalid_observation_time");
  return now;
}

export function assertUnexpired(authority: k.ExecutionAuthority, now: number) {
  if (authority.expires_at !== null && Date.parse(authority.expires_at) <= now)
    invalid("authority_expired");
}
