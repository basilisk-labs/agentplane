/* eslint-disable @typescript-eslint/no-base-to-string, @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/restrict-template-expressions, @typescript-eslint/prefer-optional-chain */
import path from "node:path";

import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { parseJsonlLines, fileExists, readText } from "./context-utils.js";

const ALLOWED_ENTITY_KINDS = new Set([
  "file",
  "api",
  "function",
  "class",
  "concept",
  "decision",
  "person",
  "team",
  "customer",
  "requirement",
  "risk",
  "capability",
  "task",
  "source",
  "service",
  "system",
  "module",
]);

const ALLOWED_EDGE_RELATIONS = new Set([
  "supports",
  "requires",
  "implements",
  "depends_on",
  "produces",
  "consumes",
  "owns",
  "mentions",
  "tests",
  "contradicts",
  "supersedes",
  "part_of",
  "related_to",
]);

const output = createCliEmitter();

export type ContextGraphSummaryResult = {
  entities: number;
  edges: number;
  provenance: number;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedStatus(
  value: unknown,
): value is "active" | "deprecated" | "surrogate" | "inactive" {
  return (
    value === "active" || value === "deprecated" || value === "surrogate" || value === "inactive"
  );
}

export async function summarizeContextGraph(opts: {
  cwd: string;
  parsed: Record<string, never>;
  rootOverride?: string;
}): Promise<ContextGraphSummaryResult> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const entities = await countRows(
    path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
  );
  const edges = await countRows(path.join(root, ".agentplane/context/derived/graph/edges.jsonl"));
  const provenance = await countRows(
    path.join(root, ".agentplane/context/derived/graph/provenance_edges.jsonl"),
  );
  return { entities, edges, provenance };
}

export async function showContextGraphEntity(opts: {
  cwd: string;
  parsed: { id: string };
  rootOverride?: string;
}): Promise<Record<string, unknown>> {
  const id = opts.parsed.id;
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const nodes = path.join(root, ".agentplane/context/derived/graph/entities.jsonl");
  const rows = await loadJsonlRows(nodes);
  const found = rows.find((row) => String((row as { id?: unknown }).id || "") === id);
  if (!found)
    throw new CliError({ exitCode: 3, code: "E_VALIDATION", message: `entity not found: ${id}` });
  return found;
}

export async function listContextGraphNeighbors(opts: {
  cwd: string;
  parsed: { id: string };
  rootOverride?: string;
}): Promise<Record<string, unknown>[]> {
  const id = opts.parsed.id;
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const edges = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/graph/edges.jsonl"),
  );
  const adjacent = edges.filter(
    (row) =>
      String((row as { from?: unknown }).from || "") === id ||
      String((row as { to?: unknown }).to || "") === id,
  );
  return adjacent;
}

export type ContextGraphExportResult = {
  format: "json" | "jsonl" | "csv";
  entities: Record<string, unknown>[];
  edges: Record<string, unknown>[];
};

export async function exportContextGraph(opts: {
  cwd: string;
  parsed: { format: "json" | "jsonl" | "csv" };
  rootOverride?: string;
}): Promise<ContextGraphExportResult> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const entities = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
  );
  const edges = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/graph/edges.jsonl"),
  );
  return { format: opts.parsed.format, entities, edges };
}

export async function validateContextGraph(opts: {
  cwd: string;
  parsed: Record<string, never>;
  rootOverride?: string;
}): Promise<{ valid: true }> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const errors: string[] = [];
  const entities = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
  );
  const edges = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/graph/edges.jsonl"),
  );
  const provenance = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/graph/provenance_edges.jsonl"),
  );
  const taskIds = await collectKnownTaskIds(root);
  const capabilityIds = await collectKnownCapabilityIds(root);

  const entityIds = new Set(entities.map((row) => String(row.id ?? "")));
  const seenEntityIds = new Set<string>();

  for (const row of entities) {
    if (typeof row.id !== "string" || !row.id.trim()) {
      errors.push("entity missing id");
      continue;
    }
    if (seenEntityIds.has(row.id)) {
      errors.push(`entity duplicate id: ${String(row.id)}`);
    }
    seenEntityIds.add(row.id);
    if (typeof row.kind !== "string" || !ALLOWED_ENTITY_KINDS.has(row.kind)) {
      errors.push(`entity invalid kind: ${String(row.id ?? "<unknown>")}`);
    }
    if (typeof row.label !== "string" || !row.label.trim()) {
      errors.push(`entity missing label: ${String(row.id)}`);
    }
    if ("status" in row && !isAllowedStatus(row.status)) {
      errors.push(`entity invalid status: ${String(row.id)}`);
    }
  }
  for (const row of edges) {
    if (typeof row.from !== "string" || !row.from)
      errors.push(`edge missing from: ${String(row.id ?? "<unknown>")}`);
    if (typeof row.to !== "string" || !row.to)
      errors.push(`edge missing to: ${String(row.id ?? "<unknown>")}`);
    if (typeof row.relation !== "string" || !row.relation) {
      errors.push(`edge missing relation: ${String(row.id ?? "<unknown>")}`);
    } else if (!ALLOWED_EDGE_RELATIONS.has(row.relation)) {
      errors.push(`edge invalid relation ${row.relation}: ${String(row.id ?? "<unknown>")}`);
    }
    if (!entityIds.has(String(row.from ?? "")))
      errors.push(`edge references missing entity: ${String(row.from ?? "")}`);
    if (!entityIds.has(String(row.to ?? "")))
      errors.push(`edge references missing entity: ${String(row.to ?? "")}`);
    const status = asString(row.status);
    if (status && !isAllowedStatus(status)) {
      errors.push(`edge invalid status: ${String(row.id ?? "<unknown>")}`);
    }
  }
  for (const row of provenance) {
    if (typeof row.source !== "string" || !row.source) errors.push("provenance missing source");
    const target = asString(row.target);
    const artifact = asString(row.artifact);
    if (!target && !artifact) {
      errors.push("provenance missing target/artifact");
    }
    const normalizedArtifact = artifact ? artifact.replace(/^\/+/, "").toLowerCase() : "";
    if (normalizedArtifact.startsWith(".agentplane/tasks/")) {
      const taskPath = normalizedArtifact.split("/")[2];
      if (taskPath && !taskIds.has(taskPath)) {
        errors.push(`provenance references missing task: ${artifact}`);
      }
      continue;
    }
    if (normalizedArtifact && normalizedArtifact.startsWith("context/derived/capabilities")) {
      const last = normalizedArtifact.split("/").at(-1) ?? "";
      if (last && !capabilityIds.has(last.replace(/\\.jsonl$/, ""))) {
        errors.push(`provenance references missing capability artifact row: ${artifact}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: [
        `graph validation failed: ${errors.length} issue(s)`,
        ...errors.map((error) => `- ${error}`),
      ].join("\n"),
    });
  }
  return { valid: true };
}

export async function cmdContextGraphSummary(
  opts: Parameters<typeof summarizeContextGraph>[0],
): Promise<number> {
  const result = await summarizeContextGraph(opts);
  output.line(
    `context graph summary: entities=${result.entities} edges=${result.edges} provenance=${result.provenance}`,
  );
  return 0;
}

export async function cmdContextGraphShow(
  opts: Parameters<typeof showContextGraphEntity>[0],
): Promise<number> {
  output.json(await showContextGraphEntity(opts));
  return 0;
}

export async function cmdContextGraphNeighbors(
  opts: Parameters<typeof listContextGraphNeighbors>[0],
): Promise<number> {
  output.json(await listContextGraphNeighbors(opts));
  return 0;
}

export async function cmdContextGraphExport(
  opts: Parameters<typeof exportContextGraph>[0],
): Promise<number> {
  const result = await exportContextGraph(opts);
  if (result.format === "jsonl") {
    const rows = [
      ...result.entities.map((row) => JSON.stringify(row)),
      ...result.edges.map((row) => JSON.stringify(row)),
    ];
    if (rows.length === 0) output.line("");
    else output.lines(rows);
  } else if (result.format === "csv") {
    output.lines([
      "kind,id,from,to,relation",
      ...result.entities.map((entity) => `entity,${entity.id ?? ""},,,`),
      ...result.edges.map(
        (edge) =>
          `edge,${edge.id ?? ""},${edge.from ?? ""},${edge.to ?? ""},${edge.relation ?? ""}`,
      ),
    ]);
  } else {
    output.json({ entities: result.entities, edges: result.edges });
  }
  return 0;
}

export async function cmdContextGraphValidate(
  opts: Parameters<typeof validateContextGraph>[0],
): Promise<number> {
  await validateContextGraph(opts);
  output.line("context graph valid");
  return 0;
}

async function collectKnownTaskIds(root: string): Promise<Set<string>> {
  const lockPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
  try {
    const raw = await readText(lockPath);
    const parsed = JSON.parse(raw) as { sources?: { path?: unknown }[] };
    if (Array.isArray(parsed?.sources)) {
      return new Set(
        parsed.sources
          .map((entry) => {
            const source = typeof entry?.path === "string" ? entry.path : "";
            if (!source.startsWith(".agentplane/tasks/")) return "";
            return source.split("/")[2] ?? "";
          })
          .filter(Boolean),
      );
    }
  } catch {
    // best-effort only
  }
  return new Set();
}

async function collectKnownCapabilityIds(root: string): Promise<Set<string>> {
  const out = new Set<string>();
  const rows = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/capabilities/capabilities.jsonl"),
  );
  for (const row of rows) {
    const id = asString(row.id);
    if (id) out.add(id);
  }
  return out;
}

async function countRows(filePath: string): Promise<number> {
  const rows = await loadJsonlRows(filePath);
  return rows.length;
}

async function loadJsonlRows(filePath: string): Promise<Record<string, unknown>[]> {
  if (!(await fileExists(filePath))) return [];
  const raw = await readText(filePath);
  return parseJsonlLines(raw) as Record<string, unknown>[];
}
