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
  facts: number;
  entities: number;
  edges: number;
  provenance: number;
  changed_paths: string[];
};

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
  if (dryRun) return false;
  await mkdir(path.dirname(filePath), { recursive: true });
  return await writeTextIfChanged(filePath, text ? `${text}\n` : "");
}

function baseRow(item: ContextExtractionItem, taskId?: string): Record<string, unknown> {
  return {
    id: item.id,
    summary: item.summary,
    source_refs: item.source_refs.map((sourceRef) => sourceRefToString(sourceRef)),
    source_ref_objects: item.source_refs,
    confidence: item.confidence,
    status: item.status,
    ...(taskId ? { task_id: taskId } : {}),
    ...(item.target_path ? { target_path: item.target_path } : {}),
    ...(item.stale_markers?.length ? { stale_markers: item.stale_markers } : {}),
    ...(item.conflict_markers?.length ? { conflict_markers: item.conflict_markers } : {}),
  };
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
}): Promise<ApplyResult> {
  const result: ContextExtractionSgrResult = validateContextExtractionSgrResult(opts.raw);
  const taskId = opts.taskId ?? result.task_id;
  const dryRun = opts.dryRun === true;
  const factsPath = path.join(opts.root, ".agentplane/context/derived/facts/facts.jsonl");
  const entitiesPath = path.join(opts.root, ".agentplane/context/derived/graph/entities.jsonl");
  const edgesPath = path.join(opts.root, ".agentplane/context/derived/graph/edges.jsonl");
  const provenancePath = path.join(
    opts.root,
    ".agentplane/context/derived/graph/provenance_edges.jsonl",
  );
  const facts = await readJsonlById(factsPath);
  const entities = await readJsonlById(entitiesPath);
  const edges = await readJsonlById(edgesPath);
  const provenance = await readJsonlById(provenancePath);

  for (const item of result.extracted_items) {
    if (item.kind === "fact") {
      facts.set(item.id, baseRow(item, taskId));
      for (const row of provenanceRows(item, toPosix(path.relative(opts.root, factsPath)), taskId)) {
        provenance.set(rowId(row), row);
      }
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
      for (const row of provenanceRows(
        { ...item, id: item.entity.id },
        toPosix(path.relative(opts.root, entitiesPath)),
        taskId,
      )) {
        provenance.set(rowId(row), row);
      }
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
      for (const row of provenanceRows(
        { ...item, id },
        toPosix(path.relative(opts.root, edgesPath)),
        taskId,
      )) {
        provenance.set(rowId(row), row);
      }
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

  return {
    facts: [...facts.values()].length,
    entities: [...entities.values()].length,
    edges: [...edges.values()].length,
    provenance: [...provenance.values()].length,
    changed_paths: [...changed].toSorted(),
  };
}
