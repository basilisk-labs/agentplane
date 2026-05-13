import { z } from "zod";

import {
  DOC_VERSION_SCHEMA,
  TASK_COMMENT_SCHEMA,
  TASK_EVENT_SCHEMA,
  TASK_SECTIONS_SCHEMA,
} from "./task-artifact-schema.findings.js";
import { ISO_UTC_TIMESTAMP, NON_EMPTY_STRING, isRecord } from "./task-artifact-schema.shared.js";
import {
  TASK_PLAN_APPROVAL_SCHEMA,
  TASK_VERIFICATION_SCHEMA,
  normalizeApprovalRecord,
} from "./task-artifact-schema.verification.js";
import { TASK_STATUS_VALUES } from "./task-status.js";

const TASK_PRIORITY_VALUES = ["low", "normal", "med", "high"] as const;
const TASK_RISK_LEVEL_VALUES = ["low", "med", "high"] as const;
const TASK_KIND_VALUES = [
  "analysis",
  "content",
  "docs",
  "code",
  "release",
  "ops",
  "context",
] as const;
const TASK_MUTATION_SCOPE_VALUES = [
  "none",
  "docs",
  "code",
  "release",
  "ops",
  "context",
  "unknown",
] as const;
const TASK_RISK_FLAG_VALUES = [
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
] as const;
const TASK_BLUEPRINT_REQUEST_VALUES = [
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "performance.benchmark",
  "quality.regression",
  "context.assimilation",
  "runner.execution",
  "post_run.improvement_review",
  "release.strict",
  "ops.approval",
] as const;
const RUNNER_OUTCOME_STATUS_VALUES = [
  "prepared",
  "running",
  "success",
  "failed",
  "cancelled",
] as const;
const RUNNER_MODE_VALUES = ["execute", "dry_run"] as const;
const RUNNER_TARGET_KIND_VALUES = ["task", "recipe_scenario"] as const;

const TASK_STATUS_SCHEMA = z.enum(TASK_STATUS_VALUES);
const TASK_PRIORITY_SCHEMA = z.enum(TASK_PRIORITY_VALUES);
const TASK_RISK_LEVEL_SCHEMA = z.enum(TASK_RISK_LEVEL_VALUES);
const TASK_KIND_SCHEMA = z.enum(TASK_KIND_VALUES);
const TASK_MUTATION_SCOPE_SCHEMA = z.enum(TASK_MUTATION_SCOPE_VALUES);
const TASK_RISK_FLAGS_SCHEMA = z.array(z.enum(TASK_RISK_FLAG_VALUES));
const TASK_BLUEPRINT_REQUEST_SCHEMA = z.enum(TASK_BLUEPRINT_REQUEST_VALUES);

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

export const TASK_README_FRONTMATTER_ZOD_SCHEMA = z
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
    task_kind: TASK_KIND_SCHEMA.optional(),
    mutation_scope: TASK_MUTATION_SCOPE_SCHEMA.optional(),
    risk_flags: TASK_RISK_FLAGS_SCHEMA.optional(),
    blueprint_request: TASK_BLUEPRINT_REQUEST_SCHEMA.optional(),
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
    extensions: z.record(z.string(), z.unknown()).optional(),
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
    task_kind: TASK_KIND_SCHEMA.optional(),
    mutation_scope: TASK_MUTATION_SCOPE_SCHEMA.optional(),
    risk_flags: TASK_RISK_FLAGS_SCHEMA.optional(),
    blueprint_request: TASK_BLUEPRINT_REQUEST_SCHEMA.optional(),
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

export const TASKS_EXPORT_ZOD_SCHEMA = z
  .object({
    tasks: z.array(TASKS_EXPORT_TASK_SCHEMA),
    meta: TASKS_EXPORT_META_SCHEMA,
  })
  .strict();

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
  const verificationSource = isRecord(value.verification) ? value.verification : {};
  const verification = normalizeApprovalRecord(verificationSource, [
    "pending",
    "ok",
    "needs_rework",
    "blocked_external",
  ]);
  const verificationAttemptsSource = verificationSource.attempts;
  const verificationAttempts =
    typeof verificationAttemptsSource === "number" &&
    Number.isInteger(verificationAttemptsSource) &&
    verificationAttemptsSource >= 0
      ? verificationAttemptsSource
      : 0;
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
    verification: { ...verification, attempts: verificationAttempts },
  };
}
