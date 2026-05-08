import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

import { loadDotEnv } from "../../shared/env.js";
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

export type CloudBackendSettings = {
  endpoint?: string;
  token?: string;
  project_id?: string;
  provider?: string;
  cache_dir?: string;
  stale_after_seconds?: number;
  state_path?: string;
};

type CloudSyncResponse = {
  data?: unknown;
  tasks?: unknown;
  last_checked_at?: unknown;
  conflicts?: unknown;
  no_projection_changes?: unknown;
  no_changes?: unknown;
};

type CloudSyncStateResponse = {
  data?: unknown;
  conflicts?: unknown;
  openConflicts?: unknown;
  open_conflicts?: unknown;
  safe_command?: unknown;
};

type FetchLike = typeof fetch;
type CloudSyncStateSnapshot = {
  conflicts: unknown[];
  safeCommand: string | null;
  unavailable: boolean;
};

const CLOUD_PUSH_DIRECT_BODY_LIMIT_BYTES = 750_000;
const CLOUD_PUSH_BATCH_TASK_BYTES = 600_000;
const CLOUD_PUSH_BATCH_RETRY_DELAYS_MS = [0, 1_500, 3_000] as const;

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
    supports_snapshot_export: true,
  } as const;

  endpoint: string;
  token: string;
  projectId: string;
  provider: string | null;
  cache: LocalBackend;
  statePath: string;
  staleAfterSeconds: number | null;
  private fetchImpl: FetchLike;

  constructor(
    settings: CloudBackendSettings,
    opts: { cache: LocalBackend; root: string; fetchImpl?: FetchLike },
  ) {
    const endpoint = firstNonEmpty(
      process.env.AGENTPLANE_CLOUD_ENDPOINT,
      settings.endpoint,
    ).replaceAll(/\/+$/gu, "");
    this.endpoint = endpoint;
    this.token = firstNonEmpty(process.env.AGENTPLANE_CLOUD_TOKEN, settings.token);
    this.projectId = firstNonEmpty(process.env.AGENTPLANE_CLOUD_PROJECT_ID, settings.project_id);
    this.provider = firstNonEmpty(process.env.AGENTPLANE_CLOUD_PROVIDER, settings.provider) || null;
    this.cache = opts.cache;
    this.statePath = path.resolve(
      opts.root,
      firstNonEmpty(settings.state_path, ".agentplane/backends/cloud/state.json"),
    );
    this.staleAfterSeconds = normalizePositiveInteger(settings.stale_after_seconds) ?? 300;
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  static async create(opts: {
    root: string;
    settings: CloudBackendSettings;
    cache: LocalBackend;
    fetchImpl?: FetchLike;
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

  async exportTasksJson(outputPath: string): Promise<void> {
    await this.cache.exportTasksJson(outputPath);
  }

  async exportProjectionSnapshot(outputPath: string): Promise<void> {
    await this.cache.exportProjectionSnapshot(outputPath);
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
        : { conflicts: [], safeCommand: null, unavailable: false };
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
    await this.writeState({
      last_checked_at: pull.lastCheckedAt ?? new Date().toISOString(),
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
        },
      );
    } catch {
      return { conflicts: [], safeCommand: null, unavailable: true };
    }
    if (!res.ok) {
      if (isOptionalSyncStateFailure(res.status)) {
        return { conflicts: [], safeCommand: null, unavailable: true };
      }
      throw new BackendError(await cloudHttpErrorMessage(res), "E_BACKEND");
    }
    const response = (await res.json()) as CloudSyncStateResponse;
    const data = isRecord(response.data) ? response.data : {};
    return {
      conflicts: readOpenConflicts(
        response.openConflicts ??
          response.open_conflicts ??
          response.conflicts ??
          data.openConflicts ??
          data.open_conflicts ??
          data.conflicts,
      ),
      safeCommand:
        readSafeCommand(response, data) ??
        "agentplane backend sync cloud --direction pull --conflict=diff",
      unavailable: false,
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
        );
      } catch (error) {
        if (error instanceof BackendError || attempt >= CLOUD_PUSH_BATCH_RETRY_DELAYS_MS.length) {
          throw error;
        }
        const delayMs = CLOUD_PUSH_BATCH_RETRY_DELAYS_MS[attempt] ?? 0;
        if (!opts.quiet) {
          process.stderr.write(
            `cloud push retrying batch ${opts.chunkIndex + 1}/${opts.totalChunks} after network error attempt=${attempt + 1}\n`,
          );
        }
        await sleep(delayMs);
      }
    }
  }

  async inspectConfiguration(): Promise<TaskBackendInspectionResult> {
    const missing = this.missingConfigKeys();
    const state = await this.readState();
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
      },
      freshness: {
        lastCheckedAt: state.last_checked_at,
        staleAfterSeconds: this.staleAfterSeconds,
        stale: isStale(state.last_checked_at, this.staleAfterSeconds),
        statePath: this.statePath,
      },
    };
  }

  private async request<T>(pathname: string, init: RequestInit): Promise<T> {
    const headers = this.cloudHeaders();
    for (const [key, value] of new Headers(init.headers)) {
      headers.set(key, value);
    }

    const res = await this.fetchImpl(`${this.endpoint}${pathname}`, {
      ...init,
      headers,
    });
    if (!res.ok) {
      throw new BackendError(await cloudHttpErrorMessage(res), "E_BACKEND");
    }
    return (await res.json()) as T;
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
    const missing: string[] = [];
    if (!this.endpoint) missing.push("AGENTPLANE_CLOUD_ENDPOINT");
    if (!this.token) missing.push("AGENTPLANE_CLOUD_TOKEN");
    if (!this.projectId) missing.push("AGENTPLANE_CLOUD_PROJECT_ID");
    return missing;
  }

  private async readState(): Promise<{ last_checked_at: string | null }> {
    try {
      const raw = JSON.parse(await readFile(this.statePath, "utf8")) as unknown;
      if (
        raw &&
        typeof raw === "object" &&
        typeof (raw as { last_checked_at?: unknown }).last_checked_at === "string"
      ) {
        return { last_checked_at: (raw as { last_checked_at: string }).last_checked_at };
      }
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code !== "ENOENT") throw err;
    }
    return { last_checked_at: null };
  }

  private async writeState(state: { last_checked_at: string }): Promise<void> {
    await mkdir(path.dirname(this.statePath), { recursive: true });
    await writeFile(this.statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  }
}

function firstNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return "";
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input && typeof input === "object" && !Array.isArray(input));
}

function normalizeCloudPullResponse(
  response: CloudSyncResponse,
  data: Record<string, unknown>,
): {
  tasks: unknown[] | null;
  conflicts: unknown;
  lastCheckedAt: string | null;
  noProjectionChanges: boolean;
} {
  return {
    tasks: Array.isArray(response.tasks)
      ? response.tasks
      : Array.isArray(data.tasks)
        ? data.tasks
        : null,
    conflicts: response.conflicts ?? data.conflicts,
    lastCheckedAt:
      typeof response.last_checked_at === "string"
        ? response.last_checked_at
        : typeof data.last_checked_at === "string"
          ? data.last_checked_at
          : null,
    noProjectionChanges:
      response.no_projection_changes === true ||
      response.no_changes === true ||
      data.no_projection_changes === true ||
      data.no_changes === true,
  };
}

function readSafeCommand(response: CloudSyncResponse, data: Record<string, unknown>): string {
  const command = readString(response, "safe_command") ?? readString(data, "safe_command");
  return command ?? "agentplane backend inspect cloud --yes";
}

function cloudPushBatchFinalized(response: CloudSyncResponse): boolean {
  const data = isRecord(response.data) ? response.data : {};
  const batch = isRecord(data.batch) ? data.batch : null;
  return batch?.finalized === true;
}

function readString(input: unknown, key: string): string | null {
  if (!isRecord(input)) return null;
  const value = input[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isOptionalSyncStateFailure(status: number): boolean {
  return [404, 405, 501, 502, 503, 504].includes(status);
}

function cloudConflictMessage(opts: { conflicts: unknown[]; safeCommand: string }): string {
  return [
    "Cloud backend pull reported open conflicts.",
    "Why: the service detected changes on both sides and refused to choose a winner.",
    "Fix: resolve conflicts in the cloud service or rerun with --conflict=diff to inspect without writing.",
    `Safe command: ${opts.safeCommand}`,
    "Stop condition: stop if the conflict list includes fields outside title/status/priority/owner/tags.",
    `conflicts=${opts.conflicts.length}`,
  ].join("\n");
}

async function cloudHttpErrorMessage(res: Response): Promise<string> {
  const payload = await readJsonResponse(res);
  const remediation = isRecord(payload) ? normalizeServiceRemediation(payload) : null;
  if (remediation) {
    return [
      `Cloud backend request failed: HTTP ${res.status}`,
      `Code: ${remediation.code}`,
      `Why: ${remediation.why}`,
      `Fix: ${remediation.fix}`,
      `Safe command: ${remediation.safeCommand}`,
      `Stop condition: ${remediation.whenToStop}`,
    ].join("\n");
  }
  return `Cloud backend request failed: HTTP ${res.status}`;
}

async function readJsonResponse(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function normalizeServiceRemediation(input: Record<string, unknown>): {
  code: string;
  why: string;
  fix: string;
  safeCommand: string;
  whenToStop: string;
} | null {
  const source = isRecord(input.error) ? input.error : input;
  const code = readString(source, "code") ?? readString(source, "reason_code");
  const why = readString(source, "why");
  const fix = readString(source, "fix");
  const safeCommand = readString(source, "safe_command");
  const whenToStop = readString(source, "when_to_stop") ?? readString(source, "stop_condition");
  if (!code || !why || !fix || !safeCommand || !whenToStop) return null;
  return { code, why, fix, safeCommand, whenToStop };
}

function normalizePositiveInteger(input: unknown): number | null {
  if (typeof input !== "number" || !Number.isFinite(input)) return null;
  const value = Math.trunc(input);
  return value > 0 ? value : null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function splitTasksByPayloadBytes(tasks: TaskData[], maxBytes: number): TaskData[][] {
  const chunks: TaskData[][] = [];
  let current: TaskData[] = [];
  let currentBytes = 2;
  for (const task of tasks) {
    const taskBytes = Buffer.byteLength(JSON.stringify(task), "utf8");
    if (taskBytes > maxBytes) {
      throw new BackendError(
        [
          "Cloud backend cannot batch a single oversized task projection.",
          `Why: task ${task.id} is larger than the per-batch payload budget.`,
          "Fix: reduce large task README metadata or raise the service request-body limit before syncing.",
          "Safe command: agentplane task show <task-id>",
          "Stop condition: stop if the task contains secrets or large embedded artifacts.",
        ].join("\n"),
        "E_BACKEND",
      );
    }
    const separatorBytes = current.length === 0 ? 0 : 1;
    if (current.length > 0 && currentBytes + separatorBytes + taskBytes > maxBytes) {
      chunks.push(current);
      current = [];
      currentBytes = 2;
    }
    current.push(task);
    currentBytes += separatorBytes + taskBytes;
  }
  if (current.length > 0 || tasks.length === 0) {
    chunks.push(current);
  }
  return chunks;
}

function isStale(lastCheckedAt: string | null, staleAfterSeconds: number | null): boolean {
  if (!lastCheckedAt || !staleAfterSeconds) return false;
  const checkedAt = Date.parse(lastCheckedAt);
  if (!Number.isFinite(checkedAt)) return true;
  return Date.now() - checkedAt > staleAfterSeconds * 1000;
}
