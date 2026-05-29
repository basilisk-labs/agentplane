import path from "node:path";

import { loadDotEnv, type DotEnvLoadResult } from "../../shared/env.js";
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
import { cloudPendingPushReason, pendingCloudPushError } from "./cloud-pending-push.js";
import type { CloudBackendSettings } from "./cloud-backend-settings.js";
import { cloudBackendCapabilities } from "./cloud-backend-capabilities.js";
import {
  assertCloudBackendConfigured,
  inspectCloudBackendConfiguration,
  missingCloudConfigKeys,
} from "./cloud-backend-inspect.js";
import { normalizeCloudRemoteCreatePolicy, type CloudRemoteCreatePolicy } from "./cloud-pull.js";
import { buildCloudHeaders, requestCloudBackendJson } from "./cloud-backend-request.js";
import {
  performCloudBackendSync,
  requestCloudSyncStateSnapshot,
  type CloudSyncStateSnapshot,
} from "./cloud-backend-sync.js";
import { refreshCloudProjectionBeforeTaskStart } from "./cloud-start-refresh.js";
import {
  cloudConfigOverrides,
  configureCloudFetchAddressSelection,
  isStale,
  normalizePositiveInteger,
  type CloudConfigOverride,
} from "./cloud-backend-utils.js";
import { firstNonEmptyString } from "./shared/strings.js";

export type { CloudBackendSettings } from "./cloud-backend-settings.js";

export class CloudBackend implements TaskBackend {
  id = "cloud";
  capabilities: TaskBackend["capabilities"] = cloudBackendCapabilities;
  endpoint: string;
  token: string;
  projectId: string;
  provider: string | null;
  remoteCreatePolicy: CloudRemoteCreatePolicy;
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
  private readonly autoSyncPullOnStartReady: boolean;
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
    this.remoteCreatePolicy = normalizeCloudRemoteCreatePolicy(
      firstNonEmptyString(
        process.env.AGENTPLANE_CLOUD_REMOTE_CREATE_POLICY,
        settings.remote_create_policy,
      ),
    );
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
    this.autoSyncPullOnStartReady = settings.autosync_pull_on_start_ready ?? true;
    this.autoSyncPushOnWrite = settings.autosync_push_on_write ?? this.autoPushOnMutation;
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

  async refreshProjectionBeforeTaskStart(): Promise<void> {
    await refreshCloudProjectionBeforeTaskStart({
      autoSyncEnabled: this.autoSyncEnabled,
      autoSyncPullOnStartReady: this.autoSyncPullOnStartReady,
      autoSyncNetworkAllowed: this.autoSyncNetworkAllowed,
      missingConfigKeys: this.missingConfigKeys.bind(this),
      projectId: this.projectId,
      statePath: this.statePath,
      requestCloudSyncState: this.requestCloudSyncState.bind(this),
      sync: this.sync.bind(this),
    });
  }

  async sync(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void> {
    this.assertConfigured();
    await performCloudBackendSync(
      {
        provider: this.provider,
        projectId: this.projectId,
        statePath: this.statePath,
        cache: this.cache,
        request: this.request.bind(this),
        readState: this.readState.bind(this),
        clearPendingPush: this.clearPendingPush.bind(this),
        assertNoPendingPushForPull: this.assertNoPendingPushForPull.bind(this),
        requestCloudSyncState: this.requestCloudSyncState.bind(this),
      },
      {
        direction: opts.direction,
        conflict: opts.conflict,
        quiet: opts.quiet,
        remoteCreatePolicy: this.remoteCreatePolicy,
      },
    );
  }

  private async requestCloudSyncState(projectId: string): Promise<CloudSyncStateSnapshot> {
    return await requestCloudSyncStateSnapshot({
      endpoint: this.endpoint,
      projectId,
      fetchImpl: this.fetchImpl,
      headers: buildCloudHeaders(this.token),
    });
  }

  async inspectConfiguration(): Promise<TaskBackendInspectionResult> {
    return await inspectCloudBackendConfiguration({
      config: this.configSnapshot(),
      requestCloudSyncState: this.requestCloudSyncState.bind(this),
    });
  }

  private async request<T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) {
    return await requestCloudBackendJson<T>({
      endpoint: this.endpoint,
      token: this.token,
      fetchImpl: this.fetchImpl,
      pathname,
      init,
      timeoutMs: opts?.timeoutMs,
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
      last_start_ready_pull_at: state.last_start_ready_pull_at,
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
      last_start_ready_pull_at: state.last_start_ready_pull_at,
      pending_push: null,
    });
  }

  private assertConfigured(): void {
    assertCloudBackendConfigured(this.configSnapshot());
  }

  private missingConfigKeys(): string[] {
    return missingCloudConfigKeys(this.configSnapshot());
  }

  private configSnapshot() {
    return {
      endpoint: this.endpoint,
      token: this.token,
      projectId: this.projectId,
      provider: this.provider,
      statePath: this.statePath,
      staleAfterSeconds: this.staleAfterSeconds,
      configOverrides: this.configOverrides,
      dotEnv: this.dotEnv,
    };
  }
}
