import { BackendError, type TaskData } from "./shared.js";
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
