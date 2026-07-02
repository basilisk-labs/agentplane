import path from "node:path";

import { fileExists, isRecord, parseJsonlLines, readText } from "./context-utils.js";

type ContextExtension = {
  mode?: string;
  task_type?: string;
  source_set?: {
    files?: { path?: unknown }[];
  };
};

const COVERAGE_STATUSES = new Set([
  "covered",
  "omitted_boilerplate",
  "redacted",
  "duplicate",
  "conflict",
  "out_of_scope",
  "unresolved",
]);

function isProfileSwitchContextTask(context: ContextExtension): boolean {
  return (
    context.task_type === "context_profile_switch" || context.task_type === "context_configuration"
  );
}

function rowSourceRefs(row: Record<string, unknown>): string[] {
  const out: string[] = [];
  if (typeof row.source_ref === "string" && row.source_ref.trim()) out.push(row.source_ref);
  if (typeof row.source === "string" && row.source.trim()) out.push(row.source);
  if (Array.isArray(row.source_refs)) {
    out.push(...row.source_refs.filter((value): value is string => typeof value === "string"));
  }
  return out;
}

async function loadJsonlRows(filePath: string): Promise<Record<string, unknown>[]> {
  if (!(await fileExists(filePath))) return [];
  return parseJsonlLines(await readText(filePath)) as Record<string, unknown>[];
}

function rowStringArray(row: Record<string, unknown>, field: string): string[] {
  const value = row[field];
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "");
}

function rowIds(rows: Record<string, unknown>[]): Set<string> {
  return new Set(
    rows.map((row) => (typeof row.id === "string" ? row.id.trim() : "")).filter((id) => id !== ""),
  );
}

export async function validateMaximumAssimilationCoverage(
  root: string,
  context: ContextExtension,
  errors: string[],
  taskId?: string,
): Promise<void> {
  if (context.mode !== "maximum_assimilation" || isProfileSwitchContextTask(context)) return;

  const rel = ".agentplane/context/derived/reports/coverage.jsonl";
  const rows = await loadJsonlRows(path.join(root, rel));
  if (rows.length === 0) {
    errors.push(`${rel}: maximum-assimilation requires non-empty source coverage rows`);
    return;
  }

  const coveredSourcePaths = new Set<string>();
  for (const row of rows) {
    const id = typeof row.id === "string" && row.id.trim() ? row.id : "<unknown>";
    const sourcePath = typeof row.source_path === "string" ? row.source_path.trim() : "";
    const status = typeof row.coverage_status === "string" ? row.coverage_status.trim() : "";
    const reason = typeof row.reason === "string" ? row.reason.trim() : "";

    if (id === "<unknown>") errors.push(`${rel}#${id}: coverage row missing id`);
    if (!sourcePath) errors.push(`${rel}#${id}: coverage row missing source_path`);
    if (!COVERAGE_STATUSES.has(status)) {
      errors.push(`${rel}#${id}: invalid coverage_status ${status || "<missing>"}`);
    }
    if (!reason) errors.push(`${rel}#${id}: coverage row must include reason`);
    if (rowSourceRefs(row).length === 0) {
      errors.push(`${rel}#${id}: coverage row has no source_ref/source_refs`);
    }
    if (status === "covered") {
      const coveredItemIds = rowStringArray(row, "covered_item_ids");
      if (coveredItemIds.length === 0) {
        errors.push(`${rel}#${id}: covered coverage rows must include covered_item_ids`);
      }
      if (rowStringArray(row, "target_paths").length === 0) {
        errors.push(`${rel}#${id}: covered coverage rows must include target_paths`);
      }
    }
    if (status === "duplicate" && typeof row.duplicate_of_span_id !== "string") {
      errors.push(`${rel}#${id}: duplicate coverage rows must include duplicate_of_span_id`);
    }
    if (sourcePath) coveredSourcePaths.add(sourcePath);
  }

  const contradictionIds = rowIds(
    await loadJsonlRows(path.join(root, ".agentplane/context/derived/claims/contradictions.jsonl")),
  );
  const openQuestionIds = rowIds(
    await loadJsonlRows(path.join(root, ".agentplane/context/derived/claims/open_questions.jsonl")),
  );
  for (const row of rows) {
    const id = typeof row.id === "string" && row.id.trim() ? row.id : "<unknown>";
    const status = typeof row.coverage_status === "string" ? row.coverage_status.trim() : "";
    const coveredItemIds = rowStringArray(row, "covered_item_ids");
    if (status === "conflict" && !coveredItemIds.some((itemId) => contradictionIds.has(itemId))) {
      errors.push(`${rel}#${id}: conflict coverage rows must reference a contradiction record`);
    }
    if (status === "unresolved" && !coveredItemIds.some((itemId) => openQuestionIds.has(itemId))) {
      errors.push(`${rel}#${id}: unresolved coverage rows must reference an open_question record`);
    }
  }

  if (taskId) {
    const skeletonRel = `.agentplane/tasks/${taskId}/source-spans.skeleton.jsonl`;
    const skeletonRows = await loadJsonlRows(path.join(root, skeletonRel));
    if (skeletonRows.length === 0) {
      errors.push(`${skeletonRel}: maximum-assimilation requires source span skeleton rows`);
    } else {
      const coveredSpanIds = new Set(
        rows
          .map((row) => (typeof row.span_id === "string" ? row.span_id.trim() : ""))
          .filter((spanId) => spanId !== ""),
      );
      for (const span of skeletonRows) {
        const spanId = typeof span.span_id === "string" ? span.span_id.trim() : "";
        if (!spanId) {
          errors.push(`${skeletonRel}: source span row missing span_id`);
          continue;
        }
        if (!coveredSpanIds.has(spanId)) {
          errors.push(`${rel}: missing coverage row for source span ${spanId}`);
        }
      }
    }
  }

  const sourceFiles = Array.isArray(context.source_set?.files) ? context.source_set.files : [];
  for (const file of sourceFiles) {
    if (!isRecord(file) || typeof file.path !== "string" || !file.path.trim()) continue;
    if (!coveredSourcePaths.has(file.path)) {
      errors.push(`${rel}: missing coverage row for source ${file.path}`);
    }
  }
}
