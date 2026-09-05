import { createHash } from "node:crypto";
import path from "node:path";
import { gitIsAncestor, gitRevParse, gitShowFile } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";

import {
  validateSupervisorExecutionEpisodeJournal,
  type AgentSemanticResultScopeExtensionRequest,
} from "@agentplaneorg/core/schemas";
import {
  approveTaskPlan,
  canonicalizeJson,
  createTaskPlanRevision,
  parseTaskReadme,
  taskCentricDigest,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
  WorkItemScheduler,
  type ResourceClaimSpec,
  type TaskAggregate,
  type TaskRepositoryEffect,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveCommandGitCommonDir, type CommandContext } from "./task-backend.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "./supervisor-execution-episode.js";
import {
  externalAgentResultDigest,
  externalAgentIssueDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  validateExternalAgentResultEnvelope,
  type ExternalAgentExchange,
} from "../task/external-agent-exchange.js";
import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-projection.js";

export const TASK_SCOPE_EXTENSION_REQUEST_KEY = "agentplane.scope_extension_request";

export function requiresImplementationReworkReopen(opts: {
  purpose: string;
  task_status: string;
  work_item_id: string | null;
  work_item_is_required: boolean;
}): boolean {
  if (opts.task_status !== "DONE") return false;
  if (opts.purpose === "implementation_rework") return true;
  return (
    opts.purpose === "implementation" && Boolean(opts.work_item_id) && opts.work_item_is_required
  );
}

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

export function recoverAppliedTaskScopeExtension(task: TaskData): TaskAggregate | null {
  const aggregate = taskCentricAggregateFromExtensions(task.extensions);
  const applied = parseTaskScopeExtensionRequestState(task);
  const contract = task.execution_contract;
  const plan = aggregate?.current_plan;
  if (
    task.status !== "DOING" ||
    aggregate?.lifecycle !== "BLOCKED" ||
    applied?.status !== "applied" ||
    applied.applied_by !== "USER" ||
    !applied.applied_at ||
    !contract ||
    !plan ||
    aggregate.id !== task.id ||
    plan.task_id !== task.id ||
    task.revision === undefined ||
    aggregate.revision >= task.revision ||
    task.commit ||
    task.verification?.state !== "pending" ||
    task.verification.updated_at !== applied.applied_at ||
    task.verification.updated_by !== "USER" ||
    plan.approval.state !== "approved" ||
    plan.approval.approved_digest !== plan.digest ||
    createTaskPlanRevision({
      proposal: plan.proposal,
      revision: plan.revision,
      created_at: plan.created_at,
    }).digest !== plan.digest ||
    !applied.request.scope_roots.every(
      (root) =>
        contract.declaration.scope_roots.includes(root) &&
        contract.authority.writable_roots.includes(root),
    ) ||
    !applied.request.repository_effects.every(
      (effect) =>
        contract.declaration.repository_effects.includes(effect) &&
        contract.authority.allowed_repository_effects.includes(effect),
    ) ||
    !(task.comments ?? []).some(
      (comment) =>
        comment.author === "SUPERVISOR" &&
        comment.body.includes(scopeExtensionReceiptForState(applied)),
    ) ||
    !(task.comments ?? []).some(
      (comment) =>
        comment.author === "USER" &&
        comment.body ===
          `Approved state-bound execution scope extension: ${applied.request.scope_roots.join(", ")}; repository effects: ${applied.request.repository_effects.join(", ") || "unchanged"}.`,
    )
  )
    return null;
  const allRequiredCompleted = plan.proposal.work_items.work_items
    .filter((item) => !item.optional)
    .every((item) => aggregate.work_items[item.id]?.state === "COMPLETED");
  if (
    !allRequiredCompleted &&
    !plan.approval.policy_facts.includes(`state_bound_scope_extension:${applied.request_digest}`)
  )
    return null;
  return { ...aggregate, revision: task.revision, lifecycle: "ACTIVE", final_validation: null };
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
  const allRequiredCompleted = currentPlan.proposal.work_items.work_items
    .filter((item) => !item.optional)
    .every((item) => aggregate.work_items[item.id]?.state === "COMPLETED");
  if (allRequiredCompleted) return aggregate;
  const selected = new WorkItemScheduler(2).select({
    graph: currentPlan.proposal.work_items,
    runtime: aggregate.work_items,
    active_leases: [],
  });
  if (selected.length !== 1) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Task-centric scope extension requires exactly one schedulable WorkItem for the approved retry unless every required WorkItem is completed.",
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
  const original = taskCentricAggregateFromExtensions(opts.task.extensions);
  const revision = opts.task.revision ?? original?.revision;
  if (original && original.revision !== revision) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Scope extension requires synchronized task revisions.",
    });
  }
  const taskCentric = extendTaskCentricWorkItemScope({
    task: opts.task,
    scopeRoots: opts.scopeRoots,
    by: opts.by,
    now: opts.now,
    requestDigest: opts.pending.request_digest,
  });
  const next: TaskData = {
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
        ? withTaskCentricAggregate(opts.task.extensions, {
            ...taskCentric,
            revision: revision!,
            lifecycle: "ACTIVE",
            final_validation: null,
          })
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
  return projectTaskCentricCompatibilityMutation({ current: opts.task, next });
}

export async function assertRecoverableImplementationCommit(opts: {
  cwd: string;
  baseline: string | null;
  commit: string;
  task_id: string;
}): Promise<void> {
  const subject = await runProcess({
    command: "git",
    args: ["show", "-s", "--format=%s", opts.commit],
    cwd: opts.cwd,
    reject: false,
  });
  const ancestry = opts.baseline
    ? await runProcess({
        command: "git",
        args: ["merge-base", "--is-ancestor", opts.baseline, opts.commit],
        cwd: opts.cwd,
        reject: false,
      })
    : null;
  if (
    subject.exitCode !== 0 ||
    subject.stdout.trim() !==
      `🚧 ${opts.task_id.split("-").at(-1)} task: apply external agent result` ||
    (ancestry && ancestry.exitCode !== 0)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Git history changed outside the recoverable Agentplane implementation effect.",
    });
  }
}

function sameRecoveryIdentity(left: unknown, right: unknown): boolean {
  return taskCentricDigest(left ?? null) === taskCentricDigest(right ?? null);
}

export async function recoverAppliedScopeProjection(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  commit: string | null;
}): Promise<void> {
  const task = await opts.command.taskBackend.getTask(opts.exchange.task_id);
  if (!task) return;
  const recovered = recoverAppliedTaskScopeExtension(task);
  if (!recovered) return;
  const root = opts.command.resolvedProject.gitRoot;
  const commit = opts.commit ?? (await gitRevParse(root, ["HEAD"]));
  const base = opts.exchange.baseline.head;
  const issued = await readExternalAgentWorkOrder(opts.exchange.work_order_ref);
  const accepted = await readExternalAgentExchange(
    path.join(path.dirname(opts.exchange.work_order_ref), "exchange.json"),
  );
  const baseline = base
    ? await gitShowFile(
        root,
        base,
        `${opts.command.config.paths.workflow_dir}/${task.id}/README.md`,
      )
    : null;
  const fields = baseline ? parseTaskReadme(baseline).frontmatter : null;
  const extensions = fields?.extensions;
  if (
    !commit ||
    !base ||
    !accepted?.result ||
    !accepted.result_digest ||
    accepted.task_id !== task.id ||
    issued.task.id !== task.id ||
    accepted.transition_id !== opts.exchange.transition_id ||
    accepted.state_fingerprint !== opts.exchange.state_fingerprint ||
    accepted.work_order_ref !== opts.exchange.work_order_ref ||
    issued.state_fingerprint.git_head !== base ||
    path.resolve(issued.state_fingerprint.worktree) !== path.resolve(root) ||
    !["result_received", "accepted", "retired"].includes(accepted.status) ||
    accepted.purpose !== opts.exchange.purpose ||
    !["implementation", "implementation_rework", "task_worktree_resolution"].includes(
      accepted.purpose,
    ) ||
    path.resolve(accepted.checkout) !== path.resolve(root) ||
    path.resolve(opts.exchange.checkout) !== path.resolve(root) ||
    accepted.baseline.head !== base ||
    fields?.id !== task.id ||
    fields.revision !== task.revision ||
    !isRecord(extensions) ||
    ![
      "agentplane.task_centric",
      "agentplane.scope_extension_request",
      "task_execution_context",
    ].every((key) => sameRecoveryIdentity(extensions[key], task.extensions?.[key])) ||
    !isRecord(fields.execution_contract) ||
    !sameRecoveryIdentity(
      fields.execution_contract.declaration,
      task.execution_contract?.declaration,
    ) ||
    !sameRecoveryIdentity(
      fields.execution_contract.authority,
      task.execution_contract?.authority,
    ) ||
    !(await gitIsAncestor(root, base, commit)) ||
    !(await gitIsAncestor(root, commit, "HEAD"))
  )
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Scope projection recovery requires the exact accepted implementation and immutable execution baseline.",
    });
  const envelope = validateExternalAgentResultEnvelope({
    raw: accepted.result,
    exchange: accepted,
    work_order: issued,
  });
  if (accepted.status === "retired") {
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      common_git_dir: await resolveCommandGitCommonDir(opts.command),
      task_id: task.id,
    });
    const journal = validateSupervisorExecutionEpisodeJournal(
      await createSupervisorEpisodeStore(journalPath).read(),
    );
    const effect = `external-agent-issue:${externalAgentIssueDigest({ exchange: accepted, work_order: issued })}`;
    if (
      journal.task_id !== task.id ||
      !journal.operations.some(
        (operation) =>
          operation.work_order_ref === accepted.work_order_ref &&
          operation.precondition_fingerprint_digest === accepted.state_fingerprint &&
          operation.role === issued.role &&
          operation.effect_ref === effect,
      )
    )
      throw new CliError({
        code: "E_VALIDATION",
        message: "The retired implementation does not match its supervisor issue receipt.",
      });
  }
  if (
    envelope.result.status !== "completed" ||
    externalAgentResultDigest(envelope) !== accepted.result_digest
  )
    throw new CliError({
      code: "E_VALIDATION",
      message: "Scope projection recovery rejected an altered accepted result.",
    });
  await assertRecoverableImplementationCommit({
    cwd: root,
    baseline: base,
    commit,
    task_id: task.id,
  });
  await opts.command.taskBackend.writeTask(
    projectTaskCentricCompatibilityMutation({
      current: task,
      next: { ...task, extensions: withTaskCentricAggregate(task.extensions, recovered) },
    }),
    { expectedRevision: task.revision! },
  );
}
