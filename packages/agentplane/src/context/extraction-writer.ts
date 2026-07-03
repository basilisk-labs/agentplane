import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { writeTextIfChanged } from "../shared/write-if-changed.js";
import {
  validateContextExtractionSgrResult,
  type ContextExtractionItem,
  type ContextExtractionSgrResult,
  type SgrSourceRef,
} from "./sgr-extraction.js";
import { fileExists, parseJsonlLines, toPosix } from "./context-utils.js";

type ApplyResult = {
  items: number;
  input_source_paths: number;
  source_paths: number;
  source_refs: number;
  facts: number;
  entities: number;
  edges: number;
  provenance: number;
  coverage: number;
  claims: number;
  ontology: number;
  sources: number;
  wiki: number;
  quality: number;
  changed_paths: string[];
};

const CLAIM_PATH_BY_KIND = {
  claim: ".agentplane/context/derived/claims/claims.jsonl",
  definition: ".agentplane/context/derived/claims/definitions.jsonl",
  decision: ".agentplane/context/derived/claims/decisions.jsonl",
  requirement: ".agentplane/context/derived/claims/requirements.jsonl",
  constraint: ".agentplane/context/derived/claims/constraints.jsonl",
  invariant: ".agentplane/context/derived/claims/invariants.jsonl",
  procedure: ".agentplane/context/derived/claims/procedures.jsonl",
  workflow: ".agentplane/context/derived/claims/workflows.jsonl",
  api_contract: ".agentplane/context/derived/claims/api_contracts.jsonl",
  code_symbol: ".agentplane/context/derived/claims/code_symbols.jsonl",
  risk: ".agentplane/context/derived/claims/risks.jsonl",
  open_question: ".agentplane/context/derived/claims/open_questions.jsonl",
  contradiction: ".agentplane/context/derived/claims/contradictions.jsonl",
  deprecation: ".agentplane/context/derived/claims/deprecations.jsonl",
  example: ".agentplane/context/derived/claims/examples.jsonl",
} as const satisfies Partial<Record<ContextExtractionItem["kind"], string>>;

function sourceRefToString(ref: SgrSourceRef): string {
  if (ref.lines) return `${ref.path}#lines=${ref.lines}`;
  if (typeof ref.line === "number") return `${ref.path}#L${ref.line}`;
  if (ref.section) return `${ref.path}#${ref.section}`;
  return ref.path;
}

function rowId(row: Record<string, unknown>): string {
  return typeof row.id === "string" ? row.id : "";
}

async function readJsonlById(filePath: string): Promise<Map<string, Record<string, unknown>>> {
  if (!(await fileExists(filePath))) return new Map();
  const rows = parseJsonlLines(await readFile(filePath, "utf8")) as Record<string, unknown>[];
  const byId = new Map<string, Record<string, unknown>>();
  for (const row of rows) {
    const id = rowId(row);
    if (id) byId.set(id, row);
  }
  return byId;
}

async function writeJsonlById(
  filePath: string,
  rows: Map<string, Record<string, unknown>>,
  dryRun: boolean,
): Promise<boolean> {
  const sorted = [...rows.values()].toSorted((a, b) => rowId(a).localeCompare(rowId(b)));
  const text = sorted.map((row) => JSON.stringify(row)).join("\n");
  const next = text ? `${text}\n` : "";
  const exists = await fileExists(filePath);
  if (!next && !exists) return false;
  if (dryRun) {
    const current = exists ? await readFile(filePath, "utf8") : "";
    return current !== next;
  }
  await mkdir(path.dirname(filePath), { recursive: true });
  return await writeTextIfChanged(filePath, next);
}

async function writeJsonObject(
  filePath: string,
  value: Record<string, unknown> | null,
  dryRun: boolean,
): Promise<boolean> {
  if (value === null) return false;
  const next = `${JSON.stringify(value, null, 2)}\n`;
  if (dryRun) {
    const current = (await fileExists(filePath)) ? await readFile(filePath, "utf8") : "";
    return current !== next;
  }
  await mkdir(path.dirname(filePath), { recursive: true });
  return await writeTextIfChanged(filePath, next);
}

function compactRow(row: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(row).filter(([, value]) => value !== undefined));
}

function baseRow(item: ContextExtractionItem, taskId?: string): Record<string, unknown> {
  return compactRow({
    id: item.id,
    kind: item.kind,
    summary: item.summary,
    source_refs: item.source_refs.map((sourceRef) => sourceRefToString(sourceRef)),
    source_ref_objects: item.source_refs,
    confidence: item.confidence,
    confidence_vector: item.confidence_vector,
    status: item.status,
    validity: item.validity,
    scope: item.scope,
    span_refs: item.span_refs,
    canonical_refs: item.canonical_refs,
    supersedes: item.supersedes,
    superseded_by: item.superseded_by,
    contradicts: item.contradicts,
    depends_on: item.depends_on,
    ...(taskId ? { task_id: taskId } : {}),
    ...(item.target_path ? { target_path: item.target_path } : {}),
    ...(item.stale_markers?.length ? { stale_markers: item.stale_markers } : {}),
    ...(item.conflict_markers?.length ? { conflict_markers: item.conflict_markers } : {}),
  });
}

function provenanceRows(
  item: ContextExtractionItem,
  artifact: string,
  taskId?: string,
): Record<string, unknown>[] {
  return item.source_refs.map((source, index) => ({
    id: `prov.${item.id}.${index + 1}`,
    source: sourceRefToString(source),
    target: item.id,
    artifact,
    ...(taskId ? { task_id: taskId } : {}),
  }));
}

function graphStatus(status?: string): string {
  if (status === "stale") return "deprecated";
  return "active";
}

function slugFragment(value: string): string {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "")
    .slice(0, 80);
}

function stringField(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function countSourceRefs(result: ContextExtractionSgrResult): {
  inputSourcePaths: number;
  sourcePaths: number;
  sourceRefs: number;
} {
  const inputSourcePaths = new Set<string>();
  const sourcePaths = new Set<string>();
  let sourceRefs = 0;
  for (const ref of result.source_refs) {
    inputSourcePaths.add(ref.path);
  }
  for (const item of result.extracted_items) {
    sourceRefs += item.source_refs.length;
    for (const ref of item.source_refs) {
      sourcePaths.add(ref.path);
    }
  }
  return { inputSourcePaths: inputSourcePaths.size, sourcePaths: sourcePaths.size, sourceRefs };
}

function hasPreciseSourceRef(ref: SgrSourceRef): boolean {
  return ref.lines !== undefined || typeof ref.line === "number" || ref.section !== undefined;
}

function qualityScope(taskId: string | undefined): string {
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

function buildExtractionQualityRows(
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
    if (item.kind === "coverage" && item.coverage)
      coverageSourcePaths.add(item.coverage.source_path);
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

export async function applyContextExtractionResult(opts: {
  root: string;
  raw: unknown;
  taskId?: string;
  dryRun?: boolean;
}): Promise<ApplyResult> {
  const result: ContextExtractionSgrResult = validateContextExtractionSgrResult(opts.raw);
  const taskId = opts.taskId ?? result.task_id;
  const dryRun = opts.dryRun === true;
  const sourceRefCounts = countSourceRefs(result);
  const factsPath = path.join(opts.root, ".agentplane/context/derived/facts/facts.jsonl");
  const entitiesPath = path.join(opts.root, ".agentplane/context/derived/graph/entities.jsonl");
  const edgesPath = path.join(opts.root, ".agentplane/context/derived/graph/edges.jsonl");
  const provenancePath = path.join(
    opts.root,
    ".agentplane/context/derived/graph/provenance_edges.jsonl",
  );
  const coveragePath = path.join(opts.root, ".agentplane/context/derived/reports/coverage.jsonl");
  const extractionQualityPath = path.join(
    opts.root,
    ".agentplane/context/derived/reports/extraction-quality.jsonl",
  );
  const sourceSpansPath = path.join(
    opts.root,
    ".agentplane/context/derived/sources/source-spans.jsonl",
  );
  const entityResolutionPath = path.join(
    opts.root,
    ".agentplane/context/derived/ontology/entity-resolution.jsonl",
  );
  const aliasesPath = path.join(opts.root, ".agentplane/context/derived/ontology/aliases.jsonl");
  const pageCreationPath = path.join(
    opts.root,
    ".agentplane/context/derived/ontology/page-creation.jsonl",
  );
  const topologyChangesPath = path.join(
    opts.root,
    ".agentplane/context/derived/ontology/topology-changes.jsonl",
  );
  const topologyPlanPath = path.join(
    opts.root,
    ".agentplane/context/derived/wiki/topology.plan.json",
  );
  const pageManifestsPath = path.join(
    opts.root,
    ".agentplane/context/derived/wiki/page-manifests.jsonl",
  );
  const facts = await readJsonlById(factsPath);
  const entities = await readJsonlById(entitiesPath);
  const edges = await readJsonlById(edgesPath);
  const provenance = await readJsonlById(provenancePath);
  const coverage = await readJsonlById(coveragePath);
  const extractionQuality = await readJsonlById(extractionQualityPath);
  const sourceSpans = await readJsonlById(sourceSpansPath);
  const entityResolution = await readJsonlById(entityResolutionPath);
  const aliases = await readJsonlById(aliasesPath);
  const pageCreation = await readJsonlById(pageCreationPath);
  const topologyChanges = await readJsonlById(topologyChangesPath);
  const pageManifests = await readJsonlById(pageManifestsPath);
  const claimMaps = new Map<string, Map<string, Record<string, unknown>>>();
  for (const rel of Object.values(CLAIM_PATH_BY_KIND)) {
    const abs = path.join(opts.root, rel);
    claimMaps.set(abs, await readJsonlById(abs));
  }
  let topologyPlan: Record<string, unknown> | null = null;
  for (const id of extractionQuality.keys()) {
    if (id.startsWith(`quality.${qualityScope(taskId)}.`)) extractionQuality.delete(id);
  }
  for (const row of buildExtractionQualityRows(result, taskId)) {
    extractionQuality.set(rowId(row), row);
  }

  function addProvenance(item: ContextExtractionItem, artifactPath: string, id = item.id): void {
    for (const row of provenanceRows(
      { ...item, id },
      toPosix(path.relative(opts.root, artifactPath)),
      taskId,
    )) {
      provenance.set(rowId(row), row);
    }
  }

  for (const item of result.extracted_items) {
    if (item.kind === "fact") {
      facts.set(item.id, baseRow(item, taskId));
      addProvenance(item, factsPath);
    }
    const claimRel = CLAIM_PATH_BY_KIND[item.kind as keyof typeof CLAIM_PATH_BY_KIND];
    if (claimRel) {
      const claimPath = path.join(opts.root, claimRel);
      claimMaps.get(claimPath)?.set(item.id, baseRow(item, taskId));
      addProvenance(item, claimPath);
    }
    if (item.kind === "graph_entity" && item.entity) {
      entities.set(item.entity.id, {
        ...baseRow(item, taskId),
        id: item.entity.id,
        kind: item.entity.kind,
        label: item.entity.label,
        status: item.entity.status ?? graphStatus(item.status),
        ...(item.entity.aliases?.length ? { aliases: item.entity.aliases } : {}),
      });
      addProvenance(item, entitiesPath, item.entity.id);
    }
    if (item.kind === "graph_edge" && item.edge) {
      const id = item.edge.id ?? item.id;
      edges.set(id, {
        ...baseRow(item, taskId),
        id,
        from: item.edge.from,
        to: item.edge.to,
        relation: item.edge.relation,
        status: item.edge.status ?? graphStatus(item.status),
      });
      addProvenance(item, edgesPath, id);
    }
    if (item.kind === "entity_resolution" && item.entity_resolution) {
      const row = { ...item.entity_resolution, ...baseRow(item, taskId) };
      entityResolution.set(item.id, row);
      const sourceTerm = stringField(item.entity_resolution, "source_term");
      const canonicalEntityId = stringField(item.entity_resolution, "canonical_entity_id");
      if (sourceTerm && canonicalEntityId) {
        aliases.set(`alias.${slugFragment(canonicalEntityId)}.${slugFragment(sourceTerm)}`, {
          id: `alias.${slugFragment(canonicalEntityId)}.${slugFragment(sourceTerm)}`,
          alias: sourceTerm,
          canonical_entity_id: canonicalEntityId,
          source_item_id: item.id,
          ...(taskId ? { task_id: taskId } : {}),
        });
      }
      addProvenance(item, entityResolutionPath);
    }
    if (item.kind === "page_creation" && item.page_creation) {
      const row = { ...item.page_creation, ...baseRow(item, taskId) };
      pageCreation.set(item.id, row);
      pageManifests.set(item.id, row);
      addProvenance(item, pageCreationPath);
    }
    if (item.kind === "topology_decision" && item.topology_decision) {
      const row = { ...item.topology_decision, ...baseRow(item, taskId) };
      topologyChanges.set(item.id, row);
      topologyPlan = compactRow({
        ...item.topology_decision,
        schema_version: 1,
        mode: "maximum_assimilation",
        updated_by_item_id: item.id,
        ...(taskId ? { task_id: taskId } : {}),
      });
      addProvenance(item, topologyChangesPath);
    }
    if (item.kind === "coverage" && item.coverage) {
      coverage.set(item.id, {
        ...baseRow(item, taskId),
        source_path: item.coverage.source_path,
        ...(item.coverage.span_id ? { span_id: item.coverage.span_id } : {}),
        coverage_status: item.coverage.status,
        reason: item.coverage.reason,
        ...(item.coverage.covered_item_ids?.length
          ? { covered_item_ids: item.coverage.covered_item_ids }
          : {}),
        ...(item.coverage.duplicate_of_span_id
          ? { duplicate_of_span_id: item.coverage.duplicate_of_span_id }
          : {}),
        ...(item.coverage.target_paths?.length ? { target_paths: item.coverage.target_paths } : {}),
      });
      if (item.coverage.span_id) {
        sourceSpans.set(item.id, {
          ...baseRow(item, taskId),
          source_path: item.coverage.source_path,
          span_id: item.coverage.span_id,
          coverage_status: item.coverage.status,
          reason: item.coverage.reason,
          ...(item.coverage.covered_item_ids?.length
            ? { covered_item_ids: item.coverage.covered_item_ids }
            : {}),
          ...(item.coverage.duplicate_of_span_id
            ? { duplicate_of_span_id: item.coverage.duplicate_of_span_id }
            : {}),
          ...(item.coverage.target_paths?.length
            ? { target_paths: item.coverage.target_paths }
            : {}),
        });
      }
      addProvenance(item, coveragePath);
    }
  }

  const changed = new Set<string>();
  if (await writeJsonlById(factsPath, facts, dryRun))
    changed.add(toPosix(path.relative(opts.root, factsPath)));
  if (await writeJsonlById(entitiesPath, entities, dryRun))
    changed.add(toPosix(path.relative(opts.root, entitiesPath)));
  if (await writeJsonlById(edgesPath, edges, dryRun))
    changed.add(toPosix(path.relative(opts.root, edgesPath)));
  if (await writeJsonlById(provenancePath, provenance, dryRun))
    changed.add(toPosix(path.relative(opts.root, provenancePath)));
  if (await writeJsonlById(coveragePath, coverage, dryRun))
    changed.add(toPosix(path.relative(opts.root, coveragePath)));
  if (await writeJsonlById(extractionQualityPath, extractionQuality, dryRun))
    changed.add(toPosix(path.relative(opts.root, extractionQualityPath)));
  if (await writeJsonlById(sourceSpansPath, sourceSpans, dryRun))
    changed.add(toPosix(path.relative(opts.root, sourceSpansPath)));
  if (await writeJsonlById(entityResolutionPath, entityResolution, dryRun))
    changed.add(toPosix(path.relative(opts.root, entityResolutionPath)));
  if (await writeJsonlById(aliasesPath, aliases, dryRun))
    changed.add(toPosix(path.relative(opts.root, aliasesPath)));
  if (await writeJsonlById(pageCreationPath, pageCreation, dryRun))
    changed.add(toPosix(path.relative(opts.root, pageCreationPath)));
  if (await writeJsonlById(topologyChangesPath, topologyChanges, dryRun))
    changed.add(toPosix(path.relative(opts.root, topologyChangesPath)));
  if (await writeJsonObject(topologyPlanPath, topologyPlan, dryRun))
    changed.add(toPosix(path.relative(opts.root, topologyPlanPath)));
  if (await writeJsonlById(pageManifestsPath, pageManifests, dryRun))
    changed.add(toPosix(path.relative(opts.root, pageManifestsPath)));
  for (const [claimPath, rows] of claimMaps) {
    if (await writeJsonlById(claimPath, rows, dryRun))
      changed.add(toPosix(path.relative(opts.root, claimPath)));
  }

  return {
    items: result.extracted_items.length,
    input_source_paths: sourceRefCounts.inputSourcePaths,
    source_paths: sourceRefCounts.sourcePaths,
    source_refs: sourceRefCounts.sourceRefs,
    facts: [...facts.values()].length,
    entities: [...entities.values()].length,
    edges: [...edges.values()].length,
    provenance: [...provenance.values()].length,
    coverage: [...coverage.values()].length,
    claims: [...claimMaps.values()].reduce((sum, rows) => sum + rows.size, 0),
    ontology: entityResolution.size + aliases.size + pageCreation.size + topologyChanges.size,
    sources: sourceSpans.size,
    wiki: pageManifests.size + (topologyPlan === null ? 0 : 1),
    quality: extractionQuality.size,
    changed_paths: [...changed].toSorted(),
  };
}
