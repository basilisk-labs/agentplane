import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { readContextProjection, searchContextProjection } from "./reindex.js";
import type { ManifestEntry } from "./ingest-manifest.js";
import type { SourceSpanSkeletonRow } from "./source-spans.js";

export type CanonicalCatalogEntity = {
  id: string;
  kind?: string;
  label?: string;
  aliases: string[];
  source_refs: string[];
  wiki_paths: string[];
  relations: {
    direction: "outgoing" | "incoming";
    relation: string;
    entity_id: string;
    edge_id?: string;
  }[];
};

export type CanonicalEntityCatalog = {
  version: 1;
  task_id: string;
  generated_at: string;
  entity_count: number;
  catalog_sha256: string;
  entities: CanonicalCatalogEntity[];
};

type CandidateTerm = {
  query: string;
  normalized_query: string;
  source_paths: string[];
  source_span_ids: string[];
  origins: ("markdown_heading" | "path_basename" | "structured_field")[];
};

type CandidateScore = {
  score: number;
  reasons: Set<string>;
  evidenceRefs: Set<string>;
};

type CandidateIndex = {
  entitiesById: Map<string, CanonicalCatalogEntity>;
  entityIdsByAlias: Map<string, Set<string>>;
  entityIdsByLabel: Map<string, Set<string>>;
  entityIdsBySourceRef: Map<string, Set<string>>;
  entityIdsByToken: Map<string, Set<string>>;
  entityIdsByWikiPath: Map<string, Set<string>>;
};

const MAX_QUERY_TERMS = 64;
const MAX_TERMS_PER_SOURCE = 12;
const MAX_FTS_RESULTS_PER_QUERY = 20;
const MAX_CANDIDATES_PER_QUERY = 20;
const MAX_ADDITIONAL_SEARCH_QUERIES = 12;

function digest(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function normalizedText(value: string): string {
  return (
    value
      .normalize("NFKC")
      .toLocaleLowerCase("en-US")
      .match(/[\p{L}\p{N}]+/gu)
      ?.join(" ")
      .trim() ?? ""
  );
}

function textTokens(value: string): string[] {
  return normalizedText(value).split(" ").filter(Boolean);
}

function comparablePhrase(value: string): string | null {
  const normalized = normalizedText(value);
  const tokens = normalized.split(" ").filter(Boolean);
  if (tokens.length === 0 || tokens.length > 12 || normalized.length > 120) return null;
  return normalized;
}

function sourceBasenameTerm(sourcePath: string): string | null {
  const basename = path.basename(sourcePath, path.extname(sourcePath));
  return comparablePhrase(basename.replaceAll(/[_-]+/gu, " "));
}

function structuredTerms(value: unknown, terms: string[], depth = 0): void {
  if (terms.length >= MAX_TERMS_PER_SOURCE || depth > 3) return;
  if (typeof value === "string") {
    const term = comparablePhrase(value);
    if (term) terms.push(term);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) structuredTerms(item, terms, depth + 1);
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (!/(?:alias|component|entity|label|name|service|term|title)$/iu.test(key)) continue;
    structuredTerms(item, terms, depth + 1);
  }
}

async function sourceTerms(
  source: ManifestEntry,
  root: string,
): Promise<{
  markdownHeadings: string[];
  structuredFields: string[];
  basename: string | null;
}> {
  const basename = sourceBasenameTerm(source.path);
  if (
    source.status === "deleted" ||
    source.status === "unsupported" ||
    source.status === "error" ||
    !(
      source.content_type.startsWith("text/") ||
      source.content_type === "application/json" ||
      source.path.toLowerCase().endsWith(".jsonl")
    )
  ) {
    return { markdownHeadings: [], structuredFields: [], basename: null };
  }
  let text: string;
  try {
    text = await readFile(path.join(root, source.path), "utf8");
  } catch {
    return { markdownHeadings: [], structuredFields: [], basename: null };
  }
  const markdownHeadings =
    source.content_type === "text/markdown"
      ? text
          .split(/\r?\n/u)
          .flatMap((line) => {
            const heading = /^#{1,6}\s+(.+)$/u.exec(line)?.[1];
            const term = heading ? comparablePhrase(heading) : null;
            return term ? [term] : [];
          })
          .slice(0, MAX_TERMS_PER_SOURCE)
      : [];
  const structuredFields: string[] = [];
  if (source.content_type === "application/json") {
    try {
      structuredTerms(JSON.parse(text) as unknown, structuredFields);
    } catch {
      // Invalid structured input still receives basename and span-derived candidate queries.
    }
  } else if (source.path.toLowerCase().endsWith(".jsonl")) {
    for (const line of text.split(/\r?\n/u)) {
      if (!line.trim()) continue;
      try {
        structuredTerms(JSON.parse(line) as unknown, structuredFields);
      } catch {
        // Malformed JSONL rows stay available only through their source span evidence.
      }
      if (structuredFields.length >= MAX_TERMS_PER_SOURCE) break;
    }
  } else if (source.content_type === "text/yaml") {
    for (const line of text.split(/\r?\n/u)) {
      const match = /^(?:alias|component|entity|label|name|service|term|title):\s*(.+)$/iu.exec(
        line.trim(),
      );
      const term = match?.[1] ? comparablePhrase(match[1]) : null;
      if (term) structuredFields.push(term);
      if (structuredFields.length >= MAX_TERMS_PER_SOURCE) break;
    }
  }
  return { markdownHeadings, structuredFields, basename };
}

async function buildCandidateTerms(opts: {
  root: string;
  sources: ManifestEntry[];
  spans: SourceSpanSkeletonRow[];
}): Promise<CandidateTerm[]> {
  const terms = new Map<string, CandidateTerm>();
  const spansByPath = new Map<string, SourceSpanSkeletonRow[]>();
  for (const span of opts.spans) {
    const rows = spansByPath.get(span.source_path) ?? [];
    rows.push(span);
    spansByPath.set(span.source_path, rows);
  }
  for (const source of opts.sources.toSorted((left, right) =>
    left.path.localeCompare(right.path),
  )) {
    const extracted = await sourceTerms(source, opts.root);
    const sourceEntries: { query: string; origin: CandidateTerm["origins"][number] }[] = [];
    if (extracted.basename)
      sourceEntries.push({ query: extracted.basename, origin: "path_basename" });
    sourceEntries.push(
      ...extracted.markdownHeadings.map((query) => ({
        query,
        origin: "markdown_heading" as const,
      })),
      ...extracted.structuredFields.map((query) => ({
        query,
        origin: "structured_field" as const,
      })),
    );
    for (const entry of sourceEntries.slice(0, MAX_TERMS_PER_SOURCE)) {
      const normalized = comparablePhrase(entry.query);
      if (!normalized) continue;
      const current = terms.get(normalized) ?? {
        query: normalized,
        normalized_query: normalized,
        source_paths: [],
        source_span_ids: [],
        origins: [],
      };
      if (!current.source_paths.includes(source.path)) current.source_paths.push(source.path);
      if (!current.origins.includes(entry.origin)) current.origins.push(entry.origin);
      for (const span of spansByPath.get(source.path) ?? []) {
        if (normalizedText(span.text_preview).includes(normalized)) {
          current.source_span_ids.push(span.span_id);
        }
      }
      terms.set(normalized, current);
      if (terms.size >= MAX_QUERY_TERMS) break;
    }
    if (terms.size >= MAX_QUERY_TERMS) break;
  }
  return [...terms.values()]
    .map((term) => ({
      ...term,
      source_paths: term.source_paths.toSorted((left, right) => left.localeCompare(right)),
      source_span_ids: [...new Set(term.source_span_ids)].toSorted((left, right) =>
        left.localeCompare(right),
      ),
      origins: term.origins.toSorted((left, right) => left.localeCompare(right)),
    }))
    .toSorted((left, right) => left.normalized_query.localeCompare(right.normalized_query));
}

function addScore(
  scores: Map<string, CandidateScore>,
  entityId: string,
  score: number,
  reason: string,
  evidenceRefs: string[] = [],
): void {
  const current = scores.get(entityId) ?? {
    score: 0,
    reasons: new Set<string>(),
    evidenceRefs: new Set<string>(),
  };
  current.score += score;
  current.reasons.add(reason);
  for (const ref of evidenceRefs) current.evidenceRefs.add(ref);
  scores.set(entityId, current);
}

function addToIndex(index: Map<string, Set<string>>, key: string, entityId: string): void {
  if (!key) return;
  const entityIds = index.get(key) ?? new Set<string>();
  entityIds.add(entityId);
  index.set(key, entityIds);
}

function buildCandidateIndex(entities: CanonicalCatalogEntity[]): CandidateIndex {
  const index: CandidateIndex = {
    entitiesById: new Map(),
    entityIdsByAlias: new Map(),
    entityIdsByLabel: new Map(),
    entityIdsBySourceRef: new Map(),
    entityIdsByToken: new Map(),
    entityIdsByWikiPath: new Map(),
  };
  for (const entity of entities) {
    index.entitiesById.set(entity.id, entity);
    const label = entity.label ? normalizedText(entity.label) : "";
    if (label) {
      addToIndex(index.entityIdsByLabel, label, entity.id);
      for (const token of textTokens(label)) addToIndex(index.entityIdsByToken, token, entity.id);
    }
    for (const alias of entity.aliases) {
      const normalizedAlias = normalizedText(alias);
      if (!normalizedAlias) continue;
      addToIndex(index.entityIdsByAlias, normalizedAlias, entity.id);
      for (const token of textTokens(normalizedAlias)) {
        addToIndex(index.entityIdsByToken, token, entity.id);
      }
    }
    for (const ref of entity.source_refs) addToIndex(index.entityIdsBySourceRef, ref, entity.id);
    for (const wikiPath of entity.wiki_paths) {
      addToIndex(index.entityIdsByWikiPath, wikiPath, entity.id);
    }
  }
  return index;
}

function indexEntityIds(index: Map<string, Set<string>>, key: string): string[] {
  return [...(index.get(key) ?? [])];
}

function sharedTokenCount(left: string[], right: string[]): number {
  const rightSet = new Set(right);
  return left.filter((token) => rightSet.has(token)).length;
}

function directLexicalScores(
  term: CandidateTerm,
  index: CandidateIndex,
): Map<string, CandidateScore> {
  const scores = new Map<string, CandidateScore>();
  const queryTokens = textTokens(term.normalized_query);
  const candidateIds = new Set<string>([
    ...indexEntityIds(index.entityIdsByLabel, term.normalized_query),
    ...indexEntityIds(index.entityIdsByAlias, term.normalized_query),
    ...queryTokens.flatMap((token) => indexEntityIds(index.entityIdsByToken, token)),
  ]);
  for (const entityId of candidateIds) {
    const entity = index.entitiesById.get(entityId);
    if (!entity) continue;
    const label = entity.label ? normalizedText(entity.label) : "";
    if (label === term.normalized_query) {
      addScore(scores, entity.id, 100, "label_exact", entity.source_refs);
    } else if (label) {
      const overlap = sharedTokenCount(queryTokens, textTokens(label));
      if (overlap > 0 && overlap === queryTokens.length) {
        addScore(
          scores,
          entity.id,
          45 + overlap,
          `label_token_overlap:${overlap}/${queryTokens.length}`,
          entity.source_refs,
        );
      }
    }
    for (const alias of entity.aliases) {
      const normalizedAlias = normalizedText(alias);
      if (normalizedAlias === term.normalized_query) {
        addScore(scores, entity.id, 95, "alias_exact", entity.source_refs);
      } else if (normalizedAlias) {
        const overlap = sharedTokenCount(queryTokens, textTokens(normalizedAlias));
        if (overlap > 0 && overlap === queryTokens.length) {
          addScore(
            scores,
            entity.id,
            40 + overlap,
            `alias_token_overlap:${overlap}/${queryTokens.length}`,
            entity.source_refs,
          );
        }
      }
    }
  }
  return scores;
}

function pathWithoutSelector(value: string): string {
  return value.split("#", 1)[0] ?? value;
}

function entityIdFromGraphRef(value: string): string | null {
  const match = /\.agentplane\/context\/derived\/graph\/entities\.jsonl#entity=(.+)$/u.exec(value);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

async function ftsScores(opts: {
  root: string;
  term: CandidateTerm;
  index: CandidateIndex;
  scores: Map<string, CandidateScore>;
}): Promise<void> {
  const result = await searchContextProjection(opts.root, {
    query: opts.term.query,
    scopes: ["wiki", "facts", "graph"],
    limit: MAX_FTS_RESULTS_PER_QUERY,
    offset: 0,
  });
  if (!result) return;
  for (const row of result.rows) {
    const rowRefs = row.source_refs ?? [];
    const graphEntityId = entityIdFromGraphRef(row.path);
    if (graphEntityId && opts.index.entitiesById.has(graphEntityId)) {
      addScore(opts.scores, graphEntityId, 80, "fts_graph_entity", [row.path, ...rowRefs]);
    }
    const pagePath = pathWithoutSelector(row.path);
    for (const entityId of indexEntityIds(opts.index.entityIdsByWikiPath, pagePath)) {
      addScore(opts.scores, entityId, 30, "fts_page_family", [row.path, ...rowRefs]);
    }
    for (const ref of rowRefs) {
      for (const entityId of indexEntityIds(opts.index.entityIdsBySourceRef, ref)) {
        addScore(opts.scores, entityId, 20, "fts_source_ref", [row.path, ref]);
      }
    }
  }
}

function addGraphNeighbourScores(scores: Map<string, CandidateScore>, index: CandidateIndex): void {
  const seedIds = [...scores.keys()];
  for (const seedId of seedIds) {
    const seed = index.entitiesById.get(seedId);
    if (!seed) continue;
    for (const relation of seed.relations) {
      if (!index.entitiesById.has(relation.entity_id)) continue;
      addScore(
        scores,
        relation.entity_id,
        10,
        `graph_neighbour:${relation.direction}:${relation.relation}:${seedId}`,
        relation.edge_id ? [relation.edge_id] : [],
      );
    }
  }
}

function projectionIndexDigest(
  projection: Awaited<ReturnType<typeof readContextProjection>>,
): string | null {
  if (!projection) return null;
  return digest(
    JSON.stringify({
      metadata: {
        projection_version: projection.metadata.projection_version,
        workspace_hash: projection.metadata.workspace_hash,
        include_tasks: projection.metadata.include_tasks,
        include_raw: projection.metadata.include_raw,
      },
      rows: projection.rows
        .map((row) => ({
          path: row.path,
          sha256: row.sha256,
          source_refs: row.source_refs ?? [],
        }))
        .toSorted((left, right) => left.path.localeCompare(right.path)),
    }),
  );
}

export async function buildCanonicalReconciliationCandidates(opts: {
  root: string;
  taskId: string;
  generatedAt: string;
  sources: ManifestEntry[];
  spans: SourceSpanSkeletonRow[];
  catalog: CanonicalEntityCatalog;
}): Promise<Record<string, unknown>> {
  const [terms, projection] = await Promise.all([
    buildCandidateTerms({ root: opts.root, sources: opts.sources, spans: opts.spans }),
    readContextProjection(opts.root),
  ]);
  const candidateIndex = buildCandidateIndex(opts.catalog.entities);
  const groups = [];
  for (const term of terms) {
    const scores = directLexicalScores(term, candidateIndex);
    await ftsScores({ root: opts.root, term, index: candidateIndex, scores });
    addGraphNeighbourScores(scores, candidateIndex);
    const candidates = [...scores.entries()]
      .flatMap(([entityId, score]) => {
        const entity = candidateIndex.entitiesById.get(entityId);
        if (!entity) return [];
        return [
          {
            canonical_entity_id: entity.id,
            ...(entity.label ? { label: entity.label } : {}),
            ...(entity.kind ? { kind: entity.kind } : {}),
            score: score.score,
            reasons: [...score.reasons].toSorted((left, right) => left.localeCompare(right)),
            evidence_refs: [...score.evidenceRefs].toSorted((left, right) =>
              left.localeCompare(right),
            ),
          },
        ];
      })
      .toSorted(
        (left, right) =>
          right.score - left.score ||
          left.canonical_entity_id.localeCompare(right.canonical_entity_id),
      )
      .slice(0, MAX_CANDIDATES_PER_QUERY);
    groups.push({
      query: term.query,
      normalized_query: term.normalized_query,
      source_paths: term.source_paths,
      source_span_ids: term.source_span_ids,
      origins: term.origins,
      candidates,
    });
  }
  const additionalSearch = groups
    .filter((group) => group.candidates.length === 0)
    .slice(0, MAX_ADDITIONAL_SEARCH_QUERIES)
    .map((group) => ({
      query: group.query,
      source_paths: group.source_paths,
      source_span_ids: group.source_span_ids,
    }));
  const index = {
    available: projection !== null,
    digest: projectionIndexDigest(projection),
    fts_results_per_query: MAX_FTS_RESULTS_PER_QUERY,
  };
  const logicalPayload = {
    index,
    query_terms: terms,
    candidate_groups: groups,
    additional_search: {
      max_queries: MAX_ADDITIONAL_SEARCH_QUERIES,
      max_results_per_query: MAX_FTS_RESULTS_PER_QUERY,
      queries: additionalSearch,
    },
  };
  return {
    version: 1,
    task_id: opts.taskId,
    generated_at: opts.generatedAt,
    ...logicalPayload,
    candidate_digest: digest(JSON.stringify(logicalPayload)),
    semantic_decision_owner: "CURATOR",
    note: "CLI-generated lexical and structural evidence only. CURATOR decides identity and rationale.",
  };
}
