import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { infoMessage } from "../../cli/output.js";
import { isRecord } from "../../shared/guards.js";
import type { TaskData } from "./shared.js";

export type CloudRemoteCreatePolicy = "diff" | "ignore" | "import";

export type CloudPullPlan = {
  changed: TaskData[];
  added: TaskData[];
  remoteOnly: TaskData[];
  remoteCreatePolicy: CloudRemoteCreatePolicy;
  removedIds: string[];
  changedSummaries: CloudPullChangedSummary[];
};

type CloudPullChangedSummary = {
  taskId: string;
  fields: string[];
};

const CLOUD_OPERATIONAL_FIELDS = ["title", "status", "priority", "owner", "tags"] as const;

export function normalizeCloudRemoteCreatePolicy(value: unknown): CloudRemoteCreatePolicy {
  return value === "ignore" || value === "import" || value === "diff" ? value : "diff";
}

export function buildCloudPullPlan(
  localTasks: TaskData[],
  remoteTasks: unknown[],
  opts?: { provider?: string | null; remoteCreatePolicy?: CloudRemoteCreatePolicy },
): CloudPullPlan {
  const remoteCreatePolicy = normalizeCloudRemoteCreatePolicy(opts?.remoteCreatePolicy);
  const currentById = new Map(localTasks.map((task) => [task.id, task]));
  const remoteIds = new Set<string>();
  const changed: TaskData[] = [];
  const added: TaskData[] = [];
  const remoteOnly: TaskData[] = [];
  const changedSummaries: CloudPullChangedSummary[] = [];
  for (const remote of remoteTasks) {
    if (!isRecord(remote) || typeof remote.id !== "string") continue;
    remoteIds.add(remote.id);
    const current = currentById.get(remote.id);
    if (!current) {
      const task = normalizeRemoteTask(remote, { provider: opts?.provider ?? null });
      remoteOnly.push(task);
      if (remoteCreatePolicy === "import") added.push(task);
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
  return { changed, added, remoteOnly, remoteCreatePolicy, removedIds, changedSummaries };
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
  const remoteOnly = opts.plan?.remoteOnly ?? [];
  const removedIds = opts.plan?.removedIds ?? [];
  const remoteCreatePolicy = opts.plan?.remoteCreatePolicy ?? "diff";
  process.stdout.write(
    [
      infoMessage(
        `cloud pull diff changed=${changed.length} remote_only=${remoteOnly.length} imported=${added.length} removed=${removedIds.length} conflicts=${opts.conflicts.length} remote_create_policy=${remoteCreatePolicy}`,
      ),
      ...changed
        .slice(0, 20)
        .map((entry) => `- changed ${entry.taskId}: ${entry.fields.join(",")}`),
      ...remoteOnly.slice(0, 20).map((task) => `- remote-only ${task.id}`),
      ...added.slice(0, 20).map((task) => `- import remote-only ${task.id}`),
      ...removedIds.slice(0, 20).map((taskId) => `- removed local-only ${taskId}`),
      changed.length > 20 ? `- changed truncated=${changed.length - 20}` : null,
      remoteOnly.length > 20 ? `- remote-only truncated=${remoteOnly.length - 20}` : null,
      added.length > 20 ? `- import remote-only truncated=${added.length - 20}` : null,
      removedIds.length > 20 ? `- removed local-only truncated=${removedIds.length - 20}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  );
  process.stdout.write("\n");
}

function normalizeRemoteTask(
  remote: Record<string, unknown>,
  opts: { provider: string | null },
): TaskData {
  const remoteId = readNonEmptyString(remote.remote_id) ?? String(remote.id);
  const provider = readNonEmptyString(remote.provider) ?? opts.provider ?? "cloud";
  const remoteUrl = readNonEmptyString(remote.remote_url) ?? readNonEmptyString(remote.url);
  const remoteRevision =
    readNonEmptyString(remote.remote_revision) ?? readNonEmptyString(remote.revision);
  const remoteState = readNonEmptyString(remote.state) ?? readNonEmptyString(remote.status);
  const title = typeof remote.title === "string" ? remote.title : String(remote.id);
  const externalRef: NonNullable<TaskData["sync"]>["external_refs"][number] = {
    provider,
    connector_kind: "cloud",
    remote_id: remoteId,
    ...(remoteUrl ? { remote_url: remoteUrl } : {}),
    ...(remoteRevision ? { remote_revision: remoteRevision } : {}),
    ...(title.trim() ? { title: title.trim() } : {}),
    ...(remoteState ? { state: remoteState } : {}),
  };
  return {
    id: String(remote.id),
    title,
    description: typeof remote.description === "string" ? remote.description : "",
    status: normalizeTaskStatus(remote.status),
    priority:
      typeof remote.priority === "string" || typeof remote.priority === "number"
        ? remote.priority
        : "med",
    owner: typeof remote.owner === "string" ? remote.owner : "CODER",
    origin: {
      system: "cloud",
      provider,
      issue_id: remoteId,
      ...(remoteUrl ? { url: remoteUrl } : {}),
    },
    depends_on: readStringArray(remote.depends_on),
    tags: readStringArray(remote.tags),
    verify: readStringArray(remote.verify),
    sync: {
      version: 1,
      external_refs: [externalRef],
      field_policies: {
        title: { authority: "provider", remote_field: "title", conflict_policy: "record" },
        status: { authority: "provider", remote_field: "status", conflict_policy: "record" },
        priority: { authority: "provider", remote_field: "priority", conflict_policy: "record" },
        owner: { authority: "provider", remote_field: "owner", conflict_policy: "record" },
        tags: { authority: "provider", remote_field: "tags", conflict_policy: "record" },
      },
      freshness:
        remoteRevision === undefined
          ? undefined
          : {
              provider_revision: remoteRevision,
            },
      conflicts: [],
    },
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

function readNonEmptyString(input: unknown): string | undefined {
  return typeof input === "string" && input.trim().length > 0 ? input.trim() : undefined;
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
