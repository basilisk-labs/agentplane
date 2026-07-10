import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../backends/task-backend.js";
import { isRecord } from "./context-utils.js";

export type TaskHarvestMarker = {
  schema_version: 1;
  pipeline: "context.harvest.tasks";
  state: "ingested";
  harvested_at: string;
  source_digest: string;
  source_fingerprint_version: 1;
  raw_evidence_path: string;
  report_path: string;
  wiki_proposal_path: string;
  promoted_path: string | null;
  promotion_state: "proposal" | "promoted" | "blocked";
  fact_ids: string[];
  source_refs: string[];
};

export type TaskHarvestLedgerRow = TaskHarvestMarker & {
  id: string;
  task_id: string;
};

type HarvestMarkerTask = TaskData & { id: string; title: string; status: string };

type MarkerEvidence = {
  id: string;
  text_digest: string;
  source_refs: string[];
};

type MarkerFact = {
  id: string;
  task_id: string;
};

export type TaskSourceFingerprint = {
  version: 1 | 2;
  digest: string;
  size_bytes: number;
};

async function readOptionalText(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map((entry) => stableJson(entry)).join(",")}]`;
  if (!isRecord(value)) return JSON.stringify(value) ?? "null";
  return `{${Object.keys(value)
    .toSorted()
    .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
    .join(",")}}`;
}

function extractionDigestTask(task: HarvestMarkerTask): Record<string, unknown> {
  const extensions = isRecord(task.extensions) ? { ...task.extensions } : {};
  delete extensions.context_harvest;
  delete extensions.context_task_extraction;
  const {
    dirty: _dirty,
    doc_updated_at: _docUpdatedAt,
    doc_updated_by: _docUpdatedBy,
    revision: _revision,
    ...sourceTask
  } = task;
  return { ...sourceTask, extensions };
}

function sectionText(task: TaskData, section: string): string {
  const sections = isRecord(task.sections) ? task.sections : {};
  const value = sections[section];
  return typeof value === "string" ? value.trim() : "";
}

export function taskText(task: HarvestMarkerTask): string {
  const fullDoc = typeof task.doc === "string" ? task.doc.trim() : "";
  const parts = [
    task.title,
    typeof task.description === "string" ? task.description : "",
    fullDoc || sectionText(task, "Summary"),
    ...(fullDoc
      ? []
      : [
          sectionText(task, "Plan"),
          sectionText(task, "Verification"),
          sectionText(task, "Findings"),
        ]),
    task.commit && typeof task.commit.message === "string" ? task.commit.message : "",
  ];
  if (Array.isArray(task.comments)) {
    for (const comment of task.comments) {
      if (isRecord(comment) && typeof comment.body === "string") parts.push(comment.body);
    }
  }
  return parts.filter((part) => part.trim()).join("\n\n");
}

export function taskTextDigest(task: HarvestMarkerTask): string {
  return taskSourceFingerprint(task).digest;
}

export function taskSourceFingerprint(task: HarvestMarkerTask): TaskSourceFingerprint {
  const text = taskText(task);
  return {
    version: 1,
    digest: `sha256:${createHash("sha256").update(text).digest("hex")}`,
    size_bytes: Buffer.byteLength(text, "utf8"),
  };
}

async function taskExtractionSourceFingerprint(
  root: string,
  task: HarvestMarkerTask,
): Promise<TaskSourceFingerprint> {
  const taskRoot = path.join(root, ".agentplane", "tasks", task.id);
  const [readmeText, acrText] = await Promise.all([
    readOptionalText(path.join(taskRoot, "README.md")),
    readOptionalText(path.join(taskRoot, "acr.json")),
  ]);
  const canonicalTask = stableJson(extractionDigestTask(task));
  const readmeSource = readmeText ?? canonicalTask;
  const acrSource = acrText ?? "";
  const digest = createHash("sha256")
    .update("task\0")
    .update(canonicalTask)
    .update("\0acr\0")
    .update(acrSource)
    .digest("hex");
  return {
    version: 2,
    digest: `sha256:${digest}`,
    size_bytes: Buffer.byteLength(readmeSource, "utf8") + Buffer.byteLength(acrSource, "utf8"),
  };
}

export async function taskExtractionSourceFingerprints(
  root: string,
  tasks: HarvestMarkerTask[],
): Promise<Map<string, TaskSourceFingerprint>> {
  return new Map(
    await Promise.all(
      tasks.map(
        async (task) => [task.id, await taskExtractionSourceFingerprint(root, task)] as const,
      ),
    ),
  );
}

function existingHarvestMarker(task: HarvestMarkerTask): TaskHarvestMarker | null {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const marker = extensions.context_harvest;
  if (!isRecord(marker) || marker.pipeline !== "context.harvest.tasks") return null;
  return marker as TaskHarvestMarker;
}

export function alreadyHarvestedUnchanged(
  task: HarvestMarkerTask,
  opts: { task: string[]; promote: boolean },
): boolean {
  const marker = existingHarvestMarker(task);
  if (marker?.source_digest !== taskTextDigest(task)) return false;
  if (opts.task.includes(task.id)) return false;
  if (opts.promote && marker.promotion_state !== "promoted") return false;
  return true;
}

export function buildTaskHarvestMarkers(opts: {
  evidence: MarkerEvidence[];
  facts: MarkerFact[];
  reportPath: string;
  wikiPath: string;
  report: {
    generated_at: string;
    promotion_gate: {
      state: "proposal" | "promoted" | "blocked";
      promoted_path: string | null;
    };
  };
}): Record<string, TaskHarvestMarker> {
  const factsByTask = new Map<string, MarkerFact[]>();
  for (const fact of opts.facts) {
    factsByTask.set(fact.task_id, [...(factsByTask.get(fact.task_id) ?? []), fact]);
  }
  return Object.fromEntries(
    opts.evidence.map((row) => {
      const marker: TaskHarvestMarker = {
        schema_version: 1,
        pipeline: "context.harvest.tasks",
        state: "ingested",
        harvested_at: opts.report.generated_at,
        source_digest: row.text_digest,
        source_fingerprint_version: 1,
        raw_evidence_path: `context/raw/tasks/${row.id}.json`,
        report_path: opts.reportPath,
        wiki_proposal_path: opts.wikiPath,
        promoted_path: opts.report.promotion_gate.promoted_path,
        promotion_state: opts.report.promotion_gate.state,
        fact_ids: (factsByTask.get(row.id) ?? []).map((fact) => fact.id),
        source_refs: row.source_refs,
      };
      return [row.id, marker];
    }),
  );
}

export function buildTaskHarvestLedgerRows(
  markers: Record<string, TaskHarvestMarker>,
): TaskHarvestLedgerRow[] {
  return Object.entries(markers).map(([taskId, marker]) => ({
    id: `task:${taskId}`,
    task_id: taskId,
    ...marker,
  }));
}
