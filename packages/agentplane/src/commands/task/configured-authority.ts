import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";
import {
  executionGrantForContextFromExtensions,
  createOperationLease,
  executionGrantDigest,
  isExecutionGrantActive,
  repositoryEffectsForPath,
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
import { parseTaskScopeExtensionRequestState } from "../shared/task-scope-extension-request.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

export type ConfiguredAuthorityResolution =
  | { state: "policy_transition"; reason: string }
  | { state: "user_required"; reason: string }
  | { state: "external_blocked"; reason: string }
  | { state: "denied"; reason: string }
  | {
      state: "granted";
      actor: string;
      boundary: "side_effect";
      source: "repository_policy" | "execution_grant";
    };

function operationCapability(operationId: string): ExecutionGrantCapability {
  if (operationId === "task.scope.extend") return "task.scope.extend";
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
  return grant.capabilities.includes(operationCapability(operationId));
}

function isUserApprovedGrant(grant: ExecutionGrant): boolean {
  return (
    grant.actor === "USER" ||
    grant.actor.endsWith(":USER") ||
    grant.approval_kind === "host_user_decision" ||
    grant.approval_kind === "signed_user_receipt"
  );
}

export function executionGrantOperationLeaseId(opts: {
  grant_digest: string;
  task_id: string;
  operation_id: string;
  operation_digest: string;
  state_scope_digest: string;
}): string {
  return `lease-${executionGrantDigest(opts).slice("sha256:".length)}`;
}

export function isScopeExtensionCoveredByExecutionGrant(opts: {
  grant: ExecutionGrant;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
}): boolean {
  if (
    !isUserApprovedGrant(opts.grant) ||
    !isOperationAuthorizedByExecutionGrant(opts.grant, "task.scope.extend")
  ) {
    return false;
  }
  const pending = parseTaskScopeExtensionRequestState(opts.task);
  const allowed = new Set(opts.task.execution_contract?.authority.allowed_repository_effects);
  if (pending?.status !== "pending" || allowed.size === 0) return false;
  const requestedEffects = new Set([
    ...pending.request.repository_effects,
    ...pending.request.scope_roots.flatMap((root) => repositoryEffectsForPath(root)),
  ]);
  return [...requestedEffects].every((effect) => allowed.has(effect));
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
    return { state: "policy_transition", reason: "current route is not an approval boundary" };
  }

  if (step.request.type !== "side_effect") {
    return { state: "user_required", reason: "semantic approvals remain operator-owned" };
  }
  const task = await loadTaskFromContext({
    ctx: opts.command,
    taskId: step.request.taskId,
    preferBranchSnapshot: opts.decision.workflowMode === "branch_pr",
  });
  const repositoryIdentity = await resolveLogicalRepositoryIdentity({
    git_root: opts.command.resolvedProject.gitRoot,
    task,
  });
  const executionGrant = executionGrantForContextFromExtensions({
    extensions: task.extensions,
    repository_identity: repositoryIdentity,
    execution_contract: task.execution_contract,
  });
  const activeGrant = isExecutionGrantActive({
    grant: executionGrant,
    task_id: task.id,
    plan: task.sections?.Plan ?? "",
    execution_contract: task.execution_contract,
    repository_identity: repositoryIdentity,
  })
    ? executionGrant
    : null;
  const config = opts.command.config.authority;
  const grantOwnsOperation = Boolean(
    activeGrant &&
      (step.request.operationId === "task.scope.extend"
        ? isScopeExtensionCoveredByExecutionGrant({ grant: activeGrant, task })
        : isOperationAuthorizedByExecutionGrant(activeGrant, step.request.operationId)),
  );
  if (!grantOwnsOperation && !isOperationAuthorizedByPolicy(config, step.request.operationId)) {
    return {
      state: "user_required",
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
      state: "denied",
      reason: "persisted side-effect authority state is malformed",
    };
  }

  const issuedAt = new Date().toISOString();
  const expiresAt = new Date(Date.parse(issuedAt) + config.ttl_minutes * 60_000).toISOString();
  const actor = activeGrant && grantOwnsOperation ? activeGrant.actor : config.actor;
  const operationLease =
    activeGrant && grantOwnsOperation
      ? createOperationLease({
          grant: activeGrant,
          operation_id: step.request.operationId,
          operation_digest: step.request.operationDigest,
          state_fingerprint: step.request.stateFingerprintDigest,
          state_scope_digest: step.request.stateScopeDigest,
          issued_at: issuedAt,
          expires_at: expiresAt,
          lease_id: executionGrantOperationLeaseId({
            grant_digest: activeGrant.digest,
            task_id: step.request.taskId,
            operation_id: step.request.operationId,
            operation_digest: step.request.operationDigest,
            state_scope_digest: step.request.stateScopeDigest,
          }),
        })
      : undefined;
  const authorityGrant = createSideEffectAuthorityRecord({
    actor,
    operation: step.request.operation,
    fingerprint: step.preconditionFingerprint,
    issuedAt,
    expiresAt,
    ...(operationLease ? { operationLease, id: `authority-${operationLease.lease_id}` } : {}),
  });
  if (
    authorityGrant.operationDigest !== step.request.operationDigest ||
    authorityGrant.stateFingerprintDigest !== step.request.stateFingerprintDigest ||
    authorityGrant.stateScopeDigest !== step.request.stateScopeDigest
  ) {
    return {
      state: "external_blocked",
      reason: "reconstructed policy authority no longer matches the current route",
    };
  }

  const alreadyIssued = loaded.state.grants.some(
    (grant) =>
      grant.operationId === authorityGrant.operationId &&
      grant.operationDigest === authorityGrant.operationDigest &&
      grant.stateScopeDigest === authorityGrant.stateScopeDigest &&
      grant.operationLease?.lease_id === authorityGrant.operationLease?.lease_id &&
      Date.parse(grant.expiresAt) > Date.now(),
  );
  if (alreadyIssued) {
    return {
      state: "granted",
      actor,
      boundary: "side_effect",
      source: activeGrant && grantOwnsOperation ? "execution_grant" : "repository_policy",
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
    state: "granted",
    actor,
    boundary: "side_effect",
    source: activeGrant && grantOwnsOperation ? "execution_grant" : "repository_policy",
  };
}
