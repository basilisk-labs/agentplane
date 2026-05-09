import * as net from "node:net";

import { BackendError, type TaskData } from "./shared.js";
import { isDotEnvLoadedKey } from "../../shared/env.js";
import { isRecord } from "../../shared/guards.js";

export type CloudSyncResponse = {
  data?: unknown;
  tasks?: unknown;
  last_checked_at?: unknown;
  conflicts?: unknown;
  no_projection_changes?: unknown;
  no_changes?: unknown;
};

export const CLOUD_PUSH_DIRECT_BODY_LIMIT_BYTES = 750_000;
export const CLOUD_PUSH_BATCH_TASK_BYTES = 600_000;
export const CLOUD_PUSH_BATCH_RETRY_DELAYS_MS = [0, 1500, 3000] as const;
export const CLOUD_REQUEST_TIMEOUT_MS = 30_000;
export const CLOUD_PULL_REQUEST_TIMEOUT_MS = 120_000;
export const CLOUD_PUSH_BATCH_REQUEST_TIMEOUT_MS = 60_000;
export const CLOUD_NETWORK_FAMILY_ATTEMPT_TIMEOUT_MS = 1_000;
const CLOUD_RETRIABLE_HTTP_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

type NetworkFamilyAttemptTimeoutApi = {
  getDefaultAutoSelectFamilyAttemptTimeout?: () => number;
  setDefaultAutoSelectFamilyAttemptTimeout?: (value: number) => void;
};

export type CloudSyncStateDiagnostics = {
  unavailable: boolean;
  degraded: boolean | null;
  reason: string | null;
  failedJobs: number | null;
  queuedJobs: number | null;
  runningJobs: number | null;
  delayedJobs: number | null;
  pullCursor: string | null;
  openConflicts: number;
  latestJob: {
    id: string | null;
    type: string | null;
    status: string | null;
    error: string | null;
  } | null;
};

export type CloudConfigOverride = {
  key: string;
  configured: string | null;
  effective: string;
};

export class CloudHttpError extends BackendError {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message, "E_BACKEND");
  }
}

export class CloudNetworkError extends BackendError {
  constructor(message: string) {
    super(message, "E_NETWORK");
  }
}

export function configureCloudFetchAddressSelection(
  api: NetworkFamilyAttemptTimeoutApi = net,
): void {
  if (
    typeof api.getDefaultAutoSelectFamilyAttemptTimeout !== "function" ||
    typeof api.setDefaultAutoSelectFamilyAttemptTimeout !== "function"
  ) {
    return;
  }
  const current = api.getDefaultAutoSelectFamilyAttemptTimeout();
  if (!Number.isFinite(current) || current >= CLOUD_NETWORK_FAMILY_ATTEMPT_TIMEOUT_MS) return;
  api.setDefaultAutoSelectFamilyAttemptTimeout(CLOUD_NETWORK_FAMILY_ATTEMPT_TIMEOUT_MS);
}

export function normalizeCloudPullResponse(
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

export function readSafeCommand(
  response: CloudSyncResponse,
  data: Record<string, unknown>,
): string {
  const command = readString(response, "safe_command") ?? readString(data, "safe_command");
  return command ?? "agentplane backend inspect cloud --yes";
}

export function cloudPushBatchFinalized(response: CloudSyncResponse): boolean {
  const data = isRecord(response.data) ? response.data : {};
  const batch = isRecord(data.batch) ? data.batch : null;
  return batch?.finalized === true;
}

export function isOptionalSyncStateFailure(status: number): boolean {
  return [404, 405, 501, 502, 503, 504].includes(status);
}

export function cloudConflictMessage(opts: { conflicts: unknown[]; safeCommand: string }): string {
  return [
    "Cloud backend pull reported open conflicts.",
    "Why: the service detected changes on both sides and refused to choose a winner.",
    "Fix: resolve conflicts in the cloud service or rerun with --conflict=diff to inspect without writing.",
    `Safe command: ${opts.safeCommand}`,
    "Stop condition: stop if the conflict list includes fields outside title/status/priority/owner/tags.",
    `conflicts=${opts.conflicts.length}`,
  ].join("\n");
}

export async function cloudHttpErrorMessage(res: Response): Promise<string> {
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

export function normalizePositiveInteger(input: unknown): number | null {
  if (typeof input !== "number" || !Number.isFinite(input)) return null;
  const value = Math.trunc(input);
  return value > 0 ? value : null;
}

export function splitTasksByPayloadBytes(tasks: TaskData[], maxBytes: number): TaskData[][] {
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

export function isStale(lastCheckedAt: string | null, staleAfterSeconds: number | null): boolean {
  if (!lastCheckedAt || !staleAfterSeconds) return false;
  const checkedAt = Date.parse(lastCheckedAt);
  if (!Number.isFinite(checkedAt)) return true;
  return Date.now() - checkedAt > staleAfterSeconds * 1000;
}

export function createTimeoutSignal(timeoutMs: number): AbortSignal {
  if (typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(timeoutMs);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  timer.unref?.();
  return controller.signal;
}

export function isCloudRetriableError(error: unknown): boolean {
  if (error instanceof CloudNetworkError) return true;
  return error instanceof CloudHttpError && CLOUD_RETRIABLE_HTTP_STATUSES.has(error.status);
}

export async function readCloudJson<T>(res: Response, timeoutMs: number | undefined): Promise<T> {
  try {
    return (await res.json()) as T;
  } catch (error) {
    throw new CloudNetworkError(cloudNetworkErrorMessage(error, timeoutMs));
  }
}

export function cloudNetworkErrorMessage(error: unknown, timeoutMs: number | undefined): string {
  const timeout =
    error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError");
  const reason = timeout
    ? `the cloud request exceeded ${timeoutMs ?? CLOUD_REQUEST_TIMEOUT_MS}ms`
    : error instanceof Error && error.message
      ? error.message
      : "the network request failed";
  return [
    "Cloud backend request failed before a response was received.",
    `Why: ${reason}.`,
    "Fix: retry the command after checking network connectivity and cloud service health.",
    "Safe command: agentplane backend inspect cloud --yes",
    "Stop condition: stop if the request repeatedly times out or the service cannot be reached.",
  ].join("\n");
}

export function unavailableCloudSyncStateDiagnostics(
  unavailable: boolean,
): CloudSyncStateDiagnostics {
  return {
    unavailable,
    degraded: null,
    reason: null,
    failedJobs: null,
    queuedJobs: null,
    runningJobs: null,
    delayedJobs: null,
    pullCursor: null,
    openConflicts: 0,
    latestJob: null,
  };
}

export function readCloudSyncStateDiagnostics(
  data: Record<string, unknown>,
  openConflicts: number,
): CloudSyncStateDiagnostics {
  const backoff = isRecord(data.backoff) ? data.backoff : {};
  const jobs = isRecord(data.jobs) ? data.jobs : {};
  return {
    unavailable: false,
    degraded: readBoolean(backoff, "degraded") ?? readBoolean(data, "degraded"),
    reason: readString(backoff, "reason") ?? readString(data, "reason"),
    failedJobs:
      readNumber(backoff, "failed_jobs") ??
      readNumber(jobs, "failed") ??
      readNumber(data, "failed_jobs"),
    queuedJobs: readNumber(jobs, "queued") ?? readNumber(data, "queued_jobs"),
    runningJobs: readNumber(jobs, "running") ?? readNumber(data, "running_jobs"),
    delayedJobs: readNumber(jobs, "delayed") ?? readNumber(data, "delayed_jobs"),
    pullCursor:
      readString(data, "pull_cursor") ??
      readString(data, "last_checked_at") ??
      readString(data, "lastCheckedAt"),
    openConflicts,
    latestJob: readLatestCloudSyncJob(data),
  };
}

export function cloudConfigOverrides(
  settings: { endpoint?: string; project_id?: string; provider?: string },
  effective: Record<string, string>,
): CloudConfigOverride[] {
  const configured: Record<string, string | null> = {
    AGENTPLANE_CLOUD_ENDPOINT: normalizeEndpoint(settings.endpoint),
    AGENTPLANE_CLOUD_PROJECT_ID: normalizedString(settings.project_id),
    AGENTPLANE_CLOUD_PROVIDER: normalizedString(settings.provider),
  };
  const out: CloudConfigOverride[] = [];
  for (const [key, value] of Object.entries(effective)) {
    if (!isDotEnvLoadedKey(key)) continue;
    const configuredValue = configured[key] ?? null;
    if (configuredValue === value) continue;
    out.push({ key, configured: configuredValue, effective: value });
  }
  return out;
}

function readLatestCloudSyncJob(
  data: Record<string, unknown>,
): CloudSyncStateDiagnostics["latestJob"] {
  const candidates = [
    data.latestJob,
    data.latest_job,
    isRecord(data.jobs) ? data.jobs.latest : null,
    isRecord(data.jobs) ? data.jobs.latest_job : null,
  ];
  const job = candidates.find((candidate) => isRecord(candidate));
  if (!job) return null;
  return {
    id: readString(job, "id"),
    type: readString(job, "type") ?? readString(job, "kind"),
    status: readString(job, "status") ?? readString(job, "state"),
    error: readString(job, "error") ?? readString(job, "last_error"),
  };
}

function readBoolean(input: unknown, key: string): boolean | null {
  if (!isRecord(input)) return null;
  const value = input[key];
  return typeof value === "boolean" ? value : null;
}

function readNumber(input: unknown, key: string): number | null {
  if (!isRecord(input)) return null;
  const value = input[key];
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.trunc(value);
}

function normalizedString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizeEndpoint(value: unknown): string | null {
  const normalized = normalizedString(value);
  return normalized ? normalized.replaceAll(/\/+$/gu, "") : null;
}

function readString(input: unknown, key: string): string | null {
  if (!isRecord(input)) return null;
  const value = input[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
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
