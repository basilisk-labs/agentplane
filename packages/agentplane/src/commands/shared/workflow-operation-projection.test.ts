import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import { projectWorkflowOperationArgv, renderCliArgv } from "./workflow-operation-projection.js";
import { cliOperationStep } from "./workflow-step-factory.js";
import {
  WORKFLOW_OPERATION_REGISTRY,
  type WorkflowOperationId,
  type WorkflowOperationParams,
  type WorkflowRouteState,
} from "./workflow-step.js";
import { withBootstrapWorkflowFingerprint } from "./workflow-step-fingerprint.js";

const task = {
  id: "202607250100-TYPED1",
  title: "Workflow operation projection fixture",
  description: "Exercise exact CLI operation projection.",
  status: "DOING",
  priority: "high",
  owner: "CODER",
  revision: 7,
  depends_on: [],
  tags: ["code"],
  verify: ["bun test"],
  plan_approval: {
    state: "approved",
    approved_by: "ORCHESTRATOR",
    approved_at: "2026-07-25T00:00:00.000Z",
  },
  verification: { state: "pending" },
} satisfies TaskData;

const resume = {
  task_id: task.id,
  task_status: task.status,
  branch: `task/${task.id}/workflow-operation-projection`,
  base_branch: "main",
  head_sha: "1111111111111111111111111111111111111111",
  workspace_root: `/repo/.agentplane/worktrees/${task.id}`,
  pr_branch: `task/${task.id}/workflow-operation-projection`,
  latest_handoff: null,
  runner: {
    run_id: null,
    status: null,
    heartbeat_at: null,
    state_path: null,
    trace_path: null,
    next_action: "run",
    next_command: `agentplane task run ${task.id}`,
    resume_command: `agentplane task run ${task.id}`,
    retry_command: null,
  },
} satisfies TaskResumeContext;

function projectionState(): WorkflowRouteState {
  return withBootstrapWorkflowFingerprint({
    task,
    resume,
    workflowMode: "branch_pr",
    prFlow: null,
    cleanupProbe: { state: "not_requested" },
    blockers: [],
    batchOwnership: { role: "none" },
  });
}

describe("workflow operation projection", () => {
  it("projects every registered domain operation to exact CLI argv", () => {
    const fixtures: {
      [Id in WorkflowOperationId]: {
        params: WorkflowOperationParams[Id];
        argv: string[];
      };
    } = {
      "batch.collect_included": {
        params: { taskId: "INCLUDED" },
        argv: ["agentplane", "task", "brief", "INCLUDED"],
      },
      "batch.follow_primary": {
        params: { taskId: "PRIMARY" },
        argv: ["agentplane", "task", "brief", "PRIMARY"],
      },
      "batch.reconcile_included": {
        params: { taskId: "INCLUDED" },
        argv: ["agentplane", "release", "tasks", "reconcile", "--task-id", "INCLUDED"],
      },
      "integration.enqueue": {
        params: { taskId: task.id, branch: resume.pr_branch ?? "" },
        argv: [
          "agentplane",
          "integrate",
          "queue",
          "enqueue",
          task.id,
          "--branch",
          resume.pr_branch ?? "",
        ],
      },
      "pr.artifacts.update": {
        params: { taskId: task.id, includeTaskIds: ["INCLUDED"] },
        argv: ["agentplane", "pr", "update", task.id, "--include-task", "INCLUDED"],
      },
      "pr.head.publish": {
        params: { taskId: task.id, author: "CODER", includeTaskIds: ["INCLUDED"] },
        argv: [
          "agentplane",
          "pr",
          "open",
          task.id,
          "--author",
          "CODER",
          "--include-task",
          "INCLUDED",
        ],
      },
      "pr.open": {
        params: { taskId: task.id, author: "CODER", includeTaskIds: [] },
        argv: ["agentplane", "pr", "open", task.id, "--author", "CODER"],
      },
      "pr.sync_or_verify": {
        params: { taskId: task.id, includeTaskIds: [] },
        argv: ["agentplane", "pr", "update", task.id],
      },
      "provider.pr.refresh": {
        params: { taskId: task.id },
        argv: ["agentplane", "pr", "flow", "status", task.id],
      },
      "flow.repair.foreign_task_readme": {
        params: { taskId: task.id },
        argv: ["agentplane", "flow", "repair", task.id, "--safe-apply"],
      },
      "route.remote.refresh": {
        params: { taskId: task.id },
        argv: ["agentplane", "task", "next-action", task.id, "--remote", "--explain"],
      },
      "runner.follow": {
        params: { mode: "status", taskId: task.id, runId: "run-1" },
        argv: ["agentplane", "task", "run", "status", task.id, "--run-id", "run-1"],
      },
      "task.artifacts.commit": {
        params: { taskId: task.id },
        argv: ["agentplane", "commit", task.id, "--close", "--unstage-others"],
      },
      "task.branch.start": {
        params: { taskId: task.id, author: "CODER", body: "Start: branch work." },
        argv: [
          "agentplane",
          "task",
          "start-ready",
          task.id,
          "--author",
          "CODER",
          "--body",
          "Start: branch work.",
        ],
      },
      "task.hosted_close.open": {
        params: { taskId: task.id },
        argv: ["agentplane", "task", "hosted-close-pr", task.id],
      },
      "task.hosted_close.finalize": {
        params: { taskId: task.id, base: "main" },
        argv: [
          "agentplane",
          "cleanup",
          "merged",
          "--task-id",
          task.id,
          "--finalize",
          "--base",
          "main",
        ],
      },
      "task.pre_merge_close": {
        params: {
          taskId: task.id,
          author: "CODER",
          body: "Verified: current head.",
          result: "pre-merge closure",
          commit: resume.head_sha ?? "",
          force: true,
        },
        argv: [
          "agentplane",
          "finish",
          task.id,
          "--author",
          "CODER",
          "--body",
          "Verified: current head.",
          "--result",
          "pre-merge closure",
          "--commit",
          resume.head_sha ?? "",
          "--pre-merge-closure",
          "--force",
          "--yes",
        ],
      },
      "task.start": {
        params: { taskId: task.id, author: "CODER", body: "Start: execute." },
        argv: [
          "agentplane",
          "task",
          "start-ready",
          task.id,
          "--author",
          "CODER",
          "--body",
          "Start: execute.",
        ],
      },
      "task.verify.show": {
        params: { taskId: task.id },
        argv: ["agentplane", "task", "verify-show", task.id],
      },
      "task.worktree.cleanup": {
        params: { taskId: task.id, base: "main" },
        argv: [
          "agentplane",
          "cleanup",
          "merged",
          "--task-id",
          task.id,
          "--finalize",
          "--base",
          "main",
        ],
      },
      "worktree.prepare": {
        params: { taskId: task.id, agent: "CODER", slug: "typed-route" },
        argv: [
          "agentplane",
          "work",
          "start",
          task.id,
          "--agent",
          "CODER",
          "--slug",
          "typed-route",
          "--worktree",
        ],
      },
    };

    for (const id of Object.keys(fixtures) as WorkflowOperationId[]) {
      const fixture = fixtures[id];
      const step = cliOperationStep({
        state: projectionState(),
        operationId: id,
        params: fixture.params as never,
        code: "test_projection",
        summary: "test exact operation projection",
      });
      if (step.kind !== "cli_operation") throw new Error("expected CLI operation");
      expect(projectWorkflowOperationArgv(step.operation), id).toEqual(fixture.argv);
      expect(step.compatibility.command, id).toBe(renderCliArgv(fixture.argv));
      expect(step.operation.triggersGitHooks, id).toBe(
        WORKFLOW_OPERATION_REGISTRY[id].triggersGitHooks,
      );
      expect(step.operation.expectedPostconditions, id).toEqual(
        WORKFLOW_OPERATION_REGISTRY[id].expectedPostconditions,
      );
    }
  });
});
