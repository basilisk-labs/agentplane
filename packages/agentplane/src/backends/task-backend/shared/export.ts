import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { canonicalizeJson } from "@agentplaneorg/core";

import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";

import { DEFAULT_DOC_UPDATED_BY, DOC_VERSION } from "./constants.js";
import { resolveDocUpdatedByFromTask } from "./doc.js";
import { toStringArray } from "./strings.js";
import type { TaskData, TaskEvent } from "./types.js";

function taskDataToExport(task: TaskData): TaskData & { dirty: boolean; id_source: string } {
  const base = {
    ...task,
    id: task.id,
    title: task.title ?? "",
    description: task.description ?? "",
    status: task.status ?? "",
    priority: typeof task.priority === "number" ? String(task.priority) : (task.priority ?? ""),
    owner: task.owner ?? "",
    depends_on: toStringArray(task.depends_on),
    tags: toStringArray(task.tags),
    verify: toStringArray(task.verify),
    commit: task.commit ?? null,
    comments: Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [],
    doc_version: task.doc_version ?? DOC_VERSION,
    doc_updated_at: task.doc_updated_at ?? "",
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

export function buildTasksExportSnapshotFromTasks(tasks: TaskData[]): {
  tasks: TaskData[];
  meta: { schema_version: 1; managed_by: string; checksum_algo: "sha256"; checksum: string };
} {
  const exportTasks = tasks.map((task) => taskDataToExport(task));
  const sorted = exportTasks.toSorted((a, b) => a.id.localeCompare(b.id));
  const canonical = JSON.stringify(canonicalizeJson({ tasks: sorted }));
  const checksum = createHash("sha256").update(canonical, "utf8").digest("hex");
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

export async function writeTasksExportFromTasks(opts: {
  outputPath: string;
  tasks: TaskData[];
}): Promise<void> {
  const snapshot = buildTasksExportSnapshotFromTasks(opts.tasks);
  await mkdir(path.dirname(opts.outputPath), { recursive: true });
  await writeJsonStableIfChanged(opts.outputPath, snapshot);
}
