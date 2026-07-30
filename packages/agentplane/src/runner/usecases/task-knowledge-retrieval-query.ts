import path from "node:path";

import type { KnowledgeRef, PreparedKnowledgeExcerpt } from "@agentplaneorg/core/schemas";

import type { BlueprintPlanArtifact } from "../../blueprints/index.js";
import type { RunnerTaskContextEnvelope } from "../context/task-context.js";
import type { SemanticRetrievalEscalationReceipt } from "./task-knowledge-semantic-escalation.js";

export const RETRIEVAL_LIMITS = {
  max_query_terms: 24,
  max_collected_query_terms: 24 * 8,
  max_fts_queries: 12,
  max_fts_results_per_query: 8,
  max_references: 12,
  max_required_references: 3,
  max_excerpt_bytes: 3 * 1024,
  max_excerpt_lines: 80,
} as const;

export type RetrievalAdapter = "exact" | "fts" | "alias" | "graph";
export type RetrievalSignal =
  | "task_intent"
  | "acceptance"
  | "path"
  | "symbol"
  | "blueprint"
  | "tag"
  | "dependency"
  | "finding";

export type QueryTerm = {
  query: string;
  normalized: string;
  signals: RetrievalSignal[];
  exact_refs: string[];
  source_priority: number;
};

export type ReceiptOmission = {
  query: string | null;
  adapter: RetrievalAdapter | "selection";
  reason_code:
    | "projection_unavailable"
    | "no_match"
    | "unsupported_ref"
    | "not_materializable"
    | "query_term_budget_exhausted"
    | "reference_budget_exhausted"
    | "excerpt_not_included";
  detail: string;
};

export type TaskKnowledgeRetrievalReceipt = {
  schema_version: 1;
  kind: "task_knowledge_retrieval_receipt";
  projection: {
    available: boolean;
    digest: string | null;
    projection_version: number | null;
  };
  budgets: {
    max_query_terms: number;
    max_fts_queries: number;
    max_fts_results_per_query: number;
    max_references: number;
    max_excerpt_bytes: number;
    max_excerpt_lines: number;
  };
  query_plan: { query: string; signals: RetrievalSignal[] }[];
  adapter_counts: Record<RetrievalAdapter, number>;
  selected: { ref: string; retrieval: RetrievalAdapter; score: number; reasons: string[] }[];
  omissions: ReceiptOmission[];
  semantic_escalation: SemanticRetrievalEscalationReceipt;
  digest: string;
};

export type TaskKnowledgeRetrieval = {
  knowledge_refs: KnowledgeRef[];
  prepared_evidence: PreparedKnowledgeExcerpt[];
  receipt: TaskKnowledgeRetrievalReceipt;
};

function normalized(value: string): string {
  return (
    value
      .normalize("NFKC")
      .toLocaleLowerCase("en-US")
      .match(/[\p{L}\p{N}_]+/gu)
      ?.join(" ")
      .trim() ?? ""
  );
}

export function compactQuery(value: string): string | null {
  const query = normalized(value);
  if (query.length < 2 || query.length > 160 || query.split(" ").length > 16) return null;
  return query;
}

function addQuery(
  queries: Map<string, QueryTerm>,
  value: string,
  signal: RetrievalSignal,
  sourcePriority = 1,
): void {
  const exactRefs =
    value.match(
      /(?:context\/(?:wiki|raw)\/[A-Za-z0-9_./-]+(?:#(?:line|lines|section)=[A-Za-z0-9_%-]+)?)/gu,
    ) ?? [];
  const query = compactQuery(value);
  if (!query) {
    for (const ref of exactRefs) {
      const key = `exact ${ref}`;
      const current = queries.get(key);
      if (current) {
        if (!current.signals.includes(signal)) current.signals.push(signal);
        current.source_priority = Math.min(current.source_priority, sourcePriority);
        continue;
      }
      if (queries.size >= RETRIEVAL_LIMITS.max_collected_query_terms) return;
      queries.set(key, {
        query: key,
        normalized: key,
        signals: [signal],
        exact_refs: [ref],
        source_priority: sourcePriority,
      });
    }
    return;
  }
  const existing = queries.get(query);
  if (!existing && queries.size >= RETRIEVAL_LIMITS.max_collected_query_terms) return;
  const current = existing ?? {
    query,
    normalized: query,
    signals: [],
    exact_refs: [],
    source_priority: sourcePriority,
  };
  if (!current.signals.includes(signal)) current.signals.push(signal);
  current.source_priority = Math.min(current.source_priority, sourcePriority);
  for (const ref of exactRefs) {
    if (!current.exact_refs.includes(ref)) current.exact_refs.push(ref);
  }
  queries.set(query, current);
}

function stringsFromText(value: string): string[] {
  const phrases = value
    .split(/[\r\n;:!?()[\]{}]+/u)
    .map((part) => part.trim())
    .filter((part) => part.length >= 3 && part.length <= 180);
  return [value, ...phrases];
}

function pathSignals(value: string): string[] {
  const matches =
    value.match(/(?:\.agentplane\/|context\/)(?:[A-Za-z0-9_.-]+\/)*[A-Za-z0-9_.-]+/gu) ?? [];
  return matches.flatMap((item) => {
    const stem = path
      .basename(item)
      .replace(/\.[^.]+$/u, "")
      .replaceAll(/[_-]+/gu, " ");
    return [item.replaceAll(/[/_-]+/gu, " "), stem];
  });
}

function symbolSignals(value: string): string[] {
  const tokens = value.match(/[A-Za-z][A-Za-z0-9]*/g) ?? [];
  return tokens.filter((token) => {
    for (let index = 1; index < token.length - 1; index += 1) {
      const current = token[index];
      const next = token[index + 1];
      if (
        current !== undefined &&
        next !== undefined &&
        current >= "A" &&
        current <= "Z" &&
        /[A-Za-z0-9]/u.test(next)
      ) {
        return true;
      }
    }
    return false;
  });
}

export function querySignalRank(query: Pick<QueryTerm, "signals">): number {
  const ranks: Record<RetrievalSignal, number> = {
    path: 0,
    symbol: 1,
    tag: 2,
    task_intent: 2,
    acceptance: 3,
    blueprint: 5,
    dependency: 3,
    finding: 3,
  };
  return Math.min(...query.signals.map((signal) => ranks[signal]));
}

export function taskQueryPlan(opts: {
  task_envelope: RunnerTaskContextEnvelope;
  blueprint: BlueprintPlanArtifact;
  dependencies: { title: string; result_summary?: string; description: string }[];
}): { queries: QueryTerm[]; omitted_count: number; collection_saturated: boolean } {
  const queries = new Map<string, QueryTerm>();
  const task = opts.task_envelope.source_task;
  const taskText = `${task.title}\n${task.description}\n${task.doc ?? ""}`;
  for (const value of pathSignals(taskText)) {
    addQuery(queries, value, "path", 0);
  }
  for (const value of symbolSignals(taskText)) {
    addQuery(queries, value, "symbol", 0);
  }
  for (const tag of task.tags ?? []) addQuery(queries, tag, "tag", 0);
  addQuery(queries, opts.blueprint.blueprintId, "blueprint");
  for (const dependency of opts.dependencies) {
    for (const value of stringsFromText(
      `${dependency.title}\n${dependency.result_summary ?? ""}\n${dependency.description}`,
    )) {
      addQuery(queries, value, "dependency", 0);
    }
  }
  for (const finding of task.quality_review?.findings ?? []) {
    addQuery(queries, finding, "finding", 0);
  }
  for (const value of stringsFromText(`${task.title}\n${task.description}`)) {
    addQuery(queries, value, "task_intent", 0);
  }
  for (const section of opts.task_envelope.task.narrative.sections) {
    const signal: RetrievalSignal = /verify|acceptance|scope|plan/iu.test(section.name)
      ? "acceptance"
      : "finding";
    for (const value of stringsFromText(section.text)) addQuery(queries, value, signal, 2);
  }
  const ordered = [...queries.values()]
    .map((query) => ({
      ...query,
      signals: [...query.signals].toSorted(),
      exact_refs: [...query.exact_refs].toSorted(),
    }))
    .toSorted(
      (left, right) =>
        left.source_priority - right.source_priority ||
        Number(right.exact_refs.length > 0) - Number(left.exact_refs.length > 0) ||
        querySignalRank(left) - querySignalRank(right) ||
        left.normalized.localeCompare(right.normalized),
    );
  const signalQuotas: [RetrievalSignal, number][] = [
    ["path", 3],
    ["symbol", 2],
    ["task_intent", 5],
    ["tag", 2],
    ["dependency", 3],
    ["finding", 3],
    ["acceptance", 3],
    ["blueprint", 1],
  ];
  const selected: QueryTerm[] = [];
  const selectedKeys = new Set<string>();
  for (const [signal, quota] of signalQuotas) {
    let selectedForSignal = 0;
    for (const query of ordered) {
      if (
        selected.length >= RETRIEVAL_LIMITS.max_query_terms ||
        selectedForSignal >= quota ||
        selectedKeys.has(query.normalized) ||
        !query.signals.includes(signal)
      ) {
        continue;
      }
      selected.push(query);
      selectedKeys.add(query.normalized);
      selectedForSignal += 1;
    }
  }
  for (const query of ordered) {
    if (selected.length >= RETRIEVAL_LIMITS.max_query_terms) break;
    if (selectedKeys.has(query.normalized)) continue;
    selected.push(query);
    selectedKeys.add(query.normalized);
  }
  return {
    queries: selected,
    omitted_count: ordered.length - selected.length,
    collection_saturated: queries.size === RETRIEVAL_LIMITS.max_collected_query_terms,
  };
}
