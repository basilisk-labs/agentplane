import { z, type ZodError } from "zod";

import { isRecord } from "../types/guards.js";
import { AgentplaneConfigSchema } from "./schema.impl.js";

export const WORKFLOW_CONTRACT_VERSION = 2 as const;
export const SUPPORTED_WORKFLOW_VERSIONS = [1, WORKFLOW_CONTRACT_VERSION] as const;

const nonEmptyString = z.string().min(1);
const configShape = AgentplaneConfigSchema.shape;
const tasksConfigSchema = configShape.tasks.unwrap();

const WORKFLOW_RETRY_POLICY_SCHEMA = z
  .object({
    normal_exit_continuation: z.boolean(),
    abnormal_backoff: z.literal("exponential"),
    max_attempts: z.number().int().min(1).max(100),
  })
  .strict();

const WORKFLOW_TIMEOUTS_SCHEMA = z
  .object({
    stall_seconds: z.number().int().min(1).max(86_400),
  })
  .strict();

const WORKFLOW_OWNERS_SCHEMA = z
  .object({
    orchestrator: nonEmptyString,
  })
  .strict();

const WORKFLOW_APPROVALS_V1_SCHEMA = z
  .object({
    require_plan: z.boolean(),
    require_verify: z.boolean(),
    require_network: z.boolean(),
  })
  .strict();

const WORKFLOW_APPROVALS_V2_SCHEMA = z
  .object({
    require_plan: z.boolean(),
    require_verify: z.boolean(),
    require_network: z.boolean(),
    require_force: z.boolean().optional(),
  })
  .passthrough();

const WORKFLOW_SECTION_SCHEMA = z
  .object({
    mode: configShape.workflow_mode.unwrap(),
    status_commit_policy: configShape.status_commit_policy.unwrap().optional(),
    commit_automation: configShape.commit_automation.unwrap().optional(),
    finish_auto_status_commit: configShape.finish_auto_status_commit.unwrap().optional(),
    close_commit: configShape.close_commit.unwrap().optional(),
    artifacts_language: configShape.artifacts_language.unwrap().optional(),
    closure_commit_requires_approval: configShape.closure_commit_requires_approval
      .unwrap()
      .optional(),
  })
  .passthrough();

const WORKFLOW_WORKSPACE_SCHEMA = z
  .object({
    agents_dir: nonEmptyString.optional(),
    tasks_path: nonEmptyString.optional(),
    workflow_dir: nonEmptyString.optional(),
    worktrees_dir: nonEmptyString.optional(),
    isolation: z.literal("per_task").optional(),
    cleanup: z.literal("after_finish").optional(),
  })
  .passthrough();

const WORKFLOW_TASKS_SCHEMA = tasksConfigSchema
  .extend({
    backend: configShape.tasks_backend.unwrap().optional(),
  })
  .passthrough();

const WORKFLOW_SCHEDULER_SCHEMA = z
  .object({
    concurrency: z.number().int().min(1).optional(),
    poll_interval_ms: z.number().int().min(0).optional(),
    retry_policy: WORKFLOW_RETRY_POLICY_SCHEMA.optional(),
    timeouts: WORKFLOW_TIMEOUTS_SCHEMA.optional(),
  })
  .passthrough();

const WORKFLOW_EVALUATOR_SCHEMA = configShape.evaluator
  .unwrap()
  .extend({
    verdicts: z.array(nonEmptyString).min(1).optional(),
    required_checks: z.array(nonEmptyString).optional(),
  })
  .passthrough();

const WORKFLOW_OBSERVABILITY_SCHEMA = z
  .object({
    runs_dir: nonEmptyString.optional(),
    events: z.literal("jsonl").optional(),
  })
  .passthrough();

const WORKFLOW_V1_OPTIONAL_ROOT_SHAPE = {
  workspace: WORKFLOW_WORKSPACE_SCHEMA.optional(),
  paths: configShape.paths.unwrap().optional(),
  tasks: WORKFLOW_TASKS_SCHEMA.optional(),
  branch: configShape.branch.unwrap().optional(),
  framework: configShape.framework.unwrap().optional(),
  execution: configShape.execution.unwrap().optional(),
  runner: configShape.runner.unwrap().optional(),
  feedback: configShape.feedback.unwrap().optional(),
  recipes: configShape.recipes.unwrap().optional(),
  commit: configShape.commit.unwrap().optional(),
  acr: configShape.acr.unwrap().optional(),
  scheduler: WORKFLOW_SCHEDULER_SCHEMA.optional(),
  evaluator: WORKFLOW_EVALUATOR_SCHEMA.optional(),
  observability: WORKFLOW_OBSERVABILITY_SCHEMA.optional(),
};

export const WorkflowV1FrontMatterSchema = z
  .object({
    version: z.literal(1),
    mode: configShape.workflow_mode.unwrap(),
    owners: WORKFLOW_OWNERS_SCHEMA,
    approvals: WORKFLOW_APPROVALS_V1_SCHEMA,
    retry_policy: WORKFLOW_RETRY_POLICY_SCHEMA,
    timeouts: WORKFLOW_TIMEOUTS_SCHEMA,
    in_scope_paths: z.array(nonEmptyString).min(1),
    ...WORKFLOW_V1_OPTIONAL_ROOT_SHAPE,
  })
  .strict();

export const WorkflowV2FrontMatterSchema = z
  .object({
    version: z.literal(WORKFLOW_CONTRACT_VERSION),
    workflow: WORKFLOW_SECTION_SCHEMA,
    owners: WORKFLOW_OWNERS_SCHEMA,
    approvals: WORKFLOW_APPROVALS_V2_SCHEMA,
    workspace: WORKFLOW_WORKSPACE_SCHEMA.optional(),
    paths: configShape.paths.unwrap().optional(),
    tasks: WORKFLOW_TASKS_SCHEMA.optional(),
    branch: configShape.branch.unwrap().optional(),
    framework: configShape.framework.unwrap().optional(),
    execution: configShape.execution.unwrap().optional(),
    runner: configShape.runner.unwrap().optional(),
    feedback: configShape.feedback.unwrap().optional(),
    recipes: configShape.recipes.unwrap().optional(),
    commit: configShape.commit.unwrap().optional(),
    acr: configShape.acr.unwrap().optional(),
    scheduler: WORKFLOW_SCHEDULER_SCHEMA.optional(),
    evaluator: WORKFLOW_EVALUATOR_SCHEMA.optional(),
    observability: WORKFLOW_OBSERVABILITY_SCHEMA.optional(),
    retry_policy: WORKFLOW_RETRY_POLICY_SCHEMA,
    timeouts: WORKFLOW_TIMEOUTS_SCHEMA,
    in_scope_paths: z.array(nonEmptyString).min(1),
  })
  .strict();

export const WorkflowFrontMatterInputSchema = z.union([
  WorkflowV1FrontMatterSchema,
  WorkflowV2FrontMatterSchema,
]);

export type WorkflowV1FrontMatter = z.input<typeof WorkflowV1FrontMatterSchema>;
export type WorkflowV2FrontMatter = z.input<typeof WorkflowV2FrontMatterSchema>;
export type WorkflowFrontMatterInput = z.input<typeof WorkflowFrontMatterInputSchema>;

export class UnsupportedWorkflowVersionError extends Error {
  readonly code = "WF_UNSUPPORTED_VERSION" as const;
  readonly version: number;
  readonly supportedVersions = [...SUPPORTED_WORKFLOW_VERSIONS];

  constructor(version: number) {
    super(
      `Unsupported WORKFLOW version ${version}; supported versions: ${SUPPORTED_WORKFLOW_VERSIONS.join(", ")}.`,
    );
    this.name = "UnsupportedWorkflowVersionError";
    this.version = version;
  }
}

function assertSupportedWorkflowVersion(raw: unknown): void {
  if (!isRecord(raw)) return;
  const version = raw.version;
  if (
    typeof version === "number" &&
    Number.isInteger(version) &&
    !SUPPORTED_WORKFLOW_VERSIONS.includes(version as 1 | 2)
  ) {
    throw new UnsupportedWorkflowVersionError(version);
  }
}

export function migrateWorkflowFrontMatterV1ToV2(
  input: WorkflowV1FrontMatter,
): WorkflowV2FrontMatter {
  WorkflowV1FrontMatterSchema.parse(input);
  const source = structuredClone(input);
  const { version: _version, mode, ...preserved } = source;
  const candidate: WorkflowV2FrontMatter = {
    version: WORKFLOW_CONTRACT_VERSION,
    workflow: { mode },
    ...preserved,
  };
  WorkflowV2FrontMatterSchema.parse(candidate);
  return candidate;
}

export function parseWorkflowFrontMatter(raw: unknown): WorkflowV2FrontMatter {
  assertSupportedWorkflowVersion(raw);
  const parsed = WorkflowFrontMatterInputSchema.parse(raw);
  if (parsed.version === 1) {
    return migrateWorkflowFrontMatterV1ToV2(raw as WorkflowV1FrontMatter);
  }

  // Parsing is validation-only for v2. Returning the source shape prevents defaults in the
  // config schema fragments from materializing fields that were absent in the persisted file.
  return structuredClone(raw) as WorkflowV2FrontMatter;
}

export type WorkflowFrontMatterParseResult =
  | { success: true; data: WorkflowV2FrontMatter }
  | { success: false; error: ZodError | UnsupportedWorkflowVersionError };

export function safeParseWorkflowFrontMatter(raw: unknown): WorkflowFrontMatterParseResult {
  try {
    return { success: true, data: parseWorkflowFrontMatter(raw) };
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof UnsupportedWorkflowVersionError) {
      return { success: false, error };
    }
    throw error;
  }
}

function buildWorkflowJsonSchema(): Record<string, unknown> {
  const { $schema: _schema, ...schema } = z.toJSONSchema(WorkflowFrontMatterInputSchema, {
    target: "draft-2020-12",
    unrepresentable: "any",
    io: "input",
    reused: "inline",
    cycles: "throw",
  }) as Record<string, unknown>;

  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://agentplane.dev/schemas/workflow.schema.json",
    title: "Agentplane Workflow Contract",
    description:
      "Versioned WORKFLOW.md front matter. AgentPlane reads v1 and v2, normalizes both to v2, and rejects unsupported versions.",
    ...schema,
  };
}

export const WORKFLOW_FRONT_MATTER_JSON_SCHEMA = buildWorkflowJsonSchema();

export function renderWorkflowFrontMatterSchemaJson(): string {
  return `${JSON.stringify(WORKFLOW_FRONT_MATTER_JSON_SCHEMA, null, 2)}\n`;
}

export const WORKFLOW_V1_FRONT_MATTER_FIXTURE: WorkflowV1FrontMatter = {
  version: 1,
  mode: "branch_pr",
  owners: { orchestrator: "ORCHESTRATOR" },
  approvals: {
    require_plan: true,
    require_verify: true,
    require_network: true,
  },
  retry_policy: {
    normal_exit_continuation: true,
    abnormal_backoff: "exponential",
    max_attempts: 5,
  },
  timeouts: { stall_seconds: 900 },
  in_scope_paths: ["**"],
};

export const WORKFLOW_V2_FRONT_MATTER_FIXTURE: WorkflowV2FrontMatter = {
  version: 2,
  workflow: {
    mode: "branch_pr",
    status_commit_policy: "confirm",
    commit_automation: "manual",
    finish_auto_status_commit: false,
  },
  owners: { orchestrator: "ORCHESTRATOR" },
  approvals: {
    require_plan: true,
    require_verify: true,
    require_network: true,
  },
  workspace: {
    agents_dir: ".agentplane/agents",
    tasks_path: ".agentplane/tasks.json",
    workflow_dir: ".agentplane/tasks",
    worktrees_dir: ".agentplane/worktrees",
    isolation: "per_task",
    cleanup: "after_finish",
  },
  tasks: {
    backend: { config_path: ".agentplane/backends/local/backend.json" },
  },
  branch: { task_prefix: "task", task_close_prefix: "task-close" },
  scheduler: {
    concurrency: 1,
    poll_interval_ms: 30_000,
    retry_policy: {
      normal_exit_continuation: true,
      abnormal_backoff: "exponential",
      max_attempts: 5,
    },
  },
  retry_policy: {
    normal_exit_continuation: true,
    abnormal_backoff: "exponential",
    max_attempts: 5,
  },
  timeouts: { stall_seconds: 900 },
  in_scope_paths: ["**"],
};

export function renderWorkflowV1FrontMatterFixtureJson(): string {
  return `${JSON.stringify(WORKFLOW_V1_FRONT_MATTER_FIXTURE, null, 2)}\n`;
}

export function renderWorkflowV2FrontMatterFixtureJson(): string {
  return `${JSON.stringify(WORKFLOW_V2_FRONT_MATTER_FIXTURE, null, 2)}\n`;
}
