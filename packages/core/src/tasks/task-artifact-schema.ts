import type { TaskFrontmatter } from "./task-store.js";
import type { TasksExportSnapshot } from "./tasks-export.js";
import { ACR_ZOD_SCHEMA, type AgentChangeRecord } from "./task-artifact-schema.acr.js";
import { TASK_HANDOFF_ZOD_SCHEMA, type TaskHandoff } from "./task-artifact-schema.handoff.js";
import {
  TASK_OBSERVATION_ZOD_SCHEMA,
  type TaskObservation,
} from "./task-artifact-schema.observations.js";
import { TASK_PR_META_ZOD_SCHEMA, type TaskPrMeta } from "./task-artifact-schema.pr-metadata.js";
import {
  AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA,
  type AgentPlaneRunnerHandoff,
} from "./task-artifact-schema.runner-handoff.js";
import {
  TASK_README_FRONTMATTER_ZOD_SCHEMA,
  TASKS_EXPORT_ZOD_SCHEMA,
} from "./task-artifact-schema.task.js";
import {
  assertValid,
  buildJsonSchemaDocument,
  schemaErrors,
} from "./task-artifact-schema.shared.js";

export type {
  TaskHandoff,
  TaskHandoffRoute,
  TaskHandoffRunnerNextAction,
  TaskHandoffRunnerState,
} from "./task-artifact-schema.handoff.js";
export type {
  AgentPlaneRunnerHandoff,
  AgentPlaneRunnerHandoffMode,
  AgentPlaneRunnerHandoffPublic,
  AgentPlaneRunnerHandoffRepoRef,
  AgentPlaneRunnerHandoffStatus,
  AgentPlaneRunnerHandoffValidationOptions,
} from "./task-artifact-schema.runner-handoff.js";

export type { TaskPrMeta } from "./task-artifact-schema.pr-metadata.js";
export type { AgentChangeRecord } from "./task-artifact-schema.acr.js";
export type { TaskObservation } from "./task-artifact-schema.observations.js";
export type {
  TaskObservationAction,
  TaskObservationKind,
  TaskObservationPhase,
  TaskObservationSeverity,
  TaskObservationStatus,
} from "./task-artifact-schema.observations.js";
export {
  TASK_OBSERVATION_ACTION_VALUES,
  TASK_OBSERVATION_KIND_VALUES,
  TASK_OBSERVATION_PHASE_VALUES,
  TASK_OBSERVATION_SCHEMA_VERSION,
  TASK_OBSERVATION_SEVERITY_VALUES,
  TASK_OBSERVATION_STATUS_VALUES,
} from "./task-artifact-schema.observations.js";
export { ACR_VERSION, computeAcrRecordDigest } from "./task-artifact-schema.acr.js";
export {
  listAgentPlaneRunnerHandoffSchemaErrors,
  sanitizeAgentPlaneRunnerHandoff,
  validateAgentPlaneRunnerHandoff,
} from "./task-artifact-schema.runner-handoff.js";
export { withTaskReadmeFrontmatterDefaults } from "./task-artifact-schema.task.js";

export const ACR_SCHEMA = buildJsonSchemaDocument(ACR_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/acr-v0.1.schema.json",
  title: "Agent Change Record (ACR) v0.1",
  description:
    "ACR is a machine-readable evidence projection derived from AgentPlane task, policy, verification, and Git state.",
});

export const TASK_README_FRONTMATTER_SCHEMA = buildJsonSchemaDocument(
  TASK_README_FRONTMATTER_ZOD_SCHEMA,
  {
    $id: "https://agentplane.org/schemas/task-readme-frontmatter.schema.json",
    title: "Task README frontmatter (v1)",
    description:
      "Task READMEs are Markdown with YAML frontmatter. This schema describes the frontmatter keys.",
  },
);

export const TASKS_EXPORT_SCHEMA = buildJsonSchemaDocument(TASKS_EXPORT_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/tasks-export.schema.json",
  title: "tasks.json export snapshot (v1)",
});

export const TASK_PR_META_SCHEMA = buildJsonSchemaDocument(TASK_PR_META_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/pr-meta.schema.json",
  title: "PR artifact meta.json (v1)",
});

export const TASK_HANDOFF_SCHEMA = buildJsonSchemaDocument(TASK_HANDOFF_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/task-handoff.schema.json",
  title: "Task handoff artifact (v1)",
});

const AGENTPLANE_RUNNER_HANDOFF_SCHEMA = buildJsonSchemaDocument(
  AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA,
  {
    $id: "https://agentplane.org/schemas/runner-handoff.schema.json",
    title: "AgentPlane runner handoff (v1)",
    description:
      "Connector-neutral cloud-to-runner handoff contract for preparing a hosted runner without granting lifecycle authority or executing repository mutations by itself.",
  },
);

const TASK_OBSERVATION_SCHEMA = buildJsonSchemaDocument(TASK_OBSERVATION_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/task-observation.schema.json",
  title: "Task observation JSONL entry (v0.1)",
  description:
    "A task observation is one append-only JSONL entry for agent-discovered spec gaps, decisions, risks, and follow-up candidates.",
});

export function listTaskReadmeFrontmatterSchemaErrors(value: unknown): string[] {
  return schemaErrors("task README frontmatter", TASK_README_FRONTMATTER_ZOD_SCHEMA, value);
}

export function listAcrSchemaErrors(value: unknown): string[] {
  return schemaErrors("ACR v0.1", ACR_ZOD_SCHEMA, value);
}

export function validateAcr(value: unknown): AgentChangeRecord {
  return assertValid("ACR v0.1", ACR_ZOD_SCHEMA, value);
}

export function validateTaskReadmeFrontmatter(value: unknown): TaskFrontmatter {
  return assertValid(
    "task README frontmatter",
    TASK_README_FRONTMATTER_ZOD_SCHEMA,
    value,
  ) as TaskFrontmatter;
}

export function listTasksExportSnapshotSchemaErrors(value: unknown): string[] {
  return schemaErrors("tasks.json", TASKS_EXPORT_ZOD_SCHEMA, value);
}

export function validateTasksExportSnapshot(value: unknown): TasksExportSnapshot {
  return assertValid("tasks.json", TASKS_EXPORT_ZOD_SCHEMA, value) as TasksExportSnapshot;
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

export function listAgentPlaneRunnerHandoffJsonSchemaErrors(value: unknown): string[] {
  return schemaErrors("runner handoff", AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA, value);
}

export function validateAgentPlaneRunnerHandoffSchemaOnly(value: unknown): AgentPlaneRunnerHandoff {
  return assertValid("runner handoff", AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA, value);
}

export function listTaskObservationSchemaErrors(value: unknown): string[] {
  return schemaErrors("task observation", TASK_OBSERVATION_ZOD_SCHEMA, value);
}

export function validateTaskObservation(value: unknown): TaskObservation {
  return assertValid("task observation", TASK_OBSERVATION_ZOD_SCHEMA, value);
}

export function renderTaskReadmeFrontmatterSchemaJson(): string {
  return `${JSON.stringify(TASK_README_FRONTMATTER_SCHEMA, null, 2)}\n`;
}

export function renderAcrSchemaJson(): string {
  return `${JSON.stringify(ACR_SCHEMA, null, 2)}\n`;
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

export function renderAgentPlaneRunnerHandoffSchemaJson(): string {
  return `${JSON.stringify(AGENTPLANE_RUNNER_HANDOFF_SCHEMA, null, 2)}\n`;
}

export function renderTaskObservationSchemaJson(): string {
  return `${JSON.stringify(TASK_OBSERVATION_SCHEMA, null, 2)}\n`;
}
