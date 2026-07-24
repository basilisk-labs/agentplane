import { parseTaskStatus, type TaskStatus } from "@agentplaneorg/core/tasks";
import { isDeepStrictEqual } from "node:util";

import { infoMessage } from "../../cli/output.js";
import { isRecord } from "../../shared/guards.js";
import { compareCodeUnits } from "./cloud-backend-utils.js";
import { BackendError, type TaskData } from "./shared.js";
import { validateTaskId } from "./shared/id.js";

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
  for (const remote of validateRemoteProjectionTasks(remoteTasks, opts?.provider ?? null)) {
    remoteIds.add(remote.id);
    const current = currentById.get(remote.id);
    if (!current) {
      const task = normalizeRemoteTask(remote, { provider: opts?.provider ?? null });
      remoteOnly.push(task);
      if (remoteCreatePolicy === "import") added.push(task);
      continue;
    }
    const { next, fields } = mergeCloudOperationalFields(current, remote, {
      provider: opts?.provider ?? null,
    });
    if (stableJson(current) !== stableJson(next)) {
      changed.push(next);
      changedSummaries.push({ taskId: remote.id, fields });
    }
  }
  const removedIds = localTasks
    .map((task) => task.id)
    .filter((taskId) => !remoteIds.has(taskId))
    .toSorted(compareCodeUnits);
  return { changed, added, remoteOnly, remoteCreatePolicy, removedIds, changedSummaries };
}

function validateRemoteProjectionTasks(
  remoteTasks: unknown[],
  expectedProvider: string | null,
): (Record<string, unknown> & { id: string })[] {
  const validated: (Record<string, unknown> & { id: string })[] = [];
  const seenIds = new Set<string>();
  for (const [index, remote] of remoteTasks.entries()) {
    if (!isRecord(remote) || typeof remote.id !== "string" || remote.id.trim() !== remote.id) {
      throw invalidCloudPullProjectionError(
        `response task at index ${String(index)} has no canonical task id`,
      );
    }
    try {
      validateTaskId(remote.id);
    } catch {
      throw invalidCloudPullProjectionError(
        `response task at index ${String(index)} has invalid task id ${JSON.stringify(remote.id)}`,
      );
    }
    const validatedRemote = remote as Record<string, unknown> & { id: string };
    if (seenIds.has(validatedRemote.id)) {
      throw invalidCloudPullProjectionError(
        `response contains duplicate task id ${validatedRemote.id}`,
      );
    }
    assertValidCloudRemoteTaskFields(validatedRemote, expectedProvider);
    for (const field of CLOUD_OPERATIONAL_FIELDS) {
      if (
        field in validatedRemote &&
        normalizeCloudOperationalField(field, validatedRemote[field]) === undefined
      ) {
        throw invalidCloudPullProjectionError(
          `response task ${validatedRemote.id} has invalid ${field} ${JSON.stringify(validatedRemote[field])}`,
        );
      }
    }
    seenIds.add(validatedRemote.id);
    validated.push(validatedRemote);
  }
  return validated;
}

function assertValidCloudRemoteTaskFields(
  remote: Record<string, unknown> & { id: string },
  expectedProvider: string | null,
): void {
  if ("description" in remote && typeof remote.description !== "string") {
    throw invalidCloudPullProjectionError(
      `response task ${remote.id} has invalid description ${JSON.stringify(remote.description)}`,
    );
  }
  for (const field of ["provider", "remote_id", "remote_url", "url", "state"]) {
    if (field in remote && readNonEmptyString(remote[field]) === undefined) {
      throw invalidCloudPullProjectionError(
        `response task ${remote.id} has invalid ${field} ${JSON.stringify(remote[field])}`,
      );
    }
  }
  for (const field of ["depends_on", "verify"]) {
    if (
      field in remote &&
      (!Array.isArray(remote[field]) ||
        !(remote[field] as unknown[]).every((entry) => readNonEmptyString(entry) !== undefined))
    ) {
      throw invalidCloudPullProjectionError(
        `response task ${remote.id} has invalid ${field} ${JSON.stringify(remote[field])}`,
      );
    }
  }
  for (const field of ["remote_revision", "revision"]) {
    if (field in remote && readRevision(remote[field]) === undefined) {
      throw invalidCloudPullProjectionError(
        `response task ${remote.id} has invalid ${field} ${JSON.stringify(remote[field])}`,
      );
    }
  }
  if (
    "projected_at" in remote &&
    (readNonEmptyString(remote.projected_at) === undefined ||
      !Number.isFinite(Date.parse(String(remote.projected_at))))
  ) {
    throw invalidCloudPullProjectionError(
      `response task ${remote.id} has invalid projected_at ${JSON.stringify(remote.projected_at)}`,
    );
  }
  assertMatchingCloudRemoteAliases(remote, "remote_revision", "revision", readRevision);
  assertMatchingCloudRemoteAliases(remote, "remote_url", "url", readNonEmptyString);
  assertMatchingCloudRemoteAliases(remote, "state", "status", (value) => {
    const status = parseTaskStatus(value);
    return status ?? readNonEmptyString(value)?.toUpperCase();
  });
  const provider = readNonEmptyString(remote.provider);
  if (provider && expectedProvider && provider !== expectedProvider) {
    throw invalidCloudPullProjectionError(
      `response task ${remote.id} provider ${JSON.stringify(provider)} conflicts with configured provider ${JSON.stringify(expectedProvider)}`,
    );
  }
}

function assertMatchingCloudRemoteAliases(
  remote: Record<string, unknown> & { id: string },
  primary: string,
  alias: string,
  normalize: (value: unknown) => string | undefined,
): void {
  if (!(primary in remote) || !(alias in remote)) return;
  const primaryValue = normalize(remote[primary]);
  const aliasValue = normalize(remote[alias]);
  if (primaryValue === aliasValue) return;
  throw invalidCloudPullProjectionError(
    `response task ${remote.id} has conflicting ${primary}/${alias} aliases`,
  );
}

function invalidCloudPullProjectionError(reason: string): BackendError {
  return new BackendError(
    [
      "Cloud pull projection is invalid; refusing cache changes.",
      `Why: ${reason}.`,
      "Fix: repair the cloud projection response so every task has one unique canonical AgentPlane task id.",
      "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
      "Stop condition: do not use prefer-remote or adopt an identity while the projection payload is invalid.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_pull_projection_invalid" },
  );
}

export function readOpenConflicts(input: unknown): unknown[] {
  if (input === undefined || input === null) return [];
  if (typeof input === "number" && Number.isInteger(input) && input >= 0) {
    return input > 0 ? [{ count: input }] : [];
  }
  if (!Array.isArray(input)) {
    throw new BackendError(
      [
        "Cloud conflict payload is invalid.",
        "Why: conflicts must be an array or a non-negative integer count; treating malformed data as zero conflicts would fail open.",
        "Fix: repair the cloud sync response and retry.",
        "Safe command: agentplane backend inspect cloud --yes",
        "Stop condition: do not apply a pull while conflict state is ambiguous.",
      ].join("\n"),
      "E_BACKEND",
      { reasonCode: "cloud_conflicts_payload_invalid" },
    );
  }
  return input.filter((conflict) => {
    if (!isRecord(conflict)) return true;
    const states = [conflict.state, conflict.status].filter(
      (value): value is string => typeof value === "string",
    );
    return (
      states.length === 0 ||
      !states.every((value) => ["resolved", "closed"].includes(value.trim().toLowerCase()))
    );
  });
}

export function readMergedOpenConflicts(...inputs: unknown[]): unknown[] {
  const merged: unknown[] = [];
  for (const input of inputs) {
    for (const conflict of readOpenConflicts(input)) {
      if (!merged.some((candidate) => isDeepStrictEqual(candidate, conflict))) {
        merged.push(conflict);
      }
    }
  }
  return merged;
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
  const remoteRevision = readRevision(remote.remote_revision) ?? readRevision(remote.revision);
  const remoteState = readNonEmptyString(remote.state) ?? readNonEmptyString(remote.status);
  const title = typeof remote.title === "string" ? remote.title : String(remote.id);
  return {
    id: String(remote.id),
    title,
    description: typeof remote.description === "string" ? remote.description : "",
    status: readRemoteTaskStatus(remote.status, "TODO") ?? "TODO",
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
    sync: buildCloudSyncEnvelope(undefined, remote, {
      provider,
      remoteId,
      remoteRevision,
      remoteState,
      remoteUrl,
      title,
    }),
  };
}

function mergeCloudOperationalFields(
  current: TaskData,
  remote: Record<string, unknown>,
  opts: { provider: string | null },
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
  const sync = buildCloudSyncEnvelope(current.sync, remote, {
    provider: readNonEmptyString(remote.provider) ?? opts.provider ?? "cloud",
    remoteId: readNonEmptyString(remote.remote_id) ?? String(remote.id),
    remoteRevision: readRevision(remote.remote_revision ?? remote.revision),
    remoteState: readNonEmptyString(remote.state) ?? readNonEmptyString(remote.status),
    remoteUrl: readNonEmptyString(remote.remote_url) ?? readNonEmptyString(remote.url),
    title:
      typeof remote.title === "string" && remote.title.trim() ? remote.title.trim() : current.title,
  });
  if (stableJson(current.sync) !== stableJson(sync)) {
    next = { ...next, sync };
    fields.push("sync");
  }
  return { next, fields };
}

function buildCloudSyncEnvelope(
  current: TaskData["sync"] | undefined,
  remote: Record<string, unknown>,
  projection: {
    provider: string;
    remoteId: string;
    remoteRevision: string | undefined;
    remoteState: string | undefined;
    remoteUrl: string | undefined;
    title: string;
  },
): NonNullable<TaskData["sync"]> {
  const externalRef: NonNullable<TaskData["sync"]>["external_refs"][number] = {
    provider: projection.provider,
    connector_kind: "cloud",
    remote_id: projection.remoteId,
    ...(projection.remoteUrl ? { remote_url: projection.remoteUrl } : {}),
    ...(projection.remoteRevision ? { remote_revision: projection.remoteRevision } : {}),
    ...(projection.title ? { title: projection.title } : {}),
    ...(projection.remoteState ? { state: projection.remoteState } : {}),
  };
  const retainedRefs = (current?.external_refs ?? []).filter(
    (entry) =>
      !(
        entry.connector_kind === "cloud" &&
        entry.provider === projection.provider &&
        entry.remote_id === projection.remoteId
      ),
  );
  const projectedAt = readNonEmptyString(remote.projected_at);
  const freshness = {
    ...(current?.freshness ?? {}),
    ...(projectedAt ? { projected_at: projectedAt } : {}),
    ...(projection.remoteRevision
      ? {
          provider_revision: projection.remoteRevision,
          stale: false,
          reason: undefined,
        }
      : {
          provider_revision: undefined,
          stale: true,
          reason: "cloud_pull_provider_revision_missing",
        }),
  };
  return {
    version: 1,
    external_refs: [...retainedRefs, externalRef],
    field_policies: {
      ...(current?.field_policies ?? {}),
      title: current?.field_policies.title ?? {
        authority: "provider",
        remote_field: "title",
        conflict_policy: "record",
      },
      status: current?.field_policies.status ?? {
        authority: "provider",
        remote_field: "status",
        conflict_policy: "record",
      },
      priority: current?.field_policies.priority ?? {
        authority: "provider",
        remote_field: "priority",
        conflict_policy: "record",
      },
      owner: current?.field_policies.owner ?? {
        authority: "provider",
        remote_field: "owner",
        conflict_policy: "record",
      },
      tags: current?.field_policies.tags ?? {
        authority: "provider",
        remote_field: "tags",
        conflict_policy: "record",
      },
    },
    freshness,
    conflicts: current?.conflicts ?? [],
  };
}

function normalizeCloudOperationalField(
  field: (typeof CLOUD_OPERATIONAL_FIELDS)[number],
  value: unknown,
): TaskData[typeof field] | undefined {
  if (field === "status") {
    return readRemoteTaskStatus(value);
  }
  if (field === "priority") {
    if (
      (typeof value === "string" && value.trim().length > 0) ||
      (typeof value === "number" && Number.isFinite(value))
    ) {
      return value;
    }
    return undefined;
  }
  if (field === "tags") {
    return Array.isArray(value) && value.every((tag) => readNonEmptyString(tag) !== undefined)
      ? value
      : undefined;
  }
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function readRemoteTaskStatus(value: unknown, fallback?: TaskStatus): TaskStatus | undefined {
  const status = parseTaskStatus(value);
  if (status !== null) return status;
  return fallback;
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

function readRevision(input: unknown): string | undefined {
  if (typeof input === "number" && Number.isFinite(input)) return String(input);
  return readNonEmptyString(input);
}

function sortJson(input: unknown): unknown {
  if (Array.isArray(input)) return input.map((item) => sortJson(item));
  if (!isRecord(input)) return input;
  return Object.fromEntries(
    Object.entries(input)
      .toSorted(([left], [right]) => compareCodeUnits(left, right))
      .map(([key, value]) => [key, sortJson(value)]),
  );
}
