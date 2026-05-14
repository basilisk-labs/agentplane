import path from "node:path";

import { loadDotEnv, type DotEnvLoadResult } from "../../shared/env.js";
import { isRecord } from "../../shared/guards.js";
import { readCloudBackendState, writeCloudBackendState } from "./cloud-backend-state.js";
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
import { cloudPendingPushReason, pendingCloudPushError } from "./cloud-pending-push.js";
import type { CloudBackendSettings } from "./cloud-backend-settings.js";
import { requestCloudPush } from "./cloud-backend-push.js";
import {
  CLOUD_PULL_REQUEST_TIMEOUT_MS,
  CLOUD_REQUEST_TIMEOUT_MS,
  CloudHttpError,
  CloudNetworkError,
  cloudConfigOverrides,
  cloudConflictMessage,
  cloudHttpErrorMessage,
  cloudNetworkErrorMessage,
  configureCloudFetchAddressSelection,
  createTimeoutSignal,
  isOptionalSyncStateFailure,
  isStale,
  normalizeCloudPullResponse,
  normalizePositiveInteger,
  readCloudJson,
  readCloudSyncStateDiagnostics,
  readSafeCommand,
  unavailableCloudSyncStateDiagnostics,
  type CloudConfigOverride,
  type CloudSyncStateDiagnostics,
  type CloudSyncResponse,
} from "./cloud-backend-utils.js";
import { firstNonEmptyString } from "./shared/strings.js";

export type { CloudBackendSettings } from "./cloud-backend-settings.js";

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
    may_access_network_on_read: true,
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
  autoPushOnMutation: boolean;
  private fetchImpl: typeof fetch;
  private readonly configOverrides: CloudConfigOverride[];
  private readonly dotEnv: Pick<DotEnvLoadResult, "root" | "path" | "loaded">;
  private readonly autoSyncNetworkAllowed: boolean;
  private readonly autoSyncEnabled: boolean;
  private readonly autoSyncPullOnRead: boolean;
  private readonly autoSyncPullOnWrite: boolean;
  private readonly autoSyncPushOnWrite: boolean;
  constructor(
    settings: CloudBackendSettings,
    opts: {
      cache: LocalBackend;
      root: string;
      fetchImpl?: typeof fetch;
      dotEnv?: Pick<DotEnvLoadResult, "root" | "path" | "loaded">;
      autoSyncNetworkAllowed?: boolean;
    },
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
    this.autoPushOnMutation =
      process.env.AGENTPLANE_CLOUD_AUTO_PUSH_ON_MUTATION === "1" ||
      process.env.AGENTPLANE_CLOUD_AUTO_PUSH_ON_MUTATION === "true" ||
      settings.auto_push_on_mutation === true;
    this.configOverrides = cloudConfigOverrides(settings, {
      AGENTPLANE_CLOUD_ENDPOINT: this.endpoint,
      AGENTPLANE_CLOUD_PROJECT_ID: this.projectId,
      AGENTPLANE_CLOUD_PROVIDER: this.provider ?? "",
    });
    this.cache = opts.cache;
    const statePath = firstNonEmptyString(
      settings.state_path,
      ".agentplane/backends/cloud/state.json",
    );
    this.statePath = path.resolve(opts.root, statePath);
    this.dotEnv = opts.dotEnv ?? {
      root: opts.root,
      path: path.join(opts.root, ".env"),
      loaded: false,
    };
    this.staleAfterSeconds = normalizePositiveInteger(settings.stale_after_seconds) ?? 300;
    if (!opts.fetchImpl) configureCloudFetchAddressSelection();
    this.fetchImpl = opts.fetchImpl ?? fetch;

    this.autoSyncNetworkAllowed = opts.autoSyncNetworkAllowed === true;
    this.autoSyncEnabled = settings.autosync_enabled ?? this.autoSyncNetworkAllowed;
    this.autoSyncPullOnRead = settings.autosync_pull_on_read ?? true;
    this.autoSyncPullOnWrite = settings.autosync_pull_on_write ?? true;
    this.autoSyncPushOnWrite = settings.autosync_push_on_write ?? true;
  }
  static async create(opts: {
    root: string;
    settings: CloudBackendSettings;
    cache: LocalBackend;
    fetchImpl?: typeof fetch;
    autoSyncNetworkAllowed?: boolean;
  }): Promise<CloudBackend> {
    const dotEnv = await loadDotEnv(opts.root);
    return new CloudBackend(opts.settings, {
      root: opts.root,
      cache: opts.cache,
      fetchImpl: opts.fetchImpl,
      dotEnv,
      autoSyncNetworkAllowed: opts.autoSyncNetworkAllowed,
    });
  }
  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    return await this.cache.generateTaskId(opts);
  }
  async listTasks(): Promise<TaskData[]> {
    await this.maybeAutoPull({ mode: "read", reason: "list_tasks" });
    return await this.cache.listTasks();
  }
  async listProjectionTasks(): Promise<TaskSummary[]> {
    await this.maybeAutoPull({ mode: "read", reason: "list_projection" });
    return await this.cache.listProjectionTasks();
  }
  getLastListWarnings(): string[] {
    return this.cache.getLastListWarnings();
  }
  async getTask(taskId: string): Promise<TaskData | null> {
    await this.maybeAutoPull({ mode: "read", reason: "get_task" });
    return await this.cache.getTask(taskId);
  }
  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    await this.maybeAutoPull({ mode: "read", reason: "get_tasks" });
    return await this.cache.getTasks(taskIds);
  }
  async getTaskDoc(taskId: string): Promise<string> {
    await this.maybeAutoPull({ mode: "read", reason: "get_task_doc" });
    return await this.cache.getTaskDoc(taskId);
  }
  async assertLocalMutationReady(): Promise<void> {
    await this.ensureProjectionFreshForLocalMutation({ reason: "assert_local_mutation_ready" });
  }
  async setTaskDoc(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await this.ensureProjectionFreshForLocalMutation({ reason: "set_task_doc" });
    await this.cache.setTaskDoc(taskId, doc, updatedBy, opts);
    await this.maybeAutoPush();
  }
  async touchTaskDocMetadata(
    taskId: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await this.ensureProjectionFreshForLocalMutation({ reason: "touch_task_doc_metadata" });
    await this.cache.touchTaskDocMetadata(taskId, updatedBy, opts);
    await this.maybeAutoPush();
  }
  async writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
    await this.ensureProjectionFreshForLocalMutation({ reason: "write_task" });
    await this.cache.writeTask(task, opts);
    await this.maybeAutoPush();
  }
  async writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void> {
    await this.ensureProjectionFreshForLocalMutation({ reason: "write_tasks" });
    await this.cache.writeTasks(tasks, opts);
    await this.maybeAutoPush();
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
        ? await requestCloudPush({
            provider: this.provider,
            projectId: this.projectId,
            localTasks,
            conflict: opts.conflict,
            quiet: opts.quiet,
            request: this.request.bind(this),
          })
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
        const hasPendingTaskSetChanges =
          (plan?.added.length ?? 0) > 0 || (plan?.removedIds.length ?? 0) > 0;
        if (hasPendingProjectionChanges || hasPendingTaskSetChanges) return;
      } else if (plan && opts.conflict === "prefer-remote") {
        await this.assertNoPendingPushForPull();
        if (plan.changed.length > 0 || plan.added.length > 0) {
          await this.cache.writeTasks([...plan.changed, ...plan.added]);
        }
        await Promise.all(plan.removedIds.map((taskId) => this.cache.deleteTask(taskId)));
      }
    }
    if (opts.direction === "pull") {
      if (pull.lastCheckedAt) {
        await writeCloudBackendState(this.statePath, {
          last_checked_at: pull.lastCheckedAt,
          pending_push: null,
        });
      }
      return;
    }
    if (!pull.lastCheckedAt) {
      await this.clearPendingPush();
      return;
    }
    await writeCloudBackendState(this.statePath, {
      last_checked_at: pull.lastCheckedAt,
      pending_push: null,
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

  async inspectConfiguration(): Promise<TaskBackendInspectionResult> {
    const missing = this.missingConfigKeys();
    const state = await readCloudBackendState(this.statePath);
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
        pendingPush: state.pending_push,
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

  private async readState() {
    return await readCloudBackendState(this.statePath);
  }

  private async ensureProjectionFreshForLocalMutation(opts: { reason: string }): Promise<void> {
    const state = await this.readState();
    if (state.pending_push) {
      throw pendingCloudPushError(state.pending_push);
    }
    if (!isStale(state.last_checked_at, this.staleAfterSeconds)) return;

    if (this.autoSyncEnabled && this.autoSyncPullOnWrite) {
      await this.maybeAutoPull({ mode: "write", reason: `mutation_preflight:${opts.reason}` });
      const refreshed = await this.readState();
      if (refreshed.pending_push) {
        throw pendingCloudPushError(refreshed.pending_push);
      }
      if (!isStale(refreshed.last_checked_at, this.staleAfterSeconds)) return;
    }

    throw new BackendError(
      [
        "Cloud projection is stale; refusing local task mutation.",
        "Why: the active cloud backend projection may not include recent remote task changes.",
        "Fix: pull the cloud projection before mutating local task state.",
        "Safe command: agentplane backend sync cloud --direction pull --yes",
        "Stop condition: stop if pull reports open conflicts or cannot refresh the projection.",
      ].join("\n"),
      "E_BACKEND",
    );
  }

  private async maybeAutoPull(opts: { mode: "read" | "write"; reason: string }): Promise<void> {
    if (!this.autoSyncEnabled) return;
    if (opts.mode === "read" && !this.autoSyncPullOnRead) return;
    if (opts.mode === "write" && !this.autoSyncPullOnWrite) return;
    if (!this.autoSyncNetworkAllowed) return;
    if (this.missingConfigKeys().length > 0) return;
    const state = await this.readState();
    if (!isStale(state.last_checked_at, this.staleAfterSeconds)) return;
    await this.sync({
      direction: "pull",
      conflict: "fail",
      quiet: true,
      confirm: true,
    });
  }

  private async maybeAutoPush(): Promise<void> {
    if (!this.autoSyncEnabled || !this.autoSyncPushOnWrite) return;
    if (!this.autoSyncNetworkAllowed) return;
    if (this.missingConfigKeys().length > 0) return;
    try {
      await this.sync({
        direction: "push",
        conflict: "fail",
        quiet: true,
        confirm: true,
      });
    } catch (error) {
      await this.markPendingPush(error);
      throw error;
    }
  }

  private async assertNoPendingPushForPull(): Promise<void> {
    const state = await this.readState();
    if (state.pending_push) {
      throw pendingCloudPushError(state.pending_push);
    }
  }

  private async markPendingPush(error: unknown): Promise<void> {
    const state = await this.readState();
    await writeCloudBackendState(this.statePath, {
      last_checked_at: state.last_checked_at,
      pending_push: {
        failed_at: new Date().toISOString(),
        reason: cloudPendingPushReason(error),
      },
    });
  }

  private async clearPendingPush(): Promise<void> {
    const state = await this.readState();
    if (!state.pending_push) return;
    await writeCloudBackendState(this.statePath, {
      last_checked_at: state.last_checked_at,
      pending_push: null,
    });
  }

  private assertConfigured(): void {
    const missing = this.missingConfigKeys();
    if (missing.length > 0) {
      throw new BackendError(
        [
          `Cloud backend is not configured: missing ${missing.join(", ")}`,
          `Canonical env root: ${this.dotEnv.root}`,
          `Checked .env: ${this.dotEnv.path}${this.dotEnv.loaded ? "" : " (not found)"}`,
          "Fix: add the missing AGENTPLANE_CLOUD_* values to the canonical repository root .env or export them explicitly in the shell.",
        ].join("\n"),
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
}
