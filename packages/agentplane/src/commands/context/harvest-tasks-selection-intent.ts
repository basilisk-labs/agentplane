import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import type { TaskSourceFingerprint } from "../../context/harvest-tasks-markers.js";
import type { TaskCreationResult } from "../task/new.js";
import type { buildOutput } from "./harvest-tasks-artifacts.js";
import { taskKnowledgeSelectionIntentPath } from "./harvest-tasks-knowledge.js";
import { isRecord } from "./context-utils.js";

type Proposal = ReturnType<typeof buildOutput>["proposals"][number];

export type TaskKnowledgeSelectionIntent = {
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

function parseIntent(value: string): TaskKnowledgeSelectionIntent | null {
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
    )
      return null;
    return parsed as TaskKnowledgeSelectionIntent;
  } catch {
    return null;
  }
}

export async function readTaskKnowledgeSelectionIntent(opts: {
  root: string;
  proposalId: string;
}): Promise<{ path: string; intent: TaskKnowledgeSelectionIntent } | null> {
  const pathName = taskKnowledgeSelectionIntentPath(opts.proposalId);
  const content = await readFile(path.join(opts.root, pathName), "utf8").catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    },
  );
  if (!content) return null;
  const intent = parseIntent(content);
  if (!intent)
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task knowledge selection intent is invalid: ${pathName}`,
    });
  return { path: pathName, intent };
}

function assertIntentMatches(opts: {
  intent: TaskKnowledgeSelectionIntent;
  proposal: Proposal;
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
  )
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task knowledge selection intent for ${proposal.id} does not match the current bounded source set. Do not create another CURATOR task; inspect and reconcile the interrupted selection first.`,
    });
}

export async function ensureTaskKnowledgeSelectionIntent(opts: {
  root: string;
  proposal: Proposal;
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
    assertIntentMatches({ ...opts, intent: existing.intent });
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
  const pathName = taskKnowledgeSelectionIntentPath(opts.proposal.id);
  await writeJsonStableIfChanged(path.join(opts.root, pathName), intent);
  return { path: pathName, intent };
}

export async function markTaskKnowledgeSelectionIntentCreated(opts: {
  root: string;
  path: string;
  intent: TaskKnowledgeSelectionIntent;
  curatorTaskId: string;
}): Promise<TaskKnowledgeSelectionIntent> {
  if (opts.intent.state === "created" && opts.intent.curator_task_id === opts.curatorTaskId)
    return opts.intent;
  if (opts.intent.state === "created")
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task knowledge selection intent ${opts.intent.proposal_id} already records CURATOR task ${opts.intent.curator_task_id}.`,
    });
  const created: TaskKnowledgeSelectionIntent = {
    ...opts.intent,
    state: "created",
    curator_task_id: opts.curatorTaskId,
  };
  await writeJsonStableIfChanged(path.join(opts.root, opts.path), created);
  return created;
}

export function selectionIdentityForTask(
  intent: TaskKnowledgeSelectionIntent,
): Record<string, unknown> {
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

function sameSelection(task: TaskData, intent: TaskKnowledgeSelectionIntent): boolean {
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

export function findCuratorTaskForSelectionIntent(opts: {
  tasks: readonly TaskData[];
  intent: TaskKnowledgeSelectionIntent;
}): TaskData | null {
  const matches = opts.tasks.filter((task) => sameSelection(task, opts.intent));
  if (matches.length > 1)
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task knowledge selection intent ${opts.intent.proposal_id} matches multiple CURATOR tasks. Stop and reconcile the duplicate ownership before retrying.`,
    });
  return matches[0] ?? null;
}

export function taskCreationResultForAdoptedCuratorTask(opts: {
  backendId: string;
  task: TaskData;
}): TaskCreationResult {
  if (typeof opts.task.id !== "string" || !opts.task.id.trim())
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "Cannot adopt CURATOR task without a stable task id.",
    });
  return {
    task_id: opts.task.id,
    revision: typeof opts.task.revision === "number" ? opts.task.revision : null,
    backend_id: opts.backendId,
    artifact_paths: [`.agentplane/tasks/${opts.task.id}/README.md`],
  };
}
