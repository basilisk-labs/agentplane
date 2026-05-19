import { z } from "zod";

import { ISO_UTC_TIMESTAMP, NON_EMPTY_STRING } from "./task-artifact-schema.shared.js";

export const TASK_OBSERVATION_SCHEMA_VERSION = "0.1";

export const TASK_OBSERVATION_KIND_VALUES = [
  "spec_gap",
  "assumption",
  "decision",
  "deviation",
  "tradeoff",
  "risk",
  "bug_candidate",
  "issue_candidate",
  "incident_candidate",
  "context_candidate",
  "agent_improvement_candidate",
  "blueprint_improvement_candidate",
] as const;

export const TASK_OBSERVATION_PHASE_VALUES = [
  "planning",
  "implementation",
  "verification",
  "integration",
  "finish",
  "post_run",
] as const;

export const TASK_OBSERVATION_SEVERITY_VALUES = ["low", "medium", "high", "critical"] as const;

export const TASK_OBSERVATION_ACTION_VALUES = [
  "none",
  "readme_finding",
  "github_issue",
  "incident",
  "context",
  "skill",
  "blueprint_change",
  "agent_prompt_change",
  "test_gap",
] as const;

export const TASK_OBSERVATION_STATUS_VALUES = [
  "open",
  "accepted",
  "promoted",
  "dismissed",
  "superseded",
] as const;

const REPOSITORY_RELATIVE_PATH_SCHEMA = z
  .string()
  .min(1)
  .regex(/^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$)).+$/);

const TASK_OBSERVATION_EVIDENCE_ZOD_SCHEMA = z
  .object({
    files: z.array(REPOSITORY_RELATIVE_PATH_SCHEMA).optional(),
    commands: z.array(NON_EMPTY_STRING).optional(),
    refs: z.array(NON_EMPTY_STRING).optional(),
  })
  .strict();

const TASK_OBSERVATION_RECOMMENDED_ACTION_ZOD_SCHEMA = z
  .object({
    type: z.enum(TASK_OBSERVATION_ACTION_VALUES),
    title: NON_EMPTY_STRING.optional(),
    details: NON_EMPTY_STRING.optional(),
  })
  .strict();

export const TASK_OBSERVATION_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(TASK_OBSERVATION_SCHEMA_VERSION),
    id: z.string().regex(/^obs-[A-Za-z0-9_-]+$/),
    task_id: NON_EMPTY_STRING,
    created_at: ISO_UTC_TIMESTAMP,
    author: NON_EMPTY_STRING,
    phase: z.enum(TASK_OBSERVATION_PHASE_VALUES),
    kind: z.enum(TASK_OBSERVATION_KIND_VALUES),
    severity: z.enum(TASK_OBSERVATION_SEVERITY_VALUES),
    summary: NON_EMPTY_STRING,
    evidence: TASK_OBSERVATION_EVIDENCE_ZOD_SCHEMA.optional(),
    decision: NON_EMPTY_STRING.optional(),
    impact: NON_EMPTY_STRING.optional(),
    recommended_action: TASK_OBSERVATION_RECOMMENDED_ACTION_ZOD_SCHEMA.optional(),
    status: z.enum(TASK_OBSERVATION_STATUS_VALUES),
    tags: z.array(NON_EMPTY_STRING).optional(),
  })
  .strict();

export type TaskObservation = z.infer<typeof TASK_OBSERVATION_ZOD_SCHEMA>;
export type TaskObservationKind = (typeof TASK_OBSERVATION_KIND_VALUES)[number];
export type TaskObservationPhase = (typeof TASK_OBSERVATION_PHASE_VALUES)[number];
export type TaskObservationSeverity = (typeof TASK_OBSERVATION_SEVERITY_VALUES)[number];
export type TaskObservationAction = (typeof TASK_OBSERVATION_ACTION_VALUES)[number];
export type TaskObservationStatus = (typeof TASK_OBSERVATION_STATUS_VALUES)[number];
