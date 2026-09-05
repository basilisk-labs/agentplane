import { taskCentricDigest } from "./digest.js";
import type {
  ExecutionLease,
  OutputManifest,
  PlanApproval,
  ResourceClaimSpec,
  Sha256Digest,
  TaskAggregate,
  TaskPlanProposal,
  TaskPlanRevision,
  TransitionReceipt,
  WorkItem,
  WorkItemGraph,
  WorkItemRuntime,
} from "./model.js";

export type GraphValidationIssue = Readonly<{
  code:
    | "duplicate_work_item"
    | "missing_dependency"
    | "dependency_cycle"
    | "missing_output_declaration"
    | "missing_acceptance"
    | "missing_validation"
    | "unsupported_capability"
    | "material_question"
    | "stale_baseline";
  path: string;
  message: string;
}>;

export type WorkItemReadiness = Readonly<{
  work_item_id: string;
  ready: boolean;
  reason_codes: readonly string[];
}>;

export type ReplacementPlanWorkItemRecoveryEvidence = Readonly<{
  aggregate: TaskAggregate;
  receipt: TransitionReceipt;
}>;

function validateDependencies(graph: WorkItemGraph, issues: GraphValidationIssue[]): void {
  const ids = new Set<string>();
  for (const [index, item] of graph.work_items.entries()) {
    if (ids.has(item.id)) {
      issues.push({
        code: "duplicate_work_item",
        path: `work_items[${index}].id`,
        message: `Work item id ${item.id} is duplicated.`,
      });
    }
    ids.add(item.id);
  }
  for (const [index, item] of graph.work_items.entries()) {
    for (const dependency of item.depends_on) {
      if (!ids.has(dependency)) {
        issues.push({
          code: "missing_dependency",
          path: `work_items[${index}].depends_on`,
          message: `Work item ${item.id} depends on missing work item ${dependency}.`,
        });
      }
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const byId = new Map(graph.work_items.map((item) => [item.id, item]));
  const visit = (id: string): boolean => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visiting.add(id);
    for (const dependency of byId.get(id)?.depends_on ?? []) {
      if (byId.has(dependency) && visit(dependency)) return true;
    }
    visiting.delete(id);
    visited.add(id);
    return false;
  };
  for (const item of graph.work_items) {
    if (visit(item.id)) {
      issues.push({
        code: "dependency_cycle",
        path: `work_items.${item.id}.depends_on`,
        message: `Work item ${item.id} participates in a dependency cycle.`,
      });
      break;
    }
  }
}

export function validateWorkItemGraph(
  graph: WorkItemGraph,
  supportedCapabilities: ReadonlySet<string> = new Set(),
): readonly GraphValidationIssue[] {
  const issues: GraphValidationIssue[] = [];
  validateDependencies(graph, issues);
  for (const [index, item] of graph.work_items.entries()) {
    if (
      item.expected_outputs.length === 0 ||
      item.expected_outputs.some((output) => !output.trim())
    ) {
      issues.push({
        code: "missing_output_declaration",
        path: `work_items[${index}].expected_outputs`,
        message: `Work item ${item.id} declares an empty output.`,
      });
    }
    if (item.acceptance_criteria.length === 0) {
      issues.push({
        code: "missing_acceptance",
        path: `work_items[${index}].acceptance_criteria`,
        message: `Work item ${item.id} has no acceptance criteria.`,
      });
    }
    const checkIds = new Set(item.validation.checks.map((check) => check.id));
    const validationCriteriaById = new Map(
      item.validation.criteria.map((criterion) => [criterion.id, criterion]),
    );
    for (const criterion of item.acceptance_criteria) {
      if (!criterion.required) continue;
      const validationCriterion = validationCriteriaById.get(criterion.id);
      const missingDeclaredCheck = criterion.check_ids.some((id) => !checkIds.has(id));
      const validationDoesNotCoverAcceptance =
        criterion.check_ids.length === 0 ||
        !validationCriterion?.required ||
        criterion.check_ids.some((id) => !validationCriterion.check_ids.includes(id));
      if (missingDeclaredCheck || validationDoesNotCoverAcceptance) {
        issues.push({
          code: "missing_validation",
          path: `work_items[${index}].acceptance_criteria.${criterion.id}`,
          message: `Required criterion ${criterion.id} is not fully covered by validation criteria and declared checks.`,
        });
      }
    }
    if (supportedCapabilities.size > 0) {
      for (const capability of new Set([
        ...item.capabilities,
        ...item.validation.checks.map((check) => check.capability),
      ])) {
        if (!supportedCapabilities.has(capability)) {
          issues.push({
            code: "unsupported_capability",
            path: `work_items[${index}].capabilities`,
            message: `Capability ${capability} is not available.`,
          });
        }
      }
    }
  }
  return issues;
}

export function validateTaskPlanProposal(opts: {
  proposal: TaskPlanProposal;
  expected_task_id: string;
  current_repository_digest: Sha256Digest;
  supported_capabilities?: ReadonlySet<string>;
}): readonly GraphValidationIssue[] {
  const issues = [...validateWorkItemGraph(opts.proposal.work_items, opts.supported_capabilities)];
  if (opts.proposal.task_id !== opts.expected_task_id) {
    issues.push({
      code: "missing_dependency",
      path: "task_id",
      message: "Plan proposal task id does not match the requested task.",
    });
  }
  if (opts.proposal.unresolved_questions.length > 0) {
    issues.push({
      code: "material_question",
      path: "unresolved_questions",
      message: "Material questions must be resolved before plan approval.",
    });
  }
  if (opts.proposal.planning_baseline.digest !== opts.current_repository_digest) {
    issues.push({
      code: "stale_baseline",
      path: "planning_baseline.digest",
      message: "Plan proposal was built against a stale repository snapshot.",
    });
  }
  if (opts.supported_capabilities && opts.supported_capabilities.size > 0) {
    for (const check of opts.proposal.top_level_validation.checks) {
      if (!opts.supported_capabilities.has(check.capability)) {
        issues.push({
          code: "unsupported_capability",
          path: "top_level_validation.checks",
          message: `Capability ${check.capability} is not available.`,
        });
      }
    }
  }
  return issues;
}

function pendingApproval(): PlanApproval {
  return Object.freeze({
    state: "pending",
    approved_by: null,
    approved_at: null,
    approved_digest: null,
    policy_facts: [],
  });
}

function planContentDigest(
  plan: Pick<TaskPlanRevision, "schema_version" | "task_id" | "revision" | "proposal">,
): Sha256Digest {
  return taskCentricDigest({
    schema_version: plan.schema_version,
    task_id: plan.task_id,
    revision: plan.revision,
    proposal: plan.proposal,
  });
}

export function createTaskPlanRevision(opts: {
  proposal: TaskPlanProposal;
  revision: number;
  created_at: string;
}): TaskPlanRevision {
  if (!Number.isInteger(opts.revision) || opts.revision < 1) {
    throw new Error("Task plan revision must be a positive integer.");
  }
  const digest = planContentDigest({
    schema_version: 1,
    task_id: opts.proposal.task_id,
    revision: opts.revision,
    proposal: opts.proposal,
  });
  return Object.freeze({
    schema_version: 1,
    task_id: opts.proposal.task_id,
    revision: opts.revision,
    digest,
    proposal: opts.proposal,
    approval: pendingApproval(),
    created_at: opts.created_at,
  });
}

function freshWorkItemRuntime(item: WorkItem): WorkItemRuntime {
  return Object.freeze({
    id: item.id,
    state: "PLANNED" as const,
    revision: 1,
    attempt: 0,
    claim_id: null,
    output_manifests: [],
    validation_result: null,
    last_failure: null,
  });
}

function workItemSemanticDigest(item: WorkItem): Sha256Digest {
  const { evidence_fingerprint: _evidenceFingerprint, ...validation } = item.validation;
  return taskCentricDigest({ ...item, validation });
}

function isFreshWorkItemRuntime(runtime: WorkItemRuntime): boolean {
  return (
    runtime.state === "PLANNED" &&
    runtime.revision === 1 &&
    runtime.attempt === 0 &&
    runtime.claim_id === null &&
    runtime.output_manifests.length === 0 &&
    runtime.validation_result === null &&
    runtime.last_failure === null
  );
}

const RECOVERABLE_WORK_ITEM_STATES = new Set<WorkItemRuntime["state"]>([
  "COMPLETED",
  "REWORK_READY",
]);

function recoverWorkItemRuntime(opts: {
  task: TaskAggregate;
  item: WorkItem;
  evidence: readonly ReplacementPlanWorkItemRecoveryEvidence[];
}): WorkItemRuntime | null {
  const relevant = opts.evidence.filter(
    ({ receipt }) => receipt.event.work_item_id === opts.item.id,
  );
  if (relevant.length !== 1) return null;

  const { aggregate, receipt } = relevant[0]!;
  const sourcePlan = aggregate.current_plan;
  const sourceRuntime = aggregate.work_items[opts.item.id];
  const sourceDefinition = sourcePlan?.proposal.work_items.work_items.find(
    (candidate) => candidate.id === opts.item.id,
  );
  if (!sourcePlan || !sourceDefinition || !sourceRuntime) return null;
  const planIsInTaskLineage = [opts.task.current_plan, ...(opts.task.plan_history ?? [])].some(
    (plan) =>
      plan?.revision === sourcePlan.revision &&
      plan.digest === sourcePlan.digest &&
      taskCentricDigest(plan.proposal) === taskCentricDigest(sourcePlan.proposal),
  );
  const event = receipt.event;
  const outputsComplete = opts.item.expected_outputs.every((id) =>
    sourceRuntime.output_manifests.some((output) => output.id === id),
  );
  const terminalEvidenceComplete =
    sourceRuntime.state === "COMPLETED"
      ? sourceRuntime.validation_result?.status === "passed" && outputsComplete
      : sourceRuntime.state === "REWORK_READY"
        ? sourceRuntime.validation_result?.status === "failed" &&
          sourceRuntime.last_failure !== null
        : false;
  if (
    aggregate.id !== opts.task.id ||
    receipt.task_id !== opts.task.id ||
    event.task_id !== opts.task.id ||
    !planIsInTaskLineage ||
    sourcePlan.approval.state !== "approved" ||
    sourcePlan.approval.approved_digest !== sourcePlan.digest ||
    workItemSemanticDigest(sourceDefinition) !== workItemSemanticDigest(opts.item) ||
    receipt.aggregate_digest !== taskCentricDigest(aggregate) ||
    receipt.mutation_id !== event.mutation_id ||
    receipt.previous_revision + 1 !== receipt.next_revision ||
    receipt.previous_revision !== event.task_revision ||
    receipt.next_revision !== aggregate.revision ||
    event.entity !== "work_item" ||
    event.work_item_id !== opts.item.id ||
    event.plan_revision !== sourcePlan.revision ||
    event.plan_digest !== sourcePlan.digest ||
    event.to !== sourceRuntime.state ||
    !RECOVERABLE_WORK_ITEM_STATES.has(sourceRuntime.state) ||
    !terminalEvidenceComplete ||
    sourceRuntime.claim_id !== null
  ) {
    return null;
  }
  return sourceRuntime;
}

/** Preserve runtime only when the replacement plan keeps the semantic WorkItem contract. */
export function reconcileReplacementPlanWorkItems(opts: {
  task: TaskAggregate;
  proposal: TaskPlanProposal;
  recovery_evidence?: readonly ReplacementPlanWorkItemRecoveryEvidence[];
}): Readonly<Record<string, WorkItemRuntime>> {
  const previous = new Map(
    (opts.task.current_plan?.proposal.work_items.work_items ?? []).map((item) => [item.id, item]),
  );
  return Object.freeze(
    Object.fromEntries(
      opts.proposal.work_items.work_items.map((item) => {
        const priorDefinition = previous.get(item.id);
        const priorRuntime = opts.task.work_items[item.id];
        const sameDefinition =
          priorDefinition &&
          workItemSemanticDigest(priorDefinition) === workItemSemanticDigest(item);
        const recovered =
          (!priorRuntime || isFreshWorkItemRuntime(priorRuntime)) && opts.recovery_evidence?.length
            ? recoverWorkItemRuntime({
                task: opts.task,
                item,
                evidence: opts.recovery_evidence,
              })
            : null;
        return [
          item.id,
          recovered ?? (sameDefinition && priorRuntime ? priorRuntime : freshWorkItemRuntime(item)),
        ];
      }),
    ),
  );
}

export function approveTaskPlan(opts: {
  plan: TaskPlanRevision;
  expected_digest: Sha256Digest;
  actor: string;
  approved_at: string;
  policy_facts?: readonly string[];
}): TaskPlanRevision {
  if (opts.plan.digest !== opts.expected_digest) {
    throw new Error("Task plan approval is stale or bound to a different digest.");
  }
  if (opts.plan.approval.state === "approved") {
    if (opts.plan.approval.approved_digest !== opts.expected_digest) {
      throw new Error("Approved plan contains a conflicting approval digest.");
    }
    return opts.plan;
  }
  return Object.freeze({
    ...opts.plan,
    approval: Object.freeze({
      state: "approved" as const,
      approved_by: opts.actor,
      approved_at: opts.approved_at,
      approved_digest: opts.expected_digest,
      policy_facts: [...(opts.policy_facts ?? [])],
    }),
  });
}

export function materializeApprovedWorkItems(opts: {
  task: TaskAggregate;
  plan: TaskPlanRevision;
  now: string;
}): TaskAggregate {
  if (opts.plan.task_id !== opts.task.id) throw new Error("Plan belongs to another task.");
  if (
    opts.plan.approval.state !== "approved" ||
    opts.plan.approval.approved_digest !== opts.plan.digest
  ) {
    throw new Error("Work items require an approved current task plan revision.");
  }
  if (opts.task.current_plan && opts.task.current_plan.digest !== opts.plan.digest) {
    throw new Error("Cannot materialize a plan over a different current revision.");
  }
  const existingIds = Object.keys(opts.task.work_items);
  if (existingIds.length > 0) {
    const current = opts.task.current_plan;
    const planned = opts.plan.proposal.work_items.work_items;
    if (
      current?.revision !== opts.plan.revision ||
      (current.approval.state !== "approved" && opts.task.lifecycle !== "AWAITING_PLAN_APPROVAL") ||
      (current.approval.state === "approved" &&
        current.approval.approved_digest !== opts.plan.digest) ||
      planContentDigest(opts.plan) !== opts.plan.digest ||
      taskCentricDigest(current.proposal) !== taskCentricDigest(opts.plan.proposal) ||
      existingIds.length !== planned.length ||
      planned.some((item) => opts.task.work_items[item.id]?.id !== item.id)
    ) {
      throw new Error("Existing work item runtime does not match the approved current plan.");
    }
    // Reapproval is not a new execution. Preserve claims, outputs and validation atomically.
    if (
      current.approval.state === "approved" &&
      current.approval.approved_digest === opts.plan.digest &&
      opts.task.lifecycle === "ACTIVE"
    ) {
      return opts.task;
    }
    const outputs = availableOutputIds(opts.task.work_items);
    const workItems = Object.fromEntries(
      planned.map((item) => {
        const runtime = opts.task.work_items[item.id]!;
        if (runtime.state !== "PLANNED") return [item.id, runtime];
        const ready =
          item.depends_on.every(
            (dependency) => opts.task.work_items[dependency]?.state === "COMPLETED",
          ) && item.required_inputs.every((input) => outputs.has(input));
        return [item.id, ready ? Object.freeze({ ...runtime, state: "READY" as const }) : runtime];
      }),
    );
    return Object.freeze({
      ...opts.task,
      revision: opts.task.revision + 1,
      lifecycle: "ACTIVE",
      current_plan: opts.plan,
      work_items: Object.freeze(workItems),
      updated_at: opts.now,
    });
  }
  const workItems: Record<string, WorkItemRuntime> = {};
  for (const item of opts.plan.proposal.work_items.work_items) {
    workItems[item.id] = Object.freeze({
      ...freshWorkItemRuntime(item),
      state: item.depends_on.length === 0 ? "READY" : "PLANNED",
    });
  }
  return Object.freeze({
    ...opts.task,
    revision: opts.task.revision + 1,
    lifecycle: "ACTIVE",
    current_plan: opts.plan,
    work_items: Object.freeze(workItems),
    updated_at: opts.now,
  });
}

function availableOutputIds(runtime: Readonly<Record<string, WorkItemRuntime>>): Set<string> {
  return new Set(
    Object.values(runtime).flatMap((item) => item.output_manifests.map((output) => output.id)),
  );
}

export function computeReadyWorkItems(opts: {
  graph: WorkItemGraph;
  runtime: Readonly<Record<string, WorkItemRuntime>>;
  active_leases?: readonly ExecutionLease[];
}): readonly WorkItemReadiness[] {
  const outputs = availableOutputIds(opts.runtime);
  const leasedIds = new Set(
    (opts.active_leases ?? []).map((lease) => lease.authority.work_item_id).filter(Boolean),
  );
  return opts.graph.work_items.map((item) => {
    const current = opts.runtime[item.id];
    const reasons: string[] = [];
    if (!current) reasons.push("runtime_missing");
    else if (!(["PLANNED", "READY", "REWORK_READY"] as const).includes(current.state as never)) {
      reasons.push(`state_${current.state.toLowerCase()}`);
    }
    for (const dependency of item.depends_on) {
      if (opts.runtime[dependency]?.state !== "COMPLETED") {
        reasons.push(`dependency_incomplete:${dependency}`);
      }
    }
    for (const input of item.required_inputs) {
      if (!outputs.has(input)) reasons.push(`input_missing:${input}`);
    }
    if (leasedIds.has(item.id)) reasons.push("already_claimed");
    return Object.freeze({
      work_item_id: item.id,
      ready: reasons.length === 0,
      reason_codes: reasons,
    });
  });
}

function normalizedPath(resource: string): string {
  return resource.replaceAll("\\", "/").replace(/^\.\//u, "").replace(/\/$/u, "");
}

function pathOverlaps(left: string, right: string): boolean {
  const a = normalizedPath(left);
  const b = normalizedPath(right);
  return a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`);
}

export function resourceClaimsConflict(
  left: readonly ResourceClaimSpec[],
  right: readonly ResourceClaimSpec[],
): boolean {
  return left.some((a) =>
    right.some((b) => {
      if (a.kind !== b.kind) return false;
      const overlaps =
        a.kind === "path" ? pathOverlaps(a.resource, b.resource) : a.resource === b.resource;
      return overlaps && (a.mode !== "read" || b.mode !== "read");
    }),
  );
}

export class WorkItemScheduler {
  readonly concurrency: number;

  constructor(concurrency = 1) {
    if (!Number.isInteger(concurrency) || concurrency < 1) {
      throw new Error("Work item scheduler concurrency must be a positive integer.");
    }
    this.concurrency = concurrency;
  }

  select(opts: {
    graph: WorkItemGraph;
    runtime: Readonly<Record<string, WorkItemRuntime>>;
    active_leases: readonly ExecutionLease[];
  }): readonly WorkItem[] {
    const openSlots = Math.max(0, this.concurrency - opts.active_leases.length);
    if (openSlots === 0) return [];
    const readiness = new Map(
      computeReadyWorkItems(opts).map((item) => [item.work_item_id, item.ready]),
    );
    const selected: WorkItem[] = [];
    const activeClaims = opts.active_leases.flatMap((lease) => lease.resource_claims);
    const ordered = opts.graph.work_items.toSorted(
      (left, right) => right.priority - left.priority || left.id.localeCompare(right.id),
    );
    for (const item of ordered) {
      if (!readiness.get(item.id)) continue;
      if (resourceClaimsConflict(item.resource_claims, activeClaims)) continue;
      if (
        selected.some((other) =>
          resourceClaimsConflict(item.resource_claims, other.resource_claims),
        )
      ) {
        continue;
      }
      selected.push(item);
      if (selected.length === openSlots) break;
    }
    return selected;
  }
}

export function requiredOutputsSatisfied(
  item: WorkItem,
  manifests: readonly OutputManifest[],
  currentRepositoryDigest: Sha256Digest,
): boolean {
  const current = new Map(
    manifests
      .filter((manifest) => manifest.repository_snapshot_digest === currentRepositoryDigest)
      .map((manifest) => [manifest.id, manifest]),
  );
  return item.expected_outputs.every((output) => current.has(output));
}

export function requiredOutputManifestsPresent(
  item: WorkItem,
  manifests: readonly OutputManifest[],
): boolean {
  const produced = new Set(
    manifests
      .filter((manifest) => manifest.producer.work_item_id === item.id)
      .map((manifest) => manifest.id),
  );
  return item.expected_outputs.every((output) => produced.has(output));
}
