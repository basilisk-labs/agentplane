import { describe, expect, it } from "vitest";

import {
  buildStateFingerprint,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot } from "@agentplane/testkit";

import type { TaskRouteDecision } from "./route-decision-types.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  supervisePersistedWorkflowEpisode,
} from "./supervisor-execution-episode.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import { WORKFLOW_OPERATION_REGISTRY, type WorkflowOperation } from "./workflow-step.js";

const taskId = "202607280001-EPISODE";
const budget = {
  max_episodes: 50,
  max_agent_runs: 50,
  max_input_tokens: null,
  max_output_tokens: null,
  max_total_tokens: null,
  max_wall_time_ms: 4 * 60 * 60 * 1000,
  max_changed_files: 2000,
  max_diff_lines: null,
  max_no_progress_episodes: 3,
} as const;

function worktreeDecision(root: string, revision: number): TaskRouteDecision {
  const component = {
    state: "present",
    source: "supervisor_execution_worktree_recovery_test",
    value: { taskId, revision },
  } as const;
  const fingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: revision,
    git_head: "0123456789abcdef0123456789abcdef01234567",
    worktree: root,
    components: {
      task: component,
      git: component,
      backend_projection: component,
      policy: component,
      blueprint: component,
      knowledge: component,
      provider: component,
      authority: component,
    },
  });
  const operation: WorkflowOperation = {
    id: "worktree.prepare",
    type: "worktree_prepare",
    params: { taskId, agent: "CODER", slug: "fixture" },
    preconditionFingerprint: fingerprint,
    authorityRef: `route:${taskId}:${fingerprint.digest}`,
    idempotencyKey: `worktree.prepare:${taskId}:fixture`,
    expectedPostconditions: WORKFLOW_OPERATION_REGISTRY["worktree.prepare"].expectedPostconditions,
    triggersGitHooks: false,
  };
  return {
    task: {
      id: taskId,
      title: "Supervisor episode fixture",
      status: "DOING",
      owner: "CODER",
      planApproval: "approved",
      verification: "pending",
      commit: null,
    },
    workflowStep: {
      id: operation.id,
      kind: "cli_operation",
      summary: "prepare the task worktree",
      preconditionFingerprint: fingerprint,
      operation,
      execution: { actionKind: "local_command" },
    },
    executionPacket: {
      actionKind: "local_command",
      safeToMutate: true,
      exactArgv: projectWorkflowOperationArgv(operation),
    },
  } as TaskRouteDecision;
}

describe("supervisor worktree preparation recovery", () => {
  it("replaces a proven not-applied interrupted operation without replaying it", async () => {
    const root = await mkGitRepoRoot();
    const decision = worktreeDecision(root, 1);
    if (decision.workflowStep.kind !== "cli_operation") throw new Error("expected operation");
    const operation = decision.workflowStep.operation;
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: 1,
      state_fingerprint_digest: operation.preconditionFingerprint.digest,
      budget,
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: operation,
      precondition_fingerprint_digest: operation.preconditionFingerprint.digest,
      authority_ref: "workflow-operation:worktree.prepare",
      authority_digest: operation.preconditionFingerprint.digest,
      effect_ref: operation.idempotencyKey,
    });
    if (started.status !== "started") throw new Error("expected started operation");
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    await createSupervisorEpisodeStore(journalPath).write(started.journal);
    let executions = 0;

    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () => {
        executions += 1;
        return Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: operation.expectedPostconditions.map((item) => item.id),
          detail: "fixture worktree prepared",
          exit_code: 0,
        });
      },
      refresh: () => Promise.resolve(worktreeDecision(root, 2)),
      budget,
    });

    expect(executions).toBe(1);
    expect(outcome.journal.operations).toMatchObject([
      { status: "failed" },
      { status: "completed", replacement_of_operation_key: started.operation_key },
    ]);
  });
});
