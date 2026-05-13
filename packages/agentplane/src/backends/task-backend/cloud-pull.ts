import { infoMessage } from "../../cli/output.js";
import type { TaskData } from "./shared.js";

export type CloudPullPlan = {
  changed: TaskData[];
  changedSummaries: CloudPullChangedSummary[];
  ignoredRemoteOnly: string[];
};

type CloudPullChangedSummary = {
  taskId: string;
  fields: string[];
};

const CLOUD_OPERATIONAL_FIELDS = ["title", "status", "priority", "owner", "tags"] as const;

export function buildCloudPullPlan(localTasks: TaskData[], remoteTasks: unknown[]): CloudPullPlan {
  const currentById = new Map(localTasks.map((task) => [task.id, task]));
  const changed: TaskData[] = [];
  const changedSummaries: CloudPullChangedSummary[] = [];
  const ignoredRemoteOnly: string[] = [];
  for (const remote of remoteTasks) {
    if (!isRecord(remote) || typeof remote.id !== "string") continue;
    const current = currentById.get(remote.id);
    if (!current) {
      ignoredRemoteOnly.push(remote.id);
      continue;
    }
    const { next, fields } = mergeCloudOperationalFields(current, remote);
    if (stableJson(current) !== stableJson(next)) {
      changed.push(next);
      changedSummaries.push({ taskId: remote.id, fields });
    }
  }
  return { changed, changedSummaries, ignoredRemoteOnly };
}

export function readOpenConflicts(input: unknown): unknown[] {
  if (typeof input === "number" && input > 0) return [{ count: input }];
  if (!Array.isArray(input)) return [];
  return input.filter((conflict) => {
    if (!isRecord(conflict)) return true;
    const state = typeof conflict.state === "string" ? conflict.state : null;
    const status = typeof conflict.status === "string" ? conflict.status : null;
    return !["resolved", "closed"].includes(String(state ?? status ?? "open"));
  });
}

export function emitCloudPullDiffSummary(opts: {
  plan: CloudPullPlan | null;
  conflicts: unknown[];
  quiet: boolean;
}): void {
  if (opts.quiet) return;
  const changed = opts.plan?.changedSummaries ?? [];
  const ignoredRemoteOnly = opts.plan?.ignoredRemoteOnly ?? [];
  process.stdout.write(
    [
      infoMessage(
        `cloud pull diff changed=${changed.length} ignored_remote_only=${ignoredRemoteOnly.length} conflicts=${opts.conflicts.length}`,
      ),
      ...changed
        .slice(0, 20)
        .map((entry) => `- changed ${entry.taskId}: ${entry.fields.join(",")}`),
      ...ignoredRemoteOnly.slice(0, 20).map((taskId) => `- ignored remote-only ${taskId}`),
      changed.length > 20 ? `- changed truncated=${changed.length - 20}` : null,
      ignoredRemoteOnly.length > 20
        ? `- ignored remote-only truncated=${ignoredRemoteOnly.length - 20}`
        : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  );
  process.stdout.write("\n");
}

function mergeCloudOperationalFields(
  current: TaskData,
  remote: Record<string, unknown>,
): { next: TaskData; fields: string[] } {
  let next = current;
  const fields: string[] = [];
  for (const field of CLOUD_OPERATIONAL_FIELDS) {
    if (!(field in remote)) continue;
    const value = normalizeCloudOperationalField(field, remote[field]);
    if (value === undefined) continue;
    if (stableJson(current[field]) === stableJson(value)) continue;
    next = { ...next, [field]: value };
    fields.push(field);
  }
  return { next, fields };
}

function normalizeCloudOperationalField(
  field: (typeof CLOUD_OPERATIONAL_FIELDS)[number],
  value: unknown,
): TaskData[typeof field] | undefined {
  if (field === "priority") {
    if (typeof value === "string" || typeof value === "number") return value;
    return undefined;
  }
  if (field === "tags") {
    return Array.isArray(value) && value.every((tag) => typeof tag === "string")
      ? value
      : undefined;
  }
  return typeof value === "string" ? value : undefined;
}

function stableJson(input: unknown): string {
  return JSON.stringify(sortJson(input));
}

function sortJson(input: unknown): unknown {
  if (Array.isArray(input)) return input.map((item) => sortJson(item));
  if (!isRecord(input)) return input;
  return Object.fromEntries(
    Object.entries(input)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => [key, sortJson(value)]),
  );
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input && typeof input === "object" && !Array.isArray(input));
}
