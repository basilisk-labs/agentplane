import { describe, expect, it } from "vitest";

import { projectWorkflowOperationArgv, renderCliArgv } from "./workflow-operation-projection.js";
import { cliOperationStep } from "./workflow-step-factory.js";
import {
  WORKFLOW_OPERATION_REGISTRY,
  WORKFLOW_OPERATION_AUTHORITY_POLICY,
  type WorkflowOperation,
  type WorkflowOperationId,
  type WorkflowOperationParams,
  type WorkflowRouteState,
} from "./workflow-step.js";

const taskId = "202607250100-TYPED1";
const taskBranch = `task/${taskId}/typed-route-fixture`;
const taskHead = "1111111111111111111111111111111111111111";
const adoptionToken = "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

const state = {
  task: { id: taskId },
  blockers: [],
  preconditionFingerprint: {
    task_id: taskId,
    digest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    schema_version: 1,
    kind: "state_fingerprint",
    observed_by: "agentplane",
    task_revision: 1,
    git_head: taskHead,
    worktree: "/repo",
    components: Object.fromEntries(
      [
        "task",
        "git",
        "backend_projection",
        "policy",
        "blueprint",
        "knowledge",
        "provider",
        "authority",
      ].map((name) => [
        name,
        {
          state: "present",
          source: "fixture",
          digest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          reason_code: null,
        },
      ]),
    ),
  },
} as WorkflowRouteState;

describe("Workflow operation projection registry", () => {
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
      "integration.adopt_legacy_protected_conflict": {
        params: { taskId, expectedAdoptionToken: adoptionToken },
        argv: [
          "agentplane",
          "integrate",
          "queue",
          "adopt-legacy-protected-conflict",
          taskId,
          "--expect-adoption-token",
          adoptionToken,
        ],
      },
      "integration.enqueue": {
        params: { taskId, branch: taskBranch },
        argv: ["agentplane", "integrate", "queue", "enqueue", taskId, "--branch", taskBranch],
      },
      "pr.artifacts.update": {
        params: { taskId, includeTaskIds: ["INCLUDED"] },
        argv: ["agentplane", "pr", "update", taskId, "--include-task", "INCLUDED"],
      },
      "pr.head.publish": {
        params: { taskId, author: "CODER", includeTaskIds: ["INCLUDED"] },
        argv: [
          "agentplane",
          "pr",
          "open",
          taskId,
          "--author",
          "CODER",
          "--include-task",
          "INCLUDED",
        ],
      },
      "pr.open": {
        params: { taskId, author: "CODER", includeTaskIds: [] },
        argv: ["agentplane", "pr", "open", taskId, "--author", "CODER"],
      },
      "pr.sync_or_verify": {
        params: { taskId, includeTaskIds: [] },
        argv: ["agentplane", "pr", "update", taskId],
      },
      "provider.pr.refresh": {
        params: { taskId },
        argv: ["agentplane", "pr", "flow", "status", taskId],
      },
      "route.remote.refresh": {
        params: { taskId },
        argv: ["agentplane", "task", "next-action", taskId, "--remote", "--explain"],
      },
      "runner.follow": {
        params: { mode: "status", taskId, runId: "run-1" },
        argv: ["agentplane", "task", "run", "status", taskId, "--run-id", "run-1"],
      },
      "task.artifacts.commit": {
        params: { taskId },
        argv: ["agentplane", "commit", taskId, "--close", "--unstage-others"],
      },
      "task.branch.start": {
        params: { taskId, author: "CODER", body: "Start: branch work." },
        argv: [
          "agentplane",
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: branch work.",
        ],
      },
      "task.hosted_close.open": {
        params: { taskId },
        argv: ["agentplane", "task", "hosted-close-pr", taskId],
      },
      "task.hosted_close.finalize": {
        params: { taskId, base: "main" },
        argv: [
          "agentplane",
          "cleanup",
          "merged",
          "--task-id",
          taskId,
          "--finalize",
          "--base",
          "main",
        ],
      },
      "task.pre_merge_close": {
        params: {
          taskId,
          author: "CODER",
          body: "Verified: current head.",
          result: "pre-merge closure",
          commit: taskHead,
          force: true,
        },
        argv: [
          "agentplane",
          "finish",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Verified: current head.",
          "--result",
          "pre-merge closure",
          "--commit",
          taskHead,
          "--pre-merge-closure",
          "--force",
          "--yes",
        ],
      },
      "task.start": {
        params: { taskId, author: "CODER", body: "Start: execute." },
        argv: [
          "agentplane",
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: execute.",
        ],
      },
      "task.verify.show": {
        params: { taskId },
        argv: ["agentplane", "task", "verify-show", taskId],
      },
      "task.worktree.cleanup": {
        params: { taskId, base: "main" },
        argv: [
          "agentplane",
          "cleanup",
          "merged",
          "--task-id",
          taskId,
          "--finalize",
          "--base",
          "main",
        ],
      },
      "worktree.prepare": {
        params: { taskId, agent: "CODER", slug: "typed-route" },
        argv: [
          "agentplane",
          "work",
          "start",
          taskId,
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
        state,
        operationId: id,
        params: fixture.params as never,
        code: "test_projection",
        summary: "test exact operation projection",
      });
      const operation =
        step.kind === "cli_operation"
          ? step.operation
          : step.kind === "approval" && step.request.type === "side_effect"
            ? (step.request.operation as WorkflowOperation)
            : null;
      if (!operation) throw new Error(`expected a projected operation for ${id}`);
      expect(projectWorkflowOperationArgv(operation), id).toEqual(fixture.argv);
      if (WORKFLOW_OPERATION_AUTHORITY_POLICY[id].requiresAuthority) {
        expect(step).toMatchObject({ kind: "approval", request: { type: "side_effect" } });
        continue;
      }
      if (step.kind !== "cli_operation") throw new Error(`expected CLI operation for ${id}`);
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
