import { buildStateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskRouteDecision } from "./route-decision-types.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import { WORKFLOW_OPERATION_REGISTRY, type WorkflowOperation } from "./workflow-step.js";

export const taskId = "202607280001-EPISODE";
export const UNMETERED_TOKEN_BUDGET = {
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

export function fixtureDecision(
  root: string,
  revision: number,
  owner: "CODER" | "CURATOR" = "CODER",
): TaskRouteDecision {
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
      owner,
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
