import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";

const mocks = vi.hoisted(() => ({
  cmdFinish: vi.fn(),
  loadCommandContext: vi.fn(),
}));

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: vi.fn(),
}));

vi.mock("./finish-command.js", () => ({
  cmdFinish: mocks.cmdFinish,
}));

function preMergeCloseOperation(): Extract<WorkflowOperation, { id: "task.pre_merge_close" }> {
  return {
    id: "task.pre_merge_close",
    type: "task_record_result",
    params: {
      taskId: "202607221852-71SCSW",
      author: "CODER",
      body: "Verified: pre-merge closure packet is ready.",
      result: "pre-merge closure",
      commit: "artifact-head",
      force: false,
    },
    preconditionFingerprint: {
      schema_version: 1,
      kind: "state_fingerprint",
      observed_by: "agentplane",
      task_id: "202607221852-71SCSW",
      task_revision: 1,
      git_head: "artifact-head",
      worktree: "/repo/task",
      components: {},
      digest: "sha256:fingerprint",
    },
    authorityRef: "authority:test",
    idempotencyKey: "task.pre_merge_close:test",
    expectedPostconditions: [],
    triggersGitHooks: true,
  };
}

function routeDecision(operation: WorkflowOperation): TaskRouteDecision {
  return {
    executionPacket: { mustRunFrom: "/repo/task" },
    workflowStep: { id: operation.id, kind: "cli_operation", operation },
  } as unknown as TaskRouteDecision;
}

describe("branch task supervisor operations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.loadCommandContext.mockResolvedValue({
      resolvedProject: { gitRoot: "/repo" },
    } as CommandContext);
    mocks.cmdFinish.mockResolvedValue(0);
  });

  it("lets finish resolve the reviewed implementation behind a task-artifact head", async () => {
    const operation = preMergeCloseOperation();

    const result = await executeBranchWorkflowOperation({
      decision: routeDecision(operation),
      operation,
    });

    expect(result.status).toBe("succeeded");
    expect(mocks.cmdFinish).toHaveBeenCalledOnce();
    const options = mocks.cmdFinish.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(options).toMatchObject({
      commit: "artifact-head",
      preMergeClosure: true,
      taskIds: ["202607221852-71SCSW"],
    });
    expect(options).not.toHaveProperty("implementationCommit");
  });
});
