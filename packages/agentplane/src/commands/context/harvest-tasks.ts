import { createHash } from "node:crypto";
import { mkdir, readFile, stat } from "node:fs/promises";
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
): Promise<ManifestEntry[]> {
  const rows: ManifestEntry[] = [];
  for (const taskId of taskIds) {
    const candidates = [
      { path: `.agentplane/tasks/${taskId}/README.md`, required: true },
      { path: `.agentplane/tasks/${taskId}/acr.json`, required: false },
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
  createTask?: typeof runTaskNewParsed;
}) {
  const plans = buildExtractionTaskPlans(
    opts.output.selected,
    opts.parsed,
    opts.sourceFingerprints,
  );
  const createTask = opts.createTask ?? runTaskNewParsed;
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
  const output = buildOutput(opts.parsed, selected);
  const shouldWrite = opts.parsed.writeProposals || opts.parsed.createExtractionTasks;
  const shouldCreateExtractionTasks = opts.parsed.createExtractionTasks;

  if (!opts.parsed.dryRun && (shouldWrite || shouldCreateExtractionTasks)) {
    await assertContextWorkspaceReady(root);
  }
  const sourceRowsByTask =
    opts.parsed.dryRun || !shouldCreateExtractionTasks
      ? new Map<string, ManifestEntry[]>()
      : new Map(
          await Promise.all(
            output.selected.map(
              async (task) =>
                [task.id, await buildTaskProposalSourceRows(root, [task.id])] as const,
            ),
          ),
        );

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
          sourceRowsByTask,
          createTask: opts.createTask,
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
