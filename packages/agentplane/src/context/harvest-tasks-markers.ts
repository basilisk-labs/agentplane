import { createHash } from "node:crypto";

import type { TaskData } from "../backends/task-backend.js";
import { isRecord } from "./context-utils.js";

export type TaskHarvestMarker = {
  schema_version: 1;
  pipeline: "context.harvest.tasks";
  state: "ingested";
  harvested_at: string;
  source_digest: string;
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

function sectionText(task: TaskData, section: string): string {
  const sections = isRecord(task.sections) ? task.sections : {};
  const value = sections[section];
  return typeof value === "string" ? value.trim() : "";
}

export function taskText(task: HarvestMarkerTask): string {
  const parts = [
    task.title,
    typeof task.description === "string" ? task.description : "",
    sectionText(task, "Summary"),
    sectionText(task, "Plan"),
    sectionText(task, "Verification"),
    sectionText(task, "Findings"),
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
  return `sha256:${createHash("sha256").update(taskText(task)).digest("hex")}`;
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
