import { isDeepStrictEqual } from "node:util";

import type { StateFingerprintComponent } from "@agentplaneorg/core/schemas";

import type { TaskData, TaskRunnerHistoryEntry } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { RunnerRunRepository } from "../run-repository.js";
import {
  persistRunnerOutcomeToTask,
  type RunnerBackendProjectionTransitionAttestation,
} from "../task-state.js";
import type { RunnerContextBundle, RunnerRunState } from "../types.js";

export type TaskRunnerReplayProvenance = {
  action: "resume" | "retry";
  source_run_id: string;
  source_status: RunnerRunState["status"];
};

function withoutHistory(entry: NonNullable<TaskData["runner"]>): TaskRunnerHistoryEntry {
  const { history: _history, ...snapshot } = entry;
  return snapshot;
}

export function matchingTaskRunnerAnchors(task: TaskData, runId: string): TaskRunnerHistoryEntry[] {
  const runner = task.runner;
  if (!runner) return [];
  const matches = [
    ...(runner.run_id === runId ? [withoutHistory(runner)] : []),
    ...(runner.history ?? []).filter((entry) => entry.run_id === runId),
  ];
  const unique: TaskRunnerHistoryEntry[] = [];
  for (const candidate of matches) {
    if (!unique.some((entry) => isDeepStrictEqual(entry, candidate))) {
      unique.push(candidate);
    }
  }
  return unique;
}

export async function persistReplayAnchorBeforeExecution(opts: {
  ctx: CommandContext;
  task_id: string;
  bundle: RunnerContextBundle;
  state: RunnerRunState;
  provenance: TaskRunnerReplayProvenance;
  expected_backend_projection?: StateFingerprintComponent;
}): Promise<{
  expected_task: TaskData;
  backend_projection_transition?: RunnerBackendProjectionTransitionAttestation;
}> {
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.bundle.repository.git_root,
    workflow_dir: opts.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.bundle.execution.run_id,
    storage: "supervisor",
  });
  const recordedAt = new Date().toISOString();
  const eventType =
    opts.provenance.action === "resume" ? "runner_resume_created" : "runner_retry_created";
  const expectedTaskRevision = opts.bundle.task?.data.revision;
  if (
    typeof expectedTaskRevision !== "number" ||
    !Number.isInteger(expectedTaskRevision) ||
    expectedTaskRevision <= 0
  ) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner replay cannot establish its prepared task revision for ` +
        `${opts.task_id}:${opts.bundle.execution.run_id}.`,
      context: {
        reason_code: "runner_replay_prepared_revision_missing",
        task_id: opts.task_id,
        run_id: opts.bundle.execution.run_id,
        observed_revision: expectedTaskRevision ?? null,
      },
    });
  }
  let backendProjectionTransition: RunnerBackendProjectionTransitionAttestation | undefined;
  const persistedTask = await persistRunnerOutcomeToTask({
    ctx: opts.ctx,
    task_id: opts.task_id,
    bundle: opts.bundle,
    state: opts.state,
    ordering_authority: "current_active_claim",
    expected_task_revision: expectedTaskRevision,
    ...(opts.expected_backend_projection &&
    opts.ctx.taskBackend.capabilities.canonical_source === "remote"
      ? {
          backend_projection_transition: {
            expected_before: opts.expected_backend_projection,
            on_attested: (transition: RunnerBackendProjectionTransitionAttestation) => {
              backendProjectionTransition = transition;
            },
          },
        }
      : {}),
  });
  if (!persistedTask) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner replay could not observe its persisted task anchor for ` +
        `${opts.task_id}:${opts.bundle.execution.run_id}.`,
      context: {
        reason_code: "runner_replay_anchor_observation_unavailable",
        task_id: opts.task_id,
        run_id: opts.bundle.execution.run_id,
      },
    });
  }
  await repository.appendEvent({
    at: recordedAt,
    type: eventType,
    message:
      `runner ${opts.provenance.action} created fresh from current task/config; ` +
      `source_run_id=${opts.provenance.source_run_id}`,
    data: {
      source_run_id: opts.provenance.source_run_id,
      source_status: opts.provenance.source_status,
      source_trust: "external_task_anchor_only",
      source_artifacts_reused: false,
      prepared_task_revision: expectedTaskRevision,
      persisted_task_revision: persistedTask.revision ?? null,
    },
  });
  return {
    expected_task: persistedTask,
    ...(backendProjectionTransition
      ? { backend_projection_transition: backendProjectionTransition }
      : {}),
  };
}
