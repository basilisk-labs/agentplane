import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import type { TaskFrontmatter } from "./task-store.js";
import type { TasksExportSnapshot } from "./tasks-export.js";

export type TaskHandoffRunnerNextAction =
  | "run"
  | "resume"
  | "retry"
  | "wait"
  | "cancel_then_resume"
  | "none";

type JsonSchemaDocument = Record<string, unknown>;

const NON_EMPTY_STRING = z.string().min(1);
const ISO_UTC_TIMESTAMP = z.string().datetime({ offset: true });
const NULLABLE_NON_EMPTY_STRING = NON_EMPTY_STRING.nullable();
const NULLABLE_ISO_UTC_TIMESTAMP = ISO_UTC_TIMESTAMP.nullable();
const TASK_STATUS_VALUES = ["TODO", "DOING", "DONE", "BLOCKED"] as const;
const TASK_PRIORITY_VALUES = ["low", "normal", "med", "high"] as const;
const TASK_RISK_LEVEL_VALUES = ["low", "med", "high"] as const;
const PLAN_APPROVAL_STATE_VALUES = ["pending", "approved", "rejected"] as const;
const VERIFICATION_STATE_VALUES = ["pending", "ok", "needs_rework"] as const;
const TASK_EVENT_TYPE_VALUES = ["status", "comment", "verify"] as const;
const RUNNER_OUTCOME_STATUS_VALUES = [
  "prepared",
  "running",
  "success",
  "failed",
  "cancelled",
] as const;
const RUNNER_MODE_VALUES = ["execute", "dry_run"] as const;
const RUNNER_TARGET_KIND_VALUES = ["task", "recipe_scenario"] as const;
const DOC_VERSION_SCHEMA = z.literal(3);
const PR_STATUS_VALUES = ["OPEN", "CLOSED", "MERGED"] as const;
const MERGE_STRATEGY_VALUES = ["squash", "merge", "rebase"] as const;
const PR_VERIFY_STATUS_VALUES = ["pass", "fail", "skipped"] as const;
const HANDOFF_ROUTE_KIND_VALUES = ["protected_base_integrate"] as const;
const HANDOFF_ROUTE_STATUS_VALUES = ["awaiting_github_merge"] as const;
const HANDOFF_LOCAL_MUTATION_VALUES = ["not_performed"] as const;
const HANDOFF_FINALIZE_VIA_VALUES = ["github_pr_merge_then_hosted_close"] as const;
const RUNNER_NEXT_ACTION_VALUES = [
  "run",
  "resume",
  "retry",
  "wait",
  "cancel_then_resume",
  "none",
] as const;

const TASK_STATUS_SCHEMA = z.enum(TASK_STATUS_VALUES);
const TASK_PRIORITY_SCHEMA = z.enum(TASK_PRIORITY_VALUES);
const TASK_RISK_LEVEL_SCHEMA = z.enum(TASK_RISK_LEVEL_VALUES);
const TASK_PLAN_APPROVAL_SCHEMA = z
  .object({
    state: z.enum(PLAN_APPROVAL_STATE_VALUES),
    updated_at: NULLABLE_ISO_UTC_TIMESTAMP,
    updated_by: z.string().nullable(),
    note: z.string().nullable(),
  })
  .passthrough();
const TASK_VERIFICATION_SCHEMA = z
  .object({
    state: z.enum(VERIFICATION_STATE_VALUES),
    updated_at: NULLABLE_ISO_UTC_TIMESTAMP,
    updated_by: z.string().nullable(),
    note: z.string().nullable(),
  })
  .passthrough();
const TASK_COMMENT_SCHEMA = z
  .object({
    author: NON_EMPTY_STRING,
    body: NON_EMPTY_STRING,
  })
  .strict();
const TASK_EVENT_SCHEMA = z
  .object({
    type: z.enum(TASK_EVENT_TYPE_VALUES),
    at: ISO_UTC_TIMESTAMP,
    author: NON_EMPTY_STRING,
    from: z.string().optional(),
    to: z.string().optional(),
    state: z.string().optional(),
    note: z.string().optional(),
    body: z.string().optional(),
  })
  .passthrough();
const TASK_ORIGIN_SCHEMA = z
  .object({
    system: NON_EMPTY_STRING,
    issue_id: NON_EMPTY_STRING.optional(),
    url: NON_EMPTY_STRING.optional(),
    recipe_id: NON_EMPTY_STRING.optional(),
    scenario_id: NON_EMPTY_STRING.optional(),
    recipe_version: NON_EMPTY_STRING.optional(),
    run_id: NON_EMPTY_STRING.optional(),
  })
  .catchall(z.string());
const TASK_COMMIT_SCHEMA = z
  .object({
    hash: NON_EMPTY_STRING,
    message: NON_EMPTY_STRING,
  })
  .strict()
  .nullable();
const TASK_SECTIONS_SCHEMA = z.record(z.string());
const RUNNER_TARGET_SCHEMA = z
  .object({
    kind: z.enum(RUNNER_TARGET_KIND_VALUES),
    task_id: NON_EMPTY_STRING.optional(),
    recipe_id: NON_EMPTY_STRING.optional(),
    scenario_id: NON_EMPTY_STRING.optional(),
  })
  .passthrough();
const RUNNER_METRICS_SCHEMA = z
  .object({
    duration_ms: z.number().optional(),
    stdout_bytes: z.number().optional(),
    stderr_bytes: z.number().optional(),
    output_last_message_bytes: z.number().nullable().optional(),
  })
  .passthrough();
const RUNNER_EVIDENCE_SCHEMA = z
  .object({
    evidence_paths: z.array(NON_EMPTY_STRING).optional(),
    changed_paths: z.array(NON_EMPTY_STRING).optional(),
    files_changed_count: z.number().int().min(0).optional(),
    tests_run: z.array(NON_EMPTY_STRING).optional(),
    verification_candidates: z.array(NON_EMPTY_STRING).optional(),
  })
  .passthrough();

const RUNNER_HISTORY_ENTRY_SCHEMA = z
  .object({
    run_id: NON_EMPTY_STRING,
    status: z.enum(RUNNER_OUTCOME_STATUS_VALUES),
    adapter_id: NON_EMPTY_STRING,
    mode: z.enum(RUNNER_MODE_VALUES),
    updated_at: ISO_UTC_TIMESTAMP,
    started_at: ISO_UTC_TIMESTAMP.optional(),
    ended_at: ISO_UTC_TIMESTAMP.optional(),
    exit_code: z.number().int().nullable(),
    target: RUNNER_TARGET_SCHEMA,
    summary: z.string().optional(),
    output_paths: z.array(NON_EMPTY_STRING).optional(),
    stdout_summary: z.string().optional(),
    stderr_summary: z.string().optional(),
    metrics: RUNNER_METRICS_SCHEMA.optional(),
    evidence: RUNNER_EVIDENCE_SCHEMA.optional(),
  })
  .passthrough();

const RUNNER_OUTCOME_SCHEMA = RUNNER_HISTORY_ENTRY_SCHEMA.extend({
  history: z.array(RUNNER_HISTORY_ENTRY_SCHEMA).optional(),
});

const TASK_README_FRONTMATTER_ZOD_SCHEMA = z
  .object({
    id: NON_EMPTY_STRING,
    title: NON_EMPTY_STRING,
    result_summary: z.string().optional(),
    risk_level: TASK_RISK_LEVEL_SCHEMA.optional(),
    breaking: z.boolean().optional(),
    status: TASK_STATUS_SCHEMA,
    priority: TASK_PRIORITY_SCHEMA,
    owner: NON_EMPTY_STRING,
    revision: z.number().int().min(1).optional(),
    origin: TASK_ORIGIN_SCHEMA.optional(),
    depends_on: z.array(NON_EMPTY_STRING),
    tags: z.array(NON_EMPTY_STRING),
    verify: z.array(NON_EMPTY_STRING),
    plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
    verification: TASK_VERIFICATION_SCHEMA,
    runner: RUNNER_OUTCOME_SCHEMA.optional(),
    commit: TASK_COMMIT_SCHEMA.optional(),
    comments: z.array(TASK_COMMENT_SCHEMA),
    events: z.array(TASK_EVENT_SCHEMA).optional(),
    doc_version: DOC_VERSION_SCHEMA,
    doc_updated_at: ISO_UTC_TIMESTAMP,
    doc_updated_by: NON_EMPTY_STRING,
    description: z.string(),
    sections: TASK_SECTIONS_SCHEMA.optional(),
    dirty: z.boolean().optional(),
    id_source: NON_EMPTY_STRING.optional(),
  })
  .passthrough();

const TASKS_EXPORT_TASK_SCHEMA = z
  .object({
    id: NON_EMPTY_STRING,
    title: NON_EMPTY_STRING,
    result_summary: z.string().optional(),
    risk_level: TASK_RISK_LEVEL_SCHEMA.optional(),
    breaking: z.boolean().optional(),
    status: TASK_STATUS_SCHEMA,
    priority: TASK_PRIORITY_SCHEMA,
    owner: NON_EMPTY_STRING,
    revision: z.number().int().min(1).optional(),
    origin: TASK_ORIGIN_SCHEMA.optional(),
    runner: RUNNER_OUTCOME_SCHEMA.optional(),
    depends_on: z.array(NON_EMPTY_STRING),
    tags: z.array(NON_EMPTY_STRING),
    verify: z.array(NON_EMPTY_STRING),
    plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
    verification: TASK_VERIFICATION_SCHEMA,
    commit: TASK_COMMIT_SCHEMA,
    comments: z.array(TASK_COMMENT_SCHEMA),
    events: z.array(TASK_EVENT_SCHEMA).optional(),
    doc_version: DOC_VERSION_SCHEMA,
    doc_updated_at: ISO_UTC_TIMESTAMP,
    doc_updated_by: NON_EMPTY_STRING,
    description: z.string(),
    dirty: z.boolean(),
    id_source: NON_EMPTY_STRING,
  })
  .passthrough();

const TASKS_EXPORT_META_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    managed_by: NON_EMPTY_STRING,
    checksum_algo: z.literal("sha256"),
    checksum: NON_EMPTY_STRING,
  })
  .strict();

const TASKS_EXPORT_ZOD_SCHEMA = z
  .object({
    tasks: z.array(TASKS_EXPORT_TASK_SCHEMA),
    meta: TASKS_EXPORT_META_SCHEMA,
  })
  .strict();

const TASK_PR_META_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    task_id: NON_EMPTY_STRING,
    branch: NON_EMPTY_STRING.optional(),
    base: NON_EMPTY_STRING.optional(),
    pr_number: z.number().int().min(1).optional(),
    pr_url: NON_EMPTY_STRING.optional(),
    created_at: ISO_UTC_TIMESTAMP,
    updated_at: ISO_UTC_TIMESTAMP,
    status: z.enum(PR_STATUS_VALUES).optional(),
    merge_strategy: z.enum(MERGE_STRATEGY_VALUES).optional(),
    merged_at: ISO_UTC_TIMESTAMP.optional(),
    merge_commit: NON_EMPTY_STRING.optional(),
    head_sha: NON_EMPTY_STRING.optional(),
    last_verified_sha: z.string().min(7).nullable().optional(),
    last_verified_at: NULLABLE_ISO_UTC_TIMESTAMP.optional(),
    verify: z
      .object({
        status: z.enum(PR_VERIFY_STATUS_VALUES).optional(),
        command: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

const TASK_HANDOFF_ROUTE_ZOD_SCHEMA = z
  .object({
    kind: z.enum(HANDOFF_ROUTE_KIND_VALUES),
    status: z.enum(HANDOFF_ROUTE_STATUS_VALUES).nullable().optional(),
    local_mutation: z.enum(HANDOFF_LOCAL_MUTATION_VALUES).nullable().optional(),
    finalize_via: z.enum(HANDOFF_FINALIZE_VIA_VALUES).nullable().optional(),
    pr_number: z.number().int().min(1).nullable().optional(),
    pr_url: NULLABLE_NON_EMPTY_STRING.optional(),
    handoff_show_command: z.string().nullable().optional(),
    base_pull_command: z.string().nullable().optional(),
  })
  .passthrough();

const TASK_HANDOFF_RUNNER_STATE_ZOD_SCHEMA = z
  .object({
    run_id: NULLABLE_NON_EMPTY_STRING.optional(),
    status: z.enum(RUNNER_OUTCOME_STATUS_VALUES).nullable().optional(),
    heartbeat_at: NULLABLE_ISO_UTC_TIMESTAMP.optional(),
    next_action: z.enum(RUNNER_NEXT_ACTION_VALUES).nullable().optional(),
    next_command: z.string().nullable().optional(),
    resume_command: z.string().nullable().optional(),
    retry_command: z.string().nullable().optional(),
    state_path: z.string().nullable().optional(),
    trace_path: z.string().nullable().optional(),
  })
  .passthrough();

const TASK_HANDOFF_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    task_id: NON_EMPTY_STRING,
    created_at: ISO_UTC_TIMESTAMP,
    from_role: NON_EMPTY_STRING,
    to_role: NULLABLE_NON_EMPTY_STRING.optional(),
    reason: NON_EMPTY_STRING,
    note: z.string().optional(),
    branch: NULLABLE_NON_EMPTY_STRING.optional(),
    base_branch: NULLABLE_NON_EMPTY_STRING.optional(),
    head_sha: z.string().min(7).nullable().optional(),
    workspace_root: NULLABLE_NON_EMPTY_STRING.optional(),
    pr_branch: NULLABLE_NON_EMPTY_STRING.optional(),
    runner: TASK_HANDOFF_RUNNER_STATE_ZOD_SCHEMA.optional(),
    route: TASK_HANDOFF_ROUTE_ZOD_SCHEMA.optional(),
    next_actions: z.array(NON_EMPTY_STRING).optional(),
    risks: z.array(NON_EMPTY_STRING).optional(),
    open_questions: z.array(NON_EMPTY_STRING).optional(),
    evidence_paths: z.array(NON_EMPTY_STRING).optional(),
  })
  .passthrough();

export type TaskPrMeta = z.infer<typeof TASK_PR_META_ZOD_SCHEMA>;
export type TaskHandoffRoute = z.infer<typeof TASK_HANDOFF_ROUTE_ZOD_SCHEMA>;
export type TaskHandoffRunnerState = z.infer<typeof TASK_HANDOFF_RUNNER_STATE_ZOD_SCHEMA>;
export type TaskHandoff = z.infer<typeof TASK_HANDOFF_ZOD_SCHEMA>;

const zodToJsonSchemaSafe = zodToJsonSchema as (
  schema: z.ZodTypeAny,
  options: {
    target: "jsonSchema7";
    $refStrategy: "none";
  },
) => JsonSchemaDocument;

function buildJsonSchemaDocument(
  schema: z.ZodTypeAny,
  meta: {
    $id: string;
    title: string;
    description?: string;
  },
): JsonSchemaDocument {
  const generated = zodToJsonSchemaSafe(schema, {
    target: "jsonSchema7",
    $refStrategy: "none",
  });
  const { $schema: _schema, definitions: _definitions, ...rest } = generated;
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: meta.$id,
    title: meta.title,
    ...(meta.description ? { description: meta.description } : {}),
    ...rest,
  };
}

export const TASK_README_FRONTMATTER_SCHEMA = buildJsonSchemaDocument(
  TASK_README_FRONTMATTER_ZOD_SCHEMA,
  {
    $id: "https://agentplane.dev/schemas/task-readme-frontmatter.schema.json",
    title: "Task README frontmatter (v1)",
    description:
      "Task READMEs are Markdown with YAML frontmatter. This schema describes the frontmatter keys.",
  },
);

export const TASKS_EXPORT_SCHEMA = buildJsonSchemaDocument(TASKS_EXPORT_ZOD_SCHEMA, {
  $id: "https://agentplane.dev/schemas/tasks-export.schema.json",
  title: "tasks.json export snapshot (v1)",
});

export const TASK_PR_META_SCHEMA = buildJsonSchemaDocument(TASK_PR_META_ZOD_SCHEMA, {
  $id: "https://agentplane.dev/schemas/pr-meta.schema.json",
  title: "PR artifact meta.json (v1)",
});

export const TASK_HANDOFF_SCHEMA = buildJsonSchemaDocument(TASK_HANDOFF_ZOD_SCHEMA, {
  $id: "https://agentplane.dev/schemas/task-handoff.schema.json",
  title: "Task handoff artifact (v1)",
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeApprovalRecord(
  value: unknown,
  allowedStates: readonly string[],
): { state: string; updated_at: string | null; updated_by: string | null; note: string | null } {
  const source = isRecord(value) ? value : {};
  const state =
    typeof source.state === "string" && allowedStates.includes(source.state)
      ? source.state
      : (allowedStates[0] ?? "pending");
  return {
    state,
    updated_at:
      typeof source.updated_at === "string" || source.updated_at === null
        ? source.updated_at
        : null,
    updated_by:
      typeof source.updated_by === "string" || source.updated_by === null
        ? source.updated_by
        : null,
    note: typeof source.note === "string" || source.note === null ? source.note : null,
  };
}

function formatSchemaErrors(label: string, issues: z.ZodIssue[] | undefined): string {
  if (!issues || issues.length === 0) return `${label} schema validation failed`;
  const rendered = issues.map((issue) => {
    const path = issue.path.length > 0 ? `${label}/${issue.path.join("/")}` : label;
    return `${path}: ${issue.message}`;
  });
  return `${label} schema validation failed: ${rendered.join("; ")}`;
}

function schemaErrors<T>(label: string, schema: z.ZodType<T>, value: unknown): string[] {
  const parsed = schema.safeParse(value);
  return parsed.success ? [] : [formatSchemaErrors(label, parsed.error.issues)];
}

function assertValid<T>(label: string, schema: z.ZodType<T>, value: unknown): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new Error(formatSchemaErrors(label, parsed.error.issues));
  return parsed.data;
}

export function listTaskReadmeFrontmatterSchemaErrors(value: unknown): string[] {
  return schemaErrors("task README frontmatter", TASK_README_FRONTMATTER_ZOD_SCHEMA, value);
}

export function validateTaskReadmeFrontmatter(value: unknown): TaskFrontmatter {
  return assertValid("task README frontmatter", TASK_README_FRONTMATTER_ZOD_SCHEMA, value);
}

function normalizeLegacyTaskPriority(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const normalized = value.trim().toLowerCase();
  if (normalized === "medium") return "med";
  if (
    normalized === "low" ||
    normalized === "normal" ||
    normalized === "med" ||
    normalized === "high"
  ) {
    return normalized;
  }
  return value;
}

export function withTaskReadmeFrontmatterDefaults(
  value: Record<string, unknown>,
): Record<string, unknown> {
  return {
    ...value,
    priority: normalizeLegacyTaskPriority(value.priority),
    depends_on: Array.isArray(value.depends_on) ? value.depends_on : [],
    tags: Array.isArray(value.tags) ? value.tags : [],
    verify: Array.isArray(value.verify) ? value.verify : [],
    comments: Array.isArray(value.comments) ? value.comments : [],
    plan_approval: normalizeApprovalRecord(value.plan_approval, [
      "pending",
      "approved",
      "rejected",
    ]),
    verification: normalizeApprovalRecord(value.verification, ["pending", "ok", "needs_rework"]),
  };
}

export function listTasksExportSnapshotSchemaErrors(value: unknown): string[] {
  return schemaErrors("tasks.json", TASKS_EXPORT_ZOD_SCHEMA, value);
}

export function validateTasksExportSnapshot(value: unknown): TasksExportSnapshot {
  return assertValid("tasks.json", TASKS_EXPORT_ZOD_SCHEMA, value);
}

export function listTaskPrMetaSchemaErrors(value: unknown): string[] {
  return schemaErrors("pr/meta.json", TASK_PR_META_ZOD_SCHEMA, value);
}

export function validateTaskPrMeta(value: unknown): TaskPrMeta {
  return assertValid("pr/meta.json", TASK_PR_META_ZOD_SCHEMA, value);
}

export function listTaskHandoffSchemaErrors(value: unknown): string[] {
  return schemaErrors("handoff/latest.json", TASK_HANDOFF_ZOD_SCHEMA, value);
}

export function validateTaskHandoff(value: unknown): TaskHandoff {
  return assertValid("handoff/latest.json", TASK_HANDOFF_ZOD_SCHEMA, value);
}

export function renderTaskReadmeFrontmatterSchemaJson(): string {
  return `${JSON.stringify(TASK_README_FRONTMATTER_SCHEMA, null, 2)}\n`;
}

export function renderTasksExportSchemaJson(): string {
  return `${JSON.stringify(TASKS_EXPORT_SCHEMA, null, 2)}\n`;
}

export function renderTaskPrMetaSchemaJson(): string {
  return `${JSON.stringify(TASK_PR_META_SCHEMA, null, 2)}\n`;
}

export function renderTaskHandoffSchemaJson(): string {
  return `${JSON.stringify(TASK_HANDOFF_SCHEMA, null, 2)}\n`;
}
