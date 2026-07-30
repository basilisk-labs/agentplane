import { createHash } from "node:crypto";
import { mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { contentTypeForPath } from "../../context/ingest-manifest.js";
import type { TaskSourceFingerprint } from "../../context/harvest-tasks-markers.js";
import type { buildOutput } from "./harvest-tasks-artifacts.js";
import { fileExists, isRecord } from "./context-utils.js";

type Proposal = ReturnType<typeof buildOutput>["proposals"][number];
type Evidence = ReturnType<typeof buildOutput>["evidence"][number];

export type TaskKnowledgeCanonicalCheck = {
  schema_version: 1;
  kind: "task_knowledge_proposal_canonical_check";
  proposal_id: string;
  source_task_id: string;
  checked_at: string;
  checked_by: "context.harvest.tasks";
  query_source_refs: string[];
  canonical_sources: { path: string; sha256: string; size_bytes: number; content_type: string }[];
  matches: {
    source_ref: string;
    source_id: string | null;
    matched_terms: string[];
    match_basis: "exact_phrase" | "lexical_overlap";
    excerpt: string;
  }[];
  result: "clear" | "consolidation_required";
  resolution: {
    state: "recorded";
    owner: "CURATOR";
    required_action: "semantic_reconciliation" | "durable_knowledge_assessment";
  };
};

export function taskKnowledgeRawEvidencePath(taskId: string): string {
  return `context/raw/tasks/${taskId}.json`;
}
export function taskKnowledgeSelectionIntentPath(proposalId: string): string {
  return `.agentplane/context/derived/proposals/task-knowledge/${proposalId}.selection.intent.json`;
}
export function taskKnowledgeSelectionReceiptPath(proposalId: string): string {
  return `.agentplane/context/derived/proposals/task-knowledge/${proposalId}.selection.json`;
}
function canonicalCheckPath(proposalId: string): string {
  return `.agentplane/context/derived/proposals/task-knowledge/${proposalId}.canonical-check.json`;
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, " ")
    .replaceAll(/\s+/gu, " ")
    .trim();
}
function normalizedTerms(text: string): string[] {
  return [
    ...new Set(
      normalizeText(text)
        .split(" ")
        .filter((term) => term.length >= 3),
    ),
  ].toSorted();
}

async function canonicalPaths(root: string): Promise<string[]> {
  const paths = [
    ".agentplane/context/derived/facts/facts.jsonl",
    ".agentplane/context/derived/graph/entities.jsonl",
    ".agentplane/context/derived/graph/edges.jsonl",
    ".agentplane/context/derived/ontology/aliases.jsonl",
    ".agentplane/context/derived/ontology/entity-resolution.jsonl",
    ".agentplane/context/derived/wiki/page-manifests.jsonl",
  ];
  const stack = [path.join(root, "context/wiki")];
  while (stack.length > 0) {
    const directory = stack.pop();
    if (!directory) continue;
    let entries: { name: string; isDirectory: () => boolean }[];
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "service") continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) stack.push(absolute);
      else if (/\.mdx?$/iu.test(entry.name))
        paths.push(path.relative(root, absolute).split(path.sep).join("/"));
    }
  }
  const candidates = await Promise.all(
    paths.toSorted().map(async (candidate) => ({
      candidate,
      exists: await fileExists(path.join(root, candidate)),
    })),
  );
  return candidates.filter((entry) => entry.exists).map((entry) => entry.candidate);
}

function recordId(value: string, fallback: string): string | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!isRecord(parsed)) return null;
    for (const key of ["id", "claim_id", "entity_id", "path", "target_path"])
      if (typeof parsed[key] === "string" && parsed[key].trim()) return parsed[key].trim();
  } catch {
    /* searchable historical text may not be JSON */
  }
  return fallback || null;
}

function matchesForText(opts: {
  path: string;
  text: string;
  queryPhrases: readonly string[];
  queryTerms: readonly string[];
}): TaskKnowledgeCanonicalCheck["matches"] {
  const matches: TaskKnowledgeCanonicalCheck["matches"] = [];
  for (const [index, line] of opts.text.split(/\r?\n/u).entries()) {
    const normalizedLine = normalizeText(line);
    if (!normalizedLine) continue;
    const exactPhrase = opts.queryPhrases.find(
      (phrase) => phrase.length >= 18 && normalizedLine.includes(phrase),
    );
    const terms = new Set(normalizedTerms(line));
    const sharedTerms = opts.queryTerms.filter((term) => terms.has(term));
    if (!exactPhrase && sharedTerms.length < 3) continue;
    matches.push({
      source_ref: `${opts.path}#line=${index + 1}`,
      source_id: recordId(line, `${opts.path}:${index + 1}`),
      matched_terms: (exactPhrase ? normalizedTerms(exactPhrase) : sharedTerms).slice(0, 12),
      match_basis: exactPhrase ? "exact_phrase" : "lexical_overlap",
      excerpt: line.trim().slice(0, 280),
    });
  }
  return matches;
}

async function buildCanonicalCheck(opts: {
  root: string;
  proposal: Proposal;
  evidence: Evidence;
}): Promise<TaskKnowledgeCanonicalCheck> {
  const signalLines = opts.proposal.signals.flatMap((signal) =>
    signal.source_refs.flatMap((ref) => {
      const line = Number.parseInt(ref.split("=").at(-1) ?? "", 10);
      return Number.isInteger(line) && line > 0
        ? [opts.evidence.source_text_lines[line - 1] ?? ""]
        : [];
    }),
  );
  const queryPhrases = [opts.proposal.title, ...signalLines]
    .map((phrase) => normalizeText(phrase))
    .filter((phrase) => phrase.length >= 18);
  const queryTerms = normalizedTerms([opts.proposal.title, ...signalLines].join(" "));
  const canonical_sources: TaskKnowledgeCanonicalCheck["canonical_sources"] = [];
  const matches: TaskKnowledgeCanonicalCheck["matches"] = [];
  for (const rel of await canonicalPaths(opts.root)) {
    const content = await readFile(path.join(opts.root, rel));
    canonical_sources.push({
      path: rel,
      sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
      size_bytes: content.byteLength,
      content_type: contentTypeForPath(rel),
    });
    matches.push(
      ...matchesForText({ path: rel, text: content.toString("utf8"), queryPhrases, queryTerms }),
    );
  }
  const uniqueMatches = matches
    .toSorted((left, right) => left.source_ref.localeCompare(right.source_ref))
    .filter(
      (match, index, rows) => index === 0 || rows[index - 1]?.source_ref !== match.source_ref,
    );
  return {
    schema_version: 1,
    kind: "task_knowledge_proposal_canonical_check",
    proposal_id: opts.proposal.id,
    source_task_id: opts.proposal.source_task_id,
    checked_at: new Date().toISOString(),
    checked_by: "context.harvest.tasks",
    query_source_refs: opts.proposal.source_refs,
    canonical_sources,
    matches: uniqueMatches,
    result: uniqueMatches.length > 0 ? "consolidation_required" : "clear",
    resolution: {
      state: "recorded",
      owner: "CURATOR",
      required_action:
        uniqueMatches.length > 0 ? "semantic_reconciliation" : "durable_knowledge_assessment",
    },
  };
}

export async function writeTaskKnowledgeCanonicalCheck(opts: {
  root: string;
  proposal: Proposal;
  evidence: Evidence;
}): Promise<{ path: string; check: TaskKnowledgeCanonicalCheck }> {
  const check = await buildCanonicalCheck(opts);
  const rel = canonicalCheckPath(opts.proposal.id);
  await mkdir(path.dirname(path.join(opts.root, rel)), { recursive: true });
  await writeJsonStableIfChanged(path.join(opts.root, rel), check);
  return { path: rel, check };
}

export async function readFrozenTaskKnowledgeCanonicalCheck(opts: {
  root: string;
  proposal: Proposal;
  intent: { canonical_check: { path: string; sha256: string } };
}): Promise<{ path: string; check: TaskKnowledgeCanonicalCheck }> {
  const content = await readFile(path.join(opts.root, opts.intent.canonical_check.path));
  const sha256 = `sha256:${createHash("sha256").update(content).digest("hex")}`;
  if (sha256 !== opts.intent.canonical_check.sha256)
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Frozen canonical check changed for task knowledge proposal ${opts.proposal.id}. Stop and reconcile the interrupted selection before retrying.`,
    });
  let check: unknown;
  try {
    check = JSON.parse(content.toString("utf8"));
  } catch {
    check = null;
  }
  if (
    !isRecord(check) ||
    check.kind !== "task_knowledge_proposal_canonical_check" ||
    check.proposal_id !== opts.proposal.id ||
    check.source_task_id !== opts.proposal.source_task_id
  )
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Frozen canonical check is invalid for task knowledge proposal ${opts.proposal.id}.`,
    });
  return { path: opts.intent.canonical_check.path, check: check as TaskKnowledgeCanonicalCheck };
}

async function provenanceRefs(root: string, taskId: string): Promise<string[]> {
  const refs: string[] = [];
  for (const rel of [
    `.agentplane/tasks/${taskId}/pr/meta.json`,
    `.agentplane/tasks/${taskId}/pr/diffstat.txt`,
  ])
    if (await fileExists(path.join(root, rel))) refs.push(`${rel}#all`);
  const qualityRoot = path.join(root, ".agentplane/tasks", taskId, "quality");
  try {
    const qualityEntries = await readdir(qualityRoot, { withFileTypes: true });
    for (const directory of qualityEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .toSorted()) {
      const rel = `.agentplane/tasks/${taskId}/quality/${directory}/evaluator-result.json`;
      if (await fileExists(path.join(root, rel))) refs.push(`${rel}#all`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return refs;
}

export async function taskKnowledgeProvenanceRefs(
  root: string,
  tasks: readonly TaskData[],
): Promise<Map<string, string[]>> {
  return new Map(
    await Promise.all(
      tasks.map(async (task) => [task.id, await provenanceRefs(root, task.id)] as const),
    ),
  );
}

export async function existingTaskKnowledgeProvenanceRefs(
  root: string,
  taskId: string,
): Promise<string[]> {
  return await provenanceRefs(root, taskId);
}

export function taskHasCurrentCuratorSelection(opts: {
  task: TaskData;
  fingerprint: TaskSourceFingerprint | undefined;
}): string | null {
  const extensions = isRecord(opts.task.extensions) ? opts.task.extensions : {};
  const marker = extensions.context_task_extraction;
  if (
    !isRecord(marker) ||
    marker.state !== "selected" ||
    typeof marker.extraction_task_id !== "string" ||
    !marker.extraction_task_id.trim()
  )
    return null;
  if (
    opts.fingerprint &&
    (marker.source_digest !== opts.fingerprint.digest ||
      marker.source_fingerprint_version !== opts.fingerprint.version)
  )
    return null;
  return marker.extraction_task_id;
}
