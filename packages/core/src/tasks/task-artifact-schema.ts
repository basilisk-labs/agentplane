import type { ErrorObject, Options, ValidateFunction } from "ajv";
import AjvModule from "ajv";
import AjvFormatsModule from "ajv-formats";

import type { TaskFrontmatter } from "./task-store.js";
import type { TasksExportSnapshot } from "./tasks-export.js";

export type TaskPrMeta = {
  schema_version: 1;
  task_id: string;
  branch?: string;
  base?: string;
  created_at: string;
  updated_at: string;
  status?: "MERGED";
  merge_strategy?: "squash" | "merge" | "rebase";
  merged_at?: string;
  merge_commit?: string;
  head_sha?: string;
  last_verified_sha?: string | null;
  last_verified_at?: string | null;
  verify?: {
    status?: "pass" | "fail" | "skipped";
    command?: string;
  };
};

type AjvInstance = {
  compile: <T>(schema: unknown) => ValidateFunction<T>;
  errorsText: (errors?: ErrorObject[] | null, opts?: { dataVar?: string }) => string;
};

type AjvConstructor = new (opts?: Options) => AjvInstance;
type AjvFormats = (ajv: AjvInstance) => void;

const Ajv =
  (AjvModule as unknown as { default?: AjvConstructor }).default ??
  (AjvModule as unknown as AjvConstructor);

const addFormats =
  (AjvFormatsModule as unknown as { default?: AjvFormats }).default ??
  (AjvFormatsModule as unknown as AjvFormats);

const AJV = new Ajv({
  allErrors: true,
  allowUnionTypes: true,
  strict: false,
});
addFormats(AJV);

const TASK_STATUS_SCHEMA = {
  type: "string",
  enum: ["TODO", "DOING", "DONE", "BLOCKED"],
} as const;

const TASK_PRIORITY_SCHEMA = {
  type: "string",
  enum: ["low", "normal", "med", "high"],
} as const;

const TASK_RISK_LEVEL_SCHEMA = {
  type: "string",
  enum: ["low", "med", "high"],
} as const;

const TASK_PLAN_APPROVAL_SCHEMA = {
  type: "object",
  additionalProperties: true,
  required: ["state", "updated_at", "updated_by", "note"],
  properties: {
    state: { type: "string", enum: ["pending", "approved", "rejected"] },
    updated_at: { type: ["string", "null"], format: "date-time" },
    updated_by: { type: ["string", "null"] },
    note: { type: ["string", "null"] },
  },
} as const;

const TASK_VERIFICATION_SCHEMA = {
  type: "object",
  additionalProperties: true,
  required: ["state", "updated_at", "updated_by", "note"],
  properties: {
    state: { type: "string", enum: ["pending", "ok", "needs_rework"] },
    updated_at: { type: ["string", "null"], format: "date-time" },
    updated_by: { type: ["string", "null"] },
    note: { type: ["string", "null"] },
  },
} as const;

const TASK_COMMENT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["author", "body"],
  properties: {
    author: { type: "string", minLength: 1 },
    body: { type: "string", minLength: 1 },
  },
} as const;

const TASK_EVENT_SCHEMA = {
  type: "object",
  additionalProperties: true,
  required: ["type", "at", "author"],
  properties: {
    type: { type: "string", enum: ["status", "comment", "verify"] },
    at: { type: "string", format: "date-time" },
    author: { type: "string", minLength: 1 },
    from: { type: "string" },
    to: { type: "string" },
    state: { type: "string" },
    note: { type: "string" },
    body: { type: "string" },
  },
} as const;

const TASK_ORIGIN_SCHEMA = {
  type: "object",
  additionalProperties: { type: "string" },
  required: ["system"],
  properties: {
    system: { type: "string", minLength: 1 },
    issue_id: { type: "string", minLength: 1 },
    url: { type: "string", minLength: 1 },
    recipe_id: { type: "string", minLength: 1 },
    scenario_id: { type: "string", minLength: 1 },
    recipe_version: { type: "string", minLength: 1 },
    run_id: { type: "string", minLength: 1 },
  },
} as const;

const TASK_COMMIT_SCHEMA = {
  type: ["object", "null"],
  additionalProperties: false,
  required: ["hash", "message"],
  properties: {
    hash: { type: "string", minLength: 1 },
    message: { type: "string", minLength: 1 },
  },
} as const;

const TASK_SECTIONS_SCHEMA = {
  type: "object",
  additionalProperties: { type: "string" },
} as const;

const RUNNER_TARGET_SCHEMA = {
  type: "object",
  additionalProperties: true,
  required: ["kind"],
  properties: {
    kind: { type: "string", enum: ["task", "recipe_scenario"] },
    task_id: { type: "string", minLength: 1 },
    recipe_id: { type: "string", minLength: 1 },
    scenario_id: { type: "string", minLength: 1 },
  },
} as const;

const RUNNER_METRICS_SCHEMA = {
  type: "object",
  additionalProperties: true,
  properties: {
    duration_ms: { type: "number" },
    stdout_bytes: { type: "number" },
    stderr_bytes: { type: "number" },
    output_last_message_bytes: { type: ["number", "null"] },
  },
} as const;

const RUNNER_EVIDENCE_SCHEMA = {
  type: "object",
  additionalProperties: true,
  properties: {
    evidence_paths: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    changed_paths: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    files_changed_count: { type: "integer", minimum: 0 },
    tests_run: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    verification_candidates: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
  },
} as const;

const RUNNER_HISTORY_ENTRY_SCHEMA = {
  type: "object",
  additionalProperties: true,
  required: ["run_id", "status", "adapter_id", "mode", "updated_at", "exit_code", "target"],
  properties: {
    run_id: { type: "string", minLength: 1 },
    status: { type: "string", enum: ["prepared", "running", "success", "failed", "cancelled"] },
    adapter_id: { type: "string", minLength: 1 },
    mode: { type: "string", enum: ["execute", "dry_run"] },
    updated_at: { type: "string", format: "date-time" },
    started_at: { type: "string", format: "date-time" },
    ended_at: { type: "string", format: "date-time" },
    exit_code: { type: ["integer", "null"] },
    target: RUNNER_TARGET_SCHEMA,
    summary: { type: "string" },
    output_paths: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    stdout_summary: { type: "string" },
    stderr_summary: { type: "string" },
    metrics: RUNNER_METRICS_SCHEMA,
    evidence: RUNNER_EVIDENCE_SCHEMA,
  },
} as const;

const RUNNER_OUTCOME_SCHEMA = {
  type: "object",
  additionalProperties: true,
  required: ["run_id", "status", "adapter_id", "mode", "updated_at", "exit_code", "target"],
  properties: {
    ...RUNNER_HISTORY_ENTRY_SCHEMA.properties,
    history: {
      type: "array",
      items: RUNNER_HISTORY_ENTRY_SCHEMA,
    },
  },
} as const;

export const TASK_README_FRONTMATTER_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://agentplane.dev/schemas/task-readme-frontmatter.schema.json",
  title: "Task README frontmatter (v1)",
  description:
    "Task READMEs are Markdown with YAML frontmatter. This schema describes the frontmatter keys.",
  type: "object",
  additionalProperties: true,
  required: [
    "id",
    "title",
    "status",
    "priority",
    "owner",
    "depends_on",
    "tags",
    "verify",
    "plan_approval",
    "verification",
    "comments",
    "doc_version",
    "doc_updated_at",
    "doc_updated_by",
    "description",
  ],
  properties: {
    id: { type: "string", minLength: 1 },
    title: { type: "string", minLength: 1 },
    result_summary: { type: "string" },
    risk_level: TASK_RISK_LEVEL_SCHEMA,
    breaking: { type: "boolean" },
    status: TASK_STATUS_SCHEMA,
    priority: TASK_PRIORITY_SCHEMA,
    owner: { type: "string", minLength: 1 },
    revision: { type: "integer", minimum: 1 },
    origin: TASK_ORIGIN_SCHEMA,
    depends_on: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    tags: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    verify: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
    verification: TASK_VERIFICATION_SCHEMA,
    runner: RUNNER_OUTCOME_SCHEMA,
    commit: TASK_COMMIT_SCHEMA,
    comments: {
      type: "array",
      items: TASK_COMMENT_SCHEMA,
    },
    events: {
      type: "array",
      items: TASK_EVENT_SCHEMA,
    },
    doc_version: { type: "integer", enum: [2, 3] },
    doc_updated_at: { type: "string", format: "date-time" },
    doc_updated_by: { type: "string", minLength: 1 },
    description: { type: "string" },
    sections: TASK_SECTIONS_SCHEMA,
    dirty: { type: "boolean" },
    id_source: { type: "string", minLength: 1 },
  },
} as const;

export const TASKS_EXPORT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://agentplane.dev/schemas/tasks-export.schema.json",
  title: "tasks.json export snapshot (v1)",
  type: "object",
  additionalProperties: false,
  required: ["tasks", "meta"],
  properties: {
    tasks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: true,
        required: [
          "id",
          "title",
          "status",
          "priority",
          "owner",
          "depends_on",
          "tags",
          "verify",
          "plan_approval",
          "verification",
          "commit",
          "comments",
          "doc_version",
          "doc_updated_at",
          "doc_updated_by",
          "description",
          "dirty",
          "id_source",
        ],
        properties: {
          id: { type: "string", minLength: 1 },
          title: { type: "string", minLength: 1 },
          result_summary: { type: "string" },
          risk_level: TASK_RISK_LEVEL_SCHEMA,
          breaking: { type: "boolean" },
          status: TASK_STATUS_SCHEMA,
          priority: TASK_PRIORITY_SCHEMA,
          owner: { type: "string", minLength: 1 },
          revision: { type: "integer", minimum: 1 },
          origin: TASK_ORIGIN_SCHEMA,
          runner: RUNNER_OUTCOME_SCHEMA,
          depends_on: {
            type: "array",
            items: { type: "string", minLength: 1 },
          },
          tags: {
            type: "array",
            items: { type: "string", minLength: 1 },
          },
          verify: {
            type: "array",
            items: { type: "string", minLength: 1 },
          },
          plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
          verification: TASK_VERIFICATION_SCHEMA,
          commit: TASK_COMMIT_SCHEMA,
          comments: {
            type: "array",
            items: TASK_COMMENT_SCHEMA,
          },
          events: {
            type: "array",
            items: TASK_EVENT_SCHEMA,
          },
          doc_version: { type: "integer", enum: [2, 3] },
          doc_updated_at: { type: "string", format: "date-time" },
          doc_updated_by: { type: "string", minLength: 1 },
          description: { type: "string" },
          dirty: { type: "boolean" },
          id_source: { type: "string", minLength: 1 },
        },
      },
    },
    meta: {
      type: "object",
      additionalProperties: false,
      required: ["schema_version", "managed_by", "checksum_algo", "checksum"],
      properties: {
        schema_version: { type: "integer", const: 1 },
        managed_by: { type: "string", minLength: 1 },
        checksum_algo: { type: "string", enum: ["sha256"] },
        checksum: { type: "string", minLength: 1 },
      },
    },
  },
} as const;

export const TASK_PR_META_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://agentplane.dev/schemas/pr-meta.schema.json",
  title: "PR artifact meta.json (v1)",
  type: "object",
  additionalProperties: true,
  required: ["schema_version", "task_id", "created_at", "updated_at"],
  properties: {
    schema_version: { type: "integer", const: 1 },
    task_id: { type: "string", minLength: 1 },
    branch: { type: "string", minLength: 1 },
    base: { type: "string", minLength: 1 },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    status: { type: "string", enum: ["MERGED"] },
    merge_strategy: { type: "string", enum: ["squash", "merge", "rebase"] },
    merged_at: { type: "string", format: "date-time" },
    merge_commit: { type: "string", minLength: 1 },
    head_sha: { type: "string", minLength: 1 },
    last_verified_sha: { type: ["string", "null"], minLength: 7 },
    last_verified_at: { type: ["string", "null"], format: "date-time" },
    verify: {
      type: "object",
      additionalProperties: true,
      properties: {
        status: { type: "string", enum: ["pass", "fail", "skipped"] },
        command: { type: "string" },
      },
    },
  },
} as const;

const validateTaskReadmeFrontmatterSchema = AJV.compile<TaskFrontmatter>(
  TASK_README_FRONTMATTER_SCHEMA,
);
const validateTasksExportSnapshotSchema = AJV.compile<TasksExportSnapshot>(TASKS_EXPORT_SCHEMA);
const validateTaskPrMetaSchema = AJV.compile<TaskPrMeta>(TASK_PR_META_SCHEMA);

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

function formatSchemaErrors(label: string, errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) return `${label} schema validation failed`;
  return `${label} schema validation failed: ${AJV.errorsText(errors, { dataVar: label })}`;
}

function schemaErrors<T>(label: string, validate: ValidateFunction<T>, value: unknown): string[] {
  return validate(value) ? [] : [formatSchemaErrors(label, validate.errors)];
}

function assertValid<T>(label: string, validate: ValidateFunction<T>, value: unknown): T {
  const errors = schemaErrors(label, validate, value);
  if (errors.length > 0) throw new Error(errors[0]);
  return value as T;
}

export function listTaskReadmeFrontmatterSchemaErrors(value: unknown): string[] {
  return schemaErrors("task README frontmatter", validateTaskReadmeFrontmatterSchema, value);
}

export function validateTaskReadmeFrontmatter(value: unknown): TaskFrontmatter {
  return assertValid("task README frontmatter", validateTaskReadmeFrontmatterSchema, value);
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
  return schemaErrors("tasks.json", validateTasksExportSnapshotSchema, value);
}

export function validateTasksExportSnapshot(value: unknown): TasksExportSnapshot {
  return assertValid("tasks.json", validateTasksExportSnapshotSchema, value);
}

export function listTaskPrMetaSchemaErrors(value: unknown): string[] {
  return schemaErrors("pr/meta.json", validateTaskPrMetaSchema, value);
}

export function validateTaskPrMeta(value: unknown): TaskPrMeta {
  return assertValid("pr/meta.json", validateTaskPrMetaSchema, value);
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
