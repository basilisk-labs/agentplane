import path from "node:path";

import { loadDotEnv, type DotEnvLoadResult } from "../../shared/env.js";
import {
  cloudBackendStateFromSyncCheckpoint,
  readContainedCloudBackendSyncCheckpoint,
  type CloudBackendSyncCheckpoint,
} from "./cloud-backend-state.js";
import {
  BackendError,
  type TaskBackend,
  type TaskBackendInspectionResult,
  type TaskBackendProjectionObservation,
  type TaskBackendProjectionTransition,
  type TaskBackendProjectionTransitionHooks,
  type TaskData,
  type TaskSummary,
  type TaskWriteResult,
  type TaskWriteOptions,
} from "./shared.js";
import {
  observeCloudProjection,
  runCloudProjectionTransition,
} from "./cloud-projection-transition.js";
import type { LocalBackend } from "./local-backend.js";
import { cloudPendingPushReason, pendingCloudPushError } from "./cloud-pending-push.js";
import { ensureCloudProjectionFreshForLocalMutation } from "./cloud-mutation-readiness.js";
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
  CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS,
  cloudConfigOverrides,
  configureCloudFetchAddressSelection,
  isStale,
  normalizePositiveInteger,
  type CloudConfigOverride,
} from "./cloud-backend-utils.js";
import { cloudProjectionIdentitySha256 } from "./cloud-projection-identity.js";
import * as coord from "./cloud-backend-coordination.js";
import {
  cloudProjectionApplyIncompleteError,
  resolveCloudSyncProjectionIdentity,
  type CloudSyncIdentityOrigin,
  type CloudSyncIdentityTransition,
} from "./cloud-sync-identity.js";
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
  private readonly repositoryRoot: string;
  private readonly autoSyncNetworkAllowed: boolean;
  private readonly autoSyncEnabled: boolean;
  private readonly autoSyncPullOnRead: boolean;
  private readonly autoSyncPullOnWrite: boolean;
  private readonly autoSyncPullOnStartReady: boolean;
  private readonly autoSyncPushOnWrite: boolean;
  private readonly projectionIdentitySha256: string;
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
    this.endpoint = firstNonEmptyString(
      process.env.AGENTPLANE_CLOUD_ENDPOINT,
      settings.endpoint,
    ).replaceAll(/\/+$/gu, "");
    this.token = firstNonEmptyString(process.env.AGENTPLANE_CLOUD_TOKEN, settings.token);
    this.projectId = firstNonEmptyString(
      process.env.AGENTPLANE_CLOUD_PROJECT_ID,
      settings.project_id,
    );
    this.provider =
      firstNonEmptyString(process.env.AGENTPLANE_CLOUD_PROVIDER, settings.provider) || null;
    this.projectionIdentitySha256 = cloudProjectionIdentitySha256({
      endpoint: this.endpoint,
      projectId: this.projectId,
      provider: this.provider,
    });
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
    this.repositoryRoot = path.resolve(opts.root);
    const statePath = firstNonEmptyString(
      settings.state_path,
      ".agentplane/backends/cloud/state.json",
    );
    this.statePath = path.resolve(this.repositoryRoot, statePath);
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
    return await this.withProjectionOperation("list-tasks", async () => {
      await this.maybeAutoPullUnlocked({ mode: "read", reason: "list_tasks" });
      return await this.cache.listTasks();
    });
  }
  async listProjectionTasks(): Promise<TaskSummary[]> {
    return await this.withProjectionOperation("list-projection-tasks", async () => {
      await this.maybeAutoPullUnlocked({ mode: "read", reason: "list_projection" });
      return await this.cache.listProjectionTasks();
    });
  }
  getLastListWarnings(): string[] {
    return this.cache.getLastListWarnings();
  }
  async observeProjection(): Promise<TaskBackendProjectionObservation> {
    return await this.withProjectionOperation(
      "observe-projection",
      this.observeProjectionUnlocked.bind(this),
    );
  }
  async getTask(taskId: string): Promise<TaskData | null> {
    return await this.withProjectionOperation("get-task", async () => {
      await this.maybeAutoPullUnlocked({ mode: "read", reason: "get_task" });
      return await this.cache.getTask(taskId);
    });
  }
  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    return await this.withProjectionOperation("get-tasks", async () => {
      await this.maybeAutoPullUnlocked({ mode: "read", reason: "get_tasks" });
      return await this.cache.getTasks(taskIds);
    });
  }
  async getTaskDoc(taskId: string): Promise<string> {
    return await this.withProjectionOperation("get-task-doc", async () => {
      await this.maybeAutoPullUnlocked({ mode: "read", reason: "get_task_doc" });
      return await this.cache.getTaskDoc(taskId);
    });
  }
  async assertLocalMutationReady(): Promise<void> {
    await this.withProjectionOperation("assert-local-mutation-ready", async () => {
      await this.ensureProjectionFreshForLocalMutation({ reason: "assert_local_mutation_ready" });
    });
  }
  async setTaskDoc(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await this.withProjectionOperation("set-task-doc", async () => {
      await this.ensureProjectionFreshForLocalMutation({ reason: "set_task_doc" });
      await this.markLocalProjectionDirty("set_task_doc");
      await this.cache.setTaskDoc(taskId, doc, updatedBy, opts);
      await this.maybeAutoPushUnlocked();
    });
  }
  async touchTaskDocMetadata(
    taskId: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await this.withProjectionOperation("touch-task-doc-metadata", async () => {
      await this.ensureProjectionFreshForLocalMutation({ reason: "touch_task_doc_metadata" });
      await this.markLocalProjectionDirty("touch_task_doc_metadata");
      await this.cache.touchTaskDocMetadata(taskId, updatedBy, opts);
      await this.maybeAutoPushUnlocked();
    });
  }
  async writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
    await this.writeTaskWithResult(task, opts);
  }
  async writeTaskWithResult(task: TaskData, opts?: TaskWriteOptions): Promise<TaskWriteResult> {
    return await this.withProjectionOperation("write-task", async () => {
      return await this.writeTaskUnlocked(task, opts);
    });
  }
  async writeTaskWithProjectionTransition<T>(
    task: TaskData,
    opts: TaskWriteOptions | undefined,
    hooks: TaskBackendProjectionTransitionHooks<T>,
  ): Promise<TaskBackendProjectionTransition<T>> {
    return await this.withProjectionOperation("write-task-with-projection-transition", async () => {
      return await runCloudProjectionTransition({
        hooks,
        observe: this.observeProjectionUnlocked.bind(this),
        assertFresh: async () => {
          await this.ensureProjectionFreshForLocalMutation({ reason: "write_task" });
        },
        writeAndPush: async () => {
          await this.markLocalProjectionDirty("write_task");
          await this.cache.writeTask(task, opts);
          await this.maybeAutoPushUnlocked();
        },
      });
    });
  }
  async writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void> {
    await this.withProjectionOperation("write-tasks", async () => {
      await this.ensureProjectionFreshForLocalMutation({ reason: "write_tasks" });
      await this.markLocalProjectionDirty("write_tasks");
      await this.cache.writeTasks(tasks, opts);
      await this.maybeAutoPushUnlocked();
    });
  }
  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    return await this.withProjectionOperation("normalize-tasks", async () => {
      await this.ensureProjectionFreshForLocalMutation({ reason: "normalize_tasks" });
      const createdDirtyMarker = await this.markLocalProjectionDirty("normalize_tasks");
      const result = await this.cache.normalizeTasks();
      if (result.changed > 0) {
        await this.maybeAutoPushUnlocked();
      } else if (createdDirtyMarker) {
        await this.clearPendingPush();
      }
      return result;
    });
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
      identityOrigin: "automatic",
      identityTransition: "routine",
    });
  }
  async refreshProjectionBeforeTaskStart(): Promise<void> {
    await this.withProjectionOperation("task-start-refresh", async () => {
      await refreshCloudProjectionBeforeTaskStart({
        autoSyncEnabled: this.autoSyncEnabled,
        autoSyncPullOnStartReady: this.autoSyncPullOnStartReady,
        autoSyncNetworkAllowed: this.autoSyncNetworkAllowed,
        missingConfigKeys: () => missingCloudConfigKeys(this.configSnapshot()),
        projectId: this.projectId,
        projectionIdentitySha256: this.projectionIdentitySha256,
        readState: this.readState.bind(this),
        commitState: async (update) => {
          await coord.commitCloudBackendStateUpdate(this.stateCoordination(), update);
        },
        requestCloudSyncState: this.requestCloudSyncState.bind(this),
        assertSyncIdentityReady: async () => {
          await this.resolveSyncIdentity({
            direction: "pull",
            conflict: "prefer-remote",
            identityOrigin: "automatic",
            identityTransition: "routine",
          });
        },
        sync: async (syncOpts) => {
          await this.syncUnlocked({
            ...syncOpts,
            identityOrigin: "automatic",
            identityTransition: "routine",
          });
        },
      });
    });
  }
  async sync(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
    identityOrigin?: CloudSyncIdentityOrigin;
    identityTransition?: CloudSyncIdentityTransition;
    timeoutMs?: number;
    syncStateTimeoutMs?: number;
  }): Promise<void> {
    await this.withProjectionOperation(`sync-${opts.direction}`, async () => {
      await this.syncUnlocked(opts);
    });
  }
  private async syncUnlocked(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
    identityOrigin?: CloudSyncIdentityOrigin;
    identityTransition?: CloudSyncIdentityTransition;
    timeoutMs?: number;
    syncStateTimeoutMs?: number;
  }): Promise<void> {
    assertCloudBackendConfigured(this.configSnapshot());
    const initialCheckpoint = await this.readSyncCheckpoint();
    const identityDecision = await this.resolveSyncIdentity(
      {
        direction: opts.direction,
        conflict: opts.conflict,
        identityOrigin: opts.identityOrigin ?? "explicit",
        identityTransition: opts.identityTransition ?? "routine",
      },
      initialCheckpoint,
    );
    const checkpointGuard = coord.createCloudSyncCheckpointGuard({
      initialCheckpoint,
      repositoryRoot: this.repositoryRoot,
      statePath: this.statePath,
    });
    await performCloudBackendSync(
      {
        provider: this.provider,
        projectId: this.projectId,
        projectionIdentitySha256: this.projectionIdentitySha256,
        repositoryRoot: this.repositoryRoot,
        cache: this.cache,
        request: this.request.bind(this),
        readState: this.readState.bind(this),
        ...checkpointGuard,
        assertNoPendingPushForPull: this.assertNoPendingPushForPull.bind(this),
        requestCloudSyncState: this.requestCloudSyncState.bind(this),
      },
      {
        direction: opts.direction,
        conflict: opts.conflict,
        quiet: opts.quiet,
        timeoutMs: opts.timeoutMs,
        syncStateTimeoutMs: opts.syncStateTimeoutMs,
        remoteCreatePolicy: this.remoteCreatePolicy,
        bindProjectionIdentity: identityDecision.bindProjectionIdentity,
        projectionApply: identityDecision.projectionApply,
        projectionApplyRequiresAdoption: identityDecision.projectionApplyRequiresAdoption,
      },
    );
  }
  private async requestCloudSyncState(
    projectId: string,
    opts?: { timeoutMs?: number },
  ): Promise<CloudSyncStateSnapshot> {
    return await requestCloudSyncStateSnapshot({
      endpoint: this.endpoint,
      projectId,
      fetchImpl: this.fetchImpl,
      headers: buildCloudHeaders(this.token),
      timeoutMs: opts?.timeoutMs,
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
    return cloudBackendStateFromSyncCheckpoint(await this.readSyncCheckpoint());
  }
  private async observeProjectionUnlocked(): Promise<TaskBackendProjectionObservation> {
    return await observeCloudProjection({
      readState: this.readState.bind(this),
      staleAfterSeconds: this.staleAfterSeconds,
      provider: this.provider,
      projectId: this.projectId,
      projectionIdentitySha256: this.projectionIdentitySha256,
    });
  }
  private async readSyncCheckpoint() {
    return await readContainedCloudBackendSyncCheckpoint({
      repositoryRoot: this.repositoryRoot,
      statePath: this.statePath,
    });
  }
  private async resolveSyncIdentity(
    opts: {
      direction: "push" | "pull";
      conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
      identityOrigin: CloudSyncIdentityOrigin;
      identityTransition: CloudSyncIdentityTransition;
    },
    checkpoint?: CloudBackendSyncCheckpoint,
  ) {
    return resolveCloudSyncProjectionIdentity({
      ...opts,
      checkpoint: checkpoint ?? (await this.readSyncCheckpoint()),
      projectionIdentitySha256: this.projectionIdentitySha256,
      origin: opts.identityOrigin,
      transition: opts.identityTransition,
    });
  }
  private async ensureProjectionFreshForLocalMutation(opts: { reason: string }): Promise<void> {
    await ensureCloudProjectionFreshForLocalMutation(
      {
        autoSyncEnabled: this.autoSyncEnabled,
        autoSyncPullOnWrite: this.autoSyncPullOnWrite,
        projectionIdentitySha256: this.projectionIdentitySha256,
        staleAfterSeconds: this.staleAfterSeconds,
        readState: this.readState.bind(this),
        maybeAutoPull: this.maybeAutoPullUnlocked.bind(this),
      },
      opts,
    );
  }
  private async writeTaskUnlocked(
    task: TaskData,
    opts?: TaskWriteOptions,
  ): Promise<TaskWriteResult> {
    await this.ensureProjectionFreshForLocalMutation({ reason: "write_task" });
    await this.markLocalProjectionDirty("write_task");
    const result = await this.cache.writeTaskWithResult(task, opts);
    await this.maybeAutoPushUnlocked();
    return result;
  }
  private async maybeAutoPullUnlocked(opts: {
    mode: "read" | "write";
    reason: string;
  }): Promise<void> {
    const state = await this.readState();
    if (state.pending_projection_apply) throw cloudProjectionApplyIncompleteError();
    if (!this.autoSyncEnabled) return;
    if (opts.mode === "read" && !this.autoSyncPullOnRead) return;
    if (opts.mode === "write" && !this.autoSyncPullOnWrite) return;
    if (!this.autoSyncNetworkAllowed) return;
    if (missingCloudConfigKeys(this.configSnapshot()).length > 0) return;
    if (
      state.projection_identity_sha256 === this.projectionIdentitySha256 &&
      !isStale(state.last_checked_at, this.staleAfterSeconds)
    ) {
      return;
    }
    await this.syncUnlocked({
      direction: "pull",
      conflict: "fail",
      quiet: true,
      confirm: true,
      identityOrigin: "automatic",
      identityTransition: "routine",
      timeoutMs: CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS,
      syncStateTimeoutMs: CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS,
    });
  }
  private async maybeAutoPushUnlocked(): Promise<void> {
    if (!this.autoSyncEnabled || !this.autoSyncPushOnWrite) return;
    if (!this.autoSyncNetworkAllowed) return;
    if (missingCloudConfigKeys(this.configSnapshot()).length > 0) return;
    try {
      await this.syncUnlocked({
        direction: "push",
        conflict: "fail",
        quiet: true,
        confirm: true,
        identityOrigin: "automatic",
        identityTransition: "routine",
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
    await coord.commitCloudBackendStateUpdate(this.stateCoordination(), (state) => {
      if (state.pending_push?.kind === "push_failed") return null;
      return {
        ...state,
        pending_push: {
          failed_at: new Date().toISOString(),
          kind: "push_failed",
          reason: cloudPendingPushReason(error),
        },
      };
    });
  }
  private async markLocalProjectionDirty(reason: string): Promise<boolean> {
    return await coord.commitCloudBackendStateUpdate(this.stateCoordination(), (state) => {
      if (state.pending_projection_apply) throw cloudProjectionApplyIncompleteError();
      if (state.pending_push) return null;
      return {
        ...state,
        pending_push: {
          failed_at: new Date().toISOString(),
          kind: "local_dirty",
          reason: `Local cloud cache mutation is not pushed: ${reason}`,
        },
      };
    });
  }
  private async clearPendingPush(): Promise<void> {
    await coord.commitCloudBackendStateUpdate(this.stateCoordination(), (state) => {
      if (!state.pending_push) return null;
      return { ...state, pending_push: null };
    });
  }
  private stateCoordination() {
    return { repositoryRoot: this.repositoryRoot, statePath: this.statePath };
  }
  private configSnapshot() {
    return {
      endpoint: this.endpoint,
      token: this.token,
      projectId: this.projectId,
      provider: this.provider,
      projectionIdentitySha256: this.projectionIdentitySha256,
      repositoryRoot: this.repositoryRoot,
      statePath: this.statePath,
      staleAfterSeconds: this.staleAfterSeconds,
      configOverrides: this.configOverrides,
      dotEnv: this.dotEnv,
    };
  }
  private async withProjectionOperation<T>(operation: string, run: () => Promise<T>): Promise<T> {
    return await coord.withProjectionLock(
      {
        cacheRoot: this.cache.root,
        operation,
        repositoryRoot: this.repositoryRoot,
        statePath: this.statePath,
      },
      run,
    );
  }
}
