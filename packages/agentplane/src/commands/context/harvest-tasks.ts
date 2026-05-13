import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { runTaskNewParsed } from "../task/new.js";
import { fileExists, isRecord } from "./context-utils.js";
import {
  buildOutput,
  renderText,
  selectTasks,
  writeOutputs,
  type ContextHarvestTasksParsed,
} from "./harvest-tasks-artifacts.js";
import { buildExtractionTaskPlans, buildTaskExtractionMarker } from "./harvest-tasks-extraction.js";
import type { TaskHarvestMarker } from "./harvest-tasks-markers.js";

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

async function createExtractionTasks(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  output: ReturnType<typeof buildOutput>;
  parsed: ContextHarvestTasksParsed;
  createTask?: typeof runTaskNewParsed;
}) {
  const beforeTasks = await opts.ctx.taskBackend.listTasks();
  const knownTaskIds = new Set(beforeTasks.map((task) => task.id));
  const plans = buildExtractionTaskPlans(opts.output.selected, opts.parsed);
  const createTask = opts.createTask ?? runTaskNewParsed;
  const createdTaskIds: string[] = [];
  for (const plan of plans) {
    await createTask({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      parsed: plan.parsed,
      printTaskId: false,
    });
    const afterPlan = await opts.ctx.taskBackend.listTasks();
    const createdForPlan = afterPlan
      .filter((task) => !knownTaskIds.has(task.id))
      .toSorted((a, b) => a.id.localeCompare(b.id));
    const createdTaskId = createdForPlan[0]?.id;
    if (!createdTaskId) continue;
    createdTaskIds.push(createdTaskId);
    for (const task of createdForPlan) knownTaskIds.add(task.id);
  }
  const sourceChangedPaths: string[] = [];
  const queuedAt = new Date().toISOString();
  for (const plan of plans) {
    const extractionTaskId = createdTaskIds[plan.batch_index - 1];
    if (!extractionTaskId) continue;
    for (const sourceTaskId of plan.source_task_ids) {
      const task = opts.output.selected.find((candidate) => candidate.id === sourceTaskId);
      if (!task) continue;
      const marker = buildTaskExtractionMarker({
        task,
        queuedAt,
        extractionTaskId,
        batchIndex: plan.batch_index,
        batchCount: plan.batch_count,
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
    }
  }
  return {
    plans,
    taskIds: createdTaskIds,
    changedPaths: [
      ...createdTaskIds.map((taskId) => `.agentplane/tasks/${taskId}/README.md`),
      ...sourceChangedPaths,
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
  const selected = selectTasks(await readAllTasks(ctx), opts.parsed);
  const output = buildOutput(opts.parsed, selected);
  const shouldWrite = opts.parsed.writeProposals || opts.parsed.promote;
  const shouldCreateExtractionTasks = opts.parsed.createExtractionTasks;

  if (!opts.parsed.dryRun && (shouldWrite || shouldCreateExtractionTasks)) {
    await assertContextWorkspaceReady(root);
  }

  const written =
    opts.parsed.dryRun || !shouldWrite
      ? []
      : [
          ...(await writeOutputs(root, output, opts.parsed.promote)),
          ...(await writeTaskMarkers(ctx, output)),
        ];
  const extraction =
    opts.parsed.dryRun || !shouldCreateExtractionTasks
      ? {
          plans: shouldCreateExtractionTasks
            ? buildExtractionTaskPlans(output.selected, opts.parsed)
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
          createTask: opts.createTask,
        });
  const changed = [...written, ...extraction.changedPaths];
  const payload = {
    ...output.report,
    selected_task_ids: selected.map((task) => task.id),
    extraction_task_batches: extraction.plans.map((plan) => ({
      batch_index: plan.batch_index,
      batch_count: plan.batch_count,
      source_task_ids: plan.source_task_ids,
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

  if (opts.parsed.promote && output.report.promotion_gate.state === "blocked") {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context harvest promotion blocked: ${output.report.promotion_gate.blockers.join("; ")}`,
    });
  }
  return 0;
}
