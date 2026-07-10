import type { ContextExtractionSgrResult, SgrSourceRef } from "./sgr-extraction.js";

function compactRow(row: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(row).filter(([, value]) => value !== undefined));
}

export function slugFragment(value: string): string {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "")
    .slice(0, 80);
}

export function stringField(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function countSourceRefs(result: ContextExtractionSgrResult): {
  inputSourcePaths: number;
  sourcePaths: number;
  sourceRefs: number;
} {
  const inputSourcePaths = new Set<string>();
  const sourcePaths = new Set<string>();
  let sourceRefs = 0;
  for (const ref of result.source_refs) inputSourcePaths.add(ref.path);
  for (const item of result.extracted_items) {
    sourceRefs += item.source_refs.length;
    for (const ref of item.source_refs) sourcePaths.add(ref.path);
  }
  return { inputSourcePaths: inputSourcePaths.size, sourcePaths: sourcePaths.size, sourceRefs };
}

function hasPreciseSourceRef(ref: SgrSourceRef): boolean {
  return ref.lines !== undefined || typeof ref.line === "number" || ref.section !== undefined;
}

export function qualityScope(taskId: string | undefined): string {
  return slugFragment(taskId ?? "unscoped");
}

function qualityRow(opts: {
  taskId?: string;
  signalType: string;
  subject: string;
  severity: "info" | "warning";
  summary: string;
  evidenceItemIds?: string[];
  evidenceSourcePaths?: string[];
  suggestedAction: string;
}): Record<string, unknown> {
  return compactRow({
    schema_version: 1,
    id: `quality.${qualityScope(opts.taskId)}.${opts.signalType}.${slugFragment(opts.subject)}`,
    signal_type: opts.signalType,
    severity: opts.severity,
    subject: opts.subject,
    summary: opts.summary,
    ...(opts.taskId ? { task_id: opts.taskId } : {}),
    ...(opts.evidenceItemIds?.length ? { evidence_item_ids: opts.evidenceItemIds } : {}),
    ...(opts.evidenceSourcePaths?.length
      ? { evidence_source_paths: opts.evidenceSourcePaths }
      : {}),
    suggested_action: opts.suggestedAction,
  });
}

export function buildExtractionQualityRows(
  result: ContextExtractionSgrResult,
  taskId?: string,
): Record<string, unknown>[] {
  const rows: Record<string, unknown>[] = [];
  const extractedSourcePaths = new Set<string>();
  const coverageSourcePaths = new Set<string>();
  const entityIds = new Set<string>();
  const connectedEntityIds = new Set<string>();
  const pageCreationIds: string[] = [];
  let topologyDecisions = 0;

  for (const item of result.extracted_items) {
    for (const ref of item.source_refs) extractedSourcePaths.add(ref.path);
    if (item.kind === "coverage" && item.coverage) {
      coverageSourcePaths.add(item.coverage.source_path);
    }
    if (item.kind === "graph_entity" && item.entity) entityIds.add(item.entity.id);
    if (item.kind === "graph_edge" && item.edge) {
      connectedEntityIds.add(item.edge.from);
      connectedEntityIds.add(item.edge.to);
    }
    if (item.kind === "page_creation") pageCreationIds.push(item.id);
    if (item.kind === "topology_decision") topologyDecisions += 1;
  }

  const uncoveredInputSources = result.source_refs
    .map((ref) => ref.path)
    .filter((sourcePath, index, paths) => paths.indexOf(sourcePath) === index)
    .filter(
      (sourcePath) => !extractedSourcePaths.has(sourcePath) && !coverageSourcePaths.has(sourcePath),
    );
  if (uncoveredInputSources.length > 0) {
    rows.push(
      qualityRow({
        taskId,
        signalType: "source_scope_gap",
        subject: "input-sources",
        severity: "warning",
        summary:
          "Some declared input sources produced no extracted rows and no explicit coverage rows.",
        evidenceSourcePaths: uncoveredInputSources,
        suggestedAction:
          "Add coverage rows marking these sources covered, duplicate, out_of_scope, redacted, or unresolved before claiming complete assimilation.",
      }),
    );
  }

  const impreciseItems = result.extracted_items
    .filter((item) => item.source_refs.every((ref) => !hasPreciseSourceRef(ref)))
    .map((item) => item.id);
  if (impreciseItems.length > 0) {
    rows.push(
      qualityRow({
        taskId,
        signalType: "source_precision_gap",
        subject: "source-refs",
        severity: "warning",
        summary: "Some extracted items lack line-, section-, or span-addressed source references.",
        evidenceItemIds: impreciseItems.slice(0, 20),
        suggestedAction:
          "Attach line, lines, section, or span references so later wiki summaries can be traced back without semantic drift.",
      }),
    );
  }

  const riskyNormalizationIds = result.extracted_items
    .filter((item) => item.kind === "entity_resolution")
    .filter((item) => {
      const confidence =
        item.confidence_vector?.entity_resolution ??
        item.confidence_vector?.extraction ??
        item.confidence;
      return item.status !== "accepted" || confidence === undefined || confidence < 0.75;
    })
    .map((item) => item.id);
  if (riskyNormalizationIds.length > 0) {
    rows.push(
      qualityRow({
        taskId,
        signalType: "normalization_uncertainty",
        subject: "entity-resolution",
        severity: "warning",
        summary:
          "Some entity-resolution rows are proposed, unresolved, or lack sufficient confidence.",
        evidenceItemIds: riskyNormalizationIds,
        suggestedAction:
          "Keep these rows as candidates or add do-not-merge/open-question evidence before using them to canonicalize wiki terminology.",
      }),
    );
  }

  const singletonEntityIds = [...entityIds].filter((entityId) => !connectedEntityIds.has(entityId));
  if (
    singletonEntityIds.length >= 3 &&
    singletonEntityIds.length / Math.max(entityIds.size, 1) >= 0.6
  ) {
    rows.push(
      qualityRow({
        taskId,
        signalType: "over_fragmentation_risk",
        subject: "graph-entities",
        severity: "warning",
        summary:
          "Most extracted graph entities are singletons, which can indicate excessive fragmentation before topology planning.",
        evidenceItemIds: singletonEntityIds.slice(0, 20),
        suggestedAction:
          "Add graph edges, page clusters, or explicit topology decisions before publishing one page per extracted entity.",
      }),
    );
  }

  if (pageCreationIds.length > 0 && topologyDecisions === 0) {
    rows.push(
      qualityRow({
        taskId,
        signalType: "topology_without_decision",
        subject: "page-creation",
        severity: "info",
        summary:
          "Page creation rows exist without a topology_decision row explaining the page family and split/merge rationale.",
        evidenceItemIds: pageCreationIds.slice(0, 20),
        suggestedAction:
          "Add a topology_decision row so wiki publication can distinguish source-shaped structure from default scaffolding.",
      }),
    );
  }

  return rows;
}
