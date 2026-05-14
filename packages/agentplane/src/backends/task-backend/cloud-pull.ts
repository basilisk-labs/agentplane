import { infoMessage } from "../../cli/output.js";
import { isRecord } from "../../shared/guards.js";
import type { TaskData } from "./shared.js";

export type CloudPullPlan = {
  changed: TaskData[];
  added: TaskData[];
  removedIds: string[];
  changedSummaries: CloudPullChangedSummary[];
};

type CloudPullChangedSummary = {
  taskId: string;
  fields: string[];
};

const CLOUD_OPERATIONAL_FIELDS = ["title", "status", "priority", "owner", "tags"] as const;

export function buildCloudPullPlan(localTasks: TaskData[], remoteTasks: unknown[]): CloudPullPlan {
  const currentById = new Map(localTasks.map((task) => [task.id, task]));
  const remoteIds = new Set<string>();
  const changed: TaskData[] = [];
  const added: TaskData[] = [];
  const changedSummaries: CloudPullChangedSummary[] = [];
  for (const remote of remoteTasks) {
    if (!isRecord(remote) || typeof remote.id !== "string") continue;
    remoteIds.add(remote.id);
    const current = currentById.get(remote.id);
    if (!current) {
      added.push(normalizeRemoteTask(remote));
      continue;
    }
    const { next, fields } = mergeCloudOperationalFields(current, remote);
    if (stableJson(current) !== stableJson(next)) {
      changed.push(next);
      changedSummaries.push({ taskId: remote.id, fields });
    }
  }
  const removedIds = localTasks
    .map((task) => task.id)
    .filter((taskId) => !remoteIds.has(taskId))
    .toSorted((left, right) => left.localeCompare(right));
  return { changed, added, removedIds, changedSummaries };
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
  const added = opts.plan?.added ?? [];
  const removedIds = opts.plan?.removedIds ?? [];
  process.stdout.write(
    [
      infoMessage(
        `cloud pull diff changed=${changed.length} added=${added.length} removed=${removedIds.length} conflicts=${opts.conflicts.length}`,
      ),
      ...changed
        .slice(0, 20)
        .map((entry) => `- changed ${entry.taskId}: ${entry.fields.join(",")}`),
      ...added.slice(0, 20).map((task) => `- added remote-only ${task.id}`),
      ...removedIds.slice(0, 20).map((taskId) => `- removed local-only ${taskId}`),
      changed.length > 20 ? `- changed truncated=${changed.length - 20}` : null,
      added.length > 20 ? `- added remote-only truncated=${added.length - 20}` : null,
      removedIds.length > 20 ? `- removed local-only truncated=${removedIds.length - 20}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  );
  process.stdout.write("\n");
}

function normalizeRemoteTask(remote: Record<string, unknown>): TaskData {
  return {
    id: String(remote.id),
    title: typeof remote.title === "string" ? remote.title : String(remote.id),
    description: typeof remote.description === "string" ? remote.description : "",
    status: typeof remote.status === "string" ? remote.status : "TODO",
    priority:
      typeof remote.priority === "string" || typeof remote.priority === "number"
        ? remote.priority
        : "med",
    owner: typeof remote.owner === "string" ? remote.owner : "CODER",
    depends_on: readStringArray(remote.depends_on),
    tags: readStringArray(remote.tags),
    verify: readStringArray(remote.verify),
  };
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

function readStringArray(input: unknown): string[] {
  return Array.isArray(input) && input.every((item) => typeof item === "string") ? input : [];
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
