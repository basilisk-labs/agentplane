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
      "context/wiki/glossary.md",
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
      "CURATOR owns semantic classification, extraction, topology, wiki synthesis, coverage rows, and evaluator review.",
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
  await writeJsonStableIfChanged(path.join(taskDir, "source-set.lock.json"), {
    version: 1,
    task_id: opts.taskId,
    generated_at: generatedAt,
    files: opts.sources,
  });
  await writeContextExtractionContract({ root: opts.root, taskId: opts.taskId });
  await writeJsonStableIfChanged(path.join(taskDir, "canonical-snapshot.json"), canonicalSnapshot);
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
