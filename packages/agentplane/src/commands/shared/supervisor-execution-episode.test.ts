import { describe, expect, it } from "vitest";

import { buildStateFingerprint } from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot } from "@agentplane/testkit";

import type { TaskRouteDecision } from "./route-decision-types.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import { WORKFLOW_OPERATION_REGISTRY, type WorkflowOperation } from "./workflow-step.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  supervisePersistedWorkflowEpisode,
} from "./supervisor-execution-episode.js";

const taskId = "202607280001-EPISODE";

function fixtureDecision(root: string, revision: number): TaskRouteDecision {
  const component = {
    state: "present",
    source: "supervisor_execution_episode_test",
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
    id: "runner.follow",
    type: "runner_follow",
    params: { mode: "run", taskId },
    preconditionFingerprint: fingerprint,
    authorityRef: `route:${taskId}:${fingerprint.digest}`,
    idempotencyKey: `runner.follow:${taskId}:${fingerprint.digest}:fixture`,
    expectedPostconditions: WORKFLOW_OPERATION_REGISTRY["runner.follow"].expectedPostconditions,
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
      id: "runner.follow",
      kind: "cli_operation",
      summary: "run the typed task runner operation",
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

describe("persisted supervisor execution episodes", () => {
  it("records intent, outcome, and refreshed route without a second controller", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1);
    const refreshed = fixtureDecision(root, 2);
    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "fixture runner completed",
          exit_code: 0,
        }),
      refresh: () => Promise.resolve(refreshed),
      budget: {
        max_episodes: 2,
        max_agent_runs: 2,
        max_input_tokens: 10,
        max_output_tokens: 10,
        max_total_tokens: 20,
        max_wall_time_ms: 10_000,
        max_changed_files: 10,
        max_diff_lines: 100,
        max_no_progress_episodes: 2,
      },
    });
    const stored = await createSupervisorEpisodeStore(outcome.journal_path).read();

    expect(outcome.execution).toMatchObject({
      executable: true,
      stop_reason: null,
      refreshed_decision: refreshed,
    });
    expect(outcome.journal).toMatchObject({
      task_id: taskId,
      task_revision: 1,
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      operations: [
        {
          kind: "agent_episode",
          status: "completed",
          postcondition_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
        },
      ],
    });
    expect(stored).toEqual(outcome.journal);
    expect(outcome.journal_path).toEqual(
      await resolveSupervisorExecutionEpisodePath({ git_root: root, task_id: taskId }),
    );
  });
});
