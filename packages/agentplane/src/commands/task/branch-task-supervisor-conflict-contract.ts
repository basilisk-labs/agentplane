import path from "node:path";
import { digestSupervisorEpisodeValue } from "@agentplaneorg/core/schemas";
import { taskCentricDigest, type TaskExternalEffect } from "@agentplaneorg/core/tasks";

import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import { taskRecordToData, type TaskData } from "../../backends/task-backend.js";
import type { ExecutedTaskRunnerExecution } from "../../runner/usecases/task-run-execution.js";
import { conflictApplicationAuthority } from "../pr/conflict-rework-authority.js";
import { taskDataToFrontmatter } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { projectObservedTaskExecutionContract } from "./task-execution-contract-observation.js";
import { buildTaskStatusTransition } from "./shared/workflow-transition-service.js";
import type { DirectRepositoryStatus } from "./direct-task-finalization.js";

export type ManagedConflictApplicationContext = {
  run_id: string;
  work_order_id: string;
  result_digest: string;
  execution_base_commit: string | null;
  execution_baseline_status: DirectRepositoryStatus | null;
  execution_lifecycle_event_count: number;
  accepted_task: TaskData;
  accepted_authority: ReturnType<typeof conflictApplicationAuthority>;
  status_at: string;
};

export function managedImplementationStatusNote(commit: string): string {
  return (
    `Implementation committed: ${commit.slice(0, 12)}. ` +
    "CLI recorded the observed branch EXECUTOR receipt and committed work-unit identity."
  );
}

export function managedConflictEvidenceCommitMessage(opts: {
  context: ManagedConflictApplicationContext;
  result: ExecutedTaskRunnerExecution["result"];
  decision: TaskRouteDecision;
}): string {
  const resultDigest = taskCentricDigest({
    run_id: opts.context.run_id,
    work_order: opts.context.work_order_id,
    result: opts.result,
  });
  const postcondition = digestSupervisorEpisodeValue({
    authority: conflictApplicationAuthority(opts.decision),
    implementation: opts.context,
  });
  return (
    `🚧 ${opts.context.accepted_task.id.split("-").at(-1)} task: record managed implementation evidence\n\n` +
    `AgentPlane-Result: ${resultDigest}\nAgentPlane-Postcondition: ${postcondition}`
  );
}

export function managedConflictTaskPostconditions(opts: {
  context: ManagedConflictApplicationContext;
  checkout: string;
  workflow_dir: string;
  commit: NonNullable<TaskData["commit"]>;
  changed_paths: readonly string[];
  observed_external_effects: readonly TaskExternalEffect[];
}): { reconciled: TaskData; applied: TaskData } {
  const persisted = (current: TaskData, next: TaskData): TaskData => {
    const projected = projectTaskCentricCompatibilityMutation({ current, next });
    return taskRecordToData({
      id: current.id,
      frontmatter: {
        ...taskDataToFrontmatter(projected),
        revision: (current.revision ?? 1) + 1,
      } as never,
      body: projected.doc ?? "",
      readmePath: path.join(opts.checkout, opts.workflow_dir, current.id, "README.md"),
    });
  };
  const projection = projectObservedTaskExecutionContract({
    task: opts.context.accepted_task,
    workflow_dir: opts.workflow_dir,
    changed_paths: opts.changed_paths,
    observed_external_effects: opts.observed_external_effects,
    preserved_commit: opts.commit.hash,
  });
  if (projection.escalated || projection.episodeAuthorityViolations.length > 0) {
    throw new Error("Managed conflict Task postcondition exceeds accepted authority.");
  }
  const reconciled = projection.nextTask
    ? persisted(opts.context.accepted_task, projection.nextTask)
    : opts.context.accepted_task;
  const note = managedImplementationStatusNote(opts.commit.hash);
  const transition = buildTaskStatusTransition({
    task: reconciled,
    at: opts.context.status_at,
    toStatus: "DOING",
    eventAuthor: "SUPERVISOR",
    updatedBy: "SUPERVISOR",
    note,
    comment: { author: "SUPERVISOR", body: note },
    commit: opts.commit,
  });
  return { reconciled, applied: persisted(reconciled, transition.nextTask) };
}
