import type { TaskRecord } from "@agentplaneorg/core";

import { isRecord } from "../../../shared/guards.js";

import { extractTaskDoc } from "./doc.js";
import { normalizeEvents } from "./events.js";
import {
  normalizeDependsOn,
  normalizePlanApproval,
  normalizeVerificationResult,
} from "./normalize.js";
import { toStringArray } from "./strings.js";
import type { TaskData } from "./types.js";

export function taskRecordToData(record: TaskRecord): TaskData {
  const fm = record.frontmatter as unknown as Record<string, unknown>;
  const comments = Array.isArray(fm.comments)
    ? fm.comments
        .filter((item) => isRecord(item))
        .filter(
          (item): item is { author: string; body: string } =>
            typeof item.author === "string" && typeof item.body === "string",
        )
        .map((item) => ({ author: item.author, body: item.body }))
    : [];

  const commit =
    isRecord(fm.commit) &&
    typeof fm.commit.hash === "string" &&
    typeof fm.commit.message === "string"
      ? { hash: fm.commit.hash, message: fm.commit.message }
      : null;

  const events = normalizeEvents(fm.events);
  const planApproval = normalizePlanApproval(fm.plan_approval);
  const verification = normalizeVerificationResult(fm.verification);

  const baseId = typeof fm.id === "string" ? fm.id : typeof record.id === "string" ? record.id : "";
  const task: TaskData = {
    id: baseId.trim(),
    title: typeof fm.title === "string" ? fm.title : "",
    description: typeof fm.description === "string" ? fm.description : "",
    status: typeof fm.status === "string" ? fm.status : "TODO",
    priority: typeof fm.priority === "string" || typeof fm.priority === "number" ? fm.priority : "",
    owner: typeof fm.owner === "string" ? fm.owner : "",
    depends_on: normalizeDependsOn(fm.depends_on),
    tags: toStringArray(fm.tags),
    verify: toStringArray(fm.verify),
    plan_approval: planApproval ?? undefined,
    verification: verification ?? undefined,
    commit,
    comments,
    events,
    doc_version: typeof fm.doc_version === "number" ? fm.doc_version : undefined,
    doc_updated_at: typeof fm.doc_updated_at === "string" ? fm.doc_updated_at : undefined,
    doc_updated_by: typeof fm.doc_updated_by === "string" ? fm.doc_updated_by : undefined,
    dirty: typeof fm.dirty === "boolean" ? fm.dirty : undefined,
    id_source: typeof fm.id_source === "string" ? fm.id_source : undefined,
  };

  const doc = extractTaskDoc(record.body);
  if (doc) task.doc = doc;

  return task;
}
