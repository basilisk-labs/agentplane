import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
} from "../shared/side-effect-authority.js";
import {
  loadSideEffectAuthorityState,
  persistSideEffectAuthorityState,
} from "../shared/side-effect-authority-store.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

export type ConfiguredAuthorityResolution =
  | { state: "not_applicable"; reason: string }
  | { state: "resolved"; actor: string; boundary: "side_effect" };

export function isOperationAuthorizedByPolicy(
  config: SideEffectAuthorityConfig,
  operationId: string,
): boolean {
  if (operationId === "task.scope.extend") return false;
  if (config.mode === "manual" || config.deny_operations.includes(operationId)) return false;
  if (config.mode === "all") return true;
  return config.allow_operations.includes(operationId);
}

/**
 * Resolve an approval boundary only when repository policy explicitly owns it.
 * The resulting grant is the same state-bound, expiring authority record used
 * by the manual command; policy mode changes who may issue it, not its scope.
 */
export async function resolveConfiguredAuthority(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
}): Promise<ConfiguredAuthorityResolution> {
  const step = opts.decision.workflowStep;
  if (step.kind !== "approval") {
    return { state: "not_applicable", reason: "current route is not an approval boundary" };
  }

  if (step.request.type !== "side_effect") {
    return { state: "not_applicable", reason: "semantic approvals remain operator-owned" };
  }
  const config = opts.command.config.authority;
  if (!isOperationAuthorizedByPolicy(config, step.request.operationId)) {
    return {
      state: "not_applicable",
      reason: `operation ${step.request.operationId} is not authorized by repository policy`,
    };
  }

  const task = await loadTaskFromContext({
    ctx: opts.command,
    taskId: step.request.taskId,
    preferBranchSnapshot: opts.command.config.workflow_mode === "branch_pr",
  });
  const loaded = await loadSideEffectAuthorityState({
    gitRoot: opts.command.resolvedProject.gitRoot,
    taskId: step.request.taskId,
    task,
  });
  if (!loaded.state) {
    return {
      state: "not_applicable",
      reason: "persisted side-effect authority state is malformed",
    };
  }

  const issuedAt = new Date().toISOString();
  const expiresAt = new Date(Date.parse(issuedAt) + config.ttl_minutes * 60_000).toISOString();
  const grant = createSideEffectAuthorityRecord({
    actor: config.actor,
    operation: step.request.operation,
    fingerprint: step.preconditionFingerprint,
    issuedAt,
    expiresAt,
  });
  if (
    grant.operationDigest !== step.request.operationDigest ||
    grant.stateFingerprintDigest !== step.request.stateFingerprintDigest ||
    grant.stateScopeDigest !== step.request.stateScopeDigest
  ) {
    return {
      state: "not_applicable",
      reason: "reconstructed policy authority no longer matches the current route",
    };
  }

  const audited = appendSideEffectAuthorityAudit({
    state: {
      schemaVersion: 1,
      grants: [...loaded.state.grants, grant],
      audit: loaded.state.audit,
    },
    at: issuedAt,
    actor: config.actor,
    operation: step.request.operation,
    fingerprint: step.preconditionFingerprint,
    authority: grant,
    outcome: "approved",
  });
  await persistSideEffectAuthorityState({
    gitRoot: opts.command.resolvedProject.gitRoot,
    taskId: step.request.taskId,
    state: audited,
  });
  return { state: "resolved", actor: config.actor, boundary: "side_effect" };
}
