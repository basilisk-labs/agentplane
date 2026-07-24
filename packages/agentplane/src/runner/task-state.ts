import { isDeepStrictEqual } from "node:util";

import {
  buildStateFingerprint,
  type StateFingerprintComponent,
  type StateFingerprintComponentInput,
} from "@agentplaneorg/core/schemas";
import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core/tasks";

import type { TaskBackendProjectionTransition, TaskData } from "../backends/task-backend.js";
import { backendNotSupportedMessage } from "../cli/output.js";
import { loadTaskFromContext, type CommandContext } from "../commands/shared/task-backend.js";
import {
  backendIsLocalFileBackend,
  getTaskStore,
  setTaskFieldsIntent,
  setTaskSectionIntent,
  TaskStore,
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
import { observeBackendProjection } from "./state-fingerprint-backend-projection.js";
import { observeRunnerTaskProjection } from "./task-observation.js";

export type RunnerBackendProjectionTransitionAttestation =
  TaskBackendProjectionTransition<StateFingerprintComponentInput>;

const REPLAY_ATTESTATION_PLACEHOLDER = {
  state: "missing",
  source: "runner_replay_attestation",
  reason_code: "component_not_observed",
} as const satisfies StateFingerprintComponentInput;

export function buildRunnerBackendProjectionComponent(
  input: StateFingerprintComponentInput,
): StateFingerprintComponent {
  return buildStateFingerprint({
    task_id: "runner-replay-attestation",
    task_revision: null,
    git_head: null,
    worktree: ".",
    components: {
      task: REPLAY_ATTESTATION_PLACEHOLDER,
      git: REPLAY_ATTESTATION_PLACEHOLDER,
      backend_projection: input,
      policy: REPLAY_ATTESTATION_PLACEHOLDER,
      blueprint: REPLAY_ATTESTATION_PLACEHOLDER,
      knowledge: REPLAY_ATTESTATION_PLACEHOLDER,
      provider: REPLAY_ATTESTATION_PLACEHOLDER,
      authority: REPLAY_ATTESTATION_PLACEHOLDER,
    },
  }).components.backend_projection;
}

type RunnerBackendProjectionTransitionRequest = {
  expected_before: StateFingerprintComponent;
  on_attested: (transition: RunnerBackendProjectionTransitionAttestation) => void;
};

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

function assertExpectedRunnerProjectionRevision(opts: {
  task_id: string;
  expected_revision: number;
  observed_revision: number;
}): void {
  if (opts.expected_revision === opts.observed_revision) return;
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `Task revision changed concurrently: ${opts.task_id} ` +
      `(expected revision ${opts.expected_revision}, ` +
      `current revision ${opts.observed_revision})`,
    context: {
      task_id: opts.task_id,
      expected_revision: opts.expected_revision,
      current_revision: opts.observed_revision,
      reason_code: "task_revision_conflict",
    },
  });
}

function assertExpectedRunnerBackendProjection(opts: {
  task_id: string;
  backend_id: string;
  expected: StateFingerprintComponent;
  captured: StateFingerprintComponentInput;
}): void {
  const current = buildRunnerBackendProjectionComponent(opts.captured);
  if (isDeepStrictEqual(opts.expected, current)) return;
  throw new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner replay backend projection changed before its task anchor for ` +
      `${JSON.stringify(opts.task_id)}; retry from freshly prepared state.`,
    context: {
      reason_code: "state_fingerprint_replay_backend_projection_changed_before_anchor",
      task_id: opts.task_id,
      backend_id: opts.backend_id,
      expected_component: opts.expected,
      current_component: current,
    },
  });
}

export async function persistRunnerOutcomeToTask(opts: {
  ctx: CommandContext;
  task_id: string;
  state: RunnerRunState;
  bundle?: RunnerContextBundle;
  ordering_authority?: "current_active_claim";
  expected_task_revision?: number;
  backend_projection_transition?: RunnerBackendProjectionTransitionRequest;
}): Promise<TaskData | null> {
  if (opts.bundle?.execution.mode === "dry_run" || opts.state.mode === "dry_run") {
    return opts.bundle?.task?.data ?? null;
  }

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
    const store =
      opts.expected_task_revision === undefined ? getTaskStore(opts.ctx) : new TaskStore(opts.ctx);
    const persisted = await store.mutate(
      opts.task_id,
      (current) => {
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
      },
      opts.expected_task_revision === undefined
        ? {}
        : { expectedRevision: opts.expected_task_revision },
    );
    return persisted.task;
  }

  const task =
    opts.expected_task_revision === undefined
      ? await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.task_id })
      : await observeRunnerTaskProjection(opts.ctx, opts.task_id);
  if (!task) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner outcome projection cannot observe the local task projection for ` +
        `${JSON.stringify(opts.task_id)} without refreshing remote state.`,
      context: {
        reason: "runner_projection_local_observation_unavailable",
        task_id: opts.task_id,
        backend_id: opts.ctx.backendId,
      },
    });
  }
  const observedRevision = requireRunnerProjectionRevision({
    ctx: opts.ctx,
    task,
  });
  const expectedRevision = opts.expected_task_revision ?? observedRevision;
  if (opts.expected_task_revision !== undefined) {
    assertExpectedRunnerProjectionRevision({
      task_id: opts.task_id,
      expected_revision: opts.expected_task_revision,
      observed_revision: observedRevision,
    });
  }
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
  const nextTask = {
    ...task,
    runner: outcome,
    doc: nextDoc,
    doc_updated_at: outcome.updated_at,
    doc_updated_by: resolveRunnerUpdatedBy(task),
  };
  const transitionRequest = opts.backend_projection_transition;
  if (transitionRequest) {
    if (!backend.writeTaskWithProjectionTransition) {
      throw new CliError({
        exitCode: 8,
        code: "E_RUNTIME",
        message:
          `Runner replay requires an attested backend projection transition for ` +
          `${JSON.stringify(opts.task_id)}, but backend ${JSON.stringify(opts.ctx.backendId)} ` +
          `does not provide one.`,
        context: {
          reason_code: "state_fingerprint_replay_backend_projection_attestation_unavailable",
          task_id: opts.task_id,
          backend_id: opts.ctx.backendId,
        },
      });
    }
    const transition = await backend.writeTaskWithProjectionTransition(
      nextTask,
      { expectedRevision },
      {
        capture: async (projection) =>
          await observeBackendProjection(opts.ctx, {
            projection,
          }),
        assertBefore: (captured) => {
          assertExpectedRunnerBackendProjection({
            task_id: opts.task_id,
            backend_id: opts.ctx.backendId,
            expected: transitionRequest.expected_before,
            captured,
          });
        },
      },
    );
    transitionRequest.on_attested(transition);
  } else {
    await backend.writeTask(nextTask, { expectedRevision });
  }
  if (opts.expected_task_revision === undefined) {
    return {
      ...task,
      runner: outcome,
      doc: nextDoc,
      doc_updated_at: outcome.updated_at,
      doc_updated_by: resolveRunnerUpdatedBy(task),
    };
  }
  const persisted = await observeRunnerTaskProjection(opts.ctx, opts.task_id);
  if (!persisted) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner outcome projection was written but its local revision could not be ` +
        `observed for ${JSON.stringify(opts.task_id)}.`,
      context: {
        reason: "runner_projection_revision_advance_unverified",
        task_id: opts.task_id,
        backend_id: opts.ctx.backendId,
        expected_revision: expectedRevision + 1,
        observed_revision: null,
      },
    });
  }
  const persistedRevision = requireRunnerProjectionRevision({
    ctx: opts.ctx,
    task: persisted,
  });
  if (persistedRevision !== expectedRevision + 1) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner outcome projection could not verify its exact revision advance for ` +
        `${JSON.stringify(opts.task_id)}.`,
      context: {
        reason: "runner_projection_revision_advance_unverified",
        task_id: opts.task_id,
        backend_id: opts.ctx.backendId,
        expected_revision: expectedRevision + 1,
        observed_revision: persistedRevision,
      },
    });
  }
  return persisted;
}
