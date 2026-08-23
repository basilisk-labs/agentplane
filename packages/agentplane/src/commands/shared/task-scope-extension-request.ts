import { createHash } from "node:crypto";
import path from "node:path";

import type { AgentSemanticResultScopeExtensionRequest } from "@agentplaneorg/core/schemas";
import {
  approveTaskPlan,
  canonicalizeJson,
  createTaskPlanRevision,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
  WorkItemScheduler,
  type ResourceClaimSpec,
  type TaskAggregate,
  type TaskRepositoryEffect,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";

export const TASK_SCOPE_EXTENSION_REQUEST_KEY = "agentplane.scope_extension_request";

type NormalizedTaskScopeExtensionRequest = {
  schema_version: 1;
  scope_roots: string[];
  repository_effects: TaskRepositoryEffect[];
  rationale: string;
};

export type TaskScopeExtensionRequestState = {
  schema_version: 1;
  kind: "task_scope_extension_request";
  status: "pending" | "applied";
  transition_id: string;
  blocker_state_fingerprint: string;
  request_digest: string;
  request: NormalizedTaskScopeExtensionRequest;
  applied_at?: string;
  applied_by?: string;
};

const REPOSITORY_EFFECTS = new Set<TaskRepositoryEffect>([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);

function uniqueSorted<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)].toSorted();
}

export function normalizeTaskScopeRoot(value: string): string {
  const normalized = path.posix.normalize(value.trim().replaceAll("\\", "/")).replace(/^\.\//u, "");
  if (
    !normalized ||
    normalized === "." ||
    normalized === ".." ||
    normalized.startsWith("../") ||
    path.posix.isAbsolute(normalized)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid scope root: ${value}. Use a non-root repository-relative path.`,
    });
  }
  return normalized.replace(/\/+$/u, "");
}

function normalizeTaskScopeExtensionRequest(
  request: AgentSemanticResultScopeExtensionRequest,
): NormalizedTaskScopeExtensionRequest {
  const normalized = {
    schema_version: 1 as const,
    scope_roots: uniqueSorted(request.scope_roots.map((root) => normalizeTaskScopeRoot(root))),
    repository_effects: uniqueSorted(request.repository_effects),
    rationale: request.rationale.trim(),
  };
  if (normalized.scope_roots.length === 0 && normalized.repository_effects.length === 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Scope extension request must add a scope root or repository effect.",
    });
  }
  return normalized;
}

function taskScopeExtensionRequestDigest(request: NormalizedTaskScopeExtensionRequest): string {
  const canonical = JSON.stringify(canonicalizeJson(request));
  return `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

export function externalBlockerReceipt(opts: {
  transition_id: string;
  state_fingerprint: string;
  request_digest?: string;
}): string {
  const suffix = opts.request_digest ? `/${opts.request_digest}` : "";
  return `Agentplane receipt: external-agent-blocker/${opts.transition_id}/${opts.state_fingerprint}${suffix}.`;
}

export function createTaskScopeExtensionRequestState(opts: {
  request: AgentSemanticResultScopeExtensionRequest;
  transition_id: string;
  state_fingerprint: string;
}): TaskScopeExtensionRequestState {
  const request = normalizeTaskScopeExtensionRequest(opts.request);
  return {
    schema_version: 1,
    kind: "task_scope_extension_request",
    status: "pending",
    transition_id: opts.transition_id,
    blocker_state_fingerprint: opts.state_fingerprint,
    request_digest: taskScopeExtensionRequestDigest(request),
    request,
  };
}

export function parseTaskScopeExtensionRequestState(
  task: Pick<TaskData, "extensions">,
): TaskScopeExtensionRequestState | null {
  const raw = task.extensions?.[TASK_SCOPE_EXTENSION_REQUEST_KEY];
  if (!isRecord(raw) || !isRecord(raw.request)) return null;
  const request = raw.request;
  if (
    raw.schema_version !== 1 ||
    raw.kind !== "task_scope_extension_request" ||
    (raw.status !== "pending" && raw.status !== "applied") ||
    typeof raw.transition_id !== "string" ||
    !/^tr_[0-9a-f]{32}$/u.test(raw.transition_id) ||
    typeof raw.blocker_state_fingerprint !== "string" ||
    !/^sha256:[0-9a-f]{64}$/u.test(raw.blocker_state_fingerprint) ||
    typeof raw.request_digest !== "string" ||
    !/^sha256:[0-9a-f]{64}$/u.test(raw.request_digest) ||
    request.schema_version !== 1 ||
    !Array.isArray(request.scope_roots) ||
    !request.scope_roots.every((value) => typeof value === "string") ||
    !Array.isArray(request.repository_effects) ||
    !request.repository_effects.every(
      (value) => typeof value === "string" && REPOSITORY_EFFECTS.has(value as TaskRepositoryEffect),
    ) ||
    typeof request.rationale !== "string" ||
    !request.rationale.trim()
  ) {
    return null;
  }
  try {
    const normalized = normalizeTaskScopeExtensionRequest({
      schema_version: 1,
      scope_roots: request.scope_roots,
      repository_effects: request.repository_effects as TaskRepositoryEffect[],
      rationale: request.rationale,
    });
    if (
      JSON.stringify(normalized.scope_roots) !== JSON.stringify(request.scope_roots) ||
      JSON.stringify(normalized.repository_effects) !==
        JSON.stringify(request.repository_effects) ||
      normalized.rationale !== request.rationale ||
      taskScopeExtensionRequestDigest(normalized) !== raw.request_digest
    ) {
      return null;
    }
    return {
      schema_version: 1,
      kind: "task_scope_extension_request",
      status: raw.status,
      transition_id: raw.transition_id,
      blocker_state_fingerprint: raw.blocker_state_fingerprint,
      request_digest: raw.request_digest,
      request: normalized,
      ...(typeof raw.applied_at === "string" ? { applied_at: raw.applied_at } : {}),
      ...(typeof raw.applied_by === "string" ? { applied_by: raw.applied_by } : {}),
    };
  } catch {
    return null;
  }
}

export function scopeExtensionReceiptForState(state: TaskScopeExtensionRequestState): string {
  return externalBlockerReceipt({
    transition_id: state.transition_id,
    state_fingerprint: state.blocker_state_fingerprint,
    request_digest: state.request_digest,
  });
}

function extendTaskCentricWorkItemScope(opts: {
  task: TaskData;
  scopeRoots: readonly string[];
  by: string;
  now: string;
  requestDigest: string;
}): TaskAggregate | null {
  const aggregate = taskCentricAggregateFromExtensions(opts.task.extensions);
  const currentPlan = aggregate?.current_plan;
  if (!aggregate || !currentPlan || opts.scopeRoots.length === 0) return aggregate;
  const selected = new WorkItemScheduler(2).select({
    graph: currentPlan.proposal.work_items,
    runtime: aggregate.work_items,
    active_leases: [],
  });
  if (selected.length !== 1) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Task-centric scope extension requires exactly one schedulable WorkItem for the approved retry.",
    });
  }
  const selectedId = selected[0]!.id;
  const addedRoots = uniqueSorted(opts.scopeRoots.map((root) => normalizeTaskScopeRoot(root)));
  const workItems = currentPlan.proposal.work_items.work_items.map((item) => {
    if (item.id !== selectedId) return item;
    const scopeRoots = uniqueSorted([...item.scope_roots, ...addedRoots]);
    const claimsByIdentity = new Map(
      item.resource_claims.map((claim) => [`${claim.kind}:${claim.resource}:${claim.mode}`, claim]),
    );
    for (const root of addedRoots) {
      const claim: ResourceClaimSpec = { kind: "path", resource: root, mode: "write" };
      claimsByIdentity.set(`${claim.kind}:${claim.resource}:${claim.mode}`, claim);
    }
    return {
      ...item,
      scope_roots: scopeRoots,
      resource_claims: [...claimsByIdentity.values()],
    };
  });
  const draft = createTaskPlanRevision({
    proposal: {
      ...currentPlan.proposal,
      work_items: { ...currentPlan.proposal.work_items, work_items: workItems },
    },
    revision: currentPlan.revision + 1,
    created_at: opts.now,
  });
  const approved = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: opts.by,
    approved_at: opts.now,
    policy_facts: [`state_bound_scope_extension:${opts.requestDigest}`],
  });
  return {
    ...aggregate,
    revision: aggregate.revision + 1,
    current_plan: approved,
    plan_history: [...(aggregate.plan_history ?? []), currentPlan],
    event_cursor: aggregate.event_cursor + 1,
    updated_at: opts.now,
  };
}

export function applyApprovedTaskScopeExtension(opts: {
  task: TaskData;
  executionContract: NonNullable<TaskData["execution_contract"]>;
  pending: TaskScopeExtensionRequestState;
  scopeRoots: readonly string[];
  repositoryEffects: readonly TaskRepositoryEffect[];
  by: string;
  now: string;
}): TaskData {
  const taskCentric = extendTaskCentricWorkItemScope({
    task: opts.task,
    scopeRoots: opts.scopeRoots,
    by: opts.by,
    now: opts.now,
    requestDigest: opts.pending.request_digest,
  });
  return {
    ...opts.task,
    status: "DOING",
    commit: null,
    verification: {
      state: "pending",
      attempts: opts.task.verification?.attempts ?? 0,
      updated_at: opts.now,
      updated_by: opts.by,
      note: "Invalidated by USER-approved execution scope extension.",
    },
    execution_contract: opts.executionContract,
    extensions: {
      ...(taskCentric
        ? withTaskCentricAggregate(opts.task.extensions, taskCentric)
        : (opts.task.extensions ?? {})),
      [TASK_SCOPE_EXTENSION_REQUEST_KEY]: {
        ...opts.pending,
        status: "applied",
        applied_at: opts.now,
        applied_by: opts.by,
      },
    },
    execution_route: opts.task.execution_route
      ? {
          ...opts.task.execution_route,
          selected_mode: opts.executionContract.selected_mode,
          repository_mode: opts.executionContract.repository_mode,
          reason_codes: [...opts.executionContract.reason_codes],
        }
      : undefined,
    comments: [
      ...(opts.task.comments ?? []),
      {
        author: opts.by,
        body:
          `Approved state-bound execution scope extension: ${opts.scopeRoots.join(", ")}; ` +
          `repository effects: ${opts.repositoryEffects.join(", ") || "unchanged"}.`,
      },
    ],
  };
}
