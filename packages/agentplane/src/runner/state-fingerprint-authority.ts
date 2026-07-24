import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import { isRecord } from "../shared/guards.js";
import { RUNNER_DANGER_FULL_ACCESS_SANDBOX } from "./types.js";
import type {
  RunnerContextBundle,
  RunnerDangerFullAccessAuthority,
  RunnerSandboxPolicy,
  RunnerWriteScopePolicy,
} from "./types.js";

function unavailableComponent(source: string, reason_code: string): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source,
    reason_code,
  };
}

function validApprovals(
  approvals: RunnerContextBundle["execution"]["approvals"] | null | undefined,
): approvals is Required<NonNullable<RunnerContextBundle["execution"]["approvals"]>> {
  return (
    isRecord(approvals) &&
    typeof approvals.require_plan === "boolean" &&
    typeof approvals.require_verify === "boolean" &&
    typeof approvals.require_network === "boolean"
  );
}

function validSandboxPolicy(value: unknown): value is RunnerSandboxPolicy {
  if (!isRecord(value) || !isRecord(value.authority)) return false;
  return (
    typeof value.requested === "string" &&
    value.requested.trim().length > 0 &&
    typeof value.source === "string" &&
    typeof value.role === "string" &&
    value.role.trim().length > 0 &&
    typeof value.authority.danger_full_access_authorized === "boolean" &&
    (value.authority.provenance === null || value.authority.provenance === "explicit_operator") &&
    (value.authority.source === null || typeof value.authority.source === "string")
  );
}

function validWriteScope(value: unknown): value is RunnerWriteScopePolicy {
  return (
    isRecord(value) &&
    Array.isArray(value.writable_roots) &&
    value.writable_roots.every((entry) => typeof entry === "string") &&
    Array.isArray(value.protected_paths) &&
    value.protected_paths.every((entry) => typeof entry === "string")
  );
}

export function authorityComponent(opts: {
  sandbox_policy?: RunnerSandboxPolicy | null;
  write_scope?: RunnerWriteScopePolicy | null;
  approvals?: RunnerContextBundle["execution"]["approvals"] | null;
}): StateFingerprintComponentInput {
  if (
    !validSandboxPolicy(opts.sandbox_policy) ||
    !validWriteScope(opts.write_scope) ||
    !validApprovals(opts.approvals)
  ) {
    return unavailableComponent("runner_authority_resolution", "authority_projection_unavailable");
  }
  if (
    opts.sandbox_policy.requested === RUNNER_DANGER_FULL_ACCESS_SANDBOX &&
    opts.sandbox_policy.authority.danger_full_access_authorized !== true
  ) {
    return unavailableComponent(
      "runner_authority_resolution",
      "danger_full_access_authority_unavailable",
    );
  }
  return {
    state: "present",
    source: "runner_authority_resolution",
    value: {
      sandbox_policy: opts.sandbox_policy,
      write_scope: opts.write_scope,
      approvals: opts.approvals,
    },
  };
}

export function dangerAuthorityFromBundle(
  bundle: RunnerContextBundle,
): RunnerDangerFullAccessAuthority | null {
  const authority = bundle.execution.sandbox_policy?.authority;
  return authority?.danger_full_access_authorized === true &&
    authority.provenance === "explicit_operator" &&
    typeof authority.source === "string" &&
    authority.source.trim().length > 0
    ? {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: authority.source,
      }
    : null;
}
