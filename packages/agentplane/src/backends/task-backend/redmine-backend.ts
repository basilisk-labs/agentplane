import { isRecord } from "../../shared/guards.js";

import type { LocalBackend } from "./local-backend.js";
import {
  getRedmineTask,
  getRedmineTaskDoc,
  getRedmineTasks,
  listRedmineProjectionTasks,
  listRedmineTasks,
  normalizeRedmineTasks,
  setRedmineTaskDoc,
  touchRedmineTaskDocMetadata,
} from "./redmine/backend-cache-doc.js";
import { inspectRedmineConfiguration } from "./redmine/backend-report.js";
import {
  generateRedmineTaskId,
  migrateRedmineCanonicalState,
  syncPullRedmine,
  syncRedmine,
  writeRedmineTask,
  writeRedmineTasks,
} from "./redmine/backend-sync.js";
import {
  createRedmineCacheDocContext,
  createRedmineReportContext,
  createRedmineSyncContext,
  type RedmineBackendRuntimeHost,
} from "./redmine/runtime-context.js";
import { redmineBackendRuntimeMethods } from "./redmine/runtime-methods.js";
import { readRedmineEnv } from "./redmine/env.js";
import {
  BackendError,
  firstNonEmptyString,
  redmineConfigMissingEnvMessage,
  type TaskCanonicalStateMigrationResult,
  type TaskBackend,
  type TaskBackendInspectionResult,
  type TaskData,
  type TaskSummary,
  type TaskWriteOptions,
} from "./shared.js";

export type RedmineSettings = {
  url?: string;
  api_key?: string;
  project_id?: string;
  status_map?: Record<string, unknown>;
  custom_fields?: Record<string, unknown>;
  batch_size?: number;
  batch_pause?: number;
  owner_agent?: string;
  cache_dir?: string;
};

export class RedmineBackend implements TaskBackend {
  id = "redmine";
  capabilities: TaskBackend["capabilities"] = {
    canonical_source: "remote",
    projection: "cache",
    projection_read_mode: "native",
    reads_from_projection_by_default: true,
    writes_task_readmes: true,
    supports_task_revisions: false,
    supports_revision_guarded_writes: false,
    may_access_network_on_read: false,
    may_access_network_on_write: true,
    supports_projection_refresh: true,
    supports_push_sync: true,
    supports_snapshot_export: false,
  } as const;
  baseUrl: string;
  apiKey: string;
  projectId: string;
  assigneeId: number | null;
  ownerAgent: string;
  statusMap: Record<string, unknown>;
  customFields: Record<string, unknown>;
  batchSize: number;
  batchPauseMs: number;
  cache: LocalBackend | null;
  issueCache = new Map<string, Record<string, unknown>>();
  reverseStatus = new Map<number, string>();
  inferredStatusByTaskStatus: Map<string, number> | null = null;

  constructor(settings: RedmineSettings, opts: { cache?: LocalBackend | null }) {
    const env = readRedmineEnv();
    this.baseUrl = firstNonEmptyString(env.url, settings.url).replaceAll(/\/+$/gu, "");
    this.apiKey = firstNonEmptyString(env.apiKey, settings.api_key);
    this.projectId = firstNonEmptyString(env.projectId, settings.project_id);
    this.assigneeId = env.assigneeId ?? null;
    this.statusMap = isRecord(settings.status_map) ? settings.status_map : {};
    this.customFields = {
      ...(isRecord(settings.custom_fields) ? settings.custom_fields : {}),
      ...env.customFields,
    };
    this.batchSize =
      env.batch.size ??
      (typeof settings.batch_size === "number" && Number.isFinite(settings.batch_size)
        ? Math.max(1, Math.trunc(settings.batch_size))
        : 20);
    this.batchPauseMs =
      env.batch.pauseMs ??
      (typeof settings.batch_pause === "number" && Number.isFinite(settings.batch_pause)
        ? settings.batch_pause >= 1
          ? Math.trunc(settings.batch_pause)
          : Math.round(settings.batch_pause * 1000)
        : 500);
    this.ownerAgent = firstNonEmptyString(env.ownerAgent, settings.owner_agent, "REDMINE");
    this.cache = opts.cache ?? null;

    const missingEnvKeys: string[] = [];
    if (!this.baseUrl) missingEnvKeys.push("AGENTPLANE_REDMINE_URL");
    if (!this.apiKey) missingEnvKeys.push("AGENTPLANE_REDMINE_API_KEY");
    if (!this.projectId) missingEnvKeys.push("AGENTPLANE_REDMINE_PROJECT_ID");
    if (missingEnvKeys.length > 0) {
      throw new BackendError(redmineConfigMissingEnvMessage(missingEnvKeys), "E_BACKEND");
    }

    if (!this.customFields?.task_id) {
      throw new BackendError(
        redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID"),
        "E_BACKEND",
      );
    }

    const supportsStructuredRevisions = Boolean(this.customFields?.canonical_state);
    this.capabilities = {
      ...this.capabilities,
      supports_task_revisions: supportsStructuredRevisions,
      supports_revision_guarded_writes: supportsStructuredRevisions,
    };

    for (const [key, value] of Object.entries(this.statusMap)) {
      if (typeof value === "number") this.reverseStatus.set(value, key);
    }
  }

  setInferredStatusByTaskStatus(next: Map<string, number> | null): void {
    this.inferredStatusByTaskStatus = next;
  }

  private runtimeHost(): RedmineBackendRuntimeHost {
    return this as unknown as RedmineBackendRuntimeHost;
  }

  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    return await generateRedmineTaskId(createRedmineSyncContext(this.runtimeHost()), opts);
  }

  async listTasks(): Promise<TaskData[]> {
    return await listRedmineTasks(createRedmineCacheDocContext(this.runtimeHost()));
  }

  async listProjectionTasks(): Promise<TaskSummary[]> {
    return await listRedmineProjectionTasks(createRedmineCacheDocContext(this.runtimeHost()));
  }

  async refreshProjection(opts: {
    allowNetwork: boolean;
    quiet?: boolean;
    conflict?: "diff" | "prefer-local" | "prefer-remote" | "fail";
  }): Promise<void> {
    if (!opts.allowNetwork) {
      throw new BackendError("Projection refresh requires network access approval", "E_BACKEND");
    }
    await syncPullRedmine(
      createRedmineSyncContext(this.runtimeHost()),
      opts.conflict ?? "prefer-remote",
      opts.quiet ?? true,
    );
  }

  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    return await normalizeRedmineTasks(createRedmineCacheDocContext(this.runtimeHost()));
  }

  async migrateCanonicalState(): Promise<TaskCanonicalStateMigrationResult> {
    return await migrateRedmineCanonicalState(createRedmineSyncContext(this.runtimeHost()));
  }

  async inspectConfiguration(): Promise<TaskBackendInspectionResult> {
    return await inspectRedmineConfiguration(createRedmineReportContext(this.runtimeHost()));
  }

  async getTask(taskId: string): Promise<TaskData | null> {
    return await getRedmineTask(createRedmineCacheDocContext(this.runtimeHost()), taskId);
  }

  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    return await getRedmineTasks(createRedmineCacheDocContext(this.runtimeHost()), taskIds);
  }

  async getTaskDoc(taskId: string): Promise<string> {
    return await getRedmineTaskDoc(createRedmineCacheDocContext(this.runtimeHost()), taskId);
  }

  async setTaskDoc(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await setRedmineTaskDoc(
      createRedmineCacheDocContext(this.runtimeHost()),
      taskId,
      doc,
      updatedBy,
      opts,
    );
  }

  async touchTaskDocMetadata(
    taskId: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await touchRedmineTaskDocMetadata(
      createRedmineCacheDocContext(this.runtimeHost()),
      taskId,
      updatedBy,
      opts,
    );
  }

  async writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
    await writeRedmineTask(createRedmineSyncContext(this.runtimeHost()), task, opts);
  }

  async writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void> {
    await writeRedmineTasks(createRedmineSyncContext(this.runtimeHost()), tasks, opts);
  }

  async sync(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void> {
    await syncRedmine(createRedmineSyncContext(this.runtimeHost()), opts);
  }
}

Object.assign(RedmineBackend.prototype, redmineBackendRuntimeMethods);
