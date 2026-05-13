import { z } from "zod";

import {
  ISO_UTC_TIMESTAMP,
  NON_EMPTY_STRING,
  NULLABLE_ISO_UTC_TIMESTAMP,
  NULLABLE_NON_EMPTY_STRING,
} from "./task-artifact-schema.shared.js";

const RUNNER_OUTCOME_STATUS_VALUES = [
  "prepared",
  "running",
  "success",
  "failed",
  "cancelled",
] as const;
const HANDOFF_ROUTE_KIND_VALUES = ["protected_base_integrate"] as const;
const HANDOFF_ROUTE_STATUS_VALUES = ["awaiting_github_merge"] as const;
const HANDOFF_LOCAL_MUTATION_VALUES = ["not_performed"] as const;
const HANDOFF_FINALIZE_VIA_VALUES = [
  "github_pr_merge_then_hosted_close",
  "github_task_pr_merge_then_hosted_close",
] as const;
const RUNNER_NEXT_ACTION_VALUES = [
  "run",
  "resume",
  "retry",
  "wait",
  "cancel_then_resume",
  "none",
] as const;

export type TaskHandoffRunnerNextAction =
  | "run"
  | "resume"
  | "retry"
  | "wait"
  | "cancel_then_resume"
  | "none";

export const TASK_HANDOFF_ROUTE_ZOD_SCHEMA = z
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

export const TASK_HANDOFF_RUNNER_STATE_ZOD_SCHEMA = z
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

export const TASK_HANDOFF_ZOD_SCHEMA = z
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

export type TaskHandoffRoute = z.infer<typeof TASK_HANDOFF_ROUTE_ZOD_SCHEMA>;
export type TaskHandoffRunnerState = z.infer<typeof TASK_HANDOFF_RUNNER_STATE_ZOD_SCHEMA>;
export type TaskHandoff = z.infer<typeof TASK_HANDOFF_ZOD_SCHEMA>;
