import { isSha256Digest } from "./digest.js";
import type {
  SemanticWorkKind,
  TaskAggregate,
  TaskLifecycleState,
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
