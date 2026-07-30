import { createHash, randomUUID } from "node:crypto";
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

type TaskKnowledgeSelectionLock = {
  schema_version: 1;
  kind: "task_knowledge_proposal_selection_lock";
  owner: {
    token: string;
    pid: number;
    hostname: string;
  };
  acquired_at: string;
  expires_at: string;
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

async function writeTaskKnowledgeCanonicalChecks(opts: {
  root: string;
  output: ReturnType<typeof buildOutput>;
}): Promise<Map<string, { path: string; check: TaskKnowledgeCanonicalCheck }>> {
  const evidenceByTaskId = new Map(opts.output.evidence.map((evidence) => [evidence.id, evidence]));
  const checks = new Map<string, { path: string; check: TaskKnowledgeCanonicalCheck }>();
  for (const proposal of opts.output.proposals) {
    const evidence = evidenceByTaskId.get(proposal.source_task_id);
    if (!evidence) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Task knowledge proposal evidence is missing: ${proposal.source_task_id}`,
      });
    }
    const check = await buildTaskKnowledgeCanonicalCheck({ root: opts.root, proposal, evidence });
    const rel = taskKnowledgeSelectionCheckPath(proposal.id);
    await mkdir(path.dirname(path.join(opts.root, rel)), { recursive: true });
    await writeJsonStableIfChanged(path.join(opts.root, rel), check);
    checks.set(proposal.source_task_id, { path: rel, check });
  }
  return checks;
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
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const reclaimed = await reclaimStaleTaskKnowledgeSelectionLock({ target });
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
    const current = await readFile(target, "utf8").catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!current) return;
    const parsed = parseTaskKnowledgeSelectionLock(current);
    if (parsed?.owner.token !== owner.token) return;
    await unlink(target).catch((error: NodeJS.ErrnoException) => {
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

function taskKnowledgeSelectionLockLiveness(
  lock: TaskKnowledgeSelectionLock,
): "alive" | "dead" | "unknown" {
  if (lock.owner.hostname !== hostname()) return "unknown";
  try {
    process.kill(lock.owner.pid, 0);
    return "alive";
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM") return "alive";
    return code === "ESRCH" ? "dead" : "unknown";
  }
}

async function reclaimStaleTaskKnowledgeSelectionLock(opts: { target: string }): Promise<boolean> {
  let content: string;
  let metadata: Awaited<ReturnType<typeof stat>>;
  try {
    [content, metadata] = await Promise.all([readFile(opts.target, "utf8"), stat(opts.target)]);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
    throw error;
  }
  const lock = parseTaskKnowledgeSelectionLock(content);
  const expiresAt = lock ? Date.parse(lock.expires_at) : Number.NaN;
  const expired = Number.isFinite(expiresAt)
    ? expiresAt <= Date.now()
    : metadata.mtimeMs + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS <= Date.now();
  const liveness = lock ? taskKnowledgeSelectionLockLiveness(lock) : "unknown";
  if (liveness === "alive" || (!expired && liveness !== "dead")) return false;
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
  sourceRowsByTask: ReadonlyMap<string, ManifestEntry[]>;
  canonicalChecksByTask: ReadonlyMap<string, { path: string; check: TaskKnowledgeCanonicalCheck }>;
  createTask?: typeof runTaskNewParsed;
}) {
  const proposalByTaskId = new Map(
    opts.output.proposals.map((proposal) => [proposal.source_task_id, proposal]),
  );
  const proposalTasks = opts.output.selected.filter((task) => proposalByTaskId.has(task.id));
  const plans = buildExtractionTaskPlans(proposalTasks, opts.parsed, opts.sourceFingerprints);
  const createTask = opts.createTask ?? runTaskNewParsed;
  const releases: (() => Promise<void>)[] = [];
  try {
    for (const task of proposalTasks) {
      const proposal = proposalByTaskId.get(task.id);
      if (!proposal) continue;
      const canonicalCheck = opts.canonicalChecksByTask.get(task.id);
      if (
        canonicalCheck?.check.proposal_id !== proposal.id ||
        canonicalCheck.check.resolution.state !== "recorded"
      ) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `Task knowledge proposal ${proposal.id} has no recorded canonical duplicate/consolidation check. ` +
            "Re-run the proposal pre-selection check before creating a CURATOR work order.",
        });
      }
      const release = await acquireTaskKnowledgeSelectionLock({
        root: opts.ctx.resolvedProject.gitRoot,
        proposalId: proposal.id,
      });
      releases.push(release);
      const latestTasks = await opts.ctx.taskBackend.listTasks();
      const latest = latestTasks.find((candidate) => candidate.id === task.id);
      const existingCuratorTaskId = latest
        ? taskHasCurrentCuratorSelection({
            task: latest,
            fingerprint: opts.sourceFingerprints.get(task.id),
          })
        : null;
      if (existingCuratorTaskId) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `Task knowledge proposal for ${task.id} is already owned by CURATOR task ${existingCuratorTaskId}. ` +
            "Change the source before selecting it again.",
        });
      }
    }
    const createdTaskIds: string[] = [];
    const taskPackPaths: string[] = [];
    for (const plan of plans) {
      const created: TaskCreationResult = await createTask({
        ctx: opts.ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        parsed: plan.parsed,
        printTaskId: false,
      });
      const createdTaskId = created.task_id;
      await writeContextTaskPack({
        root: opts.ctx.resolvedProject.gitRoot,
        taskId: createdTaskId,
        sources: plan.source_task_ids.flatMap((sourceTaskId) => {
          const rows = opts.sourceRowsByTask.get(sourceTaskId);
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
        if (isRecord(extensions.context_task_extraction)) {
          const current = JSON.stringify(extensions.context_task_extraction);
          if (current === JSON.stringify(marker)) continue;
        }
        await opts.ctx.taskBackend.writeTask({
          ...task,
          extensions: {
            ...extensions,
            context_task_extraction: marker,
          },
        });
        sourceChangedPaths.push(`.agentplane/tasks/${task.id}/README.md`);
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
        const canonicalCheck = opts.canonicalChecksByTask.get(sourceTaskId);
        if (!canonicalCheck) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Cannot select task knowledge proposal for ${sourceTaskId}: canonical check is missing.`,
          });
        }
        const receiptPath = `.agentplane/context/derived/proposals/task-knowledge/${proposal.id}.selection.json`;
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
  const canonicalChecksByTask =
    opts.parsed.dryRun || !shouldCreateExtractionTasks
      ? new Map<string, { path: string; check: TaskKnowledgeCanonicalCheck }>()
      : await writeTaskKnowledgeCanonicalChecks({ root, output });
  const sourceRowsByTask =
    opts.parsed.dryRun || !shouldCreateExtractionTasks
      ? new Map<string, ManifestEntry[]>()
      : new Map(
          await Promise.all(
            output.selected.map(
              async (task) =>
                [
                  task.id,
                  await buildTaskProposalSourceRows(root, [task.id], canonicalChecksByTask),
                ] as const,
            ),
          ),
        );
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
          sourceRowsByTask,
          canonicalChecksByTask,
          createTask: opts.createTask,
        });
  const changed = [
    ...new Set([
      ...written,
      ...[...canonicalChecksByTask.values()].map((entry) => entry.path),
      ...extraction.changedPaths,
    ]),
  ];
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
