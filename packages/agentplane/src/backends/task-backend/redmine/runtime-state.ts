import {
  DEFAULT_DOC_UPDATED_BY,
  BackendError,
  normalizeDocVersion,
  nowIso,
  redmineConfigMissingEnvMessage,
  type TaskData,
  type TaskDocMeta,
  type TaskWriteOptions,
} from "../shared.js";
import { setIssueCustomFieldValue as setRedmineIssueCustomFieldValue } from "./fields.js";
import type { RedmineBackendRuntimeHost } from "./runtime-context.js";

export function ensureRedmineDocMetadata(task: TaskDocMeta): void {
  if (task.doc === undefined) return;
  task.doc_version = normalizeDocVersion(task.doc_version);
  task.doc_updated_at ??= nowIso();
  task.doc_updated_by ??= DEFAULT_DOC_UPDATED_BY;
}

export async function cacheRedmineTask(
  host: RedmineBackendRuntimeHost,
  task: TaskData,
  dirty: boolean,
): Promise<void> {
  if (!host.cache) return;
  const next = { ...task, dirty };
  await host.cache.writeTask(next);
}

export function assertRedmineExpectedRevisionSupported(
  host: RedmineBackendRuntimeHost,
  taskId: string,
  opts?: TaskWriteOptions,
): void {
  if (opts?.expectedRevision === undefined) return;
  if (host.capabilities.supports_revision_guarded_writes) return;
  throw new BackendError(
    `Task revision guarding is unavailable for ${taskId} without AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE`,
    "E_BACKEND",
  );
}

export function assertRedmineExpectedRevision(
  taskId: string,
  expectedRevision: number | undefined,
  currentRevision: number,
): void {
  if (expectedRevision === undefined) return;
  const expected = Math.trunc(expectedRevision);
  if (expected <= 0 || expected === currentRevision) return;
  throw new BackendError(
    `Task revision changed concurrently: ${taskId} ` +
      `(expected revision ${expected}, current revision ${currentRevision})`,
    "E_BACKEND",
  );
}

export function redmineTaskIdFieldId(host: RedmineBackendRuntimeHost): unknown {
  const fieldId = host.customFields?.task_id;
  if (fieldId) return fieldId;
  throw new BackendError(
    redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID"),
    "E_BACKEND",
  );
}

export function setRedmineIssueCustomField(
  issue: Record<string, unknown>,
  fieldId: unknown,
  value: unknown,
): void {
  setRedmineIssueCustomFieldValue(issue, fieldId, value);
}

export function coerceRedmineBackendDocVersion(value: unknown): 2 | 3 | null {
  if (value === 2 || value === 3) return value;
  return null;
}
