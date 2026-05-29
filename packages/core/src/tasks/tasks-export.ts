import { createHash } from "node:crypto";
import { loadConfig } from "../config/config.js";
import { resolveProject } from "../project/project-root.js";
import { isRecord } from "../types/guards.js";
import { normalizeTaskDocVersion, type TaskDocVersion } from "./task-doc-contract.js";
import { validateTasksExportSnapshot } from "./task-artifact-schema.js";
import {
  listTasks,
  type TaskOrigin,
  type TaskRunnerEvidence,
  type TaskRunnerExecutionMetrics,
  type TaskRunnerHistoryEntry,
  type TaskRunnerOutcome,
  type TaskRunnerTarget,
  type TaskSyncEnvelope,
} from "./task-store.js";

function normalizeTaskOrigin(value: unknown): TaskOrigin | undefined {
  if (!isRecord(value)) return undefined;
  const system = typeof value.system === "string" ? value.system.trim() : "";
  if (!system) return undefined;
  const origin: TaskOrigin = { system };
  for (const [key, raw] of Object.entries(value)) {
    if (key === "system") continue;
    if (typeof raw !== "string") continue;
    const normalizedKey = key.trim();
    const normalizedValue = raw.trim();
    if (!normalizedKey || !normalizedValue) continue;
    origin[normalizedKey] = normalizedValue;
  }
  return origin;
}

function normalizeRunnerTarget(value: unknown): TaskRunnerTarget | undefined {
  if (!isRecord(value)) return undefined;
  const kind = typeof value.kind === "string" ? value.kind.trim() : "";
  if (kind !== "task" && kind !== "recipe_scenario") return undefined;
  const target: TaskRunnerTarget = { kind };
  if (typeof value.task_id === "string" && value.task_id.trim())
    target.task_id = value.task_id.trim();
  if (typeof value.recipe_id === "string" && value.recipe_id.trim()) {
    target.recipe_id = value.recipe_id.trim();
  }
  if (typeof value.scenario_id === "string" && value.scenario_id.trim()) {
    target.scenario_id = value.scenario_id.trim();
  }
  return target;
}

function normalizeRunnerMetrics(value: unknown): TaskRunnerExecutionMetrics | undefined {
  if (!isRecord(value)) return undefined;
  const metrics: TaskRunnerExecutionMetrics = {};
  if (typeof value.duration_ms === "number" && Number.isFinite(value.duration_ms)) {
    metrics.duration_ms = value.duration_ms;
  }
  if (typeof value.stdout_bytes === "number" && Number.isFinite(value.stdout_bytes)) {
    metrics.stdout_bytes = value.stdout_bytes;
  }
  if (typeof value.stderr_bytes === "number" && Number.isFinite(value.stderr_bytes)) {
    metrics.stderr_bytes = value.stderr_bytes;
  }
  if (
    value.output_last_message_bytes === null ||
    (typeof value.output_last_message_bytes === "number" &&
      Number.isFinite(value.output_last_message_bytes))
  ) {
    metrics.output_last_message_bytes = value.output_last_message_bytes;
  }
  return Object.keys(metrics).length > 0 ? metrics : undefined;
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
  return entries.length > 0 ? entries : undefined;
}

function normalizeRunnerEvidence(value: unknown): TaskRunnerEvidence | undefined {
  if (!isRecord(value)) return undefined;
  const evidence: TaskRunnerEvidence = {};
  const evidencePaths = normalizeStringArray(value.evidence_paths);
  if (evidencePaths) evidence.evidence_paths = evidencePaths;
  const changedPaths = normalizeStringArray(value.changed_paths);
  if (changedPaths) evidence.changed_paths = changedPaths;
  const testsRun = normalizeStringArray(value.tests_run);
  if (testsRun) evidence.tests_run = testsRun;
  const verificationCandidates = normalizeStringArray(value.verification_candidates);
  if (verificationCandidates) evidence.verification_candidates = verificationCandidates;
  if (
    typeof value.files_changed_count === "number" &&
    Number.isInteger(value.files_changed_count) &&
    value.files_changed_count >= 0
  ) {
    evidence.files_changed_count = value.files_changed_count;
  }
  return Object.keys(evidence).length > 0 ? evidence : undefined;
}

function normalizeTaskVerification(value: unknown): {
  state: "pending" | "ok" | "needs_rework" | "blocked_external";
  attempts: number;
  updated_at: string | null;
  updated_by: string | null;
  note: string | null;
} {
  const verification = isRecord(value) ? value : null;
  if (
    !verification ||
    (verification.state !== "pending" &&
      verification.state !== "ok" &&
      verification.state !== "needs_rework" &&
      verification.state !== "blocked_external")
  ) {
    return { state: "pending", attempts: 0, updated_at: null, updated_by: null, note: null };
  }

  const attempts =
    typeof verification.attempts === "number" &&
    Number.isInteger(verification.attempts) &&
    verification.attempts >= 0
      ? verification.attempts
      : 0;
  const updatedAt =
    typeof verification.updated_at === "string" || verification.updated_at === null
      ? verification.updated_at
      : null;
  const updatedBy =
    typeof verification.updated_by === "string" || verification.updated_by === null
      ? verification.updated_by
      : null;
  const note =
    typeof verification.note === "string" || verification.note === null ? verification.note : null;

  return {
    state: verification.state,
    attempts,
    updated_at: updatedAt,
    updated_by: updatedBy,
    note,
  };
}

function normalizeTaskRunnerHistoryEntry(value: unknown): TaskRunnerHistoryEntry | undefined {
  if (!isRecord(value)) return undefined;
  const runId = typeof value.run_id === "string" ? value.run_id.trim() : "";
  const status = typeof value.status === "string" ? value.status.trim() : "";
  const adapterId = typeof value.adapter_id === "string" ? value.adapter_id.trim() : "";
  const mode = value.mode === "execute" || value.mode === "dry_run" ? value.mode : null;
  const updatedAt = typeof value.updated_at === "string" ? value.updated_at.trim() : "";
  const target = normalizeRunnerTarget(value.target);
  if (!runId || !adapterId || !updatedAt || !target || !mode) return undefined;
  if (
    status !== "prepared" &&
    status !== "running" &&
    status !== "success" &&
    status !== "failed" &&
    status !== "cancelled"
  ) {
    return undefined;
  }

  const outcome: TaskRunnerHistoryEntry = {
    run_id: runId,
    status,
    adapter_id: adapterId,
    mode,
    updated_at: updatedAt,
    exit_code:
      value.exit_code === null || typeof value.exit_code === "number" ? value.exit_code : null,
    target,
  };
  if (typeof value.started_at === "string" && value.started_at.trim()) {
    outcome.started_at = value.started_at.trim();
  }
  if (typeof value.ended_at === "string" && value.ended_at.trim()) {
    outcome.ended_at = value.ended_at.trim();
  }
  if (Array.isArray(value.output_paths)) {
    const outputPaths = value.output_paths.filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0,
    );
    if (outputPaths.length > 0) outcome.output_paths = outputPaths;
  }
  if (typeof value.summary === "string" && value.summary.trim()) {
    outcome.summary = value.summary.trim();
  }
  if (typeof value.stdout_summary === "string" && value.stdout_summary.trim()) {
    outcome.stdout_summary = value.stdout_summary.trim();
  }
  if (typeof value.stderr_summary === "string" && value.stderr_summary.trim()) {
    outcome.stderr_summary = value.stderr_summary.trim();
  }
  const metrics = normalizeRunnerMetrics(value.metrics);
  if (metrics) outcome.metrics = metrics;
  const evidence = normalizeRunnerEvidence(value.evidence);
  if (evidence) outcome.evidence = evidence;
  return outcome;
}

function normalizeTaskRunnerOutcome(value: unknown): TaskRunnerOutcome | undefined {
  const outcome = normalizeTaskRunnerHistoryEntry(value);
  if (!outcome) return undefined;
  const record = value as Record<string, unknown>;

  const history = Array.isArray(record.history)
    ? record.history
        .map((entry) => normalizeTaskRunnerHistoryEntry(entry))
        .filter((entry): entry is TaskRunnerHistoryEntry => !!entry)
    : [];

  return history.length > 0 ? { ...outcome, history } : outcome;
}

function normalizeTaskSyncEnvelope(value: unknown): TaskSyncEnvelope | undefined {
  if (!isRecord(value) || value.version !== 1) return undefined;
  const externalRefs = Array.isArray(value.external_refs) ? value.external_refs : [];
  const normalizedRefs = externalRefs
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const provider = typeof entry.provider === "string" ? entry.provider.trim() : "";
      const remoteId = typeof entry.remote_id === "string" ? entry.remote_id.trim() : "";
      if (!provider || !remoteId) return null;
      const ref: TaskSyncEnvelope["external_refs"][number] = {
        provider,
        remote_id: remoteId,
      };
      if (typeof entry.connector_kind === "string" && entry.connector_kind.trim()) {
        ref.connector_kind = entry.connector_kind.trim();
      }
      if (typeof entry.connection_id === "string" && entry.connection_id.trim()) {
        ref.connection_id = entry.connection_id.trim();
      }
      if (typeof entry.installation_id === "string" && entry.installation_id.trim()) {
        ref.installation_id = entry.installation_id.trim();
      }
      if (typeof entry.remote_url === "string" && entry.remote_url.trim()) {
        ref.remote_url = entry.remote_url.trim();
      }
      if (typeof entry.remote_revision === "string" && entry.remote_revision.trim()) {
        ref.remote_revision = entry.remote_revision.trim();
      }
      if (typeof entry.title === "string" && entry.title.trim()) ref.title = entry.title.trim();
      if (typeof entry.state === "string" && entry.state.trim()) ref.state = entry.state.trim();
      if (typeof entry.synced_at === "string" && entry.synced_at.trim()) {
        ref.synced_at = entry.synced_at.trim();
      }
      return ref;
    })
    .filter((entry): entry is TaskSyncEnvelope["external_refs"][number] => entry !== null);

  const fieldPolicies: TaskSyncEnvelope["field_policies"] = {};
  if (isRecord(value.field_policies)) {
    for (const [field, rawPolicy] of Object.entries(value.field_policies)) {
      if (!field.trim() || !isRecord(rawPolicy)) continue;
      const authority = rawPolicy.authority;
      if (
        authority !== "agentplane" &&
        authority !== "provider" &&
        authority !== "bidirectional" &&
        authority !== "derived" &&
        authority !== "ignored"
      ) {
        continue;
      }
      fieldPolicies[field] = {
        authority,
        remote_field:
          typeof rawPolicy.remote_field === "string" && rawPolicy.remote_field.trim()
            ? rawPolicy.remote_field.trim()
            : undefined,
        conflict_policy:
          rawPolicy.conflict_policy === "record" ||
          rawPolicy.conflict_policy === "manual" ||
          rawPolicy.conflict_policy === "agentplane_wins" ||
          rawPolicy.conflict_policy === "provider_wins"
            ? rawPolicy.conflict_policy
            : undefined,
        updated_at:
          typeof rawPolicy.updated_at === "string" && rawPolicy.updated_at.trim()
            ? rawPolicy.updated_at.trim()
            : undefined,
        note:
          typeof rawPolicy.note === "string" && rawPolicy.note.trim()
            ? rawPolicy.note.trim()
            : undefined,
      };
    }
  }

  const freshness = isRecord(value.freshness)
    ? {
        projected_at:
          typeof value.freshness.projected_at === "string" && value.freshness.projected_at.trim()
            ? value.freshness.projected_at.trim()
            : undefined,
        projection_sha256:
          typeof value.freshness.projection_sha256 === "string" &&
          value.freshness.projection_sha256.trim()
            ? value.freshness.projection_sha256.trim()
            : undefined,
        source_revision:
          typeof value.freshness.source_revision === "number" &&
          Number.isInteger(value.freshness.source_revision) &&
          value.freshness.source_revision >= 0
            ? value.freshness.source_revision
            : undefined,
        provider_revision:
          typeof value.freshness.provider_revision === "string" &&
          value.freshness.provider_revision.trim()
            ? value.freshness.provider_revision.trim()
            : undefined,
        stale: typeof value.freshness.stale === "boolean" ? value.freshness.stale : undefined,
        reason:
          typeof value.freshness.reason === "string" && value.freshness.reason.trim()
            ? value.freshness.reason.trim()
            : undefined,
      }
    : undefined;

  const conflicts = Array.isArray(value.conflicts) ? value.conflicts : [];
  const normalizedConflicts = conflicts
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const id = typeof entry.id === "string" ? entry.id.trim() : "";
      const summary = typeof entry.summary === "string" ? entry.summary.trim() : "";
      const detectedAt = typeof entry.detected_at === "string" ? entry.detected_at.trim() : "";
      if (!id || !summary || !detectedAt) return null;
      if (
        entry.kind !== "field" &&
        entry.kind !== "identity" &&
        entry.kind !== "freshness" &&
        entry.kind !== "deletion" &&
        entry.kind !== "dependency" &&
        entry.kind !== "permission"
      ) {
        return null;
      }
      if (
        entry.severity !== "info" &&
        entry.severity !== "warning" &&
        entry.severity !== "blocking"
      ) {
        return null;
      }
      if (entry.status !== "open" && entry.status !== "resolved" && entry.status !== "ignored") {
        return null;
      }
      const conflict: TaskSyncEnvelope["conflicts"][number] = {
        id,
        kind: entry.kind,
        severity: entry.severity,
        status: entry.status,
        summary,
        detected_at: detectedAt,
      };
      if (typeof entry.provider === "string" && entry.provider.trim()) {
        conflict.provider = entry.provider.trim();
      }
      if (typeof entry.remote_id === "string" && entry.remote_id.trim()) {
        conflict.remote_id = entry.remote_id.trim();
      }
      if (typeof entry.field === "string" && entry.field.trim()) {
        conflict.field = entry.field.trim();
      }
      if (typeof entry.resolved_at === "string" && entry.resolved_at.trim()) {
        conflict.resolved_at = entry.resolved_at.trim();
      }
      if (typeof entry.safe_command === "string" && entry.safe_command.trim()) {
        conflict.safe_command = entry.safe_command.trim();
      }
      if (typeof entry.when_to_stop === "string" && entry.when_to_stop.trim()) {
        conflict.when_to_stop = entry.when_to_stop.trim();
      }
      return conflict;
    })
    .filter((entry): entry is TaskSyncEnvelope["conflicts"][number] => entry !== null);

  return {
    version: 1,
    external_refs: normalizedRefs,
    field_policies: fieldPolicies,
    ...(freshness && Object.values(freshness).some((entry) => entry !== undefined)
      ? { freshness }
      : {}),
    conflicts: normalizedConflicts,
  };
}

export function canonicalizeJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((v) => canonicalizeJson(v));

  if (isRecord(value)) {
    const out: Record<string, unknown> = {};
    const keys = Object.keys(value).toSorted((a, b) => a.localeCompare(b));
    for (const key of keys) out[key] = canonicalizeJson(value[key]);
    return out;
  }

  return value;
}

export type TasksExportMeta = {
  schema_version: 1;
  managed_by: string;
  checksum_algo: "sha256";
  checksum: string;
};

export type TasksExportTask = {
  id: string;
  title: string;
  result_summary?: string;
  risk_level?: "low" | "med" | "high";
  breaking?: boolean;
  status: string;
  priority: string;
  owner: string;
  revision?: number;
  origin?: TaskOrigin;
  plan_approval: {
    state: "pending" | "approved" | "rejected";
    updated_at: string | null;
    updated_by: string | null;
    note: string | null;
  };
  verification: {
    state: "pending" | "ok" | "needs_rework" | "blocked_external";
    attempts: number;
    updated_at: string | null;
    updated_by: string | null;
    note: string | null;
  };
  runner?: TaskRunnerOutcome;
  sync?: TaskSyncEnvelope;
  depends_on: string[];
  tags: string[];
  verify: string[];
  commit: { hash: string; message: string } | null;
  comments: { author: string; body: string }[];
  events?: {
    type: string;
    at: string;
    author: string;
    from?: string;
    to?: string;
    state?: string;
    note?: string;
    body?: string;
  }[];
  doc_version: TaskDocVersion;
  doc_updated_at: string;
  doc_updated_by: string;
  description: string;
  dirty: boolean;
  id_source: string;
};

export type TasksExportSnapshot = {
  tasks: TasksExportTask[];
  meta: TasksExportMeta;
};

export function canonicalTasksPayload(tasks: TasksExportTask[]): string {
  return JSON.stringify(canonicalizeJson({ tasks }));
}

export function computeTasksChecksum(tasks: TasksExportTask[]): string {
  const payload = canonicalTasksPayload(tasks);
  return createHash("sha256").update(payload, "utf8").digest("hex");
}

export async function buildTasksExportSnapshot(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<TasksExportSnapshot> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  await loadConfig(resolved.agentplaneDir);

  const tasks = await listTasks({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const exportTasks: TasksExportTask[] = tasks.map((t) => {
    const fm = t.frontmatter as unknown as Record<string, unknown>;

    const dependsOn = Array.isArray(fm.depends_on)
      ? fm.depends_on.filter((v): v is string => typeof v === "string")
      : [];
    const tags = Array.isArray(fm.tags)
      ? fm.tags.filter((v): v is string => typeof v === "string")
      : [];
    const verify = Array.isArray(fm.verify)
      ? fm.verify.filter((v): v is string => typeof v === "string")
      : [];

    const commit =
      isRecord(fm.commit) &&
      typeof fm.commit.hash === "string" &&
      typeof fm.commit.message === "string" &&
      fm.commit.hash.length > 0 &&
      fm.commit.message.length > 0
        ? { hash: fm.commit.hash, message: fm.commit.message }
        : null;

    const comments = Array.isArray(fm.comments)
      ? fm.comments
          .filter((c) => isRecord(c))
          .filter(
            (c): c is { author: string; body: string } =>
              typeof c.author === "string" && typeof c.body === "string",
          )
          .map((c) => ({ author: c.author, body: c.body }))
      : [];
    const events = Array.isArray(fm.events)
      ? fm.events
          .filter((event) => isRecord(event))
          .filter(
            (
              event,
            ): event is {
              type: string;
              at: string;
              author: string;
              from?: string;
              to?: string;
              state?: string;
              note?: string;
              body?: string;
            } =>
              typeof event.type === "string" &&
              typeof event.at === "string" &&
              typeof event.author === "string",
          )
          .map((event) => ({
            type: event.type,
            at: event.at,
            author: event.author,
            from: typeof event.from === "string" ? event.from : undefined,
            to: typeof event.to === "string" ? event.to : undefined,
            state: typeof event.state === "string" ? event.state : undefined,
            note: typeof event.note === "string" ? event.note : undefined,
            body: typeof event.body === "string" ? event.body : undefined,
          }))
      : [];

    const base = {
      id: typeof fm.id === "string" ? fm.id : t.id,
      title: typeof fm.title === "string" ? fm.title : "",
      result_summary: typeof fm.result_summary === "string" ? fm.result_summary : undefined,
      risk_level:
        fm.risk_level === "low" || fm.risk_level === "med" || fm.risk_level === "high"
          ? fm.risk_level
          : undefined,
      breaking: typeof fm.breaking === "boolean" ? fm.breaking : undefined,
      status: typeof fm.status === "string" ? fm.status : "",
      priority: typeof fm.priority === "string" ? fm.priority : "",
      owner: typeof fm.owner === "string" ? fm.owner : "",
      revision:
        typeof fm.revision === "number" && Number.isInteger(fm.revision) && fm.revision > 0
          ? fm.revision
          : undefined,
      origin: normalizeTaskOrigin(fm.origin),
      plan_approval:
        isRecord(fm.plan_approval) &&
        (fm.plan_approval.state === "pending" ||
          fm.plan_approval.state === "approved" ||
          fm.plan_approval.state === "rejected")
          ? {
              state: fm.plan_approval.state,
              updated_at:
                typeof fm.plan_approval.updated_at === "string" ||
                fm.plan_approval.updated_at === null
                  ? fm.plan_approval.updated_at
                  : null,
              updated_by:
                typeof fm.plan_approval.updated_by === "string" ||
                fm.plan_approval.updated_by === null
                  ? fm.plan_approval.updated_by
                  : null,
              note:
                typeof fm.plan_approval.note === "string" || fm.plan_approval.note === null
                  ? fm.plan_approval.note
                  : null,
            }
          : { state: "pending", updated_at: null, updated_by: null, note: null },
      verification: normalizeTaskVerification(fm.verification),
      runner: normalizeTaskRunnerOutcome(fm.runner),
      sync: normalizeTaskSyncEnvelope(fm.sync),
      depends_on: dependsOn,
      tags,
      verify,
      commit,
      comments,
      doc_version: normalizeTaskDocVersion(fm.doc_version),
      doc_updated_at: typeof fm.doc_updated_at === "string" ? fm.doc_updated_at : "",
      doc_updated_by: typeof fm.doc_updated_by === "string" ? fm.doc_updated_by : "",
      description: typeof fm.description === "string" ? fm.description : "",
      dirty: false,
      id_source: "generated",
    } satisfies TasksExportTask;

    if (events.length > 0) {
      return { ...base, events };
    }
    return base;
  });

  const sorted = exportTasks.toSorted((a, b) => a.id.localeCompare(b.id));
  const checksum = computeTasksChecksum(sorted);
  const snapshot = validateTasksExportSnapshot({
    tasks: sorted,
    meta: {
      schema_version: 1,
      managed_by: "agentplane",
      checksum_algo: "sha256",
      checksum,
    },
  });

  return snapshot;
}
