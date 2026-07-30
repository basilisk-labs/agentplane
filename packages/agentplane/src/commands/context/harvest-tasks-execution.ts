import { createHash } from "node:crypto";
import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { writeContextTaskPack } from "../../context/ingest-task-pack.js";
import { contentTypeForPath, type ManifestEntry } from "../../context/ingest-manifest.js";
import type { TaskSourceFingerprint } from "../../context/harvest-tasks-markers.js";
import { runTaskNewParsed, type TaskCreationResult } from "../task/new.js";
import type { CommandContext } from "../shared/task-backend.js";
import { fileExists, isRecord } from "./context-utils.js";
import { buildExtractionTaskPlans, buildTaskExtractionMarker } from "./harvest-tasks-extraction.js";
import type { ContextHarvestTasksParsed, buildOutput } from "./harvest-tasks-artifacts.js";
import type { TaskHarvestMarker } from "./harvest-tasks-markers.js";
import {
  existingTaskKnowledgeProvenanceRefs,
  readFrozenTaskKnowledgeCanonicalCheck,
  taskHasCurrentCuratorSelection,
  taskKnowledgeRawEvidencePath,
  taskKnowledgeSelectionReceiptPath,
  type TaskKnowledgeCanonicalCheck,
  writeTaskKnowledgeCanonicalCheck,
} from "./harvest-tasks-knowledge.js";
import {
  ensureTaskKnowledgeSelectionIntent,
  findCuratorTaskForSelectionIntent,
  markTaskKnowledgeSelectionIntentCreated,
  readTaskKnowledgeSelectionIntent,
  selectionIdentityForTask,
  taskCreationResultForAdoptedCuratorTask,
  type TaskKnowledgeSelectionIntent,
} from "./harvest-tasks-selection-intent.js";
import {
  acquireTaskKnowledgeSelectionLock,
  type TaskKnowledgeSelectionLockTestHooks,
} from "./harvest-tasks-selection-lock.js";
function sameMarker(current: unknown, next: TaskHarvestMarker): boolean {
  return isRecord(current) && JSON.stringify(current) === JSON.stringify(next);
}

export async function writeTaskMarkers(
  ctx: CommandContext,
  output: ReturnType<typeof buildOutput>,
) {
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

export async function createExtractionTasks(opts: {
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
        ? taskCreationResultForAdoptedCuratorTask({
            backendId: opts.ctx.backendId,
            task: existingCuratorTask,
          })
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
