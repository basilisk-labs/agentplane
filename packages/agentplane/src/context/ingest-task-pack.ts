import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

import { writeJsonStableIfChanged, writeTextIfChanged } from "../shared/write-if-changed.js";
import { CONTEXT_EXTRACTION_CONTRACT } from "../runtime/sgr/index.js";

import type { ManifestEntry } from "./ingest-manifest.js";
import { buildSourceSpanSkeleton } from "./source-spans.js";

const CONTEXT_TASK_PACK_FILES = [
  "context-pack.md",
  "extraction-contract.json",
  "canonical-snapshot.json",
  "canonical-entity-catalog.json",
  "source-set.lock.json",
  "source-spans.skeleton.jsonl",
  "expected-artifacts.json",
] as const;

const CANDIDATE_LIMIT = 50;

const SNAPSHOT_SURFACES = {
  wiki: { path: "context/wiki", kind: "directory" },
  glossary: { path: "context/wiki/glossary.md", kind: "jsonl_or_file" },
  facts: { path: ".agentplane/context/derived/facts/facts.jsonl", kind: "jsonl_or_file" },
  graph_entities: {
    path: ".agentplane/context/derived/graph/entities.jsonl",
    kind: "jsonl_or_file",
  },
  graph_edges: {
    path: ".agentplane/context/derived/graph/edges.jsonl",
    kind: "jsonl_or_file",
  },
  entity_resolution: {
    path: ".agentplane/context/derived/ontology/entity-resolution.jsonl",
    kind: "jsonl_or_file",
  },
  page_creation: {
    path: ".agentplane/context/derived/ontology/page-creation.jsonl",
    kind: "jsonl_or_file",
  },
  source_spans: {
    path: ".agentplane/context/derived/sources/source-spans.jsonl",
    kind: "jsonl_or_file",
  },
  topology_plan: {
    path: ".agentplane/context/derived/wiki/topology.plan.json",
    kind: "jsonl_or_file",
  },
  link_index: {
    path: ".agentplane/context/derived/wiki/link-index.jsonl",
    kind: "jsonl_or_file",
  },
  orphan_report: {
    path: ".agentplane/context/derived/wiki/orphan-report.jsonl",
    kind: "jsonl_or_file",
  },
  coverage: {
    path: ".agentplane/context/derived/reports/coverage.jsonl",
    kind: "jsonl_or_file",
  },
  evaluator_scenarios: {
    path: ".agentplane/context/derived/reports/evaluator.jsonl",
    kind: "jsonl_or_file",
  },
} as const;

function digest(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

async function readFileOrNull(filePath: string): Promise<Buffer | null> {
  try {
    return await readFile(filePath);
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return null;
    throw err;
  }
}

async function collectWikiFiles(root: string): Promise<string[]> {
  const wikiRoot = path.join(root, "context", "wiki");
  const files: string[] = [];
  const stack = [wikiRoot];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch (err) {
      if ((err as { code?: string } | null)?.code === "ENOENT") continue;
      throw err;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "service") continue;
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolute);
      } else if (/\.mdx?$/iu.test(entry.name)) {
        files.push(path.relative(root, absolute).split(path.sep).join("/"));
      }
    }
  }
  return files.toSorted((left, right) => left.localeCompare(right));
}

async function snapshotFile(root: string, relativePath: string) {
  const content = await readFileOrNull(path.join(root, relativePath));
  if (!content) {
    return {
      path: relativePath,
      exists: false,
      bytes: 0,
      nonempty_line_count: 0,
      ...(relativePath.endsWith(".jsonl") ? { row_count: 0 } : {}),
      sha256: null,
    };
  }
  const text = content.toString("utf8");
  const nonemptyLineCount = text.split("\n").filter((line) => line.trim().length > 0).length;
  return {
    path: relativePath,
    exists: true,
    bytes: content.byteLength,
    nonempty_line_count: nonemptyLineCount,
    ...(relativePath.endsWith(".jsonl") ? { row_count: nonemptyLineCount } : {}),
    sha256: digest(content),
  };
}

async function snapshotWiki(root: string, files: string[]) {
  let bytes = 0;
  const fingerprintRows: string[] = [];
  for (const relativePath of files) {
    const content = await readFile(path.join(root, relativePath));
    bytes += content.byteLength;
    fingerprintRows.push(`${relativePath}\0${content.byteLength}\0${digest(content)}`);
  }
  return {
    path: "context/wiki",
    exists: files.length > 0 || (await directoryExists(path.join(root, "context", "wiki"))),
    bytes,
    file_count: files.length,
    sha256: digest(fingerprintRows.join("\n")),
  };
}

async function directoryExists(directoryPath: string): Promise<boolean> {
  try {
    const stats = await stat(directoryPath);
    return stats.isDirectory();
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return false;
    throw err;
  }
}

function wikiTitle(text: string, relativePath: string): string {
  const frontmatterTitle = /^---\s*[\s\S]*?^title:\s*["']?([^\n"']+)/mu.exec(text)?.[1]?.trim();
  const headingTitle = /^#\s+(.+)$/mu.exec(text)?.[1]?.trim();
  return (
    frontmatterTitle ?? headingTitle ?? path.basename(relativePath, path.extname(relativePath))
  );
}

async function wikiCandidates(root: string, files: string[]) {
  const candidates = [];
  for (const relativePath of files.slice(0, CANDIDATE_LIMIT)) {
    const text = await readFile(path.join(root, relativePath), "utf8");
    candidates.push({ path: relativePath, title: wikiTitle(text, relativePath) });
  }
  return candidates;
}

async function entityCandidates(root: string) {
  const relativePath = ".agentplane/context/derived/graph/entities.jsonl";
  const content = await readFileOrNull(path.join(root, relativePath));
  if (!content) return [];
  const rows: { id: string; label?: string; kind?: string; aliases?: string[] }[] = [];
  for (const line of content.toString("utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      const row = JSON.parse(line) as Record<string, unknown>;
      if (typeof row.id !== "string" || !row.id.trim()) continue;
      rows.push({
        id: row.id,
        ...(typeof row.label === "string" ? { label: row.label } : {}),
        ...(typeof row.kind === "string" ? { kind: row.kind } : {}),
        ...(Array.isArray(row.aliases) && row.aliases.every((alias) => typeof alias === "string")
          ? { aliases: row.aliases as string[] }
          : {}),
      });
    } catch {
      continue;
    }
  }
  return rows.toSorted((left, right) => left.id.localeCompare(right.id)).slice(0, CANDIDATE_LIMIT);
}

async function jsonlRecords(
  root: string,
  relativePath: string,
): Promise<Record<string, unknown>[]> {
  const content = await readFileOrNull(path.join(root, relativePath));
  if (!content) return [];
  const rows: Record<string, unknown>[] = [];
  for (const line of content.toString("utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        rows.push(parsed as Record<string, unknown>);
      }
    } catch {
      continue;
    }
  }
  return rows;
}

function optionalText(row: Record<string, unknown>, field: string): string | undefined {
  const value = row[field];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function textArray(row: Record<string, unknown>, field: string): string[] {
  const value = row[field];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function addGroupedValue(map: Map<string, Set<string>>, key: string, value: string): void {
  if (!key || !value) return;
  const values = map.get(key) ?? new Set<string>();
  values.add(value);
  map.set(key, values);
}

async function buildCanonicalEntityCatalog(opts: {
  root: string;
  taskId: string;
  generatedAt: string;
}): Promise<Record<string, unknown>> {
  const [entities, aliases, edges, pageManifests] = await Promise.all([
    jsonlRecords(opts.root, ".agentplane/context/derived/graph/entities.jsonl"),
    jsonlRecords(opts.root, ".agentplane/context/derived/ontology/aliases.jsonl"),
    jsonlRecords(opts.root, ".agentplane/context/derived/graph/edges.jsonl"),
    jsonlRecords(opts.root, ".agentplane/context/derived/wiki/page-manifests.jsonl"),
  ]);
  const aliasesByEntity = new Map<string, Set<string>>();
  for (const alias of aliases) {
    const canonicalId = optionalText(alias, "canonical_entity_id");
    const label = optionalText(alias, "alias");
    if (canonicalId && label) addGroupedValue(aliasesByEntity, canonicalId, label);
  }
  const pagesByEntity = new Map<string, Set<string>>();
  for (const page of pageManifests) {
    const pagePath = optionalText(page, "path") ?? optionalText(page, "target_path");
    if (!pagePath) continue;
    for (const entityId of textArray(page, "canonical_entity_ids")) {
      addGroupedValue(pagesByEntity, entityId, pagePath);
    }
  }
  const relationsByEntity = new Map<
    string,
    { direction: "outgoing" | "incoming"; relation: string; entity_id: string; edge_id?: string }[]
  >();
  for (const edge of edges) {
    const from = optionalText(edge, "from");
    const to = optionalText(edge, "to");
    const relation = optionalText(edge, "relation");
    const edgeId = optionalText(edge, "id");
    if (!from || !to || !relation) continue;
    const outgoing = relationsByEntity.get(from) ?? [];
    outgoing.push({
      direction: "outgoing",
      relation,
      entity_id: to,
      ...(edgeId ? { edge_id: edgeId } : {}),
    });
    relationsByEntity.set(from, outgoing);
    const incoming = relationsByEntity.get(to) ?? [];
    incoming.push({
      direction: "incoming",
      relation,
      entity_id: from,
      ...(edgeId ? { edge_id: edgeId } : {}),
    });
    relationsByEntity.set(to, incoming);
  }
  const catalogEntities = entities
    .flatMap((entity) => {
      const id = optionalText(entity, "id");
      if (!id) return [];
      const combinedAliases = new Set([
        ...textArray(entity, "aliases"),
        ...(aliasesByEntity.get(id) ?? []),
      ]);
      return [
        {
          id,
          ...(optionalText(entity, "kind") ? { kind: optionalText(entity, "kind") } : {}),
          ...(optionalText(entity, "label") ? { label: optionalText(entity, "label") } : {}),
          ...(optionalText(entity, "summary") ? { summary: optionalText(entity, "summary") } : {}),
          ...(optionalText(entity, "scope") ? { scope: optionalText(entity, "scope") } : {}),
          ...(optionalText(entity, "validity")
            ? { validity: optionalText(entity, "validity") }
            : {}),
          ...(optionalText(entity, "status") ? { status: optionalText(entity, "status") } : {}),
          aliases: [...combinedAliases].toSorted((left, right) => left.localeCompare(right)),
          source_refs: textArray(entity, "source_refs").toSorted((left, right) =>
            left.localeCompare(right),
          ),
          wiki_paths: [...(pagesByEntity.get(id) ?? [])].toSorted((left, right) =>
            left.localeCompare(right),
          ),
          relations: (relationsByEntity.get(id) ?? []).toSorted((left, right) =>
            `${left.direction}:${left.relation}:${left.entity_id}`.localeCompare(
              `${right.direction}:${right.relation}:${right.entity_id}`,
            ),
          ),
        },
      ];
    })
    .toSorted((left, right) => left.id.localeCompare(right.id));
  return {
    version: 1,
    task_id: opts.taskId,
    generated_at: opts.generatedAt,
    entity_count: catalogEntities.length,
    catalog_sha256: digest(JSON.stringify(catalogEntities)),
    entities: catalogEntities,
  };
}

async function buildCanonicalSnapshot(opts: { root: string; taskId: string; generatedAt: string }) {
  const wikiFiles = await collectWikiFiles(opts.root);
  const surfaceEntries = await Promise.all(
    Object.entries(SNAPSHOT_SURFACES).map(
      async ([name, surface]) =>
        [
          name,
          surface.kind === "directory"
            ? await snapshotWiki(opts.root, wikiFiles)
            : await snapshotFile(opts.root, surface.path),
        ] as const,
    ),
  );
  return {
    version: 2,
    task_id: opts.taskId,
    generated_at: opts.generatedAt,
    candidate_limit: CANDIDATE_LIMIT,
    surfaces: Object.fromEntries(surfaceEntries),
    candidates: {
      wiki_pages: await wikiCandidates(opts.root, wikiFiles),
      graph_entities: await entityCandidates(opts.root),
    },
  };
}

function taskRel(taskId: string, fileName: (typeof CONTEXT_TASK_PACK_FILES)[number]): string {
  return `.agentplane/tasks/${taskId}/${fileName}`;
}

export async function writeContextExtractionContract(opts: {
  root: string;
  taskId: string;
}): Promise<string> {
  const relativePath = `.agentplane/tasks/${opts.taskId}/extraction-contract.json`;
  await writeJsonStableIfChanged(path.join(opts.root, relativePath), CONTEXT_EXTRACTION_CONTRACT);
  return relativePath;
}

function buildExpectedArtifacts(taskId: string): Record<string, unknown> {
  const generatedTaskPackFiles = CONTEXT_TASK_PACK_FILES.filter(
    (fileName) => fileName !== "expected-artifacts.json",
  ).map((fileName) => taskRel(taskId, fileName));
  return {
    version: 1,
    task_id: taskId,
    required: [
      ...generatedTaskPackFiles,
      "context/wiki/log.md",
      "context/wiki/glossary.md",
      "context/wiki/reports/topology.md",
      "context/wiki/reports/coverage.md",
      "context/wiki/reports/conflicts.md",
      "context/wiki/reports/open-questions.md",
      "context/wiki/reports/evaluator-review.md",
      ".agentplane/context/derived/facts/facts.jsonl",
      ".agentplane/context/derived/graph/entities.jsonl",
      ".agentplane/context/derived/graph/edges.jsonl",
      ".agentplane/context/derived/ontology/entity-resolution.jsonl",
      ".agentplane/context/derived/ontology/page-creation.jsonl",
      ".agentplane/context/derived/sources/source-spans.jsonl",
      ".agentplane/context/derived/wiki/topology.plan.json",
      ".agentplane/context/derived/wiki/link-index.jsonl",
      ".agentplane/context/derived/wiki/orphan-report.jsonl",
      ".agentplane/context/derived/reports/coverage.jsonl",
      ".agentplane/context/derived/reports/evaluator.jsonl",
    ],
    notes: [
      "Task-bound pack files are CLI-generated scaffolds.",
      "CURATOR owns semantic classification, entity identity decisions, extraction, topology decisions, coverage rows, and evaluator review; deterministic code prepares evidence, validates decisions, and compiles writer-owned formal and wiki artifacts atomically.",
    ],
  };
}

function buildContextPackMarkdown(opts: {
  taskId: string;
  sources: ManifestEntry[];
  spanCount: number;
}): string {
  const sourceLines = opts.sources.map(
    (source) =>
      `- ${source.path} (${source.status}, ${source.content_type}, ${source.sha256}, ${source.size_bytes} bytes)`,
  );
  return [
    `# Context Pack: ${opts.taskId}`,
    "",
    "This pack is generated by `agentplane context ingest` for a `context.maximum_assimilation` CURATOR task.",
    "",
    "## Required Inputs",
    "",
    "- `source-set.lock.json`: selected source identity, hashes, status, type, and size.",
    "- `extraction-contract.json`: exact SGR v2 payload requirements plus a valid example.",
    "- `canonical-snapshot.json`: current surface counts, digests, and bounded page/entity candidates for reconciliation.",
    "- `canonical-entity-catalog.json`: complete canonical entity inventory with aliases, provenance, wiki targets, and graph neighborhoods.",
    "- `source-spans.skeleton.jsonl`: deterministic addressable source spans for semantic classification.",
    "- `expected-artifacts.json`: required output contract for this task.",
    "",
    "## Selected Sources",
    "",
    ...sourceLines,
    "",
    "## Source Span Skeleton",
    "",
    `Generated spans: ${opts.spanCount}.`,
    "",
    "CURATOR must classify spans semantically and produce coverage rows before claiming semantic completeness.",
    "",
    "## Semantic Entity Reconciliation",
    "",
    "For every source term that may denote an entity, CURATOR must decide meaning before creating or updating graph rows. Deterministic AgentPlane code must not make this decision.",
    "",
    "1. Search the complete canonical entity catalog, then use context search and graph neighbors for plausible lexical and semantic candidates.",
    "2. Compare kind, scope, time/validity, ownership, defining properties, aliases, source evidence, wiki use, and graph neighborhood. Similar spelling alone is insufficient.",
    "3. Emit one evidence-bearing entity_resolution row: same_as, alias_of, distinct_entity, possibly_same_as, or new_entity_proposal.",
    "4. For same_as or alias_of, reuse canonical_entity_id and do not emit a second graph_entity. For ambiguity, preserve both identities and list evidence still needed. Propose a new entity only after documenting the candidates and why none match.",
    "5. Record candidate comparisons, decision dimensions, evidence for and against, rationale, and unresolved questions. Stop rather than merging across conflicting scope, validity, ownership, or defining properties.",
    "",
    "Success means a future executor can reproduce every merge/no-merge decision from task-bound evidence without relying on stable ID equality or hidden conversation context.",
    "",
  ].join("\n");
}

export async function writeContextTaskPack(opts: {
  root: string;
  taskId: string;
  sources: ManifestEntry[];
  generatedAt?: string;
}): Promise<{ taskDir: string; spanCount: number }> {
  const generatedAt = opts.generatedAt ?? new Date().toISOString();
  const taskDir = path.join(opts.root, ".agentplane", "tasks", opts.taskId);
  await mkdir(taskDir, { recursive: true });

  const spans = await buildSourceSpanSkeleton({ root: opts.root, sources: opts.sources });
  const canonicalSnapshot = await buildCanonicalSnapshot({
    root: opts.root,
    taskId: opts.taskId,
    generatedAt,
  });
  const canonicalEntityCatalog = await buildCanonicalEntityCatalog({
    root: opts.root,
    taskId: opts.taskId,
    generatedAt,
  });
  await writeJsonStableIfChanged(path.join(taskDir, "source-set.lock.json"), {
    version: 1,
    task_id: opts.taskId,
    generated_at: generatedAt,
    files: opts.sources,
  });
  await writeContextExtractionContract({ root: opts.root, taskId: opts.taskId });
  await writeJsonStableIfChanged(path.join(taskDir, "canonical-snapshot.json"), canonicalSnapshot);
  await writeJsonStableIfChanged(
    path.join(taskDir, "canonical-entity-catalog.json"),
    canonicalEntityCatalog,
  );
  await writeTextIfChanged(
    path.join(taskDir, "source-spans.skeleton.jsonl"),
    spans.map((span) => JSON.stringify(span)).join("\n") + (spans.length > 0 ? "\n" : ""),
  );
  await writeJsonStableIfChanged(
    path.join(taskDir, "expected-artifacts.json"),
    buildExpectedArtifacts(opts.taskId),
  );
  await writeTextIfChanged(
    path.join(taskDir, "context-pack.md"),
    buildContextPackMarkdown({
      taskId: opts.taskId,
      sources: opts.sources,
      spanCount: spans.length,
    }),
  );

  return { taskDir, spanCount: spans.length };
}
