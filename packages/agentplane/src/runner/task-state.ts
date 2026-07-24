import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../backends/task-backend.js";
import { backendNotSupportedMessage } from "../cli/output.js";
import { loadTaskFromContext, type CommandContext } from "../commands/shared/task-backend.js";
import {
  backendIsLocalFileBackend,
  getTaskStore,
  setTaskFieldsIntent,
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
} from "../commands/shared/task-store.js";
import {
  extractDocSection,
  normalizeTaskDocVersion,
  resolveWritableDocSections,
  taskObservationSectionName,
} from "../commands/task/shared.js";
import { CliError } from "../shared/errors.js";

import type { RunnerContextBundle, RunnerRunState } from "./types.js";
import {
  buildTaskRunnerOutcome,
  renderRunnerOutcomeHistory,
  replaceRunnerOutcomeSection,
  type RunnerOutcomeProjection,
} from "./task-state-render.js";

function resolveRunnerUpdatedBy(task: Pick<TaskData, "owner" | "doc_updated_by">): string {
  const owner = typeof task.owner === "string" ? task.owner.trim() : "";
  if (owner) return owner;
  const docUpdatedBy = typeof task.doc_updated_by === "string" ? task.doc_updated_by.trim() : "";
  if (docUpdatedBy) return docUpdatedBy;
  return "agentplane";
}

function requireRunnerProjectionRevision(opts: { ctx: CommandContext; task: TaskData }): number {
  if (!opts.ctx.taskBackend.capabilities.supports_revision_guarded_writes) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner outcome projection requires revision-guarded task writes for ` +
        `${JSON.stringify(opts.task.id)}.`,
      context: {
        reason: "runner_projection_revision_guard_unsupported",
        task_id: opts.task.id,
        backend_id: opts.ctx.backendId,
      },
    });
  }
  if (
    typeof opts.task.revision !== "number" ||
    !Number.isInteger(opts.task.revision) ||
    opts.task.revision <= 0
  ) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner outcome projection cannot establish the current task revision for ` +
        `${JSON.stringify(opts.task.id)}.`,
      context: {
        reason: "runner_projection_revision_missing",
        task_id: opts.task.id,
        backend_id: opts.ctx.backendId,
        observed_revision: opts.task.revision ?? null,
      },
    });
  }
  return opts.task.revision;
}

export async function persistRunnerOutcomeToTask(opts: {
  ctx: CommandContext;
  task_id: string;
  state: RunnerRunState;
  bundle?: RunnerContextBundle;
  ordering_authority?: "current_active_claim";
}): Promise<void> {
  if (opts.bundle?.execution.mode === "dry_run" || opts.state.mode === "dry_run") return;

  const backend = opts.ctx.taskBackend;
  if (!backend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task writes"),
    });
  }

  const useStore = backendIsLocalFileBackend(opts.ctx);
  if (useStore) {
    const store = getTaskStore(opts.ctx);
    await store.mutate(opts.task_id, (current) => {
      const projection: RunnerOutcomeProjection = {
        state: opts.state,
        result: opts.state.result ?? null,
      };
      const outcome = buildTaskRunnerOutcome({
        task_id: opts.task_id,
        projection,
        previous: current.runner ?? null,
        ordering_authority: opts.ordering_authority,
      });
      const docVersion = normalizeTaskDocVersion(current.doc_version);
      const observationSection = taskObservationSectionName(docVersion);
      const writableSections = resolveWritableDocSections({
        allowedSections: opts.ctx.config.tasks.doc.sections,
        requiredSections: opts.ctx.config.tasks.doc.required_sections,
        targetSection: observationSection,
      });
      const baseDoc = ensureDocSections(String(current.doc ?? ""), writableSections);
      const currentObservation = extractDocSection(baseDoc, observationSection);
      const nextObservation = replaceRunnerOutcomeSection(
        currentObservation,
        renderRunnerOutcomeHistory({
          task_id: opts.task_id,
          outcome,
          projection,
        }),
      );
      return [
        setTaskFieldsIntent({ runner: outcome }),
        setTaskSectionIntent({
          section: observationSection,
          text: nextObservation,
          requiredSections: writableSections,
        }),
        touchTaskDocMetaIntent({
          updatedBy: resolveRunnerUpdatedBy(current),
          version: docVersion,
        }),
      ];
    });
    return;
  }

  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.task_id });
  const expectedRevision = requireRunnerProjectionRevision({
    ctx: opts.ctx,
    task,
  });
  const projection: RunnerOutcomeProjection = {
    state: opts.state,
    result: opts.state.result ?? null,
  };
  const outcome = buildTaskRunnerOutcome({
    task_id: opts.task_id,
    projection,
    previous: task.runner ?? null,
    ordering_authority: opts.ordering_authority,
  });
  const writableSections = resolveWritableDocSections({
    allowedSections: opts.ctx.config.tasks.doc.sections,
    requiredSections: opts.ctx.config.tasks.doc.required_sections,
    targetSection: taskObservationSectionName(normalizeTaskDocVersion(task.doc_version)),
  });
  const baseDoc = ensureDocSections(String(task.doc ?? ""), writableSections);
  const docVersion = normalizeTaskDocVersion(task.doc_version);
  const observationSection = taskObservationSectionName(docVersion);
  const currentObservation = extractDocSection(baseDoc, observationSection);
  const nextObservation = replaceRunnerOutcomeSection(
    currentObservation,
    renderRunnerOutcomeHistory({
      task_id: opts.task_id,
      outcome,
      projection,
    }),
  );
  const nextDoc = ensureDocSections(
    setMarkdownSection(baseDoc, observationSection, nextObservation),
    writableSections,
  );
  await backend.writeTask(
    {
      ...task,
      runner: outcome,
      doc: nextDoc,
      doc_updated_at: outcome.updated_at,
      doc_updated_by: resolveRunnerUpdatedBy(task),
    },
    { expectedRevision },
  );
}
