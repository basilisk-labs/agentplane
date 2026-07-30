import path from "node:path";
import { type TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { taskExtractionSourceFingerprints } from "../../context/harvest-tasks-markers.js";
import type { TaskSourceFingerprint } from "../../context/harvest-tasks-markers.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import type { runTaskNewParsed } from "../task/new.js";
import { fileExists } from "./context-utils.js";
import {
  buildOutput,
  renderText,
  selectTaskCandidates,
  selectTasks,
  writeOutputs,
  type ContextHarvestTasksParsed,
} from "./harvest-tasks-artifacts.js";
import { buildExtractionTaskPlans } from "./harvest-tasks-extraction.js";
import { createExtractionTasks, writeTaskMarkers } from "./harvest-tasks-execution.js";
import { taskKnowledgeProvenanceRefs } from "./harvest-tasks-knowledge.js";
import type { TaskKnowledgeSelectionLockTestHooks } from "./harvest-tasks-selection-lock.js";
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
  for (const rel of required) if (!(await fileExists(path.join(root, rel)))) missing.push(rel);
  if (missing.length > 0)
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest writes require an initialized context workspace. Run agentplane context init first. Missing: " +
        missing.join(", "),
    });
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
