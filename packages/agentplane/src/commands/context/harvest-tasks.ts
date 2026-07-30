import { createHash, randomUUID } from "node:crypto";
import type { Stats } from "node:fs";
import { mkdir, open, readFile, readdir, rename, stat, unlink } from "node:fs/promises";
import { hostname } from "node:os";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { runTaskNewParsed, type TaskCreationResult } from "../task/new.js";
import { fileExists, isRecord } from "./context-utils.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { writeContextTaskPack } from "../../context/ingest-task-pack.js";
import { contentTypeForPath, type ManifestEntry } from "../../context/ingest-manifest.js";
import {
  buildOutput,
  renderText,
  selectTaskCandidates,
  selectTasks,
  writeOutputs,
  type ContextHarvestTasksParsed,
} from "./harvest-tasks-artifacts.js";
import { buildExtractionTaskPlans, buildTaskExtractionMarker } from "./harvest-tasks-extraction.js";
import type { TaskHarvestMarker } from "./harvest-tasks-markers.js";
import { taskExtractionSourceFingerprints } from "../../context/harvest-tasks-markers.js";
import type { TaskSourceFingerprint } from "../../context/harvest-tasks-markers.js";

export { readHarvestReport, type ContextHarvestTasksParsed } from "./harvest-tasks-artifacts.js";

async function readAllTasks(ctx: CommandContext): Promise<TaskData[]> {
  return await ctx.taskBackend.listTasks();
}

async function assertContextWorkspaceReady(root: string): Promise<void> {
  const required = [
    ".agentplane/context/agentplane.context.yaml",
    ".agentplane/context/policies/context.rules.md",
    ".agentplane/context/policies/wiki.rules.md",
    ".agentplane/context/policies/redaction.rules.yaml",
  ];
  const missing: string[] = [];
  for (const rel of required) {
    if (!(await fileExists(path.join(root, rel)))) missing.push(rel);
  }
  if (missing.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest writes require an initialized context workspace. " +
        `Run agentplane context init first. Missing: ${missing.join(", ")}`,
    });
  }
}

function sameMarker(current: unknown, next: TaskHarvestMarker): boolean {
  return isRecord(current) && JSON.stringify(current) === JSON.stringify(next);
}

function taskKnowledgeRawEvidencePath(taskId: string): string {
  return `context/raw/tasks/${taskId}.json`;
}

function taskKnowledgeSelectionCheckPath(proposalId: string): string {
  return `.agentplane/context/derived/proposals/task-knowledge/${proposalId}.canonical-check.json`;
}

function taskKnowledgeSelectionIntentPath(proposalId: string): string {
  return `.agentplane/context/derived/proposals/task-knowledge/${proposalId}.selection.intent.json`;
}

function taskKnowledgeSelectionReceiptPath(proposalId: string): string {
  return `.agentplane/context/derived/proposals/task-knowledge/${proposalId}.selection.json`;
}

type CanonicalKnowledgeSource = {
  path: string;
  sha256: string;
  size_bytes: number;
  content_type: string;
};

type CanonicalKnowledgeMatch = {
  source_ref: string;
  source_id: string | null;
  matched_terms: string[];
  match_basis: "exact_phrase" | "lexical_overlap";
  excerpt: string;
};

type TaskKnowledgeCanonicalCheck = {
  schema_version: 1;
  kind: "task_knowledge_proposal_canonical_check";
  proposal_id: string;
  source_task_id: string;
  checked_at: string;
  checked_by: "context.harvest.tasks";
  query_source_refs: string[];
  canonical_sources: CanonicalKnowledgeSource[];
  matches: CanonicalKnowledgeMatch[];
  result: "clear" | "consolidation_required";
  resolution: {
    state: "recorded";
    owner: "CURATOR";
    required_action: "semantic_reconciliation" | "durable_knowledge_assessment";
  };
};

const TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS = 10 * 60 * 1000;

type TaskKnowledgeLockOwner = {
  token: string;
  pid: number;
  hostname: string;
};

type TaskKnowledgeSelectionLock = {
  schema_version: 1;
  kind: "task_knowledge_proposal_selection_lock";
  owner: TaskKnowledgeLockOwner;
  acquired_at: string;
  expires_at: string;
};

type TaskKnowledgeSelectionReclaimGuard = {
  schema_version: 1;
  kind: "task_knowledge_proposal_selection_reclaim_guard";
  owner: TaskKnowledgeLockOwner;
  acquired_at: string;
  expires_at: string;
};

type TaskKnowledgeSelectionIntent = {
  schema_version: 1;
  kind: "task_knowledge_proposal_selection_intent";
  proposal_id: string;
  source_task_id: string;
  source_digest: string;
  source_fingerprint_version: 1 | 2;
  batch_fingerprint: string;
  canonical_check: { path: string; sha256: string };
  state: "creating" | "created";
  curator_task_id: string | null;
  recorded_at: string;
};

type TaskKnowledgeSelectionLockTestHooks = {
  afterStaleLockRead?: (input: {
    target: string;
    ownerToken: string | null;
  }) => void | Promise<void>;
};

function normalizedTerms(text: string): string[] {
  return [
    ...new Set(
      normalizeText(text)
        .split(" ")
        .filter((term) => term.length >= 3),
    ),
  ].toSorted();
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, " ")
    .replaceAll(/\s+/gu, " ")
    .trim();
}

async function collectCanonicalKnowledgePaths(root: string): Promise<string[]> {
  const paths = [
    ".agentplane/context/derived/facts/facts.jsonl",
    ".agentplane/context/derived/graph/entities.jsonl",
    ".agentplane/context/derived/graph/edges.jsonl",
    ".agentplane/context/derived/ontology/aliases.jsonl",
    ".agentplane/context/derived/ontology/entity-resolution.jsonl",
    ".agentplane/context/derived/wiki/page-manifests.jsonl",
  ];
  const wikiRoot = path.join(root, "context/wiki");
  const stack = [wikiRoot];
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
      if (entry.isDirectory()) {
        stack.push(absolute);
      } else if (/\.mdx?$/iu.test(entry.name)) {
        paths.push(path.relative(root, absolute).split(path.sep).join("/"));
      }
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

function canonicalRecordId(value: string, fallback: string): string | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!isRecord(parsed)) return null;
    for (const key of ["id", "claim_id", "entity_id", "path", "target_path"]) {
      if (typeof parsed[key] === "string" && parsed[key].trim()) return parsed[key].trim();
    }
  } catch {
    // Markdown and malformed historical JSONL rows are still searchable as text.
  }
  return fallback || null;
}

function canonicalMatchesForText(opts: {
  path: string;
  text: string;
  queryPhrases: readonly string[];
  queryTerms: readonly string[];
}): CanonicalKnowledgeMatch[] {
  const lines = opts.text.split(/\r?\n/u);
  const matches: CanonicalKnowledgeMatch[] = [];
  for (const [index, line] of lines.entries()) {
    const normalizedLine = normalizeText(line);
    if (!normalizedLine) continue;
    const exactPhrase = opts.queryPhrases.find(
      (phrase) => phrase.length >= 18 && normalizedLine.includes(phrase),
    );
    const lineTerms = new Set(normalizedTerms(line));
    const sharedTerms = opts.queryTerms.filter((term) => lineTerms.has(term));
    if (!exactPhrase && sharedTerms.length < 3) continue;
    matches.push({
      source_ref: `${opts.path}#line=${index + 1}`,
      source_id: canonicalRecordId(line, `${opts.path}:${index + 1}`),
      matched_terms: (exactPhrase ? normalizedTerms(exactPhrase) : sharedTerms).slice(0, 12),
      match_basis: exactPhrase ? "exact_phrase" : "lexical_overlap",
      excerpt: line.trim().slice(0, 280),
    });
  }
  return matches;
}

async function buildTaskKnowledgeCanonicalCheck(opts: {
  root: string;
  proposal: ReturnType<typeof buildOutput>["proposals"][number];
  evidence: ReturnType<typeof buildOutput>["evidence"][number];
}): Promise<TaskKnowledgeCanonicalCheck> {
  const canonicalPaths = await collectCanonicalKnowledgePaths(opts.root);
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
  const canonicalSources: CanonicalKnowledgeSource[] = [];
  const matches: CanonicalKnowledgeMatch[] = [];
  for (const rel of canonicalPaths) {
    const absolute = path.join(opts.root, rel);
    const content = await readFile(absolute);
    canonicalSources.push({
      path: rel,
      sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
      size_bytes: content.byteLength,
      content_type: contentTypeForPath(rel),
    });
    matches.push(
      ...canonicalMatchesForText({
        path: rel,
        text: content.toString("utf8"),
        queryPhrases,
        queryTerms,
      }),
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
    canonical_sources: canonicalSources,
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

async function writeTaskKnowledgeCanonicalCheck(opts: {
  root: string;
  proposal: ReturnType<typeof buildOutput>["proposals"][number];
  evidence: ReturnType<typeof buildOutput>["evidence"][number];
}): Promise<{ path: string; check: TaskKnowledgeCanonicalCheck }> {
  const check = await buildTaskKnowledgeCanonicalCheck(opts);
  const rel = taskKnowledgeSelectionCheckPath(opts.proposal.id);
  await mkdir(path.dirname(path.join(opts.root, rel)), { recursive: true });
  await writeJsonStableIfChanged(path.join(opts.root, rel), check);
  return { path: rel, check };
}

async function readFrozenTaskKnowledgeCanonicalCheck(opts: {
  root: string;
  proposal: ReturnType<typeof buildOutput>["proposals"][number];
  intent: TaskKnowledgeSelectionIntent;
}): Promise<{ path: string; check: TaskKnowledgeCanonicalCheck }> {
  const content = await readFile(path.join(opts.root, opts.intent.canonical_check.path));
  const sha256 = `sha256:${createHash("sha256").update(content).digest("hex")}`;
  if (sha256 !== opts.intent.canonical_check.sha256) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `Frozen canonical check changed for task knowledge proposal ${opts.proposal.id}. ` +
        "Stop and reconcile the interrupted selection before retrying.",
    });
  }
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
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Frozen canonical check is invalid for task knowledge proposal ${opts.proposal.id}.`,
    });
  }
  return { path: opts.intent.canonical_check.path, check: check as TaskKnowledgeCanonicalCheck };
}

function optionalTaskArtifactPaths(taskId: string): string[] {
  return [
    `.agentplane/tasks/${taskId}/pr/meta.json`,
    `.agentplane/tasks/${taskId}/pr/diffstat.txt`,
  ];
}

async function existingTaskKnowledgeProvenanceRefs(
  root: string,
  taskId: string,
): Promise<string[]> {
  const refs: string[] = [];
  for (const rel of optionalTaskArtifactPaths(taskId)) {
    if (await fileExists(path.join(root, rel))) refs.push(`${rel}#all`);
  }
  const qualityRoot = path.join(root, ".agentplane/tasks", taskId, "quality");
  try {
    const qualityEntries = await readdir(qualityRoot, { withFileTypes: true });
    const directories = qualityEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .toSorted();
    for (const directory of directories) {
      const rel = `.agentplane/tasks/${taskId}/quality/${directory}/evaluator-result.json`;
      if (await fileExists(path.join(root, rel))) refs.push(`${rel}#all`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return refs;
}

async function taskKnowledgeProvenanceRefs(
  root: string,
  tasks: readonly TaskData[],
): Promise<Map<string, string[]>> {
  return new Map(
    await Promise.all(
      tasks.map(
        async (task) =>
          [task.id, await existingTaskKnowledgeProvenanceRefs(root, task.id)] as const,
      ),
    ),
  );
}

function taskHasCurrentCuratorSelection(opts: {
  task: TaskData;
  fingerprint: TaskSourceFingerprint | undefined;
}): string | null {
  const extensions = isRecord(opts.task.extensions) ? opts.task.extensions : {};
  const marker = extensions.context_task_extraction;
  if (!isRecord(marker) || marker.state !== "selected") return null;
  if (typeof marker.extraction_task_id !== "string" || !marker.extraction_task_id.trim()) {
    return null;
  }
  if (
    opts.fingerprint &&
    (marker.source_digest !== opts.fingerprint.digest ||
      marker.source_fingerprint_version !== opts.fingerprint.version)
  ) {
    return null;
  }
  return marker.extraction_task_id;
}

async function acquireTaskKnowledgeSelectionLock(opts: {
  root: string;
  proposalId: string;
  testHooks?: TaskKnowledgeSelectionLockTestHooks;
}): Promise<() => Promise<void>> {
  const rel = `.agentplane/context/derived/proposals/task-knowledge/${opts.proposalId}.selection.lock`;
  const target = path.join(opts.root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  const owner = { token: randomUUID(), pid: process.pid, hostname: hostname() };
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  while (!handle) {
    try {
      handle = await open(target, "wx");
      const acquiredAt = new Date();
      const lock: TaskKnowledgeSelectionLock = {
        schema_version: 1,
        kind: "task_knowledge_proposal_selection_lock",
        owner,
        acquired_at: acquiredAt.toISOString(),
        expires_at: new Date(
          acquiredAt.getTime() + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS,
        ).toISOString(),
      };
      await handle.writeFile(`${JSON.stringify(lock)}\n`, "utf8");
      await handle.sync();
      if (await fileExists(taskKnowledgeSelectionReclaimGuardPath(target))) {
        await handle.close();
        handle = null;
        await removeTaskKnowledgeSelectionLockIfOwned({ target, ownerToken: owner.token });
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            "CURATOR selection recovery is already in progress for this task knowledge proposal. " +
            "Re-run after the recovery guard is released.",
        });
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const reclaimed = await reclaimStaleTaskKnowledgeSelectionLock({
        target,
        testHooks: opts.testHooks,
      });
      if (reclaimed) continue;
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message:
          "A live CURATOR selection is already being created for this task knowledge proposal. Re-run after its lease expires or the active selection finishes.",
      });
    }
  }
  return async () => {
    await handle.close();
    await removeTaskKnowledgeSelectionLockIfOwned({ target, ownerToken: owner.token });
  };
}

function taskKnowledgeSelectionReclaimGuardPath(target: string): string {
  return `${target}.reclaim.lock`;
}

async function removeTaskKnowledgeSelectionLockIfOwned(opts: {
  target: string;
  ownerToken: string;
}): Promise<void> {
  const current = await readFile(opts.target, "utf8").catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (!current) return;
  const parsed = parseTaskKnowledgeSelectionLock(current);
  if (parsed?.owner.token !== opts.ownerToken) return;
  await unlink(opts.target).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
}

function parseTaskKnowledgeSelectionReclaimGuard(
  value: string,
): TaskKnowledgeSelectionReclaimGuard | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (
      !isRecord(parsed) ||
      parsed.schema_version !== 1 ||
      parsed.kind !== "task_knowledge_proposal_selection_reclaim_guard" ||
      !isRecord(parsed.owner) ||
      typeof parsed.owner.token !== "string" ||
      typeof parsed.owner.pid !== "number" ||
      typeof parsed.owner.hostname !== "string" ||
      typeof parsed.acquired_at !== "string" ||
      typeof parsed.expires_at !== "string"
    ) {
      return null;
    }
    return parsed as TaskKnowledgeSelectionReclaimGuard;
  } catch {
    return null;
  }
}

async function acquireTaskKnowledgeSelectionReclaimGuard(
  target: string,
): Promise<(() => Promise<void>) | null> {
  const guardPath = taskKnowledgeSelectionReclaimGuardPath(target);
  const owner: TaskKnowledgeLockOwner = {
    token: randomUUID(),
    pid: process.pid,
    hostname: hostname(),
  };
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  while (!handle) {
    try {
      handle = await open(guardPath, "wx");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      if (!(await reclaimStaleTaskKnowledgeSelectionReclaimGuard(guardPath))) return null;
    }
  }
  const acquiredAt = new Date();
  const guard: TaskKnowledgeSelectionReclaimGuard = {
    schema_version: 1,
    kind: "task_knowledge_proposal_selection_reclaim_guard",
    owner,
    acquired_at: acquiredAt.toISOString(),
    expires_at: new Date(
      acquiredAt.getTime() + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS,
    ).toISOString(),
  };
  await handle.writeFile(`${JSON.stringify(guard)}\n`, "utf8");
  await handle.sync();
  return async () => {
    await handle.close();
    const current = await readFile(guardPath, "utf8").catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!current) return;
    if (parseTaskKnowledgeSelectionReclaimGuard(current)?.owner.token !== owner.token) return;
    await unlink(guardPath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  };
}

function parseTaskKnowledgeSelectionLock(value: string): TaskKnowledgeSelectionLock | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (
      !isRecord(parsed) ||
      parsed.schema_version !== 1 ||
      parsed.kind !== "task_knowledge_proposal_selection_lock" ||
      !isRecord(parsed.owner) ||
      typeof parsed.owner.token !== "string" ||
      typeof parsed.owner.pid !== "number" ||
      typeof parsed.owner.hostname !== "string" ||
      typeof parsed.acquired_at !== "string" ||
      typeof parsed.expires_at !== "string"
    ) {
      return null;
    }
    return parsed as TaskKnowledgeSelectionLock;
  } catch {
    return null;
  }
}

function taskKnowledgeLockOwnerLiveness(
  owner: TaskKnowledgeLockOwner,
): "alive" | "dead" | "unknown" {
  if (owner.hostname !== hostname()) return "unknown";
  try {
    process.kill(owner.pid, 0);
    return "alive";
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM") return "alive";
    return code === "ESRCH" ? "dead" : "unknown";
  }
}

async function reclaimStaleTaskKnowledgeSelectionReclaimGuard(guardPath: string): Promise<boolean> {
  let content: string;
  let metadata: Stats;
  try {
    [content, metadata] = await Promise.all([readFile(guardPath, "utf8"), stat(guardPath)]);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
    throw error;
  }
  const guard = parseTaskKnowledgeSelectionReclaimGuard(content);
  const expiresAt = guard ? Date.parse(guard.expires_at) : Number.NaN;
  const expired = Number.isFinite(expiresAt)
    ? expiresAt <= Date.now()
    : metadata.mtimeMs + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS <= Date.now();
  const liveness = guard ? taskKnowledgeLockOwnerLiveness(guard.owner) : "unknown";
  if (liveness === "alive" || (!expired && liveness !== "dead")) return false;
  const recoveryPath = `${guardPath}.recovered-${randomUUID()}`;
  try {
    await rename(guardPath, recoveryPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
    throw error;
  }
  await unlink(recoveryPath).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
  return true;
}

async function reclaimStaleTaskKnowledgeSelectionLock(opts: {
  target: string;
  testHooks?: TaskKnowledgeSelectionLockTestHooks;
}): Promise<boolean> {
  const observed = await readTaskKnowledgeSelectionLock(opts.target);
  if (!observed) return true;
  if (!isReclaimableTaskKnowledgeSelectionLock(observed)) return false;
  await opts.testHooks?.afterStaleLockRead?.({
    target: opts.target,
    ownerToken: observed.lock?.owner.token ?? null,
  });

  // A reclaimer first owns a separate guard. New selection attempts honor this
  // guard, so an old owner can release without a replacement lock being
  // mistaken for the stale generation after the reclaimer has revalidated it.
  const releaseGuard = await acquireTaskKnowledgeSelectionReclaimGuard(opts.target);
  if (!releaseGuard) return false;
  try {
    const current = await readTaskKnowledgeSelectionLock(opts.target);
    if (!current) return true;
    if (current.content !== observed.content || !isReclaimableTaskKnowledgeSelectionLock(current)) {
      return false;
    }
    const recoveryPath = `${opts.target}.recovered-${randomUUID()}`;
    try {
      await rename(opts.target, recoveryPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
      throw error;
    }
    await unlink(recoveryPath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
    return true;
  } finally {
    await releaseGuard();
  }
}

async function readTaskKnowledgeSelectionLock(target: string): Promise<{
  content: string;
  metadata: Stats;
  lock: TaskKnowledgeSelectionLock | null;
} | null> {
  try {
    const [content, metadata] = await Promise.all([readFile(target, "utf8"), stat(target)]);
    return { content, metadata, lock: parseTaskKnowledgeSelectionLock(content) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function isReclaimableTaskKnowledgeSelectionLock(lockFile: {
  metadata: Stats;
  lock: TaskKnowledgeSelectionLock | null;
}): boolean {
  const expiresAt = lockFile.lock ? Date.parse(lockFile.lock.expires_at) : Number.NaN;
  const expired = Number.isFinite(expiresAt)
    ? expiresAt <= Date.now()
    : lockFile.metadata.mtimeMs + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS <= Date.now();
  const liveness = lockFile.lock ? taskKnowledgeLockOwnerLiveness(lockFile.lock.owner) : "unknown";
  return liveness !== "alive" && (expired || liveness === "dead");
}

function parseTaskKnowledgeSelectionIntent(value: string): TaskKnowledgeSelectionIntent | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (
      !isRecord(parsed) ||
      parsed.schema_version !== 1 ||
      parsed.kind !== "task_knowledge_proposal_selection_intent" ||
      typeof parsed.proposal_id !== "string" ||
      typeof parsed.source_task_id !== "string" ||
      typeof parsed.source_digest !== "string" ||
      (parsed.source_fingerprint_version !== 1 && parsed.source_fingerprint_version !== 2) ||
      typeof parsed.batch_fingerprint !== "string" ||
      !isRecord(parsed.canonical_check) ||
      typeof parsed.canonical_check.path !== "string" ||
      typeof parsed.canonical_check.sha256 !== "string" ||
      (parsed.state !== "creating" && parsed.state !== "created") ||
      (typeof parsed.curator_task_id !== "string" && parsed.curator_task_id !== null) ||
      typeof parsed.recorded_at !== "string"
    ) {
      return null;
    }
    return parsed as TaskKnowledgeSelectionIntent;
  } catch {
    return null;
  }
}

async function readTaskKnowledgeSelectionIntent(opts: {
  root: string;
  proposalId: string;
}): Promise<{ path: string; intent: TaskKnowledgeSelectionIntent } | null> {
  const intentPath = taskKnowledgeSelectionIntentPath(opts.proposalId);
  const content = await readFile(path.join(opts.root, intentPath), "utf8").catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    },
  );
  if (!content) return null;
  const intent = parseTaskKnowledgeSelectionIntent(content);
  if (!intent) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task knowledge selection intent is invalid: ${intentPath}`,
    });
  }
  return { path: intentPath, intent };
}

function assertTaskKnowledgeSelectionIntentMatches(opts: {
  intent: TaskKnowledgeSelectionIntent;
  proposal: ReturnType<typeof buildOutput>["proposals"][number];
  fingerprint: TaskSourceFingerprint | undefined;
  batchFingerprint: string;
  canonicalCheckPath: string;
  canonicalCheckSha256: string;
}): void {
  const { intent, proposal, fingerprint } = opts;
  if (
    intent.proposal_id !== proposal.id ||
    intent.source_task_id !== proposal.source_task_id ||
    intent.source_digest !== proposal.source_digest ||
    intent.source_fingerprint_version !== (fingerprint?.version ?? 1) ||
    intent.batch_fingerprint !== opts.batchFingerprint ||
    intent.canonical_check.path !== opts.canonicalCheckPath ||
    intent.canonical_check.sha256 !== opts.canonicalCheckSha256
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `Task knowledge selection intent for ${proposal.id} does not match the current bounded source set. ` +
        "Do not create another CURATOR task; inspect and reconcile the interrupted selection first.",
    });
  }
}

async function ensureTaskKnowledgeSelectionIntent(opts: {
  root: string;
  proposal: ReturnType<typeof buildOutput>["proposals"][number];
  fingerprint: TaskSourceFingerprint | undefined;
  batchFingerprint: string;
  canonicalCheckPath: string;
  canonicalCheckSha256: string;
}): Promise<{ path: string; intent: TaskKnowledgeSelectionIntent }> {
  const existing = await readTaskKnowledgeSelectionIntent({
    root: opts.root,
    proposalId: opts.proposal.id,
  });
  if (existing) {
    assertTaskKnowledgeSelectionIntentMatches({ ...opts, intent: existing.intent });
    return existing;
  }
  const intent: TaskKnowledgeSelectionIntent = {
    schema_version: 1,
    kind: "task_knowledge_proposal_selection_intent",
    proposal_id: opts.proposal.id,
    source_task_id: opts.proposal.source_task_id,
    source_digest: opts.proposal.source_digest,
    source_fingerprint_version: opts.fingerprint?.version ?? 1,
    batch_fingerprint: opts.batchFingerprint,
    canonical_check: { path: opts.canonicalCheckPath, sha256: opts.canonicalCheckSha256 },
    state: "creating",
    curator_task_id: null,
    recorded_at: new Date().toISOString(),
  };
  const intentPath = taskKnowledgeSelectionIntentPath(opts.proposal.id);
  await writeJsonStableIfChanged(path.join(opts.root, intentPath), intent);
  return { path: intentPath, intent };
}

async function markTaskKnowledgeSelectionIntentCreated(opts: {
  root: string;
  path: string;
  intent: TaskKnowledgeSelectionIntent;
  curatorTaskId: string;
}): Promise<TaskKnowledgeSelectionIntent> {
  if (opts.intent.state === "created" && opts.intent.curator_task_id === opts.curatorTaskId) {
    return opts.intent;
  }
  if (opts.intent.state === "created" && opts.intent.curator_task_id !== opts.curatorTaskId) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task knowledge selection intent ${opts.intent.proposal_id} already records CURATOR task ${opts.intent.curator_task_id}.`,
    });
  }
  const created: TaskKnowledgeSelectionIntent = {
    ...opts.intent,
    state: "created",
    curator_task_id: opts.curatorTaskId,
  };
  await writeJsonStableIfChanged(path.join(opts.root, opts.path), created);
  return created;
}

function selectionIdentityForTask(intent: TaskKnowledgeSelectionIntent): Record<string, unknown> {
  return {
    schema_version: 1,
    pipeline: "context.harvest.tasks",
    proposal_id: intent.proposal_id,
    source_task_id: intent.source_task_id,
    source_digest: intent.source_digest,
    source_fingerprint_version: intent.source_fingerprint_version,
    batch_fingerprint: intent.batch_fingerprint,
    canonical_check: intent.canonical_check,
    intent_path: taskKnowledgeSelectionIntentPath(intent.proposal_id),
  };
}

function isCuratorTaskForSelectionIntent(
  task: TaskData,
  intent: TaskKnowledgeSelectionIntent,
): boolean {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const identity = extensions.context_task_knowledge_selection;
  return (
    task.owner === "CURATOR" &&
    isRecord(identity) &&
    identity.schema_version === 1 &&
    identity.pipeline === "context.harvest.tasks" &&
    identity.proposal_id === intent.proposal_id &&
    identity.source_task_id === intent.source_task_id &&
    identity.source_digest === intent.source_digest &&
    identity.source_fingerprint_version === intent.source_fingerprint_version &&
    identity.batch_fingerprint === intent.batch_fingerprint &&
    isRecord(identity.canonical_check) &&
    identity.canonical_check.path === intent.canonical_check.path &&
    identity.canonical_check.sha256 === intent.canonical_check.sha256
  );
}

function findCuratorTaskForSelectionIntent(opts: {
  tasks: readonly TaskData[];
  intent: TaskKnowledgeSelectionIntent;
}): TaskData | null {
  const matches = opts.tasks.filter((task) => isCuratorTaskForSelectionIntent(task, opts.intent));
  if (matches.length > 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `Task knowledge selection intent ${opts.intent.proposal_id} matches multiple CURATOR tasks. ` +
        "Stop and reconcile the duplicate ownership before retrying.",
    });
  }
  return matches[0] ?? null;
}

function taskCreationResultForAdoptedCuratorTask(opts: {
  ctx: CommandContext;
  task: TaskData;
}): TaskCreationResult {
  if (typeof opts.task.id !== "string" || !opts.task.id.trim()) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "Cannot adopt CURATOR task without a stable task id.",
    });
  }
  return {
    task_id: opts.task.id,
    revision: typeof opts.task.revision === "number" ? opts.task.revision : null,
    backend_id: opts.ctx.backendId,
    artifact_paths: [`.agentplane/tasks/${opts.task.id}/README.md`],
  };
}

async function writeTaskMarkers(ctx: CommandContext, output: ReturnType<typeof buildOutput>) {
  const changed: string[] = [];
  for (const task of output.selected) {
    const marker = output.markers[task.id];
    if (!marker) continue;
    const extensions = isRecord(task.extensions) ? task.extensions : {};
    if (sameMarker(extensions.context_harvest, marker)) continue;
    await ctx.taskBackend.writeTask({
      ...task,
      extensions: {
        ...extensions,
        context_harvest: marker,
      },
    });
    changed.push(`.agentplane/tasks/${task.id}/README.md`);
  }
  return changed;
}

async function buildTaskProposalSourceRows(
  root: string,
  taskIds: readonly string[],
  canonicalChecksByTask: ReadonlyMap<
    string,
    { path: string; check: TaskKnowledgeCanonicalCheck }
  > = new Map(),
): Promise<ManifestEntry[]> {
  const rows: ManifestEntry[] = [];
  for (const taskId of taskIds) {
    const taskRowsStart = rows.length;
    const provenanceRefs = await existingTaskKnowledgeProvenanceRefs(root, taskId);
    const provenancePaths = provenanceRefs.map((ref) => ref.replace(/#all$/u, ""));
    const candidates = [
      { path: `.agentplane/tasks/${taskId}/README.md`, required: true },
      { path: `.agentplane/tasks/${taskId}/acr.json`, required: false },
      { path: taskKnowledgeRawEvidencePath(taskId), required: true },
      ...(canonicalChecksByTask.get(taskId)
        ? [{ path: canonicalChecksByTask.get(taskId)?.path ?? "", required: true }]
        : []),
      ...(canonicalChecksByTask.get(taskId)?.check.canonical_sources ?? []).map((source) => ({
        path: source.path,
        required: true,
      })),
      ...provenancePaths.map((candidatePath) => ({ path: candidatePath, required: false })),
    ];
    for (const candidate of candidates) {
      const absolute = path.join(root, candidate.path);
      let content: Buffer;
      let metadata: Awaited<ReturnType<typeof stat>>;
      try {
        [content, metadata] = await Promise.all([readFile(absolute), stat(absolute)]);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT" && !candidate.required) continue;
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Task knowledge proposal source is missing: ${candidate.path}`,
        });
      }
      rows.push({
        path: candidate.path,
        sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
        size_bytes: content.byteLength,
        mtime: metadata.mtime.toISOString(),
        content_type: contentTypeForPath(candidate.path),
        status: "new",
      });
    }
    const canonicalCheck = canonicalChecksByTask.get(taskId)?.check;
    if (!canonicalCheck) continue;
    const taskRows = rows.slice(taskRowsStart);
    for (const source of canonicalCheck.canonical_sources) {
      const row = taskRows.find((candidate) => candidate.path === source.path);
      if (row?.sha256 !== source.sha256) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `Canonical knowledge changed while selecting task knowledge proposal ${taskId}: ${source.path}. ` +
            "Retry so the CURATOR source pack can use one consistent canonical snapshot.",
        });
      }
    }
  }
  return rows;
}

async function createExtractionTasks(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  output: ReturnType<typeof buildOutput>;
  parsed: ContextHarvestTasksParsed;
  sourceFingerprints: ReadonlyMap<string, TaskSourceFingerprint>;
  createTask?: typeof runTaskNewParsed;
  selectionLockTestHooks?: TaskKnowledgeSelectionLockTestHooks;
}) {
  const proposalByTaskId = new Map(
    opts.output.proposals.map((proposal) => [proposal.source_task_id, proposal]),
  );
  const proposalTasks = opts.output.selected.filter((task) => proposalByTaskId.has(task.id));
  const plans = buildExtractionTaskPlans(proposalTasks, opts.parsed, opts.sourceFingerprints);
  const createTask = opts.createTask ?? runTaskNewParsed;
  const releases: (() => Promise<void>)[] = [];
  const canonicalChecksByTask = new Map<
    string,
    { path: string; check: TaskKnowledgeCanonicalCheck }
  >();
  try {
    for (const task of proposalTasks) {
      const proposal = proposalByTaskId.get(task.id);
      if (!proposal) continue;
      const release = await acquireTaskKnowledgeSelectionLock({
        root: opts.ctx.resolvedProject.gitRoot,
        proposalId: proposal.id,
        testHooks: opts.selectionLockTestHooks,
      });
      releases.push(release);
      const evidence = opts.output.evidence.find((candidate) => candidate.id === task.id);
      if (!evidence) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Task knowledge proposal evidence is missing: ${task.id}`,
        });
      }
      const existingIntent = await readTaskKnowledgeSelectionIntent({
        root: opts.ctx.resolvedProject.gitRoot,
        proposalId: proposal.id,
      });
      canonicalChecksByTask.set(
        task.id,
        existingIntent
          ? await readFrozenTaskKnowledgeCanonicalCheck({
              root: opts.ctx.resolvedProject.gitRoot,
              proposal,
              intent: existingIntent.intent,
            })
          : await writeTaskKnowledgeCanonicalCheck({
              root: opts.ctx.resolvedProject.gitRoot,
              proposal,
              evidence,
            }),
      );
    }
    const sourceRowsByTask = new Map(
      await Promise.all(
        proposalTasks.map(
          async (task) =>
            [
              task.id,
              await buildTaskProposalSourceRows(
                opts.ctx.resolvedProject.gitRoot,
                [task.id],
                canonicalChecksByTask,
              ),
            ] as const,
        ),
      ),
    );
    const createdTaskIds: string[] = [];
    const taskPackPaths: string[] = [];
    const selectionIntentsByTask = new Map<
      string,
      { path: string; intent: TaskKnowledgeSelectionIntent }
    >();
    for (const plan of plans) {
      for (const sourceTaskId of plan.source_task_ids) {
        const proposal = proposalByTaskId.get(sourceTaskId);
        const canonicalCheck = canonicalChecksByTask.get(sourceTaskId);
        const canonicalCheckSource = sourceRowsByTask
          .get(sourceTaskId)
          ?.find((source) => source.path === canonicalCheck?.path);
        if (!proposal || !canonicalCheck || !canonicalCheckSource) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Cannot prepare durable CURATOR selection intent for ${sourceTaskId}.`,
          });
        }
        selectionIntentsByTask.set(
          sourceTaskId,
          await ensureTaskKnowledgeSelectionIntent({
            root: opts.ctx.resolvedProject.gitRoot,
            proposal,
            fingerprint: opts.sourceFingerprints.get(sourceTaskId),
            batchFingerprint: plan.batch_fingerprint,
            canonicalCheckPath: canonicalCheck.path,
            canonicalCheckSha256: canonicalCheckSource.sha256,
          }),
        );
      }
    }
    for (const plan of plans) {
      const sourceTaskId = plan.source_task_ids[0];
      const selectionIntent = sourceTaskId ? selectionIntentsByTask.get(sourceTaskId) : undefined;
      if (!sourceTaskId || !selectionIntent) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: "CURATOR selection intent is missing for the explicit task proposal.",
        });
      }
      const existingCuratorTask = findCuratorTaskForSelectionIntent({
        tasks: await opts.ctx.taskBackend.listTasks(),
        intent: selectionIntent.intent,
      });
      const currentTasks = await opts.ctx.taskBackend.listTasks();
      const currentSourceTask = currentTasks.find((task) => task.id === sourceTaskId);
      const currentCuratorTaskId = currentSourceTask
        ? taskHasCurrentCuratorSelection({
            task: currentSourceTask,
            fingerprint: opts.sourceFingerprints.get(sourceTaskId),
          })
        : null;
      if (currentCuratorTaskId && currentCuratorTaskId !== existingCuratorTask?.id) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `Task knowledge proposal for ${sourceTaskId} is already owned by CURATOR task ${currentCuratorTaskId}, ` +
            "but that task does not match the durable selection intent.",
        });
      }
      const receiptPath = taskKnowledgeSelectionReceiptPath(selectionIntent.intent.proposal_id);
      const receiptExists = await fileExists(
        path.join(opts.ctx.resolvedProject.gitRoot, receiptPath),
      );
      if (currentCuratorTaskId && receiptExists) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `Task knowledge proposal for ${sourceTaskId} is already owned by CURATOR task ${currentCuratorTaskId}. ` +
            "Change the source before selecting it again.",
        });
      }
      if (
        selectionIntent.intent.state === "created" &&
        selectionIntent.intent.curator_task_id !== existingCuratorTask?.id
      ) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `Task knowledge selection intent ${selectionIntent.intent.proposal_id} records CURATOR task ${selectionIntent.intent.curator_task_id}, ` +
            "but that exact task cannot be adopted.",
        });
      }
      const created: TaskCreationResult = existingCuratorTask
        ? taskCreationResultForAdoptedCuratorTask({ ctx: opts.ctx, task: existingCuratorTask })
        : await createTask({
            ctx: opts.ctx,
            cwd: opts.cwd,
            rootOverride: opts.rootOverride,
            parsed: {
              ...plan.parsed,
              extensions: {
                ...(plan.parsed.extensions ?? {}),
                context_task_knowledge_selection: selectionIdentityForTask(selectionIntent.intent),
              },
            },
            printTaskId: false,
          });
      const createdTaskId = created.task_id;
      await markTaskKnowledgeSelectionIntentCreated({
        root: opts.ctx.resolvedProject.gitRoot,
        path: selectionIntent.path,
        intent: selectionIntent.intent,
        curatorTaskId: createdTaskId,
      });
      await writeContextTaskPack({
        root: opts.ctx.resolvedProject.gitRoot,
        taskId: createdTaskId,
        sources: plan.source_task_ids.flatMap((sourceTaskId) => {
          const rows = sourceRowsByTask.get(sourceTaskId);
          if (rows) return rows;
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Task knowledge proposal source set is missing: ${sourceTaskId}`,
          });
        }),
        creation: created,
      });
      const taskRoot = `.agentplane/tasks/${createdTaskId}`;
      taskPackPaths.push(
        `${taskRoot}/task-creation.json`,
        `${taskRoot}/context-pack.md`,
        `${taskRoot}/extraction-contract.json`,
        `${taskRoot}/canonical-snapshot.json`,
        `${taskRoot}/canonical-entity-catalog.json`,
        `${taskRoot}/canonical-reconciliation-candidates.json`,
        `${taskRoot}/source-set.lock.json`,
        `${taskRoot}/source-spans.skeleton.jsonl`,
        `${taskRoot}/expected-artifacts.json`,
      );
      createdTaskIds.push(createdTaskId);
    }
    const sourceChangedPaths: string[] = [];
    const selectionReceiptPaths: string[] = [];
    const queuedAt = new Date().toISOString();
    const latestTasks = await opts.ctx.taskBackend.listTasks();
    const latestById = new Map(
      latestTasks
        .filter((task): task is TaskData & { id: string; title: string; status: string } => {
          return (
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.status === "string"
          );
        })
        .map((task) => [task.id, task]),
    );
    for (const plan of plans) {
      const extractionTaskId = createdTaskIds[plan.batch_index - 1];
      if (!extractionTaskId) continue;
      for (const sourceTaskId of plan.source_task_ids) {
        const task =
          latestById.get(sourceTaskId) ??
          opts.output.selected.find((candidate) => candidate.id === sourceTaskId);
        if (!task) continue;
        const marker = buildTaskExtractionMarker({
          task,
          queuedAt,
          extractionTaskId,
          batchIndex: plan.batch_index,
          batchCount: plan.batch_count,
          fingerprint: opts.sourceFingerprints.get(sourceTaskId),
        });
        const extensions = isRecord(task.extensions) ? task.extensions : {};
        const currentCuratorTaskId = taskHasCurrentCuratorSelection({
          task,
          fingerprint: opts.sourceFingerprints.get(sourceTaskId),
        });
        if (currentCuratorTaskId !== extractionTaskId) {
          await opts.ctx.taskBackend.writeTask({
            ...task,
            extensions: {
              ...extensions,
              context_task_extraction: marker,
            },
          });
          sourceChangedPaths.push(`.agentplane/tasks/${task.id}/README.md`);
        }
        const proposal = opts.output.proposals.find(
          (candidate) => candidate.source_task_id === sourceTaskId,
        );
        if (!proposal) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Cannot select task knowledge proposal for ${sourceTaskId}: proposal record is missing.`,
          });
        }
        const canonicalCheck = canonicalChecksByTask.get(sourceTaskId);
        if (!canonicalCheck) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Cannot select task knowledge proposal for ${sourceTaskId}: canonical check is missing.`,
          });
        }
        const canonicalCheckSource = sourceRowsByTask
          .get(sourceTaskId)
          ?.find((source) => source.path === canonicalCheck.path);
        if (!canonicalCheckSource) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Cannot select task knowledge proposal for ${sourceTaskId}: canonical check source lock is missing.`,
          });
        }
        const receiptPath = taskKnowledgeSelectionReceiptPath(proposal.id);
        await mkdir(path.dirname(path.join(opts.ctx.resolvedProject.gitRoot, receiptPath)), {
          recursive: true,
        });
        if (
          await writeJsonStableIfChanged(path.join(opts.ctx.resolvedProject.gitRoot, receiptPath), {
            schema_version: 1,
            kind: "task_knowledge_proposal_selection",
            proposal_id: proposal.id,
            source_task_id: proposal.source_task_id,
            source_digest: proposal.source_digest,
            source_refs: proposal.source_refs,
            canonical_check: {
              path: canonicalCheck.path,
              sha256: canonicalCheckSource.sha256,
              result: canonicalCheck.check.result,
              match_refs: canonicalCheck.check.matches.map((match) => match.source_ref),
              resolution: canonicalCheck.check.resolution,
            },
            curator_task_id: extractionTaskId,
            selected_at: queuedAt,
            selected_by: "context.harvest.tasks",
            publication_state: "not_published",
          })
        ) {
          selectionReceiptPaths.push(receiptPath);
        }
      }
    }
    return {
      plans,
      taskIds: createdTaskIds,
      changedPaths: [
        ...[...canonicalChecksByTask.values()].map((entry) => entry.path),
        ...[...selectionIntentsByTask.values()].map((entry) => entry.path),
        ...createdTaskIds.map((taskId) => `.agentplane/tasks/${taskId}/README.md`),
        ...taskPackPaths,
        ...sourceChangedPaths,
        ...selectionReceiptPaths,
      ],
    };
  } finally {
    await Promise.all(releases.map(async (release) => await release()));
  }
}

export async function cmdContextHarvestTasks(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextHarvestTasksParsed;
  createTask?: typeof runTaskNewParsed;
  selectionLockTestHooks?: TaskKnowledgeSelectionLockTestHooks;
}): Promise<number> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const root = ctx.resolvedProject.gitRoot;
  const allTasks = await readAllTasks(ctx);
  if (opts.parsed.promote) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest never promotes task knowledge directly. Create a CURATOR work order for one explicit --task selection and let CLI supervision materialize an accepted semantic result.",
    });
  }
  if (opts.parsed.createExtractionTasks && opts.parsed.task.length !== 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest CURATOR work orders require exactly one explicit --task selection. First write or preview proposals, then select one task id.",
    });
  }
  const extractionCandidates = opts.parsed.createExtractionTasks
    ? selectTaskCandidates(allTasks, opts.parsed)
    : [];
  const sourceFingerprints = opts.parsed.createExtractionTasks
    ? await taskExtractionSourceFingerprints(root, extractionCandidates)
    : new Map<string, TaskSourceFingerprint>();
  const selected = selectTasks(allTasks, opts.parsed);
  if (opts.parsed.createExtractionTasks && selected.length !== 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest could not resolve the explicit task selection to one eligible knowledge proposal.",
    });
  }
  const provenanceRefsByTask = await taskKnowledgeProvenanceRefs(root, selected);
  const output = buildOutput(opts.parsed, selected, provenanceRefsByTask);
  if (opts.parsed.createExtractionTasks && output.proposals.length !== 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest could not create a CURATOR work order because the explicit task selection has no durable, source-backed knowledge signal.",
    });
  }
  const shouldWrite = opts.parsed.writeProposals || opts.parsed.createExtractionTasks;
  const shouldCreateExtractionTasks = opts.parsed.createExtractionTasks;

  if (!opts.parsed.dryRun && (shouldWrite || shouldCreateExtractionTasks)) {
    await assertContextWorkspaceReady(root);
  }
  const written =
    opts.parsed.dryRun || !shouldWrite
      ? []
      : [...(await writeOutputs(root, output)), ...(await writeTaskMarkers(ctx, output))];
  const extraction =
    opts.parsed.dryRun || !shouldCreateExtractionTasks
      ? {
          plans: shouldCreateExtractionTasks
            ? buildExtractionTaskPlans(output.selected, opts.parsed, sourceFingerprints)
            : [],
          taskIds: [],
          changedPaths: [],
        }
      : await createExtractionTasks({
          ctx,
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
          output,
          parsed: opts.parsed,
          sourceFingerprints,
          createTask: opts.createTask,
          selectionLockTestHooks: opts.selectionLockTestHooks,
        });
  const changed = [...new Set([...written, ...extraction.changedPaths])];
  const payload = {
    ...output.report,
    selected_task_ids: selected.map((task) => task.id),
    extraction_task_batches: extraction.plans.map((plan) => ({
      batch_index: plan.batch_index,
      batch_count: plan.batch_count,
      source_task_ids: plan.source_task_ids,
      source_bytes: plan.source_bytes,
      byte_budget: plan.byte_budget,
      oversized_source_ids: plan.oversized_source_ids,
      batch_fingerprint: plan.batch_fingerprint,
      created_task_id: extraction.taskIds[plan.batch_index - 1] ?? null,
    })),
    created_extraction_task_ids: extraction.taskIds,
    changed_paths: changed,
  };

  if (opts.parsed.format === "json") {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  } else {
    process.stdout.write(
      `${renderText(output, changed, {
        planned: extraction.plans.length,
        created: extraction.taskIds,
      })}\n`,
    );
  }

  return 0;
}
