import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";
import {
  executionGrantFromExtensions,
  isExecutionGrantActive,
  type ExecutionGrant,
  type ExecutionGrantCapability,
} from "@agentplaneorg/core/tasks";

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
  | {
      state: "resolved";
      actor: string;
      boundary: "side_effect";
      source: "repository_policy" | "execution_grant";
    };

function operationCapability(operationId: string): ExecutionGrantCapability {
  if (operationId.startsWith("integration.")) return "repository.integrate";
  if (operationId.startsWith("task.hosted_close.")) {
    return "provider.merge";
  }
  if (
    operationId.startsWith("pr.") ||
    operationId.startsWith("provider.pr.") ||
    operationId === "route.remote.refresh"
  ) {
    return "provider.pr";
  }
  return "task.lifecycle";
}

export function isOperationAuthorizedByExecutionGrant(
  grant: ExecutionGrant,
  operationId: string,
): boolean {
  if (operationId === "task.scope.extend") return false;
  return grant.capabilities.includes(operationCapability(operationId));
}

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
  const task = await loadTaskFromContext({
    ctx: opts.command,
    taskId: step.request.taskId,
    preferBranchSnapshot: opts.decision.workflowMode === "branch_pr",
  });
  const executionGrant = executionGrantFromExtensions(task.extensions);
  const activeGrant = isExecutionGrantActive({
    grant: executionGrant,
    task_id: task.id,
    plan: task.sections?.Plan ?? "",
    execution_contract: task.execution_contract,
  })
    ? executionGrant
    : null;
  const config = opts.command.config.authority;
  const grantOwnsOperation = Boolean(
    activeGrant && isOperationAuthorizedByExecutionGrant(activeGrant, step.request.operationId),
  );
  if (!grantOwnsOperation && !isOperationAuthorizedByPolicy(config, step.request.operationId)) {
    return {
      state: "not_applicable",
      reason: `operation ${step.request.operationId} is outside the approved execution grant and repository policy`,
    };
  }
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
  const actor = activeGrant && grantOwnsOperation ? activeGrant.actor : config.actor;
  const authorityGrant = createSideEffectAuthorityRecord({
    actor,
    operation: step.request.operation,
    fingerprint: step.preconditionFingerprint,
    issuedAt,
    expiresAt,
  });
  if (
    authorityGrant.operationDigest !== step.request.operationDigest ||
    authorityGrant.stateFingerprintDigest !== step.request.stateFingerprintDigest ||
    authorityGrant.stateScopeDigest !== step.request.stateScopeDigest
  ) {
    return {
      state: "not_applicable",
      reason: "reconstructed policy authority no longer matches the current route",
    };
  }

  const audited = appendSideEffectAuthorityAudit({
    state: {
      schemaVersion: 1,
      grants: [...loaded.state.grants, authorityGrant],
      audit: loaded.state.audit,
    },
    at: issuedAt,
    actor,
    operation: step.request.operation,
    fingerprint: step.preconditionFingerprint,
    authority: authorityGrant,
    outcome: "approved",
  });
  await persistSideEffectAuthorityState({
    gitRoot: opts.command.resolvedProject.gitRoot,
    taskId: step.request.taskId,
    state: audited,
  });
  return {
    state: "resolved",
    actor,
    boundary: "side_effect",
    source: activeGrant && grantOwnsOperation ? "execution_grant" : "repository_policy",
  };
}
