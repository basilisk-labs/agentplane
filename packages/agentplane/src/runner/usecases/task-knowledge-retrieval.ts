import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseCanonicalKnowledgeRef, type KnowledgeRef } from "@agentplaneorg/core/schemas";

import type { BlueprintPlanArtifact } from "../../blueprints/index.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { materializeKnowledgeRef, prepareKnowledgeExcerpt } from "../../context/knowledge-ref.js";
import { readContextProjection, searchContextProjection } from "../../context/reindex.js";
import type { RunnerTaskContextEnvelope } from "../context/task-context.js";
import {
  RETRIEVAL_LIMITS,
  compactQuery,
  querySignalRank,
  taskQueryPlan,
  type QueryTerm,
  type ReceiptOmission,
  type RetrievalAdapter,
  type TaskKnowledgeRetrieval,
} from "./task-knowledge-retrieval-query.js";

export type {
  TaskKnowledgeRetrieval,
  TaskKnowledgeRetrievalReceipt,
} from "./task-knowledge-retrieval-query.js";

const MAX_STRUCTURED_FILE_BYTES = 2 * 1024 * 1024;

type Candidate = {
  ref: string;
  kind: KnowledgeRef["kind"];
  retrieval: RetrievalAdapter;
  score: number;
  reasons: string[];
};

type EntityIndex = {
  by_term: Map<string, string[]>;
  neighbours: Map<string, { entity_id: string; edge_id: string | null }[]>;
};

function digest(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function addEntityTerm(index: EntityIndex, term: string, entityId: string): void {
  const key = compactQuery(term);
  if (!key || !entityId.trim()) return;
  const current = index.by_term.get(key) ?? [];
  if (!current.includes(entityId)) current.push(entityId);
  index.by_term.set(key, current);
}

async function readJsonl(root: string, relative: string): Promise<Record<string, unknown>[]> {
  try {
    const raw = await readFile(path.join(root, relative), "utf8");
    if (Buffer.byteLength(raw, "utf8") > MAX_STRUCTURED_FILE_BYTES) return [];
    return raw.split(/\r?\n/u).flatMap((line) => {
      if (!line.trim()) return [];
      try {
        const row = JSON.parse(line) as unknown;
        return row && typeof row === "object" && !Array.isArray(row)
          ? [row as Record<string, unknown>]
          : [];
      } catch {
        return [];
      }
    });
  } catch {
    return [];
  }
}

function stringField(row: Record<string, unknown>, ...keys: string[]): string | null {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

async function buildEntityIndex(root: string): Promise<EntityIndex> {
  const index: EntityIndex = { by_term: new Map(), neighbours: new Map() };
  const [entities, aliases, edges] = await Promise.all([
    readJsonl(root, ".agentplane/context/derived/graph/entities.jsonl"),
    readJsonl(root, ".agentplane/context/derived/ontology/aliases.jsonl"),
    readJsonl(root, ".agentplane/context/derived/graph/edges.jsonl"),
  ]);
  for (const entity of entities) {
    const id = stringField(entity, "id", "entity_id");
    if (!id) continue;
    addEntityTerm(index, id, id);
    const label = stringField(entity, "label", "name", "title");
    if (label) addEntityTerm(index, label, id);
    for (const alias of stringArray(entity.aliases)) addEntityTerm(index, alias, id);
  }
  for (const alias of aliases) {
    const entityId = stringField(alias, "canonical_entity_id", "entity_id", "target_id");
    const value = stringField(alias, "alias", "label", "name");
    if (entityId && value) addEntityTerm(index, value, entityId);
  }
  for (const edge of edges) {
    const from = stringField(edge, "from", "from_id", "source", "subject_id");
    const to = stringField(edge, "to", "to_id", "target", "object_id");
    if (!from || !to) continue;
    const edgeId = stringField(edge, "id", "edge_id");
    for (const [left, right] of [
      [from, to],
      [to, from],
    ] as const) {
      const current = index.neighbours.get(left) ?? [];
      current.push({ entity_id: right, edge_id: edgeId });
      index.neighbours.set(left, current);
    }
  }
  for (const values of index.by_term.values())
    values.sort((left, right) => left.localeCompare(right));
  for (const values of index.neighbours.values()) {
    values.sort(
      (left, right) =>
        left.entity_id.localeCompare(right.entity_id) ||
        (left.edge_id ?? "").localeCompare(right.edge_id ?? ""),
    );
  }
  return index;
}

function encoded(value: string): string {
  return encodeURIComponent(value).replaceAll("%3A", ":");
}

function canonicalKind(ref: string): KnowledgeRef["kind"] | null {
  try {
    const parsed = parseCanonicalKnowledgeRef(ref);
    if (parsed.path.startsWith("context/wiki/")) return "wiki";
    if (parsed.path.startsWith("context/raw/")) return "source";
    if (parsed.selector?.key === "fact") return "fact";
    if (parsed.selector?.key === "entity") return "entity";
    if (parsed.selector?.key === "edge") return "edge";
    return null;
  } catch {
    return null;
  }
}

function addCandidate(candidates: Map<string, Candidate>, candidate: Candidate): void {
  const current = candidates.get(candidate.ref);
  if (!current) {
    candidates.set(candidate.ref, candidate);
    return;
  }
  current.score = Math.max(current.score, candidate.score);
  for (const reason of candidate.reasons) {
    if (!current.reasons.includes(reason)) current.reasons.push(reason);
  }
  if (retrievalPriority(candidate.retrieval) < retrievalPriority(current.retrieval)) {
    current.retrieval = candidate.retrieval;
  }
}

function retrievalPriority(retrieval: RetrievalAdapter): number {
  return { exact: 0, alias: 1, graph: 2, fts: 3 }[retrieval];
}

function candidateFromRef(opts: {
  ref: string;
  retrieval: RetrievalAdapter;
  score: number;
  reason: string;
}): Candidate | null {
  const kind = canonicalKind(opts.ref);
  return kind
    ? { ref: opts.ref, kind, retrieval: opts.retrieval, score: opts.score, reasons: [opts.reason] }
    : null;
}

function exactCandidates(queries: QueryTerm[]): Candidate[] {
  const output: Candidate[] = [];
  for (const query of queries) {
    for (const ref of query.exact_refs) {
      const candidate = candidateFromRef({
        ref,
        retrieval: "exact",
        score: 1,
        reason: "task_path_exact",
      });
      if (candidate) output.push(candidate);
    }
  }
  return output;
}

async function ftsCandidates(opts: {
  root: string;
  queries: QueryTerm[];
  omissions: ReceiptOmission[];
}): Promise<Candidate[]> {
  const candidates: Candidate[] = [];
  const ftsQueries = opts.queries
    .filter((query) => query.exact_refs.length === 0)
    .toSorted(
      (left, right) =>
        querySignalRank(left) - querySignalRank(right) ||
        left.normalized.localeCompare(right.normalized),
    )
    .slice(0, RETRIEVAL_LIMITS.max_fts_queries);
  for (const query of ftsQueries) {
    const result = await searchContextProjection(opts.root, {
      query: query.query,
      scopes: ["wiki", "facts", "graph", "raw"],
      limit: RETRIEVAL_LIMITS.max_fts_results_per_query,
      offset: 0,
    });
    if (!result) {
      opts.omissions.push({
        query: query.query,
        adapter: "fts",
        reason_code: "projection_unavailable",
        detail: "SQLite context projection is unavailable or does not include this query.",
      });
      continue;
    }
    let found = 0;
    for (const row of result.rows) {
      for (const ref of [row.path, ...(row.source_refs ?? [])]) {
        const candidate = candidateFromRef({
          ref,
          retrieval: "fts",
          score: Math.max(0, Math.min(1, 1 / (1 + Math.max(0, row.rank)))),
          reason: `fts:${query.query}`,
        });
        if (!candidate) continue;
        candidates.push(candidate);
        found += 1;
      }
    }
    if (found === 0) {
      opts.omissions.push({
        query: query.query,
        adapter: "fts",
        reason_code: "no_match",
        detail: "No FTS result resolved to a canonical KnowledgeRef.",
      });
    }
  }
  return candidates;
}

function entityCandidates(opts: { queries: QueryTerm[]; index: EntityIndex }): Candidate[] {
  const candidates: Candidate[] = [];
  for (const query of opts.queries) {
    const entityIds = new Set(opts.index.by_term.get(query.normalized));
    for (const [term, ids] of opts.index.by_term) {
      if (!term.includes(" ") || !` ${query.normalized} `.includes(` ${term} `)) continue;
      for (const id of ids) entityIds.add(id);
    }
    for (const entityId of [...entityIds].toSorted()) {
      const entity = candidateFromRef({
        ref: `.agentplane/context/derived/graph/entities.jsonl#entity=${encoded(entityId)}`,
        retrieval: "alias",
        score: 0.95,
        reason: `alias_or_entity_exact:${query.query}`,
      });
      if (entity) candidates.push(entity);
      for (const neighbour of opts.index.neighbours.get(entityId) ?? []) {
        const neighbourRef = candidateFromRef({
          ref: `.agentplane/context/derived/graph/entities.jsonl#entity=${encoded(neighbour.entity_id)}`,
          retrieval: "graph",
          score: 0.45,
          reason: `graph_neighbour:${entityId}`,
        });
        if (neighbourRef) candidates.push(neighbourRef);
        if (neighbour.edge_id) {
          const edgeRef = candidateFromRef({
            ref: `.agentplane/context/derived/graph/edges.jsonl#edge=${encoded(neighbour.edge_id)}`,
            retrieval: "graph",
            score: 0.4,
            reason: `graph_edge:${entityId}`,
          });
          if (edgeRef) candidates.push(edgeRef);
        }
      }
    }
  }
  return candidates;
}

async function dependencyContext(opts: {
  ctx: CommandContext;
  task_envelope: RunnerTaskContextEnvelope;
}): Promise<{ title: string; result_summary?: string; description: string }[]> {
  const taskIds = opts.task_envelope.source_task.depends_on ?? [];
  if (taskIds.length === 0) return [];
  const tasks = opts.ctx.taskBackend.getTasks
    ? await opts.ctx.taskBackend.getTasks(taskIds).catch(() => [])
    : await Promise.all(
        taskIds.map(async (taskId) => await opts.ctx.taskBackend.getTask(taskId)),
      ).catch(() => []);
  return tasks
    .flatMap((task) =>
      task?.status === "DONE"
        ? [
            {
              title: task.title,
              ...(task.result_summary ? { result_summary: task.result_summary } : {}),
              description: task.description,
            },
          ]
        : [],
    )
    .toSorted((left, right) => left.title.localeCompare(right.title));
}

export async function prepareTaskKnowledgeRetrieval(opts: {
  command_ctx: CommandContext;
  task_envelope: RunnerTaskContextEnvelope;
  blueprint: BlueprintPlanArtifact;
  repository_root: string;
}): Promise<TaskKnowledgeRetrieval> {
  const [projection, index, dependencies] = await Promise.all([
    readContextProjection(opts.repository_root),
    buildEntityIndex(opts.repository_root),
    dependencyContext({ ctx: opts.command_ctx, task_envelope: opts.task_envelope }),
  ]);
  const queryPlan = taskQueryPlan({
    task_envelope: opts.task_envelope,
    blueprint: opts.blueprint,
    dependencies,
  });
  const queries = queryPlan.queries;
  const omissions: ReceiptOmission[] = [];
  if (queryPlan.omitted_count > 0 || queryPlan.collection_saturated) {
    omissions.push({
      query: null,
      adapter: "selection",
      reason_code: "query_term_budget_exhausted",
      detail: `${queryPlan.collection_saturated ? "At least " : ""}${queryPlan.omitted_count} lower-priority query terms were omitted by the bounded query plan.`,
    });
  }
  const candidates = new Map<string, Candidate>();
  for (const candidate of exactCandidates(queries)) addCandidate(candidates, candidate);
  for (const candidate of entityCandidates({ queries, index })) addCandidate(candidates, candidate);
  for (const candidate of await ftsCandidates({ root: opts.repository_root, queries, omissions })) {
    addCandidate(candidates, candidate);
  }
  const ordered = [...candidates.values()]
    .map((candidate) => ({ ...candidate, reasons: [...candidate.reasons].toSorted() }))
    .toSorted(
      (left, right) =>
        right.score - left.score ||
        left.ref.localeCompare(right.ref) ||
        left.retrieval.localeCompare(right.retrieval),
    );
  if (ordered.length > RETRIEVAL_LIMITS.max_references) {
    omissions.push({
      query: null,
      adapter: "selection",
      reason_code: "reference_budget_exhausted",
      detail: `${ordered.length - RETRIEVAL_LIMITS.max_references} lower-ranked references were omitted by the bounded selection budget.`,
    });
  }
  const materialized: { candidate: Candidate; ref: KnowledgeRef }[] = [];
  for (const candidate of ordered.slice(0, RETRIEVAL_LIMITS.max_references)) {
    try {
      materialized.push({
        candidate,
        ref: await materializeKnowledgeRef({
          repository_root: opts.repository_root,
          ref: candidate.ref,
          kind: candidate.kind,
          reason: candidate.reasons.join("; "),
          retrieval: candidate.retrieval,
          required: false,
          score: candidate.score,
          index_snapshot: projection,
        }),
      });
    } catch (error) {
      omissions.push({
        query: null,
        adapter: candidate.retrieval,
        reason_code: "not_materializable",
        detail:
          `Candidate ${candidate.ref} could not be materialized as a fresh KnowledgeRef` +
          `${error instanceof Error && error.message ? `: ${error.message}` : "."}`,
      });
    }
  }
  const excerpts = await Promise.all(
    materialized.map(
      async ({ ref }) =>
        await prepareKnowledgeExcerpt({
          repository_root: opts.repository_root,
          knowledge_ref: ref,
          max_bytes: RETRIEVAL_LIMITS.max_excerpt_bytes,
          max_lines: RETRIEVAL_LIMITS.max_excerpt_lines,
          index_snapshot: projection,
        }),
    ),
  );
  const includedIdentities = new Set(
    excerpts
      .filter((excerpt) => excerpt.status === "included")
      .map((excerpt) => `${excerpt.knowledge_ref.ref}\u0000${excerpt.knowledge_ref.digest}`),
  );
  const knowledgeRefs = materialized.map(({ candidate, ref }, indexPosition) => {
    const identity = `${ref.ref}\u0000${ref.digest}`;
    const required =
      indexPosition < RETRIEVAL_LIMITS.max_required_references && includedIdentities.has(identity);
    if (!includedIdentities.has(identity)) {
      omissions.push({
        query: null,
        adapter: candidate.retrieval,
        reason_code: "excerpt_not_included",
        detail: `Candidate ${ref.ref} is represented by a non-included excerpt receipt.`,
      });
    }
    return { ...ref, required };
  });
  const receiptBase = {
    schema_version: 1 as const,
    kind: "task_knowledge_retrieval_receipt" as const,
    projection: {
      available: projection !== null,
      digest: projection
        ? digest({
            metadata: projection.metadata,
            rows: projection.rows.map((row) => ({ path: row.path, sha256: row.sha256 })),
          })
        : null,
      projection_version: projection?.metadata.projection_version ?? null,
    },
    budgets: {
      max_query_terms: RETRIEVAL_LIMITS.max_query_terms,
      max_fts_queries: RETRIEVAL_LIMITS.max_fts_queries,
      max_fts_results_per_query: RETRIEVAL_LIMITS.max_fts_results_per_query,
      max_references: RETRIEVAL_LIMITS.max_references,
      max_excerpt_bytes: RETRIEVAL_LIMITS.max_excerpt_bytes,
      max_excerpt_lines: RETRIEVAL_LIMITS.max_excerpt_lines,
    },
    query_plan: queries.map((query) => ({ query: query.query, signals: query.signals })),
    adapter_counts: {
      exact: ordered.filter((candidate) => candidate.retrieval === "exact").length,
      fts: ordered.filter((candidate) => candidate.retrieval === "fts").length,
      alias: ordered.filter((candidate) => candidate.retrieval === "alias").length,
      graph: ordered.filter((candidate) => candidate.retrieval === "graph").length,
    },
    selected: materialized.map(({ candidate, ref }) => ({
      ref: ref.ref,
      retrieval: candidate.retrieval,
      score: candidate.score,
      reasons: candidate.reasons,
    })),
    omissions: omissions.toSorted(
      (left, right) =>
        (left.query ?? "").localeCompare(right.query ?? "") ||
        left.adapter.localeCompare(right.adapter) ||
        left.reason_code.localeCompare(right.reason_code) ||
        left.detail.localeCompare(right.detail),
    ),
  };
  return {
    knowledge_refs: knowledgeRefs,
    prepared_evidence: excerpts,
    receipt: { ...receiptBase, digest: digest(receiptBase) },
  };
}
