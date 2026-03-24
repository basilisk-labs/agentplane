import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "../config/config.js";
import { atomicWriteFile } from "../fs/atomic-write.js";
import { resolveProject } from "../project/project-root.js";
import {
  listTasks,
  type TaskOrigin,
  type TaskRunnerExecutionMetrics,
  type TaskRunnerHistoryEntry,
  type TaskRunnerOutcome,
  type TaskRunnerTarget,
} from "./task-store.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeTaskDocVersion(value: unknown, fallback: 2 | 3 = 3): 2 | 3 {
  return value === 3 ? 3 : value === 2 ? 2 : fallback;
}

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
  status: string;
  priority: string;
  owner: string;
  origin?: TaskOrigin;
  runner?: TaskRunnerOutcome;
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
  doc_version: 2 | 3;
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
      status: typeof fm.status === "string" ? fm.status : "",
      priority: typeof fm.priority === "string" ? fm.priority : "",
      owner: typeof fm.owner === "string" ? fm.owner : "",
      origin: normalizeTaskOrigin(fm.origin),
      runner: normalizeTaskRunnerOutcome(fm.runner),
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

  return {
    tasks: sorted,
    meta: {
      schema_version: 1,
      managed_by: "agentplane",
      checksum_algo: "sha256",
      checksum,
    },
  };
}

export async function writeTasksExport(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<{ path: string; snapshot: TasksExportSnapshot }> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const outPath = path.join(resolved.gitRoot, loaded.config.paths.tasks_path);

  const snapshot = await buildTasksExportSnapshot(opts);

  await mkdir(path.dirname(outPath), { recursive: true });
  await atomicWriteFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`);

  return { path: outPath, snapshot };
}
