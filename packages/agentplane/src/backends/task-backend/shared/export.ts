import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import {
  canonicalizeJson,
  normalizeTaskStatus,
  type TasksExportSnapshot,
} from "@agentplaneorg/core/tasks";
import { validateTasksExportSnapshot } from "@agentplaneorg/core/schemas";

import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";

import { DEFAULT_DOC_UPDATED_BY } from "./constants.js";
import { normalizeDocVersion, resolveDocUpdatedByFromTask } from "./doc.js";
import { normalizeTaskOrigin, normalizeTaskRunnerOutcome } from "./normalize.js";
import { toStringArray } from "./strings.js";
import type { TaskData, TaskEvent } from "./types.js";

const DEFAULT_EXPORT_DOC_UPDATED_AT = "1970-01-01T00:00:00.000Z";
const DEFAULT_EXPORT_TITLE = "(untitled task)";
const DEFAULT_EXPORT_OWNER = "UNKNOWN";

function normalizeExportTitle(value: TaskData["title"]): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : DEFAULT_EXPORT_TITLE;
}

function normalizeExportOwner(value: TaskData["owner"]): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : DEFAULT_EXPORT_OWNER;
}

function normalizeExportPriority(value: TaskData["priority"]): "low" | "normal" | "med" | "high" {
  if (value === "low" || value === "normal" || value === "med" || value === "high") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "medium") return "med";
    if (
      normalized === "low" ||
      normalized === "normal" ||
      normalized === "med" ||
      normalized === "high"
    ) {
      return normalized;
    }
  }
  return "med";
}

function normalizeExportDocUpdatedAt(value: TaskData["doc_updated_at"]): string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value))
    ? value
    : DEFAULT_EXPORT_DOC_UPDATED_AT;
}

function taskDataToExport(task: TaskData): TaskData & { dirty: boolean; id_source: string } {
  const base = {
    ...task,
    id: task.id,
    title: normalizeExportTitle(task.title),
    description: task.description ?? "",
    status: normalizeTaskStatus(task.status),
    priority: normalizeExportPriority(task.priority),
    owner: normalizeExportOwner(task.owner),
    result_summary: typeof task.result_summary === "string" ? task.result_summary : undefined,
    risk_level:
      task.risk_level === "low" || task.risk_level === "med" || task.risk_level === "high"
        ? task.risk_level
        : undefined,
    breaking: typeof task.breaking === "boolean" ? task.breaking : undefined,
    revision:
      typeof task.revision === "number" && Number.isInteger(task.revision) && task.revision > 0
        ? task.revision
        : undefined,
    origin: normalizeTaskOrigin(task.origin) ?? undefined,
    runner: normalizeTaskRunnerOutcome(task.runner) ?? undefined,
    depends_on: toStringArray(task.depends_on),
    tags: toStringArray(task.tags),
    verify: toStringArray(task.verify),
    plan_approval: task.plan_approval ?? {
      state: "pending",
      updated_at: null,
      updated_by: null,
      note: null,
    },
    verification: task.verification ?? {
      state: "pending",
      attempts: 0,
      updated_at: null,
      updated_by: null,
      note: null,
    },
    commit: task.commit ?? null,
    comments: Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [],
    doc_version: normalizeDocVersion(task.doc_version),
    doc_updated_at: normalizeExportDocUpdatedAt(task.doc_updated_at),
    doc_updated_by: resolveDocUpdatedByFromTask(task, DEFAULT_DOC_UPDATED_BY),
    dirty: Boolean(task.dirty),
    id_source: task.id_source ?? "generated",
  };

  const events = Array.isArray(task.events)
    ? task.events.filter(
        (event): event is TaskEvent =>
          !!event &&
          typeof event.type === "string" &&
          typeof event.at === "string" &&
          typeof event.author === "string",
      )
    : [];

  if (events.length > 0) return { ...base, events };
  return base;
}

export function buildTasksExportSnapshotFromTasks(tasks: TaskData[]): TasksExportSnapshot {
  const exportTasks = tasks.map((task) => taskDataToExport(task));
  const sorted = exportTasks.toSorted((a, b) => a.id.localeCompare(b.id));
  const canonical = JSON.stringify(canonicalizeJson({ tasks: sorted }));
  const checksum = createHash("sha256").update(canonical, "utf8").digest("hex");
  return validateTasksExportSnapshot({
    tasks: sorted,
    meta: {
      schema_version: 1,
      managed_by: "agentplane",
      checksum_algo: "sha256",
      checksum,
    },
  });
}

export async function writeTasksExportFromTasks(opts: {
  outputPath: string;
  tasks: TaskData[];
}): Promise<void> {
  const snapshot = buildTasksExportSnapshotFromTasks(opts.tasks);
  await mkdir(path.dirname(opts.outputPath), { recursive: true });
  await writeJsonStableIfChanged(opts.outputPath, snapshot);
}
