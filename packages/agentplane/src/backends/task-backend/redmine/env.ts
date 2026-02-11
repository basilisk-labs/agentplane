import { BackendError, redmineConfigMissingMessage } from "../shared.js";

export type RedmineEnvConfig = {
  url?: string;
  apiKey?: string;
  projectId?: string;
  assigneeId?: number;
  ownerAgent?: string;
  customFields: Partial<Record<RedmineCustomFieldKey, number>>;
  batch: {
    size?: number;
    pauseMs?: number;
  };
};

type RedmineCustomFieldKey =
  | "task_id"
  | "doc"
  | "doc_version"
  | "doc_updated_at"
  | "doc_updated_by"
  | "tags"
  | "priority"
  | "owner";

function nonEmptyEnv(key: string): string | undefined {
  const value = process.env[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parsePositiveIntEnv(
  key: string,
  opts?: { allowZero?: boolean; min?: number },
): number | undefined {
  const raw = nonEmptyEnv(key);
  if (!raw) return undefined;
  if (!/^\d+$/u.test(raw)) {
    throw new BackendError(
      redmineConfigMissingMessage(`${key} must be a positive integer`),
      "E_BACKEND",
    );
  }
  const parsed = Number(raw);
  const min = opts?.min ?? (opts?.allowZero ? 0 : 1);
  if (!Number.isFinite(parsed) || parsed < min) {
    throw new BackendError(redmineConfigMissingMessage(`${key} must be >= ${min}`), "E_BACKEND");
  }
  return parsed;
}

export function readRedmineEnv(): RedmineEnvConfig {
  const customFields: RedmineEnvConfig["customFields"] = {};

  const taskId = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID");
  if (taskId !== undefined) customFields.task_id = taskId;
  const doc = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC");
  if (doc !== undefined) customFields.doc = doc;
  const docVersion = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_VERSION");
  if (docVersion !== undefined) customFields.doc_version = docVersion;
  const docUpdatedAt = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_AT");
  if (docUpdatedAt !== undefined) customFields.doc_updated_at = docUpdatedAt;
  const docUpdatedBy = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_BY");
  if (docUpdatedBy !== undefined) customFields.doc_updated_by = docUpdatedBy;
  const tags = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TAGS");
  if (tags !== undefined) customFields.tags = tags;
  const priority = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_PRIORITY");
  if (priority !== undefined) customFields.priority = priority;
  const owner = parsePositiveIntEnv("AGENTPLANE_REDMINE_CUSTOM_FIELDS_OWNER");
  if (owner !== undefined) customFields.owner = owner;

  return {
    url: nonEmptyEnv("AGENTPLANE_REDMINE_URL"),
    apiKey: nonEmptyEnv("AGENTPLANE_REDMINE_API_KEY"),
    projectId: nonEmptyEnv("AGENTPLANE_REDMINE_PROJECT_ID"),
    assigneeId: parsePositiveIntEnv("AGENTPLANE_REDMINE_ASSIGNEE_ID"),
    ownerAgent:
      nonEmptyEnv("AGENTPLANE_REDMINE_OWNER") ?? nonEmptyEnv("AGENTPLANE_REDMINE_OWNER_AGENT"),
    customFields,
    batch: {
      size: parsePositiveIntEnv("AGENTPLANE_REDMINE_BATCH_SIZE"),
      pauseMs: parsePositiveIntEnv("AGENTPLANE_REDMINE_BATCH_PAUSE", { allowZero: true, min: 0 }),
    },
  };
}
