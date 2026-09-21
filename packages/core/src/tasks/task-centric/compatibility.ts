import { isSha256Digest, taskCentricDigest } from "./digest.js";
import type {
  ExecutionLease,
  PendingEffect,
  RetryBudget,
  SemanticWorkKind,
  Sha256Digest,
  TaskAggregate,
  TaskCheckpoint,
  TaskLifecycleState,
  TransitionReceipt,
  WorkItemState,
  WorkItemRuntime,
} from "./model.js";

export const TASK_CENTRIC_EXTENSION_KEY = "agentplane.task_centric";
export const TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY = "agentplane.task_centric_replan_required";

const TASK_LIFECYCLE_STATES = new Set<TaskLifecycleState>([
  "CAPTURED",
  "PLANNING",
  "AWAITING_PLAN_APPROVAL",
  "ACTIVE",
  "FINAL_VALIDATION",
  "COMPLETED",
  "HUMAN_REQUIRED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
]);
const WORK_ITEM_STATES = new Set<WorkItemState>([
  "PLANNED",
  "READY",
  "CLAIMED",
  "EXECUTING",
  "RESULT_RECEIVED",
  "INSPECTING",
  "VALIDATING",
  "REWORK_READY",
  "COMPLETED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
]);

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function taskCentricAggregateFromExtensions(
  extensions: Readonly<Record<string, unknown>> | undefined,
): TaskAggregate | null {
  const raw = extensions?.[TASK_CENTRIC_EXTENSION_KEY];
  if (raw === undefined) return null;
  const value = record(raw);
  const intent = record(value?.intent);
  const workItems = record(value?.work_items);
  if (
    value?.schema_version !== 1 ||
    typeof value.id !== "string" ||
    !value.id.trim() ||
    !Number.isInteger(value.revision) ||
    (value.revision as number) < 1 ||
    typeof value.lifecycle !== "string" ||
    !TASK_LIFECYCLE_STATES.has(value.lifecycle as TaskLifecycleState) ||
    intent?.task_id !== value.id ||
    typeof intent.request !== "string" ||
    !Array.isArray(intent.constraints) ||
    !Array.isArray(intent.acceptance_criteria) ||
    !workItems ||
    !Number.isInteger(value.event_cursor) ||
    typeof value.updated_at !== "string"
  ) {
    throw new Error("Task-centric extension is malformed and cannot participate in scheduling.");
  }
  const currentPlan = value.current_plan;
  if (currentPlan !== null) {
    const plan = record(currentPlan);
    if (
      plan?.task_id !== value.id ||
      !Number.isInteger(plan.revision) ||
      !isSha256Digest(plan.digest) ||
      !record(plan.approval) ||
      !["pending", "approved", "rejected"].includes(String(record(plan.approval)?.state))
    ) {
      throw new Error("Task-centric plan projection is malformed.");
    }
  }
  if (value.plan_history !== undefined) {
    if (!Array.isArray(value.plan_history)) {
      throw new Error("Task-centric plan history is malformed.");
    }
    for (const archived of value.plan_history) {
      const plan = record(archived);
      if (
        plan?.task_id !== value.id ||
        !Number.isInteger(plan.revision) ||
        !isSha256Digest(plan.digest) ||
        !record(plan.approval)
      ) {
        throw new Error("Task-centric plan history is malformed.");
      }
    }
  }
  if (value.plan_amendments !== undefined) {
    if (!Array.isArray(value.plan_amendments)) {
      throw new Error("Task-centric plan amendments are malformed.");
    }
    for (const amendment of value.plan_amendments) {
      const entry = record(amendment);
      if (
        entry?.schema_version !== 1 ||
        typeof entry.id !== "string" ||
        !Number.isInteger(entry.plan_revision) ||
        !isSha256Digest(entry.plan_digest) ||
        !record(entry.refinement) ||
        typeof entry.actor_id !== "string" ||
        typeof entry.created_at !== "string" ||
        !isSha256Digest(entry.digest)
      ) {
        throw new Error("Task-centric plan amendments are malformed.");
      }
    }
  }
  for (const [id, runtime] of Object.entries(workItems)) {
    const item = record(runtime);
    if (
      item?.id !== id ||
      typeof item.state !== "string" ||
      !WORK_ITEM_STATES.has(item.state as WorkItemState) ||
      !Number.isInteger(item.revision) ||
      !Number.isInteger(item.attempt) ||
      !Array.isArray(item.output_manifests)
    ) {
      throw new Error(`Task-centric work item runtime ${id} is malformed.`);
    }
  }
  return value as unknown as TaskAggregate;
}

export function withTaskCentricAggregate(
  extensions: Readonly<Record<string, unknown>> | undefined,
  aggregate: TaskAggregate,
): Record<string, unknown> {
  const next: Record<string, unknown> = {
    ...(extensions ?? {}),
    [TASK_CENTRIC_EXTENSION_KEY]: aggregate,
  };
  delete next[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY];
  return next;
}

export function taskCentricReplanRequiredFromExtensions(
  extensions: Readonly<Record<string, unknown>> | undefined,
): boolean {
  const aggregate = taskCentricAggregateFromExtensions(extensions);
  if (aggregate?.current_plan && aggregate.lifecycle === "PLANNING") return true;
  const marker = record(extensions?.[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY]);
  return marker?.schema_version === 1 && typeof marker.reason_code === "string";
}

export function projectTaskLifecycleToLegacyStatus(
  lifecycle: TaskLifecycleState,
): "TODO" | "DOING" | "DONE" | "BLOCKED" {
  switch (lifecycle) {
    case "CAPTURED":
    case "PLANNING":
    case "AWAITING_PLAN_APPROVAL": {
      return "TODO";
    }
    case "ACTIVE":
    case "FINAL_VALIDATION": {
      return "DOING";
    }
    case "COMPLETED":
    case "CANCELLED": {
      return "DONE";
    }
    case "HUMAN_REQUIRED":
    case "BLOCKED":
    case "EFFECT_IN_DOUBT": {
      return "BLOCKED";
    }
  }
}

export function legacyStatusToTaskLifecycle(status: string): TaskLifecycleState {
  switch (status) {
    case "TODO": {
      return "CAPTURED";
    }
    case "DOING": {
      return "ACTIVE";
    }
    case "DONE": {
      return "COMPLETED";
    }
    case "BLOCKED": {
      return "BLOCKED";
    }
    default: {
      throw new Error(`Unknown legacy task status ${status}; explicit migration is required.`);
    }
  }
}

export function compatibilityRoleToSemanticWorkKind(
  role: "PLANNER" | "EXECUTOR" | "EVALUATOR" | "CURATOR",
  repair = false,
): SemanticWorkKind {
  switch (role) {
    case "PLANNER": {
      return "plan";
    }
    case "EXECUTOR": {
      return repair ? "repair" : "execute";
    }
    case "EVALUATOR": {
      return "review";
    }
    case "CURATOR": {
      return "clarify";
    }
  }
}

export function createLegacyTaskAggregate(opts: {
  id: string;
  revision: number;
  title: string;
  description: string;
  status: string;
  acceptance_criteria: readonly string[];
  captured_at: string;
  updated_at: string;
}): TaskAggregate {
  const criteria = opts.acceptance_criteria.map((description, index) => ({
    id: `legacy-${index + 1}`,
    description,
    required: true,
    check_ids: [],
  }));
  return Object.freeze({
    schema_version: 1,
    id: opts.id,
    revision: opts.revision,
    intent: Object.freeze({
      task_id: opts.id,
      request: [opts.title, opts.description].filter(Boolean).join("\n\n"),
      constraints: [],
      acceptance_criteria: criteria,
      captured_at: opts.captured_at,
    }),
    lifecycle: legacyStatusToTaskLifecycle(opts.status),
    current_plan: null,
    plan_history: [],
    plan_amendments: [],
    work_items: Object.freeze({} as Record<string, WorkItemRuntime>),
    final_validation: null,
    event_cursor: 0,
    updated_at: opts.updated_at,
  });
}

export const TASK_KERNEL_LIFECYCLE_MIGRATION_VERSION = "task-kernel-lifecycle-owner-v1";

export type TaskCentricMigrationRuntime = Readonly<{
  events: readonly unknown[];
  leases: readonly ExecutionLease[];
  pending_effects: readonly PendingEffect[];
  checkpoints: readonly TaskCheckpoint[];
  retry_budgets: readonly RetryBudget[];
  mutation_receipts: Readonly<Record<string, TransitionReceipt>>;
}>;

export type TaskCentricMigrationFieldMapping = Readonly<{
  source_path: string;
  disposition: "kernel_owner" | "retained_evidence" | "formal_blocker" | "semantic_assessment";
  target: string;
  reason_code: string | null;
}>;

export type TaskCentricKernelMigrationMapping = Readonly<{
  mapping_version: typeof TASK_KERNEL_LIFECYCLE_MIGRATION_VERSION;
  source_task_digest: Sha256Digest;
  source_runtime_digest: Sha256Digest;
  field_mappings: readonly TaskCentricMigrationFieldMapping[];
  blockers: readonly Readonly<{ source_path: string; reason_code: string }>[];
  semantic_assessment_fields: readonly Readonly<{
    source_path: string;
    target: string;
    reason_code: string;
  }>[];
  pending: Readonly<{
    work_item_ids: readonly string[];
    lease_ids: readonly string[];
    effect_operation_ids: readonly string[];
    checkpoint_revisions: readonly number[];
  }>;
  retained: Readonly<{
    plan_digest: Sha256Digest | null;
    output_manifest_digests: readonly Sha256Digest[];
    validation_digests: readonly Sha256Digest[];
    mutation_receipt_digests: readonly Sha256Digest[];
    authority_lease_digests: readonly Sha256Digest[];
  }>;
}>;

function leafPaths(value: unknown, prefix: string): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  const entries = Array.isArray(value)
    ? value.map((entry, index) => [String(index), entry] as const)
    : Object.entries(value);
  if (entries.length === 0) return [prefix];
  return entries.flatMap(([key, entry]) => leafPaths(entry, `${prefix}.${key}`));
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function fieldMapping(path: string): TaskCentricMigrationFieldMapping {
  const relative = path.replace(/^task\./u, "").replace(/^runtime\./u, "");
  const root = relative.split(".")[0] ?? relative;
  if (path.startsWith("runtime.leases.")) {
    return {
      source_path: path,
      disposition: "formal_blocker",
      target: "task.authority_lineage",
      reason_code: "active_legacy_execution_lease",
    };
  }
  if (path.startsWith("runtime.pending_effects.")) {
    return {
      source_path: path,
      disposition: "kernel_owner",
      target: "task.effects",
      reason_code: null,
    };
  }
  if (path.startsWith("task.current_plan.") || path.startsWith("task.plan_history.")) {
    const semantic =
      path.includes(".work_items.") &&
      ["objective", "scope_roots", "capabilities", "resource_claims", "risk", "validation"].some(
        (name) => path.includes(`.${name}`),
      );
    return semantic
      ? {
          source_path: path,
          disposition: "semantic_assessment",
          target: "task.current_plan.work_items + documents.contracts + authority",
          reason_code: "legacy_plan_semantics_require_explicit_kernel_contract",
        }
      : {
          source_path: path,
          disposition: "kernel_owner",
          target: path.replace(/^task\./u, "task."),
          reason_code: null,
        };
  }
  if (path.startsWith("task.work_items.")) {
    const semantic = path.endsWith(".validation_result") || path.includes(".validation_result.");
    return semantic
      ? {
          source_path: path,
          disposition: "semantic_assessment",
          target: "task.work_items[].validation",
          reason_code: "legacy_validation_identity_requires_explicit_binding",
        }
      : {
          source_path: path,
          disposition: "kernel_owner",
          target: path
            .replace(/^task\.work_items\./u, "task.work_items.")
            .replace(/\.output_manifests\./u, ".output_manifests."),
          reason_code: null,
        };
  }
  const retainedRoots = new Set([
    "event_cursor",
    "updated_at",
    "plan_amendments",
    "events",
    "checkpoints",
    "retry_budgets",
  ]);
  if (retainedRoots.has(root) || path.startsWith("runtime.mutation_receipts.")) {
    return {
      source_path: path,
      disposition: "retained_evidence",
      target: "migration.source_evidence",
      reason_code: null,
    };
  }
  const targets: Readonly<Record<string, string>> = {
    schema_version: "task.schema_version",
    id: "task.id",
    revision: "task.revision",
    intent: "documents.intent + task.intent_digest",
    lifecycle: "task.state",
    current_plan: "task.current_plan",
    plan_history: "task.plan_history",
    work_items: "task.work_items",
    final_validation: "task.final_validation",
    mutation_receipts: "task.mutation_receipts",
  };
  return {
    source_path: path,
    disposition: "kernel_owner",
    target: targets[root] ?? "migration.source_evidence",
    reason_code: null,
  };
}

/**
 * Pure mapping ledger for the one-way lifecycle-owner migration. It never dispatches semantic
 * work: genuine meaning gaps are returned as one bounded assessment input for the caller.
 */
export function mapTaskCentricKernelMigration(opts: {
  task: TaskAggregate;
  runtime: TaskCentricMigrationRuntime;
  source_task_id: string;
  source_revision: number;
}): TaskCentricKernelMigrationMapping {
  const blockers: { source_path: string; reason_code: string }[] = [];
  if (opts.task.id !== opts.source_task_id)
    blockers.push({ source_path: "task.id", reason_code: "source_identity_mismatch" });
  if (opts.task.revision !== opts.source_revision)
    blockers.push({ source_path: "task.revision", reason_code: "source_revision_mismatch" });
  for (const lease of opts.runtime.leases)
    blockers.push({
      source_path: `runtime.leases.${lease.id}`,
      reason_code: "active_legacy_execution_lease",
    });
  for (const effect of opts.runtime.pending_effects) {
    if (effect.state === "intent" || effect.state === "effect_in_doubt")
      blockers.push({
        source_path: `runtime.pending_effects.${effect.operation_id}`,
        reason_code:
          effect.state === "effect_in_doubt"
            ? "unresolved_legacy_effect"
            : "legacy_effect_intent_pending",
      });
  }
  const fieldMappings = [...leafPaths(opts.task, "task"), ...leafPaths(opts.runtime, "runtime")]
    .map((sourcePath) => fieldMapping(sourcePath))
    .toSorted((left, right) => compareText(left.source_path, right.source_path));
  const semantic = fieldMappings
    .filter((entry) => entry.disposition === "semantic_assessment")
    .map((entry) => ({
      source_path: entry.source_path,
      target: entry.target,
      reason_code: entry.reason_code!,
    }));
  const outputDigests = Object.values(opts.task.work_items)
    .flatMap((item) => item.output_manifests.map((manifest) => manifest.digest))
    .toSorted();
  const validationDigests = [
    ...Object.values(opts.task.work_items)
      .map((item) => item.validation_result)
      .filter((value) => value !== null)
      .map((value) => taskCentricDigest(value)),
    ...(opts.task.final_validation ? [taskCentricDigest(opts.task.final_validation)] : []),
  ].toSorted();
  return Object.freeze({
    mapping_version: TASK_KERNEL_LIFECYCLE_MIGRATION_VERSION,
    source_task_digest: taskCentricDigest(opts.task),
    source_runtime_digest: taskCentricDigest(opts.runtime),
    field_mappings: fieldMappings,
    blockers: blockers.toSorted((left, right) => compareText(left.source_path, right.source_path)),
    semantic_assessment_fields: semantic,
    pending: {
      work_item_ids: Object.values(opts.task.work_items)
        .filter((item) => !["COMPLETED", "CANCELLED"].includes(item.state))
        .map((item) => item.id)
        .toSorted(),
      lease_ids: opts.runtime.leases.map((lease) => lease.id).toSorted(),
      effect_operation_ids: opts.runtime.pending_effects
        .filter((effect) => effect.state !== "applied" && effect.state !== "reconciled")
        .map((effect) => effect.operation_id)
        .toSorted(),
      checkpoint_revisions: opts.runtime.checkpoints
        .map((checkpoint) => checkpoint.task_revision)
        .toSorted((left, right) => left - right),
    },
    retained: {
      plan_digest: opts.task.current_plan?.digest ?? null,
      output_manifest_digests: outputDigests,
      validation_digests: validationDigests,
      mutation_receipt_digests: Object.values(opts.runtime.mutation_receipts)
        .map((receipt) => taskCentricDigest(receipt))
        .toSorted(),
      authority_lease_digests: opts.runtime.leases
        .map((lease) => taskCentricDigest(lease))
        .toSorted(),
    },
  });
}

export type LiveTaskIndexEntry = Readonly<{
  task_id: string;
  revision: number;
  lifecycle: TaskLifecycleState;
  updated_at: string;
}>;

export type ArchivedTaskManifest = Readonly<{
  task_id: string;
  final_revision: number;
  lifecycle: "COMPLETED" | "CANCELLED";
  aggregate_digest: string;
  artifact_refs: readonly string[];
  archived_at: string;
}>;

export function belongsInLiveTaskIndex(task: TaskAggregate, recentCutoff: string): boolean {
  if (task.lifecycle !== "COMPLETED" && task.lifecycle !== "CANCELLED") return true;
  return Date.parse(task.updated_at) >= Date.parse(recentCutoff);
}
