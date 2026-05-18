import type { TaskRecord } from "@agentplaneorg/core/tasks";
import {
  normalizeTaskStatus,
  normalizeTaskDocVersion,
  renderTaskDocFromSections,
  taskDocToSectionMap,
} from "@agentplaneorg/core/tasks";

import { isRecord } from "../../../shared/guards.js";

import { extractTaskDoc } from "./doc.js";
import { normalizeEvents } from "./events.js";
import {
  normalizeDependsOn,
  normalizePlanApproval,
  normalizeTaskOrigin,
  normalizeTaskRunnerOutcome,
  normalizeVerificationResult,
} from "./normalize.js";
import { toStringArray } from "./strings.js";
import type { TaskData } from "./types.js";

const TASK_KIND_VALUES = new Set([
  "analysis",
  "content",
  "docs",
  "code",
  "release",
  "ops",
  "context",
]);
const MUTATION_SCOPE_VALUES = new Set([
  "none",
  "docs",
  "code",
  "release",
  "ops",
  "context",
  "unknown",
]);
const RISK_FLAG_VALUES = new Set([
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
]);
const BLUEPRINT_REQUEST_VALUES = new Set([
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "performance.benchmark",
  "quality.regression",
  "context.assimilation",
  "post_run.improvement_review",
  "release.strict",
  "ops.approval",
]);

function normalizeRevision(value: unknown): number | undefined {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : undefined;
}

function normalizeCanonicalSections(value: unknown): Record<string, string> | undefined {
  if (!isRecord(value)) return undefined;
  const out: Record<string, string> = {};
  for (const [title, text] of Object.entries(value)) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle || typeof text !== "string") continue;
    out[normalizedTitle] = text.replaceAll("\r\n", "\n").trimEnd();
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function mergeTaskDocSections(opts: {
  frontmatterSections?: Record<string, string>;
  body: string;
}): Record<string, string> | undefined {
  if (!opts.frontmatterSections) return undefined;
  const bodyDoc = extractTaskDoc(opts.body);
  const bodySections = bodyDoc ? taskDocToSectionMap(bodyDoc) : undefined;
  const merged = bodySections
    ? { ...bodySections, ...opts.frontmatterSections }
    : { ...opts.frontmatterSections };
  return merged && Object.keys(merged).length > 0 ? merged : undefined;
}

function stringEnumValue<T extends string>(value: unknown, allowed: Set<string>): T | undefined {
  return typeof value === "string" && allowed.has(value) ? (value as T) : undefined;
}

function stringEnumArray<T extends string>(value: unknown, allowed: Set<string>): T[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out = value
    .filter((item): item is string => typeof item === "string" && allowed.has(item))
    .filter((item, index, array) => array.indexOf(item) === index) as T[];
  return out.length > 0 ? out : undefined;
}

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
  const origin = normalizeTaskOrigin(fm.origin);
  const runner = normalizeTaskRunnerOutcome(fm.runner);
  const sections = mergeTaskDocSections({
    frontmatterSections: normalizeCanonicalSections(fm.sections),
    body: record.body,
  });
  const doc = sections ? renderTaskDocFromSections(sections) : extractTaskDoc(record.body);

  const baseId = typeof fm.id === "string" ? fm.id : typeof record.id === "string" ? record.id : "";
  const task: TaskData = {
    id: baseId.trim(),
    title: typeof fm.title === "string" ? fm.title : "",
    result_summary: typeof fm.result_summary === "string" ? fm.result_summary : undefined,
    risk_level:
      fm.risk_level === "low" || fm.risk_level === "med" || fm.risk_level === "high"
        ? fm.risk_level
        : undefined,
    breaking: typeof fm.breaking === "boolean" ? fm.breaking : undefined,
    description: typeof fm.description === "string" ? fm.description : "",
    status: normalizeTaskStatus(fm.status),
    priority: typeof fm.priority === "string" || typeof fm.priority === "number" ? fm.priority : "",
    owner: typeof fm.owner === "string" ? fm.owner : "",
    revision: normalizeRevision(fm.revision) ?? 1,
    origin: origin ?? undefined,
    depends_on: normalizeDependsOn(fm.depends_on),
    tags: toStringArray(fm.tags),
    task_kind: stringEnumValue<TaskData["task_kind"] & string>(fm.task_kind, TASK_KIND_VALUES),
    mutation_scope: stringEnumValue<TaskData["mutation_scope"] & string>(
      fm.mutation_scope,
      MUTATION_SCOPE_VALUES,
    ),
    risk_flags: stringEnumArray<NonNullable<TaskData["risk_flags"]>[number]>(
      fm.risk_flags,
      RISK_FLAG_VALUES,
    ),
    blueprint_request: stringEnumValue<TaskData["blueprint_request"] & string>(
      fm.blueprint_request,
      BLUEPRINT_REQUEST_VALUES,
    ),
    verify: toStringArray(fm.verify),
    plan_approval: planApproval ?? undefined,
    verification: verification ?? undefined,
    runner: runner ?? undefined,
    commit,
    comments,
    events,
    extensions: isRecord(fm.extensions) ? fm.extensions : undefined,
    doc_version:
      typeof fm.doc_version === "number" ? normalizeTaskDocVersion(fm.doc_version) : undefined,
    doc_updated_at: typeof fm.doc_updated_at === "string" ? fm.doc_updated_at : undefined,
    doc_updated_by: typeof fm.doc_updated_by === "string" ? fm.doc_updated_by : undefined,
    dirty: typeof fm.dirty === "boolean" ? fm.dirty : undefined,
    id_source: typeof fm.id_source === "string" ? fm.id_source : undefined,
  };

  if (doc) task.doc = doc;
  task.sections = sections ?? (doc ? taskDocToSectionMap(doc) : undefined);

  return task;
}
