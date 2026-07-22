import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  validateContextExtractionSgrResult,
  type ContextExtractionItem,
  type ContextExtractionSgrResult,
  type SgrSourceRef,
} from "./sgr-extraction.js";
import { fileExists, parseJsonlLines, toPosix } from "./context-utils.js";
import {
  commitExtractionArtifacts,
  type ExtractionArtifact,
  type ExtractionTransactionHooks,
} from "./extraction-transaction.js";
import {
  buildExtractionQualityRows,
  countSourceRefs,
  qualityScope,
  slugFragment,
  stringField,
} from "./extraction-writer-quality.js";
import { buildContextWikiSynthesis } from "./wiki-synthesis.js";

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
  wiki_pages: number;
  wiki_atoms: number;
  wiki_log_entries: number;
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

function jsonlArtifact(
  filePath: string,
  rows: Map<string, Record<string, unknown>>,
): ExtractionArtifact {
  const sorted = [...rows.values()].toSorted((a, b) => rowId(a).localeCompare(rowId(b)));
  const text = sorted.map((row) => JSON.stringify(row)).join("\n");
  return { path: filePath, content: text ? `${text}\n` : "", format: "jsonl" };
}

function jsonArtifact(filePath: string, value: Record<string, unknown>): ExtractionArtifact {
  return { path: filePath, content: `${JSON.stringify(value, null, 2)}\n`, format: "json" };
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

export async function applyContextExtractionResult(opts: {
  root: string;
  raw: unknown;
  taskId?: string;
  dryRun?: boolean;
  synthesizeWiki?: boolean;
  generatedAt?: string;
  transactionHooks?: ExtractionTransactionHooks;
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

  const declaredEntityIds = new Set(
    result.extracted_items.flatMap((item) =>
      item.kind === "graph_entity" && item.entity ? [item.entity.id] : [],
    ),
  );
  for (const item of result.extracted_items) {
    if (item.kind !== "entity_resolution" || !item.entity_resolution) continue;
    const resolution = stringField(item.entity_resolution, "resolution");
    if (resolution !== "same_as" && resolution !== "alias_of") continue;
    const canonicalEntityId = stringField(item.entity_resolution, "canonical_entity_id");
    const displayedCanonicalEntityId = canonicalEntityId === "" ? "<missing>" : canonicalEntityId;
    if (
      !canonicalEntityId ||
      (!entities.has(canonicalEntityId) && !declaredEntityIds.has(canonicalEntityId))
    ) {
      throw new Error(
        `Entity resolution ${item.id} cannot apply ${resolution}: canonical entity ${displayedCanonicalEntityId} is absent from the pre-write canonical graph`,
      );
    }
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

  const artifacts: ExtractionArtifact[] = [
    jsonlArtifact(factsPath, facts),
    jsonlArtifact(entitiesPath, entities),
    jsonlArtifact(edgesPath, edges),
    jsonlArtifact(provenancePath, provenance),
    jsonlArtifact(coveragePath, coverage),
    jsonlArtifact(extractionQualityPath, extractionQuality),
    jsonlArtifact(sourceSpansPath, sourceSpans),
    jsonlArtifact(entityResolutionPath, entityResolution),
    jsonlArtifact(aliasesPath, aliases),
    jsonlArtifact(pageCreationPath, pageCreation),
    jsonlArtifact(topologyChangesPath, topologyChanges),
    jsonlArtifact(pageManifestsPath, pageManifests),
  ];
  if (topologyPlan !== null) artifacts.push(jsonArtifact(topologyPlanPath, topologyPlan));
  for (const [claimPath, rows] of claimMaps) {
    artifacts.push(jsonlArtifact(claimPath, rows));
  }
  const wikiSynthesis = opts.synthesizeWiki
    ? await buildContextWikiSynthesis({
        root: opts.root,
        result,
        taskId,
        generatedAt: opts.generatedAt,
      })
    : null;
  if (wikiSynthesis) artifacts.push(...wikiSynthesis.artifacts);
  const changedPaths = await commitExtractionArtifacts({
    root: opts.root,
    artifacts,
    dryRun,
    hooks: opts.transactionHooks,
  });

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
    wiki_pages: wikiSynthesis?.pages ?? 0,
    wiki_atoms: wikiSynthesis?.atoms ?? 0,
    wiki_log_entries: wikiSynthesis?.logEntries ?? 0,
    quality: extractionQuality.size,
    changed_paths: changedPaths,
  };
}
