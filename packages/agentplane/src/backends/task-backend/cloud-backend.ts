import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

import { loadDotEnv } from "../../shared/env.js";
import { isRecord } from "../../shared/guards.js";
import {
  BackendError,
  type TaskBackend,
  type TaskBackendInspectionResult,
  type TaskData,
  type TaskSummary,
  type TaskWriteOptions,
} from "./shared.js";
import type { LocalBackend } from "./local-backend.js";
import { buildCloudPullPlan, emitCloudPullDiffSummary, readOpenConflicts } from "./cloud-pull.js";
import {
  CLOUD_PUSH_BATCH_RETRY_DELAYS_MS,
  CLOUD_PUSH_BATCH_REQUEST_TIMEOUT_MS,
  CLOUD_PUSH_BATCH_TASK_BYTES,
  CLOUD_PULL_REQUEST_TIMEOUT_MS,
  CLOUD_REQUEST_TIMEOUT_MS,
  CLOUD_PUSH_DIRECT_BODY_LIMIT_BYTES,
  CloudHttpError,
  CloudNetworkError,
  cloudConfigOverrides,
  cloudConflictMessage,
  cloudHttpErrorMessage,
  cloudPushBatchFinalized,
  cloudNetworkErrorMessage,
  configureCloudFetchAddressSelection,
  createTimeoutSignal,
  isOptionalSyncStateFailure,
  isCloudRetriableError,
  isStale,
  normalizeCloudPullResponse,
  normalizePositiveInteger,
  readCloudJson,
  readCloudSyncStateDiagnostics,
  readSafeCommand,
  splitTasksByPayloadBytes,
  unavailableCloudSyncStateDiagnostics,
  type CloudConfigOverride,
  type CloudSyncStateDiagnostics,
  type CloudSyncResponse,
} from "./cloud-backend-utils.js";
import { sleep } from "./shared/concurrency.js";
import { firstNonEmptyString } from "./shared/strings.js";

export type CloudBackendSettings = {
  endpoint?: string;
  token?: string;
  project_id?: string;
  provider?: string;
  cache_dir?: string;
  stale_after_seconds?: number;
  state_path?: string;
};

type CloudSyncStateSnapshot = {
  conflicts: unknown[];
  safeCommand: string | null;
  unavailable: boolean;
  diagnostics: CloudSyncStateDiagnostics;
};

export class CloudBackend implements TaskBackend {
  id = "cloud";
  capabilities: TaskBackend["capabilities"] = {
    canonical_source: "remote",
    projection: "cache",
    projection_read_mode: "native",
    reads_from_projection_by_default: true,
    writes_task_readmes: true,
    supports_task_revisions: true,
    supports_revision_guarded_writes: true,
    may_access_network_on_read: false,
    may_access_network_on_write: true,
    supports_projection_refresh: true,
    supports_push_sync: true,
    supports_snapshot_export: false,
  } as const;

  endpoint: string;
  token: string;
  projectId: string;
  provider: string | null;
  cache: LocalBackend;
  statePath: string;
  staleAfterSeconds: number | null;
  private fetchImpl: typeof fetch;
  private readonly configOverrides: CloudConfigOverride[];

  constructor(
    settings: CloudBackendSettings,
    opts: { cache: LocalBackend; root: string; fetchImpl?: typeof fetch },
  ) {
    const endpoint = firstNonEmptyString(
      process.env.AGENTPLANE_CLOUD_ENDPOINT,
      settings.endpoint,
    ).replaceAll(/\/+$/gu, "");
    this.endpoint = endpoint;
    this.token = firstNonEmptyString(process.env.AGENTPLANE_CLOUD_TOKEN, settings.token);
    this.projectId = firstNonEmptyString(
      process.env.AGENTPLANE_CLOUD_PROJECT_ID,
      settings.project_id,
    );
    this.provider =
      firstNonEmptyString(process.env.AGENTPLANE_CLOUD_PROVIDER, settings.provider) || null;
    this.configOverrides = cloudConfigOverrides(settings, {
      AGENTPLANE_CLOUD_ENDPOINT: this.endpoint,
      AGENTPLANE_CLOUD_PROJECT_ID: this.projectId,
      AGENTPLANE_CLOUD_PROVIDER: this.provider ?? "",
    });
    this.cache = opts.cache;
    this.statePath = path.resolve(
      opts.root,
      firstNonEmptyString(settings.state_path, ".agentplane/backends/cloud/state.json"),
    );
    this.staleAfterSeconds = normalizePositiveInteger(settings.stale_after_seconds) ?? 300;
    if (!opts.fetchImpl) configureCloudFetchAddressSelection();
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  static async create(opts: {
    root: string;
    settings: CloudBackendSettings;
    cache: LocalBackend;
    fetchImpl?: typeof fetch;
  }): Promise<CloudBackend> {
    await loadDotEnv(opts.root);
    return new CloudBackend(opts.settings, {
      root: opts.root,
      cache: opts.cache,
      fetchImpl: opts.fetchImpl,
    });
  }

  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    return await this.cache.generateTaskId(opts);
  }
  async listTasks(): Promise<TaskData[]> {
    return await this.cache.listTasks();
  }
  async listProjectionTasks(): Promise<TaskSummary[]> {
    return await this.cache.listProjectionTasks();
  }
  getLastListWarnings(): string[] {
    return this.cache.getLastListWarnings();
  }
  async getTask(taskId: string): Promise<TaskData | null> {
    return await this.cache.getTask(taskId);
  }
  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    return await this.cache.getTasks(taskIds);
  }
  async getTaskDoc(taskId: string): Promise<string> {
    return await this.cache.getTaskDoc(taskId);
  }
  async assertLocalMutationReady(): Promise<void> {
    await this.assertProjectionFreshForLocalMutation();
  }

  async setTaskDoc(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await this.assertProjectionFreshForLocalMutation();
    await this.cache.setTaskDoc(taskId, doc, updatedBy, opts);
  }
  async touchTaskDocMetadata(
    taskId: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await this.assertProjectionFreshForLocalMutation();
    await this.cache.touchTaskDocMetadata(taskId, updatedBy, opts);
  }

  async writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
    await this.assertProjectionFreshForLocalMutation();
    await this.cache.writeTask(task, opts);
  }
  async writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void> {
    await this.assertProjectionFreshForLocalMutation();
    await this.cache.writeTasks(tasks, opts);
  }
  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    return await this.cache.normalizeTasks();
  }
  async refreshProjection(opts: {
    allowNetwork: boolean;
    quiet?: boolean;
    conflict?: "diff" | "prefer-local" | "prefer-remote" | "fail";
  }): Promise<void> {
    if (!opts.allowNetwork) {
      throw new BackendError(
        "Cloud projection refresh requires network access approval",
        "E_BACKEND",
      );
    }
    await this.sync({
      direction: "pull",
      conflict: opts.conflict ?? "prefer-remote",
      quiet: opts.quiet ?? true,
      confirm: opts.allowNetwork,
    });
  }

  async sync(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void> {
    this.assertConfigured();
    const localTasks = await this.cache.listTasks();
    const action = opts.direction === "pull" ? "pull" : "push";
    const state =
      opts.direction === "pull"
        ? await this.requestCloudSyncState(this.projectId)
        : {
            conflicts: [],
            safeCommand: null,
            unavailable: false,
            diagnostics: unavailableCloudSyncStateDiagnostics(false),
          };
    if (state.unavailable && !opts.quiet) {
      process.stderr.write(
        "Warning: cloud sync-state preflight is unavailable; continuing with pull endpoint conflict data.\n",
      );
    }
    if (opts.direction === "pull" && state.conflicts.length > 0 && opts.conflict === "fail") {
      throw new BackendError(
        cloudConflictMessage({
          conflicts: state.conflicts,
          safeCommand:
            state.safeCommand ?? "agentplane backend sync cloud --direction pull --conflict=diff",
        }),
        "E_BACKEND",
      );
    }
    const response =
      opts.direction === "push"
        ? await this.requestCloudPush(localTasks, opts)
        : await this.request<CloudSyncResponse>(
            `/v1/projects/${encodeURIComponent(this.projectId)}/sync/${action}`,
            {
              method: "POST",
              body: JSON.stringify({
                provider: this.provider,
                direction: opts.direction,
                conflict: opts.conflict,
              }),
            },
            { timeoutMs: CLOUD_PULL_REQUEST_TIMEOUT_MS },
          );
    const data = isRecord(response.data) ? response.data : {};
    const pull = normalizeCloudPullResponse(response, data);
    if (opts.direction === "pull") {
      const conflicts = [...state.conflicts, ...readOpenConflicts(pull.conflicts)];
      if (conflicts.length > 0 && opts.conflict === "fail") {
        throw new BackendError(
          cloudConflictMessage({
            conflicts,
            safeCommand: state.safeCommand ?? readSafeCommand(response, data),
          }),
          "E_BACKEND",
        );
      }
      if (pull.tasks === null && !pull.noProjectionChanges) {
        throw new BackendError(
          [
            "Cloud backend pull response did not include projection tasks.",
            "Why: the cloud service did not return response.tasks or response.data.tasks and did not mark the pull as a no-op.",
            "Fix: retry after the service exposes a projection payload or explicit no_projection_changes=true.",
            "Safe command: agentplane backend inspect cloud --yes",
            "Stop condition: stop if the service cannot provide a task projection contract.",
          ].join("\n"),
          "E_BACKEND",
        );
      }
      const plan = pull.tasks ? buildCloudPullPlan(localTasks, pull.tasks) : null;
      if (opts.conflict === "diff") {
        emitCloudPullDiffSummary({
          plan,
          conflicts,
          quiet: opts.quiet,
        });
        const hasPendingProjectionChanges = conflicts.length > 0 || (plan?.changed.length ?? 0) > 0;
        if (hasPendingProjectionChanges) return;
      } else if (plan && plan.changed.length > 0) {
        await this.cache.writeTasks(plan.changed);
      }
    }
    if (opts.direction === "pull") {
      await this.writeState({
        last_checked_at: pull.lastCheckedAt ?? new Date().toISOString(),
      });
      return;
    }
    if (!pull.lastCheckedAt) return;
    await this.writeState({
      last_checked_at: pull.lastCheckedAt,
    });
  }

  private async requestCloudSyncState(projectId: string): Promise<CloudSyncStateSnapshot> {
    const headers = this.cloudHeaders();
    let res: Response;
    try {
      res = await this.fetchImpl(
        `${this.endpoint}/v1/projects/${encodeURIComponent(projectId)}/sync/state`,
        {
          method: "GET",
          headers,
          signal: createTimeoutSignal(CLOUD_REQUEST_TIMEOUT_MS),
        },
      );
    } catch {
      return {
        conflicts: [],
        safeCommand: null,
        unavailable: true,
        diagnostics: unavailableCloudSyncStateDiagnostics(true),
      };
    }
    if (!res.ok) {
      if (isOptionalSyncStateFailure(res.status)) {
        return {
          conflicts: [],
          safeCommand: null,
          unavailable: true,
          diagnostics: unavailableCloudSyncStateDiagnostics(true),
        };
      }
      throw new BackendError(await cloudHttpErrorMessage(res), "E_BACKEND");
    }
    let response: Record<string, unknown>;
    try {
      response = await readCloudJson<Record<string, unknown>>(res, CLOUD_REQUEST_TIMEOUT_MS);
    } catch {
      return {
        conflicts: [],
        safeCommand: null,
        unavailable: true,
        diagnostics: unavailableCloudSyncStateDiagnostics(true),
      };
    }
    const data = isRecord(response.data) ? response.data : {};
    const conflicts = readOpenConflicts(
      response.openConflicts ??
        response.open_conflicts ??
        response.conflicts ??
        data.openConflicts ??
        data.open_conflicts ??
        data.conflicts,
    );
    return {
      conflicts,
      safeCommand:
        readSafeCommand(response, data) ??
        "agentplane backend sync cloud --direction pull --conflict=diff",
      unavailable: false,
      diagnostics: readCloudSyncStateDiagnostics(data, conflicts.length),
    };
  }

  private async requestCloudPush(
    localTasks: TaskData[],
    opts: {
      conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
      quiet: boolean;
    },
  ): Promise<CloudSyncResponse> {
    const directBody = JSON.stringify({
      provider: this.provider,
      direction: "push",
      conflict: opts.conflict,
      tasks: localTasks,
    });
    if (Buffer.byteLength(directBody, "utf8") <= CLOUD_PUSH_DIRECT_BODY_LIMIT_BYTES) {
      return await this.request<CloudSyncResponse>(
        `/v1/projects/${encodeURIComponent(this.projectId)}/sync/push`,
        { method: "POST", body: directBody },
        { timeoutMs: CLOUD_REQUEST_TIMEOUT_MS },
      );
    }

    const chunks = splitTasksByPayloadBytes(localTasks, CLOUD_PUSH_BATCH_TASK_BYTES);
    const batchId = `batch_${Date.now()}_${randomUUID()}`;
    let lastResponse: CloudSyncResponse | null = null;
    for (const [index, tasks] of chunks.entries()) {
      lastResponse = await this.requestCloudPushBatchChunk({
        batchId,
        chunkIndex: index,
        totalChunks: chunks.length,
        totalTasks: localTasks.length,
        tasks,
        conflict: opts.conflict,
        quiet: opts.quiet,
      });
      if (!opts.quiet) {
        process.stderr.write(
          `cloud push uploaded batch ${index + 1}/${chunks.length} tasks=${tasks.length}\n`,
        );
      }
      if (index === chunks.length - 1 && !cloudPushBatchFinalized(lastResponse)) {
        throw new BackendError(
          [
            "Cloud backend batch push did not finalize.",
            "Why: the service did not confirm that every expected chunk was received before replacing the projection.",
            "Fix: retry the cloud push; chunks are idempotent for one batch id during the run.",
            "Safe command: agentplane backend sync cloud --direction push --yes",
            "Stop condition: stop if the service repeatedly reports an incomplete batch after all chunks are uploaded.",
          ].join("\n"),
          "E_BACKEND",
        );
      }
    }
    return lastResponse ?? { data: { last_checked_at: new Date().toISOString() } };
  }

  private async requestCloudPushBatchChunk(opts: {
    batchId: string;
    chunkIndex: number;
    totalChunks: number;
    totalTasks: number;
    tasks: TaskData[];
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
  }): Promise<CloudSyncResponse> {
    const body = JSON.stringify({
      provider: this.provider,
      direction: "push",
      conflict: opts.conflict,
      batch: {
        id: opts.batchId,
        total_batches: opts.totalChunks,
        total_tasks: opts.totalTasks,
        chunk_index: opts.chunkIndex,
        finalize: opts.chunkIndex === opts.totalChunks - 1,
      },
      tasks: opts.tasks,
    });
    for (let attempt = 0; ; attempt += 1) {
      try {
        return await this.request<CloudSyncResponse>(
          `/v1/projects/${encodeURIComponent(this.projectId)}/sync/push-batch`,
          { method: "POST", body },
          { timeoutMs: CLOUD_PUSH_BATCH_REQUEST_TIMEOUT_MS },
        );
      } catch (error) {
        if (!isCloudRetriableError(error) || attempt >= CLOUD_PUSH_BATCH_RETRY_DELAYS_MS.length) {
          throw error;
        }
        const delayMs = CLOUD_PUSH_BATCH_RETRY_DELAYS_MS[attempt] ?? 0;
        if (!opts.quiet) {
          process.stderr.write(
            `cloud push retrying batch ${opts.chunkIndex + 1}/${opts.totalChunks} after transient error attempt=${attempt + 1}\n`,
          );
        }
        await sleep(delayMs);
      }
    }
  }

  async inspectConfiguration(): Promise<TaskBackendInspectionResult> {
    const missing = this.missingConfigKeys();
    const state = await this.readState();
    const syncState =
      missing.length === 0
        ? await this.requestCloudSyncState(this.projectId).catch(() => null)
        : null;
    return {
      backendId: this.id,
      visibleCustomFields: [],
      canonicalState: { configuredFieldId: null, visibleFieldId: null },
      configuredFieldNameDrift: [],
      connection: {
        endpoint: this.endpoint || null,
        projectId: this.projectId || null,
        connected: missing.length === 0,
        missing,
        provider: this.provider,
        envOverrides: this.configOverrides,
        syncState: syncState?.diagnostics ?? null,
      },
      freshness: {
        lastCheckedAt: state.last_checked_at,
        staleAfterSeconds: this.staleAfterSeconds,
        stale: isStale(state.last_checked_at, this.staleAfterSeconds),
        statePath: this.statePath,
      },
    };
  }

  private async request<T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) {
    const headers = this.cloudHeaders();
    for (const [key, value] of new Headers(init.headers)) {
      headers.set(key, value);
    }

    let res: Response;
    try {
      res = await this.fetchImpl(`${this.endpoint}${pathname}`, {
        ...init,
        headers,
        signal: init.signal ?? createTimeoutSignal(opts?.timeoutMs ?? CLOUD_REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      throw new CloudNetworkError(cloudNetworkErrorMessage(error, opts?.timeoutMs));
    }
    if (!res.ok) {
      throw new CloudHttpError(await cloudHttpErrorMessage(res), res.status);
    }
    return await readCloudJson<T>(res, opts?.timeoutMs);
  }

  private cloudHeaders(): Headers {
    return new Headers({
      "content-type": "application/json",
      authorization: `Bearer ${this.token}`,
    });
  }

  private async assertProjectionFreshForLocalMutation(): Promise<void> {
    const state = await this.readState();
    if (!isStale(state.last_checked_at, this.staleAfterSeconds)) return;
    throw new BackendError(
      [
        "Cloud projection is stale; refusing local task mutation.",
        "Why: the active cloud backend projection may not include recent remote task changes.",
        "Fix: pull the cloud projection before mutating local task state.",
        "Safe command: agentplane backend sync cloud --direction pull",
        "Stop condition: stop if pull reports open conflicts or cannot refresh the projection.",
      ].join("\n"),
      "E_BACKEND",
    );
  }

  private assertConfigured(): void {
    const missing = this.missingConfigKeys();
    if (missing.length > 0) {
      throw new BackendError(
        `Cloud backend is not configured: missing ${missing.join(", ")}`,
        "E_BACKEND",
      );
    }
  }

  private missingConfigKeys(): string[] {
    const required = [
      [this.endpoint, "AGENTPLANE_CLOUD_ENDPOINT"],
      [this.token, "AGENTPLANE_CLOUD_TOKEN"],
      [this.projectId, "AGENTPLANE_CLOUD_PROJECT_ID"],
    ] as const;
    return required.flatMap(([value, key]) => (value ? [] : [key]));
  }
  private async readState(): Promise<{ last_checked_at: string | null }> {
    try {
      const raw = JSON.parse(await readFile(this.statePath, "utf8")) as {
        last_checked_at?: unknown;
      } | null;
      const lastCheckedAt = raw && typeof raw === "object" ? raw.last_checked_at : null;
      if (typeof lastCheckedAt === "string") return { last_checked_at: lastCheckedAt };
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code !== "ENOENT") throw err;
    }
    return { last_checked_at: null };
  }

  private async writeState(state: { last_checked_at: string }): Promise<void> {
    await mkdir(path.dirname(this.statePath), { recursive: true });
    await writeFile(this.statePath, `${JSON.stringify(state, null, 2)}\n`);
  }
}
